# 本课默认技术栈

**来源**: 网站前端开发实战课程 — 第18页
**用途**: AI 产品出海做站的标准技术栈选型

---

## 技术栈组成

| 技术 | 标识 | 用途 |
|------|------|------|
| **Next.js** | N | 页面、路由、SEO、组件化 |
| **TypeScript** | TS | 减少代码错误 |
| **Tailwind CSS** | | 快速还原设计 |
| **GitHub** | | 代码托管和版本记录 |
| **Cloudflare Workers** | | 部署运行与动态能力 |
| **Cloudflare DNS** | | 域名、HTTPS、解析 |
| **Email Routing** | | 早期小站收信 |

---

## 核心定义

> **本课默认技术栈：Next.js + TypeScript + Tailwind + Cloudflare Workers**
>
> **适合 AI 产品出海做站流程的一条工程链路**

---

## 完整流程链路

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   页面构建   │ → │   部署运行   │ → │   域名解析   │ → │   邮件收信   │ → │   API 对接   │
│  与开发     │    │ Workers全球 │    │ DNS + HTTPS │    │ 邮件接收管理 │    │  后端能力    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## 技术栈选择理由

### 为什么选这套？

| 优势 | 说明 |
|------|------|
| **单平台管理** | Cloudflare 同时覆盖 Workers + DNS + Email |
| **减少配置成本** | 同一账号、同一界面、同一套 API |
| **降低认知负担** | 不需要在多个平台间切换 |
| **出海友好** | Cloudflare 全球节点，国内访问也相对稳定 |
| **AI 适配** | Next.js + TS 生态成熟，AI 工具生成代码质量高 |

### 重要声明

> **这不是唯一技术栈，但适合统一管理。**

---

## 与项目实际对比

| 课程技术栈 | aitattoogenerator 实际 | 状态 |
|-----------|----------------------|------|
| Next.js | Next.js 14+ | ✅ |
| TypeScript | TypeScript | ✅ |
| Tailwind CSS | Tailwind CSS v4 | ✅ |
| GitHub | GitHub | ✅ |
| Cloudflare Workers | Cloudflare Pages + Workers | ✅ |
| Cloudflare DNS | Cloudflare DNS | ✅ |
| Email Routing | 待配置 | ⏳ |

**待配置项**：Email Routing（早期小站收信）

---

## 技术栈决策树

```
AI 产品出海做站
    ↓
┌─────────────────┐
│ 需要 SSR/SEO？   │
└─────────────────┘
    ↓ 是
┌─────────────────┐
│  Next.js        │
└─────────────────┘
    ↓
┌─────────────────┐
│ 需要类型安全？   │
└─────────────────┘
    ↓ 是
┌─────────────────┐
│  TypeScript     │
└─────────────────┘
    ↓
┌─────────────────┐
│ 需要快速还原设计？│
└─────────────────┘
    ↓ 是
┌─────────────────┐
│  Tailwind CSS   │
└─────────────────┘
    ↓
┌─────────────────┐
│ 需要边缘部署？   │
└─────────────────┘
    ↓ 是
┌─────────────────┐
│ Cloudflare      │
│ Workers + DNS   │
└─────────────────┘
```

---

## 快速验证

```bash
# Next.js + TypeScript
npx create-next-app@latest --typescript

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Cloudflare Workers
npm install -D @cloudflare/next-on-pages

# 构建验证
npm run build
npm run pages:build
```
