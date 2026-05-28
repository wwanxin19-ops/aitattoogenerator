# Credits & Generation System API Contract

## Overview

积分/额度系统管理用户的纹身生成配额。

- **免费用户**: 10 积分/天
- **Pro 用户**: 100 积分/天
- **每次生成消耗**: 1 积分
- **积分每日重置**: UTC 00:00

## Database Schema

Run `docs/credits-system.sql` in Supabase SQL Editor before enabling these endpoints.

### Tables

- `public.profiles` — 用户资料（已有，增加 credits 字段）
- `public.generation_requests` — 生成请求历史
- `public.credit_transactions` — 积分变动审计日志

### Functions

- `reset_daily_credits()` — 重置每日积分
- `deduct_generation_credits(p_user_id, p_credits)` — 扣除积分
- `add_credits(p_user_id, p_amount, p_type, p_description)` — 增加积分

---

## 1. Get User Credits

### Endpoint

`GET /api/user/credits`

### Auth

Requires valid Supabase session cookie.

### Success Response

HTTP `200`

```json
{
  "success": true,
  "data": {
    "credits_remaining": 8,
    "plan_type": "free",
    "credits_reset_at": "2026-05-28T00:00:00Z",
    "today_generations": 2,
    "daily_limit": 10
  }
}
```

### Error Codes

- `UNAUTHORIZED`: HTTP `401`, user not signed in
- `PROFILE_NOT_FOUND`: HTTP `404`, user profile missing

---

## 2. Deduct Credits & Create Generation

### Endpoint

`POST /api/user/deduct`

### Auth

Requires valid Supabase session cookie.

### Request Payload

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

### Success Response

HTTP `200`

```json
{
  "success": true,
  "data": {
    "request_id": "uuid",
    "status": "pending",
    "message": "Generation started. Credits deducted."
  }
}
```

### Error Codes

- `UNAUTHORIZED`: HTTP `401`, user not signed in
- `INVALID_JSON`: HTTP `400`, body is not valid JSON
- `INVALID_PROMPT`: HTTP `400`, prompt missing or too short
- `INSUFFICIENT_CREDITS`: HTTP `402`, out of credits
  ```json
  {
    "success": false,
    "error": {
      "code": "INSUFFICIENT_CREDITS",
      "message": "You've run out of credits. Upgrade to Pro for more generations.",
      "upgrade_url": "/pricing"
    }
  }
  ```
- `SERVER_ERROR`: HTTP `500`, failed to create generation (credits auto-refunded)

---

## 3. Get Generation History

### Endpoint

`GET /api/user/history?page=1&limit=20`

### Auth

Requires valid Supabase session cookie.

### Query Parameters

- `page`: integer, default 1
- `limit`: integer, default 20, max 50

### Success Response

HTTP `200`

```json
{
  "success": true,
  "data": {
    "generations": [
      {
        "id": "uuid",
        "prompt": "Minimal black dragon tattoo...",
        "style": "minimalist",
        "status": "completed",
        "image_url": "https://...",
        "credits_used": 1,
        "created_at": "2026-05-28T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "total_pages": 3
    }
  }
}
```

### Error Codes

- `UNAUTHORIZED`: HTTP `401`, user not signed in
- `SERVER_ERROR`: HTTP `500`, database error

---

## Environment Variables

No new variables needed. Uses existing:

```bash
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

---

## Frontend Integration Example

### Check credits before generating

```ts
const checkCredits = async () => {
  const res = await fetch("/api/user/credits");
  const data = await res.json();
  
  if (!res.ok) {
    // Not logged in or error
    return null;
  }
  
  return data.data.credits_remaining;
};
```

### Start generation with credit deduction

```ts
const startGeneration = async (prompt: string, style: string) => {
  const res = await fetch("/api/user/deduct", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, style }),
  });
  
  const data = await res.json();
  
  if (res.status === 402) {
    // Out of credits - show upgrade modal
    router.push("/pricing");
    return null;
  }
  
  if (!res.ok) {
    throw new Error(data.error?.message);
  }
  
  return data.data.request_id;
};
```

---

## SQL Test Queries

```sql
-- Check user credits
select id, email, plan_type, credits_remaining, credits_reset_at
from public.profiles
where email = 'user@example.com';

-- Check generation history
select gr.*, p.email
from public.generation_requests gr
join public.profiles p on p.id = gr.user_id
where p.email = 'user@example.com'
order by gr.created_at desc
limit 10;

-- Check credit transactions
select * from public.credit_transactions
where user_id = 'USER_UUID'
order by created_at desc
limit 20;

-- Manual credit reset (for testing)
update public.profiles
set credits_remaining = 10,
    credits_reset_at = now()
where id = 'USER_UUID';
```
