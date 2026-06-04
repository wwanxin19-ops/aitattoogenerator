# 公共组件库拆分规范

## 目标

页面开发前先拆公共组件，避免把重复区块复制到多个页面。组件化不是炫技，而是为了减少重复、方便维护，并保证后续扩站更轻松。

## 固定链路

```txt
设计交付包 → 公共组件候选清单 → components/ 公共组件库 → app/**/page.tsx 页面组合 → 多页面复用验证
```

## 拆组件原则

1. **重复出现 → 拆组件**
   - 同一区块出现 2 次以上就考虑拆。
   - 不允许多个页面各自复制一份相同结构。

2. **未来复用 → 拆组件**
   - 当前只出现 1 次，但后续页面会用到，也应提前设计成组件。
   - 典型候选：Hero、GuideCard、FAQSection、CTASection。

3. **复杂交互 → 单独拆**
   - 逻辑多、状态多、事件多的区域独立封装。
   - 有 `state`、`event`、`loading`、`error` 的区域优先单独做 Client Component。

4. **追踪组件 → 单独放**
   - 埋点、事件追踪统一管理。
   - 不把追踪逻辑散落在页面文件或多个业务组件中。

5. **Header / Footer 必须复用**
   - 保证站点一致性与 SEO。
   - Header / Footer 只能有一个统一来源，不允许每个页面复制。

## 当前组件库状态

### 已拆公共组件

- `components/NavBar.tsx`
  - 全站导航。
  - 移动端菜单。
  - 登录入口。

- `components/Footer.tsx`
  - 全站页脚。
  - 法律页链接。
  - 核心站内链接。

- `components/SiteChrome.tsx`
  - 兼容入口。
  - re-export `NavBar` 和 `Footer`。

- `components/GeneratorForm.tsx`
  - 生成器核心交互。
  - 表单状态、提交和结果区域。

- `components/AuthButton.tsx`
  - 认证态入口。

- `components/Billing.tsx`
  - 支付与账单相关展示。

- `components/EmailModal.tsx`
  - 邮箱收集弹窗。

- `components/ModalButtons.tsx`
  - 弹窗按钮交互。

- `components/Shared.tsx`
  - 共享展示区块或 UI 辅助组件。

## 后续公共组件候选

以下区块如果在 2 个以上页面出现，优先抽离：

- `HeroSection`
- `FeatureGrid`
- `GuideCard`
- `CodeCard`
- `FAQSection`
- `CTASection`
- `AnalyticsProvider` 或 `AnalyticsTracker`
- `LegalPageShell`
- `PricingCard`
- `EmptyState`
- `ErrorState`

## 页面文件约束

`app/**/page.tsx` 只负责页面组合：

```tsx
export default function Page() {
  return (
    <main>
      <HeroSection />
      <FeatureGrid />
      <FAQSection />
      <CTASection />
    </main>
  );
}
```

页面文件不应该：

- 粘贴整页 HTML。
- 复制 Header / Footer。
- 混入大量追踪逻辑。
- 承载复杂表单状态。
- 重复定义跨页面可复用的数据。

## 新增页面前检查

新增页面前必须先回答：

1. 这个页面有哪些区块？
2. 哪些区块已经在别的页面出现过？
3. 哪些区块未来会复用？
4. 哪些区块有复杂交互？
5. 是否涉及埋点或事件追踪？
6. Header / Footer 是否继续使用统一入口？
7. 页面是否只做组合，没有复制公共区块？

## 验收标准

- Header / Footer 全站统一。
- 出现 2 次以上的区块已进入公共组件候选或已拆组件。
- 页面文件保持薄层组合。
- 复杂交互组件边界清晰。
- 埋点和事件追踪不散落。
- 新组件有清晰命名和单一职责。
