#!/usr/bin/env python3
"""Submit only official-site URLs; exit nonzero when the endpoint rejects them."""
import json, ssl, sys, urllib.request, urllib.parse
from pathlib import Path
root=Path(__file__).resolve().parents[1]
base=json.loads((root/'_ops/config.json').read_text())['base_url'].rstrip('/')+'/'
key=json.loads((root/'_ops/indexnow.json').read_text())['key']
urls=sys.argv[1:]
if not urls or any(not u.startswith(base) for u in urls): sys.exit('Provide URLs under '+base)
payload={'host':urllib.parse.urlsplit(base).hostname,'key':key,'keyLocation':base+key+'.txt','urlList':urls}
req=urllib.request.Request('https://api.indexnow.org/indexnow',data=json.dumps(payload).encode(),headers={'Content-Type':'application/json'},method='POST')
with urllib.request.urlopen(req,context=ssl.create_default_context(cafile='/etc/ssl/cert.pem'),timeout=40) as r:
 print('IndexNow HTTP',r.status,'(submission accepted; this does not prove indexing)')
