# 📋 给小研的后端反馈文档

**日期**: 2026-05-30
**发件人**: 小码（前端）
**收件人**: 小研（后端）
**项目**: AI Tattoo Generator

---

## ✅ P0 阻塞问题 - 已解决

### 问题 1：API 路由 404（Worker rewrite 冲突）

**状态**: ✅ 已修复

**解决方案**: 前端已将自有 API 路径从 `/api/*` 迁移到 `/internal/*`

| 原路径 | 新路径 | 用途 |
|--------|--------|------|
| `/api/events` | `/internal/events` | 事件追踪（GA4 代理） |
| `/api/leads` | `/internal/leads` | Waitlist 邮箱收集 |
| `/api/waitlist` | `/internal/waitlist` | Waitlist 注册 |

**影响说明**:
- Worker 的 `/api/*` rewrite 不再影响前端自有 API
- `/api/user/*` 和 `/api/generate/*` 继续走 Worker → 后端，不受影响
- 已构建部署，生产环境生效

**需要你确认**:
- Worker 配置中是否有针对 `/internal/*` 的规则？（应该没有，但请 double check）

---

## 🔴 P0 阻塞问题 - 等待你修复

### 问题 2：登出功能 404

**状态**: ⏳ 等待后端实现

**问题描述**:
```
POST /api/auth/logout → 404 Not Found
```

**期望实现**:
```typescript
// Worker 端需要实现
POST /api/auth/logout
Request: { /* 无需 body，JWT 在 Cookie 中 */ }
Response: { success: true }
Action: 清除 auth-token Cookie
```

**前端代码已就绪**:
```typescript
// components/AuthButton.tsx
const handleLogout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  setUser(null);
};
```

**优先级**: P0（阻塞用户登出功能）

---

## 🟡 P1 功能完善 - 需要后端配合

### 1. Dashboard 增强

**需求**: 在 Dashboard 页面显示
- 积分余额（已有 `/api/user/credits`，确认格式）
- 生成历史（已有 `/api/user/history`，确认格式）
- 图片画廊（需要 `/api/images/:key` 或类似接口）

**需要你提供**:
- `/api/user/history` 的完整响应格式（目前文档中写的是 `TBD`）
- 图片访问方式：是通过 Worker 代理还是直接 R2 公网访问？

### 2. 生成器优化

**需求**: 生成完成后提供
- 下载按钮（需要图片直链）
- 重新生成按钮（复用现有流程）
- 分享按钮（需要可分享的 URL）

**需要你提供**:
- 图片下载的 URL 格式
- 分享页面的路由设计（如 `/share/:genId`）

---

## 📊 当前接口状态汇总

### 前端 → Worker（通过 `/api/*` rewrite）

| 接口 | 状态 | 说明 |
|------|------|------|
| `POST /api/generate` | ✅ 正常 | 创建生成任务 |
| `GET /api/generate/:id` | ✅ 正常 | 查询生成状态 |
| `GET /api/user/credits` | ✅ 正常 | 查询积分 |
| `GET /api/user/history` | ⚠️ 待确认 | 响应格式 TBD |
| `POST /api/user/deduct` | ✅ 正常 | 扣减积分 |
| `POST /api/auth/logout` | ❌ 404 | **等你实现** |

### 前端内部 API（`/internal/*`，不经过 Worker）

| 接口 | 状态 | 说明 |
|------|------|------|
| `POST /internal/events` | ✅ 正常 | GA4 事件代理 |
| `POST /internal/leads` | ✅ 正常 | Waitlist 收集 |
| `POST /internal/waitlist` | ✅ 正常 | Waitlist 注册 |

---

## 🔧 环境信息

- **生产域名**: `aitattoogenerator.cc`
- **Worker 子域名**: `aitattoogenerator.wwanxin19.workers.dev`
- **前端部署**: Vercel（IP: `76.76.21.21`）
- **最新前端 commit**: `7e7d281`

---

## ⏳ 等待你完成

1. **P0**: 实现 `POST /api/auth/logout`
2. **P1**: 确认 `/api/user/history` 响应格式
3. **P1**: 确认图片访问 URL 格式（R2 直链或 Worker 代理）

完成后请告诉我，我立即验证前端功能。

---

**小码**
前端开发
2026-05-30
