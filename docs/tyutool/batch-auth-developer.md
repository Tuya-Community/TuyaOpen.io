---
title: "Batch Auth: Developer Guide"
sidebar_label: Developer Guide
description: "For firmware developers — the TuyaOpen UART CLI command contract a firmware must implement to be batch-authorizable by tyutool, plus a self-test checklist."
keywords:
  - tyutool batch auth
  - developer guide
  - uart cli protocol
  - authorize contract
  - self-test
  - tuyaopen
---

Written for **firmware developers**: to make a firmware batch-authorizable by tyutool, it must implement a set of TuyaOpen UART CLI commands. Below is the complete protocol contract and a **self-test checklist**.

:::note[On the wrong page?]
Operators should read the [Operator Guide](./batch-auth-operator.md).
:::

## Protocol essence

The authorization protocol is a set of **text commands for the TuyaOpen interactive shell** (pure ASCII, each terminated by `\r\n`, no frame header / checksum / opcode). It is a completely separate thing from the Beken BootROM binary protocol used for flashing. The default baud rate is `115200` 8N1; on power-up the device presents a `tuya>` prompt. The authoritative source is `tuya_authorize.c`.

:::tip[How to enable the CLI on a TuyaOpen-based firmware]
The firmware must register it actively: ① `tal_cli_init()` (defaults to uart0; for a different uart use `tal_cli_init_with_uart(uart_num)`); ② `tuya_authorize_init()` (registers `auth` / `auth-read` / `read_mac`). Call both in `user_main()`. Code:

```c
void user_main(void)
{
    // ... tal_kv_init / tal_sw_timer_init / tal_workq_init etc.
#if !defined(PLATFORM_UBUNTU) || (PLATFORM_UBUNTU == 0)
    tal_cli_init();          // Initialize the CLI (default uart0)
    tuya_authorize_init();   // Register auth / auth-read / read_mac commands
    tuya_app_cli_init();     // Your app-specific commands (optional)
#endif
    // ... tuya_iot_init(...) etc.
}
```

:::note
On a TuyaOpen-based firmware, three lines are enough. The command table and self-test checklist below mainly target self-built or ported firmware.
:::

## Commands you must implement

| Command (`\r\n` terminated) | Purpose | What the firmware must echo |
| :-- | :-- | :-- |
| `sys_log_enable off` | Capability probe + disable logging | New: `OK: log disabled`; old: `No command` or just `tuya>` |
| `sys_version` | Read firmware version | One line: `project.version x.y.z` |
| `read_mac` | Read MAC | `XX:XX:XX:XX:XX:FF` (6 colon-separated segments; or with a prefix label `LABEL:XX:...:FF` — 7 segments) |
| `auth-read` or `auth-read <n>` | Read current authorization | Authorized: two lines `<uuid>` / `<authkey>` then the prompt; empty/unauthorized: `Authorization read failure.`; partial echo placeholder `uuidxxxxxxxxxxxxxxxx` (treated as unauthorized) |
| `auth <uuid> <authkey>` or `auth <uuid> <authkey> <n>` | Write authorization | Bad length: `uuid length must be 20/16, authkey length must be 32` (not executed); KV success: `Authorization write succeeds.` (some versions don't print on reboot; tyutool re-reads via auth-read to verify); OTP success: `Authorization write to OTP Succeeds.`; OTP failure: `Authorization write to OTP failure.` |

:::note
The firmware should echo each command line. Log lines (`[MM-DD HH:MM:SS ...]`) and ANSI escapes are stripped automatically by tyutool.
:::

## Credential length rules

- `UUID` is exactly 16 or 20 characters.
- `AuthKey` is exactly 32 characters.
- The placeholder UUID is `uuidxxxxxxxxxxxxxxxx`.
- UUID legal characters: alphanumeric plus `- _ .`.
- AuthKey: any printable ASCII character.

## KV vs OTP

| Mode | Read command | Write command |
| :-- | :-- | :-- |
| KV | `auth-read` | `auth <uuid> <authkey>` |
| OTP | `auth-read 1` | `auth <uuid> <authkey> 1` |

Key points:

- OTP is T5AI only.
- OTP writes are slow (60s total timeout + 30s silent window; reads have a 30s silent window).
- OTP write failure retries at most 3 times (does not corrupt already-written data).
- Reading an empty OTP region returns `Authorization read failure.` (treated as unauthorized).

:::danger
OTP writes are irreversible. Always validate with KV first.
:::

## MAC validation rules

`read_mac` must return a valid MAC: 6 colon-separated two-digit-hex segments (case-insensitive, uppercased internally); a non-hex prefix label is allowed (`LABEL:XX:...:XX` — 7 segments); dashes, equals signs, and spaces are not recognized. The T5/T5AI factory default MAC `C8:47:8C:00:00:18` means "not personalized" — if tyutool reads it, it aborts authorization for that device.

## Self-test checklist
With a serial tool at 115200 8N1, verify each item:

1. The `tuya>` prompt appears.
2. `sys_log_enable off` → `OK: log disabled` (or `No command` on old firmware).
3. `sys_version` → `project.version x.y.z`.
4. `read_mac` → a valid MAC.
5. `auth-read` (unauthorized) → `Authorization read failure.`.
6. `auth <valid uuid+authkey>` → `Authorization write succeeds.` (KV) / `...to OTP Succeeds.` (OTP).
7. A follow-up `auth-read` reads back the same UUID + AuthKey.
8. `auth <too-short uuid> <key>` → a length error and the authorization is unchanged.
9. (T5AI + OTP only) `auth <uuid> <authkey> 1` → OTP success, and `auth-read 1` reads it back.

:::tip
Self-test with real, purchased credentials; do OTP last.
:::

## Integration paths

- **Path A (recommended):** the firmware carries its own authorization capability (TuyaOpen-based or self-implemented); the batch run uses `auth-only` mode.
- **Path B:** flash the official auth-firmware (`assets/auth-firmware/` provides a `.bin` per chip) to temporarily bring up authorization; the corresponding batch mode is `flash-then-auth`.

## Configuration handoff
Fill these in for the operator, one item per line: chip model; operation mode (A/B); firmware filename + version; the two baud rates (flash / auth); storage mode (KV/OTP — flag OTP prominently); conflict policy (skip/overwrite — OTP can only skip); wiring notes (**confirm RTS is correctly wired to the chip's reset pin**); MAC uniqueness guarantee (each device's MAC must be globally unique and non-repeating; tyutool does not validate MAC conflicts); special notes.

:::note
The handoff sheet lets the operator "just execute it"; for later troubleshooting you can reconstruct the agreement against the [batch archive](./batch-auth-operator.md#archiving).
:::
