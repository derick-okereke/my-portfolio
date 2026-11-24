import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const location = useLocation()

  const handleContactClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const target = document.getElementById('contact')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        target.focus({ preventScroll: true })
      }
    }
  }

  const handleMobileContactClick = (e) => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      e.preventDefault()
      const target = document.getElementById('contact')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        target.focus({ preventScroll: true })
      }
    }
  }

  /* Sticky blur on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on route change / outside click */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onOutside)
    }
  }, [menuOpen])

  /* Trap focus inside mobile menu when open */
  const handleMenuLinkClick = () => setMenuOpen(false)

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className={`${styles.inner} wrap`}>
        {/* Wordmark / name */}
        <Link to="/" className={styles.wordmark} aria-label="Derick Okereke — home">
          Derick Okereke
        </Link>

        {/* Desktop nav */}
        <nav className={styles.links} aria-label="Primary navigation">
          <NavLink
            to="/work/peekytoe"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            /* Treat any /work/* as "Work" being active — use parent match */
            end={false}
          >
            Work
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            About
          </NavLink>
          <NavLink
            to="/#contact"
            onClick={handleContactClick}
            className={({ isActive }) => isActive && location.pathname === '/contact' ? `${styles.link} ${styles.active}` : styles.link}
          >
            Contact
          </NavLink>
        </nav>

        {/* CV download */}
        <a
          href="/placeholder-cv.pdf"
          className={styles.cvBtn}
          download
          aria-label="Download Derick's CV (PDF)"
        >
          Download CV
        </a>

        {/* Mobile menu toggle */}
        <button
          ref={toggleRef}
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <NavLink to="/#work" className={styles.mobileLink} onClick={handleMenuLinkClick}>Work</NavLink>
          <NavLink to="/about" className={styles.mobileLink} onClick={handleMenuLinkClick}>About</NavLink>
          <NavLink to="/#contact" className={styles.mobileLink} onClick={handleMobileContactClick}>Contact</NavLink>
          <a
            href="/placeholder-cv.pdf"
            className={`${styles.mobileLink} ${styles.mobileCv}`}
            download
            onClick={handleMenuLinkClick}
          >
            Download CV
          </a>
        </nav>
      </div>
    </header>
  )
}
