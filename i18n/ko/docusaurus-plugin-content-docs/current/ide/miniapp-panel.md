---
title: "미니 앱 패널"
description: "DP(Data Points)를 통해 펌웨어와 협력하는 휴대폰 앱용 디바이스 제어 패널을 만들고 바인딩, 미리 보기 및 게시를 수행합니다."
sidebar_label: "3 미니 앱 패널"
sidebar_position: 5
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - 임베디드 개발
---

이 실습에서는 Tuya 미니 앱 기술로 휴대폰 앱 안에서 실행되는 디바이스 제어 패널을 만들고 **DP(Data Points)**를 통해 펌웨어와 통신합니다. 펌웨어는 DP를 정의하고 보고하며, 패널은 DP를 읽고 전송합니다.

## DP를 통한 펌웨어와 패널의 협력 {/* #dp-model */}

- **펌웨어 측**: TuyaOpen IDE에서 `switch_led`와 같은 DP를 정의하고 보고합니다.
- **패널 측**: 미니 앱 API의 `publishDps`로 전송하고 `onDpDataChange`로 변경을 수신합니다.

:::note
**사전 요구 사항**: Tuya Cloud에 연결할 수 있는 디바이스가 하나 이상 필요합니다. 먼저 [실습 2](./chat-bot.md)에서 디바이스를 빌드하세요.
:::

## 1단계: 계정 및 제품 {/* #step-1 */}

1. **Mini App Panel Dev**를 열고 오른쪽의 세 단계를 따릅니다.
2. 실습 2에서 이미 로그인하고 제품을 바인딩했다면 개발자 플랫폼에서 바인딩할 미니 앱을 만듭니다.
3. 미니 앱을 생성한 후 IDE로 돌아와 패널을 개발하고 미리 봅니다.

## 2단계: 패널 개발

패널의 UI에서 제품 DP를 읽고 쓰도록 미니 앱 API를 연결합니다. 펌웨어가 보고한 값은 `onDpDataChange`에서 수신하고, 사용자가 조작한 값은 `publishDps`로 디바이스에 전송합니다.

## 3단계: 미리 보기 및 게시

미리 보기에서 디바이스 연결, DP 값 변경 및 UI 상태를 확인합니다. 테스트가 끝나면 패널을 게시하여 앱에서 사용할 수 있도록 합니다.

## 참고

- [your_chat_bot](./chat-bot.md)
- Tuya Developer Platform의 제품 DP 및 미니 앱 패널 설정
