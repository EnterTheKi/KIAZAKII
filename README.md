# Kiazaki

A monochrome brand site for Kiazaki: ASCII owl, Dokkodo scroll, melting katana and 33:27.

## Live preview

https://site-cc95946c3ac5475c81f566f0b5937ed9.freebuff.page

- Sites project: `ba2e6357-9249-47d4-ac70-14fe98039128`
- Environment: `preview` (published)
- Worker: `worker.js` serves the static bundle via `env.ASSETS`
- Manifest: `sites.manifest.json`

## Source

- `index.html` — page structure and the embedded ASCII art
- `styles.css` — monochrome + ember visual system
- `main.js` — Dokkodo switcher, reveals, header state

The deployment bundle lives in `public/`. After editing the source, copy the three files into `public/`, then deploy the manifest to the preview environment again.

## Credit

The ASCII owl study is a rendering of a CC BY 2.0 photograph by James St. John. Credit and license links are in the footer.
