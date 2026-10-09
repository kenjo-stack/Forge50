# Forge50 2.12.0 — alternatives and animations

The catalogue now contains 74 exercises. Every catalogue entry has a technique
guide, a muscle illustration, and a working animated demonstration. The original
exercise IDs and routine templates are preserved.

- Added 33 exercises across chest, back, shoulders, arms, legs, calves, and abs.
- Added 34 original eight-pose GIFs, including the previously missing Hack Squat.
- Every exercise has multiple alternatives in its muscle group and at least one
  alternative in the same movement pattern when all equipment is available.
- The Guide shows the full group instead of stopping at four alternatives.
  Tap an exercise in that list to open its own technique and animation.
- Swap still starts with the same movement and respects saved gym equipment.
  **Show all muscle-group alternatives** offers the wider list explicitly while
  keeping the equipment filter. Different movements are labelled in the choices.

Completed sets stay with their original exercise during a swap. Replacement sets
start with empty loads, or 0 kg of added load for a bodyweight exercise. Browsing
guides changes neither sessions nor routine settings.

New definitions load from `js/exercise-catalog-expansion.js`; the existing
`data.js` is preserved exactly. Dumbbell Pullovers and Dumbbell Overhead Triceps
Extensions record the single dumbbell held in both hands, so their volume is
counted once. Paired dumbbell movements keep their existing load convention.

The app shell and posters are available offline after installation. GIFs are
loaded only when Demo is opened and are cached after a successful online load.
The app-shell cache version changes for this release; the existing GIF cache is
retained. Apply the app's Update action after saving a workout.

`docs/exercise-expansion.json` records the exercise additions and recovered
original motion-sheet names. `docs/expanded-demo-assets.json` records all 34 new
GIF hashes, byte sizes, frame counts, and timings. Each animation is 600 × 600,
loops continuously, and uses eight illustrated poses over 2.4 seconds. Tall
panels retain their proportions inside the square stage.

Verification covers all exercise mappings, actual GIF structure and hashes,
equipment filters, full alternatives, swaps after a logged set, saved routines,
rotation, backups, mobile layouts, animation playback, and offline behavior.
