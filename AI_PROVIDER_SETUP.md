# AI provider setup

The client expects OpenAI-compatible `/chat/completions` with JSON-object output and `/images/generations` returning `b64_json` or a temporary URL. Verify those contracts against the selected provider before setting secrets.

Configure `AI_API_KEY`, `AI_BASE_URL`, `AI_TEXT_MODEL`, and `AI_IMAGE_MODEL` only on the worker. A real verification requires one controlled expedition and one analysis, inspection of the persisted Zod-validated result, and confirmation that unavailable providers create FAILED states instead of substitute lore.

Provider calls have timeouts and bounded retries. Authoritative rarity, ownership, expedition ID, and civilization remain server-controlled.
