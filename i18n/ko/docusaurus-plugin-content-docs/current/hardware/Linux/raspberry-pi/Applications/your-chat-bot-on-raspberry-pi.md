---
title: "Raspberry Pi에서 your chat bot을 실행하십시오."
description: "Raspberry Pi는 TuyaOpen your chat bot 음성 보조를 외부 사운드 카드로 실행합니다. 빌드 방법 및 포인트 펌웨어를 웨이브 단어에서 선택하십시오."
keywords:
  - raspberry pi
  - your_chat_bot
  - tuyaopen hardware
  - voice assistant
---

TuyaOpen을 실행[your chat 봇](https://tuyaopen.ai/docs/cloud/device-ai/demo-your-chat-bot)라즈베리 파이의 음성 조수. 이 가이드는 두 개의 지원 된 빌드 방법을 다룹니다, 외부 사운드 카드 보드 필요, 그리고 웨이브 모델에 펌웨어를 지적하는 방법.

## 자주 묻는 질문
자세히보기[빠른 시작](https://tuyaopen.ai/docs/quick-start)그리고 그 하위 섹션은:

- 설정하기[TuyaOpen 개발 환경](https://tuyaopen.ai/docs/quick-start/enviroment-setup).
- 제품정보[TuyaOpen 인증 코드](https://tuyaopen.ai/docs/quick-start/equipment-authorization). header-file 메소드가 권장됩니다.
- 이름 *[Device Network 구성](https://tuyaopen.ai/docs/quick-start/device-network-configuration).

:::note
`your_chat_bot`클라우드 기반 AI 응용 프로그램입니다. 기기가 연결하고 대응하기 전에 유효한 인증 코드())가 필요합니다.
:::

## 방법 찾기
Raspberry Pi는 두 가지 빌드 방법을 지원합니다:

- **Cross-compilation**: PC에 빌드, 그 후 라즈베리 파이에 이진을 전송하고 그것을 실행.
- **Native build**: 라즈베리 파이에 직접 구축.

:::note
Cross-compilation은 macOS에서 지원되지 않습니다. Linux를 사용하거나 보드에 직접 구축하십시오.
:::

## 외부 사운드 카드
Raspberry Pi에는 내장 마이크 또는 스피커가 없습니다. 외부 USB 사운드 카드가 필요합니다. 권장 모델:

- ** USB 오디오 모듈 YD1076** —[Taobao 링크](https://e.tb.cn/h.77Vo2K5tJIaL86g?tk=lnBAUbwVNB9)
- **Waveshare USB 사운드 카드 ** —[이름 *](https://www.waveshare.com/wiki/USB_TO_AUDIO?srsltid=AfmBOoqQpLSG-qO8REhn6lDsAIOOjskHyjkyJv0_4BKBo3_vqFqoTisL)

다른 호환 USB 사운드 카드도 작동합니다. 마이크는 원시 오디오 데이터를 출력해야합니다. 내장 소음 감소, 에코 취소 또는 이와 유사한 처리가 적용되지 않아야합니다.

## Wake-word 모델 구성
KWS (Keyword Spotting) 웨이브 모델은 장치가 웨이브 단어를 인식 할 수 있습니다. 모형 파일을 얻고, 그 후에 굳힌모를 점합니다.

### 모델 파일 얻기
** 옵션 1: 자동 다운로드**

Raspberry Pi 플랫폼을 선택하고 성공적으로 빌드 한 후 모델은 자동으로 다운로드됩니다.`platform/LINUX/tuyaos_adapter/src/tkl_audio/models`.

** 옵션 2: 수동 다운로드**

다운로드`mdtc_chunk_300ms.mnn`이름 *`tokens.txt`으로`~/tuyaopen_models`디렉토리:

```bash
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/mdtc_chunk_300ms.mnn
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/tokens.txt
```

코드의 기본 경로는`~/tuyaopen_models`. 다른 경로를 사용하려면 아래에 표시된 것과 같이 구성하십시오.

### 모델 경로 설정
1. 이름 *`tos.py`환경과 이동`apps/tuya.ai/your_chat_bot`이름 *
2. 지원하다`tos.py config choice`그리고 선택`RaspberryPi.config`구성.
3. 지원하다`tos.py config menu`그리고 탐색`(Top) → Choice a board → LINUX → TKL Board Configuration`.
4. 실제 위치에 다음 옵션을 설정`mdtc_chunk_300ms.mnn`이름 *`tokens.txt`:
   - `KWS model file path`
   - `KWS model token file path`

:::warning
Raspberry Pi 파일 시스템에 모델 파일을 배치하고 올바른 경로 설정. 그렇지 않으면 웨이브 기능은 작동하지 않습니다.
:::

### 설정 예
모델 파일이 저장될 때`~/tuyaopen_models`, 이 같은 경로를 구성:

![TKL Board Configuration 메뉴에서 KWS 모델 경로 구성 보기](https://images.tuyacn.com/fe-static/docs/img/4e3897a7-6d32-40e2-b2bd-6d2a6497076e.png)

## 바이너리를 전송 (크로스 컴파일 만)
PC에서 크로스 컴파일하면, Raspberry Pi에 내장 된 실행을 복사`scp`:

```bash
scp ./dist/your_chat_bot_1.0.1/your_chat_bot_QIO_1.0.1.bin username@192.168.1.xxx:~/
```

모수:

- `username`- 이사회의 사용자 이름
- `192.168.1.xxx`- 널의 IP 주소
- `~/`- 보드의 대상 디렉토리

## 실행을 실행
```bash
./your_chat_bot_QIO_1.0.1.bin
```

`your_chat_bot_QIO_1.0.1.bin`executable 파일명입니다.

첫 번째 실행에서, 당신은 장치 네트워크 구성을 수행해야합니다 (pairing). 페어링 또는 네트워크 연결이 실패하면 삭제`tuyadb`폴더가 다시 프로그램을 실행합니다.

## 제품 정보
** 목소리가 울리는 단어는 작동하지 않습니다. **

모델 파일 경로가 정확하고 파일이 완료된다는 것을 확인하십시오. 지원하다`ls -lh`파일이 존재하고 크기가 예상대로 있는지 확인합니다.

**실행은 실행되지 않습니다. **

executable이 권한을 실행했는지 확인하십시오. 지원하다`chmod +x your_chat_bot_QIO_1.0.1.bin`제출하기

## 더 보기
- [Raspberry Pi Provisioning 문제 해결](/docs/hardware/Linux/raspberry-pi/wifi-bluetooth)— 고정 프로비저닝, Wi-Fi 및 Bluetooth 문제.
- [라즈베리 파이 Peripherals](/docs/hardware/Linux/raspberry-pi/Examples/peripherals-raspberry-pi)- GPIO, I2C, SPI, PWM 및 UART 예제를 실행합니다.
