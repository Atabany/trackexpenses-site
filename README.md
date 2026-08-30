# trackexpenses-site

The public pages for **TrackExpenses: Money Manager**, an iPhone money manager.

- `privacy.html` — App Store Connect *Privacy Policy URL*
- `support.html` — App Store Connect *Support URL*
- `index.html` — App Store Connect *Marketing URL*

Terms of Use is Apple's Standard EULA
(<https://www.apple.com/legal/internet-services/itunes/dev/stdeula/>), which is what applies
when a developer supplies no custom terms. It is linked from `index.html` and from the app's
paywall rather than duplicated here.

These files are **generated**, not hand-edited. The source of the privacy policy is
`docs/PRIVACY_POLICY.md` in the app repo; run `python3 tools/build_site.py <this-dir>` there
and commit the result, so the hosted copy can never drift from the one shipped in the app.

No cookies, no analytics, no external requests.
