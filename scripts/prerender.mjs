import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const assetsDir = path.join(distDir, 'assets');
const assetFiles = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];
const criticalFonts = assetFiles.filter(
  f =>
    f.endsWith('.woff2') &&
    (f.startsWith('barlow-condensed-latin-700') ||
      f.startsWith('instrument-sans-latin-400') ||
      f.startsWith('instrument-sans-latin-600') ||
      f.startsWith('instrument-sans-latin-700'))
);
const fontPreloadTags = criticalFonts
  .map(
    f =>
      `    <link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${f}" />`
  )
  .join('\n');

const homeHeroPreload = [
  '    <link rel="preload" as="image" type="image/webp" imagesrcset="/media/table-mobile-480.webp 480w, /media/table-mobile-780.webp 780w" imagesizes="(max-width: 767px) 92vw, 480px" media="(max-width: 767px)" fetchpriority="high" />',
  '    <link rel="preload" as="image" type="image/webp" imagesrcset="/media/table-desktop-800.webp 800w, /media/table-desktop-1280.webp 1280w, /media/table-desktop-1600.webp 1600w" imagesizes="(max-width: 1024px) 92vw, 660px" media="(min-width: 768px)" fetchpriority="high" />',
].join('\n');

const serverEntryUrl = pathToFileURL(path.join(rootDir, 'dist-ssr', 'entry-server.js')).href;
const { render } = await import(serverEntryUrl);

const ROUTES = [
  {
    url: '/',
    outFile: path.join(distDir, 'index.html'),
    title: 'Nikhil Anand — Software Engineer · Backend Systems & On-Device AI',
    description:
      'Portfolio of Nikhil Anand, B.Tech Computer Science student at VIT Chennai (2028). Backend performance engineering, applied radar ML at DRDO–CABS, and on-device Android AI.',
  },
  {
    url: '/work/jarvis',
    outFile: path.join(distDir, 'work', 'jarvis', 'index.html'),
    title: 'JARVIS Case Study — Nikhil Anand',
    description:
      'How JARVIS pairs on-device Gemma 3n E2B INT4 image captioning with deterministic Kotlin AccessibilityService verification in InstagramPostFlow.kt.',
  },
  {
    url: '/work/commusync',
    outFile: path.join(distDir, 'work', 'commusync', 'index.html'),
    title: 'CommuSync Case Study — Nikhil Anand',
    description:
      'Production full-stack internship at CommuSync: 15+ Job Management REST APIs and cutting p95 latency 42% (310 ms to 180 ms) on 7 PostgreSQL endpoints.',
  },
  {
    url: '/work/ssh-manager',
    outFile: path.join(distDir, 'work', 'ssh-manager', 'index.html'),
    title: 'SSH Manager Case Study — Nikhil Anand',
    description:
      'Centralized SSH key management with Flask RBAC, envelope encryption, and Ansible TrustedUserCAKeys playbooks cutting provisioning from ~20 min to ~30 s.',
  },
];

function escapeAttr(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}

for (const route of ROUTES) {
  const appHtml = render(route.url);
  let html = template.replace(
    '<div id="root"><!--app-html--></div>',
    `<div id="root" data-ssr-route="${escapeAttr(route.url)}">${appHtml}</div>`
  );
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeAttr(route.title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeAttr(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`
  );
  const preloads = route.url === '/' ? `${fontPreloadTags}\n${homeHeroPreload}` : fontPreloadTags;
  html = html.replace('</head>', `${preloads}\n  </head>`);

  fs.mkdirSync(path.dirname(route.outFile), { recursive: true });
  fs.writeFileSync(route.outFile, html, 'utf-8');
  console.log(`Prerendered ${route.url} -> ${path.relative(rootDir, route.outFile)}`);

  if (route.url !== '/') {
    const flatFile = path.join(distDir, `${route.url.replace(/^\/+/, '')}.html`);
    fs.mkdirSync(path.dirname(flatFile), { recursive: true });
    fs.writeFileSync(flatFile, html, 'utf-8');
  }
}
