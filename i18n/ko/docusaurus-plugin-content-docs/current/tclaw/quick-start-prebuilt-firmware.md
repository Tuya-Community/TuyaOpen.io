---
title: 사전 빌드된 펌웨어 플래시
description: "도구 체인없이 TClaw를 실행하십시오 : 릴리스 펌웨어를 다운로드하고 tyutool로 깜박이고 일련 CLI에서 자격 증명을 구성합니다."
keywords:
  - tclaw
  - prebuilt firmware
  - tyutool
  - serial cli
  - quick start
---

# 사전 제작 된 펌웨어를 플래시
널에서 실행되는 TClaw를 얻는 가장 빠른 방법: 풀어 놓인 이미지를 다운로드하십시오,
그것을 깜박이고 직렬 콘솔을 구성합니다. SDK, 도구 체인 없음, 없음
설치.

코드를 수정하려면, 이 페이지를 건너 뛰고 각보드 가이드로 이동합니다.
즉, 소스에서 빌드합니다.

:::주최[운반]
이 페이지는 MCU 보드 (T5AI 및 ESP32-S3)를 포함합니다. **Raspberry Pi 5** 및
**DshanPi A1**는 Flashed 것보다 기본 바이너리를 실행하는 Linux 대상입니다.
펌웨어 - [TClaw with Raspberry Pi 5](./ducky-quick-start-raspberry-pi-5.md)를 참조하십시오.
이 릴리스는 `_QIO_` 파일을 두 개의 보드뿐만 아니라, 빌드 이후
모든 구성을 균일하게 포장하지만,이 페이지의 흐름에 의해 사용되지 않습니다.
:::

## 1. 펌웨어 다운로드
릴리스는 모두에 게시됩니다.
[GitHub] (https://github.com/tuya/TClaw/releases/latest) 및
[Gitee](https://gitee.com/tuya-open/TClaw/releases) - Gitee 미러는 보통
중국 본토에서 빠른. 각 방출은 널 당 1개의 이미지를, 지명합니다 발송합니다
`TClaw_<BOARD>_QIO_<version>.bin`와 `SHA256SUMS.txt`. `<version>`는
프로젝트 버전은 펌웨어로 구운 (`1.0.0`), 릴리스 태그가 아닙니다 - 이동하지 마십시오
파일명에서 `2.1.0`를 찾고 있습니다.

|회사연혁|관련 상품|
| :-- | :-- |
|Tuya T5AI dev 보드 (3.5" LCD + 카메라)|`TClaw_TUYA_T5AI_BOARD_LCD_3.5_CAMERA_QIO_*.bin`를|
|Tuya T5AI dev 보드 (SD 카드 / 카메라 없음)|`TClaw_TUYA_T5AI_BOARD_LCD_3.5_CAMERA.NO_SDCARD_CAMERA._QIO_*.bin`를|
|Tuya T5AI 핵심|`TClaw_TUYA_T5AI_CORE_QIO_*.bin`를|
|ATK T5AI 소형 (2.4" LCD + 사진기)|`TClaw_ATK_T5AI_MINI_BOARD_2.4LCD_CAMERA_QIO_*.bin`를|
|Waveshare T5AI 터치 AMOLED 1.75"|`TClaw_WAVESHARE_T5AI_TOUCH_AMOLED_1_75_QIO_*.bin`를|
|ESP32-S3 (브레드 컴팩트 WiFi)|`TClaw_ESP32S3_BREAD_COMPACT_WIFI_QIO_*.bin`를|

`QIO`는 풀 플래시 이미지 - bootloader 및 응용 프로그램을 하나의 파일 - 그래서 그것은
다른 것을 처음 깜박이지 않고 빈 보드에서 작동합니다.

다운로드 검증:

```bash
sha256sum -c SHA256SUMS.txt --ignore-missing
```

## 2. tyutool 설치
[tyutool](/docs/tyutool)는 Tuya의 번쩍이는 도구입니다. 미리 설치된 데스크탑 다운로드
Windows, macOS, 또는 Linux를 위한 신청.

[시작하기](/docs/tyutool/getting-started)를 따라 설치합니다. 2 년
플랫폼 caveats는 수시로 비트:

- **macOS**는 일반 사용자에 대한 직렬 액세스를 차단합니다. tyutool를 참조하십시오.
자주 묻는 질문
- **Linux ** 데스크탑은 때로는 빈 tyutool 창을 렌더링합니다. FAQ에는
환경 변하기 쉬운 workaround.

## 3. 보드를 플래시
USB 데이터 케이블로 컴퓨터에 보드를 연결하고 그것에 넣어
** 다운로드 모드**. 다운로드 모드를 입력하는 방법 보드 별 (button combo,
솔더 패드, 파워 온 타이밍) - 탑승 설명서를 확인하십시오. tyutool는 할 수 없습니다
이 당신을 위해; 보드가 다운로드 모드에서되지 않은 경우, 번쩍이는.

그런 다음 tyutool의 ** 펌웨어 플래시 ** 페이지 :

1. ** 공중** 드롭다운을 열고 포트를 선택합니다. 상태는 다음에 그것
장치가 연결되고 준비되어 있을 때 녹색을 돌리십시오.
2. 페이지 상단의 **칩 모델**를 확인합니다. 항구 자동 채우기
권장 칩 및 보드율 - T5AI에 대한 `t5ai` 말한다
널 또는 ESP32-S3를 위한 `esp32s3`는, 틀린 칩이 섬광을 실패하기 때문에.
3. ** Flash** 탭에서 다운로드한 `.bin`를 선택하십시오. 쓰기 주소는
자동 충전 및 일반적으로 변경이 필요하지 않습니다.
4. 클릭 ** 플래시 **, 그리고 진행 표시 줄을 시청 하 고 아래 로그에 상승 100%.
5. device **reboots 자동적으로 ** 쓸 때 새로운 굳힌모로
끝.

[firmware flash guide](/docs/tyutool/flash)는 각 필드를 설명합니다.
사이트 맵

## 4. Tuya 자격 취득
2개의 다른 장소에서 3개의 가치. configuring 시작하기 전에 그들을 얻으세요 —
장치가 온라인에 올 수 없습니다.

|주요 특징|그것은 무엇입니까?|제품 정보|
| :-- | :-- | :-- |
|**PID **|제품 ID. 클라우드의 제품 정의에 장치를 삽입하고 해당 제품의 모든 장치에 의해 공유됩니다.| — |
|**UUID **|Per-device 식별자.|20 숯|
|**AuthKey **|Per-device 열쇠는, UUID에 1에 지도했습니다.|32 숯|

**PID.** 오픈
[TClaw 제품 템플릿](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2),
자신의 계정으로 복사 (또는 자신의 제품을 만들), 그리고 PID에서
제품 페이지.

**UUID + AuthKey. ** 이 둘은 함께 얻은 *license*입니다.
[Tuya IoT 플랫폼 → SDK 오픈] (https://platform.tuya.com/purchase/index?type=6).
각 장치에는 ** **** 라이센스가 필요합니다. - 한 라이센스는 정확히 하나의 장치를 승인합니다.

:::대형
**TuyaOpen 전용 라이센스**가 있습니다. 다른 소스의 라이센스,
TuyaOS 라이센스를 포함한 Tuya IoT Cloud에 연결할 수 없습니다.
TuyaOpen 프레임 워크.
:::

라이센스를 작성하는 다른 방법
[장치 구성](/docs/quick-start/equipment-authorization)

## 5. 연속되는 CLI를 형성하십시오
릴리스 이미지 ship ** credentials 없이 ** — 그들은, binaries 이후
관련 기사 당신은 번쩍이는 후에 그(것)들을, 직렬 콘솔에 공급합니다.

** 115200 baud **에서 포트를 열고 Enter 키를 눌러 프롬프트를 얻게 됩니다. tyutool의
[Serial Debug](/docs/tyutool/serial-debug) 페이지는 전체 직렬 터미널이며
이것을 위해 잘 작동합니다; `screen`, `minicom`, 또는 `picocom`는 일을 역시 합니다.

`help`는 `cfg_*` 명령을 나열합니다. 최소 출하:

```bash
# Tuya cloud credentials - required for the device to come online
cfg_set_product_id <product_id>
cfg_set_auth <uuid> <authkey>

# Choose one IM channel and set its token
cfg_set_channel_mode telegram      # telegram | discord | feishu | weixin | qqbot | OFF
cfg_set_tg_token <bot_token>

# Check what is actually in effect
cfg_show
```

:::대여
`cfg_*` 변경은 장치의 KV 저장에 저장되고 어느 것이 인지
펌웨어로 컴파일되었지만, **만 다시 연결 후 효과를 가져다
재부팅**.
:::

### 명령 참조
|이름 *|제품정보|
| :-- | :-- |
|`help`를|모든 명령을 나열|
|`cfg_show`를|효과적인 config (KV overrides는 build-time 값에 승리)|
|`cfg_reset`를|모든 KV를 삭제|
|`cfg_set_product_id <id>`를|Tuya 제품 ID|
|`cfg_set_auth <uuid> <authkey>`를|Tuya UUID 및 AuthKey|
|`cfg_set_device_id <id>`를|Device 식별자는 Gateway에보고|
|`cfg_set_channel_mode <mode>`를|다운로드|다운로드|다운로드|다운로드|다운로드|`OFF`를|
|`cfg_set_tg_token <token>`를|Telegram 봇 토큰|
|`cfg_set_dc_token <token>`를|Discord 봇 토큰|
|`cfg_set_dc_channel <id>`를|Discord 채널 ID|
|`cfg_set_fs_appid <id>`를|Feishu 앱 ID|
|`cfg_set_fs_appsecret <secret>`를|Feishu 앱 비밀|
|`cfg_set_fs_allow <csv>`를|Feishu 허용 목록|
|`cfg_set_qq_appid <id>`를|사이트맵 봇 앱 ID|
|`cfg_set_qq_secret <secret>`를|사이트맵 Bot 클라이언트 비밀|
|`cfg_set_ws_token <token>`를|WebSocket 서버 토큰|
|`cfg_set_gw_host <host>`를|OpenClaw 게이트웨이 호스트|
|`cfg_set_gw_port <port>`를|OpenClaw 게이트웨이 포트|
|`cfg_set_gw_token <token>`를|OpenClaw 게이트웨이 토큰|
|`cfg_set_proxy <host> <port> [type]`를|아웃바운드 프록시|
|`cfg_clear_proxy`를|아웃바운드 프록시|

## 다음 단계
- 스마트 라이프 앱과 엔드 클라우드 활성화 장치 쌍 -
각 보드 가이드 커버, 예. [TClaw with T5AI](./ducky-quick-start-T5AI.md).
- 에이전트 장치 측 기능을 제공하여
[하드웨어 주변 기술](./hardware-skill.md).
- [Lua 스크립팅](./lua-scripting.md)로 작은 장치 스크립트 실행
이 하나의 소스 빌드가 필요하므로 출하 보드 구성이 루아를 활성화합니다.
