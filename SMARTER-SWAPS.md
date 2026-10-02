# Smarter exercise swaps · 2.9.4

Open Swap in either workout view. Choose available equipment, then choose a movement pattern. Classified exercises default to the original pattern. Any movement deliberately broadens results within the original muscle group. Matching movements rank first, then overlapping equipment. Choices already in the workout are excluded.

Equipment categories represent apparatus, not an inventory of every attachment. Check that the appropriate machine/attachment is actually available. Bench-based exercises require a bench as well as the weight. Combined legacy entries match equipment and movement as paired variants. Similar movements are not interchangeable loads or identical muscle emphasis.

Equipment choices are remembered only while the app remains open. Filtering never writes workout data. Unknown custom exercises use Any movement; unknown alternatives are excluded rather than guessed. If filters yield no choices, submission is disabled. Submission rechecks filters, workout status and duplicate IDs.

Only remaining sets in the current draft are swapped. Logged sets retain their original exercise ID. Saved routines, previous workouts, progression, rotation, preferences and backup formats retain their existing behavior. All 39 stable catalogue IDs and media remain unchanged. The helper is precached for offline use; the existing GIF cache is retained.

Validation:
- `node tests/store.test.cjs`
- `node tests/exercise-swaps.test.cjs`
- `node tests/exercise-demos.test.cjs`
- `node tests/muscle-guides.test.cjs`
- `node tests/browser.test.cjs`
- `node tests/exercise-swaps-browser.test.cjs`
- `node tests/exercise-demos-browser.test.cjs`

Browser checks use Playwright; `FORGE_BROWSER_PATH` optionally supplies Chromium. No external dataset, Gym Visual media, 3D assets or new dependencies are added to the app.
