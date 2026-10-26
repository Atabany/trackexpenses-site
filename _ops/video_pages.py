"""Original tutorial watch pages: visible chapters and matching VideoObject metadata."""
import html

def watch_page(video, base):
 esc=lambda s:html.escape(str(s),quote=True)
 version=video['version'];other='26' if version=='27' else '27'
 path=video['path'];canonical=base+path
 def clock(seconds):
  seconds=int(seconds);return f'{seconds//60}:{seconds%60:02}'
 chips=''.join(f'<a href="?t={c["start"]}#tutorial" data-video-time="{c["start"]}"><time>{clock(c["start"])}</time> {esc(c["title"])}</a>' for c in video['chapters'])
 transcript=''.join(f'<section id="chapter-{i+1}"><h3><a href="?t={c["start"]}#tutorial" data-video-time="{c["start"]}">{clock(c["start"])} · {esc(c["title"])}</a></h3><p>{esc(c["text"])}</p></section>' for i,c in enumerate(video['chapters']))
 body=f'''<p class="eyebrow">WATCH · IPHONE SHORTCUTS · {clock(video['duration'])}</p>
<h1>{esc(video['name'])}</h1>
<p class="lead">Follow the real Shortcuts screens, pause at any step, and connect each incoming bank alert to TrackExpenses.</p>
<video id="tutorial" class="watch-video" controls playsinline preload="metadata" width="720" height="1740" poster="../{video['poster']}" aria-label="iOS {version} SMS setup tutorial"><source src="../{video['content']}" type="video/mp4"><track kind="captions" src="../{video['captions']}" srclang="en" label="English">Follow the full transcript below if your browser cannot play the video.</video>
<p class="small">Silent tutorial with written captions. <a href="../{video['content']}">Download the video</a> · <a href="sms-setup-ios{other}.html">Using iOS {other}? Watch that version</a></p>
<nav class="video-chapters" aria-label="Video chapters"><h2>Jump to a step</h2><div>{chips}</div></nav>
<p>Before starting, open TrackExpenses once and finish onboarding. Use wording from your bank’s own purchase alerts: Purchase is only an example. <a href="../guides/sms-setup.html">Read the complete setup guide</a> for filter selection, account matching, testing, privacy and troubleshooting.</p>
<h2>Full video transcript</h2><div class="video-transcript">{transcript}</div>
<p class="byline">Made by <a href="../about.html">Mohamed Elatabany</a>. Original real-screen tutorial. iOS {version} controls may vary with language and later updates. New carrier-message delivery must be tested on a real iPhone.</p>
<p><a href="../guides/sms-automation-not-working.html">Troubleshoot SMS imports</a> · <a href="../support.html">Get help or suggest a correction</a></p>'''
 schema={'@context':'https://schema.org','@type':'VideoObject','@id':canonical+'#video','name':video['name'],'description':video['description'],'thumbnailUrl':[base+video['poster']],'uploadDate':video['uploadDate'],'duration':f'PT{video["duration"]}S','contentUrl':base+video['content'],'inLanguage':'en','isAccessibleForFree':True,'creator':{'@id':base+'#author','@type':'Person','name':'Mohamed Elatabany','url':base+'about.html'},'mainEntityOfPage':{'@id':canonical+'#webpage'},'transcript':'\n'.join(c['title']+'. '+c['text'] for c in video['chapters']),'hasPart':[{'@type':'Clip','name':c['title'],'startOffset':c['start'],'endOffset':c['end'],'url':canonical+f'?t={c["start"]}#tutorial'} for c in video['chapters']]}
 return body,schema
