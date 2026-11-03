/* ============================================================
   POST /api/contact — Vercel serverless function.
   Forwards a portfolio contact-form message to Carlos via Resend.

   Env vars (set in Vercel → Project → Settings → Environment Variables):
     RESEND_API_KEY  required — Resend API key (never sent to the browser)
     CONTACT_TO      optional — inbox to deliver to (default below)
     CONTACT_FROM    optional — sender; the default works without a domain.
                     With a verified domain, set e.g. "Carlos <hi@yourdomain>".
   ============================================================ */

const TO = process.env.CONTACT_TO || 'carlos.incaroca@gmail.com';
const FROM = process.env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
));
const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ').trim();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method' });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ ok: false, error: 'not-configured' });

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  // Honeypot: real visitors never fill the hidden "company" field.
  if (body.company) return res.status(200).json({ ok: true });

  const name = oneLine(body.name || '').slice(0, 100);
  const email = oneLine(body.email || '').slice(0, 200);
  const message = String(body.message || '').trim().slice(0, 5000);

  if (!name || !EMAIL_RE.test(email) || message.length < 2) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1F2937">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#C4364D">Portfolio message</p>
      <p style="margin:0 0 16px"><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p>
      <div style="white-space:pre-wrap;border-left:3px solid #C4364D;padding-left:12px">${esc(message)}</div>
      <p style="margin:16px 0 0;font-size:12px;color:#6B7280">Reply to this email to answer ${esc(name)} directly.</p>
    </div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${name} <${email}>\n\n${message}`,
        html,
      }),
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ ok: false, error: 'send' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend request failed', err);
    return res.status(502).json({ ok: false, error: 'send' });
  }
};
