import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import LifecycleStrip from '../LifecycleStrip/LifecycleStrip'
import { homeProjectOrder } from '../../data/projects'
import styles from './WorkTimeline.module.css'

export default function WorkTimeline() {
  const [expandedSlug, setExpandedSlug] = useState(null)
  const cardRefs = useRef({})

  // Handle escape key to collapse
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && expandedSlug) {
        const prevSlug = expandedSlug
        setExpandedSlug(null)
        cardRefs.current[prevSlug]?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [expandedSlug])

  const toggleProject = (slug) => {
    setExpandedSlug((current) => (current === slug ? null : slug))
  }

  return (
    <section id="work" className={styles.workSection} aria-labelledby="work-heading">
      <div className="wrap">
        <div className={styles.sectionHeader}>
          <h2 id="work-heading" className={styles.heading}>
            Selected work
          </h2>
          <p className={styles.subText}>
            A continuous product thread from concept to delivery. Click any project to inspect.
          </p>
        </div>

        {/* 4-column timeline */}
        <div className={styles.timelineGrid} role="region" aria-label="Project timeline">
          {homeProjectOrder.map((project) => {
            const isExpanded = expandedSlug === project.slug

            return (
              <div
                key={project.slug}
                className={`${styles.columnCard} ${isExpanded ? styles.expanded : ''}`}
              >
                {/* Collapsed top / click trigger */}
                <button
                  ref={(el) => (cardRefs.current[project.slug] = el)}
                  type="button"
                  className={styles.triggerButton}
                  onClick={() => toggleProject(project.slug)}
                  aria-expanded={isExpanded}
                  aria-controls={`details-${project.slug}`}
                >
                  <div className={styles.topRule} aria-hidden="true" />
                  <div className={styles.metaRow}>
                    <span className={styles.colNumber}>{project.num}</span>
                    <span className={styles.expandIcon} aria-hidden="true">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </div>
                  <h3 className={styles.projectName}>{project.title}</h3>
                  <div className={styles.stripSlot}>
                    <LifecycleStrip
                      variant="compact"
                      stages={project.stages}
                      currentStage={project.currentStage}
                      statusText={project.statusText}
                    />
                  </div>
                </button>

                {/* Expanded card drawer */}
                {isExpanded && (
                  <div
                    id={`details-${project.slug}`}
                    className={styles.expandedDrawer}
                    role="region"
                    aria-label={`${project.title} details`}
                  >
                    <p className={styles.shortDesc}>{project.shortDesc}</p>

                    {project.coverImage ? (
                      <div className={styles.coverFrame}>
                        <img
                          src={project.coverImage}
                          alt={project.coverAlt || `${project.title} overview`}
                          className={styles.coverImg}
                          loading="lazy"
                          width="600"
                          height="400"
                        />
                      </div>
                    ) : (
                      <div className={styles.visualDiagramPlaceholder}>
                        <div className={styles.diagramTeaser}>
                          <span className={styles.flowBadge}>Flow Visual</span>
                          <p>4-step automated research & content generation pipeline</p>
                        </div>
                      </div>
                    )}

                    <div className={styles.actionRow}>
                      <Link to={project.route} className={styles.caseStudyLink}>
                        Read the case study
                        <span className={styles.linkArrow} aria-hidden="true">→</span>
                      </Link>
                      <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={() => {
                          setExpandedSlug(null)
                          cardRefs.current[project.slug]?.focus()
                        }}
                        aria-label={`Close ${project.title} details`}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* More projects small row */}
        <div className={styles.moreProjectsRow}>
          <div className={styles.moreHeader}>
            <span className={styles.moreLabel}>More projects</span>
          </div>
          <div className={styles.moreContent}>
            <h4 className={styles.moreTitle}>Partner Picker</h4>
            <p className={styles.moreDesc}>
              An interactive web app that solves an accountability community's grouping problem, using
              JavaScript and Google Sheets as a lightweight backend.{' '}
              <span className="placeholder">link, if available</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
