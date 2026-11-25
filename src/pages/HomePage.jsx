import { useEffect } from 'react';
import { CommuSyncChart } from '../components/CommuSyncChart';
import { Divider } from '../components/Divider';
import { DrdoSection } from '../components/DrdoSection';
import { HeroSpread } from '../components/HeroSpread';
import { JarvisReplay } from '../components/JarvisReplay';
import { JourneyContactSection } from '../components/JourneyContactSection';
import { MoreWorkSection } from '../components/MoreWorkSection';
import { ProjectSummary } from '../components/ProjectSummary';
import { SshDiagram } from '../components/SshDiagram';
import { SELECTED_WORK } from '../data/portfolio';
import styles from './HomePage.module.css';

export function HomePage() {
  useEffect(() => {
    document.title = 'Nikhil Anand — Software Engineer · Backend Systems & On-Device AI';
  }, []);

  const [jarvis, commusync, sshManager] = SELECTED_WORK;

  return (
    <>
      <HeroSpread />

      <section
        id="selected-work"
        className={styles.selectedWork}
        data-surface="paper"
        aria-labelledby="selected-work-heading"
      >
        <div className="container">
          <div className={styles.sectionIntro}>
            <div className={styles.eyebrowRow}>
              <Divider surface="paper" lineWidth="56px" notchWidth="28px" notchHeight="5px" />
              <span className={`${styles.eyebrow} mono`}>Selected work</span>
            </div>
            <h2 id="selected-work-heading" className={styles.heading}>
              Three systems built for constraints, latency, and reliability
            </h2>
          </div>

          <ProjectSummary
            id="project-1"
            index={jarvis.index}
            title={jarvis.title}
            tagline={jarvis.tagline}
            summary={jarvis.summary}
            metricHighlight={jarvis.metricHighlight}
            tags={jarvis.tags}
            caseStudyUrl={jarvis.slug}
            primarySourceUrl={jarvis.primarySourceUrl}
            primarySourceLabel={jarvis.primarySourceLabel}
            secondarySourceUrl={jarvis.secondarySourceUrl}
            secondarySourceLabel={jarvis.secondarySourceLabel}
            artifact={<JarvisReplay surface="paper" />}
          />

          <ProjectSummary
            id="project-2"
            alternate
            index={commusync.index}
            title={commusync.title}
            tagline={commusync.tagline}
            summary={commusync.summary}
            metricHighlight={commusync.metricHighlight}
            tags={commusync.tags}
            caseStudyUrl={commusync.slug}
            evidenceNote={commusync.evidenceNote}
            artifact={<CommuSyncChart />}
          />

          <ProjectSummary
            id="project-3"
            index={sshManager.index}
            title={sshManager.title}
            tagline={sshManager.tagline}
            summary={sshManager.summary}
            metricHighlight={sshManager.metricHighlight}
            tags={sshManager.tags}
            caseStudyUrl={sshManager.slug}
            primarySourceUrl={sshManager.primarySourceUrl}
            primarySourceLabel={sshManager.primarySourceLabel}
            artifact={<SshDiagram />}
          />
        </div>
      </section>

      <DrdoSection />
      <MoreWorkSection />
      <JourneyContactSection />
    </>
  );
}
