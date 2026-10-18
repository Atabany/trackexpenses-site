# Track expenses on iPhone without connecting your bank

You can track expenses without sharing a bank login: keep a ledger in a spreadsheet or an app, then reconcile it against your statements. TrackExpenses adds manual entry, on-device voice drafts and optional Shortcuts imports for supported bank alerts; it does not connect to your bank or read your Messages inbox.

The useful question is how much entry work you will actually keep doing. A private ledger with missing purchases can be less useful than a simpler record you maintain consistently. Start with one account and a week of real spending before building an elaborate system.

## Start with a simple record you control

Apple Numbers is a reasonable built-in option if it is already on your phone. Create a table with date, description, amount, currency, category and account. Enter each purchase as one row. Keep money entering an account separate from purchases, and record movements between your own accounts consistently.

For the first week, use a few recognizable categories rather than dozens. Groceries, transport, eating out and bills can be enough to discover whether the routine works. Keep the currency alongside the amount: 50 in one currency is not interchangeable with 50 in another.

A spreadsheet gives you flexible columns and direct control over formulas. Its trade-off is the work of maintaining those formulas and entering purchases on a small screen. If entry becomes the obstacle, look for a faster input method before abandoning the record.

## Compare manual, SMS and bank-connected tracking

Manual entry works for cash, cards and purchases that never generate an alert. You choose what to save and can correct the description immediately. The cost is attention: a forgotten purchase stays missing until you catch it.

SMS-assisted entry reduces typing when your bank sends supported transaction alerts. In TrackExpenses, a Shortcuts Message automation passes selected incoming messages to the app. It is an optional workflow you set up, rather than permission for the app to browse old messages. Alerts can be delayed, incomplete or unsupported, so compare saved entries with your statement.

Bank-connected services offer another workflow: supported institutions send records through a connection arranged by that service. Coverage, authorization, timing and retention depend on the provider and bank. Read their current documentation before choosing one. This guide does not claim that a particular connection is unsafe, or that manual tracking is always more accurate.

## Set up a ledger without a bank login

Add the account you spend from and give it a clear name. Enter an opening balance only if you know the balance at your chosen starting point. Otherwise, start recording purchases and reconcile the account before relying on its displayed balance.

Choose your main currency and the start of your monthly budget period. A monthly period beginning on payday can make the record easier to read if that matches how you plan. A fixed monthly start is different from a rolling two-week pay cycle; do not assume the app models both.

Then enter a few purchases manually. Check their dates, categories and accounts. TrackExpenses includes unlimited manual transactions and budgets in the free ledger. Its [private expense tracker page](../features/private-expense-tracker.html) explains the privacy model and current limits.

## Make entry quick enough to repeat

Use one reliable habit: record a purchase after paying, or review receipts at a set time each evening. A widget or template can reduce the number of steps. Cash still needs an explicit record because there may be no notification to import.

On compatible devices and languages, voice entry creates drafts on your device. Say the purchases, inspect the amounts and accounts, then save the intended entries. The free allowance is 10 saved voice entries per calendar month on each device; Pro removes that limit. See the [voice entry guide](voice-expenses-iphone.html) before treating it as your main input method.

If you enable SMS import, start with the [bank SMS setup guide](bank-sms-iphone.html). Test a supported alert and inspect the result before enabling more filters. Free use includes 10 successful automatic SMS imports per calendar month per device. Later alerts are retained but locked outside totals until Pro or a later allowance releases them.

## Reconcile instead of assuming automation is complete

Once a week, compare the ledger with your bank statement and your cash on hand. Look for missing purchases, duplicate imports, refunds and the wrong account. A matching transaction count alone is insufficient: two incorrect entries can cancel each other numerically.

For example, suppose you record a card purchase of 40 and later pay 40 from a bank account toward that card. The purchase is spending; the payment moves money between your accounts. Recording both as purchases doubles the apparent spending. The [credit card payment guide](credit-card-payment-vs-expense.html) explains the workflow in more detail.

Keep a short note about unresolved differences. Correct the record when you understand the cause rather than adding an unexplained balancing entry immediately. The aim is a ledger you can explain, including any known gaps.

## Understand what private storage means

No bank connection does not mean that every service is offline. TrackExpenses can sync the ledger through your private iCloud account; Apple and RevenueCat handle purchases. Read the [privacy policy](../privacy.html) for the actual data flow and decide whether that fits your needs.

Export a selected month as CSV when you want a portable table. CSV is useful for reviewing rows in Numbers, but it is not a complete app backup. Pro adds full JSON backup and restore. Check an exported file before depending on it, and store copies somewhere you control.

## Frequently asked questions

Does TrackExpenses need my bank password? No. The app does not connect to your bank. You enter purchases or configure optional Shortcuts workflows for supported alerts.

Can it import my entire SMS history? No. A configured Shortcuts automation passes matching incoming messages; the app cannot read your Messages inbox or retrieve your old banking messages.

Is bank-free tracking automatically more accurate? No. Accuracy depends on complete entries, correct account assignments and reconciliation. Any input method can leave gaps or duplicates.

Sources: [Apple: Message event triggers in Shortcuts](https://support.apple.com/guide/shortcuts/event-triggers-apd932ff833f/ios). Product features and allowances checked against the TrackExpenses 1.4.0 listing and app source on 18 October 2026. Examples describe record keeping, not personalized financial recommendations.
