# Forge50 2.9.1 — original GIF demonstrations

## Release base

This release intentionally restores the pre-dataset **v2.9** application at commit `1689cab4c1b9bfb28a44608f30372c4381ada935` and adds the original GIF demonstrations. Because the repository's main branch already includes dataset integration (merge `39d22c14f42c437a37e38c190b7e668bd582f8ad`), the development branch reverses that integration before adding these features. Merging this PR will remove dataset metadata, its external-media adapter and dataset-based swap ranking. The v2.9 Quick Swap and muscle statistics features remain.

`data.js`, `js/store.js`, `js/timer.js`, `js/anatomy-maps.js`, `js/anatomy-viewer.js`, `muscle-diagrams.js` and `manifest.json` are byte-identical to v2.9. The only `js/app.js` changes are visible release labels. There is no storage schema, exercise ID, routine, rotation, progression or backup-format change. Existing sessions keep their snapshots. The existing 3D anatomy and its attribution remain separate and unchanged.

## Guide integration

Open an exercise's **Guide → Demo → Play demo**. Technique stays the default section. Muscles still shows the static illustrations before the optional 3D anatomy.

All 39 v2.9 catalogue entries have a mapping in `js/exercise-demo-data.js`, using 39 unique local GIF files. The combined High Row / Assisted Pull-Up entry provides a selector for its two demonstrations without changing the logged exercise ID. Custom exercises without a mapping show a Technique fallback.

`js/exercise-demos.js` has no Store dependency or training-data writes. It shows a static poster until Play is tapped, returns to the poster on Stop, and stops when leaving the Demo section, closing/reopening the guide or backgrounding the page. It does not claim to pause and resume an animated GIF. Failure restores the poster and a Retry control. No animation autoplays, including when reduced motion is enabled.

## Offline use and deployment

The app shell, demo code and 39 small posters are precached. The approximately 48 MiB GIF collection is **not** part of the initial app download. A GIF loads and is cached only after Play; previously played GIFs can then work offline. An unplayed GIF cannot load offline, but its poster, Technique and muscle guide remain available. Media cache failures do not prevent successful network playback.

The versioned service worker uses `forge50-v2.9.1-original-gifs` and a separate `-demos` cache, retaining the existing explicit Update action. Old Forge50 caches are retired on activation; browser training data is not cleared. All paths are relative and checked under `/Forge50/`. Pages settings, the manifest, main/root deployment and the site's existing URL are unchanged. This branch is not published live until the owner merges it.

## Media provenance

See `assets/exercise-demos/NOTICE.md`. These are the owner's approved original illustrated GIFs, not Gym visual or exercise-dataset assets. They contain four-pose animated references rather than a continuous recorded exercise. Written technique guidance remains available. Binary hashes and GIF frame structure are verified by the media regression test.

## Verification

Run:

```sh
node tests/store.test.cjs
node tests/anatomy.test.cjs
node tests/exercise-demos.test.cjs
node tests/browser.test.cjs
node tests/anatomy-browser.test.cjs
node tests/exercise-demos-browser.test.cjs
```

The browser tests need Playwright and Chromium, as described in `TESTING.md`. `FORGE_BROWSER_PATH` optionally selects an installed Chromium executable. Tests use isolated local profiles, not the owner's training data. Existing anatomy fixtures were corrected to read the actual 12 packed model chunks and await asynchronous camera controls; the browser routine fixture now navigates to Workout before selecting a workout.

For a downloadable preview, extract the full application ZIP and start `python3 -m http.server 8000 --bind 127.0.0.1` in its folder, then visit `http://localhost:8000`. Opening the ZIP itself does not start the app. Previewing at another origin uses separate browser data; a backup can be restored through Settings to inspect an existing training history.
