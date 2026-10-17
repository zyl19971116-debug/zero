# E2E test report

Status: **blocked before production integration**.

Passed locally:

- Prisma schema generation.
- TypeScript type checking.
- Rarity boundary and exact distribution tests.
- Frontend JavaScript syntax validation.

Not executed as real integrations:

- Railway PostgreSQL migrations and persistence.
- Railway Redis connectivity, stalled recovery, and restart behavior.
- Real SIWE browser signing.
- Real AI text/image provider calls.
- Real S3 upload and retrieval.
- Full expedition, collection, archive, and leaderboard flow.
- Desktop/mobile Playwright visual regression.

Mocked or static checks must not be interpreted as real provider verification.
