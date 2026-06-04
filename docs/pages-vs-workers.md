# Cloudflare Pages 和 Workers 区别

> 基于课程第45页，Pages 更像静态托管，Workers 更像边缘运行时。

## 核心区别

| 维度 | Cloudflare Pages | Cloudflare Workers |
|------|-----------------|-------------------|
| **定位** | 静态托管 | 边缘运行时 |
| **适合** | 静态站、简单前端 | 动态请求、API、SSR |
| **部署体验** | 简单 | 稍复杂 |
| **后续能力** | 偏静态页面 | 承接 API 和动态能力 |
| **API 支持** | ❌ 不支持 | ✅ 支持 |
| **SSR 支持** | ❌ 不支持 | ✅ 支持 |
| **边缘逻辑** | ❌ 不支持 | ✅ 支持 |

## 本课选择

**选择 Workers 作为主线**

原因：
- AI 工具站后续通常需要 API 和动态能力
- 需要边缘运行时处理 /api/generate
- 需要 SSR 支持 SEO
- 未来需要数据库、认证、支付

> 不是 Pages 不好，而是本课主线更需要 Workers。

## 当前项目实际使用

**Next.js + Cloudflare Workers**（通过 `@cloudflare/next-on-pages`）

```
Next.js 应用
├── 静态页面（SSG）→ Workers 边缘缓存
├── API 路由（/api/*）→ Workers 边缘运行
└── 动态渲染（SSR）→ Workers 边缘运行
```

**部署配置**：
| 配置项 | 值 |
|--------|-----|
| Build command | `npm run pages:build` |
| Output directory | `.vercel/output/static` |
| 运行时 | Workers 边缘运行时 |

## 选择建议

### 选择 Pages
- [ ] 纯静态网站（博客、文档站）
- [ ] 无 API 需求
- [ ] 无动态渲染需求
- [ ] 追求最简单部署体验

### 选择 Workers
- [ ] 需要 API 路由
- [ ] 需要 SSR/动态渲染
- [ ] 需要边缘逻辑处理
- [ ] 需要连接数据库或第三方服务
- [ ] AI 工具站等需要后端能力的项目

## 核心原则

> **Pages 更像静态托管，Workers 更像边缘运行时。**

- Pages 适合静态内容展示
- Workers 适合动态能力处理
- AI 工具站需要 Workers 的 API 和动态能力
