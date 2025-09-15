---
title: "Simple Tuya IoT Switch"
date: 2024-06-11
---

# Simple Tuya IoT Switch

## Project Overview

The IoT Switch project is a simple yet powerful demonstration of how to build a cloud-connected device using Tuya's platform. This example showcases a basic switch that can be controlled via a mobile app, highlighting essential concepts such as DP (Data Point) control and minimal code implementation for a connected device. The project includes secure device authentication using PID, UUID, and Auth Key, and is compatible with a wide range of hardware platforms, including Tuya T series MCUs, ESP32, and Linux-based MCUs.

<p align="center">
  <img
    src="/img/projects/project-iot-switch.png"
    alt="IoT Switch Project Screenshot"
    style={{
      width: "80%",
      borderRadius: "12px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
    }}
  />
</p>

<!-- Add screenshots or images of your project here -->

## Features

- Simple Tuya cloud-connected switch device
- App-based remote control
- Minimal and easy-to-understand codebase
- Secure device authentication (PID, UUID, Auth Key)
- Supports multiple hardware platforms

## Supported Hardware

- Hardware platforms/chip models: Tuya T5, Tuya T2, Tuya T1, ESP32, Linux SoCs, and more

## Quick Start

1. Clone the TuyaOpen repository or download the source code.
2. Set up your development environment following the [Quick Start Guide](/docs/quick-start/enviroment-setup).
3. Obtain your Device Auth Key from the Tuya Developer Platform.
4. Update the credential information in the `tuya_config.h` header file.
5. Compile and flash the firmware to your device.
6. Run and debug your IoT Switch.



## Need Custom Features?
The PID (Product ID) is a unique string used to identify and associate your product definition in the cloud. If you want to implement control for multiple sensors or multiple switches, you can create your own custom device ("product") on the Tuya Developer Platform [here](https://developer.tuya.com/en/docs/iot/create-product?id=K914jp1ijtsfe) and define your own control [DPs (Data Points)](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-iot_abi_dp_ctrl?id=Kcoglhn5r7ajr). This allows you to achieve more complex and diverse device functions through the cloud. Finally, on the device, update the PID of your defined product in the `tuya_config.h` header file and develop support for the new DP points as needed.


## Repository Link

<p align="center">
  <a
    href="https://github.com/tuya/TuyaOpen/tree/master/apps/tuya_cloud/switch_demo"
    target="_blank"
    className="button button--primary"
    style={{
      fontSize: "1.15rem",
      padding: "14px 2.5em",
      borderRadius: "16px",
      background: "linear-gradient(90deg, #4f8cff 0%, #38b2ac 100%)",
      color: "#fff",
      boxShadow: "0 4px 24px rgba(79,140,255,0.18), 0 1.5px 6px rgba(56,178,172,0.10)",
      border: "none",
      fontWeight: "bold",
      letterSpacing: "0.04em",
      transition: "transform 0.15s, box-shadow 0.15s",
      display: "inline-block"
    }}
  >
    🚀 Go to Project Repository
  </a>
</p>
