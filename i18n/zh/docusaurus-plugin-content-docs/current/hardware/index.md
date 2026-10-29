---
title: 硬件支持列表
description: "按系列列出 TuyaOpen 支持的 Wi-Fi 与 Bluetooth LE 双模芯片及开发板：覆盖 T 系列、ESP32 系列、Linux 平台，并提供数据手册与板卡概述入口。"
keywords:
  - 硬件支持列表
  - 芯片
  - 开发板
  - TuyaOpen 硬件
  - Wi-Fi
---

import ChipRow from '@site/src/components/ChipRow';

本页按系列列出 TuyaOpen 支持的芯片与开发板。不同平台的连接能力有所不同，可能包括 Wi-Fi、Bluetooth LE、蜂窝网络或其他接口。具体型号支持情况、引脚和下载资源请查看对应的系列与板卡文档。

## 支持的芯片

TuyaOpen 支持不同连接方式的芯片与模组，包括 Wi-Fi、Bluetooth LE 和蜂窝网络；具体接口取决于型号及 SDK 目标。

 - T 系列

<ChipRow 
   chipData={[
      { name: 'T2', img: 'https://images.tuyacn.com/fe-static/docs/img/b022216a-ea3f-445e-9811-367ab3e9edc5.png', link: 'https://developer.tuya.com/cn/docs/iot/T2-U-module-datasheet?id=Kce1tncb80ldq' },
      { name: 'T3', img: 'https://images.tuyacn.com/fe-static/docs/img/bff22e9e-dec5-43e5-a709-dddf57f33ee5.png', link: 'https://developer.tuya.com/cn/docs/iot/T3-U-Module-Datasheet?id=Kdd4pzscwf0il' },
      { name: 'T5AI', img: 'https://images.tuyacn.com/fe-static/docs/img/dd100f8c-f1cd-4f16-9bd3-bf894244f2eb.png', link: 'https://developer.tuya.com/cn/docs/iot/T5-E1-Module-Datasheet?id=Kdar6hf0kzmfi' }
   ]}
  imgWidth={150}
  imgHeight={150}
/>

关于 T2、T3 模组在 TuyaOpen 中的 BSP 路径与使用说明，见 [T2 模块概述](tuya-t2/overview-t2.md) 与 [T3 模块概述](tuya-t3/overview-t3.md)。

 - L511 系列

L511 系列文档覆盖 L511G-Y7PM、L511C-Y7PM 和 L511C-Y6。请查看 [L511 系列概述](l511/overview-l511.md)、[L511C/G-Y7PM 外设映射说明](l511/l511c-g-y7pm/peripheral-mapping.md)、[L511C/G-Y7PM 硬件资料与下载](l511/l511c-g-y7pm/hardware-resources.md)、[L511C-Y6 外设映射说明](l511/l511c-y6/peripheral-mapping.md)及 [L511C-Y6 硬件资料与下载](l511/l511c-y6/hardware-resources.md)。

 - 杰理（JieLi）系列

杰理两块开发板的外设映射见：[AC79_DevKitBoard（AC791 / WL82）](jieli/ac79-devkitboard-peripheral-mapping.md) 与 [AC792N_Develop_Board（AC792N / WL83）](jieli/ac792n-develop-board-peripheral-mapping.md)。

 - ESP32 系列

<ChipRow 
   chipData={[
      { name: 'ESP32', img: 'https://images.tuyacn.com/fe-static/docs/img/2182c6e6-75da-46ca-b5e1-9e4ffb9407ac.png', link: 'https://www.espressif.com.cn/sites/default/files/documentation/esp32_datasheet_cn.pdf' },
      { name: 'ESP32-C3', img: 'https://images.tuyacn.com/fe-static/docs/img/db03fab3-2885-44b8-ac23-219b255670fc.png', link: 'https://www.espressif.com.cn/sites/default/files/documentation/esp32-c3_datasheet_cn.pdf' },
      { name: 'ESP32-S3', img: 'https://images.tuyacn.com/fe-static/docs/img/2672ca08-06ca-4f19-8679-785d6d3463e6.png', link: 'https://www.espressif.com.cn/sites/default/files/documentation/esp32-s3_datasheet_cn.pdf' }
   ]}
  imgWidth={150}
  imgHeight={150}
/>

 - BEKEN 系列

<ChipRow 
   chipData={[
      { name: 'BK723N', img: 'https://images.tuyacn.com/fe-static/docs/img/5b6ee659-667f-49a5-a4e9-889d790d8958.png', link: 'https://developer.tuya.com/cn/docs/iot/cbu-module-datasheet?id=Ka07pykl5dk4u' }
   ]}
  imgWidth={150}
  imgHeight={150}
/>

 - LN 系列

<ChipRow 
   chipData={[
      { name: 'LN882H', img: 'https://images.tuyacn.com/fe-static/docs/img/6ee4b163-7a87-4e5b-b0e6-ed4c3530cffe.png', link: 'https://developer.tuya.com/cn/docs/iot/WL2H-U-Module-Datasheet?id=Kbohlj8eg19u5' }
   ]}
  imgWidth={150}
  imgHeight={150}
/>

## 开发板

TuyaOpen 目前支持以下开发板。

 - Tuya 系列

<ChipRow 
   chipData={[
      { name: 'T2-U 开发板', img: 'https://images.tuyacn.com/fe-static/docs/img/568d9bd5-f702-44b2-83d2-35ea8f056f60.jpg', link: 'https://developer.tuya.com/cn/docs/iot-device-dev/T2-U-development-board?id=Kckeahvfhu7v0' },
      { name: 'T5AI-Board 开发板', img: 'https://images.tuyacn.com/fe-static/docs/img/e8284567-2cde-43a7-b172-98c58f39ec25.png', link: 'https://tuyaopen.ai/zh/docs/hardware/t5-ai-board/overview-t5-ai-board' },
      { name: 'T5AI-Core 开发板', img: 'https://images.tuyacn.com/fe-static/docs/img/aa9cceee-b0ee-4bb3-8b93-8e6e2e0013a3.png', link: 'https://tuyaopen.ai/zh/docs/hardware/tuya-t5/t5-ai-core/overview-t5-ai-core' }
   ]}
   imgWidth={280}
   imgHeight={200}
/>

 - ESP32 系列开发板

<ChipRow 
   chipData={[
      { name: 'DNESP32S3-BOX', img: 'https://images.tuyacn.com/fe-static/docs/img/2672ca08-06ca-4f19-8679-785d6d3463e6.png', link: '/zh/docs/hardware/espressif/overview-esp32' },
      { name: 'ESP32S3 Bread Compact', img: 'https://images.tuyacn.com/fe-static/docs/img/2672ca08-06ca-4f19-8679-785d6d3463e6.png', link: '/zh/docs/hardware/espressif/overview-esp32' },
      { name: 'Waveshare ESP32-S3 AMOLED', img: 'https://images.tuyacn.com/fe-static/docs/img/2672ca08-06ca-4f19-8679-785d6d3463e6.png', link: '/zh/docs/hardware/espressif/overview-esp32' },
      { name: 'Waveshare ESP32-C6 DevKit', img: 'https://images.tuyacn.com/fe-static/docs/img/2672ca08-06ca-4f19-8679-785d6d3463e6.png', link: '/zh/docs/hardware/espressif/overview-esp32' }
   ]}
   imgWidth={280}
   imgHeight={200}
/>
