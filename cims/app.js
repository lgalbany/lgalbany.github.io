import { createStorage } from './storage.js';
const $ = (id) => document.getElementById(id);
const normalize = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const escape = (s) => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link = (url,label) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} ↗</a>`;
const maps = p => `https://www.google.com/maps/dir/?api=1&origin=Granollers%2C%20Barcelona&destination=${p.lat},${p.lon}`;
const validRoute = value => {try{const u=new URL(value);return u.protocol==='https:'&&(u.hostname==='wikiloc.com'||u.hostname.endsWith('.wikiloc.com'))&&!u.username&&!u.password&&value.length<=2048;}catch{return false;}};
const wikiloc = p => ascents[p.id]?.done && validRoute(ascents[p.id]?.routeUrl) ? ascents[p.id].routeUrl : `https://www.wikiloc.com/wikiloc/map.do?sw=-89.999%2C-179.999&ne=89.999%2C179.999&q=${encodeURIComponent(p.name)}`;
let peaks=[], wikipedia={}, ascents={}, storage, map, layer, selected=null, filtered=[], busy=false,unlocked=false;
const markers=new Map();
const defaultAscent=()=>({done:false,date:'',routeUrl:''});
function error(message){$('error').textContent=message;$('error').hidden=!message;}
function controls(p,where){const a=ascents[p.id]??defaultAscent();return `<div class="ascent-controls"><label class="done-label"><input type="checkbox" data-peak="${p.id}" data-action="done" aria-label="Marcar ${escape(p.name)} com a fet" ${a.done?'checked':''} ${busy||!unlocked?'disabled':''}><span>Fet</span></label><input type="date" data-peak="${p.id}" data-action="date" aria-label="Data d’ascensió de ${escape(p.name)}" value="${escape(a.date)}" ${!a.done||busy||!unlocked?'disabled':''}>${a.done?`<label class="route-field"><span>La nostra ruta de Wikiloc</span><input type="url" data-peak="${p.id}" data-action="routeUrl" aria-label="Ruta de Wikiloc de ${escape(p.name)}" placeholder="https://ca.wikiloc.com/…" value="${escape(a.routeUrl??'')}" maxlength="2048" ${busy||!unlocked?'disabled':''}></label>`:''}</div>`;}
function badge(p){return `<span class="badge ${p.essential?'essential':'other'}">${p.essential?'Essencial · 100 Cims':'No essencial'}</span>`;}
function renderProgress(){if(!unlocked){$('essential-count').textContent='—';$('progress-caption').textContent='Esperant la connexió amb el registre compartit.';$('progress').value=0;return;}const done=peaks.filter(p=>ascents[p.id]?.done),essential=done.filter(p=>p.essential).length;$('essential-count').textContent=essential;$('progress').value=Math.min(100,essential);$('goal-label').textContent=essential>=100?'Repte assolit!':'El nostre repte';$('progress-caption').textContent=`${done.length} cims fets en total · ${150-essential} essencials pendents`;}
function renderList(){
 const query=normalize($('query').value),cat=$('category').value,status=$('status').value;
 filtered=peaks.filter(p=>(cat==='all'||p.essential===(cat==='essential'))&&(status==='all'||!!ascents[p.id]?.done===(status==='done'))&&normalize(p.name+' '+p.region).includes(query)).sort((a,b)=>$('sort').value==='height'?b.height-a.height:a.name.localeCompare(b.name,'ca'));
 $('result-count').textContent=filtered.length;
 $('summits').innerHTML=filtered.length?filtered.map(p=>`<article class="summit ${ascents[p.id]?.done?'completed':''} ${selected===p.id?'selected':''}" data-id="${p.id}"><div class="summit-top"><div><button class="summit-name" type="button" data-select="${p.id}">${escape(p.name)}</button><p class="region">${escape(p.region)}</p></div><strong class="altitude">${p.height.toLocaleString('ca')} <span>m</span></strong></div><div class="summit-middle">${badge(p)}<div class="links">${link(maps(p),'Maps')}${link(wikiloc(p),'Wikiloc')}</div></div>${controls(p,'list')}</article>`).join(''):'<div class="empty"><h3>No hi ha cims amb aquests filtres</h3><button data-reset type="button">Mostra tots els cims</button></div>';
 renderMarkers();
}
function renderMarkers(){if(!layer)return;layer.clearLayers();markers.clear();for(const p of filtered){const done=!!ascents[p.id]?.done,m=L.circleMarker([p.lat,p.lon],{radius:done?9:8,color:'#fff',weight:2,fillColor:done?'#2563eb':p.essential?'#14804e':'#cb4944',fillOpacity:1}).addTo(layer);const tip=document.createElement('span');tip.textContent=`${p.name} · ${p.height} m${done?' · Fet'+(ascents[p.id].date?' · '+ascents[p.id].date.split('-').reverse().join('/'):''):''}`;m.bindTooltip(tip).on('click',()=>select(p.id));markers.set(p.id,m);}}
function renderDetail(){const p=peaks.find(p=>p.id===selected);if(!p){$('detail').innerHTML='<div class="map-hint"><p>Tria un punt del mapa o el nom d’un cim per veure’n el detall.</p></div>';return;}const w=wikipedia[p.id];$('detail').innerHTML=`<div class="map-detail"><div class="detail-title"><h3>${escape(p.name)}</h3><button type="button" data-close aria-label="Tanca el detall">×</button></div><p>${p.height.toLocaleString('ca')} m · ${escape(p.region)}</p>${badge(p)}${controls(p,'detail')}<div class="links">${link(maps(p),'Google Maps')}${link(wikiloc(p),'Wikiloc')}${link(p.url,'Fitxa FEEC')}</div>${w?`<section class="wiki-detail" aria-label="Informació complementària de la Viquipèdia"><h4>Més sobre aquest cim</h4><dl>${w.municipalities?`<dt>Municipis</dt><dd>${escape(w.municipalities)}</dd>`:''}${w.range?`<dt>Serra o massís</dt><dd>${escape(w.range)}</dd>`:''}</dl><div class="links">${w.url?link(w.url,'Viquipèdia'):''}${w.commons?link(w.commons,'Fotografies a Commons'):''}${w.wikidata?link('https://www.wikidata.org/wiki/'+w.wikidata,'Wikidata'):''}</div><p class="wiki-credit">Informació complementària de la Viquipèdia / Wikidata.</p></section>`:''}</div>`;}
function render(){renderProgress();renderList();renderDetail();}
function select(id){selected=id;renderList();renderDetail();const p=peaks.find(p=>p.id===id);if(p&&map){map.setView([p.lat,p.lon],Math.max(map.getZoom(),10));markers.get(id)?.openTooltip();}}
async function change(input){
 const id=input.dataset.peak,p=peaks.find(p=>p.id===id);if(!p||busy)return;
 const old=ascents[id]??defaultAscent(),value={...old};
 if(input.dataset.action==='done')value.done=input.checked;
 else if(old.done&&input.dataset.action==='date')value.date=input.value;
 else if(old.done&&input.dataset.action==='routeUrl'){
  value.routeUrl=input.value.trim();
  if(value.routeUrl&&!validRoute(value.routeUrl)){error('Introdueix un enllaç HTTPS de Wikiloc vàlid, o deixa el camp buit per fer servir la cerca.');input.setAttribute('aria-invalid','true');return;}
 }else return;
 busy=true;ascents={...ascents,[id]:value};render();error('');$('save-status').textContent='Desant…';
 try{ascents=await storage.save(id,value);$('save-status').textContent=storage.savedLabel;}
 catch(e){error(e.message);$('save-status').textContent='Canvi no desat';}
 finally{busy=false;render();const area=input.closest('.map-detail')?$('detail'):$('summits');area.querySelector(`[data-peak="${id}"][data-action="${input.dataset.action}"]`)?.focus({preventScroll:true});}
}
async function start(){
 try{
  const responses=await Promise.all([fetch('./cims/data/peaks.json'),fetch('./cims/data/wikipedia.json')]);
  if(responses.some(r=>!r.ok))throw Error('No s’han pogut carregar les dades dels cims. Torna a carregar la pàgina.');
  [peaks,wikipedia]=await Promise.all(responses.map(r=>r.json()));
  storage=await createStorage({peaks,onChange:next=>{ascents=next;render();},onError:error,tools:$('storage-tools')});
  try{ascents=await storage.load();unlocked=true;$('save-status').textContent=storage.savedLabel;}catch(e){$('save-status').textContent='Progrés no disponible';error('El registre compartit encara no està disponible. Pots consultar el mapa i el llistat; les marques i dates s’activaran quan es pugui connectar.');}
  document.addEventListener('cims-unlocked',()=>{unlocked=true;error('');render();});
  $('storage-caption').textContent=storage.caption;
  if(window.L){map=L.map('map',{scrollWheelZoom:false});L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);layer=L.layerGroup().addTo(map);map.fitBounds(peaks.map(p=>[p.lat,p.lon]),{padding:[20,20]});}else $('map').innerHTML='<p class="notice">No s’ha pogut carregar el mapa. Pots continuar amb el llistat.</p>';
  render();
  for(const id of ['query','category','status','sort'])$(id).addEventListener(id==='query'?'input':'change',renderList);
  $('fit-map').addEventListener('click',()=>map?.fitBounds((filtered.length?filtered:peaks).map(p=>[p.lat,p.lon]),{padding:[20,20]}));
  document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.select)select(b.dataset.select);if(b.hasAttribute('data-close')){selected=null;renderList();renderDetail();}if(b.hasAttribute('data-reset')){$('query').value='';$('category').value='all';$('status').value='all';renderList();}});
  document.addEventListener('change',e=>{if(e.target.matches('[data-peak][data-action]'))change(e.target);});
 }catch(e){error(e.message);$('save-status').textContent='No s’ha pogut carregar';$('summits').innerHTML='<p class="empty">No s’han pogut carregar els cims. Torna a carregar la pàgina.</p>';}
}
start();
