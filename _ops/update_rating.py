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
# Ratings are kept per storefront, and the US one can be empty while others are not. The site shows the sum of the
# storefronts below with the count, never a figure for a storefront that has none. A storefront that fails to answer is
# reported and keeps its last figure, so a network error never removes real ratings.
STOREFRONTS={'us':'United States','gb':'United Kingdom','ae':'United Arab Emirates','sa':'Saudi Arabia','in':'India','eg':'Egypt','kw':'Kuwait','qa':'Qatar','bh':'Bahrain','om':'Oman','jo':'Jordan','lb':'Lebanon','ma':'Morocco','dz':'Algeria','tn':'Tunisia','iq':'Iraq','de':'Germany','at':'Austria','ch':'Switzerland','ie':'Ireland','ca':'Canada','au':'Australia','nz':'New Zealand','za':'South Africa','ng':'Nigeria','ke':'Kenya','pk':'Pakistan','bd':'Bangladesh','lk':'Sri Lanka','ph':'Philippines','my':'Malaysia','sg':'Singapore','id':'Indonesia','th':'Thailand','vn':'Vietnam','tr':'Turkey','fr':'France','es':'Spain','it':'Italy','nl':'Netherlands','be':'Belgium','se':'Sweden','no':'Norway','dk':'Denmark','fi':'Finland','pl':'Poland','pt':'Portugal','br':'Brazil','mx':'Mexico','jp':'Japan','kr':'South Korea','hk':'Hong Kong'}
by=dict(f.get('ratingsByStorefront',{})); unread=[]
for code,name in STOREFRONTS.items():
 try:
  with urllib.request.urlopen(f'https://itunes.apple.com/lookup?id=6806614497&country={code}',context=ssl.create_default_context(cafile='/etc/ssl/cert.pem'),timeout=40) as r: rows=json.load(r)['results']
 except Exception as error:
  print(f'{name}: not read ({error}); keeping the last figure'); unread.append(name); continue
 count=rows[0].get('userRatingCount',0) if rows else 0
 if count: by[code]={'name':name,'average':rows[0]['averageUserRating'],'count':count}
 else: by.pop(code,None)
f['ratingsByStorefront']=dict(sorted(by.items(),key=lambda kv:(-kv[1]['count'],kv[1]['name'])))
f['allRatingCount']=sum(v['count'] for v in by.values())
f['allRatingAverage']=round(sum(v['average']*v['count'] for v in by.values())/f['allRatingCount'],2) if f['allRatingCount'] else 0
# The date on the page is the day every storefront answered; a partial read keeps the older date.
if not unread: f['checked']=datetime.now(ZoneInfo('Asia/Dubai')).date().isoformat()
else: print('Not every storefront answered: the checked date stays '+f['checked']+'. Run again.')
(root/'_ops/facts.json').write_text(json.dumps(f,indent=2)+'\n')
print(f"Verified listing facts updated: {f['allRatingCount']} ratings, average {f['allRatingAverage']}, in {len(by)} storefronts. Review any product/name changes before publishing.")
