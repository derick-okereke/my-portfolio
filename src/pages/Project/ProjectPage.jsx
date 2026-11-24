import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LifecycleStrip from '../../components/LifecycleStrip/LifecycleStrip'
import FlowDiagram from '../../components/FlowDiagram/FlowDiagram'
import Placeholder from '../../components/Placeholder/Placeholder'
import styles from './ProjectPage.module.css'

export default function ProjectPage({ slug, data }) {
  const [activeSection, setActiveSection] = useState('problem')
  const coverImage = slug === 'onetax-pipeline'
    ? '/images/onetax-pipeline/onetax-card.webp'
    : data.desktopCover

  useEffect(() => {
    document.title = `${data.title} — Derick Okereke`
    window.scrollTo(0, 0)
  }, [slug, data.title])

  // Track active section for sticky "On this page" TOC
  useEffect(() => {
    const sectionIds = ['problem', 'decisions', 'build', 'status']
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: '-20% 0px -60% 0px' }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [slug])

  return (
    <article className={styles.pageWrap}>
      {/* Top Container with generous padding matching reference mockup */}
      <div className={styles.topContainer}>
        {/* Back link */}
        <Link to="/#work" className={styles.backLink}>
          ← All work
        </Link>

        {/* Header Grid: Left title & tagline, Right lifecycle & action */}
        <header className={styles.headerGrid}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrow}>{data.caseStudyEyebrow}</div>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.tagline}>{data.tagline}</p>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.statusLine}>{data.fullStatus}</div>
            <LifecycleStrip
              variant="full"
              slug={data.slug}
              stages={data.stages}
              currentStage={data.currentStage}
              statusText={data.statusText}
            />

            {data.liveLink ? (
              <a
                href={data.liveLink}
                className={styles.visitLiveBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.liveLinkLabel || 'Visit the live site'} ↗
                <Placeholder text={` [${data.liveLink}]`} />
              </a>
            ) : (
              <div className={styles.internalBadge}>
                <span className={styles.roleTag}>Internal tool</span>
                {data.roleLabel && <p className={styles.roleLabel}>{data.roleLabel}</p>}
              </div>
            )}
          </div>
        </header>

        {/* Cover Panel (gradient #F7F1E3 to #F0E7D2, radius 32px, layered shadow) */}
        <div className={styles.coverPanel}>
          {coverImage ? (
            <img
              src={coverImage}
              alt={`${data.title} desktop preview`}
              className={`${styles.coverScreenshot} ${slug === 'onetax-pipeline' ? styles.onetaxCover : ''}`}
              width={1904}
              height={930}
              loading="eager"
            />
          ) : null}
        </div>
      </div>

      {/* Main Content Area with Sticky "On this page" TOC */}
      <div className={styles.contentGrid}>
        {/* Sticky Sidebar Navigation (Desktop) */}
        <aside className={styles.sidebarSticky} aria-label="Table of contents">
          <div className={styles.eyebrow}>On this page</div>
          <nav className={styles.tocNav}>
            <a
              href="#problem"
              className={activeSection === 'problem' ? styles.tocActive : styles.tocLink}
            >
              The problem
            </a>
            <a
              href="#decisions"
              className={activeSection === 'decisions' ? styles.tocActive : styles.tocLink}
            >
              Key decisions
            </a>
            <a
              href="#build"
              className={activeSection === 'build' ? styles.tocActive : styles.tocLink}
            >
              {data.sections.buildHeading || 'What I built'}
            </a>
            <a
              href="#status"
              className={activeSection === 'status' ? styles.tocActive : styles.tocLink}
            >
              {data.sections.resultHeading || "What's next"}
            </a>
          </nav>
        </aside>

        {/* Main Sections */}
        <div className={styles.mainContent}>
          {/* 1. The problem */}
          <section id="problem" className={styles.sectionBlock}>
            <h2 className={styles.sectionHeading}>The problem</h2>
            <p className={styles.bodyParagraph}>{data.sections.problem}</p>
          </section>

          {/* If OneTax, show pipeline flow */}
          {slug === 'onetax-pipeline' && (
            <section className={styles.sectionBlock}>
              <FlowDiagram />
            </section>
          )}

          {/* 2. Key decisions I made */}
          <section id="decisions" className={styles.sectionBlock}>
            <h2 className={styles.sectionHeading}>Key decisions I made</h2>
            <div className={styles.decisionsList}>
              <div className="faded-hairline" aria-hidden="true" />
              {data.sections.decisions.map((dec) => (
                <div key={dec.num}>
                  <div className={styles.decisionRow}>
                    <b className={styles.decisionNum}>{dec.num}</b>
                    <span className={styles.decisionText}>
                      <strong>{dec.heading}</strong> {dec.body}
                    </span>
                  </div>
                  <div className="faded-hairline" aria-hidden="true" />
                </div>
              ))}
            </div>
          </section>

          {/* 3. What I built / How I built it */}
          <section id="build" className={styles.sectionBlock}>
            <h2 className={styles.sectionHeading}>
              {data.sections.buildHeading || 'What I built'}
            </h2>

            {data.sections.buildIntro && (
              <p className={styles.bodyParagraph}>{data.sections.buildIntro}</p>
            )}

            {/* Alternating floating mobile phone mockups */}
            {data.sections.features && (
              <div className={styles.featuresStack}>
                {data.sections.features.map((feature, idx) => {
                  const isEven = idx % 2 === 1
                  return (
                    <div
                      key={feature.num}
                      className={`${styles.featureRow} ${isEven ? styles.featureRowAlt : ''}`}
                    >
                      <div className={styles.featureText}>
                        <div className={styles.eyebrow}>{feature.num}</div>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDesc}>{feature.desc}</p>
                      </div>

                      <div className={styles.phoneMockupWrap}>
                        <div className={styles.phoneMockup}>
                          <img
                            src={feature.image}
                            alt={`${feature.title} mobile interface`}
                            className={styles.phoneImg}
                            width={1080}
                            height={2170}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {data.sections.builtWith && (
              <p className={styles.builtWithNote}>
                <strong>Built with:</strong> {data.sections.builtWith}
              </p>
            )}

            {data.sections.feedback && (
              <div className={styles.feedbackBlock}>
                <p className={styles.bodyParagraph}>
                  <strong>Early feedback.</strong> {data.sections.feedback}
                </p>
                <Placeholder text={data.sections.testerQuotePlaceholder} />
              </div>
            )}
          </section>

          {/* 4. What's next / The result */}
          <section id="status" className={styles.sectionBlock}>
            <h2 className={styles.sectionHeading}>
              {data.sections.resultHeading || "What's next"}
            </h2>
            <p className={styles.bodyParagraph}>
              {data.sections.result || data.sections.next}
            </p>
          </section>
        </div>
      </div>

      {/* Next Project Footer Row */}
      {data.nextProject && (
        <div className={styles.nextProjectFooter}>
          <div className="faded-hairline" aria-hidden="true" />
          <div className={styles.nextProjectRow}>
            <span className={styles.eyebrow}>Next project</span>
            <Link to={data.nextProject.route} className={styles.nextProjectLink}>
              {data.nextProject.title} →
            </Link>
          </div>
        </div>
      )}
    </article>
  )
}
