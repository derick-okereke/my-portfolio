import { useEffect, useRef, useState } from 'react'
import styles from './LifecycleStrip.module.css'

const STAGE_NAMES = [
  { num: '01', name: 'Idea', id: 'idea', target: '#problem' },
  { num: '02', name: 'Decisions', id: 'decisions', target: '#decisions' },
  { num: '03', name: 'Build', id: 'build', target: '#build' },
  { num: '04', name: 'Status', id: 'status', target: '#status' },
]

export default function LifecycleStrip({
  variant = 'compact', // 'compact' | 'full'
  slug = '',
  stages = [],
  currentStage = 'status',
  statusText = '',
}) {
  const [inView, setInView] = useState(false)
  const rootRef = useRef(null)

  // Fill percentage per brief redesign rules:
  // 100% for Author Bookstore; 88% for OneTax, Cashpod, and Peekytoe
  const fillPercent = slug === 'author-bookstore' ? 100 : 88

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (rootRef.current) {
      observer.observe(rootRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const srDescription = `Project lifecycle: ${stages.join(', ')}. Current stage: ${currentStage}. Status: ${statusText}`

  if (variant === 'compact') {
    return (
      <div
        ref={rootRef}
        className={`${styles.compactContainer} ${inView ? styles.inView : ''}`}
        aria-label={srDescription}
      >
        <span className="sr-only">{srDescription}</span>
        <div className={styles.compactTrack} aria-hidden="true">
          <div
            className={styles.compactFill}
            style={{ '--target-fill': `${fillPercent}%` }}
          />
        </div>
        {statusText && <span className={styles.compactStatus}>{statusText}</span>}
      </div>
    )
  }

  // Full version (project pages)
  return (
    <div
      ref={rootRef}
      className={`${styles.fullContainer} ${inView ? styles.inView : ''}`}
      aria-label={srDescription}
    >
      <span className="sr-only">{srDescription}</span>

      {/* Row of four small-caps stage names */}
      <div className={styles.stageLabels} role="list">
        {STAGE_NAMES.map((stage, idx) => {
          const isCurrent = stage.id === currentStage || (stage.id === 'status' && fillPercent !== 100)
          const isComplete = fillPercent === 100 || idx < 3

          return (
            <a
              key={stage.id}
              href={stage.target}
              className={`${styles.stageLabel} ${isCurrent ? styles.stageCurrent : isComplete ? styles.stageComplete : ''}`}
              role="listitem"
            >
              {stage.num} {stage.name}
            </a>
          )
        })}
      </div>

      {/* 4px rounded track with clean gradient fill (no artificial neon glow) */}
      <div className={styles.fullTrack} aria-hidden="true">
        <div
          className={styles.fullFill}
          style={{ '--target-fill': `${fillPercent}%` }}
        />
      </div>
    </div>
  )
}
