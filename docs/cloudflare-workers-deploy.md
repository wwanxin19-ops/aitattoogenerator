# Cloudflare Workers 部署

> 基于课程第九部分，从本地工程进入全球边缘运行环境。

## 部署流程（5步）

```
GitHub → 构建 → Workers → 预览 → 自定义域名
```

### Step 1: GitHub（代码仓库）

- [ ] 代码推送到 GitHub main 分支
- [ ] 仓库公开或授权 Cloudflare 访问
- [ ] .gitignore 排除敏感文件

### Step 2: 构建（Next.js 构建输出）

**本地验证**：
```bash
npm run build
npm run pages:build
```

**构建产物**：
- 静态资源（HTML/CSS/JS）
- 服务端产物（API 路由）
- `.vercel/output/static` 目录

### Step 3: Workers（Cloudflare Workers）

**Cloudflare Pages 项目创建**：
1. Cloudflare Dashboard → Pages
2. Create a project → Connect to Git
3. 选择 GitHub 仓库
4. 配置构建设置

**构建设置**：
| 配置项 | 值 |
|--------|-----|
| Framework preset | Next.js (Static) |
| Build command | `npm run pages:build` |
| Build output directory | `.vercel/output/static` |
| Root directory | `/` |

### Step 4: 预览（*.workers.dev）

- [ ] 构建成功后自动部署预览
- [ ] 访问 `*.workers.dev` 预览域名
- [ ] 验证页面功能正常
- [ ] 验证 API 路由正常

### Step 5: 自定义域名（正式上线）

- [ ] 域名 DNS 指向 Cloudflare
- [ ] Custom domains 中添加域名
- [ ] HTTPS 自动配置
- [ ] 正式上线

## Cloudflare Workers 四大优势

### 1. 全球部署
- 智能路由自动选择最近节点
- 边缘缓存加速静态资源
- 全球 300+ 节点覆盖

### 2. 高性能
- 首屏加载时间 < 2s
- API 响应时间 < 500ms
- 边缘计算减少延迟

### 3. 高可用
- 分布式架构无单点故障
- 自动故障转移
- 99.9% SLA 保障

### 4. 安全可靠
- 自动 HTTPS（TLS 1.3）
- DDoS 防护（免费层）
- WAF 规则（可选）

## 环境变量配置

### Cloudflare Pages Environment Variables

| 变量名 | 值 | 环境 |
|--------|-----|------|
| NEXT_PUBLIC_PLAUSIBLE_DOMAIN | aitattoogenerator.cc | Production |
| NEXT_PUBLIC_CLARITY_ID | your_clarity_id | Production |
| NEXT_PUBLIC_GA_ID | G-XXXXXXXXXX | Production |

### 配置路径

Cloudflare Dashboard → Pages → 项目 → Settings → Environment Variables

## 部署检查清单

- [ ] GitHub 代码已推送
- [ ] Cloudflare Pages 项目已创建
- [ ] GitHub 仓库已绑定
- [ ] 构建配置正确
- [ ] 环境变量已设置
- [ ] 构建成功无错误
- [ ] 预览站点可访问
- [ ] 自定义域名已绑定
- [ ] HTTPS 证书有效
- [ ] 正式上线完成

## 构建命令

```bash
# 本地构建验证
npm run build

# Cloudflare Pages 构建
npm run pages:build

# 输出目录
# .vercel/output/static
```

## 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| 构建失败 | 构建命令错误 | 检查 `npm run pages:build` |
| 环境变量缺失 | 未在 Cloudflare 配置 | Dashboard 中添加变量 |
| 自定义域名不生效 | DNS 未指向 Cloudflare | 修改 DNS 记录 |
| API 路由 404 | 输出目录配置错误 | 检查 `.vercel/output/static` |

## 核心原则

> **从本地工程，进入全球边缘运行环境。**

- GitHub 是代码源
- Cloudflare 是部署目标
- Workers 是全球边缘运行环境
- 自定义域名是正式上线
