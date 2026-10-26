# TrackExpenses official website

Static website for Expense Tracker: SMS & Voice, made by Mohamed Elatabany.
Source is maintained in the private app repository's site/ directory and mirrored here.

Build with `python3 _ops/build.py`; validate with `python3 _ops/validate.py`.
The app repository's `tools/build_site.py ~/indie/trackexpenses-site` additionally checks and
publishes the authoritative privacy-policy source. Never edit `_content/privacy.md` directly.

GitHub Pages serves main at the root. Preserve index.html, support.html and privacy.html.
Read `_ops/SEO-PLAYBOOK.md` before changing content or publishing.

Original setup videos have watch pages with chapters, transcripts, VideoObject/Clip metadata and
video sitemap records. Maintain `_ops/videos.json` when the actual media changes. Static page dates
are tracked by content hash in `_ops/page-dates.json`; rebuilding does not refresh unchanged pages.
Run `_ops/optimize_images.py` with Pillow only when refreshing the optimized delivery images.
