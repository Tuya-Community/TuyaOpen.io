---
title: 编译指导
---

## 概述

本文说明 **`tos.py build`** 的流水线：`TuyaOpen/tools/cli_command/` 中 Python 如何驱动 CMake/Ninja、产物落在何处，顺序与 `cli_build.py` 中实现大致一致。

**改配置**（`choice`、`menu`、`app_default.config`）见 [Kconfig 与工程配置](../peripheral/tutorials/kconfig-and-project-configuration)。**SDK CMake 与 Kconfig 如何衔接**（`libtuyaos.a`、组件、应用目标）见 [CMake、Kconfig 与组件模型](cmake-kconfig-and-components)。**命令行用法与截图**见 [tos.py 工具指南](../tos-tools/tos-guide)。

## 构建流水线（概览）

```
tos.py build
    │
    ├── 环境检查（子模块）
    ├── 配置数据（.build/cache/using.config）
    ├── 平台下载（platform_config.yaml）
    ├── 平台钩子（prepare / build_setup 脚本）
    ├── CMake 配置（Ninja，工程 .build/）
    ├── Ninja 构建（如 ninja example）
    └── 输出校验（.build/bin/ 等）
```

## 1. 配置阶段（`cli_config.py`）

执行 **`tos.py config choice`**、**`tos.py config menu`** 等时（实现于 `TuyaOpen/tools/cli_command/cli_config.py`）：

1. 写入工程根目录的 **`app_default.config`**（预设覆盖或菜单保存）。
2. 合并**工程**、**`TuyaOpen/src`**、**`TuyaOpen/boards`** 的 Kconfig，在 **`<project>/.build/cache/`** 下生成中间文件（含 Kconfig 目录与解析后的 **`using.config`** 等）。

面向使用者的步骤与恢复办法：[Kconfig 与工程配置](../peripheral/tutorials/kconfig-and-project-configuration)。

## 2. 构建阶段（`cli_build.py`）

实现参考：**`TuyaOpen/tools/cli_command/cli_build.py`**。以下为常见顺序（具体函数名可能随版本略有差异）。

### 2.1 环境检查

确保 SDK 子模块就绪。等效命令：

```bash
git submodule update --init
```

### 2.2 配置初始化

保证 **`<project>/.build/cache/using.config`** 与当前 Kconfig 解析一致。下游常用符号包括：

- `CONFIG_PROJECT_NAME` — 项目名称  
- `CONFIG_PLATFORM_CHOICE` — 平台  
- `CONFIG_CHIP_CHOICE` — 芯片  
- `CONFIG_BOARD_CHOICE` — 开发板  
- `CONFIG_FRAMEWORK_CHOICE` — 框架类型  

### 2.3 平台下载

根据 **`TuyaOpen/platform/platform_config.yaml`**（及 git 元数据）克隆或更新所选平台代码到 **`TuyaOpen/platform/<platform_name>/`** 的固定提交。

```bash
git clone <repository_url> <tuyaopen_root>/platform/<platform_name>
cd <tuyaopen_root>/platform/<platform_name>
git checkout <commit_hash>
```

### 2.4 平台钩子（`platform_prepare` / `build_setup`）

若存在，平台目录可执行 **`platform_prepare.py`** 和/或 **`build_setup.py`**（拉取工具链、额外配置等）。逻辑上二选一即可；历史上可能两者都会跑。典型调用：

```bash
python <tuyaopen_root>/platform/<platform_name>/platform_prepare.py $CHIP
python <tuyaopen_root>/platform/<platform_name>/build_setup.py $PROJ_NAME $PLATFORM $FRAMEWORK $CHIP
```

### 2.5 CMake 与 Ninja

在 **`<project>/.build/`** 下用 Ninja 生成器配置 CMake，传入工程根、平台、板卡、芯片、框架等变量。概念上：

```bash
mkdir -p <project_root>/.build
cd <project_root>/.build
cmake -G Ninja $CMAKE_VERBOSE $OPEN_SDK_ROOT \
  -DTOS_PROJECT_NAME=$PROJ \
  -DTOS_PROJECT_ROOT=$PROJECT_ROOT \
  -DTOS_PROJECT_PLATFORM=$PROJECT_PLATFORM \
  -DTOS_FRAMEWORK=$PROJECT_FRAMEWORK \
  -DTOS_PROJECT_CHIP=$PROJECT_CHIP \
  -DTOS_PROJECT_BOARD=$PROJECT_BOARD
ninja example
```

**CMake 结构**（工具链、`src/` 组件、板级 BSP、应用 `CMakeLists.txt`、可选 `build_example.py`）：见 [CMake、Kconfig 与组件模型](cmake-kconfig-and-components)。

### 2.6 输出校验

构建会检查 **`.build/bin/`** 下是否生成预期二进制（见 `cli_build.py` 中 `check_bin_file` 等逻辑）。

## 工程与 SDK 目录（与构建相关）

```
TuyaOpen/                          # SDK 根（CMake 中 OPEN_SDK_ROOT）
├── tos.py
├── tools/cli_command/             # cli_build.py、cli_config.py 等
├── platform/                      # 已下载的平台树
├── src/                           # SDK 组件（各模块 CMake）
├── boards/                        # 板级 BSP
└── …

<project>/                         # 应用或例程（tos.py 工作目录）
├── CMakeLists.txt
├── app_default.config
├── Kconfig
└── .build/
    ├── bin/                       # 固件输出
    ├── lib/
    ├── cache/                     # Kconfig / 配置生成物
    └── build/build_param          # 构建元数据（若有）
```

## 编译输出

成功后常见产物：

- **二进制：** `.build/bin/{app_name}_QIO_{version}.bin`（具体命名因平台可能不同）
- **库：** `.build/lib/`
- **参数文件：** `.build/build/build_param`（若生成）

日志示例：

```
====================[ BUILD SUCCESS ]===================
 Target    : example_QIO_1.0.0.bin
 Output    : /path/to/project/.build/bin
 Platform  : T2
 Chip      : T2-U
 Board     : t2_evb
 Framework : base
========================================================
```

## 小结

- **配置**：`tos.py config` → 详见 [Kconfig 与工程配置](../peripheral/tutorials/kconfig-and-project-configuration)。  
- **构建**：`tos.py build` → 环境、平台、CMake/Ninja、校验如上。  
- **CMake 结构** → [CMake、Kconfig 与组件模型](cmake-kconfig-and-components)。
