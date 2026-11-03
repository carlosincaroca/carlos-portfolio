(function () {

  /* ── Hexapod iframe background ─────────────────────────────── */
  function HexapodBg({ iframeRef, lit }) {
    return (
      <div className={lit ? 'cs-bg-3d lit' : 'cs-bg-3d'} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: lit ? 'auto' : 'none' }}>
        <iframe
          ref={iframeRef}
          src="./hexapod-bg.html?v=10"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', opacity: lit ? 1 : 0.92, transition: 'opacity 0.5s ease' }}
        />
      </div>
    );
  }

  /* ── Mode content ──────────────────────────────────────────── */



  /* ── Hexapod glyph SVG ─────────────────────────────────────── */
  function HexapodGlyph() {
    return (
      <svg viewBox="0 0 120 120" className="dl-deck-glyph" aria-hidden="true">
        <circle className="dl-glyph-orbit" cx="60" cy="60" r="46" fill="none" strokeWidth="1.4" stroke="var(--red)" />
        {/* Hex body */}
        <path d="M60 44 74 52 74 68 60 76 46 68 46 52 Z" fill="none" stroke="var(--red)" strokeWidth="1.4" opacity="0.7" />
        {/* Legs — two segments each, mirrored pairs */}
        <path d="M46 52 32 46 24 34" fill="none" stroke="var(--red)" strokeWidth="1.2" opacity="0.6" />
        <path d="M74 52 88 46 96 34" fill="none" stroke="var(--red)" strokeWidth="1.2" opacity="0.6" />
        <path d="M46 60 28 60 18 66" fill="none" stroke="var(--red)" strokeWidth="1.2" opacity="0.6" />
        <path d="M74 60 92 60 102 66" fill="none" stroke="var(--red)" strokeWidth="1.2" opacity="0.6" />
        <path d="M46 68 32 74 24 86" fill="none" stroke="var(--red)" strokeWidth="1.2" opacity="0.6" />
        <path d="M74 68 88 74 96 86" fill="none" stroke="var(--red)" strokeWidth="1.2" opacity="0.6" />
        {/* Leg joints */}
        <circle cx="32" cy="46" r="1.8" fill="var(--red)" opacity="0.5" />
        <circle cx="88" cy="46" r="1.8" fill="var(--red)" opacity="0.5" />
        <circle cx="28" cy="60" r="1.8" fill="var(--red)" opacity="0.5" />
        <circle cx="92" cy="60" r="1.8" fill="var(--red)" opacity="0.5" />
        <circle cx="32" cy="74" r="1.8" fill="var(--red)" opacity="0.5" />
        <circle cx="88" cy="74" r="1.8" fill="var(--red)" opacity="0.5" />
        <circle className="dl-glyph-pulse" cx="60" cy="14" r="3.5" fill="var(--red)" />
        <circle cx="60" cy="60" r="3" fill="var(--red)" opacity="0.5" />
      </svg>
    );
  }

  /* ── Protocol item ─────────────────────────────────────────── */
  function ProtocolItem({ p }) {
    const ref = React.useRef(null);
    const onMove = (e) => {
      const r = ref.current.getBoundingClientRect();
      ref.current.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      ref.current.style.setProperty('--my', (e.clientY - r.top) + 'px');
    };
    return (
      <li className="dl-proto" ref={ref} onMouseMove={onMove}>
        <div className="dl-spotlight"></div>
        <div className="dl-proto-head">
          <span className="dl-proto-name">{p.name}</span>
          <span className="dl-proto-status">{p.status}</span>
        </div>
        <p className="dl-proto-detail">{p.detail}</p>
      </li>
    );
  }

  /* ── Main component ────────────────────────────────────────── */
  function HexapodCaseStudy({ project, onBack }) {
    const { lang } = window.useLang();
    const T = window.caseCopy(lang, 'hexapod');
    const U = window.caseUI(lang);
    const MODES = T.modes;
    const PROTOCOLS = T.phases;
    const STACK = T.stack;
    const [mode, setMode]           = React.useState('locomotion');
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
      const onPointer = (e) => { lastTouchRef.current = e.pointerType === 'touch'; };
      window.addEventListener('pointerdown', onPointer, true);
      return () => window.removeEventListener('pointerdown', onPointer, true);
    }, []);

    React.useEffect(() => {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow || !iframe.contentWindow.setModelView) return;
      iframe.contentWindow.setModelView(modelView, lastTouchRef.current);
    }, [modelView]);

    React.useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    React.useEffect(() => {
      const el = document.documentElement;
      const body = document.body;
      if (modelView) {
        el.style.background = 'transparent';
        body.style.background = 'transparent';
      } else {
        el.style.background = '';
        body.style.background = '';
      }
      return () => { el.style.background = ''; body.style.background = ''; };
    }, [modelView]);

    return (
      <div className="dl-wrap" style={{ background: modelView ? 'transparent' : undefined, transition: 'background-color 0.5s ease' }}>
        <HexapodBg iframeRef={iframeRef} lit={modelView} />

        <div className="dl-inner" style={{ pointerEvents: modelView ? 'none' : undefined }}>
          <button className="cs-back" onClick={onBack} style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            {U.back}
          </button>

          <header className="dl-header" style={{ opacity: modelView ? 0 : 1, transition: 'opacity 0.35s ease', pointerEvents: modelView ? 'none' : undefined, willChange: 'opacity' }}>
            <div className="dl-header-left">
              <div className="dl-badges">
                <span className="dl-pill"><span className="dl-pill-dot"></span>{T.pill}</span>
                <span className="dl-pill dl-pill-ghost">{U.brand} / {U.project} 04</span>
              </div>

              <div>
                <h1 className="dl-title">{T.title.map((l, i) => <React.Fragment key={i}>{l}{i < T.title.length - 1 && <br />}</React.Fragment>)}</h1>
                <p className="dl-lead">{T.lead}</p>
              </div>

              <div className="dl-metrics-row">
                <div className="dl-status-pill">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="dl-pill-dot"></span>{T.statusLabel}
                  </span>
                  <span style={{ opacity: 0.5 }}>∙</span>
                  <span>{T.statusSub}</span>
                </div>
                <div className="dl-metrics-strip">
                  {T.metrics.map(([l, v], i) => <div key={i} className="dl-metric"><span className="dl-metric-lbl">{l}</span><span className="dl-metric-val">{v}</span></div>)}
                </div>
              </div>
            </div>

            <div className="dl-card">
              <div className="dl-mode-header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <p className="dl-lbl dl-subtle">{U.mode}</p>
                  <h2 className="dl-mode-title">{md.title}</h2>
                </div>
                <HexapodGlyph />
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>{md.desc}</p>
              <div className="dl-mode-toggle">
                <button className={`dl-mode-btn${mode === 'locomotion'  ? ' active' : ''}`} onClick={() => setMode('locomotion')}>{MODES.locomotion.label}</button>
                <button className={`dl-mode-btn${mode === 'electronics' ? ' active' : ''}`} onClick={() => setMode('electronics')}>{MODES.electronics.label}</button>
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

          <div className="dl-middle" style={{ opacity: modelView ? 0 : 1, transition: 'opacity 0.35s ease', pointerEvents: modelView ? 'none' : undefined, willChange: 'opacity' }}>
            <div className="dl-card dl-control-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 className="dl-lbl">{U.techStack}</h3>
                <span className="dl-lbl dl-subtle">v1.0</span>
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>
                {T.stackText}
              </p>
              <div className="dl-stack-items">
                {STACK.map((item, i) => (
                  <div key={i} className="dl-stack-item">{item}</div>
                ))}
              </div>
            </div>

            <figure className="dl-img-figure">
              <div className="dl-img-wrap">
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HexapodGlyph />
                </div>
                <span className="dl-ring1"></span>
                <span className="dl-ring2"></span>
              </div>
              <figcaption className="dl-figcaption">
                <span>{T.fig[0]}</span>
                <span className="dl-fig-line"><span className="dl-fig-dash"></span>{T.fig[1]}</span>
              </figcaption>
            </figure>

            <div className="dl-card dl-proto-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 className="dl-lbl">{U.phases}</h3>
                <span className="dl-lbl dl-subtle">{U.indexed}</span>
              </div>
              <ul className="dl-protocols">
                {PROTOCOLS.map((p, i) => <ProtocolItem key={i} p={p} />)}
              </ul>
            </div>
          </div>
        </div>

        <aside className={`ctrl-rail${scrolled && !modelView ? ' is-collapsed' : ''}`} aria-label="Assembly controls">
          <span className="rail-spine" aria-hidden="true">{U.railAssembly}</span>
          <span className="rail-cross" aria-hidden="true">+</span>

          <button className={`rail-btn${exploded ? ' is-active' : ''}`} onClick={handleExplode} title="Explode / assemble the model">
            <span className="rail-leader" aria-hidden="true"></span>
            <svg className="rail-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 10.5V4" /><path d="M9.5 6 12 3.5 14.5 6" />
              <path d="M12 13.5V20" /><path d="M9.5 18 12 20.5 14.5 18" />
              <path d="M10.5 12H4" /><path d="M6 9.5 3.5 12 6 14.5" />
              <path d="M13.5 12H20" /><path d="M18 9.5 20.5 12 18 14.5" />
            </svg>
            <span className="rail-label">{exploded ? U.assemble : U.explode}</span>
          </button>

          <button className={`rail-btn rail-btn--view${modelView ? ' is-active' : ''}`} onClick={() => setModelView(v => !v)} title="Enter / exit model view">
            <span className="rail-leader" aria-hidden="true"></span>
            <svg className="rail-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7.5 4.3v9.4L12 21l-7.5-4.3V7.3L12 3z" />
              <path d="M4.5 7.3 12 11.6l7.5-4.3" />
              <path d="M12 11.6V21" />
            </svg>
            <span className="rail-label">{modelView ? U.exitView : U.modelView}</span>
          </button>

          <span className="rail-cross" aria-hidden="true">+</span>
        </aside>
      </div>
    );
  }

  window.HexapodCaseStudy = HexapodCaseStudy;
})();
