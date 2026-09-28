const local=['localhost','127.0.0.1'].includes(location.hostname);
if(local&&new URLSearchParams(location.search).get('api')==='local')sessionStorage.setItem('quadern-local-api','1');
export const apiBase=local&&sessionStorage.getItem('quadern-local-api')==='1'?'http://127.0.0.1:5173':'https://quadern-de-lectures.lluisgalbany.chatgpt.site';
const key='quadern-editor-session',stateKey='quadern-login-state';
type Session={token:string;expires:number};
function session():Session|null{try{const s=JSON.parse(sessionStorage.getItem(key)||'null');if(s&&/^[a-f0-9]{64}$/.test(s.token)&&s.expires>Date.now())return s;sessionStorage.removeItem(key)}catch{}return null}
const fragment=new URLSearchParams(location.hash.slice(1));
if(fragment.has('session')){
 const expected=sessionStorage.getItem(stateKey),state=fragment.get('state'),token=fragment.get('session')||'',expires=Number(fragment.get('expires'));
 history.replaceState(null,'',location.pathname+location.search);
 if(expected&&expected===state&&/^[a-f0-9]{64}$/.test(token)&&expires>Date.now())sessionStorage.setItem(key,JSON.stringify({token,expires}));
 sessionStorage.removeItem(stateKey);
}
export async function apiFetch(path:string,init:RequestInit={}){
 const s=session(),headers=new Headers(init.headers);if(s)headers.set('Authorization','Bearer '+s.token);
 let response:Response;
 try{response=await fetch(apiBase+path,{...init,headers,credentials:'omit',cache:'no-store'})}catch{throw Error('No s’ha pogut connectar amb el quadern. Comprova la connexió i torna-ho a provar.')}
 if(!response.headers.get('Content-Type')?.includes('application/json'))throw Error('El registre encara requereix accés privat. Pots obrir-lo des de l’enllaç del servei.');
 return response;
}
export function signIn(){
 const state=Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b=>b.toString(16).padStart(2,'0')).join('');
 sessionStorage.setItem(stateKey,state);
 const url=new URL('/connect',apiBase);url.searchParams.set('return_to',location.origin+location.pathname);url.searchParams.set('state',state);
 location.assign(url);
}
export async function signOut(){const response=await apiFetch('/api/session',{method:'DELETE'});if(!response.ok)throw Error('No s’ha pogut tancar la sessió. Torna-ho a provar.');sessionStorage.removeItem(key);location.reload()}
