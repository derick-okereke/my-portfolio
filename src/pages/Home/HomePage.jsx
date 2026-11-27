import { useEffect, useRef } from 'react'
import { useWatchup } from '@watchupltd/react'
import Hero from '../../components/Hero/Hero'
import SelectedWork from '../../components/WorkCards/SelectedWork'
import AboutPage from '../About/AboutPage'
import ContactPage from '../Contact/ContactPage'

export default function HomePage() {
  const watchup = useWatchup()
  const workRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    document.title = 'Derick Okereke — Front-End Developer'
    if (window.location.hash === '#contact') {
      const el = document.getElementById('contact')
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
      }
    }

    // Track when each major section scrolls into view (fires once per page load)
    const sections = [
      { ref: workRef, name: 'Work' },
      { ref: aboutRef, name: 'About' },
      { ref: contactRef, name: 'Contact' },
    ]

    const observers = sections.map(({ ref, name }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            watchup.track('Section View', { section: name })
            observer.disconnect()
          }
        },
        { threshold: 0.3 }
      )
      if (ref.current) observer.observe(ref.current)
      return observer
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [watchup])

  return (
    <>
      {/* 1. Hero with living dot network & split portrait */}
      <Hero />

      {/* 2. Redesigned Selected Work (2-column 4 cards + borderless more projects) */}
      <div ref={workRef}>
        <SelectedWork />
      </div>

      {/* Faded hairline divider */}
      <div className="faded-hairline" aria-hidden="true" />

      {/* 3. About Section on home */}
      <section id="about" aria-labelledby="about-home-heading" ref={aboutRef}>
        <AboutPage isSection={true} />
      </section>

      {/* Faded hairline divider */}
      <div className="faded-hairline" aria-hidden="true" />

      {/* 4. Contact Section on home */}
      <div ref={contactRef}>
        <ContactPage isSection={true} />
      </div>
    </>
  )
}
