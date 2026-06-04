# 接入后如何确认成功

> 基于课程第43页，贴完代码不等于成功，必须验证。最后一步是确认后台真的收到数据。

## 核心原则

> **复制代码只是开始，验证成功才算接入完成。**

## 验证清单（7项）

- [ ] Plausible 看到实时访问
- [ ] GA4 Realtime 出现用户
- [ ] Clarity 收到 session
- [ ] GSC 验证成功
- [ ] 页面源码能看到 script
- [ ] Cloudflare 环境变量正确
- [ ] 部署后已重新构建

## 部署状态检查

```
代码已推送 → 构建成功 → 部署成功 → 网站可访问
   14:24        14:25        14:25         正常
```

- [ ] 代码已推送到 GitHub
- [ ] Cloudflare Pages 构建成功
- [ ] 部署成功
- [ ] 网站可访问（https://aitattoogenerator.cc）

## Cloudflare 环境变量检查

| 变量名 | 值 | 状态 |
|--------|-----|------|
| NEXT_PUBLIC_PLAUSIBLE_DOMAIN | aitattoogenerator.cc | 已设置 |
| NEXT_PUBLIC_CLARITY_ID | ********* | 已设置 |
| NEXT_PUBLIC_GA_ID | G-********* | 已设置 |

## 页面源码检查

**验证命令**：
```bash
curl -s https://aitattoogenerator.cc | grep -E "plausible|gtag|clarity"
```

**预期输出**：
- 包含 `plausible.io/js/script.js`
- 包含 `googletagmanager.com/gtag`
- 包含 `clarity.ms/tag`

**源码示例**：
```html
<script defer
  data-domain="aitattoogenerator.cc"
  src="https://plausible.io/js/script.js">
</script>
```

## 四个工具验证

### 1. Plausible — 实时访问

**验证步骤**：
1. 访问网站 https://aitattoogenerator.cc
2. 打开 Plausible 后台
3. 查看 Realtime → Visitors

**预期结果**：
- 实时访问数 > 0
- 当前在线用户显示
- 时间轴有数据点

### 2. GA4 Realtime — 实时用户

**验证步骤**：
1. 访问网站
2. 打开 GA4 → Reports → Realtime
3. 查看 Users in last 30 minutes

**预期结果**：
- 实时用户数 > 0
- 地理位置正确
- 页面浏览事件触发

### 3. Clarity — 录制会话

**验证步骤**：
1. 访问网站
2. 打开 Clarity Dashboard
3. 查看 Recordings

**预期结果**：
- Sessions 数 > 0
- 热力图有数据
- 录屏可回放

### 4. GSC — 验证成功

**验证步骤**：
1. 打开 Google Search Console
2. 查看验证状态

**预期结果**：
- 验证状态：成功
- 所有权已验证
- 索引状态：有效页面数正确

## 事件追踪验证

### CTA 按钮点击

**验证步骤**：
1. 访问网站首页
2. 点击"开始体验"按钮
3. 检查 Plausible 事件
4. 检查 GA4 事件

**预期结果**：
- Plausible：Events → cta_click
- GA4：Realtime → Event count → cta_click

### 生成完成

**验证步骤**：
1. 输入 prompt
2. 选择 style
3. 点击生成
4. 等待生成完成

**预期结果**：
- Plausible：Events → generate_complete
- GA4：Conversions → generate_complete

### 下载图片

**验证步骤**：
1. 生成完成后
2. 点击下载按钮
3. 检查事件触发

**预期结果**：
- Plausible：Events → download_image
- GA4：Events → download_image

## 浏览器 DevTools 验证

### Network 面板

1. 打开 DevTools → Network
2. 过滤 `plausible`
3. 访问网站
4. 确认请求返回 200

### Console 面板

1. 打开 DevTools → Console
2. 输入 `window.plausible`
3. 确认返回函数（不是 undefined）

```javascript
// 验证 Plausible 加载
typeof window.plausible === 'function'

// 验证 GA4 加载
typeof window.gtag === 'function'

// 验证 Clarity 加载
typeof window.clarity === 'function'
```

## 常见问题排查

| 问题 | 排查步骤 | 解决 |
|------|----------|------|
| Plausible 无数据 | 检查域名配置、源码中是否有 script | 确认 data-domain 正确 |
| GA4 无实时用户 | 检查 Measurement ID、gtag 加载 | 确认 ID 格式正确 |
| Clarity 无录制 | 检查 Project ID、脚本加载 | 确认 ID 正确且脚本执行 |
| GSC 验证失败 | 检查验证方式、DNS/文件 | 重新验证或换方式 |
| 源码无追踪代码 | 检查构建输出、环境变量 | 确认变量名正确且构建成功 |
| 事件未触发 | 检查事件代码、网络请求 | 确认代码执行且请求发送 |

## 验收标准

- [ ] 部署状态全部通过
- [ ] Cloudflare 环境变量已设置
- [ ] 页面源码包含追踪代码
- [ ] Plausible 显示实时访问
- [ ] GA4 Realtime 显示用户
- [ ] Clarity 收到录制会话
- [ ] GSC 验证成功
- [ ] CTA 点击事件触发
- [ ] 生成完成事件触发
- [ ] 下载事件触发

## 核心原则

> **贴完代码不等于成功，必须验证。**

- 部署后必须检查构建状态
- 必须查看实时面板确认数据
- 必须测试事件追踪是否正常
- 必须检查页面源码确认代码存在
- 验证成功才算接入完成
