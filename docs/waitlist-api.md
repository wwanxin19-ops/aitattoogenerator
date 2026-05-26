# Waitlist API Contract

## Decision

Data lands in **Supabase Postgres** table `public.waitlist_signups`.

Reason: this frontend is already a Next.js App Router app, and Supabase can be used from the server route through the REST API with no extra npm dependency. The browser never receives Supabase keys.

Run `docs/supabase-waitlist.sql` once in Supabase SQL Editor before enabling the API.

## Endpoint

`POST /api/waitlist`

## Request payload

```json
{
  "email": "user@example.com",
  "source": "pro"
}
```

Fields:
- `email`: string, required, normalized to lowercase before insert
- `source`: required enum, `pro` or `studio`

Server-captured fields:
- `created_at`: Supabase default `now()` in UTC
- `ip`: from `cf-connecting-ip`, `x-real-ip`, or `x-forwarded-for`
- `user_agent`: from request `user-agent`, truncated to 512 chars

## Success response

HTTP `201`

```json
{
  "success": true,
  "data": {
    "email": "user@example.com",
    "source": "pro",
    "created_at": "2026-05-26T01:30:00.000000+00:00"
  }
}
```

## Error response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_EMAIL",
    "message": "Please enter a valid email address."
  }
}
```

## Error codes

- `INVALID_JSON`: HTTP `400`, body is not valid JSON
- `INVALID_EMAIL`: HTTP `400`, email is missing or invalid
- `INVALID_SOURCE`: HTTP `400`, source is not `pro` or `studio`
- `RATE_LIMITED`: HTTP `429`, same IP exceeded hourly limit
- `ALREADY_JOINED`: HTTP `409`, same email already joined the same source waitlist
- `CONFIG_ERROR`: HTTP `500`, missing Supabase environment variables
- `SERVER_ERROR`: HTTP `500`, unexpected backend/storage failure

## Environment variables

Required:

```bash
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Optional:

```bash
WAITLIST_RATE_LIMIT_PER_HOUR=5
```

Security notes:
- `SUPABASE_SERVICE_ROLE_KEY` is server-only. Do not prefix with `NEXT_PUBLIC_`.
- Do not call Supabase directly from the frontend for this feature.
- RLS is enabled in SQL; no anon policies are created.

## Frontend integration example

```ts
const response = await fetch("/api/waitlist", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, source: type })
});

const result = await response.json();

if (!response.ok || !result.success) {
  throw new Error(result.error?.message ?? "Unable to join waitlist.");
}
```

`components/EmailModal.tsx` should pass the current modal `type` as `source`:
- Pro CTA -> `{ source: "pro" }`
- Studio CTA -> `{ source: "studio" }`

## Local test

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
WAITLIST_RATE_LIMIT_PER_HOUR=5
```

3. Run the migration in Supabase SQL Editor:

```sql
-- paste docs/supabase-waitlist.sql
```

4. Start Next.js:

```bash
npm run dev
```

5. Submit Pro waitlist:

```bash
curl -i http://localhost:3000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"test-pro@example.com","source":"pro"}'
```

6. Submit Studio waitlist:

```bash
curl -i http://localhost:3000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"test-studio@example.com","source":"studio"}'
```

7. Duplicate test:

```bash
curl -i http://localhost:3000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"test-pro@example.com","source":"pro"}'
```

Expected: HTTP `409`, `error.code = "ALREADY_JOINED"`.

8. Validation test:

```bash
curl -i http://localhost:3000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"bad-email","source":"pro"}'
```

Expected: HTTP `400`, `error.code = "INVALID_EMAIL"`.

## Online test

After deployment:

```bash
curl -i https://aitattoogenerator.cc/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"online-test@example.com","source":"pro"}'
```

Then verify in Supabase:

```sql
select email, source, created_at, ip, user_agent
from public.waitlist_signups
order by created_at desc
limit 20;
```
