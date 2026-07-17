// ==========================================
// ⚒ FORGE50 v0.5
// Workout Database
// ==========================================

const appData = {

profile:{

name:"Kenjo",

age:50,

height:180,

weight:81.6,

goal:"Upper Body Hypertrophy Specialization"

},

weeklyVolume:{

chest:16,

back:18,

shoulders:12,

triceps:18,

biceps:14,

posteriorChain:4,

quads:6,

hamstrings:3,

abs:12

},

workouts:{

sunday:{

title:"Sunday",

focus:[
"Chest",
"Side Delts",
"Rear Delts",
"Triceps",
"Abs"
],

exercises:[

{
name:"Incline Dumbbell Press",
sets:4,
reps:"6-10",
rir:2,
rest:"2-3 min",
notes:"Primary upper chest movement."
},

{
name:"Machine Chest Press",
sets:3,
reps:"8-10",
rir:2,
rest:"2 min",
notes:"Heavy machine press."
},

{
name:"High-to-Low Cable Fly",
sets:3,
reps:"12-15",
rir:1,
rest:"90 sec",
notes:"Stretch and squeeze."
},

{
name:"Cable Lateral Raise",
sets:3,
reps:"12-15",
rir:1,
rest:"60 sec",
notes:"Side delts."
},

{
name:"Reverse Pec Deck",
sets:3,
reps:"12-15",
rir:1,
rest:"60 sec",
notes:"Rear delts."
},

{
name:"Overhead Cable Triceps Extension",
sets:3,
reps:"10-12",
rir:1,
rest:"90 sec",
notes:"Long head."
},

{
name:"Rope Pushdown",
sets:3,
reps:"12-15",
rir:1,
rest:"60 sec",
notes:"Lateral & medial heads."
},

{
name:"Single-Arm Cable Pushdown",
sets:3,
reps:"12-15",
rir:1,
rest:"60 sec",
notes:"Finish each arm independently."
},

{
name:"Hanging Knee Raise",
sets:3,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Lower abs."
},

{
name:"Cable Crunch",
sets:3,
reps:"12-15",
rir:1,
rest:"60 sec",
notes:"Upper abs."
}

]

},

tuesday:{

title:"Tuesday",

focus:[
"Posterior Chain",
"Back",
"Biceps"
],

exercises:[{
name:"Romanian Deadlift",
sets:4,
reps:"6-10",
rir:2,
rest:"3 min",
notes:"Primary posterior chain movement."
},

{
name:"Pull-up / Wide-Grip Lat Pulldown",
sets:4,
reps:"6-10",
rir:2,
rest:"2-3 min",
notes:"Primary width movement."
},

{
name:"Chest Supported Row",
sets:4,
reps:"8-10",
rir:2,
rest:"2 min",
notes:"Upper back thickness."
},

{
name:"Seated Cable Row",
sets:3,
reps:"10-12",
rir:1,
rest:"90 sec",
notes:"Mid-back contraction."
},

{
name:"Straight Arm Pulldown",
sets:3,
reps:"12-15",
rir:1,
rest:"60 sec",
notes:"Lat isolation."
},

{
name:"Incline Dumbbell Curl",
sets:4,
reps:"8-12",
rir:1,
rest:"90 sec",
notes:"Long head emphasis."
},

{
name:"Bayesian Cable Curl",
sets:3,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Peak contraction."
}

]

},

wednesday:{

title:"Wednesday / Thursday",

focus:[
"Shoulders",
"Chest",
"Triceps",
"Abs"
],

exercises:[{
name:"Seated Dumbbell Shoulder Press",
sets:4,
reps:"6-10",
rir:2,
rest:"2-3 min",
notes:"Primary shoulder movement."
},

{
name:"Dumbbell Lateral Raise",
sets:3,
reps:"12-15",
rir:1,
rest:"60 sec",
notes:"Side delts."
},

{
name:"Face Pull",
sets:2,
reps:"12-15",
rir:1,
rest:"60 sec",
notes:"Rear delts and rotator cuff."
},

{
name:"Incline Machine Press",
sets:3,
reps:"8-12",
rir:2,
rest:"2 min",
notes:"Upper chest."
},

{
name:"Pec Deck Fly",
sets:3,
reps:"12-15",
rir:1,
rest:"60 sec",
notes:"Chest isolation."
},

{
name:"Close-Grip Smith Machine Press",
sets:3,
reps:"8-10",
rir:2,
rest:"2 min",
notes:"Heavy triceps compound."
},

{
name:"Cable Overhead Triceps Extension",
sets:3,
reps:"10-12",
rir:1,
rest:"90 sec",
notes:"Long head emphasis."
},

{
name:"Ab Wheel Rollout",
sets:3,
reps:"8-12",
rir:1,
rest:"60 sec",
notes:"Core stability."
},

{
name:"Cable Wood Chop",
sets:3,
reps:"12-15 / side",
rir:1,
rest:"60 sec",
notes:"Obliques."
}

]

},

friday:{

title:"Friday",

focus:[
"Back",
"Biceps",
"Legs"
],

exercises:[{
name:"Wide-Grip Lat Pulldown",
sets:4,
reps:"10-12",
rir:2,
rest:"2 min",
notes:"Primary lat width movement."
},

{
name:"One-Arm Dumbbell Row",
sets:4,
reps:"8-10",
rir:2,
rest:"2 min",
notes:"Back thickness."
},

{
name:"Preacher Curl",
sets:4,
reps:"8-12",
rir:1,
rest:"90 sec",
notes:"Primary biceps movement."
},

{
name:"Hammer Curl",
sets:3,
reps:"10-12",
rir:1,
rest:"60 sec",
notes:"Brachialis and brachioradialis."
},

{
name:"Leg Press",
sets:3,
reps:"10-12",
rir:2,
rest:"2 min",
notes:"Primary quad movement."
},

{
name:"Leg Curl",
sets:3,
reps:"12-15",
rir:1,
rest:"90 sec",
notes:"Hamstrings."
},

{
name:"Leg Extension",
sets:3,
reps:"12-15",
rir:1,
rest:"90 sec",
notes:"Quad isolation."
}

]

}

}

};