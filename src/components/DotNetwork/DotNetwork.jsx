import { useRef, useEffect } from 'react'

/* ── Static color values (avoid CSS var parsing in hot loop) ── */
const FOREST = [27, 77, 54]   // --forest-700
const AMBER  = [217, 146, 43] // --amber-500

/* ── Layer configs: back, middle, front ── */
const LAYERS = [
  { rMin: 1.5, rMax: 2.0, oMin: 0.20, oMax: 0.35, sMin: 0.08, sMax: 0.18 },
  { rMin: 2.0, rMax: 3.0, oMin: 0.30, oMax: 0.50, sMin: 0.15, sMax: 0.30 },
  { rMin: 3.0, rMax: 4.5, oMin: 0.40, oMax: 0.60, sMin: 0.20, sMax: 0.40 },
]

const CURSOR_DIST = 160

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function getParams(width) {
  const isMobile = width < 768
  return {
    count: isMobile ? 46 : 80,
    connDist: isMobile ? 95 : 120,
    cursorDist: 150,
  }
}

function createDots(count, w, h) {
  const safeW = Math.max(w || 0, 320)
  const safeH = Math.max(h || 0, 400)
  const dots = []
  for (let i = 0; i < count; i++) {
    const roll = Math.random()
    const layer = roll < 0.60 ? 0 : roll < 0.90 ? 1 : 2
    const cfg = LAYERS[layer]
    const angle = Math.random() * Math.PI * 2
    const speed = rand(cfg.sMin, cfg.sMax)

    dots.push({
      x: Math.random() * safeW,
      y: Math.random() * safeH,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: rand(cfg.rMin, cfg.rMax),
      o: rand(cfg.oMin, cfg.oMax),
      layer,
      isAmber: Math.random() < 1 / 12,
      speed,
    })
  }
  dots.sort((a, b) => a.layer - b.layer) // back first
  return dots
}

export default function DotNetwork({ mouseRef }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    dots: [],
    w: 0,
    h: 0,
    connDist: 120,
    cursorDist: CURSOR_DIST,
    animId: null,
    isStatic: false,
    isVisible: true,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const st = stateRef.current

    // Only prefers-reduced-motion freezes dots into static mode.
    // On phones, the dots move continuously like they do on desktop.
    const prefersRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    st.isStatic = prefersRM

    function getDimensions() {
      const parent = canvas.parentElement
      const rect = parent ? parent.getBoundingClientRect() : null
      const w = Math.round(
        Math.max(
          rect?.width || 0,
          parent?.clientWidth || 0,
          window.innerWidth || 0,
          320
        )
      )
      const h = Math.round(
        Math.max(
          rect?.height || 0,
          parent?.clientHeight || 0,
          window.innerHeight || 0,
          400
        )
      )
      return { w, h }
    }

    /* ── Canvas sizing ── */
    function setup() {
      const { w, h } = getDimensions()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      st.w = w
      st.h = h
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    /* ── Drawing helpers ── */
    function drawConnections() {
      const { dots, connDist } = st
      const maxD2 = connDist * connDist
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < maxD2) {
            const d = Math.sqrt(d2)
            const a = (1 - d / connDist) * 0.12
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

    function drawCursorLines(mx, my) {
      const { dots, cursorDist } = st
      const maxD2 = cursorDist * cursorDist
      for (const dot of dots) {
        const dx = mx - dot.x
        const dy = my - dot.y
        const d2 = dx * dx + dy * dy
        if (d2 < maxD2) {
          const d = Math.sqrt(d2)
          const a = (1 - d / cursorDist) * 0.18
          ctx.beginPath()
          ctx.moveTo(dot.x, dot.y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = `rgba(${FOREST[0]},${FOREST[1]},${FOREST[2]},${a})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    function drawDots() {
      const { dots, h } = st
      for (const dot of dots) {
        const bottomFade = Math.min(1, (h - dot.y) / (h * 0.15))
        const alpha = dot.o * Math.max(0, bottomFade)
        const c = dot.isAmber ? AMBER : FOREST
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`
        ctx.fill()
      }
    }

    /* ── Physics update ── */
    function update() {
      const { dots, w, h, cursorDist } = st
      if (w <= 0 || h <= 0) return
      const mouse = mouseRef?.current || { x: null, y: null }

      for (const dot of dots) {
        /* Cursor attraction */
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - dot.x
          const dy = mouse.y - dot.y
          const d2 = dx * dx + dy * dy
          if (d2 < cursorDist * cursorDist && d2 > 1) {
            const d = Math.sqrt(d2)
            const force = ((cursorDist - d) / cursorDist) * 0.012
            dot.vx += (dx / d) * force
            dot.vy += (dy / d) * force
          }
        }

        /* Move */
        dot.x += dot.vx
        dot.y += dot.vy

        /* Dampen */
        dot.vx *= 0.997
        dot.vy *= 0.997

        /* Random perturbation — keep drift alive and organic */
        if (Math.random() < 0.015) {
          const a = Math.random() * Math.PI * 2
          dot.vx += Math.cos(a) * dot.speed * 0.25
          dot.vy += Math.sin(a) * dot.speed * 0.25
        }

        /* Wrap edges across the entire canvas width */
        const pad = 24
        if (dot.x < -pad) {
          dot.x = w + pad
        } else if (dot.x > w + pad) {
          dot.x = -pad
        }
        if (dot.y < -pad) {
          dot.y = h + pad
        } else if (dot.y > h + pad) {
          dot.y = -pad
        }
      }
    }

    /* ── Frame loop ── */
    function loop() {
      if (!st.isVisible) return
      const { w, h } = st
      if (w > 0 && h > 0) {
        ctx.clearRect(0, 0, w, h)
        update()
        drawConnections()

        const mouse = mouseRef?.current || { x: null, y: null }
        if (mouse.x !== null && mouse.y !== null) {
          drawCursorLines(mouse.x, mouse.y)
        }

        drawDots()
      }

      if (!st.isStatic) {
        st.animId = requestAnimationFrame(loop)
      }
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

    /* ── Init ── */
    setup()
    const params = getParams(st.w)
    st.connDist = params.connDist
    st.cursorDist = params.cursorDist
    st.dots = createDots(params.count, st.w, st.h)

    startAnimation()

    /* ── Tab visibility: pause when hidden ── */
    function onVisibility() {
      if (document.hidden) {
        stopAnimation()
      } else if (st.isVisible) {
        startAnimation()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    /* ── IntersectionObserver: pause when hero is scrolled out of view ── */
    const parentEl = canvas.parentElement
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

    /* ── Resize: scale dots and re-disperse if clumped ── */
    const ro = new ResizeObserver(() => {
      const prevW = st.w
      const prevH = st.h
      setup()

      const p = getParams(st.w)
      st.connDist = p.connDist
      st.cursorDist = p.cursorDist

      // Adjust dot count smoothly when switching between mobile & desktop
      if (st.dots.length < p.count) {
        const extra = createDots(p.count - st.dots.length, st.w, st.h)
        st.dots = [...st.dots, ...extra].sort((a, b) => a.layer - b.layer)
      } else if (st.dots.length > p.count) {
        st.dots = st.dots.slice(0, p.count)
      }

      if (prevW > 0 && prevH > 0 && st.w > 0 && st.h > 0) {
        const sx = st.w / prevW
        const sy = st.h / prevH
        for (const dot of st.dots) {
          dot.x *= sx
          dot.y *= sy
          if (dot.x < -24 || dot.x > st.w + 24) {
            dot.x = Math.random() * st.w
          }
          if (dot.y < -24 || dot.y > st.h + 24) {
            dot.y = Math.random() * st.h
          }
        }
      } else if (st.w > 0 && st.h > 0) {
        for (const dot of st.dots) {
          dot.x = Math.random() * st.w
          dot.y = Math.random() * st.h
        }
      }

      // Clumping prevention: verify dots are distributed across width
      if (st.dots.length > 5 && st.w > 100) {
        let minX = Infinity
        let maxX = -Infinity
        for (const dot of st.dots) {
          if (dot.x < minX) minX = dot.x
          if (dot.x > maxX) maxX = dot.x
        }
        if (maxX - minX < st.w * 0.40) {
          for (const dot of st.dots) {
            dot.x = Math.random() * st.w
          }
        }
      }

      if (st.isStatic) {
        ctx.clearRect(0, 0, st.w, st.h)
        drawConnections()
        drawDots()
      }
    })
    if (parentEl) ro.observe(parentEl)

    /* ── Cleanup ── */
    return () => {
      stopAnimation()
      document.removeEventListener('visibilitychange', onVisibility)
      if (parentEl) {
        io.disconnect()
        ro.disconnect()
      }
    }
  }, [mouseRef])

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
      }}
    />
  )
}
