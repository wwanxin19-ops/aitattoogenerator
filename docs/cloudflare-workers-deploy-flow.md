# Cloudflare Workers 部署流程

> 对应课程第47页 | 部署不是点一下 Deploy，而是一组动作

## 核心原则

部署不是单点操作，是8步动作链。Cloudflare 会接管构建、部署、预览、域名和运行环境。

## 部署流程（8步）

### 1. 连接 GitHub
- 授权 Cloudflare 访问你的 GitHub 账号
- 路径：Cloudflare Dashboard → Workers & Pages → 创建项目 → 连接 GitHub

### 2. 选择仓库
- 从 Your Repositories 列表中选择目标仓库
- 当前项目：`wwanxin19-ops/aitattoogenerator`

### 3. 配置构建命令
```bash
# Build command
npm install
npm run build
npx wrangler deploy
```
- 设置构建命令和输出目录
- 输出目录通常为 `.vercel/output/static` 或 `dist`

### 4. 配置环境变量
| 变量名 | 用途 | 示例值 |
|--------|------|--------|
| `NEXT_PUBLIC_SITE_URL` | 站点URL | `https://aitattoogenerator.cc` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity ID | `xxxxxxxxxx` |
| `API_BASE_URL` | API基础路径 | `/api` |

**安全规则**：环境变量在 Cloudflare Dashboard 配置，禁止硬编码到代码中。

### 5. 触发构建
Cloudflare 拉取代码后开始构建：
1. Install dependencies
2. Lint & type check
3. Build application
4. Upload assets

### 6. Worker 部署成功
- 部署到全球边缘节点运行就绪
- 状态显示为 "Active"

### 7. 打开临时地址预览
- 获得 `*.workers.dev` 临时地址
- 示例：`https://ai-tool-site-abc123.workers.dev`
- 检查页面效果、功能、响应式

### 8. 绑定正式域名
- 绑定自定义域名
- 启用 HTTPS（自动）
- 当前域名：`aitattoogenerator.cc`

## 当前项目部署状态

| 检查项 | 状态 | 备注 |
|--------|------|------|
| GitHub 连接 | ✅ | 已授权 |
| 仓库选择 | ✅ | `wwanxin19-ops/aitattoogenerator` |
| 构建命令 | ⚠️ | 需确认 `npm run build` + `npx wrangler deploy` |
| 环境变量 | ⚠️ | 需在 Dashboard 配置 NEXT_PUBLIC_* |
| 自动构建 | ⚠️ | Git push 触发，待测试 |
| 临时地址 | ⏳ | 部署成功后获得 |
| 正式域名 | ⏳ | `aitattoogenerator.cc` 待绑定 |

## 与部署前检查的衔接

```
第46页「部署前检查」→ 第47页「部署流程」
     10项检查通过              8步动作执行
           ↓                        ↓
    确认项目能部署          实际执行部署
           ↓                        ↓
    避免脏部署              完成上线闭环
```

## 常见问题

**Q: 构建失败怎么办？**
- 检查环境变量是否配置完整
- 检查构建命令是否正确
- 检查 `wrangler.toml` 是否存在

**Q: 环境变量在哪里配置？**
- Cloudflare Dashboard → Workers & Pages → 项目 → Settings → Environment Variables
- 或使用 `wrangler secret put KEY_NAME`

**Q: 临时地址和正式域名有什么区别？**
- 临时地址：`*.workers.dev`，用于预览测试
- 正式域名：自定义域名，用于生产环境

## 相关文档

- [[pre-deploy-checklist]] — 部署前检查清单（10项）
- [[pages-vs-workers]] — Cloudflare Pages vs Workers 区别
- [[why-cloudflare]] — 选择 Cloudflare 的9个理由
