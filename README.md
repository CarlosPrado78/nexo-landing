# Nexo — Landing de lista de espera

Landing page para **Nexo**, herramienta de consolidación de patrimonio para México
(GBM, Bitso, CETES, Afore, brokers en EE. UU.).

## Cómo abrirla

No necesita servidor ni build. Doble clic en `index.html`, o:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## ⚙️ Configuración (único paso pendiente)

En `script.js`, línea 13, cambia el correo:

```js
RECEPTOR: "cprado123.cp@gmail.com",   // ← correo configurado
```

Los registros llegan vía **FormSubmit** (gratis, sin cuenta ni tarjeta).

**Importante:** la primera vez que alguien se registre, FormSubmit enviará un
correo de confirmación a `cprado123.cp@gmail.com`. Haz clic en el enlace **una
sola vez** y a partir de ahí todos los registros llegan solos.

## Publicarla (gratis)

Opción A — **GitHub Pages** (recomendada, ya tienes GitHub):

```bash
# dentro de esta carpeta
git init -b main
git add .
git commit -m "Landing Nexo"
gh repo create nexo-landing --public --source=. --push
gh api repos/{owner}/nexo-landing/pages -X POST -f source[branch]=main -f source[path]=/
```

La URL queda en `https://CarlosPrado78.github.io/nexo-landing/`.

Opción B — Netlify / Cloudflare Pages: arrastrar la carpeta. También gratis.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | Página completa (hero, problema, cómo funciona, producto, precios, FAQ) |
| `styles.css` | Estilos, responsive y mockup del dashboard |
| `script.js` | Formulario de lista de espera + aviso de privacidad |

## Contenido legal

El aviso de privacidad mostrado es una versión inicial. Antes de captar registros
en producción, redacta el documento completo conforme a la **LFPDPPP**.
