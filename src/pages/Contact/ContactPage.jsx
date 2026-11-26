import { useState, useEffect, useRef } from 'react'
import Placeholder from '../../components/Placeholder/Placeholder'
import ContactDots from '../../components/ContactDots/ContactDots'
import styles from './ContactPage.module.css'

export default function ContactPage({ isSection = false }) {
  const [copied, setCopied] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!isSection) {
      document.title = 'Contact — Derick Okereke'
      window.scrollTo(0, 0)
    }
  }, [isSection])

  // Trigger entrance animations when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('okerekederick2@gmail.com')
    } catch {
      // Fallback if writeText is blocked
      const textArea = document.createElement('textarea')
      textArea.value = 'okerekederick2@gmail.com'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    setCopied(true)
    setAnnouncement('Email address copied')
    setTimeout(() => {
      setCopied(false)
      setAnnouncement('')
    }, 1600)
  }

  const HeadingTag = isSection ? 'h2' : 'h1'
  const headingId = isSection ? 'contact-home-heading' : 'contact-page-heading'

  return (
    <article
      id="contact"
      ref={sectionRef}
      className={`${styles.page} ${isSection ? styles.asSection : ''} ${inView ? styles.inView : ''}`}
      aria-labelledby={headingId}
    >
      {/* Background drifting dots & lines network */}
      <ContactDots containerRef={sectionRef} />

      <div className={`${styles.inner} wrap`}>
        {/* Item 1: Small-caps section label */}
        <div className={styles.animateItem}>
          <p className={styles.eyebrow}>Contact</p>
        </div>

        {/* Item 2: Large Heading */}
        <div className={styles.animateItem}>
          <HeadingTag id={headingId} className={styles.heading}>
            Let's talk.
          </HeadingTag>
        </div>

        {/* Item 3: Subtitle sentence */}
        <div className={styles.animateItem}>
          <p className={styles.sentence}>
            Got a product to build, or a role to fill? Tell me about it.{' '}
            <Placeholder text="[Derick to approve this wording]" />
          </p>
        </div>

        {/* Item 4: Email & Copy pill button */}
        <div className={styles.animateItem}>
          <div className={styles.emailRow}>
            <a
              href="mailto:okerekederick2@gmail.com"
              className={styles.emailLink}
              aria-label="Email Derick Okereke at okerekederick2@gmail.com"
            >
              okerekederick2@gmail.com
            </a>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
            >
              <span className={`${styles.copyLabel} ${copied ? styles.copyLabelCopied : ''}`}>
                {copied ? 'Copied' : 'Copy'}
              </span>
            </button>
          </div>
        </div>

        {/* Item 5: Row of plain text links with arrows */}
        <div className={styles.animateItem}>
          <nav className={styles.socialNav} aria-label="Profiles and external links">
            <a
              href="https://github.com/derick-okereke"
              className={styles.textLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Derick's GitHub profile (opens in new tab)"
            >
              <span>GitHub</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/derick-okereke-50873425a"
              className={styles.textLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Derick's LinkedIn profile (opens in new tab)"
            >
              <span>LinkedIn</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </a>
            <a
              href="https://x.com/Derick_Okereke"
              className={styles.textLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Derick's X profile (opens in new tab)"
            >
              <span>X</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>

        {/* Item 6: Download CV Button */}
        <div className={styles.animateItem}>
          <div className={styles.cvRow}>
            <a
              href="/cv-derick-okereke.pdf"
              className={styles.cvBtn}
              download="cv-derick-okereke.pdf"
              aria-label="Download Derick's CV (PDF)"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Aria-live announcement for screen readers */}
        <div className="sr-only" aria-live="polite">
          {announcement}
        </div>
      </div>
    </article>
  )
}
