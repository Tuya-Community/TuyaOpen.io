---
title: 适配平台
description: "适配新 Platform 是在 TuyaOpen 上新增对某款芯片的支持：介绍需阅读的文档、编译流程、TKL 适配步骤与验证方法。"
keywords:
  - 适配平台
  - TKL 适配
  - 编译流程
  - 移植
  - TuyaOpen 硬件
---

适配新 Platform 是指在 TuyaOpen 上新增对某款芯片的支持。本文介绍适配过程中需要阅读的文档、操作步骤以及验证适配是否成功的方法。

如果您首次接触 TuyaOpen，建议先阅读 [快速上手](../../quick-start/index.md)，按照教程搭建并体验 `switch_demo` 应用（推荐使用 Ubuntu 环境），以便了解和熟悉 Tuya IoT 的配网及操作逻辑。然后阅读 [CLI - tos.py 开发工具](../../tos-tools/tos-guide.md)，了解 `tos.py` 的使用方法及各命令的功能。

## 编译流程

在适配新芯片前，建议先了解 TuyaOpen 的编译流程：

1. 首先编译应用（以 `switch_demo` 为例，即 `TuyaOpen/apps/tuya_cloud/switch_demo` 下的代码）和 TuyaOpen 源码（`TuyaOpen/src` 目录），生成应用静态库（`libtuyaapp.a`）和 SDK 静态库（`libtuyaos.a`）。

2. 然后调用 `platform/Ubuntu/build_example.py` 脚本，执行原厂的编译链接命令，最终生成 QIO、UA、UG 三种类型的固件。

    | 固件名称 | 固件类型 |
    | :----------------: | :-------------------: |
    | app_name_QIO_1.0.0 | bootload + 用户区固件 |
    | app_name_UA_1.0.0  | 用户区固件 |
    | app_name_UG_1.0.0  | 升级固件 |

更详细的编译流程，请参考 [TuyaOpen 编译流程详解](../../build-system/compilation-guide.md)。

在 TuyaOpen 上适配新芯片一般需经过以下步骤：

1. 创建新 Platform，并完善工具链下载及编译链接相关脚本。
2. 完成 TKL 层适配。
3. 创建新 Board。
4. 在 `apps/tuya_cloud/switch_demo` 项目中完善配置并测试功能，验证适配是否成功。

## 创建 Platform

关于创建新 Platform 的具体流程，请参考 [创建 Platform](./new-platform.md)。

在 `menuconfig` 配置界面，请重点关注以下两个配置项，其他配置项请根据具体硬件情况选择。

- `ENABLE_FLASH`：**必须打开。** 需预留一块未使用的 Flash 供 TuyaOpen 使用，注意避开固件区并匹配 Flash 擦写粒度。
- `ENABLE_FILE_SYSTEM`：如需使用原厂 SDK 的文件系统，请适配 `tkl_fs.c` 文件。若关闭此项，TuyaOpen 会使用其内部的 LittleFS 文件系统，其地址和大小由 `tkl_flash.c` 配置和提供。

:::tip
为什么需要预留一块未使用的 Flash？

无论使用 TuyaOpen 还是 TuyaOS，都需要存储设备授权信息；且设备成功配网激活后，还需将部分设备信息、密钥等数据保存到 Flash。为保证文件系统掉电安全，TuyaOpen 采用开源的 LittleFS + AES128 CBC 加密，TuyaOS 则使用自研的 KV（key-value）文件系统，两者均安全可靠。为便于您在 TuyaOpen 与 TuyaOS 间快速切换 SDK（两者的 TKL 适配层接口一致），同时兼顾安全性和稳定性，需为 TuyaOpen 预留一块专用的、未使用的 Flash 区域。
:::

## TKL 层适配

关于 TKL 层适配，可参考 [补充代码](./new-platform.md#补充代码) 及 [移植 TuyaOS 到 RTOS 平台](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l) 进行适配。需要注意，原厂 SDK 可能已集成 lwIP 和 Mbed TLS，您可根据实际情况选择使用原厂或 TuyaOpen 的版本。

选择方法：在应用工程 `apps/tuya_cloud/switch_demo` 目录下运行 `tos.py config menu`，打开可视化配置界面。

- 在 `configure tuyaopen` > `configure enable/disable liblwip` 下启用或禁用 lwIP 功能。

    - 关闭该配置项时（使用原厂 lwIP），需适配 `tkl_network.c` 文件。可参考 [TuyaOpen-ESP32](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_network.c) 的适配方式，此处采用原厂 lwIP。
    - 打开该配置项时（使用 TuyaOpen lwIP），需适配 `tkl_lwip.c` 文件。可参考 [TuyaOpen-T2](https://github.com/tuya/TuyaOpen-T2/blob/master/tuyaos/tuyaos_adapter/src/tkl_lwip.c) 的适配方式，此处采用 TuyaOpen 的 lwIP。

    请根据实际配置，在这两个文件中只适配其中一个。详细说明可参考 [适配网络接口](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l#title-16-%E9%80%82%E9%85%8D%E7%BD%91%E7%BB%9C%E6%8E%A5%E5%8F%A3)。

- 在 `configure tuyaopen` > `configure mbedtls` > `Enable user custom` 下启用或禁用 TuyaOpen Mbed TLS 功能。

### 蜂窝网络 TKL 接口适配

如需支持该功能，需在创建 Platform 模板时打开 `ENABLE_CELLULAR` 选项。蜂窝网络部分的最小适配文件如下：

- `tkl_cellular_base.c`
- `tkl_cellular_comm.c`
- `tkl_cellular_mds.c`

对于蜂窝网络芯片，TuyaOpen 已适配 L511C 模组。您可下载 [dev-cellular 分支](https://github.com/tuya/TuyaOpen/tree/dev-cellular) 进行参考，或直接使用 L511C 模组。可参考 [L511C 的 Platform 仓库](https://github.com/shiliu-yang/TuyaOpen-L511C/tree/dev)。

您可以基于 TuyaOpen `dev-cellular` 分支或 `dev` 分支适配蜂窝网络芯片。

## 创建 Board

关于创建 Board 的操作步骤，请参考 [创建 Board](./new-board.md)。

Board 创建完成并经过 [调整配置](./new-board.md#调整配置) 和 [保存配置](./new-board.md#保存配置) 后，即可在 `apps/tuya_cloud/switch_demo` 目录下通过 `tos.py config choice` 命令选择对应开发板，随后进入下一步验证功能。

## 验证功能

在使用 `tos.py build` 编译 `switch_demo` 代码前，请确保以下事项：

- `apps/tuya_cloud/switch_demo/src/tuya_main.c` 文件中的 `tuya_app_main()` 函数已被原厂 SDK 调用。

- 已更新 `apps/tuya_cloud/switch_demo/src/tuya_config.h` 文件中的授权信息宏 `TUYA_OPENSDK_UUID` 和 `TUYA_OPENSDK_AUTHKEY`。授权信息的获取方式，请参考 [TuyaOpen 授权码获取](../../quick-start/index.md#tuyaopen-授权码获取)。

- 对于适配了蜂窝网络或有线网络的平台，绑定时需要通过 **智能生活** 或 **涂鸦** App 扫描二维码。请参考 [如何下载和操作 App](../../quick-start/device-network-configuration.md#下载-app)。二维码链接可通过以下代码打印输出，位于 `apps/tuya_cloud/switch_demo/src/tuya_main.c:107`：

  ```c
  char buffer[255];
  snprintf(buffer, sizeof(buffer), "https://smartapp.tuya.com/s/p?p=%s&uuid=%s&v=2.0", TUYA_PRODUCT_ID,
           license.uuid);
  PR_INFO("QR link: %s", buffer);
  ```
