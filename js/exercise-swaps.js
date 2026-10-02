/* Offline swap metadata keyed by stable Forge50 IDs. Apparatus categories require
   the appropriate attachment/machine; alternatives are not identical movements. */
'use strict';
window.ExerciseSwaps={
 equipment:{"dumbbells": "Dumbbells", "bench": "Bench", "barbell": "Barbell", "ez-bar": "EZ-bar", "cable": "Cable station", "machine": "Resistance machines", "assisted-pull-up": "Assisted pull-up machine"},
 patterns:{"horizontal-press": "Horizontal press", "vertical-press": "Overhead press", "chest-fly": "Chest fly", "horizontal-pull": "Row", "vertical-pull": "Vertical pull", "straight-arm-pull": "Straight-arm pull", "lateral-raise": "Lateral raise", "front-raise": "Front raise", "rear-delt-fly": "Rear-delt fly", "face-pull": "Face pull", "elbow-flexion": "Curl", "elbow-extension": "Triceps extension", "hip-hinge": "Hip hinge", "knee-extension": "Knee extension", "knee-flexion": "Leg curl", "calf-raise": "Calf raise", "trunk-flexion": "Ab crunch", "anti-rotation": "Anti-rotation"},
 metadata:{
 "cable-chest-press": [
  {
   "pattern": "horizontal-press",
   "equipment": [
    "cable"
   ]
  }
 ],
 "incline-dumbbell-press": [
  {
   "pattern": "horizontal-press",
   "equipment": [
    "dumbbells",
    "bench"
   ]
  }
 ],
 "flat-dumbbell-press": [
  {
   "pattern": "horizontal-press",
   "equipment": [
    "dumbbells",
    "bench"
   ]
  }
 ],
 "machine-lower-chest-press": [
  {
   "pattern": "horizontal-press",
   "equipment": [
    "machine"
   ]
  }
 ],
 "close-grip-barbell-bench-press": [
  {
   "pattern": "horizontal-press",
   "equipment": [
    "barbell",
    "bench"
   ]
  }
 ],
 "high-to-low-cable-fly": [
  {
   "pattern": "chest-fly",
   "equipment": [
    "cable"
   ]
  }
 ],
 "low-to-high-cable-fly": [
  {
   "pattern": "chest-fly",
   "equipment": [
    "cable"
   ]
  }
 ],
 "straight-arm-pulldown": [
  {
   "pattern": "straight-arm-pull",
   "equipment": [
    "cable"
   ]
  }
 ],
 "lat-pulldown": [
  {
   "pattern": "vertical-pull",
   "equipment": [
    "machine"
   ]
  }
 ],
 "chest-supported-row": [
  {
   "pattern": "horizontal-pull",
   "equipment": [
    "machine"
   ]
  },
  {
   "pattern": "horizontal-pull",
   "equipment": [
    "dumbbells",
    "bench"
   ]
  }
 ],
 "seated-cable-row": [
  {
   "pattern": "horizontal-pull",
   "equipment": [
    "cable"
   ]
  }
 ],
 "single-arm-cable-row": [
  {
   "pattern": "horizontal-pull",
   "equipment": [
    "cable"
   ]
  }
 ],
 "high-row-machine": [
  {
   "pattern": "horizontal-pull",
   "equipment": [
    "machine"
   ]
  }
 ],
 "high-row-machine-assisted-pull-up": [
  {
   "pattern": "horizontal-pull",
   "equipment": [
    "machine"
   ]
  },
  {
   "pattern": "vertical-pull",
   "equipment": [
    "assisted-pull-up"
   ]
  }
 ],
 "cable-lateral-raise": [
  {
   "pattern": "lateral-raise",
   "equipment": [
    "cable"
   ]
  }
 ],
 "dumbbell-lateral-raise": [
  {
   "pattern": "lateral-raise",
   "equipment": [
    "dumbbells"
   ]
  }
 ],
 "machine-lateral-raise": [
  {
   "pattern": "lateral-raise",
   "equipment": [
    "machine"
   ]
  }
 ],
 "dumbbell-shoulder-press": [
  {
   "pattern": "vertical-press",
   "equipment": [
    "dumbbells",
    "bench"
   ]
  }
 ],
 "reverse-pec-deck": [
  {
   "pattern": "rear-delt-fly",
   "equipment": [
    "machine"
   ]
  }
 ],
 "seated-machine-front-raise": [
  {
   "pattern": "front-raise",
   "equipment": [
    "machine"
   ]
  }
 ],
 "high-face-pull": [
  {
   "pattern": "face-pull",
   "equipment": [
    "cable"
   ]
  }
 ],
 "machine-ab-crunch": [
  {
   "pattern": "trunk-flexion",
   "equipment": [
    "machine"
   ]
  }
 ],
 "cable-crunch": [
  {
   "pattern": "trunk-flexion",
   "equipment": [
    "cable"
   ]
  }
 ],
 "pallof-press": [
  {
   "pattern": "anti-rotation",
   "equipment": [
    "cable"
   ]
  }
 ],
 "romanian-deadlift": [
  {
   "pattern": "hip-hinge",
   "equipment": [
    "barbell"
   ]
  },
  {
   "pattern": "hip-hinge",
   "equipment": [
    "dumbbells"
   ]
  }
 ],
 "skull-crushers": [
  {
   "pattern": "elbow-extension",
   "equipment": [
    "ez-bar",
    "bench"
   ]
  },
  {
   "pattern": "elbow-extension",
   "equipment": [
    "dumbbells",
    "bench"
   ]
  }
 ],
 "rope-triceps-pushdown": [
  {
   "pattern": "elbow-extension",
   "equipment": [
    "cable"
   ]
  }
 ],
 "reverse-grip-cable-triceps-pushdown": [
  {
   "pattern": "elbow-extension",
   "equipment": [
    "cable"
   ]
  }
 ],
 "overhead-cable-triceps-extension": [
  {
   "pattern": "elbow-extension",
   "equipment": [
    "cable"
   ]
  }
 ],
 "triceps-extension-machine": [
  {
   "pattern": "elbow-extension",
   "equipment": [
    "machine"
   ]
  }
 ],
 "ez-bar-curl": [
  {
   "pattern": "elbow-flexion",
   "equipment": [
    "ez-bar"
   ]
  }
 ],
 "incline-dumbbell-curl": [
  {
   "pattern": "elbow-flexion",
   "equipment": [
    "dumbbells",
    "bench"
   ]
  }
 ],
 "hammer-curl": [
  {
   "pattern": "elbow-flexion",
   "equipment": [
    "dumbbells"
   ]
  }
 ],
 "preacher-curl": [
  {
   "pattern": "elbow-flexion",
   "equipment": [
    "ez-bar",
    "bench"
   ]
  },
  {
   "pattern": "elbow-flexion",
   "equipment": [
    "machine"
   ]
  }
 ],
 "cable-curl": [
  {
   "pattern": "elbow-flexion",
   "equipment": [
    "cable"
   ]
  }
 ],
 "leg-press": [
  {
   "pattern": "knee-extension",
   "equipment": [
    "machine"
   ]
  }
 ],
 "leg-extension": [
  {
   "pattern": "knee-extension",
   "equipment": [
    "machine"
   ]
  }
 ],
 "seated-leg-curl": [
  {
   "pattern": "knee-flexion",
   "equipment": [
    "machine"
   ]
  }
 ],
 "machine-calf-raise": [
  {
   "pattern": "calf-raise",
   "equipment": [
    "machine"
   ]
  }
 ]
},
 sourcePatterns(id){return [...new Set((this.metadata[id]||[]).map(v=>v.pattern))];},
 variants(id,sourceId,filters){
  const available=new Set(filters.equipment||[]),source=this.sourcePatterns(sourceId);
  return (this.metadata[id]||[]).filter(v=>v.equipment.every(e=>available.has(e))&&(filters.pattern==='any'||(filters.pattern==='same'?source.includes(v.pattern):v.pattern===filters.pattern)));
 },
 filter(options,source,filters){
  const sourcePatterns=this.sourcePatterns(source.id),sourceEquipment=new Set(this.variants(source.id,source.id,{...filters,pattern:'any'}).flatMap(v=>v.equipment));
  const score=e=>Math.max(...this.variants(e.id,source.id,filters).map(v=>(sourcePatterns.includes(v.pattern)?100:0)+v.equipment.filter(x=>sourceEquipment.has(x)).length));
  return options.filter(e=>e.muscle===source.muscle&&this.variants(e.id,source.id,filters).length).sort((a,b)=>score(b)-score(a)||a.name.localeCompare(b.name));
 },
 describe(id,sourceId,filters){return this.variants(id,sourceId,filters).map(v=>this.patterns[v.pattern]+' · '+v.equipment.map(e=>this.equipment[e]).join(' + ')).join(' / ');}
};
