# Original Forge50 exercise demonstrations

These 39 GIFs and their static posters are the original anatomical illustrations generated for Forge50 and reviewed by its owner. No Gym visual media or external exercise-dataset media is included.

Each 600 × 600 GIF loops a sequence of four illustrated poses, encoded as 28 frames with a 2.33-second cycle. Orange highlights depict primary muscles, blue depicts supporting muscles, and purple outlines/arrows depict focus or movement. These are illustrative references: camera, equipment and anatomy details can vary between generated poses. They are not motion-capture recordings or professionally certified technique demonstrations. The existing written Technique guide remains the source for setup and form cues.

Assets were assembled from original generated artwork with FFmpeg. `js/exercise-demo-data.js` records the local paths, byte counts and SHA-256 hashes. No third-party footage, GIF hotlinks, video embeds, tracking or network media API is used.

The legacy `high-row-machine-assisted-pull-up` catalogue entry offers separate High Row Machine and Assisted Pull-Up demos. Its exercise ID and workout records remain unchanged. The separate `high-row-machine` entry reuses the High Row Machine asset.


## Incline Dumbbell Fly — 2.11.4
Original artwork generated with the built-in image-generation tool for Forge50. No third-party exercise media. This 600 × 600 GIF loops eight illustrated poses over 2.4 seconds, using the existing orange primary / blue secondary / purple focus palette. It is an illustrated movement reference, not a continuous filmed demonstration. Technique guidance remains available. The original 39 GIFs are unchanged.

Assembly: `python scripts/assemble-incline-fly.py sheet.png` using Pillow. The source sheet has four columns and two rows of equal square cells. Final generation brief: eight locked-camera incline dumbbell fly poses with slightly bent arms sweeping inward and outward, grey fibrous anatomy, orange chest, blue front deltoids, purple chest outline and curved movement arrows, dark navy background, black shorts/shoes and incline bench.
