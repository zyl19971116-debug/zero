# Security report

## Implemented

- Exact-origin credentialed CORS and Origin checks on mutating routes.
- HTTP-only, Secure, revocable sessions with expiry.
- SIWE nonce hashing, expiry, single consumption, domain and chain validation.
- Request/body limits and route rate limits.
- Prisma parameterization and transactional ownership changes.
- Redaction for cookies, authorization headers, and signatures.
- Server-owned rarity and ownership.
- Image size/dimension validation and immutable storage keys.
- No credentials in source or frontend.

## Dependency audit

The production audit reports high-severity advisories through `prisma -> @prisma/config -> deepmerge-ts` (`GHSA-ggr8-5vv4-36mx`). The available automated resolution upgrades Prisma across a major version. It was not force-applied because schema configuration, generated client behavior, migrations, and deployment must be retested together. Runtime application exposure is limited: the affected path is the Prisma CLI/configuration tool used during build and migration, not request parsing. It remains a production-readiness blocker for the build pipeline.

## Remaining review

- Same-site domain/proxy design for reliable wallet sessions.
- CSP and provider egress allowlist.
- AI token/cost accounting once the provider exposes usage metadata.
- Independent penetration review and key rotation policy.
