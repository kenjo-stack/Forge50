# Forge50 2.12.3 — 45° Back Extension (Roman Chair)

Adds the user's photographed Matrix 45-degree back extension bench and a separate **Back extension bench / Roman chair** equipment checkbox. The exercise uses the supported hip-hinge pattern and is grouped with Hamstrings/posterior-chain exercises alongside Romanian deadlifts and cable pull-throughs. A generic bench or resistance-machine checkbox does not imply this specific apparatus is available.

## Use it

1. Open Settings → Check for update → Update now.
2. Under Gym equipment, select Back extension bench / Roman chair and save.
3. In a Legs workout, choose Swap beside Romanian Deadlift, then 45° Back Extension (Roman Chair).
4. Open Guide → Demo to play its own animation, or Guide → Technique for setup and form cues.

The exercise can also be added to any saved routine through Settings → Add an exercise. Existing workouts and gym profiles are not rewritten. A swap preserves completed sets and moves only unfinished sets. The new exercise starts with **0 kg added**, rather than copying a deadlift load; log only added weight, not body mass. Profiles, sets and load convention use the existing backup format.

## Technique and artwork

Adjust and lock the split thigh pads just below the hip crease; keep feet and lower legs supported. Lower with a controlled hip hinge and a neutral spine. Return only until shoulders, hips and heels align. The written guide covers setup, execution, form checks, common mistakes and equipment.

The original anatomical artwork was made with the built-in Image Generation tool, using the user's photograph for equipment and the existing Forge50 illustrations for style. Orange highlights show glutes and hamstrings, blue shows spinal erectors, and purple outlines the focus. The locked-view motion sheet includes lowering and return poses; it is an illustrated reference rather than a filmed recording. It is preserved at `assets/exercise-demos/sources/back-extension-45-motion-sheet.png`.

Rebuild with:

```sh
python scripts/assemble-back-extension.py assets/exercise-demos/sources/back-extension-45-motion-sheet.png
```

The GIF has eight distinct 600 × 600 frames and a 3.2-second infinite loop. Its poster is precached; the GIF downloads on Demo selection and is cached after online viewing. Existing played-GIF caches remain intact. `docs/back-extension-demo.json` and `js/exercise-demo-data.js` record its size, SHA-256 and timing.

## Reference

Matrix's G3-FW52 product sheet confirms the 45-degree bench angle, adjustable support and lower-leg pads: https://content.johnsonfit.com/inc/uploaded_media/5e4b54c41d3b178e43f634d96dcbe7e1/sell_sheet/2bf6ec5f51a67c8471b5d66447982b15.pdf. The app does not claim an exact model number from the partial photograph.

Final generation brief: eight fixed-camera poses on a silver 45-degree Roman chair with split thigh pads, stationary feet/rollers/legs, arms crossed at the chest, neutral spine and a controlled hip hinge stopping at the body line. Dark navy background, anatomical torso, black shorts/shoes, orange glutes/hamstrings, blue spinal erectors and purple focus outline. Only original generated artwork is included; no third-party media is used.
