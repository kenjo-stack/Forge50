/* Atomic app-shell cache. New releases wait for the user's Update action. */
const CACHE='forge50-v2.11.3-incline-fly';
// These original GIFs are unchanged: retain their existing offline cache.
const DEMO_CACHE='forge50-v2.9.1-original-gifs-demos';
const DEMO_NAMES=['assisted-pull-up', 'cable-chest-press', 'cable-crunch', 'cable-curl', 'cable-lateral-raise', 'chest-supported-row', 'close-grip-barbell-bench-press', 'dumbbell-lateral-raise', 'dumbbell-shoulder-press', 'ez-bar-curl', 'flat-dumbbell-press', 'hammer-curl', 'high-face-pull', 'high-row-machine', 'high-to-low-cable-fly', 'incline-dumbbell-curl', 'incline-dumbbell-press', 'lat-pulldown', 'leg-extension', 'leg-press', 'low-to-high-cable-fly', 'machine-ab-crunch', 'machine-calf-raise', 'machine-lateral-raise', 'machine-lower-chest-press', 'overhead-cable-triceps-extension', 'pallof-press', 'preacher-curl', 'reverse-grip-cable-triceps-pushdown', 'reverse-pec-deck', 'romanian-deadlift', 'rope-triceps-pushdown', 'seated-cable-row', 'seated-leg-curl', 'seated-machine-front-raise', 'single-arm-cable-row', 'skull-crushers', 'straight-arm-pulldown', 'triceps-extension-machine'];
const DEMO_URLS=new Set(DEMO_NAMES.map(name=>new URL(`./assets/exercise-demos/gifs/${name}.gif`,self.location.href).href));
const FILES=['./','./index.html','./style.css','./v2.css','./readability-v21.css','./exercise-guides.css','./exercise-guides.js','./js/exercise-demo-data.js','./js/exercise-demos.js',...DEMO_NAMES.map(name=>`./assets/exercise-demos/posters/${name}.jpg`),'./muscle-diagrams.js','./data.js','./js/exercise-swaps.js','./js/auto-backups.js','./js/store.js','./js/timer.js','./js/training-coach.js','./js/workout-cockpit.js','./js/app.js','./manifest.json','./assets/icon-192.png','./assets/icon-512.png',...['upper-chest','lower-chest','triceps','abs','posterior-chain','lats','mid-back','biceps','front-delts','side-delts','rear-delts','quads','hamstrings','calves','brachialis'].map(name=>`./assets/muscle-guides/${name}.webp`)];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('forge50-')&&key!==CACHE&&key!==DEMO_CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(DEMO_URLS.has(new URL(event.request.url).href)){
  event.respondWith((async()=>{
   const cache=await caches.open(DEMO_CACHE);
   const hit=await cache.match(event.request);if(hit)return hit;
   const response=await fetch(event.request);
   if(response.ok){try{await cache.put(event.request,response.clone());}catch{/* Playback still works when browser storage is full. */}}
   return response;
  })());
  return;
 }
 event.respondWith((async()=>{const cache=await caches.open(CACHE);const hit=await cache.match(event.request,{ignoreSearch:true});if(hit)return hit;try{return await fetch(event.request);}catch(error){if(event.request.mode==='navigate')return await cache.match('./index.html');throw error;}})());
});
