---
title: Generic Demos
---

# Generic Demos

TuyaOpen provides a variety of example projects to help you quickly familiarize yourself with and master the usage of TuyaOpen, significantly reducing the learning curve.

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

## Select a project to build

Each chip model comes with corresponding example projects.

Navigate to the desired example by using the command `cd ./example/xxx/xxx`. Then, run the `tos.py config choice` command to set the compilation platform.


## Build the example

1. Run the `tos.py config choice` command to select the desired development board or platform.
2. If you need to modify the configuration, run the `tos.py config menu` command first.
3. Run `tos.py build` to build the project.
