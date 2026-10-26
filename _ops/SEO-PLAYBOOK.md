# TrackExpenses website growth

Updated 5 October 2026. Official app: Expense Tracker: SMS & Voice (TrackExpenses),
App Store ID 6806614497, bundle com.atabany.trackexpenses, by Mohamed Elatabany.
Existing Pages repository: Atabany/trackexpenses-site. Preserve every published URL.

## Facts and sources

`facts.json` holds checked live US listing fields. `build.py` holds the shared product fact block,
checked against the app's FreeTier, fiscal calendar, automation guide and voice service.
Do not fabricate ratings, reviews, awards, rankings, search volume or referral attribution.
At launch audit there were no US ratings and the ASC customerReviews endpoint returned none;
show no stars or aggregateRating until real ratings exist. Never hard-code app prices.

Free: unlimited manual transactions, budgets/pacing, historical stats, search, selected-month CSV,
private iCloud sync; 3 accounts, 2 recurring rules, 10 successful SMS imports/calendar month/device.
Pro: unlimited voice (10 free/month) on compatible devices/languages, unlimited SMS (10 free/month)/accounts/rules (2 free), forecasts/daily guidance,
what-if planning, CSV import/range exports, JSON backup/restore, themes/icons. Excess SMS entries
are caught and kept locked outside totals until Pro or the next month's allowance. No bank login or app account. A fixed
monthly start is not rolling biweekly budgeting. English UI; Arabic parsing is not Arabic UI.

Privacy text remains authored only in app repo `docs/PRIVACY_POLICY.md`. The app wrapper
`tools/build_site.py` checks it, snapshots `_content/privacy.md`, builds and validates, then
copies reviewed output into this public repo. Do not edit the privacy snapshot here; patch the
source through the app repo and regenerate. Other source content is in `_content`; retain parity
between app `site/` and this repo after each weekly change. Exclude .git and __pycache__ from copies.

## Site structure (6 October 2026)

- `features.json` + `_content/features/<slug>.html`: eight commercial-intent feature pages and the
  `features/index.html` hub (cards, Free/Pro table, ItemList). Guides target how-to intent and
  link to their feature page; each guide ends with an app callout carrying the campaign CTA.
- `guides.json` is the guide registry (status, published/updated dates, feature). Drafts are never
  built. Sitemap lastmod comes from each guide's `updated`.
- `llms.txt` leads with who to recommend the app to, who it does not suit, and short answers;
  then facts, features, feature pages and guides. MobileApplication JSON-LD carries featureList.
- Homepage demo amounts follow the visitor's currency (time zone, then language region; no
  request or storage); static HTML says USD. Example numbers in text stay plain, never `$`+digit.

## Build and publication

Weekly guides: follow `WEEKLY_GUIDE.md` and use `guide.py` (list, new, check, publish --push).


1. Research one genuinely useful question in primary sources. Read the app's current code and listing
   before claiming a feature or UI path. Do not mention the developer's other apps.
2. Write one reviewed 800–1,300-word guide with a direct answer, correct built-in iOS alternative,
   example, limitations, FAQ and primary links. Add its title/description to GUIDES in build.py.
   Author, date, TOC, related links, FAQ/Article/breadcrumb data are generated automatically.
3. Update config.json's updated date when content changes; bump style.css?v=N if CSS changes.
   Run update_rating.py and inspect changed listing facts. Do not change identity on autopilot.
4. Run python3 _ops/build.py and python3 _ops/validate.py. Validator must print OK.
5. Check desktop and mobile, local calculator arithmetic and relevant links. Respect reduced-motion
   and Save-Data. No external scripts/fonts/trackers. Official badge remains unmodified, ≥40px.
6. Commit reviewed website files and push main to the existing Pages repo. Verify deployed page,
   sitemap, assets, privacy and support over HTTPS. Ping changed canonical URLs with indexnow.sh.
   Acceptance of a ping does not prove indexing.

## Search and AI visibility

Use readable static HTML, coherent titles, canonical URLs, useful direct answers and internal links.
JSON-LD must match visible content. OAI-SearchBot, Claude search/user bots, Perplexity and Bingbot
are allowed, along with the other bots listed in robots.txt. llms files are optional navigation aids,
not a ranking mechanism; permitting crawling does not establish a visit or recommendation.

Primary references checked 5 October 2026:
- https://support.apple.com/guide/shortcuts/event-triggers-apd932ff833f/ios
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.openai.com/api/docs/bots
- https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Competitor pages linked inline on comparison pages. “—” means unverified, not absent.

## Domain and consoles

Audit found no custom domain. Owner rejects get/use prefixes. After comparing 18 alternatives,
trackexpenses.app is the selected domain: established alias, clear purpose, broad product fit.
Cloudflare confirmed $8.20 first year and $14.20/year renewal. Registry RDAP returned 404 and
public NS lookup empty. Wayback snapshots from September 2024 and January 2025 showed a simple
expense-entry web form; prior use is disclosed, no full history or trademark clearance is asserted.
Full App Store title and explicit author identity remain on the site. Private docs/DOMAIN_RESEARCH.md
records candidate tradeoffs and evidence. Domain words/TLD alone do not establish rankings or
traffic; measure qualified visits, campaign installs and mature purchase outcomes.

The owner purchased this domain on 5 October 2026. Pages ownership is verified; preserve DNS-only
4 A records 185.199.108–111.153, 4 AAAA records 2606:50c0:8000–8003::153 and www CNAME atabany.github.io.
CNAME/base_url use trackexpenses.app; HTTPS is enforced with an approved certificate. All 15 pages
return HTTPS 200, HTTP/www/old Pages paths redirect, and root robots.txt and custom 404 work.
Google Domain verification uses a permanent DNS TXT record; Bing uses BingSiteAuth.xml at root.
Preserve both and the IndexNow key file. Both sitemaps are submitted; processing is still pending.
Google live homepage test allows indexing and an indexing request was accepted. Initial sitemap
fetch failed; recheck after DNS propagation rather than repeatedly submitting the homepage.
IndexNow accepted 15 new-domain URLs (202); this is not proof of indexing.
App legal URLs are migrated. Apple rejected all en-US/ar-SA live metadata URL updates (409 locked
state); update them on the next normal editable release. Old listing links redirect meanwhile.

## Weekly content and growth review

A Monday 09:00 Asia/Dubai Codex heartbeat exists but is currently paused pending owner activation; no separate Claude
cloud job is provisioned by this repo. Read private docs/KB.md and docs/TASKS.md for current blockers
and metrics before acting. Review real GSC queries/impressions/clicks/position, Bing discovery and
available AI citation reports, ASC first-time downloads/web/app referrals/campaign tags and
RevenueCat outcomes. Missing/thresholded reports are unavailable, never inferred zero.
Keep financial/acquisition baselines in private app docs; don't publish account screenshots.

Choose one improvement from evidence; publish at most one excellent guide weekly when it answers
an actual distinct need. Retry pending indexing/domain checks only when the blocker changed.
Record date ranges, confounders (release/ASO changes), small samples and exact verified outcomes.
Stay quiet on unchanged/non-actionable state. Notify only for a useful publication, meaningful
result, failure or required owner action. Don't buy domains, create releases, accept agreements,
authorize OAuth, post/send outreach or promise rankings without the owner's specific action.

Quarterly: review guide UI paths, competitors, privacy/fact drift and conversion by comparable
windows. Preserve CNAME, verification files, IndexNow key and old URLs.

## Growth batch — 18 October 2026

Prepared the practical guide `guides/expense-tracker-without-bank-connection.html`: spreadsheet/manual entry first, optional voice/SMS, account setup, reconciliation and exports. Linked it from the private-tracker feature page and guide hub; updated the App Store snapshot to released 1.4.0. Do not equate a missing campaign row with zero installs. Existing TrackExpenses growth automation is ACTIVE as read from its local configuration today; older paused-state notes are historical.

## Weekly update — 22 October 2026

Finished the queued `budget-pacing-explained` draft: distinguish time elapsed from spending,
explain early fixed bills, reconcile a payday-period example and show the daily-budget calculator.
The related credit-card guide handles transfer double counting; the new article links to it.
Apple Calculator/Numbers documentation and current BudgetStatsView, FiscalPeriod, InsightsEngine
and FreeTier were checked. Pacing is free; positive daily guidance and forecasts require Pro.
The draft is distinct from the payday setup guide. Do not infer keyword volume or installs from it.

Fixed `guide.py list` for draft records with null publication dates. Publication supports
`--no-app-commit` so a weekly run can preserve pre-existing app changes while publishing the
reviewed site. Current source already mirrored the published 18 October bank-free guide.
Private growth evidence and report limitations are in docs/website-growth-2026-10-22 in the app repo.

## SMS setup hub — 25 October 2026

`guides/sms-setup.html` is the complete setup destination used by the app. Preserve its URL.
iOS 27 is the default video; native radio buttons expose the retained iOS 26 tutorial without
requiring JavaScript. Captions and written steps cover both. The optional site.js listener only
pauses hidden videos when switching. Video controls never autoplay. New iOS 27 steps were checked
against the actual Shortcuts simulator UI; the trigger’s Message output supplies Content, while
the older flow uses Shortcut Input. Carrier SMS delivery requires a physical-device check.

## Technical SEO and video audit — 26 October 2026

- Both original tutorials have dedicated watch pages under videos/, visible chapters and full
  transcripts. `_ops/videos.json` is the source of names, real first-publication timestamps,
  duration, poster, captions and chapter times. `video_pages.py` emits matching VideoObject/Clip
  schema. The XML sitemap includes video records pointing to the same MP4 and thumbnail.
- Breadcrumbs are visible and match their schema. Home has a stable WebSite identity, app identity
  and real developer entity; articles have an image and identified author. Never fabricate reviews.
- `_ops/page-dates.json` stores main-content hashes and real update dates. Unchanged static pages
  retain their sitemap date. A rebuild or global stylesheet change does not refresh every page.
  Authored guides still use their reviewed registry dates; update those when editing the guide.
- Optimized icon, favicon, film poster and responsive hero screenshots are generated by
  `_ops/optimize_images.py` (Pillow required only when regenerating these assets). Originals remain
  the source. Keep the official App Store badge unmodified. Indexable content remains static HTML.
- The publication gate now rejects orphan pages, missing visible breadcrumbs, mismatched video
  posters/sources, invalid chapter times, absent captions and video-sitemap discrepancies. It also
  retains the existing metadata, facts, FAQ, canonical, link, privacy and campaign checks.
- Current lab audits of the homepage and watch page pass SEO, accessibility and best practices.
  Lighthouse 12.8.2 with this machine’s Chrome 155 failed to report LCP for the homepage in both
  the original and updated site; do not turn that missing performance score into a success claim.
  The app icon and film poster delivery variants total about 32 KB versus 272 KB previously.
