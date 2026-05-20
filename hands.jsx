(function () {
  const { useRef, useEffect } = React;

  function HandsModel({ rotationProgress }) {
    const containerRef = useRef(null);
    const stateRef = useRef({ progress: 0 });

    useEffect(() => { stateRef.current.progress = rotationProgress; }, [rotationProgress]);

    useEffect(() => {
      const container = containerRef.current;
      const THREE = window.THREE;
      if (!container || !THREE) return;

      const rect = container.getBoundingClientRect();
      let width = rect.width || 800;
      let height = rect.height || 450;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
      camera.position.set(0, 0.3, 8.5);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      const canvas = renderer.domElement;
      canvas.style.cssText = 'width:100%;height:100%;display:block;';
      container.appendChild(canvas);

      const inkMat = new THREE.LineBasicMaterial({ color: 0xC4364D, transparent: true, opacity: 0.9 });
      const inkSoftMat = new THREE.LineBasicMaterial({ color: 0xC4364D, transparent: true, opacity: 0.45 });
      const gridMat = new THREE.LineBasicMaterial({ color: 0x1F2937, transparent: true, opacity: 0.08 });

      function edges(geom, threshold = 12) { return new THREE.LineSegments(new THREE.EdgesGeometry(geom, threshold), inkMat); }
      function curveLine(points, samples = 64, material = inkMat) {
        const v3 = points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
        const curve = new THREE.CatmullRomCurve3(v3, false, 'catmullrom', 0.25);
        const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(samples));
        return new THREE.Line(g, material);
      }
      function straightLine(a, b, material = inkMat) {
        const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a[0], a[1], a[2]), new THREE.Vector3(b[0], b[1], b[2])]);
        return new THREE.Line(g, material);
      }

      function buildFinger(segs) {
        const root = new THREE.Group();
        let parent = root;
        for (let i = 0; i < segs.length; i++) {
          const { length: L, radius: r, curl } = segs[i];
          const pivot = new THREE.Group();
          pivot.rotation.z = -curl;
          parent.add(pivot);
          pivot.add(edges(new THREE.SphereGeometry(r * 1.25, 12, 8), 6));
          const boltMesh = edges(new THREE.CylinderGeometry(r * 0.55, r * 0.55, r * 0.7, 6), 1);
          boltMesh.position.set(r * 0.95, 0, 0); boltMesh.rotation.z = Math.PI / 2; pivot.add(boltMesh);
          const cylMesh = edges(new THREE.CylinderGeometry(r * 0.82, r * 0.95, L, 14), 8);
          cylMesh.position.y = L / 2; pivot.add(cylMesh);
          const plateMesh = edges(new THREE.BoxGeometry(r * 0.6, L * 0.7, r * 1.7), 1);
          plateMesh.position.set(r * 0.7, L * 0.5, 0); pivot.add(plateMesh);
          const bandMesh = edges(new THREE.TorusGeometry(r * 1.08, r * 0.12, 6, 18), 6);
          bandMesh.position.y = L * 0.5; bandMesh.rotation.x = Math.PI / 2; pivot.add(bandMesh);
          for (let k = 0; k < 3; k++) { const ty = L * (0.2 + k * 0.22); pivot.add(straightLine([-r*0.9, ty, -r*0.4], [-r*0.9, ty, r*0.4], inkSoftMat)); }
          const rivetMesh = edges(new THREE.SphereGeometry(r * 0.18, 6, 4), 1);
          rivetMesh.position.set(r * 1.0, L * 0.78, 0); pivot.add(rivetMesh);
          const next = new THREE.Group(); next.position.y = L; pivot.add(next); parent = next;
        }
        const tipMesh = edges(new THREE.SphereGeometry(0.08, 10, 8), 4); parent.add(tipMesh);
        const tipRingMesh = edges(new THREE.TorusGeometry(0.085, 0.018, 4, 14), 1);
        tipRingMesh.position.y = -0.05; tipRingMesh.rotation.x = Math.PI / 2; parent.add(tipRingMesh);
        return root;
      }

      function buildHand() {
        const hand = new THREE.Group();
        const FOREARM_L = 2.4, NUM_SEGS = 3, segLen = FOREARM_L / NUM_SEGS;
        for (let i = 0; i < NUM_SEGS; i++) {
          const t = i / (NUM_SEGS - 1), r = 0.55 + Math.sin(t * Math.PI) * 0.06 - t * 0.05;
          const m = edges(new THREE.CylinderGeometry(r, r * 1.04, segLen * 0.84, 18), 12);
          m.rotation.z = Math.PI / 2; m.position.x = -0.55 - segLen * 0.5 - i * segLen; hand.add(m);
          if (i < NUM_SEGS - 1) { const torMesh = edges(new THREE.TorusGeometry(r + 0.04, 0.06, 6, 22), 8); torMesh.rotation.y = Math.PI / 2; torMesh.position.x = -0.55 - (i + 1) * segLen; hand.add(torMesh); }
        }
        const rodMesh = edges(new THREE.CylinderGeometry(0.18, 0.18, FOREARM_L, 8), 8);
        rodMesh.rotation.z = Math.PI / 2; rodMesh.position.x = -0.55 - FOREARM_L / 2; hand.add(rodMesh);
        const cuffMesh = edges(new THREE.CylinderGeometry(0.58, 0.58, 0.45, 18), 14);
        cuffMesh.rotation.z = Math.PI / 2; cuffMesh.position.x = -0.15; hand.add(cuffMesh);
        const rimMesh = edges(new THREE.TorusGeometry(0.59, 0.04, 6, 22), 6);
        rimMesh.rotation.y = Math.PI / 2; rimMesh.position.x = 0.08; hand.add(rimMesh);
        const panelMesh = edges(new THREE.BoxGeometry(0.45, 0.18, 0.6), 6);
        panelMesh.position.set(-0.2, 0.42, 0); hand.add(panelMesh);
        [[-0.18,0.22],[0.18,0.22],[-0.18,-0.22],[0.18,-0.22]].forEach(([dx,dz]) => { const sMesh = edges(new THREE.CylinderGeometry(0.035,0.035,0.05,8),6); sMesh.position.set(-0.2+dx,0.5,dz); hand.add(sMesh); });
        [{z:0.30,y0:0.38,y1:0.52,side:1},{z:0.12,y0:0.36,y1:0.50,side:1},{z:-0.06,y0:0.40,y1:0.54,side:1},{z:-0.24,y0:0.36,y1:0.50,side:1},{z:0.45,y0:0.05,y1:0.18,side:0.6},{z:-0.45,y0:0.05,y1:0.18,side:0.6}].forEach((c) => {
          hand.add(curveLine([[0.10,(c.y0-0.05)*c.side,c.z],[-0.30,c.y0*c.side,c.z+0.03],[-0.85,c.y1*c.side,c.z],[-1.40,(c.y1-0.02)*c.side,c.z+0.04],[-1.95,c.y1*c.side,c.z-0.02],[-2.50,c.y0*c.side,c.z+0.02]], 80, inkMat));
        });
        const PALM_L=1.0,PALM_T=0.32,PALM_W=1.05;
        const palmMesh = edges(new THREE.BoxGeometry(PALM_L,PALM_T,PALM_W),4); palmMesh.position.set(PALM_L/2+0.1,0,0); hand.add(palmMesh);
        const plateMesh2 = edges(new THREE.BoxGeometry(PALM_L*0.78,0.1,PALM_W*0.72),4); plateMesh2.position.set(PALM_L*0.5+0.1,PALM_T*0.5+0.05,0); hand.add(plateMesh2);
        [-PALM_W*0.35,-PALM_W*0.12,PALM_W*0.12,PALM_W*0.35].forEach((z) => { const km = edges(new THREE.SphereGeometry(0.14,12,8),4); km.position.set(PALM_L+0.1,PALM_T*0.3,z); hand.add(km); });
        [[-0.15,0.2],[0.15,0.2],[0,0],[0,-0.2]].forEach(([dx,dz]) => { const dMesh = edges(new THREE.CylinderGeometry(0.04,0.04,0.04,8),4); dMesh.position.set(PALM_L*0.5+0.1+dx,PALM_T*0.5+0.1,dz); hand.add(dMesh); });
        const fingerRootX = PALM_L+0.1;
        [{z:PALM_W*0.34,segs:[{length:0.62,radius:0.135,curl:0.00},{length:0.50,radius:0.118,curl:0.04},{length:0.38,radius:0.098,curl:0.02}]},{z:PALM_W*0.11,segs:[{length:0.66,radius:0.135,curl:0.10},{length:0.52,radius:0.118,curl:0.18},{length:0.38,radius:0.098,curl:0.12}]},{z:-PALM_W*0.12,segs:[{length:0.60,radius:0.125,curl:0.16},{length:0.48,radius:0.108,curl:0.26},{length:0.34,radius:0.088,curl:0.18}]},{z:-PALM_W*0.34,segs:[{length:0.50,radius:0.115,curl:0.22},{length:0.40,radius:0.098,curl:0.32},{length:0.30,radius:0.080,curl:0.22}]}].forEach((f,i) => { const finger = buildFinger(f.segs); finger.position.set(fingerRootX,0,f.z); finger.rotation.z=-Math.PI/2; finger.rotation.y=(i-1.5)*0.05; hand.add(finger); });
        const thumb = buildFinger([{length:0.50,radius:0.145,curl:0.05},{length:0.40,radius:0.120,curl:0.18},{length:0.30,radius:0.090,curl:0.10}]);
        thumb.position.set(0.45,PALM_T*0.15,PALM_W*0.50); thumb.rotation.order='YZX'; thumb.rotation.y=-Math.PI/3; thumb.rotation.z=-Math.PI/2.5; hand.add(thumb);
        return hand;
      }

      const TIP_REACH = 1.0+0.1+0.135+0.62+0.50+0.38, GAP = 0.20;
      const leftHand = buildHand();
      leftHand.position.set(-GAP/2-TIP_REACH,-0.15,0.0); leftHand.rotation.z=0.055; leftHand.rotation.y=-0.04;
      const rightHand = buildHand();
      rightHand.rotation.order='YZX'; rightHand.position.set(GAP/2+TIP_REACH,0.15,0.0); rightHand.rotation.y=Math.PI+0.04; rightHand.rotation.z=0.055;
      const handsGroup = new THREE.Group();
      handsGroup.add(leftHand); handsGroup.add(rightHand);
      handsGroup.position.y = 0;
      scene.add(handsGroup);

      const gridGroup = new THREE.Group();
      for (let i = -15; i <= 15; i += 0.5) { gridGroup.add(straightLine([-15,i,-8],[15,i,-8],gridMat)); gridGroup.add(straightLine([i,-15,-8],[i,15,-8],gridMat)); }
      scene.add(gridGroup);

      const spark = new THREE.Group();
      spark.add(straightLine([-0.18,0,0],[0.18,0,0],inkMat)); spark.add(straightLine([0,-0.18,0],[0,0.18,0],inkMat));
      const sparkRingMesh = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.TorusGeometry(0.22,0.012,4,24),1),inkMat);
      sparkRingMesh.rotation.x=Math.PI/2; spark.add(sparkRingMesh); handsGroup.add(spark);

      const onResize = () => { const r=container.getBoundingClientRect(); width=r.width; height=r.height; if(!width||!height)return; renderer.setSize(width,height); camera.aspect=width/height; camera.updateProjectionMatrix(); };
      const ro = new ResizeObserver(onResize); ro.observe(container);

      const rotAxis = new THREE.Vector3(0.35,1.0,0.22).normalize();
      const startRad = (71*Math.PI)/180;
      let raf=0;
      const render = () => { const p=stateRef.current.progress||0; handsGroup.setRotationFromAxisAngle(rotAxis,startRad+p*Math.PI*2); renderer.render(scene,camera); raf=requestAnimationFrame(render); };
      render();

      return () => { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); try { if(canvas.parentNode===container)container.removeChild(canvas); } catch(e){} };
    }, []);

    return React.createElement('div', { ref: containerRef, style: { position:'absolute', inset:0, width:'100%', height:'100%' } });
  }

  window.HandsModel = HandsModel;
})();