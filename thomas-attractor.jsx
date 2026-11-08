/* ============================================================
   ThomasAttractor — the Intro section's figure.

   GPU particle flow of the Thomas cyclically symmetric attractor
       ẋ = sin y − bx,  ẏ = sin z − by,  ż = sin x − bz
   integrated with RK4 in a fragment shader (ping-pong float render
   targets), drawn as points with three.js (global THREE build).

   Layout: the canvas fills the whole Intro section behind the text
   (the "layer"), while the attractor is centred on the figure's
   stage box. Rotating therefore never meets a hard canvas edge
   inside the page.
   ============================================================ */

function createThomasEngine(layer, stage) {
  const THREE = window.THREE;
  const small = window.innerWidth < 760 || /Mobi|Android/i.test(navigator.userAgent);
  const TEX = small ? 192 : 256;
  const COUNT = TEX * TEX;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
  if (!renderer.capabilities.isWebGL2) { renderer.dispose(); throw new Error('WebGL2 required'); }
  const floatOK = renderer.extensions.has('EXT_color_buffer_float');
  const halfOK = floatOK || renderer.extensions.has('EXT_color_buffer_half_float');
  if (!halfOK) { renderer.dispose(); throw new Error('No renderable float targets'); }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x000000, 0);
  layer.appendChild(renderer.domElement);

  // ---- simulation buffers ----
  const rtOpts = {
    type: (isIOS || !floatOK) ? THREE.HalfFloatType : THREE.FloatType, format: THREE.RGBAFormat,
    minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter,
    depthBuffer: false, stencilBuffer: false, generateMipmaps: false,
  };
  let rtRead = new THREE.WebGLRenderTarget(TEX, TEX, rtOpts);
  let rtWrite = new THREE.WebGLRenderTarget(TEX, TEX, rtOpts);
  const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quadScene = new THREE.Scene();
  const quadGeo = new THREE.PlaneGeometry(2, 2);
  const quad = new THREE.Mesh(quadGeo);
  quadScene.add(quad);

  const HASH = 'float rnd(vec2 n){ return fract(sin(dot(n, vec2(127.1, 311.7))) * 43758.5453123); }';
  const FIELD = 'vec3 field(vec3 p){ return vec3(sin(p.y) - uB*p.x, sin(p.z) - uB*p.y, sin(p.x) - uB*p.z); }';
  const LIFE = 'mix(700.0, 2000.0, rnd(uv * vec2(91.3, 47.7)))';
  const SEED = 'vec3(1.1, 1.1, -0.1)';
  const QUAD_V = 'void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }';

  // Start from a wide cloud; the flow pulls it onto the attractor ("settling").
  const initMat = new THREE.ShaderMaterial({
    uniforms: { uRes: { value: new THREE.Vector2(TEX, TEX) }, uSeed: { value: 0 } },
    vertexShader: QUAD_V,
    fragmentShader: `uniform vec2 uRes; uniform float uSeed; ${HASH}
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes;
        vec3 r = vec3(rnd(uv + uSeed), rnd(uv * 1.3 + uSeed + 3.1), rnd(uv * 0.7 + uSeed + 7.7)) - 0.5;
        float age = rnd(uv * vec2(13.7, 71.1) + uSeed) * 2000.0;
        gl_FragColor = vec4(r * 9.0, age);
      }`,
  });
  const simMat = new THREE.ShaderMaterial({
    uniforms: {
      uPos: { value: null }, uRes: { value: new THREE.Vector2(TEX, TEX) },
      uSeed: { value: 0 }, uB: { value: 0.208 }, uDt: { value: 0.04 },
    },
    vertexShader: QUAD_V,
    fragmentShader: `uniform sampler2D uPos; uniform vec2 uRes; uniform float uSeed, uB, uDt; ${HASH} ${FIELD}
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes;
        vec4 d = texture2D(uPos, uv);
        vec3 p = d.xyz; float age = d.w; float life = ${LIFE};
        for (int i = 0; i < 2; i++) {
          vec3 k1 = field(p);
          vec3 k2 = field(p + 0.5*uDt*k1);
          vec3 k3 = field(p + 0.5*uDt*k2);
          vec3 k4 = field(p + uDt*k3);
          p += (uDt/6.0) * (k1 + 2.0*k2 + 2.0*k3 + k4);
          age += 1.0;
        }
        if (age >= life || length(p) > 30.0 || !(p.x == p.x)) {
          vec3 r = vec3(rnd(uv + uSeed), rnd(uv + uSeed*1.7 + 3.1), rnd(uv + uSeed*0.7 + 7.7)) - 0.5;
          p = ${SEED} + r * 0.8; age = 0.0;
        }
        gl_FragColor = vec4(p, age);
      }`,
  });

  // ---- particles ----
  const geometry = new THREE.BufferGeometry();
  const refs = new Float32Array(COUNT * 2);
  for (let i = 0; i < COUNT; i++) { refs[i * 2] = ((i % TEX) + 0.5) / TEX; refs[i * 2 + 1] = (Math.floor(i / TEX) + 0.5) / TEX; }
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
  geometry.setAttribute('ref', new THREE.BufferAttribute(refs, 2));

  // Brand hex straight to the shader (no colour management), slow → mid → fast.
  const THEMES = {
    light: { slow: '#2E5C9A', mid: '#C4364D', hot: '#1F2937', opacity: 0.42, blending: THREE.NormalBlending },
    dark:  { slow: '#4A59A0', mid: '#C84450', hot: '#FFE9D6', opacity: 0.16, blending: THREE.AdditiveBlending },
  };
  const hexVec = (hex) => { const n = parseInt(hex.slice(1), 16); return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255); };
  const pointsMat = new THREE.ShaderMaterial({
    uniforms: {
      uPos: { value: null }, uB: { value: 0.208 }, uScale: { value: 0.42 }, uSize: { value: 10 },
      cSlow: { value: new THREE.Vector3() }, cMid: { value: new THREE.Vector3() }, cHot: { value: new THREE.Vector3() },
      uSpeedMax: { value: 3.2 }, uOpacity: { value: 0.4 },
    },
    vertexShader: `uniform sampler2D uPos; uniform float uB, uSize, uScale; attribute vec2 ref;
      varying float vSpeed, vLife; ${HASH} ${FIELD}
      void main(){
        vec2 uv = ref; vec4 d = texture2D(uPos, ref);
        vec3 p = d.xyz; float life = ${LIFE};
        float t = clamp(d.w / life, 0.0, 1.0);
        vLife = smoothstep(0.0, 0.05, t) * (1.0 - smoothstep(0.80, 1.0, t));
        vSpeed = length(field(p));
        vec4 mv = modelViewMatrix * vec4(p * uScale, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = clamp(uSize / (-mv.z), 0.7, 6.0);
      }`,
    fragmentShader: `uniform vec3 cSlow, cMid, cHot; uniform float uSpeedMax, uOpacity; varying float vSpeed, vLife;
      void main(){
        vec2 c = gl_PointCoord - 0.5; float d2 = dot(c, c);
        if (d2 > 0.25) discard;
        float a = smoothstep(0.25, 0.0, d2);
        float s = clamp(vSpeed / uSpeedMax, 0.0, 1.0);
        vec3 col = s < 0.5 ? mix(cSlow, cMid, s * 2.0) : mix(cMid, cHot, (s - 0.5) * 2.0);
        gl_FragColor = vec4(col, a * vLife * uOpacity);
      }`,
    transparent: true, depthTest: false, depthWrite: false,
  });
  const points = new THREE.Points(geometry, pointsMat);
  points.frustumCulled = false;

  // Base orientation looks down the (1,1,1) symmetry axis; the home view is that turned exactly 180°.
  const inner = new THREE.Group();
  inner.quaternion.setFromUnitVectors(new THREE.Vector3(1, 1, 1).normalize(), new THREE.Vector3(0, 0, 1));
  inner.add(points);
  const orbit = new THREE.Group();
  const home = { x: 0, y: Math.PI };
  orbit.rotation.set(home.x, home.y, 0);
  orbit.add(inner);
  const scene = new THREE.Scene();
  scene.add(orbit);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 100);

  // Particle opacity = theme opacity × --thomas-strength from CSS (desktop runs it stronger than the mobile background).
  let baseOpacity = THEMES.light.opacity, strength = 1;
  const applyOpacity = () => { pointsMat.uniforms.uOpacity.value = baseOpacity * strength; };
  function setTheme(name) {
    const t = THEMES[name] || THEMES.light;
    pointsMat.uniforms.cSlow.value.copy(hexVec(t.slow));
    pointsMat.uniforms.cMid.value.copy(hexVec(t.mid));
    pointsMat.uniforms.cHot.value.copy(hexVec(t.hot));
    baseOpacity = t.opacity; applyOpacity();
    pointsMat.blending = t.blending;
    pointsMat.needsUpdate = true;
  }

  // ---- framing ----
  // Farthest any particle gets from the origin, measured per b (RK4, dt 0.04). Below the default b the
  // attractor spreads out, so the view zooms out to keep its on-screen size; above it, size stays put.
  const EXTENT = [[0.10, 7.97], [0.13, 5.25], [0.16, 4.78], [0.18, 4.66], [0.208, 4.48]];
  const radiusFor = (b) => {
    const last = EXTENT[EXTENT.length - 1];
    if (b >= last[0]) return last[1];
    for (let i = 1; i < EXTENT.length; i++) {
      const [b1, r1] = EXTENT[i];
      if (b <= b1) { const [b0, r0] = EXTENT[i - 1]; return r0 + ((b - b0) / (b1 - b0)) * (r1 - r0); }
    }
    return EXTENT[0][1];
  };
  const SCALE = 0.42, K = 2.54; // camera sits K attractor-radii away: the perspective that gives the clean three lobes
  let curR = radiusFor(0.208), targetR = curR;
  let W = 1, H = 1, cx = 0.5, cy = 0.5, halfW = 1;
  function applyCamera() {
    // 1.45 scaled units across the stage's half-width.
    const pxPerUnit = (halfW / 1.45) * (EXTENT[EXTENT.length - 1][1] / curR);
    const r = curR * SCALE, d = K * r;
    const fullW = 2 * Math.max(cx, W - cx), fullH = 2 * Math.max(cy, H - cy);
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan((fullH / 2) / (d * pxPerUnit)));
    camera.aspect = fullW / fullH;
    camera.position.set(0, 0, d);
    camera.near = 0.01; camera.far = d + 2 * r + 10;
    camera.setViewOffset(fullW, fullH, fullW / 2 - cx, fullH / 2 - cy, W, H); // attractor centre on the stage centre
    camera.updateProjectionMatrix();
    pointsMat.uniforms.uSize.value = 1.8 * renderer.getPixelRatio() * d;
  }
  function resize() {
    W = layer.clientWidth; H = layer.clientHeight;
    if (!W || !H) return;
    renderer.setSize(W, H, false);
    const lr = layer.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    cx = sr.left - lr.left + sr.width / 2;
    cy = sr.top - lr.top + sr.height / 2;
    halfW = sr.width / 2;
    strength = parseFloat(getComputedStyle(layer).getPropertyValue('--thomas-strength')) || 1; applyOpacity();
    applyCamera();
    if (!raf && running) renderer.render(scene, camera);
  }

  function reset() {
    initMat.uniforms.uSeed.value = Math.random() * 100;
    quad.material = initMat;
    renderer.setRenderTarget(rtRead); renderer.render(quadScene, quadCam);
    renderer.setRenderTarget(null);
  }
  function step(now) {
    // Fresh small seed each frame. Seeding from the clock broke after hours open: float32 lost the low
    // digits, so particles respawned onto a few shared points and the attractor thinned into dotted strands.
    simMat.uniforms.uSeed.value = Math.random() * 10;
    simMat.uniforms.uPos.value = rtRead.texture;
    quad.material = simMat;
    renderer.setRenderTarget(rtWrite); renderer.render(quadScene, quadCam);
    const tmp = rtRead; rtRead = rtWrite; rtWrite = tmp;
    renderer.setRenderTarget(null);
    pointsMat.uniforms.uPos.value = rtRead.texture;
  }

  // ---- interaction: drag the stage to orbit ----
  let autoRotate = false, dragging = false, lastX = 0, lastY = 0, recenterAnim = null;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const onDown = (e) => { recenterAnim = null; dragging = true; lastX = e.clientX; lastY = e.clientY; stage.setPointerCapture(e.pointerId); };
  const onMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
    orbit.rotation.y += dx * 0.008;
    if (!coarse) orbit.rotation.x = Math.max(-1.2, Math.min(1.2, orbit.rotation.x + dy * 0.008)); // phones: sideways only
  };
  const onUp = () => { dragging = false; };
  stage.addEventListener('pointerdown', onDown);
  stage.addEventListener('pointermove', onMove);
  stage.addEventListener('pointerup', onUp);
  stage.addEventListener('pointercancel', onUp);

  // ---- loop (only while started and on screen) ----
  let running = false, visible = false, raf = 0, last = performance.now();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    step(now);
    if (recenterAnim) {
      const k = Math.min(1, (now - recenterAnim.t0) / 800), e = 1 - Math.pow(1 - k, 3);
      orbit.rotation.x = recenterAnim.x0 * (1 - e);
      orbit.rotation.y = recenterAnim.y0 + recenterAnim.dy * e;
      if (k === 1) { orbit.rotation.set(home.x, home.y, 0); recenterAnim = null; }
    } else if (autoRotate && !dragging) {
      orbit.rotation.y += dt * 0.18;
    }
    if (Math.abs(targetR - curR) > 1e-3) { curR += (targetR - curR) * Math.min(1, dt * 3); applyCamera(); }
    renderer.render(scene, camera);
  }
  function play() { if (!raf && running && visible) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function pause() { cancelAnimationFrame(raf); raf = 0; }
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) play(); else pause(); }, { threshold: 0 });
  io.observe(layer);
  const ro = new ResizeObserver(resize);
  ro.observe(layer); ro.observe(stage);

  setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  reset();
  resize();

  return {
    start() {
      if (reduce) { for (let i = 0; i < 600; i++) step(i * 16.7); } // skip the settling, start already formed
      running = true; play();
    },
    setB(v) { simMat.uniforms.uB.value = v; pointsMat.uniforms.uB.value = v; targetR = radiusFor(v); },
    setRotate(on) { autoRotate = on && !reduce; },
    recenter() {
      const TAU = Math.PI * 2;
      const dy = ((((home.y - orbit.rotation.y) % TAU) + TAU + Math.PI) % TAU) - Math.PI; // shortest way round
      recenterAnim = { t0: performance.now(), x0: orbit.rotation.x, y0: orbit.rotation.y, dy };
    },
    setTheme,
    dispose() {
      pause(); io.disconnect(); ro.disconnect();
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onUp);
      rtRead.dispose(); rtWrite.dispose(); quadGeo.dispose(); geometry.dispose();
      initMat.dispose(); simMat.dispose(); pointsMat.dispose(); renderer.dispose();
      if (renderer.domElement.parentNode === layer) layer.removeChild(renderer.domElement);
    },
  };
}

const THOMAS_B_DEFAULT = 0.208;

function ThomasAttractor({ layerRef }) {
  const { c } = window.useLang();
  const t = c.intro.thomas;
  const figRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const engineRef = React.useRef(null);
  const [failed, setFailed] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [b, setB] = React.useState(THOMAS_B_DEFAULT);
  const [tuning, setTuning] = React.useState(false);
  const [rotating, setRotating] = React.useState(false);

  React.useEffect(() => {
    let engine;
    try { engine = createThomasEngine(layerRef.current, stageRef.current); }
    catch (err) { console.warn('Thomas attractor disabled:', err.message); setFailed(true); return undefined; }
    engineRef.current = engine;

    // Follow the site's light/dark toggle
    const mo = new MutationObserver(() => {
      engine.setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Start once the figure is mostly on screen; controls appear after it has settled
    let readyTimer = 0;
    const startIO = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      startIO.disconnect();
      engine.start();
      readyTimer = setTimeout(() => setReady(true), 5000);
    }, { threshold: 0.35 });
    startIO.observe(figRef.current);

    return () => { clearTimeout(readyTimer); startIO.disconnect(); mo.disconnect(); engine.dispose(); engineRef.current = null; };
  }, []);

  if (failed) return null;

  const onB = (e) => {
    const v = parseFloat(e.target.value);
    setB(v); setTuning(true);
    engineRef.current && engineRef.current.setB(v);
  };
  const resetB = () => { setB(THOMAS_B_DEFAULT); engineRef.current && engineRef.current.setB(THOMAS_B_DEFAULT); };
  const toggleRotate = () => {
    const on = !rotating;
    setRotating(on);
    engineRef.current && engineRef.current.setRotate(on);
  };
  const recenter = () => {
    setRotating(false);
    if (engineRef.current) { engineRef.current.setRotate(false); engineRef.current.recenter(); }
  };

  const legend = (
    <div className="thomas-legend">
      <p className="thomas-name">{t.name}</p>
      <div className="thomas-eqs">
        <span>ẋ</span><span className="op">=</span><span><span className="fn">sin</span> y − <span className="b">b</span>x</span>
        <span>ẏ</span><span className="op">=</span><span><span className="fn">sin</span> z − <span className="b">b</span>y</span>
        <span>ż</span><span className="op">=</span><span><span className="fn">sin</span> x − <span className="b">b</span>z</span>
      </div>
    </div>
  );
  const controls = (
    <div className="thomas-ctrl" aria-hidden={!ready}>
      <div className="thomas-b">
        <label htmlFor="thomas-b">b</label>
        <input id="thomas-b" type="range" min="0.10" max="0.32" step="0.001" value={b} aria-orientation="vertical"
          tabIndex={ready ? 0 : -1}
          onChange={onB}
          onPointerUp={() => setTimeout(() => setTuning(false), 600)}
          onKeyUp={() => setTimeout(() => setTuning(false), 600)}
          onDoubleClick={resetB} />
        <output htmlFor="thomas-b">{b.toFixed(3)}</output>
      </div>
      <button type="button" className="thomas-btn" aria-pressed={rotating} onClick={toggleRotate} tabIndex={ready ? 0 : -1}>{t.rotate}</button>
      <button type="button" className="thomas-btn" onClick={recenter} tabIndex={ready ? 0 : -1}>{t.recenter}</button>
    </div>
  );
  // Faint control row above the attractor (full strength on hover/focus); name + equations below it.
  return (
    <figure ref={figRef} className={`thomas${ready ? ' ready' : ''}${tuning ? ' tuning' : ''}`}>
      <div className="thomas-bar">{controls}</div>
      <div ref={stageRef} className="thomas-stage" role="img" aria-label={t.name}></div>
      <figcaption className="thomas-cap">{legend}</figcaption>
    </figure>
  );
}

window.ThomasAttractor = ThomasAttractor;
