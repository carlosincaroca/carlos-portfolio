/* ============================================================
   i18n — language context, hook, and the LanguageSelector UI
   Depends on window.CONTENT + window.LANGS (content.jsx)
   ============================================================ */

window.LANGS = [
  { code: 'en', label: 'English (US)' },
  { code: 'ja', label: '日本語 (Japan)' },
  { code: 'de', label: 'Deutsch (Germany)' },
  { code: 'fr', label: 'Français (France)' },
  { code: 'ko', label: '한국어 (South Korea)' },
  { code: 'es', label: 'Español (España)' },
];

window.LangContext = React.createContext({ lang: 'en', setLang: () => {}, c: null });
window.useLang = () => React.useContext(window.LangContext);

/* Globe + chevron glyphs */
function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
    </svg>
  );
}

function LanguageSelector({ compact }) {
  const { lang, setLang } = window.useLang();
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);
  const current = window.LANGS.find((l) => l.code === lang) || window.LANGS[0];

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); window.removeEventListener('keydown', onKey); };
  }, [open]);

  const pick = (code) => { setLang(code); setOpen(false); };

  return (
    <div className={`lang-select${compact ? ' lang-select-compact' : ''}`} ref={wrapRef}>
      <button
        className="lang-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={compact ? `Language: ${current.label}` : undefined}
      >
        <GlobeIcon />
        {!compact && <span className="lang-trigger-label">{current.label}</span>}
        {!compact && (
          <svg className={`lang-chevron${open ? ' open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {window.LANGS.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                className={`lang-option${l.code === lang ? ' active' : ''}`}
                onClick={() => pick(l.code)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

window.LanguageSelector = LanguageSelector;
