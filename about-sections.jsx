function BlueprintHuman() {
  return (
    <svg viewBox="0 0 260 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }}>
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400"
          stroke="white" strokeWidth="0.3" opacity="0.15" />
      ))}
      {Array.from({ length: 21 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 20} x2="260" y2={i * 20}
          stroke="white" strokeWidth="0.3" opacity="0.15" />
      ))}
      <line x1="6" y1="20" x2="6" y2="388" stroke="#C4364D" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
      <line x1="254" y1="20" x2="254" y2="388" stroke="#C4364D" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
      <line x1="0" y1="55" x2="260" y2="55" stroke="#C4364D" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.25" />
      <line x1="0" y1="210" x2="260" y2="210" stroke="#C4364D" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.25" />
      <line x1="0" y1="310" x2="260" y2="310" stroke="#C4364D" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.25" />
      <circle cx="130" cy="55" r="32" stroke="white" strokeWidth="1.5" opacity="0.7" />
      <line x1="98" y1="55" x2="162" y2="55" stroke="#C4364D" strokeWidth="0.75" opacity="0.55" />
      <line x1="130" y1="23" x2="130" y2="87" stroke="#C4364D" strokeWidth="0.75" opacity="0.55" />
      <line x1="120" y1="87" x2="117" y2="108" stroke="white" strokeWidth="2" opacity="0.6" />
      <line x1="140" y1="87" x2="143" y2="108" stroke="white" strokeWidth="2" opacity="0.6" />
      <line x1="55" y1="120" x2="205" y2="120" stroke="white" strokeWidth="2" opacity="0.65" />
      <rect x="105" y="108" width="50" height="92" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="105" y1={124 + i * 18} x2="155" y2={124 + i * 18}
          stroke="white" strokeWidth="0.5" opacity="0.15" />
      ))}
      <line x1="55" y1="120" x2="36" y2="202" stroke="white" strokeWidth="2" opacity="0.65" />
      <line x1="205" y1="120" x2="224" y2="202" stroke="white" strokeWidth="2" opacity="0.65" />
      <line x1="36" y1="202" x2="26" y2="272" stroke="white" strokeWidth="1.5" opacity="0.55" />
      <line x1="224" y1="202" x2="234" y2="272" stroke="white" strokeWidth="1.5" opacity="0.55" />
      <rect x="16" y="270" width="18" height="26" rx="4" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
      <rect x="226" y="270" width="18" height="26" rx="4" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
      <ellipse cx="130" cy="207" rx="38" ry="14" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
      <line x1="110" y1="219" x2="97" y2="308" stroke="white" strokeWidth="2" opacity="0.65" />
      <line x1="150" y1="219" x2="163" y2="308" stroke="white" strokeWidth="2" opacity="0.65" />
      <line x1="97" y1="308" x2="92" y2="382" stroke="white" strokeWidth="1.5" opacity="0.55" />
      <line x1="163" y1="308" x2="168" y2="382" stroke="white" strokeWidth="1.5" opacity="0.55" />
      <line x1="76" y1="382" x2="110" y2="388" stroke="white" strokeWidth="2" opacity="0.5" />
      <line x1="150" y1="382" x2="184" y2="388" stroke="white" strokeWidth="2" opacity="0.5" />
      {[
        [55, 120], [205, 120],
        [36, 202], [224, 202],
        [26, 272], [234, 272],
        [97, 308], [163, 308],
        [92, 382], [168, 382],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4.5" stroke="#C4364D" strokeWidth="1.5" fill="none" />
      ))}
      <text x="13" y="52" fill="#C4364D" fontSize="7" style={{ fontFamily: 'JetBrains Mono, monospace' }} opacity="0.65">HEAD</text>
      <text x="13" y="155" fill="#C4364D" fontSize="7" style={{ fontFamily: 'JetBrains Mono, monospace' }} opacity="0.65">TORSO</text>
      <text x="13" y="310" fill="#C4364D" fontSize="7" style={{ fontFamily: 'JetBrains Mono, monospace' }} opacity="0.65">LOWER</text>
      <text x="130" y="397" fill="#C4364D" fontSize="7" textAnchor="middle" style={{ fontFamily: 'JetBrains Mono, monospace' }} opacity="0.55">H-SAP REF — REV 2.4</text>
    </svg>
  );
}

function IntroSection() {
  return (
    <section id="intro" className="as-intro">
      <div className="container-wide">
        <window.Reveal>
          <div className="as-eyebrow">
            <div className="as-bar"></div>
            <span>{'// INTRODUCTION'}</span>
          </div>
        </window.Reveal>
        <window.Reveal delay={100}>
          <h2 className="as-intro-headline">
            Engineering <em>human-grade</em><br />
            solutions — where <em>mechanical<br />
            precision</em> meets biological<br />
            complexity.
          </h2>
        </window.Reveal>
        <window.Reveal delay={200}>
          <p className="as-intro-body">
            Biomedical engineer bridging the gap between clinical need and mechanical
            innovation. Focused on systems where precision engineering enables better
            patient outcomes — from cardiac assist devices to neural interfaces and beyond.
          </p>
        </window.Reveal>
        <window.Reveal delay={280}>
          <div className="as-intro-accent-line"></div>
        </window.Reveal>
      </div>
    </section>
  );
}

function AboutSection() {
  const meta = [
    { k: 'INSTITUTION', v: 'Brigham Young University' },
    { k: 'DEGREE', v: 'B.S. Mechanical Engineering' },
    { k: 'TRACK', v: 'Biomedical Engineering' },
    { k: 'LOCATION', v: 'Provo, Utah' },
    { k: 'STATUS', v: 'ACTIVE CANDIDATE' },
  ];

  return (
    <section id="about" className="as-about">
      <div className="container-wide">
        <div className="as-about-grid">
          <window.Reveal>
            <div className="as-blueprint-panel">
              <div className="as-blueprint-grid-bg"></div>
              <span className="reg-mark tl">+</span>
              <span className="reg-mark tr">+</span>
              <span className="reg-mark bl">+</span>
              <span className="reg-mark br">+</span>
              <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.5rem' }}>
                <BlueprintHuman />
              </div>
              <div className="as-blueprint-tag">ANATOMICAL REF SHEET — REV 3.1</div>
            </div>
          </window.Reveal>
          <window.Reveal delay={150}>
            <div className="as-about-content">
              <div className="as-eyebrow">
                <div className="as-bar"></div>
                <span>{'// PROFILE'}</span>
              </div>
              <h2 className="as-name">CARLOS<br />INCAROCA</h2>
              <p className="as-bio">
                ME student at Brigham Young University specializing in the intersection of
                mechanical engineering and biomedical applications. Designing systems where
                precision engineering enables better patient outcomes — from concept to
                clinical validation.
              </p>
              <div className="as-meta-table">
                {meta.map(({ k, v }) => (
                  <div key={k} className="as-meta-row">
                    <span className="as-meta-key">{k}</span>
                    <span className="as-meta-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </window.Reveal>
        </div>
      </div>
    </section>
  );
}

function SpecBgCanvas() {
  const mountRef = React.useRef(null);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const getW = () => mount.offsetWidth;
    const getH = () => mount.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, getW() / getH(), 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(getW(), getH());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.pointerEvents = 'none';
    mount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const particleCount = 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const srcPos = torusKnot.attributes.position;
    const colorA = new THREE.Color('#C4364D');
    const colorB = new THREE.Color('#2E5C9A');

    for (let i = 0; i < particleCount; i++) {
      const vi = i % srcPos.count;
      positions[i*3]   = originalPositions[i*3]   = srcPos.getX(vi);
      positions[i*3+1] = originalPositions[i*3+1] = srcPos.getY(vi);
      positions[i*3+2] = originalPositions[i*3+2] = srcPos.getZ(vi);
      const c = Math.random() < 0.5 ? colorA : colorB;
      colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.018, vertexColors: true, blending: THREE.NormalBlending,
      transparent: true, opacity: 0.9, depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = getW() / getH();
      camera.updateProjectionMatrix();
      renderer.setSize(getW(), getH());
    };
    window.addEventListener('resize', onResize);

    const mw = new THREE.Vector3(), cur = new THREE.Vector3(), orig = new THREE.Vector3();
    const vel = new THREE.Vector3(), dir = new THREE.Vector3(), ret = new THREE.Vector3();

    let animId, running = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      mw.set(mouse.x * 3, mouse.y * 3, 0);
      for (let i = 0; i < particleCount; i++) {
        const ix = i*3, iy = i*3+1, iz = i*3+2;
        cur.set(positions[ix], positions[iy], positions[iz]);
        orig.set(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
        vel.set(velocities[ix], velocities[iy], velocities[iz]);
        const dist = cur.distanceTo(mw);
        if (dist < 1.5) {
          dir.subVectors(cur, mw).normalize().multiplyScalar((1.5 - dist) * 0.01);
          vel.add(dir);
        }
        ret.subVectors(orig, cur).multiplyScalar(0.001);
        vel.add(ret).multiplyScalar(0.95);
        positions[ix] += vel.x; positions[iy] += vel.y; positions[iz] += vel.z;
        velocities[ix] = vel.x; velocities[iy] = vel.y; velocities[iz] = vel.z;
      }
      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = elapsed * 0.05;
      renderer.render(scene, camera);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) { running = true; animate(); }
      else if (!entry.isIntersecting && running) { running = false; cancelAnimationFrame(animId); }
    }, { threshold: 0 });
    io.observe(mount);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      io.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />;
}

function SpecializationsSection() {
  const items = [
    'Cardiac Systems & Hemodynamics',
    'Neural Interface Design',
    'Prosthetics & Orthotics',
    'Vascular Engineering',
    'Respiratory Device Systems',
    'Exoskeletal Biomechanics',
    'Bioelectronics & Sensing',
    'Computational Biomechanics',
    'Medical Imaging Integration',
    'FDA Regulatory Compliance',
  ];
  const half = 5;

  return (
    <section id="specializations" className="as-spec">
      <SpecBgCanvas />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="container-wide">
        <window.Reveal>
          <div className="as-spec-header">
            <div>
              <div className="as-eyebrow as-eyebrow-inv">
                <div className="as-bar"></div>
                <span>{'// AREAS OF SPECIALIZATION'}</span>
              </div>
              <h2 className="as-spec-title">CORE<br />COMPETENCIES</h2>
            </div>
            <div className="as-spec-count">10 DISCIPLINES</div>
          </div>
        </window.Reveal>
        <div className="as-spec-divider"></div>
        <div className="as-spec-grid">
          {[items.slice(0, half), items.slice(half)].map((col, ci) => (
            <div key={ci} className="as-spec-col">
              {col.map((item, i) => {
                const n = ci * half + i + 1;
                return (
                  <window.Reveal key={item} delay={(ci * half + i) * 50}>
                    <div className="as-spec-item">
                      <span className="as-spec-num">{String(n).padStart(2, '0')}</span>
                      <span className="as-spec-label">{item}</span>
                    </div>
                  </window.Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

window.IntroSection = IntroSection;
window.AboutSection = AboutSection;
window.SpecializationsSection = SpecializationsSection;
