# AI 工具站 API 工作流程

> 基于课程第35页，前端只是入口，AI 能力在 API 后面。完整流程5步。

## 核心原则

**资讯站可以只有页面，AI 工具站一定要考虑 API 怎么接。**

**AI 工具站的能力，不应该直接暴露在浏览器里。**

## 5步流程

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────────────┐
│  前端页面    │────→│ /api/generate│────→│ AI 模型 / 第三方服务 /   │
│ 收集输入    │     │ 接收、校验   │     │ 自己的后端              │
└─────────────┘     └─────────────┘     └─────────────────────────┘
       ↑                                              │
       └──────────────────────────────────────────────┘
                    返回 JSON 结果
```

### Step 1: 前端页面 — 收集输入

**职责**：
- 提供用户输入界面
- 收集内容和参数
- 表单验证（前端初步校验）

**当前项目字段**：
- prompt: 纹身描述（多行文本，最大 1000 字符）
- style: 风格选择（minimalist / realism / tribal / geometric）
- color: 颜色偏好（black / color / grayscale）
- size: 尺寸（small / medium / large）

**UI 组件**：
- [ ] 文本输入框（带字符计数）
- [ ] 风格选择卡片（可视化预览）
- [ ] 颜色选择器
- [ ] 生成按钮（加载状态）

### Step 2: /api/generate — API 处理能力

**职责**：
- 接收请求
- 校验参数
- 调用后端能力

**接口定义**：
```typescript
POST /api/generate
Content-Type: application/json

Request:
{
  "prompt": "a minimalist wolf tattoo",
  "style": "minimalist",
  "color": "black",
  "size": "medium"
}

Response:
{
  "status": "success",
  "data": {
    "imageUrl": "https://cdn.example.com/tattoo_123.jpg",
    "promptId": "tattoo_123",
    "usage": {
      "prompt_tokens": 45,
      "completion_tokens": 0,
      "image_tokens": 1024
    }
  }
}
```

**校验规则**：
- [ ] prompt 非空且长度 10-1000 字符
- [ ] style 在允许列表中
- [ ] color 在允许列表中
- [ ] 用户未超限流配额

### Step 3: 后端处理 — 调用模型

**第三方服务**：
- [ ] OpenAI (DALL-E)
- [ ] Anthropic (Claude + 图像)
- [ ] Google (Imagen)
- [ ] Azure OpenAI
- [ ] Stability AI
- [ ] Midjourney API

**自己的后端**：
- [ ] 数据库存储生成记录
- [ ] 文件存储（R2 / S3）
- [ ] 任务队列（异步处理大图片）
- [ ] 缓存层（相同 prompt 复用）

### Step 4: 返回结果 — 结构化数据

**标准响应格式**：
```json
{
  "status": "success",
  "data": {
    "imageUrl": "...",
    "thumbnailUrl": "...",
    "promptId": "...",
    "metadata": {
      "width": 1024,
      "height": 1024,
      "format": "png"
    },
    "usage": {
      "tokens": 123,
      "cost": 0.02
    }
  }
}
```

**错误响应格式**：
```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMITED",
    "message": "请求过于频繁，请稍后再试"
  }
}
```

### Step 5: 前端展示 — 结果呈现

**展示内容**：
- [ ] 生成图片（支持放大预览）
- [ ] 生成参数（prompt、style 等）
- [ ] 操作按钮：下载、重新生成、分享
- [ ] 生成历史列表

**交互功能**：
- [ ] 复制 prompt
- [ ] 下载原图（PNG / JPG / SVG）
- [ ] 重新生成（保留参数）
- [ ] 分享链接（带 promptId）
- [ ] 点赞/收藏

## 安全要求

- [ ] API Key 存储在 Workers 环境变量
- [ ] 前端不直接调用 AI Provider
- [ ] 请求来源校验（CORS）
- [ ] 输入过滤（防止注入）
- [ ] 输出审核（合规检查）
- [ ] 限流保护（防滥用）

## 验收标准

- [ ] 前端能正常收集输入并调用 API
- [ ] API 能正确校验参数并返回结果
- [ ] 生成结果能在前端正确展示
- [ ] 下载/重新生成等功能正常
- [ ] 网络面板中看不到 AI Provider API Key
- [ ] 错误情况有友好提示
