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
