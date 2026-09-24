# FORGE50 2.0 — Test notes

## Checks completed

16 automated storage/data checks and 15 Chromium browser workflow checks passed.

Data checks cover:
- Multiple workouts and cycling on one date without overwriting progress.
- Resuming drafts and finishing without duplicate history or repeated cycle advancement.
- Shoulder-to-chest wraparound and optional legs preserving the upper-body order.
- Cycling and days off leaving the sequence unchanged.
- Zero-weight sets, invalid numbers and atomic state updates.
- Personal-record detection before updating the saved record.
- Actual set volume, including paired dumbbell convention.
- Date correction and calendar-day calculations.
- Routine edits preserving historical session snapshots.
- Progression considering all working sets and actual effort.
- Backup validation, restore and recovery copy.
- Rejection of unsafe imported identifiers.
- v1.5 migration with complete raw legacy data retention.
- Corrupt-data protection and failed-save handling.

Browser checks cover:
- Home, workout and progress screens at 390 × 844, plus desktop at 1280 × 900.
- Set logging, personal-record feedback and draft reload persistence.
- User notes rendered as text.
- Rest timer continuity while navigating.
- Cycling activity logging alongside lifting.
- Shortened workout finish and reopening without duplication.
- Date editing and routine setting changes.
- Backup preview and restoration.
- Calendar navigation.
- Automatic v1.5 migration and opening imported history.
- Offline reload, starting a session and opening an exercise guide.
- A waiting service worker update applied explicitly, with draft preservation.
- No uncaught JavaScript errors during those workflows.

## Try this yourself

Use sample data first if testing at a new URL.

1. Start Chest + triceps and log two sets with different reps.
2. Leave the page, return and confirm both sets are still there.
3. Log a cycling session on the same day.
4. Finish the shortened workout; Home should show Back + biceps next.
5. Open the completed workout from Progress. Confirm there is only one entry.
6. Try an optional legs session. Confirm the next upper-body workout stays the same.
7. Change the next date on Home, then check the calendar.
8. Export a backup and restore it. Check the preview before confirming.
9. In Settings, change an exercise's sets/rest/increment. Start a new session to see the change; previous sessions should keep their original settings.

## Practical limits

- These browser tests used headless Chromium, not a physical Android or iPhone. Confirm installation, sound/vibration and keyboard behaviour on your device.
- Rest timing catches up after backgrounding; an audible alarm while the phone is locked is not guaranteed by mobile browsers.
- No cloud sync. Different browsers/devices/website origins hold separate data; use exports to transfer it.
- The calendar shows logged activities and the next planned workout. It does not create a full future recurring schedule.
- Imported v1.5 data cannot reveal unrecorded individual sets. It is shown as original exercise summaries, not converted into invented set counts.
- Actual training records from your phone were not present in the ZIP. Migration and restore were tested using representative sample v1.5 exports.

## Developer checks

- `node tests/store.test.cjs` requires only Node.js.
- `tests/browser.test.cjs` additionally needs Playwright and Chromium. Install Playwright separately with `npm install playwright` and `npx playwright install chromium` if you want to rerun it. Tests use a local HTTP server and isolated browser profiles; they do not use your real browser data.
