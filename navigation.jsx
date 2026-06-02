const { useState, useEffect } = React;

function Navigation({ projectCount, onLogoClick, onIndexClick }) {
  const [time, setTime] = useState(new Date());
  const [scrollPct, setScrollPct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const [dark, setDark] = React.useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  );

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll + compute the active section whenever the drawer opens
  useEffect(() => {
    if (!menuOpen) { document.body.style.overflow = ''; return; }
    document.body.style.overflow = 'hidden';
    const scrollY = window.scrollY;
    const ids = ['project-index', 'specializations', 'about', 'intro'];
    let found = 'hero';
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY >= top - window.innerHeight * 0.35) { found = id; break; }
      }
    }
    setActive(found);
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const tintAlpha = Math.min(scrollPct / 0.1, 1);
  const bg = `rgba(196, 54, 77, ${tintAlpha})`;
  const timeStr = time.toLocaleTimeString('en-US', { hour12: false });
  const r = Math.round(31 + (255 - 31) * tintAlpha);
  const g = Math.round(41 + (255 - 41) * tintAlpha);
  const b = Math.round(55 + (255 - 55) * tintAlpha);
  const textColor = dark ? 'rgba(255,255,255,0.9)' : `rgb(${r},${g},${b})`;

  // Drawer navigation — falls back to going home first if a section isn't on the current page
  const goSection = (id) => {
    setMenuOpen(false);
    if (id === 'hero') { onLogoClick(); return; }
    if (id === 'project-index') { onIndexClick(); return; }
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    onLogoClick();
    setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }, 450);
  };

  const drawerLinks = [
    { id: 'hero', n: '01', label: 'HOME' },
    { id: 'intro', n: '02', label: 'INTRO' },
    { id: 'about', n: '03', label: 'ABOUT' },
    { id: 'specializations', n: '04', label: 'SKILLS' },
    { id: 'project-index', n: '05', label: 'INDEX OF WORKS', badge: `[${projectCount}]` },
  ];

  return (
    <React.Fragment>
      <nav className="nav" style={{ backgroundColor: bg, color: textColor }}>
        <div className="nav-inner">
          <button className="nav-link black tight nav-logo" onClick={onLogoClick} style={{ fontSize: '1.5rem' }}>
            <span className="pulse-soft">BIO•MECH</span>
          </button>
          <div className="nav-desktop flex" style={{ alignItems: 'center', gap: '2rem' }}>
            <button className="nav-link bold uppercase wider" onClick={onIndexClick} style={{ fontSize: '0.875rem' }}>INDEX OF WORKS [{projectCount}]</button>
            <div className="flex" style={{ alignItems: 'center', gap: '1.5rem' }}>
              <div className="nav-clock">{timeStr}</div>
              <button className="nav-theme-toggle" onClick={toggleTheme}>
                {dark ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          </div>
          <div className="nav-mobile">
            <button className="nav-theme-icon" onClick={toggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {dark ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <div className="nav-clock">{timeStr}</div>
            <button className="nav-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <div className="nav-progress" style={{ transform: `scaleX(${scrollPct})` }}></div>
      </nav>

      <div className={`nav-drawer${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!menuOpen}>
        <div className="nav-drawer-grid" aria-hidden="true"></div>
        <div className="nav-drawer-top">
          <span className="nav-drawer-logo black tight">BIO•MECH</span>
          <button className="nav-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <span></span><span></span>
          </button>
        </div>
        <nav className="nav-drawer-links">
          {drawerLinks.map((l, i) => (
            <button
              key={l.id}
              className={`nav-drawer-link${active === l.id ? ' active' : ''}`}
              style={{ '--i': i }}
              onClick={() => goSection(l.id)}
            >
              <span className="ndl-num">{l.n}</span>
              <span className="ndl-rule"></span>
              <span className="ndl-label">{l.label}{l.badge && <em className="ndl-badge">{l.badge}</em>}</span>
            </button>
          ))}
        </nav>
        <div className="nav-drawer-foot">
          <span className="nav-drawer-clock">{timeStr}</span>
          <button className="nav-theme-toggle" onClick={toggleTheme}>
            {dark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

window.Navigation = Navigation;

function FloatingPillNav() {
  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState('hero');

  React.useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > window.innerHeight * 0.5);
      const ids = ['project-index', 'specializations', 'about', 'intro'];
      let found = 'hero';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (scrollY >= top - window.innerHeight * 0.35) { found = id; break; }
        }
      }
      setActive(found);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const links = [
    { id: 'hero', label: 'HOME' },
    { id: 'intro', label: 'INTRO' },
    { id: 'about', label: 'ABOUT' },
    { id: 'specializations', label: 'SKILLS' },
    { id: 'project-index', label: 'WORK' },
  ];

  const scrollTo = (id) => {
    if (id === 'hero') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`pill-nav${visible ? ' visible' : ''}`}>
      {links.map(({ id, label }) => (
        <button key={id} className={`pill-nav-btn${active === id ? ' active' : ''}`} onClick={() => scrollTo(id)}>
          {label}
        </button>
      ))}
    </div>
  );
}

window.FloatingPillNav = FloatingPillNav;
