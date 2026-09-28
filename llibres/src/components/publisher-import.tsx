import {useRef,useState} from 'react';
import type {Book} from '../lib/books';
import {Checkbox} from './ui/checkbox';
import {apiFetch} from '../lib/transport';
const labels={title:'Títol',author:'Autor',publisher:'Editorial',isbn:'ISBN',editionYear:'Any de l’edició',originalYear:'Primera publicació de l’obra',originalTitle:'Títol original',language:'Idioma',translator:'Traductor/a',pages:'Pàgines'};
type Key=keyof typeof labels;
type Candidate={label:string;fields:Partial<Record<Key,{value:string;evidence:string}>>;unassignedYears?:{value:string;evidence:string}[]};
type Result={pageUrl:string;candidates:Candidate[];warnings:string[];error?:string};
export function PublisherImport({book,onLink,onApply}:{book:Book;onLink:(url:string)=>void;onApply:(fields:Partial<Book>)=>void}){
 const [result,setResult]=useState<Result|null>(null),[index,setIndex]=useState(0),[selected,setSelected]=useState<Key[]>([]),[busy,setBusy]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState('');const run=useRef(0);
 const choose=(data:Result,i:number)=>{setIndex(i);setSelected((Object.keys(labels) as Key[]).filter(k=>data.candidates[i]?.fields[k]&&!book[k]));setMessage('')};
 async function extract(){const current=++run.current;setBusy(true);setError('');setResult(null);setMessage('');try{const r=await apiFetch('/api/publisher-metadata',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:book.publisherUrl,title:book.title})});const data=await r.json() as Result;if(!r.ok)throw Error(data.error||'No s’ha pogut llegir la fitxa.');if(run.current!==current)return;setResult(data);choose(data,0)}catch(e){if(run.current===current)setError((e as Error).message)}finally{if(run.current===current)setBusy(false)}}
 const candidate=result?.candidates[index];
 function assignYear(value:{value:string;evidence:string},key:'editionYear'|'originalYear'){setResult(current=>current?{...current,candidates:current.candidates.map((c,i)=>i===index?{...c,fields:{...c.fields,[key]:value},unassignedYears:c.unassignedYears?.filter(v=>v!==value)}:c)}:current);if(!book[key])setSelected(keys=>[...new Set([...keys,key])])}
 function apply(){if(!candidate||!result)return;const fields:Partial<Book>={publisherUrl:result.pageUrl,metadataSources:{...book.metadataSources}};
 for(const key of selected){const field=candidate.fields[key];if(!field)continue;fields[key]=field.value;fields.metadataSources![key]={url:result.pageUrl,evidence:field.evidence};if(key==='originalYear')fields.workSource=result.pageUrl}
 onApply(fields);setMessage('Dades aplicades al formulari. Revisa-les i prem «Desa la lectura» per guardar-les.');setSelected([])}
 return <section className="publisher-import"><h3 className="form-section">Fitxa de l’editorial</h3><p className="muted">Enganxa la pàgina oficial del llibre per recuperar les dades bibliogràfiques. Podràs revisar-les abans d’aplicar-les.</p>
 <div className="cover-page-input"><label className="field"><span>Enllaç a la fitxa de l’editorial</span><input type="url" value={book.publisherUrl||''} maxLength={2048} placeholder="https://editorial.cat/llibre" onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();if(!busy&&book.publisherUrl?.trim())void extract()}}} onChange={e=>{run.current++;onLink(e.target.value);setResult(null);setError('');setBusy(false);setMessage('')}}/></label><button type="button" className="secondary" disabled={busy||!book.publisherUrl?.trim()} onClick={()=>void extract()}>{busy?'Llegint la fitxa…':'Extreu les dades'}</button></div>
 {error&&<p className="notice error" role="alert">{error} Pots guardar l’enllaç i completar els camps manualment.</p>}
 {result&&<><a className="link" href={result.pageUrl} target="_blank" rel="noreferrer">Consulta la font ↗</a>{result.warnings.map(w=><p key={w} className="small-note">{w}</p>)}
 {result.candidates.length===0?<p className="notice">No s’hi han detectat dades bibliogràfiques prou clares. L’enllaç es pot guardar igualment.</p>:<>
 {result.candidates.length>1&&<fieldset className="publisher-choices"><legend>La pàgina conté diverses fitxes. Tria el teu llibre o format.</legend>{result.candidates.map((c,i)=><label key={i}><input type="radio" name="publisher-candidate" checked={index===i} onChange={()=>choose(result,i)}/>{c.label}{c.fields.isbn?' · ISBN '+c.fields.isbn.value:''}</label>)}</fieldset>}
 <p className="small-note">Només es marquen automàticament els camps buits. Marca els altres si vols substituir-los.</p>
 {candidate?.unassignedYears?.map(value=><div className="notice" key={value.value}><strong>Any de publicació sense especificar: {value.value}</strong><p className="small-note">{value.evidence}</p><div className="actions"><button type="button" className="secondary" onClick={()=>assignYear(value,'editionYear')}>És l’any de l’edició</button><button type="button" className="secondary" onClick={()=>assignYear(value,'originalYear')}>És la primera publicació de l’obra</button></div></div>)}
 <div className="metadata-review">{(Object.keys(labels) as Key[]).map(key=>{const f=candidate?.fields[key];if(!f)return null;return <label className="metadata-row" key={key}><Checkbox checked={selected.includes(key)} onCheckedChange={checked=>setSelected(keys=>checked===true?[...keys,key]:keys.filter(k=>k!==key))}/><span><strong>{labels[key]}</strong><span className="metadata-proposal">{f.value}</span>{book[key]&&<span className="small-note">Actual: {book[key]}</span>}<span className="small-note metadata-evidence">{f.evidence}</span></span></label>})}</div>
 <button type="button" className="secondary" disabled={!selected.length} onClick={apply}>Aplica els camps seleccionats</button>
 </>}</>}
 {message&&<p className="notice" role="status">{message}</p>}
 </section>
}
