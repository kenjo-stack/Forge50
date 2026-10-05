# Visual Workout Cockpit · 2.11.0

Open a workout and tap Start guided workout. The cockpit appears first; session notes/tools and the Coach remain available below in expandable sections. Switch to full workout stays visible at the top.

- Tap the exercise map to jump to any exercise; the selected tile is brought into the map's view. Completed, active, partially logged and skipped exercises have distinct states, text and accessible labels.
- Swipe horizontally across the title/demo area to change exercises. Vertical scrolling and field/button interaction do not swipe. Skipped exercises are bypassed by swipes and can still be opened from the map. Buttons remain available for keyboard/touch navigation.
- Existing weight/reps/RIR inputs stay available, with larger controls and +/- steppers. Adjustments use the existing input/save path. Copy last set copies previous weight/reps and leaves actual RIR blank. Nothing logs without the Log set action.
- An inline original local GIF shows the current movement, with Pause/Play. Combined entries retain their existing demonstration selector. Custom exercises get a guide fallback. Only the current cockpit animation plays; leaving it, hiding the page or opening Guide stops it. Uncached offline media falls back to its poster. Played GIFs use the existing offline media cache.
- Reduced-motion users see a static poster by default and can explicitly play it. Celebrations respect reduced motion.
- The rest ring shows remaining time, pause and completion visually. The original timer's sound and vibration have been removed from the active module; no microphone, voice or audio functionality is added. Starting/skipping/adjusting/restoring continues to use the existing timer state.
- A brief dismissible visual celebration accompanies a new record when a prior best exists. The finish recap shows logged sets, duration and exercise records, followed by the existing performance comparisons. Records compare weight then reps against earlier recorded workouts; this does not measure muscle growth. No record is invented for a first baseline set.

Store, routine snapshots, rotation, exercise IDs, coach rules, gym profile and backup schema are unchanged. New cockpit state is temporary UI state. Version/shell cache is 2.11.0; Pages configuration and GIF cache are retained.

Validation includes tests/cockpit-browser.test.cjs (touch controls, logging/PR, silent rest completion, map/swipe/skip, demo/Guide lifecycle, narrow-screen layout, recap, offline shell and reduced motion), the existing general/full-rest/coach/swap/backup/demo browser suites, and Store/coach/gym/swap/backup/media unit checks. Browser suites use Playwright; FORGE_BROWSER_PATH optionally supplies Chromium. fake-indexeddb is only used by backup tests.
