# Smarter exercise swaps · 2.9.5

Open Swap in either workout view and tap a named alternative to apply it immediately. Equipment and movement controls are collapsed under Refine choices. Open them only when you need to narrow the list. Classified exercises default to the original pattern. Any movement deliberately broadens results within the original muscle group. Matching movements rank first, then overlapping equipment. Choices already in the workout are excluded.

Equipment categories represent apparatus, not an inventory of every attachment. Check that the appropriate machine/attachment is actually available. Bench-based exercises require a bench as well as the weight. Combined legacy entries match equipment and movement as paired variants. Similar movements are not interchangeable loads or identical muscle emphasis.

Equipment choices are remembered only while the app remains open. Filtering never writes workout data. Unknown custom exercises use Any movement; unknown alternatives are excluded rather than guessed. If filters yield no choices, no swap buttons are shown. Submission rechecks filters, workout status and duplicate IDs.

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

## Saved gym profile · 2.9.6

Settings → Gym equipment includes an editable JD Gyms Oldbury preset. Review and Save gym profile once to activate it. The official club list (https://www.jdgyms.co.uk/gym/oldbury/, checked 2 October 2026) lists dumbbell sets, benches, barbell sets, cable towers/dual adjustable pulleys, strength machines and assisted chin/dip. EZ-bars are not explicitly listed and start unticked. Equipment categories describe broad apparatus; check the specific machine or attachment on the floor. This is a manual preset, not a live inventory.

Saved equipment supplies Swap's default after reload, including offline use. Refine choices remains a temporary override. Saving a profile clears that override. Profile name and equipment are included in normal backups and validated on restore; old backups remain compatible. Save affects preferences only, leaving sessions, routines and cycle intact. Empty equipment is allowed and produces no matches. Existing profile values are retained during updates. The preset button fills the form without saving until Save gym profile is pressed.

Additional validation: `node tests/gym-profile.test.cjs`, and profile save/reload/offline/preset interaction checks in `tests/exercise-swaps-browser.test.cjs`.
