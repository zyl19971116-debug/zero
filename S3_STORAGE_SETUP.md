# S3-compatible storage setup

Create a private-write bucket and write-scoped API credentials. Configure the seven `S3_*` variables in Railway only. Public reads should use a CDN/custom domain or signed-read design; never enable public writes.

Generated PNG/JPEG images are decoded, size-limited, dimension-checked, and uploaded as immutable `relics/{relicId}/{version}.{ext}` objects. Upload uses `If-None-Match: *` for duplicate protection. Configure bucket CORS to allow `GET` and `HEAD` from the frontend origin only where required.
