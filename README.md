# Aesthetics Planet

Sample one-page site for a doctor-led London aesthetic practice in Marylebone and Chelsea.

This is not a real clinic, not medical advice, and not an offer to treat. Telephone numbers use Ofcom’s 020 7946 drama range. Clinicians are fictional.

The treatment catalogue, npm lockfile, and photographs are stored as ordered text parts. Join them before install or build:

```bash
node scripts/assemble.mjs
npm ci
npm run dev
```

## Cloudflare Pages

- Install command: `node scripts/assemble.mjs && npm ci`
- Build command: `npm run build:cf`
- Output directory: `dist`

`build:cf` uses the Nitro `cloudflare_pages` preset and writes the Pages worker and static assets into `dist` (`_worker.js`, `_routes.json`). `npm run build` stays the Vercel build.

`scripts/assemble.mjs` joins the parts. `scripts/materialize-images.mjs` restores photographs from base64 sidecars.
