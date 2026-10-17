# Backend deployment

The static Site and API are separate deployables. Deploy `services/api` to a Node.js 22+ host with PostgreSQL and Redis. Run `npm ci`, `npm run db:generate`, `npm run db:migrate`, `npm run db:seed`, then start the API and worker as separate processes. Configure every variable from `.env.production.example` in the host secret manager.

Set `window.RELIC_ZERO_API_BASE` in the static client before `app.js` to the HTTPS API origin. Allow the Site origin in CORS. Cookies require HTTPS and `SameSite=None`; the API must not share session cookies with unrelated services.

The image worker intentionally remains FAILED until an image provider and durable S3-compatible object store are configured. Provider URLs must be copied into durable storage before setting `imageStatus=COMPLETED`.

Production blockers: managed PostgreSQL, Redis, durable object storage, AI credentials/model verification, API/worker host, chain allowlist review, SIWE security review, full integration test environment, and observability.
