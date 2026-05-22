---
title: BLE Central 教程
---

## 概述

本教程说明 **BLE Central（主机）** 示例：将协议栈初始化为中央设备、**扫描**广播、并在回调中处理 **`TAL_BLE_EVT_ADV_REPORT`**。主要接口为 `tal_ble_bt_init`（角色 `TAL_BLE_ROLE_CENTRAL`）、`tal_ble_scan_start` 与事件回调（打印对端地址、地址类型、RSSI、广播原始数据）。示例位于 TuyaOpen 仓库的 `examples/ble/ble_central`。

## 前置条件

- [环境搭建](../../quick-start/enviroment-setup)
- [TAL Bluetooth API 参考](tal-bluetooth-api)

## 要求

- 板级配置支持 BLE 且可构建 `examples/ble/ble_central`。
- 附近有 **BLE 外设**（手机 nRF Connect、另一块开发板，或 [BLE Peripheral 教程](ble-peripheral-tutorial) 中的设备）。
- 串口日志便于确认扫描输出。

## 步骤

1. 在 TuyaOpen 仓库中打开 `examples/ble/ble_central`。

2. 在 `tos.py config choice` 中选择支持 BLE Central 的板型。

3. 编译并烧录：

   ```bash
   cd examples/ble/ble_central
   tos.py config choice
   tos.py build
   ```

4. 启动后调用 `tal_ble_bt_init(TAL_BLE_ROLE_CENTRAL, __ble_central_event_callback)`，并用 `TAL_BLE_SCAN_PARAMS_T` 启动扫描（示例为主动扫描，interval/window 为 `0x400`，超时较大）。

5. 收到广播报告后，回调打印地址字节、**公共/随机**地址类型、**ADV** 类型、**RSSI** 以及 `p_data` / `data_len` 的十六进制，随后调用 **`tal_ble_scan_stop()`**（示例在回调中停止扫描）。

**预期结果：** 周边有外设时，日志出现 `TAL_BLE_EVT_ADV_REPORT`，含对端地址、RSSI 与广播数据。

## 实现说明

- Central 负责**扫描**；Peripheral 负责**广播**。可与 `examples/ble/ble_peripher` 双板对测。
- 按产品需求调整 `scan_cfg`（类型、间隔、窗口、超时、`filter_dup`）。结构体定义见 `tal_bluetooth.h` 中的 `TAL_BLE_SCAN_PARAMS_T`。
- 示例在回调里停止扫描；若需持续扫描，勿在每次报告后都 `tal_ble_scan_stop`，或按需重新 `tal_ble_scan_start`。
- 地址类型、AD 结构等背景见 `examples/ble/ble_central/README.md`。

## 参考

- 源码：`examples/ble/ble_central/src/example_ble_central.c`
- [BLE Peripheral 教程](ble-peripheral-tutorial)
- [TAL Bluetooth API 参考](tal-bluetooth-api)
- [示例索引](../../examples/demo-generic-examples)
