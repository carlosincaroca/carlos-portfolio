const { useState, useEffect } = React;

function Navigation({ projectCount, onLogoClick, onIndexClick }) {
  const [time, setTime] = useState(new Date());
  const [scrollPct, setScrollPct] = useState(0);

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

  const tintAlpha = Math.min(scrollPct / 0.1, 1);
  const bg = `rgba(196, 54, 77, ${tintAlpha})`;
  const timeStr = time.toLocaleTimeString('en-US', { hour12: false });

  return (
    <nav className="nav" style={{ backgroundColor: bg }}>
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
          </div>
        </div>
      </div>
      <div className="nav-progress" style={{ transform: `scaleX(${scrollPct})` }}></div>
    </nav>
  );
}

window.Navigation = Navigation;