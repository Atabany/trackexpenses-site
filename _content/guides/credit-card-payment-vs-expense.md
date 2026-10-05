# Credit card payment or expense? How to avoid counting it twice

Paying your credit card bill is not new spending: the spending happened when you used the card. Record each card purchase as an expense on a card account, and record the monthly payment as a transfer from your bank account to that card, so every purchase is counted exactly once.

## Why the bill gets counted twice

A typical month looks like this. You buy groceries for 300 and fuel for 150 on the card. Your card statement then asks for 450, and you pay it from your bank account. If you write down the two purchases and also write down "Credit card payment 450" as an expense, your tracker says you spent 900. You spent 450.

The mistake is easy to make because the bill payment looks like an expense from your bank's point of view: money left the current account. It did leave, but it went to settle a debt you had already recorded. The same pattern appears with cash: withdrawing 200 from an ATM is not spending, and buying lunch with that cash is.

Bank text alerts make it more likely. Many banks send one alert for each card purchase and another when the card bill is paid. If every alert becomes an expense, the payment alert doubles the month.

## The method that works in any app or spreadsheet

You need two things: a place where the card's balance lives, and a way to record money moving between your own accounts.

1. Create an account for the card. Its balance is what you owe, so it behaves like a liability rather than savings.
2. Record each purchase on the card as an expense from that card account. Category, payee and date belong to the purchase, which is where the spending story is.
3. When you pay the card, record a transfer from your bank account to the card account. The bank balance goes down, the amount owed goes down, and your spending total does not change.
4. Check the card's balance against your statement once a month. If they disagree, look for a missing purchase, a refund or a fee.

In a spreadsheet, this means a column for the account and a row type for transfers that your spending formula ignores. If your formula sums every negative number, it will count the payment. Filter transfers out explicitly.

## Doing it in TrackExpenses

TrackExpenses has account types for cash, bank, card, savings, investment and loan. Add your card under the Accounts tab with the plus button; a card that carries a debt shows in Liabilities, and the header's Assets, Liabilities and Total always reconcile.

When you add an entry, choose Expense for purchases and pick the card as the account. For the monthly payment, choose Transfer at the top of the entry sheet, with your bank account as the source and the card as the destination. Transfers appear in your lists but are not counted in expense totals or budgets.

If your bank texts you for every purchase, the [bank SMS guide](bank-sms-iphone.html) explains the automation, and the [accounts feature page](../features/accounts-and-transfers.html) shows the screens.

Voice entry follows the same rule. With Pro, saying "paid off the credit card 450 from main bank" is read as a transfer to the card rather than a purchase, because the money went to one of your own accounts.

## What bank SMS imports do with card payments

If you use the bank SMS automation, TrackExpenses looks at the shape of each alert as well as its amount. An alert that settles a card bill, a cash withdrawal at an ATM or a cash deposit is recognised as money moving between your own accounts. It becomes a transfer when both ends are clear: the card mentioned in the message matches a card account you have, and the bank side is unambiguous. If either end is uncertain, it stays an ordinary entry and is flagged for review rather than guessed.

That caution is deliberate. A transfer guessed between the wrong accounts changes two balances without anyone noticing. A flagged entry costs you one tap to correct. To help the matching, add the card's last four digits to the card account, or use "File under…" on the review sheet once; later alerts for the same card are linked automatically.

## Refunds, fees and interest

Not everything on a card statement is a transfer.

- A refund for something you returned is money coming back for a purchase. Record it as income on the card account, or delete the original purchase if you prefer the month to show only what you kept.
- Interest and late fees are real costs. Record them as expenses, typically under Bills or a Fees category.
- Annual card fees are expenses too. A recurring rule set to every year keeps them from being forgotten.
- Cashback is income, usually small. Record it when it is credited, not when it is promised.

## Paying in instalments

Some cards let you split a large purchase into monthly instalments. Record the purchase once, at its full amount, on the date you made it; that is when you decided to spend. Then record each monthly instalment payment as a transfer from your bank to the card, exactly like a normal bill. Your spending for the month of the purchase will be high, which is accurate. If you would rather spread the cost across months for budgeting, keep the purchase as one entry but set a budget that expects it, instead of inventing several smaller expenses.

## A five-minute monthly check

Once a month, after paying the card:

1. Open the card account and compare its balance with the statement.
2. Search for the payment and confirm it is a transfer, not an expense.
3. Look for duplicate purchases. Imported alerts with the same amount and payee within two days are flagged as possible duplicates in TrackExpenses, because a card authorisation and its later settlement can arrive as two different messages.
4. Glance at Stats to make sure the month's spending looks like the purchases you remember.

## Frequently asked questions

Is a credit card payment an expense? No. The purchases you made with the card are the expenses. Paying the bill moves money from your bank account to the card, so record it as a transfer.

Should I record purchases when I buy or when I pay the bill? When you buy. The purchase date is when the spending happened, and it keeps your categories and payday periods accurate.

How do I record an ATM withdrawal? As a transfer from your bank account to a cash account. Spending the cash is then recorded as expenses from the cash account.

Does TrackExpenses turn card bill alerts into transfers automatically? When the alert clearly describes a card payment and both accounts can be matched. Otherwise the entry is kept and flagged for you to review.

Source: TrackExpenses account, transfer and bank-message transfer resolution rules, checked against the app's code in October 2026. Figures are examples, not financial advice.
