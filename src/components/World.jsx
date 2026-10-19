import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/*
 * "The Build" — an original scroll-driven Three.js world.
 * The camera travels down a corridor of portal frames and monoliths through fog and
 * drifting dust; each portal marks a chapter of the page. A vermilion moon waits at the end.
 * Everything renders on the GPU; the loop pauses when the tab is hidden.
 */
const ACCENT = new THREE.Color('#e0231c')
const GATE_GAP = 22
const GATES = 9

export default function World({ onReady }) {
  const ref = useRef(null)

  useEffect(() => {
    const mount = ref.current
    let renderer, small = false
    try {
      small = window.innerWidth < 760 || (navigator.hardwareConcurrency || 8) <= 4
      renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: false, powerPreference: 'high-performance' })
    } catch {
      onReady?.(false)
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 1)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.022)
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 400)
    camera.position.set(0, 2.2, 10)

    const END = -GATES * GATE_GAP - 10

    /* ── ground grid ─────────────────────────────────────────── */
    const grid = new THREE.GridHelper(600, 150, 0x2a2a2a, 0x161616)
    grid.position.set(0, -3, END / 2)
    scene.add(grid)

    /* ── portal gates (one per chapter) ──────────────────────── */
    const gates = new THREE.Group()
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, fog: true })
    const accentMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.9, fog: true })
    const solidMat = new THREE.MeshBasicMaterial({ color: 0x050505, fog: true })
    const frame = (w, h, t, mat) => {
      const g = new THREE.Group()
      const bars = [
        [w, t, t, 0, h / 2], [w, t, t, 0, -h / 2],
        [t, h, t, -w / 2, 0], [t, h, t, w / 2, 0],
      ]
      for (const [bw, bh, bd, x, y] of bars) {
        const geo = new THREE.BoxGeometry(bw, bh, bd)
        const m = new THREE.Mesh(geo, solidMat)
        m.position.set(x, y, 0)
        const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat)
        e.position.copy(m.position)
        g.add(m, e)
      }
      return g
    }
    const spinners = []
    for (let i = 0; i < GATES; i++) {
      const z = -i * GATE_GAP - 6
      const outer = frame(13, 9, 0.35, i === 0 ? accentMat : lineMat)
      outer.position.set(0, 1.5, z)
      gates.add(outer)
      const inner = frame(6, 6, 0.12, lineMat)
      inner.position.set(0, 1.5, z - 1.2)
      inner.rotation.z = Math.PI / 4
      gates.add(inner)
      spinners.push(inner)
    }
    scene.add(gates)

    /* ── monoliths lining the path ───────────────────────────── */
    const monos = new THREE.Group()
    const rnd = (a, b) => a + Math.random() * (b - a)
    const monoEdge = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, fog: true })
    for (let i = 0; i < 70; i++) {
      const h = rnd(3, 22), w = rnd(0.8, 3.5), d = rnd(0.8, 3.5)
      const geo = new THREE.BoxGeometry(w, h, d)
      const m = new THREE.Mesh(geo, solidMat)
      const side = Math.random() < 0.5 ? -1 : 1
      m.position.set(side * rnd(11, 40), -3 + h / 2, rnd(END - 20, 20))
      m.rotation.y = rnd(-0.4, 0.4)
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), monoEdge)
      e.position.copy(m.position); e.rotation.copy(m.rotation)
      monos.add(m, e)
    }
    scene.add(monos)

    /* ── drifting dust (shader points) ───────────────────────── */
    const N = small ? 1600 : 3500
    const pos = new Float32Array(N * 3), seed = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      pos[i * 3] = rnd(-45, 45); pos[i * 3 + 1] = rnd(-3, 26); pos[i * 3 + 2] = rnd(END - 30, 20)
      seed[i] = Math.random()
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    dustGeo.setAttribute('seed', new THREE.BufferAttribute(seed, 1))
    const dustMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPx: { value: renderer.getPixelRatio() } },
      vertexShader: `
        attribute float seed; uniform float uTime; uniform float uPx; varying float vA;
        void main() {
          vec3 p = position;
          p.y += sin(uTime * 0.35 + seed * 40.0) * 0.6;
          p.x += cos(uTime * 0.25 + seed * 25.0) * 0.5;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float d = -mv.z;
          gl_PointSize = (1.2 + seed * 2.2) * uPx * (30.0 / max(d, 1.0));
          vA = (0.35 + 0.65 * fract(seed * 7.0)) * smoothstep(120.0, 10.0, d) * (0.6 + 0.4 * sin(uTime * 1.5 + seed * 60.0));
        }`,
      fragmentShader: `
        varying float vA;
        void main() {
          float r = length(gl_PointCoord - 0.5);
          if (r > 0.5) discard;
          gl_FragColor = vec4(vec3(1.0), vA * smoothstep(0.5, 0.0, r));
        }`,
    })
    scene.add(new THREE.Points(dustGeo, dustMat))

    /* ── vermilion moon + halo at the end of the path ────────── */
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(16, 48, 48),
      new THREE.ShaderMaterial({
        fog: false,
        uniforms: { uCol: { value: ACCENT } },
        vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
        fragmentShader: `uniform vec3 uCol; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.2); vec3 c = mix(uCol * 0.85, vec3(1.0, 0.75, 0.7), f * 0.6); gl_FragColor = vec4(c, 1.0); }`,
      }),
    )
    moon.position.set(0, 14, END - 60)
    scene.add(moon)
    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 120),
      new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
        uniforms: { uCol: { value: ACCENT } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 uCol; varying vec2 vUv; void main(){ float d = length(vUv - 0.5) * 2.0; float a = smoothstep(1.0, 0.25, d) * 0.55; gl_FragColor = vec4(uCol, a); }`,
      }),
    )
    halo.position.copy(moon.position).add(new THREE.Vector3(0, 0, -2))
    scene.add(halo)

    /* ── state: scroll + mouse ───────────────────────────────── */
    let target = 0, current = 0, mx = 0, my = 0, cmx = 0, cmy = 0
    const readScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      target = Math.min(1, Math.max(0, window.scrollY / max))
    }
    const onMove = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5 }
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      readScroll()
    }
    readScroll()
    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', onResize)

    let raf, visible = true
    const onVis = () => { visible = !document.hidden; if (visible) loop() }
    document.addEventListener('visibilitychange', onVis)
    const t0 = performance.now()
    const look = new THREE.Vector3()

    const frameTick = () => {
      const t = (performance.now() - t0) / 1000
      current += (target - current) * 0.06
      cmx += (mx - cmx) * 0.05; cmy += (my - cmy) * 0.05
      const z = 10 + (END - 10) * current
      camera.position.set(cmx * 3, 2.2 - cmy * 1.5 + Math.sin(t * 0.4) * 0.15, z)
      look.set(cmx * 1.2, 1.5 + current * 6, z - 20)
      camera.lookAt(look)
      spinners.forEach((s, i) => { s.rotation.z = Math.PI / 4 + t * 0.15 * (i % 2 ? 1 : -1) })
      dustMat.uniforms.uTime.value = t
      halo.lookAt(camera.position)
      renderer.render(scene, camera)
    }
    const loop = () => {
      if (!visible) return
      frameTick()
      if (!reduce) raf = requestAnimationFrame(loop)
    }
    loop()
    requestAnimationFrame(() => onReady?.(true))

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      scene.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.() })
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [onReady])

  return <div className="world" ref={ref} aria-hidden="true" />
}
