# 后端（小研）待办事项清单

**项目**: aitattoogenerator.cc  
**日期**: 2026-05-30  
**发件人**: 小码（前端）  
**收件人**: 小研（后端）  
**优先级**: P0 > P1 > P2

---

## 一、P0 - 阻塞（今天必须完成）

### 1. CORS 配置

**问题**: 前端部署在 Vercel（`aitattoogenerator.cc`），后端是 Cloudflare Worker。前端调用 `/api/generate` 等接口时会遇到跨域错误。

**需要配置**:
```
Access-Control-Allow-Origin: https://aitattoogenerator.cc
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

**验证方式**:
```bash
curl -I -H "Origin: https://aitattoogenerator.cc"   -H "Access-Control-Request-Method: POST"   -X OPTIONS   https://aitattoogenerator.cc/api/generate
```

**预期响应头**:
```
HTTP/2 204
access-control-allow-origin: https://aitattoogenerator.cc
access-control-allow-credentials: true
access-control-allow-methods: GET, POST, OPTIONS
```

---

### 2. 真实生成流程测试

**问题**: 前端已实现异步轮询逻辑，但无法验证真实生成是否工作。

**测试步骤**:
1. 登录网站 https://aitattoogenerator.cc
2. 进入 `/ai-tattoo-generator`
3. 输入 prompt，点击 Generate
4. 观察网络请求：
   - `POST /api/generate` → 应返回 202 + `{ id, status: "pending" }`
   - `GET /api/generate/:id` → 应轮询返回状态变化
   - 最终 `status` 应为 `completed` 并返回 `image_url`

**预期结果**:
- 生成耗时：10-30 秒
- 轮询间隔：前端每 2 秒请求一次
- 成功返回：`{ status: "completed", image_url: "..." }`

**如果失败**:
- 返回 `{ status: "failed", error_message: "..." }`
- 积分应自动退还

---

### 3. 图片访问权限（R2）

**问题**: 前端通过 `/api/images/:key` 读取生成的图片，需要确认 R2 配置。

**需要确认**:
- [ ] R2 Bucket 是否已创建？
- [ ] R2 是否绑定到 Worker？
- [ ] 图片路径格式：`/api/images/generations/:userId/:genId.png`
- [ ] 是否需要认证才能访问图片？
- [ ] 图片 URL 有效期多久？

**前端当前实现**:
```html
<img src="/api/images/generations/user-uuid/gen-id.png" />
```

**如果 R2 未就绪**，临时方案：
- 返回 Base64 图片数据
- 或使用其他图床

---

## 二、P1 - 重要（本周完成）

### 4. `/api/usage` 统一接口

**当前问题**: 前端有两个接口查询积分：
- `GET /api/user/credits` → 查询积分
- `GET /api/user/history` → 查询历史

**后端现状**: 两个都转发到 `GET /api/usage`

**建议**: 前端保留两个路由，但都转发到 `/api/usage`，后端无需改动。

**确认**: 这样是否可以？还是需要后端拆分？

---

### 5. `/api/images/:key` 实现

**问题**: 后端文档提到此接口，但前端未看到实现。

**需要后端提供**:
```
GET /api/images/:key
```

**功能**:
- 从 R2 读取图片
- 返回二进制图片数据
- 需要登录（验证 Cookie）
- 只能访问自己的图片（路径包含 userId）

**返回**:
- 成功: `Content-Type: image/png` + 图片二进制
- 失败: 401（未登录）/ 403（无权访问）/ 404（不存在）

---

### 6. 生成失败处理

**问题**: 生成失败时，前端显示"生成失败，积分已退还"，需要确认后端是否自动退款。

**需要确认**:
- [ ] 生成失败时是否自动退还积分？
- [ ] 退款是立即还是异步？
- [ ] 前端是否需要额外调用退款接口？

**当前前端逻辑**:
```typescript
if (genResult.status === "failed") {
  showError("生成失败，积分已退还");
}
```

---

## 三、P2 - 优化（下周完成）

### 7. `/api/health` 健康检查

**用途**: 监控和负载均衡

**实现**:
```
GET /api/health
```

**返回**:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2026-05-30T..."
}
```

---

### 8. 速率限制优化

**当前**: Free 用户 10 积分/天，Pro 100 积分/天

**建议**:
- 在响应头中添加剩余积分：`X-Credits-Remaining: 9`
- 在响应头中添加重置时间：`X-Credits-Reset: 2026-05-31T00:00:00Z`

**前端用途**: 显示用户剩余积分和重置倒计时

---

### 9. 错误码统一

**当前错误码**:
- `UNAUTHORIZED` - 未登录
- `INSUFFICIENT_CREDITS` - 积分不足
- `INVALID_INPUT` - 参数错误

**建议补充**:
- `GENERATION_FAILED` - 生成失败
- `GENERATION_TIMEOUT` - 生成超时
- `RATE_LIMITED` - 请求过于频繁
- `SERVER_ERROR` - 服务器内部错误

---

## 四、待确认事项

| # | 问题 | 选项 | 建议 |
|---|------|------|------|
| 1 | Waitlist/Leads/Events | A. 保持 Supabase | ✅ **选 A**，前端已实现 |
| | | B. 迁移到 Worker | 工作量大，收益小 |
| 2 | 图片存储 | A. R2（当前） | ✅ **选 A**，Cloudflare 原生 |
| | | B. S3 | 额外成本 |
| | | C. Base64 | 不适合大图 |
| 3 | 生成队列 | A. Cloudflare Queues | ✅ **选 A**，已集成 |
| | | B. 同步生成 | 用户体验差 |

---

## 五、前端已就绪（等待后端）

| 功能 | 前端状态 | 等待后端 |
|------|----------|----------|
| 异步生成 + 轮询 | ✅ 已实现 | CORS + 真实测试 |
| 积分查询 | ✅ 已实现 | 确认 `/api/usage` 格式 |
| 图片展示 | ✅ 已实现 | `/api/images/:key` |
| 认证流程 | ✅ 已实现 | Cookie 配置确认 |
| 错误处理 | ✅ 已实现 | 错误码统一 |

---

## 六、测试清单

### 6.1 今天必须测试

- [ ] CORS 预检请求（OPTIONS）
- [ ] `POST /api/generate` 返回 202
- [ ] `GET /api/generate/:id` 轮询返回 completed
- [ ] 生成失败返回 failed + 积分退还
- [ ] 未登录返回 401
- [ ] 积分不足返回 403

### 6.2 本周测试

- [ ] `/api/images/:key` 读取图片
- [ ] 并发生成（多个用户同时）
- [ ] 积分重置（UTC 00:00）
- [ ] 健康检查 `/api/health`

---

## 七、联系方式

**前端**: 小码  
**紧急问题**: 直接 Telegram  
**文档更新**: 双方确认后同步

---

**文档版本**: v1.0  
**更新日期**: 2026-05-30  
**下次更新**: P0 完成后
