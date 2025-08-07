---
title: 设备授权
---

# 授权

## 概述

如需了解关于授权码的概念，请查看 [授权码说明](../quick-start/index.md#tuyaopen-专用授权码)。

您可以使用以下两种授权方式：
- 授权命令
- 修改头文件

## 授权命令

1. 使用命令 `tos.py monitor -b 115200`。

    :::tip
    这里选择烧录时使用的串口号。
    :::

2. 输入交互命令，使用 `auth` 并回车，可以得到如下信息：

    ```bash
    [INFO]: Run Tuya Uart Tool.
    --------------------
    1. /dev/ttyACM1
    2. /dev/ttyACM0
    --------------------
    Select serial port: 2
    [INFO]: Open Monitor. (Quit: Ctrl+c)
    auth
    auth
    Use like: auth uuidxxxxxxxxxxxxxxxx keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    tuya>
    ```

3. 根据提示使用 `auth`，写入 `uuid` 和 `authkey`。

    ```bash
    tuya>
    auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
    auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
    Authorization write succeeds.
    ```

4. 操作成功后，需要重启设备，重启后授权信息生效。

    若设备不支持授权命令，请参考下文通过修改头文件的方式来配置授权信息。

## 修改头文件

1. 首先，在项目路径中找到 `tuya_config.h` 文件。所选的项目不同，文件所在目录可能有差异（`src` 或 `include`）。

2. 修改文件中授权信息的配置，如下：

    ```c++
    #define TUYA_OPENSDK_UUID      "uuidxxxxxxxxxxxxxxxx"                    // Please change the correct uuid
    #define TUYA_OPENSDK_AUTHKEY   "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"        // Please change the correct authkey
    ```

3. 重新编译、烧录，然后启动设备。
