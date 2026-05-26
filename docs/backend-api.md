# Leads, Mock Generate, and Events API Contract

## Decision

Data lands in **Supabase Postgres** for collection endpoints:

- `public.leads` for Pro / Studio email leads
- `public.analytics_events` for basic product analytics events

`POST /api/generate` is currently a **mock endpoint**. It validates generator input and returns a fake accepted response, but it does not call an AI provider and does not charge users.

Run `docs/supabase-leads-events.sql` once in Supabase SQL Editor before enabling `POST /api/leads` and `POST /api/events` in production.

Security notes:

- `SUPABASE_SERVICE_ROLE_KEY` is server-only. Do not prefix it with `NEXT_PUBLIC_`.
- The frontend must call these Next.js API routes, not Supabase directly.
- RLS is enabled. No anon insert/select policies are created.

## 1. Email Leads

### Endpoint

`POST /api/leads`

### Request payload

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

### Success response

HTTP `201`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "source": "pro",
    "created_at": "2026-05-26T06:20:16.117448+00:00"
  }
}
```

### Error codes

- `INVALID_JSON`: HTTP `400`, body is not valid JSON
- `INVALID_EMAIL`: HTTP `400`, email is missing or invalid
- `INVALID_SOURCE`: HTTP `400`, source is not `pro` or `studio`
- `RATE_LIMITED`: HTTP `429`, same IP exceeded hourly limit
- `ALREADY_JOINED`: HTTP `409`, same email already joined the same source list
- `CONFIG_ERROR`: HTTP `500`, missing Supabase environment variables
- `SERVER_ERROR`: HTTP `500`, unexpected backend/storage failure

### Frontend example

```ts
const response = await fetch("/api/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, source: type })
});

const result = await response.json();

if (!response.ok || !result.success) {
  throw new Error(result.error?.message ?? "Unable to save email.");
}
```

## 2. Mock Generator Submit

### Endpoint

`POST /api/generate`

### Request payload

```json
{
  "prompt": "Minimal black dragon tattoo with fine line details",
  "style": "minimalist",
  "placement": "forearm",
  "size": "medium",
  "color_mode": "black_gray",
  "metadata": {
    "entry": "homepage_generator"
  }
}
```

Fields:

- `prompt`: string, required, 3-1200 chars after trimming
- `style`: optional string, max 120 chars
- `placement`: optional string, max 120 chars
- `size`: optional string, max 120 chars
- `color_mode`: optional string, max 120 chars
- `metadata`: optional object, capped server-side

### Success response

HTTP `202`

```json
{
  "success": true,
  "data": {
    "request_id": "uuid",
    "status": "mocked",
    "message": "Mock generator accepted. Real AI generation is not connected yet.",
    "created_at": "2026-05-26T06:20:16.117Z",
    "input": {
      "prompt": "Minimal black dragon tattoo with fine line details",
      "style": "minimalist",
      "placement": "forearm",
      "size": "medium",
      "color_mode": "black_gray",
      "metadata": {
        "entry": "homepage_generator"
      }
    },
    "result": {
      "image_url": null,
      "preview_text": "Mock tattoo concept for: Minimal black dragon tattoo with fine line details"
    }
  }
}
```

### Error codes

- `INVALID_JSON`: HTTP `400`, body is not valid JSON
- `INVALID_PROMPT`: HTTP `400`, prompt is missing or too short
- `INVALID_FIELD`: HTTP `400`, an optional field has the wrong type or is too long
- `SERVER_ERROR`: HTTP `500`, unexpected backend failure

## 3. Basic Events

### Endpoint

`POST /api/events`

### Request payload

```json
{
  "event": "cta_click",
  "source": "pro",
  "page": "/",
  "metadata": {
    "cta_text": "Join Pro Waitlist",
    "section": "pricing"
  }
}
```

Allowed `event` values:

- `cta_click`
- `email_submit`
- `pricing_click`
- `generator_use`

Suggested usage:

- Pro / Studio CTA click: `{ "event": "cta_click", "source": "pro" }`
- Email submit attempt/success: `{ "event": "email_submit", "source": "studio" }`
- Pricing card click: `{ "event": "pricing_click", "source": "pro" }`
- Generator submit: `{ "event": "generator_use", "source": "homepage_generator" }`

Server-captured fields:

- `created_at`
- `ip`
- `user_agent`

### Success response

HTTP `201`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "event": "cta_click",
    "created_at": "2026-05-26T06:20:16.117448+00:00"
  }
}
```

### Error codes

- `INVALID_JSON`: HTTP `400`, body is not valid JSON
- `INVALID_EVENT`: HTTP `400`, unsupported event name
- `RATE_LIMITED`: HTTP `429`, same IP exceeded hourly event limit
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
LEADS_RATE_LIMIT_PER_HOUR=5
EVENTS_RATE_LIMIT_PER_HOUR=120
```

## Local test

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
LEADS_RATE_LIMIT_PER_HOUR=5
EVENTS_RATE_LIMIT_PER_HOUR=120
```

3. Run the migration in Supabase SQL Editor:

```sql
-- paste docs/supabase-leads-events.sql
```

4. Start Next.js:

```bash
npm run dev
```

5. Test leads:

```bash
curl -i http://localhost:3000/api/leads \
  -H 'Content-Type: application/json' \
  -d '{"email":"lead-pro@example.com","source":"pro"}'
```

6. Test mock generate:

```bash
curl -i http://localhost:3000/api/generate \
  -H 'Content-Type: application/json' \
  -d '{"prompt":"minimal black dragon tattoo","style":"fine line"}'
```

7. Test events:

```bash
curl -i http://localhost:3000/api/events \
  -H 'Content-Type: application/json' \
  -d '{"event":"cta_click","source":"pro","page":"/","metadata":{"cta_text":"Join Pro Waitlist"}}'
```

## Online test

After deployment and migration:

```bash
curl -i https://aitattoogenerator.cc/api/leads \
  -H 'Content-Type: application/json' \
  -d '{"email":"online-lead@example.com","source":"pro"}'

curl -i https://aitattoogenerator.cc/api/generate \
  -H 'Content-Type: application/json' \
  -d '{"prompt":"minimal black dragon tattoo","style":"fine line"}'

curl -i https://aitattoogenerator.cc/api/events \
  -H 'Content-Type: application/json' \
  -d '{"event":"generator_use","source":"homepage_generator","page":"/"}'
```

Then verify in Supabase:

```sql
select email, source, created_at, ip, user_agent
from public.leads
order by created_at desc
limit 20;

select event, source, page, metadata, created_at
from public.analytics_events
order by created_at desc
limit 20;
```
