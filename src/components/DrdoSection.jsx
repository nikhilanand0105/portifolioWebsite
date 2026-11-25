import { Divider } from './Divider';
import { DRDO_EXPERIENCE } from '../data/portfolio';
import styles from './DrdoSection.module.css';

export function DrdoSection() {
  const { headlineMetric } = DRDO_EXPERIENCE;
  const beforePct = ((headlineMetric.before / 60) * 100).toFixed(1);
  const afterPct = ((headlineMetric.after / 60) * 100).toFixed(1);

  return (
    <section
      id="research"
      className={styles.section}
      data-surface="dark"
      aria-labelledby="research-heading"
    >
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.narrative}>
            <div className={styles.eyebrowRow}>
              <Divider surface="dark" lineWidth="56px" notchWidth="28px" notchHeight="5px" />
              <span className={`${styles.eyebrow} mono`}>
                Applied Research · {DRDO_EXPERIENCE.year}
              </span>
            </div>

            <h2 id="research-heading" className={styles.heading}>
              {DRDO_EXPERIENCE.organization}
            </h2>
            <p className={styles.subhead}>
              {DRDO_EXPERIENCE.role} — {DRDO_EXPERIENCE.subtitle}
            </p>
            <p className={styles.selection}>{DRDO_EXPERIENCE.selection}</p>

            <ul className={styles.bullets}>
              {DRDO_EXPERIENCE.bullets.map(bullet => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className={styles.telemetryCard}>
            <span className={`${styles.cardEyebrow} mono`}>
              Input pipeline profiling · PyTorch
            </span>
            <h3 className={styles.cardTitle}>
              Training epoch time dropped from 52 to 32 minutes
            </h3>

            <div
              className={styles.barChart}
              role="img"
              aria-label="Zero-based bar chart showing PyTorch epoch time fell from 52 minutes before pipeline rewrite to 32 minutes after removing GPU-starvation bottlenecks"
            >
              <div className={styles.barRow}>
                <div className={styles.barLabelRow}>
                  <span>Before pipeline rewrite</span>
                  <span className="mono">52 min</span>
                </div>
                <div className={styles.track}>
                  <div className={styles.barBefore} style={{ width: `${beforePct}%` }} />
                </div>
              </div>

              <div className={styles.barRow}>
                <div className={styles.barLabelRow}>
                  <span>After data-loading rewrite</span>
                  <span className={`${styles.afterVal} mono`}>32 min (-38%)</span>
                </div>
                <div className={styles.track}>
                  <div className={styles.barAfter} style={{ width: `${afterPct}%` }} />
                </div>
              </div>
            </div>

            <dl className={styles.statGrid}>
              <div className={styles.statItem}>
                <dt className="mono">Dataset scale</dt>
                <dd>{headlineMetric.datasetScale}</dd>
              </div>
              <div className={styles.statItem}>
                <dt className="mono">Ship-wake recall</dt>
                <dd>
                  {headlineMetric.recallBefore} → {headlineMetric.recallAfter} across{' '}
                  {headlineMetric.modelCount}
                </dd>
              </div>
              <div className={styles.statItem}>
                <dt className="mono">False positives</dt>
                <dd>Cut by {headlineMetric.falsePositiveDrop} via error analysis</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
