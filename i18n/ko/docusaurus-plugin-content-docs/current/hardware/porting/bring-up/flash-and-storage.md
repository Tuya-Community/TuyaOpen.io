---
title: "가져 오기 2 : 플래시 및 저장"
description: "TuyaOpen porting의 2 단계 가져 오기 - TuyaOpen Persistent 플래시 지역 및 Key-value 매장, 키 및 페어링 상태를 제공합니다."
keywords:
  - tuyaopen porting
  - bring-up
  - flash storage
  - tkl
  - littlefs
---

두 번째 단계는 TuyaOpen 당신의 칩의 플래시에 persist 자료. 장치 허가, 열쇠 및 페어링 상태는 재부팅을 살아야 합니다 — 그래서 이 단계는 장치가 구름에 대해 활성화 될 수 있기 전에 작동해야 합니다.

## 이름 *
TuyaOpen는 읽기, 쓰기 및 보존 된 플래시 지역을 지우며 키 값 저장소는 전력 사이클 전반에 걸쳐 데이터를 유지합니다.

## 실행 파일
|파일 형식|당신이 구현하는 것|
|------|--------------------|
| `tkl_flash.c` |플래시 읽기 / 쓰기 / 지우기, 그리고 분할 정보 (기본 주소 + 크기) TuyaOpen에 대한 예약|
| `tkl_fs.c`* (선택) *|TuyaOpen의 내장 LittleFS 대신 **vendor SDK의** 파일 시스템을 사용하는 경우에만|

## 이름 *
- ** 사용하지 않는 플래시 지역을 보존합니다. ** 펌웨어 영역 밖에 지역을 선택, 당신의 플래시 지우개 granularity에 정렬, 에서 반환`tkl_flash.c`. 둘 다 TuyaOpen와 TuyaOS 상점 허가 자료 여기에서.
- **필수`ENABLE_FLASH`으로`tos.py config menu`— 이것은 필수입니다.
- ** 파일 시스템 선택 ** (`ENABLE_FILE_SYSTEM`):
  - **Disabled (시작 수정):** TuyaOpen는 AES128-CBC 암호화, 주소 및 크기로 내장 ** LittleFS**를 사용하고 있습니다.`tkl_flash.c`. 당신은 단지 실행`tkl_flash.c`.
  - **Enabled:** TuyaOpen는 공급 업체 파일 시스템을 사용 — 당신은 또한 적응`tkl_fs.c`.
- **Power-loss 안전.** Honor erase-before-write 및 정렬; granularity를 무시하는 플래시 어댑터는 예상치 못한 리셋에 KV 저장소를 손상시킵니다.

:::tip
왜 전용 지역? 페어링 후, 장치는 그 정체성과 열쇠를 플래시로 저장합니다. 통일하고 정확한 크기의 지역은 TuyaOpen (LittleFS)와 TuyaOS (KV)를 안전하게 보관하고 레이아웃을 재발하지 않고 두 개의 SDK를 전환 할 수 있습니다.
:::

## 계정 만들기
KV / storage API, 재부팅을 통해 값을 작성하고 변경되지 않았습니다. 종료: 한 번[클라우드 연결](cloud-connection)작동, 한 번 장치를 페어링하고 전원 사이클 후 활성화 유지 확인 (재선 없음) - 플래시 지역과 KV가 고체를 증명합니다.

다음 :[3 : Wi-Fi 및 네트워크](wifi-and-network).

## 더 보기
- [tkl flash 참조](../../../tkl-api/tkl_flash)
- [새로운 플랫폼에 적응](../porting-platform)- 플래시 예약 합리적
