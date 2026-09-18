---
title: "RDK-X5로 TuyaOpen"
noindex: true
---


## 프로젝트 개요

TuyaOpen의 RDK X5 SBC의 멀티 모달 에이전트를 실행, 클라우드 대신 보드의 통합 NPU에 AI inference와. Local processing handles the time-critical work; Tuya Cloud는 나머지에 연결됩니다.

이것은 하나의 작업 설정에서 "end-side AI + 클라우드 서비스 + 생태계 시너지" 패턴입니다. 가장자리에 NPU를 통합 한 ARM Cortex-A78AE CPU, 백 엔드에 Tuya Cloud, 하나의 프레임 워크를 통해 브리지 IoT 장치.

<p align="center">
  <img
    src="https://images.tuyacn.com/fe-static/docs/img/7a0fcb92-b721-4f38-8b32-3cb84aca785e.jpg"
    alt="TuyaOpen RDK-X5 Project Screenshot"
    style={{
      width: "80%",
      borderRadius: "12px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
    }}
  />
</p>

## 주요 특징

- **True Local AI Processing**: RDK X5 NPU 가속도
- **Multi-modal 에이전트 기능**: 비전, 오디오, 로컬 NPU에 의해 구동되는 텍스트 처리
- **Seamless IoT 장치 통합 **: 클라우드 연결
- **Hybrid AI 처리 **: NPU + 클라우드 AI
- ** 실시간 센서 데이터 처리**: Local NPU는 시간 기준의 작업을 처리합니다.
- **Edge 컴퓨팅 최적화 **: ARM 기반 SBC 전용 AI 가속
- **Local inference 기능**: 클라우드 의존성없이 장치에서 AI 모델을 직접 실행
- **TuyaOpen Framework 통합 **: 원활한 로컬 및 클라우드 AI 관현

## 기술 스택

- **TuyaOpen Framework **: 로컬 NPU + 클라우드 AI 기능을 갖춘 AIoT 운영 시스템 완료
- ** 기계설비 **: RDK X5 단일 보드 컴퓨터, 통합 NPU를 가진 팔 외피 A78AE CPU
- **AI 프로세싱**: 진정한 로컬 AI 가속 및 간섭을 위한 통합 NPU
- **Multi-Modal Capabilities**: TuyaOpen의 음성 상호 작용, 로컬 NPU 지원과 LLM 통합
- ** 연결성**: Wi-Fi, Bluetooth, IoT 장치 통신 및 클라우드 연결용 Ethernet
- ** 운영 시스템**: NPU 드라이버와 가장자리 컴퓨팅에 최적화된 Linux 기반 시스템
- **개발**: Python, C++, ARM 개발 도구 NPU 최적화
- **클라우드 통합 **: 하이브리드 로컬/클라우드 AI 오케스트라를 가진 Tuya Cloud 플랫폼 API

## 빠른 시작

1. RDK X5 개발 환경 설정
2. TuyaOpen 프레임 워크 및 의존성 설치
3. NPU 드라이버 및 AI 런타임 구성
4. IoT 장치 연결 설정
5. Multi-modal 에이전트 모델 배포
6. 클라우드 기반 동기화 구성
7. 로컬 AI 처리 능력 테스트

## 저작권 및 라이센스

이 프로젝트는 일부로 개발되었습니다.[모험 X 2025 항주 Hackathon](https://adventure-x.org/zh). 프로젝트 및 모든 구성 요소는 참여 팀 구성원 및 대회 참가자가 소유하고 있습니다. 모든 권리 보유



