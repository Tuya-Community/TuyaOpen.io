<section id="before-install" className="section">

## 安装前准备

TuyaOpen IDE 是 **VS Code** 或 **Cursor** 的扩展，必须先装好其中一个宿主编辑器（同一个安装包两者通用）。

| 宿主编辑器 | 下载地址 | 说明 |
| --- | --- | --- |
| **VS Code** | https://code.visualstudio.com | 通用生态最广。 |
| **Cursor** | https://cursor.com | 自带更强 AI 能力。 |

:::warning
VS Code 应用市场与 Open VSX 搜索暂时均不可用。请通过 AI 编程 Agent 或下方手动 `.vsix` 安装，不要期望在编辑器内搜索找到它。
:::

</section>

<section id="ai-agent-install" className="section">

## 方式一：让 AI Agent 帮你安装（最快）

把下面这段提示词粘贴到 **Claude Code、Cursor、Codex 或任意能执行 shell 命令的 Coding Agent** 中，它会自动下载并安装扩展。

```text
安装 TuyaOpen IDE 扩展。从
https://open-vsx.org/api/TuyaOpen/TuyaOpenIDE/0.1.1/file/TuyaOpen.TuyaOpenIDE-0.1.1.vsix
下载最新 .vsix，然后用 `code --install-extension <路径.vsix>`（VS Code）或
`cursor --install-extension <路径.vsix>`（Cursor）安装，并重新加载编辑器窗口让扩展生效。
```

**安装步骤：**

1. 打开 Cursor（此处作为演示），把提示词输入 Agent。

   ![在 Cursor Agent 中粘贴安装提示词](/img/ide/get-started/install-prompt-in-cursor.png)

2. 执行完成后，打开 Cursor。在**扩展**视图里能看到 **TuyaOpen IDE** 已安装并启用。

   ![扩展面板中 TuyaOpen IDE 显示为已启用](/img/ide/get-started/extensions-panel-tuyaopen-enabled.png)

3. 点击窗口下栏右侧的 **TuyaOpen**，即可开始使用。

   ![编辑器状态栏的 TuyaOpen 入口](/img/ide/get-started/install-status-bar-tuyaopen.png)

:::note
提示词里的下载链接会指向**最新版本**的 `.vsix`。Agent 收到后会自动完成「下载 → 安装 → 重新加载」全流程，无需手动操作。
:::

</section>

<section id="manual-vsix" className="section">

## 方式二：手动安装 .vsix

同一个安装包，**VS Code 与 Cursor 通用**。

下载地址：[TuyaOpen.TuyaOpenIDE-0.1.1.vsix](https://open-vsx.org/api/TuyaOpen/TuyaOpenIDE/0.1.1/file/TuyaOpen.TuyaOpenIDE-0.1.1.vsix)（v0.1.1 · Windows · macOS · Linux · 通用）。

下面用 VS Code 演示手动安装。

1. 点击上方链接下载 `.vsix` 文件。
2. 打开 VS Code，进入扩展视图 —— `Ctrl+Shift+X`（macOS 为 `⌘+Shift+X`）。
3. 点击扩展面板右上角的 `⋯` 菜单。
4. 选择「从 VSIX 安装…」，选中刚刚下载的文件。

   ![从扩展面板菜单安装 VSIX](/img/ide/get-started/install-vsix-vscode-menu.png)

5. 根据提示重新加载编辑器，即可开始使用。

</section>

<section id="verify" className="section">

## 验证安装

重新加载编辑器后，确认两点：

1. **命令面板有 TuyaOpen 命令**：按 `Ctrl+Shift+P`（macOS：`⌘+Shift+P`），输入 `TuyaOpen`，能看到一组 TuyaOpen 命令。

   ![命令面板中的 TuyaOpen 命令](/img/ide/get-started/command-palette-tuyaopen-commands.png)

2. **扩展已启用**：在扩展视图（`Ctrl+Shift+X`）中找到 "TuyaOpen IDE"，状态为「已启用」。

</section>

<section id="troubleshoot" className="section">

## 安装失败怎么办

最常见三类：

- **`.vsix` 装不上** —— 检查 VS Code / Cursor 版本是否过低，扩展要求 VS Code 内核 `^1.85.0` 及以上。
- **扩展装了不显示** —— 根据提示重新加载编辑器，或彻底重启编辑器。
- **命令面板找不到 TuyaOpen 命令** —— 确认扩展已「启用」（扩展面板里没被禁用）。

</section>

<section id="next" className="section">

## 下一步

你已经准备好开始开发了。从 [**实战一：Hello World**](/learn/tuyaopen-ide-practice-1) 开始——不写一行代码跑通官方示例，掌握 IDE 基础操作。

</section>
