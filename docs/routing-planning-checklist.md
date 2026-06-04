# 页面路由规划检查清单

**来源**: 网站前端开发实战课程 — 第13页
**用途**: Stitch 设计包文件夹到网站路由的映射规范

---

## 核心原则

> **先把 HTML 页面映射成网站路由**
>
> **文件夹名要变成用户和 Google 能理解的 URL**

### 金句

> "路由规划不清楚，导航、SEO、sitemap 都会乱。"

---

## 映射示例

### Stitch 文件夹 → 网站路由

| Stitch 文件夹名 | 网站路由 | 说明 |
|----------------|----------|------|
| `home_lucky_block_guide` | `/` | 首页，去掉冗余后缀 |
| `codes_lucky_block_guide` | `/codes` | 简化命名 |
| `guide_hub_lucky_block_guide` | `/guides` 或 `/guide-hub` | 用户可理解 |
| `how_to_play_lucky_block_guide` | `/how-to-play` | kebab-case 连字符 |

---

## 映射规则

1. **去掉冗余后缀**
   - ❌ `home_lucky_block_guide`
   - ✅ `/`

2. **简化命名**
   - ❌ `/home`
   - ✅ `/`

3. **使用连字符（kebab-case）**
   - ❌ `/how_to_play`
   - ✅ `/how-to-play`

4. **用户可理解**
   - 看到 URL 就知道页面内容
   - ❌ `/p1`
   - ✅ `/generator`

5. **Google 友好**
   - 利于 SEO 收录
   - 语义化命名

---

## 路由规划检查清单

- [ ] **所有 Stitch 文件夹已映射到路由**
- [ ] **路由名去掉技术/项目后缀**
- [ ] **路由名使用连字符（kebab-case）**
- [ ] **首页使用 `/` 而非 `/home`**
- [ ] **路由名用户可理解**（看到 URL 知道页面内容）
- [ ] **路由名 Google 友好**（利于 SEO）
- [ ] **路由表已同步到 sitemap**
- [ ] **导航菜单链接与路由一致**

---

## 与 sitemap 的关系

```
路由规划 → 导航结构 → sitemap 生成
     ↑___________________________|
              （必须一致）
```

**不一致的后果**：
- 导航链接 404
- sitemap 包含不存在页面
- Google 收录混乱
- 用户体验差

---

## aitattoogenerator 项目路由

| 页面 | 路由 | 状态 |
|------|------|------|
| 首页 | `/` | ✅ |
| 生成器 | `/generator` | ✅ |
| Cookie Policy | `/cookie-policy` | ✅ |
| Privacy | `/privacy` | 待确认 |
| Terms | `/terms` | 待确认 |

**待确认项**：
- [ ] 是否有 `/about` 页面？
- [ ] 是否有 `/pricing` 页面？
- [ ] 是否有 `/blog` 或 `/guides` 页面？

---

## 快速使用

复制以下模板，填入项目路由：

```markdown
# 路由规划 — [项目名称]

## Stitch 文件夹 → 网站路由

| 文件夹 | 路由 | 页面名称 |
|--------|------|----------|
| | | |
| | | |
| | | |

## 检查
- [ ] 所有文件夹已映射
- [ ] 去掉后缀
- [ ] kebab-case
- [ ] 用户可理解
- [ ] Google 友好
- [ ] 同步 sitemap
- [ ] 导航一致
```
