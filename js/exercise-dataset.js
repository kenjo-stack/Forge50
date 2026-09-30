/* Read-only bridge: Forge50 IDs stay authoritative for routines and history. */
(() => {
 'use strict';
 const data=window.ForgeExerciseDatasetData;
 const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const canonical=value=>({shoulders:'delts',deltoids:'delts','rear deltoids':'rear delts',trapezius:'traps',pectorals:'chest','pectoralis major':'chest'}[value]||value);
 function get(id){const mapping=data?.mappings&&Object.hasOwn(data.mappings,id)?data.mappings[id]:null;return mapping?{...mapping,records:mapping.datasetIds.map(key=>data.records[key]).filter(Boolean)}:null;}
 function profile(id){const mapped=get(id);if(!mapped)return null;return {targets:[...new Set(mapped.records.map(r=>canonical(r.target)))],secondary:[...new Set(mapped.records.flatMap(r=>r.secondaryMuscles).map(canonical))],equipment:mapped.equipmentOverride?[mapped.equipmentOverride]:[...new Set(mapped.records.map(r=>r.equipment))]};}
 function alternatives(id,candidates,equipment='any'){
  const source=profile(id);
  return candidates.map(exercise=>{
   const p=profile(exercise.id),sameTarget=!!(source&&p?.targets.some(t=>source.targets.includes(t))),sameEquipment=!!(source&&p?.equipment.some(e=>source.equipment.includes(e)));
   const shared=source&&p?p.secondary.filter(s=>source.secondary.includes(s)).length:0;
   return {exercise,target:p?.targets.join(' / ')||exercise.muscle,secondary:p?.secondary||[],equipment:p?.equipment||[],score:(sameTarget?8:0)+(sameEquipment?3:0)+shared,reasons:[...(sameTarget?['Same dataset target']:[]),...(sameEquipment?['Same equipment']:[]),...(shared?['Shared secondary muscles']:[])]};
  }).filter(item=>equipment==='any'||item.equipment.includes(equipment)).sort((a,b)=>b.score-a.score||a.exercise.name.localeCompare(b.exercise.name));
 }
 function metadataHTML(id){const mapped=get(id);if(!mapped)return '';
  return `<section class="forge50-guide-section dataset-metadata"><h3>EXERCISE REFERENCE</h3>${mapped.match!=='exact'?`<p class="forge50-guide-note">${escape(mapped.note)}</p>`:''}${mapped.records.map(record=>`<div class="dataset-record"><h4>${escape(record.name)}</h4><dl><dt>Target</dt><dd>${escape(record.target)}</dd><dt>Secondary muscles</dt><dd>${escape(record.secondaryMuscles.join(', ')||'Not listed')}</dd><dt>Reference equipment</dt><dd>${escape(record.equipment)}</dd></dl><details><summary>Reference instructions${mapped.match==='exact'?'':' (variant)'}</summary><ol>${record.instructions.map(step=>`<li>${escape(step)}</li>`).join('')}</ol></details></div>`).join('')}<p class="small">Exercise metadata and instructions: <a href="https://github.com/hasaneyldrm/exercises-dataset" target="_blank" rel="noopener">Exercises Dataset</a> · MIT. Your workout exercise and targets stay as shown in Forge50.</p></section>`;
 }
 window.ExerciseDataset={get,profile,alternatives,metadataHTML,source:data?.source};
})();
