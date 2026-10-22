---
title: 把库加入工程
description: "把 TuyaOpen Core 集成进现有构建：普通 CMake 工程 include tuyaopen-core.cmake；ESP-IDF 工程通过 EXTRA_COMPONENT_DIRS 添加两个组件。"
keywords:
  - tuyaopen core
  - cmake 集成
  - esp-idf 组件
  - extra_component_dirs
---

TuyaOpen Core 以库的形式加入已有工程，支持两条集成路径：面向 Linux 等 CMake 主机的**普通 CMake**，以及面向乐鑫芯片的 **ESP-IDF 组件**。

## 前提条件

- 已取得 TuyaOpen Core SDK；需要平台移植时，仓库自带 `port/linux` 与 `port/esp-idf`。
- 已检出 SDK 树中的第三方依赖：

  ```bash
  git submodule update --init
  ```

  这会拉取 IoT 核心使用的 mbedTLS、cJSON、coreMQTT、coreHTTP 与 backoffAlgorithm。
- 已准备设备三元组（`PID`、`UUID`、`AuthKey`）用于云端激活。授权术语见 [快速开始](../quick-start/index.md)，创建产品见 [创建产品与 Agent](../cloud/tuya-cloud/creating-new-product.md)。

## 普通 CMake

入口文件是仓库根目录的 `tuyaopen-core.cmake`。它定义聚合接口目标 `tuyaopen-core`、接口目标 `tuyaopen-headers`，以及缓存变量 `TUYAOPEN_CORE_LIBS`。

1. 在你自己的 `project()` 调用之后，include 核心文件并把移植层作为子目录加入：

   ```cmake
   include(${TUYAOPEN_CORE_DIR}/tuyaopen-core.cmake)
   add_subdirectory(${TUYAOPEN_CORE_DIR}/port/linux tuyaopen-port)
   ```

   移植层会把平台头文件注入 `tuyaopen-headers` 目标。不要直接 include 仓库根目录的 `CMakeLists.txt`——那是 ESP-IDF 组件入口，内部会调用 `idf_component_register`。

2. 用 CMake 选项开启需要的能力模块。IoT 始终编译，AI Agent 与 P2P 默认关闭：

   ```bash
   cmake -B build \
     -DCONFIG_ENABLE_AI_COMPONENTS=ON \
     -DCONFIG_ENABLE_TUYA_P2P=ON
   ```

   其他常用选项包括：`CONFIG_ENABLE_LOCAL_LINK`（默认 ON）、`CONFIG_ENABLE_BLUETOOTH`、`CONFIG_ENABLE_WIRED`、`CONFIG_ENABLE_PLATFORM_MBEDTLS`（使用平台自带的 mbedTLS，而非内置副本）。

3. 链接可执行文件。在 GNU 与 Clang 主机上，需要用 `--start-group`/`--end-group` 把核心库与移植层包在一起，以解析核心与移植层之间的相互引用：

   ```cmake
   target_link_libraries(app PRIVATE
       -Wl,--start-group ${TUYAOPEN_CORE_LIBS} $<TARGET_FILE:tuyaopen-port> -Wl,--end-group
       tuyaopen-port tuyaopen-headers)
   ```

:::note
该 include 是幂等的：当 `tuyaopen-headers` 目标已存在时会提前返回，因此从多个子目录加入也是安全的。
:::

## ESP-IDF

SDK 根目录与 `port/esp-idf` 是两个独立的 ESP-IDF 组件（移植组件按目录名命名为 `esp-idf`）。在工程 `CMakeLists.txt` 中把两者都加入 `EXTRA_COMPONENT_DIRS`：

```cmake
set(EXTRA_COMPONENT_DIRS
    "${TUYAOPEN_CORE_DIR}"
    "${TUYAOPEN_CORE_DIR}/port/esp-idf")
include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(app)
```

然后正常编译：

```bash
idf.py set-target esp32s3
idf.py menuconfig
idf.py build
```

核心选项出现在 `menuconfig` 的 **tuyaopen-core** 菜单中，以 `CONFIG_*` 值写入 `sdkconfig`。在 ESP-IDF 上，编译使用 ESP-IDF 自带的 mbedTLS 与 lwIP（`CONFIG_ENABLE_PLATFORM_MBEDTLS=y`）。

:::warning
请使用 ESP-IDF v5.x（推荐 v5.4）。ESP-IDF v6.2 及之后版本调整了 mbedTLS 加密相关头文件，当前组件尚不能支持。
:::

## ESP-IDF 之外使用 Kconfig

对于仍需使用 Kconfig 的非 ESP-IDF 主机，仓库根目录提供了 `Kconfig` 文件。在你自己的 Kconfig 菜单中 rsourse 它：

```kconfig
rsource "/path/to/tuyaopen-core/Kconfig"
```

用 kconfiglib（`pip install kconfiglib`）生成配置，再把得到的 `CONFIG_*` 值传给 CMake。Linux 示例演示了完整流程。

## 下一步

- [Linux 快速开始](linux-quick-start.md) —— 完整可运行的例子
- [适配新平台](port-to-platform.md) —— 当自带的两个移植层都不适用时
- [CMake、Kconfig 与组件模型](../build-system/cmake-kconfig-and-components.md) —— 完整 TuyaOpen 如何分层使用同样的工具
