---
title: "Step 3: Authorize Devices"
---

Device authorization writes a TuyaOpen license — a `UUID` and an `AuthKey` — into your device so it can connect to the Tuya IoT Cloud. Every device needs a unique license before it can pair and come online.

For what a license is and how to obtain one, see [TuyaOpen dedicated license](index.md#tuyaopen-dedicated-license).

You can authorize a device in two ways:

- Run the authorization command over the serial monitor.
- Modify the configuration header file.

Use the command method when your firmware supports the `auth` CLI. Use the header-file method when it does not, or when you prefer to bake the license into the build.

## Run the authorization command

1. Start the serial monitor:

   ```bash
   tos.py monitor -b 115200
   ```

   :::tip
   Select the serial port used for flashing.
   :::

   :::tip
   Run this command from the application project path (where you run `tos.py build`), and only after the project has compiled successfully.
   :::

2. Type `auth` and press Enter. The tool prints the expected usage:

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

3. Write the `uuid` and `authkey` with the `auth` command. A successful write prints `Authorization write succeeds.`:

   ```bash
   tuya>
   auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
   auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
   Authorization write succeeds.
   ```

4. Verify the write with the `auth-read` command. The device echoes the stored `uuid` and `authkey`:

   ```bash
   tuya>
   auth-read
   auth-read
   uuid9f6a6xxxxxxxxxxx
   cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
   ```

5. Reboot the device for the authorization to take effect.

:::note
If the device does not support the `auth` command, use the header-file method below instead.
:::

## Modify the header file

1. Locate the `tuya_config.h` file in your project directory. The exact directory varies by project — check the `src` or `include` directory.

2. Set the authorization fields:

   ```c
   #define TUYA_OPENSDK_UUID      "uuidxxxxxxxxxxxxxxxx"             // Change to the correct uuid
   #define TUYA_OPENSDK_AUTHKEY   "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  // Change to the correct authkey
   ```

3. Rebuild the firmware, flash it to the device, and power on the device.

## See also

- [TuyaOpen dedicated license](index.md#tuyaopen-dedicated-license)
- [GUI - tyutool Graphical Tool](../tos-tools/tools-tyutool.md#device-authorization-information-writing)
