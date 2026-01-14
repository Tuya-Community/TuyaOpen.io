---
title: 适配新 Platform
---

## 概述

通过本文，您可以了解在 TuyaOpen 上新增芯片时需要阅读哪些文档、如何操作以及如何验证适配是否成功。


如果您首次接触 TuyaOpen，建议先阅读 [快速上手](../quick-start/index.md)，按照教程搭建并体验 `switch_demo` 应用（推荐使用 Ubuntu 环境），以便了解和熟悉 Tuya IoT 的配网及操作逻辑。同时，还需阅读 [tos.py 使用指南](../tos-tools/tos-guide.md)，了解 `tos.py` 的使用方法及各命令的功能说明。

### 编译流程

在进行芯片适配前，建议先简单了解 TuyaOpen 的编译流程：

1. 首先编译应用（以 `switch_demo` 为例，即 `TuyaOpen/apps/tuya_cloud/switch_demo` 下的代码）和 TuyaOpen 源码（`TuyaOpen/src` 目录），生成应用静态库（`libtuyaapp.a`）和 SDK 静态库（`libtuyaos.a`）。

2. 通过 `platform/Ubuntu/build_example.py` 脚本调用原厂编译链接命令，最终生成 QIO、UA 和 UG 三种类型的固件。

    |      固件名称      |       固件类型        |
    | :----------------: | :-------------------: |
    | app_name_QIO_1.0.0 | bootload + 用户区固件 |
    | app_name_UA_1.0.0  |      用户区固件       |
    | app_name_UG_1.0.0  |       升级固件        |


更多详细编译流程，可参考 [TuyaOpen 编译流程详解](../build-system/compilation-guide.md) 文档。


在 TuyaOpen 上适配新芯片一般需经过以下几个步骤：

1. 创建新 Platform，完善工具链下载及编译链接相关脚本。
2. 完善 TKL 层适配。
3. 创建新 Board。
4. 在 `apps/tuya_cloud/switch_demo` 项目中完善配置和测试功能，验证适配是否成功。

## 创建 Platform


关于创建新 Platform 的具体流程，请参考 [创建 Platform](../new-hardware/new-platform.md)。

在 `menuconfig` 配置界面需重点关注以下两个配置项，其他配置项请根据具体硬件情况进行选择：

+ `ENABLE_FLASH`：**必须打开**，开发人员需预留一块未使用的 Flash 供 TuyaOpen 使用，注意避开固件区并匹配 Flash 擦写粒度。
+ `ENABLE_FILE_SYSTEM`：如需使用原厂 SDK 的文件系统，请适配 `tkl_fs.c` 文件。若关闭此项，则会使用 TuyaOpen 内部的 littlefs 文件系统，其地址和大小由 `tkl_flash.c` 配置和提供。


:::info
为什么需要预留一块未使用的 Flash？

无论使用 TuyaOpen 还是 TuyaOS，都需要存储设备授权信息，且设备成功配网激活后还需保存部分设备信息和密钥等数据到 Flash。为保证文件系统掉电安全，TuyaOpen 采用开源的 littlefs + aec128 cbc，TuyaOS 则使用自研的 kv 文件系统，均安全可靠。基于安全性和稳定性考虑，同时便于开发者在 TuyaOpen 与 TuyaOS 间快速切换 SDK（两者的 TKL 适配层接口一致），因此需为 TuyaOpen 预留一块未使用的 Flash 区域。
:::

## TKL 层适配


关于 TKL 层适配，可参考 [补充代码](../new-hardware/new-platform.md#%E8%A1%A5%E5%85%85%E4%BB%A3%E7%A0%81) 及 [移植 TuyaOS 到 RTOS 平台](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l) 文档进行适配和完善。需要注意，原厂 SDK 可能已集成 lwip 和 mbedtls，可根据实际情况选择使用原厂或 TuyaOpen 的版本。

**选择方法**：在应用工程 `apps/tuya_cloud/switch_demo` 目录下，调用 `tos.py config menu` 打开可视化配置界面。


- 是否启用 TuyaOpen lwip 功能，可在 `configure tuyaopen` > `configure enable/disable liblwip` 下设置。


    + 关闭该配置项时，使用原厂 lwip 需适配 `tkl_network.c`，可参考 [TuyaOpen-ESP32](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_network.c) 的适配方式，此处采用原厂 lwip。


    + 打开该配置项时，使用 TuyaOpen lwip 需适配 `tkl_lwip.c`，可参考 [TuyaOpen-T2](https://github.com/tuya/TuyaOpen-T2/blob/master/tuyaos/tuyaos_adapter/src/tkl_lwip.c) 的适配方式，此处采用 TuyaOpen 的 lwip。


    根据实际配置，在这两个文件中选择一个进行适配。详细说明可参考 [适配网络接口](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l#title-16-%E9%80%82%E9%85%8D%E7%BD%91%E7%BB%9C%E6%8E%A5%E5%8F%A3) 文档。


- 是否启用 TuyaOpen mbedtls 功能，可在 `configure tuyaopen` > `configure mbedtls` > `Enable user custom` 下设置。




### 蜂窝网络 TKL 接口适配说明


如需支持该功能，需在创建 Platform 模板时打开 `ENABLE_CELLULAR` 选项。蜂窝网络部分最小适配文件目录如下：

+ `tkl_cellular_base.c`
+ `tkl_cellular_comm.c`
+ `tkl_cellular_mds.c`


对于蜂窝网络芯片，TuyaOpen 已适配 L511C 模组，您可下载 [TuyaOpen 的 dev-cellular 分支](https://github.com/tuya/TuyaOpen/tree/dev-cellular) 进行参考或直接使用 L511C 模组。L511C 的 Platform 仓库地址为：[https://github.com/shiliu-yang/TuyaOpen-L511C/tree/dev](https://github.com/shiliu-yang/TuyaOpen-L511C/tree/dev)。


蜂窝网络芯片适配开发者可基于 TuyaOpen `dev-cellular` 或 `dev` 进行适配。

## 创建 Board


关于创建 Board 的操作步骤，可参考 [创建 Board](../new-hardware/new-board.md) 章节。


Board 创建完成后，经过 [调整配置](../new-hardware/new-board.md#%E8%B0%83%E6%95%B4%E9%85%8D%E7%BD%AE) 和 [保存配置](../new-hardware/new-board.md#%E4%BF%9D%E5%AD%98%E9%85%8D%E7%BD%AE) 后，即可在 `apps/tuya_cloud/switch_demo` 目录下通过 `tos.py config choice` 命令选择对应开发板，随后进入下一步验证功能。

## 验证功能


在使用 `tos.py build` 编译 `switch_demo` 代码前，请确保以下事项：


+ `apps/tuya_cloud/switch_demo/src/tuya_main.c` 文件中的 `tuya_app_main()` 函数已在原厂 SDK 中被调用。


+ 更新 `apps/tuya_cloud/switch_demo/src/tuya_config.h` 文件中的授权信息宏 `TUYA_OPENSDK_UUID` 和 `TUYA_OPENSDK_AUTHKEY`，授权信息获取方式请参考 [TuyaOpen 授权码获取](../quick-start/index.md#tuyaopen%E6%8E%88%E6%9D%83%E7%A0%81%E8%8E%B7%E5%8F%96)。


+ 对于蜂窝网络和有线网络平台的适配，需要通过 **智能生活** 或 **涂鸦** App 扫描二维码进行绑定，[点击查看如何下载和操作 App](../quick-start/device-network-configuration.md#%E4%B8%8B%E8%BD%BD-app)。二维码链接地址可通过以下代码打印输出：


  `apps/tuya_cloud/switch_demo/src/tuya_main.c:107`

  ```c
  char buffer[255];
  snprintf(buffer, sizeof(buffer), "https://smartapp.tuya.com/s/p?p=%s&uuid=%s&v=2.0", TUYA_PRODUCT_ID,
           license.uuid);
  PR_INFO("QR link: %s", buffer);
  ```
