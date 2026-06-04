# GitHub 的作用与 Git 工作流规范

**来源**: 网站前端开发实战课程 — 第21页
**用途**: GitHub 在前端工程中的定位与标准 Git 工作流

---

## 核心原则

> **GitHub 不只是放代码，它是自动部署入口**
>
> **本地能跑只是开发状态，进入仓库才接近交付**

### 金句

> **"代码不进仓库，就还没有进入可交付状态。"**

---

## GitHub 三大作用

| 作用 | 说明 | 价值 |
|------|------|------|
| **1. 托管代码** | 换电脑、换人、换 AI Agent 都能继续 | 不依赖本地环境 |
| **2. 记录变更** | 每次 commit 可以回滚 | 可追溯、可恢复 |
| **3. 连接部署** | push 后 Cloudflare 自动构建部署 | 自动化、零手动 |

---

## 完整部署链路

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│   本地项目   │ →  │   GitHub    │ →  │  Cloudflare     │ →  │   线上网站   │
│   开发中    │     │   代码仓库   │     │  Workers 自动构建 │     │  全球可访问  │
└─────────────┘     └─────────────┘     └─────────────────┘     └─────────────┘
      1                    2                    3                      4
```

---

## Git 工作流规范

### 提交频率

| 场景 | 操作 |
|------|------|
| 每完成一个功能 | `git commit` |
| 每修复一个 bug | `git commit` |
| 每天结束工作前 | `git push` |
| 重要里程碑 | `git tag` |

### 提交信息规范（Conventional Commits）

| 前缀 | 用途 | 示例 |
|------|------|------|
| `feat:` | 新功能 | `feat: add tattoo generator page` |
| `fix:` | 修复 | `fix: correct footer link` |
| `docs:` | 文档 | `docs: add routing guide` |
| `chore:` | 工程化/配置 | `chore: update wrangler.toml` |
| `test:` | 测试 | `test: add smoke test` |
| `refactor:` | 重构 | `refactor: extract NavBar component` |

### 代码状态定义

| 状态 | 说明 | 风险 |
|------|------|------|
| 本地开发中 | 代码只在工作区 | 电脑损坏 = 代码丢失 |
| 已 commit | 代码在本地仓库 | 本地环境出问题 = 代码丢失 |
| 已 push | 代码在远程仓库 | ✅ 可恢复、可协作、可部署 |
| 已部署 | 代码在线上运行 | ✅ 全球可访问 |

**结论**：只有 push 到 GitHub 后，代码才进入"可交付状态"。

---

## 自动部署验证

### 验证 GitHub Actions 配置

```bash
# 查看部署工作流配置
cat .github/workflows/deploy.yml
```

### 验证 Cloudflare Pages 集成

1. 登录 Cloudflare Dashboard
2. 进入 Pages → 项目
3. 确认 Git 集成状态为 "Connected"
4. 确认构建命令和输出目录正确

### 测试自动部署

```bash
# 1. 创建测试提交
git add .
git commit -m "test: verify auto-deploy pipeline"
git push origin main

# 2. 观察 Cloudflare Pages
# - Dashboard 中查看构建状态
# - 等待构建完成
# - 验证线上网站更新
```

---

## 回滚策略

```bash
# 方式1：revert（推荐，保留历史）
git revert HEAD
git push origin main

# 方式2：reset（谨慎使用，会丢失历史）
git reset --hard HEAD~1
git push origin main --force

# 回滚后 Cloudflare 会自动重新部署上一版本
```

---

## 与项目初始化的关系

| 初始化步骤 | GitHub 作用 |
|-----------|------------|
| 01 创建 GitHub 仓库 | 托管代码的基础 |
| 08 第一次 commit | 进入可交付状态的起点 |
| 日常开发 | 持续托管、记录变更、连接部署 |

---

## 快速检查清单

- [ ] GitHub 仓库已创建
- [ ] 本地仓库已连接远程
- [ ] Cloudflare Pages 已与 GitHub 集成
- [ ] push 后自动构建部署正常
- [ ] 提交信息遵循 Conventional Commits
- [ ] 每天结束工作前已 push
- [ ] 知道如何回滚到上一版本
