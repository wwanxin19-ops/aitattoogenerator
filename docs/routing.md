# 路由映射表

## 核心页面

| 路由 | 页面组件 | 设计稿版本 | 状态 | 说明 |
|------|---------|-----------|------|------|
| `/` | `app/page.tsx` | v3 | ✅ | 首页 |
| `/ai-tattoo-generator` | `app/ai-tattoo-generator/page.tsx` | v3 | ✅ | 生成器 |
| `/pricing` | `app/pricing/page.tsx` | v3 | ✅ | 定价页 |

## 风格页

| 路由 | 页面组件 | 设计稿版本 | 状态 |
|------|---------|-----------|------|
| `/styles/realism` | `app/styles/realism/page.tsx` | v3 | ✅ |
| `/styles/minimalist` | `app/styles/minimalist/page.tsx` | v3 | ✅ |

## 部位页

| 路由 | 页面组件 | 设计稿版本 | 状态 |
|------|---------|-----------|------|
| `/body-parts/arm` | `app/body-parts/arm/page.tsx` | v3 | ✅ |

## 法律页

| 路由 | 页面组件 | 设计稿版本 | 状态 |
|------|---------|-----------|------|
| `/privacy` | `app/privacy/page.tsx` | v3 | ✅ |
| `/terms` | `app/terms/page.tsx` | v3 | ✅ |
| `/cookie-policy` | `app/cookie-policy/page.tsx` | v3 | ✅ |

## 支付页

| 路由 | 页面组件 | 设计稿版本 | 状态 |
|------|---------|-----------|------|
| `/billing/success` | `app/billing/success/page.tsx` | v3 | ✅ |
| `/billing/cancel` | `app/billing/cancel/page.tsx` | v3 | ✅ |

## 用户页

| 路由 | 页面组件 | 设计稿版本 | 状态 |
|------|---------|-----------|------|
| `/dashboard` | `app/dashboard/page.tsx` | v3 | ✅ |
| `/dashboard/billing` | `app/dashboard/billing/page.tsx` | v3 | ✅ |

## API 路由

| 路由 | 处理文件 | 说明 |
|------|---------|------|
| `/api/auth/*` | `app/api/auth/*/route.ts` | 认证相关 |
| `/api/generate` | `app/api/generate/route.ts` | 图片生成 |
| `/api/billing/*` | `app/api/billing/*/route.ts` | 支付相关 |
| `/api/user/*` | `app/api/user/*/route.ts` | 用户数据 |

## 重定向规则

| 来源 | 目标 | 类型 |
|------|------|------|
| `/generator` | `/ai-tattoo-generator` | 永久 (301) |

## Sitemap 覆盖

所有标记 ✅ 的页面已纳入 `app/sitemap.ts`。

## 组件映射

| 区块 | 组件 | 位置 |
|------|------|------|
| Header/导航 | `NavBar` | `components/NavBar.tsx` |
| Footer/页脚 | `Footer` | `components/Footer.tsx` |
| 布局组合 | `NavBar` + `Footer` | `components/SiteChrome.tsx` (re-export) |
