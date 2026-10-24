# Aesthetics Planet

Sample one-page site for a doctor-led London aesthetic practice in Marylebone and Chelsea.

This is not a real clinic, not medical advice, and not an offer to treat. Telephone numbers use Ofcom’s 020 7946 drama range. Clinicians are fictional.

```bash
npm install
npm run dev
```

## Cloudflare Pages

- Build command: `npm run build:cf`
- Output directory: `dist`

That command uses the Nitro `cloudflare_pages` preset and writes a Pages worker plus static assets into `dist`. `npm run build` remains the Vercel build.

Photographs are committed as base64 sidecars (`*.b64`). `scripts/materialize-images.mjs` restores the image files before the build.
