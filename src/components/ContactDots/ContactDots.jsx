import { useRef, useEffect } from 'react'

/* ── Static color values ── */
const FOREST = [27, 77, 54]   // --forest-700
const AMBER  = [217, 146, 43] // --amber-500

/* ── Low-density, soft-opacity layers (~1/3 hero opacity and density) ── */
const LAYERS = [
  { rMin: 1.2, rMax: 1.8, oMin: 0.08, oMax: 0.14, sMin: 0.05, sMax: 0.12 },
  { rMin: 1.8, rMax: 2.6, oMin: 0.12, oMax: 0.20, sMin: 0.08, sMax: 0.16 },
  { rMin: 2.6, rMax: 3.4, oMin: 0.16, oMax: 0.24, sMin: 0.12, sMax: 0.22 },
]

const CONN_DIST = 105

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function createDots(count, w, h) {
  const dots = []
  for (let i = 0; i < count; i++) {
    const roll = Math.random()
    const layer = roll < 0.60 ? 0 : roll < 0.90 ? 1 : 2
    const cfg = LAYERS[layer]
    const angle = Math.random() * Math.PI * 2
    const speed = rand(cfg.sMin, cfg.sMax)

    dots.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: rand(cfg.rMin, cfg.rMax),
      o: rand(cfg.oMin, cfg.oMax),
      layer,
      isAmber: Math.random() < 1 / 12,
      speed,
    })
  }
  dots.sort((a, b) => a.layer - b.layer)
  return dots
}

export default function ContactDots({ containerRef }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    dots: [],
    w: 0,
    h: 0,
    animId: null,
    isStatic: false,
    isVisible: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const st = stateRef.current

    const prefersRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    st.isStatic = prefersRM || isMobile

    function setup() {
      const parent = containerRef?.current || canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      st.w = rect.width
      st.h = rect.height
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function drawConnections() {
      const { dots } = st
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < CONN_DIST * CONN_DIST) {
            const d = Math.sqrt(d2)
            // Extra faint lines that fade out near top edge
            const avgY = (dots[i].y + dots[j].y) / 2
            const topFade = Math.min(1, Math.max(0, avgY / (st.h * 0.3)))
            const a = (1 - d / CONN_DIST) * 0.06 * topFade
            if (a > 0.001) {
              ctx.beginPath()
              ctx.moveTo(dots[i].x, dots[i].y)
              ctx.lineTo(dots[j].x, dots[j].y)
              ctx.strokeStyle = `rgba(${FOREST[0]},${FOREST[1]},${FOREST[2]},${a})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }
    }

    function drawDots() {
      const { dots, h } = st
      for (const dot of dots) {
        // Fade out toward top edge so it smoothly blends into the section above
        const topFade = Math.min(1, Math.max(0, dot.y / (h * 0.28)))
        const alpha = dot.o * topFade
        if (alpha <= 0.002) continue

        const c = dot.isAmber ? AMBER : FOREST
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`
        ctx.fill()
      }
    }

    function update() {
      const { dots, w, h } = st
      for (const dot of dots) {
        dot.x += dot.vx
        dot.y += dot.vy

        dot.vx *= 0.998
        dot.vy *= 0.998

        if (Math.random() < 0.012) {
          const a = Math.random() * Math.PI * 2
          dot.vx += Math.cos(a) * dot.speed * 0.2
          dot.vy += Math.sin(a) * dot.speed * 0.2
        }

        if (dot.x < -20) dot.x += w + 40
        else if (dot.x > w + 20) dot.x -= w + 40
        if (dot.y < -20) dot.y += h + 40
        else if (dot.y > h + 20) dot.y -= h + 40
      }
    }

    function loop() {
      if (!st.isVisible || st.isStatic) return
      const { w, h } = st
      ctx.clearRect(0, 0, w, h)
      update()
      drawConnections()
      drawDots()
      st.animId = requestAnimationFrame(loop)
    }

    function startAnimation() {
      if (st.isStatic) {
        ctx.clearRect(0, 0, st.w, st.h)
        drawConnections()
        drawDots()
        return
      }
      if (!st.animId && st.isVisible) {
        st.animId = requestAnimationFrame(loop)
      }
    }

    function stopAnimation() {
      if (st.animId) {
        cancelAnimationFrame(st.animId)
        st.animId = null
      }
    }

    setup()
    // Roughly one third of hero density (~26 dots on desktop, 14 on mobile)
    const count = st.isStatic ? 14 : 26
    st.dots = createDots(count, st.w, st.h)

    // Render initial static frame
    ctx.clearRect(0, 0, st.w, st.h)
    drawConnections()
    drawDots()

    /* ── IntersectionObserver: start when in view, pause when out of view ── */
    const parentEl = containerRef?.current || canvas.parentElement
    const io = new IntersectionObserver(
      ([entry]) => {
        st.isVisible = entry.isIntersecting
        if (st.isVisible) {
          startAnimation()
        } else {
          stopAnimation()
        }
      },
      { threshold: 0.05 }
    )
    if (parentEl) io.observe(parentEl)

    /* ── VisibilityChange: pause when tab inactive ── */
    function onVisibility() {
      if (document.hidden) {
        stopAnimation()
      } else if (st.isVisible) {
        startAnimation()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    /* ── ResizeObserver ── */
    const ro = new ResizeObserver(() => {
      const prevW = st.w
      const prevH = st.h
      setup()
      if (prevW > 0 && prevH > 0) {
        const sx = st.w / prevW
        const sy = st.h / prevH
        for (const dot of st.dots) {
          dot.x *= sx
          dot.y *= sy
        }
      }
      ctx.clearRect(0, 0, st.w, st.h)
      drawConnections()
      drawDots()
    })
    if (parentEl) ro.observe(parentEl)

    return () => {
      stopAnimation()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [containerRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 28%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 28%)',
      }}
    />
  )
}
