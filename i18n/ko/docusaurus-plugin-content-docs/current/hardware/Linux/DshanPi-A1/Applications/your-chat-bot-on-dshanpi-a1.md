---
title: "DshanPi-A1에서 your chat bot 실행"
description: "DshanPi-A1는 TuyaOpen your chat bot 음성 조수를 내장하고 스피커를 사용하여 Rockchip 하드웨어에 가져옵니다. 소리와 빌드를 구성하십시오."
keywords:
  - dshanpi-a1
  - your_chat_bot
  - tuyaopen hardware
  - voice assistant
  - rockchip
---

TuyaOpen을 실행[your chat 봇](https://tuyaopen.ai/docs/cloud/device-ai/demo-your-chat-bot)음성 조수[사이트맵](https://rockchip.100ask.net/en/docs/DshanPi-A1/intro/)널. Raspberry Pi와 달리 DshanPi-A1에는 내장 마이크와 스피커가 있으므로 두 개의 보드 별 단계는 내장 사운드 카드를 구성하고 웨이브 모델에서 펌웨어를 지적합니다.

## 자주 묻는 질문
자세히보기[빠른 시작](https://tuyaopen.ai/docs/quick-start)그리고 그 하위 섹션은:

- 설정하기[TuyaOpen 개발 환경](https://tuyaopen.ai/docs/quick-start/enviroment-setup).
- 제품정보[TuyaOpen 인증 코드](https://tuyaopen.ai/docs/quick-start/equipment-authorization). header-file 메소드가 권장됩니다.
- 이름 *[Device Network 구성](https://tuyaopen.ai/docs/quick-start/device-network-configuration).

:::note
`your_chat_bot`클라우드 기반 AI 응용 프로그램입니다. 기기가 연결하고 대응하기 전에 유효한 인증 코드())가 필요합니다.
:::

## 방법 찾기
DshanPi-A1는 2개의 건축 방법을 지원합니다:

- **Cross-compilation**: PC에 빌드, 다음 보드에 바이너리를 전송하고 그것을 실행.
- **Native build**: 보드에 직접 구축.

빌드 시스템은 현재 플랫폼을 감지하고 적절한 방법을 자동으로 선택합니다.

:::note
Cross-compilation은 macOS에서 지원되지 않습니다. Linux를 사용하거나 보드에 직접 구축하십시오.
:::

## 단계 1: 내장 사운드 카드 구성
DshanPi-A1에는 내장 마이크와 스피커가 있지만 사용하기 전에 구성해야 합니다.

### 오디오 라이브러리 설치
ALSA 라이브러리를 오디오 입력 및 출력에 설치하십시오.

```bash
sudo apt-get install libasound2-dev
```

### 출력을 구성
DshanPi-A1에는 2개의 오디오 산출이 있습니다: 헤드폰 잭과 내장 스피커. onboard 스피커를 기본 출력으로 설정하려면 오디오 구성 파일을 편집하십시오.

```bash
sudo vi /etc/asound.conf
```

다음 내용 추가:

```plaintext
pcm.speaker_r {
  type route
  slave.pcm "hw:0,0"
  slave.channels 2
  ttable.0.1 1
  ttable.1.1 0
  ttable.0.0 0
  ttable.1.0 0
}
```

저장 및 출구 (압출`ESC`, 유형`:wq`, 그 후에 압박`Enter`).

## 2 단계 : 깨진 단어 모델 구성
KWS (Keyword Spotting) 모델은 장치가 "H"(Hello Tuya)를 인식 할 수 있도록합니다. 모형 파일을 얻고, 그 후에 굳힌모를 점합니다.

### 모델 파일 얻기
** 옵션 1: 자동 다운로드**

DshanPi-A1 플랫폼에서 빌드 할 때 모델은 자동으로 다운로드됩니다.

```text
platform/LINUX/tuyaos_adapter/src/tkl_audio/models
```

** 옵션 2: 수동 다운로드**

다운로드`mdtc_chunk_300ms.mnn`이름 *`tokens.txt`으로`~/tuyaopen_models`:

```bash
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/mdtc_chunk_300ms.mnn
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/tokens.txt
```

코드의 기본 경로는`~/tuyaopen_models`. 다른 경로를 사용하려면 아래에 표시된 것과 같이 구성하십시오.

### 모델 경로 설정
1. 프로젝트 디렉토리로 이동:

   ```bash
   cd apps/tuya.ai/your_chat_bot
   ```

2. DshanPi-A1 구성 선택:

   ```bash
   tos.py config choice
   ```

메뉴에서, 선택`DshanPi_A1.config`.

3. 설정 메뉴 열기:

   ```bash
   tos.py config menu
   ```

4. 바로가기`(Top) → Choice a board → LINUX → TKL Board Configuration`.

5. 모델 파일의 실제 경로에 이러한 두 가지 옵션을 설정:
   - `KWS model file path`- 전체 경로`mdtc_chunk_300ms.mnn`
   - `KWS model token file path`- 전체 경로`tokens.txt`

### 설정 예
모델 파일이 있을 때`~/tuyaopen_models`, 이 같은 경로를 구성:

![TKL Board Configuration 메뉴에서 KWS 모델 경로 구성 보기](https://images.tuyacn.com/fe-static/docs/img/4e3897a7-6d32-40e2-b2bd-6d2a6497076e.png)

:::warning
경로를 올바르게 설정합니다. 그렇지 않으면 웨이브 기능은 작동하지 않습니다.
:::

## 바이너리를 전송 (크로스 컴파일 만)
PC에서 크로스 컴파일하면 내장된 실행을 보드에 복사`scp`:

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
