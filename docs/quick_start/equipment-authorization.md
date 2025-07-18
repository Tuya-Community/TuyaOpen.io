---
title: Equipment Authorization
---

# Authorization

For information about authorization codes, please check [Authorization Code Description](./unboxing.md#license-key)

Two authorization methods are provided

## Authorization Command

Use command `tos.py monitor -b 115200`

:::tip
Here select the serial port used during flashing
:::

Input interactive command, `auth`, press Enter

You will get the following information

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

According to the prompt, use `auth` to write `uuid` and `authkey`

```bash
tuya>
auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
Authorization write succeeds.
```

If the device doesn't support authorization command, use method 2 to configure authorization information

## Modify Header File

Find the `tuya_config.h` file in the project path

The file location may vary depending on the selected project, in `src` or `include` directory

Modify the authorization information configuration in the file, such as

```c++
#define TUYA_OPENSDK_UUID      "uuidxxxxxxxxxxxxxxxx"                    // Please change the correct uuid
#define TUYA_OPENSDK_AUTHKEY   "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"        // Please change the correct authkey
```

Recompile, flash, and start the device
