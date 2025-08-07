---
title: 快速上手
---

## 名词解释

在开始 TuyaOpen 前，你需要了解以下相关名词：

### TuyaOpen 专用授权码

**授权码**（License）是涂鸦统一为设备颁发的安全加密证书，是智能设备运行涂鸦 IoT 操作系统的合法凭证，每台设备都具有唯一的授权码。也就是说，一个授权码代表一个设备接入许可，仅用于一台设备连接和访问云端。

**授权码**由 `UUID` 和 `Authkey` 组成。

TuyaOpen 专用授权码适用于所有 Tuyaopen Framework 包括：
- C 版 TuyaOpen：[https://github.com/tuya/TuyaOpen](https://github.com/tuya/TuyaOpen)
- Arduino 版 TuyaOpen：[https://github.com/tuya/arduino-TuyaOpen](https://github.com/tuya/arduino-TuyaOpen)
- Luanode 版 TuyaOpen：[https://github.com/tuya/luanode-TuyaOpen](https://github.com/tuya/luanode-TuyaOpen)

:::danger
Tuyaopen Framework 均采用 TuyaOpen 专用授权码，使用其他 (包括 TuyaOS) 授权码均无法在 Tuyaopen Framework 中用于连接涂鸦云。
:::

#### UUID

UUID 为 Universally Unique Identifier 的缩写。在涂鸦智能开发智能化产品时，UUID 是设备唯一的识别 ID，Authkey 是设备在云端注册时需要的密钥，和 UUID 是一一匹配的关系。UUID 的长度是 20 位，Authkey 的长度是 32 位。 UUID 不会随反复激活配网等操作而更改。

#### Authkey

Authkey 平台为设备颁发的设备密钥，和 PID、UUID 强绑定。注意：该参数很重要，在设备认证时会用到，请妥善保管并且不能泄露。

### PID

PID 为 Product ID 的缩写。开发者在该平台创建的每一个产品都会产生一个唯一的产品编号，即 PID。PID 关联了产品具体的功能、App 控制面板、出货信息等所有跟这个产品相关的信息。如果把产品比喻为人，那么 PID 则是产品的身份证。

:::info
通常 PID、UUID、AUTHKEY 被称为设备的三元组。
:::

### DeviceID

DeviceID 为设备每次激活配网的时候，云端分配给到的 id，关联配网后与账号、App等相关的实际用户设备数据。DeviceID 会在某些特定场景下（如在 App 上进入设备面板点击右上角进入设备属性页面，点击 "解绑并清除数据"）后，重新配网激活后会改变。


## TuyaOpen授权码获取

- 方式一：通过 [生产研发采购](https://platform.tuya.com/purchase/index?type=6) 购买已烧录 TuyaOpen 授权码模块。该授权码已经在出厂时烧录在对应模组中，且不会丢失。TuyaOpen 在启动时会通过 `tuya_iot_license_read()` 接口读取授权码。请确认当前已购模组是否烧录了 TuyaOpen 授权码。

- 方式二：如当前模组未烧录 TuyaOpen 授权码，可通过 [生产研发采购](https://platform.tuya.com/purchase/index?type=6) 页面购买 TuyaOpen 授权码。

- 方式三：如当前模组未烧录 TuyaOpen 授权码，可通过 [购买页面](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP) 购买 TuyaOpen 授权码。

![授权码](/images/zh/authorization_code.png)

## 准备工作

在开始快速上手之前，请确保完成以下准备工作：

- step1: 获取 [TuyaOpen 授权码](#tuyaopen授权码获取)
- step2: 获取 [涂鸦通用串口工具](https://www.tuyaopen.ai/zh/tools/tyutool) 用于接下来的固件烧录，TuyaOpen 授权码写入、串口调试等
