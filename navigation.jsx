const { useState, useEffect } = React;

function Navigation({ projectCount, onLogoClick, onIndexClick }) {
  const [time, setTime] = useState(new Date());
  const [scrollPct, setScrollPct] = useState(0);
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

  return (
    <nav className="nav" style={{ backgroundColor: bg, color: textColor }}>
      <div className="nav-inner">
        <button className="nav-link black tight" onClick={onLogoClick} style={{ fontSize: '1.5rem' }}>
          <span className="pulse-soft">BIO•MECH</span>
        </button>
        <div className="flex" style={{ alignItems: 'center', gap: '2rem' }}>
          <button className="nav-link bold uppercase wider" onClick={onIndexClick} style={{ fontSize: '0.875rem' }}>INDEX OF WORKS [{projectCount}]</button>
          <div className="flex" style={{ alignItems: 'center', gap: '1.5rem' }}>
            <div className="flex mono" style={{ alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
              <div className="pulse-green"></div>
              <span>SYSTEM ONLINE</span>
            </div>
            <div className="nav-clock">{timeStr}</div>
            <button className="nav-theme-toggle" onClick={toggleTheme}>
              {dark ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </div>
      </div>
      <div className="nav-progress" style={{ transform: `scaleX(${scrollPct})` }}></div>
    </nav>
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