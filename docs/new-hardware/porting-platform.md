---
title: Adapt to New Platforms
---

## Overview

This topic describes the required readings, operational steps, and verification procedures for adding support for a new chipset on the TuyaOpen platform.

If you are new to TuyaOpen, it is recommended first to read [Get Started](../quick-start/index.md). Follow the tutorial to set up and test the `switch_demo` application (an Ubuntu environment is recommended) to understand and familiarize yourself with Tuya IoT's pairing and operational logic. Additionally, please read the [tos.py User Guide](../tos-tools/tos-guide.md) to learn about the usage and functionality of `tos.py` commands.

### Build process

Before adapting a new chipset, it is helpful to understand the TuyaOpen build flow briefly:

1. First, build the application (using `switch_demo` as an example, located under `TuyaOpen/apps/tuya_cloud/switch_demo`) and the TuyaOpen source code (in the `TuyaOpen/src` directory). This generates the application static library (`libtuyaapp.a`) and the SDK static library (`libtuyaos.a`).

2. The `platform/Ubuntu/build_example.py` script is then called to invoke the vendor's build and linking commands, ultimately producing three types of firmware: QIO, UA, and UG.

   | Firmware name | Firmware type |
   | :----------------: | :-------------------: |
   | app_name_QIO_1.0.0 | Bootloader + user area firmware |
   | app_name_UA_1.0.0 | User area firmware |
   | app_name_UG_1.0.0 | Update firmware |

For a more detailed flow, refer to the [TuyaOpen Compilation Flow Detailed Guide](../build-system/compilation-guide.md).


Generally, adapting a new chipset on TuyaOpen involves the following steps:

1. Create a new platform and develop scripts to download the toolchain and handle build and linking.
2. Complete the TKL adaptation.
3. Create a new board.
4. Finalize configuration and test features in the `apps/tuya_cloud/switch_demo` project to verify whether the adaptation was successful.

## Create a platform

For the detailed procedure, refer to [Create Platform](../new-hardware/new-platform.md).

Within the `menuconfig` interface, pay special attention to the following two items. Select other items based on specific hardware conditions.

+ `ENABLE_FLASH`: **Must be enabled**. You need to reserve an unused section of flash memory for TuyaOpen. Avoid the firmware area and match the flash erase/write granularity.
+ `ENABLE_FILE_SYSTEM`: If you intend to use the vendor SDK's file system, adapt the `tkl_fs.c` file. If this item is disabled, TuyaOpen will use its internal LittleFS file system, whose address and size are configured and provided by `tkl_flash.c`.

:::tip
Why is it necessary to reserve an unused section of flash memory?

Both TuyaOpen and TuyaOS require storage space for device authorization information. Furthermore, after a device is successfully paired and activated, certain device information, keys, and other data must be saved to the flash memory. To ensure power-loss safety for the file system, TuyaOpen employs the open-source LittleFS with AEC128 CBC encryption.TuyaOS uses a self-developed KV (key-value) file system. Both systems are secure and reliable. To facilitate you in quickly switching between the TuyaOpen and TuyaOS SDKs (as their TKL adaptation layer interfaces are consistent) while maintaining considerations for security, stability, and ease of transition, it is necessary to reserve a dedicated, unused flash region for TuyaOpen.
:::

## TKL layer adaptation

For TKL layer adaptation, refer to [Fill in the code](../new-hardware/new-platform.md#fill-in-the-code) and [Port TuyaOS to RTOS Platforms](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l). Please note that the vendor SDK may already integrate lwIP and Mbed TLS. You can choose to use either the vendor's version or TuyaOpen's version based on your specific situation.

**How to select**: In the application project directory `apps/tuya_cloud/switch_demo`, run `tos.py config menu` to open the visual configuration interface.

- Go to `configure tuyaopen` > `configure enable/disable liblwip` to enable or disable the lwIP feature.

   + When this item is disabled (using the vendor's lwIP), you need to adapt the `tkl_network.c` file. You can refer to the adaptation method used in [TuyaOpen-ESP32](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_network.c), where the vendor's lwip is employed.


   + When this item is enabled (using TuyaOpen's lwIP), you need to adapt the `tkl_lwip.c` file. You can refer to the adaptation method used in [TuyaOpen-T2](https://github.com/tuya/TuyaOpen-T2/blob/master/tuyaos/tuyaos_adapter/src/tkl_lwip.c), where TuyaOpen's lwIP is employed.


   Adapt **only one** of these two files based on your actual configuration. For more information, see [Adapt the network interface](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l#title-16-Adapt%20the%20network%20interface).


- Go to `configure tuyaopen` > `configure mbedtls` > `Enable user custom` to enable or disable the TuyaOpen Mbed TLS feature.

### Adapt TKL interfaces for cellular networks


To support this functionality, you must enable the `ENABLE_CELLULAR` option when creating the platform template. The minimum required adaptation file directory for the cellular network is as follows:

+ `tkl_cellular_base.c`
+ `tkl_cellular_comm.c`
+ `tkl_cellular_mds.c`


For cellular network chips, TuyaOpen has already adapted the L511C module. You can download the [dev-cellular branch](https://github.com/tuya/TuyaOpen/tree/dev-cellular) for reference or use the L511C module directly. Refer to the [platform repository for L511C](https://github.com/shiliu-yang/TuyaOpen-L511C/tree/dev).


You can base on either the TuyaOpen `dev-cellular` branch or the `dev` branch to adapt cellular network chips.

## Create a board

For specific steps, refer to [Create Board](../new-hardware/new-board.md).

After the board is created, and the configuration has been [adjusted](../new-hardware/new-board.md#adjust-configuration) and [saved](../new-hardware/new-board.md#save-configuration), you can select the corresponding development board in the `apps/tuya_cloud/switch_demo` directory using the `tos.py config choice` command. Then proceed to the next step: Verify functionality.

## Verify functionality

Before using `tos.py build` to compile the `switch_demo` code, ensure the following:

+ The `tuya_app_main()` function in the `apps/tuya_cloud/switch_demo/src/tuya_main.c` file is being called by the vendor SDK.

+ Update the authorization information macros `TUYA_OPENSDK_UUID` and `TUYA_OPENSDK_AUTHKEY` in the `apps/tuya_cloud/switch_demo/src/tuya_config.h` file. For how to obtain authorization information, refer to the [TuyaOpen license](../quick-start/index.md#tuyaopen-authorization-code-acquisition).

+ For platforms adapted with cellular or wired networks, binding requires scanning a QR code via the **SmartLife** or **Tuya** app. [Click to see how to download and operate the app](../quick-start/device-network-configuration.md#download-app). The QR code URL can be printed using the following code snippet:

   `apps/tuya_cloud/switch_demo/src/tuya_main.c:107`

  ```c
  char buffer[255];
  snprintf(buffer, sizeof(buffer), "https://smartapp.tuya.com/s/p?p=%s&uuid=%s&v=2.0", TUYA_PRODUCT_ID,
           license.uuid);
  PR_INFO("QR link: %s", buffer);
  ```
