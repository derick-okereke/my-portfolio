import { useEffect, useState } from 'react'
import styles from './AboutPage.module.css'

function LinkedInIcon() {
  return (
    <svg
      className={styles.platformIcon}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      className={styles.platformIcon}
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function PolaroidPhoto({ src, alt, width, height, filename }) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <div className={styles.placeholderFrame} role="img" aria-label={`Placeholder for ${filename}`}>
        <span className={styles.placeholderLabel}>{filename}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={styles.photo}
      onError={() => setHasError(true)}
    />
  )
}

export default function AboutPage({ isSection = false }) {
  useEffect(() => {
    if (!isSection) {
      document.title = 'About — Derick Okereke'
      window.scrollTo(0, 0)
    }
  }, [isSection])

  const HeadingTag = isSection ? 'h2' : 'h1'

  return (
    <article className={`${styles.page} ${isSection ? styles.asSection : ''}`}>
      <div className={`${styles.inner} wrap`}>
        <div className={styles.grid}>
          {/* Left Column: About Copy (kept exactly as original) */}
          <div className={styles.textCol}>
            <HeadingTag id="about-home-heading" className={styles.heading}>
              About
            </HeadingTag>
            <div className={styles.body}>
              <p>
                I'm Derick, a software engineering student at Miva Open University, graduating in 2028.
                I like taking an idea all the way from a rough sketch to something people can use:
                deciding what to build, how it should work, and whether it's good enough.
              </p>
              <p>
                Right now I'm a software engineering intern at OneTax NG, where I build tools that use
                AI to speed up marketing research and content. I also volunteer as a project manager at
                MyEcoAfrica where I'm taking projects from inception to results.
              </p>
              <p>I care about the details of your product, and I build it the way it deserves to be built.</p>
            </div>
          </div>

          {/* Right Column: Casual Polaroid Cards */}
          <div className={styles.cardsCol} aria-label="Derick Okereke social links and photos">
            {/* Card 1: LinkedIn */}
            <a
              href="https://www.linkedin.com/in/derick-okereke-50873425a"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} ${styles.card1}`}
              aria-label="Derick Okereke on LinkedIn"
            >
              <div className={styles.photoFrame}>
                <PolaroidPhoto
                  src="/images/about/photo-1.webp"
                  alt="Photo of Derick Okereke"
                  width={1079}
                  height={1075}
                  filename="photo-1.webp"
                />
              </div>
              <div className={styles.caption}>
                <LinkedInIcon />
                <span className={styles.handle}>derick-okereke</span>
              </div>
            </a>

            {/* Card 2: X */}
            <a
              href="https://x.com/Derick_Okereke"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} ${styles.card2}`}
              aria-label="Derick Okereke on X"
            >
              <div className={styles.photoFrame}>
                <PolaroidPhoto
                  src="/images/about/photo-2.webp"
                  alt="Photo of Derick Okereke"
                  width={1200}
                  height={1800}
                  filename="photo-2.webp"
                />
              </div>
              <div className={styles.caption}>
                <XIcon />
                <span className={styles.handle}>@Derick_Okereke</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
