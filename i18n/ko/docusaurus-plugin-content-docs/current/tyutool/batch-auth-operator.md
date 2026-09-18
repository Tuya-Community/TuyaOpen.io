---
title: "Batch Auth : 운영자 가이드"
sidebar_label: 회사연혁
description: "배치 번쩍이는 및 허가를 위한 tyutool를 사용하는 통신수를 위해 — 윤곽, 배선, 달리기, 독서 결과, 아치, 안전을 통해 prep 체크리스트에서 do-it-in-order 워크플로."
keywords:
  - tyutool batch auth
  - operator guide
  - batch flashing workflow
  - archive
  - safety rules
  - tuyaopen
---

배치 번쩍이는 및 허가를 위한 tyutool를 사용하여**operators에 대한 서면** — "단일"주문, 기술 배경이 필요하지 않습니다.

:::note
Firmware 개발자가 읽어야 합니다.[개발자 가이드](./batch-auth-developer.md).
:::

순서에서 작업 흐름: **1 Pre-flight checklist → 2 구성 → 3 배선 및 시작 → 4 결과 읽기 · 문제 해결 · 안전 규칙**.

## 이 도구는
여러 개의 직렬 포트로 여러 장치를 연결하고 "시작"을 클릭하고 플래시 +는 동시에 저자화 코드가 Excel 시트에서 자동으로 읽습니다.

<img src="https://images.tuyacn.com/fe-static/docs/img/3e3b6ba5-5431-40cc-b108-f3bd08553c64.png" alt="Batch page — completion banner / dashboard (flash totals · auth totals · this batch) / config panel / toolbar (auto-assign · port filter · read-all · start-all) / port list" width="800" />

* 일괄 페이지 - 완료 배너 / 대시보드 (flash totals · auth totals · 이 일괄 처리) / 구성 패널 / 도구 모음 (자동 할당 · 포트 필터 · read-all · start-all) / 포트 목록. *

## Pre-flight 체크리스트
|제품 정보|그것을 아는 방법|
| :-- | :-- |
|데스크탑 tyutool|설치 및 출시|
|인증 코드 Excel|더 이상`UUID` + `AuthKey`열;에서 구매[카테고리](https://tuyaopen.ai/pricing) |
|장치 + 직렬 케이블|유선 및 장치는 다운로드 모드를 입력 할 수 있습니다|
|직렬 드라이버|CH340/CP2102/FT232 설치|
|Firmware 파일|더 보기`.bin`이 배치를 위해|

설치 패키지 (버전은 참고로 핀으로 꼿습니다 — 항상 체크[GitHub 출시](https://github.com/tuya/tyutool/releases)최신 정보:

|회사연혁|파일 형식|
| :-- | :-- |
|윈도우| `..._windows_x86_64_nsis_x.x.x.exe` |
|macOS (Universal)| `..._macos_universal_dmg_x.x.x.dmg` |
|리눅스| `..._linux_x86_64_appimage_x.x.x.AppImage`(시간)`chmod +x`처음)|

:::warning[T5/T5AI 배선]
이 장치에는 두 개의 직렬 포트가 있습니다. Flash/authorization 포트를 연결하려면 로그 포트가 없습니다.
:::

:::warning[Authorization 코드는 가치있는]
Excel을 안전하게 유지하십시오.
:::

### 구성 handoff
|Config 항목|개발자 필|연산자 verifies|
| :-- | :-- | :-- |
|칩 모형|₢ 킹`esp32` / `t5ai` |장치 일치|
|가동 형태|auth-only 대 플래시 그 후 (Path A/B)|"Flash 펌웨어" 스위치 일치|
|Firmware 파일 및 버전|파일명 + 버전| `batch-summary.json`기록 SHA256|
|플래시 배드 비율|전화기:+86-21-5929999 팩스:+86-21-5929999|자주 묻는 질문|
|Auth 배율|예. 115200|자주 묻는 질문|
|저장 형태|KV/OTP의|OTP → 단 하나 장치 검증 첫번째|
|Conflict 정책|건너뛰기|OTP만 건너뛰기|
|인증 시트|나머지 ≥ 이 배치에 새로운 장치|등록된 기기의 복구/레트리는 새로운 코드를 사용하지 않습니다.|
|공유하기|이름 *|**Confirm RTS는 핀을 재설정하기 위해 유선 **|
|MAC 고유성|각 MAC 글로벌 고유|tyutool does**not** 체크 MAC 분쟁 — duplicate MAC는 장치가 auth 코드를 공유합니다.|
|단일 장치 연기 시험|이름 *|사기 전에 완료|
|특별 노트| — |지원하다|

:::tip
뭔가 라인업하지 않는 경우, 중지 및 개발자와 확인 — 직접 구성을 변경하지 않습니다.
:::

## 작업 흐름
**Toolbox → 배치 플래시 & 오 **로 이동.

:::note
입력 한 첫 번째 시간, 불평함 대화 상자가 나타납니다 (비행 가능한 작동). "또 다시 표시하지 마십시오"을 틱 할 수 있습니다. 다시보기[지원하다](./settings.md#about).
:::

### 단계 1 - 구성
1. 칩 (ESP32/T5AI를 선택하십시오; auth 전용을 위해`other`).
2. 플래시 배드 비율.
3. Auth 배율.
4. 플래시 펌웨어 (flash-then-auth) 여부.
5. 펌웨어 파일 (local / default auth-firmware).
6. 펌웨어 위치를 선택하거나 버전을 선택하십시오.

<img src="https://images.tuyacn.com/fe-static/docs/img/54fcbb92-0ecd-491e-9b31-9d69a7da1a9c.png" alt="Configuration area — shared config panel" width="800" />

* 구성 영역 - 공유 구성 패널.*

1. 인증 시트를 선택 (`.xlsx`).
2. 통계보기 : 합계 / 사용 / 사용 / 나머지 (새 장치에 코드를 할당하면 나머지 > 0이 필요합니다. 이미 등록 된 장치를 복구 / 복원하는 것은 나머지 0과도 시작할 수 있습니다. 그들은 MAC에 의해 원래 코드를 찾을 수 있습니다).
3. 이미 허가를 실행하는 장치: Skip (recommended) / overwrite.

<img src="https://images.tuyacn.com/fe-static/docs/img/1af06abc-e83e-4714-9ab6-20f169839b1c.png" alt="Batch auth configuration — sheet statistics" width="800" />

*Batch auth 구성 - 시트 통계. *

(T5AI 전용) 저장 형태를 선택: KV는 rewritable 입니다; OTP는 한 번 쓰고 믿을 수 없습니다 (see[제품정보](#safety-rules)).

### 2 단계 - 배선 및 시작
:::tip
첫번째는 → 작은 배치 2–4 장치를 통해서 1개의 장치를 전부 실행합니다 → 그 후에 전체적인 배치.
:::

일단 유선, 2 단계:

1. Click**Auto-assign** (scans and add slots, "idle").
2. Click **8 이상의 idle 포트가 있다면, 확인 프롬프트가 먼저 나타납니다.

:::warning[시작 30초 전까지 체크인]
Handoff 시트에 대한 각 구성 라인을 다시 읽으십시오. OTP: 단일 장치 검증 완료?
:::

<img src="https://images.tuyacn.com/fe-static/docs/img/ba1412f6-fa8a-411d-b67c-cfbe3e4991b2.png" alt="Toolbar and port list — slots per port" width="800" />

*Toolbar 및 포트 목록 - 포트당 슬롯. *

:::note[기타 툴바 버튼]
**2 포트 필터 · 3 모든 읽기 (읽기 전용, 쓰기 없음) · 4 취소 · 5 Retry 실패 · 7 단일 포트를 읽으십시오 **.
:::

### 3 단계 — 대기 및 확인
1. 완료 될 때까지 대시보드를 시청하십시오 ( 배너 쇼 : 모든 성공 / 모든 실패 / 부분 성공 / 모든 건너뛰기).
2. 행에 의해 행을 검증 ( 실패, 재시 참조).
3. 전체 주문이 완료되면 "아카이브"를 클릭하십시오 (아카이브 중간 배치 라운드를 아카이브 할 필요가 없습니다).

<img src="https://images.tuyacn.com/fe-static/docs/img/15b90b10-3ea7-4ff5-8192-1aff75260d80.png" alt="Dashboard and completion banner (archive button on the right)" width="800" />

*Dashboard 및 완료 배너 (오른쪽에 아치 버튼).*

## 검색 결과
|주요연혁|이름 *|무엇을 할|
| :-- | :-- | :-- |
| `done` |완전한, 좋은 단위| — |
| `failed` |뚱 베어|이름 *|
| `skipped` |Already 권한, 정책 당 건너 뛰기| — |
| `no_code` |새로운 장치 하지만 나머지 = 0|시트와 재런을 위로|
|이름 *|진행 중|(주)|

## 팟캐스트
하나의 "모든 시작" = 한 라운드; 하나의 허가 시트 = 하나의 순서 (많은 라운드를 제외하고). 건축은 순서 당 입니다.

:::info
원클릭 아카이브: 디렉토리를 선택하고 타임스탬프 폴더를 만듭니다.`batch-archive_20260717-143205_esp32/`포함 : 허가 시트 복사 / 펌웨어 (SHA256) / logs.zip /`batch-summary.json` / `batch-slots.csv`. 요약`lastRun`CSV는 마지막 라운드의 스냅 샷입니다.
:::

아카이브 내용:

|파일 형식|그것은 무엇입니까?|
| :-- | :-- |
|Authorization-sheet Excel 복사|사용 된 시트|
|Firmware 파일|플래시`.bin` |
|로그아웃|압축 로그|
|일괄 처리-summary.json|실행 요약|
|배치 슬롯.csv|마지막 라운드의 퍼 슬롯 스냅 샷|
|Completion 배너 스크린 샷|옵션 기록|

:::warning
아카이브는 UUID + AuthKey를 포함 — 누출을 방지합니다. 문제 해결을 위해 로그 및 오류 정보 만 공유하십시오. 권한 시트를 보내지 마십시오.
:::

## 문제 해결
|증상|무엇을 할|
| :-- | :-- |
|앱이 열리지 않음 / 빈 화면|이름 *[FAQ · 리눅스 빈 창](./faq.md#linux-blank-window-webkit-compositing-failure) |
|포트가 나타나지 않습니다.|케이블 / 포트, 드라이버를 설치, 다른 응용 프로그램을 닫기 — 보기[FAQ · 포트](./faq.md#device--serial-port-not-in-the-dropdown) |
|모든 실패|단 하나 장치를 통해, 115200에 하락, 체크 전력 공급|
|Excel "파일 사용"|Excel/WPS 및 재 선택 닫기|
|Excel 시트 잘못된|자주 묻는 질문`UUID` + `AuthKey`열과 그 길이|
|자주 묻는 질문|에 대해[면책사항](#save-the-scene-first), 참조[자주 묻는 질문](./faq.md#how-to-report-a-bug-with-logs) |

### 을 저장 면 첫째
장면은 여전히 살고 있지만, "아카이브"를 클릭하여 모든 것을 저장하십시오. 그런 다음 수동으로 3 가지를 추가하십시오. UI 스크린 샷 (OthKey를 마스크, UUID는 숙박 할 수 있습니다) / 문제 장치 자체 (표시하고 그대로 설정하십시오) / 일렬로 설명.

:::note
기다리지 말고 누출하지 마십시오 : 같은 날 아카이브; 공유 할 때, 단지 로그 및 오류 정보를 제공합니다.
:::

## 안전 규칙
이것은 믿을 수없는 하드웨어 작업을 트리거하는 유일한 기능입니다.

:::danger[Rule 1 : OTP 쓰기가 불가능하다]
OTP (T5AI만)는 칩으로 허가를 한 번 점화하고 결코 undone일 수 없습니다. 잘못된 구성은 전체 배치를 파괴합니다. - 항상 하나의 장치를 실행하여 검증합니다.
:::

<img src="https://images.tuyacn.com/fe-static/docs/img/024dd799-e550-451b-8694-f7c8759242a1.png" alt="When OTP is selected, the UI warns the write cannot be undone" width="800" />

* OTP가 선택되면 UI가 undone이 될 수 없습니다.*

:::danger[Rule 2: 표시된 장치 "쓰기 후에 할 수 있는"는 측을 놓아야 합니다]
"cancelled-after-write"의 위험 배지를 운반하는 장치는 이미 작성한 허가를 가지고 있고 그들의 국가는 불확실하지 않습니다 - 그들은 직접 다시 실행하는 좋은 단위도 안전하지 않습니다. 그들을 분리하고 개별적으로 확인합니다.
:::
