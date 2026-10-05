# Track expenses from Arabic bank SMS alerts on iPhone

Banks in the UAE, Saudi Arabia, Oman, Egypt and the rest of the region often send every card purchase, transfer and salary credit as an Arabic text message. On an iPhone you can turn those alerts into ledger entries with a Shortcuts Message automation that passes each alert to TrackExpenses, which reads Arabic and English alerts by rule on your device. The app's interface is in English; the alerts themselves can be in Arabic.

## What Arabic bank alerts look like

Gulf and Egyptian alerts follow a few recurring shapes. A card purchase might read "شراء بـSAR 140 لـ MERCHANT" or "تم خصم AED 18.50 من بطاقتك المنتهية بالرقم 6878 لدى ENOC". An incoming transfer says "حوالة واردة" with the amount after "المبلغ" or "مبلغ". A salary arrives as "تم إيداع الراتب". A card bill payment reads "لتسديد مستحقات بطاقتك الائتمانية". Many alerts are laid out as labelled lines — مبلغ، لدى، من، إلى، في — rather than as a sentence.

Three things make these messages harder for software than English ones:

- **Glued prefixes.** Arabic attaches small words to the next word: "بـ" (with), "لـ" (for or to), "الـ" (the), so "الخصم" contains "خصم" without a space.
- **Mixed scripts and directions.** An Arabic sentence often carries a Latin merchant name, a Latin currency code and digits, and right-to-left layout moves commas and times around them. Digits may be Western or Arabic-Indic (٠١٢٣).
- **Codes that look like transfers.** Saudi one-time password messages often quote the amount and the purpose — "رمز: 5617 / لـ: تحويل داخلي / المبلغ: SAR 300.00" — so a careless reader would import a code as a transfer.

## How TrackExpenses reads them

TrackExpenses reads alerts with a rule-based reader that knows Arabic banking vocabulary, not only English. It converts Arabic-Indic and Persian digits before reading amounts, recognises the glued forms of words such as خصم، شراء، الرصيد and the bi/li prefixes, and treats a balance phrase like "رصيدك الحالي" as a balance rather than the amount spent.

Direction comes from the words: خصم and شراء are money out, حوالة واردة and تم إيداع الراتب are money in, and "تم استلام حوالة" is a received remittance. A card-bill message is recognised as paying your card rather than spending. The reader refuses one-time codes, including the Arabic code wordings (رمز التفعيل، رمز مؤقت، كلمة مرور لمرة واحدة), and failed operations such as "لم يتم تنفيذ العملية", so they never become transactions.

Dates get special care. "02/09/2026" can mean 2 September or 9 February. An alert describes something that just happened, so when one reading is recent and the other is months away, the recent one wins.

## Set up the automation

1. Install TrackExpenses and open More → SMS Auto-Import. The screen explains each step and shows your free monthly allowance.
2. In the Shortcuts app, open Automation and create a new personal automation with the Message trigger.
3. For "Message Contains", use the currency code your bank prints, such as AED, SAR, OMR or EGP. It appears in almost every transaction alert and almost never in personal texts. Leave Sender empty, because banks change sender names.
4. Choose Run Immediately, then add the TrackExpenses action "Import Bank Message".
5. Tap the action's Message field and choose Shortcut Input, so the alert itself is passed in. Turn off Show When Run.

If your bank writes the currency as a word, such as ريال or درهم, without a code, use the word your alerts actually contain. Check a few recent messages first.

The general [bank SMS setup guide](bank-sms-iphone.html) shows the same steps with screenshots of each screen, and the [troubleshooting guide](sms-automation-not-working.html) covers automations that do not run.

## Test with a real alert before relying on it

The SMS Auto-Import screen has a box where you can paste one of your bank's messages and see exactly what would be imported: the amount, direction, merchant and card, or the reason it would be skipped. Do this with a purchase, a transfer and a salary alert from your own bank. Formats differ between banks and change over time, and no reader understands every one.

You can also paste any alert by hand: copy it in Messages, open Quick Add in TrackExpenses and tap the paste button in "From a bank message". The draft opens in the entry sheet for you to confirm. Pasting is free and does not use the automatic import allowance.

## Link your cards and accounts

Arabic alerts usually print the last digits of the card or account: "المنتهية بالرقم 6878" or "**1000". Add those digits to the matching account in TrackExpenses (the account editor has a field for them), or use "File under…" on the review sheet once. After that, purchases on that card land in the right account automatically. When an alert describes an ATM withdrawal (سحب صراف آلي) or a transfer between your own accounts (حوالة بين حساباتك), it becomes a transfer only when both accounts can be matched; otherwise it is flagged for review instead of guessed.

## Salary and incoming transfers

A salary credit is the alert a ledger most wants. With "Import money coming in" turned on in the SMS Auto-Import settings, credits such as تم إيداع الراتب and حوالة واردة are imported as income and flagged, so you confirm them on the review sheet. Leave it off if you prefer to record income yourself.

## Limits

Free includes 20 successful automatic imports per calendar month on each device. Further alerts wait outside your totals until you save them individually for free, the month resets, or you upgrade to Pro. Nothing is silently dropped. The app keeps what it read, never the message text. iOS shows a banner each time a message automation runs; an app cannot hide it.

## Frequently asked questions

Does TrackExpenses support Arabic bank SMS? Yes. It reads common Arabic purchase, transfer, salary and card-payment wordings by rule on your device, and refuses Arabic one-time codes. Test your own bank's alert in the setup screen.

Is the app available in Arabic? No. The interface is English. Arabic is supported in bank messages and in spoken entries.

Which phrase should the automation look for? Your bank's currency code, such as AED or SAR, because it appears in nearly every transaction alert. Use the Arabic currency word only if your bank never prints the code.

Can it read the Arabic-Indic digits in my alerts? Yes. Arabic-Indic and Persian digits are converted before the amount is read.

Source: TrackExpenses bank-message reader rules and real Gulf alert formats collected for its tests, checked in October 2026. Example alerts are illustrative.
