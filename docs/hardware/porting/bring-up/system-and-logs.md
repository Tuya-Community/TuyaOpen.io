---
title: "Bring-up 1: System and logs"
---

The first bring-up stage maps your chip's RTOS and a UART onto TuyaOpen's OS abstraction, so the system boots and prints logs. Everything after this depends on it — without working threads, timers, and a console you cannot debug the later stages.

## Goal

TuyaOpen boots on your chip, its OS primitives (threads, mutexes, semaphores, queues, timers, heap) run on your RTOS, and TuyaOpen log output appears over a UART.

## Files to implement

These adapter files are generated under `platform/<your_chip>/tuyaos/` when you run `tos.py new platform`. Implement each by calling your chip SDK / RTOS.

| File | What you implement |
|------|--------------------|
| `tkl_system.c` | Reset, millisecond/tick time, random seed, critical-section enter/exit, CPU info |
| `tkl_memory.c` | `malloc` / `free` / `realloc` over your heap |
| `tkl_thread.c` | Create/destroy threads on your RTOS, priority mapping |
| `tkl_mutex.c` | Mutex create / lock / unlock (recursive) |
| `tkl_semaphore.c` | Semaphore create / wait / post |
| `tkl_queue.c` | Message queue create / send / receive |
| `tkl_timer.c` | Hardware or software timer with ISR callback |
| `tkl_output.c` | Route TuyaOpen logs to your console (usually a UART `printf`) |
| `tkl_uart.c` | UART init / read / write — carries logs now and debug later |

## Details

- **Time base first.** `tkl_system_get_millisecond` / tick must be correct — timers, timeouts, and the cloud heartbeat all depend on it.
- **Critical sections** (`tkl_system_enter_critical`) must actually disable preemption/interrupts; many later races trace back to a no-op here.
- **`tkl_output` is the smallest useful milestone.** Wire it to your UART `printf` early so the rest of bring-up is observable.
- **Thread priority mapping.** TuyaOpen uses `TKL_THREAD_PRI_LOWEST … HIGHEST`; map these onto your RTOS's priority scale.
- Start from the file closest to your RTOS in a [reference port](../bring-your-chip-to-tuyaopen#start-from-a-reference-port) and replace its SDK calls.

## Verify

Build `apps/tuya_cloud/switch_demo` (connectivity disabled is fine), flash, and boot. You succeed when the TuyaOpen banner and periodic logs print cleanly over your UART and the device does not crash or hang.

Next: [Bring-up 2: Flash and storage](flash-and-storage).

## See also

- [System APIs reference](../../../tkl-api/tkl_system)
- [Bring Your Chip to TuyaOpen](../bring-your-chip-to-tuyaopen)
