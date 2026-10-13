import {SHARED_API} from './config.js';
export function photoUrl(ascent){
 const path=ascent?.photoPath;
 return typeof path==='string'&&/^\/api\/photos\/[a-z0-9-]+\?v=[a-f0-9-]+\.jpg$/.test(path)?new URL(path,SHARED_API).href:'';
}
export async function preparePhoto(file){
 if(!file||!file.type.startsWith('image/'))throw Error('Selecciona una foto.');
 if(file.size>20*1024*1024)throw Error('Tria una foto de menys de 20 MB.');
 let bitmap;
 try{bitmap=await createImageBitmap(file);}catch{throw Error('No s’ha pogut obrir aquesta foto. Prova amb una imatge JPEG, PNG o WebP.');}
 try{
  const scale=Math.min(1,1600/Math.max(bitmap.width,bitmap.height));
  const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));
  const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(bitmap,0,0,canvas.width,canvas.height);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.82));
  if(!blob||blob.size>2*1024*1024)throw Error('No s’ha pogut reduir prou la foto. Tria una imatge més petita.');
  return blob;
 }finally{bitmap.close();}
}
