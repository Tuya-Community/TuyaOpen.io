---
title: "Hello World —— IDE 基础操作"
description: "不写一行代码跑通官方示例，掌握 TuyaOpen IDE 核心链路：选板 → 编译 → 烧录 → 看日志。"
sidebar_label: "实战一 —— Hello World"
sidebar_position: 3
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - 嵌入式开发
---

这是**最小闭环**——不写一行代码，只用 IDE 把官方示例跑起来。跑通它，你就掌握了 TuyaOpen IDE 的核心操作链路：**选板 → 编译 → 烧录 → 看日志**。

## 前置条件 {/* #prereq */}

- 已按 [安装 TuyaOpen IDE](./install.md) 装好 IDE 扩展。
- 一块 **T5 AI Board**（`T5AI_Board`）开发板，USB 线已连电脑。

## 第一步：从开发板目录进入 {/* #step-1 */}

1. 打开 VS Code / Cursor，确认 TuyaOpen IDE 扩展已启用。
2. 点击左侧活动栏的**开发板**图标，浏览支持的开发板、芯片和 SoC 平台及详细规格。

   ![IDE 活动栏中的开发板图标](https://images.tuyacn.com/fe-static/docs/img/7e983fac-0a9e-4a63-8238-55e3c1216f86.png?imageMogr2/format/webp)

3. 在开发板列表中找到 **T5AI_Board**，进入它的详情页。你能看到大量开发资料——购买渠道、原理图、数据手册、源代码、3D 模型等等。

   ![开发板中的 T5AI_Board 详情页](https://images.tuyacn.com/fe-static/docs/img/013f63af-5007-4a03-88b8-4a1b64f16e73.png?imageMogr2/format/webp)

   ![开发板资料——原理图、数据手册、源码、3D 模型](https://images.tuyacn.com/fe-static/docs/img/290f77e2-ef9e-4a7f-9f8c-0c93b820316d.png?imageMogr2/format/webp)

## 第二步：创建示例项目 {/* #step-2 */}

1. 在 T5AI_Board 详情页，点击**用此开发板，新建项目**。
2. 填写项目名称和存放位置，点击**创建项目**。

   ![从开发板新建项目的对话框](https://images.tuyacn.com/fe-static/docs/img/e02c27c6-97e7-4a79-aec8-a447346c9f4b.png?imageMogr2/format/webp)

3. IDE 会基于该示例派生一个工程到你的工作区，自动配置好 T5AI_Board 的板级信息。

   ![派生好的项目工作区](https://images.tuyacn.com/fe-static/docs/img/4e7092ce-052e-4b4f-a5e7-1830f9f32f7e.png?imageMogr2/format/webp)

## 第三步：编译 {/* #step-3 */}

点击 IDE 侧边栏的**项目详情**，在**硬件固件操作**中点击**编译**，等待编译完成。项目详情中可以可视化看到嵌入式固件情况。

![固件编译汇总](https://images.tuyacn.com/fe-static/docs/img/17a2c52e-5c58-493b-ba3c-29bd5ec6ef47.png?imageMogr2/format/webp)

**预期输出**（编译成功）：

```text
[NOTE]:
====================[ BUILD SUCCESS ]===================
 Target    : T5Board_project1_QIO_1.0.0.bin
 Output    : .../dist/T5Board_project1_1.0.0
 Platform  : T5AI
 Chip      : T5AI
 Board     : TUYA_T5AI_BOARD
 Framework : base
========================================================
```

## 第四步：烧录 {/* #step-4 */}

1. 用 USB 连接开发板（T5AI_Board 有两路串口：一路烧录、一路日志），确保 USB 线不仅能供电，还能传输数据。
2. 点击**烧录（Flash）**。最初不确定哪一路是烧录口，可以任选一个试一下，这里选择 `COM4`。

   ![烧录按钮与端口选择](https://images.tuyacn.com/fe-static/docs/img/1761320a-a9d5-43c6-b73e-b01382e648da.png?imageMogr2/format/webp)

**预期输出**（烧录成功）：

```text
write  T5AI  COM4  921600
  File   .../bin/T5Board_project1_QIO_1.0.0.bin  2.0 MiB
  Range  0x00000000 -> 0x001FF1E0

Handshake         OK
Flash ID          OK
Unprotect         OK
Write [1/1]       OK
...
Flash OK  38.9s
```

## 第五步：监控串口日志 {/* #step-5 */}

点击**监控（Monitor）**，选择日志串口，这里选择 `COM3`。看到 `hello world`，你的第一个 TuyaOpen 项目就跑通了。

**预期输出**：

```text
[01-01 00:00:00 ty D][tuya_app_main.c:8] hello world
```

:::note
如果没看到 `hello world`，大概率是因为监视器开启的时间不够早——这行日志在烧录完成时就会打印。不要关闭监视器终端，再次烧录就能看到。
:::

## 下一步 {/* #next */}

你已经掌握了 IDE 基础操作。继续 [实战二：your_chat_bot 全流程](./chat-bot.md)——端到端搭建一台联网的 AI 对话设备。

