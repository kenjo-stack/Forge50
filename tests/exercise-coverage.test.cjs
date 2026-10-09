'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),db=new Map(),c={console,crypto,Date,document:{addEventListener(){}},localStorage:{getItem:k=>db.get(k)||null,setItem:(k,v)=>db.set(k,v),removeItem:k=>db.delete(k)}};c.window=c;vm.createContext(c);
for(const file of ['data.js','js/exercise-catalog-expansion.js','js/exercise-swaps.js','js/store.js','exercise-guides.js','muscle-diagrams.js','js/exercise-demo-data.js','js/exercise-demos.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c);
const catalog=Object.values(c.ForgeDefaults.catalog),equipment=Object.keys(c.ExerciseSwaps.equipment),records=JSON.parse(fs.readFileSync(path.join(root,'docs/exercise-expansion.json'),'utf8'));
assert.equal(catalog.length,74);assert.equal(records.length,34);
for(const e of catalog){
 const options=c.ExerciseSwaps.filter(catalog.filter(x=>x.id!==e.id),e,{pattern:'same',equipment});
 assert.ok(options.length>=1,e.name+' needs a compatible alternative in its movement pattern');
 assert.ok(options.every(x=>x.id!==e.id&&x.muscle===e.muscle),e.id);
 const guides=c.ExerciseGuides.alternatives(e.id);
 assert.ok(guides.length>=2,e.name+' needs multiple alternatives in its muscle group');
 assert.equal(new Set(guides.map(x=>x.id)).size,guides.length,e.id);
 assert.equal(guides.length,catalog.filter(x=>x.id!==e.id&&x.muscle===e.muscle).length,e.id+' shows the full group');
 assert.ok(c.ExerciseGuides.guides[e.name]?.setup,e.id+' has a written guide');
 assert.ok(c.MuscleDiagrams.maps[e.id],e.id+' has a muscle illustration');
 assert.ok(c.ExerciseDemos.assets(e.id).length,e.id+' has a playable animation');
}
assert.ok(c.ExerciseGuides.alternatives('incline-dumbbell-press').length>4);
assert.equal(c.ExerciseGuides.alternatives('unknown-custom-id').length,0);
for(const r of records)assert.deepEqual(Array.from(c.ForgeDemoData.exercises[r.id]),[r.id],r.id+' uses its own animation');
assert.equal(new Set(records.map(r=>c.ForgeDemoData.assets[r.id].sha256)).size,34);
console.log('PASS all 74 exercises have multiple compatible alternatives, complete guides, muscle illustrations and animations; all 34 new GIFs are distinct.');
const S=c.Store;S.init();const templates=JSON.stringify(S.state.templates),cycle=JSON.stringify(S.state.cycle);
for(const e of catalog){
 const id=S.id(),exercise={...S.copy(e),skipped:false,sets:Array.from({length:3},()=>({id:S.id(),weight:null,reps:null,rir:null,done:false}))};
 S.change(s=>s.sessions.push({id,type:'lifting',templateId:'chest',title:'Coverage check',date:S.today(),status:'draft',startedAt:new Date().toISOString(),notes:'',exercises:[exercise]}));
 const filters={pattern:'any',equipment},options=S.swapOptions(id,e.id,filters);assert.ok(options.length>=2,e.id);
 const first=S.session(id).exercises[0];S.saveSet(id,e.id,first.sets[0].id,{weight:e.weightMode==='bodyweight'?0:10,reps:10,rir:2,done:true});
 const logged=JSON.stringify(S.session(id).exercises[0].sets[0]);S.swapExercise(id,e.id,options[0].id,filters);
 const session=S.session(id);assert.equal(session.exercises[0].id,e.id);assert.equal(JSON.stringify(session.exercises[0].sets[0]),logged);
 assert.equal(session.exercises[1].id,options[0].id);assert.equal(session.exercises[1].sets.length,2);assert.ok(session.exercises[1].sets.every(s=>!s.done&&s.weight===(session.exercises[1].weightMode==='bodyweight'?0:null)));
}
assert.equal(JSON.stringify(S.state.templates),templates);assert.equal(JSON.stringify(S.state.cycle),cycle);
S.validate(S.readBackup(S.backup()));
console.log('PASS swaps across all 74 IDs retain logged sets, clear replacement loads, preserve routines/rotation, and round-trip backups.');
S.change(s=>{s.sessions=[];});
for(const [template,replacement] of [['back','dumbbell-pullover'],['chest','dumbbell-overhead-triceps-extension'],['chest','flat-dumbbell-fly']]){
 const id=S.start(template),target=c.ForgeDefaults.catalog[replacement],old=S.session(id).exercises.find(e=>e.muscle===target.muscle),before=S.stats().volume;
 S.swapExercise(id,old.id,replacement,{pattern:'any',equipment});
 const e=S.session(id).exercises.find(e=>e.id===replacement);
 assert.equal(e.weightMode,target.singleDumbbell?'total':'per-dumbbell');
 S.saveSet(id,e.id,e.sets[0].id,{weight:10,reps:10,rir:2,done:true});S.finish(id);
 assert.equal(S.stats().volume-before,target.singleDumbbell?100:200,replacement+' records the actual dumbbell count');
 assert.equal(S.readBackup(S.backup()).sessions.find(s=>s.id===id).exercises.find(x=>x.id===replacement).weightMode,e.weightMode);
}
console.log('PASS single-dumbbell swaps record one load, paired dumbbells retain paired volume, and both survive backup round-trips.');
