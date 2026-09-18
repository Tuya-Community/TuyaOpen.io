---
title: 언박싱 사용
description: "AI 하드웨어 언박싱 및 설정 가이드입니다. 지원되는 보드에 미리 컴파일된 TuyaOpen 펌웨어를 플래시하고 인증한 다음 Tuya IoT Cloud에 연결합니다."
keywords:
  - AI 하드웨어 언박싱 및 설정 가이드
  - TuyaOpen 언박싱
  - ESP32 펌웨어 플래시
  - IoT 디바이스 페어링 튜토리얼
  - Tuya IoT Cloud 빠른 시작
---

언박싱 사용은 미리 컴파일된 펌웨어를 지원되는 보드에 플래시하여 직접 빌드하지 않고도 Tuya IoT Cloud에 연결하고 Tuya Cloud 서비스를 시험해 보는 방법입니다. 보드를 빠르게 평가하려면 이 경로를 사용하세요. 소스에서 [TuyaOpen](https://github.com/tuya/TuyaOpen)을 빌드하고 컴파일하려면 이 페이지를 건너뛰고 [환경 설정](./enviroment-setup.md)부터 시작하세요.

## 준비
시작하기 전에 다음을 준비하세요.

- [TuyaOpen 지원 개발 보드 또는 모듈](../hardware/index.md#development-boards)
- USB 데이터 케이블
- Windows, Linux 또는 macOS가 실행되는 컴퓨터

## 펌웨어 다운로드
플래시하고 테스트할 펌웨어는 **[TuyaOpen 릴리스 페이지](https://github.com/tuya/TuyaOpen/releases)**에서 다운로드하세요.

보드에 맞는 칩과 애플리케이션을 [TuyaOpen 애플리케이션 목록](../cloud/overview#tuyaopen-application-list)에서 선택한 다음, 일치하는 미리 컴파일된 bin 파일을 다운로드하세요.

## 펌웨어 플래시
그래픽 [Tuya 범용 시리얼 도구](https://www.tuyaopen.ai/tyutool)의 `tyutool_gui`로 펌웨어를 플래시하세요. 단계별 절차는 [GUI - tyutool 그래픽 도구](../tos-tools/tools-tyutool.md#firmware-flashing)를 참고하세요.

## 디바이스 인증
디바이스를 Tuya IoT Cloud에 연결하려면 먼저 인증해야 합니다. `tyutool_gui`를 사용하여 [디바이스 인증](./equipment-authorization.md)을 수행하세요.

## 네트워크 설정
네트워크 설정은 디바이스를 Wi-Fi 라우터에 연결하고 Tuya IoT Cloud에서 활성화한 뒤 계정에 바인딩합니다. 이 작업에는 휴대폰의 **Smart Life** 앱이 필요합니다. 전체 절차는 [디바이스 네트워크 설정](./device-network-configuration.md)을 참고하세요.
