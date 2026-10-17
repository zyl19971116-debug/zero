# Environment variables

| Variable | Services | Source |
|---|---|---|
| `DATABASE_URL`, `DIRECT_URL` | API, worker | Railway PostgreSQL reference |
| `REDIS_URL` | API, worker | Railway Redis reference |
| `SESSION_SECRET` | API | 32+ random bytes in Railway secrets |
| `APP_ORIGIN` | API | Exact frontend origin, no wildcard |
| `API_ORIGIN` | API | Railway API HTTPS origin |
| `ALLOWED_CHAIN_IDS` | API | Reviewed comma-separated chain IDs |
| `AI_API_KEY` | worker | Provider secret |
| `AI_BASE_URL` | worker | Verified provider API base |
| `AI_TEXT_MODEL` | worker | Verified structured-output model |
| `AI_IMAGE_MODEL` | worker | Verified image model |
| `S3_ENDPOINT`, `S3_REGION`, `S3_BUCKET` | worker | S3/R2 configuration |
| `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | worker | Write-scoped storage credentials |
| `S3_PUBLIC_BASE_URL` | worker | Public CDN/read origin |
| `PORT` | API | Supplied by Railway |

Never expose session, AI, database, Redis, or S3 secrets to the frontend.
