/**
 * Notched divider adapted from HamishMW/portfolio/app/components/divider/divider.jsx (MIT).
 * Reference commit: b7444bc16216f38c64f4afb8d2f53b8c4cbb2bda
 */
import styles from './Divider.module.css';

export function Divider({
  lineWidth = '100%',
  lineHeight = '2px',
  notchWidth = '64px',
  notchHeight = '7px',
  collapsed = false,
  collapseDelay = 0,
  surface = 'paper',
  className = '',
}) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.divider} ${className}`}
      data-surface={surface}
      style={{
        '--lineWidth': lineWidth,
        '--lineHeight': lineHeight,
        '--notchWidth': notchWidth,
        '--notchHeight': notchHeight,
        '--collapseDelay': `${collapseDelay}ms`,
      }}
    >
      <div className={styles.line} data-collapsed={collapsed} />
      <div
        className={styles.notch}
        data-collapsed={collapsed}
        style={{ '--collapseDelay': `${collapseDelay + 120}ms` }}
      />
    </div>
  );
}
