// FORGE50 v2.7 defaults. User changes are stored separately.
window.ForgeDefaults = {
  "profile": {
    "name": "Kenjo",
    "age": 50,
    "height": 180,
    "weight": 81.6,
    "goal": "Upper Body Hypertrophy Specialization"
  },
  "catalog": {
    "incline-dumbbell-fly": {"id": "incline-dumbbell-fly", "name": "Incline Dumbbell Fly", "sets": 3, "reps": "10-15", "rir": 2, "rest": "90 sec", "notes": "Use a controlled arc and comfortable shoulder range. Record weight per dumbbell.", "muscle": "Chest", "increment": 0.5, "weightMode": "per-dumbbell", "restSeconds": 90},
    "hack-squat": {"id": "hack-squat", "name": "Hack Squat", "sets": 3, "reps": "8-12", "rir": 2, "rest": "3 min", "notes": "Controlled machine squat. Record the added plate load consistently; machine resistance varies.", "muscle": "Quads", "increment": 2.5, "weightMode": "total", "restSeconds": 180},
    "cable-chest-press": {"id": "cable-chest-press", "name": "Cable Chest Press", "sets": 3, "reps": "8-12", "rir": 2, "rest": "2 min", "notes": "Adjustable pressing path for chest.", "muscle": "Chest", "increment": 1, "weightMode": "total", "restSeconds": 120},
    "straight-arm-pulldown": {"id": "straight-arm-pulldown", "name": "Straight-Arm Cable Pulldown", "sets": 3, "reps": "10-15", "rir": 2, "rest": "90 sec", "notes": "Lat work with minimal elbow flexion.", "muscle": "Back", "increment": 1, "weightMode": "total", "restSeconds": 90},
    "cable-lateral-raise": {"id": "cable-lateral-raise", "name": "Cable Lateral Raise", "sets": 3, "reps": "12-20", "rir": 2, "rest": "90 sec", "notes": "Side deltoid isolation with adjustable cable height.", "muscle": "Shoulders", "increment": 0.5, "weightMode": "total", "restSeconds": 90},
    "machine-ab-crunch": {"id": "machine-ab-crunch", "name": "Machine Ab Crunch", "sets": 3, "reps": "10-15", "rir": 2, "rest": "90 sec", "notes": "Adjustable resistance for the abdominals.", "muscle": "Abs", "increment": 1, "weightMode": "total", "restSeconds": 90},
    "incline-dumbbell-press": {
      "id": "incline-dumbbell-press",
      "name": "Incline Dumbbell Press",
      "sets": 4,
      "reps": "6-10",
      "rir": 2,
      "rest": "2-3 min",
      "notes": "Primary upper chest movement.",
      "muscle": "Chest",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 180
    },
    "high-to-low-cable-fly": {
      "id": "high-to-low-cable-fly",
      "name": "High-to-Low Cable Fly",
      "sets": 3,
      "reps": "12-15",
      "rir": 1,
      "rest": "90 sec",
      "notes": "Lower and mid chest emphasis.",
      "muscle": "Chest",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 90
    },
    "low-to-high-cable-fly": {
      "id": "low-to-high-cable-fly",
      "name": "Low-to-High Cable Fly",
      "sets": 3,
      "reps": "12-15",
      "rir": 1,
      "rest": "90 sec",
      "notes": "Upper chest and clavicular fibres.",
      "muscle": "Chest",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 90
    },
    "machine-lower-chest-press": {
      "id": "machine-lower-chest-press",
      "name": "Machine Lower Chest Press",
      "sets": 3,
      "reps": "8-12",
      "rir": 2,
      "rest": "2 min",
      "notes": "Lower chest pressing movement.",
      "muscle": "Chest",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 120
    },
    "close-grip-barbell-bench-press": {
      "id": "close-grip-barbell-bench-press",
      "name": "Close-Grip Barbell Bench Press",
      "sets": 3,
      "reps": "6-10",
      "rir": 2,
      "rest": "2-3 min",
      "notes": "Heavy triceps compound with chest contribution.",
      "muscle": "Triceps",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 180
    },
    "skull-crushers": {
      "id": "skull-crushers",
      "name": "Skull Crushers",
      "sets": 3,
      "reps": "8-12",
      "rir": 1,
      "rest": "90 sec",
      "notes": "Triceps extension with strong long-head loading.",
      "muscle": "Triceps",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 90
    },
    "rope-triceps-pushdown": {
      "id": "rope-triceps-pushdown",
      "name": "Rope Triceps Pushdown",
      "sets": 3,
      "reps": "10-15",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Lateral and medial triceps heads.",
      "muscle": "Triceps",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "reverse-grip-cable-triceps-pushdown": {
      "id": "reverse-grip-cable-triceps-pushdown",
      "name": "Reverse-Grip Cable Triceps Pushdown",
      "sets": 2,
      "reps": "12-15",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Additional medial-head emphasis.",
      "muscle": "Triceps",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "cable-crunch": {
      "id": "cable-crunch",
      "name": "Cable Crunch",
      "sets": 3,
      "reps": "12-20",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Upper abs.",
      "muscle": "Abs",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "romanian-deadlift": {
      "id": "romanian-deadlift",
      "name": "Romanian Deadlift",
      "sets": 3,
      "reps": "6-10",
      "rir": 2,
      "rest": "3 min",
      "notes": "Primary posterior chain movement.",
      "muscle": "Hamstrings",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 180
    },
    "lat-pulldown": {
      "id": "lat-pulldown",
      "name": "Lat Pulldown",
      "sets": 4,
      "reps": "8-12",
      "rir": 2,
      "rest": "2 min",
      "notes": "Lat width and vertical pulling strength.",
      "muscle": "Back",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 120
    },
    "chest-supported-row": {
      "id": "chest-supported-row",
      "name": "Chest-Supported Row",
      "sets": 3,
      "reps": "8-12",
      "rir": 2,
      "rest": "2 min",
      "notes": "Upper back thickness.",
      "muscle": "Back",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 120
    },
    "seated-cable-row": {
      "id": "seated-cable-row",
      "name": "Seated Cable Row",
      "sets": 3,
      "reps": "10-12",
      "rir": 1,
      "rest": "90 sec",
      "notes": "Mid-back contraction.",
      "muscle": "Back",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 90
    },
    "ez-bar-curl": {
      "id": "ez-bar-curl",
      "name": "EZ-Bar Curl",
      "sets": 3,
      "reps": "8-12",
      "rir": 1,
      "rest": "90 sec",
      "notes": "Overall biceps loading.",
      "muscle": "Biceps",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 90
    },
    "incline-dumbbell-curl": {
      "id": "incline-dumbbell-curl",
      "name": "Incline Dumbbell Curl",
      "sets": 3,
      "reps": "10-15",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Long-head emphasis.",
      "muscle": "Biceps",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "preacher-curl": {
      "id": "preacher-curl",
      "name": "Preacher Curl",
      "sets": 3,
      "reps": "10-15",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Strict biceps work with shortened shoulder position.",
      "muscle": "Biceps",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "dumbbell-shoulder-press": {
      "id": "dumbbell-shoulder-press",
      "name": "Dumbbell Shoulder Press",
      "sets": 4,
      "reps": "6-10",
      "rir": 2,
      "rest": "2-3 min",
      "notes": "Primary shoulder compound.",
      "muscle": "Shoulders",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 180
    },
    "dumbbell-lateral-raise": {
      "id": "dumbbell-lateral-raise",
      "name": "Dumbbell Lateral Raise",
      "sets": 3,
      "reps": "12-20",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Medial delts.",
      "muscle": "Shoulders",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "reverse-pec-deck": {
      "id": "reverse-pec-deck",
      "name": "Reverse Pec Deck",
      "sets": 3,
      "reps": "12-20",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Rear delts.",
      "muscle": "Shoulders",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "seated-machine-front-raise": {
      "id": "seated-machine-front-raise",
      "name": "Seated Machine Front Raise",
      "sets": 2,
      "reps": "10-15",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Anterior delts.",
      "muscle": "Shoulders",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "machine-lateral-raise": {
      "id": "machine-lateral-raise",
      "name": "Machine Lateral Raise",
      "sets": 3,
      "reps": "12-20",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Additional medial-delt volume.",
      "muscle": "Shoulders",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "overhead-cable-triceps-extension": {
      "id": "overhead-cable-triceps-extension",
      "name": "Overhead Cable Triceps Extension",
      "sets": 3,
      "reps": "10-15",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Long-head emphasis.",
      "muscle": "Triceps",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "triceps-extension-machine": {
      "id": "triceps-extension-machine",
      "name": "Triceps Extension Machine",
      "sets": 3,
      "reps": "10-15",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Controlled triceps isolation.",
      "muscle": "Triceps",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "high-row-machine-assisted-pull-up": {
      "id": "high-row-machine-assisted-pull-up",
      "name": "High Row Machine / Assisted Pull-Up",
      "sets": 3,
      "reps": "6-10",
      "rir": 2,
      "rest": "2-3 min",
      "notes": "Upper-back thickness and lat width.",
      "muscle": "Back",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 180
    },
    "single-arm-cable-row": {
      "id": "single-arm-cable-row",
      "name": "Single-Arm Cable Row",
      "sets": 3,
      "reps": "10-15",
      "rir": 1,
      "rest": "90 sec",
      "notes": "Unilateral back and lat work.",
      "muscle": "Back",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 90
    },
    "high-face-pull": {
      "id": "high-face-pull",
      "name": "High Face Pull",
      "sets": 3,
      "reps": "12-20",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Rear delts, upper back and external rotators.",
      "muscle": "Shoulders",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "cable-curl": {
      "id": "cable-curl",
      "name": "Cable Curl",
      "sets": 3,
      "reps": "10-15",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Constant-tension biceps work.",
      "muscle": "Biceps",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "hammer-curl": {
      "id": "hammer-curl",
      "name": "Hammer Curl",
      "sets": 2,
      "reps": "10-15",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Brachialis, brachioradialis and biceps.",
      "muscle": "Biceps",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "leg-press": {
      "id": "leg-press",
      "name": "Leg Press",
      "sets": 3,
      "reps": "10-15",
      "rir": 2,
      "rest": "2 min",
      "notes": "Quad-focused lower-body work.",
      "muscle": "Quads",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 120
    },
    "seated-leg-curl": {
      "id": "seated-leg-curl",
      "name": "Seated Leg Curl",
      "sets": 3,
      "reps": "10-15",
      "rir": 1,
      "rest": "90 sec",
      "notes": "Hamstring work.",
      "muscle": "Hamstrings",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 90
    },
    "leg-extension": {
      "id": "leg-extension",
      "name": "Leg Extension",
      "sets": 2,
      "reps": "12-15",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Direct quadriceps isolation.",
      "muscle": "Quads",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "machine-calf-raise": {
      "id": "machine-calf-raise",
      "name": "Machine Calf Raise",
      "sets": 3,
      "reps": "10-15",
      "rir": 1,
      "rest": "60 sec",
      "notes": "Calf development.",
      "muscle": "Calves",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 60
    },
    "high-row-machine": {
      "id": "high-row-machine",
      "name": "High Row Machine",
      "sets": 3,
      "reps": "10-15",
      "rir": 2,
      "rest": "2 min",
      "notes": "Upper-back emphasis. Use a comfortable grip.",
      "muscle": "Back",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 120
    },
    "pallof-press": {
      "id": "pallof-press",
      "name": "Pallof Press",
      "sets": 3,
      "reps": "10-15",
      "rir": 2,
      "rest": "90 sec",
      "notes": "Anti-rotation core work; perform the reps on each side.",
      "muscle": "Abs",
      "increment": 1,
      "weightMode": "total",
      "restSeconds": 90
    },
    "flat-dumbbell-press": {
      "id": "flat-dumbbell-press",
      "name": "Flat Dumbbell Press",
      "sets": 3,
      "reps": "8-12",
      "rir": 2,
      "rest": "150 sec",
      "notes": "Mid-chest press. Use only a comfortable shoulder range.",
      "muscle": "Chest",
      "increment": 1,
      "weightMode": "per-dumbbell",
      "restSeconds": 150
    }
  },
  "templates": {
    "chest": {
      "id": "chest",
      "title": "Chest + triceps",
      "exercises": [
        {
          "id": "incline-dumbbell-press",
          "name": "Incline Dumbbell Press",
          "sets": 4,
          "reps": "8-12",
          "rir": 2,
          "rest": "180 sec",
          "notes": "Primary upper chest movement.",
          "muscle": "Chest",
          "increment": 1,
          "weightMode": "per-dumbbell",
          "restSeconds": 180
        },
        {"id": "incline-dumbbell-fly", "name": "Incline Dumbbell Fly", "sets": 3, "reps": "10-15", "rir": 2, "rest": "90 sec", "notes": "Use a controlled arc and comfortable shoulder range. Record weight per dumbbell.", "muscle": "Chest", "increment": 0.5, "weightMode": "per-dumbbell", "restSeconds": 90},
        {
          "id": "flat-dumbbell-press",
          "name": "Flat Dumbbell Press",
          "sets": 3,
          "reps": "8-12",
          "rir": 2,
          "rest": "150 sec",
          "notes": "Mid-chest press. Use only a comfortable shoulder range.",
          "muscle": "Chest",
          "increment": 1,
          "weightMode": "per-dumbbell",
          "restSeconds": 150
        },
        {
          "id": "machine-lower-chest-press",
          "name": "Machine Lower Chest Press",
          "sets": 3,
          "reps": "8-12",
          "rir": 2,
          "rest": "150 sec",
          "notes": "Lower chest pressing movement.",
          "muscle": "Chest",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 150
        },
        {
          "id": "high-to-low-cable-fly",
          "name": "High-to-Low Cable Fly",
          "sets": 3,
          "reps": "12-15",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Lower and mid chest emphasis.",
          "muscle": "Chest",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90
        },
        {
          "id": "low-to-high-cable-fly",
          "name": "Low-to-High Cable Fly",
          "sets": 2,
          "reps": "12-15",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Upper chest and clavicular fibres.",
          "muscle": "Chest",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90
        },
        {
          "id": "rope-triceps-pushdown",
          "name": "Rope Triceps Pushdown",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Lateral and medial triceps heads.",
          "muscle": "Triceps",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90
        },
        {
          "id": "overhead-cable-triceps-extension",
          "name": "Overhead Cable Triceps Extension",
          "sets": 3,
          "reps": "10-15",
          "rir": 2,
          "rest": "90 sec",
          "notes": "Long-head emphasis.",
          "muscle": "Triceps",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90,
          "optional": true
        },
        {
          "id": "triceps-extension-machine",
          "name": "Triceps Extension Machine",
          "sets": 2,
          "reps": "10-15",
          "rir": 2,
          "rest": "90 sec",
          "notes": "Controlled triceps isolation.",
          "muscle": "Triceps",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90,
          "optional": true
        }
      ]
    },
    "back": {
      "id": "back",
      "title": "Back + biceps",
      "exercises": [
        {
          "id": "lat-pulldown",
          "name": "Lat Pulldown",
          "sets": 4,
          "reps": "8-12",
          "rir": 2,
          "rest": "150 sec",
          "notes": "Lat width and vertical pulling strength.",
          "muscle": "Back",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 150
        },
        {
          "id": "chest-supported-row",
          "name": "Chest-Supported Row",
          "sets": 3,
          "reps": "8-12",
          "rir": 2,
          "rest": "150 sec",
          "notes": "Upper back thickness.",
          "muscle": "Back",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 150
        },
        {
          "id": "high-row-machine",
          "name": "High Row Machine",
          "sets": 3,
          "reps": "10-15",
          "rir": 2,
          "rest": "120 sec",
          "notes": "Upper-back emphasis. Use a comfortable grip.",
          "muscle": "Back",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 120
        },
        {
          "id": "seated-cable-row",
          "name": "Seated Cable Row",
          "sets": 3,
          "reps": "10-15",
          "rir": 2,
          "rest": "120 sec",
          "notes": "Mid-back contraction.",
          "muscle": "Back",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 120
        },
        {
          "id": "single-arm-cable-row",
          "name": "Single-Arm Cable Row",
          "sets": 2,
          "reps": "10-15",
          "rir": 2,
          "rest": "90 sec",
          "notes": "Unilateral back and lat work.",
          "muscle": "Back",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90,
          "optional": true
        },
        {
          "id": "cable-curl",
          "name": "Cable Curl",
          "sets": 3,
          "reps": "10-15",
          "rir": 2,
          "rest": "90 sec",
          "notes": "Constant-tension biceps work.",
          "muscle": "Biceps",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90
        },
        {
          "id": "ez-bar-curl",
          "name": "EZ-Bar Curl",
          "sets": 2,
          "reps": "10-15",
          "rir": 2,
          "rest": "90 sec",
          "notes": "Overall biceps loading.",
          "muscle": "Biceps",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90,
          "optional": true
        },
        {
          "id": "incline-dumbbell-curl",
          "name": "Incline Dumbbell Curl",
          "sets": 2,
          "reps": "10-15",
          "rir": 2,
          "rest": "90 sec",
          "notes": "Long-head emphasis.",
          "muscle": "Biceps",
          "increment": 1,
          "weightMode": "per-dumbbell",
          "restSeconds": 90,
          "optional": true
        }
      ]
    },
    "shoulders": {
      "id": "shoulders",
      "title": "Shoulders + upper back + abs",
      "exercises": [
        {
          "id": "dumbbell-shoulder-press",
          "name": "Dumbbell Shoulder Press",
          "sets": 3,
          "reps": "8-12",
          "rir": 2,
          "rest": "180 sec",
          "notes": "Primary shoulder compound.",
          "muscle": "Shoulders",
          "increment": 1,
          "weightMode": "per-dumbbell",
          "restSeconds": 180
        },
        {
          "id": "machine-lateral-raise",
          "name": "Machine Lateral Raise",
          "sets": 3,
          "reps": "12-20",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Additional medial-delt volume.",
          "muscle": "Shoulders",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90
        },
        {
          "id": "dumbbell-lateral-raise",
          "name": "Dumbbell Lateral Raise",
          "sets": 2,
          "reps": "12-20",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Medial delts.",
          "muscle": "Shoulders",
          "increment": 1,
          "weightMode": "per-dumbbell",
          "restSeconds": 90,
          "optional": true
        },
        {
          "id": "reverse-pec-deck",
          "name": "Reverse Pec Deck",
          "sets": 3,
          "reps": "12-20",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Rear delts.",
          "muscle": "Shoulders",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90
        },
        {
          "id": "high-face-pull",
          "name": "High Face Pull",
          "sets": 3,
          "reps": "12-20",
          "rir": 2,
          "rest": "90 sec",
          "notes": "Rear delts, upper back and external rotators.",
          "muscle": "Shoulders",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90,
          "optional": true
        },
        {
          "id": "high-row-machine",
          "name": "High Row Machine",
          "sets": 3,
          "reps": "10-15",
          "rir": 2,
          "rest": "120 sec",
          "notes": "Upper-back emphasis. Use a comfortable grip.",
          "muscle": "Back",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 120
        },
        {
          "id": "cable-crunch",
          "name": "Cable Crunch",
          "sets": 3,
          "reps": "12-20",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Upper abs.",
          "muscle": "Abs",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90
        },
        {
          "id": "pallof-press",
          "name": "Pallof Press",
          "sets": 3,
          "reps": "10-15",
          "rir": 2,
          "rest": "90 sec",
          "notes": "Anti-rotation core work; perform the reps on each side.",
          "muscle": "Abs",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90
        }
      ]
    },
    "legs": {
      "id": "legs",
      "title": "Legs · optional",
      "exercises": [
        {
          "id": "romanian-deadlift",
          "name": "Romanian Deadlift",
          "sets": 3,
          "reps": "6-10",
          "rir": 2,
          "rest": "3 min",
          "notes": "Primary posterior chain movement.",
          "muscle": "Hamstrings",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 180
        },
        {"id": "hack-squat", "name": "Hack Squat", "sets": 3, "reps": "8-12", "rir": 2, "rest": "3 min", "notes": "Controlled machine squat. Record the added plate load consistently; machine resistance varies.", "muscle": "Quads", "increment": 2.5, "weightMode": "total", "restSeconds": 180},
        {
          "id": "leg-press",
          "name": "Leg Press",
          "sets": 3,
          "reps": "10-15",
          "rir": 2,
          "rest": "2 min",
          "notes": "Quad-focused lower-body work.",
          "muscle": "Quads",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 120
        },
        {
          "id": "seated-leg-curl",
          "name": "Seated Leg Curl",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Hamstring work.",
          "muscle": "Hamstrings",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 90
        },
        {
          "id": "leg-extension",
          "name": "Leg Extension",
          "sets": 2,
          "reps": "12-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Direct quadriceps isolation.",
          "muscle": "Quads",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 60
        },
        {
          "id": "machine-calf-raise",
          "name": "Machine Calf Raise",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Calf development.",
          "muscle": "Calves",
          "increment": 1,
          "weightMode": "total",
          "restSeconds": 60
        }
      ]
    }
  },
  "legacyWorkouts": {
    "sunday": {
      "title": "Sunday — Chest + Triceps + Abs",
      "focus": [
        "Chest",
        "Triceps",
        "Abs"
      ],
      "exercises": [
        {
          "name": "Incline Dumbbell Press",
          "sets": 4,
          "reps": "6-10",
          "rir": 2,
          "rest": "2-3 min",
          "notes": "Primary upper chest movement."
        },
        {
          "name": "High-to-Low Cable Fly",
          "sets": 3,
          "reps": "12-15",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Lower and mid chest emphasis."
        },
        {
          "name": "Low-to-High Cable Fly",
          "sets": 3,
          "reps": "12-15",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Upper chest and clavicular fibres."
        },
        {
          "name": "Machine Lower Chest Press",
          "sets": 3,
          "reps": "8-12",
          "rir": 2,
          "rest": "2 min",
          "notes": "Lower chest pressing movement."
        },
        {
          "name": "Close-Grip Barbell Bench Press",
          "sets": 3,
          "reps": "6-10",
          "rir": 2,
          "rest": "2-3 min",
          "notes": "Heavy triceps compound with chest contribution."
        },
        {
          "name": "Skull Crushers",
          "sets": 3,
          "reps": "8-12",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Triceps extension with strong long-head loading."
        },
        {
          "name": "Rope Triceps Pushdown",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Lateral and medial triceps heads."
        },
        {
          "name": "Reverse-Grip Cable Triceps Pushdown",
          "sets": 2,
          "reps": "12-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Additional medial-head emphasis."
        },
        {
          "name": "Cable Crunch",
          "sets": 3,
          "reps": "12-20",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Upper abs."
        }
      ]
    },
    "tuesday": {
      "title": "Tuesday — Back + Biceps + Posterior Chain",
      "focus": [
        "Posterior Chain",
        "Back",
        "Biceps"
      ],
      "exercises": [
        {
          "name": "Romanian Deadlift",
          "sets": 3,
          "reps": "6-10",
          "rir": 2,
          "rest": "3 min",
          "notes": "Primary posterior chain movement."
        },
        {
          "name": "Lat Pulldown",
          "sets": 4,
          "reps": "8-12",
          "rir": 2,
          "rest": "2 min",
          "notes": "Lat width and vertical pulling strength."
        },
        {
          "name": "Chest-Supported Row",
          "sets": 4,
          "reps": "8-12",
          "rir": 2,
          "rest": "2 min",
          "notes": "Upper back thickness."
        },
        {
          "name": "Seated Cable Row",
          "sets": 3,
          "reps": "10-12",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Mid-back contraction."
        },
        {
          "name": "EZ-Bar Curl",
          "sets": 3,
          "reps": "8-12",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Primary overall biceps movement."
        },
        {
          "name": "Incline Dumbbell Curl",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Long-head emphasis."
        },
        {
          "name": "Preacher Curl",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Strict biceps work with shortened shoulder position."
        }
      ]
    },
    "thursday": {
      "title": "Thursday — Shoulders + Triceps",
      "focus": [
        "Shoulders",
        "Triceps"
      ],
      "exercises": [
        {
          "name": "Dumbbell Shoulder Press",
          "sets": 4,
          "reps": "6-10",
          "rir": 2,
          "rest": "2-3 min",
          "notes": "Primary shoulder compound."
        },
        {
          "name": "Dumbbell Lateral Raise",
          "sets": 3,
          "reps": "12-20",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Medial delts."
        },
        {
          "name": "Reverse Pec Deck",
          "sets": 3,
          "reps": "12-20",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Rear delts."
        },
        {
          "name": "Seated Machine Front Raise",
          "sets": 2,
          "reps": "10-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Anterior delts."
        },
        {
          "name": "Machine Lateral Raise",
          "sets": 3,
          "reps": "12-20",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Additional medial-delt volume."
        },
        {
          "name": "Overhead Cable Triceps Extension",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Long-head emphasis."
        },
        {
          "name": "Rope Triceps Pushdown",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Lateral and medial triceps heads."
        },
        {
          "name": "Triceps Extension Machine",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Controlled triceps isolation."
        }
      ]
    },
    "friday": {
      "title": "Friday — Back + Biceps + Lower Body",
      "focus": [
        "Back",
        "Biceps",
        "Lower Body"
      ],
      "exercises": [
        {
          "name": "High Row Machine / Assisted Pull-Up",
          "sets": 3,
          "reps": "6-10",
          "rir": 2,
          "rest": "2-3 min",
          "notes": "Upper-back thickness and lat width."
        },
        {
          "name": "Chest-Supported Row",
          "sets": 3,
          "reps": "8-12",
          "rir": 2,
          "rest": "2 min",
          "notes": "Upper back thickness."
        },
        {
          "name": "Single-Arm Cable Row",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Unilateral back and lat work."
        },
        {
          "name": "High Face Pull",
          "sets": 3,
          "reps": "12-20",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Rear delts, upper back and external rotators."
        },
        {
          "name": "EZ-Bar Curl",
          "sets": 3,
          "reps": "8-12",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Overall biceps loading."
        },
        {
          "name": "Cable Curl",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Constant-tension biceps work."
        },
        {
          "name": "Hammer Curl",
          "sets": 2,
          "reps": "10-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Brachialis, brachioradialis and biceps."
        },
        {
          "name": "Leg Press",
          "sets": 3,
          "reps": "10-15",
          "rir": 2,
          "rest": "2 min",
          "notes": "Quad-focused lower-body work."
        },
        {
          "name": "Seated Leg Curl",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "90 sec",
          "notes": "Hamstring work."
        },
        {
          "name": "Leg Extension",
          "sets": 2,
          "reps": "12-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Direct quadriceps isolation."
        },
        {
          "name": "Machine Calf Raise",
          "sets": 3,
          "reps": "10-15",
          "rir": 1,
          "rest": "60 sec",
          "notes": "Calf development."
        }
      ]
    }
  }
};
