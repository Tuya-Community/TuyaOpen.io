---
title: 应用开发介绍
---

# 应用开发

## 创建产品并获取产品的 PID

参考文档 [https://developer.tuya.com/cn/docs/iot-device-dev/application-creation?id=Kbxw7ket3aujc](https://developer.tuya.com/cn/docs/iot-device-dev/application-creation?id=Kbxw7ket3aujc) 在 [https://iot.tuya.com](https://iot.tuya.com) 下创建产品，并获取到创建产品的 PID 。

然后替换对应工程目录下 `tuya_config.h` 文件中 `TUYA_PRODUCT_KEY` 宏分别对应 pid。

## TuyaOpen 授权码

Tuyaopen Framework 包括：

- C 版 TuyaOpen: [https://github.com/tuya/TuyaOpen](https://github.com/tuya/TuyaOpen)

- Arduino 版 TuyaOpen: [https://github.com/tuya/arduino-TuyaOpen](https://github.com/tuya/arduino-TuyaOpen)

- Luanode 版 TuyaOpen: [https://github.com/tuya/luanode-TuyaOpen](https://github.com/tuya/luanode-TuyaOpen)

均采用 TuyaOpen 专用授权码，使用其他授权码无法正常连接涂鸦云。

```bash
[tuya_main.c:220] Replace the TUYA_DEVICE_UUID and TUYA_DEVICE_AUTHKEY contents, otherwise the demo cannot work
[tuya_main.c:220] uuid uuidxxxxxxxxxxxxxxxx, authkey keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

可通过以下方式获取 TuyaOpen 专用授权码：

- 方式1：购买已烧录 TuyaOpen 授权码模块。该授权码已经在出厂时烧录在对应模组中，且不会丢失。TuyaOpen 在启动时通过 `tuya_iot_license_read()` 接口读取授权码。请确认当前设备是否为烧录了 TuyaOpen 授权码。

- 方式2：如当前模组未烧录 TuyaOpen 授权码，可通过 [https://platform.tuya.com/purchase/index?type=6](https://platform.tuya.com/purchase/index?type=6) 页面购买 **TuyaOpen 授权码**，然后将 [apps/tuya_cloud/switch_demo/src/tuya_config.h](https://github.com/tuya/TuyaOpen/blob/master/apps/tuya_cloud/switch_demo/src/tuya_config.h) （请根据当前实际编译项目选择对应项目中的 tuya_config.h）文件中 `TUYA_DEVICE_UUID` 和 `TUYA_DEVICE_AUTHKEY` 替换为购买成功后获取到的 `uuid` 和 `authkey`。

- 方式3： 如当前模组未烧录 TuyaOpen 授权码，可通过 [https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP) 页面购买 **TuyaOpen 授权码**，然后将 [apps/tuya_cloud/switch_demo/src/tuya_config.h](https://github.com/tuya/TuyaOpen/blob/master/apps/tuya_cloud/switch_demo/src/tuya_config.h) （请根据当前实际编译项目选择对应项目中的 tuya_config.h）文件中 `TUYA_DEVICE_UUID` 和 `TUYA_DEVICE_AUTHKEY` 替换为购买成功后获取到的 `uuid` 和 `authkey`。

![授权码](/images/zh/authorization_code.png)

```c
tuya_iot_license_t license;

if (OPRT_OK != tuya_iot_license_read(&license)) {
   license.uuid = TUYA_DEVICE_UUID;
   license.authkey = TUYA_DEVICE_AUTHKEY;
   PR_WARN("Replace the TUYA_DEVICE_UUID and TUYA_DEVICE_AUTHKEY contents, otherwise the demo cannot work");
}
```

如 `tuya_iot_license_read()` 接口返回 OPRT_OK，则表示当前设备已经烧录了 TuyaOpen 授权码，否则表示当前模组并未烧录 TuyaOpen 授权码。

## 编译烧录

- 运行 `tos config_choice` 命令， 选择当前运行的开发板或 platform。
- 如需修改配置，请先运行 `tos menuconfig` 命令修改配置。
- 运行 `tos build` 命令，编译工程。
- 使用 tos flash 命令进行一键烧录。

更多 tos 具体请参考 [tos 使用指南](/docs/tos-tools/tos-guide)。

## 配网激活

使用 涂鸦APP 通过蓝牙或者 Wi-Fi AP 模式配网并激活设备
