---
title: 免费领取开发者授权码
---

# 免费领取开发者授权码

本文介绍如何在涂鸦开发者平台免费领取开发者授权码（授权码），用于产品开发与调试。面向需要使用 TuyaOpen 专用 UUID 与 AuthKey 连接涂鸦云或使用云端功能的开发者。

## 概述

在产品开发阶段，您可以在涂鸦开发者平台免费领取 2 个设备授权码。当您的应用使用涂鸦云服务（如 IoT 连接、AI 功能）时，需要这些授权码。本文按步骤说明如何在平台创建产品并领取免费授权码。

## 前置条件

- 已注册涂鸦开发者平台账号。如未注册，请前往 [涂鸦 IoT 平台](https://platform.tuya.com/) 创建。

## 要求

- 可访问涂鸦开发者平台（网页端）。
- 创建产品时（步骤 1），从列表中**任选一个**与您理想产品最接近的品类即可。不必纠结选哪个：这只是快速入门的起始模板，后续功能均可自定义与重新配置。若需要 **AI-Agent（智能体）** 能力，请选择列表中**带 AI 标签**的品类。

## 步骤

### 1. 在涂鸦开发者平台创建产品

登录 [涂鸦开发者平台](https://platform.tuya.com/)，从列表中选择一个品类并创建产品（参见上方「要求」）。

![涂鸦开发者平台创建产品页面截图](https://images.tuyacn.com/fe-static/docs/img/0f9d4ff5-5269-445d-871c-6c027c145028.png)

### 2. 选择 T5 模组并添加占位固件文件

创建产品后，选择 T5 模组，然后点击「新增自定义固件」。为继续并领取授权码，可先上传**任意Dummy文件或图片**作为固件占位；平台仅需有文件记录即可。待考虑量产时，可随时返回此处替换为真实的 QIO（生产固件）和 UG（升级固件）。

![选择 T5 模组并上传固件截图](https://images.tuyacn.com/fe-static/docs/img/a6f6001c-af28-4541-bc88-0e83f6d1a99f.png)

### 3. 点击免费领取 2 个授权码

在产品页面点击免费领取 2 个授权码的入口。

![点击免费领取授权码截图](https://images.tuyacn.com/fe-static/docs/img/1bab1e99-70b8-4510-876a-47955aae13a1.png)

### 4. 在授权码清单中确认

进入授权码清单。在产品开发阶段，您可以免费领取 2 个设备 License（价值 ¥20.00），用于产品开发调试。点击领取后，2 个 License 将直接发放至您的账号。

![授权码清单页面截图](https://images.tuyacn.com/fe-static/docs/img/c653c7c6-f3c6-4024-a9d3-7aa8fa588969.png)

## 将授权码写入设备

领取授权码（UUID 与 AuthKey）后，写入方式取决于硬件。

**带串口设备的 MCU** – 可使用以下任一方式：

:::note MCU：写入一次即可，固件烧录更新后仍保留
在 MCU 上授权码只需写入一次，会保存在**非应用 K-V 持久区**。烧录新固件后授权信息仍会保留；仅当执行**整片闪存擦除**或写入**新授权码**时才会丢失。
:::

### Tyutool GUI

使用 tyutool 桌面图形工具连接设备并写入授权信息。

![Tyutool GUI](https://images.tuyacn.com/fe-static/docs/img/f1f18bee-808e-4368-97ff-9564eed0c4bc.png)

### TuyaOpen 串口 Web 工具

在基于 Chrome 内核的浏览器中打开 [TuyaOpen 串口工具](https://tuyaopen.ai/tools/)，连接授权串口后，在「TuyaOpen 授权码写入」标签页中输入 UUID 与 AuthKey 并写入设备。

![TuyaOpen Serial Web Tool](https://images.tuyacn.com/fe-static/docs/img/4f8aa20c-5f2c-4072-9464-1b7934b40968.png)

### 串口 CLI

使用串口监视器，按 [设备授权](/docs/quick-start/equipment-authorization) 中的说明执行 `auth` 命令。

### 将授权码固化为固件（MCU）

在项目中的 `tuya_config.h` 中设置 `TUYA_OPENSDK_UUID` 与 `TUYA_OPENSDK_AUTHKEY` 宏，重新编译并烧录，适用于固定配置。由此生成的固件二进制**仅能用于一台设备**（每台设备一个 UUID，用于云端连接）。

### 带文件系统的 SoC（如 Linux、Raspberry Pi）

可将授权码**在头文件中写死并参与编译**，或存放在**文件**中，在运行时加载或使用。

:::note 一个 UUID 对应一台在线设备
每个 UUID 与单台设备的涂鸦云连接绑定。同一 UUID（及其 AuthKey）**同一时间**只能有一台设备在线连接涂鸦云。若要在另一块开发板上复用该 AuthKey，必须先让**原设备**从涂鸦智能 App（或您的涂鸦账号）中**解除配对**。在 App 中解除配对后，方可将同一授权码用于其他设备。
:::

:::tip 何时需要授权码？
仅当您的应用使用**涂鸦云服务**（如 IoT 连接、AI 功能、设备激活）时，才需要授权码（UUID + AuthKey）。仅本地或离线的应用无需授权码。
:::

## 参考资料

- [涂鸦开发者平台](https://platform.tuya.com/) – 创建产品与管理授权码
- [设备授权](/docs/quick-start/equipment-authorization) – 通过串口 CLI 写入 UUID 与 AuthKey
- [TuyaOpen 串口工具](https://tuyaopen.ai/tools/) – 基于网页的串口与授权工具（需 Chrome 内核浏览器）
- [授权和许可证问题](/docs/faqs#授权和许可证问题) – 关于 TuyaOpen 授权码与授权的常见问题
