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
private iCloud sync; 3 accounts, 3 recurring rules, 20 successful SMS imports/calendar month/device.
Pro: voice on compatible devices/languages, unlimited SMS/accounts/rules, forecasts/daily guidance,
what-if planning, CSV import/range exports, JSON backup/restore, themes/icons. Excess SMS entries
wait outside totals and may be saved individually free. No bank login or app account. A fixed
monthly start is not rolling biweekly budgeting. English UI; Arabic parsing is not Arabic UI.

Privacy text remains authored only in app repo `docs/PRIVACY_POLICY.md`. The app wrapper
`tools/build_site.py` checks it, snapshots `_content/privacy.md`, builds and validates, then
copies reviewed output into this public repo. Do not edit the privacy snapshot here; patch the
source through the app repo and regenerate. Other source content is in `_content`; retain parity
between app `site/` and this repo after each weekly change. Exclude .git and __pycache__ from copies.

## Build and publication

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
traffic; measure qualified visits, campaign installs and mature purchase outcomes. Owner payment
is required before any domain connection.

Until a domain is purchased, keep the existing GitHub Pages canonical. On a project site the
crawler's host-level /robots.txt is outside this repository; do not claim host-level rules work
until the custom domain serves this file at its root. Do not set CNAME for an unowned domain.

After purchase: verify Pages ownership, DNS-only 4 A records 185.199.108–111.153 and 4 AAAA records
2606:50c0:8000–8003::153, www CNAME atabany.github.io; set CNAME, switch base_url and regenerate.
Confirm HTTPS certificate then enforce HTTPS. Verify path-preserving old Pages redirects,
www and HTTP redirects. Use Google Domain property via DNS TXT and BingSiteAuth.xml;
never grant cross-service OAuth. Submit sitemap, request indexing and verify statuses.
Update canonical addresses in Legal.swift and App Store locale URL fields in an editable version.

## Weekly content and growth review

Run Mondays 09:00 Asia/Dubai. A Codex heartbeat continues the current chat; no separate Claude
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
