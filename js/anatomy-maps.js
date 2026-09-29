/* Named anatomical surfaces, shared by the renderer and coverage checks. */
(() => {
  'use strict';
  const regions={
    upperChest:/clavicular part of .* pectoralis major/,
    lowerChest:/(abdominal|sternocostal) part of .* pectoralis major/,
    chest:/pectoralis major/,
    frontDelts:/clavicular part of .* deltoid/,
    sideDelts:/acromial part of .* deltoid/,
    rearDelts:/spinal part of .* deltoid/,
    triceps:/triceps brachii/,
    tricepsLong:/long head of .* triceps brachii/,
    tricepsOuter:/(lateral|medial) head of .* triceps brachii/,
    tricepsMedial:/medial head of .* triceps brachii/,
    tricepsLateral:/lateral head of .* triceps brachii/,
    biceps:/biceps brachii/,
    bicepsLong:/long head of .* biceps brachii/,
    brachialis:/ (left|right) brachialis$|^(left|right) brachialis$/,
    forearms:/brachioradialis|carpi|extensor digitorum$|flexor digitorum superficialis/,
    lats:/latissimus dorsi/,
    teres:/teres major/,
    midBack:/rhomboid|(?:transverse|ascending) part of .* trapezius/,
    upperTraps:/descending part of .* trapezius/,
    rotatorCuff:/infraspinatus|teres minor/,
    abs:/rectus abdominis/,
    obliques:/external oblique/,
    erectors:/iliocostalis|longissimus thoracis|spinalis thoracis/,
    glutes:/gluteus maximus/,
    hamstrings:/biceps femoris|semitendinosus|semimembranosus/,
    quads:/rectus femoris|vastus/,
    adductors:/adductor (brevis|longus|magnus)/,
    calves:/gastrocnemius|soleus/,
    ankle:/tibialis|fibularis/
  };
  // [view, framing, primary regions, assisting regions, focus regions]
  const rows={
    'incline-dumbbell-press':['front','upper','upperChest','frontDelts,triceps','upperChest'],
    'high-to-low-cable-fly':['front','upper','lowerChest','frontDelts','lowerChest'],
    'low-to-high-cable-fly':['front','upper','upperChest','frontDelts','upperChest'],
    'machine-lower-chest-press':['front','upper','lowerChest','frontDelts,triceps','lowerChest'],
    'close-grip-barbell-bench-press':['back','upper','triceps','chest,frontDelts','triceps'],
    'skull-crushers':['back','upper','tricepsLong','tricepsOuter','tricepsLong'],
    'rope-triceps-pushdown':['back','upper','tricepsOuter','tricepsLong','tricepsOuter'],
    'reverse-grip-cable-triceps-pushdown':['back','upper','tricepsMedial','tricepsLateral,forearms','tricepsMedial'],
    'cable-crunch':['front','core','abs','obliques','abs'],
    'pallof-press':['front','core','obliques,abs','sideDelts','obliques'],
    'romanian-deadlift':['back','lower','hamstrings,glutes','erectors,adductors','hamstrings,glutes'],
    'lat-pulldown':['back','upper','lats','biceps,teres,midBack,rearDelts','lats'],
    'chest-supported-row':['back','upper','midBack,upperTraps','lats,rearDelts,biceps','midBack'],
    'seated-cable-row':['back','upper','midBack','lats,rearDelts,biceps','midBack'],
    'ez-bar-curl':['front','upper','biceps','brachialis,forearms','biceps'],
    'incline-dumbbell-curl':['front','upper','biceps','brachialis,forearms','bicepsLong'],
    'preacher-curl':['front','upper','biceps','brachialis,forearms','biceps'],
    'dumbbell-shoulder-press':['front','upper','frontDelts','sideDelts,triceps','frontDelts'],
    'dumbbell-lateral-raise':['front','upper','sideDelts','frontDelts,upperTraps','sideDelts'],
    'reverse-pec-deck':['back','upper','rearDelts','midBack','rearDelts'],
    'seated-machine-front-raise':['front','upper','frontDelts','upperChest','frontDelts'],
    'machine-lateral-raise':['front','upper','sideDelts','upperTraps','sideDelts'],
    'overhead-cable-triceps-extension':['back','upper','tricepsLong','tricepsOuter','tricepsLong'],
    'triceps-extension-machine':['back','upper','triceps','','triceps'],
    'high-row-machine-assisted-pull-up':['back','upper','lats,midBack','biceps,rearDelts,teres','lats,midBack'],
    'high-row-machine':['back','upper','midBack','lats,rearDelts,biceps','midBack'],
    'single-arm-cable-row':['back','upper','lats,midBack','rearDelts,biceps,obliques','lats'],
    'high-face-pull':['back','upper','rearDelts','midBack,rotatorCuff','rearDelts'],
    'cable-curl':['front','upper','biceps','brachialis,forearms','biceps'],
    'hammer-curl':['front','upper','brachialis,biceps','forearms','brachialis'],
    'leg-press':['front','lower','quads','glutes,hamstrings,adductors','quads'],
    'seated-leg-curl':['back','lower','hamstrings','calves','hamstrings'],
    'leg-extension':['front','lower','quads','','quads'],
    'machine-calf-raise':['back','calves','calves','ankle','calves']
  };
  const split=s=>s?s.split(','):[];
  const exercises=Object.fromEntries(Object.entries(rows).map(([id,[view,frame,p,s,f]])=>[id,{view,frame,primary:split(p),secondary:split(s),focus:split(f)}]));
  function select(id,parts){
    const cfg=exercises[id];if(!cfg)return null;
    const matches=(part,keys)=>!part.bone&&keys.some(key=>regions[key].test(part.name));
    const primary=parts.filter(p=>matches(p,cfg.primary));
    return {...cfg,primary,secondary:parts.filter(p=>matches(p,cfg.secondary)&&!primary.includes(p)),focus:parts.filter(p=>matches(p,cfg.focus))};
  }
  function historyFor(part,state){
    if(!part||part.bone)return null;
    const related=Object.keys(exercises).flatMap(id=>{
      const match=select(id,[part]);
      const role=match.primary.length?'Primary':match.secondary.length?'Secondary':null;
      return role?[{id,name:window.ForgeDefaults?.catalog?.[id]?.name||id,role}]:[];
    });
    const matches=new Set(related.map(x=>x.id));
    const recent=(state?.sessions||[]).filter(s=>s.type==='lifting'&&s.status==='completed'&&!s.legacy)
      .flatMap(s=>s.exercises.filter(e=>matches.has(e.id)&&e.sets.some(set=>set.done)).map(e=>({date:s.date,finishedAt:s.finishedAt||'',name:e.name,sets:e.sets.filter(set=>set.done).map(set=>({weight:set.weight,reps:set.reps}))})))
      .sort((a,b)=>b.date.localeCompare(a.date)||b.finishedAt.localeCompare(a.finishedAt)).slice(0,5);
    return {name:part.name.replace(/\b\w/g,c=>c.toUpperCase()),related,recent};
  }
  window.AnatomyMaps={regions,exercises,select,historyFor};
})();
