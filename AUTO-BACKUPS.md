# Automatic local backups · Forge50 2.10.1

Backups are enabled automatically and remain on the same device/browser. No account, server, cloud upload, or phone–PC sync is added. Clearing site storage, browser eviction, uninstall behavior that removes storage, or losing the device can remove both live data and local copies. Keep an exported file somewhere separate for that protection.

## What is saved

- A separate IndexedDB database holds the latest saved dataset plus at most seven dated restore points.
- Daily points preserve the valid state from the first use/change on that local calendar day; an existing daily point is never overwritten.
- Completing a lifting workout creates a restore point.
- Deleting/replacing sessions or changing routine templates queues a copy of the previous valid state.
- Restoring through the UI attempts to save a point before replacement; the existing Undo last restore recovery copy is still preserved by Store.restore.
- Latest data is debounced for one second after changes. Hiding the app/page flushes pending work. A force-close before asynchronous writes finish can interrupt a pending backup; live set logging still uses its existing immediate save.

Copies include sessions, routines, coach check-ins, gym equipment, rotation and preferences in the existing schema-2 backup envelope. Existing IDs, media, logging and progression rules are unchanged. IndexedDB and the backup queue are separate from the live localStorage key. A failed backup never blocks a successful workout save. Backup failures are reported in Settings; oldest restore points are pruned only in the same successful transaction as a new point.

## Using backups

Settings → Automatic local backups shows dates, reasons and session counts. Preview does not change data. Restore is an explicit action and checks the snapshot with Store.readBackup/validate before replacement. Download produces a normal Forge50 JSON backup. Create restore point now is optional; backups continue without pressing it.

The recovery screen also lists automatic backups if the live record cannot be read. Corrupt snapshots are rejected without replacing live data; the original unreadable live value is retained by the existing recovery-copy mechanism when restoring a valid snapshot. Restore controls guard duplicate taps while the asynchronous backup is pending.

## Checks

`tests/auto-backups.test.cjs` uses fake-indexeddb (test-only; `npm install --no-save fake-indexeddb`, or FORGE_BACKUP_TEST_MODULES) for daily immutability, latest/completed/pre-deletion copies, retention, quota isolation, retry, corrupt snapshots and failed primary saves.

`tests/auto-backups-browser.test.cjs` uses Playwright to exercise preview/restore, download, deleted-draft recovery, offline operation, corrupt-live-data recovery, mobile layout and visible backup-failure status. FORGE_BROWSER_PATH can specify Chromium. Existing store, coach, gym, swap, media and browser suites remain part of validation.

The new module is cached with the 2.10.1 shell. Existing GIF cache and GitHub Pages configuration are retained.
