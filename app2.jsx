/* ============================================================
   App — hero + sticky scroll + index + case-study routing
   ============================================================ */

const projects = [
  {
    id: 1,
    title: 'CARDIAC / PUMP',
    category: 'ANATOMY',
    flow: '2.4 L/MIN',
    specs: { efficiency: '94%', pressure: '120mmHg', volume: '70mL', rate: '72 BPM' },
  },
  {
    id: 2,
    title: 'EXOSKELETON SPINE',
    category: 'BIOMECHANICS',
    flow: 'LOAD DISTRIBUTION',
    specs: { loadCapacity: '50kg', flexibility: '35°', segments: '24', material: 'Ti-6Al-4V' },
  },
  {
    id: 3,
    title: 'NEURAL INTERFACE',
    category: 'BIOELECTRONICS',
    flow: '1K CHANNELS',
    specs: { channels: '1024', sampling: '30kHz', impedance: '<100kΩ', bandwidth: '0.1–10kHz' },
  },
  {
    id: 4,
    title: 'PROSTHETIC JOINT',
    category: 'MECHANICS',
    flow: 'ROM 150°',
    specs: { range: '150°', torque: '140Nm', weight: '1.2kg', battery: '8hr' },
  },
  {
    id: 5,
    title: 'RESPIRATORY ASSIST',
    category: 'PULMONARY',
    flow: '15 L/MIN',
    specs: { flow: '15L/min', pressure: '25cmH2O', fio2: '21–100%', compliance: 'AUTO' },
  },
  {
    id: 6,
    title: 'VASCULAR STENT',
    category: 'CARDIOLOGY',
    flow: 'Ø 3.5MM',
    specs: { diameter: '3.5mm', length: '18mm', expansion: 'BALLOON', coating: 'DRUG-ELUTING' },
  },
];

function RevealTitle({ text }) {
  return (
    <span style={{ display: 'inline-flex', letterSpacing: '-0.05em' }}>
      {text.split('').map((char, i) => (
        char === ' '
          ? <span key={i} style={{ display: 'inline-block', width: '0.3em' }} />
          : <span key={i} className="reveal-letter">{char}</span>
      ))}
    </span>
  );
}

function StatTile({ value, suffix, label, delay }) {
  const display = value === 99 ? '∞' : `${value}${suffix}`;
  return (
    <div className="stat-tile">
      <div className="swipe"></div>
      <div style={{ position: 'relative', zIndex: 1, padding: '1rem' }}>
        <div className="stat-num" style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--red)', opacity: 0, animation: `fade-in 0.5s ease-out ${delay}s forwards` }}>{display}</div>
        <div className="stat-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-600)', textTransform: 'uppercase' }}>{label}</div>
      </div>
    </div>
  );
}

function App() {
  const [selectedId, setSelectedId] = React.useState(null);
  const [rotationProgress, setRotationProgress] = React.useState(0);
  const [heroTranslate, setHeroTranslate] = React.useState(0);

  React.useEffect(() => {
    let phase1 = 0;

    const measure = () => {
      const bp = document.querySelector('.hero-blueprint');
      if (!bp) return;
      const r = bp.getBoundingClientRect();
      phase1 = Math.max(0, r.top + r.height / 2 - window.innerHeight / 2);
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      setHeroTranslate(-Math.min(scrollY, phase1));
      const phase2 = Math.max(0, scrollY - phase1);
      const rotRange = window.innerHeight * 1.2;
      const rp = Math.max(0, Math.min(1, phase2 / rotRange));
      setRotationProgress(rp);
    };

    const onResize = () => { measure(); onScroll(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    const rafId = requestAnimationFrame(() => { measure(); onScroll(); });
    const t = setTimeout(() => { measure(); onScroll(); }, 250);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      clearTimeout(t);
    };
  }, []);

  React.useEffect(() => {
    if (selectedId !== null) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedId]);

  if (selectedId !== null) {
    const project = projects.find((p) => p.id === selectedId);
    return (
      <React.Fragment>
        <Navigation projectCount={projects.length} onLogoClick={() => setSelectedId(null)} onIndexClick={() => setSelectedId(null)} />
        <CaseStudy project={project} onBack={() => setSelectedId(null)} />
      </React.Fragment>
    );
  }

  return (
    <div style={{ background: 'var(--paper)' }}>
      <Navigation projectCount={projects.length} onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onIndexClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} />
      <window.FloatingPillNav />
      <section id="hero" className="hero">
        <div className="hero-grid"></div>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="particle" style={{ left: `${((i * 53) % 100)}%`, top: `${((i * 79) % 100)}%`, '--dur': `${3 + ((i * 17) % 200) / 100}s`, '--delay': `${((i * 37) % 200) / 100}s` }}></div>
          ))}
        </div>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', alignSelf: 'stretch', transform: `translateY(${heroTranslate}px)`, willChange: 'transform' }}>
          <div style={{ maxWidth: '72rem', margin: '0', marginBottom: '-9rem', padding: '0 2rem', width: '100%', boxSizing: 'border-box' }}>
            <h1 className="hero-title"><RevealTitle text="BIO MECH" /></h1>
            <div className="hero-eyebrow">
              <div className="bar"></div>
              <p className="uppercase wide" style={{ margin: 0, color: 'var(--ink)' }}>PORTFOLIO OF BIOMEDICAL ENGINEERING • COMPUTATIONAL BIOMECHANICS • MEDICAL DEVICES</p>
            </div>
          </div>
          <div className="hero-blueprint">
            <div className="hero-stage">
              <window.HandsModel rotationProgress={rotationProgress} />
              <div className="reg-mark tl">+</div>
              <div className="reg-mark tr">+</div>
              <div className="reg-mark bl">+</div>
              <div className="reg-mark br">+</div>
              <div className="rot-readout"><span>ROT</span><span>{String(Math.round((71 + rotationProgress * 360) % 360)).padStart(3, '0')}°</span></div>
            </div>
          </div>
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
              <StatTile value={projects.length} suffix="" label="Projects" delay={1.0} />
              <StatTile value={4} suffix="" label="Categories" delay={1.1} />
              <StatTile value={99} suffix="+" label="Iterations" delay={1.2} />
              <StatTile value={100} suffix="%" label="FDA Compliant" delay={1.3} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <p className="bold uppercase wider" style={{ color: 'var(--red)', fontSize: '0.875rem', margin: 0 }}>Scroll to explore projects</p>
              <div className="scroll-mouse"><div className="dot"></div></div>
            </div>
          </div>
        </div>
      </section>
      <div style={{ height: '60vh', background: 'var(--paper)' }} aria-hidden="true"></div>
      <window.IntroSection />
      <window.AboutSection />
      <window.SpecializationsSection />
      <section style={{ position: 'relative', zIndex: 20, background: 'var(--paper)' }}>
        <ProjectIndex projects={projects} onProjectSelect={setSelectedId} />
      </section>
    </div>
  );
}

window.App = App;