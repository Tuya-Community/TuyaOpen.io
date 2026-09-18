---
title: T2 모듈 개요
description: "T2 모듈 개요 - Tuya Wi-Fi 및 Bluetooth LE combo 모듈은 보드 / T2 / T2U 및 호환 하드웨어에 대한 보드 지원과 함께 TuyaOpen에서 보드 지원을 지원합니다."
keywords:
  - t2 module
  - tuyaopen hardware
  - wi-fi
  - ble
  - t2-u
---

## 제품정보
**T2** 시리즈는 Tuya Wi-Fi 및 Bluetooth LE combo 모듈은 소형 모듈 폼 팩터와 무선 연결이 필요한 IoT 기기에 사용됩니다. TuyaOpen은 보드 지원을 제공합니다.`TuyaOpen/boards/T2/`따라서 T2-based 윤곽을 선택하고 다른 Tuya 칩을 위해 동일한 방법을 건축할 수 있습니다.

**오디오:** 개발자는 T2-U 또는 호환 하드웨어에 펌웨어를 올리거나 .

## 제품 정보
- T2에 근거를 둔 T2-U 개발 널 또는 제품 단위.
- TuyaOpen SDK와 함께`tos.py`환경; 보기[빠른 시작](../../quick-start/index.md).

## TuyaOpen의 이사회 지원
|오시는길|제품정보|
|------|---------|
| `boards/T2/T2-U/` |참조 보드 BSP (등록, CMake, Kconfig).|
| `boards/T2/config/T2.config` |예제 consolidated config 항목 포인트.|
| `boards/T2/Kconfig`, `boards/T2/TKL_Kconfig` |널과 TKL 특징 선택.|

제품 정보`tos.py config choice`응용 프로그램에서 T2를 대상으로 구성을 선택하거나 시작`T2.config`그리고 사용자 정의`tos.py config menu`.

## 특징 기대
- Wi-Fi 및 BLE 기능은 모듈 데이터 시트와 구성 가능한 TKL / TAL 옵션을 따릅니다.
- Peripheral와 핀 세부사항은 널 명세입니다; 당신의 schematic 및 널과 비교하십시오`board_com_api.h`/ 등록 코드`T2-U`.

## 이름 *
- 단위 datasheet:[T2-U 모듈](https://developer.tuya.com/en/docs/iot/T2-U-module-datasheet?id=Kce1tncb80ldq)
- T2-U dev 널:[T2-U 개발 보드](https://developer.tuya.com/en/docs/iot-device-dev/T2-U-development-board?id=Kckeahvfhu7v0)
- [지원되는 기계설비 명부](../index.md)
- [T5AI 핵심 개요](../tuya-t5/t5-ai-core/overview-t5-ai-core)(richer T-series 문서 패턴)
