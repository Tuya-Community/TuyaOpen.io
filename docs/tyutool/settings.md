---
title: Settings
description: "Complete reference for the tyutool Settings page — update center, appearance and language, diagnostics and logs, serial logs, about, and how settings are persisted."
keywords:
  - tyutool settings
  - update center
  - appearance
  - diagnostics
  - log files
  - tuyaopen
---

This page is the complete reference for the **Settings** page: the update center, appearance and language, diagnostics and logs, serial logs, about, and how settings persist.

## Update center
- **Installed build** — the current version.
- **Check for updates** — desktop (Tauri) only; opens the Update dialog and is not bound by the interval.
- **Auto-check interval** — silently checks on startup and only fires once the interval has elapsed. Options: `Off` / `1h` / `6h` / `12h` / `24h`.

<img src="https://images.tuyacn.com/fe-static/docs/img/97046dd3-2b11-4643-9014-e7441daab128.png" alt="Update center — installed version, check-for-updates, auto-check interval" width="800" />

*Update center — installed version, check-for-updates, auto-check interval.*

:::note
The web build has no auto-update (it depends on the Tauri updater plugin).
:::

## Appearance and language
- **Theme** — `Light` / `Dark` / `System` (applies immediately; System follows the OS).
- **Language** — `Auto` / `简体中文` / `English` (Auto: uses Chinese for a `zh`-prefixed locale).
- **Serial indicator** toggle.

<img src="https://images.tuyacn.com/fe-static/docs/img/07891ac3-0fa9-4b40-8bfa-5d769a316379.png" alt="Appearance and language — theme, language, serial-indicator toggle" width="800" />

*Appearance and language — theme, language, serial-indicator toggle.*

:::info
Advanced UART parameters live on the Serial Debug page (see [Serial Debug](./serial-debug.md#connection-and-serial-config)).
:::

## Diagnostics and logs
- **Debug log toggle** — the master switch; when off, the backend log level is set to `off`.
- **Log level** — Error / Warn / Info / Debug / Trace, applied to the Rust backend via `log::set_max_level`.
- **Open log folder.**
- **View logs** — opens the Log Viewer dialog.
- **Export logs and report a problem** — zips logs and opens a pre-filled GitHub issue (version/OS included); desktop only.

<img src="https://images.tuyacn.com/fe-static/docs/img/ddcab093-4b02-4b75-8898-fd18d8a9e706.png" alt="Diagnostics and logs — log toggle, level, open/view/export actions" width="800" />

*Diagnostics and logs — log toggle, level, open/view/export actions.*

### How log files land

Logs are written by `tauri-plugin-log`. Each session is named `tyutool-<timestamp>.log`; a file rolls over at 10 MB into `-1.log`, `-2.log`, and old files are cleaned up on startup. Log directories:

- Linux: `~/.local/share/tyutool/`
- macOS: `~/Library/Application Support/tyutool/`
- Windows: `%APPDATA%\tyutool\`

:::note
The level applies to the Rust backend.
:::

## Serial logs
A mirror entry for Serial Debug's auto-save: the auto-save toggle, save directory, and timestamp format.

:::note
This is the same store as the Serial Debug page.
:::

## About
- **Application version.**
- **Open-source license** — opens the LICENSE page.

## Persistence

- **Desktop** writes `settings.json` (`tauri-plugin-store`).
- **Web** writes to `localStorage`.
- The theme is applied to the DOM (System mode watches the OS color scheme).

:::note
On desktop, the `settings.json` key names correspond one-to-one with the web `localStorage` keys.
:::
