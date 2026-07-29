---
title: 设置
description: "设置页的完整参考——更新中心、外观与语言、诊断与日志、串口日志、关于，以及设置的持久化方式。"
keywords:
  - tyutool 设置
  - 更新中心
  - 外观
  - 诊断
  - 日志文件
  - tuyaopen
---

本页是**设置**页的完整参考：更新中心、外观与语言、诊断与日志、串口日志、关于，以及设置的持久化方式。

## 更新中心
- **当前版本（Installed build）**。
- **检查更新** —— 仅桌面端（Tauri），打开 Update 对话框，不受间隔限制。
- **自动检查间隔** —— 启动时静默检查，超间隔才触发。选项：`Off` / `1h` / `6h` / `12h` / `24h`。

<img src="https://images.tuyacn.com/fe-static/docs/img/f22b0361-f20d-4409-a54a-cb06aecee76c.png" alt="更新中心——当前版本、检查更新、自动检查间隔" width="800" />

*更新中心——当前版本、检查更新、自动检查间隔。*

:::note
Web 端无自动更新（依赖 Tauri updater 插件）。
:::

## 外观与语言
- **主题** —— `Light` / `Dark` / `System`（立即生效，System 跟随系统）。
- **语言** —— `Auto` / `简体中文` / `English`（Auto：`zh` 开头用中文）。
- **串口指示器** 开关。

<img src="https://images.tuyacn.com/fe-static/docs/img/1cc98c22-de98-4071-9bf7-947776a20d4a.png" alt="外观与语言——主题、语言、串口指示器开关" width="800" />

*外观与语言——主题、语言、串口指示器开关。*

:::info
高级 UART 参数在串口调试页（见[串口调试](./serial-debug.md)）。
:::

## 诊断与日志
- **调试日志开关** —— 总开关，关闭则后端 log level = `off`。
- **日志级别** —— Error / Warn / Info / Debug / Trace，经 `log::set_max_level` 应用到 Rust 后端。
- **打开日志文件夹。**
- **查看日志** —— 打开 LogViewer 对话框。
- **导出日志并报告问题** —— 打包日志并打开预填的 GitHub issue（含版本/OS）；仅桌面端。

<img src="https://images.tuyacn.com/fe-static/docs/img/9e386063-2403-4652-b866-6592453c8e0c.png" alt="诊断与日志——日志开关、级别、打开/查看/导出操作" width="800" />

*诊断与日志——日志开关、级别、打开/查看/导出操作。*

### 日志文件如何落地

日志由 `tauri-plugin-log` 写入。按会话命名 `tyutool-<时间戳>.log`；10 MB 滚动到 `-1.log`、`-2.log`，启动时清理旧文件。日志目录：

- Linux：`~/.local/share/tyutool/`
- macOS：`~/Library/Application Support/tyutool/`
- Windows：`%APPDATA%\tyutool\`

:::note
级别作用在 Rust 后端。
:::

## 串口日志
串口调试自动保存的镜像入口：自动保存开关、保存目录、时间戳格式。

:::note
与串口调试页是同一份 store。
:::

## 关于
- **应用版本。**
- **开源许可** —— 打开 LICENSE 页面。

## 持久化

- **桌面端**写 `settings.json`（`tauri-plugin-store`）。
- **Web 端**写 localStorage。
- 主题应用到 DOM（System 模式监听系统配色）。

:::note
桌面端 `settings.json` 键名与 Web 端 localStorage 一一对应。
:::
