---
title: "간단한 Tuya IoT 스위치"
noindex: true
---


## 프로젝트 개요
TuyaOpen의 최소 클라우드 연결 스위치 구축 - 플래시`switch_demo`, PID, UUID 및 AuthKey에 기입`tuya_config.h`, Tuya 앱에서 스위치를 제어합니다. 데모는 Tuya T5 / T2 / T1, ESP32 및 Linux SoC에서 실행되며 사용자 정의 장치를 구축하기 위해 확장되는 핵심 DP (Data Point) 제어 루프를 보여줍니다.

<p align="center">
  <img
    src="/img/projects/project-iot-switch.png"
    alt="IoT Switch Project Screenshot"
    style={{
      width: "80%",
      borderRadius: "12px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
    }}
  />
</p>

{/* Add screenshots or images of your project here */}

## 주요 특징
- 간단한 Tuya 클라우드 연결 스위치 장치
- 앱 기반 원격 제어
- Minimal와 easy-to-understand 코드베이스
- 보안 장치 인증 (PID, UUID, Auth Key)
- 다중 하드웨어 플랫폼 지원

## 지원되는 기계설비
- 하드웨어 플랫폼 / 칩 모델 : Tuya T5, Tuya T2, Tuya T1, ESP32, Linux SoCs 등

## 빠른 시작
1. TuyaOpen 저장소를 복제하거나 소스 코드를 다운로드합니다.
2. 개발 환경 설정[빠른 시작 가이드](/docs/quick-start/enviroment-setup).
3. Tuya Developer Platform에서 장치(UUID/Auth Key) 키 쌍을 가져옵니다.
4. credential 정보 업데이트`tuya_config.h`헤더 파일.
5. 당신의 장치에 굳힌모 및 섬광.
6. IoT 스위치를 실행하고 디버그합니다.

## 사용자 정의 기능 필요?
PID (Product ID)는 클라우드에서 제품 정의를 식별하고 연관시키는 고유 문자열입니다. 여러 센서 또는 여러 스위치에 대한 제어를 수행하려면 Tuya Developer Platform에서 자체 사용자 정의 장치 ( "제품")을 만들 수 있습니다.[이름 *](https://developer.tuya.com/en/docs/iot/create-product?id=K914jp1ijtsfe)자주 묻는 질문[DPs (데이터 포인트)](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-iot_abi_dp_ctrl?id=Kcoglhn5r7ajr). 이것은 클라우드를 통해 더 복잡하고 다양한 장치 기능을 달성 할 수 있습니다. 마지막으로, 장치에서 정의 된 제품의 PID를 업데이트`tuya_config.h`헤더 파일 및 새로운 DP 포인트에 대한 지원 개발 필요.

## 저장소 링크
<p align="center">
  <a
    href="https://github.com/tuya/TuyaOpen/tree/master/apps/tuya_cloud/switch_demo"
    target="_blank"
    className="button button--primary"
    style={{
      fontSize: "1.15rem",
      padding: "14px 2.5em",
      borderRadius: "16px",
      background: "linear-gradient(90deg, #4f8cff 0%, #38b2ac 100%)",
      color: "#fff",
      boxShadow: "0 4px 24px rgba(79,140,255,0.18), 0 1.5px 6px rgba(56,178,172,0.10)",
      border: "none",
      fontWeight: "bold",
      letterSpacing: "0.04em",
      transition: "transform 0.15s, box-shadow 0.15s",
      display: "inline-block"
    }}
  >
프로젝트 저장소로 이동
  </a>
</p>
