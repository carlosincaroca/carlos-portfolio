(function () {

  /* ── Merged rover + arm 3D viewer (one iframe, ROVER|ARM model toggle) ── */
  function RoverBg({ iframeRef, lit }) {
    return (
      <div className={lit ? 'cs-bg-3d lit' : 'cs-bg-3d'} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: lit ? 'auto' : 'none' }}>
        <iframe
          ref={iframeRef}
          src="./rover-bg.html?v=1"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', opacity: lit ? 1 : 0.92, transition: 'opacity 0.5s ease' }}
        />
      </div>
    );
  }

  /* The two 3D models the viewer toggles between (rover leads). */
  const MODEL_ORDER = ['rover', 'arm'];
  const MODEL_LABEL = { rover: 'Rover', arm: 'Arm' };

  /* ── Content (arm-centric — the real engineering — lightly rover-framed).
     This does NOT change with the model toggle; only the 3D model swaps. ── */
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

  /* ── Kinematic-diagram canvas (articulated arm sweep) ──── */
  function ArmCanvas() {
    const ref = React.useRef(null);

    React.useEffect(() => {
      const canvas = ref.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let raf, t = 0;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width  = canvas.offsetWidth  * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const draw = () => {
        t += 0.01;
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';

        const reach = Math.min(w, h) * 0.62;
        const L = [reach * 0.42, reach * 0.34, reach * 0.22]; // link lengths
        const bx = w / 2, by = h * 0.80;                      // shoulder base

        const ink = dark ? 'rgba(200,212,224,0.85)' : 'hsl(215,28%,22%)';
        const red = dark ? '#C4364D' : '#5A0A14';

        // Reach envelope — dashed arc the end-effector can reach
        const maxLen = L[0] + L[1] + L[2];
        ctx.beginPath();
        ctx.arc(bx, by, maxLen, Math.PI, Math.PI * 2);
        ctx.setLineDash([3, 5]);
        ctx.strokeStyle = dark ? 'rgba(196,54,77,0.22)' : 'rgba(196,54,77,0.30)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);

        // Forward kinematics — joint angles oscillate to sweep the workspace
        const a1 = -Math.PI / 2 + 0.6 * Math.sin(t * 0.6);
        const a2 = a1 + (-1.05 + 0.7 * Math.sin(t * 0.8 + 1));
        const a3 = a2 + (-0.5 + 0.5 * Math.sin(t * 1.0 + 2));
        const angs = [a1, a2, a3];

        const pts = [{ x: bx, y: by }];
        let cx = bx, cy = by;
        for (let i = 0; i < 3; i++) {
          cx += Math.cos(angs[i]) * L[i];
          cy += Math.sin(angs[i]) * L[i];
          pts.push({ x: cx, y: cy });
        }

        // Base plinth
        ctx.beginPath();
        ctx.moveTo(bx - 16, by + 6); ctx.lineTo(bx + 16, by + 6);
        ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke();

        // Links
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
          ctx.strokeStyle = ink;
          ctx.lineWidth = 4 - i;       // taper toward the wrist
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Joints
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(pts[i].x, pts[i].y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = dark ? '#0b0e16' : '#F4F0E8';
          ctx.fill();
          ctx.strokeStyle = red; ctx.lineWidth = 1.5; ctx.stroke();
        }

        // End-effector (gripper) with glow
        const ee = pts[3];
        const glow = ctx.createRadialGradient(ee.x, ee.y, 0, ee.x, ee.y, 14);
        glow.addColorStop(0, 'rgba(196,54,77,0.5)');
        glow.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(ee.x, ee.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
        // jaws
        const ja = angs[2];
        const open = 5 + 2.5 * Math.sin(t * 2.2);
        const nx = Math.cos(ja + Math.PI / 2), ny = Math.sin(ja + Math.PI / 2);
        const tx = Math.cos(ja), ty = Math.sin(ja);
        [-1, 1].forEach((s) => {
          ctx.beginPath();
          ctx.moveTo(ee.x + nx * open * s, ee.y + ny * open * s);
          ctx.lineTo(ee.x + nx * open * s + tx * 7, ee.y + ny * open * s + ty * 7);
          ctx.strokeStyle = red; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke();
        });
        ctx.beginPath(); ctx.arc(ee.x, ee.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = red; ctx.fill();

        raf = requestAnimationFrame(draw);
      };
      draw();

      return () => { cancelAnimationFrame(raf); ro.disconnect(); };
    }, []);

    return React.createElement('canvas', {
      ref,
      style: { position: 'absolute', inset: 0, width: '100%', height: '100%' },
    });
  }

  /* ── Tech-stack + project-phase content (placeholder — fill later) ── */
  const STACK = [
    'Rocker-bogie suspension',
    'RTG power system',
    'ROS 2 autonomy stack',
    'Multi-spectral imager',
    'NASA-JPL heritage design',
  ];

  const PROTOCOLS = [
    { name: 'Mechanical design',  detail: 'Full-system CAD with FEA-validated chassis. Thermal cycling validated at –120 °C to +40 °C simulating Martian diurnal range.', status: 'COMPLETE' },
    { name: 'Autonomy stack',     detail: 'Visual odometry + terrain-relative navigation. ROS 2 path planner with obstacle avoidance tested on Mars-analogue terrain (Atacama Desert).', status: 'ACTIVE' },
    { name: 'Sample system',      detail: 'Rock core drill and hermetic sample container. Contamination protocols per COSPAR planetary protection category IVa.', status: 'IN PROGRESS' },
  ];

  /* ── Protocol item (spotlight hover) ──────────────────── */
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

  /* ── Main component ────────────────────────────────────── */
  function MarsRoverCaseStudy({ project, onBack }) {
    const [mode, setMode]               = React.useState('manipulation');
    const [activeModel, setActiveModel] = React.useState('rover');  // 3D model shown (rover leads)
    const [exploded, setExploded]       = React.useState(false);
    const [modelView, setModelView]     = React.useState(false);
    const [scrolled, setScrolled]       = React.useState(false);
    const iframeRef                     = React.useRef(null);
    const lastTouchRef                  = React.useRef(false);
    const md = MODES[mode];

    /* Swap the 3D model in the viewer (page content stays put). Switching
       resets the explode, so clear our explode state too. */
    const driveModel = (name) => {
      setActiveModel(name);
      setExploded(false);
      const f = iframeRef.current;
      if (f && f.contentWindow && f.contentWindow.setModel) f.contentWindow.setModel(name);
    };

    const handleExplode = () => {
      const f = iframeRef.current;
      if (!f || !f.contentWindow || !f.contentWindow.toggleExplode) return;
      setExploded(f.contentWindow.toggleExplode() === 1);
    };

    /* Keep the rail in sync if the model/explode changes inside the iframe. */
    React.useEffect(() => {
      const onMsg = (e) => {
        if (!e.data || e.data.type !== 'rover-model') return;
        if (MODEL_LABEL[e.data.name]) setActiveModel(e.data.name);
        if (typeof e.data.exploded === 'boolean') setExploded(e.data.exploded);
      };
      window.addEventListener('message', onMsg);
      return () => window.removeEventListener('message', onMsg);
    }, []);

    React.useEffect(() => {
      const f = iframeRef.current;
      if (f && f.contentWindow && f.contentWindow.setModelView) f.contentWindow.setModelView(modelView, lastTouchRef.current);
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
      const el = document.documentElement, body = document.body;
      if (modelView) { el.style.background = 'transparent'; body.style.background = 'transparent'; }
      else { el.style.background = ''; body.style.background = ''; }
      return () => { el.style.background = ''; body.style.background = ''; };
    }, [modelView]);

    return (
      <div className="dl-wrap" style={{ background: modelView ? 'transparent' : undefined, transition: 'background-color 0.5s ease' }}>
        <RoverBg iframeRef={iframeRef} lit={modelView} />

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
                <span className="dl-pill"><span className="dl-pill-dot"></span>Mars Rover · Sampling Arm</span>
                <span className="dl-pill dl-pill-ghost">BIO MECH / PROJECT 03</span>
              </div>

              <div>
                <h1 className="dl-title">Robotic sampling<br />arm.</h1>
                <p className="dl-lead">
                  A six-degree-of-freedom manipulator with a force-sensing parallel-jaw gripper and harmonic-drive joints — engineered to collect, cache, and transfer rock-core samples for the BYU Mars Rover's science payload. Toggle the viewer between the full rover platform and the arm itself.
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

          <div className="dl-middle" style={{ opacity: modelView ? 0 : 1, transition: 'opacity 0.35s ease', pointerEvents: modelView ? 'none' : undefined, willChange: 'opacity' }}>
            <div className="dl-card dl-control-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 className="dl-lbl">Tech stack</h3>
                <span className="dl-lbl dl-subtle">v1.0</span>
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>
                Rocker-bogie suspension with RTG power, ROS 2 navigation, and a multi-spectral imaging + in-situ geochemistry payload. Chassis FEA-validated for Martian thermal and mechanical loads.
              </p>
              <div className="dl-stack-items">
                {STACK.map((item, i) => (
                  <div key={i} className="dl-stack-item">{item}</div>
                ))}
              </div>
            </div>

            <figure className="dl-img-figure">
              <div className="dl-img-wrap">
                <ArmCanvas />
                <span className="dl-ring1"></span>
                <span className="dl-ring2"></span>
              </div>
              <figcaption className="dl-figcaption">
                <span>Kinematic diagram</span>
                <span className="dl-fig-line"><span className="dl-fig-dash"></span>6-DOF reach envelope</span>
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

        <aside className={`ctrl-rail${scrolled && !modelView ? ' is-collapsed' : ''}`} aria-label="Model controls">
          <span className="rail-spine" aria-hidden="true">Model · Ctrl</span>
          <span className="rail-cross" aria-hidden="true">+</span>

          {MODEL_ORDER.map((m) => (
            <button key={m} className={`rail-btn${activeModel === m ? ' is-active' : ''}`} onClick={() => driveModel(m)} title={`Show the ${MODEL_LABEL[m].toLowerCase()}`}>
              <span className="rail-leader" aria-hidden="true"></span>
              <span className="rail-ico" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700 }}>{MODEL_LABEL[m][0]}</span>
              <span className="rail-label">{MODEL_LABEL[m]}</span>
            </button>
          ))}

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

  window.MarsRoverCaseStudy = MarsRoverCaseStudy;
})();
