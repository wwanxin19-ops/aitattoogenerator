# 页面结构分析文档

## 目标

把静态 HTML 页面落成 Next.js 工程时，先识别页面布局、层级关系和可复用区块，再写组件。避免简单复制粘贴，保证页面可维护、可复用、可部署。

## 全站公共结构

```txt
app/layout.tsx
├── NavBar               components/NavBar.tsx
├── page content          app/**/page.tsx
└── Footer               components/Footer.tsx
```

## 公共组件

- `NavBar`：全站导航、移动端菜单、登录入口。
- `Footer`：全站页脚、法律页链接、核心站内链接。
- `SiteChrome`：保留兼容入口，re-export `NavBar` 和 `Footer`。
- `Shared`：复用展示区块或 UI 辅助组件。
- `GeneratorForm`：生成器核心交互组件。
- `AuthButton`：认证态入口。
- `Billing`：支付与账单相关展示。

## 页面结构映射

### `/` 首页

```txt
Home Page
├── NavBar
├── Hero / main value proposition
├── Product intro / use cases
├── Style or placement preview sections
├── CTA to /ai-tattoo-generator
├── FAQ / trust copy [待确认]
└── Footer
```

结构要求：
- 首页优先承载核心价值、入口 CTA、SEO 内链。
- Hero、FAQ、CTA 后续应优先抽成可复用组件。

### `/ai-tattoo-generator` 生成器页

```txt
Generator Page
├── NavBar
├── Page hero / instructions
├── GeneratorForm
├── safety / reference disclaimer
└── Footer
```

结构要求：
- 交互组件与页面文案分离。
- 表单状态、错误态、loading 态必须在组件内闭环。

### `/pricing` 定价页

```txt
Pricing Page
├── NavBar
├── Pricing hero
├── Plan cards / credit packages
├── Billing CTA
├── trust / disclaimer copy
└── Footer
```

结构要求：
- 支付 CTA 不等同于发放 credits。
- 支付成功必须依赖后端确认或 webhook 状态，不可仅依赖 redirect。

### `/styles/realism` 与 `/styles/minimalist`

```txt
Style Detail Page
├── NavBar
├── Style hero
├── Example visual asset
├── Prompt / usage guidance
├── Internal links to generator and related pages
└── Footer
```

结构要求：
- 风格页属于 SEO/内链页，必须保持 canonical、sitemap 和 footer/nav 链接一致。
- 图片资源必须使用统一命名和路径规范。

### `/body-parts/arm`

```txt
Body Part Page
├── NavBar
├── Placement hero
├── Placement example visual asset
├── safety / artist consultation copy
├── CTA to generator
└── Footer
```

结构要求：
- 部位页强调 placement-aware preview。
- 安全免责声明必须清晰可见。

### 法律页 `/privacy` `/terms` `/cookie-policy`

```txt
Legal Page
├── NavBar
├── Legal content heading
├── Legal content sections
└── Footer
```

结构要求：
- 法律页必须从 Footer 可达。
- 法律页进入 sitemap，除非明确 noindex。

### Dashboard / Billing 页面

```txt
Dashboard Page
├── NavBar
├── auth-aware content
├── credits / usage / billing modules
└── Footer
```

结构要求：
- 未登录时显示引导或登录入口，不能空白。
- API 不可用时显示错误态，不可导致页面崩溃。

## HTML → React 拆分原则

核心规则：禁止把整页 HTML 直接塞进一个 React 组件。短期看起来快，长期会导致重复代码、结构混乱、难维护，并且 Header / Footer 无法统一。

固定拆分链路：

```txt
页面结构识别 → 路由映射 → 区块拆分 → 公共组件抽离 → 页面组合 → 构建验证
```

1. 先按语义结构拆：`header`、`main`、`section`、`footer`。
2. 再按区块职责拆：`Header`、`Hero`、`FeatureGrid`、`FAQSection`、`CTA`、`Footer` 等。
3. 再按复用频率拆：全站重复区块优先组件化，多个页面相似结构优先模板化/数据驱动。
4. 最后按交互边界拆：有 state/event/loading/error 的区块单独做 Client Component。
5. 文案和链接能数据化就放入 `lib/constants.ts` 或独立数据文件。
6. 页面文件 `app/**/page.tsx` 只负责组合，复杂逻辑下沉到组件或 lib。
7. Header / Footer 必须只有一个统一来源，不允许每个页面复制一份。

## 公共组件拆分原则

组件化不是炫技，是减少重复、方便维护。新增页面前，必须先建立公共组件候选清单，再写 `app/**/page.tsx`。

固定判断顺序：

```txt
重复出现 → 未来复用 → 复杂交互 → 追踪组件 → Header / Footer 强制复用
```

1. 重复出现：同一区块出现 2 次以上就考虑拆组件。
2. 未来复用：后续页面也会用到的区块提前设计成组件。
3. 复杂交互：逻辑多、状态多、事件多的区域单独封装。
4. 追踪组件：埋点、事件统一管理，不散落在页面文件中。
5. Header / Footer：必须复用，保证站点一致性与 SEO。

公共组件库维护见 `docs/component-library.md`。

## 后续优化候选

- 抽离 `Hero`、`FAQ`、`CTASection`、`LegalPageShell`。
- 将风格页和部位页改成数据驱动模板。
- 自动从路由数据生成 sitemap 和 footer 内链，减少手工遗漏。
