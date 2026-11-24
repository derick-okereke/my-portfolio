import { useEffect, useRef, useState } from 'react'
import styles from './Footer.module.css'

export default function Wordmark({ footerRef }) {
  const wordmarkRef = useRef(null)
  const [inView, setInView] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))
  const rafId = useRef(null)

  // IntersectionObserver: entrance rise of 40px and fade in over 900ms
  useEffect(() => {
    if (inView) return
    const el = wordmarkRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView])

  // Pointermove listener on footer to track cursor position inside letters
  useEffect(() => {
    const footer = footerRef?.current
    const wordmark = wordmarkRef.current
    if (!footer || !wordmark) return

    const prefersRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none)').matches
    if (prefersRM || isTouch) return

    let pendingX = null
    let pendingY = null

    const handlePointerMove = (e) => {
      const rect = wordmark.getBoundingClientRect()
      pendingX = e.clientX - rect.left
      pendingY = e.clientY - rect.top

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          if (wordmark && pendingX !== null) {
            wordmark.style.setProperty('--x', `${pendingX}px`)
            wordmark.style.setProperty('--y', `${pendingY}px`)
            wordmark.style.setProperty('--glow-opacity', '1')
          }
          rafId.current = null
        })
      }
    }

    const handlePointerLeave = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
      wordmark.style.setProperty('--glow-opacity', '0')
    }

    footer.addEventListener('pointermove', handlePointerMove, { passive: true })
    footer.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      footer.removeEventListener('pointermove', handlePointerMove)
      footer.removeEventListener('pointerleave', handlePointerLeave)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [footerRef])

  return (
    <div className={styles.wordmarkCrop} aria-hidden="true">
      <div
        ref={wordmarkRef}
        className={`${styles.wordmark} ${inView ? styles.wordmarkInView : ''}`}
      >
        <span className={styles.wordmarkBase}>Derick</span>
        <span className={styles.wordmarkGlow} aria-hidden="true">
          Derick
        </span>
      </div>
    </div>
  )
}
