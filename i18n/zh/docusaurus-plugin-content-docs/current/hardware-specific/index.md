---
title: 硬件支持列表
---

import ChipRow from '@site/src/components/ChipRow';

## 概述

本文档旨在帮助开发者了解 TuyaOpen 项目支持的硬件平台，可以点击图片查看对应芯片的数据手册。

## 硬件平台

TuyaOpen 项目目前支持的芯片都是 WiFi&BLE 双模芯片，包含以下几种芯片和开发板：

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

TuyaOpen 项目目前支持以下开发板：

<ChipRow 
   chipData={[
      { name: 'T2-U 开发板', img: 'https://images.tuyacn.com/fe-static/docs/img/568d9bd5-f702-44b2-83d2-35ea8f056f60.jpg', link: 'https://developer.tuya.com/cn/docs/iot-device-dev/T2-U-development-board?id=Kckeahvfhu7v0', imgWidth: 400, imgHeight: 120 },
      { name: 'T5AI-Board 开发板', img: 'https://images.tuyacn.com/fe-static/docs/img/e8284567-2cde-43a7-b172-98c58f39ec25.png', link: 'https://tuyaopen.ai/zh/docs/hardware-specific/t5-ai-board/overview-t5-ai-board', imgWidth: 400, imgHeight: 325 }
   ]}
/>
