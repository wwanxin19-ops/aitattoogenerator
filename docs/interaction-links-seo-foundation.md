# 交互、链接和 SEO 基础总验收

## 目标

HTML 变 Next.js 页面后，不能只停留在“能看”。上线前必须确认页面：

```txt
能用
能跳转
能被 Google 理解
移动端可用
```

本清单对应课程第六部分：交互补全、链接和 SEO 基础。

## 图片依据

```txt
第六部分
交互补全、链接
和 SEO 基础
从能看，变成能用、能跳转、能被 Google 理解
```

## 1. 交互

图片依据：

```txt
交互
按钮、表单、菜单
弹窗、开关、动效
```

检查：

- [ ] 按钮点击后有真实反馈。
- [ ] 表单可以打开、填写、提交，并有 loading / success / error 状态。
- [ ] 菜单可以打开、关闭、跳转。
- [ ] 弹窗可以打开、关闭，不遮挡关键流程。
- [ ] 开关类控件状态可切换且状态可见。
- [ ] 动效不影响可用性和性能。

关联文档：

- `docs/interaction-completion-checklist.md`
- `docs/code-landing-troubleshooting.md`

## 2. 链接

图片依据：

```txt
链接
内部链接、外部链接
锚点链接、面包屑
```

检查：

- [ ] 内部链接指向真实存在的 Next.js 路由。
- [ ] 外部链接新标签页打开，并设置安全属性。
- [ ] 锚点链接目标 `id` 存在，点击后定位正确。
- [ ] 面包屑层级与当前页面结构一致。
- [ ] Header / Footer / 页面正文不存在空链接、死链、`#` 占位链接。

关联文档：

- `docs/routing.md`
- `docs/component-library.md`

## 3. SEO

图片依据：

```txt
SEO
标题、描述、关键词
结构化数据、Sitemap
```

检查：

- [ ] 每个公开页面有明确标题。
- [ ] 每个公开页面有描述。
- [ ] 关键词与页面主题一致，不堆砌。
- [ ] 需要结构化数据的页面已添加结构化数据。
- [ ] Sitemap 覆盖应该被收录的公开页面。
- [ ] 不应收录的页面不进入 Sitemap。

关联文件：

- `app/sitemap.ts`
- `app/robots.ts`
- `app/layout.tsx`
- 各页面 metadata

## 4. 移动端

图片依据：

```txt
移动端
响应式适配、导航菜单
触控优化、加载优化
```

检查：

- [ ] 主要页面在移动端无横向滚动。
- [ ] 移动端导航菜单可打开、关闭、跳转。
- [ ] 按钮、链接、表单触控区域足够大。
- [ ] 图片、卡片、表单不会溢出。
- [ ] 首屏加载和交互响应不明显卡顿。

关联文档：

- `docs/responsive-checklist.md`
- `docs/visual-checklist.md`

## 5. Sitemap 结构

图片依据：

```txt
/features
/pricing
/docs
/about
Sitemap 让结构更清晰，收录更友好
```

检查：

- [ ] 页面结构清晰，URL 命名可理解。
- [ ] sitemap 中的 URL 都能访问。
- [ ] sitemap 不包含 404、占位页、测试页。
- [ ] 导航、Footer、sitemap 三者的页面集合一致或有明确原因。

## 验收输出模板

```txt
- 页面 / 范围：
- 检查时间：
- 交互：PASS / NEEDS_REVIEW
- 链接：PASS / NEEDS_REVIEW
- SEO：PASS / NEEDS_REVIEW
- 移动端：PASS / NEEDS_REVIEW
- Sitemap：PASS / NEEDS_REVIEW
- 发现问题：
- 修复建议：
- 结论：[PASS] / [NEEDS_REVIEW]
```

## 与现有项目文档的关系

本文件是第六部分总验收入口。执行时按需进入以下细分文档：

- `docs/interaction-completion-checklist.md`：交互补全逐项点击验收。
- `docs/code-landing-troubleshooting.md`：代码落地阶段常见问题排查。
- `docs/routing.md`：路由映射、导航、Footer、sitemap 关系。
- `docs/responsive-checklist.md`：移动端响应式检查。
- `docs/visual-checklist.md`：视觉截图对照验收。
- `docs/image-assets.md`：图片、图标、OG、favicon、字体资源检查。
