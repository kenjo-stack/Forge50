const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),context={window:{}};vm.createContext(context);
for(const file of ['data.js','muscle-diagrams.js','exercise-guides.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const {ForgeDefaults:defaults,MuscleDiagrams:diagrams,ExerciseGuides:guides}=context.window;
assert.deepEqual(Object.keys(diagrams.maps).sort(),Object.keys(defaults.catalog).sort());
for(const id of Object.keys(defaults.catalog)){
 const group=diagrams.maps[id],html=diagrams.render(id),file=path.join(root,'assets/muscle-guides',group+'.webp');
 assert.ok(fs.existsSync(file),id);const bytes=fs.readFileSync(file);assert.equal(bytes.subarray(0,4).toString(),'RIFF');assert.equal(bytes.subarray(8,12).toString(),'WEBP');
 assert.ok(html.includes(`assets/muscle-guides/${group}.webp`),id);
 assert.equal((html.match(/<path d="M /g)||[]).length,3,id+' retains marker and both movement arrows');
 for(const word of ['Primary','Secondary','Training focus'])assert.ok(html.includes(word),id);
 const guide=guides.get(id);assert.ok(guide.primary&&guide.secondary&&guide.focus,id);
 assert.ok(!/canvas|data-anatomy|3D model credits/.test(html),id);
}
assert.equal(diagrams.render('custom-press'),'');
console.log('PASS all 41 guides retain valid muscle illustrations, colour legends, purple arrows and written muscle targets');

for(const file of ['index.html','exercise-guides.js','exercise-guides.css','sw.js']){
 const text=fs.readFileSync(path.join(root,file),'utf8');
 assert.ok(!/AnatomyViewer|AnatomyMaps|data-anatomy|anatomy-credit|assets\/anatomy|js\/anatomy-/.test(text),file+' has no remaining model dependency');
}
for(const file of ['assets/anatomy','js/anatomy-viewer.js','js/anatomy-maps.js','tools/build-anatomy.py'])assert.ok(!fs.existsSync(path.join(root,file)),file+' removed');
console.log('PASS the model package, renderer, camera controls, build tool and credits are completely removed');

const listeners={},sw={URL,Set,self:{location:{href:'https://example.test/Forge50/sw.js',origin:'https://example.test'},addEventListener(type,fn){listeners[type]=fn;},clients:{claim:async()=>{}}}};
vm.createContext(sw);vm.runInContext(fs.readFileSync(path.join(root,'sw.js'),'utf8'),sw);
const files=vm.runInContext('FILES',sw),cache=vm.runInContext('CACHE',sw),media=vm.runInContext('DEMO_CACHE',sw);
assert.equal(media,'forge50-v2.9.1-original-gifs-demos');assert.notEqual(cache,media);
for(const group of new Set(Object.values(diagrams.maps)))assert.ok(files.includes(`./assets/muscle-guides/${group}.webp`));
(async()=>{
 const removed=[];
 sw.caches={keys:async()=>['forge50-v2.9.1-original-gifs',cache,media,'other-app'],delete:async key=>removed.push(key)};
 let activation;listeners.activate({waitUntil:value=>{activation=value;}});await activation;
 assert.deepEqual(removed,['forge50-v2.9.1-original-gifs']);
 console.log('PASS activation retires the old model cache, keeps played GIFs and leaves other app caches alone');
})().catch(error=>{console.error(error);process.exitCode=1;});
