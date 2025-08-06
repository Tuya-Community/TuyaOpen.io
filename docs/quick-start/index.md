---
title: quick-start
---

## Terminology

Before starting with TuyaOpen, you need to understand the following related terms:

### TuyaOpen Dedicated Authorization Code

**Authorization Code** (License) is a security encryption certificate issued by Tuya for devices, serving as the legal credential for smart devices to run Tuya IoT operating system. Each device has a unique authorization code. In other words, one authorization code represents one device access permit, used only for one device to connect and access the cloud.

**Authorization Code** consists of `UUID` and `Authkey`.

TuyaOpen dedicated authorization code is applicable to all TuyaOpen Frameworks including:
- C version TuyaOpen: [https://github.com/tuya/TuyaOpen](https://github.com/tuya/TuyaOpen)
- Arduino version TuyaOpen: [https://github.com/tuya/arduino-TuyaOpen](https://github.com/tuya/arduino-TuyaOpen)
- Luanode version TuyaOpen: [https://github.com/tuya/luanode-TuyaOpen](https://github.com/tuya/luanode-TuyaOpen)

:::danger
All TuyaOpen Frameworks use TuyaOpen dedicated authorization codes. Using other authorization codes (including TuyaOS) cannot be used in TuyaOpen Framework to connect to Tuya cloud.
:::

#### UUID

UUID is the abbreviation for Universally Unique Identifier. In Tuya Smart development of intelligent products, UUID is the device's unique identification ID, and Authkey is the key required for device registration in the cloud, with a one-to-one matching relationship with UUID. The length of UUID is 20 digits, and the length of Authkey is 32 digits. UUID will not change with repeated activation and network configuration operations.

#### Authkey

Authkey is the device key issued by the platform for devices, strongly bound to PID and UUID. Note: This parameter is very important and will be used during device authentication. Please keep it safe and do not leak it.

### PID

PID is the abbreviation for Product ID. Every product created by developers on this platform will generate a unique product number, which is PID. PID is associated with the product's specific functions, App control panel, shipping information, and all other information related to this product. If we compare a product to a person, then PID is the product's ID card.

:::info
Usually, PID, UUID, and AUTHKEY are called the device's triplet.
:::

### DeviceID

DeviceID is the ID assigned by the cloud each time the device activates network configuration, associated with the actual user device data related to the account and App after network configuration. DeviceID will change in certain specific scenarios (such as entering the device panel in the App, clicking the top right corner to enter the device properties page, clicking "Unbind and Clear Data") and then reconfiguring the network activation.


## TuyaOpen Authorization Code Acquisition

- Method 1: Purchase modules with pre-burned TuyaOpen authorization codes through [Production R&D Procurement](https://platform.tuya.com/purchase/index?type=6). This authorization code has been burned into the corresponding module at the factory and will not be lost. TuyaOpen will read the authorization code through the `tuya_iot_license_read()` interface when starting. Please confirm whether the currently purchased module has TuyaOpen authorization code burned in.

- Method 2: If the current module does not have TuyaOpen authorization code burned in, you can purchase TuyaOpen authorization codes through the [Production R&D Procurement](https://platform.tuya.com/purchase/index?type=6) page.

- Method 3: If the current module does not have TuyaOpen authorization code burned in, you can purchase TuyaOpen authorization codes through the [Purchase Page](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP).

![Authorization Code](/images/en/authorization_code.png)

## Preparation

Before starting the quick start, please ensure the following preparations are completed:

- step1: Obtain [TuyaOpen Authorization Code](#tuyaopen-authorization-code-acquisition)
- step2: Obtain [Tuya Universal Serial Tool](https://www.tuyaopen.ai/tools/tyutool) for the upcoming firmware burning, TuyaOpen authorization code writing, serial debugging, etc.
