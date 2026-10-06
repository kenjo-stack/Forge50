const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),crypto=require('crypto');
const db=new Map(),c={console,crypto,Date,localStorage:{getItem:k=>db.get(k)||null,setItem:(k,v)=>db.set(k,v),removeItem:k=>db.delete(k)}};c.window=c;vm.createContext(c);for(const f of ['data.js','js/exercise-swaps.js','js/store.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);c.Store.init();const S=c.Store,X=c.ExerciseSwaps,all=Object.keys(X.equipment);
assert.equal(Object.keys(X.metadata).length,41);for(const id of Object.keys(c.ForgeDefaults.catalog)){assert.ok(X.metadata[id],id);for(const v of X.metadata[id]){assert.ok(X.patterns[v.pattern]);v.equipment.forEach(e=>assert.ok(X.equipment[e]));}}
console.log('PASS all stable catalogue IDs have valid equipment and movement metadata');
assert.equal(X.variants('high-row-machine-assisted-pull-up','lat-pulldown',{pattern:'same',equipment:['machine']}).length,0);assert.equal(X.variants('high-row-machine-assisted-pull-up','lat-pulldown',{pattern:'same',equipment:['assisted-pull-up']}).length,1);
assert.equal(X.variants('flat-dumbbell-press','incline-dumbbell-press',{pattern:'same',equipment:['dumbbells']}).length,0);
console.log('PASS equipment requirements and mixed-entry variants remain correlated');
const id=S.start('chest'),old=S.session(id).exercises[0],before=JSON.stringify(S.state),filters={pattern:'same',equipment:['cable']};
assert.deepEqual(Array.from(S.swapOptions(id,old.id,filters),e=>e.id),['cable-chest-press']);assert.equal(S.swapOptions(id,old.id,{pattern:'same',equipment:[]}).length,0);assert.equal(JSON.stringify(S.state),before);
assert.throws(()=>S.swapExercise(id,old.id,'flat-dumbbell-press',filters));assert.equal(JSON.stringify(S.state),before);
assert.ok(X.filter(Object.values(c.ForgeDefaults.catalog),old,{pattern:'any',equipment:all}).some(e=>e.id==='low-to-high-cable-fly'));
console.log('PASS strict defaults, explicit broadening, empty equipment and stale submissions');
const templates=JSON.stringify(S.state.templates),cycle=JSON.stringify(S.state.cycle);S.saveSet(id,old.id,old.sets[0].id,{weight:20,reps:10,rir:2,done:true});const logged=JSON.stringify(S.session(id).exercises[0].sets[0]);S.swapExercise(id,old.id,'cable-chest-press',filters);assert.equal(JSON.stringify(S.session(id).exercises[0].sets[0]),logged);assert.equal(JSON.stringify(S.state.templates),templates);assert.equal(JSON.stringify(S.state.cycle),cycle);assert.equal(S.readBackup(S.backup()).sessions[0].exercises[1].id,'cable-chest-press');S.finish(id);assert.equal(S.swapOptions(id,'cable-chest-press',filters).length,0);
assert.equal(X.sourcePatterns('custom-id').length,0);assert.equal(X.variants('custom-id','custom-id',{pattern:'any',equipment:all}).length,0);
console.log('PASS logs, routines, rotation, backups and custom-ID handling preserved');
