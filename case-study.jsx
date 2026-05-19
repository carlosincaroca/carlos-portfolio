function IconArrow({ size = 20 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>; }
function IconActivity({ size = 20 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>; }
function IconTarget({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>; }
function IconZap({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>; }
function IconShield({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>; }

function CSDiagram() {
  return (
    <svg style={{ width: '100%', height: '24rem', position: 'relative', zIndex: 1 }} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
      {[0,1,2,3,4,5].map((i) => <text key={i} x={i * 100 + 50} y="20" fill="white" fontSize="10" fontFamily="JetBrains Mono, monospace" opacity="0.5" style={{ animation: `pulse-opacity 2s ease-in-out ${i * 0.2}s infinite` }}>{i * 100}</text>)}
      <circle cx="300" cy="200" r="80" stroke="#C4364D" strokeWidth="3" fill="none" />
      <circle cx="300" cy="200" r="100" stroke="white" strokeWidth="1" fill="none" strokeDasharray="5,5" style={{ transformOrigin: '300px 200px', animation: 'spin-slow 20s linear infinite, dash-march 1s linear infinite' }} />
      {[[150,200],[450,200],[300,100],[300,300],[200,120],[400,120],[200,280],[400,280]].map(([x,y],i) => (
        <g key={i}>
          <line x1="300" y1="200" x2={x} y2={y} stroke="white" strokeWidth="2" opacity="0.3" />
          <circle cx={x} cy={y} r="8" fill="#C4364D" style={{ transformOrigin: `${x}px ${y}px`, animation: `pulse-scale 2s ease-in-out ${1+i*0.2}s infinite` }} />
          <circle cx={x} cy={y} r="12" stroke="white" strokeWidth="1" fill="none" style={{ transformOrigin: `${x}px ${y}px`, animation: `ring-expand 2s ease-out ${1+i*0.2}s infinite` }} />
        </g>
      ))}
      <text x="300" y="210" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle" style={{ animation: 'pulse-opacity-soft 2s ease-in-out infinite' }}>CORE SYSTEM</text>
    </svg>
  );
}

function CSSystemMap() {
  const limbs = [[70,60,50,80],[130,60,150,80],[85,90,70,130],[115,90,130,130]];
  const spots = [[100,70],[100,30],[60,80],[140,80]];
  return (
    <svg style={{ width: '100%', height: '12rem' }} viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="100" cy="30" rx="15" ry="20" stroke="white" strokeWidth="2" fill="none" />
      <rect x="85" y="50" width="30" height="40" rx="5" stroke="white" strokeWidth="2" fill="none" />
      {limbs.map(([x1,y1,x2,y2],i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2" />)}
      {spots.map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="#C4364D" style={{ transformOrigin: `${x}px ${y}px`, animation: `pulse-scale 2s ease-in-out ${1.5+i*0.2}s infinite` }} />
          <circle cx={x} cy={y} r="10" stroke="#C4364D" strokeWidth="1" fill="none" style={{ transformOrigin: `${x}px ${y}px`, animation: `ring-expand 2s ease-out ${1.5+i*0.2}s infinite` }} />
        </g>
      ))}
    </svg>
  );
}

function BarChart({ data, color = '#C4364D', height = 200 }) {
  const W=480,H=height,padL=36,padR=8,padT=8,padB=30,cw=W-padL-padR,ch=H-padT-padB;
  const max=Math.max(...data.map(d=>d.value))*1.05,barW=cw/data.length*0.6,slot=cw/data.length;
  const ticks=[0,25,50,75,100].filter(t=>t<=max);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%',height }} preserveAspectRatio="xMidYMid meet">
      {ticks.map((t,i)=>{ const y=padT+ch-(t/max)*ch; return <g key={i}><line className="chart-grid" x1={padL} y1={y} x2={W-padR} y2={y}/><text x={padL-6} y={y+4} textAnchor="end" className="chart-axis-label">{t}</text></g>; })}
      {data.map((d,i)=>{ const x=padL+i*slot+(slot-barW)/2,h=(d.value/max)*ch,y=padT+ch-h; return <g key={i}><rect x={x} y={y} width={barW} height={h} fill={color}><animate attributeName="height" from="0" to={h} dur="1.4s" fill="freeze"/><animate attributeName="y" from={padT+ch} to={y} dur="1.4s" fill="freeze"/></rect><text x={x+barW/2} y={H-8} textAnchor="middle" className="chart-axis-label">{d.name}</text></g>; })}
    </svg>
  );
}

function LineChart({ data, color = '#2E5C9A', height = 200 }) {
  const W=480,H=height,padL=36,padR=8,padT=8,padB=30,cw=W-padL-padR,ch=H-padT-padB,max=100,step=cw/(data.length-1);
  const pts=data.map((d,i)=>({ x:padL+i*step, y:padT+ch-(d.load/max)*ch }));
  const path=pts.map((p,i)=>`${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ');
  const len=pts.reduce((acc,p,i)=>{ if(i===0)return 0; const dx=p.x-pts[i-1].x,dy=p.y-pts[i-1].y; return acc+Math.sqrt(dx*dx+dy*dy); },0);
  const ticks=[0,25,50,75,100];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%',height }} preserveAspectRatio="xMidYMid meet">
      {ticks.map((t,i)=>{ const y=padT+ch-(t/max)*ch; return <g key={i}><line className="chart-grid" x1={padL} y1={y} x2={W-padR} y2={y}/><text x={padL-6} y={y+4} textAnchor="end" className="chart-axis-label">{t}</text></g>; })}
      <path d={path} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len} style={{ animation:'draw-line 1.6s ease-out forwards' }}/>
      <style>{`@keyframes draw-line { to { stroke-dashoffset: 0; } }`}</style>
      {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4" fill={color}><animate attributeName="r" from="0" to="4" dur="0.4s" begin={`${0.8+i*0.1}s`} fill="freeze"/></circle>)}
      {data.map((d,i)=><text key={i} x={padL+i*step} y={H-8} textAnchor="middle" className="chart-axis-label">{d.time}</text>)}
    </svg>
  );
}

function CaseStudy({ project, onBack }) {
  const performanceData=[{name:'W1',value:78},{name:'W2',value:82},{name:'W3',value:85},{name:'W4',value:88},{name:'W5',value:91},{name:'W6',value:94}];
  const loadData=[{time:'0s',load:0},{time:'2s',load:35},{time:'4s',load:50},{time:'6s',load:68},{time:'8s',load:82},{time:'10s',load:95}];
  return (
    <div className="cs-wrap">
      <div className="container-wide">
        <button className="cs-back" onClick={onBack}><IconArrow />BACK TO INDEX</button>
        <div className="cs-header">
          <div className="cs-header-band">
            <div className="shimmer"></div>
            <h1>{project.title}</h1>
            <div className="cat-label"><div className="small">CATEGORY</div><div className="big">{project.category}</div></div>
          </div>
        </div>
        <div className="cs-grid">
          <div className="panel">
            <div className="panel-header dark"><span>TECHNICAL DIAGRAM • FLOW</span><div className="flex" style={{gap:'0.25rem'}}><div className="pulse-green" style={{animationDelay:'0s'}}></div><div className="pulse-green" style={{animationDelay:'0.2s'}}></div><div className="pulse-green" style={{animationDelay:'0.4s'}}></div></div></div>
            <div className="cs-blueprint-large"><div className="grid-overlay"></div><CSDiagram /></div>
            <div className="cs-desc"><h3><IconActivity />Description</h3><p>This {project.category.toLowerCase()} system represents a breakthrough in biomedical engineering, combining advanced materials science with computational biomechanics to achieve unprecedented performance metrics. The design underwent rigorous FEA simulation and cadaver testing to ensure safety and efficacy across diverse patient populations.</p></div>
          </div>
          <div className="flex" style={{flexDirection:'column',gap:'1.5rem'}}>
            <div className="panel">
              <div className="panel-header red"><span>SPECIFICATIONS</span><IconTarget /></div>
              <div style={{padding:'1rem',display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                {Object.entries(project.specs).map(([k,v],i)=>(<div key={k} className="spec-row"><span className="k">{k}</span><span className="v" style={{animationDelay:`${i*0.3}s`}}>{v}</span></div>))}
              </div>
            </div>
            <div className="panel">
              <div className="panel-header dark"><span>SYSTEM MAP</span><IconZap /></div>
              <div style={{padding:'1rem',background:'#2E5C9A'}}><CSSystemMap /></div>
            </div>
            <div className="panel cs-status">
              <div className="panel-header red"><span>STATUS</span><IconShield /></div>
              <div style={{padding:'1rem',display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                <div className="item"><div className="k">FDA APPROVAL</div><div className="v-green"><span>✓</span>CLEARED</div></div>
                <div className="item"><div className="k">CLINICAL TRIALS</div><div className="v-red">PHASE III</div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="cs-charts">
          <div className="panel"><div className="panel-header dark"><span>PERFORMANCE METRICS</span></div><div className="chart-wrap"><BarChart data={performanceData}/><div className="chart-caption">EFFICIENCY IMPROVEMENT OVER 6 WEEKS</div></div></div>
          <div className="panel"><div className="panel-header dark"><span>LOAD TEST RESULTS</span></div><div className="chart-wrap"><LineChart data={loadData}/><div className="chart-caption">STRESS RESPONSE UNDER CYCLIC LOADING</div></div></div>
        </div>
        <div className="cs-footer">
          <div className="flex" style={{alignItems:'center',gap:'0.5rem'}}><div style={{height:2,width:32,background:'#C4364D'}}></div><span>END OF SPECIFICATION SHEET</span></div>
          <div className="rev pulse-soft">DOCUMENT ID: BM-{String(project.id).padStart(4,'0')}-REV3</div>
        </div>
      </div>
    </div>
  );
}

window.CaseStudy = CaseStudy;