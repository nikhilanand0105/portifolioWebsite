import { useEffect } from 'react';
import { JarvisReplay } from '../components/JarvisReplay';
import {
  CaseStudyNavFooter,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
} from '../components/ProjectCaseLayout';
import { CASE_STUDIES, JARVIS_DEMO } from '../data/portfolio';
import styles from './CaseStudy.module.css';

export function JarvisPage() {
  const study = CASE_STUDIES.jarvis;

  useEffect(() => {
    document.title = study.metaTitle;
  }, [study.metaTitle]);

  return (
    <ProjectContainer variant="jarvis">
      <ProjectHeader
        eyebrow="Case study 01 · On-device Android AI"
        title={study.title}
        lead={study.lead}
        roles={study.roles}
        backdropSrc="/media/stage-desktop-1280.jpg"
        primaryLink={{
          href: JARVIS_DEMO.flowSourceUrl,
          label: 'Inspect InstagramPostFlow.kt',
        }}
        secondaryLink={{
          href: JARVIS_DEMO.captionSourceUrl,
          label: 'Inspect GemmaCaptionEngine.kt',
        }}
      />

      <ProjectSection surface="paper" id="demo">
        <div className={styles.centerpiece}>
          <h2 className={styles.sectionHeading}>Interactive replay</h2>
          <p className={styles.bodyP}>
            This illustrative replay uses the worktable photograph as a fixed local fixture to show the
            four-stage handoff between <code className="mono">GemmaCaptionEngine.kt</code> and{' '}
            <code className="mono">InstagramPostFlow.kt</code>. It is distinct from live Android app footage.
          </p>
          <JarvisReplay autoCarryOnMount />
        </div>
      </ProjectSection>

      <ProjectSection surface="paper-elevated" id="engineering">
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

      <ProjectSection surface="paper" id="verification">
        <h2 className={styles.sectionHeading}>Locating the composer &amp; checking the screen</h2>
        <ol className={styles.codeSteps}>
          <li className={styles.codeStepCard}>
            <span className={`${styles.codeTag} mono`}>1 · Ordered Selector fallback</span>
            <p className={styles.bodyP}>
              <code className="mono">Query</code> checks <code className="mono">editable=true</code> plus
              ordered Instagram view IDs (<code className="mono">caption_input_text_view</code>,{' '}
              <code className="mono">caption_text_view</code>) and rejects disabled nodes before any tap or
              text write.
            </p>
          </li>
          <li className={styles.codeStepCard}>
            <span className={`${styles.codeTag} mono`}>2 · Guarded text verification</span>
            <p className={styles.bodyP}>
              If <code className="mono">ACTION_SET_TEXT</code> fails silently, <code className="mono">ActionExecutor</code>{' '}
              clears the box, pastes only when the clipboard matches our caption, and re-reads editable nodes
              via <code className="mono">verifyText()</code>.
            </p>
          </li>
          <li className={styles.codeStepCard}>
            <span className={`${styles.codeTag} mono`}>3 · Human confirmation gate</span>
            <p className={styles.bodyP}>
              After dismissing the keyboard (<code className="mono">OK</code> / Back) and locating an enabled{' '}
              <code className="mono">SHARE_BUTTON</code>, the default <code className="mono">!autoConfirm</code>{' '}
              path halts with <code className="mono">FlowResult.AwaitingUser</code> so a human confirms sharing.
            </p>
          </li>
        </ol>
      </ProjectSection>

      <ProjectSection surface="paper-elevated" id="evidence">
        <div className={styles.twoCol}>
          <div className={styles.proseCol}>
            <h2 className={styles.sectionHeading}>Code &amp; stage evidence</h2>
            <p className={styles.bodyP}>
              Every claim on this page traces directly to the Kotlin files in{' '}
              <code className="mono">nikhilanand0105/jarvis-final</code> and the live PhoneMirror stage
              demonstration in Bengaluru.
            </p>
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
          </div>

          <figure className={styles.stagePhotoCard}>
            <picture>
              <source
                type="image/webp"
                srcSet="/media/stage-desktop-800.webp 800w, /media/stage-desktop-1280.webp 1280w"
                sizes="(max-width: 880px) 92vw, 540px"
                width={1280}
                height={923}
              />
              <img
                src="/media/stage-desktop-800.jpg"
                srcSet="/media/stage-desktop-800.jpg 800w, /media/stage-desktop-1280.jpg 1280w"
                sizes="(max-width: 880px) 92vw, 540px"
                width={1280}
                height={923}
                loading="lazy"
                alt="Nikhil Anand presenting the JARVIS POC on stage in front of a mirrored Android control panel"
              />
            </picture>
            <figcaption className={styles.stageCaption}>
              Actual Android application UI (<code className="mono">JARVIS POC</code>) mirrored live on stage
              in Bengaluru (30 August) — contrasted with the illustrative web replay above.
            </figcaption>
          </figure>
        </div>
      </ProjectSection>

      <CaseStudyNavFooter currentSlug="/work/jarvis" />
    </ProjectContainer>
  );
}
