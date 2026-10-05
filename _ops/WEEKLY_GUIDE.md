# Weekly guide routine

One excellent guide a week, published with `site/_ops/guide.py`. Run from the app repo
(`~/indie/TrackExpenses`), which owns the site source; the public Pages repo is
`~/indie/trackexpenses-site` and is written only by `tools/build_site.py`.

## Every Monday

1. `git status` in both repos. Other sessions work here; never commit someone else's diff.
2. `python3 site/_ops/guide.py list`. Take the top queued topic unless real evidence
   (Search Console queries, support email, App Store reviews) points at a better one; record
   why in `site/_ops/SEO-PLAYBOOK.md` if you reorder. Add new ideas with `add-topic`.
3. `python3 site/_ops/guide.py new` scaffolds the draft and marks the topic drafting.
4. Research: Apple's own documentation for every iOS step; the app's Swift source for every
   TrackExpenses claim (menu names are string literals — quote them exactly; Free/Pro comes
   from `TrackExpenses/Services/FreeTier.swift`). Never invent bank compatibility, ratings,
   reviews, prices, search volumes or competitor facts.
5. Write 800–1,300 words: direct answer in the first two sentences; the method that works
   without the app first; then the app; a worked example; limits; FAQ ("Question? Answer."
   paragraphs, plain text); internal links to a related guide and the matching
   `../features/<slug>.html`; closing `Source:` line. Example amounts are plain numbers, never
   `$` + digits.
6. `python3 site/_ops/guide.py check <slug>` must print OK. Then
   `python3 site/_ops/build.py` and look at `guides/<slug>.html` at desktop and 390 px.
7. `python3 site/_ops/guide.py publish <slug> --push` marks it published, rebuilds and
   validates, mirrors into the public repo, commits both repos, pushes, waits for the live
   page and pings IndexNow (accepted ≠ indexed).
8. Add one line to the playbook's growth record: date, slug, why this topic.

## Also weekly, only when something changed

- `python3 site/_ops/update_rating.py`: keep the rating and count current.
- Refresh a feature page when the app ships a change to that feature (`site/_content/features/`).
- Re-take a screenshot when its screen changed (see `site/_ops/screenshot-assets.md`).

Stay quiet when nothing was published. Never buy, post, email or change App Store metadata.
