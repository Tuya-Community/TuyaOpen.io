---
title: "安装 TuyaOpen IDE"
description: "先安装 Git，再在 VS Code 或 Cursor 中安装 TuyaOpen IDE 扩展——让 AI 编程 Agent 帮你装，或从官网下载 .vsix 手动安装，然后验证已启用。"
sidebar_label: "02 安装 TuyaOpen IDE"
sidebar_position: 2
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - 嵌入式开发
---

## 安装 Git {/* #install-git */}

TuyaOpen IDE 用 **Git** 来克隆 TuyaOpen SDK，并把 Vibe Coding 技能安装到你的项目里。请在创建第一个项目之前，先装好 Git。

| 操作系统 | 安装方式 |
| --- | --- |
| **Windows** | 从 [git-scm.com](https://git-scm.com/download/win) 下载安装包并运行。 |
| **macOS** | 运行 `brew install git`，或运行一次 `git`，让 macOS 提示安装 Xcode 命令行工具。 |
| **Linux** | 用包管理器安装，例如 Debian/Ubuntu 上执行 `sudo apt install git`。 |

检查 Git 是否已在 PATH 中：

```bash
git --version
```

## 安装前准备 {/* #before-install */}

TuyaOpen IDE 是 **VS Code** 或 **Cursor** 的扩展，必须先装好其中一个宿主编辑器（同一个安装包两者通用）。

| 宿主编辑器 | 下载地址 | 说明 |
| --- | --- | --- |
| **VS Code** | https://code.visualstudio.com | 通用生态最广。 |
| **Cursor** | https://cursor.com | 自带更强 AI 能力。 |

:::warning
VS Code 应用市场与 Open VSX 搜索暂时均不可用。请通过 AI 编程 Agent 或下方手动 `.vsix` 安装，不要期望在编辑器内搜索找到它。
:::

## 方式一：让 AI Agent 帮你安装（最快） {/* #ai-agent-install */}

把下面这段提示词粘贴到 **Claude Code、Cursor、Codex 或任意能执行 shell 命令的 Coding Agent** 中，它会自动下载并安装扩展。

```text
安装 TuyaOpen IDE 扩展。从
https://open-vsx.org/api/TuyaOpen/TuyaOpenIDE/0.1.5/file/TuyaOpen.TuyaOpenIDE-0.1.5.vsix
下载最新 .vsix，然后用 `code --install-extension <路径.vsix>`（VS Code）或
`cursor --install-extension <路径.vsix>`（Cursor）安装，并重新加载编辑器窗口让扩展生效。
```

**安装步骤：**

1. 打开 Cursor（此处作为演示），把提示词输入 Agent。

   ![在 Cursor Agent 中粘贴安装提示词](https://images.tuyacn.com/fe-static/docs/img/770f7e90-253c-4918-89fe-5f5176ae9270.png?imageMogr2/format/webp)

2. 执行完成后，打开 Cursor。在**扩展**视图里能看到 **TuyaOpen IDE** 已安装并启用。

   ![扩展面板中 TuyaOpen IDE 显示为已启用](https://images.tuyacn.com/fe-static/docs/img/655ab202-44b6-42ff-95d8-d84e890db5fc.png?imageMogr2/format/webp)

3. 点击窗口下栏右侧的 **TuyaOpen**，即可开始使用。

   ![编辑器状态栏的 TuyaOpen 入口](https://images.tuyacn.com/fe-static/docs/img/94a6bc47-dfe5-4507-a0e1-461d6ceaf863.png?imageMogr2/format/webp)

:::note
提示词里的下载链接会指向**最新版本**的 `.vsix`。Agent 收到后会自动完成「下载 → 安装 → 重新加载」全流程，无需手动操作。
:::

## 方式二：从官网下载 .vsix {/* #manual-vsix */}

从 TuyaOpen IDE 官网获取 `.vsix`，确保始终拿到**最新版本**。同一个安装包，**VS Code 与 Cursor 通用**。

1. 打开 [TuyaOpen IDE 官网页面](/tuyaopen-ide)，点击**安装插件**。

   ![官网 TuyaOpen IDE 页面上的安装插件按钮](https://images.tuyacn.com/fe-static/docs/img/c82a6480-f298-409c-a94e-d6c7b3b8f6da.png?imageMogr2/format/webp)

2. 在安装对话框中，点击**下载 .vsix**，下载最新安装包。

   ![安装对话框中的下载 .vsix 按钮](https://images.tuyacn.com/fe-static/docs/img/240bcbb0-7ff5-4335-8a45-909bdf8189a8.png?imageMogr2/format/webp)

3. 打开 VS Code，进入**扩展**视图 —— `Ctrl+Shift+X`（macOS 为 `⌘+Shift+X`）。

4. 点击扩展面板右上角的 `⋯` 菜单。

5. 选择「从 VSIX 安装…」，选中刚刚下载的文件。

   ![从扩展面板菜单安装 VSIX](https://images.tuyacn.com/fe-static/docs/img/de49f2c4-4069-45a2-8e0d-ede08afb7769.png?imageMogr2/format/webp)

6. 根据提示重新加载编辑器，即可开始使用。

## 验证安装 {/* #verify */}

重新加载编辑器后，确认两点：

1. **命令面板有 TuyaOpen 命令**：按 `Ctrl+Shift+P`（macOS：`⌘+Shift+P`），输入 `TuyaOpen`，能看到一组 TuyaOpen 命令。

   ![命令面板中的 TuyaOpen 命令](https://images.tuyacn.com/fe-static/docs/img/bf85bf2a-1c5f-45f1-80ef-bf67865f482b.png?imageMogr2/format/webp)

2. **扩展已启用**：在扩展视图（`Ctrl+Shift+X`）中找到 "TuyaOpen IDE"，状态为「已启用」。

## 安装失败怎么办 {/* #troubleshoot */}

最常见三类：

- **`.vsix` 装不上** —— 检查 VS Code / Cursor 版本是否过低，扩展要求 VS Code 内核 `^1.85.0` 及以上。
- **扩展装了不显示** —— 根据提示重新加载编辑器，或彻底重启编辑器。
- **命令面板找不到 TuyaOpen 命令** —— 确认扩展已「启用」（扩展面板里没被禁用）。

## 下一步 {/* #next */}

你已经准备好开始开发了。从 [**实战一：Hello World**](./hello-world.md) 开始——不写一行代码跑通官方示例，掌握 IDE 基础操作。

