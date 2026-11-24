import styles from './OneTaxCardGraphic.module.css'

export default function OneTaxCardGraphic() {
  return (
    <div className={styles.graphicWrap} aria-label="OneTax 4-step AI Pipeline workflow preview">
      <div className={styles.inner}>
        <div className={styles.step}>
          <span className={styles.badge}>01</span>
          <span className={styles.stepTitle}>AI Research</span>
          <span className={styles.stepSub}>Market scan</span>
        </div>
        <div className={styles.connector} aria-hidden="true">→</div>
        <div className={styles.step}>
          <span className={styles.badge}>02</span>
          <span className={styles.stepTitle}>AI Content</span>
          <span className={styles.stepSub}>Automated drafts</span>
        </div>
        <div className={styles.connector} aria-hidden="true">→</div>
        <div className={styles.step}>
          <span className={styles.badge}>03</span>
          <span className={styles.stepTitle}>JSON Shape</span>
          <span className={styles.stepSub}>Structured data</span>
        </div>
        <div className={styles.connector} aria-hidden="true">→</div>
        <div className={styles.stepActive}>
          <span className={styles.badgeActive}>04</span>
          <span className={styles.stepTitleActive}>Dashboard</span>
          <span className={styles.stepSubActive}>Live visuals</span>
        </div>
      </div>
    </div>
  )
}
