"""Assemble the approved 4x2 generated pose sheet: python script.py sheet.png."""
import sys,json,hashlib
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
sheet=Image.open(sys.argv[1]).convert('RGB');w,h=sheet.size
frames=[sheet.crop((round(c*w/4),round(r*h/2),round((c+1)*w/4),round((r+1)*h/2))).resize((600,600),Image.Resampling.LANCZOS) for r in range(2) for c in range(4)]
# Shared palette prevents palette shifts across the illustrated poses.
strip=Image.new('RGB',(600,600*8))
for i,frame in enumerate(frames):strip.paste(frame,(0,i*600))
palette=strip.quantize(colors=128,method=Image.Quantize.MEDIANCUT)
encoded=[frame.quantize(palette=palette,dither=Image.Dither.NONE) for frame in frames]
gif=root/'assets/exercise-demos/gifs/incline-dumbbell-fly.gif';poster=root/'assets/exercise-demos/posters/incline-dumbbell-fly.jpg'
encoded[0].save(gif,save_all=True,append_images=encoded[1:],duration=300,loop=0,optimize=False,disposal=2)
frames[0].save(poster,quality=88,optimize=True)
print(json.dumps(dict(bytes=gif.stat().st_size,sha256=hashlib.sha256(gif.read_bytes()).hexdigest(),frames=Image.open(gif).n_frames)))
