---
title: switch_demo
---

`switch_demo` is a Tuya IoT application and a minimal functionality application demo provided by the Tuya AI+IoT platform. It is a simple, cross-platform, cross-system switch example that supports multiple connections. Through the Tuya APP and Tuya Cloud services, you can perform remote control (when away), LAN control (same local network), and Bluetooth control (when no network is available) on this switch.

The current `switch_demo` demonstrates the following functions:
1. Supports Bluetooth network configuration
2. Supports WiFi AP mode network configuration
3. Receives MQTT control data from the cloud and automatically responds
4. Receives LAN TCP control data from the APP and automatically responds
5. OTA functionality

Currently, `switch_demo` does not control real hardware, so it can run on all currently supported [platforms](../../about-tuyaopen.md#supported-platform-list).

Before using `switch_demo`, you need to understand the following terms:
1. [TuyaOpen Dedicated Authorization Code](../../quick-start/index.md#tuyaopen-dedicated-authorization-code)
2. [PID](../../quick-start/index.md#pid)
3. [Network Configuration](../../quick-start/device-network-configuration.md)
4. [DP](../../applications/index.md#dp)

## Default APP Control Panel

![](https://images.tuyacn.com/fe-static/docs/img/0e155d73-1042-4d9f-8886-024d89ad16b2.png)

## Directory Structure

```sh
+- switch_demo
    +- src
        -- cli_cmd.c
        -- tuya_main.c
        -- tuya_config.h
    -- CMakeLists.txt
    -- README_CN.md
    -- README.md
```

- cli_cmd.c: Some command line operations for switch_demo, used to view and operate switch_demo information and status
- tuya_main.c: Main functionality of switch_demo
- tuya_config.h: Tuya PID and authorization information, created and obtained on the Tuya IoT platform. You can refer to the documentation [TuyaOS quickstart](https://developer.tuya.com/en/docs/iot-device-dev/application-creation?id=Kbxw7ket3aujc)

## Supported Hardware

The current project can run on all currently supported chips and development boards

## Compilation

1. Run the `tos config_choice` command to select the current development board or platform.
2. If you need to modify the configuration, first run the `tos menuconfig` command to modify the configuration.
3. Run the `tos build` command to compile the project.
