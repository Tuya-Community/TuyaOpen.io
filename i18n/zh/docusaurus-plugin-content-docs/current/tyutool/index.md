---
title: tyutool V3 使用指南
description: "欢迎使用 tyutool — 涂鸦生态 IoT 设备的桌面 GUI + 命令行工具，用于固件烧录、串口调试与批量授权。"
keywords:
  - tyutool
  - V3 使用指南
  - 固件烧录
  - 串口调试
  - 批量授权
  - tuyaopen
---

import FeatureCardGrid from '@site/src/components/FeatureCardGrid';

## 欢迎使用

tyutool 是一款桌面 GUI + 命令行工具，用于对涂鸦生态的 IoT 设备进行固件烧录、串口调试与批量授权。

:::note[第一次使用？]
如果你是第一次使用，请先阅读[快速上手](./getting-started.md) —— 一条 5–10 分钟的线性路径，带你从下载走到第一次成功烧录。
:::

## 功能导览

点击下方各功能入口深入了解：

<FeatureCardGrid
  items={[
    { icon: '⚡', title: '固件烧录', description: '烧录、读取、擦除 flash 芯片。', href: '/docs/tyutool/flash' },
    { icon: '🖥️', title: '串口调试', description: '实时收发串口数据、查看设备日志。', href: '/docs/tyutool/serial-debug' },
    { icon: '⚙️', title: '设置', description: '配置更新、外观、诊断与日志等选项。', href: '/docs/tyutool/settings' },
    { icon: '🏭', title: '批量烧录授权', description: '把多台设备插到多个串口上，并行烧录固件并写入授权码。', href: '/docs/tyutool/batch-flash-auth' },
    { icon: '⌨️', title: '命令行', description: '完整的 tyutool 命令行参考。', href: '/docs/tyutool/cli' },
    { icon: '❓', title: '常见问题', description: '以症状为先的故障排查与修复。', href: '/docs/tyutool/faq' },
  ]}
/>
