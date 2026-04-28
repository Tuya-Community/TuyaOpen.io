---
title: BLE Peripheral 教程
---

## 概述

本教程说明 **BLE Peripheral（外设）** 示例：初始化为外设、设置广播与扫描响应数据、**开始广播**、接受中央设备连接（如手机 nRF Connect），并处理 GATT 相关事件（读更新、写入、订阅与通知、连接参数更新、MTU）。示例路径为 `examples/ble/ble_peripher`（仓库目录名为 `ble_peripher`）。

## 前置条件

- [环境搭建](../../quick-start/enviroment-setup)
- [TAL Bluetooth API 参考](tal-bluetooth-api)

## 要求

- 可构建 `examples/ble/ble_peripher` 且支持 BLE Peripheral。
- 一台 **BLE Central**（手机 nRF Connect、USB 适配器，或 [BLE Central 教程](ble-central-tutorial) 固件）。
- 串口日志便于查看事件。

## 步骤

1. 打开 `examples/ble/ble_peripher`。

2. 在 `tos.py config choice` 中选择支持 BLE 的板型。

3. 编译并烧录：

   ```bash
   cd examples/ble/ble_peripher
   tos.py config choice
   tos.py build
   ```

4. 启动后调用 `tal_ble_bt_init`，角色为 **`TAL_BLE_ROLE_PERIPERAL`**（与当前 SDK 源码中的枚举拼写一致），并注册事件回调。

5. 在 **`TAL_BLE_STACK_INIT`** 且 `init == 0` 时，示例调用 `tal_ble_advertising_data_set` 设置广播与 scan response，再 **`tal_ble_advertising_start(TUYAOS_BLE_DEFAULT_ADV_PARAM)`**。扫描响应中含 **Complete Local Name** `TY`，便于在 nRF Connect 中识别。

6. 由中央发起连接后，典型事件包括：**`TAL_BLE_EVT_PERIPHERAL_CONNECT`**（随后 `tal_ble_server_common_read_update`）、**`TAL_BLE_EVT_CONN_PARAM_UPDATE`**、**`TAL_BLE_EVT_MTU_REQUEST`**、**`TAL_BLE_EVT_SUBSCRIBE`**（示例可发 `NOTIFY ENABLED`）、**`TAL_BLE_EVT_WRITE_REQ`**、**`TAL_BLE_EVT_DISCONNECT`** 后再次 **`tal_ble_advertising_start`**。

**预期结果：** 设备以 **TY** 名称广播，可被连接并完成参数与 MTU 交换，可接收写入；断开后重新广播。

## 实现说明

- 示例中广播与 scan response 为 **31 字节** 数组。量产需按 Bluetooth SIG GAP 规范组织 AD 结构（长度、类型、数值）。
- 可与 Central 教程双板或手机对测。
- 更多 API 与错误处理见 [TAL Bluetooth API 参考](tal-bluetooth-api)。
- 流程图与日志说明见 `examples/ble/ble_peripher/README.md`。

## 参考

- 源码：`examples/ble/ble_peripher/src/example_ble_peripheral.c`
- [BLE Central 教程](ble-central-tutorial)
- [TAL Bluetooth API 参考](tal-bluetooth-api)
- [示例索引](../../examples/demo-generic-examples)
