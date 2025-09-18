---
title: Generic Demos
---

# Generic Demos

The TuyaOpen provides a variety of sample projects to facilitate developers in quickly getting started and understanding the usage of the TuyaOpen.

```bash
$ examples
├── ble
│   ├── ble_central
│   └── ble_peripher
├── get-started
│   └── sample_project
├── peripherals
│   ├── adc
│   ├── gpio
│   ├── i2c
│   ├── pwm
│   ├── spi
│   ├── timer
│   └── watchdog
├── protocols
│   ├── http_client
│   ├── https_client
│   ├── mqtt
│   ├── tcp_client
│   └── tcp_server
├── system
│   ├── os_event
│   ├── os_kv
│   ├── os_mutex
│   ├── os_queue
│   ├── os_semaphore
│   ├── os_sw_timer
│   └── os_thread
└── wifi
    ├── ap
    ├── low_power
    ├── scan
    └── sta
```

## Select the project to be compiled


Each chip model comes with corresponding example projects.

To select the example to be compiled, enter the example directory using the command `cd ./example/xxx/xxx`, then set the compilation platform with the command `tos.py config choice`.

Each sample project includes a README.md file that provides detailed instructions on configuring, compiling, and running the project.

## Compile the example

1. Run the `tos.py config choice` command to select the current development board or platform.
2. If you need to modify the configuration, run the `tos.py config menu` command to make changes.
3. Run the `tos.py build` command to compile the project.
