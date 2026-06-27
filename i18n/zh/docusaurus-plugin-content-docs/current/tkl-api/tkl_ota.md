---
title: tkl_ota | OTA 固件升级
---

`tkl_ota` API 提供内核层（TKL）的 OTA（Over-the-Air）固件升级钩子。升级分阶段进行：查询设备 OTA 能力、通知升级开始、逐包处理数据、通知升级结束。另有一个单独的接口用于获取旧固件信息以支持断点续传。每个函数成功时返回 `OPRT_OK`，失败时返回 `tuya_error_code.h` 中定义的错误码。

`tkl_ota.c` 实现由移植工具自动生成。你在用户自定义区域内添加平台相关代码，重新生成时这部分代码会保留。

## tkl_ota_get_ability

```c
OPERATE_RET tkl_ota_get_ability(uint32_t *image_size, TUYA_OTA_TYPE_E *type);
```

获取设备的 OTA 能力：可接收的最大固件镜像大小，以及支持的 OTA 类型。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `image_size` | 输出 | 设备可接收的最大固件镜像大小。 |
| `type` | 输出 | 支持的 OTA 类型，参见 `TUYA_OTA_TYPE_E`。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

## tkl_ota_start_notify

```c
OPERATE_RET tkl_ota_start_notify(uint32_t image_size, TUYA_OTA_TYPE_E type, TUYA_OTA_PATH_E path);
```

通知平台 OTA 升级开始。实现会初始化升级过程所需的变量和状态。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `image_size` | 输入 | 即将写入的固件镜像大小。 |
| `type` | 输入 | OTA 类型，参见 `TUYA_OTA_TYPE_E`。 |
| `path` | 输入 | 数据到达的传输通道，参见 `TUYA_OTA_PATH_E`。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

## tkl_ota_data_process

```c
OPERATE_RET tkl_ota_data_process(TUYA_OTA_DATA_T *pack, uint32_t *remain_len);
```

处理接收到的一个 OTA 数据包，将其负载写入 Flash。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `pack` | 输入 | 指向 OTA 数据包的指针，参见 `TUYA_OTA_DATA_T`。 |
| `remain_len` | 输出 | 数据包中尚未处理的字节数。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

## tkl_ota_end_notify

```c
OPERATE_RET tkl_ota_end_notify(BOOL_T reset);
```

通知平台 OTA 传输已结束。实现会校验接收到的镜像并进行后续处理，可按需重置设备。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `reset` | 输入 | 升级完成后是否重置设备。 |

成功时返回 `OPRT_OK`。若校验失败或发生其他错误，则返回错误码，详见 `tuya_error_code.h`。

## tkl_ota_get_old_firmware_info

```c
OPERATE_RET tkl_ota_get_old_firmware_info(TUYA_OTA_FIRMWARE_INFO_T **info);
```

获取当前固件的信息，用于在断点处恢复中断的传输。

:::note
本 API 仅用于 BLE 子设备。
:::

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `info` | 输出 | 接收指向固件信息结构体的指针，参见 `TUYA_OTA_FIRMWARE_INFO_T`。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

## 类型

### TUYA_OTA_TYPE_E

OTA 升级包类型。

```c
typedef enum {
    TUYA_OTA_FULL = 1, ///< AB area switch, full package upgrade
    TUYA_OTA_DIFF = 2, ///< fixed area, difference package upgrade
} TUYA_OTA_TYPE_E;
```

### TUYA_OTA_PATH_E

OTA 数据到达的传输通道。

```c
typedef enum {
    TUYA_OTA_PATH_AIR     = 0,   ///< OTA from Wired/Wi-Fi/Cellular/NBIoT
    TUYA_OTA_PATH_UART    = 1,   ///< OTA from uart for MF
    TUYA_OTA_PATH_BLE     = 2,   ///< OTA from BLE protocol for subdev
    TUYA_OTA_PATH_ZIGBEE  = 3,   ///< OTA from Zigbee protocol for subdev
    TUYA_OTA_PATH_SEC_A   = 4,   ///< OTA from multi-section A
    TUYA_OTA_PATH_SEC_B   = 5,   ///< OTA from multi-section B
    TUYA_OTA_PATH_INVALID = 255  ///< OTA from multi-section invalid
} TUYA_OTA_PATH_E;
```

### TUYA_OTA_DATA_T

一个 OTA 数据包。实现会将负载写入 Flash 的 `start_addr + offset` 处。

```c
typedef struct {
    uint32_t total_len;  ///< ota image total len
    uint32_t start_addr; ///< ota flash start addr
    uint32_t offset;     ///< ota image offset
    uint8_t *data;       ///< ota data
    uint32_t len;        ///< ota data len
    void    *pri_data;   ///< private pointer
} TUYA_OTA_DATA_T;
```

### TUYA_OTA_FIRMWARE_INFO_T

描述一个固件镜像。

```c
typedef struct {
    uint32_t len;
    uint32_t crc32;
    uint8_t  md5[TUYA_OTA_FILE_MD5_LEN];
} TUYA_OTA_FIRMWARE_INFO_T;
```

`TUYA_OTA_FILE_MD5_LEN` 的值为 `16`。
