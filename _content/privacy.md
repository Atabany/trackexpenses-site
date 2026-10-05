# Privacy Policy

**Expense Tracker: SMS & Voice (TrackExpenses)** — last updated 5 October 2026.

## The short version

TrackExpenses has no account, no login, and no server of ours. Your ledger lives on your iPhone, and — if you leave iCloud on — in your own private iCloud database. We cannot see it, and neither can anyone else.

## What TrackExpenses stores

- The ledger you build: transactions with their amount, currency, date, category, account, payee and any note you write.
- Your accounts, account groups and their balances, your budgets, and your recurring rules.
- The categories you keep or create.
- Your settings: the day your fiscal month starts, your main and additional currencies, your reminder time, your app icon, and whether the app lock is on.

## Where it is stored

On your device, in the app's own container. If iCloud is on for TrackExpenses, the same data syncs through **your private iCloud database** — that is Apple's infrastructure inside your Apple Account, **not a server of ours**. We have no key to it, no console for it, and no way to read it. Turning iCloud off for TrackExpenses in your iOS settings keeps everything on the one device.

Deleting the app removes the copy on that device. There is no copy on any server of ours, because there is no server of ours.

## What leaves your device

**Purchases.** TrackExpenses uses RevenueCat to manage subscriptions and restore purchases. When you buy, restore, or open the paywall, RevenueCat receives purchase and receipt information, an anonymous app user ID it generates, a device identifier, and basic app and OS version details. This is used to work out whether you have an active subscription, and nothing else. It is not used for advertising, and it is not shared with data brokers. RevenueCat's own policy is at <https://www.revenuecat.com/privacy>.

**Apple.** Purchases are processed by Apple under Apple's own privacy policy, and iCloud sync is carried by Apple under your Apple Account. We never see your payment details.

That is the complete list. The app makes no network requests of its own. There is no analytics SDK, no advertising SDK, no crash reporter, and no third-party tracking of any kind in it.

## TrackExpenses never connects to your bank

There is no bank login, no account aggregator, and no place to type a banking credential. TrackExpenses knows your balances because you told it, and for no other reason. It cannot move money, and it cannot see an account you have not entered yourself.

## SMS auto-import is not access to your messages

iOS never hands an app your Messages inbox, and TrackExpenses does not ask for it. The optional SMS auto-import is a **Shortcuts automation that you set up and control**: when a bank alert arrives, Shortcuts passes that one message's text to the app. The optional Apple Pay import works the same way through a Shortcuts Transaction automation, which hands the app the amount, the merchant and the card's name, and nothing else.

It is read on your device. Only the amount, the merchant, the date and the last digits of the card the message names reach your ledger — as a transaction you can edit or delete like any other, marked as imported until you have looked at it. The message text itself is **never saved**. Two small records are kept on the device so you can see the automation working: a short numeric fingerprint of each message for up to 24 hours, purely so that a retried automation cannot enter the same purchase twice, and an activity log of what each run did — the time, the outcome, and the amount and payee that reached your ledger, never the message. If you turn on import notifications, the app posts them locally. Nothing about the message leaves your device, and deleting the automation in Shortcuts ends the whole arrangement.

You can also paste a bank message in yourself, on the new-transaction screen. It is read on the same terms: on your device, into a draft you check before saving, with the message text **never stored**. On an iPhone with Apple Intelligence, a message the app's own rules cannot read is passed to Apple's on-device model so that banks and languages the app was never taught can still be understood — that model runs on your iPhone, and the message does not leave it.

## Voice entry runs on your device

Speech is recognised on your iPhone by Apple's on-device speech and Apple Intelligence models. Audio is streamed straight to the recogniser as you speak — it is **never written to a file**, never stored, and never uploaded — and it is discarded as soon as the draft transaction appears. What voice entry produces is a draft you confirm, not an entry made behind your back.

## Things people reasonably assume, that aren't true here

- **TrackExpenses does not access your contacts, your photos, your location, or any other app.**
- **Face ID / Touch ID.** If you turn on the app lock, authentication is handled entirely by iOS. TrackExpenses is told only whether it succeeded. Your biometric data never reaches the app.
- **Notifications** are scheduled locally on your device. Nothing is sent through a server.
- **The widget and the Siri shortcuts** read a small summary from a shared container on your device only.

## Tracking

TrackExpenses **does not track you**. It does not link your data with third-party data for advertising, and it does not share data with data brokers. It never requests the advertising identifier.

## Your data, your control

- **Export.** The Transactions screen exports the month you are viewing as a CSV for spreadsheets. This is free, and stays free, so your records are never locked in. With TrackExpenses Pro, More → Backup & Export also exports any date range and writes a full-fidelity JSON backup of everything the app holds, which it can restore. You choose where each file goes; nothing is uploaded.
- **Import.** With Pro, More → Backup & Export also reads a CSV file you pick — from a spreadsheet, another money app, or a bank. The file is read entirely on your device, you see exactly what it would add before anything is written, and nothing about it is uploaded. TrackExpenses only ever sees the one file you hand it.
- **Delete.** Deleting the app removes its data from that device. To remove the synced copy, delete the app's iCloud data from your iOS settings under your Apple Account. For the purchase record Apple and RevenueCat hold, email us and we will request its deletion on your behalf.

## Children

TrackExpenses is not directed at children under 13, and we do not knowingly collect any information from children under 13.

## Not financial advice

TrackExpenses is a record-keeping tool. Its insights — safe-to-spend, projected spending, comparisons against last period — are arithmetic on the numbers you entered. They are **not financial advice**, and they are only ever as accurate as what you have recorded.

## Changes

If this policy changes, the date at the top changes with it, and material changes will be noted in the app's release notes.

## Contact

Questions about privacy, or a deletion request: **atabany.apps@gmail.com**
