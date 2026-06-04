# 部署失败排查指南

> 对应课程第48页 | 部署失败不要慌，先按顺序排查

## 核心原则

部署失败第一入口永远是构建日志。最可怕的不是失败，而是不知道从哪里看。

## 排查顺序（8步）

### 1. 构建日志是否报错
- 路径：Cloudflare Dashboard → Workers & Pages → 项目 → Builds
- 操作：先看第一条红色错误
- 原则：第一条错误往往是最根本原因

### 2. 依赖是否安装失败
```bash
# 本地验证
npm install
# 或
pnpm install
```
- 检查 package.json 是否完整
- 检查 lock 文件（package-lock.json / pnpm-lock.yaml）是否同步

### 3. Node 版本是否匹配
- 建议使用 Node 18 / 20
- 检查方式：
```bash
node -v
# 应在 package.json engines 字段中指定
```

### 4. 环境变量是否缺失
- 检查 Workers secrets 配置：
```bash
wrangler secret list
```
- 必需变量：
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_GA_ID`
  - `NEXT_PUBLIC_CLARITY_ID`
  - API 密钥（非 NEXT_PUBLIC_ 前缀）

### 5. wrangler 配置是否正确
- 检查 `wrangler.toml` 或 `wrangler.jsonc` 是否存在
- 验证配置有效性：
```bash
wrangler config validate
```

### 6. 图片或路径是否引用错误
- 资源路径是否正确
- **大小写敏感**：Linux 构建环境区分大小写
- 文件是否存在（特别是 `public/` 目录下的资源）

### 7. Next.js 配置是否适配 Workers
- 检查 `next.config.ts`：
```typescript
// 确保没有配置 output: 'export'（Workers 不支持纯静态导出）
const nextConfig = {
  // output: 'export', // ❌ Workers 不支持
}
```

### 8. 是否把本地文件路径写进代码
- ❌ 避免使用绝对路径：
  - `C:\Users\...`
  - `/home/...`
- ✅ 使用相对路径或环境变量

## 失败处理闭环

```
失败 → 定位 → 修复 → 重新部署
  ↓       ↓       ↓         ↓
构建    按顺序   修复问题   再次部署
报错    排查     并提交     验证成功
```

## 当前项目排查要点

| 检查项 | 状态 | 排查方法 |
|--------|------|----------|
| 构建日志 | ⏳ | Cloudflare Dashboard Builds 页面 |
| 依赖安装 | ✅ | 本地 `npm install` 通过 |
| Node 版本 | ⚠️ | 需确认并锁定 18/20 |
| 环境变量 | ⚠️ | `wrangler secret list` 检查 |
| wrangler 配置 | ⚠️ | 检查 `wrangler.toml` 是否存在 |
| 资源路径 | ✅ | 相对路径，无绝对路径 |
| Next.js 配置 | ⚠️ | 检查 `output` 设置 |
| 本地路径 | ✅ | 代码中无绝对路径 |

## 常见问题速查

**Q: 构建日志在哪里看？**
- Cloudflare Dashboard → Workers & Pages → 选择项目 → Builds 标签

**Q: 第一条红色错误看不懂怎么办？**
- 复制错误信息到 Google / Stack Overflow 搜索
- 检查是否为常见错误（如模块未找到、类型错误等）

**Q: 本地构建成功但 Cloudflare 构建失败？**
- 检查 Node 版本是否一致
- 检查环境变量是否在 Cloudflare 配置
- 检查是否有平台特定代码

## 相关文档

- [[cloudflare-workers-deploy-flow]] — 部署流程（8步成功路径）
- [[pre-deploy-checklist]] — 部署前检查清单（10项）
