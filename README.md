# garden.jtwebman.com

A personal static site for my low-maintenance edible-yard project in Beaverton, OR.
The whole page is generated from [`plan.md`](./plan.md) — edit that file, rebuild, deploy.

## How it works

- `plan.md` — the content (single source of truth).
- `src/template.html` + `src/styles.css` — the page shell and styling.
- `build.mjs` — renders `plan.md` (via [`marked`](https://marked.js.org)) into `public/index.html`.

## Develop

```bash
npm install
npm run build        # writes public/index.html
npm run preview      # build + serve locally at http://localhost:3000
```

Edit `plan.md` (or the template/styles), then `npm run build` again.

## Deploy to Cloudflare Pages (garden.jtwebman.com)

**Option A — deploy from your machine (quickest):**

```bash
npx wrangler login            # one-time browser auth
npm run deploy                # builds, then: wrangler pages deploy public --project-name=garden
```

Then in the Cloudflare dashboard → Pages → the `garden` project → **Custom domains** → add
`garden.jtwebman.com`. (Requires `jtwebman.com` to be on Cloudflare DNS; Cloudflare adds the CNAME for you.)

**Option B — Git integration (auto-deploy on push):**

1. Push this repo to GitHub.
2. Cloudflare dashboard → Pages → **Connect to Git** → pick the repo.
3. Build command: `npm run build` · Output directory: `public`.
4. Add the custom domain `garden.jtwebman.com` under the project.

## Notes

- `public/` is a build artifact (git-ignored) — CI or `npm run build` regenerates it.
- Markdown tables render inside horizontally-scrollable boxes; blockquotes render as callouts.

## Copyright

© 2026 JT Turner. All rights reserved.
