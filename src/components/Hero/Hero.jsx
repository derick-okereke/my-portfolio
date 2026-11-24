import { useRef } from 'react'
import DotNetwork from '../DotNetwork/DotNetwork'
import styles from './Hero.module.css'

export default function Hero() {
  const mouseRef = useRef({ x: null, y: null })
  const heroRef = useRef(null)

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null }
  }

  const scrollToWork = (e) => {
    e.preventDefault()
    const target = document.getElementById('work')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      target.focus({ preventScroll: true })
    }
  }

  return (
    <section
      ref={heroRef}
      className={styles.heroSection}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Introduction"
    >
      {/* Background dot network canvas */}
      <DotNetwork mouseRef={mouseRef} />

      {/* Hero content */}
      <div className={`${styles.heroContent} wrap`}>
        {/* Artistic split headline with portrait */}
        <h1
          className={styles.headline}
          aria-label="I build products the way they deserve to be built: richly."
        >
          <span className={styles.headlineLeft} aria-hidden="true">
            I build products the way<br className={styles.deskBreak} /> they deserve to be built:
          </span>

          <span className={styles.portraitWrap}>
            <span className={styles.amberCircle} aria-hidden="true" />
            <picture>
              <source srcSet="/hero-portrait.webp" type="image/webp" />
              <img
                src="/hero-portrait.png"
                alt="Portrait illustration of Derick Okereke"
                width="1024"
                height="1024"
                className={styles.portraitImg}
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </span>

          <span className={styles.headlineRight} aria-hidden="true">
            richly.
          </span>
        </h1>

        {/* Supporting line */}
        <p className={styles.supportingLine}>
          I'm a front-end developer who builds web products, and I add AI features where they help.
        </p>

        {/* Action buttons directly below hero text */}
        <div className={styles.actionRow}>
          <a
            href="#work"
            className={styles.primaryBtn}
            onClick={scrollToWork}
          >
            See my work
          </a>
          <a
            href="/placeholder-cv.pdf"
            className={styles.cvLink}
            download
            aria-label="Download Derick's CV (PDF)"
          >
            Download CV
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
