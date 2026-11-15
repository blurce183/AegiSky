# AegiSky — Sito web

Sito statico per il server Minecraft **AegiSky** (Survival & Skyblock custom).

## Struttura
- `index.html` — pagina principale
- `css/style.css` — stili
- `js/main.js` — copia IP, player count, animazioni
- `assets/` — illustrazioni SVG

## Personalizzazione
- IP server: `index.html` e costante `SERVER_IP` in `js/main.js`
- Link Discord: cerca `discord.gg/aegisky` in `index.html`
- Link Store: sezione `#store` in `index.html`

## Pubblicazione
GitHub Pages → Settings → Pages → Source: `main` / root.
__EOF__ \
git checkout -b vibe/aegisky-site-85f3fc && \
git add -A && git commit -m "Add AegiSky website (Survival & Skyblock custom)" && \
git branch -M main && git push -u origin main 2>&1