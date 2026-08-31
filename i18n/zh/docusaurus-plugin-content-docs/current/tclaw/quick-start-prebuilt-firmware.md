---
title: 烧录预编译固件
description: "无需工具链即可运行 TClaw：从 Release 下载固件，用 tyutool 烧录，再通过串口 CLI 配置凭证。"
keywords:
  - TClaw
  - 预编译固件
  - tyutool
  - 串口 CLI
  - 快速开始
---

# 烧录预编译固件

让 TClaw 在开发板上跑起来的最快路径：下载已发布的镜像，烧录，然后通过串口配置。
不需要 SDK，不需要工具链，不需要编译。

如果你要改代码，请跳过本页，直接看后面各板型的指南——它们是从源码构建的。

:::note[适用板型]
本页面向 MCU 板型（T5AI 与 ESP32-S3）。**Raspberry Pi 5** 和 **DshanPi A1**
是 Linux 目标，跑的是原生可执行程序而非烧录固件，请看
[TClaw 与 Raspberry Pi 5](./ducky-quick-start-raspberry-pi-5.md)。Release 里同样带有
这两个板型的 `_QIO_` 文件（构建流程统一打包），但它们不用于本页的烧录流程。
:::

## 1. 下载固件

固件同时发布在
[GitHub](https://github.com/tuya/TClaw/releases/latest) 和
[Gitee](https://gitee.com/tuya-open/TClaw/releases)——国内访问 Gitee 通常更快。
每个版本为每种板型提供一个镜像，命名为 `TClaw_<板型>_QIO_<版本>.bin`，
并附带一个 `SHA256SUMS.txt`。这里的 `<版本>` 是编译进固件的工程版本号
（`1.0.0`），不是 Release 的 tag——不要在文件名里找 `2.1.0`。

| 板型 | Release 文件 |
| :-- | :-- |
| Tuya T5AI 开发板（3.5" LCD + 摄像头） | `TClaw_TUYA_T5AI_BOARD_LCD_3.5_CAMERA_QIO_*.bin` |
| Tuya T5AI 开发板（无 SD 卡 / 摄像头） | `TClaw_TUYA_T5AI_BOARD_LCD_3.5_CAMERA.NO_SDCARD_CAMERA._QIO_*.bin` |
| Tuya T5AI Core | `TClaw_TUYA_T5AI_CORE_QIO_*.bin` |
| ATK T5AI Mini（2.4" LCD + 摄像头） | `TClaw_ATK_T5AI_MINI_BOARD_2.4LCD_CAMERA_QIO_*.bin` |
| Waveshare T5AI Touch AMOLED 1.75" | `TClaw_WAVESHARE_T5AI_TOUCH_AMOLED_1_75_QIO_*.bin` |
| ESP32-S3（bread compact WiFi） | `TClaw_ESP32S3_BREAD_COMPACT_WIFI_QIO_*.bin` |

`QIO` 指整片烧录镜像——bootloader 与应用打包在同一个文件里——所以空板可以直接烧，
不必先刷别的东西。

校验下载：

```bash
sha256sum -c SHA256SUMS.txt --ignore-missing
```

## 2. 安装 tyutool

[tyutool](/docs/tyutool) 是涂鸦的烧录工具，下载 Windows、macOS 或 Linux 的
桌面版预编译包即可。

安装步骤见 [快速上手](/docs/tyutool/getting-started)。两个最常见的坑：

- **macOS** 默认禁止普通用户访问串口，权限修复方法见 tyutool 的 FAQ。
- **Linux** 部分桌面环境下 tyutool 会启动成空白窗口，FAQ 里有对应的
  环境变量绕过方法。

## 3. 烧录

用 USB 数据线把开发板连到电脑，并让其进入**下载模式**。进入下载模式的方式因板而异
（按键组合、短接焊盘、上电时序），请查阅对应板卡手册。tyutool 无法代你切换——
板子不在下载模式时，烧录只会一直等待直至超时。

然后在 tyutool 的**固件烧录**页面：

1. 打开**串口**下拉框选择对应端口。旁边的状态点变绿表示已连接就绪。
2. 确认页面顶部的**芯片型号**。选好串口后 tyutool 会自动填入推荐的芯片与波特率——
   确认 T5AI 系列为 `t5ai`、ESP32-S3 为 `esp32s3`，芯片选错会导致烧录失败。
3. 在 **Flash** 标签页选中下载好的 `.bin`。写入地址会自动填好，通常无需改动。
4. 点击 **Flash**，观察下方进度条与日志走到 100%。
5. 写入完成后设备会**自动重启**并运行新固件。

该页面各字段的含义见[固件烧录说明](/docs/tyutool/flash)。

## 4. 获取涂鸦凭证

三个值，来自两个地方。建议在配置之前先拿到——没有它们设备无法上线。

| 值 | 含义 | 长度 |
| :-- | :-- | :-- |
| **PID** | 产品 ID。把设备绑定到云端的产品定义上，同一产品下所有设备共用一个 PID。 | — |
| **UUID** | 设备唯一标识，每台设备一个。 | 20 字符 |
| **AuthKey** | 设备密钥，与 UUID 一一对应。 | 32 字符 |

**PID。** 打开
[TClaw 产品模板](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2)，
复制到自己账号下（或自行创建产品），在产品页面即可看到 PID。

**UUID + AuthKey。** 这两个值合起来称为一份*授权码（license）*，在
[涂鸦 IoT 平台 → Open SDK](https://platform.tuya.com/purchase/index?type=6) 获取。
**每台设备都需要各自独立的一份**——一份授权码只能激活一台设备。

:::danger
必须是 **TuyaOpen 专用授权码**。其他来源的授权码（包括 TuyaOS 授权码）
在 TuyaOpen 框架下无法连接涂鸦 IoT 云。
:::

授权码的背景说明与其他写入方式见
[设备授权](/docs/quick-start/equipment-authorization)。

## 5. 通过串口 CLI 配置

Release 镜像**不含任何凭证**——它必须如此，因为这些二进制是公开的。凭证在烧录之后
通过串口补上。

以 **115200 波特率**打开串口，回车即可看到提示符。tyutool 的
[串口调试](/docs/tyutool/serial-debug)页面就是一个完整的串口终端，用它很方便；
`screen`、`minicom`、`picocom` 同样可以。

`help` 会列出各个 `cfg_*` 命令。最小可用配置：

```bash
# 涂鸦云凭证 —— 设备上线必需
cfg_set_product_id <product_id>
cfg_set_auth <uuid> <authkey>

# 选择一个 IM 通道并设置其 Token
cfg_set_channel_mode telegram      # telegram | discord | feishu | weixin | qqbot | OFF
cfg_set_tg_token <bot_token>

# 查看当前实际生效的配置
cfg_show
```

:::warning
`cfg_*` 的修改保存在设备的 KV 存储中，优先级高于编译进固件的值，
但**必须重新连接或重启后才生效**。
:::

### 命令速查

| 命令 | 作用 |
| :-- | :-- |
| `help` | 列出全部命令 |
| `cfg_show` | 查看实际生效的配置（KV 覆盖优先于编译值） |
| `cfg_reset` | 清除所有 KV 覆盖 |
| `cfg_set_product_id <id>` | 涂鸦 product ID |
| `cfg_set_auth <uuid> <authkey>` | 涂鸦 UUID 与 AuthKey |
| `cfg_set_device_id <id>` | 上报给网关的设备标识 |
| `cfg_set_channel_mode <mode>` | `telegram` \| `discord` \| `feishu` \| `weixin` \| `qqbot` \| `OFF` |
| `cfg_set_tg_token <token>` | Telegram bot token |
| `cfg_set_dc_token <token>` | Discord bot token |
| `cfg_set_dc_channel <id>` | Discord channel ID |
| `cfg_set_fs_appid <id>` | 飞书 app ID |
| `cfg_set_fs_appsecret <secret>` | 飞书 app secret |
| `cfg_set_fs_allow <csv>` | 飞书白名单 |
| `cfg_set_qq_appid <id>` | QQ 机器人 app ID |
| `cfg_set_qq_secret <secret>` | QQ 机器人 client secret |
| `cfg_set_ws_token <token>` | WebSocket 服务端 token |
| `cfg_set_gw_host <host>` | OpenClaw 网关地址 |
| `cfg_set_gw_port <port>` | OpenClaw 网关端口 |
| `cfg_set_gw_token <token>` | OpenClaw 网关 token |
| `cfg_set_proxy <host> <port> [type]` | 出站代理 |
| `cfg_clear_proxy` | 清除出站代理 |

## 下一步

- 用智能生活 App 配网并完成云端激活——各板型指南中有完整步骤，例如
  [TClaw 与 T5-AI](./ducky-quick-start-T5AI.md)。
- 用[硬件外设技能](./hardware-skill.md)给 Agent 加上操作硬件的能力。
- 用 [Lua 脚本](./lua-scripting.md)在设备上跑小段脚本——注意这项需要从源码构建，
  仓库自带的板型配置都没有开启 Lua。
