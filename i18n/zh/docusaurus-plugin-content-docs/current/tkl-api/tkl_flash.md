---
title: tkl_flash | Flash 驱动
---

`tkl_flash` API 提供内核层（TKL）的片上 Flash 存储操作：读取、写入、擦除、加锁、解锁，以及分区布局查询。每个函数成功时返回 `OPRT_OK`，失败时返回 `tuya_error_code.h` 中定义的错误码。

`tkl_flash.c` 实现由移植工具自动生成。你在 `BEGIN` 与 `END` 注释标记之间添加平台相关代码，重新生成时这部分代码会保留。

## tkl_flash_read

```c
OPERATE_RET tkl_flash_read(uint32_t addr, uint8_t *dst, uint32_t size);
```

从 Flash 读取数据。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `addr` | 输入 | 要读取的 Flash 地址。 |
| `dst` | 输出 | 接收数据的缓冲区指针。 |
| `size` | 输入 | 要读取的字节数。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

## tkl_flash_write

```c
OPERATE_RET tkl_flash_write(uint32_t addr, const uint8_t *src, uint32_t size);
```

向 Flash 写入数据。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `addr` | 输入 | 要写入的 Flash 地址。 |
| `src` | 输入 | 存放待写入数据的缓冲区指针。 |
| `size` | 输入 | 要写入的字节数。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

:::note
写入前请先擦除目标区域。Flash 比特位只能通过擦除清零，因此向未擦除的数据区写入会得到错误的结果。
:::

## tkl_flash_erase

```c
OPERATE_RET tkl_flash_erase(uint32_t addr, uint32_t size);
```

擦除一段 Flash 区域。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `addr` | 输入 | 要擦除的 Flash 地址。 |
| `size` | 输入 | 要擦除的 Flash 块大小。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

## tkl_flash_lock

```c
OPERATE_RET tkl_flash_lock(uint32_t addr, uint32_t size);
```

锁定一段 Flash 区域，使其不可写入和擦除。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `addr` | 输入 | 要锁定区域的起始地址。 |
| `size` | 输入 | 要锁定区域的大小。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

## tkl_flash_unlock

```c
OPERATE_RET tkl_flash_unlock(uint32_t addr, uint32_t size);
```

解锁之前已锁定的 Flash 区域。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `addr` | 输入 | 要解锁区域的起始地址。 |
| `size` | 输入 | 要解锁区域的大小。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

## tkl_flash_get_one_type_info

```c
OPERATE_RET tkl_flash_get_one_type_info(TUYA_FLASH_TYPE_E type, TUYA_FLASH_BASE_INFO_T *info);
```

查询指定 Flash 类型的分区布局。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `type` | 输入 | 要查询的 Flash 类型，参见 `TUYA_FLASH_TYPE_E`。 |
| `info` | 输出 | 指向 `TUYA_FLASH_BASE_INFO_T` 的指针，用于接收分区布局。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

### TUYA_FLASH_TYPE_E

标识要查询的逻辑存储区。部分取值如下：

| 枚举值 | 含义 |
| --- | --- |
| `TUYA_FLASH_TYPE_BTL0` | Bootloader 区 0。 |
| `TUYA_FLASH_TYPE_BTL1` | Bootloader 区 1。 |
| `TUYA_FLASH_TYPE_APP` | 应用固件区。 |
| `TUYA_FLASH_TYPE_OTA` | OTA 下载区。 |
| `TUYA_FLASH_TYPE_KV_DATA` | 键值数据区。 |
| `TUYA_FLASH_TYPE_UF` | 用户文件区。 |
| `TUYA_FLASH_TYPE_ALL` | 全部分区。 |

完整枚举请参见 `tuya_cloud_types.h`。

### TUYA_FLASH_BASE_INFO_T

```c
typedef struct {
    uint32_t block_size;
    uint32_t start_addr;
    uint32_t size;
} TUYA_FLASH_PARTITION_T;

typedef struct {
    uint32_t partition_num;
    TUYA_FLASH_PARTITION_T partition[TUYA_FLASH_TYPE_MAX_PARTITION_NUM];
} TUYA_FLASH_BASE_INFO_T;
```

| 字段 | 说明 |
| --- | --- |
| `partition_num` | `partition` 数组中有效条目的数量。 |
| `partition` | 分区描述符数组，每项包含 `block_size`、`start_addr` 和 `size`。 |
