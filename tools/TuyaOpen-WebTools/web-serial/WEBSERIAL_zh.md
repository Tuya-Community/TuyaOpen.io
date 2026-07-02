# TuyaOpen-WebSerial

[返回主页](README.md) | [English Version](WEBSERIAL.md)

**基于 Chrome Web Serial API 的一站式串口开发工具**

## 功能概述

TuyaOpen-WebSerial 是一个功能强大的现代化 Web 串口工具，支持串口调试、固件烧录和 TuyaOpen 授权，无需安装任何软件，直接在浏览器中完成所有操作。

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Chrome](https://img.shields.io/badge/Chrome-89%2B-green.svg)](https://www.google.com/chrome/)
[![Web Serial API](https://img.shields.io/badge/Web%20Serial%20API-supported-brightgreen.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)

## 主要功能

### 串口调试
- **实时串口通信**: 支持多种波特率和串口参数配置
- **智能数据显示**: 自动时间戳、HEX/ASCII模式切换
- **错误日志分析**: 自动检测和分析常见错误模式
- **快捷命令**: 可自定义的快捷发送按钮
- **数据导出**: 支持日志保存和导出功能
- **全屏模式**: 专注的调试体验

### 固件烧录
- **多芯片支持**: 
  - **T5AI/T3**: TuyaOpen系列芯片
  - **ESP32系列**: 基于esptool-js，支持全系列ESP32芯片自动检测
- **智能烧录**: 自动芯片检测和参数配置
- **进度监控**: 实时显示烧录进度和速度
- **调试模式**: 详细的烧录日志和错误诊断
- **断点续传**: 支持烧录中断后的恢复

### TuyaOpen 授权
- **授权码写入**: 支持TuyaOpen项目的UUID和AUTH_KEY写入
- **设备授权**: 一键完成设备授权配置
- **安全验证**: 确保授权信息的正确性和安全性

### 国际化支持
- **多语言界面**: 支持中文、英文、日文、韩文等10种语言
- **动态切换**: 无需刷新页面即可切换语言
- **本地化适配**: 完整的UI文本本地化

## 技术架构

### 核心技术栈
- **前端框架**: 原生JavaScript + 模块化架构
- **串口通信**: Chrome Web Serial API
- **固件烧录**: 集成esptool-js和自研下载器
- **UI框架**: 响应式CSS + 现代化设计
- **国际化**: 自研i18n系统

### 模块化架构
```
modules/
├── config/           # 配置模块
│   └── Constants.js     # 全局配置常量
├── core/             # 核心模块
│   ├── EventBus.js      # 事件总线（模块间通信）
│   └── SerialTerminal.js # 主控制器
├── utils/            # 工具模块
│   ├── Logger.js        # 统一日志系统
│   └── FileUtils.js     # 文件操作工具
├── serial/           # 串口模块
│   ├── SerialManager.js  # 串口连接管理
│   └── DataProcessor.js # 数据处理与显示
├── firmware/         # 固件模块
│   ├── FlashManager.js   # 固件烧录管理
│   └── ProgressTracker.js # 进度跟踪
├── ui/               # UI模块
│   ├── UIManager.js      # DOM管理与基础交互
│   ├── ModalManager.js   # 模态框管理
│   ├── TabManager.js     # 标签页管理
│   └── FullscreenManager.js # 全屏管理
└── i18n/             # 国际化模块
    ├── LanguageManager.js # 语言管理
    └── TextUpdater.js    # 文本更新
```

### 下载器架构
```
downloaders/
├── base-downloader.js      # 基础下载器抽象类
├── downloader-manager.js   # 下载器管理器
├── t5ai/
│   └── t5ai-downloader.js  # T5AI系列下载器
├── esp32/
    └── esp32-esptool-js-wrapper.js # ESP32下载器包装
```

## 使用方法

### 系统要求
- **浏览器**: Chrome 89+ / Edge 89+ / 其他基于Chromium的浏览器
- **操作系统**: Windows / macOS / Linux
- **硬件**: 支持USB串口的设备

### 快速开始

1. **打开工具**
   ```
   直接访问: https://your-domain.com/
   或本地运行: 打开 index.html
   ```

2. **串口调试**
   - 点击"串口调试"标签
   - 配置串口参数（波特率、数据位等）
   - 点击"连接串口"选择设备
   - 开始发送和接收数据

3. **固件烧录**
   - 点击"固件烧录"标签
   - 选择目标设备类型
   - 选择固件文件(.bin)
   - 连接串口并开始烧录

4. **TuyaOpen授权**
   - 点击"TuyaOpen授权"标签
   - 输入UUID和AUTH_KEY
   - 连接设备并写入授权信息

### 支持的设备类型

| 设备类型 | 状态 | 说明 |
|---------|------|------|
| T5AI | 完全支持 |  |
| T3 | 完全支持 |  |
| ESP32系列 | 完全支持 | 支持ESP32/ESP32-S2/S3/C3等全系列 |

## 故障排除

如果串口连接失败，请检查:
- 浏览器是否支持Web Serial API
- 设备驱动是否正确安装
- 串口是否被其他程序占用

详细故障排除指南: [troubleshooting.html](troubleshooting.html)

## 致谢

本项目在开发过程中参考和借鉴了以下优秀的开源项目，在此表示诚挚的感谢：

- **[tyutool](https://github.com/tuya/tyutool)** - 涂鸦官方串口工具，为本项目的功能设计和用户体验提供了重要参考
- **[esptool-js](https://github.com/espressif/esptool-js)** - Espressif官方的JavaScript版本烧录工具，为ESP32系列芯片的固件烧录功能提供了核心技术支持
