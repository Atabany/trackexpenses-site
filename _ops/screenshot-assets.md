# Landing-page screenshot provenance

Updated 5 October 2026. These are genuine simulator captures from the app with synthetic
demo records. Screen contents were not redrawn, retouched or rearranged. Images are scaled
to 660 px wide and encoded as WebP (quality 88) for the website. The original app icon is
scaled to 256 × 256, preserving its artwork.

Sources in the app repository:

| Website asset | Original capture |
| --- | --- |
| transactions.webp | marketing/app-store-2026-09-11/raw/iphone/02-payday.png |
| budget.webp | marketing/app-store-2026-09-11/raw/iphone/01-budget.png |
| say.webp | marketing/app-store-2026-09-11/raw/iphone/03-voice.png |
| sms.webp | marketing/app-store-2026-09-11/raw/iphone/04-bank-sms.png |
| calendar.webp | marketing/app-store-2026-09-11/raw/iphone/05-calendar.png |
| accounts.webp | marketing/app-store-2026-09-11/raw/iphone/07-accounts.png |
| insights.webp | marketing/stats-2026-09/overview-free.png |
| plan.webp | marketing/stats-2026-09/plan-pro-top.png |

Added 6 October 2026 — fresh captures of the current build (iPhone 17 Pro simulator, iOS 26.5,
`-reset-state -seed-demo -in-memory-store` plus the flags below). Originals are in
`marketing/website-2026-10/raw/`: listening (`-pro -present voiceEntry -hearing …`), quick-add
(`-present quickAdd`), summary/monthly (`-pro -trans-mode …`), budget-setting, recurring
(`-present repeatSetting`), sms-setup (`-present messageImport`), sms-review (`-demo-messages
-present messageReview`), foreign (`-pro -demo-foreign -start-tab accounts`), receipt
(`-edit-latest -demo-receipt`), csv-review (`-pro -present backup -import-csv-review`), search
(`-show-filter`), dark-daily and dark-budget (simulator appearance dark, `-pro`). Never capture
the paywall for the site: it prints prices. Summary needs `-pro` or the paywall appears.

Budget guidance, Say it and Plan captures include Pro capabilities; the page labels them.
The SMS capture shows a message-derived draft, not an inbox reader or a bank connection.
The website caption marks example records. Keep source captures intact in the app repository.
Refresh these assets when the corresponding app screens change.

Homepage content is authored in `_content/home.html`, then rendered by `_ops/build.py`.
The below-fold images use native lazy loading. The illustration loads in view, honors
reduced motion/data saving, and has a pause control. The screenshot gallery scrolls without
JavaScript. Every download icon and badge share one accessible campaign link.

Added 30 October 2026: `salary-plan.webp`, from `marketing/website-2026-10/raw/salary-plan.png`
(iPhone 17 Pro simulator, iOS 26.5, appearance dark, `-reset-state -seed-demo -in-memory-store -pro
-demo-plan -present salaryPlan`). The Actual view's capture, `salary-plan-actual.png`, is kept beside
it for a later page. Pro capability; the page labels it.

Added 8 November 2026 — the 1.12.0 widgets on a real Home Screen (iPhone 17 Pro simulator, iOS 26.5,
`-reset-state -seed-demo -pro -demo-templates`, then the Quick Log small widget set to the Taxi template and
the Today medium widget added through the system widget gallery). Original:
`marketing/website-2026-11/raw/widgets-home.png` → `widgets-home.webp`.

Added 9 November 2026 — the money coach page (`features/ai-money-coach.html`): `coach-reading.webp`, from
`marketing/app-store-2026-11-ae/raw/coach-challenge.png`, the raw capture behind the UAE store set's coach frame (commit
8a8bc9a: a 6.9-inch simulator capture of the Coach tab on the UAE demo ledger, in English, after tapping “How do I cut
it?”; 1320 × 2868). Scaled to 660 × 1434 and encoded as
WebP quality 88, otherwise untouched. The UAE capture rather than the US one keeps the site's AED convention; the composed
store frame (`upload/iphone-with-coach/02-coach.png`) was not used because it adds a headline and badges over the screen.
Joining the challenge shown is Pro; the page labels it.

Added 17 November 2026 — the Spanish and Portuguese home pages (`es/index.html`, `pt/index.html`, built for 1.16.0 and
noindex until it is live). Real captures of the 1.16.0 app on an iPhone 17 Pro simulator (iOS 26.5, 1206 × 2622), taken
on 17 November for the 1.16.0 market QA pass (`~/indie/qa-1.16-market/`); the eight used are copied unchanged into
`marketing/website-2026-11-latam/raw/`. Scaled to 660 × 1434 and encoded as WebP quality 82, otherwise untouched.
- `assets/es/ledger.webp` ← `es-tab-budget.png` (Stats → Budget, Mexican peso demo ledger, period 15/11–14/12/2026)
- `assets/es/voice.webp` ← `es-onb1.png` (onboarding page 2, the voice demo: three drafts saved)
- `assets/es/alerts.webp` ← `es-mx-onb3-sms.png` (onboarding page 3 for a Mexican peso ledger: BBVA alerts filed, a code skipped)
- `assets/es/coach.webp` ← `es-onb4.png` (onboarding page 5, the coach demo answering “¿Qué puedo mejorar?”)
- `assets/pt/ledger.webp` ← `pt-tab-daily.png` (Lançamentos → Diário, real ledger list with the SMS setup card)
- `assets/pt/voice.webp` ← `pt-onb1.png` (onboarding voice demo)
- `assets/pt/alerts.webp` ← `pt-onb3-sms.png` (onboarding page 3: a purchase at Pão de Açúcar and a Pix received filed, a code skipped)
- `assets/pt/budget.webp` ← `pt-tab-budget.png` (Stats → Budget, real ledger in R$)
Three of each set are onboarding demos (the app's own animated pages, settled frame), which the captions present as
what the feature does, not as someone's ledger. The Spanish daily list was not used: an Apple Intelligence system banner
covers its top. The bank-SMS guides' 18 pictures each are the real Shortcuts captures in
`marketing/sms-setup-es/screens/ios27` and `marketing/sms-setup-pt-BR/screens/ios27`, 540 px WebP quality 80 in
`assets/es/sms/` and `assets/pt/sms/`, as the German ones.

Replaced 17 November 2026, the same day — the eight home-page captures above predated the last string fixes (the voice page
said “Solo dilo.” where the app now says “Dilo y listo.”). They now come from the store-screenshot capture pass (roadmap
6.4), on the integrated 1.16.0 branch after the second screen sweep: iPhone 17 Pro Max simulator, iOS 26.5, 1320 × 2868,
light, status bar 9:41, Mexican and Brazilian demo ledgers (`-seed-demo -pro -demo-sms-hero`, the day's other purchase
deleted in the app so today is under its share, as in the store set). Sources copied unchanged into
`marketing/website-2026-11-latam/raw/` as `*-1117-store-pass-*.png` (the earlier eight stay beside them), scaled to
660 × 1434, WebP quality 82:
- `assets/es/ledger.webp` ← `es-1117-store-pass-stats-budget.png` (Stats → Budget: $9,804.13 left, daily budget $359.18)
- `assets/es/voice.webp` ← `es-1117-store-pass-onb-voice.png` (onboarding page 2, “Dilo y listo.”, three drafts saved)
- `assets/es/alerts.webp` ← `es-1117-store-pass-onb-sms.png` (onboarding page 3: BBVA alerts at Walmart and Pemex filed, a code skipped)
- `assets/es/coach.webp` ← `es-1117-store-pass-onb-coach.png` (onboarding page 5, the coach answering “¿Qué puedo mejorar?”)
- `assets/pt/ledger.webp` ← `pt-1117-store-pass-daily.png` (Lançamentos → Diário: the Pão de Açúcar purchase from a bank alert, R$ 6,65 left today)
- `assets/pt/voice.webp` ← `pt-1117-store-pass-onb-voice.png` (onboarding voice demo, “É só falar.”)
- `assets/pt/alerts.webp` ← `pt-1117-store-pass-onb-sms.png` (onboarding page 3: Pão de Açúcar and a Pix received filed, a code skipped)
- `assets/pt/budget.webp` ← `pt-1117-store-pass-stats-budget.png` (Stats → Budget: R$ 1.195,44 left, daily budget R$ 69,92)

Replaced 17 November 2026, later the same day — the app changed after the store pass (a budget month is named for the
month that holds most of its days, the Mexican and Brazilian demo ledgers rebalanced so today is under its share, the
Brazilian bank SMS read to "PAO DE ACUCAR" on the Nubank card). Recaptured from a fresh `-reset-state -seed-demo -pro
-demo-sms-hero` launch of the integrated branch (`5a0d31e`): iPhone 17 Pro Max simulator, iOS 26.5, 1320 × 2868, light,
status bar 9:41; nothing deleted in the app any more. The onboarding captures are the settled frames (coach with
`-coach-demo-at 20`), taken with the market's own ledger so the demos use its currency. Sources copied unchanged into
`marketing/website-2026-11-latam/raw/` as `*-1117-recapture-*.png` (the earlier ones stay beside them), scaled to
660 × 1434, WebP quality 82:
- `assets/es/ledger.webp` ← `es-1117-recapture-stats-budget.png` (Stats → Budget: $9,472.36 left, daily budget $347.33)
- `assets/es/voice.webp` ← `es-1117-recapture-onb-voice.png` (onboarding page 2, “Dilo y listo.”, three drafts saved)
- `assets/es/alerts.webp` ← `es-1117-recapture-onb-sms.png` (onboarding page 3: BBVA alerts at Walmart and Pemex filed, a code skipped)
- `assets/es/coach.webp` ← `es-1117-recapture-onb-coach.png` (onboarding page 5, the coach answering “¿Qué puedo mejorar?”, $483.00)
- `assets/pt/ledger.webp` ← `pt-1117-recapture-daily.png` (Lançamentos → Diário: Pão de Açúcar R$ 63,27 on Nubank from a bank alert, R$ 37,90 left of R$ 101,17 today)
- `assets/pt/voice.webp` ← `pt-1117-recapture-onb-voice.png` (onboarding voice demo, “É só falar.”)
- `assets/pt/alerts.webp` ← `pt-1117-recapture-onb-sms.png` (onboarding page 3: Pão de Açúcar and a Pix received filed, a code skipped)
- `assets/pt/budget.webp` ← `pt-1117-recapture-stats-budget.png` (Stats → Budget: R$ 1.757,88 left, daily budget R$ 101,17)

## German home on the landing (20 November 2026)

The German home moved onto the phone-first landing and gained a screen gallery and a two-phone "Einsetzen" stage. Eight
more real German captures were added beside the four of 14 November (`ledger`, `voice`, `budget`, `coach`, which stay).
Sources are the German store-screenshot captures, used unchanged: `marketing/app-store-2026-11-de-october/raw/`
(17 November, iPhone 17 Pro Max simulator, iOS 26.5, 1320 × 2868, German demo ledger, light except the dark voice and
paste screens; capture details in that folder's README) and `marketing/app-store-2026-11-de/raw/` (10 November, same
device). Scaled to 660 × 1434, WebP quality 82:
- `assets/de/say.webp` ← `de-october/raw/voice-say.png` („Einfach sagen“, three drafts from „Kaffee 15, Taxi 40 und Mittagessen 60“, dark)
- `assets/de/paste.webp` ← `de-october/raw/bank-sms.png` (Neue Buchung „Aus deiner Nachricht gelesen“: 27,45 € bei Rewe, Lebensmittel, Kreditkarte, dark)
- `assets/de/daily.webp` ← `de-october/raw/daily.png` (Buchungen → Täglich, 24,83 € heute ausgegeben, 123,00 € übrig)
- `assets/de/budgets.webp` ← `de-october/raw/stats-budget.png` (Statistik → Budget: 1.601,30 € übrig, noch 11 Tage)
- `assets/de/calendar.webp` ← `de-october/raw/calendar.png` (Kalender, Dienstag, 17. November)
- `assets/de/accounts.webp` ← `de-october/raw/accounts.png` (Konten: Nettovermögen 13.012,28 €)
- `assets/de/salary-plan.webp` ← `de/raw/salary-plan.png` (Gehaltsplan November 2026: 150,00 € noch zu verplanen)
- `assets/de/icloud.webp` ← `de/raw/icloud.png` (iCloud-Sync, auf dem neuesten Stand)
