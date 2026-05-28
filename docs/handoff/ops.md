# 小运 — Ops 交接文档

## 项目概述
AI Tattoo Generator 网站已部署至生产环境，以下是运维相关信息。

## 基础设施

### 托管平台
- **平台**: Vercel
- **计划**: Hobby (免费) / 可升级 Pro
- **区域**: 自动 (全球 CDN)
- **域名**: aitattoogenerator.cc

### DNS 配置
```
aitattoogenerator.cc CNAME cname.vercel-dns.com
```

### SSL/TLS
- ✅ 自动证书 (Let's Encrypt)
- ✅ HTTPS 强制跳转
- ✅ HSTS 启用

---

## 部署流程

### 自动部署
1. 代码推送到 GitHub `main` 分支
2. Vercel 自动触发构建
3. 构建成功后自动部署
4. 无停机时间

### 手动部署
```bash
# 本地构建测试
npm run build

# 推送触发部署
git push origin main
```

### 部署配置 (vercel.json)
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "npm ci --registry=https://registry.npmjs.org",
  "buildCommand": "npm run build"
}
```

---

## 环境变量

### 必需变量
| 变量名 | 用途 | 当前状态 |
|--------|------|----------|
| `SUPABASE_URL` | 数据库连接 | ✅ 已配置 |
| `SUPABASE_SERVICE_ROLE_KEY` | 数据库密钥 | ✅ 已配置 |

### 可选变量
| 变量名 | 用途 | 当前状态 |
|--------|------|----------|
| `NEXT_PUBLIC_GA_ID` | GA4 追踪 | ❌ 未配置 |
| `WAITLIST_RATE_LIMIT_PER_HOUR` | 限流阈值 | ✅ 默认 5 |

### 配置位置
Vercel Dashboard → Project Settings → Environment Variables

---

## 监控与日志

### Vercel 监控
- **Analytics**: Vercel 内置 (需 Pro 计划)
- **Logs**: Vercel Dashboard → Logs
- **Errors**: 自动捕获 500 错误

### 建议添加
- [ ] Uptime 监控 (UptimeRobot/Pingdom)
- [ ] 性能监控 (Sentry)
- [ ] 日志聚合 (LogDNA/Datadog)

---

## 备份与恢复

### 数据库 (Supabase)
- **自动备份**: Supabase 每日自动备份
- **手动备份**: Supabase Dashboard → Database → Backups
- **导出**: 使用 `pg_dump` 或 Supabase CLI

### 代码
- **仓库**: GitHub (主分支保护建议开启)
- **历史**: Git 历史完整保留

---

## 扩展计划

### 短期
- [ ] 升级 Vercel Pro (如需更多带宽/功能)
- [ ] 配置 GA4 环境变量
- [ ] 添加自定义域名邮箱

### 中期
- [ ] 考虑多区域部署
- [ ] 添加 CDN 图片优化
- [ ] 配置 Edge Functions

### 长期
- [ ] 考虑迁移到自有服务器 (如需)
- [ ] 添加负载均衡
- [ ] 数据库读写分离

---

## 安全清单

### 已完成
- ✅ HTTPS 强制
- ✅ HSTS 头部
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-XSS-Protection: 1; mode=block`

### 建议添加
- [ ] Content Security Policy (CSP)
- [ ] Referrer-Policy
- [ ] Permissions-Policy

---

## 成本估算

### 当前 (Hobby 计划)
- **Vercel**: $0/月
- **Supabase**: $0/月 (免费额度)
- **域名**: ~$10/年
- **总计**: ~$10/年

### 升级后 (Pro 计划)
- **Vercel Pro**: $20/月
- **Supabase Pro**: $25/月
- **总计**: ~$45/月

---

## 紧急联系

### 故障排查
1. 检查 Vercel Status: https://www.vercel-status.com
2. 检查 Supabase Status: https://status.supabase.com
3. 查看 Vercel Logs

### 回滚
```bash
# 回滚到上一版本
git revert HEAD
git push origin main
```

---

## 资源链接
- **生产环境**: https://aitattoogenerator.cc
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard
- **GitHub 仓库**: https://github.com/wwanxin19-ops/aitattoogenerator
