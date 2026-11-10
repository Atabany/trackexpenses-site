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
monthly start is not rolling biweekly budgeting. Version 1.6.0 ships English and Arabic interfaces, including right-to-left Arabic layout. Supported Arabic bank-message and voice parsing are separate capabilities.

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

## 29 October 2026 — Arabic release correction

Updated the existing `guides/arabic-bank-sms-expenses.html` rather than adding another guide.
The US listing now reports 1.6.0, released 28 October at 21:13:25 UTC, with AR and EN.
Corrected stale English-only claims on the homepage, feature hub and voice feature page; refreshed
listing facts without displaying stars (zero US ratings). The Arabic guide now covers the language
setting, iOS 27 Message → Content versus iOS 26 Shortcut Input, real-alert testing and safer filters.
This resolves a product/support accuracy need; no new query demand or conversion lift is claimed.
Current Google/Bing queries or citations, ASC acquisition/campaign downloads and RevenueCat
purchases/conversion were unavailable in this run: only the in-app browser and MCP Apps browser
surfaces were exposed, with no existing authenticated dashboard session. Missing data is not zero.
Keep 26 October's Google observation explicitly dated; a new equal-window comparison is unavailable.
The Arabic release is a new acquisition/ASO confounder. Existing Pages domain remains purchased and
working. Google individual-watch-page submission's prior reCAPTCHA service failure remains
unverified; no successful request or indexing is inferred. See private docs/website-growth-2026-10-29.

## 1 November 2026 — budget moves and daily amounts

The homepage has a dedicated budget section; the budget planner page explains Move money,
Cover, current-period-only changes, the unchanged total, bill-aware suggestions, per-budget
daily amounts (Pro, including Lifetime), days left and Everything else. The feature comparison,
support page, budget-pacing guide, shared facts, MobileApplication featureList and llms files
carry the same free/Pro boundaries. Copy and paths were checked against BudgetStatsView,
MoveBudgetSheet, BudgetMoves and FreeTier. Treat these as current product features per owner.
The product edition in config.app_version is 1.9.0; facts.json remains a dated public Apple
listing/ratings snapshot. Preserve that distinction when refreshing ratings. No ratings invented.

## 1 November 2026 — mobile usability pass

Mobile navigation stays compact at 320px, with 44px navigation/control targets and readable
headings. A mobile-only bottom download bar reuses the same official badge, app icon and
page-specific campaign URL. It appears while reading when other download buttons are out of
view, hides while editing form fields, and allows Safari's bottom safe area. Keep it hidden on
desktop and avoid covering a focused control. Footer space and scroll padding keep the last
content reachable. Screenshot arrows remain usable on phones; overflow tables are keyboard
focusable with a scroll hint. Existing static content and native SMS radio controls remain usable
without JavaScript. CSS is versioned v10 and JS v9. The mobile hero uses static decorative screenshots and chips so the first screen settles immediately; feature demos retain their pause controls.

QA covered all 33 pages at widths 320, 390, 430, 768, 844 (landscape), and 1280: no page-wide
overflow, mobile navigation targets at least 44px, official badge at least 40px. Calculator
arithmetic and edit state, gallery navigation, table keyboard scrolling and tutorial switching
were exercised. Safari was also inspected on an iPhone 17 Pro / iOS 26.5 simulator.
Use current Lighthouse 13.6.0 with Node 24 for mobile lab audits. Lighthouse 12.8.2 on Chrome 155
returned NO_LCP even though the current tool measures LCP correctly; do not report that tooling
failure as a site-performance score or compare localhost network timing with production.

## 4 November 2026 — 50/30/20 budget guide

Published `guides/50-30-20-budget.html` on the owner's explicit request of 4 November. The last
new guide was sms-setup on 25 October (10 days earlier; the 29 October run updated an existing guide),
so the weekly limit was not in question, and the owner's request would have overridden it anyway.
Topic choice is editorial judgment: no Search Console query data was available in this run, and the
recorded October query tables are too small to rank topics. Of the queued topics, UAE and India
UPI are country variants of the existing bank-SMS and setup guides (near-duplicate risk), while
"how to do a 50/30/20 budget" is a distinct, common how-to question that the 1.10.0 salary plan
answers directly (each line's share of income, Spending/Saving & investing header percentages,
Plan vs Actual, per-month amounts). No search volume is claimed. The topic slug was shortened
from `50-30-20-budget-iphone` so the App Store campaign tag is `web-guides-50-30-20-budget`
(26 chars). Method first (Calculator, Numbers formulas, verified against Apple's guides), worked
example 12,000 → 6,000 / 3,600 / 2,400 with line shares computed with the app's whole-percent
rounding (`SalaryPlan.percentOfIncome`, half away from zero: 300/12,000 = 2.5% shows 3%), limits
(no needs/wants grouping, Saving & investing lists only Savings/Investment accounts, Pro gate,
3 free accounts). Payday-budget, budget-pacing and the budget-planner feature page now link to it.
Origin cited to Warren & Warren Tyagi, All Your Worth (2005) via Open Library's record.

Publication note: when this run started, app `site/` held AND-12.05 Google Play / Android privacy and
terms changes marked "not published", so `guide.py publish` (which mirrors all of `site/`) was not
used; the same source files went into both repos and each built its own output. Another session
published those changes as public 595780d during the run. This run's first push (38325c2) overwrote
that commit, because `--force-with-lease` was given the head fetched moments before the push, which
protects nothing. Fixed about a minute later by rebuilding on 595780d (a1549e2); both overwritten-era
Pages runs were cancelled, so the live site never lost the Android text. Lesson: when another
session may publish, fetch, compare the head with the one the work was based on, and rebase if it
moved; never lease against a head you have not reviewed. App `site/` and the public repo now match
file for file, so the normal mirror flow can resume.

## 10 November 2026 — two calculators and a calculators hub

Owner's request of 10 November: "Enhance the website, make it much better ranking, and post some tool on it".
Added `tools/50-30-20-calculator.html` (take-home pay split into needs, wants and savings per paycheck, per
month and per year; monthly, twice-monthly, biweekly and weekly pay; shares can be changed and must add up to
100), `tools/subscription-cost-calculator.html` (any number of subscriptions, each weekly, monthly, quarterly or
yearly, totalled as a month, a year and five years, sorted by yearly cost, with an optional share of pay) and the
hub `tools/index.html`. The navigation's "Calculator" link is now "Calculators" and points at the hub; the footer
and the home page (section `#calculators`) link all three; the 50/30/20 guide, the subscriptions guide and the
daily-budget calculator link to the new pages. Tool pages carry a WebApplication record (free, any browser) and
their visible questions as an FAQPage; the hub an ItemList; llms.txt lists the calculators in their own section.

Choice of tools is editorial judgment, not measured demand: the Chrome extension was not connected in this run,
so no Search Console queries were read, and no search volume is claimed for either topic. Both extend pages the
site already has (the 50/30/20 guide of 4 November, the subscriptions guide) and facts the app really has (salary
plan percentages are Pro; two repeating rules free; Stats shows fixed costs as a month and a year). Arithmetic
was checked in headless Chrome on the built pages: 2,500 every two weeks at 50% is 1,250 per paycheck, 2,708.33
per month, 32,500 per year; three example subscriptions come to 24.50 a month, 294.00 a year, 1,470.00 over five
years. Both run without sending anything and state their formula with a server-rendered reference table.

Rules that came out of it: a guide must stay inside 800 to 1,300 authored words, and a relative link counts as
words (the calculator link cost the 50/30/20 guide eleven), so adding a link to a full guide means trimming a
sentence; a table of three or four short number columns takes `class="table-wrap compact"` so a phone shows it
whole instead of the swipe hint; `style.css?v=12`, `site.js?v=11`.

Next, in order of expected value and still to decide with the owner: an Arabic home page and one Arabic guide
(the app is fully Arabic and its markets search in Arabic; the site is English only); a German home page once
1.13.0 is live; reading Search Console queries when the browser is connected, before choosing the next page.

## 10 November 2026 — Arabic pages (`/ar/`)

Owner's yes of 10 November to the proposal above. Two pages, right to left: `ar/index.html` (an Arabic home page)
and `ar/bank-sms.html` (the bank-SMS setup guide with the 18 iOS 27 steps). 41 indexable pages.

- **Where the Arabic comes from.** The home page is built on the vetted Arabic App Store description
  (`docs/APP_STORE_METADATA.md`), brought up to 1.12.0 (the money coach, widgets and Siri). The guide's 18 step
  titles and instructions are the app's own shipped strings (`SMSSetupSteps` in `Localizable.xcstrings`), so the
  site and the app say the same words; its pictures are the app's real Arabic Shortcuts captures
  (`marketing/sms-setup-ar/screens/ios27`, 540 px WebP in `assets/ar/sms/`), and the four app pictures are the
  Arabic store captures (`marketing/app-store-2026-11-ar/raw`, 660 px WebP in `assets/ar/`). The rest follows
  `docs/l10n/ARABIC_STYLE.md` and was reviewed independently before publication (3 fact corrections and 11 small
  wording ones, all applied: what the coach sends is now listed in full, here and in the English fact block; the
  filter-word advice is the currency's name, never «خصم», which offers use too; the free allowance is «حصة», never
  «رصيد», which is an account balance).
- **How they are built.** `page(..., lang='ar')` in `build.py` takes its navigation, footer, download section and
  fact block from `CHROME['ar']` and `FACT_BLOCK_AR`; bodies are `_content/ar/home.html` and
  `_content/ar/bank-sms.html`. The two home pages name each other with `hreflang` (`x-default` is English); the
  guide is not a translation of one English guide, so it carries none. English pages link to Arabic from the footer.
  The App Store badge stays the English one (Apple's badge service returned no Arabic file).
- **Rules.** Letter spacing is reset on Arabic pages (`[dir=rtl] *`), because tracking pulls Arabic letters apart.
  A fact changed in `FACT_BLOCK` must be changed in `FACT_BLOCK_AR` too. The guide's steps are data,
  `_ops/ar-steps.json`, written from the app's catalog by `tools/site_ar_steps.py`: run it when a setup step or its
  Arabic changes. Nothing from an unreleased version goes on either page. The validator accepts the
  Arabic breadcrumb label and treats `ar/index.html` as a home page.
- **Not claimed.** No search volume was measured for any Arabic query, and no ranking is promised. Read Search
  Console by page (`/ar/`) after a few weeks before writing a second Arabic guide.

