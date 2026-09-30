const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),db=new Map(),c={crypto,Date,console,localStorage:{getItem:k=>db.get(k)??null,setItem:(k,v)=>db.set(k,String(v))}};c.window=c;vm.createContext(c);
for(const file of ['data.js','js/exercise-dataset-data.js','js/exercise-dataset.js','js/exercise-media-data.js','js/exercise-media-config.js','js/exercise-media.js','js/store.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c);
const {Store:S,ExerciseDataset:D,ExerciseDatasetMedia:M,ForgeDefaults:F}=c;S.init();
assert.equal(D.source.recordCount,1324);assert.equal(D.source.revision,'7455efae41b330c265e7cd4b78dfa848e7ce5ebd');
assert.deepEqual(Object.keys(c.ForgeExerciseDatasetData.mappings).sort(),Object.keys(F.catalog).sort());
for(const id of Object.keys(F.catalog)){const entry=D.get(id);assert.ok(entry.records.length);assert.ok(entry.records.every(r=>/^\d+$/.test(r.id)&&r.target&&r.equipment&&r.instructions.length));assert.match(D.metadataHTML(id),/EXERCISE REFERENCE/);}
assert.equal(D.get('custom-unknown'),null);assert.equal(D.get('toString'),null);assert.equal(D.get('flat-dumbbell-press').records[0].name,'dumbbell bench press');assert.equal(D.get('high-row-machine-assisted-pull-up').records.length,2);assert.equal(D.get('pallof-press').match,'related');
console.log('PASS all 39 Forge50 IDs map to pinned records with explicit variant/related labels');
const id=S.start('back'),session=S.session(id),before=JSON.stringify(S.state),backup=JSON.stringify(S.backup().state);
for(const e of session.exercises){D.metadataHTML(e.id);D.profile(e.id);S.swapOptions(id,e.id);M.render(e.id);}
assert.equal(JSON.stringify(S.state),before);assert.equal(JSON.stringify(S.backup().state),backup);assert.equal(db.get(S.KEY),before);
console.log('PASS metadata, guides, swap ranking and media rendering leave saved state and backups unchanged');
const candidates=Object.values(F.catalog).filter(e=>e.muscle==='Back'&&e.id!=='lat-pulldown');const ranked=D.alternatives('lat-pulldown',candidates);
assert.equal(ranked[0].exercise.id,'straight-arm-pulldown');assert.ok(ranked[0].reasons.includes('Same dataset target'));assert.ok(ranked[0].reasons.includes('Same equipment'));
assert.ok(D.alternatives('lat-pulldown',candidates,'leverage machine').every(item=>item.equipment.includes('leverage machine')));
assert.equal(D.alternatives('lat-pulldown',candidates,'nonexistent').length,0);
assert.ok(S.swapOptions(id,'lat-pulldown').every(e=>e.muscle==='Back'&&!session.exercises.some(x=>x.id===e.id)));
console.log('PASS swaps use target, secondary muscles and equipment while preserving eligibility and original exercise objects');
assert.equal(M.enabled(),false);assert.doesNotMatch(M.render('lat-pulldown'),/<img|src=|videos\//);c.ForgeExerciseMediaConfig={enabled:true,licenseReference:'',basePath:'assets/licensed-exercise-media/'};assert.equal(M.enabled(),false);
c.ForgeExerciseMediaConfig={enabled:true,licenseReference:'synthetic test only',basePath:'https://raw.githubusercontent.com/'};assert.equal(M.enabled(),false);
c.ForgeExerciseMediaConfig={enabled:true,licenseReference:'synthetic test only',basePath:'assets/licensed-exercise-media/'};assert.equal(M.enabled(),true);assert.match(M.render('lat-pulldown'),/© Gym visual/);assert.doesNotMatch(M.render('lat-pulldown'),/src=/);
console.log('PASS separately licensed media is disabled by default and is not loaded before explicit playback');
