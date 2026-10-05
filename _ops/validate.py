#!/usr/bin/env python3
"""Publication gate: links/assets/anchors, facts, structured data and discovery coverage."""
import json, re, sys, xml.etree.ElementTree as ET
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote, parse_qs
ROOT=Path(__file__).resolve().parents[1]
BASE=json.loads((ROOT/'_ops/config.json').read_text())['base_url'].rstrip('/')+'/'
FACTS=json.loads((ROOT/'_ops/facts.json').read_text())
problems=[]
class Parser(HTMLParser):
 def __init__(self):
  super().__init__(); self.links=[]; self.images=[]; self.h1=0; self.title=''; self.in_title=False; self.desc=''; self.canon=''; self.ids=set(); self.ld=[]; self.buffer=''; self.in_ld=False; self.text=[]; self.noindex=False; self.banner=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'): self.ids.add(a['id'])
  if tag=='h1': self.h1+=1
  if tag=='title': self.in_title=True
  if tag=='meta':
   if a.get('name')=='description': self.desc=a.get('content','')
   if a.get('name')=='robots' and 'noindex' in a.get('content',''): self.noindex=True
   if a.get('name')=='apple-itunes-app' and a.get('content')=='app-id=6806614497': self.banner=True
  if tag=='link' and a.get('rel')=='canonical': self.canon=a.get('href','')
  if tag=='script' and a.get('type')=='application/ld+json': self.in_ld=True; self.buffer=''
  if tag=='img': self.images.append(a)
  for key in ['href','src','poster','data-src']:
   if a.get(key): self.links.append(a[key])
 def handle_endtag(self,tag):
  if tag=='title': self.in_title=False
  if tag=='script' and self.in_ld: self.ld.append(self.buffer); self.in_ld=False
 def handle_data(self,t):
  if self.in_title: self.title+=t
  if self.in_ld: self.buffer+=t
  else: self.text.append(t)
parsers={}
for f in ROOT.rglob('*.html'):
 if any(x in f.relative_to(ROOT).parts for x in ['_content','_ops']): continue
 p=Parser(); p.feed(f.read_text()); parsers[f.resolve()]=p
sitemap={x.text for x in ET.parse(ROOT/'sitemap.xml').findall('.//{*}loc')}
llms=(ROOT/'llms.txt').read_text(); full=(ROOT/'llms-full.txt').read_text()
seen_titles=set(); seen_desc=set(); expected=set()
for f,p in parsers.items():
 rel=f.relative_to(ROOT).as_posix(); raw=f.read_text()
 def fail(t): problems.append(rel+': '+t)
 for link in p.links:
  u=urlsplit(link)
  if u.scheme or u.netloc:
   if u.hostname=='apps.apple.com' and '6806614497' in u.path:
    q=parse_qs(u.query)
    if q.get('pt')!=['127826363'] or q.get('mt')!=['8'] or not q.get('ct') or len(q['ct'][0])>40: fail('invalid campaign '+link)
   if u.scheme in ['http','https'] and u.hostname!='apps.apple.com' and link in re.findall(r'<script[^>]+src="([^"]+)"',raw): fail('external script')
   continue
  if not u.path: target=f
  elif u.path.startswith('/'):
   base_path=urlsplit(BASE).path
   local=u.path.removeprefix(base_path) if u.path.startswith(base_path) else u.path.lstrip('/')
   target=(ROOT/local).resolve()
  else: target=(f.parent/unquote(u.path)).resolve()
  if target.is_dir(): target=target/'index.html'
  if not target.exists(): fail('broken link '+link)
  elif u.fragment and target in parsers and unquote(u.fragment) not in parsers[target].ids: fail('missing anchor '+link)
 for im in p.images:
  if any(k not in im for k in ['alt','width','height']): fail('image missing alt/dimensions')
 if p.h1!=1: fail('expected one H1')
 if not p.banner: fail('missing Smart App Banner')
 schemas=[]
 for ld in p.ld:
  try: value=json.loads(ld); schemas+=value if isinstance(value,list) else [value]
  except Exception: fail('invalid JSON-LD')
 visible=' '.join(p.text)
 for s in schemas:
  if s.get('@type')=='FAQPage':
   for q in s['mainEntity']:
    if q['name'] not in visible or q['acceptedAnswer']['text'] not in visible: fail('FAQ differs from visible text')
  if s.get('aggregateRating') and not FACTS['userRatingCount']: fail('rating fabricated at zero count')
 if not any(s.get('@type')=='BreadcrumbList' for s in schemas): fail('missing breadcrumbs')
 if p.title in seen_titles or p.desc in seen_desc: fail('duplicate metadata')
 seen_titles.add(p.title); seen_desc.add(p.desc)
 if len(p.title)>60 or not p.title: fail('title length '+str(len(p.title)))
 if len(p.desc)>155 or not p.desc: fail('description length '+str(len(p.desc)))
 for banned in [r'\$\d',r'AI-powered',r'TrackExpenses: Money Manager',r'guaranteed ranking',r'#1 app',r'no external services']:
  if re.search(banned,visible,re.I): fail('banned/outdated copy '+banned)
 if p.noindex: continue
 url=BASE+('' if rel=='index.html' else rel); expected.add(url)
 if p.canon!=url: fail('wrong canonical')
 if url not in sitemap or url not in llms or url not in full: fail('missing discovery coverage')
 if rel.startswith('guides/') and rel!='guides/index.html':
  # Count authored guide, excluding shared navigation/facts/related boilerplate.
  source=ROOT/'_content'/Path(rel).with_suffix('.md')
  words=len(re.findall(r'\b[\w’]+\b',re.sub(r'https?://\S+','',source.read_text())))
  if not 800<=words<=1300: fail('authored guide word count '+str(words))
  if not any(s.get('@type')=='Article' for s in schemas): fail('missing Article')
if expected!=sitemap: problems.append('sitemap has missing/extra pages')
for bot in ['OAI-SearchBot','ChatGPT-User','GPTBot','ClaudeBot','Claude-SearchBot','Claude-User','PerplexityBot','Google-Extended','Applebot','Applebot-Extended','Bingbot']:
 if f'User-agent: {bot}\nAllow: /' not in (ROOT/'robots.txt').read_text(): problems.append('missing bot '+bot)
if not (ROOT/'assets/og.png').exists(): problems.append('missing OG image')
if problems: print('\n'.join(problems)); sys.exit(1)
print(f'OK — {len(expected)} indexable pages; links, anchors, metadata, schema, campaigns and facts verified')
