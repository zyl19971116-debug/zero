# Railway deployment runbook

1. Sign in to Railway and create project `RELIC-ZERO-PRODUCTION`.
2. Connect the Git repository containing this branch. This local repository currently has no Git remote; push it to the repository you want Railway to build.
3. Add PostgreSQL and Redis services. Keep their public networking disabled.
4. Create service `relic-zero-api`, set its config path to `railway.api.toml`, and generate a public HTTPS domain.
5. Create service `relic-zero-worker`, set its config path to `railway.worker.toml`, and do not generate a public domain.
6. Set `DATABASE_URL` and `DIRECT_URL` from the PostgreSQL service reference and `REDIS_URL` from the Redis service reference for both services.
7. Set the remaining variables from `ENVIRONMENT_VARIABLES.md`; use Railway secrets and never repository files.
8. Confirm PostgreSQL backups and review `services/api/prisma/migrations` before deploying.
9. Deploy the API. Its pre-deploy command runs `prisma migrate deploy`, never reset or db push.
10. Run the static-world seed once with `npm --workspace services/api run db:seed` in a controlled Railway shell. It is idempotent and creates no users or discoveries.
11. Deploy the worker and verify `worker.ready` in its logs.
12. Confirm `/health` and `/ready`, then exercise a controlled expedition.
13. Put the API on a same-site subdomain where possible. Otherwise validate cross-site cookie behavior before setting `window.RELIC_ZERO_API_BASE`.

No Railway resource was created automatically because neither Railway authentication nor a repository connection is available locally.
