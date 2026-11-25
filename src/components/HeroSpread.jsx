import { useRef, useState } from 'react';
import { HERO_PHOTOS, PROFILE } from '../data/portfolio';
import { Divider } from './Divider';
import styles from './HeroSpread.module.css';

export function HeroSpread() {
  const [activeId, setActiveId] = useState('table');
  const [hasSwitched, setHasSwitched] = useState(false);
  const btnRefs = useRef([]);

  const activePhoto = HERO_PHOTOS.find(photo => photo.id === activeId) || HERO_PHOTOS[0];

  function selectPhoto(id) {
    if (id !== activeId) {
      setHasSwitched(true);
      setActiveId(id);
    }
  }

  function handleKeyDown(event, index) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (index + 1) % HERO_PHOTOS.length;
      selectPhoto(HERO_PHOTOS[nextIndex].id);
      btnRefs.current[nextIndex]?.focus();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = (index - 1 + HERO_PHOTOS.length) % HERO_PHOTOS.length;
      selectPhoto(HERO_PHOTOS[prevIndex].id);
      btnRefs.current[prevIndex]?.focus();
    }
  }

  return (
    <section className={styles.hero} data-surface="dark" aria-labelledby="hero-name">
      <div className={`container ${styles.spread}`}>
        <div className={styles.editorial}>
          <div className={styles.eyebrowRow}>
            <Divider surface="dark" lineWidth="56px" notchWidth="28px" notchHeight="5px" />
            <p className={styles.fieldLine}>
              Software Engineering · {PROFILE.university} · {PROFILE.graduationYear}
            </p>
          </div>

          <h1 id="hero-name" className={styles.name}>
            {PROFILE.name}
          </h1>

          <p className={styles.voice}>{PROFILE.voiceLine}</p>

          <div className={styles.actions}>
            <a className="btn-primary" href="#selected-work">
              Selected work <span aria-hidden="true">→</span>
            </a>
            <a
              className="btn-secondary-dark"
              href={PROFILE.resumePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé PDF
            </a>
            <a
              className="btn-secondary-dark"
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>

          <dl className={styles.proofStrip}>
            <div className={styles.proofItem}>
              <dt className="mono">DRDO–CABS ’26</dt>
              <dd>52 → 32 min/epoch (-38%)</dd>
            </div>
            <div className={styles.proofItem}>
              <dt className="mono">CommuSync</dt>
              <dd>310 → 180 ms p95 search</dd>
            </div>
            <div className={styles.proofItem}>
              <dt className="mono">JARVIS POC</dt>
              <dd>Gemma 3n + Kotlin UI loop</dd>
            </div>
          </dl>
        </div>

        <figure className={styles.photoColumn}>
          <div className={styles.frameWrap}>
            {HERO_PHOTOS.map((photo, idx) => {
              const isActive = photo.id === activeId;
              // Load only the initial hero photo eagerly; load the second frame when selected
              if (idx > 0 && !hasSwitched && !isActive) {
                return null;
              }
              return (
                <picture
                  key={photo.id}
                  className={styles.pictureLayer}
                  data-active={isActive}
                  aria-hidden={!isActive}
                >
                  <source
                    media="(max-width: 767px)"
                    type="image/webp"
                    srcSet={photo.mobileSrcSetWebp}
                    sizes="(max-width: 767px) 92vw, 480px"
                    width={photo.mobileWidth}
                    height={photo.mobileHeight}
                  />
                  <source
                    media="(max-width: 767px)"
                    type="image/jpeg"
                    srcSet={photo.mobileSrcSetJpg}
                    sizes="(max-width: 767px) 92vw, 480px"
                    width={photo.mobileWidth}
                    height={photo.mobileHeight}
                  />
                  <source
                    type="image/webp"
                    srcSet={photo.desktopSrcSetWebp}
                    sizes="(max-width: 1024px) 92vw, 660px"
                    width={photo.desktopWidth}
                    height={photo.desktopHeight}
                  />
                  <img
                    src={photo.desktopFallback}
                    srcSet={photo.desktopSrcSetJpg}
                    sizes="(max-width: 1024px) 92vw, 660px"
                    width={photo.desktopWidth}
                    height={photo.desktopHeight}
                    alt={photo.alt}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchpriority={idx === 0 ? 'high' : 'low'}
                    decoding={idx === 0 ? 'sync' : 'async'}
                    className={styles.photoImg}
                  />
                </picture>
              );
            })}
          </div>

          <div className={styles.photoFooter}>
            <div
              className={`${styles.switchGroup} js-only`}
              role="group"
              aria-label="Opening photograph view"
            >
              {HERO_PHOTOS.map((photo, index) => (
                <button
                  key={photo.id}
                  ref={el => {
                    btnRefs.current[index] = el;
                  }}
                  type="button"
                  className={styles.switchBtn}
                  aria-pressed={activeId === photo.id}
                  onClick={() => selectPhoto(photo.id)}
                  onKeyDown={e => handleKeyDown(e, index)}
                >
                  {photo.label}
                </button>
              ))}
            </div>

            <figcaption className={styles.caption} aria-live="polite">
              {activePhoto.caption}
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
