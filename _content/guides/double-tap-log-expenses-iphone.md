# Log an Expense by Double Tapping the Back of Your iPhone

You can log a purchase without opening any app: tap the back of your iPhone twice, type the price, pick the category, and it is saved. It runs on iOS's own Back Tap setting and one shortcut from TrackExpenses, and takes about a minute to set up once.

{{DOUBLE_TAP_FILM}}

## What you need

- An iPhone 8 or later on iOS 14 or later. Back Tap is an iPhone setting; iPad has no such option.
- TrackExpenses installed and opened once, so its "Log an Expense" action exists in Shortcuts.
- The ready-made "Log Expense" shortcut (step 1 below). Back Tap can only run shortcuts that are in your own Shortcuts library, which is why the app hands you one rather than adding itself to Back Tap.

Nothing here connects to your bank, and the shortcut sends nothing anywhere: it asks three questions and saves the answer in your ledger on the iPhone.

## Step 1: Add the Log Expense shortcut

Open this link on your iPhone: [Get the Log Expense shortcut](https://www.icloud.com/shortcuts/b047202d93bf4eb6b60ccdaa25c84b2c). Shortcuts opens and shows "Log Expense" with one action, Log an Expense in TrackExpenses. Tap Add Shortcut. It now sits in the Shortcuts app's library under that name; keep the name as it is, because Back Tap lists shortcuts by name.

The action asks three things each time it runs: the amount, the category, and a description you can leave empty. You can open the shortcut to look at it, but you don't need to change anything.

## Step 2: Turn on Back Tap

Open the Settings app and follow this path: Settings › Accessibility › Touch › Back Tap › Double Tap, then scroll to the Shortcuts section and choose Log Expense. A check appears next to it.

{{BACKTAP_STEPS}}

Touch is in the Physical and Motor group of Accessibility, and Back Tap is near the bottom of the Touch screen. Apple offers apps no link that opens this screen directly, so it takes these few taps once. If you would rather keep Double Tap for something else, choose Triple Tap instead and pick Log Expense there.

## Step 3: Try it

Double tap the back of the iPhone, near the camera, with a fingertip. The first time, iOS asks whether "Log Expense" may run actions from TrackExpenses: tap Allow. Then type a price on the number pad, tap Done, pick a category, add a description such as the shop's name or leave it empty, and tap Done again. Shortcuts confirms what was logged, and the entry is in your ledger the next time you look, with today's date and your default account.

## A worked example

You are paying for groceries at the till with your phone in your hand. Before you put it away, you tap its back twice. The number pad appears over whatever app was open: you type 23 and tap Done, choose Groceries, type Carrefour and tap Done. That is the whole entry. Back in TrackExpenses that evening, Carrefour · Groceries · 23 is in today's list, it counts against your Groceries budget, and your daily budget for tomorrow already accounts for it.

## Limits and common mistakes

Back Tap needs a firm, quick double tap on the back of the phone. A thick case can make it miss; tap a little harder or nearer the camera. It may also fire by accident when you put the phone down on a hard surface; if that happens, cancel the number pad.

The shortcut logs expenses only. Income, transfers between your own accounts, a foreign currency or a split purchase need the app, where the entry sheet has every field.

The entry uses your default account. If you pay from several cards, change the account in the app afterwards, or use voice entry in the app ("lunch 30 with the credit card") when the account matters.

If nothing happens when you double tap, check three things: the shortcut is still called Log Expense in the Shortcuts app, Settings › Accessibility › Touch › Back Tap › Double Tap shows a check next to it, and you tapped Allow the first time. If you renamed or deleted the shortcut, add it again from the link above and choose it again in Back Tap.

## Other ways to log without typing

Double tap is the fastest way to log something you just paid for in cash or on a card that sends no alert. For card purchases, the automatic routes need no tap at all: [bank SMS alerts](bank-sms-iphone.html) and [bank alerts by email](bank-email-alerts-iphone.html) can log themselves through a Shortcuts automation, and [Apple Pay purchases](apple-pay-expenses.html) can too, through the Wallet Transaction trigger. For several purchases at once, [voice entry](voice-expenses-iphone.html) takes a whole list in one sentence. [Siri and widgets](log-expenses-with-siri.html) cover the rest.

## Frequently asked questions

Is Double Tap to Log free? Yes. Back Tap is part of iOS, the shortcut is free, and expenses logged through it count like any other entry in the free ledger.

Does it work when the iPhone is locked? Back Tap works with the screen on. On a locked iPhone, iOS may ask you to unlock it before the shortcut runs, depending on your settings. The confirmation never shows a balance.

Can I use Triple Tap instead? Yes. Choose Triple Tap in step 2 and pick Log Expense there. Both can be set to different shortcuts.

Why do I need a shortcut at all? Back Tap only offers the shortcuts in your own library, not the actions apps provide. The Log Expense shortcut is one TrackExpenses action, Log an Expense, with its three questions set to be asked each time.

Read next: the [Siri, widgets and Shortcuts guide](log-expenses-with-siri.html) and the [widgets and shortcuts feature page](../features/widgets-and-shortcuts.html).

Source: Apple's iPhone User Guide (Back Tap, under Accessibility › Touch), the TrackExpenses app code (the Log an Expense action and the shared Log Expense shortcut, November 2026). Figures are examples, not financial advice.
