# Track Apple Pay purchases with an iPhone automation

A supported Shortcuts Transaction automation can pass an Apple Pay purchase's amount, merchant and card name to TrackExpenses. Configure it yourself, verify the inputs and review the resulting entry; it is a separate route from bank SMS and does not connect the app to your bank.

## Start with Wallet's own record

For an occasional purchase, check the relevant card in Wallet and record the amount manually in your ledger. The information available there depends on the card issuer and transaction. This gives you a built-in place to compare a recent purchase without claiming that Wallet is a complete budget or an export of every expense.

Shortcuts adds an optional automation route for supported Wallet transactions. Apple's event-trigger documentation describes the Transaction trigger and choosing supported cards. Availability can depend on the device, system and card. If you do not see the trigger or your card, do not assume an expense app can create it on your behalf.

## Decide whether automation helps your ledger

An Apple Pay trigger covers a particular payment route, not all of your spending. Cash, a physical card purchase, a bank transfer or a subscription may arrive differently or need manual entry. Choose automation to reduce repetition for supported purchases while keeping those other routes in mind.

Before setting it up, check whether you already import a bank SMS for the same card. One Apple Pay purchase can produce both a Wallet event and a bank text. Two automatic routes may attempt to describe one financial event. You can use both with review, but you should understand the overlap and compare duplicate flags before trusting totals.

## Create the Transaction automation

Use the Apple Pay setup section in TrackExpenses' More → SMS Auto-Import guide. In Shortcuts, open Automation and create a Transaction automation if it is available. Choose the relevant card or cards and the run behavior offered by your system. Add TrackExpenses' Wallet-purchase import action through the action editor.

Connect the transaction values to the action's amount, merchant and card-name inputs as the guide shows. The input is the event data produced by Shortcuts; typing an example amount into the action would reuse that example rather than recording each new purchase's real value. Inspect the connected variables before saving the automation.

Use the guide on your own device because automation editor layouts and available event inputs can differ by iOS version. A simulator cannot reproduce a real card purchase event. Treat a new purchase on your chosen card as the full test, and compare the entry against the receipt or issuer record.

## Check the account mapping

TrackExpenses can use the card name passed by Shortcuts as an account hint. Give your tracked account a recognizable name and check which account the first imported purchase reaches. If two accounts could match the same hint, review the result rather than assuming the correct one will be chosen.

The card you paid with is not the same as the bank account you later use to settle its bill. Record the purchase as spending and the settlement as a transfer between your tracked accounts when appropriate. An account mapping that sends all card spending to your cash account may leave the category total looking plausible while making account balances wrong.

## Review amount, date and category

Open the recent imports or review screen after the first real event. Compare its amount and merchant with the purchase. Check the date and currency as well, especially if you are traveling or a merchant charged a foreign amount. Do not infer an exchange rate just from the shop's country.

Review the category suggestion. A merchant you have used before may help the app reuse a category, but the same shop can sell different kinds of things. A supermarket pharmacy purchase and a grocery purchase do not have to share a category simply because the payee is identical. Adjust the record when the budget you maintain calls for that distinction.

A pending or parked entry is deliberately outside totals until completed. If an entry needs a rate or another choice, finish it before adding a manual copy. Otherwise your troubleshooting step can become the duplicate you were trying to avoid.

## Handle duplicate routes carefully

If the bank SMS and Wallet event both produce a row, compare the amount, payee, card and timing with the original purchase. Similar rows can describe an authorization and settlement, but they can also be two genuinely separate purchases. The duplicate flag helps you inspect; it cannot decide what happened in your life.

Remove an extra row only after identifying which record you want to keep. Then decide whether both automations are worth maintaining. Using Wallet for the card you pay with frequently and SMS for other supported bank alerts can be simpler than two overlapping imports for every payment, but your bank's formats and your preferred review routine determine the practical choice.

## Keep expectations and privacy clear

This workflow passes selected purchase information into a local ledger. It does not grant TrackExpenses access to your Apple Account, complete Wallet history or banking credentials. The raw bank-message rules and free SMS allowance describe the SMS route specifically; do not treat them as documentation of every Shortcuts event.

TrackExpenses keeps the transaction information you save. Optional private iCloud sync and Apple/RevenueCat purchase services are described separately in its [privacy policy](../privacy.html). Deleting or disabling the Transaction automation ends this automatic route, while existing ledger records remain yours to edit, export or delete.

## Frequently asked questions

Does it capture every card payment? No. It uses supported Transaction events on cards selected in your automation.

Can one purchase also arrive by SMS? Yes. Review overlapping routes for duplicates.

Can the app connect the card to my bank automatically? No. TrackExpenses does not use a bank login or account aggregator.

Sources: [Apple's Transaction event trigger](https://support.apple.com/guide/shortcuts/event-triggers-apd932ff833f/ios) and TrackExpenses' automation guide. See [SMS setup](bank-sms-iphone.html) for bank texts and [exporting records](export-expenses-csv.html) for a spreadsheet review.
