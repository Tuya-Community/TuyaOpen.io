---
title: CMake、Kconfig 与组件模型
---

## 概述

TuyaOpen 用 **CMake** 与 **Ninja** 执行实际编译，用 **Kconfig**（经 `tos.py config`）决定**编译哪些内容**。本文说明各层如何衔接：库从哪里来、SDK 根 `CMakeLists.txt` 与工程 `CMakeLists.txt` 的关系，以及扩展板级或组件时应改哪里。

**读者：** 移植板卡、增加组件或排查链接问题的开发者。

## 前置条件

- [编译指南](compilation-guide) — 有序的 **`tos.py build`** 流水线（环境检查 → 平台 → CMake/Ninja → 输出）。
- [Kconfig 与工程配置](../peripheral/tutorials/kconfig-and-project-configuration) — `app_default.config`、`tos.py config choice` / `menu`，以及 `.build/cache/` 下生成物。

## 要求

- 熟悉 CMake 基本概念（`add_subdirectory`、`target_link_libraries`、静态库）。
- 本地 [TuyaOpen](https://github.com/tuya/TuyaOpen) 树（`TuyaOpen/` = SDK 根，`<project>/` = app 或 example 目录）。

## 配置到 CMake（概念流程）

1. 工程根目录的 **`app_default.config`** 记录 Kconfig 选择（最小差异）。
2. **`tos.py config`** / **`tos.py build`** 将上述选择与 `TuyaOpen/src`、`TuyaOpen/boards` 及工程自身 `Kconfig` 合并，在 **`<project>/.build/cache/`** 生成中间数据（详见 [编译指南](compilation-guide)）。
3. **CMake** 携带工程名、平台、板卡、芯片等变量，选用对应工具链、BSP 与组件集合。
4. **Kconfig 输出** 由 CMake 侧消费（例如通过生成头文件），使 `CONFIG_*` 与参与编译的源文件、宏一致。

本文侧重**结构与职责**；[编译指南](compilation-guide) 列出构建步骤与脚本入口。

## 顶层 CMake 结构（SDK）

SDK 根目录 **`TuyaOpen/CMakeLists.txt`** 负责：

- `TuyaOpen/platform/<platform>/` 下的工具链与平台 CMake 片段。
- **`TuyaOpen/src/<component>/`** 下各组件（通常各有 `CMakeLists.txt`）。
- **`TuyaOpen/boards/<platform>/<board>/`** 下存在 `CMakeLists.txt` 时的板级支持。
- **你的应用** — 工程根目录的 **`CMakeLists.txt`**（与 `app_default.config` 同级）构建应用静态库，并链接到聚合后的 SDK 库。

简要归纳：遍历 **`src/`** 各组件（各有 `CMakeLists.txt`），可选加入 **`boards/<platform>/<board>/`**，生成 **`libtuyaos.a`**，再 **`include(${TOS_PROJECT_ROOT}/CMakeLists.txt)`** 并将目标 **`tuyaapp`** 链接到该库（与 [编译指南](compilation-guide) 中 CMake/Ninja 一步一致）。

## 链接产物

| 产物 | 典型作用 |
|----------|----------------|
| **`libtuyaos.a`** | 由 `src/` 下已启用组件（及配置的板级衔接）生成的静态库。 |
| **`libtuyaapp.a`**（目标 `tuyaapp`） | 工程 `CMakeLists.txt` 中的应用源码。 |
| **平台脚本** | 若存在 `platform/<platform>/build_example.py`，在 CMake/Ninja 之后执行平台相关的打包或分区等逻辑。 |

具体目标名与选项可能因平台略有差异，以对应平台 CMake 与 [编译指南](compilation-guide) 构建阶段为准。

## 工程目录与 SDK 根

| 位置 | 作用 |
|----------|------|
| **`TuyaOpen/`** | SDK：`src/`、`boards/`、`platform/`、根 `CMakeLists.txt`、`tos.py`。 |
| **`<project>/`**（如 `apps/...`、`examples/...`） | 应用：`CMakeLists.txt`、`app_default.config`、`Kconfig`、可选 `config/*.config`、构建输出 `.build/`。 |

日常应用编译应在 **`<project>/`** 执行 `tos.py`，而不是仅在 `TuyaOpen/` 根目录。

## Ninja 与 `.build`

CMake 生成 **Ninja** 工程。构建树位于 **`<project>/.build/`**（二进制在 `.build/bin/`，库在 `.build/lib/`，缓存在 `.build/cache/`）。勿将 `.build/` 提交到版本库。

## 扩展方式

- **新增 SDK 组件** — 在 `TuyaOpen/src/<name>/` 增加目录与 `CMakeLists.txt`，并在 Kconfig 中可被选；可参照现有小组件。
- **新板或定制板** — BSP 放在 `TuyaOpen/boards/<platform>/<board>/`，含 CMake 与 Kconfig；见 [新建开发板](../new-hardware/new-board) 与 [编译指南](compilation-guide)。
- **仅改应用** — 通常只动工程 `CMakeLists.txt` 与 `app_default.config` / 工程侧 `Kconfig`；勿手改 `.build/cache/` 下生成文件。

## 预期结果

能从 **Kconfig 符号** → **参与编译的源文件** → **CMake 目标** → **最终固件** 追溯一条功能链路，并知道应改 `src`、`boards` 还是工程树。

## 参考

- [编译指南](compilation-guide)
- [Kconfig 与工程配置](../peripheral/tutorials/kconfig-and-project-configuration)
- [新建平台](../new-hardware/new-platform)、[新建开发板](../new-hardware/new-board)
- [tos.py 工具指南](../tos-tools/tos-guide)
