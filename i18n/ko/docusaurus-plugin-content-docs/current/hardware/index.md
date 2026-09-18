---
title: 지원되는 기계설비 명부
description: "TuyaOpen의 지원 하드웨어 목록 - Wi-Fi / BLE 칩 (T2, T3, T5AI), ESP32 및 Raspberry Pi dev 보드. 보드를 비교하고 핀 아웃, specs 및 다운로드를 찾습니다."
keywords:
  - tuyaopen supported hardware
  - iot development boards
  - esp32 vs t5
  - raspberry pi ai board
  - ai development board
---

import ChipRow from '@site/src/components/ChipRow';

이 페이지는 TuyaOpen 지원, 가족이 그룹화 한 칩 및 개발 보드를 나열합니다. 해당 칩 데이터 시트를 열려면 이미지를 클릭하십시오. board-specific specs, pinouts 및 다운로드를 위해, 아래 널 개관을 엽니다.

## 지원된 칩
TuyaOpen은 다음과 같은 가족을 통해 Wi-Fi 및 Bluetooth LE 듀얼 모드 칩을 지원합니다.

 - T 시리즈

<ChipRow 
   chipData={[
      { name: 'T2', img: 'https://images.tuyacn.com/fe-static/docs/img/b022216a-ea3f-445e-9811-367ab3e9edc5.png', link: 'https://developer.tuya.com/en/docs/iot/T2-U-module-datasheet?id=Kce1tncb80ldq' },
      { name: 'T3', img: 'https://images.tuyacn.com/fe-static/docs/img/bff22e9e-dec5-43e5-a709-dddf57f33ee5.png', link: 'https://developer.tuya.com/en/docs/iot/T3-U-Module-Datasheet?id=Kdd4pzscwf0il' },
      { name: 'T5AI', img: 'https://images.tuyacn.com/fe-static/docs/img/dd100f8c-f1cd-4f16-9bd3-bf894244f2eb.png', link: 'https://developer.tuya.com/en/docs/iot/T5-E1-Module-Datasheet?id=Kdar6hf0kzmfi' }
   ]}
  imgWidth={150}
  imgHeight={150}
/>

T2 및 T3 모듈 및 BSP 경로에 TuyaOpen-지향 노트를 위해, 참조[T2 모듈 개요](tuya-t2/overview-t2)이름 *[T3 모듈 개요](tuya-t3/overview-t3).

 - ESP32 시리즈

<ChipRow 
   chipData={[
      { name: 'ESP32', img: 'https://images.tuyacn.com/fe-static/docs/img/2182c6e6-75da-46ca-b5e1-9e4ffb9407ac.png', link: 'https://www.espressif.com.cn/sites/default/files/documentation/esp32_datasheet_en.pdf' },
      { name: 'ESP32-C3', img: 'https://images.tuyacn.com/fe-static/docs/img/db03fab3-2885-44b8-ac23-219b255670fc.png', link: 'https://www.espressif.com.cn/sites/default/files/documentation/esp32-c3_datasheet_en.pdf' },
      { name: 'ESP32-S3', img: 'https://images.tuyacn.com/fe-static/docs/img/2672ca08-06ca-4f19-8679-785d6d3463e6.png', link: 'https://www.espressif.com.cn/sites/default/files/documentation/esp32-s3_datasheet_en.pdf' }
   ]}
  imgWidth={150}
  imgHeight={150}
/>

 - BEKEN 시리즈

<ChipRow 
   chipData={[
      { name: 'BK723N', img: 'https://images.tuyacn.com/fe-static/docs/img/5b6ee659-667f-49a5-a4e9-889d790d8958.png', link: 'https://developer.tuya.com/en/docs/iot/cbu-module-datasheet?id=Ka07pykl5dk4u' }
   ]}
  imgWidth={150}
  imgHeight={150}
/>

 - LN 시리즈

<ChipRow 
   chipData={[
      { name: 'LN882H', img: 'https://images.tuyacn.com/fe-static/docs/img/6ee4b163-7a87-4e5b-b0e6-ed4c3530cffe.png', link: 'https://developer.tuya.com/en/docs/iot/WL2H-U-Module-Datasheet?id=Kbohlj8eg19u5' }
   ]}
  imgWidth={150}
  imgHeight={150}
/>

## 회사소개
TuyaOpen는 현재 다음과 같은 개발 보드를 지원합니다.

 - Tuya 시리즈

<ChipRow 
   chipData={[
      { name: 'T2-U Development Board', img: 'https://images.tuyacn.com/fe-static/docs/img/568d9bd5-f702-44b2-83d2-35ea8f056f60.jpg', link: 'https://developer.tuya.com/en/docs/iot-device-dev/T2-U-development-board?id=Kckeahvfhu7v0' },
      { name: 'T5AI-Board Development Board', img: 'https://images.tuyacn.com/fe-static/docs/img/e8284567-2cde-43a7-b172-98c58f39ec25.png', link: 'https://tuyaopen.ai/docs/hardware/t5-ai-board/overview-t5-ai-board' },
      { name: 'T5AI-Core Development Board', img: 'https://images.tuyacn.com/fe-static/docs/img/aa9cceee-b0ee-4bb3-8b93-8e6e2e0013a3.png', link: 'https://tuyaopen.ai/docs/hardware/tuya-t5/t5-ai-core/overview-t5-ai-core' }
   ]}
   imgWidth={280}
   imgHeight={200}
/>

 - ESP32 시리즈 개발 보드

<ChipRow 
   chipData={[
      { name: 'DNESP32S3-BOX', img: 'https://images.tuyacn.com/fe-static/docs/img/2672ca08-06ca-4f19-8679-785d6d3463e6.png', link: '/docs/hardware/espressif/overview-esp32' },
      { name: 'ESP32S3 Bread Compact', img: 'https://images.tuyacn.com/fe-static/docs/img/2672ca08-06ca-4f19-8679-785d6d3463e6.png', link: '/docs/hardware/espressif/overview-esp32' },
      { name: 'Waveshare ESP32-S3 AMOLED', img: 'https://images.tuyacn.com/fe-static/docs/img/2672ca08-06ca-4f19-8679-785d6d3463e6.png', link: '/docs/hardware/espressif/overview-esp32' },
      { name: 'Waveshare ESP32-C6 DevKit', img: 'https://images.tuyacn.com/fe-static/docs/img/2672ca08-06ca-4f19-8679-785d6d3463e6.png', link: '/docs/hardware/espressif/overview-esp32' }
   ]}
   imgWidth={280}
   imgHeight={200}
/>
