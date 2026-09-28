# Quadern de lectures · GitHub Pages

`../llibres.html` és la pàgina d’entrada. Aquesta carpeta conté els recursos necessaris per publicar-la, igual que `cims/`.

- `assets/app.js` i `assets/style.css`: interfície ja compilada; GitHub Pages els serveix directament.
- `favicon.svg`: icona.
- `src/`: codi editable de les vistes, formularis, cerca i connexió.
- `vendor/`: estils base dels components.
- `package.json` i `package-lock.json`: construcció reproduïble (`npm ci`, `npm run check`, `npm run build`). Node 22.13 o posterior.

No cal executar npm per publicar els fitxers ja compilats. Per modificar la interfície, cal tornar a construir i incloure els dos fitxers d’`assets/` al mateix canvi.

## Desament i sincronització

Com a `cims.html`, GitHub Pages mostra la interfície i un servei extern desa el registre a Cloudflare D1. L’API és `https://quadern-de-lectures.lluisgalbany.chatgpt.site`; la configuració és a `src/lib/transport.ts`. Els llibres, resums i ubicacions no formen part dels fitxers estàtics: es recuperen del registre en obrir la pàgina, en tornar-hi i cada 30 segons mentre és visible i no hi ha un formulari obert. Editar una lectura no modifica GitHub ni necessita una nova publicació.

La consulta és pública, incloent-hi els títols, resums, dates i llocs (confirmat pel propietari el 28/09/2026). L’edició continua reservada al compte del propietari. La pàgina mostra un missatge si el servei no és accessible.

L’edició sempre es comprova al servidor. «Entra per editar» inicia la sessió del propietari amb ChatGPT i torna a `llibres.html`. L’autorització dura fins a 12 hores, queda a sessionStorage de la pestanya i es revoca amb «Surt». No s’inclou cap credencial permanent al repositori. Els canvis concurrents es rebutgen perquè no s’esborri el text d’un altre dispositiu.

Les portades són suggeriments fins que l’usuari confirma l’edició. ISBN, primera publicació i any de l’edició són camps diferents; les dades desconegudes queden pendents. L’Excel original no es modifica.

## Servei de dades

El codi del servei es manté al projecte Sites existent, a `../../llibres/` (fora del repositori públic), amb l’esquema, les migracions i la importació original. Conserva la mateixa base de dades i també la vista existent de Sites. Les actualitzacions del servidor es publiquen amb Sites; pujar els fitxers de GitHub Pages no desplega el servidor.

## Prova local

Des de l’arrel del repositori: `python3 -m http.server 8088 --bind 127.0.0.1` i obrir `http://127.0.0.1:8088/llibres.html`.

Per provar contra el servidor de desenvolupament (port 5173), afegir `?api=local` a l’URL. Aquesta opció només funciona a localhost. La identitat simulada només existeix al servidor local. En producció, el servidor només accepta el retorn a `https://lgalbany.github.io/llibres.html`.
