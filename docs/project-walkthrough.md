---
title: Directory Structure
---

# Directory Structure

## Overview

This topic describes the directory structure and purpose of TuyaOpen.

Main directory is as follows:


```
.
├── apps
│   ├── tuya.ai
│   └── tuya_cloud
├── boards
├── CMakeLists.txt
├── Dockerfile
├── examples
├── export.bat
├── export.sh
├── LICENSE
├── platform
│   └── platform_config.yaml
├── README.md
├── requirements.txt
├── src
├── tools
│   ├── cli_command
│   ├── cmake
│   ├── kconfiglib
│   └── tyutool
└── tos.py
```


## `src`

The main storage location for core source code, including the implementation of the framework's fundamental functionalities, core modules, and cross-platform universal code.

The following features are supported:

- Basic components and services
   - **System kernel**: Includes fundamental operating system (OS) functionalities such as task scheduling, memory management, and thread synchronization (mutexes and semaphores).
   - **Device management**: Implements core logic for device initialization, state management, and resource allocation, such as device registration and configuration loading.
   - **Communication protocol stack**: Provides encapsulated upper-layer interfaces for Bluetooth, Wi-Fi, MQTT, and HTTP, thereby delivering unified network communication capabilities for applications.

- Cross-platform abstraction layer
   - **Hardware-agnostic interface**: Defines hardware-decoupled APIs that implement specific functionalities by invoking drivers in the `platform` directory.
   - **OS abstraction**: Provides cross-OS interfaces, such as thread creation and timer management, to ensure the framework can run on different systems, like Linux and RTOS.

Main components include:

```
src/
├── base/           # Basic utilities (logging, memory operations, and data structures)
├── device/         # Core device management code
├── network/        # Network communications (Wi-Fi, Bluetooth, and MQTT)
├── security/       # Security and encryption (device auth and data encryption)
├── ai/             # AI interfaces (voice recognition and image analytics)
├── cloud/          # Cloud integration services (Tuya cloud API calls)
└── utils/          # Common utility functions
```

## `apps` and `examples`

Both are storage paths for projects, where:

- The `apps` directory contains complex application projects, divided into AI applications `tuya.ai` and IoT applications `tuya_cloud`.

- The `examples` directory contains single-feature demo routines, such as WiFi, Bluetooth, and buttons.

## `app_default.config`

`TuyaOpen configuration file, used to configure project compilation parameters.`

:::warning
The `app_default.config` file only stores **minimum configuration items**, meaning it retains only settings that differ from default values.
:::

Main features:

- Configure compilation parameters:

   - Target platform definition: Records the target platform/development board (such as T5AI and ESP32) for the current project compilation, and determines the hardware driver and tool chain to load.

   - Compilation option control: Includes compiler flags (such as optimization level and macro definition), firmware version number, and storage partitioning.

- Configure hardware resource allocation:

   - Peripheral parameters: Defines hardware interface parameters, such as serial port baud rate, GPIO pin assignment, and SPI clock rate.

   - Memory layout: Configure the firmware's address in the flash memory, RAM allocation, and other memory-related parameters.

- Functional module toggles

   - Enable/Disable components: Controls whether specific functional modules (such as Bluetooth, Wi-Fi, and AI services) are included in the project to avoid redundant code.

   - Configure options: Specifies whether to enable OTA update functionality.

## `platform` and `platform_config.yaml`

The `platform` file stores the toolchain repository. Each repository needs to implement:

- Hardware abstraction layer (HAL)

   For diverse chip architectures (like ESP32, BK7231N, and T5AI), this abstracts underlying driver implementations (like GPIO, UART, SPI, Bluetooth, and Wi-Fi protocol stacks). Thus, applications do not need to worry about specific hardware differences.

- Unified APIs

   By defining standardized interfaces (like `hal_gpio_read()` and `hal_uart_send()`), upper-layer code (such as application logic in the `app` folder) can invoke hardware functionalities in the same way.

:::info
- Due to the large storage footprint of toolchain repositories, only project-configured toolchains are downloaded when needed.

- The `git` related information required for toolchain downloads is recorded in the `platform_config.yaml` file.
:::

## `boards`

The `boards` folder primarily stores configuration files and support code related to development boards. Its core function is to adapt to different hardware platforms, ensuring the TuyaOpen framework runs properly across various development boards. The following describes specific functions and contents of this folder.

- Configuration files

   `Kconfig` files expose configurable chip or development board features and compilation parameters for developer customization. When the command `tos config menu` is run, these configurations are automatically loaded and displayed.

- Target selection

   The `boards` folder contains configuration files for various development boards (such as `T2.config` and `T3.config`). They define hardware parameters for target boards (such as UART baud rate, pin assignments, and memory layout). During compilation, run the command `tos.py config choice` to select these configurations.

- Hardware adaptation

   The `boards` directory provides chip-specific (such as T2, T3, T5AI, and ESP32) underlying driver adaptation code and compilation scripts, ensuring the framework properly interacts with hardware peripherals (such as UART, GPIO, and SPI).


## `tos.py` and `export.sh`

- `tos.py` is a core command-line tool designed to streamline development workflows, manage project configurations, and execute compilation and deployment operations. For more information, see [tos.py Guide](./tos-tools/tos-guide.md).

- `export.sh` and `export.bat` are used to activate the command-line functionality of `tos.py`.

## `tools`

Stores tool scripts, utilities, and configuration files used during development, compilation, testing, and deployment.

- Compilation and build tools

   - Project build scripts: Contain scripts for compiling firmware and generating binary files. For example, Makefile, CMakeLists.txt, or custom Python scripts.

   - Firmware packaging tools: Package compiled code and configuration files into distributable firmware formats such as `.bin` and `.ota`.

- Development utilities

   - Flashing tool: Provide the `tyutool` utility for firmware flashing to hardware devices.

   - Config generator: Help generate device configuration files.

   - Code formatter: Format scripts to ensure code style consistency.

## Temporary files and directories

- `.venv`: The installation path of the Python virtual environment.

- `.build`: The output directory, containing built firmware files.
