# SEO 基础文件

> 上线前至少补齐 sitemap 和 robots，保证 Google 能正常发现和理解页面。

---

## Google 爬虫四步

1. 发现页面
2. 理解页面内容
3. 评估页面质量
4. 决定是否收录和排名

---

## 三个必备文件

| 文件 | 作用 | 路径 |
|------|------|------|
| sitemap | 告诉 Google 有哪些页面 | `app/sitemap.ts` 或 `public/sitemap.xml` |
| robots | 告诉 Google 哪些页面可抓取 | `app/robots.ts` 或 `public/robots.txt` |
| metadata | 页面的基本信息和结构化数据 | 每个 `page.tsx` / `layout.tsx` |

---

## 四个关键要素

| 要素 | 作用 | 影响 |
|------|------|------|
| canonical | 告诉 Google 哪个是主页面 | 防止重复内容 |
| title | 页面标题 | 搜索展示 |
| description | 页面描述 | 点击率 |
| OG image | 社交分享缩略图 | 社交展示效果 |

---

## 当前项目检查清单

- [ ] 创建 `app/sitemap.ts` 或 `public/sitemap.xml`
- [ ] 创建 `app/robots.ts` 或 `public/robots.txt`
- [ ] 每个页面有完整的 metadata（title, description, canonical）
- [ ] 准备 OG image（1200x630）
- [ ] noindex 页面（如 /thank-you）不进入 sitemap

---

## 金句

> 这节课不深入 SEO 运营，但上线基础必须有。
