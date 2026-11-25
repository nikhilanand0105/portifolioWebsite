# Nikhil Anand — Software Engineering Portfolio

Personal engineering portfolio built with React and Vite, pre-rendered at build time for instant first paint across all routes (`/`, `/work/jarvis`, `/work/commusync`, `/work/ssh-manager`).

## Run Locally

```bash
npm install
npm run dev
```

## Production Build & Local Preview

```bash
npm run build
npm run preview
```

`npm run build` runs the Vite client bundle, builds the SSR entry, pre-renders static HTML for every route via `scripts/prerender.mjs` (including non-JavaScript fallbacks), and writes the output to `dist/`.

`npm run preview` serves `dist/` at `http://localhost:4173/`.

## Content Editing

All copy, links, captions, JARVIS replay fixtures, metrics, achievements, and repository metadata live in a single module:

- `src/data/portfolio.js`

Public static assets (responsive WebP/JPEG image crops, `favicon.svg`, `og-preview.jpg`, and `Nikhil_Anand_Resume.pdf`) reside in `public/`.

## Deployment

`dist/` is a pure static directory with pre-rendered `index.html` entry points for every route and can be deployed directly to Cloudflare Pages, Vercel, Netlify, or GitHub Pages:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

## Design & Code Reference Credit

Transition primitives (`src/components/Transition.jsx`), notched divider styling (`src/components/Divider.jsx`), alternating project summary composition (`src/components/ProjectSummary.jsx`), and case-study hierarchy (`src/components/ProjectCaseLayout.jsx`) were adapted under the MIT License from [HamishMW/portfolio](https://github.com/HamishMW/portfolio) at revision `b7444bc16216f38c64f4afb8d2f53b8c4cbb2bda`. See [LICENSE](LICENSE).
