# FORGE50 2.0 — Your Training Rhythm

## Start here

1. Extract this ZIP completely.
2. For a quick desktop preview, open `index.html` in your browser. If your browser blocks local storage on file URLs, use the local server below.
3. For reliable testing, run a local server from this folder:

   Windows (Python installed): double-click `START-WINDOWS.bat`.

   Or run `python3 -m http.server 8000 --bind 127.0.0.1` and open `http://localhost:8000`.

   Keep the server terminal open while testing. Ctrl+C stops it.
4. For your installed phone app, upload the extracted app files to the same HTTPS website and path you already use for Forge50. This ZIP is the app source, not an Android APK or iPhone installer. No build step or account is required.

## Bring your existing data

Before changing your hosted app, use **Settings → Export All Data** in v1.5.

- On the same website and browser, v2 imports existing v1.5 records automatically the first time it starts. It leaves the old storage keys untouched.
- On a new URL, browser or device, use **Settings → Restore a Forge50 backup** and choose your v1.5 export. Review the preview, then restore.
- A restore replaces current v2 data. Export current records first if you want to keep them. **Undo last restore** recovers the previous v2 data.
- Browser data does not automatically sync between devices. Keep periodic backup exports.

Old records remain labelled **Imported**. Version 1.5 stored exercise summaries, not each set. These summaries are preserved without estimating missing sets, and are excluded from new working-set statistics and progression targets. Duplicate old completion records on the same day/workout are grouped in the visible history; the complete original data, including original personal records, is retained inside every backup. Imported sessions are read-only.

## Your new routine

**Chest + triceps → day off / cycling → back + biceps → day off / cycling → shoulders + abs → day off / cycling → repeat.**

- Home shows the next workout, independently of weekdays.
- Completing a strength session plans the next one after a day off weights.
- Legs are optional and preserve your position in the upper-body rotation. They also allow a following day off weights.
- Cycling and logged days off do not advance the rotation.
- Use **Change next workout or date** to select where you are in the routine and change the next planned date. Use **Add a day off** to postpone it by one day.
- The calendar shows logged activities and the next planned strength session. It does not assume future workouts were completed.

## During your workout

- Each working set has its own weight, reps and optional actual RIR (repetitions you could still do).
- Weight 0 is supported for bodyweight/added-weight exercises. Dumbbells default to the weight of one dumbbell; total volume counts both. Change weight convention in Settings when needed.
- Inputs save automatically. Tap **Log** to mark a set complete; tap the check mark to undo it.
- Add/remove unlogged sets, skip remaining sets, and record notes.
- **Finish workout** also supports shortened sessions. The rotation advances once.
- Reopen a session from Progress to edit its date or sets. This does not advance the rotation again or reschedule the next session. Use Home to adjust the plan separately.
- Starting the same workout on the same date resumes its unfinished session. A completed session stays a separate record.

## Progression and rest

Suggestions use the previous completed session with the same exercise and weight convention. A load increase requires all prescribed sets to reach the top of the rep range and meet the recorded RIR target. The increment is configurable per exercise. Suggestions are optional targets; you choose the weight. Default increments are deliberately small and should be adjusted to your equipment.

Rest ranges from the old app use their upper end (2–3 minutes = 3 minutes). Start rest with the exercise's Rest button. The timer keeps an end time and catches up after backgrounding; sound/vibration while locked depends on the browser and phone settings.

## Settings

Edit sets, rep ranges, target RIR, rest duration, weight increments, weight convention, exercise order and routine membership. You can add exercises from the existing library or create your own. Existing sessions keep their own exercise snapshots. Built-in exercises retain the offline technique guides; custom exercises do not receive invented guides.

## Testing this release

See `TESTING.md` for the checks performed and a short hands-on checklist. Run `node tests/store.test.cjs` to repeat the storage and progression checks (Node.js needed only for developer tests).

## Offline updates

After a successful first load over HTTPS or localhost, the app shell is cached for offline use. Subsequent app versions wait for the **Update now** action. Saved inputs and sessions survive reloads. When upgrading from v1.5, that old version's update mechanism may reload once; export your data and finish the old session before deploying.
