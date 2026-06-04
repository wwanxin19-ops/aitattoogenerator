# 项目初始化 8 步闭环

**来源**: 网站前端开发实战课程 — 第19页
**用途**: 项目初始化标准流程，确保工程地基稳固

---

## 核心原则

> **项目初始化：先搭一个能跑、能部署的空壳**
>
> **初始化不是写页面，是先把工程地基搭好**

### 金句

> **地基不稳，部署、追踪、API 都会出问题。**

---

## 8 步初始化闭环

| 步骤 | 内容 | 命令/操作 | 验证标准 |
|------|------|-----------|----------|
| **01** | 创建 GitHub 仓库 | GitHub Dashboard → New Repository | 仓库可访问 |
| **02** | 创建 Next.js 项目 | `npx create-next-app@latest` | 项目目录生成 |
| **03** | 接入 Tailwind | `npm install -D tailwindcss` + 配置 | `globals.css` 包含 `@import "tailwindcss"` |
| **04** | 配置 TypeScript | 脚手架已包含 / 手动配置 `tsconfig.json` | `tsc --noEmit` 无错误 |
| **05** | 配置 Workers | 创建 `wrangler.toml` + 环境变量 | 文件存在且配置正确 |
| **06** | 确认本地能运行 | `pnpm dev` | `localhost:3000` 可访问 |
| **07** | 确认构建能通过 | `pnpm build` | 构建成功，退出码 0 |
| **08** | 第一次 commit | `git add . && git commit -m "chore: init"` | 代码已推送到仓库 |

---

## 与工程地基三要素的关系

| 8步初始化 | 工程地基三要素 |
|----------|---------------|
| 01 创建 GitHub 仓库 | 版本管理 |
| 02 创建 Next.js 项目 | 开发环境 |
| 03 接入 Tailwind | 开发环境 |
| 04 配置 TypeScript | 开发环境 |
| 05 配置 Workers | 持续部署 |
| 06 确认本地能运行 | 开发环境 |
| 07 确认构建能通过 | 持续部署 |
| 08 第一次 commit | 版本管理 |

---

## 关键纪律

### ❌ 错误做法
- 第一个 commit 包含页面代码
- 跳过构建验证直接写页面
- 不配置 Workers 就开始开发

### ✅ 正确做法
- 第一个 commit 只包含工程初始化
- 每步验证通过后再进行下一步
- 8步全过才能进入页面开发

---

## aitattoogenerator 项目初始化状态

| 步骤 | 课程要求 | 项目实际 | 状态 |
|------|----------|----------|------|
| 01 | 创建 GitHub 仓库 | 已创建 | ✅ |
| 02 | 创建 Next.js 项目 | 已创建 | ✅ |
| 03 | 接入 Tailwind | Tailwind v4 已接入 | ✅ |
| 04 | 配置 TypeScript | 已配置 | ✅ |
| 05 | 配置 Workers | wrangler.toml 已配置 | ✅ |
| 06 | 确认本地能运行 | `pnpm dev` 正常 | ✅ |
| 07 | 确认构建能通过 | `pnpm build` 成功 | ✅ |
| 08 | 第一次 commit | 已提交 | ✅ |

**结论**：项目 8 步初始化全部完成，工程地基稳固。

---

## 快速执行

```bash
# 01. 创建 GitHub 仓库（手动在 GitHub Dashboard 操作）

# 02. 创建 Next.js 项目
npx create-next-app@latest my-project --typescript

# 03. 接入 Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 04. TypeScript（脚手架已包含，验证即可）
npx tsc --noEmit

# 05. 配置 Workers
# 创建 wrangler.toml
cat > wrangler.toml << 'EOF'
name = "my-project"
compatibility_date = "2026-05-30"
compatibility_flags = ["nodejs_compat"]
EOF

# 06. 确认本地能运行
pnpm dev
# 访问 http://localhost:3000

# 07. 确认构建能通过
pnpm build

# 08. 第一次 commit
git add .
git commit -m "chore: initialize project with Next.js + Tailwind + TypeScript"
git push origin main
```

---

## 8 步全过检查清单

- [ ] 01. GitHub 仓库已创建
- [ ] 02. Next.js 项目已初始化
- [ ] 03. Tailwind 已配置
- [ ] 04. TypeScript 已验证
- [ ] 05. Workers 已配置
- [ ] 06. `pnpm dev` 本地运行正常
- [ ] 07. `pnpm build` 构建成功
- [ ] 08. 第一次 commit 已推送

**全部通过 → 可以开始页面开发**
