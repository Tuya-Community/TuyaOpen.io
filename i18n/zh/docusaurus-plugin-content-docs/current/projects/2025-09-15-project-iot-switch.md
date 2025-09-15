---
title: "简单涂鸦物联网开关"
date: 2024-06-11
---

# 简单涂鸦物联网开关

## 项目概述

本物联网开关项目是一个基于涂鸦平台的云端连接设备的简单而强大的演示。该示例展示了一个可以通过手机 App 控制的基础开关，重点介绍了 DP（数据点）控制和极简代码实现等核心概念。项目支持通过 PID、UUID 和 Auth Key 进行安全设备认证，并兼容多种硬件平台，包括涂鸦 T 系列 MCU、ESP32 及基于 Linux 的 MCU。

<p align="center">
  <img
    src="/img/projects/project-iot-switch.png"
    alt="物联网开关项目截图"
    style={{
      width: "80%",
      borderRadius: "12px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
    }}
  />
</p>

<!-- 可在此处添加项目截图或图片 -->

## 项目特性

- 简单的涂鸦云端连接开关设备
- 基于 App 的远程控制
- 代码简洁易懂
- 安全的设备认证（PID、UUID、Auth Key）
- 支持多种硬件平台

## 支持的硬件

- 硬件平台/芯片型号：涂鸦 T5、T2、T1、ESP32、Linux SoC 等

## 快速开始

1. 克隆 TuyaOpen 仓库或下载源代码。
2. 按照[快速开始指南](/docs/quick-start/enviroment-setup)设置开发环境。
3. 在涂鸦开发者平台获取设备 Auth Key。
4. 在 `tuya_config.h` 头文件中更新认证信息。
5. 编译并烧录固件到设备。
6. 运行并调试你的物联网开关。

## 项目仓库链接

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
    前往项目仓库
  </a>
</p>
