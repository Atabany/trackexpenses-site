#!/usr/bin/env python3
"""Assets of the download pages (21 November 2026): the app icon at the hero's size and the desktop QR code.

Run once after the icon or the store link changes; the outputs are committed, so the site build needs neither Pillow nor
segno. The QR code opens the App Store listing with its own campaign tag (dl-qr), so App Analytics shows how many installs
came from a computer screen. Error correction H leaves room for the app icon drawn over its centre.
"""
from pathlib import Path
from PIL import Image
import segno

ROOT = Path(__file__).resolve().parents[1]
STORE_QR = 'https://apps.apple.com/app/apple-store/id6806614497?pt=127826363&ct=dl-qr&mt=8'

icon = Image.open(ROOT / 'assets/press/trackexpenses-icon-1024.png').convert('RGB')
icon.resize((360, 360), Image.Resampling.LANCZOS).save(ROOT / 'assets/icon-360.webp', quality=90, method=6)

qr = segno.make(STORE_QR, error='h', micro=False)
qr.save(str(ROOT / 'assets/download-qr.svg'), kind='svg', border=0, dark='#0b1f17', light=None,
        xmldecl=False, omitsize=True, nl=False, title='TrackExpenses on the App Store')
print(f'icon-360.webp written; QR version {qr.version}, error {qr.error}, {qr.symbol_size(border=0)[0]} modules: {STORE_QR}')
