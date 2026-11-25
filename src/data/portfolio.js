/**
 * Single editable content store for Nikhil Anand's portfolio.
 * Every metric, link, caption, and case study narrative comes directly
 * from resume.pdf, PROP.txt / PROPv1.txt, verified repository source files,
 * and photographic evidence.
 */

export const PROFILE = {
  name: 'Nikhil Anand',
  degree: 'B.Tech Computer Science',
  university: 'VIT Chennai',
  graduationYear: '2028',
  headlineTag: 'B.Tech CSE · VIT Chennai · Class of 2028',
  voiceLine: 'I build backend systems and Android tools that run AI on the device.',
  focusAreas: 'Backend engineering, distributed systems, and on-device mobile AI',
  email: 'nikhilanand0105@gmail.com',
  githubUrl: 'https://github.com/nikhilanand0105',
  linkedinUrl: 'https://www.linkedin.com/in/nikhilanand0105/',
  resumePath: '/Nikhil_Anand_Resume.pdf',
  location: 'Patna & Chennai, India',
};

export const HERO_PHOTOS = [
  {
    id: 'table',
    label: 'At the table',
    caption:
      'At the table — Working beside teammates around three laptops at the iQOO Hackathon.',
    alt: 'Nikhil Anand smiling at a wooden hackathon worktable with two teammates and open laptops',
    desktopWebp: '/media/table-desktop-1280.webp',
    desktopSrcSetWebp:
      '/media/table-desktop-800.webp 800w, /media/table-desktop-1280.webp 1280w, /media/table-desktop-1600.webp 1600w',
    desktopSrcSetJpg:
      '/media/table-desktop-800.jpg 800w, /media/table-desktop-1280.jpg 1280w, /media/table-desktop-1600.jpg 1600w',
    desktopFallback: '/media/table-desktop-1280.jpg',
    desktopWidth: 1280,
    desktopHeight: 834,
    mobileSrcSetWebp: '/media/table-mobile-480.webp 480w, /media/table-mobile-780.webp 780w',
    mobileSrcSetJpg: '/media/table-mobile-480.jpg 480w, /media/table-mobile-780.jpg 780w',
    mobileFallback: '/media/table-mobile-780.jpg',
    mobileWidth: 780,
    mobileHeight: 682,
  },
  {
    id: 'stage',
    label: 'On stage',
    caption:
      'On stage — Explaining the JARVIS prototype into a mic while the live Android control screen mirrors behind us in Bengaluru (30 August).',
    alt: 'Nikhil Anand holding a microphone on stage in Bengaluru next to a teammate holding a tethered phone, in front of a screen mirroring the JARVIS Android app',
    desktopWebp: '/media/stage-desktop-1280.webp',
    desktopSrcSetWebp:
      '/media/stage-desktop-800.webp 800w, /media/stage-desktop-1280.webp 1280w, /media/stage-desktop-1600.webp 1600w',
    desktopSrcSetJpg:
      '/media/stage-desktop-800.jpg 800w, /media/stage-desktop-1280.jpg 1280w, /media/stage-desktop-1600.jpg 1600w',
    desktopFallback: '/media/stage-desktop-1280.jpg',
    desktopWidth: 1280,
    desktopHeight: 923,
    mobileSrcSetWebp: '/media/stage-mobile-480.webp 480w, /media/stage-mobile-780.webp 780w',
    mobileSrcSetJpg: '/media/stage-mobile-480.jpg 480w, /media/stage-mobile-780.jpg 780w',
    mobileFallback: '/media/stage-mobile-780.jpg',
    mobileWidth: 780,
    mobileHeight: 682,
  },
];

export const JARVIS_DEMO = {
  badge: 'Illustrative replay · fixed local fixture',
  disclaimer:
    'Simulated UI sequence using the worktable photograph as a local fixture — no browser model, login, or live Instagram session required. Distinguished from live Android app footage.',
  samplePhoto: {
    webp: '/media/jarvis-worktable-800.webp',
    jpg: '/media/jarvis-worktable-800.jpg',
    srcSetWebp: '/media/jarvis-worktable-480.webp 480w, /media/jarvis-worktable-800.webp 800w',
    srcSetJpg: '/media/jarvis-worktable-480.jpg 480w, /media/jarvis-worktable-800.jpg 800w',
    width: 800,
    height: 600,
    alt: 'Worktable photograph staged as input for the JARVIS caption and composer replay',
  },
  sampleCaption:
    'Three laptops, warm coffee light, and steady iteration before demo hour. #BuildSession #AndroidAI #Systems',
  repoUrl: 'https://github.com/nikhilanand0105/jarvis-final',
  flowSourceUrl:
    'https://github.com/nikhilanand0105/jarvis-final/blob/main/app/src/main/java/com/jarvispoc/flows/InstagramPostFlow.kt',
  captionSourceUrl:
    'https://github.com/nikhilanand0105/jarvis-final/blob/main/app/src/main/java/com/jarvispoc/ai/GemmaCaptionEngine.kt',
  steps: [
    {
      stepNumber: 1,
      id: 'photo',
      shortLabel: 'Selected photo',
      title: 'Stage the selected photo',
      screenStatus: 'Photos.stageForShare → FileProvider URI',
      explanation:
        'Photos.load decodes an ARGB_8888 software bitmap and downscales the longest edge to 768 px, then hands the photo to Instagram via Intent.ACTION_SEND instead of scraping the gallery grid.',
      codeRef: 'InstagramPostFlow.kt · L45–L61',
      uiLabel: '1 / 4 · Image staged',
    },
    {
      stepNumber: 2,
      id: 'caption',
      shortLabel: 'Sample caption',
      title: 'Generate caption on device',
      screenStatus: 'Gemma 3n E2B INT4 · single-flight Mutex',
      explanation:
        'GemmaCaptionEngine runs Gemma 3n E2B INT4 via MediaPipe LlmInferenceSession with vision modality enabled, trims turn markers, and pre-loads the clipboard while JARVIS still owns the screen.',
      codeRef: 'GemmaCaptionEngine.kt · L35–L64',
      uiLabel: '2 / 4 · Caption generated locally',
    },
    {
      stepNumber: 3,
      id: 'composer',
      shortLabel: 'Filled composer',
      title: 'Locate field & verify input',
      screenStatus: 'ACTION_SET_TEXT → verifyText()',
      explanation:
        'ActionExecutor polls the accessibility hierarchy every 250 ms for an editable caption node, falls back to guarded clipboard paste if ACTION_SET_TEXT is ignored, and reads editable nodes back to verify text landed.',
      codeRef: 'ActionExecutor.kt · L213–L313',
      uiLabel: '3 / 4 · Caption verified in composer',
    },
    {
      stepNumber: 4,
      id: 'confirm',
      shortLabel: 'Ready to share',
      title: 'Ready to share — human stop',
      screenStatus: 'FlowResult.AwaitingUser · autoConfirm = false',
      explanation:
        'Once OK clears the keyboard and SHARE_BUTTON is enabled in the live tree, the default path halts without tapping Share so a person checks the post before anything goes public.',
      codeRef: 'InstagramPostFlow.kt · L147–L152',
      uiLabel: 'Ready to share',
    },
  ],
};

export const SELECTED_WORK = [
  {
    index: '01',
    id: 'jarvis',
    slug: '/work/jarvis',
    title: 'JARVIS — On-device Android agent',
    tagline: 'Gemma 3n captioning paired with verified Kotlin accessibility automation.',
    summary:
      'On-device Gemma 3n E2B INT4 handles image captioning inside the Android app, while deterministic Kotlin scripts poll and verify live accessibility nodes through the Instagram composer and stop before Share.',
    metricHighlight: 'Stops for human confirmation before Share (default !autoConfirm path)',
    tags: ['Kotlin', 'Jetpack Compose', 'Gemma 3n E2B INT4', 'AccessibilityService'],
    repoUrl: 'https://github.com/nikhilanand0105/jarvis-final',
    primarySourceUrl:
      'https://github.com/nikhilanand0105/jarvis-final/blob/main/app/src/main/java/com/jarvispoc/flows/InstagramPostFlow.kt',
    primarySourceLabel: 'Inspect InstagramPostFlow.kt',
    secondarySourceUrl:
      'https://github.com/nikhilanand0105/jarvis-final/blob/main/app/src/main/java/com/jarvispoc/ai/GemmaCaptionEngine.kt',
    secondarySourceLabel: 'Inspect GemmaCaptionEngine.kt',
  },
  {
    index: '02',
    id: 'commusync',
    slug: '/work/commusync',
    title: 'CommuSync — Production job-search latency',
    tagline: 'Job-search latency fell from 310 ms to 180 ms.',
    summary:
      'As Full-Stack Developer Intern on a 6-person team, I designed 15+ REST APIs for Job Management workflows and rewrote hot PostgreSQL queries and indexes—cutting p95 latency 42% across 7 production endpoints.',
    metricHighlight: '310 ms → 180 ms p95 (-42%) across 7 production endpoints',
    tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Next.js'],
    repoUrl: null,
    evidenceNote: 'Public evidence for this employer story is my résumé (company codebase is private).',
    chartData: {
      scaleMax: 350,
      ticks: [0, 100, 200, 300],
      beforeMs: 310,
      afterMs: 180,
      reductionPct: '42%',
      p95Explainer:
        'p95 (the 95th percentile) is the response-time ceiling that 95 out of 100 requests finish under. Unlike an average, it shows the slowdown users actually hit on unindexed search queries.',
    },
  },
  {
    index: '03',
    id: 'ssh-manager',
    slug: '/work/ssh-manager',
    title: 'SSH Manager — Automated fleet provisioning',
    tagline: 'Access provisioning dropped from ~20 minutes of manual setup to ~30 seconds.',
    summary:
      'Centralized SSH credential and access management behind a Flask REST API with RBAC, envelope-encrypted keys, and Ansible playbooks writing TrustedUserCAKeys across 5+ servers and 25 users.',
    metricHighlight: '~20 min manual → ~30 s automated across 5+ servers, 25 users',
    tags: ['Flask', 'Ansible', 'Envelope Encryption', 'RBAC'],
    repoUrl: 'https://github.com/nikhilanand0105/SSH-Manager',
    primarySourceUrl: 'https://github.com/nikhilanand0105/SSH-Manager',
    primarySourceLabel: 'Inspect SSH-Manager on GitHub',
  },
];

export const CASE_STUDIES = {
  jarvis: {
    route: '/work/jarvis',
    title: 'JARVIS — On-device Android UI automation & captioning',
    metaTitle: 'JARVIS Case Study — Nikhil Anand',
    metaDescription:
      'How JARVIS pairs on-device Gemma 3n E2B INT4 image captioning with deterministic Kotlin AccessibilityService verification in InstagramPostFlow.kt.',
    lead:
      'An on-device Android prototype where Gemma 3n generates image captions locally and a Kotlin AccessibilityService drives Instagram’s composer through layered fallbacks—stopping before Share for human confirmation.',
    roles: [
      'Role: Android & on-device AI architecture',
      'Model scope: Gemma 3n E2B INT4 (captioning)',
      'Automation: Deterministic Kotlin AccessibilityService',
      'Safety gate: FlowResult.AwaitingUser before Share',
    ],
    difficulty: [
      'Third-party Android apps do not follow textbook accessibility behavior. Instagram’s composer ignores standard ACTION_SET_TEXT calls on several builds, shifts view bounds when multi-line captions expand, hides its Share button beneath an on-screen keyboard behind an OK toolbar action, and some OEM Android builds block clipboard writes once a backgrounded service yields the foreground.',
      'Relying on fixed sleep delays or blind screen coordinates breaks across screen sizes and layout updates. Meanwhile, running a multi-gigabyte model on the phone means every extra model pass adds cold-start and inference latency—so using an LLM to guess every tap would slow down and tangle UI reliability.',
    ],
    whatIChanged: [
      'Kept the model’s job tightly bounded: GemmaCaptionEngine.kt loads gemma-3n-E2B-it-int4.litertlm once in process scope, scales software-backed ARGB_8888 bitmaps to 768 px, runs single-flight caption sessions under a Mutex, and strips turn tokens.',
      'Skipped brittle gallery-grid scraping by sending the staged FileProvider photo straight into Instagram’s ShareHandlerActivity via Intent.ACTION_SEND, pre-loading the caption onto the clipboard while JARVIS still holds focus.',
      'Wrote ActionExecutor and Query to poll the live accessibility tree every 250 ms (excluding JARVIS’s own package nodes in ScreenObserver), match ordered Selector fallbacks (never matching disabled nodes), verify typed captions by reading editable nodes back via verifyText(), clear the soft keyboard, and halt in FlowResult.AwaitingUser right before tapping Share unless auto-confirm is explicitly enabled.',
    ],
    evidenceLinks: [
      {
        label: 'InstagramPostFlow.kt (composer navigation & human stop)',
        href: 'https://github.com/nikhilanand0105/jarvis-final/blob/main/app/src/main/java/com/jarvispoc/flows/InstagramPostFlow.kt',
      },
      {
        label: 'GemmaCaptionEngine.kt (Gemma 3n E2B INT4 captioning)',
        href: 'https://github.com/nikhilanand0105/jarvis-final/blob/main/app/src/main/java/com/jarvispoc/ai/GemmaCaptionEngine.kt',
      },
      {
        label: 'ActionExecutor.kt (layered tap, paste & verifyText fallbacks)',
        href: 'https://github.com/nikhilanand0105/jarvis-final/blob/main/app/src/main/java/com/jarvispoc/service/ActionExecutor.kt',
      },
      {
        label: 'jarvis-final repository on GitHub',
        href: 'https://github.com/nikhilanand0105/jarvis-final',
      },
    ],
  },
  commusync: {
    route: '/work/commusync',
    title: 'CommuSync — Cutting job-search p95 latency from 310 ms to 180 ms',
    metaTitle: 'CommuSync Case Study — Nikhil Anand',
    metaDescription:
      'Production full-stack internship at CommuSync: 15+ Job Management REST APIs and cutting p95 latency 42% (310 ms to 180 ms) on 7 PostgreSQL endpoints.',
    lead: 'Job-search latency fell from 310 ms to 180 ms.',
    roles: [
      'Role: Full-Stack Developer Intern (Apr – Jul 2026)',
      'Team context: 6-person cross-functional team',
      'Platform scale: 2,000+ recruiters & candidates',
      'Stack: Node.js, Express.js, PostgreSQL, Next.js',
    ],
    difficulty: [
      'On a live AI recruitment platform serving 2,000+ recruiters and candidates, Job Management filters and job-search endpoints hit slow database execution paths as listing and applicant rows grew. Looking only at average latency hid the tail stalls users experienced during multi-filter queries.',
      'Shipping new Job Management capabilities inside an 8-week internship meant every schema, query, and API change had to pass peer review and release cleanly without breaking active recruiter workflows.',
    ],
    whatIChanged: [
      'Owned backend and full-stack delivery across Job Management workflows: designed and shipped 15+ REST APIs and delivered 8+ production features end-to-end (API contracts, implementation, tests, code review, and deployment).',
      'Profiled the 7 slowest production search endpoints at p95, rewrote their PostgreSQL queries to remove redundant scans, and added targeted indexes along hot job-search filter paths—dropping p95 latency 42% from 310 ms to 180 ms.',
      'Merged 40+ pull requests in sprint cycles, debugged live production issues, and verified release readiness across 3+ production releases with 0 rollbacks.',
    ],
    evidenceNotes:
      'The CommuSync application repository is proprietary; public evidence for every figure above is my formal résumé.',
  },
  sshManager: {
    route: '/work/ssh-manager',
    title: 'SSH Manager — Provisioning multi-server SSH access in 30 seconds',
    metaTitle: 'SSH Manager Case Study — Nikhil Anand',
    metaDescription:
      'Centralized SSH key management with Flask RBAC, envelope encryption, and Ansible TrustedUserCAKeys playbooks cutting provisioning from ~20 min to ~30 s.',
    lead: 'Access provisioning dropped from ~20 minutes of manual server work to ~30 seconds.',
    roles: [
      'Timeline: Jun 2025',
      'Scale: 5+ servers, 25 users',
      'Shared stack: Flask REST API, RBAC, Ansible, SSH CA',
      'Code inspection: PostgreSQL / Celery in public repo',
    ],
    difficulty: [
      'Adding or revoking SSH access by hand across 5+ servers means logging into each host, editing authorized_keys files, verifying file permissions, and tracking who holds access to which machine—roughly 20 minutes per provisioning cycle and easy to misconfigure.',
      'Centralizing access introduces a harder security problem: storing plaintext SSH private keys in a database turns the control plane into a single target, while running remote Ansible playbooks synchronously would block HTTP API requests.',
    ],
    whatIChanged: [
      'Built a Flask REST backend enforcing PBKDF2 authentication, session tokens, and admin Role-Based Access Control (RBAC) before dispatching provisioning jobs.',
      'Protected private key material using envelope encryption: a user password derives a Key Encryption Key (KEK) via PBKDF2 to unwrap a Data Encryption Key (DEK), which encrypts SSH private keys with AES-CBC (stored alongside RSA payload encryption helpers).',
      'Automated fleet configuration with Ansible playbooks (grant.yml / revoke.yml) that copy the CA public key and update TrustedUserCAKeys in /etc/ssh/sshd_config before reloading sshd—bringing automated provisioning down to ~30 seconds.',
    ],
    discrepancyNote:
      'Architecture note across sources: Project notes and résumé describe an AWS EC2 + DynamoDB setup, whereas the public GitHub repository implements PostgreSQL (via SQLAlchemy) with Celery + RabbitMQ workers (documenting DynamoDB as an earlier design with commented remnants and noting that AclController / KeyCreationController handlers await blueprint registration in config/routes.py). Both share the core Flask + RBAC + envelope-encrypted store + Ansible provisioning flow.',
    evidenceLinks: [
      {
        label: 'SSH-Manager repository on GitHub',
        href: 'https://github.com/nikhilanand0105/SSH-Manager',
      },
      {
        label: 'grant.yml & revoke.yml Ansible playbooks',
        href: 'https://github.com/nikhilanand0105/SSH-Manager/tree/main/ansible/playbooks',
      },
      {
        label: 'AclController & envelope encryption implementation',
        href: 'https://github.com/nikhilanand0105/SSH-Manager/blob/main/ssh_manager_backend/app/controllers/acl.py',
      },
    ],
  },
};

export const DRDO_EXPERIENCE = {
  organization: 'DRDO — Centre for Air Borne Systems (CABS)',
  subtitle: 'India’s national lab for airborne surveillance systems (AEW&C)',
  role: 'AI Research Intern',
  year: '2026',
  selection: 'Selected as 1 of 14 interns; paired with research staff to ramp up on radar sensing.',
  headlineMetric: {
    before: 52,
    after: 32,
    unit: 'min / epoch',
    reduction: '38%',
    datasetScale: '12,000+ raw SAR and electro-optical scenes (40 GB)',
    modelCount: '9 CNN and Vision Transformer configurations',
    recallBefore: '71%',
    recallAfter: '86%',
    falsePositiveDrop: '34%',
  },
  bullets: [
    'Built Python preprocessing, annotation, and augmentation pipelines converting 12,000+ raw SAR and electro-optical scenes (40 GB) into reproducible datasets reused across team experiments.',
    'Profiled and rewrote the input and preprocessing pipeline to remove GPU-starvation bottlenecks, cutting training epoch time 38% from 52 min to 32 min.',
    'Trained and benchmarked 9 CNN and Vision Transformer architectures in PyTorch, raising ship-wake detection recall from 71% to 86% while cutting false positives 34%.',
  ],
};

export const MORE_WORK = [
  {
    id: 'code-runner',
    title: 'Code Runner as a Service',
    url: 'https://github.com/nikhilanand0105/Code-Runner-as-a-Service',
    repoLabel: 'Go 1.22 Sandbox API (main branch)',
    description:
      'Public main branch implements a concurrent Go HTTP execution API (POST /api/v1/execute, GET /health) running Python, Node.js, Go, C++, and Bash in isolated temporary workspaces with context.WithTimeout guards and Docker packaging.',
    note:
      'Separate from the Go repo: earlier project notes and résumé benchmark a Flask, RabbitMQ, and Celery architecture (256 MB / 5 s Docker caps, ~50 concurrent jobs, ~200 submissions/min, 35 unit tests).',
    tags: ['Go 1.22', 'HTTP Sandbox', 'Docker', 'context.WithTimeout'],
  },
  {
    id: 'quantlens',
    title: 'QuantLens-XAI',
    url: 'https://github.com/nikhilanand0105/QuantLensAi',
    repoLabel: 'Closed-loop XAI & paper-trading simulation',
    description:
      'Reverts SHAP, LIME, and 1D Temporal Grad-CAM attributions back into XGBoost, PyTorch MLP, and Conv1D inference graphs across 1,687 daily RELIANCE.NS bars—verifying a 5.93x confidence drop on top-3 feature perturbation and raising out-of-sample Macro F1 by +17.7% (0.2897 → 0.3410).',
    note:
      'Includes a zero-capital paper trading simulation (virtual cash ledger only; no live broker routing or real-money risk).',
    tags: ['PyTorch MPS', 'XGBoost', 'SHAP / LIME', 'Paper Simulation'],
  },
  {
    id: 'lovable',
    title: 'Lovable — AI Coding SaaS',
    url: 'https://github.com/nikhilanand0105/Lovable-AI-Coding-SaaS',
    repoLabel: 'Java 21 & Spring Boot microservices',
    description:
      'Service-oriented Spring Boot 3 backend (API Gateway, Account, Workspace, Intelligence, Eureka, Config) using Spring AI agentic tool calling, WebFlux SSE streaming, Kafka async file writes, and GKE Kubernetes manifests.',
    note:
      'Public codebase uses agentic tool calling (CodeGenerationTools) while provisioning pgvector manifests for future hybrid RAG; external benchmark notes cite 10,000+ indexed docs at ~120 ms p95.',
    tags: ['Java 21', 'Spring Boot 3', 'Spring AI', 'Kafka', 'Kubernetes'],
  },
];

export const JOURNEY = {
  heading: 'From Patna to VIT Chennai, production backends, and live demos',
  bioIntro:
    'I started programming in school in Patna, where I founded my school’s computer science club before entering B.Tech Computer Science at VIT Chennai in 2024.',
  bioMiddle:
    'In college I moved from coursework into shipping production APIs at CommuSync, profiling 40 GB radar imagery pipelines at DRDO–CABS, and leading the Trekking Club at VIT Chennai—which keeps the same habit of clear route planning and staying calm when terrain shifts.',
  bioEnd:
    'Building with a tight engineering team and demoing live hardware on stage taught me to optimize for what holds up outside a local notebook.',
  portrait: {
    webp: '/media/portrait-432.webp',
    jpg: '/media/portrait-432.jpg',
    width: 432,
    height: 432,
    alt: 'Portrait of Nikhil Anand in a navy suit and tie',
  },
  secondaryPhotos: [
    {
      id: 'grand-finale-table',
      webp: '/media/finale-table-1120.webp',
      jpg: '/media/finale-table-1120.jpg',
      srcSetWebp: '/media/finale-table-640.webp 640w, /media/finale-table-1120.webp 1120w',
      srcSetJpg: '/media/finale-table-640.jpg 640w, /media/finale-table-1120.jpg 1120w',
      width: 1120,
      height: 715,
      alt: 'Nikhil Anand wearing an iQOO Hackathon Grand Finale lanyard at a table with three teammates and laptops',
      caption:
        'At the iQOO Hackathon Grand Finale table — iterating with teammates across three laptops during the final round.',
    },
    {
      id: 'bengaluru-stage-wide',
      webp: '/media/stage-wide-1120.webp',
      jpg: '/media/stage-wide-1120.jpg',
      srcSetWebp: '/media/stage-wide-640.webp 640w, /media/stage-wide-1120.webp 1120w',
      srcSetJpg: '/media/stage-wide-640.jpg 640w, /media/stage-wide-1120.jpg 1120w',
      width: 1120,
      height: 621,
      alt: 'Wide view of the Bengaluru stage where Nikhil Anand presents JARVIS POC between iQOO Hackathon 2025 banners',
      caption:
        'Namma Bengaluru stage (29–30 August) — presenting the JARVIS POC live between the iQOO Hackathon 2025 banners.',
    },
  ],
};

export const ACHIEVEMENTS = [
  {
    title: '1st Prize — iQOO Connect TechQuest, Bengaluru',
    detail:
      'Team took 1st place among 16 teams (48 participants) in Bengaluru, selected from 190+ Bengaluru Questers; 1 of 2 winning teams in iQOO × Reskilll’s 4-city AI + Android competition.',
    linkLabel: 'iQOO TechQuest Certificate',
    linkUrl: 'https://drive.google.com/file/d/1wnsHf-wX7xBEw_A5EFTrPMMO_0dfgrQK/view?usp=sharing',
    linkType: 'Certificate',
  },
  {
    title: '4th Position & Grand Finale Qualifier — iQOO Reskill Hackathon, Bengaluru',
    detail:
      'Placed 4th in the Bengaluru City Battle of the 30-hour national hackathon series spanning 4 Indian cities (30,000 registrations, 10,000+ submissions, 1,000+ builders) and qualified for the Grand Finale.',
    linkLabel: 'iQOO × Reskilll (Event link)',
    linkUrl: 'https://iqoo.reskilll.com/',
    linkType: 'Event link',
  },
  {
    title: 'AIR 14 — GeeksforGeeks Bi-Wizard Coding Contest',
    detail:
      'Individual All India Rank 14 among 32,000+ participants (top 0.05%).',
    linkLabel: 'GeeksforGeeks Certificate',
    linkUrl: 'https://drive.google.com/file/d/1cXqdPO7M17bzBLYl6rdTi3gQJv1m5Pn1/view?usp=sharing',
    linkType: 'Certificate',
  },
  {
    title: 'Additional competitive programming & hackathons',
    detail:
      'World Rank 150 in Google Kick Start · Winner at ShellHacks 2024 Hackathon · AIR 2 at PlayWithCode 2.0 · 2nd Place at National-level CodeChef Contest · 400+ DSA problems solved.',
    linkLabel: 'ShellHacks (Event link)',
    linkUrl: 'https://shellhacks.net/',
    linkType: 'Event link',
  },
];
