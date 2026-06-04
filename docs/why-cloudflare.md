# 为什么本课选择 Cloudflare

> 基于课程第44页，因为我们希望域名、DNS、部署、邮箱、边缘 API 在同一个体系里管理。

## 选择 Cloudflare 的原因

**核心需求**：统一管理做站矩阵

- 域名、DNS、部署、邮箱、边缘 API 在一个平台
- 减少多平台切换和管理成本
- 适合批量运营多个站点

## Cloudflare 做站体系（9大能力）

| 模块 | 功能 | 当前项目应用 |
|------|------|-------------|
| **DNS** | 全球智能 DNS，快速解析 | 域名解析管理 |
| **CDN** | 全球边缘加速 | 静态资源加速 |
| **Workers** | 无服务器运行环境 | API 网关部署 |
| **静态资源** | 全球边缘缓存 | 构建产物缓存 |
| **HTTPS** | 自动 SSL/TLS | 自动证书 |
| **后续 API 能力** | 可扩展 API 接口 | 待接入数据库 |
| **多站点矩阵** | 统一管理多个站点 | 未来扩展 |
| **Email Routing** | 自定义邮箱收信 | 待设置联系邮箱 |
| **边缘运行** | 靠近用户的边缘节点 | 低延迟响应 |

## 与 Vercel 对比

| 维度 | Cloudflare | Vercel |
|------|-----------|--------|
| Next.js 部署 | ✅ Pages | ✅ 原生支持 |
| 域名管理 | ✅ 内置 DNS | ❌ 需外部 |
| CDN | ✅ 全球边缘 | ✅ Edge Network |
| API 运行 | ✅ Workers | ✅ Serverless |
| 邮箱 | ✅ Email Routing | ❌ 不支持 |
| 多站点管理 | ✅ 统一面板 | ⚠️ 团队功能 |
| 免费额度 |  generous | generous |

**结论**：
- Vercel 很适合 Next.js 快速部署
- Cloudflare 更适合统一管理做站矩阵

## 当前项目应用

### 已使用
- [x] DNS：域名解析
- [x] CDN：静态资源加速
- [x] Workers：API 网关
- [x] 静态资源：边缘缓存
- [x] HTTPS：自动 SSL

### 待使用
- [ ] Email Routing：设置 contact@aitattoogenerator.cc
- [ ] 多站点矩阵：统一管理多个项目
- [ ] 后续 API 能力：数据库连接

## 统一管理优势

**单平台操作**：
```
Cloudflare Dashboard
├── 域名管理
├── DNS 记录
├── Pages 部署
├── Workers API
├── Email Routing
├── 分析监控
└── 安全设置
```

**减少切换成本**：
- 不用在域名商、DNS 商、部署平台之间切换
- 统一账单和权限管理
- 统一监控和告警

## 核心原则

> **Vercel 很适合 Next.js 快速部署；本课选择 Cloudflare，是为了统一管理做站矩阵。**
