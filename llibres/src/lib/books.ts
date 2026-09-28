export type Book = {
  id:string; title:string; author:string; publisher:string; recordedYear:string;
  originalYear:string; originalTitle:string; editionYear:string; isbn:string;
  language:string; translator:string; pages:string; coverUrl:string;
  coverStatus:'missing'|'suggested'|'confirmed'; read:boolean; finishedOn:string;
  place:string; summary:string; editionStatus:'pending'|'confirmed'|'none';
  editionSource:string; editionId:string; workSource:string; version:number;
  imported?:{row:number;values:unknown[]};
};
export type Edition = {id:string;source:string;title:string;author:string;publisher:string;year:string;isbn:string;language:string;pages:string;translator:string;coverUrl:string;originalYear:string;originalTitle:string;workSource:string;score:number};
export const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export const blankBook=():Book=>({id:crypto.randomUUID(),title:'',author:'',publisher:'',recordedYear:'',originalYear:'',originalTitle:'',editionYear:'',isbn:'',language:'',translator:'',pages:'',coverUrl:'',coverStatus:'missing',read:true,finishedOn:new Date().toLocaleDateString('en-CA'),place:'',summary:'',editionStatus:'pending',editionSource:'',editionId:'',workSource:'',version:0});
export const dateLabel=(date:string)=>date ? new Intl.DateTimeFormat('ca',{day:'numeric',month:'long',year:'numeric'}).format(new Date(date+'T12:00:00')) : 'Sense data';
