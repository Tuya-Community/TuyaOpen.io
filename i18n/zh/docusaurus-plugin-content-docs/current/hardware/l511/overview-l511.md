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

L511 是蜂窝通信模组系列，通过蜂窝网络连接涂鸦云。固件在 Linux 下编译，使用 Windows 工具烧录和查看日志。

## 选择型号与项目配置

在 IDE 中创建项目时，选择与模组一致的 L511 型号。SDK 示例项目在应用目录运行 `tos.py config choice`，选择对应型号配置，再运行 `tos.py build`；详见[项目编译指南](../../quick-start/project-compilation.md)。

| 型号 | SDK 目标 | 配置项 |
| --- | --- | --- |
| L511G-Y7PM | `L511G_Y7PM` | `CONFIG_L511_MODEL_L511G_Y7PM=y` |
| L511C-Y7PM | `L511C_Y7PM` | `CONFIG_L511_MODEL_L511C_Y7PM=y` |
| L511C-Y6（Y6E） | `L511C_Y6E` | `CONFIG_L511_MODEL_L511C_Y6E=y` |

三个型号均启用 `CONFIG_BOARD_CHOICE_L511=y`。IDE 项目检查 `source/embedded/app_default.config`；SDK 示例检查应用目录 `app_default.config`。配置、固件和下载文件须对应同一型号。

## 编译与准备固件

以下以 L511G_Y7PM 构建输出为例，将这些文件复制到 Windows，路径不要含中文。USB 数据线、开发板及 Windows 串口驱动也需备好。

- 下载配置：`source/embedded/dist/<project>/L511G_Y7PM_download/config_custom_usb.ini`
- 固件包：`source/embedded/dist/<project>/<project>_QIO_<version>.binpkg`
- [FlashTool V4.1.22](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/FlashToolV4.1.22_260518.zip)

## 使用 FlashTool 烧录

<figure>
  <img src="https://images.tuyacn.com/fe-static/docs/img/844970ab-7b69-47ef-8c34-8fcbfc9edc1a.png" alt="FlashTool 固件包与配置文件选择步骤" />
  <figcaption>FlashTool 固件包与配置文件选择步骤</figcaption>
</figure>

1. 解压并运行 FlashTool。
2. 用 USB 连接目标开发板，确认系统已识别其串口。
3. 让开发板进入下载模式。L511G 板进入下载模式的按键顺序：按下 BOOT 上拉按键，按下并松开 RST，再松开 BOOT。
4. 在 FlashTool 中选择进入下载模式后出现的烧录串口。
5. 加载与目标板/模组匹配的下载配置文件，再选择对应构建生成的固件包。
6. 点击 **Download**，观察工具状态区直至显示烧录结果。
7. 烧录成功后重启设备；若失败，重新进入下载模式再试。

## 使用 EPAT 查看日志

- [EPAT V1.3.261.570](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/EPAT_V1.3.261.570.zip)
- 使用固件生成的 `comdb.txt`，文件位于 `source/embedded/dist/<project>/L511G_Y7PM_download/`。

1. 解压并启动 EPAT，连接开发板，确认设备已退出下载模式并完成重启。
2. 打开 **Database State**，点击 **Update**，再通过文件选择按钮定位当前固件对应的 `comdb.txt`。


   <figure>
     <img src="https://images.tuyacn.com/fe-static/docs/img/20aa634e-ee45-4134-b32f-6dbde0ddef9f.png" alt="EPAT Database State 窗口" />
     <figcaption>EPAT Database State 窗口</figcaption>
   </figure>

3. 再次点击 **Update** 完成数据库更新，然后关闭数据库窗口。
4. 选择设备的日志串口并打开日志查看。若存在多个串口，可逐个确认；设备处于下载模式时可能只显示一个串口。
5. 每次重新编译固件后，重新加载与该固件匹配的 `comdb.txt`，避免日志解析数据库与固件版本不一致。

## 蜂窝联网与扫码绑定

蜂窝设备通过 SIM 卡上网，扫码用于将设备绑定到 App 账号，无需配置 Wi-Fi 名称和密码。参见[设备联网配置指南](../../quick-start/device-network-configuration.md)。

1. 在 `tuya_config.h` 中配置正确的产品 ID（PID）及该设备独立的 UUID 和 Authkey，然后编译并烧录固件。参见[获取开发者授权](../../faqs/get-developer-license.md)。
2. 断电后插入支持数据业务的 SIM 卡并接好蜂窝天线，再给设备上电联网。
3. 使用示例输出的二维码；若未输出，则按以下 URL 生成二维码：

   ```text
   https://smartapp.tuya.com/s/p?p=<pid>&uuid=<uuid>&v=2.0
   ```

   将 `<pid>` 替换为产品 ID，将 `<uuid>` 替换为设备授权 UUID；二维码中不要放入 Authkey。
4. 打开智能生活 App，点击右上角 **+** > **扫一扫**，扫描二维码绑定设备。手机和设备都需要能联网，且设备须处于待绑定状态。

通过 EPAT 日志区分 SIM/网络注册失败与云端绑定失败。遇到特定 SIM 网络问题时，检查 SIM 卡状态、信号，以及是否需要配置 `CONFIG_CELLULAR_APN`（部分物联网卡或专网卡需要）。

## 型号文档

- [L511C/G-Y7PM 外设映射说明](l511c-g-y7pm/peripheral-mapping)
- [L511C/G-Y7PM 硬件资料与下载](l511c-g-y7pm/hardware-resources)
- [L511C-Y6 外设映射说明](l511c-y6/peripheral-mapping)
- [L511C-Y6 硬件资料与下载](l511c-y6/hardware-resources)
