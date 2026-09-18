---
title: "시작하기: First Flash"
sidebar_label: 시작하기
description: "신선한 tyutool에서 도보는 5-10 분에서 성공적인 첫 번째 펌웨어 플래시에 설치 - prerequisites, 연결, 및 번쩍이는 단계."
keywords:
  - tyutool getting started
  - first flash
  - connect device
  - flashing
  - tuyaopen
---

import FeatureCardGrid from '@site/src/components/FeatureCardGrid';

이 페이지는 "내가 방금 앱을 다운로드했습니다"모든 방법을 "나는 첫 번째 장치를 플래시." 경로는 선형입니다 — 순서에서 그것을 읽고 당신은 일반적으로 5-10 분에서 당신의 첫번째 섬광을 완료할 것입니다.

:::tip[처음]
이전에 펌웨어를 사용하지 않은 경우, read[회사 소개](./concepts.md)처음.
:::

## 자주 묻는 질문
시작하기 전에이 체크리스트의 모든 것을 준비하십시오 - 번쩍이는 것은 하드웨어 및 소프트웨어를 모두 필요로하며 선택 사항이 없습니다.

- ** 지원되는 장치. ** tyutool는 Tuya 생태계 IoT 장치를 대상으로합니다; 정확한 지원된 칩 모형을 위해[펌웨어 플래시](./flash.md#select-a-chip)사이트 맵
- ** USB-to-serial 어댑터.** 장치의 UART (TX/RX/GND, 필요한 경우 전원)에 연결하십시오. Wiring은 **crossed**: 컴퓨터의 TX는 장치의 RX, 그리고 vice versa에 간다.
- ** 다운로드 / 플래시 모드에서 장치. ** 다른 장치는 다른 방법으로 이 형태를 입력합니다 (버튼 조합, 짧은 땜납 패드, 힘에 타이밍).

:::warning
Wiring 및 다운로드 모드를 입력하는 방법은 **device-specific** - 보편적 인 절차가 없습니다. 장치의 설명서 또는 확인[제품 정보](./faq.md#device--serial-port-not-in-the-dropdown)처음. tyutool ** cannot** 장치를 다운로드 모드로 전환하십시오. 수동으로 수행해야합니다. 장치가 다운로드 모드에서는 tyutool가 핸디케이크를 기다리지 않고 결국 시간. 이름 *[회사 소개](./concepts.md#serial--uart--baud-rate)관련 용어 (UART / 다운로드 모드 / 보드율).
:::

## 다운로드 및 설치
tyutool는 Windows, macOS 및 Linux를 위한 사전 제작된 설치 프로그램을 발송합니다. 프로젝트 README의 다운로드 테이블에 가서, 당신의 OS에 대한 빌드를 선택하고, 평소의 방법을 설치합니다. Common platform pitfalls (전체 세부 사항)[제품 정보](./faq.md)):

:::warning[macOS 직렬 권한]
macOS forbids 정상적인 사용자가 기본으로 직렬 장치에 액세스합니다. 사용자에게 추가`dialout`그룹, 그 후 ** 로그 아웃 및 뒷면 ** 효과에 대 한:

```bash
sudo dseditgroup -o edit -a $USER -t user dialout
```

이름 *[제품 정보](./faq.md#macos-serial-permission)더 보기
:::

:::warning[리눅스 빈 창]
일부 Linux 데스크톱 tyutool은 빈, 렌더링 된 창으로 시작합니다. 실행하기 전에 이 환경 변수를 설정하여 작업:

```bash
WEBKIT_DISABLE_COMPOSITING_MODE=1 ./tyutool-gui_linux_x86_64_appimage_x.x.x.AppImage
```

이름 *[제품 정보](./faq.md#linux-blank-window-webkit-compositing-failure)더 보기
:::

:::tip
이 snags는 ** 환경** 문제이며, tyutool 자체와 관련이 없습니다. 일단 해결되는 경향이 있습니다.
:::

## 첫 출시
일단 설치되면 tyutool를 시작합니다. 메인 창에는 두 개의 부분이 있습니다. 네비게이션 ** 사이드 바 ** 왼쪽과 오른쪽의 Active 기능을 위한 작업 공간. sidebar에는 4개의 주요 항목이 있습니다:

- ** 플래시 ** (펌웨어 번쩍이기) - 플래시, 읽기 및 플래시 칩을 지우십시오.
- **Serial Debug** - 실시간 직렬 데이터를 보내고 장치 로그를 검사합니다.
- **Toolbox** - 보조 도구 모음.
- ** 설정** - 경로, 로그 레벨 및 기타 응용 옵션을 구성합니다.

이 페이지의 나머지는 모두 ** 플래시 ** 페이지 - 첫 번째 플래시에 대해 걱정할 필요가있는 유일한 항목 포인트.

<img src="https://images.tuyacn.com/fe-static/docs/img/ef8a405b-26de-4d0e-8635-c1d699bd939b.png" alt="tyutool main window on the Flash page, with the serial dropdown open and showing detected ports" width="800" />

*tyutool 메인 창 플래시 페이지, 직렬 드롭 다운 개방 및 감지 된 포트와 함께. *

## 연결하기
배선이 검사되고 장치가 다운로드 모드에서, 이 순서에 tyutool에 연결 구축:

1. USB-to-serial 어댑터를 컴퓨터의 USB 포트에 연결합니다.
2. 플래시 페이지에서 ** 공중** 드롭다운을 클릭합니다.
3. 나열된 포트에서 어댑터를 선택하십시오 (예:`COM3` / `/dev/ttyUSB0` / `/dev/cu.SLAB_USBtoUART`).
4. 다음에 **status dot**를 보십시오: 녹색은 연결되고 준비되어 있습니다; 회색 또는 빨강은 연결되지 않습니다 또는 handhake 실패합니다.

포트를 선택 한 후, tyutool ** 자동 충전 ** 추천 된 보드율 및 칩 모델 - 당신은 그들을 받아 들일 수 있습니다. **Higher**는 더 빠르지만 실패에 더 많은 장점이 있습니다. **lower**는 더 느리지만 더 steadier입니다. 이름 *[회사 소개](./flash.md#flash-tab--flashing).

:::tip
드롭다운에서 포트 표시가 없는 경우, 먼저 어댑터를 플러그화하고 드라이버가 설치됩니다(CH340/CP2102/FT232), macOS/리눅스 직렬 액세스 권한 확인(설치 노트 참조).
:::

## 첫 번째 플래시 완료
장치가 연결되면 플래시 자체가 짧습니다. 첫 번째 펌웨어를 작성하기 위해 이러한 단계를 걸어:

1. ** 칩 모델을 선택하십시오.** 플래시 페이지의 상단에서 장치와 일치하는 칩을 선택하십시오. 모델은 통신 프로토콜 및 주소 레이아웃을 결정하고 잘못된 것을 선택하면 플래시가 실패합니다.
2. **펌웨어 선택.** Switch to the ** Flash** 탭, 펌웨어 파일을 선택, 그리고 선택`.bin`펌웨어.
3. **주소 확인.** 펌웨어를 선택한 후, 쓰기 주소는 **auto-filled**이며, 일반적으로 변경이 필요하지 않습니다.
4. ** 시작 번쩍입니다.** **Flash** 버튼을 클릭하여 작성을 시작합니다.
5. **Watch 진행.** 진행 막대기에 눈을 유지하고 아래 로그; 그것은 100 %로 꾸준히 발전해야합니다.
6. ** 재부팅에 대한 보증.** 끝을 쓸 때, device **reboots 자동으로 ** 새로운 펌웨어를 실행 - 당신의 첫 번째 플래시가 완료됩니다.

<img src="https://images.tuyacn.com/fe-static/docs/img/0ed7dcb2-e523-4dbc-a5a3-316a9fca19cb.jpg" alt="Flash page mid-flash — chip and firmware selected, port connected, and the flash in progress at 25%, with numbered callouts matching the steps above" width="800" />

* 플래시 페이지 중간 플래시 - 칩 및 펌웨어 선택, 포트 연결, 그리고 25%에서 진행 중 플래시, 위의 단계를 일치하는 숫자 통화. *

각 단계의 고급 옵션을 위해 (주소 tweaking, 지우기 전략, 검증, 저장 로그 등), 참조[회사 소개](./flash.md)사이트 맵

:::danger
번쩍이는 동안, **는 USB 케이블을 폐쇄하거나 전원을 잘라 - 당신은 데이터를 손상 할 수 있습니다. 플래시가 실패하면 첫 번째 드롭`115200`baud와 retry; 여전히 실패하면, 볼[제품 정보](./faq.md#flash-fails--handshake-fails).
:::

## 다음 단계
당신의 첫 번째 플래시에 축하합니다! 여기에서는 각 기능 페이지로 이동합니다.

<FeatureCardGrid
  items={[
    { icon: '⚡', title: 'Firmware Flash', description: 'Flash, read, and erase the flash chip.', href: '/docs/tyutool/flash' },
    { icon: '🖥️', title: 'Serial Debug', description: 'Send and receive serial data in real time and inspect device logs.', href: '/docs/tyutool/serial-debug' },
    { icon: '⚙️', title: 'Settings', description: 'Configure update, appearance, diagnostics, and log options.', href: '/docs/tyutool/settings' },
    { icon: '🏭', title: 'Batch Flash & Auth', description: 'Flash firmware and write authorization codes to many devices in parallel.', href: '/docs/tyutool/batch-flash-auth' },
    { icon: '⌨️', title: 'Command Line', description: 'The complete tyutool CLI reference.', href: '/docs/tyutool/cli' },
  ]}
/>
