# 代码落地阶段排查清单

## 目标

HTML / 设计包落成 Next.js 工程后，页面出现问题不是异常，而是正常排查项。本清单用于把问题从“凭感觉修”变成“按类型逐项定位、修复、验证”。

## 核心原则

1. 先确认问题类型，再改代码。
2. 先修 P0：页面打不开、资源 404、移动端崩掉、核心按钮不可用。
3. 每个问题必须有验证方式，不能只说“应该好了”。
4. Console 报错、404、死链、移动端溢出都必须记录。
5. 关键不是不出问题，而是知道怎么检查。

## 固定排查顺序

### 1. 样式丢失

常见原因：CSS 未正确引入，或类名不生效。

检查：

- [ ] `app/globals.css` 是否被 `app/layout.tsx` 引入。
- [ ] 组件 `className` 是否拼写正确。
- [ ] Tailwind / 全局 CSS / CSS Module 是否与项目配置匹配。
- [ ] 构建后样式是否仍生效，不只看 dev 环境。

验证：

```bash
npm run build
```

### 2. 图片路径错误

常见原因：相对路径不对，或资源未复制。

检查：

- [ ] 公开资源是否放在 `public/` 下。
- [ ] 页面引用是否使用 Next.js 可访问路径，例如 `/images/...`。
- [ ] 文件名大小写是否与引用完全一致。
- [ ] 浏览器 Network / Console 是否有图片 404。

示例错误：

```txt
GET /images/logo.png 404
```

### 3. 字体没有加载

常见原因：字体文件缺失，或引入方式不对。

检查：

- [ ] 字体文件是否真实存在。
- [ ] CSS 中的 `@font-face` 路径是否正确。
- [ ] 字体格式是否与浏览器兼容。
- [ ] 字体加载失败时是否有合理 fallback。

示例错误：

```txt
Font load error: Inter-woff2
```

### 4. 移动端布局崩掉

常见原因：响应式断点或样式冲突。

检查：

- [ ] 1440px / 1280px / 768px / 390px / 360px 视口是否都可用。
- [ ] 页面是否出现横向滚动。
- [ ] 卡片、按钮、图片、表单是否溢出。
- [ ] Header / Footer 在移动端是否拥挤。

关联文档：

```txt
docs/responsive-checklist.md
```

### 5. 页面跳转死链接

常见原因：路由未配置，或链接地址错误。

检查：

- [ ] Header 链接是否可访问。
- [ ] Footer 链接是否可访问。
- [ ] CTA 链接是否指向真实页面。
- [ ] sitemap 是否包含应收录页面，不包含 noindex / 不存在页面。
- [ ] 不得出现 `#`、空 href、404 内链。

关联文档：

```txt
docs/routing.md
```

### 6. Header / Footer 不一致

常见原因：多页面未统一组件。

检查：

- [ ] 全站是否复用 `NavBar`。
- [ ] 全站是否复用 `Footer`。
- [ ] 法律页、SEO 页、工具页的 Header / Footer 是否一致。
- [ ] 不同页面是否复制了多份导航或页脚。

关联文档：

```txt
docs/component-library.md
docs/page-structure.md
```

### 7. 按钮没有真实行为

常见原因：只有样式，没有交互逻辑。

检查：

- [ ] CTA 点击是否跳转到目标页面。
- [ ] 移动端菜单按钮是否能展开 / 关闭。
- [ ] 表单按钮是否提交真实逻辑。
- [ ] 支付按钮是否有 loading / error / unavailable 状态。
- [ ] 登录按钮是否能进入认证流程。

### 8. FAQ 不能展开

常见原因：JS 未执行，或状态未绑定。

检查：

- [ ] FAQ 交互组件是否声明为 Client Component。
- [ ] 展开 / 收起状态是否绑定到正确 item。
- [ ] 点击事件是否触发。
- [ ] 多个 FAQ item 是否有稳定 key。

示例错误：

```txt
Warning: Each child in a list should have a unique "key" prop.
```

### 9. script 不适配 React

常见原因：内联脚本未迁移，或生命周期冲突。

检查：

- [ ] 静态 HTML 中的 inline script 是否已迁移。
- [ ] DOM 操作是否改为 React 状态 / ref / effect。
- [ ] 依赖 `window` / `document` 的逻辑是否只在客户端运行。
- [ ] Server Component 中是否误用了事件处理器。

示例错误：

```txt
TypeError: Cannot read properties of undefined (reading 'map')
```

## Console 必查项

每次页面落地后，至少检查：

- [ ] 图片 / 字体 / 脚本 404。
- [ ] React key warning。
- [ ] undefined / null 读取错误。
- [ ] Hydration mismatch。
- [ ] Client / Server Component 边界错误。

## 验收输出模板

```markdown
# 代码落地排查记录

- 页面：
- 检查时间：
- 检查视口：Desktop / Tablet / Mobile
- 结论：[PASS] / [NEEDS_REVIEW]

## 排查项
- 样式丢失：
- 图片路径错误：
- 字体没有加载：
- 移动端布局：
- 页面跳转死链接：
- Header / Footer 一致性：
- 按钮真实行为：
- FAQ 展开：
- script React 适配：
- Console 错误：

## 证据
- Build：
- Pages build：
- Console 截图 / 日志：
- Desktop 截图：
- Mobile 截图：
```

## 与本项目当前改进的关系

- 新增页面后，必须同时跑 `docs/visual-checklist.md`、`docs/responsive-checklist.md` 和本清单。
- 从 HTML / Stitch 设计包迁移代码时，先按本清单检查基础落地问题，再进入视觉对照验收。
- 任何 `[NEEDS_REVIEW]` 项必须记录具体页面、问题类型、复现方式和修复建议。
