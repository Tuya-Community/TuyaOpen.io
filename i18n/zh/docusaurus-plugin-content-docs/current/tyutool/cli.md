---
title: 命令行工具
description: "完整的 tyutool 命令行参考——安装、全局选项、11 个子命令（write、read、erase、list-ports、reset、monitor、authorize、update、serve、completions、usb-port-survey）、支持的芯片与输出模式。"
keywords:
  - tyutool 命令行
  - CLI
  - 烧录固件
  - 授权
  - 监视
  - tuyaopen
---


`tyutool` 是一个命令行工具，本页是完整的 CLI 参考。

## 什么时候用 CLI

脚本化 / CI / 无桌面服务器 / 习惯终端。与桌面应用共享同一套 `tyutool-core` 烧录逻辑。

## 安装

从 [GitHub Releases](https://github.com/tuya/tyutool/releases) 下载。各平台资产（五个平台；每个 release 还附带 `latest.json`，含 `cli.<platform>.sha256`）：

| 平台 | 资产 |
| :-- | :-- |
| Linux x86_64 | `tyutool-cli_linux_x86_64_*.tar.gz` |
| Linux aarch64 | `tyutool-cli_linux_aarch64_*.tar.gz` |
| macOS x86_64 | `tyutool-cli_macos_x86_64_*.tar.gz` |
| macOS aarch64 | `tyutool-cli_macos_aarch64_*.tar.gz` |
| Windows x86_64 | `tyutool-cli_windows_x86_64_*.zip` |

安装：

```bash
# Linux / macOS（tar.gz）
tar -xzf tyutool-cli_linux_x86_64_*.tar.gz
sudo mv tyutool_cli /usr/local/bin/tyutool
chmod +x /usr/local/bin/tyutool

# Windows（.zip）：解压出 tyutool_cli.exe，把所在目录加入 PATH
```

验证：

```bash
tyutool --version
tyutool list-ports
```

:::note
CLI 支持自更新：`tyutool update`。
:::

## 全局选项

| 选项 | 含义 |
| :-- | :-- |
| `--verbose` | 诊断日志输出到 stderr |
| `--plain` | 纯 ASCII，无 spinner |

日志文件：每会话独立 `tyutool-<时间戳>.log`，10 MB 滚动，启动清理。位置：

- Linux：`~/.local/share/tyutool/`
- macOS：`~/Library/Application Support/tyutool/`
- Windows：`%APPDATA%\tyutool\`

:::note
滚动文件命名为 `tyutool-<时间戳>.log` → `-1.log` → `-2.log`。
:::

端口选择：`-p` 省略时单端口自动用，多端口交互选（CI 下报错）。

## 子命令

### write — 烧录固件

```bash
tyutool write -d <芯片> -f <固件> [-p <端口> -b <波特> -s <起始> --end <结束>]
```

示例：

```bash
tyutool write -d bk7231n -f firmware.bin -p /dev/ttyUSB0
```

### read — 读取 Flash

```bash
tyutool read -d <芯片> -f <输出> [-p <端口> -b <波特> -s <起始> -l <长度>]
```

`length` 默认 `0x200000`。

### erase — 擦除

```bash
tyutool erase -d <芯片> [-p <端口> -b <波特> -s <起始> -l <长度>]
```

擦除区域 start…start+length；某些芯片按扇区对齐。

### list-ports — 列串口

```bash
tyutool list-ports [--json]
```

默认制表符分隔列：`path / vid:pid / usb_interface / port_role / display_name`。

### reset — DTR/RTS 硬件复位

```bash
tyutool reset [-p <端口> -d <设备>]
```

`device` 默认 `bk7231n`。

### monitor — 实时串口监视

```bash
tyutool monitor [-p <端口> -b <波特> -d <设备> -l]
```

透传到 stdout，交互式转发按键；用 `Ctrl+]` 或 `Ctrl+C` 退出。非 TTY 按行转发。`t5ai` 默认监视波特 460800，其他 115200（注意 ≠ 烧录波特）。

示例：

```bash
tyutool monitor -p /dev/ttyUSB0
tyutool monitor -d bk7231n -b 115200
tyutool monitor -d t5ai
```

### authorize（别名 `auth`）— TuyaOpen 授权

```bash
tyutool authorize [-p <端口> -d <设备> --uuid <uuid> --authkey <authkey>]
```

写入必须同时传 `uuid` + `authkey`；都不传则 auth-read。凭据写入 KV 存储，绝不烧 OTP/eFuse（OTP 仅 GUI 批量）。

读取示例：

```bash
tyutool authorize -p /dev/ttyUSB0
```

写入示例：

```bash
tyutool authorize -p /dev/ttyUSB0 --uuid <uuid> --authkey <authkey>
```

### update — 自更新

```bash
tyutool update [--check] [--source github|tuya]
```

### serve — WebSocket 服务器

```bash
tyutool serve
```

开发/IDE 模式；默认端口 `9527`；供 tuyaopen-ide。

### completions — 生成 shell 补全

```bash
tyutool completions bash
tyutool completions zsh
tyutool completions fish
```

（另有 `powershell`、`elvish`。）

### usb-port-survey — USB/串口元数据转储

```bash
tyutool usb-port-survey
```

输出原始 USB/串口元数据 JSON，便于跨系统排错。

## 支持的芯片
| 芯片 | 默认波特率 |
| :-- | :-- |
| `bk7231n` | 921600 |
| `t2` | 921600 |
| `t3` | 921600 |
| `t1` | 921600 |
| `t5ai` | 921600 |
| `ln882h` | 115200 |
| `esp32` | 460800 |
| `esp32c3` | 460800 |
| `esp32c6` | 460800 |
| `esp32p4` | 460800 |
| `esp32s3` | 460800 |

芯片名大小写不敏感；`-b` 可调波特。

## 输出模式
- **Rich 模式**（TTY）：spinner / ANSI 进度条 / `✓`。
- **Plain 模式**（CI）：固定宽度阶段标签，长阶段每 10% 一刻度。

Plain 模式样例输出（BK7231N 的 `write`）：

```text
tyutool v3.2.7  linux/x86_64
[scan ] scanning serial ports
[conn ] connecting /dev/ttyUSB0 @ 921600
[write] 0%   10%  20%  30%  40%  50%  60%  70%  80%  90%  100%
[ok   ] write complete
```

成功退出码为 0。

:::note[取消]
write / read / erase / authorize 期间 `Ctrl+C` 优雅退出（关串口报 `Cancelled`）；monitor 的 `Ctrl+]` / `Ctrl+C` 正常退出码 0。
:::

## 开发者参考

:::note[权威 markdown 源]
对应 markdown 在仓库内 [`docs/cli.md`](https://github.com/tuya/tyutool/blob/refactor/v3/docs/cli.md)。任何 CLI 变更必须先更新 `docs/cli.md`（AGENTS.md 规定）。本页只是镜像，以 markdown 为准。
:::
