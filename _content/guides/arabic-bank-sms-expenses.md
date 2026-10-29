# Track expenses from Arabic bank SMS alerts on iPhone

TrackExpenses can turn supported Arabic bank SMS alerts into ledger entries on iPhone through a Shortcuts Message automation. Version 1.6.0 also includes an Arabic interface with right-to-left layout, alongside English; message parsing happens on your device.

You can keep a ledger without an automation: read each alert and enter its amount, date and merchant in a spreadsheet or expense app. Check the transaction amount separately from the remaining balance, and reconcile against your bank statement. Automation saves repeated entry, but the same checks still matter.

## Use the app in Arabic

Update TrackExpenses to version 1.6.0 or later. Open More → Language under Look & feel to open the app's page in iOS Settings, then choose Arabic in the language setting. The row shows the language currently in use. These menu names describe the English interface; translated labels depend on your current language.

If iOS does not offer a language choice, first add another preferred language in Settings → General → Language & Region → Add Language. You can keep English as your iPhone's primary language while choosing Arabic for TrackExpenses. The app's interface language and the wording of your bank alerts are separate: an English interface can still process supported Arabic messages.

## What Arabic bank alerts look like

A purchase might read "شراء بـSAR 140 لـ MERCHANT" or "تم خصم AED 18.50 من بطاقتك المنتهية بالرقم 6878 لدى ENOC". Incoming transfers use حوالة واردة; salaries may say تم إيداع الراتب. Alerts often use labelled lines rather than sentences.

Arabic attaches prefixes such as بـ and لـ to words, mixes right-to-left sentences with Latin merchant names, and may use Arabic-Indic digits (٠١٢٣). One-time password messages can also contain an amount and transfer wording, so an amount alone does not prove money moved.

## How TrackExpenses reads them

TrackExpenses reads alerts with a rule-based reader that knows Arabic banking vocabulary, not only English. It converts Arabic-Indic and Persian digits before reading amounts, recognises the glued forms of words such as خصم، شراء، الرصيد and the bi/li prefixes, and treats a balance phrase like "رصيدك الحالي" as a balance rather than the amount spent.

Direction comes from the words: خصم and شراء are money out, حوالة واردة and تم إيداع الراتب are money in, and "تم استلام حوالة" is a received remittance. A card-bill message can be recognised as paying your card rather than spending. Rules skip recognised one-time codes, including رمز التفعيل، رمز مؤقت، كلمة مرور لمرة واحدة, and failed operations such as "لم يتم تنفيذ العملية". Test your own bank's wording; this is not a promise that every format is understood.

## Set up the automation

- **1.** Open TrackExpenses, create the receiving account, then open More → SMS Auto-Import. Check your iOS version in Settings → General → About.
- **2.** In Shortcuts, create a Message automation. On iOS 27, start in Library → Automation → +, open Editor if prompted, then add Automation → Message.
- **3.** Filter on wording present in real alerts, such as شراء or خصم. In the iOS 27 trigger, change the blue Sender field to Message, then enter the text to match. A currency code such as AED or SAR is another option if your bank uses it consistently.
- **4.** Add TrackExpenses' Import Bank Message action. On iOS 27, select the trigger's Message variable, then choose its Content property. Turn Confirm Before Run off in the trigger and Show When Run off in the action; check Allow Running When Locked under the editor's Privacy settings.
- **5.** On iOS 26, use Message Contains, choose Run Immediately, and connect the action's Message parameter to Shortcut Input instead. Save and confirm the automation is enabled.

If your bank writes ريال or درهم without a currency code, use wording the alerts actually contain. Check recent messages first. Avoid overlapping automations and remember that a currency filter can also match personal texts.

The [complete SMS setup guide](sms-setup.html) has separate iOS 27 and iOS 26 videos and screenshots. Use the [troubleshooting checklist](sms-automation-not-working.html) if no activity appears, and the [SMS feature page](../features/sms-expense-tracker.html) for the overall workflow.

## Test with a real alert before relying on it

The SMS Auto-Import screen lets you test a copied message and see the amount, direction, merchant and card, or the reason it would be skipped. Try a purchase, transfer and salary alert. For example, an alert with a purchase of AED 18.50 and a remaining balance of AED 2,000 should produce an expense of 18.50, not 2,000. Check the account and currency too.

You can also copy an alert in Messages, open Quick Add and paste it under "From a bank message". Review the resulting draft before saving. This manual route does not use the automatic import allowance. A successful paste test does not prove the automation is connected: wait for the next genuine matching alert, then check the setup screen's activity.

## Link your cards and accounts

Arabic alerts usually print the last digits of the card or account: "المنتهية بالرقم 6878" or "**1000". Add those digits to the matching account in TrackExpenses (the account editor has a field for them), or use "File under…" on the review sheet once. After that, purchases on that card land in the right account automatically. When an alert describes an ATM withdrawal (سحب صراف آلي) or a transfer between your own accounts (حوالة بين حساباتك), it becomes a transfer only when both accounts can be matched; otherwise it is flagged for review instead of guessed.

## Salary and incoming transfers

A salary credit is the alert a ledger most wants. With "Import money coming in" turned on in the SMS Auto-Import settings, credits such as تم إيداع الراتب and حوالة واردة are imported as income and flagged, so you confirm them on the review sheet. Leave it off if you prefer to record income yourself.

## Limits

Free includes 10 successful automatic imports per calendar month on each device. Further alerts are kept but locked outside your totals until Pro releases them, or the next calendar month's allowance releases as many as it covers. Saved entries remain available. Raw message text is not saved in the ledger. Only alerts passed by your configured automation reach the reader; the app cannot read your inbox or backfill old texts. System notifications vary by iOS version and settings.

## Frequently asked questions

Does TrackExpenses support Arabic bank SMS? Yes. It reads common Arabic purchase, transfer, salary and card-payment wordings by rule on your device, and refuses Arabic one-time codes. Test your own bank's alert in the setup screen.

Is the app available in Arabic? Yes. Version 1.6.0 adds an Arabic interface with right-to-left layout. Supported Arabic bank messages and spoken entries can also be used.

Which phrase should the automation look for? Choose purchase wording or a currency code present in your bank's actual alerts. Test several messages and avoid filters that forward unrelated texts.

Can it read the Arabic-Indic digits in my alerts? Yes. Arabic-Indic and Persian digits are converted before the amount is read.

Sources: TrackExpenses 1.6.0 language settings, bank-message reader and FreeTier code, checked 29 October 2026; [Apple's language settings instructions](https://support.apple.com/en-us/109358). Version-specific Shortcuts steps follow the app's [recorded setup walkthroughs](sms-setup.html). Example alerts are illustrative, not bank compatibility guarantees.
