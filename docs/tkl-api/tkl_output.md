---
title: "tkl_output | Log Output"
description: "tkl_output reference — TuyaOpen log output TKL API for writing formatted log messages and opening/closing the platform log port for porting/platform adaptation."
keywords:
  - tkl_output
  - tuyaopen log output
  - tkl log api
  - embedded logging
---

The `tkl_output` interface writes formatted log output to the platform's log port and opens or closes that port. It is the kernel abstraction layer (TKL) port each platform implements; the TAL logging layer routes messages through it.

## tkl_log_output

```c
void tkl_log_output(const char *format, ...);
```

Outputs formatted log information to the log port.

| Parameter | Description |
| --- | --- |
| `format` | `printf`-style format string, followed by a variable number of arguments. |

- Return value: none.

## tkl_log_close

```c
OPERATE_RET tkl_log_close(void);
```

Closes the log port.

- Parameters: none.
- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_log_open

```c
OPERATE_RET tkl_log_open(void);
```

Opens the log port.

- Parameters: none.
- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.
