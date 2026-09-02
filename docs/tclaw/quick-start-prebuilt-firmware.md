---
title: Flash a Prebuilt Firmware
description: "Get TClaw running without a toolchain: download a release firmware, flash it with tyutool, and configure credentials over the serial CLI."
keywords:
  - tclaw
  - prebuilt firmware
  - tyutool
  - serial cli
  - quick start
---

# Flash a Prebuilt Firmware

The fastest way to get TClaw running on a board: download a released image,
flash it, and configure it over the serial console. No SDK, no toolchain, no
build.

If you want to modify the code, skip this page and go to the per-board guides
that follow — they build from source.

:::note[Which boards]
This page covers the MCU boards (T5AI and ESP32-S3). **Raspberry Pi 5** and
**DshanPi A1** are Linux targets that run a native binary rather than flashed
firmware — see [TClaw with Raspberry Pi 5](./ducky-quick-start-raspberry-pi-5.md).
The release does carry `_QIO_` files for those two boards as well, since the build
packages every config uniformly, but they are not used by the flow on this page.
:::

## 1. Download the firmware

Releases are published on both
[GitHub](https://github.com/tuya/TClaw/releases/latest) and
[Gitee](https://gitee.com/tuya-open/TClaw/releases) — the Gitee mirror is usually
faster from mainland China. Each release ships one image per board, named
`TClaw_<BOARD>_QIO_<version>.bin`, plus a `SHA256SUMS.txt`. `<version>` is the
project version baked into the firmware (`1.0.0`), not the release tag — don't go
looking for `2.1.0` in the filename.

| Board | Release asset |
| :-- | :-- |
| Tuya T5AI dev board (3.5" LCD + camera) | `TClaw_TUYA_T5AI_BOARD_LCD_3.5_CAMERA_QIO_*.bin` |
| Tuya T5AI dev board (no SD card / camera) | `TClaw_TUYA_T5AI_BOARD_LCD_3.5_CAMERA.NO_SDCARD_CAMERA._QIO_*.bin` |
| Tuya T5AI Core | `TClaw_TUYA_T5AI_CORE_QIO_*.bin` |
| ATK T5AI Mini (2.4" LCD + camera) | `TClaw_ATK_T5AI_MINI_BOARD_2.4LCD_CAMERA_QIO_*.bin` |
| Waveshare T5AI Touch AMOLED 1.75" | `TClaw_WAVESHARE_T5AI_TOUCH_AMOLED_1_75_QIO_*.bin` |
| ESP32-S3 (bread compact WiFi) | `TClaw_ESP32S3_BREAD_COMPACT_WIFI_QIO_*.bin` |

`QIO` means a full flash image — bootloader and application in one file — so it
works on a blank board without flashing anything else first.

Verify the download:

```bash
sha256sum -c SHA256SUMS.txt --ignore-missing
```

## 2. Install tyutool

[tyutool](/docs/tyutool) is Tuya's flashing tool. Download the prebuilt desktop
app for Windows, macOS, or Linux.

Follow [Getting Started](/docs/tyutool/getting-started) to install it. Two
platform caveats bite most often:

- **macOS** blocks serial access for normal users by default; see the tyutool
  FAQ for the permission fix.
- **Linux** desktops sometimes render an empty tyutool window; the FAQ has the
  environment-variable workaround.

## 3. Flash the board

Connect the board to your computer with a USB data cable and put it into
**download mode**. How you enter download mode is board-specific (button combo,
solder pads, power-on timing) — check your board's manual. tyutool cannot do
this for you; if the board is not in download mode, flashing just times out.

Then, on tyutool's **Firmware Flash** page:

1. Open the **serial** dropdown and pick your port. The status dot next to it
   turns green when the device is connected and ready.
2. Check the **chip model** at the top of the page. Picking the port auto-fills
   the recommended chip and baud rate — confirm it says `t5ai` for the T5AI
   boards or `esp32s3` for ESP32-S3, since the wrong chip fails the flash.
3. On the **Flash** tab, choose the `.bin` you downloaded. The write address is
   auto-filled and normally needs no change.
4. Click **Flash**, and watch the progress bar and log below it climb to 100%.
5. The device **reboots automatically** into the new firmware when writing
   finishes.

The [firmware flash guide](/docs/tyutool/flash) explains every field on that
page.

## 4. Get your Tuya credentials

Three values, from two different places. Get them before you start configuring —
without them the device cannot come online.

| Value | What it is | Length |
| :-- | :-- | :-- |
| **PID** | Product ID. Binds the device to a product definition in the cloud, and is shared by every device of that product. | — |
| **UUID** | Per-device identifier. | 20 chars |
| **AuthKey** | Per-device key, mapped one-to-one to the UUID. | 32 chars |

**PID.** Open the
[TClaw product template](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2),
copy it into your own account (or create your own product), and take the PID from
the product page.

**UUID + AuthKey.** These two together are a *license*, obtained from
[Tuya IoT Platform → Open SDK](https://platform.tuya.com/purchase/index?type=6).
Each device needs its **own** license — one license authorizes exactly one device.

:::danger
It has to be a **TuyaOpen dedicated license**. Licenses from other sources,
including TuyaOS licenses, cannot connect to the Tuya IoT Cloud under the
TuyaOpen framework.
:::

Background and the other ways to write a license are in
[Authorize Devices](/docs/quick-start/equipment-authorization).

## 5. Configure over the serial CLI

Release images ship **without credentials** — they have to, since the binaries
are public. You supply them after flashing, over the serial console.

Open the port at **115200 baud** and press Enter to get a prompt. tyutool's
[Serial Debug](/docs/tyutool/serial-debug) page is a full serial terminal and
works well for this; `screen`, `minicom`, or `picocom` do the job too.

`help` lists the `cfg_*` commands. A minimal bring-up:

```bash
# Tuya cloud credentials - required for the device to come online
cfg_set_product_id <product_id>
cfg_set_auth <uuid> <authkey>

# Choose one IM channel and set its token
cfg_set_channel_mode telegram      # telegram | discord | feishu | weixin | qqbot | OFF
cfg_set_tg_token <bot_token>

# Check what is actually in effect
cfg_show
```

:::warning
`cfg_*` changes are stored in the device's KV storage and override whatever was
compiled into the firmware, but they **only take effect after a reconnect or
reboot**.
:::

### Command reference

| Command | Purpose |
| :-- | :-- |
| `help` | List all commands |
| `cfg_show` | Show the effective config (KV overrides win over build-time values) |
| `cfg_reset` | Clear every KV override |
| `cfg_set_product_id <id>` | Tuya product ID |
| `cfg_set_auth <uuid> <authkey>` | Tuya UUID and AuthKey |
| `cfg_set_device_id <id>` | Device identifier reported to the gateway |
| `cfg_set_channel_mode <mode>` | `telegram` \| `discord` \| `feishu` \| `weixin` \| `qqbot` \| `OFF` |
| `cfg_set_tg_token <token>` | Telegram bot token |
| `cfg_set_dc_token <token>` | Discord bot token |
| `cfg_set_dc_channel <id>` | Discord channel ID |
| `cfg_set_fs_appid <id>` | Feishu app ID |
| `cfg_set_fs_appsecret <secret>` | Feishu app secret |
| `cfg_set_fs_allow <csv>` | Feishu allow-list |
| `cfg_set_qq_appid <id>` | QQ Bot app ID |
| `cfg_set_qq_secret <secret>` | QQ Bot client secret |
| `cfg_set_ws_token <token>` | WebSocket server token |
| `cfg_set_gw_host <host>` | OpenClaw gateway host |
| `cfg_set_gw_port <port>` | OpenClaw gateway port |
| `cfg_set_gw_token <token>` | OpenClaw gateway token |
| `cfg_set_proxy <host> <port> [type]` | Outbound proxy |
| `cfg_clear_proxy` | Clear the outbound proxy |

## Next steps

- Pair the device with the Smart Life app and finish cloud activation — the
  per-board guides cover this, e.g. [TClaw with T5AI](./ducky-quick-start-T5AI.md).
- Give the agent device-side capabilities with
  [hardware peripheral skills](./hardware-skill.md).
- Run small on-device scripts with [Lua scripting](./lua-scripting.md) — note
  this one needs a source build, since no shipped board config enables Lua.
