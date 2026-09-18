---
title: Cloud 및 AI 개요
description: "TuyaOpen Cloud & AI overview — connect devices to an open source IoT cloud, run AI agents, and call OpenAPI to integrate IoT devices."
keywords:
  - open source cloud integration for iot
  - integrate iot device with open source cloud
  - tuya cloud iot
  - ai agent platform
  - iot openapi
---

## TuyaOpen 애플리케이션
TuyaOpen은 다양한 유형의 애플리케이션 개발을 지원하는 강력한 개발 플랫폼을 제공합니다.

### 핵심 장점
- **원스톱 개발**: 디바이스 연결부터 AI 기능까지 완전한 개발 솔루션을 제공합니다.
- **클라우드 서비스**: 안정적이고 신뢰할 수 있는 Tuya Cloud 플랫폼을 기반으로 합니다.
- **AI 통합**: 최신 인공지능 기술을 원활하게 통합합니다.
- **유연한 확장**: 사용자 지정 애플리케이션 개발을 지원합니다.

### 지원 애플리케이션 유형
- **tuya_cloud**: Tuya Cloud IoT 서비스에 연결해 지능형 디바이스를 제어합니다.
  - 디바이스 연결 및 관리
  - 원격 제어 기능

- **tuya.ai**: Tuya Cloud IoT 서비스에 연결하고 Tuya AI 서비스를 통합합니다.
  - 지능형 디바이스 제어
  - 세계 주요 대규모 모델 사용
  - 텍스트 및 음성 대화

### TuyaOpen 애플리케이션 목록
TuyaOpen은 현재 다음 `IoT` 애플리케이션을 제공합니다.
1. `switch_demo`는 모든 칩을 지원하는 IoT 디바이스 펌웨어입니다.

   [switch_demo 제품 복사](https://pbt.tuya.com/s?p=b38aaa08d42d0d90ce4cdda28af92cf7&u=6232683ef12714848fae37955806cb9e&t=1)

TuyaOpen은 현재 다음 `AI+IoT` 애플리케이션을 제공합니다.

1. `your_chat_bot`은 현재 T5AI와 ESP32-S3를 지원하는 AI 대화 로봇입니다.

   [your_chat_bot 제품 및 에이전트 복사](https://pbt.tuya.com/s?p=e766ed60b3a28ef8e381965cf0cbb035&u=6232683ef12714848fae37955806cb9e&t=1)

2. `duo_eye_mood`은 현재 T5AI를 지원하는 AI 양안 표정 대화 로봇입니다.

   [duo_eye_mood 제품 및 에이전트 복사](https://pbt.tuya.com/s?p=e766ed60b3a28ef8e381965cf0cbb035&u=6232683ef12714848fae37955806cb9e&t=1)

# 용어
## DP
DP는 Data Point의 약어이며, DP 포인트 또는 기능 포인트라고도 합니다. 스마트 디바이스가 제공하는 기능을 나타냅니다. Tuya Smart는 각 기능을 하나의 데이터 포인트로 추상화하며, 데이터 포인트는 boolean, enumeration, numeric 등 여러 유형으로 정의됩니다. 데이터 포인트에는 읽기 및 쓰기 속성이 있습니다. 예를 들어 양방향 스위치는 두 개의 데이터 포인트로 추상화할 수 있고, 각 데이터 포인트는 `True` 또는 `False` 값을 가질 수 있는 boolean 유형입니다. 데이터 포인트는 읽고 쓸 수 있습니다. 읽기는 스위치의 현재 값을 가져오는 것이고, 쓰기는 현재 값을 변경하는 것입니다.

## DPID
DPID는 지정된 통신 프로토콜에서 DP 이벤트의 ID입니다.

## DPCode
DPCode는 DP 이벤트의 고유 식별자입니다. 대부분의 경우 서로 다른 통신 프로토콜에서 동일한 DP 이벤트는 같은 DPCode를 사용합니다.

## 준비
애플리케이션 개발을 시작하기 전에 다음 준비를 완료하세요.

### 환경 설정
**Tuya 서비스에 액세스하려면 다음이 필요합니다.**
   - 1단계: [TuyaOpen 인증 코드](../quick-start/index.md#tuyaopen-authorization-code-acquisition)를 준비합니다.
   - 2단계: 펌웨어 플래시, TuyaOpen 인증 코드 입력, 시리얼 디버깅 등에 사용할 [Tuya Universal Serial Tool](https://www.tuyaopen.ai/zh/tyutool)을 받습니다.

### 기본 개발 모드
제공되는 모든 애플리케이션에는 제품 기능 구성과 에이전트 구성이 완료된 기본 [PID](../quick-start/index.md#pid)가 포함되어 있습니다. TuyaOpen 또는 AI 에이전트를 처음 사용하는 경우 먼저 기본 PID로 AI+IoT 제품 개발 흐름을 경험하는 것이 좋습니다.

PID는 생성자에게 귀속되므로 개발자는 기본 PID에 새 제품 기능을 추가할 수 없습니다.

제품 기능을 수정해야 한다면 먼저 TuyaOpen 개발 흐름에 익숙해진 다음 고급 개발 모드를 사용하세요. 직접 PID를 생성하거나 현재 제품의 기본 PID를 자신의 계정으로 복사해 수정할 수 있습니다.

### 고급 개발 모드
자체 애플리케이션을 개발하려면 다음 작업도 완료해야 합니다.

1. **IoT 애플리케이션 개발**:
   - 1단계: PID(Product Identifier)를 생성합니다.

2. **AI+IoT 애플리케이션 개발**:
   - 1단계: PID(Product Identifier)를 생성합니다.
   - 2단계: 에이전트를 생성하고 해당 제품 PID에 바인딩합니다.

3. **PID 및 에이전트 복사**

기본 PID와 동일한 기능의 제품을 빠르게 구성할 수 있도록 복사 기능을 제공합니다. 제품 유형에 따라 IoT 제품은 지능형 제어 기능인 [DP](#dp)만 복사하고, AI+IoT 제품은 현재 제품에 바인딩된 에이전트도 함께 복사합니다.

기본 PID를 개발자 계정으로 복사한 뒤 지능형 제어 기능 DP를 수정하거나 추가할 수 있으며, AI_IoT 디바이스 에이전트를 업그레이드하고 최적화할 수도 있습니다.

[TuyaOpen 애플리케이션 목록](#tuyaopen-application-list)에서 필요한 제품을 선택한 뒤 해당 링크를 클릭해 복사하세요.
