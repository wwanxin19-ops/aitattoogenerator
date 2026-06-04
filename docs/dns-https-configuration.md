# DNS 和 HTTPS 配置指南

> 对应课程第50页 | DNS 告诉互联网去哪里找你

## 核心原则

DNS 不是可选项，是正式访问的基础设施。域名访问、www、HTTPS 跳转都要靠 DNS 和 Cloudflare 配置。

## 请求链路

```
用户浏览器 → DNS 解析 → Cloudflare (CDN/WAF/缓存) → Workers 站点
```

| 步骤 | 环节 | 说明 |
|------|------|------|
| 1 | 用户请求 | 浏览器查询域名，返回 IP 地址 |
| 2 | DNS 解析 | DNS 服务器解析域名到 Cloudflare |
| 3 | Cloudflare | CDN + WAF + 缓存 + 边缘网络 |
| 4 | Workers 站点 | 自定义域名指向 Workers |

## 域名配置

### 根域名 vs www 域名

| 类型 | 示例 | 处理方式 |
|------|------|----------|
| 根域名 | `aitattoogenerator.cc` | 主入口，建议使用 |
| www 域名 | `www.aitattoogenerator.cc` | 可单独配置或跳转到根域名 |

**推荐方案**：根域名为主入口，www 域名 301 跳转到根域名。

### Cloudflare Nameserver 配置

1. 登录域名注册商
2. 修改 Nameserver 为 Cloudflare：
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`
3. 等待 DNS 传播（5 分钟 ~ 48 小时）

### Worker 自定义域名绑定

1. Cloudflare Dashboard → Workers & Pages → 项目
2. Settings → Domains & Routes
3. 添加自定义域名：`aitattoogenerator.cc`
4. 完成 DNS 指向验证

## HTTPS 配置

### SSL/TLS 证书
- Cloudflare 提供免费 SSL 证书
- 大多数情况下自动配置
- 无需手动申请

### HTTP → HTTPS 强制跳转

**必须开启**：避免用户访问非加密地址。

配置路径：
```
Cloudflare Dashboard → SSL/TLS → Edge Certificates → Always Use HTTPS: ON
```

或配置 301 重定向规则：
```
Rules → Page Rules → Create Page Rule
URL: http://*aitattoogenerator.cc/*
Setting: Always Use HTTPS
```

## DNS 传播时间

修改 DNS 后，全球生效需要时间：
- **最快**：5 分钟
- **通常**：1-4 小时
- **最长**：48 小时

验证方法：
```bash
# 查看 DNS 记录
dig aitattoogenerator.cc

# 或
nslookup aitattoogenerator.cc
```

## 当前项目配置状态

| 配置项 | 状态 | 下一步 |
|--------|------|--------|
| 域名已购买 | ✅ | `aitattoogenerator.cc` |
| DNS 托管到 Cloudflare | ⏳ | 修改 Nameserver |
| 根域名指向 Workers | ⏳ | Dashboard 添加自定义域名 |
| www 域名配置 | ⏳ | 设置 301 跳转到根域名 |
| HTTPS 证书 | ⏳ | Cloudflare 自动提供 |
| HTTP→HTTPS 跳转 | ⏳ | 开启 Always Use HTTPS |
| DNS 传播验证 | ⏳ | dig/nslookup 检查 |

## 常见问题

**Q: Nameserver 切换后网站会断吗？**
- 切换期间可能有短暂中断（几分钟）
- 建议在低流量时段操作

**Q: 根域名和 www 都要配置吗？**
- 至少配置一个（建议根域名）
- 另一个建议做 301 跳转，避免 SEO 分散

**Q: HTTPS 证书多久生效？**
- Cloudflare 通常几分钟内自动签发

**Q: DNS 传播怎么加速？**
- 无法加速，只能等待
- 可通过降低 TTL 提前准备

## 相关文档

- [[domain-purchase-selection]] — 域名购买与选择
- [[domain-dns-email-final-acceptance]] — 第十部分总览：域名、DNS、邮箱和总验收
