#!/usr/bin/env python3
"""Refresh only verified public listing facts. Review product changes before rebuilding."""
import json, ssl, urllib.request
from pathlib import Path
from datetime import datetime
from zoneinfo import ZoneInfo
root=Path(__file__).resolve().parents[1]
with urllib.request.urlopen('https://itunes.apple.com/lookup?id=6806614497&country=us',context=ssl.create_default_context(cafile='/etc/ssl/cert.pem'),timeout=40) as r: data=json.load(r)
if data['resultCount']!=1 or data['results'][0]['bundleId']!='com.atabany.trackexpenses': raise ValueError('Unexpected app')
x=data['results'][0]; f=json.loads((root/'_ops/facts.json').read_text())
for k in ['trackName','version','minimumOsVersion','languageCodesISO2A','averageUserRating','userRatingCount']: f[k]=x[k]
f['checked']=datetime.now(ZoneInfo('Asia/Dubai')).date().isoformat()
(root/'_ops/facts.json').write_text(json.dumps(f,indent=2)+'\n')
print('Verified US listing facts updated; review any product/name changes before publishing.')
