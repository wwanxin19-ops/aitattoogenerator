# 项目目录结构指南

**来源**: 网站前端开发实战课程 — 第20页
**用途**: Next.js 项目目录结构解读与规范

---

## 核心原则

> **先看懂目录，再开始改页面**
>
> **知道文件管什么，才不容易改乱**

---

## 必须理解的 5 个核心项

| 目录/文件 | 用途 | 关键说明 |
|-----------|------|----------|
| **`app/`** | 路由文件夹 | 每个子目录 = 一个路由 |
| **`components/`** | 组件文件夹 | 可复用的 UI 组件 |
| **`public/`** | 静态资源 | 图片、字体、favicon，通过 `/文件名` 直接访问 |
| **`wrangler.toml`** | Workers 部署配置 | 定义构建和部署规则 |
| **`.env.local`** | 环境变量 | 本地变量，保护隐私，**不提交 Git** |

---

## 关键文件说明

| 文件 | 用途 |
|------|------|
| `app/layout.tsx` | 全局布局文件，网站的整体骨架 |
| `app/page.tsx` | 首页入口文件 |
| `next.config.ts` | Next.js 框架相关配置 |
| `package.json` | 项目依赖与运行脚本 |

---

## aitattoogenerator 项目目录

```
aitattoogenerator/
├── app/                          # 路由文件夹
│   ├── layout.tsx                # 全局布局
│   ├── page.tsx                  # 首页
│   ├── generator/
│   │   └── page.tsx              # 生成器页面
│   └── cookie-policy/
│       └── page.tsx              # Cookie Policy
│
├── components/                   # 组件文件夹
│   ├── NavBar.tsx
│   ├── Footer.tsx
│   └── ui/
│
├── public/                       # 静态资源
│   ├── favicon.ico
│   └── og-image.png
│
├── docs/                         # 工程文档（项目扩展）
│   ├── routing.md
│   ├── image-assets.md
│   └── ...
│
├── scripts/                      # 自动化脚本（项目扩展）
│
├── wrangler.toml                 # Workers 部署配置
├── next.config.ts                # Next.js 配置
├── package.json                  # 依赖与脚本
├── .env.local                    # 本地环境变量（不提交Git）
└── .env.example                  # 环境变量模板（提交Git）
```

---

## 常见错误与正确做法

| ❌ 常见错误 | ✅ 正确做法 |
|-----------|-----------|
| 把组件放进 `app/` | 组件放 `components/`，路由放 `app/` |
| 把图片放 `app/` | 图片放 `public/`，通过 `/图片名` 引用 |
| 把敏感信息提交到 Git | 敏感信息放 `.env.local`，并加入 `.gitignore` |
| 随意修改 `wrangler.toml` | 修改前备份，修改后验证构建 |
| 在 `app/` 里放非页面文件 | `app/` 只放路由相关文件 |

---

## 文件存放决策树

```
新文件/资源
    ↓
是路由页面？ → 是 → app/对应路由目录/page.tsx
    ↓ 否
是可复用组件？ → 是 → components/
    ↓ 否
是静态资源（图片/字体）？ → 是 → public/
    ↓ 否
是部署配置？ → 是 → wrangler.toml
    ↓ 否
是环境变量？ → 是 → .env.local（不提交Git）
    ↓ 否
是项目文档？ → 是 → docs/
    ↓ 否
其他 → 根目录或合适位置
```

---

## 重点提示

> **"重点看懂 app、components、public、wrangler 和 env。"**

这 5 项是日常开发最高频接触的目录/文件，必须完全理解其用途和规则。
