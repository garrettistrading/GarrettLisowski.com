"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CinematicBg() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    /* ═══════════ LAYER 1 — Deep background dust ═══════════ */
    const dustCount = 900;
    const dustPos = new Float32Array(dustCount * 3);
    const dustRnd = new Float32Array(dustCount);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 40;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      dustPos[i * 3 + 2] = -Math.random() * 22 - 4;
      dustRnd[i] = Math.random();
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute("aRnd", new THREE.BufferAttribute(dustRnd, 1));
    const dustMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */ `
        attribute float aRnd;
        uniform float uTime;
        varying float vA;
        void main(){
          vec3 p=position;
          p.x+=sin(uTime*0.06+p.y*0.15+aRnd*6.28)*0.35;
          p.y+=cos(uTime*0.05+p.x*0.12+aRnd*3.14)*0.35;
          vec4 mv=modelViewMatrix*vec4(p,1.);
          gl_Position=projectionMatrix*mv;
          gl_PointSize=(0.4+aRnd*1.2)*(140./(-mv.z));
          vA=smoothstep(-28.,-4.,mv.z)*(0.06+aRnd*0.14);
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;
        void main(){
          float d=length(gl_PointCoord-.5);
          if(d>.5)discard;
          gl_FragColor=vec4(.45,.65,.78,vA*exp(-d*4.));
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(dustGeo, dustMat));

    /* ═══════════ LAYER 2 — Constellation nodes ═══════════ */
    const N = 130;
    const nBase = new Float32Array(N * 3);
    const nAnim = new Float32Array(N * 3);
    const nRnd = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      nBase[i * 3] = (Math.random() - 0.5) * 22;
      nBase[i * 3 + 1] = (Math.random() - 0.5) * 22;
      nBase[i * 3 + 2] = (Math.random() - 0.5) * 12 - 1;
      nRnd[i] = Math.random();
    }
    nAnim.set(nBase);
    const nGeo = new THREE.BufferGeometry();
    nGeo.setAttribute("position", new THREE.BufferAttribute(nAnim, 3));
    nGeo.setAttribute("aRnd", new THREE.BufferAttribute(nRnd, 1));
    const nMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */ `
        attribute float aRnd;
        uniform float uTime;
        varying float vA;varying float vR;
        void main(){
          vec4 mv=modelViewMatrix*vec4(position,1.);
          gl_Position=projectionMatrix*mv;
          float pulse=.75+.25*sin(uTime*(1.+aRnd*2.)+aRnd*6.28);
          gl_PointSize=(2.+aRnd*4.5)*(220./(-mv.z));
          vA=smoothstep(-18.,-1.,mv.z)*(.2+aRnd*.5)*pulse;
          vR=aRnd;
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;varying float vR;
        void main(){
          float d=length(gl_PointCoord-.5);
          if(d>.5)discard;
          float g=exp(-d*4.5);
          vec3 c=mix(vec3(.071,.933,.988),vec3(.65,.78,.88),smoothstep(.15,.7,vR));
          c=mix(c,vec3(.04,.94,.69),smoothstep(.75,1.,vR)*.4);
          gl_FragColor=vec4(c,vA*g);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(nGeo, nMat));

    /* ═══════════ LAYER 2b — Constellation lines ═══════════ */
    const ML = 500;
    const lPos = new Float32Array(ML * 6);
    const lCol = new Float32Array(ML * 6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
    lGeo.setAttribute("color", new THREE.BufferAttribute(lCol, 3));
    lGeo.setDrawRange(0, 0);
    const lMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.LineSegments(lGeo, lMat));

    /* ═══════════ LAYER 3 — Foreground sparkles ═══════════ */
    const sCount = 70;
    const sPos = new Float32Array(sCount * 3);
    const sRnd = new Float32Array(sCount);
    for (let i = 0; i < sCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 16;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      sPos[i * 3 + 2] = Math.random() * 3 + 1;
      sRnd[i] = Math.random();
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    sGeo.setAttribute("aRnd", new THREE.BufferAttribute(sRnd, 1));
    const sMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */ `
        attribute float aRnd;uniform float uTime;varying float vA;
        void main(){
          vec3 p=position;
          p.x+=sin(uTime*.22+aRnd*6.28)*.25;
          p.y+=cos(uTime*.18+aRnd*3.14)*.25;
          vec4 mv=modelViewMatrix*vec4(p,1.);
          gl_Position=projectionMatrix*mv;
          gl_PointSize=(1.5+aRnd*3.)*(260./(-mv.z));
          float pulse=.6+.4*sin(uTime*(1.5+aRnd*3.)+aRnd*6.28);
          vA=pulse*(.25+aRnd*.45);
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;
        void main(){
          float d=length(gl_PointCoord-.5);
          if(d>.5)discard;
          float core=exp(-d*8.);float halo=exp(-d*3.)*.5;
          gl_FragColor=vec4(.071,.933,.988,vA*(core+halo));
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(sGeo, sMat));

    /* ═══════════ LAYER 4 — Nebula clouds ═══════════ */
    const clouds = [
      { c: "#12eefc", x: -5, y: 4, z: -9, s: 14, o: 0.022, sp: 0.035 },
      { c: "#0af0b0", x: 6, y: -3, z: -11, s: 16, o: 0.018, sp: 0.028 },
      { c: "#5a2dfc", x: -3, y: -6, z: -14, s: 18, o: 0.014, sp: 0.022 },
      { c: "#12eefc", x: 7, y: 5, z: -16, s: 12, o: 0.016, sp: 0.03 },
    ].map((cfg) => {
      const geo = new THREE.PlaneGeometry(cfg.s, cfg.s);
      const mat = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(cfg.c) }, uOp: { value: cfg.o } },
        vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `uniform vec3 uColor;uniform float uOp;varying vec2 vUv;
          void main(){float d=length(vUv-.5)*2.;float a=smoothstep(1.,0.,d);a=a*a*a*uOp;gl_FragColor=vec4(uColor,a);}`,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      scene.add(mesh);
      return { mesh, ...cfg };
    });

    /* ═══════════ Mouse ═══════════ */
    const m = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMM = (e: MouseEvent) => {
      m.tx = (e.clientX / window.innerWidth) * 2 - 1;
      m.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMM);

    /* ═══════════ Render loop ═══════════ */
    let raf: number;
    const clock = new THREE.Clock();
    const TH = 4.2;
    const TH2 = TH * TH;

    const tick = () => {
      const t = clock.getElapsedTime();
      m.x += (m.tx - m.x) * 0.018;
      m.y += (m.ty - m.y) * 0.018;

      dustMat.uniforms.uTime.value = t;
      nMat.uniforms.uTime.value = t;
      sMat.uniforms.uTime.value = t;

      // Camera
      camera.position.x = m.x * 0.8;
      camera.position.y = m.y * 0.45;
      camera.lookAt(0, 0, 0);

      // Animate constellation positions (JS side for line computation)
      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        const r = nRnd[i];
        nAnim[i3] = nBase[i3] + Math.sin(t * 0.1 + nBase[i3 + 1] * 0.25 + r * 6.28) * 0.6;
        nAnim[i3 + 1] = nBase[i3 + 1] + Math.cos(t * 0.08 + nBase[i3] * 0.2 + r * 3.14) * 0.6;
        nAnim[i3 + 2] = nBase[i3 + 2] + Math.sin(t * 0.06 + r * 6.28) * 0.3;
      }
      (nGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Constellation connections
      let lc = 0;
      for (let i = 0; i < N && lc < ML; i++) {
        const ax = nAnim[i * 3], ay = nAnim[i * 3 + 1], az = nAnim[i * 3 + 2];
        for (let j = i + 1; j < N && lc < ML; j++) {
          const dx = ax - nAnim[j * 3];
          const dy = ay - nAnim[j * 3 + 1];
          const dz = az - nAnim[j * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < TH2) {
            const a = (1 - Math.sqrt(d2) / TH) * 0.22;
            const idx = lc * 6;
            lPos[idx] = ax; lPos[idx + 1] = ay; lPos[idx + 2] = az;
            lPos[idx + 3] = nAnim[j * 3]; lPos[idx + 4] = nAnim[j * 3 + 1]; lPos[idx + 5] = nAnim[j * 3 + 2];
            const cr = 0.071 * a, cg = 0.933 * a, cb = 0.988 * a;
            lCol[idx] = cr; lCol[idx + 1] = cg; lCol[idx + 2] = cb;
            lCol[idx + 3] = cr; lCol[idx + 4] = cg; lCol[idx + 5] = cb;
            lc++;
          }
        }
      }
      lGeo.setDrawRange(0, lc * 2);
      (lGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      // Nebula drift
      clouds.forEach((c) => {
        c.mesh.position.x = c.x + Math.sin(t * c.sp) * 2;
        c.mesh.position.y = c.y + Math.cos(t * c.sp * 0.7) * 1.5;
        c.mesh.rotation.z = t * c.sp * 0.2;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      [dustGeo, nGeo, sGeo, lGeo].forEach((g) => g.dispose());
      [dustMat, nMat, sMat, lMat].forEach((mt) => mt.dispose());
      clouds.forEach((c) => {
        c.mesh.geometry.dispose();
        (c.mesh.material as THREE.ShaderMaterial).dispose();
      });
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
