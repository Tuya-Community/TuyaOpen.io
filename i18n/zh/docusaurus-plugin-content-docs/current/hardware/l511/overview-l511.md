---
title: L511 系列概述
description: TuyaOpen L511 系列型号、固件烧录与串口日志查看说明。
keywords:
  - L511
  - L511G-Y7PM
  - L511C-Y7PM
  - L511C-Y6
  - FlashTool
  - EPAT
---

# L511 系列概述

L511 是蜂窝通信模组系列，在 TuyaOpen 中通过蜂窝网络连接云端。本文介绍所涉及的型号，以及 Linux 编译、Windows 工具烧录和查看日志的参考流程。操作前请确认所用模组、开发板、SDK 版本及固件包相互匹配。

## 系列型号

| 文档型号 | 资料/SDK中的对应名称 | 说明 |
| --- | --- | --- |
| L511G-Y7PM | `L511G_Y7PM` | Y7PM 系列中的 G 版本。 |
| L511C-Y7PM | `L511C_Y7PM` | Y7PM 系列中的 C 版本；与 G 版本是不同目标，不能直接套用对方的配置、引脚或固件。 |
| L511C-Y6 | SDK 目标：`L511C_Y6E` | 请根据所用 SDK 配置和模组完整料号选择目标。 |

## 选择型号与项目配置

在 IDE 中创建项目时，选择与模组一致的 L511 型号。SDK 示例项目在应用目录运行 `tos.py config choice`，选择对应型号配置，再运行 `tos.py build`；详见[项目编译指南](../../quick-start/project-compilation.md)。

| 型号 | SDK 目标 | 配置项 |
| --- | --- | --- |
| L511G-Y7PM | `L511G_Y7PM` | `CONFIG_L511_MODEL_L511G_Y7PM=y` |
| L511C-Y7PM | `L511C_Y7PM` | `CONFIG_L511_MODEL_L511C_Y7PM=y` |
| L511C-Y6（Y6E） | `L511C_Y6E` | `CONFIG_L511_MODEL_L511C_Y6E=y` |

SDK 配置中三种目标均使用 `CONFIG_BOARD_CHOICE_L511=y`。检查项目配置：IDE 应用查看 `source/embedded/app_default.config`，SDK 示例查看应用目录中的 `app_default.config`；确认其中的 L511 型号配置项与实际模组相符。烧录时使用同一型号构建的固件和下载配置，不要混用不同型号的固件。

## 编译与准备固件

在 Linux 下编译固件，然后将输出文件复制到 Windows 可访问的位置，使用 FlashTool 烧录并用 EPAT 查看日志。固件路径避免使用中文字符。

烧录前准备：

- 与目标型号和 SDK 构建结果对应的下载配置文件（例如资料中的 `config_custom_usb.ini`）。
- 对应项目输出的固件包。参考资料示例选择文件名含 `_QIO_` 的 `.binpkg`；不同 SDK/项目的输出名称可能不同，应以该构建产物说明为准。
- USB 数据线、开发板及 Windows 串口驱动。
- [FlashTool V4.1.22](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/FlashToolV4.1.22_260518.zip)（49,779,561 bytes）。

## 使用 FlashTool 烧录

<figure>
  <img src="https://images.tuyacn.com/fe-static/docs/img/844970ab-7b69-47ef-8c34-8fcbfc9edc1a.png" alt="FlashTool 固件包与配置文件选择步骤" />
  <figcaption>FlashTool 固件包与配置文件选择步骤</figcaption>
</figure>

1. 解压 FlashTool，并将固件包放在不含中文字符的目录中。运行 FlashTool。
2. 用 USB 连接目标开发板，确认系统已识别其串口。
3. 让开发板进入下载模式。L511G 板进入下载模式的按键顺序：按下 BOOT 上拉按键，按下并松开 RST，再松开 BOOT。
4. 在 FlashTool 中选择进入下载模式后出现的烧录串口。
5. 加载与目标板/模组匹配的下载配置文件，再选择对应构建生成的固件包。
6. 点击 **Download**，观察工具状态区直至显示烧录结果。
7. 成功后按板卡说明重启设备。若失败，先核对目标型号、配置文件、固件包和串口，再重新进入下载模式后操作。

例如，构建产物可位于 `source/embedded/dist/<project>/L511G_Y7PM_download/config_custom_usb.ini`。实际路径以项目输出为准；下载配置和固件须对应同一型号。

## 使用 EPAT 查看日志

- [EPAT V1.3.261.570](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/EPAT_V1.3.261.570.zip)（22,400,621 bytes）。
- 固件构建输出中的日志数据库 `comdb.txt`。例如，构建产物可位于 `source/embedded/dist/<project>/L511G_Y7PM_download/`；使用本次固件生成的 `comdb.txt`。

1. 解压并启动 EPAT，连接开发板，确认设备已退出下载模式并完成重启。
2. 打开 **Database State**，点击 **Update**，再通过文件选择按钮定位当前固件对应的 `comdb.txt`。


   <figure>
     <img src="https://images.tuyacn.com/fe-static/docs/img/20aa634e-ee45-4134-b32f-6dbde0ddef9f.png" alt="EPAT Database State 窗口" />
     <figcaption>EPAT Database State 窗口</figcaption>
   </figure>

3. 再次点击 **Update** 完成数据库更新，然后关闭数据库窗口。
4. 选择设备的日志串口并打开日志查看。若存在多个串口，可逐个确认；设备处于下载模式时可能只显示一个串口。
5. 每次重新编译固件后，重新加载与该固件匹配的 `comdb.txt`，避免日志解析数据库与固件版本不一致。

## 型号文档

- [L511C/G-Y7PM 外设映射](l511c-g-y7pm/peripheral-mapping)
- [L511C/G-Y7PM 硬件资源](l511c-g-y7pm/hardware-resources)
- [L511C-Y6 外设映射](l511c-y6/peripheral-mapping)
- [L511C-Y6 硬件资源](l511c-y6/hardware-resources)

## 参考资料

- [L511-Y7B 系列规格书](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/L511-Y7B-series-spec.pdf)
- [L511-Y7B 系列硬件设计手册](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/L511-Y7B-hardware-guide.pdf)
- [CAT1-EVB V100 资料](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/CAT1-EVB_V100.pdf)
<figure>
  <img src="https://images.tuyacn.com/fe-static/docs/img/d71ead80-172c-4c4e-ad99-7571d731d179.jpg" alt="L511G-Y7PM 开发板渲染图" />
  <figcaption>L511G-Y7PM 开发板渲染图</figcaption>
</figure>

<figure>
  <img src="https://images.tuyacn.com/fe-static/docs/img/7b484f7a-146a-4377-be40-7f291dc4d57c.png" alt="L511G-Y7PM 开发板实物图" />
  <figcaption>L511G-Y7PM 开发板实物图</figcaption>
</figure>
