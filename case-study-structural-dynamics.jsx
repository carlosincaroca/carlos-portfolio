(function () {

  /* ── Modal viewer iframe background ───────────────────────────── */
  function StructuralDynamicsBg({ iframeRef, lit }) {
    return (
      <div className={lit ? 'cs-bg-3d lit' : 'cs-bg-3d'} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: lit ? 'auto' : 'none' }}>
        <iframe
          ref={iframeRef}
          src="./structural-dynamics-bg.html?v=4"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', opacity: lit ? 1 : 0.92, transition: 'opacity 0.5s ease' }}
        />
      </div>
    );
  }

  /* ── Specimen content ─────────────────────────────────────────── */
  const SPEC_ORDER = ['beam', 'fork', 'gear'];



  /* ── Protocol item (spotlight hover) ──────────────────────────── */
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

  /* ── Main component ───────────────────────────────────────────── */
  function StructuralDynamicsCaseStudy({ project, onBack }) {
    const { lang } = window.useLang();
    const T = window.caseCopy(lang, 'struct');
    const U = window.caseUI(lang);
    const SPECS = T.specimens;
    const PHASES = T.phases;
    const STACK = T.stack;
    const [spec, setSpec]           = React.useState('beam');
    const [modelView, setModelView] = React.useState(false);
    const [scrolled, setScrolled]   = React.useState(false);
    const iframeRef                 = React.useRef(null);
    const lastTouchRef              = React.useRef(false);
    const sd = SPECS[spec];

    const driveSpecimen = (name) => {
      setSpec(name);
      const f = iframeRef.current;
      if (f && f.contentWindow && f.contentWindow.setSpecimen) f.contentWindow.setSpecimen(name);
    };

    React.useEffect(() => {
      const onPointer = (e) => { lastTouchRef.current = e.pointerType === 'touch'; };
      window.addEventListener('pointerdown', onPointer, true);
      return () => window.removeEventListener('pointerdown', onPointer, true);
    }, []);

    // Keep the React toggle in sync when the specimen is changed from inside
    // the iframe's own tabs (iframe → parent via postMessage).
    React.useEffect(() => {
      const onMsg = (e) => {
        if (e.data && e.data.type === 'sd-specimen' && SPECS[e.data.name]) setSpec(e.data.name);
      };
      window.addEventListener('message', onMsg);
      return () => window.removeEventListener('message', onMsg);
    }, []);

    React.useEffect(() => {
      const f = iframeRef.current;
      if (f && f.contentWindow && f.contentWindow.setModelView) f.contentWindow.setModelView(modelView, lastTouchRef.current);
    }, [modelView]);

    React.useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    React.useEffect(() => {
      const el = document.documentElement, body = document.body;
      if (modelView) { el.style.background = 'transparent'; body.style.background = 'transparent'; }
      else { el.style.background = ''; body.style.background = ''; }
      return () => { el.style.background = ''; body.style.background = ''; };
    }, [modelView]);

    return (
      <div className="dl-wrap" style={{ background: modelView ? 'transparent' : undefined, transition: 'background-color 0.5s ease' }}>
        <StructuralDynamicsBg iframeRef={iframeRef} lit={modelView} />

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
                <span className="dl-pill dl-pill-ghost">FEA / {U.project} 07</span>
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
                  <a href="assets/papers/IMAC2026_Trapped_Powder_Dampers.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px', pointerEvents: 'auto' }}>{T.paperLink}</a>
                </div>
                <div className="dl-metrics-strip">
                  {T.metrics.map(([l, v], i) => <div key={i} className="dl-metric"><span className="dl-metric-lbl">{l}</span><span className="dl-metric-val">{v}</span></div>)}
                </div>
              </div>
            </div>

            <div className="dl-card">
              <div className="dl-mode-header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <p className="dl-lbl dl-subtle">{U.specimen} · {sd.tag}</p>
                  <h2 className="dl-mode-title">{sd.title}</h2>
                </div>
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>{sd.desc}</p>
              <div className="dl-mode-toggle">
                {SPEC_ORDER.map((n) => (
                  <button key={n} className={`dl-mode-btn${spec === n ? ' active' : ''}`} onClick={() => driveSpecimen(n)}>{SPECS[n].label}</button>
                ))}
              </div>
              <ul className="dl-mode-items">
                {sd.items.map((item, i) => (
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
                {STACK.map((item, i) => <div key={i} className="dl-stack-item">{item}</div>)}
              </div>
            </div>

            <figure className="dl-img-figure">
              <div className="dl-img-wrap">
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', fontFamily: 'monospace', fontSize: '13px', letterSpacing: '0.12em' }}>
                  η = Σ ηᵢ · Fᵢ
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
                {PHASES.map((p, i) => <ProtocolItem key={i} p={p} />)}
              </ul>
            </div>
          </div>
        </div>

        <aside className={`ctrl-rail${scrolled && !modelView ? ' is-collapsed' : ''}`} aria-label="Specimen controls">
          <span className="rail-spine" aria-hidden="true">{U.railSpecimen}</span>
          <span className="rail-cross" aria-hidden="true">+</span>

          {SPEC_ORDER.map((n) => (
            <button key={n} className={`rail-btn${spec === n ? ' is-active' : ''}`} onClick={() => driveSpecimen(n)} title={SPECS[n].label}>
              <span className="rail-leader" aria-hidden="true"></span>
              <span className="rail-ico" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700 }}>{SPECS[n].label[0]}</span>
              <span className="rail-label">{SPECS[n].label}</span>
            </button>
          ))}

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

  window.StructuralDynamicsCaseStudy = StructuralDynamicsCaseStudy;
})();
