/* Isolated, opt-in Gym visual adapter. Never loads media while disabled. */
(() => {
 'use strict';
 const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function enabled(){const config=window.ForgeExerciseMediaConfig;return config?.enabled===true&&typeof config.licenseReference==='string'&&config.licenseReference.trim().length>0&&/^assets\/licensed-exercise-media\/$/.test(config.basePath);}
 function render(id){const mapped=window.ExerciseDataset?.get(id);if(!mapped)return '<p>No demonstration is mapped for this custom exercise.</p>';
  if(!enabled())return '<section class="forge50-guide-section"><h3>DEMONSTRATION</h3><p>Animated demonstrations are not available in this build. Use the Technique and Muscles tabs for guidance.</p></section>';
  return `<section class="forge50-guide-section exercise-demo" data-demo-root data-forge-id="${escape(id)}"><h3>DEMONSTRATION</h3>${mapped.match!=='exact'?`<p class="forge50-guide-note">${escape(mapped.note)}</p>`:''}<label>Dataset reference<select data-demo-record>${mapped.records.map(r=>`<option value="${escape(r.id)}">${escape(r.name)}</option>`).join('')}</select></label><div class="demo-stage" aria-live="polite"><p data-demo-status>Tap Play animation to load the demonstration.</p><img data-demo-image width="180" height="180" alt="Exercise demonstration" hidden></div><div class="demo-actions"><button type="button" data-demo-play>Play animation</button><button type="button" data-demo-stop>Stop animation</button></div><p class="small">© Gym visual — <a href="https://gymvisual.com/" target="_blank" rel="noopener">https://gymvisual.com/</a></p></section>`;
 }
 function mount(root){if(!root||root.dataset.demoMounted||!enabled())return;root.dataset.demoMounted='true';
  const image=root.querySelector('[data-demo-image]'),status=root.querySelector('[data-demo-status]'),select=root.querySelector('[data-demo-record]');
  function show(animation){if(!enabled())return;const media=window.ForgeExerciseMediaManifest?.[select.value],record=window.ForgeExerciseDatasetData?.records[select.value];if(!media||!record)return;
   const path=animation?media.animation:media.image;if(!/^(videos|images)\/[0-9]+-[A-Za-z0-9]+\.(gif|jpg)$/.test(path))return;
   image.alt=(animation?'Animated demonstration: ':'Exercise preview: ')+record.name;image.src=window.ForgeExerciseMediaConfig.basePath+path.split('/').pop();image.hidden=false;status.textContent=animation?'Animation playing':'Animation stopped';
  }
  root.querySelector('[data-demo-play]').addEventListener('click',()=>show(true));root.querySelector('[data-demo-stop]').addEventListener('click',()=>{image.removeAttribute('src');image.hidden=true;status.textContent='Animation stopped';});
  select.addEventListener('change',()=>{image.removeAttribute('src');image.hidden=true;status.textContent='Tap Play animation to load this reference.';});
  image.addEventListener('error',()=>{image.removeAttribute('src');image.hidden=true;status.textContent='Demonstration unavailable. Technique instructions are still available.';});
 }
 function stop(root){root?.querySelectorAll('[data-demo-image]').forEach(image=>{image.removeAttribute('src');image.hidden=true;const status=image.closest('[data-demo-root]')?.querySelector('[data-demo-status]');if(status)status.textContent='Animation stopped';});}
 window.ExerciseDatasetMedia={enabled,render,mount,stop};
})();
