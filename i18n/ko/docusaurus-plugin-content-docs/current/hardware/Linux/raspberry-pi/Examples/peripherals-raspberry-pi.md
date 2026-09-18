---
title: "라즈베리 파이 Peripherals"
description: "TuyaOpen 용 Raspberry Pi 주변 장치 참조 - GPIO, I2C, SPI, PWM, UART, 버튼 및 TKL Linux 어댑터를 통해 오디오 코덱 예제를 활성화하고 실행합니다."
keywords:
  - raspberry pi
  - peripherals
  - tuyaopen hardware
  - gpio
  - i2c
---

TuyaOpen 주변 예제를 실행하십시오 (`examples/peripherals`) 라즈베리 파이에. 이 가이드는 GPIO, I2C, SPI, PWM, UART, 버튼 입력 및 오디오 코덱을 다룹니다. TKL API가 Linux 어댑터 지원 및 주변 장치 당 최소 예인 각 주변 장치를 활성화하는 방법.

## 빠른 시작
1. 기본 TuyaOpen 환경 설정을 완료하고 TuyaOpen 저장소 루트 디렉토리를 입력하십시오.
2. 설정 메뉴 열기:
  - 지원하다`tos.py config menu`
  - 널을 선택하십시오:`Choice a board → LINUX → Choice a board → RaspberryPi`
  - 모델 선택:`Raspberry Pi Board Configuration → Choose Raspberry Pi model → Raspberry Pi 5`(실제 모델에 따라 선택)
3. 필요한 주변 장치 활성화: 이동`Choice a board → LINUX → TKL Board Configuration`그리고 선택`ENABLE_GPIO`/`ENABLE_I2C`/`ENABLE_SPI`/`ENABLE_PWM`/`ENABLE_UART`.

![TKL Board Configuration 메뉴는 주변 장치에서 선택된 옵션을 제공합니다.](https://images.tuyacn.com/fe-static/docs/img/4b6127c5-ab9f-415a-b365-cb136467efed.png)

4. 해당 예제 디렉토리를 입력하십시오 (예를 들어`examples/peripherals/gpio`), 실행`tos.py build`, 다음 생성을 실행`*.elf`이름 *`sudo`.

:::note
Raspberry Pi는 크로스 컴파일과 기본 컴파일을 모두 지원합니다. 빌드 시스템은 현재 플랫폼에 따라 적합한 모드를 자동으로 선택합니다.
:::

## 일반 노트
- **Permissions**: 주변 예제는 일반적으로 액세스해야 합니다.`/dev/*`또는`/sys/class/*`. Raspberry Pi에서 실행할 때, 사용할 것이 좋습니다`sudo`.
- **장치 노드 **: 디바이스 노드 이름은 OS 이미지에 따라 다를 수 있습니다 (예를 들어, UART는 할 수 있습니다.`/dev/ttyAMA0`또는`/dev/ttyS0`). 노드 이름은 TuyaOpen 포트 매핑과 일치하지 않으면 실제 노드에 적응하거나 구성을 조정할 수 있습니다.
- **`OPRT_NOT_SUPPORTED`**: 몇몇 TKL 주변 API는 MCU/Linux를 통하여 통일된 요약을 위해 지켜집니다. Raspberry Pi (Linux userspace)에서 표준 인터페이스(i2c-dev/spidev/sysfs/tty/gpio-cdev와 같은)가 기능을 제공 할 수 없거나 추가 커널 드라이버/subsystems가 필요하지만 현재 어댑터에서 구현되지 않는 경우 API가 반환됩니다.`OPRT_NOT_SUPPORTED`.

## GPIO 예제
이 섹션은 TuyaOpen을 사용하는 방법을 보여줍니다. GPIO에서 Raspberry Pi.

### 어댑터 노트 (Linux TKL GPIO)
#### 지원 (사용 가능)
- 기본 읽기/쓰기
  - `tkl_gpio_init()` / `tkl_gpio_deinit()`: 리눅스 gpio-cdev를 기반으로 한 라인 핸들을 요청/출판`/dev/gpiochip*`).
  - `tkl_gpio_write()` / `tkl_gpio_read()`: 쓰기 / 읽기 레벨을 통해`GPIOHANDLE_*`ioctl입니다.
- Interrupt 콜백 (이동 알림)
  - `tkl_gpio_irq_init()` / `tkl_gpio_irq_enable()` / `tkl_gpio_irq_disable()`: 이벤트를 통해 요청`GPIO_GET_LINEEVENT_IOCTL`, 스레드를 사용`poll()`그리고 트리거 콜백.

#### 노트 / 제한
- 이름 *`/dev/gpiochip*`사용할 수 있습니다 (커널은 GPIO 문자 장치 인터페이스를 활성화해야하며 현재 사용자는 권한이 있어야 합니다. 일반적으로 예제를 실행합니다.`sudo`).
- 리눅스에서,`TUYA_GPIO_NUM_E`gpiochip 선 상쇄로 해석됩니다. Raspberry Pi에서 일반적으로 BCM GPIO 번호를 일치하지만, 이것은 distro/kernel 구성에 따라 다를 수 있습니다. 계정 만들기`gpioinfo`/`pinctrl`.
- `TUYA_GPIO_IRQ_LOW/HIGH`"aboutimation": 어댑터는 가장자리 이벤트를 듣고 필터링의 현재 레벨을 읽습니다. 그것은 진정한 수준의 트리거 하드웨어 중단이 아닙니다.

#### 이름 *
- GPIO API 정의, 매개 변수 설명 및 적응 노트, 참조[GPIO 드라이버](https://tuyaopen.ai/docs/tkl-api/tkl_gpio).

### 예제 디렉토리를 입력하십시오.
```bash
cd examples/peripherals/gpio
```

### 제품 설명
설정 메뉴 시작:

```bash
tos.py config menu
```

"Quick start"에 설명 된대로 보드 및 모델을 선택하면 이동`Choice a board → LINUX → TKL Board Configuration`그리고 선택`ENABLE_GPIO`.

:::tip
GPIO 핀 아웃 및 RP1 mux / 기능 테이블의 경우[라즈베리 파이 5 GPIO 참조](/docs/hardware/Linux/raspberry-pi/Examples/raspberry-pi).
:::

내 계정`Application config`, 적합한 핀을 선택하십시오 :

- 산출 핀
- 입력 핀
- irq 핀

선택된 핀이 자유롭고 일치합니다.

### 빌드 및 실행
구조:

```bash
tos.py build
```

건물 후에, executable 같이`gpio_1.0.0.elf`생성됩니다. 라즈베리 파이에서 실행:

```bash
sudo ./gpio_1.0.0.elf
```

### Minimal 예제
아래 코드는 다음과 같습니다 :

- 출력 핀을 초기화하고 초당 한 번 견인
- 입력 핀을 초기화하고 그 수준을 읽으십시오

:::note
이 스니펫은 핵심 통화만 보여줍니다. 완전한 buildable 프로젝트를 위해, 보십시오`examples/peripherals/gpio`.
:::

```c
#include "tal_api.h"
#include "tkl_gpio.h"

// These macros are usually configured via Kconfig/Application config in the example project
// #define EXAMPLE_OUTPUT_PIN ...
// #define EXAMPLE_INPUT_PIN  ...

static void gpio_min_demo(void)
{
  TUYA_GPIO_BASE_CFG_T out_cfg = {
    .mode   = TUYA_GPIO_PUSH_PULL,
    .direct = TUYA_GPIO_OUTPUT,
    .level  = TUYA_GPIO_LEVEL_LOW,
  };
  TUYA_GPIO_BASE_CFG_T in_cfg = {
    .mode   = TUYA_GPIO_PULLUP,
    .direct = TUYA_GPIO_INPUT,
  };

  tkl_gpio_init(EXAMPLE_OUTPUT_PIN, &out_cfg);
  tkl_gpio_init(EXAMPLE_INPUT_PIN,  &in_cfg);

  while (1) {
    static uint8_t level = 0;
    TUYA_GPIO_LEVEL_E in_level = TUYA_GPIO_LEVEL_LOW;

    level ^= 1;
    tkl_gpio_write(EXAMPLE_OUTPUT_PIN, level ? TUYA_GPIO_LEVEL_HIGH : TUYA_GPIO_LEVEL_LOW);

    tkl_gpio_read(EXAMPLE_INPUT_PIN, &in_level);
    PR_NOTICE("GPIO in=%d out=%d", (int)in_level, (int)level);

    tal_system_sleep(1000);
  }
}
```

## I2C 예제
이 섹션은 TuyaOpen을 사용하는 방법을 보여줍니다. I2C Raspberry Pi.

### 어댑터 노트 (Linux TKL I2C)
#### 지원 (사용 가능)
- 기본 마스터 send/receive
  - `tkl_i2c_master_send()`: 주어진 장치 주소로 쓰기 (uses)`/dev/i2c-X` + `I2C_SLAVE` + `write()`).
  - `tkl_i2c_master_receive()`: 주어진 장치 주소에서 읽으십시오 (uses)`I2C_SLAVE` + `read()`).
- Common "register read" 결합 거래 (등록 시작)
  - 시간 :`tkl_i2c_master_send(..., xfer_pending=true)`즉시 다음`tkl_i2c_master_receive()`, 그들은 하나의 합병`I2C_RDWR`트랜잭션, 구현 "쓰기 등록 주소 / command, 그 후 반복-start 읽기 데이터".
- 주소 조사 (scan)
  - 시간 :`tkl_i2c_master_send()`이름 *`size==0`, 접합기는 SMBus "quick"를 장치 ACKs (단일 주소 검사를 위해 사용) 조사하기 위하여 사용합니다.

#### 아직 지원되지 않음 (API 유지; 현재 구현 반환`OPRT_NOT_SUPPORTED`)
- 노예 형태:`tkl_i2c_set_slave_addr()`, `tkl_i2c_slave_send()`, `tkl_i2c_slave_receive()`.
- Interrupt/event 콜백:`tkl_i2c_irq_init()`, `tkl_i2c_irq_enable()`, `tkl_i2c_irq_disable()`.
- 장시간 통제/status 질문:`tkl_i2c_ioctl()`, `tkl_i2c_get_status()`.
  - 참고 :`tkl_i2c_get_status()`현재 출력 구조와 반환`OPRT_NOT_SUPPORTED`. 그것의 산출에 의존하지 마십시오.

#### 이름 *
- I2C API 정의, 매개 변수 설명 및 적응 노트, 참조[I2C 드라이버](https://tuyaopen.ai/docs/tkl-api/tkl_i2c).

### Raspberry Pi에 I2C 사용 (시스템 구성)
라즈베리 파이 터미널에서 실행:

```bash
sudo raspi-config
```

내 계정`raspi-config`, I2C를 통해 가능하게 하십시오:

- `3 Interface Options` → `I5 I2C` → `Enable`

![raspi-config 인터페이스 옵션 메뉴 I2C 활성화](https://images.tuyacn.com/fe-static/docs/img/c8daf0da-c625-472e-888f-090968719dc9.png)

디바이스 노드를 생성한다:

```bash
ls /dev | grep i2c
```

### 예 1 : 버스를 스캔 (`i2c_scan`)
example 디렉토리를 입력하십시오:

```bash
cd examples/peripherals/i2c/i2c_scan
```

구성 :

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`: 선택`ENABLE_I2C`
- `Application config`: 구성`i2c port`, `sda pin`, `scl pin`

참고 :

- Linux 어댑터가 액세스 할 수 있습니다.`/dev/i2c-${port}`.
- Raspberry Pi에서 일반적으로`/dev/i2c-1`(GPIO2/3), 이렇게`i2c port`실제 디바이스 노드 번호와 일치해야 합니다.

빌드 및 실행 :

```bash
tos.py build
sudo ./i2c_scan_1.0.0.elf
```

장치가 발견되면 로그가 표시됩니다.

- `[example_i2c_scan.c:xx] i2c device found at address: 0x44`

### Minimal 예제
아래 코드는 스캔 I2C 7 비트 주소 (Linux에서,`size==0`빠른 프로브 경로 트리거 :

:::note
완전한 buildable 프로젝트를 위해, 보십시오`examples/peripherals/i2c/i2c_scan`.
:::

```c
#include "tal_api.h"
#include "tkl_i2c.h"

static void i2c_scan_demo(TUYA_I2C_NUM_E port)
{
  for (uint8_t addr = 0x08; addr <= 0x77; addr++) {
    // size=0: probe
    if (tkl_i2c_master_send(port, addr, NULL, 0, TRUE) == OPRT_OK) {
      PR_NOTICE("I2C device found: 0x%02X", addr);
    }
  }
}
```

### 예제 2 : 온도 / 습도를 읽으십시오 (`sht3x_4x_sensor`)
example 디렉토리를 입력하십시오:

```bash
cd examples/peripherals/i2c/sht3x_4x_sensor
```

위와 같은 방법을 구성하고 구축하십시오. **Application config**에서 다음을 선택합니다:

- `sensor type`: sht3x 또는 sht4x

실행:

```bash
sudo ./sht3x_4x_sensor_1.0.0.elf
```

온도와 습도 로그가 인쇄 된 기간을 볼 수 있습니다.

## SPI 예제
이 섹션은 Raspberry Pi에서 SPI (userspace spidev)를 운영하는 TuyaOpen를 사용하는 방법을 보여줍니다.

### 어댑터 노트 (Linux TKL SPI)
#### 지원 (사용 가능)
- 마스터 모드
  - `tkl_spi_init()`: 오픈`/dev/spidevX.Y`모드/bits/speed/bitorder를 구성합니다.
  - 지원하다`TUYA_SPI_ROLE_MASTER` / `TUYA_SPI_ROLE_MASTER_SIMPLEX`지원됩니다.
- 기본적인 send/receive
  - `tkl_spi_send()`: 용도`write()`.
  - `tkl_spi_recv()`: 용도`read()`.
- 지원하다
  - `tkl_spi_transfer()`: 전체 듀플렉스 TX / RX`SPI_IOC_MESSAGE(1)`.
  - `tkl_spi_transfer_with_length()`: "그런 다음 수신"을 통해`SPI_IOC_MESSAGE(2)`.
- Counters/status ( 호환성 APIs)
  - `tkl_spi_get_data_count()`: 최근 전송의 바이트 수를 반환합니다.
  - `tkl_spi_get_status()`: 반환`OPRT_OK`그리고 현재 단지 0s struct (실제 상태 없음).

#### 아직 지원되지 않음 (API 유지; 현재 구현 반환`OPRT_NOT_SUPPORTED`)
- Interrupt 콜백:`tkl_spi_irq_init()` / `tkl_spi_irq_enable()` / `tkl_spi_irq_disable()`.
- 공급 능력:`tkl_spi_ioctl()`.

#### Behavior limits / 호환성 구현
- Abort 이동:`tkl_spi_abort_transfer()`이름 *`OPRT_OK`그러나 실제 복종을 수행하지 않습니다.
- DMA 길이:`tkl_spi_get_max_dma_data_length()`0을 반환합니다 (Linux spidev에 대해 의미하지 않음).

#### Device-node 매핑 포트 (기본값)
|spi 항구|장치 노드|
| --- | --- |
| 0 | `/dev/spidev0.0` |
| 1 | `/dev/spidev0.1` |
| 2 | `/dev/spidev1.0` |
| 3 | `/dev/spidev1.1` |
| 4 | `/dev/spidev2.0` |
| 5 | `/dev/spidev2.1` |

#### 이름 *
- SPI API 정의, 매개 변수 설명 및 적응 노트, 참조[SPI 드라이버](https://tuyaopen.ai/docs/tkl-api/tkl_spi).

### Raspberry Pi에 Enable SPI (시스템 구성)
```bash
sudo raspi-config
```

내 계정`raspi-config`, SPI를 통해 활성화하십시오:

- `3 Interface Options` → `I4 SPI` → `Enable`

디바이스 노드를 생성한다:

```bash
ls /dev | grep spidev
```

TuyaOpen SPI 예제에서,`Application config -> spi port`**포트 번호**입니다. Linux 어댑터는 디바이스 노드에 포트 번호를 맵(see)합니다.`prv_spi_dev_path()`내 계정`platform/LINUX/tuyaos_adapter/src/tkl_spi.c`):

- `spi port = 0` → `/dev/spidev0.0`
- `spi port = 1` → `/dev/spidev0.1`
- `spi port = 2` → `/dev/spidev1.0`
- `spi port = 3` → `/dev/spidev1.1`
- `spi port = 4` → `/dev/spidev2.0`
- `spi port = 5` → `/dev/spidev2.1`

예를 들어,`spidev0.0` / `spidev0.1`, 세트`spi port`으로`0` / `1`.

### 예제 디렉토리를 입력하십시오.
```bash
cd examples/peripherals/spi
```

### 구성, 빌드 및 실행
구성 :

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`: 선택`ENABLE_SPI`
- `Application config`: 구성`spi port`, `spi baudrate`

(주)`spi port`:

- 이용안내`/dev/spidev0.0`: 세트`0`
- 이용안내`/dev/spidev0.1`: 세트`1`

제품 정보`spi baudrate`(Hz), 그것은 시작에 추천됩니다`1000000`또는`8000000`loopback/communication를 유효하게 하기 위하여, 그 후에 당신의 주변 기능에 점차적으로 증가합니다.

빌드 및 실행 :

```bash
tos.py build
sudo ./spi_1.0.0.elf
```

### Minimal 예제
아래 코드는 SPI 마스터가 고정 문자열을 전송합니다 (리눅스에서 그것을 통해 간다`/dev/spidevX.Y`):

:::note
완전한 buildable 프로젝트를 위해, 보십시오`examples/peripherals/spi`.
:::

```c
#include "tal_api.h"
#include "tkl_spi.h"

// #define EXAMPLE_SPI_PORT ...
// #define EXAMPLE_SPI_BAUDRATE ...

static void spi_min_demo(void)
{
  TUYA_SPI_BASE_CFG_T cfg = {
    .mode     = TUYA_SPI_MODE0,
    .freq_hz  = EXAMPLE_SPI_BAUDRATE,
    .databits = TUYA_SPI_DATA_BIT8,
    .bitorder = TUYA_SPI_ORDER_LSB2MSB,
    .role     = TUYA_SPI_ROLE_MASTER,
    .type     = TUYA_SPI_AUTO_TYPE,
  };

  uint8_t tx[] = "Hello Tuya";
  tkl_spi_init(EXAMPLE_SPI_PORT, &cfg);

  while (1) {
    tkl_spi_send(EXAMPLE_SPI_PORT, tx, sizeof(tx));
    tal_system_sleep(500);
  }
}
```

## PWM 예제
이 섹션은 TuyaOpen을 사용하는 방법을 보여줍니다. PWM on Raspberry Pi.

### 어댑터 노트 (Linux TKL PWM)
#### 지원 (사용 가능)
- PWM 출력 (`/sys/class/pwm`)
  - `tkl_pwm_init()`: 채널을 내보내고 극성/period/duty를 구성합니다.
  - `tkl_pwm_start()` / `tkl_pwm_stop()`: 쓰기를 통한 start/stop`enable`.
  - `tkl_pwm_duty_set()`: 업데이트 의무 주기.
  - `tkl_pwm_frequency_set()`: 업데이트 주파수.
  - `tkl_pwm_polarity_set()`: 업데이트 극성.
  - `tkl_pwm_info_set()` / `tkl_pwm_info_get()`: set/get a full 매개 변수 set (이 소프트웨어를 반환 cfg).
  - `tkl_pwm_multichannel_start()` / `tkl_pwm_multichannel_stop()`: start/stop 다중 채널 순차적으로.
  - `tkl_pwm_deinit()`: 정지 및 취소.

#### 아직 지원되지 않음 (API 유지; 현재 구현 반환`OPRT_NOT_SUPPORTED`)
- PWM 캡처:`tkl_pwm_cap_start()` / `tkl_pwm_cap_stop()`.
  - 참고 : 현재 구현 반환`OPRT_NOT_SUPPORTED`직접.

#### 이름 *
- PWM API 정의에 대 한, 매개 변수 설명 및 적응 노트, 참조[PWM 드라이버](https://tuyaopen.ai/docs/tkl-api/tkl_pwm).

### PWM 실험 단계 (예: GPIO18)에 PWM 광장 파 출력
#### 예제 디렉토리를 입력하십시오.
```bash
cd examples/peripherals/pwm
```

#### Raspberry Pi (시스템 구성)에서 Enable PWM
1. 핀이 점유되지 않도록하십시오 :

   ```bash
   pinctrl get 18
   ```

다중화되지 않은 경우, 당신은 보통 같은 것을 볼 것이다:

   - `18: no    pd | -- // GPIO18 = none`

2. PWM 오버레이를 활성화:

끝으로`/boot/firmware/config.txt`:

   ```text
   dtoverlay=pwm,pin=18,func=2
   ```

리부츠 라즈베리 파이 적용.

3. 재부팅 후, 매핑 확인:

   ```bash
   pinctrl get 18
   ```

같은 것을 볼 수 있습니다 (핀을 변환하는 것은 PWM 채널로 전환됩니다):

   - `18: a3    pd | lo // GPIO18 = PWM0_CHAN2`

#### 제품 설명
설정 메뉴 시작:

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`: 선택`ENABLE_PWM`
- 같은 구성 트리에서 설정 :
  - `PWM_SYSFS_CHIP = 0`(지도에`/sys/class/pwm/pwmchip0`)
  - `PWM_SYSFS_CHANNEL_BASE = 2`(GPIO18 지도부터`PWM0_CHAN2`)
- `Application config`: 선택`pwm port = 0`(이 때문에`PWM0`)

#### 빌드 및 실행
```bash
tos.py build
sudo ./pwm_1.0.0.elf
```

### Minimal 예제
아래 코드는 PWM 출력을 보여줍니다 (init + start):

:::note
완전한 buildable 프로젝트를 위해, 보십시오`examples/peripherals/pwm`.
:::

```c
#include "tal_api.h"
#include "tkl_pwm.h"

// #define EXAMPLE_PWM_PORT ...
// #define EXAMPLE_PWM_FREQUENCY ...
// #define EXAMPLE_PWM_DUTY ... // 1-10000

static void pwm_min_demo(void)
{
  TUYA_PWM_BASE_CFG_T cfg = {
    .duty      = EXAMPLE_PWM_DUTY,
    .frequency = EXAMPLE_PWM_FREQUENCY,
    .polarity  = TUYA_PWM_NEGATIVE,
  };

  tkl_pwm_init(EXAMPLE_PWM_PORT, &cfg);
  tkl_pwm_start(EXAMPLE_PWM_PORT);

  while (1) {
    tal_system_sleep(2000);
  }
}
```

sysfs 노드가 예상치 못한 것을 신속하게 확인하려면, 대응 여부 확인`pwm2`존재 (또는 수출될 수 있습니다)`/sys/class/pwm/pwmchip0/`.

:::tip
PWM sysfs는 커널과 오버레이 구성에 달려 있습니다. 오시는 길`/boot/firmware/config.txt`OS 이미지와 다를 수 있습니다; 시스템에 실제 경로를 사용하십시오.
:::

## UART 예제
이 섹션은 TuyaOpen을 사용하는 방법을 보여줍니다. UART on Raspberry Pi.

### 어댑터 노트 (Linux TKL UART)
#### 지원 (사용 가능)
- 기본적인 send/receive
  - `tkl_uart_init()`: UART 장치를 열고 termios를 통해 baud/data bits/parity/stop 비트를 구성합니다.
  - `tkl_uart_write()`: 용도`write()`.
  - `tkl_uart_read()`: 용도`read()`.
  - `tkl_uart_deinit()`: fd를 닫고 RX 스레드를 중지합니다.
- RX 콜백 알림 (약. "interrupt" semantics)
  - `tkl_uart_rx_irq_cb_reg()`: RX 콜백 등록
  - Linux에서 스레드`select()`s for fd readability 과 트리거 the 콜백.

#### 아직 지원되지 않음 (API 유지; 현재 구현 반환`OPRT_NOT_SUPPORTED`)
- `tkl_uart_set_tx_int()` / `tkl_uart_set_rx_flowctrl()` / `tkl_uart_wait_for_data()` / `tkl_uart_ioctl()`.

#### 빈 구현 (효과 없음)
- `tkl_uart_tx_irq_cb_reg()`: 현재 no-op.

#### Device 노드 매핑 (FAKE UART 스위치와 관련)
- 시간 :`TKL_UART_REDIRECT_LOG_TO_STDOUT = n`(UART redirection disabled; 실제 하드웨어 UART 사용), 기본 매핑은 다음과 같습니다.
  - `port 0 -> /dev/ttyAMA0`
  - `port 1 -> /dev/ttyAMA1`
  - `port 2 -> /dev/ttyAMA2`
- 시간 :`TKL_UART_REDIRECT_LOG_TO_STDOUT = y`(UART 리디렉션 활성화), 어댑터는 액세스하지 않습니다`/dev/ttyAMA*`Dummy UART 구현을 사용합니다 (아래 참조).

#### 이름 *
- UART API 정의, 매개 변수 설명 및 적응 노트, 참조[UART 드라이버](https://tuyaopen.ai/docs/tkl-api/tkl_uart).

### 하드웨어 배선 노트 (physical UART)
** 물리 UART ** (예를 들어, USB-TTL 모듈 또는 다른 보드의 UART에 연결된 Raspberry Pi UART 핀)를 사용하는 경우 :

- 양측 공유 ** 일반적인 배경 (GND)**를 확인합니다. 일반적인 배경 없이, 전형적인 증후는 garbled RX 자료, 누락된 바이트, 또는 아주 불안정한 커뮤니케이션을 포함합니다.

### UART 리디렉션 (Dummy UART: stdin/stdout/UDP)
UART 관련 구성품을 만들려면 ** 진짜 UART 하드웨어 연결 없이 **, Linux는 스위치를 제공합니다`TKL_UART_REDIRECT_LOG_TO_STDOUT`(주)`LINUX` → `TKL Board Configuration`).

리디렉션 (Dummy UART)이 활성화되면 행동`tkl_uart.c`다음과 같이 (실제 UART에서 다른; 디버깅 / 디모에 주로):

- `TUYA_UART_NUM_0`(포트 0):
  - RX: 현재 과정 표준 입력에서 읽으십시오`/dev/stdin`(단말 키보드 입력)`*.elf`).
  - TX: 쓰기`stdout`(단말에 직접 인쇄).
  - 전형적인 사용: SSH/local 맨끝에서, 사용 “keyboard 입력 → UART RX”를 사용하고, 위에 relying 없이 “UART TX” 산출에 스크린을, 보십시오`/dev/ttyAMA*`.
- `TUYA_UART_NUM_1`(포트 1):
  - RX: UDP 소켓을 통해 수신하고 위층 RX 콜백에 바이트를 공급합니다.
  - TX: UDP 소켓을 통해 동료에 자료를 보냅니다.
  - 참고 : 현재 구현에서 바인딩 / 종료 IP 및 포트가 고정됩니다 (환경 의존). 많은 네트워크에서 어댑터 소스 코드를 수정하고 재건해야합니다.

더미 모드의 제한/주:

- Baud rate/parity/stop 비트 등은 ** 진짜 UART**와 동일하 (포트 0을 위해, stdin는 즉시 읽기를 위한 non-canonical 형태에 단지 전환됩니다; stdout에는 진짜 serial 타이밍이 없습니다).
- Dummy 모드는 주로 "기능 실행 / 대화 형 데모 만들기"이며 심각한 UART 프로토콜 타이밍 검증에 적합하지 않습니다.

UART 리디렉션을 사용하는지 선택하는 방법 :

- UART 예제 / CLI를 원한다면 Raspberry Pi 물리적 UART 핀을 사용 (`/dev/ttyAMA*`또는`/dev/ttyS*`), 이동:
  - `Choice a board → LINUX → TKL Board Configuration`
  - 설치하기`UART redirection (stdin/stdout/UDP) instead of hardware ttyAMA*`으로`n`
  - 참고: 이 옵션이 선택되지 않은 경우**, 물리적 UART를 사용하고 실제 액세스`ttyAMA*`/`ttyS*`장치 노드.
- UART 로직을 신속하게 검증하고 싶으면 USB-TTL/hardware 루프백이 없으므로 그대로 유지하십시오.`y`.

#### 주: 안으로 QR 부호 산출 수로`your_chat_bot`(UART 리디렉션)
현재 위치`your_chat_bot`Linux/Raspberry Pi for Providing 데모에서 사용할 수 있습니다.`TKL_UART_REDIRECT_LOG_TO_STDOUT`QR 코드 콘텐츠가 현재 터미널에서 직접 인쇄됩니다.

**1) 예상된 행동 (리디렉션 활성화)**

- QR 코드(string/ASCII 아트)는 터미널에서 직접 볼 수 있습니다.`your_chat_bot*.elf`.

**2) 어떻게 작동 (UART0 TX를 통해 출력) **

- 제공 중,`your_chat_bot`일반적으로 UART0을 통해 QR 코드 콘텐츠를 보냅니다 (`TUYA_UART_NUM_0`).
- 시간 :`TKL_UART_REDIRECT_LOG_TO_STDOUT = y`: 우아트0 TX 지도`stdout`, 그래서 QR 부호는 맨끝에서 보여줍니다.
- 시간 :`TKL_UART_REDIRECT_LOG_TO_STDOUT = n`: UART0 TX는 실제 UART 장치 (예를 들면`/dev/ttyAMA0`/`/dev/ttyS0`), 그래서 그것은 맨끝에서 보여주지 않을 것입니다; 그것은 serial 선에 산출입니다.

### Raspberry Pi (시스템 구성)에 UART 사용
```bash
sudo raspi-config
```

내 계정`raspi-config`, 직렬 포트를 통해 구성:

- `3 Interface Options` → `I6 Serial Port`

그것은 보통 선택하는 것이 좋습니다:

```
- Disable serial login shell
- Enable serial port hardware
```

UART 장치 노드 확인:

```bash
ls -l /dev/ttyAMA* /dev/ttyS* 2>/dev/null
```

### 예제 디렉토리를 입력하십시오.
```bash
cd examples/peripherals/uart
```

### 구성, 빌드 및 실행
구성 :

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`: 선택`ENABLE_UART`

선택: 동일한 메뉴에서, 세트`UART redirection (stdin/stdout/UDP) instead of hardware ttyAMA*`(UART 리디렉션 / Dummy UART를 활성화 할 수 있음).

- 선택 (`*`): UART 리디렉션 활성화 (Dummy UART: stdin/stdout/UDP); 실제 UART 장치 노드에 의존하지 않습니다.
- 선택 없음 (` `): 사용 물리적 UART (액세스 리얼`ttyAMA*`/`ttyS*`장치 노드).

구조:

```bash
tos.py build
```

실행:

```bash
sudo ./uart_1.0.0.elf
```

:::note
예제 사용`TUYA_UART_NUM_0`(UART0) 기본적으로. Raspberry Pi에서 UART0은 시스템 콘솔에 의해 점유 될 수 있습니다. echo 또는 오픈 실패가 없다면 직렬 포트 사용을 확인하고 예를 들어 또는 어댑터 장치 노드 매핑에 의해 사용되는 UART 포트를 조정할 수 있습니다.
:::

### Minimal 예제 1 : 대화 형 에코
이 예제는**Dummy UART 리디렉션** (stdin/stdout) 모드에서 UART 경로를 신속하게 검증하는 것이 가장 좋습니다. 터미널에 입력하는 것은 다시 정해진 것입니다.

:::note
이 접근은 일관되게`examples/peripherals/uart`.
:::

```c
#include "tal_api.h"

#include "tkl_output.h"

#define UART_NUM TUYA_UART_NUM_0

static void uart_echo_demo(void)
{
  TAL_UART_CFG_T cfg = {0};
  cfg.base_cfg.baudrate = 115200;
  cfg.base_cfg.databits = TUYA_UART_DATA_LEN_8BIT;
  cfg.base_cfg.stopbits = TUYA_UART_STOP_LEN_1BIT;
  cfg.base_cfg.parity   = TUYA_UART_PARITY_TYPE_NONE;
  cfg.rx_buffer_size    = 256;
  cfg.open_mode         = O_BLOCK;

  tal_uart_init(UART_NUM, &cfg);
  tal_uart_write(UART_NUM, (const uint8_t*)"Please input text:\r\n", sizeof("Please input text:\r\n") - 1);

  while (1) {
    uint8_t buf[128];
    int n = tal_uart_read(UART_NUM, buf, sizeof(buf));
    if (n > 0) {
      tal_uart_write(UART_NUM, buf, n);
    } else {
      tal_system_sleep(10);
    }
  }
}
```

### Minimal 예제 2 : 하드웨어 루프백 자체 테스트 (짧은 TX 및 RX)
이 예제는 "whether 전송 된 데이터가 다시 변경 될 수 있습니다"의 자체 테스트를 수행 (에 의해 유효)`memcmp`). 그것은 보통 요구합니다:

- Disable Dummy redirection (사용 물리적 UART 장치 노드)
- 짧은 ** TX 및 RX ** 같은 UART에 (그리고 일반적인 GND를 보장)

```c
#include <string.h>

#include "tal_api.h"
#include "tkl_uart.h"

static OPERATE_RET uart_loopback_test(TUYA_UART_NUM_E port)
{
  TUYA_UART_BASE_CFG_T cfg = {0};
  cfg.baudrate = 115200;
  cfg.databits = TUYA_UART_DATA_LEN_8BIT;
  cfg.parity   = TUYA_UART_PARITY_TYPE_NONE;
  cfg.stopbits = TUYA_UART_STOP_LEN_1BIT;
  cfg.flowctrl = TUYA_UART_FLOWCTRL_NONE;

  OPERATE_RET ret = tkl_uart_init(port, &cfg);
  if (ret != OPRT_OK) {
    return ret;
  }

  const uint32_t timeout_ms = 5000;
  const int bufsize = 8;
  uint8_t tx[bufsize];
  uint8_t rx[bufsize];

  for (int i = 0; i < bufsize; i++) {
    tx[i] = (uint8_t)('A' + i);
  }

  for (int round = 0; round < 3; round++) {
    memset(rx, 0, sizeof(rx));

    int wr = tkl_uart_write(port, tx, sizeof(tx));
    if (wr != (int)sizeof(tx)) {
      ret = OPRT_COM_ERROR;
      break;
    }

    int got = 0;
    SYS_TIME_T start = tal_system_get_millisecond();
    while (got < (int)sizeof(rx)) {
      SYS_TIME_T now = tal_system_get_millisecond();
      if ((uint32_t)(now - start) > timeout_ms) {
        ret = OPRT_TIMEOUT;
        break;
      }

      int rd = tkl_uart_read(port, rx + got, (uint32_t)sizeof(rx) - (uint32_t)got);
      if (rd > 0) {
        got += rd;
      } else {
        tal_system_sleep(5);
      }
    }

    if (ret != OPRT_OK) {
      break;
    }
    if (memcmp(tx, rx, sizeof(tx)) != 0) {
      ret = OPRT_COM_ERROR;
      break;
    }
  }

  tkl_uart_deinit(port);
  return ret;
}
```

## 버튼 예
이 예제는 TuyaOpen의 버튼 구성 요소 (TDL 버튼 관리 레이어)를 사용하여 라즈베리 파이에 버튼 입력을 처리하는 방법을 보여줍니다.

### 어댑터 노트 (Raspberry Pi keyboard-simulated button)
Raspberry Pi에서 버튼은 기본적으로 키보드 입력을 통해 시뮬레이션됩니다. 실행중인 터미널의 문자를 눌러`*.elf`버튼 이벤트를 트리거합니다.

- 보드 Kconfig에 의해 활성화:`ENABLE_KEYBOARD_INPUT`
- Trigger 문자가 지정됩니다.`BUTTON_NAME`(과태)`s`)

:::note
예를 들어, 로그인`TDL_BUTTON_PRESS_DOWN`인쇄 된`single click`(보기)`examples/peripherals/button/src/example_button.c`). 프레스다운 이벤트를 나타냅니다.
:::

### 예제 디렉토리를 입력하십시오.
```bash
cd examples/peripherals/button
```

### 제품 설명
```bash
tos.py config choice
```

해당 번호 선택`RaspberryPi.config`자주 묻는 질문

```bash
tos.py config menu
```

"Quick Start" 당 board/model 선택 완료 후:

- `Choice a board → LINUX → Raspberry Pi Board Configuration`
  - 이름 *`Enable keyboard input for Raspberry Pi`확인.
  - 설치하기`Keyboard button device value`예를 들면:`s`

참고 :`Keyboard button device value`Board config 항목에 대응`BUTTON_NAME`, "키보드 문자가 버튼을 시뮬레이션하는 데 사용됩니다."

- 설정하기`s`: 프레스`s`터미널에서`*.elf`지정된 버튼 이벤트 트리거`s`.
- ** 단일 문자** (예:`s` / `a` / `d` / `1`). 몇몇 구현이 첫번째 문자만 가지고 있는 경우에만 혼란을 방지하기 위하여 multi-character 끈을 피하십시오.

### 빌드 및 실행
구조:

```bash
tos.py build
```

실행:

```bash
sudo ./button_1.0.0.elf
```

### 예상된 행동
- 본문 바로가기`BUTTON_NAME`(과태)`s`) 맨끝에서, 그리고 그것은 인쇄합니다`s: single click`한 번 (아래 이벤트).
- 대략 3 초를 위해 그것을 붙듭니다 (예에서,`long_start_valid_time=3000ms`), 그리고 그것은 인쇄합니다`s: long press`(long-press 이벤트).


## 오디오 코덱 예 (`audio_codecs`)
이 예제는 ** 레코딩 + 재생 ** 라즈베리 파이 (PCM 16k/16bit/mono)에서 ALSA를 통해, TuyaOpen의 사용 방법을 보여줍니다`TDL Audio`관리 층 API.

### 어댑터 노트 (Linux ALSA)
- Raspberry Pi (Linux)에서 오디오는 ALSA를 통해 액세스됩니다.`/dev/snd/*`.
- 이 예제는`src/peripherals/audio_codecs`구성 요소 및 ALSA 드라이버 구현 사용 (`tdd_audio_alsa.c`).
- 함께 실행하는 것이 좋습니다.`sudo`, 또는 현재 사용자를 보장`audio`그룹(otherwise opening sound card device nodes may failed).

### 사전 체크 (USB 사운드 카드를 인식)
USB 오디오 모듈 (예를들면 YD1076/Y1076)을 예로 사용하여 Raspberry Pi에서 실행하십시오.

```bash
aplay -l
arecord -l
ls -la /dev/snd/
```

당신은 같은 장치를 볼 수`card 2: Y1076 ...`목록에서.

### 예제 디렉토리를 입력하십시오.
```bash
cd examples/peripherals/audio_codecs
```

### 제품 설명
구성 UI를 엽니다:


```bash
tos.py config choice
```

해당 번호 선택`RaspberryPi.config`자주 묻는 질문

```bash
tos.py config menu
```

"Quick Start" 당 보드 선택 완료 후 다음으로 이동하십시오.

- `Choice a board → LINUX → Choice a board → RaspberryPi → Raspberry Pi Board Configuration`
  - 이름 *`Enable keyboard input for Raspberry Pi`확인.
  - 설치하기`Keyboard button device value`예를 들면:`s`

### 빌드 및 실행
구조:

```bash
tos.py build
```

실행 (recommended with`sudo`라즈베리 파이에):

```bash
sudo ./audio_codecs_1.0.0.elf
```

상호 작용: 예는 기본적으로 단추를 가장하기 위하여 키보드 입력을 이용합니다 (보통)`s`). 녹음을 시작하고, 녹음을 중지하고 재생 (실제 로그 / behavior를 따르십시오).

### 자주 묻는 질문
1) **열려있는 것`default`장치**

오류가 발생하면:

- `ALSA lib pcm_asym.c:... capture slave is not defined`
- `Audio capture device 'default' not available: Invalid argument`

ALSA는`default`현재 시스템에 PCM 구성은 녹음에 사용할 수 없습니다.

가능한 해결책:

- 이름 *`/etc/asound.conf`Raspberry Pi 및 지도`default`USB 사운드 카드에:

```bash
sudo tee /etc/asound.conf >/dev/null <<'EOF'
pcm.!default {
    type asym
    playback.pcm "plughw:CARD=Y1076,DEV=0"
    capture.pcm  "plughw:CARD=Y1076,DEV=0"
}

ctl.!default {
    type hw
    card "Y1076"
}
EOF
```

그것을 만들기 후에, 당신은 유효하게 할 수 있습니다:

```bash
arecord -D default -f S16_LE -c1 -r16000 -d2 /tmp/t.wav
aplay -D default /tmp/t.wav
```
