# TuyaOpen 工具集

[English](README.md) | [中文]

## 可用工具

- TuyaOpen-WebSerial

一个基于 Chrome Web Serial API 的强大串口工具。无需安装任何软件，直接在浏览器中完成 TuyaOpen 固件烧录、授权码授权、调试日志查看，日志日志自动分析等功能。

[了解更多关于TuyaOpen-WebSerial的信息](WEBSERIAL_zh.md)

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

## 快速开始

### 系统要求
- **浏览器**: Chrome 89+ / Edge 89+ / 其他基于Chromium的浏览器
- **操作系统**: Windows / macOS / Linux
- **硬件**: 支持USB串口的设备

### 使用方法

1. **打开工具**
   ```
   直接访问: https://www.tuyaopen.ai/tools/web-serial
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


## 详细文档

### 故障排除
- 如果串口连接失败，请检查:
  - 浏览器是否支持Web Serial API
  - 设备驱动是否正确安装
  - 串口是否被其他程序占用
- 详细故障排除指南: [troubleshooting.html](troubleshooting.html)

### 开发指南
- 模块化架构说明: [modules/README.md](modules/README.md)
- 下载器开发指南: [downloaders/README.md](downloaders/README.md)
- 国际化开发: [i18n/README.md](i18n/README.md)

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

本项目采用 Apache 2.0 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 致谢

本项目在开发过程中参考和借鉴了以下优秀的开源项目，在此表示诚挚的感谢：

- **[tyutool](https://github.com/tuya/tyutool)** - 涂鸦官方串口工具，为本项目的功能设计和用户体验提供了重要参考
- **[esptool-js](https://github.com/espressif/esptool-js)** - Espressif官方的JavaScript版本烧录工具，为ESP32系列芯片的固件烧录功能提供了核心技术支持

感谢这些项目的开发者们为开源社区做出的贡献！

## 相关项目

- [TuyaOpen](https://github.com/tuya/TuyaOpen)
- [Arduino-TuyaOpen](https://github.com/tuya/arduino-Tuyaopen)
- [Luanode-TuyaOpen](https://github.com/tuya/luanode-Tuyaopen)


## 支持

- **Bug报告**: [GitHub Issues](https://github.com/Tuya/TuyaOpen-WebTools/issues)
- **功能建议**: [GitHub Discussions](https://github.com/Tuya/TuyaOpen-WebTools/discussions)

