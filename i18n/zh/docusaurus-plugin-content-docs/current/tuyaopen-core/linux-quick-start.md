---
title: Linux 快速开始
description: "在 Linux 主机上编译运行 TuyaOpen Core 示例：拉取 SDK 与示例代码，用涂鸦 App 激活设备，观察云端连接建立。"
keywords:
  - tuyaopen core
  - linux
  - 快速开始
  - 编译
  - 示例
---

本教程在 Linux 主机（PC、树莓派或任意 POSIX 系统）上编译运行 TuyaOpen Core 示例。Linux 移植使用普通 CMake，无需交叉工具链。

## 前提条件

- 一台 Linux 主机，已安装 `git`、`cmake`（3.16 或更高版本）与 C 工具链（Debian/Ubuntu 上为 `build-essential`）。
- TuyaOpen Core **SDK** 仓库与 **TuyaOpen Core examples** 仓库。
- 在涂鸦 AI+IoT 平台创建的设备三元组：**PID**、**UUID**、**AuthKey**。授权术语见 [快速开始](../quick-start/index.md)，创建产品见 [创建产品与 Agent](../cloud/tuya-cloud/creating-new-product.md)。

示例默认在仓库根目录下以 `tuyaopen-core` 为名查找 SDK：

```bash
cd TuyaOpen-Core-examples
git clone <TuyaOpen Core SDK 仓库地址> tuyaopen-core
cd tuyaopen-core && git submodule update --init && cd ..
```

`submodule` 步骤会拉取 SDK 的第三方依赖（mbedTLS、cJSON、coreMQTT、coreHTTP、backoffAlgorithm）。如果 SDK 放在其他位置，每次编译时通过 `-DTUYAOPEN_CORE_DIR=/path/to/sdk` 指定。

## 编译运行 IoT 示例

```bash
cd linux/examples/iot_demo
cmake -B build
cmake --build build -j$(nproc)
./build/iot_demo
```

示例默认使用编译进 `src/tuya_config.h` 的 PID/UUID/AuthKey。**请替换为你自己的三元组**，可以写入本地不入库的 `src/tuya_config_secrets.h`（参见 `tuya_config_secrets.h.example`），也可以在 configure 时传入：

```bash
cmake -B build \
  -DTUYA_PRODUCT_ID=your_pid \
  -DTUYA_OPENSDK_UUID=your_uuid \
  -DTUYA_OPENSDK_AUTHKEY=your_authkey
```

## 激活设备

首次运行时设备未激活，会进入绑定模式并在终端打印二维码。

1. 打开涂鸦 App，扫描二维码绑定设备。
2. 示例完成激活，云端连接建立后打印 `TUYA_EVENT_MQTT_CONNECTED`。
3. 在 App 中操作开关。每条指令以 `TUYA_EVENT_DP_RECEIVE_OBJ` 事件到达，示例会把数据点（DP）回传给云端。

数据点是什么、云端如何建模，与完整 TuyaOpen 的体验一致——每个产品功能都会成为一个 DP，见 [创建产品与 Agent](../cloud/tuya-cloud/creating-new-product.md)。

## 其他示例

另外两个 Linux 示例的编译命令相同，只是开启了更多能力模块：

| 示例 | 开启的能力 | 演示内容 |
|---|---|---|
| `linux/examples/agent_demo` | `CONFIG_ENABLE_AI_COMPONENTS` | 上传预置语音片段，打印云端 ASR 识别结果与 AI Agent 回复（`[AGENT][ASR]` / `[AGENT][NLG]`）。见 [AI Agent API](agent-api.md)。 |
| `linux/examples/p2p_demo` | `CONFIG_ENABLE_TUYA_P2P` | 通过 P2P 会话，把内置 H.264 文件作为虚拟摄像头推流给 App。产品必须是 IPC 类目。见 [P2P API](p2p-api.md)。 |

Agent 示例需要从 `build` 目录运行；在桌面或虚拟机环境建议用 `env -u DISPLAY ./agent_demo` 启动，避免 ALSA 初始化阻塞在不可达的 X server 上：

```bash
cd linux/examples/agent_demo
cmake -B build
cmake --build build -j$(nproc)
cd build && env -u DISPLAY ./agent_demo
```

## 注意事项

- **Linux OTA**：示例把下载的固件写入 `./tuyadb/ota`，传输完成后退出进程。触发升级前请先创建 `tuyadb/` 目录。
- **恢复出厂**：5 秒内快速重启 3 次会清除激活数据，需要重新绑定设备。也可以在应用代码中调用 `tuya_iot_reset()`。
- **本地控制**：示例在 MQTT 连接后开启局域网服务（`tuya_lan_enable()`），同一网络内的 App 可以不经云端直接控制设备。

## 下一步

- [使用 IoT API](iot-api.md) —— 事件、数据点与 OTA
- [把库加入工程](add-to-project.md) —— 在示例之外使用
- [适配新平台](port-to-platform.md) —— 当目标不是 Linux 或 ESP-IDF 时
