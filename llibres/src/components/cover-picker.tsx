import {useRef,useState} from 'react';
import {apiFetch} from '../lib/transport';
type Candidate={url:string;label:string};
export function CoverPicker({value,onPick}:{value:string;onPick:(url:string,page:string)=>void}){
 const [page,setPage]=useState(''),[images,setImages]=useState<Candidate[]>([]),[source,setSource]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const run=useRef(0);
 async function search(){const id=++run.current;setBusy(true);setError('');setImages([]);try{
  const response=await apiFetch('/api/cover-images',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:page})});
  const data=await response.json() as {images:Candidate[];pageUrl:string;error?:string};if(!response.ok)throw Error(data.error||'No s’han pogut llegir les imatges.');
  if(id!==run.current)return;setImages(data.images);setSource(data.pageUrl);if(!data.images.length)setError('No hi hem trobat cap imatge. Prova una altra pàgina o enganxa l’enllaç directe a la imatge.');
 }catch(e){if(id===run.current)setError((e as Error).message)}finally{if(id===run.current)setBusy(false)}}
 return <section className="cover-picker" aria-label="Portada personalitzada"><h3 className="form-section">Portada</h3>
 <p className="muted">Enganxa la pàgina on es veu la portada i tria la imatge correcta.</p>
 <div className="cover-page-input"><label className="field"><span>Pàgina amb la portada</span><input type="url" value={page} maxLength={2048} placeholder="https://editorial.cat/llibre" onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();if(!busy&&page.trim())void search()}}} onChange={e=>{run.current++;setPage(e.target.value);setImages([]);setError('');setBusy(false)}}/></label><button type="button" className="secondary" onClick={()=>void search()} disabled={busy||!page.trim()}>{busy?'Cercant imatges…':'Cerca imatges'}</button></div>
 {error&&<p className="notice error" role="alert">{error}</p>}
 {images.length>0&&<div className="cover-options">{images.map((image,i)=><button type="button" className="cover-option" key={image.url} aria-pressed={value===image.url} onClick={()=>onPick(image.url,source)}><img src={image.url} alt={image.label||`Imatge ${i+1}`} loading="lazy" referrerPolicy="no-referrer" onError={e=>{e.currentTarget.style.display='none'}}/><span>{value===image.url?'Portada seleccionada':`Tria la imatge ${i+1}`}</span></button>)}</div>}
 <label className="field"><span>O enganxa l’enllaç directe a la imatge (HTTPS)</span><input type="url" value={value} maxLength={2048} onChange={e=>onPick(e.target.value,'')}/></label>
 {value&&<div className="cover-current"><img src={value} alt="Previsualització de la portada seleccionada" referrerPolicy="no-referrer"/><p className="small-note">Aquesta portada es guardarà quan premis «Desa la lectura». Canviar-la no confirma ni modifica l’edició.</p></div>}
 </section>
}
