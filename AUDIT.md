# RELIC ZERO Phase 4–6 Repository Audit

Date: 2026-10-17
Baseline: `b6fd1782bde5a9fedddc37c4fa7ab9733ecf5dc7`

## Findings

- Framework: buildless HTML/CSS/JavaScript. There was no `package.json`, component system, or server router.
- Routes: hash-addressed views in `dist/index.html`; all interaction code is in `dist/app.js`.
- Wallet: injected EIP-1193 connection only. A connected wallet was explicitly not treated as authenticated.
- Deployment: OpenAI Sites static hosting via `.openai/hosting.json` with `dist` as the published directory.
- Environment: no environment-variable contract existed.
- Database: no database driver, schema, migration, or persistent storage binding existed.
- AI: no configured provider or server-side invocation path existed.
- Background work: no durable queue or worker existed. Static Sites cannot execute background jobs.
- Existing UI: cinematic assets and homepage composition are independent static assets and CSS; they can be preserved unchanged.

## Architecture decision

The existing Site remains the presentation client. A separate Node.js/TypeScript API service is added under `services/api` for PostgreSQL, SIWE authentication, authorization, AI provider calls, object storage, and a Redis/BullMQ worker. The frontend discovers the API from `window.RELIC_ZERO_API_BASE`; when absent it preserves honest UNAVAILABLE states.

This service must be deployed to a runtime supporting long-lived workers and PostgreSQL/Redis connectivity. The static Site cannot truthfully be described as a complete production backend.
