/* Atomic app-shell cache. New releases wait for the user's Update action. */
const CACHE='forge50-v2.12.0-complete-exercises';
// These original GIFs are unchanged: retain their existing offline cache.
const DEMO_CACHE='forge50-v2.9.1-original-gifs-demos';
const DEMO_NAMES=["assisted-pull-up","bent-over-dumbbell-reverse-fly","cable-chest-press","cable-crunch","cable-curl","cable-front-raise","cable-lateral-raise","cable-leg-extension","cable-pull-through","cable-rear-delt-fly","chest-supported-row","close-grip-barbell-bench-press","close-grip-machine-chest-press","decline-crunch","dumbbell-floor-press","dumbbell-front-raise","dumbbell-lateral-raise","dumbbell-overhead-triceps-extension","dumbbell-pullover","dumbbell-romanian-deadlift","dumbbell-shoulder-press","ez-bar-curl","flat-dumbbell-fly","flat-dumbbell-press","goblet-squat","hack-squat","half-kneeling-pallof-press","hammer-curl","high-face-pull","high-row-machine","high-to-low-cable-fly","incline-dumbbell-curl","incline-dumbbell-fly","incline-dumbbell-press","lat-pulldown","leaning-dumbbell-lateral-raise","leg-extension","leg-press","low-to-high-cable-fly","lying-cable-pullover","lying-leg-curl","machine-ab-crunch","machine-calf-raise","machine-chest-press","machine-lateral-raise","machine-lower-chest-press","machine-shoulder-press","neutral-grip-lat-pulldown","one-arm-dumbbell-row","overhead-cable-triceps-extension","pallof-press","pec-deck-fly","preacher-curl","reverse-grip-cable-triceps-pushdown","reverse-pec-deck","romanian-deadlift","rope-face-pull","rope-triceps-pushdown","seated-barbell-shoulder-press","seated-cable-face-pull","seated-cable-row","seated-calf-raise","seated-leg-curl","seated-machine-front-raise","single-arm-cable-row","single-leg-extension","skull-crushers","smith-machine-squat","standing-dumbbell-calf-raise","standing-dumbbell-curl","standing-leg-curl","straight-arm-pulldown","tall-kneeling-pallof-press","triceps-extension-machine"];
const DEMO_URLS=new Set(DEMO_NAMES.map(name=>new URL(`./assets/exercise-demos/gifs/${name}.gif`,self.location.href).href));
const FILES=['./','./index.html','./style.css','./v2.css','./readability-v21.css','./exercise-guides.css','./exercise-guides.js','./js/exercise-demo-data.js','./js/exercise-demos.js',...DEMO_NAMES.map(name=>`./assets/exercise-demos/posters/${name}.jpg`),'./muscle-diagrams.js','./data.js','./js/exercise-catalog-expansion.js','./js/exercise-swaps.js','./js/auto-backups.js','./js/store.js','./js/timer.js','./js/training-coach.js','./js/workout-cockpit.js','./js/app.js','./manifest.json','./assets/icon-192.png','./assets/icon-512.png',...['upper-chest','lower-chest','triceps','abs','posterior-chain','lats','mid-back','biceps','front-delts','side-delts','rear-delts','quads','hamstrings','calves','brachialis'].map(name=>`./assets/muscle-guides/${name}.webp`)];
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
