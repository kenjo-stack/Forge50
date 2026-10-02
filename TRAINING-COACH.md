# Training Coach · Forge50 2.10.0

Open Training Coach from Home for next-session targets and a rolling four-week review. Choose any saved routine. During a workout, the coach provides a saved energy/discomfort check-in and expandable recommendations in both full and guided views.

The coach is local and offline. It needs no API key, account, or AI subscription. Reports never mutate workout data. Exercise IDs, routines, rotation, original media and Pages configuration are unchanged. Check-ins are optional validated session metadata included in backups; old backups remain compatible.

## Recommendation rules

- Use completed, non-imported exercise snapshots from the last 12 weeks with matching exercise ID, weight mode and rep range. Ignore the active session and future dates. Same-date/time ties prefer the later stored session.
- New or incompatible history: build a baseline.
- Current discomfort/pain: withhold progression targets. Previous discomfort without a current check-in: ask for a check-in first. Fatigue: hold progression.
- Incomplete/skipped work or changed set count: repeat and reassess. Missing RIR or RIR below the saved target also withholds progression targets.
- Complete sets at the top of the range with target RIR, at one load: suggest the saved increment and return to the lower rep bound. The increment must not exceed 10% of the existing load. No automatic bodyweight/assistance progression.
- Otherwise, add at most one rep inside the saved range at the same load.
- Three comparable completed sessions at matching loads without rep improvement: prompt a review of rest, technique and recovery. This heuristic is not proof of a plateau. It never automatically adds volume or rewrites a programme.

These are transparent product rules, not a diagnosis or a claim of optimal individual programming. The app links ACSM resistance training guidance and NHS joint pain information. General references: https://acsm.org/resistance-training-guidelines-update-2026/ and https://www.nhs.uk/symptoms/joint-pain/.

## Applying targets

Tap Use in empty sets. Only draft sessions and non-skipped exercises are eligible. A set must be unlogged and have both weight and reps blank. Logged sets, partially entered sets and saved routines stay intact; RIR is never invented. Existing full/guided target actions now use this same coach gate, rather than offering progression after incomplete or missing-effort history. The Store's existing progression helper remains unchanged.

## Four-week review

Primary-muscle set counts compare the last 28 days with the preceding 28. Secondary-muscle work is not counted. The Back/Chest note describes recorded work and cannot assess posture. Exercise improvement compares earliest/latest complete matching snapshots inside the current window: more reps at unchanged loads, or higher loads with no reduction in any compared reps. This does not estimate muscle growth. Missing comparisons show a baseline message.

## Validation

Run `node tests/store.test.cjs`, `node tests/training-coach.test.cjs`, `node tests/gym-profile.test.cjs`, `node tests/exercise-swaps.test.cjs`, `node tests/exercise-demos.test.cjs`, and `node tests/muscle-guides.test.cjs`.

Playwright suites: `tests/training-coach-browser.test.cjs`, `tests/browser.test.cjs`, `tests/exercise-swaps-browser.test.cjs`, `tests/exercise-demos-browser.test.cjs`. Set FORGE_BROWSER_PATH when using an external Chromium executable.
