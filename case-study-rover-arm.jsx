(function () {

  /* ── Rover-arm 3D model background (iframe) ────────────── */
  function RoverArmBg({ iframeRef, lit }) {
    return (
      <div className={lit ? 'cs-bg-3d lit' : 'cs-bg-3d'} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: lit ? 'auto' : 'none' }}>
        <iframe
          ref={iframeRef}
          src="./roverarm-bg.html?v=125"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', opacity: lit ? 1 : 0.92, transition: 'opacity 0.5s ease' }}
        />
      </div>
    );
  }

  /* ── Mode content ──────────────────────────────────────── */
  const MODES = {
    manipulation: {
      title: 'Manipulation system',
      desc: 'Six harmonic-drive joints give a 1.1 m reach envelope with ±0.1 mm repeatability — closed-loop torque control at each axis for compliant contact during sample handling.',
      items: [
        '6× harmonic-drive joints',
        'Closed-loop torque control',
        '±0.1 mm repeatability',
      ],
    },
    sampling: {
      title: 'Sampling system',
      desc: 'A force-sensing parallel-jaw gripper with interchangeable end-effectors caches rock cores into the hermetic sample bay — jaw force is limited to prevent crush damage to friable specimens.',
      items: [
        'Parallel-jaw force sensing',
        'Interchangeable end-effectors',
        'Hermetic sample caching',
      ],
    },
  };

  /* ── Arm glyph SVG (mode-card corner) ──────────────────── */
  function ArmGlyph() {
    return (
      <svg viewBox="0 0 120 120" className="dl-deck-glyph" aria-hidden="true">
        <circle className="dl-glyph-orbit" cx="60" cy="60" r="46" fill="none" strokeWidth="1.4" stroke="var(--red)" />
        <path d="M40 86 L40 70 L64 52 L84 60" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="var(--red)" />
        <circle cx="40" cy="70" r="4" fill="none" strokeWidth="1.4" stroke="var(--red)" />
        <circle cx="64" cy="52" r="4" fill="none" strokeWidth="1.4" stroke="var(--red)" />
        <circle className="dl-glyph-pulse" cx="84" cy="60" r="3.5" fill="var(--red)" />
        <rect x="36" y="86" width="8" height="4" fill="var(--red)" />
      </svg>
    );
  }

  /* ── Main component ────────────────────────────────────── */
  function RoverArmCaseStudy({ onBack }) {
    const [mode, setMode]           = React.useState('manipulation');
    const [exploded, setExploded]   = React.useState(false);
    const [modelView, setModelView] = React.useState(false);
    const [scrolled, setScrolled]   = React.useState(false);
    const iframeRef                 = React.useRef(null);
    const lastTouchRef              = React.useRef(false);
    const md = MODES[mode];

    const handleExplode = () => {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow || !iframe.contentWindow.toggleExplode) return;
      const newState = iframe.contentWindow.toggleExplode();
      setExploded(newState === 1);
    };

    React.useEffect(() => {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow || !iframe.contentWindow.setModelView) return;
      iframe.contentWindow.setModelView(modelView, lastTouchRef.current);
    }, [modelView]);

    React.useEffect(() => {
      const onPointer = (e) => { lastTouchRef.current = e.pointerType === 'touch'; };
      window.addEventListener('pointerdown', onPointer, true);
      return () => window.removeEventListener('pointerdown', onPointer, true);
    }, []);

    React.useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    React.useEffect(() => {
      const el = document.documentElement;
      const body = document.body;
      if (modelView) { el.style.background = 'transparent'; body.style.background = 'transparent'; }
      else { el.style.background = ''; body.style.background = ''; }
      return () => { el.style.background = ''; body.style.background = ''; };
    }, [modelView]);

    return (
      <div className="dl-wrap" style={{ background: modelView ? 'transparent' : undefined, transition: 'background-color 0.5s ease' }}>
        <RoverArmBg iframeRef={iframeRef} lit={modelView} />

        <div className="dl-inner" style={{ pointerEvents: modelView ? 'none' : undefined }}>
          <button className="cs-back" onClick={onBack} style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            BACK TO ROVER
          </button>

          <header className="dl-header" style={{ opacity: modelView ? 0 : 1, transition: 'opacity 0.35s ease', pointerEvents: modelView ? 'none' : undefined, willChange: 'opacity' }}>
            <div className="dl-header-left">
              <div className="dl-badges">
                <span className="dl-pill"><span className="dl-pill-dot"></span>Robotics / Manipulation</span>
                <span className="dl-pill dl-pill-ghost">BIO MECH / PROJECT 03 · ARM</span>
              </div>

              <div>
                <h1 className="dl-title">
                  Robotic sampling<br />
                  arm.
                </h1>
                <p className="dl-lead">
                  A six-degree-of-freedom manipulator with a force-sensing parallel-jaw gripper and harmonic-drive joints — engineered to collect, cache, and transfer rock-core samples for the rover's science payload.
                </p>
              </div>

              <div className="dl-metrics-row">
                <div className="dl-status-pill">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="dl-pill-dot"></span>Design validated
                  </span>
                  <span style={{ opacity: 0.5 }}>∙</span>
                  <span>Rover-integrated</span>
                </div>
                <div className="dl-metrics-strip">
                  <div className="dl-metric"><span className="dl-metric-lbl">Reach</span><span className="dl-metric-val">1.1m</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">Payload</span><span className="dl-metric-val">5kg</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">DOF</span><span className="dl-metric-val">6</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">Repeat</span><span className="dl-metric-val">0.1mm</span></div>
                </div>
              </div>
            </div>

            <div className="dl-card">
              <div className="dl-mode-header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <p className="dl-lbl dl-subtle">Mode</p>
                  <h2 className="dl-mode-title">{md.title}</h2>
                </div>
                <ArmGlyph />
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>{md.desc}</p>
              <div className="dl-mode-toggle">
                <button className={`dl-mode-btn${mode === 'manipulation' ? ' active' : ''}`} onClick={() => setMode('manipulation')}>Manipulation</button>
                <button className={`dl-mode-btn${mode === 'sampling'     ? ' active' : ''}`} onClick={() => setMode('sampling')}>Sampling</button>
              </div>
              <ul className="dl-mode-items">
                {md.items.map((item, i) => (
                  <li key={i} className="dl-mode-item">
                    <span className="dl-mode-dot"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </header>

        </div>

        <aside className={`ctrl-rail${scrolled && !modelView ? ' is-collapsed' : ''}`} aria-label="Assembly controls">
          <span className="rail-spine" aria-hidden="true">Assembly · Ctrl</span>
          <span className="rail-cross" aria-hidden="true">+</span>

          <button className={`rail-btn${exploded ? ' is-active' : ''}`} onClick={handleExplode} title="Explode / assemble the model">
            <span className="rail-leader" aria-hidden="true"></span>
            <svg className="rail-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 10.5V4" /><path d="M9.5 6 12 3.5 14.5 6" />
              <path d="M12 13.5V20" /><path d="M9.5 18 12 20.5 14.5 18" />
              <path d="M10.5 12H4" /><path d="M6 9.5 3.5 12 6 14.5" />
              <path d="M13.5 12H20" /><path d="M18 9.5 20.5 12 18 14.5" />
            </svg>
            <span className="rail-label">{exploded ? 'Assemble' : 'Explode'}</span>
          </button>

          <button className={`rail-btn rail-btn--view${modelView ? ' is-active' : ''}`} onClick={() => setModelView(v => !v)} title="Enter / exit model view">
            <span className="rail-leader" aria-hidden="true"></span>
            <svg className="rail-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7.5 4.3v9.4L12 21l-7.5-4.3V7.3L12 3z" />
              <path d="M4.5 7.3 12 11.6l7.5-4.3" />
              <path d="M12 11.6V21" />
            </svg>
            <span className="rail-label">{modelView ? 'Exit View' : 'Model View'}</span>
          </button>

          <span className="rail-cross" aria-hidden="true">+</span>
        </aside>
      </div>
    );
  }

  window.RoverArmCaseStudy = RoverArmCaseStudy;
})();
