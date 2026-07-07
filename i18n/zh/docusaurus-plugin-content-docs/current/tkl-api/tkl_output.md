---
title: "tkl_output | 日志输出"
description: "tkl_output 参考 —— 将格式化日志输出到平台日志端口并支持开关该端口，供 TAL 日志层转发消息的日志输出 TKL API。"
keywords:
  - tkl_output
  - TuyaOpen 日志输出
  - TAL 日志
  - 嵌入式驱动
---

`tkl_output` 接口将格式化的日志输出到平台的日志端口，并可打开或关闭该端口。它是各平台实现的内核抽象层（TKL）适配，TAL 日志层通过它转发日志消息。

## tkl_log_output

```c
void tkl_log_output(const char *format, ...);
```

将格式化的日志信息输出到日志端口。

| 参数 | 说明 |
| --- | --- |
| `format` | `printf` 风格的格式化字符串，后面可跟随变长参数列表。 |

- 返回值：无。

## tkl_log_close

```c
OPERATE_RET tkl_log_close(void);
```

关闭日志端口。

- 参数：无。
- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_log_open

```c
OPERATE_RET tkl_log_open(void);
```

打开日志端口。

- 参数：无。
- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。
