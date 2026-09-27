# Els nostres cims

Obriu `https://lgalbany.github.io/cims.html`. La pàgina funciona sense iniciar sessió amb ChatGPT ni GitHub.

## Fitxers

- `cims.html` és la pàgina independent a l’arrel del repositori.
- `cims/app.js` i `cims/style.css` contenen la interfície.
- `cims/data/` conté les dades públiques dels 522 cims FEEC i el complement de la Viquipèdia, amb procedència.
- `cims/leaflet/` conté la biblioteca local del mapa i la seva llicència.
- `cims/storage.js` connecta amb el registre compartit; `cims/config.js` indica l’URL pública del servei.

No cal compilar ni instal·lar res per publicar aquests fitxers a GitHub Pages. Per provar-los localment, serviu la carpeta per HTTP, per exemple amb `python3 -m http.server 8080`, i obriu `/cims.html`. La configuració connecta amb el mateix registre compartit també des de localhost.

## Com es desa el progrés

GitHub Pages només serveix fitxers estàtics. Les marques i dates es desen en una base de dades compartida Cloudflare D1, gestionada per Sites, mitjançant el servei definit a `config.js`. El navegador recupera les dades en obrir la pàgina, quan torna a estar activa i cada 15 segons mentre és visible. Un canvi confirmat es conserva per a tots els dispositius. No es desa el progrés a localStorage ni es modifica el repositori cada vegada que marqueu un cim.

El registre és públic: qualsevol visitant pot consultar i editar les marques i dates, sense clau ni inici de sessió amb ChatGPT o GitHub.

Si falla un desament, es conserva el canvi pendent a la pantalla i es pot reintentar. Si un altre dispositiu ha modificat el mateix cim mentrestant, es mostra la nova versió i es demana revisar el canvi per evitar sobreescriure’l silenciosament.

Els cims fets es mostren en blau. Els essencials pendents són verds i els no essencials pendents són vermells. Desmarcar un cim conserva la data anterior però la desactiva. El quadern no valida ascensions a la FEEC.

Les dades FEEC i Viquipèdia són una captura del 26/09/2026. Google Maps apunta al cim, no a un aparcament verificat. Wikiloc usa el cercador del mapa amb el nom del cim.


Quan un cim està fet, podeu afegir la vostra ruta de Wikiloc. Si hi ha un enllaç vàlid, el botó Wikiloc obre aquesta ruta; si el camp és buit o el cim està pendent, obre el cercador. Desmarcar el cim conserva la data i l’enllaç per recuperar-los en tornar-lo a marcar. La data també apareix en passar el ratolí sobre el punt blau.
