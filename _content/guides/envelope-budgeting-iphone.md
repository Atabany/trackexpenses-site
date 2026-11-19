# Envelope budgeting on iPhone without cash or bank sync

Envelope budgeting gives each kind of spending its own pot for the month, and when a pot is empty you either stop or move money in from another pot. On iPhone you can run it without cash or a bank connection: category budgets are the envelopes, and in TrackExpenses moving money between them for this month is free and leaves your total unchanged.

## How the envelope method works

The paper version is a set of envelopes filled with cash on payday: groceries, transport, eating out, household. You pay groceries only from the groceries envelope. When it is empty, you stop buying groceries or take money out of another envelope, and the envelope you took from now holds less.

Three rules make it work, and they survive without paper:

- Every envelope has an amount before the month starts.
- Spending comes out of one envelope, never out of the air.
- Moving money between envelopes never creates money; the total stays the same.

## Try it in Numbers first

A small Numbers table is enough to learn the method. Make one row per envelope with four columns: Envelope, Budget, Spent and Left, where Left is Budget minus Spent. To move money, lower one Budget and raise another by the same amount, so their sum is unchanged.

The weak point is the Spent column. Every purchase has to be found, added and typed into the right row by hand, and a table that is a week behind can't tell you whether eating out has room tonight.

## Set up envelopes in TrackExpenses

Open More → Budgets. The Total budget is everything you plan to spend in the period; each category budget is an envelope. Your budget month follows the start day in More → Period & Entry, so the envelopes refill on payday if you are paid on the 25th.

Whatever the categories don't claim becomes Everything else: total minus category budgets. It is the envelope for spending you don't plan by category, so nothing you spend falls outside the system.

A worked example: a total of 6,000, with Groceries 1,500, Transport 600, Eating out 800 and Household 1,200. Everything else is 6,000 − 4,100 = 1,900.

Stats → Budget then shows every envelope with what is spent and what is left, labelled, and a bar with a marker for where today falls in the period. The header says how many days are left. Budgets, the bars and moves are free.

## Move money when an envelope runs short

On the 18th, Eating out has reached 860 of its 800, while Groceries has 420 left. Here is the envelope move, done on the phone.

- On the Eating out line, tap its Cover button, or tap ••• and choose Move money in.
- In the Move money sheet, choose Groceries under From if it isn't chosen already. Cover it fills in exactly the overspend; you can type another amount.
- Tap Move.

Eating out now holds 860 and Groceries 1,440 for this month, and the total is still 6,000. Each line says how much moved in or out, so the change stays visible. Move money out works the other way round, from a budget with room into one that needs it, and you can take from Everything else too.

A move is for this period only: the sheet says "Just for this month. Next month starts from your usual budgets." If the change should last, edit the standing amount in More → Budgets instead. Undo all moves, under the lines, puts every budget back to its usual amount for the period.

Two guards keep the envelopes honest. Suggested amounts leave repeating bills still due in the source envelope covered: if Household still owes a 250 bill this month, All it can spare keeps 250 back. Type an amount that would take bill money and the sheet warns you before you move it.

Moves are offered for the current period, in the length your budget is kept in. The [budget planner page](../features/budget-planner.html) shows the screens.

## A daily amount for each envelope

With Pro, every envelope also shows a daily amount: what is left in it after its own repeating bills, shared across the days left, today included. Groceries with 900 left and 12 days to go reads 75.00 a day. An envelope that holds only bills, such as rent, shows no daily figure, because there is nothing in it to spend day by day. The [daily spending limit guide](daily-spending-limit.html) explains the arithmetic.

## Filling the envelopes without bank sync

Bank-synced budget apps download your transactions; this method doesn't need that. Each purchase reaches an envelope through its category: typed in a few seconds, said by voice ("groceries 86 at Carrefour"), or brought in from your bank's SMS or email alert by a Shortcuts automation. A shop you have used before fills in its usual category, so a Carrefour purchase lands in Groceries without a choice. The [track expenses guide](track-expenses-iphone.html) compares the routes.

The trade is a few seconds per purchase for a ledger that never asks for a bank password.

## What it doesn't do

Unspent money doesn't roll over. Each period starts from your usual budgets, so 200 left in Transport this month doesn't add 200 to next month's Transport. If you want it saved, move it to a savings account as a transfer.

Envelopes are expense budgets. Income isn't divided into envelopes here; to give every part of your pay a job before payday, see the [zero-based budget guide](zero-based-budget.html). There are no envelope groups or sub-envelopes either: a category is one envelope.

Envelopes are budgets, not accounts. Your money still sits in your bank and cash accounts; the envelopes say what it is for.

## Frequently asked questions

Can I do envelope budgeting without cash? Yes. Category budgets play the envelopes, and moving money between them for the current month keeps the total unchanged, the same way taking notes out of one envelope and putting them into another does.

Does unspent money carry over to next month? No. Every period starts from your usual budgets. Change the standing amounts in More → Budgets if a category needs more every month.

Is moving money between budgets free? Yes. Budgets, Move money, Cover and the spent and left amounts are free. The daily amount per envelope is part of Pro.

What happens to my moves next month? Nothing carries: the moves belong to the period you made them in, and the next period starts from your usual budgets. Past periods keep showing their moves.

Sources: TrackExpenses BudgetMoves, MoveBudgetSheet, BudgetStatsView and FreeTier, checked in November 2026. Amounts are examples, not financial advice.
