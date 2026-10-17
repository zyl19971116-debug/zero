# Railway production audit

Baseline: `1e85bf2aa01d7cb5b8bc356cf38665fc7f6e6226`

## Existing architecture

- Frontend: buildless static HTML/CSS/JS deployed on a private OpenAI Site.
- API: Fastify 5, entrypoint `services/api/src/server.ts`.
- Worker: BullMQ, entrypoint `services/api/src/worker.ts`.
- Persistence: Prisma 6 with PostgreSQL migrations.
- Queue: BullMQ and ioredis using `REDIS_URL`.
- AI: environment-configured OpenAI-compatible text and image endpoints.
- Storage: AWS SDK v3 against an S3-compatible endpoint.
- Authentication: SIWE plus a signed HTTP-only cookie. This phase adds database-backed revocable sessions and an Origin-based CSRF boundary.

## Gaps found

- No Railway CLI or authenticated Railway session exists on this machine.
- No Git remote is configured for a Railway-connected repository.
- No PostgreSQL, Redis, AI, or S3 credentials are available.
- No production migration has been applied.
- No API or worker process has been deployed.
- The static frontend does not yet have a real Railway API URL.
- Existing cookies are cross-site; this requires browser compatibility testing or a same-site custom domain/proxy before production acceptance.
- Prisma CLI advisories remain pending a coordinated major-version upgrade.

## Changes in this phase

Separate API and worker Dockerfiles, Railway service configuration, health/readiness probes, database-backed session revocation, CSRF origin enforcement, image validation/WebP conversion, immutable object keys, structured worker logs, stalled-job recovery, and graceful shutdown.
