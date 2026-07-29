---
title: 固件烧录
description: "固件烧录页的完整参考——连接栏、Flash/Erase/Read/Authorize 四个标签、芯片清单表、多段烧录、擦除预设，以及右侧进度与日志面板。"
keywords:
  - tyutool 固件烧录
  - 擦除
  - 读取
  - 授权
  - 芯片型号
  - tuyaopen
---

本页是**固件烧录页**的完整参考：连接栏、Flash / Erase / Read / Authorize 四个标签、芯片清单表、多段烧录、擦除预设，以及右侧的进度与日志面板。

## 页面总览

页面分三部分：顶部连接栏 / 左侧操作卡片（四个标签）/ 右侧进度与日志面板。

<img src="https://images.tuyacn.com/fe-static/docs/img/b912cb9e-06be-4f46-b67a-5b2bb77cbabe.png" alt="Flash 页连接栏——串口下拉框、波特率、芯片选择器、状态点" width="800" />

*Flash 页连接栏——串口下拉框、波特率、芯片选择器、状态点。*

## 连接栏

- **串口**（每次展开时重扫）
- **波特率** —— `115200` / `460800` / `921600` / `1000000` / `1500000` / `2000000`，外加自定义（300–4,000,000）。Authorize 标签下为授权波特率。
- **芯片选择器** —— Authorize 下多出 `other` 选项。
- **状态点** —— 绿色 = 已连接就绪；灰/红 = 未连接或握手失败。

:::note[自动连接 / 自动释放]
操作开始时 tyutool 自动连接，完成后自动释放端口。
:::

## 选择芯片
权威芯片清单（来源：`chip-manifests.ts`）：

| 芯片(`-d`) | 烧录波特率 | 授权波特率 | Flash 容量 | 擦除预设 |
| :-- | :-- | :-- | :-- | :-- |
| `esp32` | 460800 | 115200 | 4 MiB | fullChip |
| `esp32c3` | 460800 | 115200 | 4 MiB | fullChip |
| `esp32c6` | 460800 | 115200 | 8 MiB | fullChip |
| `esp32p4` | 460800 | 115200 | 16 MiB | fullChip |
| `esp32s3` | 460800 | 115200 | 16 MiB | fullChip |
| `t5ai`(别名 `t5`) | 921600 | 115200 | 8 MiB | authInfo, fullChipNoRf |
| `t1` | 921600 | 115200 | 8 MiB | authInfo, fullChipNoRf |
| `t3` | 921600 | 115200 | 4 MiB | authInfo, fullChipNoRf |
| `t2` | 921600 | 115200 | 2 MiB | authInfo, fullChipNoRf |
| `bk7231n` | 921600 | 115200 | 2 MiB | authInfo, fullChipNoRf |
| `ln882h` | 115200 | 115200 | 2 MiB | fullChip |
| `other`(仅授权) | — | 115200 | — | 无 |

:::note
默认选中 `t5ai`；旧版 `t5`/`T5` 别名归一化为 `t5ai`。
:::

:::tip
烧录波特率可调高，但不建议超过 `2000000`。
:::

:::info
擦除要求 4 KiB 对齐（`0x1000` 倍数），仅 `other` 豁免。
:::

## Flash 标签 — 烧录
多段烧录：最多 10 段，每段含固件路径(`.bin`/`.hex`/`.elf`/`.img`)+起始/结束地址（十六进制）。新段起始默认=上一段结束；选固件后结束地址自动算 = start+文件大小。所有段填好才启用 Flash 按钮。

<img src="https://images.tuyacn.com/fe-static/docs/img/af308d43-05fc-4679-b995-63c0fdd6b6bb.png" alt="Flash 标签——多段烧录，含固件路径与起始/结束地址" width="800" />

*Flash 标签——多段烧录，含固件路径与起始/结束地址。*

:::tip
典型场景：bootloader + app 一次写入。
:::

## Erase 标签 — 擦除
按地址擦除（实时校验对齐）或用高级擦除预设（含义同[基础概念](./concepts.md)：`authInfo` / `fullChipNoRf` / `fullChip`）。执行前有确认对话框；地址不对齐时提供"对齐"操作。

:::danger[擦除会破坏数据]
擦除不可撤销。整片擦除清空 RF cal 可能导致设备无法连网。请先备份。
:::

<img src="https://images.tuyacn.com/fe-static/docs/img/cfffd52e-e0e3-4c91-ba9d-2866f85b6c69.png" alt="Erase 标签——按地址擦除与高级擦除预设" width="800" />

*Erase 标签——按地址擦除与高级擦除预设。*

## Read 标签 — 读取

用于备份。选择保存目录（Tauri）或让浏览器下载；默认文件名 `tyutool_read_<chip>.bin`；结束地址默认取芯片完整容量（整片读取）。文件已存在时选覆盖或追加时间戳。

:::note
部分芯片不支持读取。
:::

<img src="https://images.tuyacn.com/fe-static/docs/img/27b43691-ee35-417c-b92c-8d83b12c4a48.png" alt="Read 标签——把 flash 读取到文件用于备份" width="800" />

*Read 标签——把 flash 读取到文件用于备份。*

## Authorize 标签 — 授权

TuyaOpen UART 授权，写 `UUID` + `AuthKey`（掩码显示、不可复制）；有 Copy credentials 按钮。外部链接指向 TuyaOpen 授权购买与本地化文档。操作：

- **读取授权（Read Auth）** —— 只读，仅占用串口不写入。
- **授权（Authorize）** —— 写入；需先填好 `UUID` + `AuthKey`，并有确认流程。

:::danger
凭据妥善保管（购买来的）；`other` 芯片仅授权、无 flash 插件。
:::

<img src="https://images.tuyacn.com/fe-static/docs/img/08059a63-3fe3-4ecd-a946-f2d704ecc924.png" alt="Authorize 标签——UUID/AuthKey 输入（掩码），读取授权与授权操作" width="800" />

*Authorize 标签——UUID/AuthKey 输入（掩码），读取授权与授权操作。*

## 进度与日志

右侧常驻面板：分阶段进度条（每阶段主题色/百分比/indeterminate）+ 日志面板（锁定自动滚动/清空/复制）。

<img src="https://images.tuyacn.com/fe-static/docs/img/d83c06e7-63aa-4823-8c24-ca54f2abd0f9.png" alt="进度条与日志面板——分阶段进度与日志条目" width="800" />

*进度条与日志面板——分阶段进度与日志条目。*

## 端口占用

固件烧录页与[串口调试](./serial-debug.md)页共用同一批串口。

:::warning
端口被占用时 tyutool 请你先释放；可在串口调试开自动释放（见[串口调试](./serial-debug.md)）。
:::
