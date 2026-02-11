# TuyaOpen.io 文档编写规范指南

## 📁 文档目录结构

### 英文文档（主文档）
```
docs/
├── about-tuyaopen.md                    # 顶级文档
├── quick-start/                         # 分类目录
│   ├── index.md                        # 分类索引页
│   ├── unboxing.md
│   └── ...
├── hardware-specific/
│   └── tuya-t5/
│       ├── develop-with-arduino/         # 子分类
│       │   ├── Introduction.md
│       │   └── Quick_start.md
│       └── ...
└── ...
```

### 中文文档（翻译）
```
i18n/zh/docusaurus-plugin-content-docs/current/
├── about-tuyaopen.md                    # 与英文文档同名
├── quick-start/
│   ├── index.md
│   └── ...
├── hardware-specific/
│   └── tuya-t5/
│       ├── develop-with-arduino/
│       │   ├── Introduction.md         # 与英文文档同名
│       │   └── Quick_start.md
│       └── ...
└── ...
```

## ✍️ 文档编写规范

### 1. 文件命名规则

#### ✅ 推荐做法
- **英文文档和中文文档使用相同的文件名**
- 使用 kebab-case（连字符）：`device-debug.md`
- 或使用 PascalCase：`Introduction.md`
- 文件名应具有描述性

#### ❌ 避免
- 不要使用中文文件名
- 避免空格：`Quick Start.md` ❌
- 避免特殊字符：`开发@Arduino.md` ❌

### 2. 文档 Front Matter（元数据）

#### 可选的 Front Matter
大多数文档不需要 Front Matter，Docusaurus 会自动从文件名和内容生成标题。

```markdown
# Quick Start

文档内容...
```

#### 需要 Front Matter 的情况
当需要自定义 ID 或标题时：

**英文文档：**
```markdown
---
id: overview-t5-ai-board
title: T5AI-Board Overview
---

# T5AI-Board Development Kit
```

**中文文档：**
```markdown
---
id: overview-t5-ai-board
title: T5AI-Board 概述
---

# **T5AI-Board** 开发套件
```

**注意：**
- `id` 必须在中英文版本中保持一致（用于路由）
- `title` 应该根据语言翻译

### 3. 创建新文档的完整流程

#### 步骤 1：创建英文文档
```bash
# 在 docs/ 下创建文件
docs/hardware-specific/tuya-t5/develop-with-arduino/Introduction.md
docs/hardware-specific/tuya-t5/develop-with-arduino/Quick_start.md
```

#### 步骤 2：创建对应的中文文档
```bash
# 在 i18n/zh/ 下创建相同路径和文件名
i18n/zh/docusaurus-plugin-content-docs/current/hardware-specific/tuya-t5/develop-with-arduino/Introduction.md
i18n/zh/docusaurus-plugin-content-docs/current/hardware-specific/tuya-t5/develop-with-arduino/Quick_start.md
```

#### 步骤 3：更新 sidebars.js
在 `sidebars.js` 中添加文档引用：

```javascript
{
  type: 'category',
  label: 'Develop with Arduino',  // 英文标签
  collapsed: false,
  items: [
    'hardware-specific/tuya-t5/develop-with-arduino/Introduction',
    'hardware-specific/tuya-t5/develop-with-arduino/Quick_start',
  ],
}
```

**注意：**
- 路径不包含 `docs/` 前缀
- 路径不包含 `.md` 后缀
- 使用 `/` 分隔符

#### 步骤 4：添加中文翻译到 i18n 配置
在 `i18n/zh/docusaurus-plugin-content-docs/current.json` 中添加：

```json
{
  "sidebar.docs.category.Develop with Arduino": {
    "message": "使用 Arduino 开发",
    "description": "The label for category Develop with Arduino in sidebar docs"
  }
}
```

**翻译规则：**
- 键名格式：`sidebar.docs.category.{英文Label}`
- `message`: 中文翻译
- `description`: 保持英文（用于开发者理解）

## 📋 文档内容规范

### 标题层级
```markdown
# 一级标题（H1）- 页面主标题，每个文档只有一个

## 二级标题（H2）- 主要章节

### 三级标题（H3）- 子章节

#### 四级标题（H4）- 详细说明
```

### 代码块
````markdown
```bash
npm install
```

```javascript
const config = { ... }
```
````

### 链接规范

#### 内部链接（推荐使用相对路径）
```markdown
[快速开始](/docs/quick-start/index)
[T5AI-Board](../t5-ai-board/overview-t5-ai-board)
```

#### 外部链接
```markdown
[GitHub](https://github.com/tuya/TuyaOpen)
```

### 图片规范
```markdown
![描述文字](https://images.tuyacn.com/path/to/image.png)
```

图片通常托管在 CDN 上，使用绝对 URL。

### 提示框
```markdown
:::tip 提示
这是一个提示信息
:::

:::warning 警告
这是一个警告信息
:::

:::danger 危险
这是一个危险提示
:::

:::info 信息
这是一个信息提示
:::
```

## 🔄 侧边栏配置详解

### 基本结构

```javascript
module.exports = {
  docs: [
    // 1. 单个文档
    'about-tuyaopen',  // docs/about-tuyaopen.md
    
    // 2. 分类（带索引页）
    {
      type: 'category',
      label: 'Getting Started',    // 显示在侧边栏的标签
      collapsed: false,            // 默认展开
      link: {
        type: 'doc',
        id: 'quick-start/index',   // 分类索引页
      },
      items: [
        'quick-start/unboxing',
        'quick-start/enviroment-setup',
      ],
    },
    
    // 3. 嵌套分类
    {
      type: 'category',
      label: 'Hardware Guides',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Tuya T5',
          collapsed: false,
          items: [
            'hardware-specific/tuya-t5/t5ai-peripheral-mapping',
            {
              type: 'category',
              label: 'Develop with Arduino',
              collapsed: true,
              items: [
                'hardware-specific/tuya-t5/develop-with-arduino/Introduction',
                'hardware-specific/tuya-t5/develop-with-arduino/Quick_start',
              ],
            },
          ],
        },
      ],
    },
  ],
}
```

## 🌐 国际化 (i18n) 配置

### docusaurus.config.js 中的配置
```javascript
i18n: {
  defaultLocale: 'en',           // 默认语言
  locales: ['en', 'zh'],         // 支持的语言
  localeConfigs: {
    en: { label: 'English' },
    zh: { label: '简体中文' },
  },
}
```

### 翻译文件结构
```
i18n/
├── en/                          # 英文翻译（可选，默认使用 docs/）
└── zh/                          # 中文翻译
    ├── docusaurus-plugin-content-docs/
    │   ├── current/             # 当前版本的文档翻译
    │   │   ├── quick-start/
    │   │   │   └── index.md
    │   │   └── ...
    │   └── current.json         # 侧边栏标签翻译
    ├── docusaurus-plugin-content-blog/
    │   └── ...                  # 博客翻译
    └── docusaurus-theme-classic/
        └── ...                  # UI 翻译
```

## 🔧 常见问题

### Q1: 为什么侧边栏显示英文而不是中文？
**A:** 需要在 `i18n/zh/docusaurus-plugin-content-docs/current.json` 中添加翻译。

### Q2: 新增文档后看不到？
**A:** 检查以下几点：
1. 文档路径是否正确
2. sidebars.js 中是否添加了引用
3. 文件名拼写是否正确
4. 开发服务器是否重启

### Q3: 链接跳转 404？
**A:** 检查：
1. 目标文档是否存在
2. 路径是否正确（不要包含 .md 后缀）
3. 文档 ID 是否正确

### Q4: 中英文文档需要相同的 ID 吗？
**A:** 是的！如果使用 Front Matter 中的 `id`，中英文版本必须保持一致。

## 📝 最佳实践总结

### ✅ 推荐做法
1. **英文文档优先**：先完成英文文档，再翻译成中文
2. **保持一致性**：中英文使用相同的文件名和目录结构
3. **使用相对路径**：内部链接使用相对路径，便于维护
4. **及时更新翻译**：添加英文文档后立即添加对应的中文翻译
5. **遵循命名规范**：使用 kebab-case 或 PascalCase
6. **合理使用 Front Matter**：只在需要自定义 ID 或标题时使用

### ❌ 避免
1. 中英文文档使用不同的文件名
2. 忘记更新 sidebars.js
3. 忘记添加 i18n 翻译
4. 在文档路径中使用中文字符
5. 过度使用 Front Matter

## 🚀 快速检查清单

添加新文档时，确保完成以下步骤：

- [ ] 在 `docs/` 下创建英文文档
- [ ] 在 `i18n/zh/docusaurus-plugin-content-docs/current/` 下创建对应的中文文档
- [ ] 在 `sidebars.js` 中添加文档引用
- [ ] 在 `i18n/zh/docusaurus-plugin-content-docs/current.json` 中添加分类标签的中文翻译
- [ ] 本地测试英文和中文版本
- [ ] 检查链接是否正常工作

## 📚 相关资源

- [Docusaurus 官方文档](https://docusaurus.io/docs)
- [Docusaurus i18n 教程](https://docusaurus.io/docs/i18n/tutorial)
- [项目 README](./README.md)
