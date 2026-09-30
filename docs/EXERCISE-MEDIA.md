# Isolated exercise demonstration provider

The exercise metadata and English instruction text are imported from `hasaneyldrm/exercises-dataset` under its MIT license. The pinned revision and all mappings are documented in `EXERCISE-DATASET-MAPPING.md`.

Gym visual thumbnails and GIFs are a separate copyrighted media layer. The upstream license explicitly says cloning the dataset does not grant a media license. Its own redistribution permission is not transferred to Forge50. See `vendor/exercises-dataset/LICENSE` and `NOTICE.md`.

## This branch

- Contains metadata, source paths, and a demonstration adapter, but **no Gym visual image or GIF files**.
- Leaves `js/exercise-media-config.js` disabled. It does not request a thumbnail or animation, including from the upstream repository.
- Does not offer an in-app switch that bypasses licensing.
- Preserves the current anatomy illustrations and 3D viewer.

## After obtaining permission

1. Obtain your own Gym visual permission/license covering your intended website use and redistribution. Confirm the applicable terms and preserve the written reference.
2. Place the authorized 180×180 GIFs and JPGs in `assets/licensed-exercise-media/`, using the filenames in `js/exercise-media-data.js`. That directory is ignored by git to prevent accidental public redistribution.
3. Configure `enabled: true` and a non-empty `licenseReference` in `js/exercise-media-config.js` in a **separate media-only branch**. Keep the local base path. Publish assets only where the license permits; do not bundle them in a public PR by default.
4. Every demonstration displays `© Gym visual — https://gymvisual.com/`. Preserve the 180×180 dimensions. Related/variant records display their mapping note; the legacy combined row/pull-up entry lets the user choose a reference.

The Demo tab loads the local animation only after Play is tapped. Stop, tab changes and closing the guide unload it. Missing media shows a text fallback and does not block technique or logging. Local media is not included in the atomic app-shell precache; metadata stays available offline.

## Rebuild metadata

Download `data/exercises.json` from pinned revision `7455efae41b330c265e7cd4b78dfa848e7ce5ebd`, then run:

```sh
node tools/import-exercise-dataset.cjs /path/to/exercises.json
```

The importer checks the source Git blob hash, source count and catalog coverage. It writes compact metadata and reference manifests for the existing catalog only; it never downloads or copies media. New custom exercise IDs use Forge50's existing guide fallback and are not silently auto-mapped.
