# Privacy Policy

**Expense Tracker: SMS & Voice (TrackExpenses)** — last updated 8 November 2026.

## The short version

TrackExpenses has no account, no login, and no server of ours. Your ledger lives on your iPhone, and — if you leave iCloud on — in your own private iCloud database. We cannot see it, and neither can anyone else.

This policy covers the app on iPhone, iPad and Mac, and the app for Android. Where Android works differently, the section **TrackExpenses for Android** below says how; everything else applies to both.

## What TrackExpenses stores

- The ledger you build: transactions with their amount, currency, date, category, account, payee and any note you write.
- Your accounts, account groups and their balances, your budgets, and your recurring rules.
- The categories you keep or create.
- Your settings: the day your fiscal month starts, your main and additional currencies, your reminder time, your app icon, and whether the app lock is on.

## Where it is stored

On your device, in the app's own container. If iCloud is on for TrackExpenses, the same data syncs through **your private iCloud database** — that is Apple's infrastructure inside your Apple Account, **not a server of ours**. We have no key to it, no console for it, and no way to read it. Turning iCloud off for TrackExpenses in your iOS settings keeps everything on the one device.

Deleting the app removes the copy on that device. There is no copy on any server of ours, because there is no server of ours.

## What leaves your device

**Purchases.** TrackExpenses uses RevenueCat to manage subscriptions and restore purchases. RevenueCat receives purchase and receipt information, an anonymous app user ID it generates, a device identifier, and basic app and OS version details. This is used to work out whether you have Pro access and to understand purchases, subscriptions and advertising performance. It is not shared with data brokers. RevenueCat's own policy is at <https://www.revenuecat.com/privacy>.

**Apple Ads measurement.** On app launch, RevenueCat can receive Apple's standard AdServices attribution token and use it to ask Apple whether an install came from an ad for TrackExpenses on the App Store. Apple may return the campaign, ad group, keyword, ad placement and country or region associated with that install. RevenueCat associates this attribution with the anonymous purchase record so we can measure which campaigns lead to purchases. Your ledger entries, balances, budgets, bank messages and voice recordings are never sent to RevenueCat or Apple Ads. This measurement does not request the advertising identifier (IDFA), use a custom account identifier, or send your subscription events back to Apple Ads.

**Apple.** Purchases are processed by Apple under Apple's own privacy policy, and iCloud sync is carried by Apple under your Apple Account. We never see your payment details.

**Ask your coach.** If you type a question to the money coach, and only after you have agreed on the screen that asks, the question travels with a summary of this month and last month — totals, categories and their budgets, your biggest shops, your salary plan lines and your challenge — to a small relay we run on Cloudflare, which passes it to Anthropic's Claude model and streams the answer back. If the model asks for a detail, the app answers it from your ledger with the same kind of summary. **Nothing else is sent**: never your notes, receipts, account names or numbers, balances, or raw transaction lists. The relay keeps nothing and logs no content; Anthropic does not use the data to train its models and deletes it within 30 days under its own terms at <https://www.anthropic.com/legal/privacy>. The tapped questions and everything else the coach says are worked out on your device and never leave it. You can withdraw your agreement at any time under More → Privacy & data, and the relay counts how many questions each install asks (ten a month free) without knowing who you are.

On iPhone, iPad and Mac, that is the complete list. Apart from Apple's services, RevenueCat's purchase and Apple Ads measurement, and the coach relay described above, there is no separate analytics SDK, advertising network SDK or crash reporter in the app. The Android app's list is in **TrackExpenses for Android** below.

## TrackExpenses never connects to your bank

There is no bank login, no account aggregator, and no place to type a banking credential. TrackExpenses knows your balances because you told it, and for no other reason. It cannot move money, and it cannot see an account you have not entered yourself.

## SMS auto-import is not access to your messages

iOS never hands an app your Messages inbox, and TrackExpenses does not ask for it. The optional SMS auto-import is a **Shortcuts automation that you set up and control**: when a bank alert arrives, Shortcuts passes that one message's text to the app. The optional Apple Pay import works the same way through a Shortcuts Transaction automation, which hands the app the amount, the merchant and the card's name, and nothing else.

It is read on your device. Only the amount, the merchant, the date and the last digits of the card the message names reach your ledger — as a transaction you can edit or delete like any other, marked as imported until you have looked at it. The message text itself is **never saved**. Two small records are kept on the device so you can see the automation working: a short numeric fingerprint of each message for up to 24 hours, purely so that a retried automation cannot enter the same purchase twice, and an activity log of what each run did — the time, the outcome, and the amount and payee that reached your ledger, never the message. If you turn on import notifications, the app posts them locally. Nothing about the message leaves your device, and deleting the automation in Shortcuts ends the whole arrangement.

You can also paste a bank message in yourself, on the new-transaction screen. It is read on the same terms: on your device, into a draft you check before saving, with the message text **never stored**. On an iPhone with Apple Intelligence, a message the app's own rules cannot read is passed to Apple's on-device model so that banks and languages the app was never taught can still be understood — that model runs on your iPhone, and the message does not leave it.

## Voice entry runs on your device

On iPhone, iPad and Mac, speech is recognised on your device by Apple's on-device speech and Apple Intelligence models. Audio is streamed straight to the recogniser as you speak — it is **never written to a file**, never stored, and never uploaded — and it is discarded as soon as the draft transaction appears. What voice entry produces is a draft you confirm, not an entry made behind your back. On Android, voice entry runs on the phone whenever the phone can recognise your language; when it can't, see **TrackExpenses for Android** below.

## TrackExpenses for Android

The Android app keeps the same ledger and the same promises: no account, no login, no server of ours, and no connection to your bank. It differs from the iPhone app in these ways.

- **Where your ledger is stored.** On your phone, in the app's private storage. There is no iCloud on Android, and the app does not sync between devices. If backup to your Google Account is on, Android includes the app's data **only when that backup is end-to-end encrypted** with your screen lock (Android 9 or later, with a PIN, pattern or password set); without that encryption the app tells Android to leave its data out of the cloud backup. The app lock's passcode is never backed up.
- **Bank alerts come from notifications, not from your messages.** The Android app asks for no SMS permission and cannot read your messages. The optional automatic import uses Android's **Notification access**, which you turn on yourself in Android's settings after the app explains what it will read and you tap Agree. It reads notifications only from the banking and messaging apps you pick, ignores every other app's, and reads them on your phone. As on iPhone, only the amount, the merchant, the date and the last digits of the card reach your ledger, the notification text is **never saved**, and the same 24-hour message fingerprint and activity log are kept on the phone. You can turn Notification access off at any time in Android's settings. A bank message you share to the app or paste in yourself is read on the same terms.
- **Voice entry: on your phone first, Google's speech service otherwise.** When your phone can recognise your language on the device, speech is recognised there and the audio does not leave the phone. When it can't (some phones, older Android versions, or a language the phone's on-device recogniser doesn't have), the app uses Google's speech recognition service on your phone, which may send the audio to Google to turn it into text, under Google's privacy policy at <https://policies.google.com/privacy>. When that is the case, the app says so before you speak, in one line on the listening screen, the voice limit screen and the first microphone question: "On this phone, Google's speech service turns what you say into text. Nothing is saved." The listening screen also says "Google speech" while it listens. Either way the app streams the audio to the recogniser, never writes it to a file and never keeps it; only the words come back, as a draft you confirm.
- **The on-device model and ML Kit diagnostics.** On Android phones that have Google's on-device Gemini Nano model, a sentence or a pasted message the app's own rules cannot read may be passed to that model through Google's ML Kit. The model runs on your phone, and the text does not leave it. ML Kit, which the app includes for this, sends Google diagnostic information about how it is working: device and app information, performance metrics, the API configuration, event types, error codes, the languages configured, and a per-installation identifier. It never includes your messages, your sentences or your ledger. Google describes it at <https://developers.google.com/ml-kit/android-data-disclosure>.
- **Purchases.** On Android, purchases are made through Google Play, under Google's privacy policy, and we never see your payment details. RevenueCat receives the Google Play purchase information, the anonymous app user ID it generates, and basic device, app and OS version details, to work out whether you have Pro access and to understand purchases. There is no Apple Ads measurement, and no other advertising measurement, on Android. A purchase belongs to the store it was made in: Pro bought on the App Store does not unlock the Android app, and Pro bought on Google Play does not unlock the iPhone app, because there is no TrackExpenses account to connect the two.
- **Ratings.** When the app asks for a rating, it uses Google Play's in-app review, which Google Play handles.
- **Permissions.** The microphone, only when you tap to speak. Notifications, only if you turn on import notices or the daily reminder; both are scheduled on the phone. Fingerprint or face unlock through Android's own prompt, which tells the app only whether it succeeded. A receipt photo through Android's photo picker, which hands the app only the photo you choose. The app asks for no SMS, contacts, location or storage permission, and does not request the advertising ID.
- **Deleting.** Uninstalling the app removes its data from the phone. To remove an encrypted backup, delete it from your Google Account's backups in Android's settings. For the purchase record Google Play and RevenueCat hold, email us and we will request its deletion on your behalf.

## Things people reasonably assume, that aren't true here

- **TrackExpenses does not access your contacts, your photos, your location, or any other app.**
- **Face ID / Touch ID.** If you turn on the app lock, authentication is handled entirely by iOS. TrackExpenses is told only whether it succeeded. Your biometric data never reaches the app.
- **Notifications** are scheduled locally on your device. Nothing is sent through a server.
- **The widget and the Siri shortcuts** read a small summary from a shared container on your device only.

## Tracking

TrackExpenses **does not track you** across other companies' apps or websites and does not share data with data brokers. It never requests the advertising identifier. Apple's standard attribution described above is used only to measure ads for TrackExpenses; it does not use your ledger to target ads or build an advertising profile.

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

- **8 November 2026:** added **Ask your coach**: a question you type to the money coach, only after you agree on the screen that asks, is sent with a summary of this month and last month to a relay we run and on to Anthropic's Claude model. The tapped questions and everything else the coach says stay on your device.
- **4 November 2026:** added **TrackExpenses for Android**, which describes the Android app. Nothing about the iPhone, iPad and Mac app changed.

## Contact

Questions about privacy, or a deletion request: **atabany.apps@gmail.com**
