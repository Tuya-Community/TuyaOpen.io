---
title: Authorize Devices
---

# Authorize Devices

## Overview

For information about licenses, see [License](../quick-start/index.md#tuyaopen-dedicated-authorization-code).

You can use either of the following authorization methods:
- Run the authorization command
- Modify header file

## Run the authorization command

1. Run the command `tos.py monitor -b 115200`.

   :::tip
   Select the serial port number used for flashing.
   :::

2. Enter the interactive command, use `auth,` and then press Enter. You will get the following information:

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


3. Use `auth` as prompted to write `uuid` and `authkey`.

   ```bash
   tuya>
   auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
   auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
   Authorization write succeeds.
   ```

4. After successful operation, reboot the device for the authorization information to take effect.

   If the device does not support authorization commands, refer to the section below to configure authorization information by modifying the header file.

## Modify header file

1. Locate the `tuya_config.h` file in your project directory. The directory might vary by project (check either the `src` or `include` directory).

2. Modify the configuration of the authorization information in the file as follows:


   ```c++
   #define TUYA_OPENSDK_UUID      "uuidxxxxxxxxxxxxxxxx"  // Change to the correct uuid
   #define TUYA_OPENSDK_AUTHKEY   "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" // Change to the correct authkey
   ```

3. Rebuild the firmware, flash it to the device, and then power on the device.
