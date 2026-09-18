---
title: T3 모듈 개요
description: "T3 모듈 개요 - Tuya Wi-Fi 및 Bluetooth LE combo 모듈 TuyaOpen, T3 LCD DevKit 및 공유 T3 Kconfig 용 BSP 항목과 함께."
keywords:
  - t3 module
  - tuyaopen hardware
  - wi-fi
  - ble
  - t3 lcd devkit
---

## 제품정보
**T3** 시리즈는 Tuya Wi-Fi 및 Bluetooth LE combo 모듈입니다. TuyaOpen에는 BSP 항목이 포함되어 있습니다.`TuyaOpen/boards/T3/`**T3 LCD DevKit** 및 공유 T3 Kconfig, 그래서 표준 TuyaOpen 워크플로우로 T3 실리콘을 대상으로 데모 및 제품을 만들 수 있습니다.

**오디오:** T3 LCD DevKit 또는 T3 모듈에서 파생 된 사용자 정의 보드를 사용하는 개발자.

## 제품 정보
- BSP 핀 가정과 일치하는 T3 LCD DevKit 또는 기계설비.
- TuyaOpen SDK 및`tos.py`; 참조[빠른 시작](../../quick-start/index.md).

## TuyaOpen의 이사회 지원
|오시는길|제품정보|
|------|---------|
| `boards/T3/T3_LCD_DEVKIT/` |LCD DevKit BSP 소스 및 Kconfig.|
| `boards/T3/config/T3.config` |consolidated config 예제.|
| `boards/T3/Kconfig`, `boards/T3/TKL_Kconfig` |널과 TKL 선택권.|

T3 구성 선택`tos.py config choice`또는 파생`T3.config`, 그 후에 정유`tos.py config menu`.

## 특징 기대
- 무선, 기억 및 멀티미디어 기능은 정확한 T3 단위 및 당신의 활성화한 성분 (전시, 오디오, 등)에 달려 있습니다.
- LCD DevKit 배선과 기본 핀은 BSP에 정의되어 있습니다. 예를 들어 재규격하기 전에 하드웨어에 대해 확인하십시오.

## 이름 *
- 단위 datasheet:[T3-U 모듈](https://developer.tuya.com/en/docs/iot/T3-U-Module-Datasheet?id=Kdd4pzscwf0il)
- [지원되는 기계설비 명부](../index.md)
- [전시 운전사](../../peripheral/display)이름 *[주변 튜토리얼](../../peripheral/tutorials/display-driver-guide)DevKit에 패널을 사용하는 경우
