# AI 工具站 API 接入边界

> 基于课程第七部分，前端只是入口，密钥和能力必须放在安全边界之后。

## 架构原则

```
用户浏览器 → Cloudflare Workers (API 路由) → AI Provider API
                ↑
         密钥、校验、限流、日志
```

**核心规则**：前端不直接调用 AI Provider，所有请求通过 Workers 后端代理。

## 安全要求

- [ ] 前端代码中不硬编码任何 API Key
- [ ] 所有 AI 调用通过 Workers 后端代理
- [ ] Workers 环境变量存储密钥（`wrangler secret put`）
- [ ] 启用 HTTPS 强制传输
- [ ] 请求来源校验（CORS / Referer）

## 四层防护实现

### 1. HTTPS 加密传输
- [ ] Cloudflare 自动 HTTPS
- [ ] HSTS 头配置
- [ ] 证书有效

### 2. 请求校验
- [ ] 请求体格式校验（JSON Schema）
- [ ] 必要字段检查（prompt、style 等）
- [ ] 输入长度限制（如 prompt 最大 1000 字符）
- [ ] 图片大小限制（如最大 5MB）

### 3. 限流防护
- [ ] 单 IP 请求频率限制（如 10次/分钟）
- [ ] 单用户日配额限制（如 20次/天）
- [ ] 全局并发限制（如 50 并发）
- [ ] 超限返回 429 Too Many Requests

### 4. 日志审计
- [ ] 请求日志记录（时间、IP、输入摘要、用户标识）
- [ ] 错误日志记录（Provider 错误、超时、异常）
- [ ] 异常行为告警（短时间内大量请求、异常输入模式）

## 密钥管理

- [ ] 生产环境密钥使用 `wrangler secret put KEY_NAME`
- [ ] 开发环境使用 `.dev.vars`（已加入 `.gitignore`）
- [ ] 定期轮换密钥（建议 90 天）
- [ ] 不同环境使用不同密钥（dev / staging / prod）
- [ ] 密钥泄露应急预案（立即轮换 + 审计日志）

## AI Provider 对接

- [ ] 支持多 Provider 切换（OpenAI / Anthropic / Google / 自定义）
- [ ] Provider 故障时自动降级（主备切换）
- [ ] 响应超时处理（默认 30s，可配置）
- [ ] 流式响应支持（SSE / ReadableStream）
- [ ] 错误码统一封装（不暴露 Provider 原始错误）

## Workers API 路由设计

```
POST /api/generate          # 生成纹身设计
  Body: { prompt, style, size }
  Response: { imageUrl, promptId }

POST /api/generate/stream   # 流式生成
  Body: { prompt, style }
  Response: SSE stream

GET  /api/quota             # 查询剩余配额
  Response: { remaining, total, resetAt }

POST /api/feedback          # 提交反馈
  Body: { promptId, rating, comment }
```

## 前端调用示例

```typescript
// 不直接调用 AI Provider，调用 Workers 后端
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt, style: 'minimalist' })
});

const data = await response.json();
// data.imageUrl 为生成结果
```

## 验收标准

- [ ] 前端网络面板中看不到任何 AI Provider API Key
- [ ] Workers 日志中能看到请求记录
- [ ] 超限请求返回 429 而非 500
- [ ] Provider 故障时有降级提示
- [ ] 密钥未出现在 Git 历史或源代码中
