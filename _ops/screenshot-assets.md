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
