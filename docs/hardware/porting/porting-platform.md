---
title: Adapt the platform
description: "Adapt the platform to add a new chipset to TuyaOpen — required reading, build flow, adapter steps, and the verification procedure for a full port."
keywords:
  - tuyaopen porting
  - adapt platform
  - chipset
  - tkl
  - build
---

Adapting a new platform adds support for a new chipset to TuyaOpen. This guide covers the required reading, the steps, and the verification procedure.

If you are new to TuyaOpen, first read [Get Started](../../quick-start/index.md). Follow the tutorial to set up and test the `switch_demo` application (an Ubuntu environment is recommended) to understand Tuya IoT's pairing and operational logic. Then read [CLI - tos.py Development Tool](../../tos-tools/tos-guide.md) to learn the usage and functionality of the `tos.py` commands.

## Build process

Before adapting a new chipset, understand the TuyaOpen build flow:

1. The build first compiles the application (using `switch_demo` as an example, located under `TuyaOpen/apps/tuya_cloud/switch_demo`) and the TuyaOpen source code (in `TuyaOpen/src`). This generates the application static library (`libtuyaapp.a`) and the SDK static library (`libtuyaos.a`).

2. The build then calls the `platform/Ubuntu/build_example.py` script to invoke the vendor's build and linking commands, which produces three types of firmware: QIO, UA, and UG.

   | Firmware name | Firmware type |
   | :----------------: | :-------------------: |
   | app_name_QIO_1.0.0 | Bootloader + user area firmware |
   | app_name_UA_1.0.0 | User area firmware |
   | app_name_UG_1.0.0 | Update firmware |

For a more detailed flow, refer to the [Compilation guide](../../build-system/compilation-guide).

Adapting a new chipset on TuyaOpen generally involves these steps:

1. Create a new platform, and develop the scripts that download the toolchain and handle build and linking.
2. Complete the TKL adaptation.
3. Create a new board.
4. Finalize the configuration and test features in the `apps/tuya_cloud/switch_demo` project to verify the adaptation.

## Create a platform

For the detailed procedure, refer to [Create Platform](./new-platform.md).

In the `menuconfig` interface, pay attention to the following two items. Select other items based on your specific hardware.

- `ENABLE_FLASH`: **Must be enabled.** Reserve an unused section of flash memory for TuyaOpen. Avoid the firmware area and match the flash erase/write granularity.
- `ENABLE_FILE_SYSTEM`: If you intend to use the vendor SDK's file system, adapt the `tkl_fs.c` file. If this item is disabled, TuyaOpen uses its internal LittleFS file system, whose address and size are configured and provided by `tkl_flash.c`.

:::tip
Why reserve an unused section of flash memory?

Both TuyaOpen and TuyaOS require storage space for device authorization information. After a device is successfully paired and activated, certain device information, keys, and other data must be saved to flash memory. To ensure power-loss safety for the file system, TuyaOpen uses the open-source LittleFS with AES128 CBC encryption, while TuyaOS uses a self-developed KV (key-value) file system. Both systems are secure and reliable. To let you quickly switch between the TuyaOpen and TuyaOS SDKs (their TKL adaptation layer interfaces are consistent) while maintaining security and stability, you reserve a dedicated, unused flash region for TuyaOpen.
:::

## TKL layer adaptation

For TKL layer adaptation, refer to [Fill in the code](./new-platform.md#fill-in-the-code) and [Port TuyaOS to RTOS Platforms](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l). The vendor SDK may already integrate lwIP and Mbed TLS. You can use either the vendor's version or TuyaOpen's version, based on your situation.

To select, open the visual configuration interface by running `tos.py config menu` in the application project directory `apps/tuya_cloud/switch_demo`.

- Go to `configure tuyaopen` > `configure enable/disable liblwip` to enable or disable the lwIP feature.

    - When disabled (using the vendor's lwIP), adapt the `tkl_network.c` file. Refer to the adaptation in [TuyaOpen-ESP32](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_network.c), which uses the vendor's lwIP.
    - When enabled (using TuyaOpen's lwIP), adapt the `tkl_lwip.c` file. Refer to the adaptation in [TuyaOpen-T2](https://github.com/tuya/TuyaOpen-T2/blob/master/tuyaos/tuyaos_adapter/src/tkl_lwip.c), which uses TuyaOpen's lwIP.

    Adapt only one of these two files, based on your configuration. For more information, see [Adapt the network interface](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l#title-16-Adapt%20the%20network%20interface).

- Go to `configure tuyaopen` > `configure mbedtls` > `Enable user custom` to enable or disable the TuyaOpen Mbed TLS feature.

### Adapt TKL interfaces for cellular networks

To support this functionality, enable the `ENABLE_CELLULAR` option when you create the platform template. The minimum required adaptation files for a cellular network are:

- `tkl_cellular_base.c`
- `tkl_cellular_comm.c`
- `tkl_cellular_mds.c`

For cellular network chips, TuyaOpen has already adapted the L511C module. You can download the [dev-cellular branch](https://github.com/tuya/TuyaOpen/tree/dev-cellular) for reference, or use the L511C module directly. Refer to the [platform repository for L511C](https://github.com/shiliu-yang/TuyaOpen-L511C/tree/dev).

You can adapt cellular network chips based on either the TuyaOpen `dev-cellular` branch or the `dev` branch.

## Create a board

For the specific steps, refer to [Create Board](./new-board.md).

After you create the board and have [adjusted](./new-board.md#adjust-configuration) and [saved](./new-board.md#save-configuration) the configuration, select the board in the `apps/tuya_cloud/switch_demo` directory using `tos.py config choice`. Then proceed to verify functionality.

## Verify functionality

Before you run `tos.py build` to compile the `switch_demo` code, ensure the following:

- The `tuya_app_main()` function in `apps/tuya_cloud/switch_demo/src/tuya_main.c` is called by the vendor SDK.

- The authorization information macros `TUYA_OPENSDK_UUID` and `TUYA_OPENSDK_AUTHKEY` in `apps/tuya_cloud/switch_demo/src/tuya_config.h` are updated. To obtain authorization information, refer to [Get TuyaOpen license](../../quick-start/index.md#get-tuyaopen-license).

- For platforms adapted with cellular or wired networks, binding requires scanning a QR code with the **SmartLife** or **Tuya** app. See [how to download and operate the app](../../quick-start/device-network-configuration.md#download-the-app). Print the QR code URL with the following code, at `apps/tuya_cloud/switch_demo/src/tuya_main.c:107`:

  ```c
  char buffer[255];
  snprintf(buffer, sizeof(buffer), "https://smartapp.tuya.com/s/p?p=%s&uuid=%s&v=2.0", TUYA_PRODUCT_ID,
           license.uuid);
  PR_INFO("QR link: %s", buffer);
  ```
