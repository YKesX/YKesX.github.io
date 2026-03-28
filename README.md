# Yağızhan Keskin — Personal Website

Minimalist editorial portfolio built with pure HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure and content |
| `styles.css` | Design system and layout |
| `script.js` | Theme toggle, nav, scroll reveal |

## Quick start

Open `index.html` in any browser. That's it.

For local development with live reload, use any static server:

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .
```

## Editing content

All copy is in `index.html`. Each section is clearly marked with HTML comments like `<!-- ═══ About ═══ -->`.

**To update text**, edit the HTML directly. No build step required.

**To update links**, search for `href=` in `index.html` and replace URLs.

## Theme

The site supports dark and light modes with a toggle in the navigation. User preference is saved in `localStorage`. On first visit, the site respects the system preference (`prefers-color-scheme`).

### Customizing colors

All design tokens are at the top of `styles.css` under `:root` (light) and `[data-theme="dark"]` (dark). Change the `--color-*` variables to adjust the palette.

The accent color defaults to a muted sage green (`#4f6d5e` / `#7fa893`). To change it, update `--color-accent`, `--color-accent-hover`, and `--color-accent-subtle` in both themes.

## Deployment

This is a static site. Deploy to:
- **GitHub Pages**: push to `main` branch and enable Pages in repo settings
- **Netlify / Vercel**: connect repository, no build command needed
- **Any web server**: upload the three files

## Favicon

Replace the commented-out favicon link in `index.html` with your own:

```html
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
```

## Open Graph image

For social sharing previews, create an `og-image.png` (1200×630px recommended) and uncomment the OG image meta tag in `index.html`.

## Browser support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Gracefully degrades for older browsers via progressive enhancement.
