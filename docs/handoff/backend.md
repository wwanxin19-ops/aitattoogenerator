# 小研 — Backend 交接文档

## 项目概述
AI Tattoo Generator 前端项目已完成部署，以下是后端相关接口和配置信息。

## 技术栈
- **框架**: Next.js 15.3.2 (App Router)
- **运行时**: Node.js (Vercel Serverless)
- **数据库**: Supabase (PostgreSQL)
- **API 风格**: RESTful JSON

## API 路由清单

### 1. POST /api/waitlist
**功能**: Pro 版本等待列表注册

**请求体**:
```json
{
  "email": "user@example.com"
}
```

**响应**:
```json
{
  "success": true,
  "message": "You have joined the waitlist."
}
```

**错误码**:
- `DUPLICATE_LEAD`: 邮箱已存在
- `ALREADY_JOINED`: 已加入等待列表
- `RATE_LIMIT`: 请求过于频繁

**环境变量依赖**:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `WAITLIST_RATE_LIMIT_PER_HOUR` (默认: 5)

**数据库表**: `waitlist` (见 docs/supabase-waitlist.sql)

---

### 2. POST /api/leads
**功能**: Studio 潜在客户收集

**请求体**:
```json
{
  "email": "studio@example.com",
  "type": "studio"
}
```

**响应**:
```json
{
  "success": true,
  "message": "We will reach out within 48 hours."
}
```

**错误码**:
- `DUPLICATE_LEAD`: 邮箱已存在
- `ALREADY_JOINED`: 已提交过

**环境变量依赖**:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**数据库表**: `leads` (见 docs/supabase-leads-events.sql)

---

### 3. POST /api/events
**功能**: 前端事件追踪（可扩展为埋点系统）

**请求体**:
```json
{
  "event": "cta_click",
  "source": "pro",
  "page": "/pricing",
  "metadata": {
    "cta_text": "Get Pro",
    "section": "pricing"
  }
}
```

**响应**: 201 Created (无响应体)

**环境变量依赖**:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**数据库表**: `events` (见 docs/supabase-leads-events.sql)

---

### 4. POST /api/generate
**功能**: AI 纹身生成（当前为 Mock）

**请求体**:
```json
{
  "prompt": "wolf portrait",
  "style": "realism",
  "placement": "arm",
  "size": "medium",
  "color_mode": "black_and_grey"
}
```

**响应**:
```json
{
  "imageUrl": "/mock-tattoo.png",
  "prompt": "wolf portrait",
  "style": "realism"
}
```

**注意**: 当前返回 Mock 数据，需接入真实 AI 生成服务

---

## 数据库 Schema

### waitlist 表
```sql
CREATE TABLE waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

### leads 表
```sql
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  type text NOT NULL DEFAULT 'studio',
  created_at timestamptz DEFAULT now()
);
```

### events 表
```sql
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event text NOT NULL,
  source text,
  page text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);
```

---

## 环境变量配置

| 变量名 | 用途 | 必需 |
|--------|------|------|
| `SUPABASE_URL` | Supabase 项目 URL | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务角色密钥 | ✅ |
| `WAITLIST_RATE_LIMIT_PER_HOUR` | 每小时请求限制 | ❌ (默认 5) |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID | ❌ |

---

## 待办事项
- [ ] 接入真实 AI 图像生成 API (替换 /api/generate Mock)
- [ ] 考虑添加用户认证系统
- [ ] 考虑添加生成历史记录
- [ ] 考虑添加支付集成 (Stripe)
- [ ] 考虑添加邮件通知服务 (Resend/SendGrid)

---

## 联系方式
- 仓库: https://github.com/wwanxin19-ops/aitattoogenerator
- 生产环境: https://aitattoogenerator.cc
