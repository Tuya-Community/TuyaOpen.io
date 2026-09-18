---
title: "가져 오기 1 : 시스템 및 로그"
description: "TuyaOpen porting을위한 최대 단계 1 - 칩의 RTOS 및 TuyaOpen의 OS 요약에 UART를지도하므로 시스템 부츠 및 인쇄 로그."
keywords:
  - tuyaopen porting
  - bring-up
  - system
  - logs
  - rtos
---

첫 번째 가져 오기 단계는 칩의 RTOS 및 TuyaOpen의 OS 요약에 UART를지도하므로 시스템 부츠 및 인쇄 로그. 이 모든 것은 그것에 달려있다 — 작업 스레드없이, 타이머, 그리고 콘솔 나중에 단계를 디버그 할 수 없습니다.

## 이름 *
당신의 칩에 TuyaOpen 부츠, 그것의 OS primitives (threads, mutexes, semaphores, 큐, 타이머, 힙) 당신의 RTOS에 실행, TuyaOpen 로그 출력은 UART에 나타납니다.

## 실행 파일
이 어댑터 파일은 아래에 생성됩니다.`platform/<your_chip>/tuyaos/`실행할 때`tos.py new platform`. 칩 SDK / RTOS를 호출하여 각 구현.

|파일 형식|당신이 구현하는 것|
|------|--------------------|
| `tkl_system.c` |재설정, 밀리 초 / 틱 시간, 임의 씨앗, 중요한 섹션 입력 / 출구, CPU 정보|
| `tkl_memory.c` | `malloc` / `free` / `realloc`당신의 heap에|
| `tkl_thread.c` |RTOS, 우선 매핑에 / 파괴 스레드 생성|
| `tkl_mutex.c` |Mutex create / 잠금 / 잠금 해제 (recursive)|
| `tkl_semaphore.c` |Semaphore 생성 / 대기 / 게시물|
| `tkl_queue.c` |Message queue 생성 / 전송 / 수신|
| `tkl_timer.c` |하드웨어 또는 소프트웨어 타이머 ISR 콜백|
| `tkl_output.c` |TuyaOpen는 콘솔에 로그인합니다 (보통 UART`printf`) |
| `tkl_uart.c` |UART init / 읽기 / 쓰기 - 로그를 지금 운반하고 나중에 디버그|

## 이름 *
- **시간 기본 첫번째.**`tkl_system_get_millisecond`/ tick는 수정되어야 합니다 — timers, timeouts, 그리고 구름 heartbeat 모두에 달려 있습니다.
- **문서** (`tkl_system_enter_critical`)는 실제로 면제/interrupts를 비활성화해야 합니다; 많은 나중에는 여기에서 no-op로 추적합니다.
- **`tkl_output`가장 작은 유용한 이정표입니다.** UART에 연결`printf`일찍 도착의 나머지는 관찰 할 수 있습니다.
- **지침 우선 매핑.** TuyaOpen 용도`TKL_THREAD_PRI_LOWEST … HIGHEST`; RTOS의 우선 순위에 이러한 맵.
- RTOS에 가까운 파일에서 시작[참고 항구](../bring-your-chip-to-tuyaopen#start-from-a-reference-port)SDK 호출을 대체합니다.

## 계정 만들기
제품정보`apps/tuya_cloud/switch_demo`(연결성 사용 가능), 플래시, 부팅. TuyaOpen 배너 및 정기 로그가 UART에 깨끗하게 인쇄 할 때 성공하고 장치가 충돌하거나 걸려지지 않습니다.

다음 :[가져 오기 2 : 플래시 및 저장](flash-and-storage).

## 더 보기
- [시스템 APIs 참조](../../../tkl-api/tkl_system)
- [TuyaOpen에 칩을 가져 오기](../bring-your-chip-to-tuyaopen)
