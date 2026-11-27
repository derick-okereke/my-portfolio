import { Link } from 'react-router-dom'
import { useWatchup } from '@watchupltd/react'
import LifecycleStrip from '../LifecycleStrip/LifecycleStrip'
import Placeholder from '../Placeholder/Placeholder'
import { homeProjectOrder } from '../../data/projects'
import styles from './SelectedWork.module.css'

export default function SelectedWork() {
  const watchup = useWatchup()
  return (
    <section id="work" className={styles.section} aria-labelledby="selected-work-title">
      <div className="wrap">
        {/* Centered Heading with no subtext */}
        <div className={styles.headingWrap}>
          <h2 id="selected-work-title" className={styles.heading}>
            Selected work
          </h2>
        </div>

        {/* 2-Column Grid of 4 Cards */}
        <div className={styles.grid}>
          {homeProjectOrder.map((project) => {
            const isOneTax = project.slug === 'onetax-pipeline'
            const desktopImage =
              project.slug === 'author-bookstore'
                ? '/images/author-bookstore/desktop-1.webp'
                : project.slug === 'onetax-pipeline'
                ? '/images/onetax-pipeline/onetax-card.webp'
                : project.slug === 'cashpod'
                ? '/images/cashpod/desktop-1.webp'
                : project.slug === 'peekytoe'
                ? '/images/peekytoe/desktop-1.webp'
                : null

            return (
              <article key={project.slug} className={styles.card}>
                <Link
                  to={project.route}
                  className={styles.cardLink}
                  aria-label={`${project.title} — Read case study`}
                  onClick={() => watchup.track('Project Click', { project: project.title })}
                >
                  {/* Top Screenshot or Flow Graphic (rounded 20px) */}
                  <div className={`${styles.imageFrame} ${isOneTax ? styles.onetaxImageFrame : ''}`}>
                    <img
                      src={desktopImage}
                      alt={`${project.title} desktop preview`}
                      width={1904}
                      height={930}
                      className={styles.screenshotImg}
                      loading="lazy"
                    />
                  </div>

                  {/* Card Body */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.shortDesc}</p>

                    {/* Bottom Metadata & Pill Action */}
                    <div className={styles.footerRow}>
                      <div className={styles.stripSlot}>
                        <LifecycleStrip
                          variant="compact"
                          slug={project.slug}
                          stages={project.stages}
                          currentStage={project.currentStage}
                          statusText={project.statusText}
                        />
                      </div>

                      <span className={styles.pillButton}>
                        Read the case study <span className={styles.chevron} aria-hidden="true">›</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        {/* More Projects: Borderless row between two faded hairlines */}
        <div className={styles.moreProjectsSection}>
          <div className="faded-hairline" aria-hidden="true" />

          <div className={styles.moreRow}>
            <div className={styles.moreLeft}>
              <span className={styles.moreCaps}>More projects</span>
            </div>
            <div className={styles.moreRight}>
              <h4 className={styles.partnerTitle}>Partner Picker</h4>
              <p className={styles.partnerDesc}>
                Partner picker was my very first web app. The first time I thought through a product people where going to use. An interactive web app that solves an accountability community's grouping problem, using JavaScript and Google Sheets as a lightweight backend.
              </p>
            </div>
          </div>

          <div className="faded-hairline" aria-hidden="true" />
          <div className={styles.moreRow}>
            <div className={styles.moreLeft}>
              <span className={styles.moreCaps}></span>
            </div>
            <div className={styles.moreRight}>
              <h4 className={styles.partnerTitle}>MyEcoAfrica</h4>
              <p className={styles.partnerDesc}>
                Since August of 2026, I have worked with MyEcoAfrica as the Lead Nationwide Project Manager overseeing the Global Energy and Sustainablity Leadership program GELSP where we've been taking sustainablility responibility and leadership knowledge to young students across Nigerian schools. I have contributed to and overseen outreach strategies, managed large state-wide teams, and saw to it that projects reached in-scope completion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
