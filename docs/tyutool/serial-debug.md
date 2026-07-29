---
title: Serial Debug
description: "Complete reference for the tyutool Serial Debug page — a serial terminal and log monitor covering connection, UART config, reset, ASCII/Hex views, the send bar, keyword filter tabs, and auto-release/auto-save."
keywords:
  - tyutool serial debug
  - uart config
  - hex view
  - filter tabs
  - log monitor
  - tuyaopen
---


This page is the complete reference for the **Serial Debug** page: a serial terminal and log monitor covering connection and UART configuration, device reset, ASCII/Hex log views, the send bar, the hex popup, keyword filter tabs, and auto-release and auto-save.

## Overview

A full serial terminal. Keep-alive: if you jump to another page and come back, the background RX stream is not interrupted.

<img src="https://images.tuyacn.com/fe-static/docs/img/5f579be0-52ec-478e-9447-29a2bf79b125.png" alt="Serial Debug overview — terminal workspace with log view and send bar" width="800" />

*Serial Debug overview — terminal workspace with log view and send bar.*

:::note
The serial ports here are shared with the [Firmware Flash](./flash.md) page.
:::

## Connection and serial config
Serial selection (rescan) / connect-disconnect / status indicator. The advanced UART settings live in the serial-settings dialog:

| Parameter | Options | Notes |
| :-- | :-- | :-- |
| Baud rate | `9600`–`921600` + custom | When unset, defaults to the current flash chip's log baud rate |
| Data bits | `5` / `6` / `7` / `8` | Data bits per frame |
| Parity | `none` / `odd` / `even` | None / odd / even |
| Stop bits | `1` / `1.5` / `2` | Stop bits per frame |

:::tip[Baud follows the chip]
Pick a chip on the Flash page first and the Serial Debug baud rate aligns to it automatically.
:::

## Device reset

Reset via DTR/RTS. Reset the current session port, or reset another controlled port (use the runtime chip id to target a different port).

:::note
Reset is not the same as disconnect.
:::

## Log view
ASCII view / Hex view (8/16/32 bytes per row); ANSI coloring toggle; font size 10–18px; timestamp toggle; direction badges (TX/RX/SYS); clear; export.

<img src="https://images.tuyacn.com/fe-static/docs/img/d8590f95-79d6-4c7b-8d54-b9f329bb499c.png" alt="Log rows with RX badges and timestamps, with the Serial Settings dialog open — data bits, parity, stop bits, auto-release for flash, hex view, and ANSI color parsing" width="800" />

*Log rows with RX badges and timestamps, with the Serial Settings dialog open — data bits, parity, stop bits, auto-release for flash, hex view, and ANSI color parsing.*

:::warning[3000-line visible window cap]
Older rows are removed once the visible window exceeds 3000 lines. Use auto-save or export promptly.
:::

## Send bar

ASCII or Hex mode; optional `\r\n`; press `Enter` to send; history holds up to 20 entries, cycle with `↑` / `↓`.

<img src="https://images.tuyacn.com/fe-static/docs/img/130eb3bf-cd00-40fb-87b3-82deb276f568.png" alt="Send bar with a command list open above the input, and live log rows with RX badges in the background" width="800" />

*Send bar with a command list open above the input, and live log rows with RX badges in the background.*

## Hex popup

Select a span of RX data and the popup shows hex + ASCII side by side.

:::tip
Useful for checking structured binary (protocol frames, authorization replies).
:::

## Filter tabs

Give each keyword its own tab. A keyword can be plain text or a regular expression; tabs cycle through six colors, count matches live, and clicking a tab shows only matching rows. "All" restores the full view and "Load earlier" pages back. Filtering runs server-side against the whole session.

<img src="https://images.tuyacn.com/fe-static/docs/img/c4ab9e3e-91da-4df8-a3de-0bd38433c5c8.png" alt="Filter tabs — keyword tabs with live match counts and color coding" width="800" />

*Filter tabs — keyword tabs with live match counts and color coding.*

## Auto-release / auto-save
- **Auto-release** solves port contention. When the Flash page needs a port, Serial Debug releases it automatically (an optional confirmation prompt can be turned on); once flashing finishes, the connection is restored automatically.
- **Auto-save** keeps the full session log (also configurable under [Settings](./settings.md#serial-logs)). Set the save directory; filenames are timestamped; writes are chunked (max 128 KiB).

:::note
Manual export = the current visible window; auto-save = the whole session.
:::
