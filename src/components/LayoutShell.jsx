import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PROFILE } from '../data/portfolio';
import styles from './LayoutShell.module.css';

export function LayoutShell({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isCaseStudy = location.pathname.startsWith('/work/');

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className={styles.header} data-case-study={isCaseStudy}>
        <div className={`container ${styles.headerInner}`}>
          <Link to="/" className={styles.brand}>
            <span className={styles.monogram} aria-hidden="true">
              NA
            </span>
            <span className={styles.brandText}>Nikhil Anand</span>
            <span className="sr-only"> home</span>
          </Link>

          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen(prev => !prev)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>

          <nav
            id="primary-nav"
            className={styles.nav}
            data-open={menuOpen}
            aria-label="Primary navigation"
          >
            <Link className={styles.navLink} to="/#selected-work">
              Selected work
            </Link>
            <Link className={styles.navLink} to="/#research">
              DRDO–CABS
            </Link>
            <Link className={styles.navLink} to="/#more-work">
              More work
            </Link>
            <Link className={styles.navLink} to="/#journey">
              Journey
            </Link>
            <Link className={styles.navLink} to="/#contact">
              Contact
            </Link>
            <a
              className={styles.navExternal}
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className={styles.navResume}
              href={PROFILE.resumePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé PDF
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className={styles.main}>
        {children}
      </main>
    </div>
  );
}
