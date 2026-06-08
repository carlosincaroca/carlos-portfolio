(function () {

  /* ── Mini-rover iframe background ─────────────────────────── */
  function MiniRoverBg({ iframeRef, lit }) {
    return (
      <div className={lit ? 'cs-bg-3d lit' : 'cs-bg-3d'} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: lit ? 'auto' : 'none' }}>
        <iframe
          ref={iframeRef}
          src="./mini-rover-bg.html?v=121"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', opacity: lit ? 1 : 0.92, transition: 'opacity 0.5s ease' }}
        />
      </div>
    );
  }

  /* ── Mode content ──────────────────────────────────────────── */
  const MODES = {
    ventilation: {
      title: 'Ventilation modes',
      desc: 'Pressure-support, volume-control, and CPAP modes with auto-PEEP detection. Breath-by-breath adaptive triggering for patient synchrony.',
      items: ['PSV / VCV / CPAP modes', 'Auto-PEEP detection', 'Adaptive triggering <5ms'],
    },
    monitoring: {
      title: 'Monitoring system',
      desc: 'Continuous SpO₂, ETCO₂, and respiratory mechanics tracking. Alarm escalation with cloud telemetry for remote clinician review.',
      items: ['SpO₂ + ETCO₂ sensing', 'Respiratory mechanics loop', 'Cloud telemetry dashboard'],
    },
  };

  const PROTOCOLS = [
    { name: 'Bench testing',   detail: 'ASL 5000 lung simulator testing across 40 patient conditions. Trigger delay, leak compensation, and alarm validation.', status: 'COMPLETE' },
    { name: 'Clinical study',  detail: '30-patient step-down ICU study. Primary: patient-ventilator synchrony score vs standard of care.', status: 'COMPLETE' },
    { name: 'FDA submission',  detail: '510(k) predicate comparison submitted. Awaiting additional performance data request response.', status: 'ACTIVE' },
  ];

  const STACK = ['Turbine blower', 'PID flow control', 'LabVIEW FPGA', 'ISO 80601-2-12', 'FDA 510(k)'];

  /* ── Lung glyph SVG ────────────────────────────────────────── */
  function LungGlyph() {
    return (
      <svg viewBox="0 0 120 120" className="dl-deck-glyph" aria-hidden="true">
        <circle className="dl-glyph-orbit" cx="60" cy="60" r="46" fill="none" strokeWidth="1.4" stroke="var(--red)" />
        {/* Trachea */}
        <line x1="60" y1="20" x2="60" y2="48" stroke="var(--red)" strokeWidth="1.4" opacity="0.7" />
        {/* Left bronchus */}
        <path d="M60 48 Q44 52 38 62" fill="none" stroke="var(--red)" strokeWidth="1.2" opacity="0.7" />
        {/* Right bronchus */}
        <path d="M60 48 Q76 52 82 62" fill="none" stroke="var(--red)" strokeWidth="1.2" opacity="0.7" />
        {/* Left lung lobe */}
        <ellipse cx="38" cy="74" rx="14" ry="18" fill="none" stroke="var(--red)" strokeWidth="1.1" opacity="0.45" />
        {/* Right lung lobe */}
        <ellipse cx="82" cy="74" rx="14" ry="18" fill="none" stroke="var(--red)" strokeWidth="1.1" opacity="0.45" />
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
  function RespiratoryCaseStudy({ project, onBack }) {
    const [mode, setMode]           = React.useState('ventilation');
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
        <MiniRoverBg iframeRef={iframeRef} lit={modelView} />

        <div className="dl-inner" style={{ pointerEvents: modelView ? 'none' : undefined }}>
          <button className="cs-back" onClick={onBack} style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            BACK TO INDEX
          </button>

          <header className="dl-header" style={{ opacity: modelView ? 0 : 1, transition: 'opacity 0.35s ease', pointerEvents: modelView ? 'none' : undefined, willChange: 'opacity' }}>
            <div className="dl-header-left">
              <div className="dl-badges">
                <span className="dl-pill"><span className="dl-pill-dot"></span>Robotics / Autonomous Systems</span>
                <span className="dl-pill dl-pill-ghost">BIO MECH / PROJECT 05</span>
              </div>

              <div>
                <h1 className="dl-title">
                  Multi-task<br />
                  autonomous<br />
                  robot.
                </h1>
                <p className="dl-lead">
                  A portable ventilatory assist device delivering up to 15 L/min at 25 cmH₂O with auto-compliance sensing — designed for step-down care and home ventilation in COPD and post-surgical patients.
                </p>
              </div>

              <div className="dl-metrics-row">
                <div className="dl-status-pill">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="dl-pill-dot"></span>FDA review
                  </span>
                  <span style={{ opacity: 0.5 }}>∙</span>
                  <span>510(k) submission filed</span>
                </div>
                <div className="dl-metrics-strip">
                  <div className="dl-metric"><span className="dl-metric-lbl">Flow</span><span className="dl-metric-val">15L/min</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">Pressure</span><span className="dl-metric-val">25cmH₂O</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">FiO₂</span><span className="dl-metric-val">21–100%</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">Compliance</span><span className="dl-metric-val">AUTO</span></div>
                </div>
              </div>
            </div>

            <div className="dl-card">
              <div className="dl-mode-header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <p className="dl-lbl dl-subtle">Mode</p>
                  <h2 className="dl-mode-title">{md.title}</h2>
                </div>
                <LungGlyph />
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>{md.desc}</p>
              <div className="dl-mode-toggle">
                <button className={`dl-mode-btn${mode === 'ventilation' ? ' active' : ''}`} onClick={() => setMode('ventilation')}>Ventilation</button>
                <button className={`dl-mode-btn${mode === 'monitoring'  ? ' active' : ''}`} onClick={() => setMode('monitoring')}>Monitoring</button>
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
                <h3 className="dl-lbl">Tech stack</h3>
                <span className="dl-lbl dl-subtle">v1.0</span>
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>
                Turbine blower with PID flow control and LabVIEW FPGA closed-loop sensing. Breath-by-breath adaptive triggering validated on ASL 5000 lung simulator.
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
                  <LungGlyph />
                </div>
                <span className="dl-ring1"></span>
                <span className="dl-ring2"></span>
              </div>
              <figcaption className="dl-figcaption">
                <span>Assembly diagram</span>
                <span className="dl-fig-line"><span className="dl-fig-dash"></span>Mechanical system</span>
              </figcaption>
            </figure>

            <div className="dl-card dl-proto-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 className="dl-lbl">Project phases</h3>
                <span className="dl-lbl dl-subtle">Indexed</span>
              </div>
              <ul className="dl-protocols">
                {PROTOCOLS.map((p, i) => <ProtocolItem key={i} p={p} />)}
              </ul>
            </div>
          </div>
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

  window.RespiratoryCaseStudy = RespiratoryCaseStudy;
})();
