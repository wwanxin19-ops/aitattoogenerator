# 部署前检查清单

> 基于课程第46页，部署前先确认项目真的能上 Workers。不要脏部署，先让本地构建、代码和变量都准备好。

## 核心原则

> **先检查，后部署；先小步，后上线。**

> **部署前检查清楚，部署时才不会盲目排错。**

## 10项检查清单

### 1. npm run build 通过

```bash
cd ~/aitattoogenerator && npm run build
```

- [ ] 无 TypeScript 错误
- [ ] 无 ESLint 警告
- [ ] 构建成功退出码 0

### 2. 本地预览正常

```bash
npm run dev
# 访问 http://localhost:3000
```

- [ ] 首页正常显示
- [ ] 所有路由可访问
- [ ] 图片无丢失
- [ ] 交互正常

### 3. 移动端检查通过

- [ ] 320px 无横向溢出
- [ ] 375px 布局正常
- [ ] 按钮点击区域充足（最小 44x44px）
- [ ] 导航菜单折叠正常

### 4. 链接检查通过

- [ ] 内部链接无 404
- [ ] 外部链接可访问
- [ ] 锚点跳转正常
- [ ] CTA 按钮不是死链接

### 5. 追踪 ID 已配置

**本地 (.env.local)**：
```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=aitattoogenerator.cc
NEXT_PUBLIC_CLARITY_ID=your_clarity_id
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**线上 (Cloudflare Environment Variables)**：
- [ ] Plausible domain 正确
- [ ] GA4 Measurement ID 正确
- [ ] Clarity Project ID 正确

### 6. API secret 没有放前端

```bash
# 检查前端代码中无硬编码密钥
grep -r "sk-" app/ --include="*.ts" --include="*.tsx" || echo "No API keys found"
```

- [ ] 无 API Key 硬编码
- [ ] 无 Secret 暴露
- [ ] 所有 AI 调用通过 /api/*

### 7. wrangler 配置存在

- [ ] `wrangler.toml` 或 `wrangler.json` 存在
- [ ] 构建命令配置正确
- [ ] 输出目录配置正确

### 8. 环境变量区分本地和线上

| 变量 | 本地 (.env.local) | 线上 (Cloudflare) |
|------|------------------|-------------------|
| NEXT_PUBLIC_PLAUSIBLE_DOMAIN | aitattoogenerator.cc | aitattoogenerator.cc |
| NEXT_PUBLIC_CLARITY_ID | xxx | xxx |
| NEXT_PUBLIC_GA_ID | G-xxx | G-xxx |
| API_KEY | 不存放 | Worker secrets |

### 9. 代码已 commit

```bash
git status
# 确认无未提交文件
```

- [ ] 所有修改已 staged
- [ ] Commit message 规范
- [ ] 无未跟踪的重要文件

### 10. 代码已 push

```bash
git push origin main
```

- [ ] 推送成功
- [ ] GitHub 上代码最新
- [ ] 触发 Cloudflare 构建

## 部署流程

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   本地检查       │────→│   GitHub Push   │────→│  Cloudflare     │
│  （10项清单）    │     │   触发构建       │     │  全球边缘运行    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                                               │
        └──────────────── 检查通过 ──────────────────────┘
```

## 脏部署风险

| 问题 | 后果 | 预防 |
|------|------|------|
| 构建失败 | 部署中断，线上不可用 | 本地先 build 通过 |
| 密钥暴露 | 安全风险，API 被盗用 | 检查代码中无硬编码 |
| 追踪缺失 | 数据丢失，无法分析 | 确认追踪 ID 配置 |
| 链接失效 | 用户体验差，SEO 受损 | 链接检查通过 |
| 移动端崩 | 转化下降，用户流失 | 移动端检查通过 |
| 变量未区分 | 本地线上行为不一致 | 环境变量分开配置 |

## 验收标准

- [ ] 10项检查全部通过
- [ ] 本地构建成功
- [ ] 代码已 push 到 GitHub
- [ ] Cloudflare 构建成功
- [ ] 预览站点可访问
- [ ] 自定义域名正常

## 核心原则

> **不要脏部署，先让本地构建、代码和变量都准备好。**

- 本地检查通过后再 push
- push 后确认构建成功再验证
- 验证通过后再正式上线
