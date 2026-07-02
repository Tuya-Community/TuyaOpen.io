# 保守文件分割方案

## 🎯 原则
- **只分割代码，不改变逻辑**
- **保持所有依赖关系不变**
- **确保功能完全一致**

## 📁 最小分割方案

### 1. 保留核心类结构
```javascript
// script-main.js - 主要的 SerialTerminal 类（约1500行）
class SerialTerminal {
    constructor() { /* 保持不变 */ }
    // 核心方法保持在这里
}
```

### 2. 分离纯功能函数
```javascript
// script-utils.js - 工具函数（约300行）
function hexStringToBytes() { /* 从原文件移出 */ }
function sanitizeDisplayText() { /* 从原文件移出 */ }
function parseAnsiColors() { /* 从原文件移出 */ }
// 等等...
```

### 3. 分离常量配置
```javascript
// script-config.js - 配置常量（约200行）
const DEVICE_BAUDRATE_CONFIG = { /* 从原文件移出 */ };
const ANSI_COLORS = { /* 从原文件移出 */ };
// 等等...
```

### 4. 保持加载顺序
```html
<!-- index.html 中的加载顺序 -->
<script src="script-config.js"></script>
<script src="script-utils.js"></script>
<script src="script-main.js"></script>
```

## ✅ 优点
- 文件变小，更易维护
- 逻辑关系不变
- 功能100%保持
- 风险极低

## ⚠️ 风险评估
- **风险等级**: 极低
- **测试需求**: 基本回归测试即可
- **回滚方案**: 简单合并文件即可还原 