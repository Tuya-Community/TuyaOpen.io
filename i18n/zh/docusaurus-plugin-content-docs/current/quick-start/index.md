---
title: 快速开始
---

快速开始带你从一个 TuyaOpen 授权码出发，一步步把设备接入涂鸦 IoT 云。请先了解下面的名词，再获取后续每一步都会用到的授权码和串口工具。

## 名词解释

在开始使用 TuyaOpen 前，请先了解以下名词。

### TuyaOpen 专用授权码

**授权码**（License）是涂鸦为设备颁发的加密证书，使设备能够接入涂鸦 IoT 操作系统。每台设备都必须分配一个唯一的授权码用于认证，该授权码授予单台设备连接并访问云端的权限。

**授权码** 由 `UUID` 和 `AuthKey` 组成。

TuyaOpen 专用授权码适用于所有 TuyaOpen Framework 组件：

- [C 版 TuyaOpen](https://github.com/tuya/TuyaOpen)
- [Arduino 版 TuyaOpen](https://github.com/tuya/arduino-TuyaOpen)
- [LuaNode 版 TuyaOpen](https://github.com/tuya/luanode-TuyaOpen)

:::danger
TuyaOpen Framework 均采用 TuyaOpen 专用授权码，使用其他（包括 TuyaOS）授权码均无法在 TuyaOpen Framework 中用于连接涂鸦云。
:::

#### UUID

UUID（Universally Unique Identifier，通用唯一识别码）是由各种算法生成、用于标识每台设备的唯一编号。UUID 是一个 20 位的字符串，不会随反复激活、配网等操作而改变。

#### AuthKey

`AuthKey` 是平台为设备颁发的设备认证密钥。它是一个 32 位的字符串，与 `UUID` 一一对应，并与 `PID`、`UUID` 强绑定。

:::warning
`AuthKey` 在设备认证时使用。请妥善保管，不要泄露。
:::

### PID

`PID` 即 Product ID（产品 ID）。在平台上创建的每个产品都会分配一个唯一的 `PID`。`PID` 关联了某个产品的具体信息，包括数据点（DP）、App 控制面板和采购信息等。可以把 `PID` 看作所属产品的身份证。

:::info
`PID`、`UUID` 和 `AuthKey` 合称为设备三元组。
:::

### Device ID

每次设备激活并配网时，云端都会分配一个 Device ID。配网成功后，它关联账号和 App 下的实际用户设备数据。在某些场景下 Device ID 会发生改变，并在重新配网、重新激活后被重新分配。例如，在 App 中进入设备面板，点击右上角进入设备属性页，再点击 **解绑并清除数据**。


## TuyaOpen 授权码获取

请选择以下任一方式。

- 方式一：通过 [生产研发采购](https://platform.tuya.com/purchase/index?type=6) 购买已烧录了 TuyaOpen 授权码的模组。该授权码已经在出厂时烧录在对应模组中，且不会丢失。TuyaOpen 在启动时会通过 `tuya_iot_license_read()` 接口读取授权码。请确认当前已购模组是否烧录了 TuyaOpen 授权码。

- 方式二：如当前模组未烧录 TuyaOpen 授权码：
  - 可通过 [生产研发采购](https://platform.tuya.com/purchase/index?type=6) 页面购买 TuyaOpen 授权码。
  - 可通过 [购买页面](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP) 购买 TuyaOpen 授权码。

![授权码](/images/zh/authorization_code.png)

## 准备工作

在开始快速上手之前，请确保完成以下准备工作：

- 获取 [TuyaOpen 授权码](#tuyaopen授权码获取)。
- 获取 [涂鸦通用串口工具](https://www.tuyaopen.ai/zh/tyutool) 用于接下来的固件烧录、TuyaOpen 授权码写入、串口调试等。

## 视频指导

- Linux/Mac —— [安装Linux虚拟机](https://www.bilibili.com/video/BV1vHaPziErs/?spm_id_from=333.1387.collection.video_card.click)、[配置ssh](https://www.bilibili.com/video/BV1vHaPziEQz?spm_id_from=333.788.videopod.sections)、[开发Demo](https://www.bilibili.com/video/BV1RHaPziE91/?spm_id_from=333.1387.collection.video_card.click)
- Windows —— [环境搭建](https://www.bilibili.com/video/BV1cXaPzjEaB/?spm_id_from=333.1387.collection.video_card.click)、[开发Demo](https://www.bilibili.com/video/BV1rDaPz2EXa/?spm_id_from=333.1387.collection.video_card.click)、[烧录日志](https://www.bilibili.com/video/BV1rDaPz2Ero/?spm_id_from=333.1387.collection.video_card.click)
- 设备配网 —— [成品效果](https://www.bilibili.com/video/BV1vHaPziEH5/?spm_id_from=333.1387.collection.video_card.click)