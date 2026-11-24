import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <p className={styles.code} aria-hidden="true">404</p>
      <h1 className={styles.heading}>Page not found</h1>
      <p className={styles.body}>
        That page doesn't exist. It might have moved, or the link might be wrong.
      </p>
      <Link to="/" className={styles.btn}>
        Go back home
      </Link>
    </section>
  )
}
