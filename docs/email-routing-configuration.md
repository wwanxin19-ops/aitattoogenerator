# Cloudflare Email Routing 配置指南

> 对应课程第51页 | 早期小站先解决收信问题

## 核心原则

先有正式收信入口，再考虑系统发信能力。Email Routing 适合让网站拥有一个正式联系邮箱。

## Email Routing 工作流

```
用户发送邮件 → hello@aitattoogenerator.cc → Cloudflare Email Routing → 转发到个人 Gmail/Outlook
```

## 能力边界

| 功能 | 支持 | 说明 |
|------|------|------|
| 收信 | ✅ | 收到用户通过表单、联系页面发来的邮件 |
| 转发 | ✅ | 自动转发到指定个人邮箱 |
| 日历 | ❌ | 不提供 |
| 通讯录 | ❌ | 不提供 |
| 共享邮箱 | ❌ | 不提供 |
| SMTP 发信 | ❌ | 不能发送系统邮件、验证码、营销邮件 |

## 配置步骤

### 1. 启用 Email Routing

Cloudflare Dashboard → 域名 → Email → Email Routing → Get Started

### 2. 创建域名邮箱

```
Custom addresses:
- hello@aitattoogenerator.cc → 你的个人邮箱
- contact@aitattoogenerator.cc → 你的个人邮箱
- support@aitattoogenerator.cc → 你的个人邮箱
```

### 3. 验证转发目标

Cloudflare 会发送验证邮件到目标邮箱，点击确认。

### 4. 配置 DNS 记录

Cloudflare 自动添加必要的 MX 记录和 TXT 记录。

### 5. 测试收发

发送测试邮件到 `hello@aitattoogenerator.cc`，确认转发到个人邮箱。

## 系统发信替代方案

Email Routing 不能发信，系统邮件需要第三方服务：

| 服务 | 特点 | 适用场景 |
|------|------|----------|
| Resend | 开发者友好，免费额度高 | 验证码、通知邮件 |
| Postmark | 送达率高，模板支持 | 交易邮件、营销邮件 |
| Amazon SES | 成本低，大规模发送 | 批量邮件、通知 |

**推荐**：与 Workers / API 配合使用，通过 API 调用发送邮件。

## 团队办公升级

需要完整办公能力时（日历、通讯录、共享邮箱）：
- 升级到 Google Workspace
- 或 Microsoft 365

## 当前项目配置状态

| 配置项 | 状态 | 下一步 |
|--------|------|--------|
| Email Routing 启用 | ⏳ | Cloudflare Dashboard 开启 |
| 域名邮箱创建 | ⏳ | 创建 hello@aitattoogenerator.cc |
| 转发目标配置 | ⏳ | 绑定个人 Gmail/Outlook |
| DNS 记录 | ⏳ | 自动添加 MX/TXT |
| 联系表单接入 | ⏳ | 表单提交发送到域名邮箱 |
| 系统发信方案 | ⏳ | 后续选定 Resend/Postmark |

## 常见问题

**Q: Email Routing 收费吗？**
- Cloudflare Email Routing 免费

**Q: 可以创建多少个域名邮箱？**
- 免费版通常支持 200 个自定义地址

**Q: 转发到多个邮箱可以吗？**
- 可以，一个域名邮箱可转发到多个目标邮箱

**Q: 为什么收不到验证邮件？**
- 检查垃圾邮件文件夹
- 确认目标邮箱地址正确

## 相关文档

- [[dns-https-configuration]] — DNS 和 HTTPS 配置
- [[domain-dns-email-final-acceptance]] — 第十部分总览：域名、DNS、邮箱和总验收
