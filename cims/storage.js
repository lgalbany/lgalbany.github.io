import {SHARED_API} from './config.js';
export async function createStorage({onChange,onError,tools}){
 let current={}, writing=false,pending=null,refreshing=false;
 const note=document.createElement('p');note.textContent='Un únic registre compartit amb tota la família. Els canvis es desen automàticament.';tools.append(note);
 const retry=document.createElement('button');retry.type='button';retry.textContent='Torna a desar el canvi pendent';retry.hidden=true;tools.append(retry);
 const refreshButton=document.createElement('button');refreshButton.type='button';refreshButton.textContent='Actualitza';tools.append(refreshButton);
 function status(text){document.getElementById('save-status').textContent=text;}
 async function read(){const response=await fetch(SHARED_API,{cache:'no-store',credentials:'omit'});if(!response.ok)throw Error('No s’ha pogut carregar el registre compartit. Torna-ho a provar.');const data=await response.json();if(!data.ascents||typeof data.ascents!=='object')throw Error('El servei de desament ha retornat una resposta no vàlida.');current=data.ascents;return current;}
 async function save(id,value){
  pending={id,value};retry.hidden=true;
  writing=true;
  try{
   const response=await fetch(SHARED_API,{method:'PUT',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,done:value.done,date:value.date,version:current[id]?.version??0})});
   const data=await response.json();
   if(response.status===409){current=data.ascents;const stored=current[id];if(stored?.done===value.done&&stored?.date===value.date){pending=null;return current;}pending=null;onChange(current);throw Error(data.error);}
   if(!response.ok)throw Error(data.error||'No s’ha pogut desar. Torna-ho a provar.');
   current=data.ascents;pending=null;return current;
  }catch(e){retry.hidden=!pending;throw e;}
  finally{writing=false;}
 }
 retry.addEventListener('click',async()=>{if(!pending||writing)return;const {id,value}=pending;status('Desant…');try{onChange(await save(id,value));onError('');status('Canvis desats · compartit');}catch(e){onError(e.message);status('Canvi no desat');}});
 async function refresh(manual=false){if(writing||pending||refreshing)return;refreshing=true;try{const next=await read();onChange(next);document.dispatchEvent(new Event('cims-unlocked'));if(manual)onError('');status('Canvis desats · compartit');}catch(e){if(manual)onError(e.message);status('Sense connexió · pendent d’actualitzar');}finally{refreshing=false;}}
 refreshButton.addEventListener('click',()=>refresh(true));
 window.addEventListener('focus',()=>refresh());
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
 setInterval(()=>{if(!document.hidden)refresh();},15000);
 window.addEventListener('beforeunload',e=>{if(pending){e.preventDefault();e.returnValue='';}});
 return {load:read,save,savedLabel:'Canvis desats · compartit',caption:'Progrés públic i compartit entre tots els dispositius.'};
}
