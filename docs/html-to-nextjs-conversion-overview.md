# 代码落地：HTML 变 Next.js 页面

**来源**: 网站前端开发实战课程 — 第五部分
**用途**: 静态 HTML 到 Next.js 工程的完整转换流程

---

## 核心原则

> **从静态页面，进入可维护、可复用的前端工程**

---

## 转换链路

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   静态 HTML 页面 │ →  │   代码转换引擎   │ →  │   Next.js 页面  │
│   index.html    │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 代码转换引擎（三步）

| 步骤 | 内容 | 产出 |
|------|------|------|
| **1. HTML 解析** | 解析静态 HTML 结构 | 提取页面元素和样式 |
| **2. React 组件拆分** | 拆分为可复用组件 | Header、Hero、FAQ、Footer |
| **3. Next.js 路由映射** | 映射到 Next.js 路由 | 页面与 URL 对应关系 |

---

## 完整落地流程

```
1. 项目初始化（8步闭环）
   ↓
2. 理解目录结构（5核心项：app/components/public/wrangler/env）
   ↓
3. 路由规划（文件夹→URL映射）
   ↓
4. HTML 解析（提取结构和样式）
   ↓
5. React 组件拆分（Header/Hero/FAQ/Footer）
   ↓
6. Next.js 路由页面映射
   ↓
7. 构建验证（npm run build）
   ↓
8. 部署（git push → Cloudflare 自动部署）
```

---

## 静态 HTML vs Next.js 工程

| 维度 | 静态 HTML | Next.js 工程 |
|------|-----------|-------------|
| **代码组织** | 整页代码在一起 | 组件化拆分 |
| **样式管理** | 内联或分散 | Tailwind 统一规范 |
| **路由管理** | 手动管理 | 文件系统自动路由 |
| **复用性** | 难复用 | 组件可复用 |
| **可维护性** | 难维护 | 结构清晰易维护 |
| **部署方式** | 静态文件上传 | 自动构建部署 |

---

## 与已有文档的关系

| 已有文档 | 作用 |
|----------|------|
| `project-initialization-8-steps.md` | 第1步：项目初始化 |
| `project-directory-structure.md` | 第2步：理解目录结构 |
| `routing-planning-checklist.md` | 第3步：路由规划 |
| `html-to-react-splitting.md` | 第4-5步：HTML解析与组件拆分 |
| `public-component-splitting.md` | 第5步：公共组件拆分策略 |
| `routing.md` | 第6步：路由映射 |
| `frontend-build-deployment-overview.md` | 第7-8步：构建与部署 |

---

## 输出结构示例

```
app/
├── layout.tsx              # 全局布局（整体骨架）
├── page.tsx                # 首页
├── generator/
│   └── page.tsx            # 生成器页面
└── cookie-policy/
    └── page.tsx            # Cookie Policy

components/
├── NavBar.tsx              # 导航栏（Header）
├── Footer.tsx              # 页脚
├── Hero.tsx                # 首屏
├── FAQ.tsx                 # 常见问题
└── ui/                     # 基础 UI 组件
    ├── Button.tsx
    └── Card.tsx

public/
├── favicon.ico
└── og-image.png
```

---

## 快速检查清单

- [ ] 项目初始化 8 步完成
- [ ] 理解目录结构（5 核心项）
- [ ] 路由规划完成（文件夹→URL 映射）
- [ ] HTML 结构已解析
- [ ] 组件拆分完成（Header/Hero/FAQ/Footer）
- [ ] 路由映射完成
- [ ] `npm run build` 通过
- [ ] `git push` 后自动部署成功
