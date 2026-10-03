# Verification and second security review

Date: 2026-10-03. This records local source/fixture verification before PR publication; check the PR's live CI status separately. No merge or deployment occurred.

## Changes

Adds constrained CSP (including the existing structured-data hash and Google Fonts hosts), no-referrer and read-only history secret scanning/security documentation.

## Validation

Browser JavaScript syntax passes; Chromium renders the portfolio with no JavaScript/CSP error and the structured-data hash intact. No build/package suite exists.

No dependency upgrade required: no dependency manifest/runtime package graph in tracked source.

## CI activation pending repository authorization

The complete security workflow is prepared at [security-workflow.yml](security-workflow.yml), but is not active. GitHub rejected the local OAuth credential because it lacks the workflow scope; the connected GitHub app also rejected creating this public repository's workflow with HTTP 403. No account scope was broadened. A maintainer with workflow write permission can add the exact reviewed file as .github/workflows/security.yml on this PR branch, then run/check it before merging. The template has no deployment or production-secret step. Dependabot configuration is included; it becomes effective after a reviewed merge into the default branch. Local security tests/scans passed; no successful GitHub Actions run is claimed.

## Second review

Reviewed the final diff for secret additions, authentication/authorization, input handling, database/API boundaries, permissions, logging/error exposure, dependency changes, AI tool execution and regression coverage. The relevant threats and controls are in SECURITY.md and the pre-change assessment. Browser apps remain browser apps; no client check is represented as server authorization. Missing backend/cloud configuration was not assumed safe. Tests use synthetic data and no production credentials. CI permissions are read-only, action commits/scanner digest pinned, checkout credentials not persisted, no pull_request_target/production secrets/deployment step. Only exact, manually reviewed historical test-key fingerprints are exempted where present.

## Remaining risks

Meta CSP cannot set frame-ancestors; HTTPS/nosniff/framing policy requires host control. Native GitHub secret scanning and push protection were enabled on 2026-10-03 and independently read back as enabled. The alert listing returned no alerts at that time. No paid features or OAuth scope expansion were performed. Security Actions still require workflow write permission.

The assessment is not a penetration test of running services, a complete formal proof, or a production security certification. Git scans cover fetched reachable refs, not deleted/unavailable history. No live secret was confirmed; never interpret a clean scan as proof of absence.
