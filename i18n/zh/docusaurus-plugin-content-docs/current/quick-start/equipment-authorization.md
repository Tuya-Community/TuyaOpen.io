---
title: "Step 3: 设备授权"
---

设备授权是将 TuyaOpen 授权码（一个 `UUID` 和一个 `AuthKey`）写入设备，使其能够接入涂鸦 IoT 云。每台设备在配网上线前都需要一组唯一的授权码。

关于授权码的概念及获取方式，请参阅 [TuyaOpen 专用授权码](index.md#tuyaopen-专用授权码)。

你可以使用以下两种授权方式：

- 通过串口监视器运行授权命令。
- 修改配置头文件。

当固件支持 `auth` 命令行时，使用授权命令方式；当固件不支持该命令，或你希望将授权码直接编入固件时，使用修改头文件方式。

## 授权命令

1. 启动串口监视器：

   ```bash
   tos.py monitor -b 115200
   ```

   :::tip
   选择烧录时使用的串口号。
   :::

   :::tip
   请在应用项目路径下（执行 `tos.py build` 的位置）运行该命令，且项目已编译成功。
   :::

2. 输入 `auth` 并回车，工具会打印用法提示：

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

3. 使用 `auth` 命令写入 `uuid` 和 `authkey`。写入成功时打印 `Authorization write succeeds.`：

   ```bash
   tuya>
   auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
   auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
   Authorization write succeeds.
   ```

4. 使用 `auth-read` 命令验证写入结果。设备会回显已存储的 `uuid` 和 `authkey`：

   ```bash
   tuya>
   auth-read
   auth-read
   uuid9f6a6xxxxxxxxxxx
   cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
   ```

5. 重启设备，使授权信息生效。

:::note
若设备不支持 `auth` 命令，请改用下文的修改头文件方式。
:::

## 修改头文件

1. 在项目路径中找到 `tuya_config.h` 文件。不同项目的目录可能有差异——请检查 `src` 或 `include` 目录。

2. 设置授权信息字段：

   ```c
   #define TUYA_OPENSDK_UUID      "uuidxxxxxxxxxxxxxxxx"             // Change to the correct uuid
   #define TUYA_OPENSDK_AUTHKEY   "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  // Change to the correct authkey
   ```

3. 重新编译、烧录固件，然后启动设备。

## 相关文档

- [TuyaOpen 专用授权码](index.md#tuyaopen-专用授权码)
- [GUI - tyutool 图形化工具](../tos-tools/tools-tyutool.md#设备授权信息写入)
