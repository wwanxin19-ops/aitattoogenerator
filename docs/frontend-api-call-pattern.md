# 前端如何调用自己的 API

> 基于课程第38页，前端不要直接请求 AI 服务商，浏览器只请求自己的接口，密钥放在 Worker secrets。

## 核心原则

**前端可以发送请求，但不能直接拿着密钥请求 AI 服务商。**

## 正确链路（4步）

```
Browser ──1.HTTPS请求──→ Workers ──2.转发请求──→ AI Provider
   ↑                                              │
   └────────4.返回前端────────3.返回结果──────────┘
```

### Step 1: 前端 → Workers（HTTPS 请求）

**前端职责**：
- 收集用户输入（prompt、style 等参数）
- 调用自己的接口 `/api/generate`
- 不接触任何 API Key

**请求示例**：
```typescript
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'a minimalist wolf tattoo',
    style: 'minimalist',
    color: 'black'
  })
});

const data = await response.json();
// data.imageUrl, data.promptId
```

### Step 2: Workers → AI Provider（转发请求）

**Workers 职责**：
- 验证请求（参数格式、长度、合法性）
- 限流防护（IP 频率、用户配额）
- 日志记录（请求时间、IP、输入摘要）
- 携带密钥调用 AI Provider

**密钥管理**：
- 密钥存放在 `Worker secrets`
- 通过 `wrangler secret put AI_PROVIDER_KEY` 设置
- 代码中通过 `env.AI_PROVIDER_KEY` 读取

### Step 3: AI Provider → Workers（返回结果）

**AI Provider 返回**：
- 原始生成内容（图片 URL、文本等）
- 使用信息（tokens、cost）
- 可能的错误信息

### Step 4: Workers → 前端（返回前端）

**Workers 处理**：
- 接收结果
- 处理转换（格式转换、URL 生成）
- 过滤敏感（内容审核、敏感词过滤）
- 返回标准化 JSON

**前端接收**：
```json
{
  "status": "success",
  "data": {
    "imageUrl": "https://cdn.example.com/tattoo_123.jpg",
    "thumbnailUrl": "https://cdn.example.com/tattoo_123_thumb.jpg",
    "promptId": "tattoo_123",
    "metadata": {
      "width": 1024,
      "height": 1024,
      "format": "png"
    }
  }
}
```

## 五个核心原则

### 1. 浏览器只请求自己的接口
- [ ] 不直连 AI 服务商
- [ ] 避免密钥泄露
- [ ] 统一入口便于管理

### 2. API Key 放在 Worker secrets
- [ ] 密钥只存在服务端
- [ ] 不暴露给浏览器
- [ ] 生产环境用 `wrangler secret put`
- [ ] 开发环境用 `.dev.vars`（已加入 .gitignore）

### 3. Worker 再请求 AI 服务商
- [ ] 由 Worker 携带密钥安全访问 AI 能力
- [ ] 可做请求预处理（校验、限流）
- [ ] 可做响应后处理（过滤、转换）

### 4. 前端只拿结果，不接触密钥
- [ ] 浏览器只接收最终结果
- [ ] 无法获取任何密钥
- [ ] 网络面板中看不到 API Key

### 5. 未来可扩展（Worker 层统一控制）
- [ ] 登录认证
- [ ] 额度管理
- [ ] 支付集成
- [ ] 数据库存储
- [ ] 任务队列

## 安全验证检查清单

- [ ] 前端代码中搜索不到任何 API Key 字符串
- [ ] 网络面板（DevTools → Network）看不到 AI Provider 域名请求
- [ ] 所有 AI 相关请求都是 `/api/*` 路径
- [ ] Workers 日志中有请求记录
- [ ] 密钥通过 `wrangler secret` 管理，不在 Git 中

## 错误示例（禁止）

```typescript
// ❌ 错误：直接调用 AI 服务商，密钥暴露
const response = await fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk-xxxxxxxxxxxx',  // 密钥暴露！
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ prompt: 'a tattoo' })
});
```

## 正确示例（推荐）

```typescript
// ✅ 正确：调用自己的接口
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'a tattoo', style: 'minimalist' })
});

if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message);
}

const { data } = await response.json();
return data.imageUrl;
```

## Workers 实现示例

```typescript
// app/api/generate/route.ts
export async function POST(request: Request) {
  // 1. 验证请求
  const body = await request.json();
  if (!body.prompt || body.prompt.length > 1000) {
    return Response.json({ error: 'Invalid prompt' }, { status: 400 });
  }

  // 2. 限流检查（示例）
  const clientIP = request.headers.get('x-forwarded-for');
  // ... 限流逻辑

  // 3. 调用 AI Provider（密钥在 env 中）
  const apiKey = process.env.AI_PROVIDER_KEY;  // Worker secrets
  const aiResponse = await fetch('https://api.provider.com/generate', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ prompt: body.prompt })
  });

  // 4. 处理结果
  const result = await aiResponse.json();
  
  // 5. 返回前端
  return Response.json({
    status: 'success',
    data: {
      imageUrl: result.image_url,
      promptId: result.id
    }
  });
}
```

## 传输安全

- [ ] 全链路 HTTPS 加密传输
- [ ] Cloudflare 自动 HTTPS
- [ ] HSTS 头配置
- [ ] 证书有效且未过期

## 验收标准

- [ ] 前端网络面板中看不到 AI Provider 域名
- [ ] 前端网络面板中看不到任何 API Key
- [ ] 所有 AI 请求通过 `/api/*` 路径
- [ ] Workers 日志中有请求记录
- [ ] 密钥未出现在 Git 历史或源代码中
- [ ] 错误情况有友好提示（不暴露内部错误）
