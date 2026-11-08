function ProjectCardDiagram({ active }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
      <circle cx="150" cy="100" r="30" stroke="#C4364D" strokeWidth="2" fill="none" style={{ transformOrigin: '150px 100px', animation: active ? 'spin-slow 2s linear infinite' : 'none' }} />
      {[0, 120, 240].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 150 + 50 * Math.cos(rad);
        const y = 100 + 50 * Math.sin(rad);
        return (
          <g key={i}>
            <line x1="150" y1="100" x2={x} y2={y} stroke="white" strokeWidth="1" opacity="0.5" />
            <circle cx={x} cy={y} r="5" fill="#C4364D" style={{ transformOrigin: `${x}px ${y}px`, animation: active ? `pulse-scale 1s ease-in-out ${i * 0.3}s infinite` : 'none' }} />
          </g>
        );
      })}
      {[[20, 20], [280, 20], [20, 180], [280, 180]].map(([x, y], i) => (
        <rect key={i} x={x - 3} y={y - 3} width="6" height="6" fill="white" opacity="0.6" style={{ animation: active ? `pulse-opacity 0.5s ease-in-out ${i * 0.1}s infinite` : 'none' }} />
      ))}
    </svg>
  );
}

function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  const { c } = window.useLang();
  return (
    <window.Reveal delay={index * 100}>
      <button className="project-card card-bordered" onClick={() => onClick(project.id)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className="project-card-num">
          <div className="swipe"></div>
          <span>{c.index.projectWord} {String(index + 1).padStart(2, '0')}</span>
          <span style={{ fontSize: '0.75rem' }}>{project.category}</span>
        </div>
        <div className="project-blueprint">
          <div className="grid-overlay"></div>
          <ProjectCardDiagram active={hovered} />
          <div className="project-num-overlay">
            <div className="big">{index + 1}</div>
            <div className="label">{c.index.technicalDiagram}</div>
          </div>
        </div>
        <div className="project-info">
          <h3>{project.title}</h3>
          <div className="meta">
            <span>{project.flow}</span>
            <span className="view">{c.index.viewSpecs}</span>
          </div>
        </div>
      </button>
    </window.Reveal>
  );
}

/* ---- Cinematic list (trial): each row opens to play that project's own background animation ----
   Desktop (mouse): hovering a row opens it; the whole row, arrow included, opens the project.
   Touch (phones, tablets): the arrow opens / closes the row (one at a time); the rest of the row opens the project.
   scene:  the project page's 3D scene (?embed = no UI, follows the site theme), loaded on first hover. A still of the same
           scene (poster) shows instantly and the live scene fades in over it once its model has loaded. After
           the first hover the scene stays loaded but paused, so later hovers are instant.
   frame:  where the 16:9 scene sits in the row (measured from the stills: model ~290px tall in a 1280px row). s = width as a fraction of the row; (fx, fy) = the model's
           centre within the scene frame, which is placed at SCENE_DX across and halfway down the row.
           mh = the model's height as a fraction of the frame, used on phones to size it to the space under the title.
   live:   a lightweight 2D animation (Deep Learning).   img: a still figure (Neuromechanics).   none: brand panel.
 */
const SCENE_DX = 0.64;
const INDEX_MEDIA = {
  1: { live: 'entropy' },
  2: { img: 'assets/index/neuromechanics.jpg' }, // diagram, fitted between title and labels, blended into the row
  3: { scene: 'rover-bg.html?v=e4&embed', poster: 'assets/index/scene-mars-rover', frame: { s: 0.55, fx: 0.494, fy: 0.456, mh: 0.73 } },
  4: { scene: 'hexapod-bg.html?v=e4&embed', poster: 'assets/index/scene-hexapod', frame: { s: 0.62, fx: 0.494, fy: 0.602, mh: 0.64 } },
  5: { scene: 'mini-rover-bg.html?v=e4&embed', poster: 'assets/index/scene-autonomous-robot', frame: { s: 0.68, fx: 0.489, fy: 0.392, mh: 0.59 } },
  // 6 (Hydration Tracker): no animation, falls back to a brand panel
  7: { scene: 'structural-dynamics-bg.html?v=e4&embed', poster: 'assets/index/scene-powder-dampers', frame: { s: 0.67, fx: 0.494, fy: 0.49, mh: 0.60 } }, // gear
};
const touchUI = () => !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function SceneLayer({ media, hot, frameClass = 'cine-frame' }) {
  const ifRef = React.useRef(null);
  const hotRef = React.useRef(hot);
  const loop = React.useRef({ paused: false, pending: [], raf: null });
  const [mounted, setMounted] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  hotRef.current = hot;

  React.useEffect(() => {
    const L = loop.current;
    if (hot) {
      setMounted(true);
      L.paused = false;
      const queued = L.pending; L.pending = [];
      if (L.raf) queued.forEach((cb) => L.raf(cb));
      return undefined;
    }
    const t = setTimeout(() => { L.paused = true; }, 800); // pause once the row has collapsed
    return () => clearTimeout(t);
  }, [hot]);

  React.useEffect(() => () => { loop.current.paused = true; }, []);

  // Same-origin scene: wrap its requestAnimationFrame so the loop can be paused while the row is closed,
  // and watch its loader to know when the model is on screen.
  const onLoad = () => {
    let w, doc;
    try { w = ifRef.current.contentWindow; doc = ifRef.current.contentDocument; } catch (e) { return; }
    if (!w || !doc) return;
    const L = loop.current;
    L.raf = w.requestAnimationFrame.bind(w);
    w.requestAnimationFrame = (cb) => { if (L.paused) { L.pending.push(cb); return 0; } return L.raf(cb); };
    if (!hotRef.current) L.paused = true;
    const t0 = Date.now();
    const poll = setInterval(() => {
      const el = doc.getElementById('loader');
      const done = el && el.classList.contains('hidden');
      if (done || Date.now() - t0 > 60000) { clearInterval(poll); if (done) setTimeout(() => setReady(true), 250); }
    }, 100);
  };

  const f = media.frame;
  const style = { '--dx': SCENE_DX, '--s': f.s, '--fx': f.fx, '--fy': f.fy, '--mh': f.mh }; // placed by .cine-frame in styles.css
  return (
    <React.Fragment>
      {/* the still crossfades out as the live scene fades in (the scene is transparent, so both must not show) */}
      {['light', 'dark'].map((th) => (
        <img key={th} className={`${frameClass} cine-poster cine-poster--${th}${ready ? ' off' : ''}`} src={`${media.poster}-${th}.jpg`}
          style={style} alt="" loading="lazy" decoding="async" />
      ))}
      {mounted && (
        <iframe ref={ifRef} className={`${frameClass} cine-scene${ready ? ' on' : ''}`} src={media.scene} style={style}
          onLoad={onLoad} tabIndex={-1} aria-hidden="true" title=""></iframe>
      )}
    </React.Fragment>
  );
}

function LiveLayer({ hot, contained = true }) {
  // 2D canvas animation: mounted while the row is open (and briefly while it closes), cheap enough to rebuild.
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    if (hot) { setOn(true); return undefined; }
    const t = setTimeout(() => setOn(false), 800);
    return () => clearTimeout(t);
  }, [hot]);
  return on && window.EntropyBg ? <window.EntropyBg contained={contained} /> : null;
}

function CinematicRow({ project, index, onClick, open, onToggle }) {
  const { c } = window.useLang();
  const media = INDEX_MEDIA[project.id];
  const kind = media ? 'stage' : 'brand';
  const [hovered, setHovered] = React.useState(false); // desktop: mouse over the row, or keyboard focus inside it
  const touch = touchUI();
  const isOpen = hovered || open;
  const onArrow = () => (touchUI() ? onToggle(project.id) : onClick(project.id));
  return (
    <window.Reveal delay={index * 70}>
      <div className={`cine-row${media && media.img ? ' cine-row--fig' : ''}${isOpen ? ' open' : ''}${open && !hovered ? ' by-touch' : ''}`}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(true); }}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovered(false); }}
        onFocus={(e) => { if (!touch && e.target.matches(':focus-visible')) setHovered(true); }}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false); }}>
        <div className={`cine-bg cine-bg--${kind}`} aria-hidden="true">
          {media && media.scene && <SceneLayer media={media} hot={isOpen} />}
          {media && media.live && <LiveLayer hot={isOpen} />}
        </div>
        <div className="cine-content">
          <button type="button" className="cine-main" onClick={() => onClick(project.id)}>
            <span className="cine-num">{String(index + 1).padStart(2, '0')}</span>
            <span className="cine-title">{project.title}</span>
            <span className="cine-cat">{project.category}</span>
            <span className="cine-flow">{project.flow}</span>
            <span className="cine-line">{project.category} · {project.flow}</span>
          </button>
          {/* still figure: under the title band, so it never runs into the text */}
          {media && media.img && (
            <span className="cine-fig-slot" aria-hidden="true"><img className="cine-figure" src={`${media.img}?v=2`} alt="" loading="lazy" decoding="async" /></span>
          )}
          <div className="cine-right">
            {touch ? (
              <button type="button" className="cine-go" onClick={onArrow} aria-expanded={open}
                aria-label={`${open ? c.index.hideAnim : c.index.showAnim}: ${project.title}`}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8l4 4-4 4" /><path d="M2 12h20" /></svg>
              </button>
            ) : (
              <span className="cine-go" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8l4 4-4 4" /><path d="M2 12h20" /></svg>
              </span>
            )}
          </div>
        </div>
      </div>
    </window.Reveal>
  );
}

/* ---- Desktop index (mouse + wide screen): background swap ----
   A full-height list in mono type. Hovering (or focusing) a row swaps the whole section's background to that
   project's visual, which zooms from 1.2 to 1 as it fades in; the other rows dim. Text is white with
   mix-blend-mode: difference, so it inverts against whatever is behind it. Touch screens and narrow windows keep
   the cinematic list above. */
const useMedia = (q) => {
  const [m, setM] = React.useState(() => window.matchMedia(q).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(q); const on = () => setM(mq.matches);
    mq.addEventListener('change', on); return () => mq.removeEventListener('change', on);
  }, [q]);
  return m;
};

function SwapLayer({ media, on }) {
  // restart the zoom on every selection: drop .on, then add it back two frames later
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    setShown(false);
    if (!on) return undefined;
    let r = requestAnimationFrame(() => { r = requestAnimationFrame(() => setShown(true)); });
    return () => cancelAnimationFrame(r);
  }, [on]);
  const kind = !media ? 'brand' : media.scene ? 'scene' : media.img ? 'fig' : 'live';
  return (
    <div className={`swap-layer${shown ? ' on' : ''}`}>
      <div className={`swap-zoom${kind === 'brand' ? ' swap-zoom--brand' : ''}`}>
        {kind === 'scene' && <SceneLayer media={media} hot={on} frameClass="swap-frame" />}
        {kind === 'fig' && <img className="swap-fig" src={`${media.img}?v=2`} alt="" decoding="async" />}
        {kind === 'live' && <LiveLayer hot={on} contained={false} />}
      </div>
    </div>
  );
}

function SwapIndex({ projects, onProjectSelect }) {
  const { c } = window.useLang();
  const titleLines = c.index.titleHTML.split(/<br\s*\/?>/i);
  const [active, setActive] = React.useState(-1);
  const [seen, setSeen] = React.useState(() => new Set()); // layers built so far (scenes stay loaded, paused)
  const activate = (i) => { setActive(i); setSeen((s) => (s.has(i) ? s : new Set(s).add(i))); };
  // distance from the section top to the bottom of the header: models are centred in the space below it
  const secRef = React.useRef(null), headRef = React.useRef(null);
  const [headH, setHeadH] = React.useState(0);
  React.useEffect(() => {
    const measure = () => { if (secRef.current && headRef.current) setHeadH(Math.round(headRef.current.getBoundingClientRect().bottom - secRef.current.getBoundingClientRect().top)); };
    const ro = new ResizeObserver(measure); ro.observe(headRef.current); ro.observe(secRef.current); measure();
    return () => ro.disconnect();
  }, []);
  return (
    <div className="swap-index" id="project-index" ref={secRef} style={{ '--head-h': `${headH}px` }} onMouseLeave={() => setActive(-1)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setActive(-1); }}>
      {/* the background swap covers the whole section, header included */}
      <div className="swap-bg" aria-hidden="true">
        {projects.map((p, i) => (seen.has(i) ? <SwapLayer key={p.id} media={INDEX_MEDIA[p.id]} on={active === i} /> : null))}
      </div>
      {/* section header: Core Competencies' eyebrow + title */}
      <div className="container-wide swap-head" ref={headRef}>
        <div className="as-spec-header">
          <div>
            <div className="as-eyebrow"><div className="as-bar"></div><span>{c.index.eyebrow}</span></div>
            <h2 className="as-spec-title swap-blend">{titleLines.map((l, i) => <React.Fragment key={i}>{i > 0 && <br />}{l}</React.Fragment>)}</h2>
          </div>
        </div>
      </div>
      <div className="swap-main">
      <ul className={`swap-list${active !== -1 ? ' has-active' : ''}`} role="list">
        {projects.map((p, i) => (
          <li key={p.id} className={`swap-item${active === i ? ' active' : ''}`}>
            <button type="button" className="swap-row" onMouseEnter={() => activate(i)} onFocus={() => activate(i)} onClick={() => onProjectSelect(p.id)}>
              <span className="swap-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="swap-title">{p.title}</span>
              <span className="swap-cat">{p.category}</span>
              <span className="swap-flow">{p.flow}</span>
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

function ProjectIndex({ projects, onProjectSelect }) {
  const { c } = window.useLang();
  const grid = new URLSearchParams(window.location.search).has('grid'); // trial: ?grid shows the old cards for comparison
  const [openId, setOpenId] = React.useState(null); // the one row whose animation is showing
  const swap = useMedia('(hover: hover) and (pointer: fine) and (min-width: 1001px)'); // desktop: background swap
  if (swap && !grid) return <SwapIndex projects={projects} onProjectSelect={onProjectSelect} />;
  return (
    <div className="index-wrap" id="project-index">
      <div className="container-wide">
        {/* same header as the desktop index: eyebrow + title */}
        <div className="as-spec-header">
          <div>
            <div className="as-eyebrow"><div className="as-bar"></div><span>{c.index.eyebrow}</span></div>
            <h2 className="as-spec-title">{c.index.titleHTML.split(/<br\s*\/?>/i).map((l, i) => <React.Fragment key={i}>{i > 0 && <br />}{l}</React.Fragment>)}</h2>
          </div>
        </div>
        {grid ? (
          <div className="project-grid">
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onClick={onProjectSelect} />)}
          </div>
        ) : (
          <div className="cine-list">
            {projects.map((p, i) => <CinematicRow key={p.id} project={p} index={i} onClick={onProjectSelect}
              open={openId === p.id} onToggle={(id) => setOpenId((cur) => (cur === id ? null : id))} />)}
          </div>
        )}
      </div>
    </div>
  );
}

window.ProjectIndex = ProjectIndex;