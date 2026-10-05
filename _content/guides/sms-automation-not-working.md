# Fix an iPhone bank SMS automation that is not importing

If a bank SMS is not reaching TrackExpenses, check the Shortcuts trigger and its Shortcut Input connection before assuming the app cannot read the format. Then use More → SMS Auto-Import to inspect the activity log, message check and free monthly allowance.

## Find out which step failed

An automatic import is a chain: a message arrives, the filter matches, Shortcuts runs the action, the action receives text, the reader recognizes a transaction, and the ledger saves or parks the result. The absence of a new row does not tell you which link failed. Work through those links in order and keep the original transaction amount nearby so you can compare the eventual result.

Do not create several overlapping automations to troubleshoot a single one. Two automations matching the same alert make the activity harder to understand and can produce duplicate attempts. Keep one narrowly filtered automation, inspect it, and use the app's manual paste path when you need to record a purchase immediately.

## Check the built-in Message conditions

Open Shortcuts → Automation and open the relevant Message automation. Compare its Sender and Message Contains conditions with an actual bank alert. Apple states that if both are selected, both must be satisfied. A correct sender combined with a phrase absent from the message will not trigger.

Banks can vary their sender between debit cards, credit cards, income alerts or marketing. The app recommends considering the currency code because it commonly appears in transaction messages, but that is a suggestion to verify against your own alerts. A personal text can contain the same currency code. A filter that is broad enough to catch everything is also broad enough to pass things you never intended to import.

Check whether the automation is enabled and whether it is set to Run Immediately when that choice is available. If you chose a confirmation mode, an unanswered notification can explain the missing run. Shortcuts can show its own banner even for an automation configured to run immediately; that banner is separate from an input dialog opened by an action.

## Inspect the action's Message field

Open the automation's action editor and find the TrackExpenses bank-message import action. Its Message field must contain Shortcut Input. An empty placeholder is not a connection, even if the action's name sounds like it should import the current message automatically.

Tap the field and select Shortcut Input. Also switch off Show When Run. If every bank alert brings up a text box asking for a message, you have strong evidence that the action is receiving no input or presenting its own interface. Fix that connection rather than typing the alert manually into a new dialog each time.

A test run from the editor may not have the incoming Message trigger's input. That means pressing the editor's play control is not a complete test of the real route. Inspect the setup, then use a genuine future bank alert as the end-to-end check. You can test parsing separately by pasting a message inside TrackExpenses.

## Read the app's activity evidence

Open More → SMS Auto-Import and inspect the recent activity. If there is no event at the expected time, the trigger or action connection is the first place to look. If an event says text was missing, return to the Message field. If the event reports a refusal, the reader received something and made a decision about it.

Look for an entry waiting for review as well as a saved transaction. The reader may recognize an amount but need an account choice or a foreign-currency conversion rate. A parked item is not lost, and it is deliberately outside totals until completed. Review that state before entering a second manual copy of the purchase.

The activity log records an outcome and transaction details, not the raw message. Keep your own original alert available while diagnosing it. Do not expect the app to reconstruct a complete text from its ledger or to open your Messages inbox for you.

## Test whether the format is understood

Use the setup screen's message check with an alert you copy yourself. Confirm that the reported amount is the purchase, rather than a balance, fee, date or masked card number. An alert containing an amount is not automatically a purchase: a one-time code, declined payment or bill reminder should not become spending.

Automatic reading uses stricter checks than an attended paste because you are not watching a draft appear. A message that can fill a manual draft may still be refused unattended. That is a reason to review the wording and enter the transaction yourself, not to remove guards around ambiguous financial events. No reader supports every bank's formats.

If the currency is foreign to your main ledger, supply the real conversion rate when the app asks for it. Saving an unsupported format manually is often faster than repeatedly altering the automation while a real transaction remains unrecorded.

## Check the allowance and duplicates

Free automatic bank SMS import allows 20 successful imports per calendar month on each device. The allowance does not follow your payday budget month. Once used, later SMS entries wait outside totals; review and save individually for free, or use Pro for automatic imports beyond that allowance.

A duplicate flag is a prompt to compare records. Banks may send both authorization and settlement messages, and SMS and Wallet automations can overlap for one purchase. Before removing or adding anything, check whether the original amount is already present under another date, account or payee. The ledger should describe one financial event once.

## Ask for focused support

If the setup still fails, contact support with your device, iOS version, app version and the activity outcome. Describe which step you checked. If a sample message is necessary, redact identifying details and never include a one-time password, banking credentials or a full account statement. A small format example is more useful than a whole ledger.

## Frequently asked questions

Why is there an input dialog for every alert? Check that Message is connected to Shortcut Input and Show When Run is off.

Why does paste work while automation refuses? Attended drafts and unattended imports use different safety checks.

Can I record the purchase without fixing automation first? Yes. Manual entries remain unlimited and free.

Sources: [Apple's Message event conditions](https://support.apple.com/guide/shortcuts/event-triggers-apd932ff833f/ios) and the app's SMS setup guide. For a complete setup, see [automatic SMS tracking](bank-sms-iphone.html).
