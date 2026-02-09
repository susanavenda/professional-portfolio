# Professional Portfolio – Susana Venda

A one-page resume and portfolio built with **React** and **Vite**, hosted on **GitHub Pages**. Content is driven by JSON in `public/`.

**Live:** [GitHub Pages](https://susanavenda.github.io/professional-portfolio/)

## Run locally

```bash
npm install
npm run dev
```

Then open **http://localhost:5173/professional-portfolio/** (Vite uses base path `/professional-portfolio/` for GitHub Pages).

## Build

```bash
npm run build
```

Output is in `dist/`. Preview with `npm run preview` (open the URL it prints, e.g. http://localhost:4173/professional-portfolio/).

## Project structure

| Path | Purpose |
|------|---------|
| `src/App.jsx` | Main app; loads data and renders sections |
| `src/main.jsx` | React entry |
| `src/index.css` | Global styles (professional theme) |
| `src/components/` | Header, Hero, Experience, Education, Skills, Recommendations, Interests, Certifications, Footer |
| `src/hooks/useResumeData.js` | Fetches all JSON from `public/` |
| `public/` | Static assets: `profile.jpg`, `favicon.ico`, `labels.json`, `jobs.json`, `education.json`, `techskills.json`, `certifications.json`, `recommendations.json` |

## Updating content

Edit the JSON files in **`public/`** and rebuild (or push to `main`; the workflow will build and deploy).

- **Name, tagline, bio, nav:** `public/labels.json`
- **Experience:** `public/jobs.json`
- **Education:** `public/education.json`
- **Certifications:** `public/certifications.json`
- **Tech skills:** `public/techskills.json`
- **Recommendations:** `public/recommendations.json`

**Single source of truth:** All content lives in `public/`. The root-level copies (e.g. `labels.json`, `jobs.json`) are legacy; the deploy uses only `public/`. You can remove the root data files to avoid confusion.

## Deploy

One workflow: build the app and commit the built files into `docs/` on **main**. Pages serves from that folder.

1. **Settings → Pages → Build and deployment**: set **Source** to **Deploy from a branch**.
2. Set **Branch** to `main`, **Folder** to **/docs**, and save.
3. Push to `main`; the workflow builds `dist/`, copies it to `docs/`, and pushes that commit to main. The site updates from `main` → `/docs`.

The site is at `https://<username>.github.io/professional-portfolio/`. The first run creates the `docs/` folder on main.


## Tech

React 18, Vite 6, Bootstrap 5 (CSS), Font Awesome, Google Fonts. No jQuery; data is loaded with `fetch` in a custom hook.
