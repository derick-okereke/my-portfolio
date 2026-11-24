import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Wordmark from './Wordmark'
import styles from './Footer.module.css'

export default function Footer({ showLinks: showLinksProp }) {
  const location = useLocation()
  const footerRef = useRef(null)

  const isHome = location.pathname === '/'
  const isAbout = location.pathname === '/about'

  // showLinks is false on HOME and ABOUT, true on every other page (unless explicitly overridden)
  const showLinks = showLinksProp !== undefined ? showLinksProp : (!isHome && !isAbout)

  return (
    <footer ref={footerRef} className={styles.footer} role="contentinfo">
      {/* Faded hairline directly above the footer row */}
      <div className="faded-hairline" aria-hidden="true" />

      <div className={`${styles.inner} wrap`}>
        {/* Left: exact copy */}
        <p className={styles.copy}>
          Made with 🌹 & intention · © 2026 · Derick Okereke
        </p>

        {/* Right: plain text links with arrows */}
        {showLinks && (
          <nav className={styles.links} aria-label="Footer navigation">
            <a
              href="https://github.com/derick-okereke"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Derick's GitHub profile (opens in new tab)"
            >
              <span>GitHub</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/derick-okereke-50873425a"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Derick's LinkedIn profile (opens in new tab)"
            >
              <span>LinkedIn</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </a>
            <a
              href="https://x.com/Derick_Okereke"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Derick's X profile (opens in new tab)"
            >
              <span>X</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </a>
          </nav>
        )}
      </div>

      {/* Home page only: Giant watermark growing out of the bottom edge */}
      {isHome && <Wordmark footerRef={footerRef} />}
    </footer>
  )
}
