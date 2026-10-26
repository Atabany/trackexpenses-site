#!/usr/bin/env python3
"""Regenerate small delivery variants; originals remain the design source. Requires Pillow."""
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
icon=Image.open(root/'assets/icon.png').convert('RGBA')
icon.resize((128,128),Image.Resampling.LANCZOS).save(root/'assets/icon-128.webp',quality=88)
icon.resize((96,96),Image.Resampling.LANCZOS).save(root/'assets/favicon.png',optimize=True)
poster=Image.open(root/'assets/hero-poster.png').convert('RGB')
poster.save(root/'assets/hero-poster.webp',quality=82)
for name in ['transactions','budget']:
 source=Image.open(root/f'assets/screenshots/{name}.webp').convert('RGB')
 for width in [320,480]:
  height=round(source.height*width/source.width)
  source.resize((width,height),Image.Resampling.LANCZOS).save(root/f'assets/screenshots/{name}-{width}.webp',quality=84)
print('Optimized app icon, favicon, film poster and responsive hero screenshots.')
