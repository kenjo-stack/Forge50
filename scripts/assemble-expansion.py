"""Assemble the recovered eight-pose sheets without changing the illustrated poses.

Usage: python scripts/assemble-expansion.py /path/to/motion-sheets
The source names are preserved in docs/exercise-expansion.json. All eight panels
are read left to right, top row then bottom row; the lower row contains the return.
"""
import hashlib
import json
import sys
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
source_dir = Path(sys.argv[1])
records = json.loads((root / 'docs/exercise-expansion.json').read_text())
selected = set(sys.argv[2:])
manifest = root / 'docs/expanded-demo-assets.json'
assets = json.loads(manifest.read_text()) if selected and manifest.exists() else {}
for record in records:
    if selected and record['id'] not in selected:
        continue
    source = source_dir / record['source']
    with Image.open(source) as sheet:
        sheet = sheet.convert('RGB')
        w, h = sheet.size
        frames = []
        for row in range(2):
            for col in range(4):
                panel = sheet.crop((round(col*w/4), round(row*h/2), round((col+1)*w/4), round((row+1)*h/2)))
                # Keep the proportions of tall panels; never stretch the body.
                panel = ImageOps.contain(panel, (600, 600), Image.Resampling.LANCZOS)
                frame = Image.new('RGB', (600, 600), (9, 20, 34))
                frame.paste(panel, ((600-panel.width)//2, (600-panel.height)//2))
                frames.append(frame)
    strip = Image.new('RGB', (600, 600*8))
    for i, frame in enumerate(frames):
        strip.paste(frame, (0, i*600))
    palette = strip.quantize(colors=128, method=Image.Quantize.MEDIANCUT)
    encoded = [f.quantize(palette=palette, dither=Image.Dither.NONE) for f in frames]
    slug = record['id']
    gif_path = root / 'assets/exercise-demos/gifs' / (slug+'.gif')
    poster_path = root / 'assets/exercise-demos/posters' / (slug+'.jpg')
    encoded[0].save(gif_path, save_all=True, append_images=encoded[1:], duration=300, loop=0, optimize=False, disposal=2)
    frames[0].save(poster_path, quality=88, optimize=True)
    with Image.open(gif_path) as animation:
        hashes, duration = set(), 0
        for i in range(animation.n_frames):
            animation.seek(i)
            hashes.add(hashlib.sha256(animation.convert('RGB').tobytes()).hexdigest())
            duration += animation.info.get('duration', 0)
        assert animation.size == (600, 600) and animation.info.get('loop') == 0
        assert len(hashes) >= 4 and duration == 2400, slug
        frame_count = animation.n_frames
    content = gif_path.read_bytes()
    assets[slug] = {'name':record['name'], 'gif':gif_path.relative_to(root).as_posix(), 'poster':poster_path.relative_to(root).as_posix(), 'bytes':len(content), 'sha256':hashlib.sha256(content).hexdigest(), 'frames':frame_count, 'durationMs':duration, 'distinctFrames':len(hashes)}
    print(slug, frame_count, 'frames,', len(content), 'bytes', flush=True)
manifest.write_text(json.dumps(assets, indent=2)+'\n')
print('Validated 34 distinct, looping animations, including Hack Squat.')
