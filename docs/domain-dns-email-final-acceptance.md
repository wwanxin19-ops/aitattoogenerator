# 域名、DNS、邮箱和总验收

> 对应课程第十部分总览 | 从临时地址，变成真正可交付的网站入口

## 核心原则

总验收是交付前的最后一道关卡。10项全部通过，网站才能真正上线交付。

## 四大模块

### 1. 自定义域名
- **作用**：品牌标识、用户信任、专业形象
- **当前项目**：`aitattoogenerator.cc`
- **配置路径**：Cloudflare Dashboard → Workers & Pages → 项目 → Custom Domains

### 2. DNS 解析
- **作用**：将域名指向正确的服务
- **配置方式**：
  - Cloudflare DNS：自动管理（推荐）
  - 外部 DNS：手动添加 CNAME 记录指向 Workers

### 3. HTTPS 加密
- **作用**：安全访问，提升信任
- **特点**：Cloudflare 自动提供，无需额外配置
- **证书**：自动签发和续期

### 4. Email Routing
- **作用**：专业邮箱收信，提升可信度
- **示例**：`contact@aitattoogenerator.cc`
- **配置路径**：Cloudflare Dashboard → Email → Email Routing

## 总验收清单（10项）

| # | 检查项 | 验证方法 | 状态 |
|---|--------|----------|------|
| 1 | 域名可访问 | 浏览器访问 `aitattoogenerator.cc` | ⏳ |
| 2 | DNS解析生效 | `dig aitattoogenerator.cc` 或 `nslookup` | ⏳ |
| 3 | HTTPS正常 | 地址栏显示 🔒 锁图标 | ⏳ |
| 4 | 网站内容完整 | 检查所有页面内容是否完整 | ⏳ |
| 5 | 页面路由可访问 | 测试所有路由 `/`, `/generate`, `/about`, `/contact`, `/privacy`, `/terms`, `/cookie-policy` | ⏳ |
| 6 | 表单和链接正常 | CTA 按钮、导航链接、表单提交 | ⏳ |
| 7 | 追踪数据正常 | GA4、Clarity、Plausible 数据接收 | ⏳ |
| 8 | 邮箱可正常收信 | 联系表单邮件送达测试 | ⏳ |
| 9 | 移动端体验正常 | 响应式检查 | ⏳ |
| 10 | 整体功能验收通过 | 全部通过 = 可交付 | ⏳ |

## 当前项目状态

| 模块 | 状态 | 下一步 |
|------|------|--------|
| 自定义域名 | ⏳ | Cloudflare Dashboard 绑定 `aitattoogenerator.cc` |
| DNS 解析 | ⏳ | 配置 DNS 记录指向 Workers |
| HTTPS 加密 | ⏳ | Cloudflare 自动提供 |
| Email Routing | ⏳ | 配置 `contact@aitattoogenerator.cc` |

## 验收流程

```
Workers 部署成功
      ↓
绑定自定义域名
      ↓
DNS 解析生效
      ↓
HTTPS 自动启用
      ↓
配置 Email Routing
      ↓
逐项执行总验收清单（10项）
      ↓
全部通过 → 网站交付
```

## 与前面部分的衔接

```
第三部分：交付包核验
      ↓
第四部分：前端页面构建
      ↓
第五部分：代码落地（HTML → Next.js）
      ↓
第六部分：交互补全、链接和 SEO 基础
      ↓
第七部分：API 接入边界
      ↓
第八部分：数据追踪接入
      ↓
第九部分：Cloudflare Workers 部署
      ↓
第十部分：域名、DNS、邮箱和总验收 ← 当前位置
```

## 常见问题

**Q: 域名绑定后多久生效？**
- DNS 传播通常需要 5 分钟到 48 小时
- 可使用 `dig` 或在线 DNS 检查工具验证

**Q: HTTPS 证书需要手动申请吗？**
- Cloudflare 自动签发和续期，无需手动操作

**Q: Email Routing 免费吗？**
- Cloudflare Email Routing 免费版支持收发邮件

## 相关文档

- [[cloudflare-workers-deploy-flow]] — 部署流程（8步）
- [[pre-deploy-checklist]] — 部署前检查清单（10项）
- [[deploy-failure-troubleshooting]] — 部署失败排查指南
