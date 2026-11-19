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

Free: unlimited manual transactions, budgets/pacing, historical stats, search,
private iCloud sync; 3 accounts, 2 recurring rules, 10 successful SMS imports/calendar month/device.
Pro: unlimited voice (10 free/month) on compatible devices/languages, unlimited SMS (10 free/month)/accounts/rules (2 free), forecasts/daily guidance,
what-if planning, every export (CSV of any range, since 1.15.0), CSV import, JSON backup/restore, themes/icons. Excess SMS entries
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
  `_ops/ar-steps.json`, written from the app's catalog by `tools/site_steps.py` (then `site_ar_steps.py`): run it when a setup step or its
  Arabic changes. Nothing from an unreleased version goes on either page. The validator accepts the
  Arabic breadcrumb label and treats `ar/index.html` as a home page.
- **Not claimed.** No search volume was measured for any Arabic query, and no ranking is promised. Read Search
  Console by page (`/ar/`) after a few weeks before writing a second Arabic guide.



## 14 November 2026 — German pages (`/de/`)

Owner's request of 14 November: the app's "Learn more" (SMS setup) and "Visit Website" should open the site in the
reader's language, Arabic and German. Arabic pages existed; German ones were written: `de/index.html` and
`de/bank-sms.html`. 43 indexable pages.

- **Where the German comes from.** The home page is built on the vetted German App Store description
  (`marketing/app-store-2026-11-de/listing.json`) and follows `docs/l10n/GERMAN_STYLE.md`: du, „ “ quotes, and the
  order German marketing takes (voice, the payday month, the coach, then Apple Pay purchases and bank SMS, because
  banks in Germany, Austria and Switzerland mostly send app notices, not SMS). The guide's 18 steps are the app's own
  German strings (`tools/site_steps.py` → `_ops/de-steps.json`) over its German Shortcuts captures
  (`marketing/sms-setup-de/screens/ios27`, 540 px WebP in `assets/de/sms/`); the four app pictures are the German store
  captures (`marketing/app-store-2026-11-de/raw`, 660 px WebP in `assets/de/`). It has one section the Arabic guide
  lacks: what to do when the bank sends no SMS (the Wallet "Transaktion" trigger, steps in the app).
- **How they are built.** `CHROME['de']` and `FACT_BLOCK_DE` in `build.py`, bodies in `_content/de/`. The three home
  pages name each other with `hreflang`; the English footer links to Deutsch. The validator accepts the German
  breadcrumb label ("Seitenpfad") and treats `de/index.html` as a home page. The step and picture grids reuse the
  `ar-steps` and `ar-shots` classes, which carry no direction.
- **Rules.** A fact changed in `FACT_BLOCK` changes in `FACT_BLOCK_AR` and `FACT_BLOCK_DE`. Every app or iOS label a
  page quotes is the catalog's string. **Nothing from an unreleased version:** the independent review caught "TAN-Codes
  werden nicht eingetragen", true only from 1.15.0 (the German TAN words are in the unreleased reader), so the pages
  say only that declined payments and offers are skipped; put the TAN claim back when 1.15.0 is live.
- **The app links here.** From 1.15.0, `AppLinks` opens `/ar/…` or `/de/…` by the app's language, and
  `AppLinksTests` fails if a language is listed whose pages are not in these sources. Renaming or removing
  `ar/bank-sms.html`, `de/bank-sms.html` or either home page breaks a link inside the shipped app.
- **Not claimed.** No search volume was measured for any German query. Read Search Console by page (`/de/`) before
  writing more German pages.

## 15 November 2026 — four more calculators, chosen from Search Console, and real ratings

Owner's request of 15 November: "work on the website, add some tools so to improve the SEO". 47 indexable pages.

- **What Search Console said (read in Chrome this time; 3 months to 11 November, web search).** 614 impressions, 2 clicks,
  average position 12.8; 32 pages indexed, 9 not (3 redirects, 2 canonical alternates, 3 discovered, 1 crawled). **The
  daily budget calculator alone had 495 of the 614 impressions, at an average position of 9.2, steady at about 15 to 40 a
  day since 18 October, and no click.** Next were the credit-card guide (26, position 50.6), bank-sms-iphone (22, 18.3, one
  click) and sms-setup (14, 5.2). Countries: United Kingdom 157 (position 8.7), United States 147 (15.4), Philippines 38,
  India 34, Australia 31. Google hides almost every query (13 shown, each 1 to 3 impressions, among them "budget pacing
  formula" and "how to account for credit card payments in budget"). The two calculators of 10 November had no impressions
  yet, five days after publication. Small numbers: they show which kind of page gets shown, not how much traffic to expect.
- **So: more calculators, next to the one that is shown.** `tools/budget-pacing-calculator.html` (share of budget spent
  against share of period passed, the gap in money, where the period ends at this pace, and a daily amount; days completed
  are the days before today, as in the pacing guide's example), `tools/payday-calculator.html` (days until the next payday
  and every payday for twelve calendar months, for pay every week, every two weeks, once or twice a month; the months with a
  third or fifth payday; a server-rendered table of 2027's three-paycheck months), `tools/savings-goal-calculator.html` (per
  month, week and day to reach a goal by a date, or how long at a monthly amount; no interest, said on the page) and
  `tools/habit-cost-calculator.html` (a small repeated purchase as a week, a month, a year, five and ten years, and what one
  fewer saves). The hub lists seven and a "Suggest a calculator" card; the home page shows six and links the seventh.
  The pacing and payday guides link to their calculators (the pacing guide stays at 1,300 words: the link replaced a clause).
- **The daily budget calculator's description was rewritten** as the question it answers ("How much can you spend per day
  until payday?"); its title and URL are unchanged because that page is the one that ranks. Judge it by its click rate
  over the next four weeks, not sooner.
- **Ratings.** The US storefront still has none, so the site showed none, while the UAE (4), India, Saudi Arabia and Egypt
  (1 each) hold seven ratings, all five stars. `update_rating.py` now reads 52 storefronts into
  `facts.json` (`ratingsByStorefront`, `allRatingCount`, `allRatingAverage`); the download section of every page shows
  "5.0 on the App Store · 7 ratings across 4 countries · Checked <date>" (Arabic and German in their own words), the home
  page's MobileApplication record carries the matching aggregateRating, and llms.txt lists the count per storefront.
  The validator fails if the record's count or average differs from the storefront figures. Run `update_rating.py` before
  each publication so the count and date stay true; a storefront that does not answer keeps its last figure.
- **Checked.** Every calculator was run in headless Chrome on the built page with normal and edge inputs (first day of a
  period, a period that ended, a used-up budget, the 31st in short months, a weekend payday moved to Friday, a goal already
  reached, a date under a week away); phone layouts were looked at at 390 points through an iframe, because headless
  Chrome will not make a window narrower than 500. Facts about the app were checked in the code (search shows no total,
  so the habit page does not claim one; the start day is 1 to 31 and clamps to the last day).
- **Rules.** A field that applies to one option only carries `data-for` and is hidden by script (`.calculator [hidden]`).
  The 2027 payday table is dated content: replace it with 2028's in late 2027. Nothing unreleased is on these pages (no
  savings goals feature, no every-two-weeks budget period: the payday page says the start day is a fixed day of the month).
  `style.css?v=14`, `site.js?v=12`.
- **Not claimed.** No search volume was measured for any of the four topics. Read Search Console by page in two to four
  weeks; if a calculator is shown and not clicked, rewrite its title and description before adding more pages.
- **After publication (public `c899d4c`).** All five tool URLs answered 200; the live home page shows the rating line and the
  live policy is still the one dated 9 November (the 1.15.0 policy waits for the release: publish with `_ops/build.py`
  and a copy, not the app repo's wrapper, until then). IndexNow accepted 13 URLs. In Google Search Console the sitemap
  was resubmitted and indexing was requested for the four new pages, each accepted into the crawl queue; that is a
  request, not proof of indexing. Bing was not opened.

## 17 November 2026 — Spanish and Portuguese pages (`/es/`, `/pt/`), held behind a release switch; 1.15.0's debts paid

Roadmap 4.3 and 4.4 (`docs/l10n/ROADMAP_1.16.0.md`). Built and validated here; published by the coordinator.

- **What was built.** Three pages per language, like the German ones: `es/index.html`, `es/bank-sms.html`,
  `es/bank-email.html` (Latin American Spanish, tú, `lang="es-419"`) and the same three under `pt/` (Brazilian
  Portuguese, você, `lang="pt-BR"`). Bodies in `_content/{es,pt}/`, chrome and fact blocks `CHROME['es'|'pt']`,
  `FACT_BLOCK_ES`, `FACT_BLOCK_PT` in `build.py`. The SMS guides' 18 steps are the app's own strings (`tools/site_steps.py`
  now writes `es-steps.json` and `pt-steps.json`; the catalog's `pt-BR` is the folder `pt`) over the real Shortcuts
  captures; the email guides' iOS 27 steps come from `email-steps.json`, their iOS 26 steps and Mail paths are the
  catalog's `EmailAlertSteps` strings. Home pictures: `screenshot-assets.md`, 17 November.
- **Written for how alerts arrive there** (`docs/BANK_MESSAGE_RESEARCH_LATAM.md`): most banks in these markets notify by
  app push, and no iPhone automation can read a push. So both home pages lead with pasting an alert, then the email
  and SMS automations by bank, and each SMS guide opens with "how does your bank notify you?" and the path for each answer (a list, not a table: a three-column text table hides its last column on a phone). Filter words:
  "$" (Mexico, Colombia, Argentina, Chile), "S/" (Peru), "R$" (Brazil). Nubank is never said to log itself: "cole o
  aviso do Nubank", and the email guides say no real Nubank, Nu or Mercado Pago email has been tested. Words and promises
  follow the store listings (`marketing/app-store-2026-11-mx`, `-br`) and the style guides.
- **The switch.** `config.json` → `"unreleased_languages": ["es", "pt"]`. While a folder is listed its pages carry
  `noindex`, have no `hreflang`, are left out of the sitemap, `llms.txt` and `llms-full.txt`, no page outside the folder
  links to them, and the English, Arabic and German fact blocks name only English, Arabic and German. They are reached
  only from the 1.16.0 app's links (`AppLinks.siteLanguages` now has `es` and `pt`). **To flip it when 1.16.0 is live:**
  empty the list (and set `app_version` to 1.16.0), run `tools/build_site.py`, publish, then ping IndexNow with the six
  URLs. The pages then become indexable, the English footer links Español and Português, all five home pages name each
  other with `hreflang` (`es-419`, `pt-BR`), every fact block names the five languages, `llms.txt` gains a Spanish and a
  Portuguese recommendation line, and `softwareVersion` reads `release_version` (1.16.0). `validate.py` enforces both
  states, and fails on a build made in one state checked against the other. Page counts: 50 indexable with the switch
  on, 56 with it off.
- **Validator rules added.** The three pages exist per language with the right `html lang`; Spanish pages may print
  "$" before a figure (pesos), every other page still may not; breadcrumb labels "Ruta de navegación" and "Caminho da
  página" are accepted.
- **Owed from 1.15.0, done.** Every claim that a month's CSV export is free was corrected (home, features hub, expense
  reports, private tracker, money coach files, comparisons, the CSV, payday and no-bank-connection guides, the support
  page, the fact blocks in every language, `FEATURE_LIST`, the Arabic and German home pages); the policy of 14 November
  publishes; "TAN-Codes" is back on `de/index.html` (#import) and `de/bank-sms.html` (#after); the email guides in
  English, Arabic and German say the app shows the steps (More → SMS Auto-Import → "Bank alerts by email?");
  `softwareVersion` reads 1.15.0; ratings re-read 17 November (7 ratings in 4 storefronts).
- **Not claimed.** No search volume was measured for any Spanish or Portuguese query. Read Search Console by page
  (`/es/`, `/pt/`) a few weeks after the flip before adding more pages in either language.

## 19 November 2026 — the big update: rules every agent in this batch follows

Owner's request of 19 November: bring the site up to date with everything the app gained, make it the best it can be
for search engines and AI assistants, add guides and calculators, and make the phone landing "next level". Mobile is
57% of impressions (Search Console, 28 days to 17 November: 471 mobile, 348 desktop, 6 tablet; 825 impressions, 2
clicks, average position 12.9). Calculators are what Google shows: daily budget 510 impressions, 50/30/20 51, payday
43, savings goal 33, pacing 22, subscriptions 17. Queries seen: "50 30 20 budget calculator" (and weekly, biweekly,
UK), "subscription cost calculator", "budget pacing formula", "how to account for credit card payments in budget",
"how can i track my spending from sms without linking my bank account?". Small numbers: they say which kind of page
is shown, not how much traffic to expect.

- **Claim only what the live app does: 1.16.0** (on the App Store since 18 November). 1.17.0 is in release and is not
  live: nothing from `docs/releases/1.17.0.json` (decimal-comma and big-amount lists) goes on any page until it is.
- **Where the facts come from:** the code, `Services/FreeTier.swift` for the free/Pro line, `docs/releases/1.1x.0.json`
  up to 1.16.0, and the feature paragraphs in the repo's `CLAUDE.md`. What 1.12.0–1.16.0 added and the site barely
  says, with where it lives in the app:
  - Budget alerts (free): a notification when a budget passes 80% ahead of its pace, and when it goes over, with what
    is left and the days it has to last. Budget settings → "Budget alerts".
  - Bill reminders (free): a notification at 9:00 the morning before a repeating expense is due, with amount and
    account; one notification per day for several bills. More → Recurring → "Remind me the day before".
  - Daily budget for chosen categories (Pro): one category or several read as one, optionally up to a last day inside
    the current budget period (a trip). Today's budget sheet → "Daily budget for". Budgets themselves don't change.
  - Actions on the app icon: touch and hold the icon for Say an expense, New expense, Paste bank message, Ask your coach.
  - Export & Share (Pro, every export since 1.15.0): spreadsheet (CSV) of a month, a range or everything, and the full
    backup, from the share button on Transactions or More → Backup & Export.
  - Search adds it up (free): Spent and Income across every match in every period.
  - Quicker typing (free): arrows beside the date step a day; a shop used before fills its usual category and account.
  - Bank alerts by email: add the account to Apple's Mail app, Shortcuts Email automation filtered on a word in the
    subject (never the sender), action Import Bank Message. Guide: `guides/bank-email-alerts-iphone.html`.
  - Voice: pick the spoken language on the listening screen; a price heard as "1250" for "twelve fifty" is offered as
    12.50 in one tap; lists without pauses; brands fill shop and category.
  - The money coach answers today's spending, a category, account balances and any named month on the phone without
    using an AI question; it speaks English, Arabic, German, Spanish and Portuguese.
  - Five languages: English, Arabic (right to left), German, Spanish (Latin America), Portuguese (Brazil).
  - Private iCloud sync (free) across iPhone, iPad and Mac (Apple silicon), and a settings-conflict card.
  - Getting-started checklist, Siri and widgets (seven widgets, Control Center, Action button on iOS 18).
  - When Pro or a trial ends, nothing saved is locked; the theme and icon come back with Pro.
  - Pro icons: five coach icons (Starry Night, Royal, Sunset Shades, Sweetheart, Violet Spark).
- **Words:** plain and specific, no hype ("AI-powered", "#1", "revolutionary", "game-changer" are out). Never print the
  app's prices. In English visible text never "$" before a digit (validator); write amounts like "120.00" or with a
  code ("AED 120"). Titles ≤ 60 characters, descriptions ≤ 155, both unique.
- **Guides:** 800–1,300 authored words, the direct answer in the first two sentences, the built-in iPhone way first with
  Apple's exact labels, then where the app helps, limits, then "## Frequently asked questions" with "Question? Answer"
  paragraphs (that is how the FAQ schema is read). Register in `_ops/guides.json`. The owner's request lifts the
  one-guide-a-week limit for this batch.
- **Reviews:** `_ops/reviews.json` holds the real App Store reviews word for word (read from App Store Connect on 19
  November). Never edit a word, never invent one, never mark up your own reviews as Review schema (self-serving).
- **File ownership in this batch** (so parallel agents don't collide): calculators agent — `_content/<tool>.html`,
  `_content/tools-index.html`, the `TOOLS` list and tools hub line in `build.py`, a block appended at the end of
  `site.js` and of `style.css`; guides agent — `_content/guides/*.md`, `_ops/guides.json`, `_ops/topics.*`; pages agent —
  `features.json`, `_content/features/*`, compare pages, new standalone pages in `build.py`, `FACT_BLOCK`,
  `FEATURE_LIST`, `LLMS_GUIDE`; coordinator — `_content/home.html`, `home.css`, `home.js`, the `page()` template,
  `_ops/reviews.json`, the shared mobile header and download bar.
- **Commit sources only.** Never commit generated output (`*.html` outside `_content`, `sitemap.xml`, `llms*.txt`,
  `robots.txt`, `_ops/page-dates.json`); build and validate locally, restore the generated files, commit sources. The
  coordinator rebuilds and publishes once at the end. Integrate from your own worktree: commit, `git fetch` and merge
  `origin/main`, build and validate again, grep for conflict markers, push `HEAD:main`; on a rejected push fetch, merge
  and retry. Never force-push.

## 19–20 November 2026 — what the big update built, and what it taught

**The landing (phone first).** `_content/home.html` is rebuilt; it loads `home.css` and `home.js` (only pages in
`build.py`'s `LANDING` set; a localized home joins automatically once its body contains `<section class="hx"`). The hero
is the app's own story line from the onboarding film, "Money slips away in small pieces. Catch every one.", on the app's
dark money-month surface, with a live phone (the timeline engine in `site.js`: `data-at`/`data-off`/`data-pulse`) in which
a bank SMS, two spoken purchases and an Apple Pay purchase are caught while "left today" counts down, and the ChatGPT-made
clay props of the onboarding film (`assets/home/`) fly into it. On a 390 × 664 phone the first screen shows the rating
pill, headline, CTA and the phone's banner and today's number. Then: a proof strip, "three ways in" as radio tabs (work
without script), **"see it read"** (tap an example: every result is the app's real reading of those exact words, produced
by `tools/spoken_bench.swift` and a bank-message harness over `BankMessageParser`; never write a result by hand), today's
number with a mini calculator ((left − bills still to come) ÷ days left, rounded down), the coach chat, twelve tiles, the
real reviews (`_ops/reviews.json`, cards built by `review_rail()`), the 17 screens, plans, FAQ, guides and calculators.
Page height on a phone went from about 19,000 px to 14,700 px.

**Shared chrome.** One-row phone header (brand icon + name, badge, a `<details>` menu that works without script); the
brand carries the app icon on every page; apple-touch-icon; theme colour; a new share image (`assets/og.png`, template
`marketing/og-2026-11/og.html`, no rating baked in because an image can't stay current). Money in the demos is formatted
in the page's language for the visitor's region, Western digits, Arabic keeps "AED 312.40" as the app does.

**Content added by the batch's agents:** 8 guides (daily spending limit, travel abroad, bill reminders, budget alerts,
tracking expenses on iPhone, envelope budgeting, zero-based budget, one shop's total), 4 calculators (monthly zero-based,
trip, emergency fund, net worth; eleven in all), 3 feature pages (daily budget, budget alerts and bill reminders, iCloud
sync), 2 comparisons (Money Manager alternative, YNAB alternative; the research found no comparison page ranking for
"Money Manager alternative"), `faq.html` (27 questions with FAQ schema), `whats-new.html` (1.10.0–1.16.0), every feature
page brought up to 1.16.0, fact block, feature list and `llms.txt` (markdown links, comparisons, FAQ, release history).
75 indexable pages. Research: `docs/growth/2026-11-19-website-research.md`.

**Measured (Lighthouse 13, mobile, local):** home 99 / 100 / 100 / 100 (performance, accessibility, best practices, SEO),
LCP 1.7 s, blocking time 0 ms, CLS 0; a guide and a calculator 100 / 100 / 100 / 100. Run it with the arm64 half of the
universal node: `arch -arm64 /usr/local/bin/node <lighthouse>/cli/index.js …` (x64 node refuses on Apple silicon).

**Lessons, each paid for once:**
- **Never animate an element with `filter: blur()`.** The hero's three blurred, drifting glows cost one 8-second main-thread
  task under Lighthouse's mobile throttling (performance 59). Radial gradients look the same and cost nothing (99).
- **iOS 26 Safari paints the status-bar strip with the body's background**, not `theme-color` or the root: a dark header
  under a white strip needs a dark body, with `main` and the footer carrying the page background (`display:flow-root` on
  main, or a child's margin shows the dark body through).
- `style.css` hides a `.demo-phone`'s timed elements unless the phone itself has `animate`; a timeline that runs on a
  wrapper (the hero's `.hx-demo`) must add `animate` to the phone too (`home.js`).
- Generated HTML is restored before every commit in a shared checkout (sources only); the local preview then serves the old
  output until the next build — rebuild before every screenshot.
- Reviews: one written review is held off the website (`site: false` in `reviews.json`) until the owner decides; the app
  shows it. Flip `site` to show it.

**To check in two to four weeks (Search Console by page):** the daily-budget calculator's click rate (510 impressions, 0
clicks in the 28 days to 17 November), whether the 50/30/20 retitle (weekly, biweekly, monthly pay) earns clicks, first
impressions for the Money Manager and YNAB pages and the four new calculators, and the localized landings by folder.
Bing Webmaster Tools has an AI Performance report (citations, cited pages); read it when signed in.

**Published 20 November 2026 (public `00f29ad`).** All 75 pages in the live sitemap; 28 key URLs checked over HTTPS (200), the
landing seen live in iOS Safari (English and Arabic). IndexNow accepted the 50 pages whose lastmod is 19–20 November plus
`llms.txt`. Search Console: sitemap resubmitted (read "Submitted Nov 20"); indexing requested for the home page, `faq.html`,
both new comparisons, `track-expenses-iphone` and `daily-spending-limit`; the seventh request hit the daily quota, so the
calculators, `features/daily-budget` and `whats-new` wait for the sitemap or a request on another day. Requests are not
proof of indexing. Ratings re-read the same day (5.0 from 8 in 5 storefronts). Reader and copy gaps the localizers found
are app issues #46 and #47, kept off every page.

**Guard for the "see it read" cards (20 November).** `python3 tools/site_readings_check.py` compiles the app's voice parser
and bank-message reader, reads every card on the five landings and compares each draft's amount and direction (or
"skipped"); it exits 1 on any difference. 76 cards, 0 differences on 20 November. Run it after a change to
`NLTransactionParser`, `BankMessageParser` or any landing's examples, and before publishing such a change.
**Bing, 20 November.** Signed in to Bing Webmaster Tools: the sitemap was resubmitted (accepted, "Processing"; last crawl
18 November, 50 URLs before this publication). AI Performance (citations by Microsoft Copilot and partners), last 3 months:
**1 citation** (27 October) — the baseline to compare against in December. The remaining Google indexing requests run
as a T3 scheduled task on 21 November 08:00 Dubai.

**Second publication, 20 November (public `660ab4b`).** A fresh native reader went over each localized landing (Arabic about
50 lines, Spanish 46, German about 60, Portuguese a full pass) and each language's glossary gained the new terms and the
refused calques. Facts they caught, now fixed in every language and in English, `faq.html`, the email guide, the SMS
feature page, the comparison, the fact block and `llms.txt`: **iOS doesn't let anyone copy a notification's text** (paste
works for an SMS, an email, or transaction text a bank's app lets you copy; otherwise say the purchase), and **a free user's
Siri answers what is left of the budget, not today's figure** (that is Pro), so free-labelled lines promise only the
former. Share images now exist in Arabic, German, Spanish and Portuguese (`marketing/og-2026-11/render-langs.py` takes the
words from each reviewed landing; re-run it when a hero changes). The pause button's spoken name contains its visible word in
every language. Lighthouse mobile: home 99, ar 98, de 97, es 99, pt 99 for performance; accessibility, best practices and
SEO 100 on all five. `tools/site_readings_check.py`: 76 cards, 0 differences. IndexNow accepted the 43 pages changed that day.
