---
title: FAQ
description: "Symptom-first troubleshooting for tyutool — ports and connections, flashing failures, authorization, and platform issues (Linux blank window, Windows WebView2), plus how to report a bug with logs."
keywords:
  - tyutool faq
  - troubleshooting
  - flashing fails
  - authorize fails
  - linux blank window
  - webview2
  - tuyaopen
---


This page is problem-first: it lists the **symptom**, then gives the shortest path to diagnose and fix it. Both CLI snippets and GUI actions are included.

## Connection / ports

### Device / serial port not in the dropdown
**Symptom:** the port selector is empty, or `tyutool list-ports` prints nothing.

1. Unplug/replug, swap cable, swap port.
2. Install the driver (CH340/CP2102/FT232).
3. Re-check with the CLI:

```bash
tyutool list-ports
tyutool usb-port-survey   # raw USB metadata for cross-system debugging
```

4. On macOS see [macOS serial permission](#macos-serial-permission).
5. On Linux, confirm you are in the `dialout` / `tty` group and log out and back in.

:::tip
Click refresh or reopen the app.
:::

### macOS serial permission
**Symptom:** the port is visible but you get a permission error.

```bash
sudo dseditgroup -o edit -a $USER -t user dialout
```

Then log out and back in. On newer macOS, allow it under **Privacy & Security → Accessories**. See the project [README Troubleshooting](https://github.com/tuya/tyutool#readme).

### Port busy
**Symptom:** `Permission denied` / `Device or resource busy`.

Close other programs (Serial Debug, Arduino IDE, minicom, picocom); avoid running the GUI and CLI at the same time; you can turn on auto-release.

## Flashing

### Flash fails / handshake fails
**Symptom:** Handshake failed / Failed to sync.

Causes: wrong chip model (`-d bk7231n` / `-d esp32` / `-d t5ai`); wrong baud (drop to 115200 first); device not in download mode (`tyutool reset`); wiring / power.

:::warning
First do a minimal repro: `tyutool read -d <chip> -p <port> -l 0x1000`.
:::

### Erase reports "unaligned"
**Symptom:** `unaligned` / `address not aligned` / `sector boundary`.

Erase requires 4 KiB alignment:

```bash
# Correct: both start and length aligned to 4 KiB
tyutool erase -d bk7231n -s 0x0000 -l 0x200000
tyutool erase -d bk7231n -s 0x8000 -l 0x4000

# Wrong: 0x9000 is not a multiple of 4 KiB
tyutool erase -d bk7231n -s 0x9000 -l 0x1000   # ❌ reports unaligned
```

:::tip
Use the GUI's align action, or round down to a multiple of `0x1000`.
:::

### Progress stalls
**Symptom:** a stage sits at 0% for a long time, or retries repeatedly.

Drop the baud (921600 → 460800 → 115200); swap cable/power; turn on debug logs or CLI `--verbose` to debug/trace (location at [CLI · global options](./cli.md#output-modes)); cancel gracefully with `Ctrl+C`.

## Authorization

### Authorization fails
**Symptom:** authorize write failed / UUID/AuthKey invalid.

Credentials are one-device-once (used ones are spent); first do an auth-read `tyutool authorize -p <port>`; `--uuid` / `--authkey` must be passed together; specify `-d` for timing.

:::note
Credentials come from the Tuya developer platform and are bound to a chip/product.
:::

### Credential display issues
**Symptom:** you can't see the full value, or copying yields `****`.

The GUI masks by default — click Show or the copy button. With the CLI, auth-read:

```bash
tyutool authorize -p <port>
tyutool authorize -p <port> -d esp32   # read with chip-specific timing
```

Clear the clipboard promptly after copying.

## Platform

### Linux blank window (WebKit compositing failure)
```bash
export WEBKIT_DISABLE_COMPOSITING_MODE=1
```

Then launch the AppImage; you can add it to `~/.bashrc`. See the project README.

### Windows missing WebView2
Install the Edge WebView2 Runtime Evergreen: download page → Evergreen Standalone Installer → run and restart.

:::note
For enterprise/offline, the Fixed Version offline package works too.
:::

## Logs & feedback

### How to report a bug (with logs)
1. **Export / open logs.** GUI: Settings → Diagnostics → View logs → "Export logs and report a problem" = zip + pre-filled issue. CLI: read the `log:` line in the banner; `--verbose` prints to stderr.
2. **Use the issue template.** [Issues → New issue](https://github.com/tuya/tyutool/issues/new/choose), pick Bug report.
3. **Fill in the key fields:** Version / OS / Chip / Platform / baud / Steps / Expected vs actual.
4. **Attach the session log.** Drag the zip into the issue, or for the CLI paste `tyutool-<timestamp>.log`.

:::warning
Logs may contain sensitive info (UUID/AuthKey) — mask it first.
:::
