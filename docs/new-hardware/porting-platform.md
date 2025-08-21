---
title: Porting platform
---



This document helps you understand which materials to read, how to operate, and how to verify successful adaptation when adding a new chip to TuyaOpen.



For users new to TuyaOpen, it is recommended to first read the [Quick Start](../quick-start/index.md) guide, follow the tutorial to set up and experience the switch_demo application (Ubuntu environment is recommended), and get familiar with Tuya IoT's network configuration and operation logic. You should also read the [tos.py User Guide](../tos-tools/tos-guide.md) to understand how to use `tos.py` and the functions of each command.



Before starting chip adaptation, it is recommended to briefly understand the TuyaOpen build process:



1. First, compile the application (for example, switch_demo under TuyaOpen/apps/tuya_cloud/switch_demo) and the TuyaOpen source code (TuyaOpen/src directory) to generate the application static library (libtuyaapp.a) and SDK static library (libtuyaos.a).



2. Use the `platform/Ubuntu/build_example.py` script to call the original manufacturer's build and link commands, and finally generate three types of firmware: QIO, UA, and UG.


|      Firmware Name      |       Firmware Type        |
| :---------------------: | :------------------------: |
| app_name_QIO_1.0.0      | bootload + user area      |
| app_name_UA_1.0.0       | user area                 |
| app_name_UG_1.0.0       | upgrade                   |



For detailed build steps, refer to the [TuyaOpen Build Process Explained](../build-system/compilation-guide.md).



Generally, adapting a new chip on TuyaOpen involves the following steps:



1. Create a new platform, complete toolchain download and build/link scripts
2. Complete tkl layer adaptation
3. Create a new board
4. Improve configuration and test functions in the apps/tuya_cloud/switch_demo project to verify successful adaptation


## Create Platform



For the detailed process of creating a new platform, [click here for more information](../new-hardware/new-platform.md).



In the `menuconfig` configuration interface, pay special attention to the following two options. Other options should be selected according to your hardware:



+ `ENABLE_FLASH`: **Must be enabled**. Developers need to reserve an unused flash area for TuyaOpen, avoiding the firmware area and matching the flash erase granularity.
+ `ENABLE_FILE_SYSTEM`: If you want to use the original SDK's file system, please adapt the `tkl_fs.c` file. If disabled, TuyaOpen's built-in littlefs file system will be used, with its address and size configured and provided by `tkl_flash.c`.



:::warning
Why do you need to reserve an unused flash area?

Both TuyaOpen and TuyaOS require storage for device authorization information, and after successful network configuration and activation, some device information and keys must also be stored in flash. To ensure file system power-down safety, TuyaOpen uses open-source littlefs + aec128 cbc, while TuyaOS uses a self-developed kv file system, both of which are secure and reliable. For security and stability, and to allow developers to quickly switch SDKs between TuyaOpen and TuyaOS (the tkl adaptation layer interfaces are consistent), it is necessary to reserve an unused flash area for TuyaOpen.
:::


## tkl Layer Adaptation



For tkl layer adaptation, developers can refer to the [supplementary code](../new-hardware/new-platform.md#fill-in-the-code) and [Porting TuyaOS to RTOS Platform](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l) documents for adaptation and improvement. Note that the original SDK may already integrate lwip and mbedtls; you can choose to use either the original or TuyaOpen's version as needed. To select, open the visual configuration interface by running `tos.py config menu` in the `apps/tuya_cloud/switch_demo` directory.



Whether to enable TuyaOpen lwip functionality can be set in `configure tuyaopen → configure enable/disable liblwip`.



+ If this option is disabled, you need to adapt `tkl_network.c` to use the original lwip. You can refer to [TuyaOpen-ESP32](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_network.c) for adaptation; this uses the original lwip.



+ If this option is enabled, you need to adapt `tkl_lwip.c` to use TuyaOpen's lwip. You can refer to [TuyaOpen-T2](https://github.com/tuya/TuyaOpen-T2/blob/master/tuyaos/tuyaos_adapter/src/tkl_lwip.c) for adaptation; this uses TuyaOpen's lwip.



Choose one of these two files to adapt according to your configuration. For details, refer to the [Network Interface Adaptation](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l#title-16-Adapt%20the%20network%20interface) documentation.





Whether to enable TuyaOpen mbedtls functionality can be set in `configure tuyaopen → configure mbedtls → Enable user custom`.





Cellular Network tkl Interface Adaptation:



To support this feature, you need to enable the `ENABLE_CELLULAR` option when creating the platform template. The minimum adaptation file list for the cellular network part is as follows:


+ tkl_cellular_base.c
+ tkl_cellular_comm.c
+ tkl_cellular_mds.c



For cellular network chips, TuyaOpen has adapted the L511C module. Developers can download the [TuyaOpen dev-cellular branch](https://github.com/tuya/TuyaOpen/tree/dev-cellular) for reference or directly use the L511C module. The platform repository for L511C is: [https://github.com/shiliu-yang/TuyaOpen-L511C/tree/dev](https://github.com/shiliu-yang/TuyaOpen-L511C/tree/dev)



Cellular network chip adaptation developers can base their work on TuyaOpen dev-cellular or dev branches.


## Create Board



For steps to create a board, refer to the [Create Board](../new-hardware/new-board.md) section.



After the board is created and [configuration is adjusted](../new-hardware/new-board.md#adjust-configuration) and [saved](../new-hardware/new-board.md#save-configuration), you can select the corresponding development board in the `apps/tuya_cloud/switch_demo` directory using the `tos.py config choice` command, and then proceed to the next step to verify functionality.


## Function Verification



Before compiling the switch_demo code with `tos.py build`, please ensure the following:



+ The `tuya_app_main()` function in `apps/tuya_cloud/switch_demo/src/tuya_main.c` has been called in the original SDK.



+ Update the authorization macros `TUYA_OPENSDK_UUID` and `TUYA_OPENSDK_AUTHKEY` in `apps/tuya_cloud/switch_demo/src/tuya_config.h`. For how to obtain authorization information, see: [TuyaOpen Authorization Code Acquisition](../quick-start/index.md#tuyaopen-authorization-code-acquisition)



+ For cellular and wired network platform adaptation, you need to bind the device by scanning the QR code with the **Smart Life** or **Tuya** APP. [Click here to see how to download and use the APP](../quick-start/device-network-configuration.md#download-app). The QR code link can be printed using the following code:



  `apps/tuya_cloud/switch_demo/src/tuya_main.c:107`

  ```c
  char buffer[255];
  snprintf(buffer, sizeof(buffer), "https://smartapp.tuya.com/s/p?p=%s&uuid=%s&v=2.0", TUYA_PRODUCT_ID,
           license.uuid);
  PR_INFO("QR link: %s", buffer);
  ```
