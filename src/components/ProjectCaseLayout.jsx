/**
 * Case-study hierarchy adapted from HamishMW/portfolio/app/layouts/project/project.jsx (MIT).
 * Reference commit: b7444bc16216f38c64f4afb8d2f53b8c4cbb2bda
 */
import { Link } from 'react-router-dom';
import { Divider } from './Divider';
import styles from './ProjectCaseLayout.module.css';

export function ProjectContainer({ variant = 'default', children }) {
  return (
    <article className={styles.project} data-variant={variant}>
      {children}
    </article>
  );
}

export function ProjectHeader({
  eyebrow,
  title,
  lead,
  roles,
  primaryLink,
  secondaryLink,
  backdropSrc,
  backdropAlt = '',
}) {
  return (
    <section className={styles.header} data-surface="dark">
      {backdropSrc && (
        <div className={styles.backdrop} aria-hidden="true">
          <img
            src={backdropSrc}
            alt={backdropAlt}
            className={styles.backdropImg}
            loading="eager"
          />
          <div className={styles.backdropScrim} />
        </div>
      )}

      <div className={`container ${styles.headerInner}`}>
        <div className={styles.breadcrumbs}>
          <Link to="/#selected-work" className={styles.backLink}>
            ← Back to selected work
          </Link>
        </div>

        <div className={styles.headerGrid}>
          <div className={styles.headerMain}>
            <div className={styles.eyebrowRow}>
              <Divider surface="dark" lineWidth="48px" notchWidth="24px" notchHeight="5px" />
              <span className={`${styles.eyebrow} mono`}>{eyebrow}</span>
            </div>

            <h1 className={styles.title}>{title}</h1>
            <p className={styles.lead}>{lead}</p>

            {(primaryLink || secondaryLink) && (
              <div className={styles.headerActions}>
                {primaryLink && (
                  <a
                    href={primaryLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    {primaryLink.label} <span aria-hidden="true">↗</span>
                  </a>
                )}
                {secondaryLink && (
                  <a
                    href={secondaryLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-dark"
                  >
                    {secondaryLink.label} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {!!roles?.length && (
            <ul className={styles.metaList} aria-label="Project metadata">
              {roles.map(item => (
                <li key={item} className={styles.metaItem}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export function ProjectSection({ surface = 'paper', id, children }) {
  return (
    <section id={id} className={styles.section} data-surface={surface}>
      <div className="container">{children}</div>
    </section>
  );
}

export function CaseStudyNavFooter({ currentSlug }) {
  const others = [
    { slug: '/work/jarvis', label: '01 · JARVIS On-Device Android Agent' },
    { slug: '/work/commusync', label: '02 · CommuSync Job-Search Latency' },
    { slug: '/work/ssh-manager', label: '03 · SSH Manager Fleet Provisioning' },
  ].filter(item => item.slug !== currentSlug);

  return (
    <section className={styles.caseNav} data-surface="paper" aria-label="Other case studies">
      <div className={`container ${styles.caseNavInner}`}>
        <Link to="/#selected-work" className="btn-secondary-paper">
          ← Return to selected work
        </Link>
        <div className={styles.otherLinks}>
          {others.map(item => (
            <Link key={item.slug} to={item.slug} className={styles.otherLink}>
              {item.label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
