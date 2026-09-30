// Import metadata only. No media is downloaded or copied by this tool.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),input=process.argv[2];
if(!input)throw Error('Usage: node tools/import-exercise-dataset.cjs /path/to/exercises.json');
const raw=fs.readFileSync(input),dataset=JSON.parse(raw),mapping=JSON.parse(fs.readFileSync(path.join(root,'data/exercise-dataset-map.json')));
const sha=crypto.createHash('sha1').update(Buffer.from('blob '+raw.length+'\0')).update(raw).digest('hex');
if(sha!==mapping.source.dataBlobSha||dataset.length!==mapping.source.recordCount)throw Error('Dataset does not match the pinned source revision');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),c);const catalog=c.window.ForgeDefaults.catalog;
if(JSON.stringify(Object.keys(catalog).sort())!==JSON.stringify(Object.keys(mapping.mappings).sort()))throw Error('Mapping must cover every catalog ID');
const byId=new Map(dataset.map(e=>[e.id,e])),records={},media={};
for(const map of Object.values(mapping.mappings))for(const id of map.datasetIds){
 const e=byId.get(id);if(!e)throw Error('Missing dataset ID '+id);
 records[id]={id:e.id,name:e.name,category:e.category,bodyPart:e.body_part,target:e.target,secondaryMuscles:e.secondary_muscles,equipment:e.equipment,instructions:e.instruction_steps.en};
 media[id]={image:e.image,animation:e.gif_url,attribution:e.attribution};
}
fs.writeFileSync(path.join(root,'js/exercise-dataset-data.js'),'// Generated metadata only; see tools/import-exercise-dataset.cjs and vendor/exercises-dataset/LICENSE.\nwindow.ForgeExerciseDatasetData='+JSON.stringify({...mapping,records},null,2)+';\n');
fs.writeFileSync(path.join(root,'js/exercise-media-data.js'),'// Isolated media references only; no license or media files are supplied.\nwindow.ForgeExerciseMediaManifest='+JSON.stringify(media,null,2)+';\n');
const lines=['# Forge50 dataset mapping','',`Source: hasaneyldrm/exercises-dataset @ ${mapping.source.revision}; ${dataset.length} source records.`,`All ${Object.keys(catalog).length} existing Forge50 catalog IDs are preserved. Mapping is read-only and is never written into session snapshots or backups.`,'','Exact denotes the same named movement; variant and related entries retain the original Forge50 technique. No exact demonstration is implied for related references.','','| Forge50 ID | Existing name | Dataset ID / name | Match | Review note |','|---|---|---|---|---|'];
for(const [id,e] of Object.entries(catalog)){const m=mapping.mappings[id];lines.push(`| ${id} | ${e.name} | ${m.datasetIds.map(i=>i+' '+records[i].name).join('; ')} | ${m.match} | ${m.note} |`);}
lines.push('','## Media boundary','','Metadata and instruction text use the upstream MIT license. Gym visual assets use separate terms. No image or GIF is included in this integration; the disabled provider must be configured only with independently licensed local copies. See docs/EXERCISE-MEDIA.md.','');
fs.writeFileSync(path.join(root,'docs/EXERCISE-DATASET-MAPPING.md'),lines.join('\n'));
console.log(`Imported ${Object.keys(records).length} metadata records for ${Object.keys(catalog).length} Forge50 IDs; no media copied.`);
