import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { JARVIS_DEMO } from '../data/portfolio';
import styles from './JarvisReplay.module.css';

export function JarvisReplay({ surface = 'paper', autoCarryOnMount = false }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [carrying, setCarrying] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const carryTimerRef = useRef(null);

  const steps = JARVIS_DEMO.steps;
  const activeStep = steps[stepIndex];

  useEffect(() => {
    if (autoCarryOnMount && !prefersReducedMotion) {
      setCarrying(true);
      carryTimerRef.current = setTimeout(() => {
        setCarrying(false);
      }, 400);
    }
    return () => {
      if (carryTimerRef.current) clearTimeout(carryTimerRef.current);
    };
  }, [autoCarryOnMount, prefersReducedMotion]);

  function triggerReplay() {
    if (carryTimerRef.current) clearTimeout(carryTimerRef.current);
    setStepIndex(0);
    if (!prefersReducedMotion) {
      setCarrying(true);
      carryTimerRef.current = setTimeout(() => {
        setCarrying(false);
      }, 400);
    } else {
      setCarrying(false);
    }
  }

  function goToStep(index) {
    if (carryTimerRef.current) clearTimeout(carryTimerRef.current);
    setCarrying(false);
    setStepIndex(index);
  }

  const isCaptionVisible = stepIndex >= 1;
  const isComposerOpen = stepIndex >= 2;
  const isReadyToShare = stepIndex === 3;

  return (
    <div className={styles.wrapper} data-surface={surface}>
      <div className={styles.headerBar}>
        <span className={`${styles.badge} mono`}>{JARVIS_DEMO.badge}</span>
        <p className={styles.disclaimer}>{JARVIS_DEMO.disclaimer}</p>
      </div>

      {/* Interactive replay (JS enabled) */}
      <div className={`${styles.interactiveGrid} js-only`}>
        <div className={styles.stageArea}>
          {/* Source fixture card that carries the worktable photo into the phone frame */}
          <div className={styles.fixtureCard} data-carrying={carrying}>
            <div className={styles.fixtureThumb}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={JARVIS_DEMO.samplePhoto.srcSetWebp}
                  sizes="120px"
                  width={JARVIS_DEMO.samplePhoto.width}
                  height={JARVIS_DEMO.samplePhoto.height}
                />
                <img
                  src={JARVIS_DEMO.samplePhoto.jpg}
                  srcSet={JARVIS_DEMO.samplePhoto.srcSetJpg}
                  sizes="120px"
                  width={JARVIS_DEMO.samplePhoto.width}
                  height={JARVIS_DEMO.samplePhoto.height}
                  alt={JARVIS_DEMO.samplePhoto.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              {carrying && <span className={styles.carryGhost} aria-hidden="true" />}
            </div>
            <div className={styles.fixtureMeta}>
              <span className={`${styles.fixtureEyebrow} mono`}>Sample fixture</span>
              <span className={styles.fixtureName}>Worktable photo (AG_08341)</span>
              <button
                type="button"
                className={styles.replayBtn}
                onClick={triggerReplay}
              >
                Replay the demo
              </button>
            </div>
          </div>

          {/* Phone mockup */}
          <div
            className={styles.phoneFrame}
            data-carrying={carrying}
            data-step={activeStep.id}
            aria-label={`JARVIS Android illustrative phone mockup, step ${activeStep.stepNumber} of 4: ${activeStep.title}`}
          >
            <div className={styles.phoneNotch} aria-hidden="true">
              <span className={styles.speaker} />
            </div>

            <div className={styles.phoneStatusBar}>
              <span className="mono">
                {isComposerOpen ? 'Instagram · Share' : 'JARVIS POC'}
              </span>
              <span className={`${styles.stepPill} mono`}>
                {activeStep.uiLabel}
              </span>
            </div>

            <div className={styles.phoneBody} data-step={activeStep.id}>
              {/* App top bar inside phone */}
              <div className={styles.appBar}>
                <span className={styles.appBarTitle}>
                  {isComposerOpen ? 'New post' : 'On-device pipeline'}
                </span>
                {stepIndex === 2 && (
                  <span className={`${styles.appActionGhost} mono`}>OK</span>
                )}
                {isReadyToShare && (
                  <span className={styles.shareBtnHeld} aria-label="Share button paused for confirmation">
                    Share
                  </span>
                )}
              </div>

              {/* Selected worktable photo inside phone */}
              <div className={styles.phonePhotoSlot} data-carrying={carrying}>
                <picture>
                  <source
                    type="image/webp"
                    srcSet={JARVIS_DEMO.samplePhoto.srcSetWebp}
                    sizes="280px"
                    width={JARVIS_DEMO.samplePhoto.width}
                    height={JARVIS_DEMO.samplePhoto.height}
                  />
                  <img
                    src={JARVIS_DEMO.samplePhoto.jpg}
                    srcSet={JARVIS_DEMO.samplePhoto.srcSetJpg}
                    sizes="280px"
                    width={JARVIS_DEMO.samplePhoto.width}
                    height={JARVIS_DEMO.samplePhoto.height}
                    alt={JARVIS_DEMO.samplePhoto.alt}
                    loading="lazy"
                    decoding="async"
                    className={styles.phonePhoto}
                  />
                </picture>
                {stepIndex === 0 && (
                  <span className={`${styles.photoTag} mono`}>
                    768 px ARGB_8888 staged
                  </span>
                )}
              </div>

              {/* Caption block / Composer input */}
              {!isCaptionVisible && (
                <div className={styles.phoneStatusCard}>
                  <p className={`${styles.phoneCardLabel} mono`}>
                    Next: GemmaCaptionEngine.kt
                  </p>
                  <p className={styles.phoneCardText}>
                    Image loaded via FileProvider and queued for on-device Gemma 3n captioning.
                  </p>
                </div>
              )}

              {isCaptionVisible && (
                <div
                  className={styles.composerBox}
                  data-filled={isComposerOpen}
                  data-ready={isReadyToShare}
                >
                  <div className={styles.composerHeader}>
                    <span className={`${styles.composerTag} mono`}>
                      {isComposerOpen ? 'CAPTION_FIELD (editable=true)' : 'Gemma 3n E2B INT4 output'}
                    </span>
                    {isComposerOpen && (
                      <span className={`${styles.verifiedChip} mono`}>
                        verifyText() ✓
                      </span>
                    )}
                  </div>
                  <p className={styles.captionPreview}>{JARVIS_DEMO.sampleCaption}</p>
                </div>
              )}

              {/* Final confirmation gate on Step 4 */}
              {isReadyToShare && (
                <div className={styles.humanGate} role="status">
                  <div className={styles.gateHeader}>
                    <span className={styles.gateBadge}>Ready to share</span>
                    <span className="mono">!autoConfirm</span>
                  </div>
                  <p className={styles.gateText}>
                    Paused before tapping Share. Tap Share yourself on the phone to post.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step selector + side-by-side explanation */}
        <div className={styles.controlsArea}>
          <div className={styles.stepTabs} role="group" aria-label="Replay steps">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                className={styles.stepTab}
                aria-pressed={idx === stepIndex}
                onClick={() => goToStep(idx)}
              >
                <span className={`${styles.stepTabNum} mono`}>0{step.stepNumber}</span>
                <span>{step.shortLabel}</span>
              </button>
            ))}
          </div>

          <div className={styles.explanationPanel} aria-live="polite">
            <div className={styles.expHeader}>
              <span className={`${styles.expCode} mono`}>{activeStep.screenStatus}</span>
              <span className={`${styles.expRef} mono`}>{activeStep.codeRef}</span>
            </div>
            <h3 className={styles.expTitle}>{activeStep.title}</h3>
            <p className={styles.expBody}>{activeStep.explanation}</p>

            <div className={styles.navButtons}>
              <button
                type="button"
                className={styles.stepNavBtn}
                onClick={() => goToStep(Math.max(0, stepIndex - 1))}
                disabled={stepIndex === 0}
              >
                ← Previous
              </button>
              <button
                type="button"
                className={styles.stepNavBtnPrimary}
                onClick={() => {
                  if (stepIndex < steps.length - 1) {
                    goToStep(stepIndex + 1);
                  } else {
                    triggerReplay();
                  }
                }}
              >
                {stepIndex < steps.length - 1 ? 'Next step →' : 'Replay the demo'}
              </button>
            </div>
          </div>

          <div className={styles.sourceLinks}>
            <a
              href={JARVIS_DEMO.flowSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.codeLink}
            >
              InstagramPostFlow.kt ↗
            </a>
            <a
              href={JARVIS_DEMO.captionSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.codeLink}
            >
              GemmaCaptionEngine.kt ↗
            </a>
            <a
              href={JARVIS_DEMO.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.codeLink}
            >
              jarvis-final repo ↗
            </a>
          </div>
        </div>
      </div>

      {/* Static 4-step sequence rendered cleanly when JavaScript is unavailable */}
      <div className={`${styles.staticSequence} no-js-only`}>
        <ol className={styles.staticList}>
          {steps.map(step => (
            <li key={step.id} className={styles.staticCard}>
              <div className={styles.staticHead}>
                <span className={`${styles.stepTabNum} mono`}>0{step.stepNumber}</span>
                <strong>{step.title}</strong>
                <span className={`${styles.expCode} mono`}>{step.screenStatus}</span>
              </div>
              {step.stepNumber === 1 && (
                <img
                  src={JARVIS_DEMO.samplePhoto.jpg}
                  width={JARVIS_DEMO.samplePhoto.width}
                  height={JARVIS_DEMO.samplePhoto.height}
                  alt={JARVIS_DEMO.samplePhoto.alt}
                  className={styles.staticThumb}
                />
              )}
              {(step.stepNumber === 2 || step.stepNumber === 3 || step.stepNumber === 4) && (
                <blockquote className={styles.staticCaption}>
                  {JARVIS_DEMO.sampleCaption}
                </blockquote>
              )}
              {step.stepNumber === 4 && (
                <p className={styles.staticGate}>
                  <strong>Ready to share</strong> — Composer halted before tapping Share for human confirmation.
                </p>
              )}
              <p className={styles.staticExplain}>{step.explanation}</p>
            </li>
          ))}
        </ol>
        <div className={styles.sourceLinks}>
          <a href={JARVIS_DEMO.flowSourceUrl} target="_blank" rel="noopener noreferrer" className={styles.codeLink}>
            InstagramPostFlow.kt ↗
          </a>
          <a href={JARVIS_DEMO.captionSourceUrl} target="_blank" rel="noopener noreferrer" className={styles.codeLink}>
            GemmaCaptionEngine.kt ↗
          </a>
        </div>
      </div>
    </div>
  );
}
