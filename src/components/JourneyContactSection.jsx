import { useState } from 'react';
import { Divider } from './Divider';
import { ACHIEVEMENTS, JOURNEY, PROFILE } from '../data/portfolio';
import styles from './JourneyContactSection.module.css';

export function JourneyContactSection() {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <section
        id="journey"
        className={styles.journeySection}
        data-surface="paper"
        aria-labelledby="journey-heading"
      >
        <div className="container">
          <div className={styles.bioGrid}>
            <div className={styles.bioText}>
              <div className={styles.eyebrowRow}>
                <Divider surface="paper" lineWidth="56px" notchWidth="28px" notchHeight="5px" />
                <span className={`${styles.eyebrow} mono`}>Journey &amp; milestones</span>
              </div>
              <h2 id="journey-heading" className={styles.heading}>
                {JOURNEY.heading}
              </h2>
              <p className={styles.para}>{JOURNEY.bioIntro}</p>
              <p className={styles.para}>{JOURNEY.bioMiddle}</p>
              <p className={styles.para}>{JOURNEY.bioEnd}</p>
            </div>

            <div className={styles.portraitWrap}>
              <div className={styles.portraitCard}>
                <picture>
                  <source
                    type="image/webp"
                    srcSet={JOURNEY.portrait.webp}
                    width={JOURNEY.portrait.width}
                    height={JOURNEY.portrait.height}
                  />
                  <img
                    src={JOURNEY.portrait.jpg}
                    width={JOURNEY.portrait.width}
                    height={JOURNEY.portrait.height}
                    alt={JOURNEY.portrait.alt}
                    loading="lazy"
                    decoding="async"
                    className={styles.portraitImg}
                  />
                </picture>
              </div>
              <p className={styles.portraitNote}>
                Nikhil Anand · B.Tech CSE, VIT Chennai (2024–2028)
              </p>
            </div>
          </div>

          {/* Secondary documentary photographs */}
          <div className={styles.photoPair}>
            {JOURNEY.secondaryPhotos.map(photo => (
              <figure key={photo.id} className={styles.docFigure}>
                <div className={styles.docFrame}>
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={photo.srcSetWebp}
                      sizes="(max-width: 820px) 92vw, 560px"
                      width={photo.width}
                      height={photo.height}
                    />
                    <img
                      src={photo.jpg}
                      srcSet={photo.srcSetJpg}
                      sizes="(max-width: 820px) 92vw, 560px"
                      width={photo.width}
                      height={photo.height}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <figcaption className={styles.docCaption}>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>

          {/* Competition results with distinct claims and paired certificates */}
          <div className={styles.achievementsBlock} aria-labelledby="achievements-heading">
            <h3 id="achievements-heading" className={styles.subHeading}>
              Competitions &amp; verifiable certificates
            </h3>
            <ul className={styles.achGrid}>
              {ACHIEVEMENTS.map(item => (
                <li key={item.title} className={styles.achCard}>
                  <span className={`${styles.achType} mono`}>{item.linkType}</span>
                  <h4 className={styles.achTitle}>{item.title}</h4>
                  <p className={styles.achDetail}>{item.detail}</p>
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link-paper"
                  >
                    {item.linkLabel} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className={styles.contactSection}
        data-surface="paper"
        aria-labelledby="contact-heading"
      >
        <div className="container">
          <div className={styles.contactCard}>
            <div>
              <div className={styles.eyebrowRow}>
                <Divider surface="paper" lineWidth="56px" notchWidth="28px" notchHeight="5px" />
                <span className={`${styles.eyebrow} mono`}>Get in touch</span>
              </div>
              <h2 id="contact-heading" className={styles.heading}>
                Let’s talk about backend systems, on-device AI, or engineering internships
              </h2>
              <p className={styles.para}>
                If you are reviewing candidates or want to walk through how I profiled the DRDO–CABS
                pipeline, cut CommuSync’s search p95 latency, or structured JARVIS’s verification
                loop, I’d be glad to chat.
              </p>
            </div>

            <div className={styles.contactActions}>
              <a href={`mailto:${PROFILE.email}`} className="btn-primary">
                Email {PROFILE.email}
              </a>

              <button
                type="button"
                className="btn-secondary-paper js-only"
                onClick={handleCopyEmail}
              >
                {copied ? 'Copied email ✓' : 'Copy email address'}
              </button>

              <span className="sr-only" aria-live="polite">
                {copied ? `${PROFILE.email} copied to clipboard.` : ''}
              </span>

              <div className={styles.contactLinks}>
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link-paper"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link-paper"
                >
                  GitHub ↗
                </a>
                <a
                  href={PROFILE.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link-paper"
                >
                  Download Résumé PDF ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
