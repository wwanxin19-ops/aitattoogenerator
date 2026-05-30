# AI Tattoo Generator — 前端开发交接文档

> 收件人：前端小码  
> 发件人：后端小研  
> 日期：2026-05-30  
> 项目：aitattoogenerator.cc

---

## 一、项目现状总览

| 维度 | 状态 |
|------|------|
| 框架 | Next.js 15 (App Router) + React 19 + TypeScript |
| 部署 | Vercel (前端) + Cloudflare Worker (后端 API) |
| 域名 | https://aitattoogenerator.cc |
| 样式 | 纯 CSS (globals.css)，无 Tailwind / Styled Components |

---

## 二、已完成的前端页面

| 页面 | 路径 | 状态 | 说明 |
|------|------|------|------|
| 首页 | `/` | ✅ 完成 | Hero + 功能介绍 + FAQ + CTA |
| 生成器 | `/ai-tattoo-generator` | ✅ 完成 | 表单 + 生成 + 轮询 + 结果展示 |
| 定价 | `/pricing` | ✅ 完成 | 三档定价 + Waitlist 弹窗 |
| Dashboard | `/dashboard` | ✅ 完成 | 用户信息展示 + 登出 |
| 风格页-写实 | `/styles/realism` | ✅ 完成 | SEO 文章页 |
| 风格页-极简 | `/styles/minimalist` | ✅ 完成 | SEO 文章页 |
| 部位页-手臂 | `/body-parts/arm` | ✅ 完成 | SEO 文章页 |

---

## 三、已完成的前端组件

### 核心组件

| 组件 | 文件 | 功能 | 状态 |
|------|------|------|------|
| NavBar | `components/SiteChrome.tsx` | 导航栏 + 移动端菜单 + AuthButton | ✅ |
| Footer | `components/SiteChrome.tsx` | 页脚链接 | ✅ |
| AuthButton | `components/AuthButton.tsx` | 登录/登出按钮 + 用户信息展示 | ✅ |
| GeneratorForm | `components/GeneratorForm.tsx` | 生成表单 + 轮询 + 结果展示 | ✅ |
| ModalButton | `components/ModalButtons.tsx` | Pro/Studio 弹窗触发按钮 | ✅ |
| EmailModal | `components/EmailModal.tsx` | Waitlist 邮箱收集弹窗 | ✅ |

### 共享组件 (Shared.tsx)

| 组件 | 功能 | 状态 |
|------|------|------|
| ComplianceNote | 医疗免责声明 | ✅ |
| HeroGeneratorPanel | 首页右侧预览面板（静态） | ✅ |
| HowItWorksSteps | 三步流程展示 | ✅ |
| TrustSignalGrid | 信任信号网格 | ✅ |
| VisualComparison | 竞品对比表格 | ✅ |
| FAQAccordion | FAQ 手风琴 | ✅ |
| ExampleImagePlaceholder | 示例图片占位 | ✅ |
| ContentCTA | 文章页底部 CTA | ✅ |

---

## 四、已完成的前端 API 路由

> ⚠️ **重要**：这些路由当前全部 **404**，因为 `next.config.ts` 的 rewrite 规则将所有 `/api/*` 请求转发到了 Cloudflare Worker。

| 路由 | 文件 | 功能 | 调用方 | 状态 |
|------|------|------|--------|------|
| `POST /api/events` | `app/api/events/route.ts` | 事件追踪（CTA点击等） | EmailModal, GeneratorForm | ❌ 404 |
| `POST /api/leads` | `app/api/leads/route.ts` | Pro/Studio 潜在客户收集 | EmailModal | ❌ 404 |
| `POST /api/waitlist` | `app/api/waitlist/route.ts` | Waitlist 注册（备用） | — | ❌ 404 |
| `GET /api/user/credits` | `app/api/user/credits/route.ts` | 积分查询封装 | — | ❌ 404 |
| `POST /api/user/deduct` | `app/api/user/deduct/route.ts` | 生成请求封装 | — | ❌ 404 |
| `GET /api/user/history` | `app/api/user/history/route.ts` | 历史记录封装 | — | ❌ 404 |

### 问题根因

```typescript
// next.config.ts
async rewrites() {
  return {
    beforeFiles: [
      {
        source: "/api/:path*",
        destination: "https://aitattoogenerator.wwanxin19.workers.dev/api/:path*",
      },
    ],
  };
}
```

**所有 `/api/*` 请求都被 rewrite 到了 Worker，包括 Next.js 自身的 API Routes。**

---

## 五、前端未完成 / 需要修复的事项

### 🔴 P0 - 阻塞问题

#### 1. API 路由 404 问题
**影响**：事件追踪、Leads 收集等功能完全不可用。

**解决方案**（三选一，推荐方案 A）：

**方案 A：修改前端调用路径**（推荐，改动最小）
- 将前端代码中的 `/api/events` 改为 `/internal/events`
- 将 `/api/leads` 改为 `/internal/leads`
- 将 `/api/waitlist` 改为 `/internal/waitlist`
- 同步修改 API 路由文件路径：`app/api/events` → `app/internal/events`
- 在 `next.config.ts` 的 rewrite 中添加例外：

```typescript
// next.config.ts
async rewrites() {
  return {
    beforeFiles: [
      {
        source: "/internal/:path*",
        destination: "/internal/:path*", // 不 rewrite，本地处理
      },
      {
        source: "/api/:path*",
        destination: "https://aitattoogenerator.wwanxin19.workers.dev/api/:path*",
      },
    ],
  };
}
```

**方案 B：在 rewrite 中排除特定路径**
```typescript
// 复杂且容易遗漏，不推荐
```

**方案 C：将所有功能迁移到 Worker**
- 后端工作量较大，需要小研配合

#### 2. AuthButton 登出功能
**现状**：调用 `POST /api/auth/logout` → 404
**需要**：小研在 Worker 上添加 logout 端点，或前端临时改为清除 Cookie + 刷新页面

---

### 🟡 P1 - 功能完善

#### 3. Dashboard 页面功能增强
**现状**：仅展示用户基本信息（头像、名字、邮箱、ID）
**需要补充**：
- 积分余额展示（调用 `/api/usage`）
- 今日生成次数
- 最近生成历史列表（调用 `/api/user/history`）
- 生成结果图片画廊

#### 4. GeneratorForm 未登录体验
**现状**：未登录用户点击 Generate 直接跳转登录页
**优化建议**：
- 允许未登录用户填写表单
- 点击 Generate 时提示登录，保留已填内容
- 登录后自动返回并继续生成

#### 5. 生成结果展示优化
**现状**：仅展示单张图片 + prompt
**需要补充**：
- 下载按钮（HD 下载需 Pro）
- 重新生成按钮
- 分享功能
- 保存到历史记录

---

### 🟢 P2 - 体验优化

#### 6. 加载状态优化
- NavBar 中的 "Loading..." 需要替换为骨架屏或旋转图标
- GeneratorForm 生成过程中的进度条可优化为更直观的动画

#### 7. 错误处理增强
- 网络错误重试机制
- 用户友好的错误提示（当前仅显示原始错误消息）

#### 8. 响应式优化
- 检查移动端各页面显示效果
- 生成结果图片在移动端的适配

---

## 六、环境变量配置

前端需要以下环境变量（已在 Vercel 配置）：

| 变量名 | 用途 | 状态 |
|--------|------|------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | 未配置（可选） |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 | 已配置 |

---

## 七、后端 API 接口文档

### 认证相关

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/auth/login` | 跳转 Google OAuth |
| GET | `/api/auth/callback?code=xxx&state=xxx` | OAuth 回调 |
| GET | `/api/auth/me` | 获取当前用户信息 |
| POST | `/api/auth/logout` | ❌ 未实现 |

### 生成相关

| 方法 | 路径 | 请求体 | 响应 |
|------|------|--------|------|
| POST | `/api/generate` | `{prompt, style, placement}` | `{success, data: {id, status, credits_remaining}}` |
| GET | `/api/generate/:id` | — | `{success, data: {id, status, image_url, prompt, ...}}` |

### 用户相关

| 方法 | 路径 | 响应 |
|------|------|------|
| GET | `/api/usage` | `{success, data: {credits, recent_generations}}` |

---

## 八、文件结构

```
aitattoogenerator/
├── app/
│   ├── api/                    # 前端 API 路由（当前全部 404）
│   │   ├── events/route.ts
│   │   ├── leads/route.ts
│   │   ├── waitlist/route.ts
│   │   └── user/
│   │       ├── credits/route.ts
│   │       ├── deduct/route.ts
│   │       └── history/route.ts
│   ├── ai-tattoo-generator/page.tsx
│   ├── body-parts/arm/page.tsx
│   ├── dashboard/page.tsx
│   ├── pricing/page.tsx
│   ├── styles/
│   │   ├── minimalist/page.tsx
│   │   └── realism/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── AuthButton.tsx
│   ├── EmailModal.tsx
│   ├── GeneratorForm.tsx
│   ├── ModalButtons.tsx
│   ├── Shared.tsx
│   └── SiteChrome.tsx
├── lib/
│   ├── analytics.ts
│   ├── api-utils.ts
│   └── constants.ts
├── public/
│   └── images/tattoos/
│       ├── arm-placement-example.svg
│       ├── minimalist-example.svg
│       └── realism-example.svg
├── middleware.ts
├── next.config.ts
└── vercel.json
```

---

## 九、小码的任务清单

### 立即处理（P0）

- [ ] **修复 API 路由 404**
  - 选择方案 A/B/C 之一
  - 确保 `/api/events` 和 `/api/leads` 能正常访问
  - 测试 EmailModal 提交功能
  - 测试 GeneratorForm 的事件追踪

- [ ] **确认 AuthButton 登出**
  - 等小研在 Worker 添加 logout 端点，或先临时用客户端清除方案

### 本周完成（P1）

- [ ] **Dashboard 增强**
  - 添加积分余额展示
  - 添加生成历史列表
  - 添加图片画廊

- [ ] **GeneratorForm 优化**
  - 未登录用户体验优化
  - 生成结果添加下载/重新生成/分享按钮

### 后续优化（P2）

- [ ] 加载状态优化
- [ ] 错误处理增强
- [ ] 移动端响应式检查

---

## 十、需要后端配合的事项

| 事项 | 优先级 | 负责人 |
|------|--------|--------|
| Worker 添加 `/api/auth/logout` | P0 | 小研 |
| 确认 `/api/events` 是否需要迁移到 Worker | P1 | 小研 |
| 确认 `/api/leads` 是否需要迁移到 Worker | P1 | 小研 |

---

## 十一、联系方式

- **后端小研**：有任何 API 问题随时找我
- **Worker 域名**：`https://aitattoogenerator.wwanxin19.workers.dev`
- **生产域名**：`https://aitattoogenerator.cc`

---

*文档版本：v1.0*  
*最后更新：2026-05-30*
