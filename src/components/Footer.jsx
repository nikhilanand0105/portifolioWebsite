import { Link } from 'react-router-dom';
import { PROFILE } from '../data/portfolio';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} data-surface="dark">
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <p className={styles.name}>Nikhil Anand</p>
          <p className={styles.meta}>
            {PROFILE.degree} · {PROFILE.university} · Class of {PROFILE.graduationYear}
          </p>
        </div>

        <nav className={styles.links} aria-label="Footer links">
          <Link to="/#selected-work">Selected work</Link>
          <Link to="/work/jarvis">JARVIS</Link>
          <Link to="/work/commusync">CommuSync</Link>
          <Link to="/work/ssh-manager">SSH Manager</Link>
          <a href={PROFILE.resumePath} target="_blank" rel="noopener noreferrer">
            Résumé PDF
          </a>
          <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>

        <p className={styles.credit}>
          © 2026 Nikhil Anand. Layout &amp; transition patterns adapted under MIT from{' '}
          <a
            href="https://github.com/HamishMW/portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hamish Williams
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
