/* ============================================================
   ContactModal — in-page contact form. Opened by any element that
   calls window.openContact(). Posts to /api/contact (Vercel + Resend).
   ============================================================ */

const CONTACT_EMAIL = 'carlos.incaroca@gmail.com';

window.openContact = (e) => {
  if (e && e.preventDefault) e.preventDefault();
  window.dispatchEvent(new Event('open-contact'));
};

function ContactModal() {
  const { c } = window.useLang();
  const t = c.contact;
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = React.useState(false);
  const firstRef = React.useRef(null);

  React.useEffect(() => {
    const onOpen = () => { setOpen(true); setState('idle'); setCopied(false); };
    window.addEventListener('open-contact', onOpen);
    return () => window.removeEventListener('open-contact', onOpen);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => firstRef.current && firstRef.current.focus(), 60);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(focusTimer);
    };
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState('sending');
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (r.ok) { setState('sent'); form.reset(); } else { setState('error'); }
    } catch (err) {
      setState('error');
    }
  };

  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(CONTACT_EMAIL).then(done, done);
    } else {
      done();
    }
  };

  if (!open) return null;

  return (
    <div className="cm-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="cm-card" role="dialog" aria-modal="true" aria-labelledby="cm-title">
        <button type="button" className="cm-close" onClick={() => setOpen(false)} aria-label={t.close}>×</button>
        <div className="as-eyebrow"><div className="as-bar"></div><span>{t.eyebrow}</span></div>
        <h3 id="cm-title" className="cm-title">{t.title}</h3>

        {state === 'sent' ? (
          <div className="cm-sent">
            <p>{t.sent}</p>
            <button type="button" className="cm-btn" onClick={() => setOpen(false)}>{t.close}</button>
          </div>
        ) : (
          <form className="cm-form" onSubmit={submit} noValidate={false}>
            <label>{t.name}
              <input ref={firstRef} name="name" required maxLength={100} autoComplete="name" />
            </label>
            <label>{t.email}
              <input name="email" type="email" required maxLength={200} autoComplete="email" />
            </label>
            <label>{t.message}
              <textarea name="message" required rows={5} maxLength={5000} />
            </label>
            <input name="company" className="cm-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            {state === 'error' && <p className="cm-error" role="alert">{t.error}</p>}
            <button type="submit" className="cm-btn" disabled={state === 'sending'}>
              {state === 'sending' ? t.sending : t.send}
            </button>
          </form>
        )}

        <button type="button" className="cm-copy" onClick={copy}>
          {copied ? t.copied : t.copy} · {CONTACT_EMAIL}
        </button>
      </div>
    </div>
  );
}

window.ContactModal = ContactModal;
