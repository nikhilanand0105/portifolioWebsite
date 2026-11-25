/**
 * Alternating project summary composition adapted from
 * HamishMW/portfolio/app/routes/home/project-summary.jsx (MIT).
 * Reference commit: b7444bc16216f38c64f4afb8d2f53b8c4cbb2bda
 */
import { Link } from 'react-router-dom';
import { PROFILE } from '../data/portfolio';
import { Divider } from './Divider';
import styles from './ProjectSummary.module.css';

export function ProjectSummary({
  id,
  index,
  title,
  tagline,
  summary,
  metricHighlight,
  tags,
  caseStudyUrl,
  primarySourceUrl,
  primarySourceLabel,
  secondarySourceUrl,
  secondarySourceLabel,
  evidenceNote,
  alternate = false,
  artifact,
  visible = true,
}) {
  const titleId = `${id}-title`;

  return (
    <article
      id={id}
      className={styles.summary}
      data-alternate={alternate}
      data-visible={visible}
      aria-labelledby={titleId}
    >
      <div className={styles.content}>
        <div className={styles.details}>
          <div className={styles.indexRow} aria-hidden="true">
            <Divider
              surface="paper"
              lineWidth="64px"
              notchWidth="36px"
              notchHeight="6px"
              collapsed={!visible}
              collapseDelay={120}
            />
            <span className={`${styles.indexNum} mono`}>{index}</span>
          </div>

          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>

          <p className={styles.tagline}>{tagline}</p>

          <p className={styles.description}>{summary}</p>

          {metricHighlight && (
            <p className={`${styles.metricChip} mono`}>{metricHighlight}</p>
          )}

          {!!tags?.length && (
            <ul className={styles.tagList} aria-label="Technologies used">
              {tags.map(tag => (
                <li key={tag} className={`${styles.tag} mono`}>
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className={styles.actions}>
            <Link to={caseStudyUrl} className="btn-primary">
              Read case study <span aria-hidden="true">→</span>
            </Link>

            {primarySourceUrl && (
              <a
                href={primarySourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-paper"
              >
                {primarySourceLabel} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          {secondarySourceUrl && (
            <p className={styles.secondarySource}>
              <a
                href={secondarySourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link-paper"
              >
                {secondarySourceLabel} ↗
              </a>
            </p>
          )}

          {evidenceNote && (
            <p className={styles.evidenceNote}>
              {evidenceNote}{' '}
              <a
                href={PROFILE.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link-paper"
              >
                Open résumé PDF ↗
              </a>
            </p>
          )}
        </div>

        <div className={styles.preview}>{artifact}</div>
      </div>
    </article>
  );
}
