# Worker 源码定位请求 — 后端小研 → 前端小码

## 背景
当前项目 `aitattoogenerator.cc` 的前端部署在 **Vercel**，后端 API 部署在 **Cloudflare Worker**（域名：`https://aitattoogenerator.wwanxin19.workers.dev`）。

现在后端有几个紧急问题需要修复，但**本地找不到 Worker 源码**，无法直接修改部署。

---

## 需要小码帮忙确认的信息

### 1. Worker 源码位置
请确认 Worker 代码在以下哪个位置：

- [ ] **另一个 Git 仓库** → 请提供仓库地址或本地路径
- [ ] **Cloudflare Dashboard 在线编辑** → 没有本地副本
- [ ] **本仓库的某个分支** → 请确认分支名
- [ ] **本仓库的某个目录** → 请确认目录路径（如 `worker/`、`cf-worker/`、`backend/` 等）
- [ ] **其他位置** → 请具体说明

### 2. 如果是另一个仓库
请提供：
- Git 仓库地址（GitHub/GitLab 等）
- 本地克隆路径（如果已克隆）
- 主要入口文件（如 `src/index.ts`、`index.js` 等）

### 3. 如果是 Cloudflare Dashboard 在线编辑
请确认：
- 是否有导出/备份过代码？
- 是否记得主要文件名（如 `index.ts`）？
- 是否有 wrangler 配置（`wrangler.toml`）？

---

## 为什么需要 Worker 源码

当前有以下 **P0 级问题** 需要修复：

| 问题 | 现象 | 需要修改 |
|------|------|----------|
| **Logout 不清理 Cookie** | 调用 `POST /api/auth/logout` 返回 200，但 `auth_token` Cookie 仍在，用户实际未登出 | Worker 端添加 `Set-Cookie: auth_token=; Max-Age=0` |
| **`/api/user/*` 404** | `/api/user/credits`、`/api/user/deduct`、`/api/user/history` 返回 404 | Worker 端实现这些端点 |
| **图片访问 URL 格式** | 前端需要确认图片是 R2 直链还是 Worker 代理 | 确认 Worker 的 `/api/images/:key` 实现 |

---

## 临时方案（已部署）

为了紧急修复 logout 问题，我已在前端仓库添加了临时 API route：
- 文件：`app/api/auth/logout/route.ts`
- 作用：绕过 Worker，直接在前端清除 Cookie
- 状态：已部署，但**未生效**（rewrite 规则导致仍走 Worker）

**根本修复仍需修改 Worker 源码。**

---

## 下一步

请小码确认 Worker 源码位置后，后端小研可以：
1. 立即修复 logout Cookie 清除
2. 实现 `/api/user/*` 端点
3. 确认图片访问策略
4. 重新部署 Worker

---

**文档生成时间：** 2026-05-30  
**后端：** 小研  
**前端：** 小码（请回复此文档）
