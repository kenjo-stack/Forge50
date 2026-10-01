# Forge50 2.9.3 — automatic exercise demonstrations

## Release base

The original GIF release restored the pre-dataset **v2.9** application at commit `1689cab4c1b9bfb28a44608f30372c4381ada935` and added the original GIF demonstrations. That restoration was merged in PR #13. Version 2.9.2 removed the separate 3D viewer, model package, camera controls and credit panel in PR #14. Version 2.9.3 makes GIFs start automatically when Demo is selected, preserving the existing illustrations. The v2.9 Quick Swap and muscle statistics features remain.

`data.js`, `js/store.js`, `js/timer.js`, `muscle-diagrams.js`, `js/exercise-demo-data.js` and `manifest.json` are unchanged from the original GIF release; workout data, Store, timer and muscle illustrations are also unchanged from v2.9. The only `js/app.js` changes are visible release labels. There is no storage schema, exercise ID, routine, rotation, progression or backup-format change. Existing sessions keep their snapshots.

## Guide integration

Open an exercise's **Guide → Demo**. Its GIF begins automatically; the extra Play button has been removed. Technique stays the default section. Muscles shows the static illustrations directly, including the orange/blue muscle highlights and purple focus outlines and arrows.

All 39 v2.9 catalogue entries have a mapping in `js/exercise-demo-data.js`, using 39 unique local GIF files. The combined High Row / Assisted Pull-Up entry provides a selector for its two demonstrations without changing the logged exercise ID. Custom exercises without a mapping show a Technique fallback.

`js/exercise-demos.js` has no Store dependency or training-data writes. It keeps the poster while Technique is the default tab, starts the GIF when Demo is selected, and switches directly to a newly selected demonstration in the combined-entry selector. It stops and returns to the poster when leaving Demo, closing/reopening the guide or backgrounding the page. Returning to a still-open Demo starts its animation again; returning to another tab does not. The loading/playing guard avoids restarting an already active GIF. A failed load restores the poster and shows Retry; this is the only playback-related button. Selecting Demo is the user action that starts playback, including with a reduced-motion preference; animations do not start on page or guide load.

## Offline use and deployment

The app shell, demo code and 39 small posters are precached. The approximately 48 MiB GIF collection is **not** part of the initial app download. A GIF loads and is cached when its Demo is opened; previously played GIFs can then work offline. An unplayed GIF cannot load offline, but its poster, Technique and muscle guide remain available. Media cache failures do not prevent successful network playback.

The versioned service worker uses `forge50-v2.9.3-autoplay-demos` and retains the existing `forge50-v2.9.1-original-gifs-demos` media cache so previously played GIFs remain available offline. The existing explicit Update action stays in place. Old Forge50 caches are retired on activation; browser training data is not cleared. All paths are relative and checked under `/Forge50/`. Pages settings, the manifest, main/root deployment and the site's existing URL are unchanged. A review branch is not published live until the owner merges it.

## Media provenance

See `assets/exercise-demos/NOTICE.md`. These are the owner's approved original illustrated GIFs, not Gym visual or exercise-dataset assets. They contain four-pose animated references rather than a continuous recorded exercise. Written technique guidance remains available. Binary hashes and GIF frame structure are verified by the media regression test.

## Verification

Run:

```sh
node tests/store.test.cjs
node tests/muscle-guides.test.cjs
node tests/exercise-demos.test.cjs
node tests/browser.test.cjs
node tests/exercise-demos-browser.test.cjs
```

The browser tests need Playwright and Chromium, as described in `TESTING.md`. `FORGE_BROWSER_PATH` optionally selects an installed Chromium executable. Tests use isolated local profiles, not the owner's training data. The browser suite opens all 39 illustrations offline and checks that old model caches are retired while GIFs and saved drafts survive an explicit app update.

For a downloadable preview, extract the full application ZIP and start `python3 -m http.server 8000 --bind 127.0.0.1` in its folder, then visit `http://localhost:8000`. Opening the ZIP itself does not start the app. Previewing at another origin uses separate browser data; a backup can be restored through Settings to inspect an existing training history.
