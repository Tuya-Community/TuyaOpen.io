---
title: 회사 소개
description: "tyutool 플래시 페이지에 대한 전체 참조 - 연결 바, 플래시 / 엘리아스 / 읽기 / 탭, 칩 목록, 멀티 세그먼트 번쩍이고, 진행 / 로그 패널."
keywords:
  - tyutool firmware flash
  - erase
  - read
  - authorize
  - chip models
  - tuyaopen
---

이 페이지는 ** Firmware Flash** 페이지에 대한 완전한 참조입니다. 연결 바, 4 개의 탭 (플래시 / Erase / 읽기 / 권한), 칩 목록 테이블, 멀티 세그먼트 번쩍이, 지우기 사전 설정 및 오른쪽의 진행 및 로그 패널.

## 페이지 개요
페이지에는 세 개의 부분이 있습니다. 상단의 연결 바, 왼쪽의 작동 카드 ( 네 탭) 및 오른쪽의 진행 및 로그 패널.

<img src="https://images.tuyacn.com/fe-static/docs/img/b912cb9e-06be-4f46-b67a-5b2bb77cbabe.png" alt="Flash page connection bar — serial dropdown, baud rate, chip selector, status dot" width="800" />

* 플래시 페이지 연결 바 - 직렬 드롭다운, 보드율, 칩 선별기, 상태 도트. *

## 연결 바
- **Serial** (매번 열릴 수 있음)
- ** 보드율 ** —`115200` / `460800` / `921600` / `1000000` / `1500000` / `2000000`, 또한 관례 (300-4,000,000). Authorize 탭에서 이것은 저자화 배율입니다.
- **칩 셀렉터 ** — 아래 저자, 추가`other`옵션이 나타납니다.
- **Status dot** — 녹색 = 연결 및 준비; 회색/빨강 = 연결되지 않거나 핸디크 실패.

:::note[자동 연결 / 자동 해제]
tyutool는 당신이 가동을 시작하고 그것을 완료할 때 항구를 풀어 놓을 때 자동적으로 연결합니다.
:::

## 칩 선택
권위있는 칩 명부 (출처:`chip-manifests.ts`):

|칩 (`-d`) |플래시 baud|Auth 배드|공급 능력|공급 업체|
| :-- | :-- | :-- | :-- | :-- |
| `esp32` | 460800 | 115200 |4 미비|풀칩|
| `esp32c3` | 460800 | 115200 |4 미비|풀칩|
| `esp32c6` | 460800 | 115200 |8 미비|풀칩|
| `esp32p4` | 460800 | 115200 |16 미브|풀칩|
| `esp32s3` | 460800 | 115200 |16 미브|풀칩|
| `t5ai`(앨리스)`t5`) | 921600 | 115200 |8 미비|authInfo, 전체ChipNoRf|
| `t1` | 921600 | 115200 |8 미비|authInfo, 전체ChipNoRf|
| `t3` | 921600 | 115200 |4 미비|authInfo, 전체ChipNoRf|
| `t2` | 921600 | 115200 |2 미비|authInfo, 전체ChipNoRf|
| `bk7231n` | 921600 | 115200 |2 미비|authInfo, 전체ChipNoRf|
| `ln882h` | 115200 | 115200 |2 미비|풀칩|
| `other`(만)| — | 115200 | — |이름 *|

:::note
`t5ai`기본적으로 선택된다; 유산`t5`/`T5`aliases 정상화`t5ai`.
:::

:::tip
플래시 baud는 조정 가능하지만, 위 이동`2000000`권장하지 않습니다.
:::

:::info
Erase는 4 KiB 정렬을 요구합니다 (다중의`0x1000`); 만`other`구하다
:::

## 플래시 탭 — flashing
멀티 세그먼트 번쩍기 : 최대 10 세그먼트, 각 펌웨어 경로 (펌웨어 경로)`.bin`/`.hex`/`.elf`/`.img`) 및 시작 / 종료 주소 (hexadecimal). 새로운 세그먼트의 시작 기본 이전 세그먼트의 끝; 일단 당신이 펌웨어를 선택하면, 최종 주소는 시작 + 파일 크기로 자동 입력됩니다. 플래시 버튼은 모든 세그먼트가 채워진 한 번만 활성화됩니다.

<img src="https://images.tuyacn.com/fe-static/docs/img/af308d43-05fc-4679-b995-63c0fdd6b6bb.png" alt="Flash tab — multi-segment flashing with firmware path and start/end addresses" width="800" />

*Flash 탭 - 펌웨어 경로 및 start/end 주소와 멀티 세그먼트 번쩍입니다.*

:::tip
전형적인 사용 케이스: 1개의 통행에 있는 bootloader + app를 쓰십시오.
:::

## Erase 탭 - 지우기
Erase by address (alignment is validated in real time) or use the advanced erase preset (same 의미 as in in in in in in in in in[회사 소개](./concepts.md#authorize): `authInfo` / `fullChipNoRf` / `fullChip`). 확인 대화 상자가 실행하기 전에 실행됩니다. 주소가 정렬되지 않은 경우 "align" 동작이 제공됩니다.

:::danger[Erase는 데이터를 파괴]
Erase는 할 수 없습니다. RF cal 지역을 명확하게 하는 풀칩 지우는 것은 네트워크에 연결할 수 없는 장치를 떠날지도 모릅니다. 맨 위로.
:::

<img src="https://images.tuyacn.com/fe-static/docs/img/cfffd52e-e0e3-4c91-ba9d-2866f85b6c69.png" alt="Erase tab — erase by address and the advanced erase presets" width="800" />

*Erase 탭 - 주소와 고급 지우기 presets에 의해 지우기. *

## 탭 읽기 - 읽기
백업에 사용됩니다. 저장 디렉토리 (Tauri)를 선택하거나 브라우저 다운로드를하자; 기본 파일 이름은`tyutool_read_<chip>.bin`; 끝 주소는 칩의 가득 차있는 수용량 (whole 칩 읽기)에 과태합니다. 파일이 이미 존재한다면, overwrite를 선택하거나 타임스탬프를 추가하십시오.

:::note
몇몇 칩은 독서를 지원하지 않습니다.
:::

<img src="https://images.tuyacn.com/fe-static/docs/img/27b43691-ee35-417c-b92c-8d83b12c4a48.png" alt="Read tab — read the flash to a file for backup" width="800" />

*Read 탭 - 백업 파일에 플래시를 읽으십시오. *

## 권한 탭 — 인증
TuyaOpen UART 승인 쓰기`UUID` + `AuthKey`(가입되지 않는, 복사); 복사 압착 단추는 유효합니다. 외부 링크 포인트 TuyaOpen 인증 구매 및 현지화 문서. 가동:

- **Read Auth** — 작성자를 읽고, 포트를 보유하며 아무것도 쓰지 않습니다.
- ****Authorize** — 쓰기; 필요`UUID` + `AuthKey`먼저 채워진 확인 흐름을 실행합니다.

:::danger
자격 증명을 유지하십시오. 더 보기`other`칩은 권한만 지원하며 플래시 플러그인이 없습니다.
:::

<img src="https://images.tuyacn.com/fe-static/docs/img/08059a63-3fe3-4ecd-a946-f2d704ecc924.png" alt="Authorize tab — UUID/AuthKey entry (masked), read-auth and authorize actions" width="800" />

*Authorize 탭 — UUID/AuthKey 항목 (마스크로 처리), 읽기-auth 및 작업 승인.*

## 진행 및 로그
오른쪽에 항상 패널: 단계 진도 막대기 (각 단계에는 그것의 자신의 색깔, 백분율 및 indeterminate 국가가 있습니다) 플러스 통나무 패널 (toggle 자동scroll, 명확한, 사본).

<img src="https://images.tuyacn.com/fe-static/docs/img/d83c06e7-63aa-4823-8c24-ca54f2abd0f9.png" alt="Progress bar and log panel — phased progress with log entries" width="800" />

*Progress bar and log panel - 로그 항목으로 진행된 진행 상황.*

## 항구 contention
플래시 페이지는 직렬 포트의 동일한 세트를 공유합니다.[직렬 디버그](./serial-debug.md#auto-release--auto-save)사이트 맵

:::warning
포트가 바쁠 때, tyutool는 먼저 출시 할 것을 요청합니다. 직렬 디버그 (see)의 자동 릴리스에서 설정할 수 있습니다.[직렬 디버그](./serial-debug.md#auto-release--auto-save)).
:::
