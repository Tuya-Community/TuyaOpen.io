---
title: 基础概念
description: "tyutool 背后的词汇表——固件、烧录、擦除、读取、授权、UART/波特率、芯片型号，以及你在每一页都会见到的术语。"
keywords:
  - tyutool 基础概念
  - 固件
  - 烧录
  - 授权
  - UART
  - 波特率
  - tuyaopen
---

在动手点击按钮之前，先花几分钟读懂这套词汇表——它能让你在后续每一页都看得明白。本页只讲概念，不涉及具体操作。

tyutool 通过一条串口链路与设备通信：电脑上的 tyutool 发出的指令，经由 USB 转串口适配器，以 UART 电信号的形式送达设备里的 SoC，最终读写那颗 flash 芯片。下图展示了这条链路的完整拓扑。

<img src="https://images.tuyacn.com/fe-static/docs/img/46fa5983-9af7-420b-ad00-564723b847cd.png" alt="图 1 · tyutool 到设备的烧录链路拓扑：tyutool → USB → 适配器 → UART(TX/RX/GND) → SoC → Flash 芯片" width="800" />

*图 1 · tyutool 到设备的烧录链路拓扑：tyutool → USB → 适配器 → UART(TX/RX/GND) → SoC → Flash 芯片。*

:::note[阅读建议]
第一次接触固件烧录？建议按顺序读完前 6 节；第 7、8 节可作为术语速查表。
:::

## 什么是固件

固件（firmware）就是存放在设备 flash 芯片里的程序。烧录固件通常是为了**升级**（增加功能）、**修复**（修复 bug）或**定制**（烧入你自己的构建）。固件本质上就是一段字节数据。

## 什么是烧录 / 刷写

烧录（flashing，也叫刷写/写入）就是把固件字节写入设备 flash 芯片的动作。链路传数据：① tyutool 读固件切块 → ② 经 USB 到适配器转 UART → ③ UART(TX/RX/GND) 到 SoC 写 flash。

:::warning
烧录是覆盖性写入。重要数据请先[读取](#读取-read)备份。
:::

## 擦除 Erase

擦除把 flash 某些区域清空为 `0xFF`。典型场景：写入前清场 / 整片擦除。擦除预设：

| 擦除预设 | 含义 |
| :-- | :-- |
| `authInfo` | 只擦除授权信息区（UUID/AuthKey），保留固件与其他数据 |
| `fullChipNoRf` | 整片擦除，但保留射频校准区（RF cal） |
| `fullChip` | 整片完全擦除（含射频校准） |

:::tip
`fullChipNoRf` 是最常用的"安全彻底擦除"。
:::

## 读取 Read
读取是烧录的逆操作：把 flash 芯片里的字节读出来，用于备份（整片读取或分段读取）。

## 授权 Authorize
授权（TuyaOpen UART auth）写入 `UUID` + `AuthKey`，让设备能连涂鸦云。授权与固件是两件独立的事。

:::danger
`UUID` 与 `AuthKey` 是从涂鸦**购买**来的凭据，写入伪造/重复凭据会污染设备池。
:::

授权分两种操作：授权读取（auth-read）/ 授权写入（auth-write）。

## 串口 / UART / 波特率
串口、USB 转串口适配器（CH340/CP2102/FT232）、UART 三线（TX/RX/GND，交叉接线）、波特率：

| 波特率 | 典型用途 |
| :-- | :-- |
| `115200` | 最通用、最稳定的默认速率 |
| `460800` | 较快，稳定性仍较好 |
| `921600` | 高速，需芯片与线材支持 |

:::tip
从 `115200` 开始最稳妥。
:::

## 芯片型号
芯片型号决定了通信协议、波特率与 Flash 容量。完整列表见[固件烧录](./flash.md)与[命令行](./cli.md)。

## TY 工具术语表

| 术语 | 含义 |
| :-- | :-- |
| Flash | 把固件写入 flash 芯片 |
| Erase | 把 flash 区域清空为 `0xFF` |
| Read | 把 flash 芯片里的字节读出来 |
| Authorize | 写入 `UUID`/`AuthKey` 凭据 |
| UUID | 设备唯一标识（凭据） |
| AuthKey | 与 UUID 配对的认证密钥 |
| Baud | 串口通信速率 |
| UART | 走 TX/RX/GND 线的串口协议 |
| Segment | 多段烧录里的一段连续块 |
| Erase preset | 命名的擦除范围（如 `authInfo`） |
| MAC | 设备的媒体访问控制地址 |
