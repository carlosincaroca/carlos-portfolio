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

function ProjectIndex({ projects, onProjectSelect }) {
  const { c } = window.useLang();
  return (
    <div className="index-wrap" id="project-index">
      <div className="container-wide">
        <window.Reveal>
          <div className="index-header">
            <div className="shimmer"></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h1 className="index-title" dangerouslySetInnerHTML={{ __html: c.index.titleHTML }}></h1>
              <div className="index-meta">
                {[
                  { color: '#2E5C9A', label: `${String(projects.length).padStart(2, '0')} ${c.index.projectsWord}` },
                  { color: '#C4364D', label: `04 ${c.index.systemsWord}` },
                  { color: '#374151', label: `∞ ${c.index.revisionsWord}` },
                ].map((it, i) => (
                  <div key={i} className="item">
                    <div className="swatch" style={{ backgroundColor: it.color, animationDelay: `${i * 0.3}s` }}></div>
                    <span>{it.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </window.Reveal>
        <div className="project-grid">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onClick={onProjectSelect} />)}
        </div>
        <window.Reveal>
          <div className="index-footer">
            <div className="left"><div className="bar"></div><span>{c.index.endOfIndex}</span></div>
            <div className="flex" style={{ gap: '1.5rem' }}>
              <span>{c.index.lastUpdated}: 2026.05.18</span>
              <span className="rev">REV: 4.2</span>
            </div>
          </div>
        </window.Reveal>
      </div>
    </div>
  );
}

window.ProjectIndex = ProjectIndex;