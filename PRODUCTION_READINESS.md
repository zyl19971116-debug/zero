# Production readiness

Overall status: **PARTIALLY COMPLETE**.

Code and deployment artifacts are prepared. Acceptance remains blocked on Railway authorization, a Git remote, provisioned PostgreSQL and Redis, AI credentials, S3 credentials, production migrations, provider verification, cross-site session validation, and full E2E/visual regression testing.

Release only after `/ready` succeeds, migrations and seed are confirmed, the worker consumes a real job, a permanent WebP is retrievable, wallet logout revokes the session, and repeated expedition requests cannot create duplicate relics.
