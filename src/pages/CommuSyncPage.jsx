import { useEffect } from 'react';
import { CommuSyncChart } from '../components/CommuSyncChart';
import {
  CaseStudyNavFooter,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
} from '../components/ProjectCaseLayout';
import { CASE_STUDIES, PROFILE } from '../data/portfolio';
import styles from './CaseStudy.module.css';

export function CommuSyncPage() {
  const study = CASE_STUDIES.commusync;

  useEffect(() => {
    document.title = study.metaTitle;
  }, [study.metaTitle]);

  return (
    <ProjectContainer variant="commusync">
      <ProjectHeader
        eyebrow="Case study 02 · Production backend engineering"
        title={study.title}
        lead="Job-search latency fell from 310 ms to 180 ms across 7 production endpoints while shipping Job Management workflows for 2,000+ recruiters and candidates."
        roles={study.roles}
        primaryLink={{
          href: PROFILE.resumePath,
          label: 'Inspect résumé PDF',
        }}
      />

      <ProjectSection surface="paper" id="latency">
        <div className={styles.kpiStrip}>
          <div className={styles.kpiCard}>
            <span className={styles.kpiNumber}>310 → 180 ms</span>
            <p className={styles.kpiLabel}>42% p95 latency drop across 7 endpoints</p>
          </div>
          <div className={styles.kpiCard}>
            <span className={styles.kpiNumber}>15+ REST APIs</span>
            <p className={styles.kpiLabel}>Designed &amp; shipped for Job Management</p>
          </div>
          <div className={styles.kpiCard}>
            <span className={styles.kpiNumber}>40+ PRs · 0 rollbacks</span>
            <p className={styles.kpiLabel}>8+ end-to-end features across 3+ releases</p>
          </div>
        </div>

        <div className={styles.twoCol}>
          <CommuSyncChart />
          <div className={styles.proseCol}>
            <h2 className={styles.sectionHeading}>Why p95 mattered here</h2>
            <p className={styles.bodyP}>
              An average response time masks tail bottlenecks: a fast cached ping and a slow multi-filter
              job search average out to look fine while recruiters sit waiting. <strong>p95</strong> (the
              95th percentile) tracks the slowest response among the fastest 95% of requests—so dropping it
              from <code className="mono">310 ms</code> to <code className="mono">180 ms</code> meant real
              job searches stayed fast even under concurrent filtering.
            </p>
            <div className={styles.calloutBox}>
              <h3 className={styles.calloutTitle}>Evidence note</h3>
              <p className={styles.bodyP}>{study.evidenceNotes}</p>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection surface="paper-elevated" id="details">
        <div className={styles.twoCol}>
          <div className={styles.proseCol}>
            <h2 className={styles.sectionHeading}>What was difficult</h2>
            {study.difficulty.map(paragraph => (
              <p key={paragraph} className={styles.bodyP}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className={styles.proseCol}>
            <h2 className={styles.sectionHeading}>What I personally changed</h2>
            {study.whatIChanged.map(paragraph => (
              <p key={paragraph} className={styles.bodyP}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </ProjectSection>

      <CaseStudyNavFooter currentSlug="/work/commusync" />
    </ProjectContainer>
  );
}
