---
title: 회사 소개
description: "tyutool 뒤에 vocabulary - 굳힌모, 번쩍이는, 지우개, 읽는, 허가, UART/baud, 칩 모형 및 terminology 당신은 각 페이지에 볼 것입니다."
keywords:
  - tyutool concepts
  - firmware
  - flashing
  - authorization
  - uart
  - baud rate
  - tuyaopen
---

버튼을 클릭하기 전에이 광택을 읽는 데 몇 분 걸리십시오. 나중에 페이지가 감지됩니다. 이 페이지는 개념뿐만 아니라 특정 작업을 다룹니다.

tyutool는 직렬 링크를 통해 장치에 대해 이야기합니다. UART 전기 신호로 USB-to-serial 어댑터를 통해 컴퓨터 여행의 tyutool에서 궁극적으로 플래시 칩을 읽고 쓰는 장치에서 SoC로 명령합니다. 아래 다이어그램은이 링크의 전체 지리학을 보여줍니다.

<img src="https://images.tuyacn.com/fe-static/docs/img/46fa5983-9af7-420b-ad00-564723b847cd.png" alt="Figure 1 — Topology of the flashing link from tyutool to the device: tyutool → USB → adapter → UART (TX/RX/GND) → SoC → Flash chip" width="800" />

*Figure 1 — tyutool에서 장치로 번쩍이는 연결의 토폴로지: tyutool → USB → 접합기 → UART (TX/RX/GND) → SoC → 섬광 칩.*

:::note[읽기 제안]
펌웨어 번쩍이는 새로운? 순서에 있는 첫번째 6개의 단면도를 읽으십시오; 단면도 7 및 8는 빠른 terminology 참고로 작동합니다.
:::

## 펌웨어는
Firmware는 장치의 플래시 칩에 저장된 프로그램입니다. ** 업그레이드 ** 장치 (추가 기능), ** 수리 ** ( 버그 수정), 또는 ** 사용자 정의 ** (자신 빌드로드). Firmware는 핵심에서 바이트 데이터의 블록입니다.

## 플래시는 무엇인가?
Flashing (또한 "burning"또는 "writing")은 장치의 플래시 칩으로 펌웨어 바이트를 쓰는 작업입니다. 링크는 다음과 같은 데이터를 운반 : 1 tyutool은 펌웨어를 읽고 블록으로 잘라 → 2 블록은 USB를 어댑터로 이동, UART로 변환 → 3 UART 라인 (TX / RX / GND)는 SoC에 도달, 플래시를 작성.

:::warning
Flashing 이다 a overwriting 쓰기. 중요한 데이터를 백업[이름 *](#read)처음.
:::

## 언어 선택
Erase는 플래시의 특정 영역을 삭제합니다.`0xFF`. 전형적인 용도: 쓰기 전에 지역을 삭제하거나 전체적인 칩을 지우기. 공급 능력:

|기타 제품|이름 *|
| :-- | :-- |
| `authInfo` |Erase는 펌웨어 및 기타 데이터를 유지, 인증 정보 영역 (UUID/AuthKey) 만 사용합니다.|
| `fullChipNoRf` |전체적인 칩을 삭제하고 RF 구경측정 (RF cal) 지역을 지킵니다|
| `fullChip` |전체 칩을 완전하게 (RF 구경측정 포함)|

:::tip
`fullChipNoRf`가장 많이 사용되는 "안전한 철저한 지우기"입니다.
:::

## 지원하다
읽음은 번쩍이는의 반전입니다: 그것은 백업 (전체 칩 읽기 또는 세그먼트에 의해 읽기)에 사용된 플래시 칩에서 바이트를 읽습니다.

## 이름 *
저자 (TuyaOpen UART auth) 쓰기`UUID` + `AuthKey`그래서 장치는 Tuya 구름에 연결할 수 있습니다. 권한 및 펌웨어는 두 개의 독립적 인 것들입니다.

:::danger
더 보기`UUID`이름 *`AuthKey`Tuya에서 **purchase**를 증명합니다. forged 또는 duplicate credentials는 장치 수영장을 오염시킵니다.
:::

Authorization에는 두 개의 작업이 있습니다. 저자화 읽기 (auth-read) 및 권한 쓰기 (auth-write).

## 직렬 / UART / 보드율
직렬 통신, USB에 직렬 어댑터 (CH340/CP2102/FT232), 3 UART 라인 (TX/RX/GND, 유선 교차) 및 보드율:

|Baud 비율|일반 사용|
| :-- | :-- |
| `115200` |가장 보편적 인, 가장 안정적인 기본 비율|
| `460800` |빨리, 아직도 reasonably 안정되어 있는|
| `921600` |고속; 그것을 지원하는 칩과 케이블을 답니다|

:::tip
시작하기`115200`가장 안전한 베팅입니다.
:::

## 칩 모형
칩 모델은 통신 프로토콜, 보드율 및 플래시 용량을 결정합니다. 전체 목록 보기[회사 소개](./flash.md#select-a-chip)그리고[명령 행](./cli.md).

## tyutool 용어
|(주)|이름 *|
| :-- | :-- |
|이름 *|플래시 칩으로 펌웨어를 쓰기|
|언어 선택|깨끗한 플래시 지구`0xFF` |
|지원하다|플래시 칩에서 바이트 읽기|
|이름 *|이름 *`UUID`/`AuthKey`한국어|
|한국어|독특한 장치 식별자 (credential)|
|오스키|UUID와 결합된 인증 키|
|뚱 베어|연속 통신 속도|
|우아트|TX/RX/GND 선에 직렬 프로토콜|
|관련 기사|멀티 세그먼트 플래시의 한 연속 펑크|
|구매하기|이름 지우기 범위 (e.g.`authInfo`) |
|주요 특징|장치의 매체 접근 제한 주소|
