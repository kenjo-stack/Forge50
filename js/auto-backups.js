/* Device-only restore points in IndexedDB, separate from the live workout key. */
'use strict';
window.AutoBackups={
 database:'forge50-local-backups',limit:7,queue:Promise.resolve(),timer:null,error:'',started:false,
 open(){if(this.db)return Promise.resolve(this.db);if(this.opening)return this.opening;this.opening=new Promise((resolve,reject)=>{if(!window.indexedDB){reject(new Error('Automatic backups are unavailable in this browser. Export a file backup.'));return;}const r=indexedDB.open(this.database,1);r.onupgradeneeded=()=>r.result.createObjectStore('points',{keyPath:'id'});r.onerror=()=>reject(r.error);r.onblocked=()=>reject(new Error('Close other Forge50 tabs and try again.'));r.onsuccess=()=>{this.db=r.result;this.db.onversionchange=()=>{this.db.close();this.db=null;this.opening=null;};resolve(this.db);};});this.opening.catch(()=>{this.opening=null;});return this.opening;},
 notify(){window.dispatchEvent?.(new Event('forge50-backup-status'));},
 enqueue(fn){const job=this.queue.then(fn);this.queue=job.catch(e=>{this.error=e?.name==='QuotaExceededError'?'Automatic backup storage is full. Export a file backup.':e?.message||'Automatic backup failed. Export a file backup.';this.notify();});return job;},
 async write(point){const db=await this.open();await new Promise((resolve,reject)=>{const tx=db.transaction('points','readwrite'),store=tx.objectStore('points'),r=store.getAll();tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Automatic backup interrupted.'));r.onsuccess=()=>{const points=r.result;if(point.id.startsWith('daily-')&&points.some(p=>p.id===point.id))return;point.sequence=Math.max(0,...points.map(p=>Number.isSafeInteger(p.sequence)?p.sequence:0))+1;store.put(point);const keep=[...points.filter(p=>p.id!==point.id),point].filter(p=>p.id!=='latest').sort((a,b)=>(b.sequence||0)-(a.sequence||0)||String(b.created).localeCompare(String(a.created))||String(b.id).localeCompare(String(a.id)));keep.slice(this.limit).forEach(p=>store.delete(p.id));};});this.error='';this.notify();},
 record(state,reason,id){Store.validate(state);return {id,created:new Date().toISOString(),reason,payload:JSON.stringify({format:'forge50-backup',schema:2,appVersion:'2.10.1',exportDate:new Date().toISOString(),state})};},
 capture(state,reason='Manual restore point'){let point;try{point=this.record(state,reason,'point-'+Store.id());}catch(e){return Promise.reject(e);}return this.enqueue(()=>this.write(point));},
 daily(state){const day=Store.today();if(this.dailyDay===day)return this.queue;if(this.dailyPending?.day===day)return this.dailyPending.job;const point=this.record(state,'Daily restore point','daily-'+day),job=this.enqueue(()=>this.write(point));this.dailyPending={day,job};job.then(()=>{this.dailyDay=day;this.dailyPending=null;},()=>{this.dailyPending=null;});return job;},
 start(state){if(!this.started){this.started=true;document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')this.flush().catch(()=>{});});window.addEventListener('pagehide',()=>this.flush().catch(()=>{}));}this.daily(state).catch(()=>{});this.schedule(state);},
 observe(previous,next){
  this.daily(previous||next).catch(()=>{});
  if(previous){const removed=previous.sessions.some(s=>!next.sessions.some(n=>n.id===s.id));const routine=JSON.stringify(previous.templates)!==JSON.stringify(next.templates);if(removed||routine)this.capture(previous,removed?'Before deleting or replacing records':'Before routine changes').catch(()=>{});
   if(next.sessions.some(s=>s.type==='lifting'&&s.status==='completed'&&previous.sessions.find(p=>p.id===s.id)?.status==='draft'))this.capture(next,'Workout completed').catch(()=>{});
  }
  this.schedule(next);
 },
 schedule(state){this.pending=this.record(state,'Latest saved data','latest');clearTimeout(this.timer);this.timer=setTimeout(()=>this.flush().catch(()=>{}),1000);},
 flush(){clearTimeout(this.timer);this.timer=null;const point=this.pending;this.pending=null;if(point)return this.enqueue(()=>this.write(point));return this.queue;},
 async list(){await this.queue;const db=await this.open();const points=await new Promise((resolve,reject)=>{const tx=db.transaction('points','readonly'),r=tx.objectStore('points').getAll();r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});return points.sort((a,b)=>(b.sequence||0)-(a.sequence||0)||String(b.created).localeCompare(String(a.created))||String(b.id).localeCompare(String(a.id)));},
 async read(id){const points=await this.list(),point=points.find(p=>p.id===id);if(!point)throw new Error('This restore point is no longer available. Refresh the list.');return {point,state:Store.readBackup(JSON.parse(point.payload))};}
};
