/* ============================================================
   App — hero + sticky scroll + index + case-study routing
   ============================================================ */

const projects = [
  {
    id: 1,
    title: 'DEEP LEARNING',
    category: 'NEURAL / AI',
    flow: '9 ARCHITECTURES',
    specs: { architectures: '9', reduction: '85%', postures: '7', params: '370K' },
  },
  {
    id: 2,
    title: 'NEUROMECHANICS RESEARCH',
    category: 'BIOMECHANICS',
    flow: '50-MUSCLE ARM MODEL',
    specs: { muscles: '50', joints: '7', speedup: '85×', simData: '3×' },
  },
  {
    id: 3,
    title: 'MARS ROVER',
    category: 'AEROSPACE',
    flow: '4TH OF 114 TEAMS',
    specs: { place: '4th', teams: '114', countries: '15', year: '2025' },
  },
  {
    id: 4,
    title: 'HEXAPOD ROBOT',
    category: 'ROBOTICS',
    flow: '18 DOF',
    specs: { legs: '6', motors: '18', parts: '38', prototypes: '5' },
  },
  {
    id: 5,
    title: 'AUTONOMOUS ROBOT',
    category: 'ROBOTICS',
    flow: 'EMBEDDED CONTROL',
    specs: { iterations: '4', controller: 'PIC', code: 'C', parts: '3D-printed' },
  },
  {
    id: 6,
    title: 'HYDRATION TRACKER',
    category: 'PRODUCT',
    flow: '50+ CUSTOMER INTERVIEWS',
    specs: { team: '11', interviews: '50+', waitlist: '30+', lois: '2' },
  },
  {
    id: 7,
    title: 'POWDER DAMPERS',
    category: 'STRUCTURAL DYNAMICS',
    flow: 'IMAC PAPER',
    specs: { specimens: '3', material: '316L', solver: 'Abaqus', partners: 'DE · UK' },
  },
];

function RevealTitle({ text }) {
  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', columnGap: '0.3em', letterSpacing: '-0.05em' }}>
      {text.split(' ').map((word, wi) => (
        <span key={wi} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, i) => <span key={i} className="reveal-letter">{char}</span>)}
        </span>
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
  const [titleFade, setTitleFade] = React.useState(0); // 0 = title fully shown, 1 = gone
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
      setTitleFade(phase1 > 0 ? Math.min(scrollY / phase1, 1) : 0);
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
          ? <window.MarsRoverCaseStudy project={project} onBack={goToIndex} />
          : selectedId === 4
          ? <window.HexapodCaseStudy project={project} onBack={goToIndex} />
          : selectedId === 5
          ? <window.RespiratoryCaseStudy project={project} onBack={goToIndex} />
          : selectedId === 7
          ? <window.StructuralDynamicsCaseStudy project={project} onBack={goToIndex} />
          : <CaseStudy project={project} onBack={goToIndex} />
        }
        {has3dBg && (
          <div className="ctrl-dock cs-dim-dock">
            <div className="ctrl-pill-group">
              <button className="ctrl-pill" onClick={() => setModelLit((v) => !v)} aria-pressed={modelLit}>
                {modelLit ? window.caseUI(lang).dim : window.caseUI(lang).view3d}
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
      <window.ContactModal />
      <section id="hero" className="hero">
        <div className="hero-grid"></div>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="particle" style={{ left: `${((i * 53) % 100)}%`, top: `${((i * 79) % 100)}%`, '--dur': `${3 + ((i * 17) % 200) / 100}s`, '--delay': `${((i * 37) % 200) / 100}s` }}></div>
          ))}
        </div>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', alignSelf: 'stretch', transform: `translateY(${heroTranslate}px)`, willChange: 'transform' }}>
          <div className="hero-head">
            <h1 className="hero-title" style={{ opacity: Math.max(0, 1 - Math.max(0, titleFade - 0.35) / 0.55), transform: `translateY(${-45 * titleFade}%)`, willChange: 'opacity, transform' }}><RevealTitle text={c.hero.title || 'ENGINEERING PORTFOLIO'} /></h1>
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
    { id: 'resume', label: 'Résumé', href: 'assets/Carlos_Inca_Roca_CV.pdf', ext: true, icon: (
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
          <button className="sf-mark black tight" onClick={toTop} aria-label="Back to top">ατ</button>
          <div className="sf-sig">ALPHA TAU ENGINEERING</div>
        </div>
        <div className="sf-social">
          {links.map((l) => (
            <a
              key={l.id}
              className="sf-icon"
              href={l.href}
              aria-label={l.label}
              title={l.label}
              onClick={l.id === 'email' ? window.openContact : undefined}
              {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{l.icon}</svg>
            </a>
          ))}
        </div>
      </div>
      <div className="sf-base">
        <span>© 2026 Alpha Tau Engineering</span>
        <span>Carlos Inca Roca</span>
      </div>
    </footer>
  );
}

window.App = App;