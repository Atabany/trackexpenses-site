#!/usr/bin/env python3
"""One guide a week, from queue to live page.

  python3 site/_ops/guide.py list                 # queue and published guides
  python3 site/_ops/guide.py new [slug]           # scaffold the top queued topic (or slug) as a draft
  python3 site/_ops/guide.py check <slug>         # quality gate; must print OK before publishing
  python3 site/_ops/guide.py publish <slug> [--push]
        # mark published, build + validate, mirror into the public repo, commit both repos;
        # with --push also push, wait for the live page and ping IndexNow
  python3 site/_ops/guide.py add-topic <slug> "<title>" "<description>" <feature-slug> "<angle>"

The writing is a person's (or an agent's) job: research the query, read the app's code for every
claim, then write. This script only makes the mechanics impossible to get wrong.
Drafts (status "draft" in guides.json) are never built, so a half-written guide cannot go live.
"""
import json, re, subprocess, sys, time, urllib.request, ssl
from datetime import date
from pathlib import Path

SITE = Path(__file__).resolve().parents[1]
OPS = SITE / '_ops'
APP_ROOT = SITE.parent
PUBLIC = Path('~/indie/trackexpenses-site').expanduser()
GUIDES, TOPICS, FEATURES, CONFIG = (OPS / n for n in ('guides.json', 'topics.json', 'features.json', 'config.json'))
BANNED = [r'\$\d', r'AI-powered', r'#1\b', r'guaranteed (results|ranking|savings|income)', r'best app in the world', r'TODO', r'\[\[', r'lorem']
REQUIRED_HEADINGS = ['Frequently asked questions']

load = lambda p: json.loads(p.read_text())
save = lambda p, v: p.write_text(json.dumps(v, indent=1, ensure_ascii=False) + '\n')
today = lambda: date.today().isoformat()


def sh(*cmd, cwd=APP_ROOT, check=True):
    print('$', ' '.join(map(str, cmd)))
    return subprocess.run(cmd, cwd=cwd, check=check, text=True, capture_output=False)


def cmd_list():
    guides = load(GUIDES)
    print('Published / draft guides:')
    for g in sorted(guides, key=lambda g: g.get('published', '')):
        print(f"  [{g['status']:9}] {g.get('published','-'):10}  {g['slug']}")
    print('\nTopic queue (highest priority first):')
    for t in sorted(load(TOPICS), key=lambda t: t['priority']):
        if t['status'] == 'queued':
            print(f"  {t['priority']:>2}. {t['slug']:42} → {t['feature']}\n      intent: {t['intent']}")


def cmd_new(slug=None):
    topics = load(TOPICS); guides = load(GUIDES)
    queued = sorted((t for t in topics if t['status'] == 'queued'), key=lambda t: t['priority'])
    topic = next((t for t in queued if t['slug'] == slug), None) if slug else (queued[0] if queued else None)
    if not topic: sys.exit('No such queued topic. Add one with add-topic.')
    if any(g['slug'] == topic['slug'] for g in guides): sys.exit('Guide already exists in guides.json')
    md = SITE / '_content/guides' / f"{topic['slug']}.md"
    if md.exists(): sys.exit(f'{md} already exists')
    h1 = topic['title'].split(' | ')[0]
    md.write_text(f"""# {h1}

TODO Answer the question directly in the first two sentences, then name where TrackExpenses helps.

## TODO The method that works anywhere (built-in iOS or spreadsheet first)

## TODO Doing it in TrackExpenses (exact menu names from the app's code)

## TODO A worked example

## TODO Limits and common mistakes

## Frequently asked questions

TODO Question one? Answer in one or two plain sentences.

TODO Question two? Answer.

TODO Question three? Answer.

Source: TODO what was checked (app code, Apple documentation links) and the month. Figures are examples, not financial advice.
""")
    guides.append({'slug': topic['slug'], 'title': topic['title'], 'description': topic['description'],
                   'status': 'draft', 'published': None, 'updated': None, 'feature': topic['feature']})
    save(GUIDES, guides)
    topic['status'] = 'drafting'; save(TOPICS, topics)
    print(f"Scaffolded {md.relative_to(APP_ROOT)}\nIntent: {topic['intent']}\nAngle: {topic['angle']}\n"
          f"Write 800–1,300 words, then: python3 site/_ops/guide.py check {topic['slug']}")


def cmd_check(slug):
    guides = load(GUIDES); features = {f['slug'] for f in load(FEATURES)}
    g = next((x for x in guides if x['slug'] == slug), None)
    problems = []
    if not g: sys.exit(f'{slug} is not in guides.json (run new first)')
    md_path = SITE / '_content/guides' / f'{slug}.md'
    md = md_path.read_text()
    words = len(re.findall(r"\b[\w’]+\b", re.sub(r'https?://\S+', '', md)))
    if not 800 <= words <= 1300: problems.append(f'word count {words} (needs 800–1,300)')
    if not md.startswith('# '): problems.append('must start with a single H1')
    if len(re.findall(r'^# ', md, re.M)) != 1: problems.append('exactly one H1')
    first = md.split('\n\n')[1] if '\n\n' in md else ''
    if len(re.findall(r'[.!?](\s|$)', first)) > 3: problems.append('first paragraph should answer in at most three sentences')
    heads = re.findall(r'^## (.+)$', md, re.M)
    if len(heads) < 5: problems.append(f'only {len(heads)} H2 sections (want 5+ including FAQ)')
    for h in REQUIRED_HEADINGS:
        if h not in heads: problems.append(f'missing "## {h}"')
    faq = md.split('## Frequently asked questions\n', 1)[-1].split('\nSource', 1)[0]
    if len([p for p in faq.strip().split('\n\n') if '? ' in p]) < 3: problems.append('FAQ needs 3+ "Question? Answer." paragraphs')
    if not re.search(r'^Source: ', md, re.M): problems.append('missing closing "Source:" line')
    if 'TrackExpenses' not in md: problems.append('never mentions TrackExpenses')
    if not re.search(r'\]\((\.\./|[a-z0-9-]+\.html)', md): problems.append('no internal link to another page on the site')
    for pattern in BANNED:
        if re.search(pattern, md, re.I): problems.append(f'banned/placeholder text: {pattern}')
    if len(g['title']) > 60: problems.append(f"title {len(g['title'])} chars (max 60)")
    if len(g['description']) > 155: problems.append(f"description {len(g['description'])} chars (max 155)")
    if g.get('feature') not in features: problems.append(f"feature {g.get('feature')} is not in features.json")
    others = [x for x in guides if x['slug'] != slug]
    if any(x['title'] == g['title'] or x['description'] == g['description'] for x in others): problems.append('duplicate title/description')
    generic = {'track', 'tracking', 'tracker', 'expense', 'expenses', 'iphone', 'trackexpenses', 'your', 'with', 'from', 'how', 'that', 'this', 'what', 'into'}
    words_of = lambda t: set(re.findall(r'[a-z0-9/]{3,}', t.split(' | ')[0].lower())) - generic
    mine = words_of(g['title'])
    for x in others:
        shared = mine & words_of(x['title'])
        if len(shared) >= 2 and len(shared) / max(len(mine), 1) >= .75: problems.append(f"title overlaps {x['slug']} ({', '.join(sorted(shared))}) — near-duplicate page?")
    if problems:
        print('NOT READY:\n  - ' + '\n  - '.join(problems)); sys.exit(1)
    print(f'OK — {slug}: {words} words, {len(heads)} sections. Read it once more on a phone-width preview before publishing.')


def cmd_publish(slug, push):
    cmd_check(slug)
    guides = load(GUIDES); g = next(x for x in guides if x['slug'] == slug)
    first = g['status'] != 'published'
    g['status'] = 'published'; g['updated'] = today()
    if first: g['published'] = today()
    save(GUIDES, guides)
    topics = load(TOPICS)
    for t in topics:
        if t['slug'] == slug: t['status'] = 'published'; t['published'] = today()
    save(TOPICS, topics)
    config = load(CONFIG); config['updated'] = today(); save(CONFIG, config)
    sh(sys.executable, 'tools/build_site.py', str(PUBLIC))
    title = g['title'].split(' | ')[0]
    message = f"{'Publish' if first else 'Update'} guide: {title}\n\nCo-Authored-By: Claude <noreply@anthropic.com>"
    sh('git', 'add', 'site'); sh('git', 'commit', '-m', message, check=False)
    sh('git', 'add', '-A', cwd=PUBLIC); sh('git', 'commit', '-m', message, cwd=PUBLIC, check=False)
    base = config['base_url'].rstrip('/') + '/'
    url = f'{base}guides/{slug}.html'
    if not push:
        print(f'Committed locally. Push the public repo, then ping IndexNow for {url}'); return
    sh('git', 'push', 'origin', 'HEAD', cwd=PUBLIC)
    context = ssl.create_default_context(cafile='/etc/ssl/cert.pem')
    for _ in range(20):
        try:
            with urllib.request.urlopen(url, context=context, timeout=20) as r:
                if r.status == 200: print('Live:', url); break
        except Exception: pass
        time.sleep(15)
    else:
        sys.exit(f'{url} is not live yet; check GitHub Pages, then ping IndexNow manually.')
    hubs = [url, base, base + 'guides/index.html', base + 'sitemap.xml', base + 'llms.txt']
    if g.get('feature'): hubs.append(f"{base}features/{g['feature']}.html")
    sh(sys.executable, str(OPS / 'indexnow.py'), *hubs, check=False)


def cmd_add_topic(slug, title, description, feature, angle):
    topics = load(TOPICS)
    if any(t['slug'] == slug for t in topics): sys.exit('topic exists')
    topics.append({'slug': slug, 'status': 'queued', 'priority': max(t['priority'] for t in topics) + 1, 'feature': feature,
                   'title': title, 'description': description, 'intent': title, 'angle': angle})
    save(TOPICS, topics); print('Queued', slug)


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a or a[0] == 'list': cmd_list()
    elif a[0] == 'new': cmd_new(a[1] if len(a) > 1 else None)
    elif a[0] == 'check' and len(a) == 2: cmd_check(a[1])
    elif a[0] == 'publish' and len(a) >= 2: cmd_publish(a[1], '--push' in a)
    elif a[0] == 'add-topic' and len(a) == 6: cmd_add_topic(*a[1:])
    else: sys.exit(__doc__)
