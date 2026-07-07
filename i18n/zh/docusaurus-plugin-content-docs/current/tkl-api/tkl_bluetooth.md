---
title: tkl_bluetooth | 蓝牙驱动
description: "tkl_bluetooth 参考 —— 将平台 BLE 协议栈适配到 TuyaOS，提供 GAP、GATT 服务端与客户端及厂商自定义控制的蓝牙驱动 TKL API。"
keywords:
  - tkl_bluetooth
  - TuyaOpen 蓝牙驱动
  - BLE 协议栈
  - GATT
  - 嵌入式驱动
---

`tkl_bluetooth` 将平台的 BLE 协议栈适配到 TuyaOS，对外提供：BLE 协议栈生命周期管理、GAP 操作（广播、扫描、连接、地址、发射功率、RSSI）、GATT 服务端（服务、属性值、通知与指示、MTU）、GATT 客户端（服务与特征值发现、读写、MTU）以及厂商自定义控制。其实现位于 `tkl_bluetooth.c`，相关类型在 `tkl_bluetooth_def.h` 中声明。

除非另有说明，每个函数成功时返回 `OPRT_OK`，失败时返回其他值。

协议栈按角色配置：

| 角色 | 取值 | 描述 |
| --- | --- | --- |
| `TKL_BLE_ROLE_SERVER` | 1 | BLE 外设（服务端）。 |
| `TKL_BLE_ROLE_CLIENT` | 2 | BLE 中心（客户端）。 |

## tkl_ble_stack_init

```c
OPERATE_RET tkl_ble_stack_init(uint8_t role);
```

- 功能描述:

  初始化 ble 协议栈

- 参数：

  | 输入/输出 | 参数名 | 描述         |
  | --------- | ------ | ------------ |
  | [in]      | role   | ble 角色配置 |

  | 名字                | 定义       | 备注 |
  | :------------------ | :--------- | :--- |
  | TKL_BLE_ROLE_SERVER | BLE 服务器 |      |
  | TKL_BLE_ROLE_CLIENT | BLE 客户端 |      |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_stack_deinit

```c
OPERATE_RET tkl_ble_stack_deinit(uint8_t role);
```

- 功能描述:

  去初始化 ble 协议栈

- 参数：

  | 输入/输出 | 参数名 | 描述               |
  | --------- | ------ | ------------------ |
  | [in]      | role   | ble 角色，如下所示 |

  | 名字                | 定义       | 备注 |
  | :------------------ | :--------- | :--- |
  | TKL_BLE_ROLE_SERVER | BLE 服务器 |      |
  | TKL_BLE_ROLE_CLIENT | BLE 客户端 |      |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_stack_gatt_link

```c
OPERATE_RET tkl_ble_stack_gatt_link(uint16_t *p_link);
```

- 功能描述:

  查询协议栈是否支持 GATT link。

- 参数：

  | 输入/输出 | 参数名 | 描述        |
  | --------- | ------ | ----------- |
  | [out]     | p_link | GATT link。 |

- 返回值:

  - OPRT_OK : 支持 GATT link。
  - Others ：仅支持 Beacon 或 Mesh Beacon，不支持 GATT link。

## tkl_ble_gap_callback_register

```c
OPERATE_RET tkl_ble_gap_callback_register(const TKL_BLE_GAP_EVT_FUNC_CB gap_evt);
```

- 功能描述:

  注册 gap 回调函数

- 参数：

  | 输入/输出 | 参数名  | 描述                        |
  | --------- | ------- | --------------------------- |
  | [in]      | gap_evt | 注册 gap 回调函数，如下定义 |

  ```c
  typedef void(*TKL_BLE_GAP_EVT_FUNC_CB)(TKL_BLE_GAP_PARAMS_EVT_T *p_event);
  ```

  **TKL_BLE_GAP_PARAMS_EVT_T**

  ```c
  typedef struct {
        TKL_BLE_GAP_EVT_TYPE_E          type;           /**< Gap Event */
        uint16_t                        conn_handle;    /**< Connection Handle */
        int                           result;         /**< Will Refer to HOST STACK Error Code */

        union {
            TKL_BLE_GAP_CONNECT_EVT_T       connect;        /**< Receive connect callback, This value can be used with TKL_BLE_EVT_PERIPHERAL_CONNECT and TKL_BLE_EVT_CENTRAL_CONNECT_DISCOVERY*/
            TKL_BLE_GAP_DISCONNECT_EVT_T    disconnect;     /**< Receive disconnect callback*/
            TKL_BLE_GAP_ADV_REPORT_T        adv_report;     /**< Receive Adv and Respond report*/
            TKL_BLE_GAP_CONN_PARAMS_T       conn_param;     /**< We will update connect parameters.This value can be used with TKL_BLE_EVT_CONN_PARAM_REQ and TKL_BLE_EVT_CONN_PARAM_UPDATE*/
            char                          link_rssi;      /**< Peer device RSSI value */
        }gap_event;

    } TKL_BLE_GAP_PARAMS_EVT_T;
  ```

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gatt_callback_register

```c
OPERATE_RET tkl_ble_gatt_callback_register(const TKL_BLE_GATT_EVT_FUNC_CB gatt_evt);
```

- 功能描述:

  注册GATT回调函数

- 参数：

  | 输入/输出 | 参数名   | 描述          |
  | --------- | -------- | ------------- |
  | [in]      | gatt_evt | GATT 回调函数 |

  ```c
  typedef void(*TKL_BLE_GATT_EVT_FUNC_CB)(TKL_BLE_GATT_PARAMS_EVT_T *p_event);
  ```

  **TKL_BLE_GATT_PARAMS_EVT_T**

  gatt事件定义如下:

  ```c
  typedef struct {
      TKL_BLE_GATT_EVT_TYPE_E             type;           /**< Gatt Event */
      uint16_t                            conn_handle;    /**< Connection Handle */
      int                               result;         /**< Will Refer to HOST STACK Error Code */

      union {
          uint16_t                        exchange_mtu;   /**< This value can be used with TKL_BLE_GATT_EVT_MTU_REQUEST and TKL_BLE_GATT_EVT_MTU_RSP*/
          TKL_BLE_GATT_SVC_DISC_TYPE_T    svc_disc;       /**< Discovery All Service */
          TKL_BLE_GATT_CHAR_DISC_TYPE_T   char_disc;      /**< Discovery Specific Characteristic */
          TKL_BLE_GATT_DESC_DISC_TYPE_T   desc_disc;      /**< Discovery Specific Descriptors*/
          TKL_BLE_NOTIFY_RESULT_EVT_T     notify_result;  /**< This value can be used with TKL_BLE_GATT_EVT_NOTIFY_TX*/
          TKL_BLE_DATA_REPORT_T           write_report;   /**< This value can be used with TKL_BLE_GATT_EVT_WRITE_REQ*/
          TKL_BLE_DATA_REPORT_T           data_report;    /**< This value can be used with TKL_BLE_GATT_EVT_NOTIFY_INDICATE_RX*/
          TKL_BLE_DATA_REPORT_T           data_read;      /**< After we do read attr in central mode, we will get the callback*/
          TKL_BLE_SUBSCRBE_EVT_T          subscribe;      /**< ccc callback event, used with TKL_BLE_GATT_EVT_SUBSCRIBE*/
          TKL_BLE_READ_CHAR_EVT_T         char_read;      /**< read char event, used with TKL_BLE_GATT_EVT_READ_CHAR_VALUE*/
      } gatt_event;
  } TKL_BLE_GATT_PARAMS_EVT_T;
  ```

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gap_addr_set

```c
OPERATE_RET tkl_ble_gap_addr_set(TKL_BLE_GAP_ADDR_T const *p_peer_addr);
```

- 功能描述:

  设置Ble mac地址

- 参数：

  | 输入/输出 | 参数名      | 描述                         |
  | --------- | ----------- | ---------------------------- |
  | [in]      | p_peer_addr | mac 地址，可选 public/random |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

- **备注**

  一般模组经过生产已带有 mac 地址，无需配置。

## tkl_ble_gap_address_get

```c
OPERATE_RET tkl_ble_gap_address_get(TKL_BLE_GAP_ADDR_T *p_peer_addr);
```

- 功能描述:

  读取Ble设备mac地址

- 参数：

  | 输入/输出 | 参数名      | 描述        |
  | --------- | ----------- | ----------- |
  | [out]     | p_peer_addr | 设备mac地址 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

- **备注**

  很少使用

## tkl_ble_gap_adv_start

```c
OPERATE_RET tkl_ble_gap_adv_start(TKL_BLE_GAP_ADV_PARAMS_T const *p_adv_params);
```

- 功能描述:

  开启ble广播

- 参数：

  | 输入/输出 | 参数名       | 描述               |
  | --------- | ------------ | ------------------ |
  | [in]      | p_adv_params | 广播参数，如下所示 |

  **TKL_BLE_GAP_ADV_PARAMS_T**

  ```c
  typedef struct {
      uint8_t                 adv_type;                   /**< Adv Type. Refer to TKL_BLE_GAP_ADV_TYPE_CONN_SCANNABLE_UNDIRECTED etc.*/
      TKL_BLE_GAP_ADDR_T      direct_addr;                /**< For Directed Advertising, you can fill in direct address */

      uint16_t                adv_interval_min;           /**< Range: 0x0020 to 0x4000  Time = N * 0.625 msec Time Range: 20 ms to 10.24 sec */
      uint16_t                adv_interval_max;           /**< Range: 0x0020 to 0x4000  Time = N * 0.625 msec Time Range: 20 ms to 10.24 sec */
      uint8_t                 adv_channel_map;            /**< Advertising Channel Map, 0x01 = adv channel index 37,  0x02 = adv channel index 38,
                                                                  0x04 = adv channel index 39. Default Value: 0x07*/
  } TKL_BLE_GAP_ADV_PARAMS_T;
  ```

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gap_adv_stop

```c
OPERATE_RET tkl_ble_gap_adv_stop(void);
```

- 功能描述:

  关闭ble广播

- 参数：

  无

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gap_adv_rsp_data_set

```c
OPERATE_RET tkl_ble_gap_adv_rsp_data_set(TKL_BLE_DATA_T const *p_adv, TKL_BLE_DATA_T const *p_scan_rsp);
```

- 功能描述:

  设置广播数据

- 参数：

  | 输入/输出 | 参数名     | 描述         |
  | --------- | ---------- | ------------ |
  | [in]      | p_adv      | 广播数据     |
  | [in]      | p_scan_rsp | 扫描响应数据 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gap_adv_rsp_data_update

```c
OPERATE_RET tkl_ble_gap_adv_rsp_data_update(TKL_BLE_DATA_T const *p_adv, TKL_BLE_DATA_T const *p_scan_rsp);
```

- 功能描述:

  更新广播数据

- 参数：

  | 输入/输出 | 参数名     | 描述         |
  | --------- | ---------- | ------------ |
  | [in]      | p_adv      | 广播数据     |
  | [in]      | p_scan_rsp | 扫描响应数据 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gap_scan_start

```c
OPERATE_RET tkl_ble_gap_scan_start(TKL_BLE_GAP_SCAN_PARAMS_T const *p_scan_params)
```

- 功能描述:

  打开扫描

- 参数：

  | 输入/输出 | 参数名        | 描述               |
  | --------- | ------------- | ------------------ |
  | [in]      | p_scan_params | 扫描参数，如下所示 |

  **TKL_BLE_GAP_SCAN_PARAMS_T**

  ```c
  typedef struct {
      uint8_t                 extended;                   /**< If 1, the scanner will accept extended advertising packets.
                                                              If set to 0, the scanner will not receive advertising packets
                                                              on secondary advertising channels, and will not be able
                                                              to receive long advertising PDUs. */
      uint8_t                 active : 1;                 /**< [Tuya Need]!!!! If 1, perform active scanning by sending scan requests.
                                                              This parameter is ignored when used with @ref tkl_ble_gap_connect. */
      uint8_t                 scan_phys;                  /**< Refer to @TKL_BLE_GAP_PHY_1MBPS. TKL_BLE_GAP_PHY_2MBPS*/
      uint16_t                interval;                   /**< Scan interval in 625 us units. */
      uint16_t                window;                     /**< Scan window in 625 us units. */
      uint16_t                timeout;                    /**< Scan timeout in 10 ms units. */
      uint8_t                 scan_channel_map;           /**< Scan Channel Index, refer to @TKL_BLE_GAP_ADV_PARAMS_T*/
  } TKL_BLE_GAP_SCAN_PARAMS_T;
  ```

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

- 备注

  tkl_ble_gap_scan_start 在开启遥控器或支持 central 模式时使用。

## tkl_ble_gap_scan_stop

```c
OPERATE_RET tkl_ble_gap_scan_stop(void)
```

- 功能描述:

  关闭蓝牙扫描

- 参数：

​ 无

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gap_connect

```c
OPERATE_RET tkl_ble_gap_connect(TKL_BLE_GAP_ADDR_T const *p_peer_addr, TKL_BLE_GAP_SCAN_PARAMS_T const *p_scan_params, TKL_BLE_GAP_CONN_PARAMS_T const *p_conn_params)
```

- 功能描述:

  作为client时，发起连接。

- 参数：

  | 输入/输出 | 参数名        | 描述     |
  | --------- | ------------- | -------- |
  | [in]      | p_peer_addr   | 对端地址 |
  | [in]      | p_scan_params | 扫描参数 |
  | [in]      | p_conn_params | 连接参数 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

- **说明**

  只有作为 central 需要适配。

## tkl_ble_gap_disconnect

```c
OPERATE_RET tkl_ble_gap_disconnect(uint16_t conn_handle, uint8_t hci_reason);
```

- 功能描述:

  断开ble连接

- 参数：

  | 输入/输出 | 参数名        | 描述                                        |
  | --------- | ------------- | ------------------------------------------- |
  | [in]      | conn_handle   | 连接 handle                                 |
  | [in]      | hci_reason    | 断连原因，非异常情况下，主动断连使用 0x13。 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

- **备注**

  client 和 server 均会用到

## tkl_ble_gap_conn_param_update

```c
OPERATE_RET tkl_ble_gap_conn_param_update(uint16_t conn_handle, TKL_BLE_GAP_CONN_PARAMS_T const *p_conn_params);
```

- 功能描述:

  gap 连接参数更新

- 参数：

  | 输入/输出 | 参数名        | 描述        |
  | --------- | ------------- | ----------- |
  | [in]      | conn_handle   | 连接 handle |
  | [in]      | p_conn_params | 连接参数    |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gap_tx_power_set

```c
OPERATE_RET tkl_ble_gap_tx_power_set(uint8_t role, int tx_power);
```

- 功能描述:

  设置射频发射功率。

- 参数：

  | 输入/输出 | 参数名   | 描述                                                       |
  | --------- | -------- | ---------------------------------------------------------- |
  | [in]      | role     | 0：广播发射功率；1：扫描发射功率；2：连接发射功率。         |
  | [in]      | tx_power | 发射功率，放大 10 倍（例如 -75 表示 -7.5 dB，40 表示 4 dB）。 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gap_rssi_get

```c
OPERATE_RET tkl_ble_gap_rssi_get(uint16_t conn_handle);
```

- 功能描述:

  获取最后一次连接事件的接收信号强度。

- 参数：

  | 输入/输出 | 参数名      | 描述        |
  | --------- | ----------- | ----------- |
  | [in]      | conn_handle | 连接 handle |

- 返回值:

  - OPRT_OK : 成功读取 RSSI。
  - Others ：无可用采样。

## tkl_ble_gap_name_set

```c
OPERATE_RET tkl_ble_gap_name_set(char *p_name);
```

- 功能描述:

  设置蓝牙的 GAP 设备名称。

- 参数：

  | 输入/输出 | 参数名 | 描述         |
  | --------- | ------ | ------------ |
  | [in]      | p_name | GAP 名称字符串 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gatts_service_add

```c
OPERATE_RET tkl_ble_gatts_service_add(TKL_BLE_GATTS_PARAMS_T *p_service);
```

- 功能描述:

  gatt 添加服务，server 使用。

- 参数：

  | 输入/输出 | 参数名    | 描述      |
  | --------- | --------- | --------- |
  | [in/out]  | p_service | GATT 服务 |

  **TKL_BLE_GATTS_PARAMS_T**

  ```c
  typedef struct {
      uint8_t                     svc_num;                /**< If we only use service(0xFD50), the svc_num will be set into 1 */
      TKL_BLE_SERVICE_PARAMS_T    *p_service;
  } TKL_BLE_GATTS_PARAMS_T;
  ```

  **TKL_BLE_SERVICE_PARAMS_T**

  handle 下发时默认 0xFF，添加完服务之后会更新对应的 handle 值。

  ```c
  typedef struct {
      uint16_t                    handle;                 /**< After init the service, we will get the svc-handle */

      TKL_BLE_UUID_T              svc_uuid;               /**< Service UUID */
      TKL_BLE_SERVICE_TYPE_E      type;                   /**< Service Type */

      uint8_t                     char_num;               /**< Number of characteristic */
      TKL_BLE_CHAR_PARAMS_T       *p_char;                /**< Pointer of characteristic */
  } TKL_BLE_SERVICE_PARAMS_T;
  ```

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gatts_service_change

```c
OPERATE_RET tkl_ble_gatts_service_change(uint16_t conn_handle, uint16_t start_handle, uint16_t end_handle);
```

- 功能描述:

  向已订阅的对端指示属性分配发生变化。可选。

- 参数：

  | 输入/输出 | 参数名       | 描述                  |
  | --------- | ------------ | --------------------- |
  | [in]      | conn_handle  | 连接 handle           |
  | [in]      | start_handle | 受影响 handle 范围起始 |
  | [in]      | end_handle   | 受影响 handle 范围结束 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gatts_value_set

```c
OPERATE_RET tkl_ble_gatts_value_set(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 功能描述:

  gatt 更新属性值，如配置 read 特征值，可以使用该函数更新

- 参数：

  | 输入/输出 | 参数名      | 描述          |
  | --------- | ----------- | ------------- |
  | [in]      | conn_handle | 连接 handle   |
  | [in]      | char_handle | 特征值 handle |
  | [in]      | p_data      | 数据          |
  | [in]      | length      | 数据长度      |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gatts_value_get

```c
OPERATE_RET tkl_ble_gatts_value_get(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 功能描述:

  GATT读取属性值，暂未用到

- 参数：

  | 输入/输出 | 参数名      | 描述          |
  | --------- | ----------- | ------------- |
  | [in]      | conn_handle | 连接 handle   |
  | [in]      | char_handle | 特征值 handle |
  | [out]     | p_data      | 读取数据      |
  | [in]      | length      | 读取长度      |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gatts_value_notify

```c
OPERATE_RET tkl_ble_gatts_value_notify(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 功能描述:

  服务器发送通知数据。

- 参数：

  | 输入/输出 | 参数名      | 描述           |
  | --------- | ----------- | -------------- |
  | [in]      | conn_handle | 连接 handle    |
  | [in]      | char_handle | 特征值 handle  |
  | [in]      | p_data      | 通知的数据     |
  | [in]      | length      | 通知的数据长度 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gatts_value_indicate

```c
OPERATE_RET tkl_ble_gatts_value_indicate(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 功能描述:

  服务器发送指示数据。

- 参数：

  | 输入/输出 | 参数名      | 描述           |
  | --------- | ----------- | -------------- |
  | [in]      | conn_handle | 连接 handle    |
  | [in]      | char_handle | 特征值 handle  |
  | [in]      | p_data      | 指示的数据     |
  | [in]      | length      | 指示的数据长度 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gatts_exchange_mtu_reply

```c
OPERATE_RET tkl_ble_gatts_exchange_mtu_reply(uint16_t conn_handle, uint16_t server_rx_mtu);
```

- 功能描述:

  服务器配置 MTU，即通过向客户端发送交换 MTU 响应，回复客户端 MTU 交换的请求

- 参数：

  | 输入/输出 | 参数名        | 描述                  |
  | --------- | ------------- | --------------------- |
  | [in]      | conn_handle   | 连接 handle           |
  | [in]      | server_rx_mtu | server侧接收 mtu 大小 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gattc_all_service_discovery

```c
OPERATE_RET tkl_ble_gattc_all_service_discovery(uint16_t conn_handle);
```

- 功能描述:

  作为 central，发现对端的所有服务。

- 参数：

  | 输入/输出 | 参数名      | 描述        |
  | --------- | ----------- | ----------- |
  | [in]      | conn_handle | 连接 handle |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gattc_all_char_discovery

```c
OPERATE_RET tkl_ble_gattc_all_char_discovery(uint16_t conn_handle, uint16_t start_handle, uint16_t end_handle);
```

- 功能描述:

  作为 central，发现给定 handle 范围内的所有特征值。

- 参数：

  | 输入/输出 | 参数名       | 描述         |
  | --------- | ------------ | ------------ |
  | [in]      | conn_handle  | 连接 handle  |
  | [in]      | start_handle | 起始 handle  |
  | [in]      | end_handle   | 结束 handle  |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gattc_char_desc_discovery

```c
OPERATE_RET tkl_ble_gattc_char_desc_discovery(uint16_t conn_handle, uint16_t start_handle, uint16_t end_handle);
```

- 功能描述:

  作为 central，发现给定 handle 范围内某特征值的所有描述符。

- 参数：

  | 输入/输出 | 参数名       | 描述         |
  | --------- | ------------ | ------------ |
  | [in]      | conn_handle  | 连接 handle  |
  | [in]      | start_handle | 起始 handle  |
  | [in]      | end_handle   | 结束 handle  |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gattc_write_without_rsp

```c
OPERATE_RET tkl_ble_gattc_write_without_rsp(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 功能描述:

  作为 central，向特征值写入数据，不需要响应。

- 参数：

  | 输入/输出 | 参数名      | 描述          |
  | --------- | ----------- | ------------- |
  | [in]      | conn_handle | 连接 handle   |
  | [in]      | char_handle | 特征值 handle |
  | [in]      | p_data      | 写入数据      |
  | [in]      | length      | 数据长度      |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gattc_write

```c
OPERATE_RET tkl_ble_gattc_write(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 功能描述:

  作为 central，向特征值写入数据，需要响应。

- 参数：

  | 输入/输出 | 参数名      | 描述          |
  | --------- | ----------- | ------------- |
  | [in]      | conn_handle | 连接 handle   |
  | [in]      | char_handle | 特征值 handle |
  | [in]      | p_data      | 写入数据      |
  | [in]      | length      | 数据长度      |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gattc_read

```c
OPERATE_RET tkl_ble_gattc_read(uint16_t conn_handle, uint16_t char_handle);
```

- 功能描述:

  作为 central，读取特征值的数据。

- 参数：

  | 输入/输出 | 参数名      | 描述          |
  | --------- | ----------- | ------------- |
  | [in]      | conn_handle | 连接 handle   |
  | [in]      | char_handle | 特征值 handle |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_gattc_exchange_mtu_request

```c
OPERATE_RET tkl_ble_gattc_exchange_mtu_request(uint16_t conn_handle, uint16_t client_rx_mtu);
```

- 功能描述:

  通过向服务器发送交换 MTU 请求，发起 MTU 交换。

- 参数：

  | 输入/输出 | 参数名        | 描述                  |
  | --------- | ------------- | --------------------- |
  | [in]      | conn_handle   | 连接 handle           |
  | [in]      | client_rx_mtu | client 侧接收 mtu 大小 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_vendor_command_control

```c
OPERATE_RET tkl_ble_vendor_command_control(uint16_t opcode, void *user_data, uint16_t data_len);
```

- 功能描述:

  执行厂商自定义命令，通过蓝牙交换信息。

- 参数：

  | 输入/输出 | 参数名    | 描述         |
  | --------- | --------- | ------------ |
  | [in]      | opcode    | 操作码       |
  | [in]      | user_data | 命令数据     |
  | [in]      | data_len  | 命令数据长度 |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败

## tkl_ble_set_mode

```c
OPERATE_RET tkl_ble_set_mode(const BOOL_T enable, const uint8_t mode);
```

- 功能描述:

  设置 BLE 模式，用于 Wi-Fi/BLE 共存模式。

- 参数：

  | 输入/输出 | 参数名 | 描述               |
  | --------- | ------ | ------------------ |
  | [in]      | enable | `TRUE` 开启该模式  |
  | [in]      | mode   | BLE 模式           |

- 返回值:

  - OPRT_OK : 成功
  - Others ：失败
