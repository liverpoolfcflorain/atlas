# Atlas Analytica Website

A lightweight editorial website prototype built around the Atlas Analytica visual identity.

## Structure

- `index.html` — homepage and article preview grid
- `article.html` — dedicated article/PDF reader
- `styles.css` — full responsive design
- `app.js` — homepage article data
- `article.js` — PDF.js sliding reader
- `assets/logo.png` — extracted Atlas Analytica logo
- `articles/*.pdf` — sample placeholder PDFs

## Adding a real article

1. Put the final PDF in `articles/`.
2. Add/update its entry in the `articles` array in both `app.js` and `article.js`.
3. Set the `slug` to the exact PDF filename without `.pdf`.
4. Replace the image URL with the article cover.

## Running locally

Because PDF.js uses module imports, serve the folder with a local server.

Python:
`python3 -m http.server 5500`

Then open:
`http://localhost:5500`

## Deployment

This can be deployed directly as a static site to Cloudflare Pages, Netlify, Vercel, GitHub Pages, or any normal web server.
