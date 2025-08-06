---
title: 编译指导
---

# TuyaOpen 编译流程详解

## 概述

本文档详细介绍了 `TuyaOpen` 项目的编译流程，从执行 `tos.py build` 命令开始，到最终生成二进制文件的完整过程

`TuyaOpen` 使用 Python 脚本协调 CMake/Ninja 构建工具，支持多平台、多配置的编译


## 编译流程架构

```
tos.py build
    │
    ├── 环境检查
    ├── 配置初始化
    ├── 平台下载
    ├── 平台准备
    ├── 构建设置
    ├── CMake 配置
    ├── Ninja 构建
    └── 输出验证
```

## 流程说明

### 1. Config 命令执行 (cli_config.py)

当用户执行 `tos.py config choice` 命令时：

1. **文件替换**

    使用用户选择的配置文件替换默认的 `app_default.config` 文件

1. **生成CatalogKconfig**

    在 `.build/cache/` 目录下生成 `CatalogKconfig` 文件，包含所有 Kconfig 配置文件

    主要包含 `<project>/Kconfig` 、 `src/Kconfig` 和 `boards/Kconfig`

1. **生成using.config文件**

    根据 `CatalogKconfig` 提供的配置选项以及 `app_default.config` 文件提供的配置结果

    生成 `.build/cache/using.config` 文件

    该文件除了包含所有用户选择的代码相关配置信息外，还有一些编译相关的数据，例如：项目名称、版本、平台、开发板等信息

### 2. Build 命令执行 (cli_build.py)

相关逻辑可阅读文件：`tools/cli_command/cli_build.py`

#### 2.1 环境检查

```python
def env_check():
    ...
```

等效命令：

```bash
git submodule update --init
```

确保所有依赖的子模块都已正确更新。

#### 2.2 配置初始化

生成 `.build/cache/using.config` 文件

```python
init_using_config(force=False)
```

编译需要的主要配置项包括：
- `CONFIG_PROJECT_NAME`: 项目名称
- `CONFIG_PLATFORM_CHOICE`: 平台选择
- `CONFIG_CHIP_CHOICE`: 芯片型号
- `CONFIG_BOARD_CHOICE`: 开发板型号
- `CONFIG_FRAMEWORK_CHOICE`: 框架类型

#### 2.3 平台下载

```python
def download_platform(platform):
    ...
```

根据项目配置信息以及 `platform/platform_config.yaml` 文件提供的git信息，下载对应的硬件平台代码

平台代码存放在 `platform/` 目录下

等效命令：

```bash
git clone <repository_url> <tuyaopen_root>/platform/<platform_name>
cd <tuyaopen_root>/platform/<platform_name>
git checkout <commit_hash>
```

#### 2.4 平台准备

如果平台代码中存在 `platform_prepare.py` 脚本，则执行该脚本进行平台特定的准备工作：

```python
def prepare_platform(platform, chip=""):
    ...
```

请在此脚本中完成所需要的编译工具下载，推荐将工具链下载在`platform/tools`目录下

编译前需要的准备工作，例如：配置文件的更新、参数的设置等等，也可以在此脚本中实现

等效命令：

```bash
python <tuyaopen_root>/platform/<platform_name>/platform_prepare.py $CHIP
```

#### 2.5 构建设置

如果平台代码中存在 `build_setup.py` 脚本，则执行该脚本进行构建设置：

```python
def build_setup(platform, project_name, framework, chip=""):
    ...
```

此脚本的作用与 `2.4 平台准备` 中提到的 `platform_prepare.py` 相同，执行时机也相同

所以，只需要存在其中之一即可

*说明：由于TuyaOpen发展的某些历史原因，导致两个脚本会同时生效*

等效命令：

```bash
python <tuyaopen_root>/platform/<platform_name>/build_setup.py $PROJ_NAME $PLATFORM $FRAMEWORK $CHIP
```

#### 2.6 CMake 配置

生成 CMake 构建文件：

```python
def cmake_configure(using_data, verbose=False):
    ...
```

`TuyaOpen` 使用 CMake 构建系统，配置文件位于 `<tuyaopen_root>/CMakeLists.txt` 文件中

构建主要步骤见后文

等效命令：

```bash
mkdir <project_root>/.build
cd <project_root>/.build
cmake -G Ninja $CMAKE_VERBOSE $OPEN_SDK_ROOT -DTOS_PROJECT_NAME=$PROJ -DTOS_PROJECT_ROOT=$PROJECT_ROOT -DTOS_PROJECT_PLATFORM=$PROJECT_PLATFORM -DTOS_FRAMEWORK=$PROJECT_FRAMEWORK -DTOS_PROJECT_CHIP=$PROJECT_CHIP -DTOS_PROJECT_BOARD=$PROJECT_BOARD
```

#### 2.7 Ninja 构建

执行实际的编译过程：

```python
def ninja_build(build_path, verbose=False):
    ...
```

等效命令：

```bash
cd <project_root>/.build
ninja example
```

#### 2.8 输出验证

执行编译后，验证生成的二进制文件是否符合预期：

```python
def check_bin_file(using_data):
    ...
```

### 3. CMake 构建系统 (CMakeLists.txt)

主 CMakeLists.txt 文件负责整个项目的构建配置：

`<tuyaopen_root>/CMakeLists.txt`

#### 3.1 Kconfig 配置系统

- 使用 Kconfig 管理配置选项
- 包含 `using.cmake` 配置
- 生成 `tuya_kconfig.h` 头文件

#### 3.2 工具链配置

```cmake
include("${PLATFORM_PATH}/toolchain_file.cmake")
```

配置交叉编译工具链的具体位置，以及通的编译选项

```cmake
include("${PLATFORM_PATH}/platform_config.cmake")
```

配置应用层使用的头文件路径，根据`TuyaOpen`跨平台的设计，应该仅仅包含`tuyaos_adapter`相关的头文件路径

#### 3.3 组件编译
```cmake
# 编译 src/ 目录下的所有组件
list_components(COMPONENT_LIST "${TOP_SOURCE_DIR}/src")
foreach(comp ${COMPONENT_LIST})
    add_subdirectory("${TOP_SOURCE_DIR}/src/${comp}")
endforeach(comp)

# 编译板级代码
if(EXISTS "${TOP_SOURCE_DIR}/boards/${TOS_PROJECT_PLATFORM}/${TOS_PROJECT_BOARD}/CMakeLists.txt")
    add_subdirectory("${TOP_SOURCE_DIR}/boards/${TOS_PROJECT_PLATFORM}/${TOS_PROJECT_BOARD}")
endif()
```

每个组件可通过 `src/<component_name>/CMakeLists.txt` 文件进行编译配置

板级代码通过 `boards/<platform>/<board>/CMakeLists.txt` 文件进行编译配置

产物：`lib<component_name>.a`

#### 3.4 库文件生成
```cmake
# 生成 tuyaos 静态库，包含所有组件
add_library(${COMPONENTS_ALL_LIB} STATIC ${all_need})
```

产物：`libtuyaos.a`，包含所有组件的静态库

#### 3.5 应用编译
```cmake
# 编译应用代码
set(EXAMPLE_LIB "tuyaapp")
include(${TOS_PROJECT_ROOT}/CMakeLists.txt)
target_link_libraries(${EXAMPLE_LIB} ${COMPONENTS_ALL_LIB})
```

应用代码通过 `<project_root>/CMakeLists.txt` 文件进行编译配置

产物：`libtuyaapp.a`

#### 3.6 平台构建
```cmake
# 调用平台特定的构建脚本
if(EXISTS "${TOP_SOURCE_DIR}/platform/${TOS_PROJECT_PLATFORM}/build_example.py")
    set(BUILD_COMMAND python -u ./build_example.py)
```

由于 `TuyaOpen` 支持多平台编译，所有各平台的编译逻辑都可以通过 `platform/<platform_name>/build_example.py` 文件进行实现

脚本的主要作用参考：[build_example.py](../new-hardware/new-platform.md#编译和链接)

### 4. 关键文件和目录结构

```
TuyaOpen/
├── tos.py                    # 主入口脚本
├── tools/
│   ├── cli_command/         # CLI 命令实现
│   │   ├── cli_build.py     # build 命令实现
│   │   ├── cli_config.py    # config 命令实现
│   │   ├── util.py          # 工具函数
│   │   └── ...
│   ├── cmake/               # CMake 相关文件
│   └── kconfiglib/          # Kconfig 工具
├── platform/                # 平台代码目录
│   ├── platform_config.yaml # 平台配置
│   └── [platform_name]/     # 具体平台
├── src/                     # 源代码组件
├── boards/                  # 板级支持包
└── [project]/              # 用户项目目录
    ├── CMakeLists.txt      # 项目 CMake 文件
    ├── app_default.config  # 默认配置
    └── .build/             # 构建输出目录
        ├── bin/            # 二进制文件
        ├── lib/            # 库文件
        └── cache/          # 配置缓存
```

### 5. 编译输出

成功编译后，会在以下位置生成文件：

- **二进制文件**: `.build/bin/{app_name}_QIO_{version}.bin`
- **库文件**: `.build/lib/`
- **构建参数**: `.build/build/build_param`

输出信息示例：
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

## 总结

TuyaOpen 的编译系统通过 Python 脚本协调 CMake/Ninja 构建工具，实现了：

1. **多平台支持**: 通过平台抽象层支持不同硬件平台
2. **配置管理**: 使用 Kconfig 系统管理配置选项
3. **模块化设计**: 组件化的源代码结构
4. **自动化构建**: 一键编译，自动处理依赖

整个流程设计清晰，便于扩展和维护，适合 IoT 设备的跨平台开发。


## FAQ
