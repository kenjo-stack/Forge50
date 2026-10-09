// ==========================================
// ⚒ FORGE50 v1.5 — Exercise Guides
// Text-first guide cards for every exercise.
// No exercise images. Fully offline.
// ==========================================

const ExerciseGuides = {
  guides: {
    "Machine Seated Row (Chest-Supported)": {
      focus:"Mid/upper-back thickness",
      primary:"Rhomboids and middle trapezius", secondary:"Lats, rear delts, biceps",
      setup:"Sit facing the weight stack with your chest against the upright pad and feet on the foot supports. Adjust the seat and chest pad so the handles are at lower-chest height and you can reach them with a neutral spine. Select a light starting load.",
      perform:"Hold the neutral or horizontal grips and keep your chest on the pad. Pull the handles towards your lower ribs, driving the elbows back without shrugging. Pause briefly, then return slowly until your arms are comfortably extended. Let your shoulder blades move while your torso stays still.",
      cues:["Chest stays against the pad","Pull elbows back towards the ribs","Keep shoulders away from ears","Return under control"],
      mistakes:"Lifting away from the chest pad, rocking backwards, shrugging, jerking the handles, or locking the elbows at the reach.",
      equipment:"Seated chest-supported row machine, such as the Matrix machine shown"
    },
    "Machine Chest Press": {
    "focus": "Horizontal press",
    "primary": "Pectoralis major",
    "secondary": "Triceps and front deltoids",
    "setup": "Adjust the seat so the handles are around mid-chest height. Keep your feet planted and your back supported.",
    "perform": "Press the handles forward without lifting your shoulders or locking your elbows. Return slowly through a comfortable range.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Chest press machine"
  },
  "Dumbbell Floor Press": {
    "focus": "Horizontal press",
    "primary": "Pectoralis major",
    "secondary": "Triceps and front deltoids",
    "setup": "Lie on the floor with knees bent and feet planted. Hold the dumbbells above your chest with wrists over elbows.",
    "perform": "Lower until your upper arms gently meet the floor. Pause without bouncing, then press the dumbbells upward.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Dumbbells + floor space"
  },
  "Flat Dumbbell Fly": {
    "focus": "Chest fly",
    "primary": "Pectoralis major",
    "secondary": "Front deltoids and shoulder stabilisers",
    "setup": "Lie on a flat bench with feet planted. Hold the dumbbells over your chest with a small, fixed bend in your elbows.",
    "perform": "Open your arms in a controlled arc through a comfortable shoulder range. Bring the dumbbells back above the chest without changing the elbow bend.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Dumbbells + flat bench"
  },
  "Pec Deck Fly": {
    "focus": "Chest fly",
    "primary": "Pectoralis major",
    "secondary": "Front deltoids and shoulder stabilisers",
    "setup": "Adjust the seat and starting width to a comfortable chest-height position. Sit against the back pad and take the handles.",
    "perform": "Bring the handles together in front of the chest. Keep your shoulders down and return slowly without forcing the stretch.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Pec deck machine"
  },
  "Machine Shoulder Press": {
    "focus": "Overhead press",
    "primary": "Anterior deltoids",
    "secondary": "Triceps and lateral deltoids",
    "setup": "Adjust the seat so the handles start around shoulder height. Keep your back supported and feet planted.",
    "perform": "Press upward through a comfortable range, then lower the handles slowly. Keep your ribs down and avoid shrugging.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Shoulder press machine"
  },
  "Seated Barbell Shoulder Press": {
    "focus": "Overhead press",
    "primary": "Anterior deltoids",
    "secondary": "Triceps and lateral deltoids",
    "setup": "Use a stable bench and a suitable rack. Hold the bar slightly wider than shoulder width in front of your upper chest.",
    "perform": "Press the bar overhead without leaning back. Lower it under control in front of your face through a comfortable range.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Barbell + bench + suitable rack"
  },
  "Leaning Dumbbell Lateral Raise": {
    "focus": "Lateral raise",
    "primary": "Lateral deltoids",
    "secondary": "Supraspinatus and trapezius",
    "setup": "Hold a secure support with one hand. Lean slightly away while keeping your feet stable and a dumbbell in the free hand.",
    "perform": "Raise the dumbbell out to the side toward shoulder height with a small elbow bend. Lower slowly without swinging. Repeat on the other side.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "One dumbbell + secure support"
  },
  "Bent-Over Dumbbell Reverse Fly": {
    "focus": "Rear-delt fly",
    "primary": "Posterior deltoids",
    "secondary": "Rhomboids, middle trapezius and rotator cuff",
    "setup": "Hinge at the hips with knees softly bent and your torso stable. Let the dumbbells hang below your shoulders with slightly bent elbows.",
    "perform": "Open the arms out to the sides without swinging your torso. Lower the dumbbells slowly and keep the same elbow bend.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Dumbbells"
  },
  "Cable Rear Delt Fly": {
    "focus": "Rear-delt fly",
    "primary": "Posterior deltoids",
    "secondary": "Rhomboids, middle trapezius and rotator cuff",
    "setup": "Set two cable pulleys around shoulder height. Take the opposite handles and stand with a stable stance and softly bent elbows.",
    "perform": "Open your arms out to the sides, keeping your torso still. Return the handles forward slowly without shrugging.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Two adjustable cable pulleys"
  },
  "Rope Face Pull": {
    "focus": "Face pull",
    "primary": "Posterior deltoids",
    "secondary": "Rhomboids, middle trapezius and rotator cuff",
    "setup": "Attach a rope to a cable pulley around face height. Take both rope ends and step back into a stable stance.",
    "perform": "Pull toward your face, separating the rope ends as your elbows move outward. Return slowly without leaning or shrugging.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Cable station + rope attachment"
  },
  "Seated Cable Face Pull": {
    "focus": "Face pull",
    "primary": "Posterior deltoids",
    "secondary": "Rhomboids, middle trapezius and rotator cuff",
    "setup": "Sit upright on a secure bench facing a cable pulley around face height. Hold the rope with arms extended and feet planted.",
    "perform": "Pull the rope toward your face and separate its ends. Keep your trunk still, then return under control.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Cable station + rope + bench"
  },
  "One-Arm Dumbbell Row": {
    "focus": "Row",
    "primary": "Latissimus dorsi",
    "secondary": "Biceps and middle-back muscles",
    "setup": "Support one hand and knee on a stable bench. Keep your back level and let the dumbbell hang beneath the free shoulder.",
    "perform": "Draw the dumbbell toward your hip while keeping your torso still. Lower until the arm is extended without twisting. Repeat on the other side.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "One dumbbell + bench"
  },
  "Neutral-Grip Lat Pulldown": {
    "focus": "Vertical pull",
    "primary": "Latissimus dorsi",
    "secondary": "Biceps and middle-back muscles",
    "setup": "Adjust the thigh pad and take a parallel-grip attachment with palms facing each other. Sit tall with feet planted.",
    "perform": "Draw your elbows down and pull the attachment toward your upper chest. Return slowly overhead without swinging your torso.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Lat pulldown machine + neutral-grip attachment"
  },
  "Lying Cable Pullover": {
    "focus": "Straight-arm pull",
    "primary": "Latissimus dorsi",
    "secondary": "Pectorals, triceps and trunk stabilisers",
    "setup": "Position a stable bench near the low cable pulley. Lie with your head toward the pulley and hold the attachment with a small elbow bend.",
    "perform": "Bring the attachment from behind your head to above your chest in a controlled arc. Keep your ribs down and use a comfortable shoulder range.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Cable station + attachment + bench"
  },
  "Dumbbell Pullover": {
    "focus": "Straight-arm pull",
    "primary": "Latissimus dorsi",
    "secondary": "Pectorals, triceps and trunk stabilisers",
    "setup": "Lie lengthwise on a stable bench with feet planted. Hold one dumbbell securely above your chest with both hands and slightly bent elbows.",
    "perform": "Lower the dumbbell behind your head through a comfortable range. Bring it back above your chest without arching your lower back.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "One dumbbell + bench"
  },
  "Standing Dumbbell Curl": {
    "focus": "Curl",
    "primary": "Biceps brachii",
    "secondary": "Brachialis and brachioradialis",
    "setup": "Stand tall with a dumbbell in each hand, palms facing forward and elbows close to your sides.",
    "perform": "Curl the dumbbells upward without moving your upper arms or swinging your torso. Lower slowly to the starting position.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Dumbbells"
  },
  "Dumbbell Overhead Triceps Extension": {
    "focus": "Triceps extension",
    "primary": "Triceps brachii",
    "secondary": "Shoulder and trunk stabilisers",
    "setup": "Hold one dumbbell securely with both hands overhead. Keep your trunk braced and your upper arms in a comfortable position.",
    "perform": "Bend your elbows to lower the dumbbell behind your head. Extend them to lift it overhead without arching your back.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "One dumbbell"
  },
  "Close-Grip Machine Chest Press": {
    "focus": "Horizontal press",
    "primary": "Triceps brachii",
    "secondary": "Pectorals and front deltoids",
    "setup": "Use a chest press machine with suitable close or neutral handles. Adjust the seat to chest height and keep your back supported.",
    "perform": "Press forward with your elbows comfortably close to your torso. Return slowly without flaring your elbows or lifting your shoulders.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Chest press machine with suitable close-grip handles"
  },
  "Dumbbell Front Raise": {
    "focus": "Front raise",
    "primary": "Anterior deltoids",
    "secondary": "Upper chest and shoulder stabilisers",
    "setup": "Stand tall with dumbbells in front of your thighs and a small elbow bend. Keep your ribs down.",
    "perform": "Lift the dumbbells forward toward shoulder height, then lower slowly. Avoid swinging or leaning back.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Dumbbells"
  },
  "Cable Front Raise": {
    "focus": "Front raise",
    "primary": "Anterior deltoids",
    "secondary": "Upper chest and shoulder stabilisers",
    "setup": "Attach a suitable handle or straight bar to a low cable pulley. Stand with the attachment in front of your thighs and your torso braced.",
    "perform": "Raise the attachment forward toward shoulder height with a small elbow bend. Lower under control without leaning back. Repeat on the other side if using a single handle.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Low cable pulley + handle"
  },
  "Dumbbell Romanian Deadlift": {
    "focus": "Hip hinge",
    "primary": "Hamstrings and glutes",
    "secondary": "Spinal erectors and trunk stabilisers",
    "setup": "Stand with a dumbbell in each hand in front of your thighs. Keep knees softly bent, shoulders set and your trunk braced.",
    "perform": "Push your hips backward while the dumbbells stay close to your legs. Stop at a comfortable hamstring stretch and stand by bringing your hips forward.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Dumbbells"
  },
  "Cable Pull-Through": {
    "focus": "Hip hinge",
    "primary": "Hamstrings and glutes",
    "secondary": "Spinal erectors and trunk stabilisers",
    "setup": "Attach a rope to a low pulley. Face away from it, hold the rope between your legs and step forward to tension the cable.",
    "perform": "Hinge your hips backward with softly bent knees. Stand by bringing your hips forward without leaning back or pulling with your arms.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Low cable pulley + rope"
  },
  "Goblet Squat": {
    "focus": "Knee extension",
    "primary": "Quadriceps",
    "secondary": "Glutes and adductors",
    "setup": "Hold one dumbbell close to your chest with both hands. Place your feet in a comfortable stance and brace your trunk.",
    "perform": "Bend your knees and hips to squat through a comfortable range. Keep your heels planted, then push through the floor to stand.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "One dumbbell"
  },
  "Smith Machine Squat": {
    "focus": "Knee extension",
    "primary": "Quadriceps",
    "secondary": "Glutes and adductors",
    "setup": "Set the Smith machine bar and safety stops for your height and range. Position the bar across your upper back and take a stable stance.",
    "perform": "Release the bar and squat through a comfortable range while keeping heels planted. Stand under control and re-engage the hooks before stepping away.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Smith machine + safety stops"
  },
  "Single-Leg Extension": {
    "focus": "Knee extension",
    "primary": "Quadriceps",
    "secondary": "Hip and trunk stabilisers",
    "setup": "Adjust the leg extension machine so its pivot lines up with your knee and the pad sits above your ankle. Use one leg at a time.",
    "perform": "Straighten the working knee through a comfortable range. Lower slowly without lifting your hips. Repeat on the other leg.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Leg extension machine"
  },
  "Cable Leg Extension": {
    "focus": "Knee extension",
    "primary": "Quadriceps",
    "secondary": "Hip and trunk stabilisers",
    "setup": "Attach an ankle cuff to a low pulley and sit on a secure bench facing away from it. Keep your thigh supported and the cable clear of your foot.",
    "perform": "Straighten the working knee without moving your thigh or leaning back. Lower slowly and repeat on the other leg.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Low cable pulley + ankle cuff + bench"
  },
  "Lying Leg Curl": {
    "focus": "Leg curl",
    "primary": "Hamstrings",
    "secondary": "Calf and hip stabilisers",
    "setup": "Lie face down on the leg curl machine. Align your knees with the pivot and set the roller just above your heels.",
    "perform": "Curl your heels toward your hips while keeping your pelvis on the pad. Lower under control without arching your back.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Lying leg curl machine"
  },
  "Standing Leg Curl": {
    "focus": "Leg curl",
    "primary": "Hamstrings",
    "secondary": "Calf and hip stabilisers",
    "setup": "Adjust a standing leg curl machine for the working leg. Support your torso and place the roller behind the lower leg.",
    "perform": "Bend the working knee to bring your heel upward without moving your hip. Lower slowly and repeat on the other side.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Standing leg curl machine"
  },
  "Standing Dumbbell Calf Raise": {
    "focus": "Calf raise",
    "primary": "Gastrocnemius and soleus",
    "secondary": "Ankle and foot stabilisers",
    "setup": "Stand on stable, level ground holding dumbbells at your sides. Keep your feet comfortably spaced and your balance steady.",
    "perform": "Rise onto the balls of your feet, pause, then lower your heels slowly. Avoid bouncing or rolling your ankles.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Dumbbells + stable floor"
  },
  "Seated Calf Raise": {
    "focus": "Calf raise",
    "primary": "Soleus",
    "secondary": "Ankle and foot stabilisers",
    "setup": "Sit on a calf raise machine with the balls of your feet on the platform and the pads securely above your knees.",
    "perform": "Lift your heels, pause at the top, then lower slowly through a comfortable range. Keep the balls of your feet planted and avoid bouncing.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Seated calf raise machine"
  },
  "Decline Crunch": {
    "focus": "Ab crunch",
    "primary": "Rectus abdominis",
    "secondary": "Obliques and trunk stabilisers",
    "setup": "Secure your lower legs on a suitable decline bench. Keep your hands lightly across your chest or beside your head without pulling on your neck.",
    "perform": "Curl your ribs toward your pelvis to lift the shoulders slightly. Lower slowly; keep the movement a crunch rather than a full sit-up.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Decline bench with leg supports"
  },
  "Tall-Kneeling Pallof Press": {
    "focus": "Anti-rotation",
    "primary": "Abdominals and obliques",
    "secondary": "Glutes and shoulder stabilisers",
    "setup": "Kneel tall side-on to a cable pulley set near chest height. Hold the handle at your chest with your hips stacked above your knees.",
    "perform": "Press the handle straight forward while resisting rotation. Pause, return to your chest and repeat on the other side.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Cable station + handle + comfortable kneeling surface"
  },
  "Half-Kneeling Pallof Press": {
    "focus": "Anti-rotation",
    "primary": "Abdominals and obliques",
    "secondary": "Glutes and shoulder stabilisers",
    "setup": "Take a stable half-kneeling position side-on to a chest-height cable pulley. Hold the handle against your chest with your trunk upright.",
    "perform": "Press the handle forward without turning your shoulders or hips. Return under control, then repeat facing the other direction.",
    "cues": [
      "Use a stable setup",
      "Move under control",
      "Use a comfortable range"
    ],
    "mistakes": "Swinging or bouncing, losing the supported position, or forcing the range of motion.",
    "equipment": "Cable station + handle + comfortable kneeling surface"
  },

    "Incline Dumbbell Fly": {
      focus:"Incline chest fly",primary:"Pectoralis major, with upper-chest emphasis",secondary:"Front deltoids and arm stabilisers",
      setup:"Set a slight incline on the bench. Lie back with feet planted and hold the dumbbells above your chest with softly bent elbows.",
      perform:"Lower the dumbbells out to the sides in a controlled arc through a comfortable range, then bring them back above your chest. Keep the elbow angle mostly fixed.",
      cues:["Keep a soft elbow bend","Use a comfortable shoulder range","Control the lowering"],
      mistakes:"Using too much weight, forcing a deep stretch, or turning the fly into a press.",equipment:"Dumbbells + incline bench"
    },
    "Hack Squat": {
      focus:"Machine squat with quad emphasis",primary:"Quadriceps",secondary:"Glutes and adductors",
      setup:"Adjust the machine to your height. Place your back and shoulders against the pads, feet firmly on the platform, and release the safety handles.",
      perform:"Bend your knees and hips to lower through a comfortable range, keeping heels planted. Push through the platform to stand, then re-engage the safeties before stepping off.",
      cues:["Keep back against the pad","Let knees follow the toes","Lower under control"],
      mistakes:"Bouncing at the bottom, lifting heels, or forcing an uncomfortable depth.",equipment:"Hack squat machine"
    },
    "Cable Chest Press": {
      focus:"Chest pressing", primary:"Pectoralis major", secondary:"Triceps and front delts",
      setup:"Set the handles around mid-chest height. Step into a stable stance and keep your shoulders comfortable.",
      perform:"Press the handles forward in a controlled path, then return until you feel a comfortable chest stretch.",
      cues:["Keep wrists aligned","Let elbows follow a comfortable path","Control the return"],
      mistakes:"Rounding the shoulders forward, twisting the torso, or letting the cables pull you back suddenly.", equipment:"Cable machine + handles"
    },
    "Straight-Arm Cable Pulldown": {
      focus:"Lat isolation", primary:"Latissimus dorsi", secondary:"Teres major, upper back and triceps stabilisers",
      setup:"Set a cable high. Stand back slightly with a soft elbow bend and stable torso.",
      perform:"Sweep the handle down toward the thighs while keeping the elbow angle mostly fixed, then return slowly.",
      cues:["Lead with upper arms","Keep ribs stacked","Use a comfortable shoulder range"],
      mistakes:"Turning the movement into an arm pushdown, swinging the torso, or shrugging.", equipment:"High cable + bar or rope"
    },
    "Cable Lateral Raise": {
      focus:"Side delts", primary:"Lateral deltoid", secondary:"Upper trapezius",
      setup:"Set a low cable and stand side-on. Hold the handle with a relaxed grip and a soft elbow.",
      perform:"Raise the arm out to the side to a comfortable height and lower under control.",
      cues:["Move smoothly","Keep neck relaxed","Use a comfortable range"],
      mistakes:"Swinging, shrugging hard, or lifting through front shoulder pain.", equipment:"Low cable + single handle"
    },
    "Machine Ab Crunch": {
      focus:"Abdominal flexion", primary:"Rectus abdominis", secondary:"Obliques",
      setup:"Adjust the machine so its pivot and pads fit your torso comfortably. Start with light resistance.",
      perform:"Curl the ribcage toward the pelvis, pause briefly, then return under control without yanking with the arms.",
      cues:["Exhale as you curl","Keep hips stable","Control the return"],
      mistakes:"Pulling with the arms, bouncing the stack, or using a range that strains the back.", equipment:"Ab crunch machine"
    },
    "Incline Dumbbell Press": {
      focus:"Upper chest",
      primary:"Upper chest (clavicular pec fibres)", secondary:"Triceps, front delts",
      setup:"Set the bench to a moderate incline. Sit with your feet planted and pull the shoulder blades back and down.",
      perform:"Start with the dumbbells over the upper chest. Lower them under control until you reach a comfortable chest stretch, then press up and slightly inward without crashing the weights together.",
      cues:["Keep shoulder blades set","Use a controlled 2–3 second lowering phase","Keep elbows slightly tucked","Press through the full comfortable range"],
      mistakes:"Too much bench incline, flared elbows, bouncing the dumbbells, excessive arching, or shortening the bottom range.",
      equipment:"Incline bench + dumbbells"
    },
    "Flat Dumbbell Press": {
      focus:"Mid-chest pressing",
      primary:"Pectoralis major", secondary:"Triceps and front delts",
      setup:"Lie on a flat bench with feet planted and dumbbells above the chest. Set your shoulder blades comfortably against the bench.",
      perform:"Lower the dumbbells under control to a comfortable depth, then press them up without banging them together.",
      cues:["Keep wrists stacked over forearms","Let elbows follow a comfortable path","Control the lower position","Keep feet grounded"],
      mistakes:"Dropping below a comfortable shoulder range, flaring elbows excessively, bouncing, or arching to lift more weight.",
      equipment:"Flat bench + dumbbells"
    },
    "High-to-Low Cable Fly": {
      focus:"Lower/mid chest",
      primary:"Lower/sterner chest fibres", secondary:"Front delts",
      setup:"Set both cable pulleys high. Take a stable split stance and keep a soft bend in the elbows.",
      perform:"Bring the handles down and inward in a smooth arc toward the lower chest/upper-ab area. Squeeze the chest, then return slowly while maintaining tension.",
      cues:["Think chest, not arms","Keep elbows softly bent","Control the stretch","Keep the torso stable"],
      mistakes:"Turning it into a press, bending the elbows during the rep, shrugging, or overstretching the shoulders.",
      equipment:"Cable machine + handles"
    },
    "Low-to-High Cable Fly": {
      focus:"Upper chest",
      primary:"Upper chest (clavicular fibres)", secondary:"Front delts",
      setup:"Set the pulleys low. Stand tall with a stable stance and soft elbows.",
      perform:"Sweep the handles upward and inward toward upper-chest height. Squeeze briefly, then lower the handles under control.",
      cues:["Keep the arc smooth","Finish around upper-chest height","Avoid torso swing","Maintain chest tension"],
      mistakes:"Using momentum, turning it into a press, excessive elbow bend, or raising the handles far above the useful range.",
      equipment:"Low cable machine + handles"
    },
    "Machine Lower Chest Press": {
      focus:"Lower chest pressing",
      primary:"Lower/mid chest", secondary:"Triceps, front delts",
      setup:"Adjust the seat so the handles align with the lower-to-mid chest. Set your shoulders back against the pad.",
      perform:"Press the handles forward smoothly. Stop short of an aggressive lockout, then return under control until the chest is comfortably stretched.",
      cues:["Shoulders stay back","Keep wrists stacked","Use a controlled return","Drive with the chest and triceps"],
      mistakes:"Seat height that changes the pressing angle, shoulders rolling forward, bouncing the stack, or hard lockouts.",
      equipment:"Chest press machine"
    },
    "Close-Grip Barbell Bench Press": {
      focus:"Triceps compound",
      primary:"Triceps", secondary:"Chest, front delts",
      setup:"Use a close but comfortable grip rather than an excessively narrow grip. Set your upper back and plant your feet.",
      perform:"Lower the bar toward the lower-to-mid chest with elbows controlled. Press the bar back up while keeping the wrists stacked over the forearms.",
      cues:["Elbows stay controlled","Wrists straight","Bar path remains stable","Keep feet planted"],
      mistakes:"Grip too narrow, elbows flaring hard, bouncing the bar, or losing shoulder-blade position.",
      equipment:"Barbell + flat bench"
    },
    "Skull Crushers": {
      focus:"Triceps isolation",
      primary:"Triceps — especially long head", secondary:"Other triceps heads",
      setup:"Lie on a bench and hold an EZ bar or dumbbells. Position the upper arms slightly back from vertical.",
      perform:"Bend the elbows to lower the weight toward the forehead or slightly behind the head. Extend the elbows smoothly without letting the upper arms wander.",
      cues:["Upper arms stay mostly fixed","Control the eccentric","Keep elbows from flaring","Use a pain-free range"],
      mistakes:"Dropping the weight quickly, excessive elbow flare, turning it into a pullover, or using more load than you can control.",
      equipment:"EZ bar or dumbbells + bench"
    },
    "Rope Triceps Pushdown": {
      focus:"Triceps",
      primary:"Triceps — lateral and medial heads", secondary:"Long head",
      setup:"Set the rope around upper-chest height. Stand tall with elbows close to your sides.",
      perform:"Extend the elbows and finish with the rope separated slightly at the bottom. Return slowly until the triceps are stretched without losing elbow position.",
      cues:["Pin elbows near the ribs","Full controlled extension","Keep shoulders quiet","Use a slow return"],
      mistakes:"Swinging the torso, moving the shoulders, leaning excessively into the cable, or using partial reps.",
      equipment:"Cable machine + rope"
    },
    "Reverse-Grip Cable Triceps Pushdown": {
      focus:"Medial-head triceps emphasis",
      primary:"Triceps — medial head emphasis", secondary:"Lateral head, forearms",
      setup:"Use a comfortable underhand grip on a straight bar or suitable attachment. Keep the upper arms close to the body.",
      perform:"Extend the elbows to drive the bar down. Pause briefly at full comfortable extension, then return slowly.",
      cues:["Keep wrists neutral","Fix the upper arms","Control the top position","Use moderate weight"],
      mistakes:"Bending the wrists, moving the shoulders, swinging, or loading the exercise too heavily.",
      equipment:"Cable machine + straight bar"
    },
    "Cable Crunch": {
      focus:"Abs",
      primary:"Rectus abdominis", secondary:"Obliques, hip flexors as stabilisers",
      setup:"Kneel facing the cable stack with the rope beside your head. Brace the pelvis and ribs before moving.",
      perform:"Curl the ribcage toward the pelvis by shortening the abs. Return slowly while keeping tension instead of simply sitting back on the hips.",
      cues:["Think ribs toward pelvis","Keep hips mostly fixed","Exhale through the crunch","Control the return"],
      mistakes:"Pulling mainly with the arms, excessive hip hinging, using momentum, or losing abdominal tension.",
      equipment:"Cable machine + rope"
    },
    "Romanian Deadlift": {
      focus:"Posterior chain",
      primary:"Hamstrings, glutes", secondary:"Spinal erectors, adductors",
      setup:"Stand tall with the bar or dumbbells close to your thighs. Unlock the knees and brace your trunk.",
      perform:"Push the hips back while keeping the load close to the legs. Descend until the hamstrings are strongly loaded without losing spinal position, then drive the hips forward to stand.",
      cues:["Hips travel back","Keep the load close","Maintain a neutral spine","Stop when hamstring range ends"],
      mistakes:"Squatting instead of hinging, rounding the back, drifting the weight away, or chasing extra depth.",
      equipment:"Barbell or dumbbells"
    },
    "Lat Pulldown": {
      focus:"Back width",
      primary:"Latissimus dorsi", secondary:"Biceps, teres major, mid-back, rear delts",
      setup:"Secure your thighs under the pads. Use a shoulder-width to slightly wider grip and sit tall.",
      perform:"Keep the chest lifted and drive the elbows down toward the ribs. Bring the bar to upper-chest level, then return slowly to a full controlled lat stretch.",
      cues:["Chest up","Shoulders down and away from ears","Drive elbows toward the ribs","Own the top stretch"],
      mistakes:"Swinging, excessive backward lean, pulling behind the neck, shrugging, or cutting the stretch short.",
      equipment:"Lat pulldown machine + bar"
    },
    "Chest-Supported Row": {
      focus:"Back thickness and posture",
      primary:"Mid/upper back — rhomboids and traps", secondary:"Lats, rear delts, biceps",
      setup:"Adjust the chest pad so your spine stays neutral and your arms can reach without rounding.",
      perform:"Pull the elbows back toward the torso and squeeze the shoulder blades without shrugging. Lower the handles under control.",
      cues:["Keep chest on the pad","Drive elbows back","Avoid shrugging","Pause the contraction"],
      mistakes:"Lifting the chest, jerking the handles, shortening the range, or turning the movement into a biceps curl.",
      equipment:"Chest-supported row machine or bench"
    },
    "Seated Cable Row": {
      focus:"Mid-back and posture",
      primary:"Mid-back — rhomboids and traps", secondary:"Lats, rear delts, biceps",
      setup:"Sit tall with a neutral spine and brace the trunk. Allow the shoulder blades to move naturally during the reach.",
      perform:"Reach forward under control, then pull the handle toward the lower ribs while keeping the torso stable. Finish with the upper back contracted.",
      cues:["Tall neutral torso","Elbows travel back","Controlled reach","Do not rock the body"],
      mistakes:"Excessive torso swing, shrugging, rounding the lumbar spine, or cutting the reach short.",
      equipment:"Seated cable row station"
    },
    "EZ-Bar Curl": {
      focus:"Overall biceps",
      primary:"Biceps brachii", secondary:"Brachialis, forearms",
      setup:"Stand tall with the EZ bar and elbows close to your sides. Brace your torso.",
      perform:"Curl the bar without swinging. Squeeze the biceps near the top, then lower slowly to a controlled near-full extension.",
      cues:["Keep shoulders quiet","Elbows stay near sides","Control the negative","Use full comfortable range"],
      mistakes:"Leaning back, hip drive, shoulder swing, or stopping the eccentric too early.",
      equipment:"EZ curl bar"
    },
    "Incline Dumbbell Curl": {
      focus:"Biceps long head",
      primary:"Biceps brachii — long head", secondary:"Brachialis, forearms",
      setup:"Set an incline bench and sit back with arms hanging naturally behind the torso. Keep shoulders relaxed.",
      perform:"Curl the dumbbells while keeping the upper arms relatively still. Supinate as you curl, squeeze, then lower slowly into the stretch.",
      cues:["Let the arm hang behind the torso","Keep elbows stable","Smooth supination","Control the bottom stretch"],
      mistakes:"Shoulder movement, swinging, cutting the stretch short, or using excessive weight.",
      equipment:"Incline bench + dumbbells"
    },
    "Preacher Curl": {
      focus:"Strict biceps work",
      primary:"Biceps brachii", secondary:"Brachialis, forearms",
      setup:"Set the preacher pad so the upper arms are supported comfortably. Grip the bar or handles without overextending the wrists.",
      perform:"Curl the weight while keeping the upper arms planted. Squeeze at the top and lower slowly without snapping into the bottom.",
      cues:["Upper arms stay on pad","Slow eccentric","Keep wrists straight","Use a controlled bottom range"],
      mistakes:"Dropping into elbow extension, lifting the shoulders, using momentum, or overloading the bottom position.",
      equipment:"Preacher bench + EZ bar or machine"
    },
    "Dumbbell Shoulder Press": {
      focus:"Shoulder mass",
      primary:"Front delts", secondary:"Side delts, triceps",
      setup:"Sit upright with back support. Start dumbbells around shoulder level with wrists stacked over elbows.",
      perform:"Press the dumbbells overhead in a controlled path. Stop short of painful range, then lower slowly to shoulder level.",
      cues:["Brace the torso","Wrists stacked","Press smoothly","Do not shrug into the top"],
      mistakes:"Excessive back arch, flared elbows, bouncing, or forcing a painful range.",
      equipment:"Bench + dumbbells"
    },
    "Dumbbell Lateral Raise": {
      focus:"Side delts",
      primary:"Lateral/medial deltoids", secondary:"Front delts, upper traps",
      setup:"Stand or sit tall with light dumbbells and a soft bend in the elbows.",
      perform:"Raise the arms out and slightly forward until roughly shoulder height or your comfortable maximum. Lower slowly.",
      cues:["Lead with the elbows","Keep traps relaxed","Use light controlled load","No swinging"],
      mistakes:"Shrugging, swinging the torso, excessive weight, or turning it into a front raise.",
      equipment:"Dumbbells"
    },
    "Reverse Pec Deck": {
      focus:"Rear delts and posture",
      primary:"Rear deltoids", secondary:"Rhomboids, mid/lower traps",
      setup:"Adjust the seat so the handles are around shoulder height. Keep the chest against the pad.",
      perform:"Move the arms out and back using the rear delts and upper back. Pause briefly, then return under control.",
      cues:["Chest stays planted","Avoid shrugging","Drive arms outward/back","Use a controlled return"],
      mistakes:"Using heavy momentum, bending the elbows excessively, shrugging, or turning it into a row.",
      equipment:"Reverse pec deck machine"
    },
    "Seated Machine Front Raise": {
      focus:"Anterior delts",
      primary:"Front deltoids", secondary:"Upper chest",
      setup:"Adjust the seat and pad so the handles start around the lower-to-mid torso. Brace against the machine.",
      perform:"Raise the handles forward under control to a comfortable shoulder-height range, then lower slowly.",
      cues:["Keep torso fixed","Lead with the shoulders","Controlled lowering","Avoid excessive height"],
      mistakes:"Swinging, leaning back, shrugging, or using more load than the delts can control.",
      equipment:"Front-raise machine"
    },
    "Machine Lateral Raise": {
      focus:"Side delts",
      primary:"Lateral/medial deltoids", secondary:"Upper traps",
      setup:"Adjust the seat so the machine pads sit comfortably against the forearms or elbows.",
      perform:"Drive the elbows outward until the upper arms reach around shoulder height. Lower slowly and maintain tension.",
      cues:["Keep shoulders down","Drive elbows outward","Use controlled range","Avoid momentum"],
      mistakes:"Shrugging, bouncing the pads, excessive range, or using the torso to move the weight.",
      equipment:"Machine lateral raise"
    },
    "Overhead Cable Triceps Extension": {
      focus:"Long-head triceps",
      primary:"Triceps — long head", secondary:"Lateral and medial heads",
      setup:"Set the cable low or behind you depending on the station. Step forward, keep elbows pointing mostly forward and brace the torso.",
      perform:"Extend the elbows from a deep comfortable bend to full controlled extension. Return slowly to load the long head through the stretch.",
      cues:["Keep elbows relatively fixed","Use the stretch without pain","Control the eccentric","Do not arch excessively"],
      mistakes:"Elbows flaring, excessive shoulder movement, lumbar overextension, or rushing the stretch.",
      equipment:"Cable machine + rope"
    },
    "Triceps Extension Machine": {
      focus:"Triceps isolation",
      primary:"Triceps", secondary:"All three heads depending on machine path",
      setup:"Adjust the seat and pad so the elbows align with the machine pivot. Grip firmly and brace the torso.",
      perform:"Extend the elbows through the machine's intended path, squeeze the triceps, then return slowly to the starting position.",
      cues:["Align elbows with pivot","Keep shoulders stable","Full controlled extension","Slow return"],
      mistakes:"Poor seat setup, shoulder movement, bouncing the stack, or hard lockouts.",
      equipment:"Triceps extension machine"
    },
    "High Row Machine": {
      focus:"Upper back",
      primary:"Rhomboids and middle trapezius", secondary:"Lats, rear delts, biceps",
      setup:"Adjust the seat or chest pad so the high-row handles are easy to reach without rounding your back. Choose a grip that feels comfortable at your elbow.",
      perform:"Pull the handles toward your upper ribs, guiding the elbows back. Pause briefly, then let your shoulder blades move forward under control.",
      cues:["Keep chest supported","Move elbows without swinging","Let shoulder blades move naturally","Control the return"],
      mistakes:"Shrugging, pulling with the lower back, forcing a painful grip, or jerking the handles.",
      equipment:"High-row machine"
    },
    "High Row Machine / Assisted Pull-Up": {
      focus:"Upper back + lat width",
      primary:"Lats and upper back", secondary:"Biceps, rear delts, teres major",
      setup:"For the high row, set the seat so the handles start around upper-chest height. For assisted pull-ups, set the assistance and grip securely.",
      perform:"Pull the elbows down and back toward the torso. On assisted pull-ups, drive the elbows toward the ribs and lift the chest toward the bar.",
      cues:["Lead with elbows","Keep chest controlled","Avoid shrugging","Use a full useful range"],
      mistakes:"Kicking or bouncing, excessive momentum, shrugging, or cutting the top/bottom range short.",
      equipment:"High-row machine or assisted pull-up machine"
    },
    "Single-Arm Cable Row": {
      focus:"Unilateral back + lat work",
      primary:"Lats and mid-back", secondary:"Rear delts, biceps, obliques as stabilisers",
      setup:"Set the cable around mid-torso height. Stand or sit in a stable position with the working arm reaching forward.",
      perform:"Pull the elbow back toward the hip/ribs while keeping the torso controlled. Reach forward slowly to lengthen the lat and mid-back.",
      cues:["Reach without losing posture","Drive elbow back","Keep hips and ribs controlled","Match both sides"],
      mistakes:"Rotating the torso aggressively, shrugging, jerking the handle, or shortening the stretch.",
      equipment:"Cable machine + single handle"
    },
    "High Face Pull": {
      focus:"Rear delts + posture",
      primary:"Rear delts", secondary:"Mid/lower traps, rhomboids, external rotators",
      setup:"Set the rope around upper-chest to face height. Take a stable stance and keep the torso upright.",
      perform:"Pull the rope toward the face/forehead while separating the hands. Rotate the upper arms outward as comfortable, then return under control.",
      cues:["Elbows high but comfortable","Finish with hands beside the face","Keep ribs down","Control the return"],
      mistakes:"Pulling too low, excessive lumbar arch, shrugging, or using too much weight.",
      equipment:"Cable machine + rope"
    },
    "Cable Curl": {
      focus:"Constant-tension biceps",
      primary:"Biceps brachii", secondary:"Brachialis, forearms",
      setup:"Set the cable low and stand tall. Keep the elbows close to the torso.",
      perform:"Curl the handle smoothly against constant cable tension. Squeeze the biceps, then lower under control to a comfortable extension.",
      cues:["Keep elbows fixed","Stay tall","Control both directions","Use full comfortable range"],
      mistakes:"Leaning back, shoulder swing, jerking the cable, or letting the stack slam.",
      equipment:"Cable machine + bar or handles"
    },
    "Hammer Curl": {
      focus:"Biceps + arm thickness",
      primary:"Brachialis and biceps", secondary:"Brachioradialis, forearms",
      setup:"Stand tall with a neutral grip and dumbbells by your sides.",
      perform:"Curl the dumbbells while keeping the palms facing inward. Squeeze at the top and lower slowly.",
      cues:["Neutral wrist","Elbows stay close","No swinging","Control the negative"],
      mistakes:"Rotating into a standard curl, using hip drive, shrugging, or excessive weight.",
      equipment:"Dumbbells"
    },
    "Pallof Press": {
      focus:"Core anti-rotation",
      primary:"Obliques and abdominal wall", secondary:"Shoulders and hips as stabilisers",
      setup:"Set a cable at chest height. Stand side-on to the stack, hold the handle with both hands at your chest, and step out until the cable gently pulls sideways.",
      perform:"Brace your trunk and press your hands forward without letting the torso rotate. Return to the chest slowly. Complete the prescribed repetitions on each side.",
      cues:["Ribs over pelvis","Keep hips and shoulders facing forward","Breathe normally","Use a comfortable grip"],
      mistakes:"Rotating toward the stack, leaning away, locking the elbows painfully, or choosing more load than you can resist.",
      equipment:"Cable machine + single handle"
    },
    "Leg Press": {
      focus:"Quads + lower body",
      primary:"Quadriceps", secondary:"Glutes, hamstrings, adductors",
      setup:"Place feet around shoulder width on the platform. Brace your trunk and keep your lower back supported.",
      perform:"Lower the sled under control until you reach a comfortable depth without the pelvis tucking excessively. Drive through the whole foot to extend the knees and hips.",
      cues:["Knees track with toes","Keep hips and back supported","Control depth","Do not slam the knees into lockout"],
      mistakes:"Excessive depth that rounds the pelvis, knees collapsing inward, bouncing the sled, or partial reps.",
      equipment:"Leg press machine"
    },
    "Seated Leg Curl": {
      focus:"Hamstrings",
      primary:"Hamstrings", secondary:"Calves as minor contributors",
      setup:"Adjust the seat and thigh pad so the knee aligns with the machine pivot. Set the ankle pad just above the heel.",
      perform:"Curl the lower legs down and back through the available range. Squeeze the hamstrings, then return slowly to the stretched position.",
      cues:["Knee aligned with pivot","Keep thighs pinned","Controlled stretch","Smooth squeeze"],
      mistakes:"Lifting the hips, using momentum, cutting the range short, or letting the stack slam.",
      equipment:"Seated leg curl machine"
    },
    "Leg Extension": {
      focus:"Quadriceps isolation",
      primary:"Quadriceps", secondary:"Rectus femoris and vasti group",
      setup:"Align the knee with the machine pivot and place the shin pad just above the ankle. Keep the back against the pad.",
      perform:"Extend the knees smoothly until the quads are fully contracted within a comfortable range, then lower slowly.",
      cues:["Knees aligned","Back stays supported","Squeeze at the top","Control the lowering"],
      mistakes:"Using momentum, lifting the hips, bouncing the stack, or forcing painful lockout.",
      equipment:"Leg extension machine"
    },
    "Machine Calf Raise": {
      focus:"Calf development",
      primary:"Gastrocnemius and soleus", secondary:"Foot/ankle stabilisers",
      setup:"Position the feet securely on the platform and set the machine so the ankle can move through a comfortable range.",
      perform:"Lower the heels under control into a comfortable stretch, then drive through the balls of the feet to raise the heels as high as you can without bouncing.",
      cues:["Full comfortable stretch","Pause at the top","Keep movement at the ankle","Use controlled tempo"],
      mistakes:"Bouncing, tiny reps, pushing through the knees, or rushing the bottom stretch.",
      equipment:"Machine calf raise"
    }
  },

  ensureModal() {
    if (document.getElementById("forge50GuideModal")) return;
    const el = document.createElement("div");
    el.id = "forge50GuideModal";
    el.className = "forge50-guide-modal";
    el.innerHTML = `
      <div class="forge50-guide-backdrop" onclick="ExerciseGuides.close()"></div>
      <div class="forge50-guide-panel" role="dialog" aria-modal="true" aria-label="Exercise guide">
        <button class="forge50-guide-close" onclick="ExerciseGuides.close()" aria-label="Close exercise guide">×</button>
        <div id="forge50GuideBody"></div>
      </div>`;
    document.body.appendChild(el);
  },

  resolve(idOrName) {
    const catalog = window.ForgeDefaults?.catalog || {};
    const entry = catalog[idOrName] || Object.values(catalog).find(e => e.name === idOrName);
    const name = entry?.name || idOrName;
    return {id:entry?.id || idOrName, name, guide:this.guides[name]};
  },
  get(idOrName) {
    return this.resolve(idOrName).guide || {
      focus:"Exercise technique",primary:"See your workout card for the target muscle",secondary:"Supporting muscles vary",
      setup:"Set the equipment comfortably and establish a stable position.",
      perform:"Move through a comfortable range with controlled tempo.",
      cues:["Control the movement","Keep a stable position","Stop if you feel sharp pain"],
      mistakes:"Rushing, using momentum or a load you cannot control.",equipment:"See workout card."
    };
  },
  alternatives(id) {
    const catalog=Object.values(window.ForgeDefaults?.catalog||{});
    const current=catalog.find(e=>e.id===id);
    if(!current)return [];
    const options=catalog.filter(e=>e.id!==id&&e.muscle===current.muscle);
    return window.ExerciseSwaps?ExerciseSwaps.filter(options,current,{pattern:'any',equipment:Object.keys(ExerciseSwaps.equipment)}):options.sort((a,b)=>a.name.localeCompare(b.name));
  },
  openByName(encoded) { this.open(decodeURIComponent(encoded)); },
  open(idOrName) {
    window.ExerciseDemos?.dispose();
    this.ensureModal();
    const {id,name,guide} = this.resolve(idOrName), g=guide || this.get(idOrName);
    this.current={id,name};
    const safe=v=>this.escape(v);
    const catalog=Object.values(window.ForgeDefaults?.catalog||{});
    const current=catalog.find(e=>e.id===id);
    const alternatives=this.alternatives(id);
    const last=current && window.Store?.last?.(id,current.weightMode);
    const recommend=!!last;
    const previous=last?.exercise?.sets?.filter(x=>x.done).map(x=>`${safe(x.weight)} kg × ${safe(x.reps)} reps`).join(' · ');
    const sections={
      technique:`<section class="forge50-guide-section"><h3>SETUP</h3><p>${safe(g.setup)}</p></section><section class="forge50-guide-section guide-perform"><h3>HOW TO PERFORM</h3><p>${safe(g.perform)}</p></section><section class="forge50-guide-section"><h3>FORM CHECK</h3><ul class="forge50-guide-checks">${g.cues.map(c=>`<li>✓ ${safe(c)}</li>`).join('')}</ul></section><section class="forge50-guide-section guide-mistakes"><h3>COMMON MISTAKES</h3><p>${safe(g.mistakes)}</p></section><section class="forge50-guide-section"><h3>EQUIPMENT</h3><p>${safe(g.equipment)}</p></section>`,
      demo:window.ExerciseDemos?.render(id)||'<p>No demonstration is available.</p>',
      muscles:`${window.MuscleDiagrams?.render(id)||''}<div class="forge50-guide-muscles"><div><span>PRIMARY MUSCLES</span><strong>${safe(g.primary)}</strong></div><div><span>SECONDARY MUSCLES</span><strong>${safe(g.secondary)}</strong></div></div><section class="forge50-guide-section"><h3>TRAINING FOCUS</h3><p>${safe(g.focus)}</p></section>`,
      progress:`<section class="forge50-guide-section"><h3>LAST COMPLETED SESSION</h3><p>${previous||'No completed sets recorded yet.'}</p></section><section class="forge50-guide-section"><h3>NEXT SESSION</h3><p>${current?`Target: ${safe(current.sets)} sets × ${safe(current.reps)} reps. ${recommend?'Check the workout card for your calculated weight suggestion.':'Start with a weight you can control and record each set.'}`:'Open this exercise in a workout to view its targets.'}</p></section><p class="forge50-guide-note">Progression is guidance, not an automatic weight increase. Your saved workout history stays unchanged.</p>`,
      alternatives:`<section class="forge50-guide-section"><h3>SIMILAR MUSCLE GROUP</h3>${alternatives.length?`<ul class="forge50-guide-alternatives">${alternatives.map(e=>`<li><button type="button" class="forge50-guide-alternative" data-guide-alternative="${safe(e.id)}">${safe(e.name)}</button> <span>${safe(e.muscle)}</span></li>`).join('')}</ul>`:'<p>No catalog alternatives are available for this exercise.</p>'}<p class="forge50-guide-note">Tap an alternative to see its technique and animation. Similar muscle groups can involve different movements. Use Swap in your workout or edit your routine in Settings to make a change.</p></section>`
    };
    const body=document.getElementById('forge50GuideBody');
    body.innerHTML=`<div class="forge50-guide-title"><span class="forge50-guide-kicker">FORGE50 EXERCISE GUIDE</span><h2>${safe(name)}</h2><p class="forge50-guide-focus">${safe(g.focus)}</p></div><div class="forge50-guide-tabs" role="tablist" aria-label="Guide sections">${[['technique','Technique'],['demo','Demo'],['muscles','Muscles'],['progress','Progress'],['alternatives','Alternatives']].map(([key,label])=>`<button type="button" role="tab" data-guide-tab="${key}" aria-selected="${key==='technique'}">${label}</button>`).join('')}</div>${Object.entries(sections).map(([key,html])=>`<div data-guide-panel="${key}" role="tabpanel" ${key==='technique'?'':'hidden'}>${html}</div>`).join('')}`;
    window.ExerciseDemos?.mount(body.querySelector('.exercise-demo'),id);
    body.querySelectorAll('[data-guide-alternative]').forEach(button=>button.addEventListener('click',()=>this.open(button.dataset.guideAlternative)));
    body.querySelectorAll('[data-guide-tab]').forEach(button=>button.addEventListener('click',()=>{
      const key=button.dataset.guideTab;
      body.querySelectorAll('[data-guide-tab]').forEach(b=>b.setAttribute('aria-selected',String(b===button)));
      body.querySelectorAll('[data-guide-panel]').forEach(panel=>panel.hidden=panel.dataset.guidePanel!==key);
      if(key==='demo')window.ExerciseDemos?.play();
      else window.ExerciseDemos?.stop();
    }));
    document.getElementById('forge50GuideModal').classList.add('open');
    document.body.classList.add('forge50-guide-open');
    document.querySelector('.forge50-guide-close')?.focus();
  },
  close() {
    window.ExerciseDemos?.dispose();
    const el = document.getElementById("forge50GuideModal");
    if (el) el.classList.remove("open");
    document.body.classList.remove("forge50-guide-open");
  },

  escape(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]));
  }
};

window.ExerciseGuides = ExerciseGuides;
