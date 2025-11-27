# tkl_wakeup | 唤醒驱动

## 简要说明

wakeup 用于设置芯片唤醒源，唤醒源可以是 GPIO、定时器等。

## API 说明

### tkl_wakeup_source_set

```c
OPERATE_RET tkl_wakeup_source_set(const TUYA_WAKEUP_SOURCE_BASE_CFG_T  *param);
```

- 功能：设置唤醒源。
- 参数：`param`，唤醒源参数，可选 GPIO 和 timer。
- 返回值：返回 `OPRT_OK` 则表示创建成功，其他值则表示发生错误，具体错误代码请参考 `tuya_error_code.h`。


### tkl_wakeup_source_clear

```c
OPERATE_RET tkl_wakeup_source_clear(const TUYA_WAKEUP_SOURCE_BASE_CFG_T *param);
```

- 功能：清除唤醒源。
- 参数：`param`，唤醒源参数。
- 返回值：返回 `OPRT_OK` 则表示创建成功，其他值则表示发生错误，具体错误代码请参考 `tuya_error_code.h`。
