/* Offline swap metadata keyed by stable Forge50 IDs. Apparatus categories require
   the appropriate attachment/machine; alternatives are not identical movements. */
'use strict';
window.ExerciseSwaps={
 oldbury:{name:'JD Gyms Oldbury',equipment:['dumbbells','bench','barbell','cable','machine','assisted-pull-up'],source:'https://www.jdgyms.co.uk/gym/oldbury/',checked:'2 October 2026'},
 equipment:{"dumbbells": "Dumbbells", "bench": "Bench", "barbell": "Barbell", "ez-bar": "EZ-bar", "cable": "Cable station", "machine": "Resistance machines", "assisted-pull-up": "Assisted pull-up machine"},
 patterns:{"horizontal-press": "Horizontal press", "vertical-press": "Overhead press", "chest-fly": "Chest fly", "horizontal-pull": "Row", "vertical-pull": "Vertical pull", "straight-arm-pull": "Straight-arm pull", "lateral-raise": "Lateral raise", "front-raise": "Front raise", "rear-delt-fly": "Rear-delt fly", "face-pull": "Face pull", "elbow-flexion": "Curl", "elbow-extension": "Triceps extension", "hip-hinge": "Hip hinge", "knee-extension": "Knee extension", "knee-flexion": "Leg curl", "calf-raise": "Calf raise", "trunk-flexion": "Ab crunch", "anti-rotation": "Anti-rotation"},
 metadata:{
    "machine-chest-press": [
    {
      "pattern": "horizontal-press",
      "equipment": [
        "machine"
      ]
    }
  ],
  "dumbbell-floor-press": [
    {
      "pattern": "horizontal-press",
      "equipment": [
        "dumbbells"
      ]
    }
  ],
  "flat-dumbbell-fly": [
    {
      "pattern": "chest-fly",
      "equipment": [
        "dumbbells",
        "bench"
      ]
    }
  ],
  "pec-deck-fly": [
    {
      "pattern": "chest-fly",
      "equipment": [
        "machine"
      ]
    }
  ],
  "machine-shoulder-press": [
    {
      "pattern": "vertical-press",
      "equipment": [
        "machine"
      ]
    }
  ],
  "seated-barbell-shoulder-press": [
    {
      "pattern": "vertical-press",
      "equipment": [
        "barbell",
        "bench"
      ]
    }
  ],
  "leaning-dumbbell-lateral-raise": [
    {
      "pattern": "lateral-raise",
      "equipment": [
        "dumbbells"
      ]
    }
  ],
  "bent-over-dumbbell-reverse-fly": [
    {
      "pattern": "rear-delt-fly",
      "equipment": [
        "dumbbells"
      ]
    }
  ],
  "cable-rear-delt-fly": [
    {
      "pattern": "rear-delt-fly",
      "equipment": [
        "cable"
      ]
    }
  ],
  "rope-face-pull": [
    {
      "pattern": "face-pull",
      "equipment": [
        "cable"
      ]
    }
  ],
  "seated-cable-face-pull": [
    {
      "pattern": "face-pull",
      "equipment": [
        "cable",
        "bench"
      ]
    }
  ],
  "one-arm-dumbbell-row": [
    {
      "pattern": "horizontal-pull",
      "equipment": [
        "dumbbells",
        "bench"
      ]
    }
  ],
  "neutral-grip-lat-pulldown": [
    {
      "pattern": "vertical-pull",
      "equipment": [
        "machine"
      ]
    }
  ],
  "lying-cable-pullover": [
    {
      "pattern": "straight-arm-pull",
      "equipment": [
        "cable",
        "bench"
      ]
    }
  ],
  "dumbbell-pullover": [
    {
      "pattern": "straight-arm-pull",
      "equipment": [
        "dumbbells",
        "bench"
      ]
    }
  ],
  "standing-dumbbell-curl": [
    {
      "pattern": "elbow-flexion",
      "equipment": [
        "dumbbells"
      ]
    }
  ],
  "dumbbell-overhead-triceps-extension": [
    {
      "pattern": "elbow-extension",
      "equipment": [
        "dumbbells"
      ]
    }
  ],
  "close-grip-machine-chest-press": [
    {
      "pattern": "horizontal-press",
      "equipment": [
        "machine"
      ]
    }
  ],
  "dumbbell-front-raise": [
    {
      "pattern": "front-raise",
      "equipment": [
        "dumbbells"
      ]
    }
  ],
  "cable-front-raise": [
    {
      "pattern": "front-raise",
      "equipment": [
        "cable"
      ]
    }
  ],
  "dumbbell-romanian-deadlift": [
    {
      "pattern": "hip-hinge",
      "equipment": [
        "dumbbells"
      ]
    }
  ],
  "cable-pull-through": [
    {
      "pattern": "hip-hinge",
      "equipment": [
        "cable"
      ]
    }
  ],
  "goblet-squat": [
    {
      "pattern": "knee-extension",
      "equipment": [
        "dumbbells"
      ]
    }
  ],
  "smith-machine-squat": [
    {
      "pattern": "knee-extension",
      "equipment": [
        "machine"
      ]
    }
  ],
  "single-leg-extension": [
    {
      "pattern": "knee-extension",
      "equipment": [
        "machine"
      ]
    }
  ],
  "cable-leg-extension": [
    {
      "pattern": "knee-extension",
      "equipment": [
        "cable",
        "bench"
      ]
    }
  ],
  "lying-leg-curl": [
    {
      "pattern": "knee-flexion",
      "equipment": [
        "machine"
      ]
    }
  ],
  "standing-leg-curl": [
    {
      "pattern": "knee-flexion",
      "equipment": [
        "machine"
      ]
    }
  ],
  "standing-dumbbell-calf-raise": [
    {
      "pattern": "calf-raise",
      "equipment": [
        "dumbbells"
      ]
    }
  ],
  "seated-calf-raise": [
    {
      "pattern": "calf-raise",
      "equipment": [
        "machine"
      ]
    }
  ],
  "decline-crunch": [
    {
      "pattern": "trunk-flexion",
      "equipment": [
        "bench"
      ]
    }
  ],
  "tall-kneeling-pallof-press": [
    {
      "pattern": "anti-rotation",
      "equipment": [
        "cable"
      ]
    }
  ],
  "half-kneeling-pallof-press": [
    {
      "pattern": "anti-rotation",
      "equipment": [
        "cable"
      ]
    }
  ],

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
 "incline-dumbbell-fly": [{"pattern":"chest-fly","equipment":["dumbbells","bench"]}],
 "hack-squat": [{"pattern":"knee-extension","equipment":["machine"]}],
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
