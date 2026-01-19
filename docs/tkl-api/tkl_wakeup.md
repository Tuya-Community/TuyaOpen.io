# tkl_wakeup | Wake-up Driver

## Overview

The `tkl_wakeup` driver is used to set a wake-up source for the chip. The wake-up source can be a GPIO, a timer, and more.

## API description

### tkl_wakeup_source_set

```c
OPERATE_RET tkl_wakeup_source_set(const TUYA_WAKEUP_SOURCE_BASE_CFG_T  *param);
```

- Feature: Sets a wake-up source.
- Parameter: `param`, the wake-up source parameters. Options include GPIO and timer.
- Return value: `OPRT_OK` indicates a success. Any other value indicates an error. For detailed error codes, refer to `tuya_error_code.h`.


### tkl_wakeup_source_clear

```c
OPERATE_RET tkl_wakeup_source_clear(const TUYA_WAKEUP_SOURCE_BASE_CFG_T *param);
```

- Feature: Clears a wake-up source.
- Parameter: `param`, the wake-up source parameters.
- Return value: `OPRT_OK` indicates a success. Any other value indicates an error. For detailed error codes, refer to `tuya_error_code.h`.
