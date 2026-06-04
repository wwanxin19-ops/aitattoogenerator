# 图片资源管理规范

## 目标

把设计包或静态 HTML 中的图片资源统一优化、命名、存放与引用，避免图片散乱、重复、命名不可读、线上加载不可控。

## 当前资源现状

当前 `public/` 下已有图片资源：

```txt
public/images/tattoos/
├── realism-example.svg
├── minimalist-example.svg
└── arm-placement-example.svg
```

当前资源类型以 SVG 占位/示例图为主，适合轻量展示和 SEO 页面插图。

## 推荐目录结构

```txt
public/
└── images/
    ├── tattoos/             # 纹身示例图
    │   ├── realism-example.svg
    │   ├── minimalist-example.svg
    │   └── arm-placement-example.svg
    ├── ui/                  # UI 装饰、图标、背景
    ├── og/                  # Open Graph / social preview
    └── placeholders/        # 临时占位图
```

## 命名规则

统一使用：

```txt
{topic}-{purpose}.{ext}
{topic}-{variant}-{purpose}.{ext}
```

示例：

- `realism-example.svg`
- `minimalist-example.svg`
- `arm-placement-example.svg`
- `homepage-hero-preview.webp`
- `pricing-credit-card-illustration.svg`
- `og-homepage.png`

禁止：

- `image1.png`
- `未命名.png`
- `screenshot-2026-xx.png`
- `final-final-v2.png`
- 随机 hash 文件名直接进入业务引用

## 文件格式选择

- SVG：图标、插画、占位图、轻量装饰图。
- WebP：主要展示图、生成效果图、照片类图片。
- PNG：需要透明背景且 WebP 不适用时。
- JPG/JPEG：普通照片，优先压缩后使用。

## 引用规则

### 静态 SVG / 装饰图

可直接使用：

```tsx
<img src="/images/tattoos/realism-example.svg" alt="Realism tattoo example" />
```

要求：

- 必须有准确 `alt`。
- 装饰图可使用空 alt：`alt=""`。
- 不要使用与图片无关的关键词堆砌 alt。

### Next.js Image

当项目启用图片优化时，优先使用 `next/image`。

当前项目 `next.config.ts` 配置：

```ts
images: {
  unoptimized: true,
}
```

因此 SVG 示例图可以继续用普通 `<img>`，后续接入真实图片 CDN 时再评估是否切换 `next/image`。

## 设计交付检查

收到设计包后检查：

- [ ] 图片是否全部在 assets/public 目录中。
- [ ] 图片是否与页面引用一一对应。
- [ ] 是否存在缺失资源或 404 引用。
- [ ] 是否有过大图片（> 500KB 需压缩）。
- [ ] 是否有无意义文件名。
- [ ] 是否存在版权或来源不明图片。
- [ ] 是否需要生成 OG 图。

## 上线前检查

- [ ] 页面图片无 404。
- [ ] 首屏图片不阻塞 LCP。
- [ ] 所有业务图片有 alt。
- [ ] 图片路径不含本地绝对路径。
- [ ] 图片大小适合线上加载。
- [ ] sitemap/metadata 中引用的图片 URL 可访问。

## 与 aitattoogenerator 项目的对应关系

| 页面 | 当前图片 | 位置 | 状态 |
|------|----------|------|------|
| `/styles/realism` | `realism-example.svg` | `public/images/tattoos/` | ✅ |
| `/styles/minimalist` | `minimalist-example.svg` | `public/images/tattoos/` | ✅ |
| `/body-parts/arm` | `arm-placement-example.svg` | `public/images/tattoos/` | ✅ |

## 后续优化候选

- 增加 `public/images/og/`，为首页、生成器页、定价页生成 OG 图。
- 对真实示例图统一转 WebP 并压缩。
- 建立图片清单脚本，自动检查 public 资源和页面引用是否匹配。
