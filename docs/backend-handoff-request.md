# 前端 → 后端对接需求文档

**项目**: aitattoogenerator.cc  
**日期**: 2026-05-30  
**发件人**: 小码（前端）  
**收件人**: 小研（后端）  

---

## 一、已完成对接（无需后端改动）

| 接口 | 状态 | 说明 |
|------|------|------|
| `GET /api/auth/me` | ✅ 已对接 | JWT Cookie 认证，前端轮询获取用户 |
| `POST /api/auth/logout` | ✅ 已对接 | 登出清除 Cookie |
| `GET /api/usage` | ✅ 已对接 | 积分和历史记录查询 |
| `POST /api/user/deduct` | ✅ 已对接 | 积分扣除 |

---

## 二、需要后端确认/提供（P0 阻塞）

### 1. 图片生成异步轮询接口

**问题**: `app/api/generate/[id]/route.ts` 前端文件缺失，需要确认后端接口格式。

**需要后端提供**:
- 接口地址: `GET /api/generate/:id`
- 返回格式:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "status": "pending" | "completed" | "failed",
      "image_url": "string?",      // status=completed 时返回
      "error_message": "string?",  // status=failed 时返回
      "credits_remaining": number
    }
  }
  ```

**前端当前实现**:
- 用户提交后 POST `/api/generate` → 返回 `{ id, status: "pending" }`
- 前端轮询 `GET /api/generate/:id`（每 2-3 秒）
- 等 `status === "completed"` 显示图片

**请确认**: 后端是否已实现此接口？返回格式是否一致？

---

### 2. 图片存储方案

**问题**: 生成的图片存在哪里？前端如何展示？

**需要后端确认**:
- 图片存储: Cloudflare R2 / AWS S3 / 其他？
- 图片 URL: 直接返回永久链接还是预签名 URL？
- 图片尺寸: 返回原图还是缩略图？
- 图片有效期: 永久保存还是定期清理？

**前端影响**: 决定 `<img>` 标签的 `src` 如何处理（是否需要懒加载、占位符等）

---

### 3. Waitlist / Leads / Events 是否迁移到后端

**问题**: 这三个 API 目前仍直连 Supabase，未走后端 Workers。

**需要后端确认**:
- 是否继续用 Supabase？（当前方案）
- 还是迁移到后端 Workers？（需要后端提供新接口）

**当前前端实现**:
- `POST /api/waitlist` → Supabase
- `POST /api/leads` → Supabase
- `POST /api/events` → Supabase

**请确认**: 保持现状还是迁移？如迁移，提供新接口文档。

---

## 三、需要后端确认（P1 重要）

### 4. 图片生成真实流程

**问题**: 当前 `POST /api/generate` 仍有 mock 数据，需要真实生成流程。

**需要后端确认**:
- 真实生成是否已部署？
- 生成耗时大概多久？（影响前端轮询间隔）
- 失败重试策略？
- 并发限制？

---

### 5. GA4 跟踪 ID

**问题**: 前端已集成 GA4 代码，但缺少跟踪 ID。

**需要确认**:
- 是否已注册 Google Analytics 4？
- 跟踪 ID（`G-XXXXXXXXXX`）是多少？
- 需要跟踪哪些事件？（页面浏览、生成点击、登录等）

---

## 四、前端待办（无需后端，自行完成）

| 任务 | 优先级 | 说明 |
|------|--------|------|
| 补全 `generate/[id]/route.ts` | P0 | 假设后端格式，先实现轮询逻辑 |
| 替换 3 个图片占位符 | P1 | 需要设计图或图片素材 |
| 移动端适配测试 | P1 | 响应式布局检查 |
| SEO 优化 | P2 | 等小搜文档 |

---

## 五、下一步行动

**请小研确认**:
1. ✅ `/api/generate/:id` 接口是否已部署？返回格式？
2. ✅ 图片存储方案（R2/S3/其他）？
3. ✅ Waitlist/Leads/Events 是否迁移到后端？
4. ✅ 真实图片生成是否已就绪？
5. ✅ GA4 跟踪 ID 是多少？

**确认后前端立即执行**:
- 补全 `generate/[id]/route.ts`
- 替换图片占位符
- 集成 GA4
- 移动端测试

---

**联系方式**: 有问题随时找小码对接。
