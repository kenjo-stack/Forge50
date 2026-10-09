/* Regenerate catalogue/guide additions from the preserved expansion records.
   Run once against the 2.11.4 base, before assemble-expansion.py. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),records=JSON.parse(fs.readFileSync(path.join(root,'docs/exercise-expansion.json'),'utf8'));
const c={document:{addEventListener(){}}};c.window=c;vm.createContext(c);
for(const f of ['data.js','js/exercise-swaps.js','exercise-guides.js','muscle-diagrams.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c);
const additions=[],guides={},metadata={},maps={};
for(const r of records){
 if(r.existing){assert.ok(c.ForgeDefaults.catalog[r.id]);continue;}
 assert.ok(!c.ForgeDefaults.catalog[r.id],'Already expanded: '+r.id);
 const base=c.ForgeDefaults.catalog[r.base],guide=c.ExerciseGuides.guides[base.name];
 assert.ok(base&&guide,r.id);
 const entry={...base,id:r.id,name:r.name,weightMode:r.weightMode,...(r.singleDumbbell?{singleDumbbell:true}:{}),notes:r.perform+' '+(r.singleDumbbell?'Record the load of the one dumbbell held in both hands.':r.weightMode==='per-dumbbell'?'Record the load of one dumbbell.':r.weightMode==='bodyweight'?'Record additional load only; use 0 kg for bodyweight.':'Record total load or the machine setting consistently.')};
 c.ForgeDefaults.catalog[r.id]=entry;additions.push(entry);
 const targets={
  'lower-chest':['Pectoralis major',r.pattern==='chest-fly'?'Front deltoids and shoulder stabilisers':'Triceps and front deltoids'],
  'front-delts':['Anterior deltoids',r.pattern==='vertical-press'?'Triceps and lateral deltoids':'Upper chest and shoulder stabilisers'],
  'side-delts':['Lateral deltoids','Supraspinatus and trapezius'],
  'rear-delts':['Posterior deltoids','Rhomboids, middle trapezius and rotator cuff'],
  lats:['Latissimus dorsi',r.pattern==='straight-arm-pull'?'Pectorals, triceps and trunk stabilisers':'Biceps and middle-back muscles'],
  biceps:['Biceps brachii','Brachialis and brachioradialis'],
  triceps:['Triceps brachii',r.pattern==='horizontal-press'?'Pectorals and front deltoids':'Shoulder and trunk stabilisers'],
  'posterior-chain':['Hamstrings and glutes','Spinal erectors and trunk stabilisers'],
  quads:['Quadriceps',r.id.includes('extension')?'Hip and trunk stabilisers':'Glutes and adductors'],
  hamstrings:['Hamstrings','Calf and hip stabilisers'],
  calves:[r.id==='seated-calf-raise'?'Soleus':'Gastrocnemius and soleus','Ankle and foot stabilisers'],
  abs:[r.pattern==='anti-rotation'?'Abdominals and obliques':'Rectus abdominis',r.pattern==='anti-rotation'?'Glutes and shoulder stabilisers':'Obliques and trunk stabilisers']
 }[r.muscleMap];
 guides[r.name]={...guide,focus:c.ExerciseSwaps.patterns[r.pattern],primary:targets[0],secondary:targets[1],setup:r.setup,perform:r.perform,equipment:r.equipmentLabel,cues:['Use a stable setup','Move under control','Use a comfortable range'],mistakes:'Swinging or bouncing, losing the supported position, or forcing the range of motion.'};
 metadata[r.id]=[{pattern:r.pattern,equipment:r.equipment}];maps[r.id]=r.muscleMap;
}
assert.equal(Object.keys(c.ForgeDefaults.catalog).length,74);assert.equal(additions.length,33);
const write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
write('js/exercise-catalog-expansion.js','/* Additional exercise definitions. Existing profile and routines stay in data.js. */\nObject.assign(window.ForgeDefaults.catalog, '+JSON.stringify(Object.fromEntries(additions.map(e=>[e.id,e])),null,2)+');\n');
function insert(file,marker,values){
 const source=fs.readFileSync(path.join(root,file),'utf8'),json=JSON.stringify(values,null,2).slice(1,-1).trim();
 assert.ok(source.includes(marker),file);
 write(file,source.replace(marker,marker+'\n    '+json+',\n'));
}
insert('exercise-guides.js','guides: {',guides);
insert('js/exercise-swaps.js','metadata:{',metadata);
insert('muscle-diagrams.js','const maps = {',maps);
console.log('Added 33 exercises, guides, muscle maps and movement/equipment metadata; catalogue total 74.');
