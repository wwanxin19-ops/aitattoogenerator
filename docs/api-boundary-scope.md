# API 接入边界范围

> 基于课程第39页，这节课先把 API 位置讲清楚，不展开完整后端。不是后端课，但必须讲清楚安全边界。

## 课程定位

**本节课做到**：
- ✅ 知道 API 在哪里
- ✅ 知道前端怎么调用
- ✅ 知道密钥不能放前端
- ✅ 区分公开变量和后端 secret
- ✅ 后续可用 Workers 承接 API

**不展开**（后续单独课程）：
- ❌ 数据库
- ❌ 登录
- ❌ 支付
- ❌ 队列
- ❌ 复杂 AI 工作流

## 架构边界

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   前端（浏览器）   │←─HTTPS──→│   API 网关        │←─安全──→│  后端服务 / AI  │
│                 │         │ (Cloudflare     │         │  能力           │
│  - 收集输入      │         │   Workers)      │         │                 │
│  - 展示结果      │         │                 │         │  - 第三方 API   │
│  - 不接触密钥    │         │  - 验证请求      │         │  - 自建服务     │
└─────────────────┘         │  - 权限控制      │         └─────────────────┘
                            │  - 处理业务      │
                            │  - 返回结果      │
                            │                 │
                            │  🔒 密钥在这边   │
                            └─────────────────┘
```

## 安全原则

**核心目标：理解边界，避免踩坑。**

### 密钥不暴露在浏览器

- [ ] API Key 存储在 Worker secrets
- [ ] 前端代码中无硬编码密钥
- [ ] 网络面板中看不到 AI Provider 域名
- [ ] 所有 AI 请求通过 `/api/*` 路径

### 公开变量 vs 后端 Secret

| 类型 | 前缀 | 存储位置 | 前端可见 | 用途 |
|------|------|----------|----------|------|
| 公开变量 | `NEXT_PUBLIC_` | `.env.local` | ✅ | 站点 URL、应用名称 |
| 后端 Secret | 无前缀 | `wrangler secret` | ❌ | API Key、数据库密码 |

**示例**：
```bash
# 公开变量（前端可用）
NEXT_PUBLIC_SITE_URL=https://aitattoogenerator.cc
NEXT_PUBLIC_APP_NAME="AI Tattoo Generator"

# 后端 Secret（仅 Workers）
wrangler secret put OPENAI_API_KEY
wrangler secret put REPLICATE_API_TOKEN
```

## API 网关职责

### 当前阶段（阶段1）
- [x] 验证请求（参数格式、长度、合法性）
- [x] 处理业务（调用 AI Provider）
- [x] 返回结果（标准化 JSON）

### 未来阶段（阶段2-3）
- [ ] 权限控制（用户认证、配额检查）
- [ ] 数据库操作（生成记录、用户数据）
- [ ] 支付验证（订阅状态、额度扣减）
- [ ] 队列管理（异步任务、状态查询）

## 前端调用规范

```typescript
// ✅ 正确：调用自己的接口
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt, style })
});

// ❌ 错误：直接调用 AI 服务商
const response = await fetch('https://api.openai.com/...', {
  headers: { 'Authorization': 'Bearer sk-xxx' }  // 密钥暴露！
});
```

## 验收标准

- [ ] 知道 API 网关的位置和职责
- [ ] 前端只调用 `/api/*` 接口
- [ ] 密钥通过 `wrangler secret` 管理
- [ ] 区分公开变量和 Secret
- [ ] 理解哪些内容本节课不展开

## 核心原则

> **先讲清位置和边界，再进入后续系统能力。**
