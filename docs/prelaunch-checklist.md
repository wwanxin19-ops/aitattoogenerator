# 开工前准备清单

**对应课程**：第15页 — 开工前准备清单
**文档目的**：确保开工前所有账号和材料齐备，避免实操中断

---

## 核心原则

```
少一个账号或材料，现场实操就会卡住
```

金句：

```
准备充分，实操才不会中断。
```

---

## 账号类检查清单（6项）

| 序号 | 账号 | 用途 | 状态 | 检查方式 |
|------|------|------|------|---------|
| 1 | GitHub | 代码仓库、CI/CD | 待确认 | `gh auth status` |
| 2 | Cloudflare | Pages部署、Workers、DNS | 待确认 | `wrangler whoami` |
| 3 | Google | OAuth登录、GA4分析 | 待确认 | 检查 OAuth Client ID |
| 4 | Microsoft Clarity | 用户行为热力图 | 待确认 | 检查 Clarity Project ID |
| 5 | Plausible / GA4 | 网站访问分析 | 待确认 | 检查追踪ID |
| 6 | 域名注册平台 | 域名管理、DNS配置 | 待确认 | `whois domain.com` |

---

## 材料类检查清单（12项）

| 序号 | 材料 | 用途 | 状态 | 检查方式 |
|------|------|------|------|---------|
| 1 | PRD | 产品需求文档 | 待确认 | 文件存在且已freeze |
| 2 | Stitch 交付包 | 设计稿、HTML、截图 | 待确认 | 10项核验清单通过 |
| 3 | 页面 HTML | 静态页面源码 | 待确认 | 每页有对应HTML文件 |
| 4 | 页面截图 | 视觉验收依据 | 待确认 | 每页有screen.png |
| 5 | assets | 图片、图标、字体 | 待确认 | 资源文件夹非空 |
| 6 | DESIGN.md | 设计规范文档 | 待确认 | 颜色/字体/间距token |
| 7 | 项目名称 | 仓库名、站点标题 | 待确认 | 已确定 |
| 8 | 目标域名 | 生产环境域名 | 待确认 | 已注册且可解析 |
| 9 | 联系邮箱 | 联系入口、邮件服务 | 待确认 | 有效邮箱地址 |
| 10 | 追踪 ID | GA4/Plausible埋点 | 待确认 | 格式如 G-XXXXXXXXXX |
| 11 | API 接入方式 | 后端接口约定 | 待确认 | 有API文档或Swagger |
| 12 | SEO Copy | 标题、描述、关键词 | 待确认 | 每页有meta文案 |

---

## aitattoogenerator 当前状态

### 账号类

| 账号 | 状态 | 备注 |
|------|------|------|
| GitHub | ✅ | wwanxin19-ops/aitattoogenerator |
| Cloudflare | ✅ | Pages + Workers 已配置 |
| Google | ⚠️ | OAuth已接入，GA4未配置 |
| Microsoft Clarity | ❌ | 未配置 |
| Plausible / GA4 | ❌ | 未配置 |
| 域名注册平台 | ✅ | aitattoogenerator.cc 已注册 |

### 材料类

| 材料 | 状态 | 备注 |
|------|------|------|
| PRD | ⚠️ | 有基础PRD，需确认是否freeze |
| Stitch 交付包 | ⚠️ | 已核验：4项通过/4项不通过/2项警告 |
| 页面 HTML | ⚠️ | 部分页面有HTML，需补全 |
| 页面截图 | ❌ | Stitch包中截图缺失 |
| assets | ❌ | Stitch包中assets为空 |
| DESIGN.md | ❌ | 未提供 |
| 项目名称 | ✅ | AI Tattoo Generator |
| 目标域名 | ✅ | aitattoogenerator.cc |
| 联系邮箱 | ❌ | 未确认 |
| 追踪 ID | ❌ | GA4/Plausible未配置 |
| API 接入方式 | ✅ | 已对接Worker API |
| SEO Copy | ⚠️ | 部分页面有，需补全 |

---

## 开工前必须确认的结论

```
- 账号类：PASS / NEEDS_REVIEW / BLOCKED
- 材料类：PASS / NEEDS_REVIEW / BLOCKED
- Stitch核验：PASS / NEEDS_REVIEW / BLOCKED
- 结论：[可开工] / [BLOCKED] / [NEEDS_REVIEW]
```

---

## 相关文档

- `docs/stitch-handoff-verification-checklist.md` — Stitch交付包10项核验
- `docs/construction-order-checklist.md` — 工程地基4项检查
