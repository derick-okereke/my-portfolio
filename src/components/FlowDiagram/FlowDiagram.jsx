import styles from './FlowDiagram.module.css'

const STEPS = [
  {
    num: '01',
    title: 'Market Research',
    desc: 'A custom AI skill researches the market.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Content Writing',
    desc: 'A second custom AI skill writes the content.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Structured JSON',
    desc: 'Both produce JSON files, shaped in advance to fit the dashboard\'s design exactly.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Live Visualization',
    desc: 'The files are uploaded, and the dashboard turns them into visuals the moment they arrive.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
]

export default function FlowDiagram() {
  return (
    <div className={styles.diagramContainer} aria-label="OneTax 4-step AI Pipeline flow diagram">
      <h3 className={styles.diagramHeading}>How it works</h3>
      <div className={styles.flowGrid}>
        {STEPS.map((step, idx) => (
          <div key={step.num} className={styles.flowCard}>
            <div className={styles.cardHeader}>
              <span className={styles.stepNum}>{step.num}</span>
              <div className={styles.iconWrap} aria-hidden="true">
                {step.icon}
              </div>
            </div>
            <h4 className={styles.stepTitle}>{step.title}</h4>
            <p className={styles.stepDesc}>{step.desc}</p>
            {idx < STEPS.length - 1 && (
              <div className={styles.arrowConnector} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
