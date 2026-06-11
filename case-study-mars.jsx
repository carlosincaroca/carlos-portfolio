(function () {

  /* ── Mars-rover 3D model background (iframe) ───────────── */
  function MarsRoverBg({ iframeRef, lit }) {
    return (
      <div className={lit ? 'cs-bg-3d lit' : 'cs-bg-3d'} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: lit ? 'auto' : 'none' }}>
        <iframe
          ref={iframeRef}
          src="./byumarsrover-bg.html?v=138"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', opacity: lit ? 1 : 0.92, transition: 'opacity 0.5s ease' }}
        />
      </div>
    );
  }

  /* ── Solar particle background (Three.js, no bloom) — kept for reference ── */
  function SolarBg() {
    const ref = React.useRef(null);

    React.useEffect(() => {
      const container = ref.current;
      if (!container) return;

      const COUNT = 6000;
      const scene  = new THREE.Scene();
      scene.fog    = new THREE.FogExp2(0x000000, 0.003);

      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
      camera.position.set(0, 200, 280);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.PlaneGeometry(0.8, 0.8);
      const material = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec2 vUv; varying vec3 vColor;
          void main() {
            vUv = uv; vColor = instanceColor;
            gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv; varying vec3 vColor; uniform float uTime;
          float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898,4.1414))) * 43758.5453); }
          float noise(vec2 p) {
            vec2 ip = floor(p); vec2 u = fract(p); u = u*u*(3.0-2.0*u);
            return pow(mix(mix(rand(ip),rand(ip+vec2(1,0)),u.x),mix(rand(ip+vec2(0,1)),rand(ip+vec2(1,1)),u.x),u.y),2.0);
          }
          void main() {
            float dist = distance(vUv, vec2(0.5));
            float n = noise(vUv * 5.0 + uTime * 0.5);
            float alpha = (1.0 - smoothstep(0.2, 0.5, dist)) * (0.5 + 0.5 * n);
            if (alpha < 0.1) discard;
            gl_FragColor = vec4(vColor + 0.2, alpha * 0.8);
          }
        `,
        transparent: true, depthWrite: false,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.InstancedMesh(geometry, material, COUNT);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      scene.add(mesh);

      const dummy  = new THREE.Object3D();
      const color  = new THREE.Color();
      const target = new THREE.Vector3();
      const pColor = new THREE.Color();

      const positions = [];
      for (let i = 0; i < COUNT; i++) {
        positions.push(new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        ));
        mesh.setColorAt(i, color.setHex(0xC4364D));
      }

      // Planet defs — dark mode: original cream/color; light mode: lHue/lSat/lLit overrides
      const S = 200;
      const PLANET_DEFS = [
        { orbR:S*0.18, speed:4.8,  sphereR:3.0, tiltF:1.000, eccF:0.206, hue:0.12, sat:0.22, lit:0.85, lHue:0.597, lSat:0.28, lLit:0.17 }, // Mercury
        { orbR:S*0.26, speed:3.9,  sphereR:4.0, tiltF:0.486, eccF:0.007, hue:0.12, sat:0.22, lit:0.85, lHue:0.597, lSat:0.28, lLit:0.17 }, // Venus
        { orbR:S*0.34, speed:3.1,  sphereR:4.5, tiltF:0.000, eccF:0.017, hue:0.62, sat:0.55, lit:0.32, lHue:0.62,  lSat:0.60, lLit:0.28 }, // Earth
        { orbR:S*0.45, speed:2.35, sphereR:3.5, tiltF:0.264, eccF:0.093, hue:0.97, sat:0.78, lit:0.40, lHue:0.97,  lSat:0.82, lLit:0.38 }, // Mars
        { orbR:S*0.60, speed:1.72, sphereR:8.0, tiltF:0.186, eccF:0.048, hue:0.12, sat:0.22, lit:0.85, lHue:0.597, lSat:0.28, lLit:0.17 }, // Jupiter
        { orbR:S*0.77, speed:1.25, sphereR:7.0, tiltF:0.357, eccF:0.054, hue:0.12, sat:0.22, lit:0.85, lHue:0.597, lSat:0.28, lLit:0.17 }, // Saturn
        { orbR:S*0.95, speed:0.92, sphereR:6.0, tiltF:0.114, eccF:0.047, hue:0.12, sat:0.22, lit:0.85, lHue:0.597, lSat:0.28, lLit:0.17 }, // Uranus
        { orbR:S*1.12, speed:0.72, sphereR:5.5, tiltF:0.257, eccF:0.009, hue:0.12, sat:0.22, lit:0.85, lHue:0.597, lSat:0.28, lLit:0.17 }, // Neptune
        { orbR:S*1.12, speed:0.72, sphereR:5.0, tiltF:0.257, eccF:0.009, hue:0.12, sat:0.22, lit:0.85, lHue:0.597, lSat:0.28, lLit:0.17, phase:Math.PI }, // twin
      ];
      const PLANET_COUNTS = [200, 250, 300, 200, 450, 400, 350, 280, 370];
      const PLANET_CUMUL  = [0];
      PLANET_COUNTS.forEach(c => PLANET_CUMUL.push(PLANET_CUMUL[PLANET_CUMUL.length - 1] + c));

      const clock    = new THREE.Clock();
      const speedMult = 0.1;
      const tiltMult  = 0.8;
      const camElev   = 15;
      const camAzim   = 0;
      const camDist   = 300;

      let raf;

      const animate = () => {
        raf = requestAnimationFrame(animate);
        const time = clock.getElapsedTime() * speedMult;
        material.uniforms.uTime.value = time;

        const elevRad = camElev * Math.PI / 180;
        const azimRad = camAzim * Math.PI / 180;
        camera.position.set(
          camDist * Math.cos(elevRad) * Math.sin(azimRad),
          camDist * Math.sin(elevRad),
          camDist * Math.cos(elevRad) * Math.cos(azimRad)
        );
        camera.up.set(
          -Math.sin(elevRad) * Math.sin(azimRad),
           Math.cos(elevRad),
          -Math.sin(elevRad) * Math.cos(azimRad)
        );
        camera.lookAt(0, 0, 0);

        const scale = 130, speed = 3.7, tilt = tiltMult, eccentricity = 1;
        const starRadius = 18, starBrightness = 2;
        const pi2 = Math.PI * 2, golden = 2.399963229728653, eps = 1e-6;
        const starFrac = 0.292, planetFrac = 0.467, beltFrac = 0.133, dustFrac = 0.108;
        const t = time * speed;
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';

        for (let i = 0; i < COUNT; i++) {
          const p = i / COUNT;

          if (p < starFrac) {
            // Sun — warm red-orange
            const local    = p / (starFrac + eps);
            const h        = -1 + 2 * local;
            const rr       = Math.sqrt(Math.max(0, 1 - h * h));
            const theta    = i * golden + t * 1.4;
            const coreMix  = 1 - Math.min(1, local * 2.4);
            const starBase = starRadius * (0.22 + 0.78 * Math.cbrt(local + eps));
            const starPulse = 1 + 0.10 * Math.sin(t * 3.1 + local * pi2 * 10.0);
            const swarm    = starBase * starPulse;
            target.set(
              Math.cos(theta) * rr * swarm,
              h * swarm,
              Math.sin(theta) * rr * swarm
            );
            const hue = 0.97 + 0.01 * Math.sin(t * 0.4 + local * 12.0);
            const sat = 0.65 - 0.15 * coreMix + 0.08 * Math.sin(local * pi2 * 3.0 + t);
            const rawLit = (0.65 + 0.25 * coreMix + starBrightness * 0.18) * (1 + 0.10 * Math.sin(t * 5.0 + local * 20.0));
            const lit = dark ? Math.min(1, rawLit) : Math.min(0.28, rawLit * 0.28);
            pColor.setHSL(hue, Math.max(0, Math.min(1, sat)), Math.max(0, Math.min(1, lit)));

          } else if (p < starFrac + planetFrac) {
            // Planets
            const ppi = Math.min(2799, Math.floor(((p - starFrac) / planetFrac) * 2800));
            let pIdx = 0;
            for (let pi = 0; pi < PLANET_COUNTS.length; pi++) {
              if (ppi < PLANET_CUMUL[pi + 1]) { pIdx = pi; break; }
            }
            const def    = PLANET_DEFS[pIdx];
            const within = ppi - PLANET_CUMUL[pIdx];
            const pCount = PLANET_COUNTS[pIdx];
            const ecc       = def.eccF;
            const ang       = t * def.speed + (def.phase || 0) + pIdx * 0.45;
            const pre       = t * 0.12 + pIdx * 0.31;
            const orb       = def.orbR * (1 - ecc * ecc) / (1 + ecc * Math.cos(ang));
            const orbitTilt = tilt * def.tiltF;
            const ax = Math.cos(ang + pre) * orb;
            const az = Math.sin(ang + pre) * orb;
            const cx = ax * Math.cos(orbitTilt);
            const cy = ax * Math.sin(orbitTilt);
            const h  = -1 + 2 * (within / Math.max(1, pCount - 1));
            const rr = Math.sqrt(Math.max(0, 1 - h * h));
            const sTheta = within * golden;
            const r = def.sphereR * (1 + 0.06 * Math.sin(t * 1.5 + sTheta + pIdx));
            target.set(cx + Math.cos(sTheta) * rr * r, cy + h * r, az + Math.sin(sTheta) * rr * r);
            const pH = dark ? def.hue : (def.lHue ?? def.hue);
            const pS = dark ? def.sat  : (def.lSat ?? def.sat);
            const baseL = dark ? def.lit : def.lLit;
            pColor.setHSL(pH, pS, Math.max(0.08, Math.min(1, baseL * 0.6 + 0.12 * h + 0.06 * Math.sin(t * 2.0 + sTheta))));

          } else if (p < starFrac + planetFrac + beltFrac) {
            // Asteroid belt
            const beltP = (p - starFrac - planetFrac) / beltFrac;
            const pIdx  = Math.min(8, Math.floor(beltP * 9));
            const ang   = (beltP * 9 - pIdx) * Math.PI * 2;
            const pre   = t * 0.12 + pIdx * 0.31;
            const def   = PLANET_DEFS[pIdx];
            const ecc2  = def.eccF;
            const orb   = def.orbR * (1 - ecc2 * ecc2) / (1 + ecc2 * Math.cos(ang));
            const ot    = tilt * def.tiltF;
            const ax    = Math.cos(ang + pre) * orb;
            const az    = Math.sin(ang + pre) * orb;
            target.set(ax * Math.cos(ot), ax * Math.sin(ot), az);
            pColor.setHSL(dark ? def.hue : (def.lHue ?? def.hue), (dark ? def.sat : (def.lSat ?? def.sat)) * 0.3, dark ? 0.15 : 0.20);

          } else {
            // Outer dust — shifted from blue to warm cream/neutral
            const local = (p - starFrac - planetFrac - beltFrac) / (dustFrac + eps);
            const seed  = i * golden;
            const a = seed * 0.8 + t * 0.35;
            const b = seed * 0.43 - t * 0.5;
            const r = scale * (0.95 + 0.7 * local + 0.4 * Math.sin(seed * 0.17 + t));
            target.set(
              Math.cos(a) * r,
              Math.sin(b) * r * 0.35 + Math.sin(seed * 1.3 + t * 1.1) * scale * 0.06,
              Math.sin(a) * r
            );
            const hue = dark ? (0.08 + 0.03 * Math.sin(seed * 0.2)) : 0.08;
            const sat = dark ? (0.15 + 0.10 * Math.sin(seed * 0.33 + t * 0.4)) : 0.30;
            const lit = dark ? (0.28 + 0.12 * Math.exp(-local * 3.0)) : (0.18 + 0.08 * Math.exp(-local * 3.0));
            pColor.setHSL(hue, Math.max(0, Math.min(1, sat)), Math.max(0, Math.min(1, lit)));
          }

          positions[i].lerp(target, 0.1);
          dummy.position.copy(positions[i]);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
          mesh.setColorAt(i, pColor);
        }

        mesh.instanceMatrix.needsUpdate = true;
        mesh.instanceColor.needsUpdate  = true;
        renderer.render(scene, camera);
      };

      animate();

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      const onVisibility = () => { if (document.hidden) cancelAnimationFrame(raf); else animate(); };
      window.addEventListener('resize', onResize);
      document.addEventListener('visibilitychange', onVisibility);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibility);
        renderer.dispose();
        try { if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement); } catch(e) {}
      };
    }, []);

    return React.createElement('div', { ref, style: { position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' } });
  }

  /* ── Mode content ──────────────────────────────────────── */
  const MODES = {
    mobility: {
      title: 'Locomotion system',
      desc: 'Six-wheeled rocker-bogie suspension with independent actuated joints — traversing 30° slopes and 40 cm obstacles while maintaining ground contact across uneven Martian terrain.',
      items: [
        'Rocker-bogie 6-wheel drive',
        'Active suspension, 30° slope rating',
        '40 cm obstacle clearance',
      ],
    },
    science: {
      title: 'Science payload',
      desc: 'Modular science bay integrating XRF spectrometer, Raman laser, and ground-penetrating radar — enabling in-situ geological analysis and sub-surface structural mapping.',
      items: [
        'XRF + Raman spectrometer suite',
        'Ground-penetrating radar (GPR)',
        'Hermetic sample caching system',
      ],
    },
  };

  const PROTOCOLS = [
    { name: 'Mechanical design',  detail: 'Full-system CAD with FEA-validated chassis. Thermal cycling validated at –120 °C to +40 °C simulating Martian diurnal range.', status: 'COMPLETE' },
    { name: 'Autonomy stack',     detail: 'Visual odometry + terrain-relative navigation. ROS 2 path planner with obstacle avoidance tested on Mars-analogue terrain (Atacama Desert).', status: 'ACTIVE' },
    { name: 'Sample system',      detail: 'Rock core drill and hermetic sample container. Contamination protocols per COSPAR planetary protection category IVa.', status: 'IN PROGRESS' },
  ];

  const STACK = [
    'Rocker-bogie suspension',
    'RTG power system',
    'ROS 2 autonomy stack',
    'Multi-spectral imager',
    'NASA-JPL heritage design',
  ];

  /* ── Kinematic-diagram canvas (articulated rover-arm sweep) ── */
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

  /* ── Orbital diagram canvas (kept for reference) ────────── */
  function OrbitalCanvas() {
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

      const BODIES = [
        { r: 0.18, speed: 3.8, size: 2.5, hue: 0.12, sat: 0.22, lit: 0.82, ink: true  }, // Mercury
        { r: 0.28, speed: 2.6, size: 3.2, hue: 0.12, sat: 0.22, lit: 0.82, ink: true  }, // Venus
        { r: 0.40, speed: 1.9, size: 3.5, hue: 0.62, sat: 0.55, lit: 0.45, ink: false }, // Earth (blue)
        { r: 0.52, speed: 1.3, size: 3.0, hue: 0.97, sat: 0.78, lit: 0.48, ink: false }, // Mars  (red) — rover target
        { r: 0.70, speed: 0.8, size: 5.5, hue: 0.12, sat: 0.22, lit: 0.82, ink: true  }, // Jupiter
        { r: 0.88, speed: 0.5, size: 4.8, hue: 0.12, sat: 0.22, lit: 0.82, ink: true  }, // Saturn
      ];

      const draw = () => {
        t += 0.007;
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);
        const cx = w / 2, cy = h / 2;
        const maxR = Math.min(w, h) * 0.46;
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';

        // Sun at center
        const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
        sunGrad.addColorStop(0, dark ? 'rgba(196,54,77,0.95)' : 'rgba(90,10,20,1.0)');
        sunGrad.addColorStop(0.45, dark ? 'rgba(196,54,77,0.50)' : 'rgba(120,20,30,0.60)');
        sunGrad.addColorStop(1, 'rgba(196,54,77,0)');
        ctx.beginPath(); ctx.arc(cx, cy, 28, 0, Math.PI * 2);
        ctx.fillStyle = sunGrad; ctx.fill();
        ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
        ctx.fillStyle = dark ? '#C4364D' : '#5A0A14'; ctx.fill();

        BODIES.forEach((body, idx) => {
          const r = body.r * maxR;
          // Orbit ring
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          if (!dark) {
            ctx.strokeStyle = body.ink ? 'rgba(31,41,55,0.45)' : 'rgba(196,54,77,0.35)';
            ctx.lineWidth = 1.0;
          } else {
            ctx.strokeStyle = 'rgba(196,54,77,0.12)';
            ctx.lineWidth = 0.5;
          }
          ctx.stroke();

          // Body
          const angle = t * body.speed + idx * 0.7;
          const bx = cx + Math.cos(angle) * r;
          const by = cy + Math.sin(angle) * r;
          const c = (!dark && body.ink)
            ? 'hsl(215,28%,17%)'
            : `hsl(${body.hue * 360},${body.sat * 100}%,${body.lit * 100}%)`;

          const glow = ctx.createRadialGradient(bx, by, 0, bx, by, body.size * 3);
          glow.addColorStop(0, `hsla(${body.hue * 360},${body.sat * 100}%,${body.lit * 100}%,0.45)`);
          glow.addColorStop(1, 'transparent');
          ctx.beginPath(); ctx.arc(bx, by, body.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow; ctx.fill();

          ctx.beginPath(); ctx.arc(bx, by, body.size, 0, Math.PI * 2);
          ctx.fillStyle = c; ctx.globalAlpha = 0.9; ctx.fill(); ctx.globalAlpha = 1;

          // Rover trajectory arc around Mars
          if (idx === 3) {
            const rovR = body.size * 3.5;
            const rovAngle = t * 4.5;
            const rx = bx + Math.cos(rovAngle) * rovR;
            const ry = by + Math.sin(rovAngle) * rovR;
            ctx.beginPath(); ctx.arc(bx, by, rovR, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(196,54,77,0.25)'; ctx.lineWidth = 0.5; ctx.stroke();
            ctx.beginPath(); ctx.arc(rx, ry, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(46,92,154,0.9)'; ctx.fill();
          }
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

  /* ── Rover glyph SVG ───────────────────────────────────── */
  function RoverGlyph() {
    return (
      <svg viewBox="0 0 120 120" className="dl-deck-glyph" aria-hidden="true">
        <circle className="dl-glyph-orbit" cx="60" cy="60" r="46" fill="none" strokeWidth="1.4" stroke="var(--red)" />
        <circle cx="60" cy="60" r="16" fill="none" strokeWidth="1.2" stroke="var(--red)" opacity="0.5" />
        <circle cx="60" cy="60" r="5" fill="var(--red)" />
        <circle className="dl-glyph-pulse" cx="60" cy="14" r="3.5" fill="var(--red)" />
        <path d="M60 20v8M60 92v8M20 60h8M92 60h8" strokeWidth="1.2" strokeLinecap="round" stroke="var(--red)" fill="none" opacity="0.4" />
      </svg>
    );
  }

  /* ── Protocol item ─────────────────────────────────────── */
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
  function MarsRoverCaseStudy({ project, onBack, onOpenArm }) {
    const [mode, setMode]           = React.useState('mobility');
    const [exploded, setExploded]   = React.useState(false);
    const [modelView, setModelView] = React.useState(false);
    const [scrolled, setScrolled]   = React.useState(false);
    const iframeRef                 = React.useRef(null);
    const lastTouchRef              = React.useRef(false);
    const md = MODES[mode];

    const handleExplode = () => {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow || !iframe.contentWindow.toggleExplode) return;
      const newState = iframe.contentWindow.toggleExplode();
      setExploded(newState === 1);
    };

    React.useEffect(() => {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow || !iframe.contentWindow.setModelView) return;
      iframe.contentWindow.setModelView(modelView, lastTouchRef.current);
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
      const el = document.documentElement;
      const body = document.body;
      if (modelView) { el.style.background = 'transparent'; body.style.background = 'transparent'; }
      else { el.style.background = ''; body.style.background = ''; }
      return () => { el.style.background = ''; body.style.background = ''; };
    }, [modelView]);

    return (
      <div className="dl-wrap" style={{ background: modelView ? 'transparent' : undefined, transition: 'background-color 0.5s ease' }}>
        <MarsRoverBg iframeRef={iframeRef} lit={modelView} />

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
                <span className="dl-pill"><span className="dl-pill-dot"></span>Aerospace / Robotics</span>
                <span className="dl-pill dl-pill-ghost">BIO MECH / PROJECT 03</span>
              </div>

              <div>
                <h1 className="dl-title">
                  Mars rover<br />
                  surface mission<br />
                  design.
                </h1>
                <p className="dl-lead">
                  A six-wheeled autonomous rover with rocker-bogie suspension, multi-spectral science payload, and a ROS 2 navigation stack — engineered for extended surface operations in Martian terrain.
                </p>
              </div>

              <div className="dl-metrics-row">
                <div className="dl-status-pill">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="dl-pill-dot"></span>Design validated
                  </span>
                  <span style={{ opacity: 0.5 }}>∙</span>
                  <span>NASA-JPL heritage</span>
                </div>
                <div className="dl-metrics-strip">
                  <div className="dl-metric"><span className="dl-metric-lbl">Range</span><span className="dl-metric-val">25km</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">Mass</span><span className="dl-metric-val">320kg</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">Power</span><span className="dl-metric-val">RTG</span></div>
                  <div className="dl-metric"><span className="dl-metric-lbl">Speed</span><span className="dl-metric-val">0.12m/s</span></div>
                </div>
              </div>
            </div>

            <div className="dl-card">
              <div className="dl-mode-header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <p className="dl-lbl dl-subtle">Mode</p>
                  <h2 className="dl-mode-title">{md.title}</h2>
                </div>
                <RoverGlyph />
              </div>
              <p className="dl-subtle" style={{ fontSize: '14px', lineHeight: '1.65' }}>{md.desc}</p>
              <div className="dl-mode-toggle">
                <button className={`dl-mode-btn${mode === 'mobility' ? ' active' : ''}`} onClick={() => setMode('mobility')}>Mobility</button>
                <button className={`dl-mode-btn${mode === 'science'  ? ' active' : ''}`} onClick={() => setMode('science')}>Science</button>
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

            <figure
              className="dl-img-figure"
              role="button"
              tabIndex={0}
              aria-label="Open the rover-arm 3D viewer"
              title="Open rover-arm viewer"
              onClick={onOpenArm}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenArm && onOpenArm(); } }}
              style={{ cursor: onOpenArm ? 'pointer' : undefined }}
            >
              <div className="dl-img-wrap">
                <ArmCanvas />
                <span className="dl-ring1"></span>
                <span className="dl-ring2"></span>
                <span aria-hidden="true" style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2, fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--red)', border: '1px solid var(--red)', borderRadius: '100px', padding: '4px 10px', pointerEvents: 'none' }}>View arm →</span>
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

        <aside className={`ctrl-rail${scrolled && !modelView ? ' is-collapsed' : ''}`} aria-label="Assembly controls">
          <span className="rail-spine" aria-hidden="true">Assembly · Ctrl</span>
          <span className="rail-cross" aria-hidden="true">+</span>

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
