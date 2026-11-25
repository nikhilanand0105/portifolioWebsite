import { Divider } from './Divider';
import { MORE_WORK } from '../data/portfolio';
import styles from './MoreWorkSection.module.css';

export function MoreWorkSection() {
  return (
    <section
      id="more-work"
      className={styles.section}
      data-surface="paper"
      aria-labelledby="more-work-heading"
    >
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrowRow}>
            <Divider surface="paper" lineWidth="56px" notchWidth="28px" notchHeight="5px" />
            <span className={`${styles.eyebrow} mono`}>More work</span>
          </div>
          <h2 id="more-work-heading" className={styles.heading}>
            Selected repositories &amp; systems index
          </h2>
          <p className={styles.sub}>
            Three additional codebases worth opening on GitHub, with repository implementations
            and offline benchmark notes kept clearly distinct.
          </p>
        </div>

        <ul className={styles.grid}>
          {MORE_WORK.map(item => (
            <li key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={`${styles.repoLabel} mono`}>{item.repoLabel}</span>
                <h3 className={styles.cardTitle}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.titleLink}
                  >
                    {item.title} <span aria-hidden="true">↗</span>
                  </a>
                </h3>
                <p className={styles.desc}>{item.description}</p>
                <p className={styles.note}>{item.note}</p>
              </div>

              <div className={styles.cardBottom}>
                <ul className={styles.tags} aria-label={`${item.title} technologies`}>
                  {item.tags.map(tag => (
                    <li key={tag} className={`${styles.tag} mono`}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link-paper"
                >
                  Open repository ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
