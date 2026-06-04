# 数据追踪接入方案

> 基于课程第八部分，上线后不只看能不能访问，还要知道有没有人来。

## 核心原则

**网站上线后必须接入数据追踪，否则等于盲飞。**

## 四大追踪工具

| 工具 | 定位 | 核心功能 | 隐私友好 |
|------|------|----------|----------|
| **Plausible** | 轻量分析 | 网站分析、访客统计 | ✅ 无需 Cookie |
| **GA4** | 全面分析 | 用户行为、转化漏斗 | ⚠️ 需 Cookie 同意 |
| **Clarity** | 行为分析 | 用户录制、热力图 | ⚠️ 需隐私声明 |
| **GSC** | 搜索监控 | 搜索表现、索引状态 | ✅ 无跟踪代码 |

## 追踪维度

### 1. 实时访问
- 在线用户数
- 地域分布（国家/城市）
- 设备类型（桌面/移动/平板）

### 2. 访问趋势
- 页面浏览量（PV）
- 独立访客（UV）
- 增长率（日/周/月）
- 流量来源（直接/搜索/社交/引荐）

### 3. 热门页面
- 各页面访问量排名
- 入口页面分析
- 退出页面分析

### 4. 用户行为热力图
- 点击热力分布
- 滚动深度
- 注意力分布

## 接入步骤

### Plausible（推荐优先接入）

```bash
# 1. 注册 https://plausible.io
# 2. 添加域名 aitattoogenerator.cc
# 3. 获取跟踪脚本
```

**嵌入代码**（`app/layout.tsx`）：
```tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          defer
          data-domain="aitattoogenerator.cc"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**自定义事件**：
```typescript
// 生成按钮点击
window.plausible('Generate Click', { props: { style: 'minimalist' } });

// 下载完成
window.plausible('Download', { props: { format: 'png' } });
```

### GA4

```bash
# 1. 创建 GA4 媒体资源 https://analytics.google.com
# 2. 获取 Measurement ID: G-XXXXXXXXXX
```

**接入方式**（推荐 `@next/third-parties`）：
```bash
npm install @next/third-parties@latest next@latest
```

```tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}
```

**转化事件配置**：
| 事件名称 | 触发条件 | 参数 |
|----------|----------|------|
| generate_start | 点击生成按钮 | style, color |
| generate_complete | 生成成功 | prompt_id, style |
| download_image | 点击下载 | format, size |
| view_pricing | 查看价格页 | source |

### Clarity

```bash
# 1. 注册 https://clarity.microsoft.com
# 2. 创建项目
# 3. 获取跟踪代码
```

**嵌入代码**：
```tsx
import Script from 'next/script';

<Script id="clarity-script" strategy="afterInteractive">
  {`
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
  `}
</Script>
```

### GSC（Google Search Console）

```bash
# 1. 访问 https://search.google.com/search-console
# 2. 添加属性（域名或 URL 前缀）
# 3. 验证所有权
```

**验证方式**（推荐 DNS）：
- 在 Cloudflare DNS 添加 TXT 记录
- 验证通过后删除记录

**提交 Sitemap**：
- Sitemap URL: `https://aitattoogenerator.cc/sitemap.xml`
- 在 GSC → 索引 → Sitemap 中提交

## 事件追踪清单

### 必须追踪的事件

| 事件 | 工具 | 优先级 |
|------|------|--------|
| 页面浏览 | Plausible + GA4 | P0 |
| CTA 按钮点击 | Plausible + GA4 | P0 |
| 生成按钮点击 | Plausible + GA4 | P0 |
| 生成完成 | Plausible + GA4 | P0 |
| 图片下载 | Plausible + GA4 | P1 |
| 风格选择 | Plausible + GA4 | P1 |
| 价格页查看 | Plausible + GA4 | P1 |
| 滚动深度 | GA4 | P2 |
| 用户录制 | Clarity | P2 |

## 隐私合规

### Cookie 政策
- [ ] 首次访问显示 Cookie 同意横幅
- [ ] 允许用户选择"仅必要"或"全部接受"
- [ ] 拒绝后禁用 GA4/Clarity，保留 Plausible

### GDPR/CCPA 合规
- [ ] 隐私政策页面说明数据收集
- [ ] 提供数据删除请求方式
- [ ] Plausible 无需 Cookie（默认合规）

## 验收标准

- [ ] Plausible 显示实时访客数据
- [ ] GA4 显示页面浏览和事件数据
- [ ] Clarity 有用户录制和热力图
- [ ] GSC 显示索引状态和搜索查询
- [ ] 所有工具数据一致（误差 < 10%）
- [ ] Cookie 横幅正常显示和工作

## 核心原则

> **上线后不只看能不能访问，还要知道有没有人来。**

- 数据追踪是上线必要环节，不是可选项
- 优先接入 Plausible（轻量+隐私友好）
- GA4 用于深度分析，Clarity 用于行为洞察
- GSC 用于搜索优化，必须接入
