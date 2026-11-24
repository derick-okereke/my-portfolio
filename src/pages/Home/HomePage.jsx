import { useEffect } from 'react'
import Hero from '../../components/Hero/Hero'
import SelectedWork from '../../components/WorkCards/SelectedWork'
import AboutPage from '../About/AboutPage'
import ContactPage from '../Contact/ContactPage'

export default function HomePage() {
  useEffect(() => {
    document.title = 'Derick Okereke — Front-End Developer'
    if (window.location.hash === '#contact') {
      const el = document.getElementById('contact')
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
      }
    }
  }, [])

  return (
    <>
      {/* 1. Hero with living dot network & split portrait */}
      <Hero />

      {/* 2. Redesigned Selected Work (2-column 4 cards + borderless more projects) */}
      <SelectedWork />

      {/* Faded hairline divider */}
      <div className="faded-hairline" aria-hidden="true" />

      {/* 3. About Section on home */}
      <section id="about" aria-labelledby="about-home-heading">
        <AboutPage isSection={true} />
      </section>

      {/* Faded hairline divider */}
      <div className="faded-hairline" aria-hidden="true" />

      {/* 4. Contact Section on home */}
      <ContactPage isSection={true} />
    </>
  )
}
