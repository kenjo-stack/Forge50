const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),context={window:{}};vm.createContext(context);
for(const file of ['data.js','js/anatomy-maps.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const {AnatomyMaps:maps,ForgeDefaults:defaults}=context.window;
const meta=JSON.parse(fs.readFileSync(path.join(root,'assets/anatomy/parts.json'))),data=zlib.gunzipSync(fs.readFileSync(path.join(root,'assets/anatomy/body.bin.gz')));
assert.equal(data.subarray(0,4).toString(),'F50A');assert.equal(data.readUInt32LE(4),1);
assert.equal(data.readUInt32LE(8),meta.vertexCount);assert.equal(data.readUInt32LE(12),meta.indexCount);
assert.equal(data.length,16+meta.vertexCount*6+meta.indexCount*4);
let vertexEnd=0,indexEnd=0;
for(const p of meta.parts){assert.equal(p.vertexStart,vertexEnd);assert.equal(p.indexStart,indexEnd);vertexEnd+=p.vertexCount;indexEnd+=p.indexCount;
 for(let i=p.indexStart;i<indexEnd;i++){const v=data.readUInt32LE(16+meta.vertexCount*6+i*4);assert.ok(v>=p.vertexStart&&v<vertexEnd,p.name+' indices stay within its surface');}}
assert.equal(vertexEnd,meta.vertexCount);assert.equal(indexEnd,meta.indexCount);console.log('PASS complete model with valid surface boundaries and indices');
assert.deepEqual(Object.keys(maps.exercises).sort(),Object.keys(defaults.catalog).sort());
for(const id of Object.keys(defaults.catalog)){
 const cfg=maps.exercises[id],s=maps.select(id,meta.parts);assert.ok(s.primary.length&&s.focus.length,id);
 for(const key of [...cfg.primary,...cfg.secondary,...cfg.focus])assert.ok(meta.parts.some(p=>!p.bone&&maps.regions[key].test(p.name)),id+': '+key);
 assert.ok(s.focus.every(p=>s.primary.includes(p)),id+' focus is part of primary work');
 assert.ok(s.secondary.every(p=>!s.primary.includes(p)),id+' color groups do not overlap');
}
console.log('PASS all catalog exercises map to primary, secondary and focus surfaces');
const names=(id,type)=>maps.select(id,meta.parts)[type].map(p=>p.name);
assert.deepEqual(Array.from(names('lat-pulldown','primary')).sort(),['left latissimus dorsi','right latissimus dorsi']);
assert.ok(names('incline-dumbbell-press','primary').every(n=>n.includes('clavicular')));
assert.ok(names('reverse-pec-deck','primary').every(n=>n.includes('spinal part')&&n.includes('deltoid')));
assert.ok(names('overhead-cable-triceps-extension','focus').every(n=>n.includes('long head')&&n.includes('triceps')));
assert.ok(names('leg-extension','primary').every(n=>n.includes('vastus')||n.includes('rectus femoris')));
assert.ok(names('seated-leg-curl','primary').every(n=>/biceps femoris|semitendinosus|semimembranosus/.test(n)));
assert.ok(names('machine-calf-raise','primary').every(n=>/gastrocnemius|soleus/.test(n)));
console.log('PASS chest, back, shoulder, triceps, thigh and calf target identities');
