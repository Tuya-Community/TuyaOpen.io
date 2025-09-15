---
title: Develop Applications
---

# Develop Applications

## Create product and get PID

First, create a product on the [Tuya Developer Platform](https://platform.tuya.com/) and get the product ID (PID). For more information, see [TuyaOS > Create Product](https://developer.tuya.com/en/docs/iot-device-dev/application-creation?id=Kbxw7ket3aujc).

Then, replace the `TUYA_PRODUCT_KEY` macro in the `tuya_config.h` file in the project directory with the specific PID.

## TuyaOpen license

TuyaOpen Framework includes:

- [TuyaOpen for C](https://github.com/tuya/TuyaOpen)

- [TuyaOpen for Arduino](https://github.com/tuya/arduino-TuyaOpen)

- [TuyaOpen for LuaNode](https://github.com/tuya/luanode-TuyaOpen)

:::warning
To connect to Tuya IoT Cloud, dedicated TuyaOpen licenses are required. Licenses from other sources will not work for connecting to the Tuya IoT Cloud.
:::

```bash
[tuya_main.c:220] Replace the TUYA_DEVICE_UUID and TUYA_DEVICE_AUTHKEY contents, otherwise the demo cannot work
[tuya_main.c:220] uuid uuidxxxxxxxxxxxxxxxx, authkey keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```


You can obtain a dedicated license through the following methods:

- Method 1: Purchase a module with the pre-flashed license. This license is permanently written into the module during manufacturing and cannot be lost. TuyaOpen automatically reads the license via the `tuya_iot_license_read()` interface during startup. Verify whether your purchased modules already contain TuyaOpen licenses.

- Method 2: If your module does not have a pre-flashed license, purchase a TuyaOpen license on the [**Production**](https://platform.tuya.com/purchase/index?type=6) page or the [**license purchase**](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP) page. Then, replace the `TUYA_DEVICE_UUID` and `TUYA_DEVICE_AUTHKEY` values in the [apps/tuya_cloud/switch_demo/src/tuya_config.h](https://github.com/tuya/TuyaOpen/blob/master/apps/tuya_cloud/switch_demo/src/tuya_config.h) file with the obtained `UUID` and `AuthKey`. Make sure you select the correct `tuya_config.h` file based on the actual project being compiled.


![License](/images/en/authorization_code.png)

```c
tuya_iot_license_t license;
if (OPRT_OK != tuya_iot_license_read(&license)) {   license.uuid = TUYA_DEVICE_UUID;
   license.authkey = TUYA_DEVICE_AUTHKEY;
   PR_WARN("Replace the TUYA_DEVICE_UUID and TUYA_DEVICE_AUTHKEY contents, otherwise the demo cannot work");
}
```

If the `tuya_iot_license_read()` interface returns `OPRT_OK`, it indicates that the current device has been pre-flashed with a TuyaOpen license. Otherwise, it means the current module does not contain a pre-flashed TuyaOpen license.

## Build and flash

1. Run the `tos config_choice` command to select the target development board or platform.
2. If you need to modify the configuration, run the `tos menuconfig` command first.
3. Run `tos build` to build the project.
4. Run the `tos flash` command for flashing.

For more information about tos, see the [tos.py User Guide](/docs/tos-tools/tos-guide).

## Pair and activate the device

On the **Tuya** app, pair and activate the device in Bluetooth or Wi-Fi access point mode.
