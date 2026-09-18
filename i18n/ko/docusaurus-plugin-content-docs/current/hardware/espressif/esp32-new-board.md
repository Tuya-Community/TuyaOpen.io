---
title: "새로운 ESP32 보드 추가"
description: "새로운 ESP32 보드를 TuyaOpen에 추가 - 대상 칩이 이미 지원되면 사용자 정의 ESP32 하드웨어에 대한 보드 지원 패키지를 만듭니다."
keywords:
  - esp32
  - new board
  - bsp
  - tuyaopen hardware
  - porting
---

사용자 정의 ESP32 하드웨어에 대한 TuyaOpen Board Support Package (BSP)를 만듭니다. 프로세스는 목표 칩이 ESP32 플랫폼에서 이미 지원되는지 여부에 따라 다릅니다.

## 대상 칩 지원
ESP32 플랫폼은 현재 다음과 같은 칩을 지원합니다.

|칩 칩|플랫폼 ID|
|------|-------------|
|ESP32 (클래식)|사이트맵|
|모델 번호: ESP32-C3|모델 번호: ESP32-C3|
|사이트맵|사이트맵|
|사이트맵|사이트맵|

위의 칩 중 하나를 사용하는 경우, 다음 명령을 실행하여 새 보드를 만듭니다.

```bash
tos.py new board
```

프롬프트를 따르십시오:

1. ** 플랫폼 선택 **: 제품 정보`ESP32`목록에서
2. **엔터 보드 이름**: 이름 입력

:::tip[네이밍 컨벤션]
패턴을 따르는 all-uppercase 문자와 밑줄을 사용합니다.`{VENDOR}_{CHIP}_{MODEL}`— 예를 들어,`WAVESHARE_ESP32S3_TOUCH_AMOLED`. 이름은 디렉토리 이름과 같이 사용됩니다.`BOARD_CHOICE`Kconfig의 값; 그들은 정확히 일치해야합니다 (case-sensitive). 더 자세한 내용은[공지사항](../../hardware/porting/new-board).
:::

도구는 자동으로:

- 아래 디렉토리 템플릿 만들기`boards/ESP32/{BOARD_NAME}/`:
  ```
  boards/ESP32/MY_CUSTOM_BOARD/
  ├── Kconfig           # Board-level Kconfig (chip selection, pin config)
  ├── CMakeLists.txt    # Build configuration
  ├── board_com_api.h   # Board common API declarations
  └── board_com_api.c   # Board common API implementation
  ```
- 새 보드 항목을 삽입`choice`관련 기사`boards/ESP32/Kconfig`

### 생성된 Kconfig 수정
이름 *`Kconfig`이처럼 보이는:

```kconfig
config CHIP_CHOICE
    string
    default "esp32s3"   # adjust to match your actual chip

config BOARD_CHOICE
    string
    default "MY_CUSTOM_BOARD"

config BOARD_CONFIG
    bool
    default y
```

(주)`CHIP_CHOICE`값은 지원된 칩 플랫폼에 해당합니다. 현재:`esp32`, `esp32c3`, `esp32c6`, `esp32s3`. 추가 값은 새로운 칩 플랫폼으로 사용할 수 있습니다.

보드의 주변 하드웨어를 기반으로 사용`select`내 계정`BOARD_CONFIG`필요한 기능 모듈 및 append board-specific 매개변수 옵션을 사용할 수 있습니다. 예를 들어, 터치 스크린 및 오디오 코덱이있는 ESP32-S3 보드는 다음과 같은 구성을 확장 할 수 있습니다.

```kconfig
config BOARD_CONFIG
    bool
    default y
    select ENABLE_AUDIO
    select ENABLE_ESP_DISPLAY
    select ENABLE_AUDIO_CODECS

config LVGL_ENABLE_TOUCH
    bool "Enable LVGL Touch Support"
    default y

config BOARD_LCD_DEFAULT_BRIGHTNESS
    int "Default LCD backlight (0-100)"
    range 0 100
    default 80
    depends on ENABLE_ESP_DISPLAY
```

### Board 하드웨어 코드 구현
Kconfig 편집 후, 보드 하드웨어 초기화 구현`board_com_api.c`.

템플릿은 빈을 생성합니다.`board_register_hardware()`기능. 오디오 코덱, 버튼, LED 및 기타 주변기기를 등록하려면 입력하세요:

```c
OPERATE_RET board_register_hardware(void)
{
    OPERATE_RET rt = OPRT_OK;

    // register audio codec
    TUYA_CALL_ERR_LOG(__board_register_audio());

    return rt;
}
```

표시를 가진 널을 위해, 또한 LVGL 초기화에 의해 요구된 이 3개의 기능을 실행하십시오:

```c
int board_display_init(void);
void *board_display_get_panel_io_handle(void);
void *board_display_get_panel_handle(void);
```

핀 번호, I2C 주소, I2S 채널 ID 및 기타 하드웨어 매개 변수는 매크로로 정의되어야한다`board_config.h`그리고 참조`board_com_api.c`. 기존 보드(예:`boards/ESP32/WAVESHARE_ESP32S3_Touch_AMOLED_1.8/`) 시작점으로.

### 계정 만들기
** 단계 1: 기본 컴파일 및 실행 확인**

GPIO 예제를 사용하여 보드 BSP가 올바르게 작동하도록하십시오.

```bash
cd examples/peripherals/gpio
```

ESP32 플랫폼 기본 설정로드 :

```bash
tos.py config choice
```

config 메뉴를 열고, **Choice a board** 를 선택한 다음 저장 및 종료:

```bash
tos.py config menu
```

구조와 섬광:

```bash
tos.py build
tos.py flash
```

번쩍이는 후에, 굳힌모를 확인하고 예상대로 달리는 serial 산출을 검사하십시오.

** 단계 2: Tuya Cloud 연결**

네트워크 및 Tuya Cloud 통신을 확인하기 위해 Switch 데모를 사용합니다.

```bash
cd apps/tuya_cloud/switch_demo
```

ESP32 플랫폼 기본 설정로드 :

```bash
tos.py config choice
```

config 메뉴를 열고, **Choice a board** 를 선택한 다음 저장 및 종료:

```bash
tos.py config menu
```

Tuya IoT 플랫폼에서 장치 자격 증명을 작성하십시오.`src/tuya_config.h`(보기)[장치 인증](../../quick-start/equipment-authorization)):

```c
#define TUYA_OPENSDK_UUID    "your_uuid"
#define TUYA_OPENSDK_AUTHKEY "your_authkey"
```

구조와 섬광:

```bash
tos.py build
tos.py flash
```

플래시 후, Tuya 앱을 사용하여 장치를 제공 (see[장치 페어링 w / 스마트 폰](../../quick-start/device-network-configuration)). 장치가 앱에서 온라인으로 나타나면 보드 적응이 완료됩니다.

---

## Target chip is not yet supported
If your target chip is not in the supported list, you do not need to create a new platform — the ESP32 platform itself is already integrated. You only need to add support for the new chip within the existing platform.

### Add chip support
**Register the chip name**

Add the new chip name to the `SUPPORT_CHIPS` list in `platform/ESP32/build_setup.py`, matching the `idf_target` identifier used by ESP-IDF:

```python
SUPPORT_CHIPS = [
    "esp32",
    "esp32c3",
    "esp32s3",
    "esp32c6",
    "esp32p4",   # new
]
```

Once registered, the build system will automatically call `install.sh {target}` during `platform_prepare` to install the toolchain for the new chip.

**Add chip-specific TKL driver support**

TKL driver files under `platform/ESP32/tuya_open_sdk/tuyaos_adapter/src/drivers/` use chip-conditional compilation for default pin assignments and peripheral behavior. When adding a new chip, add the corresponding `#elif defined(CONFIG_IDF_TARGET_ESP32XXX)` branches in the relevant files (e.g., `tkl_pwm.c`, `tkl_uart.c`) to define default pins for that chip.

**Create a base board**

Use `tos.py new board` to create a base board named after the chip model (e.g., for chip `esp32p4`, name the board `ESP32-P4`). Set `CHIP_CHOICE` in the generated `Kconfig` to the new chip name. This board serves as the minimal reference implementation for the chip and does not need to include any peripheral logic. For the creation steps, follow the [Target chip is supported](#target-chip-is-supported) workflow above.

**Verify compilation**

Select the newly created base board and run a build to confirm everything compiles cleanly:

```bash
cd examples/peripherals/gpio
tos.py config choice
tos.py config menu    # select the base board under "Choice a board"
tos.py build
```

A successful build confirms the new chip is fully integrated into the ESP32 platform. You can then proceed to create your actual custom board.

### Create the new board
Once chip support is in place, follow the complete [Target chip is supported](#target-chip-is-supported) workflow to create and adapt your board. The boards you adapt here are typically complete hardware products equipped with peripherals such as an audio codec, display, or touch screen — not bare chips.

## See also
- [ESP32 Quick Start](esp32-quick-start)
- [Create Board](../../hardware/porting/new-board)
