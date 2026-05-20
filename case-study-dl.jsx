(function () {

  /* ── Entropy background ─────────────────────────────── */
  function EntropyBg() {
    const ref = React.useRef(null);

    React.useEffect(() => {
      const canvas = ref.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      const N = 480;
      const MOUSE_RADIUS = 140;
      let W, H, particles, spacing, animId, time = 0;
      const mouse = { x: -9999, y: -9999 };

      class Particle {
        constructor(x, y, springK) {
          this.x = x; this.y = y;
          this.homeX = x; this.homeY = y;
          this.springK = springK;
          this.vx = (Math.random() - 0.5) * 2;
          this.vy = (Math.random() - 0.5) * 2;
          this.neighbors = [];
        }
        update() {
          this.vx += (Math.random() - 0.5) * 0.6;
          this.vy += (Math.random() - 0.5) * 0.5;
          this.vx += (this.homeX - this.x) * this.springK;
          this.vy += (this.homeY - this.y) * this.springK;
          const mdx = mouse.x - this.x, mdy = mouse.y - this.y;
          const md = Math.hypot(mdx, mdy);
          if (md < MOUSE_RADIUS && md > 0) {
            const pull = (1 - md / MOUSE_RADIUS) * 0.07;
            this.vx += (mdx / md) * pull;
            this.vy += (mdy / md) * pull;
          }
          this.vx *= 0.95; this.vy *= 0.95;
          const spd = Math.hypot(this.vx, this.vy);
          if (spd > 0.8) { this.vx = this.vx / spd * 0.8; this.vy = this.vy / spd * 0.8; }
          // soft margins: push strays back from right and top
          if (this.x > W * 0.95) this.vx -= (this.x - W * 0.95) * 0.004;
          if (this.y < H * 0.03) this.vy += (H * 0.03 - this.y) * 0.004;
          this.x += this.vx; this.y += this.vy;
          // hard walls: left and bottom only
          if (this.x < 0) { this.vx *= -1; this.x = 0; }
          if (this.y > H) { this.vy *= -1; this.y = H; }
        }
      }

      function init() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width  = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width  = W + 'px';
        canvas.style.height = H + 'px';
        ctx.scale(dpr, dpr);
        spacing = W / 40;
        const r = Math.random;
        const seeds = [
          { x: W * 0.16, y: H * 0.72 },
          { x: W * 0.07, y: H * 0.40 },
          { x: W * 0.29, y: H * 0.62 },
        ];
        const seedRadius = W * 0.28;
        particles = Array.from({ length: N }, () => {
          const sx = W * 0.58 * (1 - Math.pow(r(), 0.6));
          const sy = H * Math.pow(r(), 0.55);
          let minDist = Infinity;
          seeds.forEach(s => { const d = Math.hypot(sx - s.x, sy - s.y); if (d < minDist) minDist = d; });
          const proximity = Math.max(0, 1 - minDist / seedRadius);
          const springK = 0.00005 + Math.pow(proximity, 1.2) * 0.002;
          const scat = (1 - proximity) * spacing * 5;
          const x = sx + (r() - 0.5) * scat;
          const y = sy + (r() - 0.5) * scat;
          return new Particle(x, y, springK);
        });
      }

      function updateNeighbors() {
        const d = spacing * 6;
        particles.forEach(p => {
          p.neighbors = particles.filter(o => o !== p && Math.hypot(p.x - o.x, p.y - o.y) < d);
        });
      }

      function animate() {
        ctx.clearRect(0, 0, W, H);
        if (time % 30 === 0) updateNeighbors();
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        const dd = spacing * 3;
        particles.forEach(p => {
          p.update();
          ctx.fillStyle = dark ? 'rgba(196,54,77,0.55)' : 'rgba(196,54,77,0.28)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
          p.neighbors.forEach(n => {
            const d = Math.hypot(p.x - n.x, p.y - n.y);
            if (d < dd) {
              const a = (dark ? 0.13 : 0.07) * (1 - d / dd);
              ctx.strokeStyle = `rgba(196,54,77,${a})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(n.x, n.y);
              ctx.stroke();
            }
          });
        });
        time++;
        animId = requestAnimationFrame(animate);
      }

      const onMove  = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
      const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
      const onResize = () => { cancelAnimationFrame(animId); init(); time = 0; animate(); };

      window.addEventListener('mousemove',  onMove);
      window.addEventListener('mouseleave', onLeave);
      window.addEventListener('resize',     onResize);
      init();
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove',  onMove);
        window.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('resize',     onResize);
      };
    }, []);

    return React.createElement('canvas', {
      ref,
      style: { position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' },
    });
  }

  const MODES = {
    architecture: {
      title: 'Architecture',
      desc: 'A dual-stream pipeline combining convolutional feature extraction with LSTM temporal encoding — classifying EMG and kinematic signals with clinical-grade precision.',
      items: [
        'Dual-stream CNN feature extractor',
        'Bi-LSTM temporal encoder with attention',
        'Domain-adaptive transfer learning',
      ],
    },
    training: {
      title: 'Training protocol',
      desc: 'Trained on 50K labeled biomechanical signal segments with augmentation. Mixed-precision on A100 cluster with cosine annealing and gradient checkpointing.',
      items: [
        'Mixed precision FP16 + BF16',
        'Cosine annealing LR schedule',
        'Augmentation: noise, time-warp, scale',
      ],
    },
  };

  const PROTOCOLS = [
    { name: 'Data pipeline',     detail: 'Preprocessing 50K EMG segments — normalization, sliding-window extraction at 200 Hz, class-balanced sampling.', status: 'COMPLETE' },
    { name: 'Model training',    detail: '48 h training run on 8×A100. Best checkpoint at epoch 94 with 94.2 % validation accuracy.', status: 'DEPLOYED' },
    { name: 'Clinical validation', detail: 'Prospective validation on 120-patient cohort. IRB-approved, results pending publication.', status: 'ACTIVE' },
  ];

  const STACK = [
    'PyTorch 2.0 + CUDA 12',
    'Bi-directional LSTM',
    'ResNet-18 backbone',
    'Attention mechanism',
    'FDA SaMD pathway',
  ];

  /* ── Neural-net canvas ──────────────────────────────── */
  function NeuralNetCanvas() {
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
        ctx.scale(dpr, dpr);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const LAYERS = [2, 4, 6, 6, 4, 2];

      const draw = () => {
        t += 0.007;
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';

        const xs = LAYERS.map((_, i) => (i + 1) * w / (LAYERS.length + 1));
        const nodes = LAYERS.map((count, li) =>
          Array.from({ length: count }, (_, ni) => ({
            x: xs[li],
            y: h / 2 + (ni - (count - 1) / 2) * (h / (Math.max(...LAYERS) + 1)),
            li, ni,
          }))
        );

        /* connections */
        for (let li = 0; li < nodes.length - 1; li++) {
          for (const src of nodes[li]) {
            for (const dst of nodes[li + 1]) {
              const p = Math.sin(t * 3 - li * 0.8 + src.ni * 0.4) * 0.5 + 0.5;
              ctx.beginPath();
              ctx.moveTo(src.x, src.y);
              ctx.lineTo(dst.x, dst.y);
              ctx.strokeStyle = dark
                ? `rgba(196,54,77,${0.05 + p * 0.13})`
                : `rgba(196,54,77,${0.07 + p * 0.10})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        /* nodes */
        nodes.forEach(layer => {
          layer.forEach(n => {
            const p = Math.sin(t * 2 + n.li * 0.6 + n.ni * 0.8) * 0.5 + 0.5;
            const edge = n.li === 0 || n.li === LAYERS.length - 1;
            const r = edge ? 5 : 4;
            const [cr, cg, cb] = edge ? [196, 54, 77] : [46, 92, 154];

            const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r + 5);
            grad.addColorStop(0, `rgba(${cr},${cg},${cb},${0.25 + p * 0.3})`);
            grad.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
            ctx.globalAlpha = 0.55 + p * 0.45;
            ctx.fill();
            ctx.globalAlpha = 1;
          });
        });

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

  /* ── Orbital glyph ──────────────────────────────────── */
  function DeckGlyph() {
    return (
      <svg viewBox="0 0 120 120" className="dl-deck-glyph" aria-hidden="true">
        <circle className="dl-glyph-orbit" cx="60" cy="60" r="46" fill="none" strokeWidth="1.4" stroke="var(--red)" />
        <rect   className="dl-glyph-rect"  x="34" y="34" width="52" height="52" rx="14" strokeWidth="1.2" stroke="var(--red)" fill="none" />
        <circle cx="60" cy="60" r="7" fill="var(--red)" />
        <path   className="dl-glyph-pulse" d="M60 30v10M60 80v10M30 60h10M80 60h10" strokeWidth="1.4" strokeLinecap="round" stroke="var(--red)" fill="none" />
      </svg>
    );
  }

  /* ── Protocol item ──────────────────────────────────── */
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

  /* ── Main component ─────────────────────────────────── */
  function DeepLearningCaseStudy({ project, onBack }) {
    const [mode, setMode] = React.useState('architecture');
    const md = MODES[mode];

    return (
      <div className="dl-wrap">
        <EntropyBg />
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
                <span className="dl-pill"><span className="dl-pill-dot"></span>Deep Learning</span>
                <span className="dl-pill dl-pill-ghost">BIO MECH / PROJECT 01</span>
              </div>

              <div>
                <h1 className="dl-title">
                  Deep learning for<br />
                  biomechanical signal<br />
                  classification.
                </h1>
                <p className="dl-lead">
                  A dual-stream neural architecture combining convolutional feature extraction with temporal LSTM encoding — classifying EMG and kinematic signals with clinical-grade precision across 50K labeled segments.
                </p>
              </div>

              <div className="dl-metrics-row">
                <div className="dl-status-pill">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="dl-pill-dot"></span>Model deployed
                  </span>
                  <span style={{ opacity: 0.5 }}>∙</span>
                  <span>FDA SaMD pathway</span>
                </div>
                <div className="dl-metrics-strip">
                  <div className="dl-metric"><span className="dl-metric-lbl">Accuracy</span><span className="dl-metric-val">94.2%</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">Epochs</span><span className="dl-metric-val">94</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">Dataset</span><span className="dl-metric-val">50K</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">Latency</span><span className="dl-metric-val">12ms</span></div>
                </div>
              </div>
            </div>

            {/* Mode card */}
            <div className="dl-card">
              <div className="dl-mode-header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <p className="dl-lbl dl-subtle">Mode</p>
                  <h2 className="dl-mode-title">{md.title}</h2>
                </div>
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>{md.desc}</p>
              <div className="dl-mode-toggle">
                <button className={`dl-mode-btn${mode === 'architecture' ? ' active' : ''}`} onClick={() => setMode('architecture')}>Architecture</button>
                <button className={`dl-mode-btn${mode === 'training'     ? ' active' : ''}`} onClick={() => setMode('training')}>Training</button>
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

          {/* ── Middle ── */}
          <div className="dl-middle">

            <div className="dl-card dl-control-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 className="dl-lbl">Tech stack</h3>
                <span className="dl-lbl dl-subtle">v2.0</span>
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>
                PyTorch-native pipeline with a ResNet-18 CNN backbone feeding into a bidirectional LSTM. Attention gates select clinically relevant temporal windows for final classification.
              </p>
              <div className="dl-stack-items">
                {STACK.map((item, i) => <div key={i} className="dl-stack-item">{item}</div>)}
              </div>
            </div>

            <figure className="dl-img-figure">
              <div className="dl-img-wrap">
                <NeuralNetCanvas />
                <span className="dl-ring1"></span>
                <span className="dl-ring2"></span>
              </div>
              <figcaption className="dl-figcaption">
                <span>Neural architecture</span>
                <span className="dl-fig-line"><span className="dl-fig-dash"></span>CNN + Bi-LSTM</span>
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
      </div>
    );
  }

  window.DeepLearningCaseStudy = DeepLearningCaseStudy;
})();
