# 为什么先做交付包核验

**来源**: 网站前端开发实战课程 — 第11页
**用途**: Stitch 设计交付包接收后的前置核验论证与执行清单

---

## 核心原则

> **不要拿到文件就开发，先确认它能不能施工**
>
> **输入不完整，后面全部会返工**

### 成本意识

| 阶段 | 时间成本 | 影响范围 |
|------|----------|----------|
| 前期核验 | 30 分钟 | 仅设计包 |
| 中期返工 | 1-3 天 | 页面 + 组件 + 路由 |
| 后期返工 | 1-2 周 | 全站重构 |

**结论**：前期核验是最高性价比的投入。

---

## 核验对象

**Stitch 设计交付包**

---

## 10项核验清单

| # | 检查项 | 通过标准 | 失败后果 |
|---|--------|----------|----------|
| 1 | **文件是否存在** | 交付包包含所有必需文件 | 缺失文件导致开发中断 |
| 2 | **HTML 是否可读** | HTML 源码能正常打开、解析 | 无法提取组件结构 |
| 3 | **设计系统是否存在** | DESIGN.md 或设计规范文件完整 | 样式变量混乱，后期统一困难 |
| 4 | **页面数量** | 实际页面数与预期一致 | sitemap 和导航需重写 |
| 5 | **是否符合 PRD** | 页面功能匹配产品需求文档 | 功能遗漏，需求偏差 |
| 6 | **ZIP 是否能解压** | 压缩包完整、无损坏 | 文件缺失或损坏 |
| 7 | **截图是否完整** | 每页有对应截图 | 无法视觉验收 |
| 8 | **assets 是否齐全** | 图片、字体、图标无缺失 | 页面开发到一半被迫暂停 |
| 9 | **目录命名** | 文件夹/文件命名规范 | 路由映射混乱 |
| 10 | **是否能映射路由** | 页面结构能转换成网站路由 | 文件夹结构需重构 |

---

## 核验流程

```
接收 Stitch 交付包
    ↓
执行 10 项核验清单
    ↓
┌─────────────────┐
│  全项通过？      │
└─────────────────┘
    ↓ 是              ↓ 否
标记"可施工"      退回设计方补充
    ↓                ↓
开始开发        补充后重新核验
```

---

## 自动化核验脚本

```bash
#!/bin/bash
# scripts/stitch-verify.sh — Stitch 交付包核验

DELIVERY_DIR="$1"
PRD_FILE="$2"
PASS=0
FAIL=0
WARN=0

check() {
  if [ $? -eq 0 ]; then
    echo "  ✓ 通过"
    ((PASS++))
  else
    echo "  ✗ 失败"
    ((FAIL++))
  fi
}

echo "=== Stitch 交付包核验 ==="
echo ""

# 1. 文件是否存在
echo "[1/10] 文件是否存在..."
[ -d "$DELIVERY_DIR" ]
check

# 2. HTML 是否可读
echo "[2/10] HTML 是否可读..."
find "$DELIVERY_DIR" -name "*.html" | head -1 | xargs cat > /dev/null 2>&1
check

# 3. 设计系统是否存在
echo "[3/10] 设计系统是否存在..."
[ -f "$DELIVERY_DIR/DESIGN.md" ] || [ -f "$DELIVERY_DIR/design-system.*" ]
if [ $? -eq 0 ]; then
  echo "  ✓ 通过"
  ((PASS++))
else
  echo "  ⚠ 警告（建议补充）"
  ((WARN++))
fi

# 4. 页面数量
echo "[4/10] 页面数量..."
PAGE_COUNT=$(find "$DELIVERY_DIR" -name "*.html" | wc -l)
echo "  发现 $PAGE_COUNT 个 HTML 页面（需人工确认是否符合预期）"
((WARN++))

# 5. 是否符合 PRD
echo "[5/10] 是否符合 PRD..."
[ -f "$PRD_FILE" ]
if [ $? -eq 0 ]; then
  echo "  ✓ PRD 存在（需人工核对内容）"
  ((WARN++))
else
  echo "  ✗ PRD 缺失"
  ((FAIL++))
fi

# 6. ZIP 完整性
echo "[6/10] ZIP 完整性..."
echo "  ⚠ 需人工确认"
((WARN++))

# 7. 截图是否完整
echo "[7/10] 截图是否完整..."
SCREENSHOT_COUNT=$(find "$DELIVERY_DIR" -name "screen.png" -o -name "*.jpg" | wc -l)
echo "  发现 $SCREENSHOT_COUNT 个截图（需人工确认是否每页对应）"
((WARN++))

# 8. assets 是否齐全
echo "[8/10] assets 是否齐全..."
[ -d "$DELIVERY_DIR/assets" ] || [ -d "$DELIVERY_DIR/public" ]
if [ $? -eq 0 ]; then
  echo "  ✓ 通过"
  ((PASS++))
else
  echo "  ⚠ 警告（assets 目录缺失）"
  ((WARN++))
fi

# 9. 目录命名
echo "[9/10] 目录命名..."
echo "  目录结构："
find "$DELIVERY_DIR" -maxdepth 2 -type d | sed 's/^/    /'
((WARN++))

# 10. 是否能映射路由
echo "[10/10] 是否能映射路由..."
echo "  潜在路由："
find "$DELIVERY_DIR" -name "*.html" | sed 's/.*\///; s/\.html//' | sed 's/^/    \//'
((WARN++))

echo ""
echo "=== 核验结果 ==="
echo "通过: $PASS | 失败: $FAIL | 警告: $WARN"
echo ""

if [ $FAIL -eq 0 ]; then
  echo "✅ 通过核验，可以开始施工"
else
  echo "❌ 核验未通过，请退回设计方补充"
fi
```

---

## 硬性规则

⚠️ **先核验，再施工。无例外。**

---

## 与项目文档的关系

- `docs/stitch-delivery-verification-overview.md` — 第三部分总览（5大维度）
- `docs/stitch-handoff-verification-checklist.md` — 第14页详细清单（10项检查点）
- `docs/why-verify-first.md` — 本页（论证为什么要核验）

三者形成完整链条：**为什么 → 怎么做框架 → 怎么做细节**
