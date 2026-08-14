// ==========================================
// ⚒ FORGE50 v0.8 — Updated Training Program
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

back:22,

sideDelts:15,

rearDelts:6,

triceps:20,

biceps:14,

hamstrings:3,

quads:5,

abs:3

},

workouts:{

sunday:{

title:"Sunday — Chest + Triceps + Abs",

focus:[
"Chest",
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
name:"High-to-Low Cable Fly",
sets:3,
reps:"12-15",
rir:1,
rest:"90 sec",
notes:"Lower and mid chest emphasis."
},

{
name:"Low-to-High Cable Fly",
sets:3,
reps:"12-15",
rir:1,
rest:"90 sec",
notes:"Upper chest and clavicular fibres."
},

{
name:"Machine Lower Chest Press",
sets:3,
reps:"8-12",
rir:2,
rest:"2 min",
notes:"Lower chest pressing movement."
},

{
name:"Close-Grip Barbell Bench Press",
sets:3,
reps:"6-10",
rir:2,
rest:"2-3 min",
notes:"Heavy triceps compound with chest contribution."
},

{
name:"Skull Crushers",
sets:3,
reps:"8-12",
rir:1,
rest:"90 sec",
notes:"Triceps extension with strong long-head loading."
},

{
name:"Rope Triceps Pushdown",
sets:3,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Lateral and medial triceps heads."
},

{
name:"Reverse-Grip Cable Triceps Pushdown",
sets:2,
reps:"12-15",
rir:1,
rest:"60 sec",
notes:"Additional medial-head emphasis."
},

{
name:"Cable Crunch",
sets:3,
reps:"12-20",
rir:1,
rest:"60 sec",
notes:"Upper abs."
}

]

},

tuesday:{

title:"Tuesday — Back + Biceps + Posterior Chain",

focus:[
"Posterior Chain",
"Back",
"Biceps"
],

exercises:[

{
name:"Romanian Deadlift",
sets:3,
reps:"6-10",
rir:2,
rest:"3 min",
notes:"Primary posterior chain movement."
},

{
name:"Lat Pulldown",
sets:4,
reps:"8-12",
rir:2,
rest:"2 min",
notes:"Lat width and vertical pulling strength."
},

{
name:"Chest-Supported Row",
sets:4,
reps:"8-12",
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
name:"EZ-Bar Curl",
sets:3,
reps:"8-12",
rir:1,
rest:"90 sec",
notes:"Primary overall biceps movement."
},

{
name:"Incline Dumbbell Curl",
sets:3,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Long-head emphasis."
},

{
name:"Preacher Curl",
sets:3,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Strict biceps work with shortened shoulder position."
}

]

},

thursday:{

title:"Thursday — Shoulders + Triceps",

focus:[
"Shoulders",
"Triceps"
],

exercises:[

{
name:"Dumbbell Shoulder Press",
sets:4,
reps:"6-10",
rir:2,
rest:"2-3 min",
notes:"Primary shoulder compound."
},

{
name:"Dumbbell Lateral Raise",
sets:3,
reps:"12-20",
rir:1,
rest:"60 sec",
notes:"Medial delts."
},

{
name:"Reverse Pec Deck",
sets:3,
reps:"12-20",
rir:1,
rest:"60 sec",
notes:"Rear delts."
},

{
name:"Seated Machine Front Raise",
sets:2,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Anterior delts."
},

{
name:"Machine Lateral Raise",
sets:3,
reps:"12-20",
rir:1,
rest:"60 sec",
notes:"Additional medial-delt volume."
},

{
name:"Overhead Cable Triceps Extension",
sets:3,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Long-head emphasis."
},

{
name:"Rope Triceps Pushdown",
sets:3,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Lateral and medial triceps heads."
},

{
name:"Triceps Extension Machine",
sets:3,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Controlled triceps isolation."
}

]

},

friday:{

title:"Friday — Back + Biceps + Lower Body",

focus:[
"Back",
"Biceps",
"Lower Body"
],

exercises:[

{
name:"High Row Machine / Assisted Pull-Up",
sets:3,
reps:"6-10",
rir:2,
rest:"2-3 min",
notes:"Upper-back thickness and lat width."
},

{
name:"Chest-Supported Row",
sets:3,
reps:"8-12",
rir:2,
rest:"2 min",
notes:"Upper back thickness."
},

{
name:"Single-Arm Cable Row",
sets:3,
reps:"10-15",
rir:1,
rest:"90 sec",
notes:"Unilateral back and lat work."
},

{
name:"High Face Pull",
sets:3,
reps:"12-20",
rir:1,
rest:"60 sec",
notes:"Rear delts, upper back and external rotators."
},

{
name:"EZ-Bar Curl",
sets:3,
reps:"8-12",
rir:1,
rest:"90 sec",
notes:"Overall biceps loading."
},

{
name:"Cable Curl",
sets:3,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Constant-tension biceps work."
},

{
name:"Hammer Curl",
sets:2,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Brachialis, brachioradialis and biceps."
},

{
name:"Leg Press",
sets:3,
reps:"10-15",
rir:2,
rest:"2 min",
notes:"Quad-focused lower-body work."
},

{
name:"Seated Leg Curl",
sets:3,
reps:"10-15",
rir:1,
rest:"90 sec",
notes:"Hamstring work."
},

{
name:"Leg Extension",
sets:2,
reps:"12-15",
rir:1,
rest:"60 sec",
notes:"Direct quadriceps isolation."
},

{
name:"Machine Calf Raise",
sets:3,
reps:"10-15",
rir:1,
rest:"60 sec",
notes:"Calf development."
}

]

}

}

};
