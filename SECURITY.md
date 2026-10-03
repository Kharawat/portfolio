# Security

## Architecture and boundaries
This is a static public portfolio with local navigation/filtering, public contact information and project links. No accounts, forms collecting data, API, database, stored user data, credentials or AI tools exist. GitHub-hosted source and linked external projects are separate trust boundaries; descriptions and links do not certify those projects' security.

CSP permits self-hosted scripts and the exact structured-data script hash. Existing Google Fonts hosts are allowed for fonts/styles; object embeds, base changes and form submissions are denied. Referrers are disabled, and external new-tab links use noreferrer. Fonts still contact Google. There are no package dependencies/build step; The prepared CI checks JavaScript syntax and scans fetched Git history for secrets.

Hosting must enforce HTTPS, nosniff and frame-ancestors because a meta CSP cannot set the latter. GitHub native secret scanning and push protection were enabled for this public repository on 2026-10-03 and verified by reading settings back. No account scopes, paid security features or site deployment were changed. An empty alert listing at inspection time is not proof that every historical secret has been found.

## Reporting and maintenance
Use GitHub private vulnerability reporting if enabled for this repository, or an already established private maintainer contact. If neither is available, open an issue asking for a private contact without publishing exploit details, customer data or credentials. Never paste a secret into an issue or pull request. Potential historical credentials must be treated as compromised, rotated by the owner and audited before any history rewrite; no rotation or rewrite is automatic.

See [pre-change assessment](docs/security/ASSESSMENT.md) and [verification/review](docs/security/VERIFICATION.md). Source review and offline tests are not production certification. The prepared security workflow (not yet active; see VERIFICATION.md) is read-only, pinned by commit, uses no production credentials and never deploys. Keep action pins and scanners current through reviewed maintenance PRs.
