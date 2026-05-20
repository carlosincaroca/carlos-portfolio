/* ── Blueprint centre visualisation ───────────────────── */
function ProjectBlueprintViz({ project }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '20px 20px', animation: 'grid-drift 20s linear infinite' }}></div>
      <span className="reg-mark tl">+</span>
      <span className="reg-mark tr">+</span>
      <span className="reg-mark bl">+</span>
      <span className="reg-mark br">+</span>
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', padding: '2rem' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(5rem, 14vw, 10rem)', fontWeight: 900, opacity: 0.12, lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none' }}>
          {String(project.id).padStart(2, '0')}
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.45, marginTop: '1.5rem' }}>
          {project.category} — REV 1.0
        </div>
      </div>
    </div>
  );
}

/* ── Protocol item with spotlight ─────────────────────── */
function ProtocolItem({ p }) {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    ref.current.style.setProperty('--my', (e.clientY - r.top)  + 'px');
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

/* ── Main case study ──────────────────────────────────── */
function CaseStudy({ project, onBack }) {
  const d = project.detail;
  const [mode, setMode] = React.useState('a');
  const md = d ? (mode === 'a' ? d.modeA : d.modeB) : null;

  const metrics = d
    ? d.metrics
    : Object.entries(project.specs).map(([k, v]) => ({ lbl: k, val: v }));

  const stack = d ? d.stack : Object.keys(project.specs);

  const protocols = d ? d.protocols : [
    { name: 'Concept design',   detail: 'Engineering requirements and design inputs from clinical need analysis.', status: 'COMPLETE'     },
    { name: 'Prototype build',  detail: 'Bench-level fabrication and initial feasibility testing.',                status: 'IN PROGRESS' },
    { name: 'Validation',       detail: 'Performance verification and clinical validation per applicable standards.', status: 'PENDING'  },
  ];

  const lead = d ? d.lead : `Advanced ${project.category.toLowerCase()} system engineered for precision biomedical application with rigorous clinical validation.`;
  const statusLabel = d ? d.statusLabel : 'In development';
  const statusSub   = d ? d.statusSub   : project.category;

  return (
    <div className="dl-wrap">
      <div className="dl-bg-glow"></div>

      <div className="dl-inner">
        <button className="cs-back" onClick={onBack} style={{ position: 'relative', zIndex: 10 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          BACK TO INDEX
        </button>

        {/* ── Header ── */}
        <header className="dl-header">
          <div className="dl-header-left">
            <div className="dl-badges">
              <span className="dl-pill"><span className="dl-pill-dot"></span>{project.category}</span>
              <span className="dl-pill dl-pill-ghost">BIO MECH / PROJECT {String(project.id).padStart(2, '0')}</span>
            </div>

            <div>
              <h1 className="dl-title">{project.title.split(' ').map((w, i) => <span key={i}>{w}<br /></span>)}</h1>
              <p className="dl-lead">{lead}</p>
            </div>

            <div className="dl-metrics-row">
              <div className="dl-status-pill">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="dl-pill-dot"></span>{statusLabel}
                </span>
                <span style={{ opacity: 0.5 }}>∙</span>
                <span>{statusSub}</span>
              </div>
              <div className="dl-metrics-strip">
                {metrics.map((m, i) => (
                  <div key={i} className="dl-metric">
                    <span className="dl-metric-lbl">{m.lbl}</span>
                    <span className="dl-metric-val">{m.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mode card */}
          {d && (
            <div className="dl-card">
              <div className="dl-mode-header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <p className="dl-lbl dl-subtle">Mode</p>
                  <h2 className="dl-mode-title">{md.title}</h2>
                </div>
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>{md.desc}</p>
              <div className="dl-mode-toggle">
                <button className={`dl-mode-btn${mode === 'a' ? ' active' : ''}`} onClick={() => setMode('a')}>{d.modeA.label}</button>
                <button className={`dl-mode-btn${mode === 'b' ? ' active' : ''}`} onClick={() => setMode('b')}>{d.modeB.label}</button>
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
          )}
        </header>

        {/* ── Middle ── */}
        <div className="dl-middle">

          <div className="dl-card dl-control-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 className="dl-lbl">Tech stack</h3>
              <span className="dl-lbl dl-subtle">v1.0</span>
            </div>
            <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>
              Core materials, tools, and standards underpinning the engineering and regulatory pathway for this device.
            </p>
            <div className="dl-stack-items">
              {stack.map((item, i) => <div key={i} className="dl-stack-item">{item}</div>)}
            </div>
          </div>

          <figure className="dl-img-figure">
            <div className="dl-img-wrap">
              <ProjectBlueprintViz project={project} />
              <span className="dl-ring1"></span>
              <span className="dl-ring2"></span>
            </div>
            <figcaption className="dl-figcaption">
              <span>{project.title}</span>
              <span className="dl-fig-line"><span className="dl-fig-dash"></span>{project.flow}</span>
            </figcaption>
          </figure>

          <div className="dl-card dl-proto-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 className="dl-lbl">Project phases</h3>
              <span className="dl-lbl dl-subtle">Indexed</span>
            </div>
            <ul className="dl-protocols">
              {protocols.map((p, i) => <ProtocolItem key={i} p={p} />)}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

window.CaseStudy = CaseStudy;
