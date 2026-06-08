/* ============================================================
   App — hero + sticky scroll + index + case-study routing
   ============================================================ */

const projects = [
  {
    id: 1,
    title: 'DEEP LEARNING',
    category: 'NEURAL / AI',
    flow: '94.2% ACC',
    specs: { accuracy: '94.2%', dataset: '50K', latency: '12ms', epochs: '94' },
  },
  {
    id: 2,
    title: 'EXOSKELETON SPINE',
    category: 'BIOMECHANICS',
    flow: 'LOAD DISTRIBUTION',
    specs: { loadCapacity: '50kg', flexibility: '35°', segments: '24', material: 'Ti-6Al-4V' },
    detail: {
      statusLabel: 'Prototype validated',
      statusSub: 'ISO 13485 compliant',
      lead: 'A titanium-alloy exoskeletal spine distributing axial loads across 24 vertebral-analog segments — engineered for rehabilitation and occupational load-offloading with passive compliance joints.',
      metrics: [{ lbl: 'Load Cap.', val: '50kg' }, { lbl: 'Flex ROM', val: '35°' }, { lbl: 'Segments', val: '24' }, { lbl: 'Material', val: 'Ti-64' }],
      modeA: { label: 'Mechanical', title: 'Structural design', desc: 'Ti-6Al-4V lattice framework FEA-optimized for load distribution across 24 vertebral-analog segments with passive compliance joints and fatigue life >10M cycles.', items: ['FEA topology optimization', 'Passive compliance joints', 'Fatigue life > 10M cycles'] },
      modeB: { label: 'Clinical', title: 'Clinical outcomes', desc: 'Validated on a 40-subject rehabilitation cohort over 6 months. Primary endpoint: axial load reduction ≥30% during occupational tasks.', items: ['40-subject validation cohort', '6-month longitudinal study', 'VAS pain reduction 62%'] },
      stack: ['Ti-6Al-4V alloy', 'ANSYS FEA', 'SolidWorks', 'ISO 13485', 'ASTM F136'],
      protocols: [
        { name: 'Structural design', detail: 'FEA topology optimization for load paths. 12 design iterations, static and cyclic load validation.', status: 'COMPLETE' },
        { name: 'Prototype testing', detail: 'Mechanical testing per ASTM F136. Servo-hydraulic fatigue rig, 10M cycle validation.', status: 'VALIDATED' },
        { name: 'Clinical study', detail: 'IRB-approved 40-subject trial. Primary endpoint: axial load reduction >30% under occupational tasks.', status: 'ACTIVE' },
      ],
    },
  },
  {
    id: 3,
    title: 'MARS ROVER',
    category: 'AEROSPACE',
    flow: '25KM RANGE',
    specs: { range: '25km', mass: '320kg', power: 'RTG', speed: '0.12m/s' },
  },
  {
    id: 4,
    title: 'PROSTHETIC JOINT',
    category: 'MECHANICS',
    flow: 'ROM 150°',
    specs: { range: '150°', torque: '140Nm', weight: '1.2kg', battery: '8hr' },
    detail: {
      statusLabel: 'Clinical trials',
      statusSub: 'ISO 22523 certified',
      lead: 'A powered prosthetic knee joint delivering 140 Nm peak torque across 150° ROM — with real-time gait-phase detection and an 8-hour runtime tuned for full-day ambulation.',
      metrics: [{ lbl: 'ROM', val: '150°' }, { lbl: 'Torque', val: '140Nm' }, { lbl: 'Weight', val: '1.2kg' }, { lbl: 'Battery', val: '8hr' }],
      modeA: { label: 'Mechanical', title: 'Mechanical system', desc: 'Brushless DC actuator coupled to a 3-stage planetary gearbox. Titanium shell, UHMWPE bearing surfaces, and compliant ankle adapter.', items: ['Brushless DC + planetary gearbox', 'Ti shell / UHMWPE bearings', 'Compliant ankle adapter'] },
      modeB: { label: 'Control', title: 'Control system', desc: 'Finite-state impedance controller with IMU-based gait-phase detection. Adapts stiffness and damping to terrain in under 20 ms.', items: ['Finite-state impedance control', 'IMU gait-phase detection', '<20ms terrain adaptation'] },
      stack: ['Ti-6Al-4V / PEEK', 'BLDC actuator', 'ROS 2', 'PID + impedance', 'ISO 22523'],
      protocols: [
        { name: 'Mechanical design', detail: 'Actuator sizing, gearbox selection, and structural FEA. Fatigue validation per ISO 22523 cyclic loading.', status: 'COMPLETE' },
        { name: 'Control validation', detail: 'Hardware-in-the-loop testing with amputee simulation. Stair ascent, ramp, and stumble-recovery scenarios.', status: 'COMPLETE' },
        { name: 'Clinical trial', detail: '15-subject trans-femoral amputee trial. Primary endpoint: 6-minute walk test improvement vs passive prosthesis.', status: 'ACTIVE' },
      ],
    },
  },
  {
    id: 5,
    title: 'AUTONOMOUS ROBOT',
    category: 'ROBOTICS',
    flow: '15 L/MIN',
    specs: { flow: '15L/min', pressure: '25cmH2O', fio2: '21–100%', compliance: 'AUTO' },
    detail: {
      statusLabel: 'FDA review',
      statusSub: '510(k) submission filed',
      lead: 'A portable ventilatory assist device delivering up to 15 L/min at 25 cmH₂O with auto-compliance sensing — designed for step-down care and home ventilation in COPD and post-surgical patients.',
      metrics: [{ lbl: 'Flow', val: '15L/min' }, { lbl: 'Pressure', val: '25cmH₂O' }, { lbl: 'FiO₂', val: '21–100%' }, { lbl: 'Compliance', val: 'AUTO' }],
      modeA: { label: 'Ventilation', title: 'Ventilation modes', desc: 'Pressure-support, volume-control, and CPAP modes with auto-PEEP detection. Breath-by-breath adaptive triggering for patient synchrony.', items: ['PSV / VCV / CPAP modes', 'Auto-PEEP detection', 'Adaptive triggering <5ms'] },
      modeB: { label: 'Monitoring', title: 'Monitoring system', desc: 'Continuous SpO₂, ETCO₂, and respiratory mechanics tracking. Alarm escalation with cloud telemetry for remote clinician review.', items: ['SpO₂ + ETCO₂ sensing', 'Respiratory mechanics loop', 'Cloud telemetry dashboard'] },
      stack: ['Turbine blower', 'PID flow control', 'LabVIEW FPGA', 'ISO 80601-2-12', 'FDA 510(k)'],
      protocols: [
        { name: 'Bench testing', detail: 'ASL 5000 lung simulator testing across 40 patient conditions. Trigger delay, leak compensation, and alarm validation.', status: 'COMPLETE' },
        { name: 'Clinical study', detail: '30-patient step-down ICU study. Primary: patient-ventilator synchrony score vs standard of care.', status: 'COMPLETE' },
        { name: 'FDA submission', detail: '510(k) predicate comparison submitted. Awaiting additional performance data request response.', status: 'ACTIVE' },
      ],
    },
  },
  {
    id: 6,
    title: 'VASCULAR STENT',
    category: 'CARDIOLOGY',
    flow: 'Ø 3.5MM',
    specs: { diameter: '3.5mm', length: '18mm', expansion: 'BALLOON', coating: 'DRUG-ELUTING' },
    detail: {
      statusLabel: 'CE marked',
      statusSub: 'FDA PMA pending',
      lead: 'A 3.5 mm drug-eluting coronary stent with sirolimus coating and bioresorbable polymer — engineered for minimal strut thickness, low restenosis rate, and full endothelialisation at 90 days.',
      metrics: [{ lbl: 'Diameter', val: '3.5mm' }, { lbl: 'Length', val: '18mm' }, { lbl: 'Expansion', val: 'BALLOON' }, { lbl: 'Coating', val: 'DES' }],
      modeA: { label: 'Material', title: 'Material design', desc: 'L-605 cobalt-chromium alloy struts at 71 µm thickness. Bioresorbable PLGA polymer with sirolimus elution over 90 days.', items: ['L-605 Co-Cr alloy, 71µm struts', 'Bioresorbable PLGA polymer', 'Sirolimus 90-day elution'] },
      modeB: { label: 'Delivery', title: 'Delivery system', desc: 'Semi-compliant balloon, 6F guide-catheter compatible. Radiopaque markers at stent shoulders. Crossing profile 0.032".', items: ['Semi-compliant balloon system', '6F guide-catheter compatible', 'Crossing profile 0.032"'] },
      stack: ['Co-Cr L-605', 'Sirolimus / PLGA', 'FEA (Abaqus)', 'ISO 10993', 'ASTM F2129'],
      protocols: [
        { name: 'Device design', detail: 'Strut geometry optimisation via Abaqus FEA. Radial strength, foreshortening, and dog-boning characterised.', status: 'COMPLETE' },
        { name: 'Biocompatibility', detail: 'ISO 10993 cytotoxicity, sensitisation, and haemocompatibility testing. PLGA degradation confirmed at 180 days.', status: 'COMPLETE' },
        { name: 'Clinical trial', detail: 'COMFORT-II 200-patient RCT. Primary: TLF at 12 months vs. zotarolimus-eluting comparator.', status: 'ACTIVE' },
      ],
    },
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
  const [armOpen, setArmOpen] = React.useState(false); // Mars sub-page: rover-arm viewer
  const [rotationProgress, setRotationProgress] = React.useState(0);
  const [heroTranslate, setHeroTranslate] = React.useState(0);
  const [modelLit, setModelLit] = React.useState(false);
  const [lang, setLang] = React.useState(() => localStorage.getItem('lang') || 'en');

  React.useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const c = window.CONTENT[lang] || window.CONTENT.en;
  const ctx = { lang, setLang, c };
  // Overlay translated card fields onto the base project data (values/detail stay)
  const localizedProjects = projects.map((p, i) => ({ ...p, ...(c.projects[i] || {}) }));

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
    setModelLit(false); // reset 3D dim whenever the open project changes
    setArmOpen(false);  // leaving Mars closes the rover-arm sub-page
  }, [selectedId]);

  const goToIndex = () => {
    setSelectedId(null);
    setTimeout(() => { document.getElementById('project-index')?.scrollIntoView({ behavior: 'smooth' }); }, 50);
  };

  if (selectedId !== null) {
    const project = localizedProjects.find((p) => p.id === selectedId);
    const has3dBg = selectedId === 2; // spine has no Model View of its own; respiratory's Model View owns the un-dim
    return (
      <window.LangContext.Provider value={ctx}>
      <div className={modelLit ? 'cs-page model-lit' : 'cs-page'}>
        <Navigation projectCount={projects.length} onLogoClick={() => setSelectedId(null)} onIndexClick={goToIndex} />
        {selectedId === 1
          ? <window.DeepLearningCaseStudy project={project} onBack={goToIndex} />
          : selectedId === 2
          ? <window.SpineExoskeletonCaseStudy project={project} onBack={goToIndex} />
          : selectedId === 3
          ? (armOpen
              ? <window.RoverArmCaseStudy onBack={() => setArmOpen(false)} />
              : <window.MarsRoverCaseStudy project={project} onBack={goToIndex} onOpenArm={() => setArmOpen(true)} />)
          : selectedId === 5
          ? <window.RespiratoryCaseStudy project={project} onBack={goToIndex} />
          : <CaseStudy project={project} onBack={goToIndex} />
        }
        {has3dBg && (
          <div className="ctrl-dock cs-dim-dock">
            <div className="ctrl-pill-group">
              <button className="ctrl-pill" onClick={() => setModelLit((v) => !v)} aria-pressed={modelLit}>
                {modelLit ? 'Dim' : 'View 3D'}
              </button>
            </div>
          </div>
        )}
      </div>
      </window.LangContext.Provider>
    );
  }

  return (
    <window.LangContext.Provider value={ctx}>
    <div style={{ background: 'var(--paper)' }}>
      <Navigation projectCount={projects.length} onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onIndexClick={() => { const el = document.getElementById('project-index'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} />
      <window.FloatingPillNav />
      <section id="hero" className="hero">
        <div className="hero-grid"></div>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="particle" style={{ left: `${((i * 53) % 100)}%`, top: `${((i * 79) % 100)}%`, '--dur': `${3 + ((i * 17) % 200) / 100}s`, '--delay': `${((i * 37) % 200) / 100}s` }}></div>
          ))}
        </div>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', alignSelf: 'stretch', transform: `translateY(${heroTranslate}px)`, willChange: 'transform' }}>
          <div className="hero-head">
            <h1 className="hero-title"><RevealTitle text="BIO MECH" /></h1>
            <div className="hero-eyebrow">
              <div className="bar"></div>
              <p className="uppercase wide" style={{ margin: 0, color: 'var(--ink)' }}>{c.hero.tagline}</p>
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <p className="bold uppercase wider" style={{ color: 'var(--red)', fontSize: '0.875rem', margin: 0 }}>{c.hero.scroll}</p>
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
        <ProjectIndex projects={localizedProjects} onProjectSelect={setSelectedId} />
      </section>
      <SiteFooter />
    </div>
    </window.LangContext.Provider>
  );
}

function SiteFooter() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const links = [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/carlos-incaroca/', ext: true, icon: (
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.98 0H8.96v16h4.02v-8.4c0-3.94 5.13-4.26 5.13 0V24H22V13.36c0-6.66-7.13-6.41-8.04-3.13V8z" />
    ) },
    { id: 'email', label: 'Email', href: 'mailto:carlos.incaroca@gmail.com', ext: false, icon: (
      <React.Fragment>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 6.5 12 12.5 20.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </React.Fragment>
    ) },
    { id: 'github', label: 'GitHub', href: 'https://github.com/carlosincaroca?tab=repositories', ext: true, icon: (
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.71.08-.71 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.81 0-1.28.47-2.33 1.23-3.15-.12-.3-.53-1.51.12-3.15 0 0 1-.32 3.3 1.2.96-.26 1.98-.39 3-.4 1.02.01 2.04.14 3 .4 2.3-1.52 3.3-1.2 3.3-1.2.65 1.64.24 2.85.12 3.15.77.82 1.23 1.87 1.23 3.15 0 4.51-2.81 5.5-5.49 5.79.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.83.56C20.57 21.88 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z" />
    ) },
    { id: 'resume', label: 'Résumé', href: '#', ext: true, icon: (
      <React.Fragment>
        <path d="M14 2.5H6.5A1.5 1.5 0 0 0 5 4v16a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 20V7.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 2.5V7.5H19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8.5 12.5h7M8.5 16h7M8.5 9h2.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </React.Fragment>
    ) },
  ];
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="sf-inner">
        <div className="sf-brand-col">
          <button className="sf-mark black tight" onClick={toTop} aria-label="Back to top">IατR</button>
          <div className="sf-sig">IATRA ENGINEERING</div>
        </div>
        <div className="sf-social">
          {links.map((l) => (
            <a
              key={l.id}
              className="sf-icon"
              href={l.href}
              aria-label={l.label}
              title={l.label}
              {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{l.icon}</svg>
            </a>
          ))}
        </div>
      </div>
      <div className="sf-base">
        <span>© 2026 IATRA Engineering</span>
        <span>Carlos Inca Roca</span>
      </div>
    </footer>
  );
}

window.App = App;