import { useEffect } from 'react';
import { SshDiagram } from '../components/SshDiagram';
import {
  CaseStudyNavFooter,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
} from '../components/ProjectCaseLayout';
import { CASE_STUDIES } from '../data/portfolio';
import styles from './CaseStudy.module.css';

export function SshManagerPage() {
  const study = CASE_STUDIES.sshManager;

  useEffect(() => {
    document.title = study.metaTitle;
  }, [study.metaTitle]);

  return (
    <ProjectContainer variant="ssh">
      <ProjectHeader
        eyebrow="Case study 03 · Infrastructure automation"
        title={study.title}
        lead="Replacing manual authorized_keys edits with a Flask RBAC service, envelope-encrypted keys, and Ansible playbooks cut provisioning from ~20 minutes to ~30 seconds."
        roles={study.roles}
        primaryLink={{
          href: 'https://github.com/nikhilanand0105/SSH-Manager',
          label: 'Inspect SSH-Manager on GitHub',
        }}
      />

      <ProjectSection surface="paper" id="architecture">
        <div className={styles.twoCol}>
          <SshDiagram />
          <div className={styles.proseCol}>
            <h2 className={styles.sectionHeading}>Shared architecture</h2>
            <p className={styles.bodyP}>
              Instead of logging into each machine over SSH to append public keys, administrators submit a
              grant or revoke request through the Flask REST API. After session and RBAC checks, the server
              unwraps the encrypted key material and dispatches Ansible playbooks that distribute the CA
              public key and manage <code className="mono">TrustedUserCAKeys</code> in{' '}
              <code className="mono">/etc/ssh/sshd_config</code> across 5+ servers and 25 users.
            </p>
            <div className={styles.calloutBox}>
              <h3 className={styles.calloutTitle}>Notes vs. public repository</h3>
              <p className={styles.bodyP}>{study.discrepancyNote}</p>
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

      <ProjectSection surface="paper" id="evidence">
        <h2 className={styles.sectionHeading}>Source files to inspect</h2>
        <ul className={styles.evidenceList}>
          {study.evidenceLinks.map(link => (
            <li key={link.href} className={styles.evidenceItem}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link-paper"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </ProjectSection>

      <CaseStudyNavFooter currentSlug="/work/ssh-manager" />
    </ProjectContainer>
  );
}
