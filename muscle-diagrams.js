/* Anatomical overlays for every exercise in the default catalog. Coordinates
   refer to the paired 1122 × 1402 front/back reference illustrations. */
(() => {
  const regions = {
    front: {
      upperChest:[[450,270,95,40,-12],[672,270,95,40,12]],
      chest:[[450,305,103,75,-13],[672,305,103,75,13]],
      lowerChest:[[453,335,100,44,-12],[669,335,100,44,12]],
      frontDelts:[[368,284,46,73,-29],[754,284,46,73,29]],
      sideDelts:[[342,291,34,76,-18],[780,291,34,76,18]],
      biceps:[[341,412,42,77,-16],[781,412,42,77,16]],
      brachialis:[[323,431,21,52,-15],[799,431,21,52,15]],
      forearms:[[295,543,43,90,-16],[827,543,43,90,16]],
      abs:[[560,462,88,117,0]],
      obliques:[[457,477,32,88,-7],[665,477,32,88,7]],
      quads:[[444,794,75,151,-7],[678,794,75,151,7]],
      adductors:[[507,776,24,91,-14],[615,776,24,91,14]],
      calves:[[445,1092,45,112,-5],[677,1092,45,112,5]],
    },
    back: {
      lats:[[449,461,89,151,-16],[673,461,89,151,16]],
      teres:[[424,360,47,43,-17],[698,360,47,43,17]],
      midBack:[[503,343,76,101,-14],[619,343,76,101,14]],
      upperTraps:[[530,261,91,92,-22],[592,261,91,92,22]],
      lowerTraps:[[561,412,75,89,0]],
      rearDelts:[[361,312,55,65,-28],[761,312,55,65,28]],
      sideDelts:[[340,294,35,68,-23],[782,294,35,68,23]],
      triceps:[[344,416,45,89,-16],[778,416,45,89,16]],
      tricepsLong:[[363,409,28,80,-16],[759,409,28,80,16]],
      tricepsMedial:[[327,446,24,48,-16],[795,446,24,48,16]],
      forearms:[[300,548,46,90,-16],[822,548,46,90,16]],
      erectors:[[534,566,23,118,0],[588,566,23,118,0]],
      glutes:[[477,723,67,91,-12],[645,723,67,91,12]],
      hamstrings:[[454,888,58,142,-6],[668,888,58,142,6]],
      calves:[[448,1103,43,117,-5],[674,1103,43,117,5]],
    }
  };
  // Orange: primary work; blue: assisting muscles; purple: training emphasis.
  const maps = {
    'incline-dumbbell-press':['front','upperChest','frontDelts,triceps','upperChest'],
    'high-to-low-cable-fly':['front','lowerChest','frontDelts','lowerChest'],
    'low-to-high-cable-fly':['front','upperChest','frontDelts','upperChest'],
    'machine-lower-chest-press':['front','lowerChest','frontDelts,triceps','lowerChest'],
    'close-grip-barbell-bench-press':['back','triceps','chest,frontDelts','triceps'],
    'skull-crushers':['back','tricepsLong,triceps','forearms','tricepsLong'],
    'rope-triceps-pushdown':['back','triceps,tricepsMedial','forearms','triceps'],
    'reverse-grip-cable-triceps-pushdown':['back','tricepsMedial','triceps,forearms','tricepsMedial'],
    'cable-crunch':['front','abs','obliques','abs'],
    'romanian-deadlift':['back','hamstrings,glutes','erectors,adductors','hamstrings'],
    'lat-pulldown':['back','lats','biceps,teres,rearDelts,midBack','lats'],
    'chest-supported-row':['back','midBack,upperTraps','lats,rearDelts,biceps','midBack'],
    'seated-cable-row':['back','midBack','lats,rearDelts,biceps','midBack'],
    'ez-bar-curl':['front','biceps','brachialis,forearms','biceps'],
    'incline-dumbbell-curl':['front','biceps','brachialis,forearms','biceps'],
    'preacher-curl':['front','biceps','brachialis,forearms','biceps'],
    'dumbbell-shoulder-press':['front','frontDelts','sideDelts,triceps','frontDelts'],
    'dumbbell-lateral-raise':['front','sideDelts','frontDelts,upperTraps','sideDelts'],
    'reverse-pec-deck':['back','rearDelts','midBack,lowerTraps','rearDelts'],
    'seated-machine-front-raise':['front','frontDelts','upperChest','frontDelts'],
    'machine-lateral-raise':['front','sideDelts','upperTraps','sideDelts'],
    'overhead-cable-triceps-extension':['back','tricepsLong','triceps','tricepsLong'],
    'triceps-extension-machine':['back','triceps','','triceps'],
    'high-row-machine-assisted-pull-up':['back','lats,midBack','biceps,rearDelts,teres','lats'],
    'single-arm-cable-row':['back','lats,midBack','rearDelts,biceps,obliques','lats'],
    'high-face-pull':['back','rearDelts','midBack,lowerTraps','rearDelts'],
    'cable-curl':['front','biceps','brachialis,forearms','biceps'],
    'hammer-curl':['front','brachialis,biceps','forearms','brachialis'],
    'leg-press':['front','quads','glutes,hamstrings,adductors','quads'],
    'seated-leg-curl':['back','hamstrings','calves','hamstrings'],
    'leg-extension':['front','quads','','quads'],
    'machine-calf-raise':['back','calves','','calves'],
  };
  const names = list => list ? list.split(',') : [];
  function marks(keys, side, kind) {
    return keys.flatMap(key => (regions[side][key] || []).map(([cx,cy,rx,ry,angle]) =>
      `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${angle} ${cx} ${cy})" class="muscle-mark ${kind}"/>`)).join('');
  }
  function figure(side, primary, secondary, focus) {
    const secondaryOnly = secondary.filter(key => !primary.includes(key));
    return `<svg class="muscle-figure" viewBox="0 0 1122 1402" role="img" aria-label="${side} anatomy; orange primary, blue secondary, purple training focus" xmlns="http://www.w3.org/2000/svg"><image href="assets/muscle-guides/${side}.webp" width="1122" height="1402"/>${marks(secondaryOnly,side,'secondary')}${marks(primary,side,'primary')}${marks(focus,side,'focus')}</svg>`;
  }
  function render(id) {
    const row = maps[id];
    if (!row) return '';
    const [main, a, b, c] = row, primary=names(a), secondary=names(b), focus=names(c);
    const other = main==='front'?'back':'front';
    const hasOther = [...primary,...secondary].some(key => !!regions[other][key]);
    return `<div class="muscle-diagram" aria-label="Muscle diagram for exercise"><div class="muscle-diagram-figures"><div class="muscle-main">${figure(main,primary,secondary,focus)}<span>${main.toUpperCase()}</span></div>${hasOther?`<div class="muscle-other">${figure(other,primary,secondary,focus)}<span>${other.toUpperCase()}</span></div>`:''}</div><div class="muscle-legend"><span><i class="muscle-key primary"></i>Primary</span><span><i class="muscle-key secondary"></i>Secondary</span><span><i class="muscle-key focus"></i>Training focus</span></div><p>Highlighted areas are an approximate anatomy guide. The purple outline marks the emphasized area.</p></div>`;
  }
  window.MuscleDiagrams={render,maps};
})();
