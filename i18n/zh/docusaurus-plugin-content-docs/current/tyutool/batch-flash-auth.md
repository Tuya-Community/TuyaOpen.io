---
title: 批量烧录授权
description: "tyutool 批量烧录授权总览——把多台设备插到多个串口上，并行烧录固件并写入授权码，授权码由一份 .xlsx 表格驱动。"
keywords:
  - tyutool 批量
  - 批量烧录
  - 批量授权
  - OTP
  - 并行烧录
  - tuyaopen
---

import FeatureCardGrid from '@site/src/components/FeatureCardGrid';

把多台设备插到多个串口上，**并行**烧录固件 + 写入授权码，授权码由一份 `.xlsx` 表格驱动。这是 tyutool 里最复杂的功能，当存储模式选 **OTP** 时会进行不可逆的 eFuse 操作（仅 T5AI）。

:::note[在哪里找到它]
桌面客户端中，这个功能位于 **工具箱（Toolbox）→ 批量烧录授权**。
:::

## 选择你的指南

这个功能涉及两类完全不同的人，两份独立指南：

<FeatureCardGrid
  columns={2}
  items={[
    { icon: '🧑‍💻', title: '我是固件开发者', description: 'UART CLI 协议契约与自测清单。', href: '/docs/tyutool/batch-auth-developer' },
    { icon: '🛠️', title: '我是烧录操作员', description: '纯操作，无技术细节——按顺序执行的工作流。', href: '/docs/tyutool/batch-auth-operator' },
  ]}
/>

## 这两份指南覆盖了什么

两份指南合起来覆盖：

- 准备清单，以及开发者 ↔ 操作员之间的配置交接
- 接线、启动批次、逐行查看结果
- 归档已完成的批次、排查失败原因
- 固件要实现的 UART CLI 协议契约（才能被批量授权）
- KV 与 OTP 两种存储模式，以及 OTP 不可逆写入的安全铁律

:::danger[最重要的安全提示]
存储模式选 **OTP**（仅 T5AI）时授权码一次性烧进芯片，永远无法擦除或修改——一次错配毁掉整批。务必先单台验证再批量。详见操作员指南的[安全铁律](./batch-auth-operator.md)。
:::
