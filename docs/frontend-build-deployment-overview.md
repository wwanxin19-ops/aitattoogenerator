# 前端页面构建与 Cloudflare Workers 部署

**来源**: 网站前端开发实战课程 — 第四部分
**用途**: 前端页面构建到部署的完整流程框架

---

## 部分定位

```
第三部分：交付包核验 → 第四部分：前端构建与部署 → 第五部分：上线验收
```

---

## 四大步骤

| 步骤 | 内容 | 产出 |
|------|------|------|
| **01** | 设计交付包还原页面 | 静态页面还原 |
| **02** | 前端工程化构建 | 组件化、资源处理、样式规范 |
| **03** | 生成可上线的前端站点 | 构建产物、优化、验证 |
| **04** | 部署到 Workers | Cloudflare Workers 线上部署 |

---

## 核心主题：工程地基

> **先搭一个能跑、能提交、能部署的工程地基**

### 工程地基三要素

| 要素 | 内容 | 检查命令 |
|------|------|----------|
| **开发环境** | 本地运行 | `pnpm dev` → `localhost:3000` |
| **版本管理** | 分支 / 提交 / 合并 | `git status` / `git log` |
| **持续部署** | 一键部署到 Workers | `git push` → 自动部署 |

### 输入输出链路

```
Stitch 交付包 → Next.js 项目 → GitHub 仓库 → Cloudflare Workers
```

---

## 工程地基检查清单

### 开发环境
- [ ] `pnpm dev` 能正常启动
- [ ] 本地访问 `localhost:3000` 正常
- [ ] 热重载（HMR）工作正常
- [ ] 构建无错误 `npm run build`

### 版本管理
- [ ] Git 仓库已初始化
- [ ] GitHub remote 已配置
- [ ] 分支策略已确定（main / develop）
- [ ] 第一次 commit 已完成
- [ ] 提交信息规范（conventional commits）

### 持续部署
- [ ] Cloudflare Pages/Workers 项目已创建
- [ ] GitHub Actions 或自动部署已配置
- [ ] `git push` 触发自动部署
- [ ] 部署后线上可访问
- [ ] 自定义域名已绑定（如有）

---

## 与已有文档的关系

| 本文档 | 对应项目文档 |
|--------|-------------|
| 工程地基三要素 | `docs/construction-order-checklist.md` |
| 开发环境 | `docs/construction-order-checklist.md#开发环境` |
| 版本管理 | `docs/construction-order-checklist.md#GitHub仓库与版本管理` |
| 持续部署 | `docs/construction-order-checklist.md#部署流水线` |

---

## 快速启动

```bash
# 1. 开发环境
pnpm dev

# 2. 版本管理
git add .
git commit -m "feat: ..."
git push origin main

# 3. 持续部署（自动触发）
# git push 后 Cloudflare Pages 自动构建部署
```
