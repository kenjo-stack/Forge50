"""Encode the original eight-pose Roman-chair artwork without altering its poses.

Usage: python scripts/assemble-back-extension.py /absolute/path/to/sheet.png
Reads four columns by two rows, including the lowering and return sequence.
"""
import hashlib
import json
import sys
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
slug = 'back-extension-45'
with Image.open(sys.argv[1]) as source:
    source = source.convert('RGB')
    w, h = source.size
    assert abs(w / h - 2) < .02, 'Expected four columns by two rows of square panels'
    frames = []
    for row in range(2):
        for col in range(4):
            box = (round(col*w/4)+2, round(row*h/2)+2,
                   round((col+1)*w/4)-2, round((row+1)*h/2)-2)
            frames.append(source.crop(box).resize((600, 600), Image.Resampling.LANCZOS))

strip = Image.new('RGB', (600, 4800))
for i, frame in enumerate(frames):
    strip.paste(frame, (0, i*600))
palette = strip.quantize(colors=128, method=Image.Quantize.MEDIANCUT)
encoded = [frame.quantize(palette=palette, dither=Image.Dither.NONE) for frame in frames]
gif = root / f'assets/exercise-demos/gifs/{slug}.gif'
poster = root / f'assets/exercise-demos/posters/{slug}.jpg'
encoded[0].save(gif, save_all=True, append_images=encoded[1:],
                duration=400, loop=0, optimize=False, disposal=2)
frames[0].save(poster, quality=88, optimize=True)
with Image.open(gif) as animation:
    hashes, duration = set(), 0
    for i in range(animation.n_frames):
        animation.seek(i)
        hashes.add(hashlib.sha256(animation.convert('RGB').tobytes()).hexdigest())
        duration += animation.info.get('duration', 0)
    assert animation.size == (600, 600) and animation.n_frames == 8
    assert animation.info.get('loop') == 0 and duration == 3200
    assert len(hashes) == 8, 'All eight poses must be distinct'
content = gif.read_bytes()
asset = {'name':'45° Back Extension (Roman Chair)',
         'gif':gif.relative_to(root).as_posix(),
         'poster':poster.relative_to(root).as_posix(),
         'bytes':len(content), 'sha256':hashlib.sha256(content).hexdigest(),
         'frames':8, 'durationMs':duration, 'distinctFrames':len(hashes)}
(root / 'docs/back-extension-demo.json').write_text(json.dumps(asset, indent=2)+'\n')
print(json.dumps(asset))
