# 追踪代码放在哪里

> 基于课程第42页，接入追踪不只是复制 script。本地变量和线上变量都要配置，改完要重新部署。

## 核心原则

> **本地有追踪，不代表线上也有数据。**

## 代码放置位置

### 1. 全局追踪 — layout.tsx / Analytics 组件

**创建 `app/components/Analytics.tsx`**：

```tsx
'use client'

import Script from 'next/script'

export default function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <>
      {/* Plausible */}
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      )}

      {/* Google Analytics */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {clarityId && (
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  )
}
```

**在 `app/layout.tsx` 中引入**：

```tsx
import Analytics from '@/components/Analytics'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
```

### 2. 页面级事件 — 按钮点击处

```tsx
'use client'

export default function CTAButton({ children, location }) {
  const handleClick = () => {
    // Plausible 事件
    if (window.plausible) {
      window.plausible('cta_click', {
        props: { location }
      })
    }

    // GA4 事件
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: location,
      })
    }
  }

  return <button onClick={handleClick}>{children}</button>
}
```

### 3. 生成完成事件

```tsx
const handleGenerate = async () => {
  // ... 生成逻辑

  // 追踪生成完成
  if (window.plausible) {
    window.plausible('generate_complete', {
      props: { style: selectedStyle }
    })
  }

  if (window.gtag) {
    window.gtag('event', 'generate_complete', {
      event_category: 'conversion',
      event_label: selectedStyle,
    })
  }
}
```

## 环境变量配置

### 本地开发 — .env.local

```bash
# Plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=aitattoogenerator.cc

# Microsoft Clarity
NEXT_PUBLIC_CLARITY_ID=your_clarity_project_id

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**注意**：
- `.env.local` 已加入 `.gitignore`
- 仅对本地开发有效
- 不提交到 Git

### 线上环境 — Cloudflare Environment Variables

在 Cloudflare Dashboard → Pages → 项目 → Settings → Environment Variables 配置：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| NEXT_PUBLIC_PLAUSIBLE_DOMAIN | aitattoogenerator.cc | Production |
| NEXT_PUBLIC_CLARITY_ID | abc1234 | Production |
| NEXT_PUBLIC_GA_ID | G-XXXXXXXXXX | Production |

**关键要点**：
- `.env.local` 只对本地有效
- Cloudflare 构建也要配置变量
- 改完变量要重新 build / deploy
- `NEXT_PUBLIC_*` 是公开变量，不放 secret

## TypeScript 类型声明

**文件**：`types/global.d.ts`

```typescript
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
    gtag?: (...args: any[]) => void
    clarity?: (...args: any[]) => void
  }
}

export {}
```

## 部署流程

```
1. 本地配置 .env.local
2. 创建 Analytics.tsx 组件
3. layout.tsx 引入 Analytics
4. 添加事件追踪代码
5. push 到 GitHub
6. Cloudflare 自动构建部署
7. 线上验证追踪数据
```

## 常见错误

| 错误 | 原因 | 解决 |
|------|------|------|
| 线上无追踪数据 | Cloudflare 未配置变量 | 检查 Environment Variables |
| 本地正常线上无 | `.env.local` 未同步 | 线上单独配置 |
| 事件未触发 | `window.plausible` 未加载 | 添加存在性检查 |
| GA4 无数据 | Measurement ID 错误 | 检查 ID 格式 |
| 构建失败 | 变量名拼写错误 | 检查大小写和下划线 |

## 验收标准

- [ ] Analytics.tsx 组件创建完成
- [ ] layout.tsx 正确引入
- [ ] `.env.local` 配置本地变量
- [ ] Cloudflare 配置线上变量
- [ ] 按钮点击事件追踪正常
- [ ] 生成完成事件追踪正常
- [ ] TypeScript 类型声明无报错
- [ ] 本地开发追踪数据正常
- [ ] 线上环境追踪数据正常
- [ ] 网络面板能看到追踪请求

## 核心原则

> **接入追踪，不只是复制 script。**

- 全局追踪放 layout.tsx 或 Analytics 组件
- 页面级事件放按钮点击处
- 本地变量和线上变量都要配置
- 改完变量要重新 build / deploy
- `NEXT_PUBLIC_*` 是公开变量，不放 secret
