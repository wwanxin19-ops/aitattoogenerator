# 小Q — QA 交接文档

## 项目概述
AI Tattoo Generator 网站已完成开发和部署，以下是测试要点和已知问题。

## 测试环境

### 生产环境
- **URL**: https://aitattoogenerator.cc
- **平台**: Vercel (Serverless)
- **浏览器支持**: Chrome, Firefox, Safari, Edge (最新 2 个版本)

### 本地开发
```bash
git clone https://github.com/wwanxin19-ops/aitattoogenerator.git
cd aitattoogenerator
npm install
npm run dev
```

---

## 功能测试清单

### 1. 页面访问
- [ ] 首页 `/` 正常加载
- [ ] 生成器 `/ai-tattoo-generator` 正常加载
- [ ] 定价 `/pricing` 正常加载
- [ ] 写实风格 `/styles/realism` 正常加载
- [ ] 极简风格 `/styles/minimalist` 正常加载
- [ ] 手臂部位 `/body-parts/arm` 正常加载

### 2. 导航
- [ ] 桌面端导航链接正常工作
- [ ] 移动端汉堡菜单显示 (窗口 < 860px)
- [ ] 移动端菜单展开/收起正常
- [ ] 菜单项点击后关闭菜单

### 3. 生成器功能
- [ ] 表单输入正常
- [ ] 下拉选择正常
- [ ] 提交按钮可点击
- [ ] Mock 图片返回正常
- [ ] 加载状态显示正常

### 4. 弹窗功能
- [ ] Pro 弹窗正常打开
- [ ] Studio 弹窗正常打开
- [ ] 邮箱输入验证正常
- [ ] 提交成功提示正常
- [ ] 关闭按钮正常

### 5. API 测试
```bash
# Waitlist
curl -X POST https://aitattoogenerator.cc/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Leads
curl -X POST https://aitattoogenerator.cc/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","type":"studio"}'

# Events
curl -X POST https://aitattoogenerator.cc/api/events \
  -H "Content-Type: application/json" \
  -d '{"event":"test","source":"qa"}'

# Generate
curl -X POST https://aitattoogenerator.cc/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test","style":"realism"}'
```

---

## 响应式测试

### 断点
- **桌面**: > 860px
- **平板**: 520px - 860px
- **手机**: < 520px

### 测试项
- [ ] iPhone 14 Pro (390x844)
- [ ] iPhone SE (375x667)
- [ ] iPad Air (820x1180)
- [ ] Desktop (1920x1080)

### 检查点
- [ ] 文字可读性 (无截断)
- [ ] 按钮可点击 (最小 44x44px)
- [ ] 图片正常显示
- [ ] 表单输入正常 (无缩放问题)
- [ ] 导航可用

---

## 性能测试

### 目标指标
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **FCP**: < 1.8s

### 工具
- Lighthouse (Chrome DevTools)
- PageSpeed Insights
- WebPageTest

---

## 已知问题

### 警告 (非阻塞)
1. **ESLint Warning**: `components/Shared.tsx` 使用 `<img>` 而非 Next.js `<Image />`
   - 原因: SVG 图片使用 `unoptimized: true` 配置
   - 影响: 无功能影响
   - 建议: 可忽略或未来优化

### 需要关注
1. **GA4 未启用**: 需要配置 `NEXT_PUBLIC_GA_ID` 环境变量
2. **Mock 生成**: `/api/generate` 返回固定 Mock 数据
3. **Rate Limiting**: 频繁测试可能触发 429

---

## 回归测试建议

### 每次部署后检查
1. 所有页面 HTTP 200
2. 关键用户流程 (首页 → 生成器 → 提交)
3. 移动端菜单功能
4. 表单提交功能
5. API 响应正常

### 自动化测试建议
- [ ] 添加 Playwright E2E 测试
- [ ] 添加 API 集成测试
- [ ] 添加视觉回归测试 (Percy/Chromatic)

---

## 联系方式
- 仓库: https://github.com/wwanxin19-ops/aitattoogenerator
- Issues: https://github.com/wwanxin19-ops/aitattoogenerator/issues
