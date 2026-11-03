(function () {

  /* ── Sketchfab background ──────────────────────────────── */
  function SpineBg() {
    const iframeRef = React.useRef(null);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const tryInit = () => {
        if (!window.Sketchfab) { setTimeout(tryInit, 100); return; }
        const client = new window.Sketchfab(iframe);
        client.init('c429dcefb2a3423ea0438f0d661b4c4a', {
          ui_infos: 0, ui_controls: 0, ui_annotations: 0, ui_stop: 0,
          ui_watermark: 0, ui_help: 0, ui_settings: 0, ui_vr: 0, ui_ar: 0,
          ui_fullscreen: 0, ui_inspector: 0, ui_hint: 0,
          annotations_visible: 0,
          autostart: 1, preload: 1, transparent: 1, autospin: 0.2,
          success: function (api) {
            api.start();
            api.addEventListener('viewerready', function () {
              if (typeof api.setAnnotationsVisible === 'function') api.setAnnotationsVisible(false);
              setTimeout(function () {
                api.setCameraLookAt(
                  [-2.361382237470148, 2.41296282649552, 2.765608101763667],
                  [-0.6459299352, 0.8253798259000004, 2.5054933113999995],
                  1.0
                );
                setVisible(true);
              }, 300);
            });
          },
          error: function () { console.warn('Sketchfab viewer error'); },
        });
      };
      tryInit();
    }, []);

    return (
      <div className="cs-bg-3d" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <iframe
          ref={iframeRef}
          src=""
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none',
            opacity: visible ? 0.88 : 0,
            transition: 'opacity 1.2s ease',
          }}
        />
        {/* Cover the Sketchfab watermark at bottom-left */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 200, height: 56,
          background: 'var(--paper)',
        }} />
      </div>
    );
  }

  /* ── Mode content ──────────────────────────────────────── */



  /* ── Spine glyph SVG ───────────────────────────────────── */
  function SpineGlyph() {
    return (
      <svg viewBox="0 0 120 120" className="dl-deck-glyph" aria-hidden="true">
        <circle className="dl-glyph-orbit" cx="60" cy="60" r="46" fill="none" strokeWidth="1.4" stroke="var(--red)" />
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} x="44" y={17 + i * 13} width="32" height="8" rx="2"
            fill="none" stroke="var(--red)" strokeWidth="1.1" opacity={0.3 + i * 0.1} />
        ))}
        <line x1="60" y1="12" x2="60" y2="108" stroke="var(--red)" strokeWidth="0.8" opacity="0.22" />
        <circle className="dl-glyph-pulse" cx="60" cy="14" r="3.5" fill="var(--red)" />
      </svg>
    );
  }

  /* ── Protocol item ─────────────────────────────────────── */
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

  /* ── Main component ────────────────────────────────────── */
  function SpineExoskeletonCaseStudy({ project, onBack }) {
    const { lang } = window.useLang();
    const T = window.caseCopy(lang, 'neuro');
    const U = window.caseUI(lang);
    const MODES = T.modes;
    const PROTOCOLS = T.phases;
    const STACK = T.stack;
    const [mode, setMode] = React.useState('mechanical');
    const md = MODES[mode];

    return (
      <div className="dl-wrap">
        <SpineBg />

        <div className="dl-inner">
          <button className="cs-back" onClick={onBack} style={{ position: 'relative', zIndex: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            {U.back}
          </button>

          <header className="dl-header">
            <div className="dl-header-left">
              <div className="dl-badges">
                <span className="dl-pill"><span className="dl-pill-dot"></span>{T.pill}</span>
                <span className="dl-pill dl-pill-ghost">{U.brand} / {U.project} 02</span>
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
                <SpineGlyph />
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>{md.desc}</p>
              <div className="dl-mode-toggle">
                <button className={`dl-mode-btn${mode === 'mechanical' ? ' active' : ''}`} onClick={() => setMode('mechanical')}>{MODES.mechanical.label}</button>
                <button className={`dl-mode-btn${mode === 'clinical'   ? ' active' : ''}`} onClick={() => setMode('clinical')}>{MODES.clinical.label}</button>
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

          <div className="dl-middle">
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
                  <SpineGlyph />
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
      </div>
    );
  }

  window.SpineExoskeletonCaseStudy = SpineExoskeletonCaseStudy;
})();
