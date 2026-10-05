# Export iPhone expenses to CSV

TrackExpenses exports the month you are viewing as CSV for free, so you can review your own records in Numbers or another spreadsheet. Pro adds exports for a chosen date range, CSV import and full JSON backup and restore through More → Backup & Export.

## Use a spreadsheet when that is enough

If your records already live in Numbers, keep the original spreadsheet and export a copy when another tool needs CSV. CSV is a plain-text table: it transfers rows and values, but it does not preserve every formula, chart, formatting choice or relationship in a workbook.

An expense app is useful when it collects the entries, accounts and categories you want to analyze. The spreadsheet then becomes a place for a particular review rather than the only place where the ledger exists. Choose the format based on the job: CSV for a table you want to inspect or calculate with; a full app backup when you need the app's records and identities restored later.

## Choose the period before exporting

In TrackExpenses, open the Transactions screen and browse to the month you want. Check the visible period boundaries before using its CSV export. If your month starts on payday, the selected window follows that setting rather than automatically becoming the first through the last calendar day.

For example, a month starting on the 25th can include purchases from the last week of one calendar month and the first weeks of the next. Those rows belong together if they were funded by the same monthly payday. Give the exported file a name that includes its actual dates so that a later spreadsheet review does not misinterpret the window.

Single-month export stays free. For a custom date range, open More → Backup & Export with Pro and choose the period there. Do not pay merely because you need a copy of the selected month's records; the app keeps that ordinary route available in the free ledger.

## Save the file somewhere you control

Choose a destination through the share or file interface. A local location can keep the copy on your device, while a cloud-storage location follows that storage provider's rules. TrackExpenses does not upload the export to a developer server, but selecting a cloud destination is still your choice to put a copy there.

Treat a ledger export as a record of your spending. Merchant names, amounts, notes and account labels can reveal more than a monthly total. If you send a copy to someone, inspect the columns first and remove information they do not need. The filename alone is not protection, and a link to a cloud folder may grant access beyond the one file you intended.

## Open and check the CSV in Numbers

Open the saved CSV with Numbers or the spreadsheet program you use. Check several rows against the app before trusting a new sum. Look for the same amounts, dates, currency and direction. A spreadsheet can misread a date or decimal separator according to its region settings even when the file itself is consistent.

Keep descriptions and notes separate if they are both present. A payee or merchant is not always the same thing as a memo. If the sheet imports everything into one column, inspect its delimiter settings instead of manually splitting hundreds of rows. Quoted text can contain punctuation that a naive split would treat as another column.

Do not edit your only copy while investigating an import problem. Keep the original export and make a working copy for formulas, sorting and formatting. That lets you distinguish an app value from a later spreadsheet transformation when a total does not reconcile.

## Calculate spending without counting transfers twice

Filter by transaction kind before summing expenses. Income increases money available, while a transfer changes where your own money is held. Adding every amount column without understanding those types can make card settlements and cash withdrawals look like additional purchases.

For a simple check, take three example expenses of 15, 40 and 120 in the same currency. The total should be 175. A transfer of 500 between your own accounts should not make it 675. Once that small check behaves correctly, review the complete period. For foreign-currency transactions, know whether you are summing source amounts or converted main-currency amounts; mixing currencies is not a meaningful total.

A spreadsheet can answer a narrow question well. For example, group by category to inspect a change, or filter a merchant to find repeated subscriptions. State the filter and period next to the result so a chart still makes sense when you return to it later.

## Know what CSV cannot restore

CSV is useful for portable tables, but it is not the same as a full TrackExpenses backup. A backup preserves the app's broader record structure and identities; a table does not necessarily carry everything required to rebuild accounts, budgets, settings or attachments.

With Pro, More → Backup & Export can write a full JSON backup and restore it. Keep that file separately from your analysis sheet, and read the restore screen before proceeding: restoring a ledger has a different purpose from adding some CSV rows. For a normal analysis, you do not need to restore or replace anything in the app.

## Importing an older CSV is a separate task

Pro CSV import previews what a selected file would add before saving. Map its columns and inspect the dates, directions, accounts and categories. Different apps can use similar column names for different meanings, so a plausible label is not proof that the mapping is correct.

Do not assume that importing an export will update existing transactions. TrackExpenses' CSV importer adds rows rather than merging them by an identity the file may not have. Review the preview and duplicate handling before confirming. This website does not promise compatibility with every bank or expense app's export format.

## Frequently asked questions

Is monthly CSV export free? Yes. Export the month you are viewing from Transactions.

Does CSV include the entire app backup? No. Use the Pro JSON backup route for a full ledger backup.

Does exporting erase my data? No. It creates a file copy of the selected records.

Source: TrackExpenses' export/import services, free-tier rules and [privacy policy](../privacy.html). See [payday periods](payday-budget.html) if the selected month has unexpected boundaries.
