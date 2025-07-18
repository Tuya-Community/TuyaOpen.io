---
title: Directory Structure Description
---

# `TuyaOpen` Directory Structure Description

## Overview

Introduction to the directory structure and purpose of `TuyaOpen`

Main directory display

```
.
├── apps
│   ├── tuya.ai
│   └── tuya_cloud
├── boards
├── CMakeLists.txt
├── Dockerfile
├── examples
├── export.bat
├── export.sh
├── LICENSE
├── platform
│   └── platform_config.yaml
├── README.md
├── requirements.txt
├── src
├── tools
│   ├── cli_command
│   ├── cmake
│   ├── kconfiglib
│   └── tyutool
└── tos.py
```

## `src`

The main storage location for core source code, containing the framework's basic functionality implementation, core modules, and cross-platform common code

Main content includes:

    1. Basic Components and Services

        System Kernel: Contains operating system basic functions such as task scheduling, memory management, thread synchronization (mutexes, semaphores), etc.

        Device Management: Implements core logic for device initialization, status management, resource allocation, etc., such as device registration, configuration loading, etc.

        Communication Protocol Stack: Encapsulates upper-layer interfaces for communication protocols like Bluetooth, Wi-Fi, MQTT, HTTP, etc., providing unified network communication capabilities for applications

    1. Cross-Platform Abstraction Layer

        Hardware-Independent Interfaces: Defines APIs decoupled from hardware, implementing specific functions by calling drivers in the `platform` directory.

        Operating System Abstraction: Provides cross-operating system interfaces (such as thread creation, timer management), ensuring the framework can run on different OS (such as Linux, RTOS).

Main components include:

```
src/
├── base/          # Basic utility library (such as logging, memory operations, data structures)
├── device/        # Device management core code
├── network/       # Network communication modules (Wi-Fi, Bluetooth, MQTT, etc.)
├── security/      # Security encryption modules (device authentication, data encryption)
├── ai/            # AI functionality interfaces (voice recognition, image analysis)
├── cloud/         # Cloud integration services (Tuya cloud API calls)
└── utils/         # General utility functions
```

## `apps` and `examples`

Both are storage paths for engineering projects, where

    1. `apps` contains complex application projects, divided into AI applications `tuya.ai` and IoT applications `tuya_cloud`;

    1. `examples` contains single-function demo routines, such as WiFi, Bluetooth, buttons, etc.;

## `app_default.config`

The configuration file for `TuyaOpen`, used to configure project compilation parameters

It should be noted that the `app_default.config` file only saves **minimum configuration items**

This means only configuration content different from default values is preserved

Main functions:

    1. Compilation Parameter Configuration

        Target Platform Definition: Records the target platform/development board for current project compilation (such as T5AI, ESP32), determining the hardware drivers and compilation toolchain to load

        Compilation Option Control: Contains compiler flags (such as optimization levels, macro definitions), firmware version numbers, storage partition configurations, etc.

    1. Hardware Resource Configuration

        Peripheral Parameters: Defines hardware interface parameters (such as serial baud rate, GPIO pin allocation, SPI communication rate)

        Memory Layout: Configures firmware storage addresses in Flash, RAM allocation, and other memory-related parameters

    1. Function Module Switches

        Component Enable/Disable: Controls whether specific function modules (such as Bluetooth, Wi-Fi, AI services) are included in the project, avoiding redundant code

        Function Option Configuration: Such as whether to enable OTA upgrade functionality

## `platform` and `platform_config.yaml`

The `platform` file stores toolchain repositories, each repository needs to implement:

    1. Hardware Abstraction Layer (HAL):
    
        Targeted at different chip architectures (such as `ESP32`, `BK7231N`, `T5AI`, etc.), implementing underlying drivers that abstract hardware details (such as `GPIO`, `UART`, `SPI`, `Bluetooth/Wi-Fi` protocol stacks, etc.), allowing upper-layer applications to not worry about specific hardware differences.
    
    1. Unified API:
    
        By defining standardized interfaces (such as `hal_gpio_read()`, `hal_uart_send()`), upper-layer code (such as application logic in the `app` folder) can call different hardware functions in the same way.

Due to the large space occupied by toolchain repositories, only when the project configuration requires it will the corresponding toolchain be downloaded

The `git`-related information needed to download toolchains is recorded in the `platform_config.yaml` file

## `boards`

The `boards` folder is mainly used to store configuration files and support code related to development boards. Its core function is to adapt to different hardware platforms, ensuring the TuyaOpen framework can run normally on various development boards. Here are the specific functions and content descriptions of this folder:

    1. Configuration Files:

        Using `Kconfig` files, configurable functions and some compilation parameters of chips or development boards are provided to developers for configuration. When using the command `tos config menu`, they will be automatically loaded and displayed

    1. Target Selection:

        The `boards` folder contains configuration files for various development boards (such as T2.config, T3.config, etc.), defining hardware parameters of target development boards (such as serial baud rate, pin allocation, memory layout, etc.). These configurations will be selected by the `tos.py config choice` command during compilation

    1. Hardware Adaptation:

        For different chips (such as T2, T3, T5AI, ESP32, etc.), `boards` may provide some underlying driver adaptation code or compilation scripts, ensuring the framework correctly interacts with hardware peripherals (such as UART, GPIO, SPI, etc.).


## `tos.py` and `export.sh`

`tos.py` is a core command-line tool used to simplify development workflows, manage project configurations, and execute compilation and deployment operations. For detailed usage instructions, refer to: [`tos.py` Usage](./tos-guide.md)

`export.sh` and `export.bat` are used to activate the command-line functionality of `tos.py`

## `tools`

Stores tool scripts, auxiliary programs, and configuration files used during development, compilation, testing, and deployment processes

    1. Compilation and Build Tools

        Project Build Scripts: Contains scripts for compiling firmware and generating binary files (such as Makefile, CMakeLists.txt, or custom Python scripts).

        Firmware Packaging Tools: Package compiled code and configuration files into distributable firmware formats (such as .bin, .ota).

    1. Development Auxiliary Tools

        Programming Tools: Provides tools for programming firmware to hardware devices (`tyutool`)

        Configuration Generators: Help generate device configuration files

        Code Formatting Tools: Formatting scripts to ensure consistent code style

## Temporary Files and Directories

- `.venv`: Python virtual environment installation path

- `.build`: Compilation output directory, containing compiled firmware files

## Usage Examples

To get started with TuyaOpen, you can:

1. Use `tos.py config choice` to select your target development board
2. Use `tos.py config menu` to configure project parameters
3. Use `tos.py build` to compile your project
4. Use `tos.py flash` to program the firmware to your device

## Subsequent Operations

- Read the [`tos.py` Usage Guide](./tos-guide.md) to learn more about project management commands
- Explore the `examples` directory to understand basic functionality implementations
- Check the `apps` directory for complex application examples
- Review the `boards` directory to understand hardware platform configurations
- Refer to the `src` directory documentation for detailed API usage 