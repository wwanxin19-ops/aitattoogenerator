# aitattoogenerator.cc 后端 API 交接文档 v1

> 给小码（前端）的后端接口说明
> 日期：2026-05-30
> 后端：Cloudflare Workers + D1 + R2 + Queues

---

## 一、系统架构

```
用户浏览器
    │
    ▼
aitattoogenerator.cc  (Cloudflare Worker)
    │
    ├── 前端路由 (/ /pricing /ai-tattoo-generator ...) → 代理到 Pages
    │
    └── API 路由 (/api/*) → Worker 处理
            │
            ├── /api/auth/*     → Google OAuth + JWT Cookie
            ├── /api/generate   → 积分扣减 + 入队
            ├── /api/generate/:id → 查询生成状态
            ├── /api/usage      → 查询积分
            ├── /api/images/:key → 读取 R2 图片
            └── /api/health     → 健康检查
```

---

## 二、认证方式

### JWT Cookie（HttpOnly + Secure + SameSite=Lax）

**登录流程**：
1. 用户点击登录 → 前端跳转到 `GET /api/auth/login`
2. Worker 返回 302 → Google OAuth
3. 用户授权后 → Google 回调到 `GET /api/auth/callback?code=...`
4. Worker 创建用户 → 设置 `session` Cookie → 重定向到 `/`

**前端使用**：
- 所有 API 请求自动携带 Cookie（浏览器默认行为）
- 无需手动处理 token

**检查登录状态**：
```
GET /api/auth/me
```

**已登录返回**：
```json
{
  "success": true,
  "data": {
    "id": "user_uuid",
    "email": "user@example.com",
    "name": "User Name",
    "avatar_url": "https://...",
    "credits": 10,
    "plan": "free",
    "created_at": "2026-05-30T..."
  }
}
```

**未登录返回**：
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Not authenticated"
  }
}
```

---

## 三、核心 API

### 3.1 提交生成请求

```
POST /api/generate
Content-Type: application/json
```

**请求体**：
```json
{
  "prompt": "A fine-line snake wrapped around a peony",
  "style": "minimalist",
  "placement": "arm"
}
```

**字段说明**：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| prompt | string | ✅ | 纹身描述，最长 1200 字符 |
| style | string | ❌ | minimalist / realism / traditional |
| placement | string | ❌ | arm / shoulder / wrist / back / leg |

**成功响应（202）**：
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "pending",
    "message": "Generation queued",
    "credits_remaining": 9
  }
}
```

**错误响应**：
```json
// 401 未登录
{ "success": false, "error": { "code": "UNAUTHORIZED", "message": "Not authenticated" }}

// 400 参数错误
{ "success": false, "error": { "code": "INVALID_INPUT", "message": "Prompt is required" }}

// 403 积分不足
{ "success": false, "error": { "code": "INSUFFICIENT_CREDITS", "message": "Not enough credits" }}
```

---

### 3.2 查询生成状态（轮询）

```
GET /api/generate/:id
```

**响应 - 进行中**：
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "pending",
    "image_url": null,
    "prompt": "A fine-line snake...",
    "style": "minimalist",
    "placement": "arm",
    "created_at": "2026-05-30T03:00:00.000Z",
    "completed_at": null
  }
}
```

**响应 - 已完成**：
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "completed",
    "image_url": "https://aitattoogenerator.cc/api/images/generations/user_uuid/gen_id.png",
    "prompt": "A fine-line snake...",
    "style": "minimalist",
    "placement": "arm",
    "created_at": "2026-05-30T03:00:00.000Z",
    "completed_at": "2026-05-30T03:00:15.000Z"
  }
}
```

**响应 - 失败**：
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "failed",
    "image_url": null,
    ...
  }
}
```

**轮询建议**：
- 首次请求后立即轮询
- 间隔：2 秒 → 共 30 次（约 60 秒超时）
- 状态为 `completed` 或 `failed` 时停止

---

### 3.3 查询积分

```
GET /api/usage
```

**响应**：
```json
{
  "success": true,
  "data": {
    "credits": {
      "total": 10,
      "used_today": 1,
      "remaining": 9,
      "resets_at": "2026-05-31T00:00:00.000Z"
    },
    "plan": "free",
    "generations_today": 1
  }
}
```

---

### 3.4 读取生成的图片

```
GET /api/images/:key
```

**示例**：
```
GET /api/images/generations/user-uuid/gen-id.png
```

**说明**：
- 需要登录（Cookie）
- 只能访问自己的图片（路径包含 userId）
- 返回二进制图片数据
- 前端直接用 `<img src="/api/images/...">` 即可

---

## 四、积分规则

| 用户类型 | 每日积分 | 重置时间 |
|----------|----------|----------|
| Free | 10 | UTC 00:00 |
| Pro | 100 | UTC 00:00 |

**每次生成消耗**：1 积分

**失败自动退款**：生成失败时积分自动返还

---

## 五、前端页面路由（已代理到 Pages）

Worker 已配置以下路由代理到 Cloudflare Pages：

| 路由 | 页面 |
|------|------|
| `/` | 首页 |
| `/pricing` | 定价页 |
| `/ai-tattoo-generator` | 生成器页 |
| `/styles/:style` | 风格页 |
| `/body-parts/:part` | 部位页 |
| `/_next/*` | Next.js 静态资源 |
| `/images/*` | 图片资源 |

---

## 六、状态码速查

| 状态码 | 含义 | 处理 |
|--------|------|------|
| 200 | 成功 | 正常处理 |
| 202 | 已接受 | 生成已入队 |
| 302 | 重定向 | OAuth 跳转 |
| 400 | 参数错误 | 检查请求体 |
| 401 | 未登录 | 跳登录页 |
| 403 | 积分不足 | 提示升级/等待 |
| 404 | 不存在 | 生成 ID 错误 |
| 500 | 服务器错误 | 重试或反馈 |

---

## 七、前端实现建议

### 生成流程伪代码

```typescript
async function generateTattoo(prompt: string, style: string, placement: string) {
  // 1. 提交生成
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, style, placement })
  });
  
  if (res.status === 401) {
    // 未登录，跳转登录
    window.location.href = '/api/auth/login';
    return;
  }
  
  if (res.status === 403) {
    // 积分不足
    alert('积分不足，请明天再来或升级 Pro');
    return;
  }
  
  const { data } = await res.json();
  const genId = data.id;
  
  // 2. 轮询状态
  const result = await pollGeneration(genId);
  
  // 3. 显示结果
  if (result.status === 'completed') {
    showImage(result.image_url);
  } else {
    showError('生成失败，积分已退还');
  }
}

async function pollGeneration(genId: string, maxAttempts = 30): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(2000);
    
    const res = await fetch(`/api/generate/${genId}`);
    const { data } = await res.json();
    
    if (data.status === 'completed' || data.status === 'failed') {
      return data;
    }
  }
  
  throw new Error('生成超时');
}
```

---

## 八、环境信息

| 项目 | 值 |
|------|-----|
| 生产域名 | `https://aitattoogenerator.cc` |
| Pages 域名 | `https://aitattoogenerator-176.pages.dev` |
| 数据库 | Cloudflare D1 |
| 图片存储 | Cloudflare R2 |
| AI 服务 | fal.ai (flux/schnell) |

---

## 九、待确认事项

| # | 事项 | 状态 |
|---|------|------|
| 1 | Waitlist/Leads/Events API | 仍在 Next.js，未迁移到 Worker |
| 2 | GA4 跟踪 ID | 未配置 |
| 3 | 根域名 404 | 需绑定 Pages 自定义域名 |

---

**后端联系人**：小研
**文档版本**：v1.0
**更新日期**：2026-05-30
