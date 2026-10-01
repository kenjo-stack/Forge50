const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),context={document:{addEventListener(){}}};context.window=context;vm.createContext(context);
for(const file of ['data.js','js/exercise-demo-data.js','js/exercise-demos.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const data=context.ForgeDemoData;
assert.deepEqual(Object.keys(data.exercises).sort(),Object.keys(context.ForgeDefaults.catalog).sort());
assert.equal(Object.keys(data.assets).length,39);
assert.deepEqual(Array.from(data.exercises['high-row-machine-assisted-pull-up']),['high-row-machine','assisted-pull-up']);
assert.equal(data.exercises['high-row-machine'][0],'high-row-machine');
for(const [id,keys] of Object.entries(data.exercises))for(const key of keys)assert.ok(data.assets[key],id+' has a valid local asset');
assert.ok(Object.isFrozen(data)&&Object.isFrozen(data.exercises)&&Object.isFrozen(data.assets));
console.log('PASS all 39 v2.9 exercise IDs retain a local mapping, including both combined-entry demos');

// Decode GIF structure without an image-library dependency: count real frames and delays.
function inspectGif(bytes){
 assert.equal(bytes.subarray(0,6).toString(),'GIF89a');
 assert.equal(bytes.readUInt16LE(6),600);assert.equal(bytes.readUInt16LE(8),600);
 let offset=13+((bytes[10]&128)?3*(2**((bytes[10]&7)+1)):0),frames=0,duration=0,loop;
 const blocks=()=>{const output=[];while(bytes[offset]){const length=bytes[offset++];output.push(bytes.subarray(offset,offset+length));offset+=length;}offset++;return Buffer.concat(output);};
 while(offset<bytes.length){
  const marker=bytes[offset++];if(marker===0x3b)break;
  if(marker===0x21){const type=bytes[offset++],payload=blocks();if(type===0xf9)duration+=payload.readUInt16LE(1)*10;if(type===0xff&&payload.subarray(0,11).toString()==='NETSCAPE2.0')loop=payload.readUInt16LE(12);}
  else if(marker===0x2c){frames++;const flags=bytes[offset+8];offset+=9;if(flags&128)offset+=3*(2**((flags&7)+1));offset++;blocks();}
  else throw new Error('Invalid GIF block at '+(offset-1));
 }
 assert.equal(offset,bytes.length);assert.equal(loop,0);assert.ok(frames>1);assert.ok(duration>1000);
 return {frames,duration};
}
for(const [id,asset] of Object.entries(data.assets)){
 assert.equal(asset.gif,`assets/exercise-demos/gifs/${id}.gif`);assert.equal(asset.poster,`assets/exercise-demos/posters/${id}.jpg`);
 const bytes=fs.readFileSync(path.join(root,asset.gif));assert.equal(bytes.length,asset.bytes,id);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),asset.sha256,id);
 const gif=inspectGif(bytes);assert.equal(gif.frames,28,id);assert.equal(gif.duration,2330,id);
 const poster=fs.readFileSync(path.join(root,asset.poster));assert.equal(poster.readUInt16BE(0),0xffd8,id);assert.equal(poster.readUInt16BE(poster.length-2),0xffd9,id);
 const html=context.ExerciseDemos.render(id==='assisted-pull-up'?'high-row-machine-assisted-pull-up':id);
 assert.ok(html.includes('data-demo-toggle'));assert.ok(!/src="[^"]+\.gif"/.test(html));
}
console.log('PASS 39 original GIFs decode as looping 28-frame animations with verified hashes and posters; no autoplay');
for(const id of ['custom-exercise','__proto__','constructor','<img src=x onerror=alert(1)>']){
 assert.equal(context.ExerciseDemos.assets(id).length,0);assert.ok(context.ExerciseDemos.render(id).includes('No animation'));
 assert.ok(!context.ExerciseDemos.render(id).includes('<img'));
}
console.log('PASS custom and unsafe IDs use the Technique fallback without inventing URLs');
const listeners={},swContext={URL,Set,self:{location:{href:'https://example.test/Forge50/sw.js',origin:'https://example.test'},addEventListener(type,fn){listeners[type]=fn;}}};
vm.createContext(swContext);vm.runInContext(fs.readFileSync(path.join(root,'sw.js'),'utf8'),swContext);
const files=vm.runInContext('FILES',swContext),urls=vm.runInContext('Array.from(DEMO_URLS)',swContext);
assert.ok(!files.some(file=>file.endsWith('.gif')));
for(const asset of Object.values(data.assets)){
 assert.ok(files.includes('./'+asset.poster));assert.ok(urls.includes('https://example.test/Forge50/'+asset.gif));
}
for(const file of files)if(file!=='./')assert.ok(fs.existsSync(path.join(root,file)),file);
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const [,file] of index.matchAll(/(?:src|href)="([^"#]+)"/g))assert.ok(fs.existsSync(path.join(root,file)),file);
assert.ok(index.indexOf('js/exercise-demo-data.js')<index.indexOf('js/exercise-demos.js'));
assert.ok(index.indexOf('js/exercise-demos.js')<index.indexOf('src="exercise-guides.js"'));
console.log('PASS Pages subpath references and precache are complete; GIFs stay outside the initial app download');

(async()=>{
 let downloads=0,puts=0,hit;
 swContext.fetch=async()=>{downloads++;return new Response('animated bytes',{status:200});};
 swContext.caches={open:async()=>({match:async()=>hit,put:async()=>{puts++;throw new Error('quota');}})};
 const request={method:'GET',url:urls[0]};
 let result;listeners.fetch({request,respondWith:value=>{result=value;}});
 assert.equal((await result).status,200);assert.equal(downloads,1);assert.equal(puts,1);
 hit=new Response('cached bytes',{status:200});listeners.fetch({request,respondWith:value=>{result=value;}});
 assert.equal(await (await result).text(),'cached bytes');assert.equal(downloads,1);
 hit=undefined;swContext.fetch=async()=>new Response('missing',{status:404});listeners.fetch({request,respondWith:value=>{result=value;}});
 assert.equal((await result).status,404);assert.equal(puts,1);
 listeners.fetch({request:{method:'GET',url:'https://other.test/demo.gif'},respondWith:()=>assert.fail('external request intercepted')});
 console.log('PASS cached GIFs avoid network requests; 404s are not cached and quota failures preserve network playback');
})().catch(error=>{console.error(error);process.exitCode=1;});
