/* Muscle illustrations grouped by shared anatomy. */
(() => {
  const maps = {
    'incline-dumbbell-press':'upper-chest',
    'high-to-low-cable-fly':'lower-chest',
    'low-to-high-cable-fly':'upper-chest',
    'machine-lower-chest-press':'lower-chest',
    'close-grip-barbell-bench-press':'triceps',
    'skull-crushers':'triceps',
    'rope-triceps-pushdown':'triceps',
    'reverse-grip-cable-triceps-pushdown':'triceps',
    'cable-crunch':'abs',
    'romanian-deadlift':'posterior-chain',
    'lat-pulldown':'lats',
    'chest-supported-row':'mid-back',
    'seated-cable-row':'mid-back',
    'ez-bar-curl':'biceps',
    'incline-dumbbell-curl':'biceps',
    'preacher-curl':'biceps',
    'dumbbell-shoulder-press':'front-delts',
    'dumbbell-lateral-raise':'side-delts',
    'reverse-pec-deck':'rear-delts',
    'seated-machine-front-raise':'front-delts',
    'machine-lateral-raise':'side-delts',
    'overhead-cable-triceps-extension':'triceps',
    'triceps-extension-machine':'triceps',
    'high-row-machine-assisted-pull-up':'lats',
    'single-arm-cable-row':'lats',
    'high-face-pull':'rear-delts',
    'cable-curl':'biceps',
    'hammer-curl':'brachialis',
    'leg-press':'quads',
    'seated-leg-curl':'hamstrings',
    'leg-extension':'quads',
    'machine-calf-raise':'calves'
  };
  const arrows={
    'upper-chest':['M 550 460 Q 490 410 395 400','M 572 460 Q 632 410 727 400'],
    'lower-chest':['M 550 670 Q 455 675 350 625','M 572 670 Q 667 675 772 625'],
    triceps:['M 365 720 Q 320 660 275 575','M 757 720 Q 802 660 847 575'],
    abs:['M 545 1030 L 545 805','M 590 1030 L 590 805'],
    'posterior-chain':['M 420 570 L 400 700','M 700 570 L 720 700'],
    lats:['M 400 680 Q 345 665 285 650','M 722 680 Q 777 665 837 650'],
    'mid-back':['M 320 515 Q 400 470 475 470','M 802 515 Q 722 470 647 470'],
    biceps:['M 245 650 L 265 520','M 877 650 L 857 520'],
    'front-delts':['M 240 650 L 260 520','M 882 650 L 862 520'],
    'side-delts':['M 240 700 L 150 590','M 882 700 L 972 590'],
    'rear-delts':['M 230 605 L 250 480','M 892 605 L 872 480'],
    quads:['M 345 690 L 345 515','M 777 690 L 777 515'],
    hamstrings:['M 385 470 L 385 595','M 737 470 L 737 595'],
    calves:['M 355 740 L 355 535','M 767 740 L 767 535'],
    brachialis:['M 210 735 L 225 565','M 912 735 L 897 565']
  };
  function render(id) {
    const group=maps[id];
    if (!group) return '';
    const src='assets/muscle-guides/'+group+'.webp';
    const paths=arrows[group].map(d=>'<path d="'+d+'"/>').join('');
    return '<figure class="muscle-diagram"><div class="muscle-art"><img src="'+src+'" alt="Anatomy illustration showing primary muscles in orange, secondary muscles in blue, and training focus in purple" loading="lazy" width="1122" height="1402"><svg class="muscle-arrows" viewBox="0 0 1122 1402" aria-hidden="true"><defs><marker id="muscle-arrowhead" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M 0 1 L 10 6 L 0 11 Z" fill="#cc83f5"/></marker></defs>'+paths+'</svg></div><figcaption><span><i class="muscle-key primary"></i>Primary</span><span><i class="muscle-key secondary"></i>Secondary</span><span><i class="muscle-key focus"></i>Training focus</span></figcaption></figure>';
  }
  window.MuscleDiagrams={render,maps};
})();
