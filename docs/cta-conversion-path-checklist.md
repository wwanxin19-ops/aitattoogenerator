# CTA 和转化路径验收清单

**对应课程**：第30页 — CTA 和转化路径
**文档目的**：确保每个页面都有明确下一步，CTA 不是死的

---

## 核心原则

```
工具站页面必须有明确下一步
页面要引导用户完成下一步，而不是只有漂亮首屏
```

金句：

```
如果 CTA 是死的，再漂亮也没有转化。
```

---

## 检查清单

### 1. 用户看完页面后知道点哪里

- [ ] 首屏有明确的 Primary CTA
- [ ] CTA 文案清晰（不是模糊的"了解更多"）
- [ ] 每个功能区块都有对应入口

### 2. 每个功能入口都有明确去向

| 入口 | 目标页面 | 状态 |
|------|----------|------|
| 首页 "立即体验" | `/ai-tattoo-generator` | 待确认 |
| 生成完成 "保存/分享" | Dashboard / 下载 | 待确认 |
| Credits 不足 "升级" | `/pricing` | 待确认 |
| Footer "Privacy" | `/privacy` | 待确认 |
| Footer "Terms" | `/terms` | 待确认 |

### 3. CTA 必须指向有效页面

- [ ] 所有按钮都有 `href` 或 `onClick` 行为
- [ ] 没有纯样式按钮（无行为的装饰性按钮）
- [ ] 没有死链（指向 `#` 或 404 的链接）

### 4. Footer 能回到关键页面

- [ ] Footer 包含所有核心页面导航
- [ ] Footer 导航可点击且有效
- [ ] 移动端 Footer 可访问

### 5. 必须有联系入口

- [ ] 有 `/contact` 页面 或 邮件链接
- [ ] 联系入口在导航或 Footer 中可见

---

## aitattoogenerator 当前状态

### 已确认的有效 CTA

```
/ (首页) → "Get Started" → /ai-tattoo-generator
/ai-tattoo-generator → "Generate" → 调用 API
/pricing → 选择套餐 → PayPal 支付
```

### 待确认的转化路径

```
生成完成 → 下一步是什么？
  - 保存到 Dashboard？
  - 直接下载？
  - 分享？
  - 继续生成？

Credits 不足 → 是否引导到 Pricing？
  - 当前行为：直接报错？
  - 期望行为：友好提示 + 引导升级

未登录用户 → 是否引导登录/注册？
  - 当前行为：？
  - 期望行为：生成前检查登录态
```

---

## 验收结论模板

```
- 首页 CTA：PASS / NEEDS_REVIEW
- 功能页 CTA：PASS / NEEDS_REVIEW
- Pricing CTA：PASS / NEEDS_REVIEW
- Footer 导航：PASS / NEEDS_REVIEW
- 联系入口：PASS / NEEDS_REVIEW
- 死链检查：PASS / NEEDS_REVIEW
- 结论：[PASS] / [NEEDS_REVIEW]
```

---

## 相关文档

- `docs/interaction-links-seo-foundation.md` — 交互、链接、SEO、移动端四项总验收
- `docs/interaction-completion-checklist.md` — 交互补全清单
