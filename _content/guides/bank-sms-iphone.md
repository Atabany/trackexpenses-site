# Automatically track bank SMS expenses on iPhone

You can turn supported bank SMS alerts into expense entries on iPhone by creating a Message automation in Shortcuts and passing its input to TrackExpenses. Setup is required: TrackExpenses cannot browse your Messages inbox, and a successful import still needs a quick review of the amount, account and category.

## Start with the built-in iPhone options

Without an expense app, you can copy a bank alert into Notes or enter its amount in Numbers. Both are useful for a small manual record, but neither turns a text into a categorized ledger automatically. Shortcuts provides the built-in trigger that can react when a message arrives. The action you connect to that trigger determines what happens next.

Apple documents two Message conditions: Sender and Message Contains. If you set both, both must match. Choose a filter that appears consistently in genuine transaction alerts. A bank's sender may change between cards or types of payment, while a currency code such as AED often appears in its financial alerts. A currency filter can also match personal messages, so review what your own bank actually sends before choosing it. Do not pass every incoming message just because that is easier to configure.

## Connect the Message trigger to TrackExpenses

Open TrackExpenses and go to More → SMS Auto-Import. Follow its setup guide alongside Shortcuts. In Shortcuts, open Automation, create a new automation and choose Message. Set Message Contains to the relevant phrase from your bank's alerts, or choose the sender if it is stable. Choose Run Immediately when that option is available. Follow the action-building route and add the TrackExpenses bank-message import action.

The action's Message field is the critical connection. Tap the field and choose Shortcut Input. A blank field does not mean that Shortcuts will somehow find the text on its own. It means the import action has nothing to read. Switch off Show When Run so the action does not open an input dialog for every bank alert. Check these two details even if you used the app's guide: an automation can exist and still have an unconnected parameter.

Keep the automation narrow and test it with the next genuine alert. Opening the app's paste reader is a useful format test, but it does not prove that an incoming-message automation is connected. The two paths receive messages differently, and automatic processing has stricter checks because you are not looking at a draft as it is read.

## Check one message before relying on automation

More → SMS Auto-Import includes a message check. Copy a real alert yourself and use the check to see whether the reader understands it. Hide any identifying details before sharing a sample with support. A useful example has a transaction amount, currency, merchant and date; the reader must distinguish the purchase from a balance or a card number.

For example, a message describing an AED 45 purchase and an available balance of AED 2,000 should produce a 45 expense, not a 2,000 expense. Look at the direction as well as the number. A salary credit is money coming in; a transfer between your own accounts is a different kind of event from buying groceries. TrackExpenses can resolve some transfer shapes when both accounts are identifiable, but you should never assume that every bank format is supported.

## Review the entries that arrive

Open the import review in the app after your test alert. Check the amount and currency first, then the account, payee, category and date. An account inferred from masked card digits or a category learned from your previous entries is helpful, but it is still something to verify. Correcting the payee's category can improve later categorization for the same merchant.

A possible duplicate needs special attention. Banks may send an authorization alert and a later settlement alert for the same purchase. That is one purchase even though it produced two messages. TrackExpenses flags nearby matches for review; remove a duplicate only after comparing it with the original. A foreign-currency alert may wait for you to supply a rate rather than entering a guessed conversion into your totals.

## Understand the free allowance

The free ledger includes 20 successful automatic bank SMS imports per calendar month on each device. The calendar-month allowance is separate from the fiscal month you choose for budgets. Setting your budgeting month to start on the 25th does not move the allowance reset to the 25th.

After the allowance is used, waiting SMS entries stay outside your totals until saved. You can review and save them individually for free, or use Pro for unlimited automatic SMS imports. Manual ledger entries remain unlimited. A refused or unreadable message is not the same as a successfully saved import. Check the setup screen's activity log to understand what a particular run did.

## Privacy and the limits of the workflow

You control the automation, and deleting it in Shortcuts ends that route into the app. The raw message text is read on your device and is not saved as part of your ledger. TrackExpenses keeps the extracted transaction and a local activity record; its privacy page describes the short-lived duplicate fingerprint and purchase services separately.

Shortcuts may show its own automation notification even when Show When Run is off. That does not mean the app is requesting access to your inbox. If nothing arrives, check the filter, automation status, Shortcut Input connection and activity log before changing parsing settings. See the [SMS troubleshooting guide](sms-automation-not-working.html) for a structured check.

## Frequently asked questions

Can TrackExpenses read all my old messages? No. It receives the individual text you paste or the message passed by your configured Shortcuts automation.

Does every bank alert work? No. Formats vary; test your own bank's message and review the result before relying on it.

Is a bank login required? No. TrackExpenses does not connect to your bank or ask for banking credentials.

Sources: [Apple's Message event triggers](https://support.apple.com/guide/shortcuts/event-triggers-apd932ff833f/ios), the app's SMS setup guide and the [privacy policy](../privacy.html).
