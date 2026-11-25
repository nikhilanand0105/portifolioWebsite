import { SELECTED_WORK } from '../data/portfolio';
import styles from './CommuSyncChart.module.css';

export function CommuSyncChart({ showExplainer = true }) {
  const { chartData } = SELECTED_WORK[1];
  const beforePct = ((chartData.beforeMs / chartData.scaleMax) * 100).toFixed(2);
  const afterPct = ((chartData.afterMs / chartData.scaleMax) * 100).toFixed(2);

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <span className={`${styles.eyebrow} mono`}>7 production endpoints · PostgreSQL</span>
          <h3 className={styles.title}>Job-search p95 response latency</h3>
        </div>
        <span className={`${styles.deltaBadge} mono`}>-42% (-130 ms)</span>
      </div>

      <div
        className={styles.chartRegion}
        role="img"
        aria-label={`Zero-based bar chart showing job-search p95 latency fell from ${chartData.beforeMs} milliseconds before optimization to ${chartData.afterMs} milliseconds after query rewrites and indexing`}
      >
        {/* Zero-based axis ticks */}
        <div className={styles.axisRow} aria-hidden="true">
          {chartData.ticks.map(tick => (
            <span
              key={tick}
              className={`${styles.tickLabel} mono`}
              style={{ left: `${(tick / chartData.scaleMax) * 100}%` }}
            >
              {tick} ms
            </span>
          ))}
        </div>

        <div className={styles.bars}>
          <div className={styles.barGroup}>
            <div className={styles.barHeader}>
              <span className={styles.barLabel}>Before (unindexed job-search paths)</span>
              <span className={`${styles.barValue} mono`}>{chartData.beforeMs} ms</span>
            </div>
            <div className={styles.track}>
              {chartData.ticks.map(tick => (
                <span
                  key={tick}
                  aria-hidden="true"
                  className={styles.gridline}
                  style={{ left: `${(tick / chartData.scaleMax) * 100}%` }}
                />
              ))}
              <div
                className={styles.barBefore}
                style={{ width: `${beforePct}%` }}
              />
            </div>
          </div>

          <div className={styles.barGroup}>
            <div className={styles.barHeader}>
              <span className={styles.barLabel}>After (rewritten SQL + hot-path indexes)</span>
              <span className={`${styles.barValueAfter} mono`}>{chartData.afterMs} ms</span>
            </div>
            <div className={styles.track}>
              {chartData.ticks.map(tick => (
                <span
                  key={tick}
                  aria-hidden="true"
                  className={styles.gridline}
                  style={{ left: `${(tick / chartData.scaleMax) * 100}%` }}
                />
              ))}
              <div
                className={styles.barAfter}
                style={{ width: `${afterPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {showExplainer && (
        <p className={styles.explainer}>{chartData.p95Explainer}</p>
      )}
    </div>
  );
}
