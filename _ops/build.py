#!/usr/bin/env python3
"""Build crawlable HTML from reviewed content. No network access at build time."""
import html, json, re, sys
from pathlib import Path
from urllib.parse import urlencode
ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT/'_ops/config.json').read_text())
BASE = CONFIG['base_url'].rstrip('/')+'/'
FACTS = json.loads((ROOT/'_ops/facts.json').read_text())
APP = '6806614497'
STORE = f'https://apps.apple.com/app/id{APP}'
FACT_BLOCK = ('Expense Tracker: SMS & Voice (TrackExpenses) is made by Mohamed Elatabany for iPhone and iPad with iOS/iPadOS 17 or later. '
 'The interface is English. No app account or bank login is required. Optional Shortcuts automations import supported bank SMS and Wallet purchases; the app does not read your Messages inbox. '
 'Voice entry creates on-device drafts on compatible devices and languages and requires Pro. The free ledger includes unlimited manual transactions, budgets, historical stats, search, monthly CSV export, private iCloud sync, 3 accounts, 3 recurring rules and 20 successful automatic bank SMS imports per calendar month per device. '
 'Pro adds unlimited SMS imports, accounts and recurring rules, forecasts, daily budget guidance, what-if planning, voice entry, CSV import, date-range CSV exports, full JSON backup and restore, themes and alternate icons. '
 'Monthly and annual subscriptions and a one-time lifetime purchase are available. Spending calculations depend on your records and are not financial advice.')
GUIDES = {
 'bank-sms-iphone': ('Bank SMS Expense Tracking on iPhone | TrackExpenses', 'Set up a Shortcuts Message automation for supported bank alerts. Connect Shortcut Input, check entries and understand the free SMS allowance.'),
 'payday-budget': ('Start Your Budget Month on Payday | TrackExpenses', 'Set a monthly payday period for transactions, budgets and charts. Understand period boundaries, budget pacing and transfers.'),
 'voice-expenses-iphone': ('Voice Expense Tracking on iPhone | TrackExpenses', 'Say one or several purchases, review the drafts and save. Learn TrackExpenses voice entry, device support and on-device privacy.'),
 'sms-automation-not-working': ('Fix Bank SMS Automation on iPhone | TrackExpenses', 'Troubleshoot Message filters, Shortcut Input, activity logs and waiting SMS entries in TrackExpenses without duplicating purchases.'),
 'export-expenses-csv': ('Export iPhone Expenses to CSV | TrackExpenses', 'Export your selected month for free. Check dates and currencies in Numbers, and understand CSV versus a full TrackExpenses backup.'),
 'apple-pay-expenses': ('Track Apple Pay Purchases on iPhone | TrackExpenses', 'Set up a supported Shortcuts Transaction automation, map card inputs and review Wallet purchase entries for duplicates.')}

def esc(t): return html.escape(str(t), quote=True)
def slug(t): return re.sub(r'[^a-z0-9]+','-',t.lower()).strip('-')
def inline(t):
 t=esc(t)
 t=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',t)
 t=re.sub(r'\[(.+?)\]\((.+?)\)',r'<a href="\2">\1</a>',t)
 t=re.sub(r'&lt;(https?://[^&]+?)&gt;',r'<a href="\1">\1</a>',t)
 return t

def markdown(md):
 out=[]; para=[]; inlist=False
 def flush():
  if para: out.append('<p>'+inline(' '.join(para))+'</p>'); para.clear()
 for line in md.splitlines()+['']:
  if line.startswith('#') or line.startswith('- ') or not line.strip():
   flush()
   if inlist and not line.startswith('- '): out.append('</ul>'); inlist=False
   if line.startswith('#'):
    n=len(line)-len(line.lstrip('#')); t=line[n:].strip(); out.append(f'<h{n} id="{slug(t)}">{inline(t)}</h{n}>')
   elif line.startswith('- '):
    if not inlist: out.append('<ul>'); inlist=True
    out.append('<li>'+inline(line[2:])+'</li>')
  else: para.append(line.strip())
 return '\n'.join(out)

def rating():
 n=FACTS['userRatingCount']; r=FACTS['averageUserRating']
 return f'{r:.1f} on the US App Store · rated by {n:,} users' if n else 'No ratings yet in the US App Store'

def campaign(path):
 tag='web-home' if path=='index.html' else ('web-'+path.removesuffix('.html').replace('/','-'))[:40]
 return f'https://apps.apple.com/app/apple-store/id{APP}?'+urlencode({'pt':'127826363','ct':tag,'mt':'8'})

def cta(path,prefix,compact=False):
 return f'<div class="store-cta"><img class="app-icon" src="{prefix}assets/icon.png" width="48" height="48" alt="TrackExpenses app icon"><a href="{esc(campaign(path))}" aria-label="Download Expense Tracker: SMS &amp; Voice on the App Store"><img class="badge" src="{prefix}assets/app-store.svg" width="120" height="40" alt="Download on the App Store"></a></div>'

PAGES={}
def page(path,title,desc,body,kind='WebPage',faq=None,noindex=False):
 prefix='../'*path.count('/'); canonical=BASE+('' if path=='index.html' else path)
 name=re.sub('<[^>]*>','',re.search(r'<h1[^>]*>(.*?)</h1>',body,re.S).group(1))
 schema={'@context':'https://schema.org','@type':kind,'name':html.unescape(name),'url':canonical,'inLanguage':'en','description':desc}
 if kind=='Article': schema.update(headline=html.unescape(name),datePublished='2026-10-05',dateModified=CONFIG['updated'],author={'@type':'Person','name':'Mohamed Elatabany','url':BASE+'about.html'},publisher={'@type':'Person','name':'Mohamed Elatabany'})
 schemas=[schema,{'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'TrackExpenses','item':BASE}]+([] if path=='index.html' else [{'@type':'ListItem','position':2,'name':html.unescape(name),'item':canonical}])}]
 if path=='index.html':
  app={'@context':'https://schema.org','@type':'MobileApplication','name':FACTS['trackName'],'alternateName':'TrackExpenses','operatingSystem':'iOS 17+, iPadOS 17+','applicationCategory':'FinanceApplication','url':BASE,'downloadUrl':STORE,'author':{'@type':'Person','name':'Mohamed Elatabany','url':BASE+'about.html'},'description':FACT_BLOCK,'softwareVersion':FACTS['version']}
  if FACTS['userRatingCount']: app['aggregateRating']={'@type':'AggregateRating','ratingValue':FACTS['averageUserRating'],'ratingCount':FACTS['userRatingCount'],'bestRating':5,'worstRating':1}
  schemas.append(app)
 if faq: schemas.append({'@context':'https://schema.org','@type':'FAQPage','mainEntity':[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in faq]})
 ld=json.dumps(schemas,ensure_ascii=False).replace('</','<\\/')
 text=f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title><meta name="description" content="{esc(desc)}"><meta name="color-scheme" content="light dark">
<link rel="canonical" href="{canonical}"><meta name="apple-itunes-app" content="app-id={APP}">
<meta property="og:type" content="{'article' if kind=='Article' else 'website'}"><meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(desc)}"><meta property="og:url" content="{canonical}"><meta property="og:image" content="{BASE}assets/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="TrackExpenses: SMS, voice and payday budgeting">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{esc(title)}"><meta name="twitter:description" content="{esc(desc)}"><meta name="twitter:image" content="{BASE}assets/og.png">
{'<meta name="robots" content="noindex">' if noindex else ''}<link rel="icon" href="{prefix}assets/icon.png"><link rel="stylesheet" href="{prefix}style.css?v=1">
<script type="application/ld+json">{ld}</script></head><body>
<a class="skip" href="#main">Skip to content</a><header class="nav"><a class="brand" href="{prefix}index.html">TrackExpenses<span>SMS · Voice · Payday</span></a><nav aria-label="Main"><a href="{prefix}guides/index.html">Guides</a><a href="{prefix}tools/daily-budget.html">Calculator</a></nav>{cta(path,prefix,True)}</header>
<main id="main" class="{'home' if path=='index.html' else 'article'}">{body}
<section class="download"><h2>Your money, easier to follow.</h2><p>Expense Tracker: SMS &amp; Voice for iPhone and iPad.</p>{cta(path,prefix)}<p class="small">{esc(rating())} · Checked {esc(FACTS['checked'])}</p></section>
<details class="fact-block"><summary>App facts and free / Pro limits</summary><p>{esc(FACT_BLOCK)}</p></details></main>
<footer><p>Made by <a href="{prefix}about.html">Mohamed Elatabany</a>. No cookies or analytics scripts on this site.</p><nav aria-label="Footer"><a href="{prefix}privacy.html">Privacy</a><a href="{prefix}support.html">Support &amp; corrections</a><a href="{prefix}terms.html">Terms</a><a href="{prefix}compare/best-expense-trackers.html">Compare apps</a></nav></footer>
<script src="{prefix}site.js" defer></script></body></html>'''
 target=ROOT/path; target.parent.mkdir(parents=True,exist_ok=True); target.write_text(text)
 if not noindex: PAGES[path]=(title,desc,canonical,body)

def guide(sl,meta):
 md=(ROOT/f'_content/guides/{sl}.md').read_text()
 heads=re.findall(r'^## (.+)$',md,re.M)
 body=markdown(md); at=body.find('</h1>')+5
 toc='<nav class="toc" aria-label="In this guide"><strong>In this guide</strong><ul>'+''.join(f'<li><a href="#{slug(h)}">{esc(h)}</a></li>' for h in heads)+'</ul></nav>'
 byline='<p class="byline">By <a href="../about.html">Mohamed Elatabany</a> · Updated October 2026 · <a href="../support.html">Suggest a correction</a></p>'
 body=body[:at]+byline+toc+body[at:]
 faqpart=md.split('## Frequently asked questions\n',1)[-1].split('\nSource',1)[0]
 faq=[]
 for paragraph in faqpart.strip().split('\n\n'):
  if '? ' in paragraph:
   q,a=paragraph.split('? ',1); faq.append((q+'?',a))
 body+='<aside class="related"><h2>Related reading</h2><ul>'+''.join(f'<li><a href="{x}.html">{esc(GUIDES[x][0].split(" | ")[0])}</a></li>' for x in GUIDES if x!=sl)+'</ul></aside>'
 page('guides/'+sl+'.html',*meta,body,'Article',faq)

home=f'''<section class="hero"><div><p class="eyebrow">Expense Tracker: SMS &amp; Voice</p><h1>Less typing.<br>More clarity.<br><em>Your payday.</em></h1><p class="lead">Bank texts become entries. Spoken purchases become drafts. Your budget month starts when your salary does.</p><p>No bank login. No app account. A ledger you control.</p>{cta('index.html','')}<p class="small">iPhone &amp; iPad · iOS 17+ · English interface</p></div><figure class="film"><video id="hero-film" muted loop playsinline preload="none" poster="assets/hero-poster.png" width="720" height="720" aria-label="Illustration of SMS, voice entry and payday budgets. Example figures."><source data-src="assets/hero.mp4" type="video/mp4"></video><button id="film-toggle" hidden>Play animation</button><figcaption>How your ledger comes together · illustrative figures</figcaption></figure></section>
<section class="feature-grid"><article><span class="number">01 / LESS ADMIN</span><h2>A bank text, already filed.</h2><p>Set up your own Shortcuts automation for supported alerts. Check the imported amount, account and category. Your Messages inbox stays private.</p><a href="guides/bank-sms-iphone.html">Set up SMS imports →</a></article><article><span class="number">02 / SAY IT</span><h2>Coffee, taxi, groceries.</h2><p>Say several purchases with Pro. Review the on-device drafts before saving. Device and language support apply.</p><a href="guides/voice-expenses-iphone.html">See how voice works →</a></article><article><span class="number">03 / YOUR MONTH</span><h2>Payday is day one.</h2><p>Choose a fixed monthly start day. Your transactions, budgets and charts follow the same period, with budget pacing visible at a glance.</p><a href="guides/payday-budget.html">Budget from payday →</a></article></section>
<section class="split"><div><p class="eyebrow">THE LEDGER STAYS FREE</p><h2>Keep the whole picture.</h2><p>Unlimited manual transactions, budgets, historical stats, search, monthly CSV export and private iCloud sync. Start with three accounts, three recurring rules and 20 successful automatic SMS imports per calendar month per device.</p><p>Pro adds voice, unlimited SMS imports, forecasts and daily guidance, unlimited accounts and recurring rules, flexible import/export, full backup, themes and icons.</p><a href="support.html">Understand free and Pro →</a></div><div class="tool-teaser"><p class="eyebrow">TRY THE ARITHMETIC</p><h2>What is left per day?</h2><p>Subtract recorded spending and upcoming commitments, then divide by the days left. Try a private, local calculator with clear examples.</p><a class="text-button" href="tools/daily-budget.html">Open daily-budget calculator →</a></div></section>'''
page('index.html','Expense Tracker: SMS & Voice | TrackExpenses','Track spending with optional bank SMS imports, on-device voice drafts and payday budgets. A private money manager for iPhone and iPad.',home)
for sl,meta in GUIDES.items(): guide(sl,meta)
links='<div class="guide-grid">'+''.join(f'<article><h2><a href="{sl}.html">{esc(meta[0].split(" | ")[0])}</a></h2><p>{esc(meta[1])}</p></article>' for sl,meta in GUIDES.items())+'</div>'
page('guides/index.html','Expense Tracking Guides | TrackExpenses','Practical iPhone guides for bank SMS imports, voice entry, payday budgeting, Apple Pay and CSV exports.','<h1>Make your ledger easier to keep.</h1><p>Start with the task you need to solve. Each guide explains the workflow and its limits.</p>'+links)
page('about.html','About Mohamed Elatabany | TrackExpenses','Meet the developer of Expense Tracker: SMS & Voice and learn how the site checks its product facts.','''<h1>Made by Mohamed Elatabany.</h1><p>I build TrackExpenses, listed on the App Store as Expense Tracker: SMS &amp; Voice. This is its official website.</p><h2>Why this app</h2><p>A ledger should be easier to maintain and follow the month you actually budget in. TrackExpenses brings manual, SMS and voice entry into a private ledger with a fixed monthly payday period.</p><h2>How these guides are checked</h2><p>Product claims are checked against the app's code and live listing. Guide steps use the app's current screens and Apple's Shortcuts documentation. Examples are illustrative. Competitor comparisons link their own documentation, show what was verified and leave uncertain features unclaimed.</p><p>Guides are reviewed in October 2026. If a menu changes or an explanation is unclear, <a href="support.html">send a correction</a>.</p><h2>Author and contact</h2><p><a href="https://apps.apple.com/us/developer/mohamed-elatabany/id1814429185">Mohamed Elatabany on the App Store</a> · <a href="https://github.com/Atabany">GitHub profile</a> · <a href="mailto:atabany.apps@gmail.com">atabany.apps@gmail.com</a></p>''')
page('privacy.html','Privacy Policy | TrackExpenses','How TrackExpenses stores your ledger, processes SMS and voice locally, uses private iCloud and handles purchases.',markdown((ROOT/'_content/privacy.md').read_text()))
page('support.html','Support and Free / Pro Limits | TrackExpenses','Get TrackExpenses help, review free and Pro limits, restore purchases, fix imports and export your records.','''<h1>Support, from the developer.</h1><p>Questions, bugs or corrections: <a href="mailto:atabany.apps@gmail.com">atabany.apps@gmail.com</a>. Include your app version, device and iOS version. Redact identifying details in samples.</p><h2>What stays free?</h2><p>Unlimited manual transactions, budgets, historical stats, search, monthly CSV export and private iCloud sync; up to 3 accounts and 3 recurring rules. Includes 20 successful automatic bank SMS imports per calendar month on each device.</p><p>After that allowance, SMS entries wait outside your totals. Review and save them individually for free, or use Pro for continued automatic imports.</p><h2>What does Pro add?</h2><p>Unlimited SMS imports, accounts and recurring rules; voice entry on compatible devices/languages; spending forecasts, daily guidance and what-if planning; CSV import, range CSV export, full JSON backup/restore, themes and alternate icons. Monthly and annual subscriptions and a one-time lifetime purchase are available. Check current purchase details in the app.</p><h2>Restore or cancel</h2><p>Open the Pro screen and tap Restore purchase using the same Apple Account that bought Pro. If it remains locked, email the developer. Manage auto-renewing plans in <a href="https://apps.apple.com/account/subscriptions">Apple's subscription settings</a>. Lifetime does not renew.</p><h2>Your month and your records</h2><p>More → Period &amp; Entry changes your fixed monthly start day. Export the selected month from Transactions for free. Pro's More → Backup &amp; Export offers range exports, CSV import and JSON backup/restore.</p><h2>SMS and voice help</h2><p>See <a href="guides/bank-sms-iphone.html">SMS setup</a>, <a href="guides/sms-automation-not-working.html">automation troubleshooting</a> and <a href="guides/voice-expenses-iphone.html">voice requirements</a>. SMS automation does not read your inbox. Voice produces drafts, and supported languages/devices vary.</p><h2>Privacy and deletion</h2><p>Your ledger is on your device with optional private iCloud sync. See the <a href="privacy.html">complete policy</a> for storage, processing, purchase records and deletion. For purchase-data deletion requests, email the developer.</p>''')
page('terms.html','Terms of Use | TrackExpenses','TrackExpenses uses Apple’s Standard EULA. Read purchase terms and the limits of spending calculations.','''<h1>Terms of Use</h1><p>TrackExpenses is licensed under <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Apple's Standard End User Licence Agreement</a>. This page links the governing agreement; it does not replace it.</p><h2>Purchases</h2><p>Monthly and annual Pro subscriptions renew automatically unless canceled at least 24 hours before the current period ends. Manage them through your Apple Account. Lifetime is a one-time purchase and does not renew. The app shows your current offer and any eligible trial before purchase.</p><h2>Spending calculations</h2><p>Budgets and forecasts calculate from the records you provide. They are not a guarantee about available cash and are not financial advice.</p><p><a href="privacy.html">Privacy Policy</a> · <a href="support.html">Support</a></p>''')
page('404.html','Page Not Found | TrackExpenses','Find the TrackExpenses homepage, guides or support.','<h1>That page is missing.</h1><p>Try the <a href="index.html">homepage</a>, <a href="guides/index.html">guides</a> or <a href="support.html">support</a>.</p>',noindex=True)
# Reviewed comparisons and calculator are separate HTML fragments, still rendered on the server.
for path,title,desc in [
 ('tools/daily-budget.html','Daily Budget Until Payday Calculator | TrackExpenses','Calculate remaining budget per day, with optional commitments. Local-only inputs, worked examples and an inclusive count of days left.'),
 ('compare/best-expense-trackers.html','Best iPhone Expense Trackers: How to Choose','Compare documented SMS, voice, payday and bank-connection features across expense apps. Choose a workflow that fits your records.'),
 ('compare/monefy-alternative.html','Monefy Alternative with SMS and Voice | TrackExpenses','Compare Monefy’s documented custom month with TrackExpenses’ optional SMS imports and on-device voice drafts. A fair workflow comparison.')]:
 page(path,title,desc,(ROOT/'_content'/Path(path).name).read_text(),'WebPage')
urls=[v[2] for v in PAGES.values()]
(ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join(f'<url><loc>{u}</loc><lastmod>{CONFIG["updated"]}</lastmod></url>' for u in urls)+'</urlset>\n')
bots=['*','OAI-SearchBot','ChatGPT-User','GPTBot','ClaudeBot','Claude-SearchBot','Claude-User','PerplexityBot','Google-Extended','Applebot','Applebot-Extended','Bingbot']
(ROOT/'robots.txt').write_text('\n\n'.join('User-agent: '+b+'\nAllow: /' for b in bots)+'\n\nSitemap: '+BASE+'sitemap.xml\n')
llms='# Expense Tracker: SMS & Voice (TrackExpenses)\n\n'+FACT_BLOCK+'\n\n'+rating()+'. US storefront; checked '+FACTS['checked']+'.\n\nApp Store: '+STORE+'\n\n## Official pages\n'+''.join(f'- [{v[0]}]({v[2]}): {v[1]}\n' for v in PAGES.values())
(ROOT/'llms.txt').write_text(llms)
(ROOT/'llms-full.txt').write_text(llms+'\n\n'+ '\n\n'.join('## '+v[0]+'\n'+v[2]+'\n'+html.unescape(re.sub(r'<[^>]+>',' ',v[3])) for v in PAGES.values()))
print(f'Built {len(PAGES)} indexable pages and 404 at {BASE}')
