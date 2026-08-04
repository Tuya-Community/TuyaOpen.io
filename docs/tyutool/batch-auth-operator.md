---
title: "Batch Auth: Operator Guide"
sidebar_label: Operator Guide
description: "For operators using tyutool for batch flashing and authorization — the do-it-in-order workflow from prep checklist through configuration, wiring, running, reading results, archiving, and safety."
keywords:
  - tyutool batch auth
  - operator guide
  - batch flashing workflow
  - archive
  - safety rules
  - tuyaopen
---

Written for **operators using tyutool for batch flashing and authorization** — a "just do it" order, no technical background needed.

:::note
Firmware developers should read the [Developer Guide](./batch-auth-developer.md).
:::

The workflow, in order: **① Pre-flight checklist → ② Configuration → ③ Wiring & start → ④ Read results · troubleshooting · safety rules**.

## What this tool does

Plug several devices into several serial ports, click "Start all", and flash + authorize them simultaneously, with authorization codes read automatically from an Excel sheet.

<img src="https://images.tuyacn.com/fe-static/docs/img/3e3b6ba5-5431-40cc-b108-f3bd08553c64.png" alt="Batch page — completion banner / dashboard (flash totals · auth totals · this batch) / config panel / toolbar (auto-assign · port filter · read-all · start-all) / port list" width="800" />

*Batch page — completion banner / dashboard (flash totals · auth totals · this batch) / config panel / toolbar (auto-assign · port filter · read-all · start-all) / port list.*

## Pre-flight checklist

| Item | How to know it is ready |
| :-- | :-- |
| Desktop tyutool | Installed and launches |
| Authorization-code Excel | Has at least `UUID` + `AuthKey` columns; purchased from [tuyaopen.ai/pricing](https://tuyaopen.ai/pricing) |
| Devices + serial cables | Wired and devices can enter download mode |
| Serial drivers | CH340/CP2102/FT232 installed |
| Firmware file | The `.bin` for this batch |

Installer packages (version pinned for reference — always check [GitHub Releases](https://github.com/tuya/tyutool/releases) for the latest):

| Platform | File |
| :-- | :-- |
| Windows | `..._windows_x86_64_nsis_x.x.x.exe` |
| macOS (Universal) | `..._macos_universal_dmg_x.x.x.dmg` |
| Linux | `..._linux_x86_64_appimage_x.x.x.AppImage` (run `chmod +x` first) |

:::warning[T5/T5AI wiring]
These devices have two serial ports — be sure to connect the flashing/authorization port, not the log port.
:::

:::warning[Authorization codes are valuable]
Keep the Excel safe.
:::

### Configuration handoff

| Config item | Developer fills | Operator verifies |
| :-- | :-- | :-- |
| Chip model | e.g. `esp32` / `t5ai` | Matches the device |
| Operation mode | auth-only vs flash-then-auth (Path A/B) | "Flash firmware" switch matches |
| Firmware file & version | filename + version | `batch-summary.json` records SHA256 |
| Flash baud rate | e.g. 921600 | Set correctly |
| Auth baud rate | e.g. 115200 | Set correctly |
| Storage mode | KV / OTP | OTP → single-device validation first |
| Conflict policy | skip / overwrite | OTP can only skip |
| Authorization sheet | remaining ≥ new devices in this batch | Recover/retry of registered devices doesn't consume new codes |
| Wiring | notes | **Confirm RTS wired to reset pin** |
| MAC uniqueness | each MAC globally unique | tyutool does **not** check MAC conflicts — a duplicate MAC makes devices share an auth code |
| Single-device smoke test | passed | Done before scaling |
| Special notes | — | Read |

:::tip
If something doesn't line up, stop and confirm with the developer — don't change the configuration yourself.
:::

## Workflow

Go to **Toolbox → Batch flash & auth**.

:::note
The first time you enter, a disclaimer dialog appears (irreversible operation). You can tick "don't show again"; to re-show it see [Settings](./settings.md#about).
:::

### Phase 1 — Configuration

1. Pick the chip (ESP32 / T5AI; for auth-only choose `other`).
2. Flash baud rate.
3. Auth baud rate.
4. Whether to flash firmware (flash-then-auth).
5. Firmware file (local / default auth-firmware).
6. Pick the firmware location or choose a version.

<img src="https://images.tuyacn.com/fe-static/docs/img/54fcbb92-0ecd-491e-9b31-9d69a7da1a9c.png" alt="Configuration area — shared config panel" width="800" />

*Configuration area — shared config panel.*

1. Pick the authorization sheet (`.xlsx`).
2. View statistics: total / used / in-use / remaining (assigning codes to new devices needs remaining > 0; recovering/retrying already-registered devices can start even with remaining 0 — they find their original code by MAC).
3. Devices already carrying authorization: skip (recommended) / overwrite.

<img src="https://images.tuyacn.com/fe-static/docs/img/1af06abc-e83e-4714-9ab6-20f169839b1c.png" alt="Batch auth configuration — sheet statistics" width="800" />

*Batch auth configuration — sheet statistics.*

(T5AI only) Pick the storage mode: KV is rewritable; OTP writes once and is irreversible (see [Safety](#safety-rules)).

### Phase 2 — Wiring & start

:::tip
First run one device all the way through → small-batch 2–4 devices → then the whole batch.
:::

Once wired, two steps:

1. Click **Auto-assign** (scans and adds slots, one row per port showing "idle").
2. Click **Start all** (if more than 8 idle ports, a confirmation prompt appears first).

:::warning[Last 30-second check before start]
Re-read each config line against the handoff sheet. If OTP: single-device validation done?
:::

<img src="https://images.tuyacn.com/fe-static/docs/img/ba1412f6-fa8a-411d-b67c-cfbe3e4991b2.png" alt="Toolbar and port list — slots per port" width="800" />

*Toolbar and port list — slots per port.*

:::note[Other toolbar buttons]
**② Port filter · ③ Read all (read-only, no write) · ④ Cancel · ⑤ Retry failed · ⑦ Read single port**.
:::

### Phase 3 — Wait and verify

1. Watch the dashboard until it completes (the banner shows: all success / all failed / partial success / all skipped).
2. Verify row by row (on failure, look at retry).
3. Once the whole order is done, click "Archive" (you don't need to archive mid-batch rounds).

<img src="https://images.tuyacn.com/fe-static/docs/img/15b90b10-3ea7-4ff5-8192-1aff75260d80.png" alt="Dashboard and completion banner (archive button on the right)" width="800" />

*Dashboard and completion banner (archive button on the right).*

## Reading results

| Status | Meaning | What to do |
| :-- | :-- | :-- |
| `done` | Complete, good unit | — |
| `failed` | Failed | Retry |
| `skipped` | Already authorized, skipped per policy | — |
| `no_code` | New device but remaining = 0 | Top up the sheet and rerun |
| other | In progress | Wait |

## Archiving
One "Start all" = one round; one authorization sheet = one order (often many rounds). Archiving is per order.

:::info
One-click archive: pick a directory and it creates a timestamped folder `batch-archive_20260717-143205_esp32/` containing: authorization-sheet copy / firmware (with SHA256) / logs.zip / `batch-summary.json` / `batch-slots.csv`. The summary's `lastRun` and the CSV are only a snapshot of the last round.
:::

Archive contents:

| File | What it is |
| :-- | :-- |
| Authorization-sheet Excel copy | The sheet used |
| Firmware file | The flashed `.bin` |
| logs.zip | Compressed logs |
| batch-summary.json | Run summary |
| batch-slots.csv | Per-slot snapshot of the last round |
| Completion banner screenshot | Optional record |

:::warning
The archive contains UUID + AuthKey — prevent leaks. For troubleshooting, share only the logs and error info; do not send the authorization sheet out.
:::

## Troubleshooting

| Symptom | What to do |
| :-- | :-- |
| App won't open / blank screen | See [FAQ · Linux blank window](./faq.md#linux-blank-window-webkit-compositing-failure) |
| Port doesn't appear | Swap cable/port, install drivers, close other apps — see [FAQ · ports](./faq.md#device--serial-port-not-in-the-dropdown) |
| All failed | Run a single device through, drop to 115200, check power supply |
| Excel "file in use" | Close Excel/WPS and reselect |
| Excel sheet invalid | Check the `UUID` + `AuthKey` columns and their lengths |
| Need detailed logs | Save per [Save the scene](#save-the-scene-first), see [FAQ · logs](./faq.md#how-to-report-a-bug-with-logs) |

### Save the scene first
While the scene is still live, click "Archive" to save everything; then manually add three things: a UI screenshot (mask the AuthKey, UUID can stay) / the problem device itself (label it and set it aside) / a one-line symptom description.

:::note
Don't wait and don't leak: archive the same day; when sharing out, give only the logs and error info.
:::

## Safety rules
This is the only feature that triggers irreversible hardware operations.

:::danger[Rule 1: OTP writes are irreversible]
OTP (T5AI only) burns authorization into the chip once and can never be undone. A wrong configuration ruins the whole batch — always validate by running one device all the way through before going to scale.
:::

<img src="https://images.tuyacn.com/fe-static/docs/img/024dd799-e550-451b-8694-f7c8759242a1.png" alt="When OTP is selected, the UI warns the write cannot be undone" width="800" />

*When OTP is selected, the UI warns the write cannot be undone.*

:::danger[Rule 2: devices marked "cancelled after write" must be set aside]
Devices carrying the "cancelled-after-write" danger badge may already have had authorization written and their state is uncertain — they are neither good units nor safe to rerun directly. Set them aside and verify individually.
:::
