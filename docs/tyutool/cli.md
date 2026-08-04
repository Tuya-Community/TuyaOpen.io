---
title: Command Line
description: "Complete tyutool command-line reference — installation, global options, the 11 subcommands (write, read, erase, list-ports, reset, monitor, authorize, update, serve, completions, usb-port-survey), supported chips, and output modes."
keywords:
  - tyutool cli
  - command line
  - write firmware
  - authorize
  - monitor
  - tuyaopen
---


`tyutool` is a command-line tool. This page ports the complete CLI reference into the docs.

## When to use the CLI

For scripting / CI / headless servers / when you prefer the terminal. It shares the same `tyutool-core` flashing logic as the desktop app.

## Installation

Download from [GitHub Releases](https://github.com/tuya/tyutool/releases). Release assets (five platforms; each release also ships a `latest.json` with `cli.<platform>.sha256`):

| Platform | Asset |
| :-- | :-- |
| Linux x86_64 | `tyutool-cli_linux_x86_64_*.tar.gz` |
| Linux aarch64 | `tyutool-cli_linux_aarch64_*.tar.gz` |
| macOS x86_64 | `tyutool-cli_macos_x86_64_*.tar.gz` |
| macOS aarch64 | `tyutool-cli_macos_aarch64_*.tar.gz` |
| Windows x86_64 | `tyutool-cli_windows_x86_64_*.zip` |

Install:

```bash
# Linux / macOS (tar.gz)
tar -xzf tyutool-cli_linux_x86_64_*.tar.gz
sudo mv tyutool_cli /usr/local/bin/tyutool
chmod +x /usr/local/bin/tyutool

# Windows (.zip): extract tyutool_cli.exe and add its folder to PATH
```

Verify:

```bash
tyutool --version
tyutool list-ports
```

:::note
The CLI supports self-update: `tyutool update`.
:::

## Global options

| Option | Meaning |
| :-- | :-- |
| `--verbose` | Emit diagnostic logs to stderr |
| `--plain` | Plain ASCII, no spinner |

Log files: one per session, `tyutool-<timestamp>.log`, rolling at 10 MB, cleaned on startup. Locations:

- Linux: `~/.local/share/tyutool/`
- macOS: `~/Library/Application Support/tyutool/`
- Windows: `%APPDATA%\tyutool\`

:::note
The rolled file naming is `tyutool-<timestamp>.log` → `-1.log` → `-2.log`.
:::

Port selection: if `-p` is omitted and there is a single port, it is used automatically; with multiple ports, you pick interactively (in CI this errors out).

## Subcommands

### write — flash firmware

```bash
tyutool write -d <chip> -f <firmware> [-p <port> -b <baud> -s <start> --end <end>]
```

Example:

```bash
tyutool write -d bk7231n -f firmware.bin -p /dev/ttyUSB0
```

### read — read the flash

```bash
tyutool read -d <chip> -f <out> [-p <port> -b <baud> -s <start> -l <length>]
```

`length` defaults to `0x200000`.

### erase — erase

```bash
tyutool erase -d <chip> [-p <port> -b <baud> -s <start> -l <length>]
```

Erases the region `start … start+length`; some chips require sector alignment.

### list-ports — list serial ports

```bash
tyutool list-ports [--json]
```

Default output: tab-separated columns `path / vid:pid / usb_interface / port_role / display_name`.

### reset — DTR/RTS hardware reset

```bash
tyutool reset [-p <port> -d <device>]
```

`device` defaults to `bk7231n`.

### monitor — live serial monitor

```bash
tyutool monitor [-p <port> -b <baud> -d <device> -l]
```

Streams to stdout, forwards keypresses interactively; exit with `Ctrl+]` or `Ctrl+C`. In a non-TTY it forwards line by line. For `t5ai` the default monitor baud is 460800; for others 115200 (note: this differs from the flash baud).

Examples:

```bash
tyutool monitor -p /dev/ttyUSB0
tyutool monitor -d bk7231n -b 115200
tyutool monitor -d t5ai
```

### authorize (alias `auth`) — TuyaOpen authorization

```bash
tyutool authorize [-p <port> -d <device> --uuid <uuid> --authkey <authkey>]
```

A write must pass both `uuid` and `authkey`; pass neither for an auth-read. Credentials are written to KV storage and never burn OTP/eFuse (OTP is GUI-batch only).

Read example:

```bash
tyutool authorize -p /dev/ttyUSB0
```

Write example:

```bash
tyutool authorize -p /dev/ttyUSB0 --uuid <uuid> --authkey <authkey>
```

### update — self-update

```bash
tyutool update [--check] [--source github|tuya]
```

### serve — WebSocket server

```bash
tyutool serve
```

Dev/IDE mode; default port `9527`; serves tuyaopen-ide.

### completions — generate shell completions

```bash
tyutool completions bash
tyutool completions zsh
tyutool completions fish
```

(Also: `powershell`, `elvish`.)

### usb-port-survey — USB/serial metadata dump

```bash
tyutool usb-port-survey
```

Outputs raw USB/serial metadata as JSON for cross-system debugging.

## Supported chips
| Chip | Default baud |
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

Chip names are case-insensitive; `-b` overrides the baud.

## Output modes
- **Rich mode** (TTY): spinner / ANSI progress bar / `✓`.
- **Plain mode** (CI): fixed-width stage labels, long stages tick every 10%.

Plain-mode sample output (a `write` on BK7231N):

```text
tyutool v3.2.7  linux/x86_64
[scan ] scanning serial ports
[conn ] connecting /dev/ttyUSB0 @ 921600
[write] 0%   10%  20%  30%  40%  50%  60%  70%  80%  90%  100%
[ok   ] write complete
```

Success exit code is 0.

:::note[Cancel]
During `write` / `read` / `erase` / `authorize`, `Ctrl+C` exits gracefully (closes the port and reports `Cancelled`); `monitor` exits with code 0 on `Ctrl+]` / `Ctrl+C`.
:::

## Developer reference

:::note[Authoritative markdown source]
The corresponding markdown lives in the repository at [`docs/cli.md`](https://github.com/tuya/tyutool/blob/refactor/v3/docs/cli.md). Any CLI change must update `docs/cli.md` first (per the repo's `AGENTS.md`). This page is a mirror; the markdown is authoritative.
:::
