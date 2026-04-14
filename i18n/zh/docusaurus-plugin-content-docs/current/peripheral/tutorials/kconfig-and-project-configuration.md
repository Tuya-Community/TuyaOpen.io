---
title: Kconfig 与工程配置
---

## 概述

TuyaOpen 使用 **Kconfig**（菜单式选项）和每个应用/例程目录下的 **`app_default.config`** 保存配置。`tos.py config` 将两者衔接：先选板级预设，再可选图形菜单，结果写回 `app_default.config`。

本文分两部分：

1. **日常使用** — 选板、改常用功能、配置搞坏时如何恢复。
2. **深入说明** — Kconfig 如何串联、配置如何进到编译环节（面向 BSP、驱动或构建相关开发）。

**读者：** 应用开发者（前半）与 BSP/驱动开发者（深入小节）。

## 前置条件

- 已完成 [环境搭建](../../quick-start/enviroment-setup)，能在工程目录运行 `tos.py`（见 [tos.py 工具指南](../../tos-tools/tos-guide)）。
- 本地克隆 [TuyaOpen](https://github.com/tuya/TuyaOpen) 仓库；下文以 `TuyaOpen/` 表示 SDK 根目录。

## 要求

- 终端当前目录为**工程目录**（例如 `TuyaOpen/apps/tuya_cloud/switch_demo` 或 `TuyaOpen/examples/peripherals/gpio`）。
- 仅改配置不需要涂鸦云授权码；若编译云相关 demo，仍须按其文档完成授权等步骤。

## 日常使用

### `app_default.config` 是什么

每个 app 或 example 根目录下有 **`app_default.config`**，只保存**与默认值不同**的 Kconfig 项（最小差异）。与 SDK 内各棵 Kconfig 树一起，决定平台、板卡、组件开关等。

结构说明见 [TuyaOpen 目录说明 — `app_default.config`](../../project-walkthrough#app_defaultconfig)。

### 步骤 1：选择板级预设（`tos.py config choice`）

在**工程目录**执行：

```bash
tos.py config choice
```

会列出编号的 **`.config` 预设**。选择后会用该预设**替换** `app_default.config`。预设来源：

1. 工程内存在 **`config/`** 目录时，优先使用该目录下的配置；
2. 否则使用 `TuyaOpen/boards/` 下的板级配置（`examples/` 下常见）。

若只想列出 **`boards/`** 中的预设（忽略工程内 `config/`），使用：

```bash
tos.py config -d choice
```

**Note:** `choice` 与 `menu` 会先执行**深度清理**，因配置变更可能切换工具链或平台。

### 步骤 2：调整选项（`tos.py config menu`）

打开 **menuconfig** 图形菜单：

```bash
tos.py config menu
```

在菜单中保存退出后，会更新 **`app_default.config`**。教程要求打开某驱动、LVGL、蓝牙角色等时，通常走这一步。

截图与命令说明：[tos.py — config](../../tos-tools/tos-guide#config)。

### 步骤 3（可选）：保存自定义预设（`tos.py config save`）

在得到可用的 `app_default.config`（常用在 `menu` 之后）后，可将其快照保存到工程 **`config/`** 目录：

```bash
tos.py config save
```

按提示输入名称，之后可用 `tos.py config choice` 再次选用。适合团队或区分调试/发布配置。

### 配置导致编译失败时

- 再次执行 **`tos.py config choice`**，选回已知可用的预设。
- 若版本库中有可用的 `app_default.config`，可检出恢复。
- 若菜单组合不兼容，可联系支持；参见 [tos.py config menu](../../tos-tools/tos-guide#config-menu) 的警告说明。

## 深入说明（开发者）

### Kconfig 定义分布在哪里

选项分散在 SDK 与工程中：

- **工程** — app/example 根目录的 `Kconfig`（应用特有选项）。
- **SDK** — `TuyaOpen/src/Kconfig` 及子树（Wi-Fi、蓝牙、显示等组件）。
- **板级** — `TuyaOpen/boards/<platform>/...` 提供芯片与开发板相关选项。

`tos.py config` 会汇总为目录，再与 `app_default.config` 合并解析。

### 可查看的生成文件

执行 `config` 或 `build` 后，工程下的 **`.build/cache/`**（在工程目录内，非 SDK 根）通常会有生成的配置中间结果。具体文件名可能随工具版本变化；该目录视为**生成物** — 应改 `app_default.config` 或用 `menu`，不要手改缓存文件。

配置如何接到 CMake，见 [编译指南](../../build-system/compilation-guide) 中对 **`using.config`** 等步骤的说明，以及 [CMake、Kconfig 与组件模型](../../build-system/cmake-kconfig-and-components)。

### C 代码中的 `CONFIG_*` 宏

启用的选项一般会变成带 `CONFIG_` 前缀等的预处理器宏，并通过生成头文件参与编译。Kconfig 里的 `select`、`depends on` 决定哪些源文件与宏参与链接。

### ESP32 与 IDF menuconfig

在已配置为 ESP32 的工程上，可使用 `tos.py idf menuconfig` 进入原生 ESP-IDF 配置。见 [tos.py idf 参考](../../tos-tools/tos-idf-reference)。

## 预期结果

完成 `choice` 或 `menu` 后，`app_default.config` 反映所选板卡与功能，下一次 **`tos.py build`** 将按该配置编译。

## 参考

- [tos.py 工具指南](../../tos-tools/tos-guide)（config choice、menu、save）
- [TuyaOpen 目录说明 — `app_default.config`](../../project-walkthrough#app_defaultconfig)
- [编译指南](../../build-system/compilation-guide)（配置阶段、CMake）
- [CMake、Kconfig 与组件模型](../../build-system/cmake-kconfig-and-components)
- [Display](../display)（文内「Kconfig 配置」小节为显示相关选项示例）
