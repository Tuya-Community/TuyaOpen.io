---
title: "ADC 주변 가이드"
description: "TuyaOpen의 ADC 주변 가이드 : TKL ADC 단위를 구성하고, bitmask, set attenuation로 채널을 활성화하고, 밀리 볼트로 변환 된 원시 카운트를 읽습니다."
keywords:
  - adc
  - tkl_adc
  - analog voltage
  - channel bitmask
  - tuyaopen peripheral
---

TKL ADC 공용영역은 감지기, 전위차계 및 다른 아날로그 근원에서 아날로그 전압을 읽습니다. 당신은 ADC 단위를 구성, 비트 마스크 채널을 활성화, 다음 원시 카운트를 읽고 밀리 볼트로 변환.

## 자주 묻는 질문
- 한국어[환경 설정](../../quick-start/enviroment-setup)
- 이사회`ENABLE_ADC=y`Kconfig에서

## TuyaOpen에서 ADC 작품
TuyaOpen의 ADC는 ** 포트 + 채널 bitmask** 모델을 사용합니다.

- ** 포트 ** ADC 단위 선택:`TUYA_ADC_NUM_0`= ADC1,`TUYA_ADC_NUM_1`= ADC2를
- **채널 bitmask ** (`cfg->ch_list.data`)는 특정한 수로를 가능하게 합니다: 조금 N는 가능하게 합니다`ADC_CHANNEL_N`
- **Attenuation** 설정`ADC_ATTEN_DB_12`(0-3.3 V 전 범위)
- **참고 전압**는 3300 mV이며,`tkl_adc_ref_voltage_get()`

## 기본 ADC 읽기
```c
#include "tkl_adc.h"

#define ADC_PORT    TUYA_ADC_NUM_0
#define ADC_CHANNEL 4

static OPERATE_RET read_adc(uint32_t *raw_value)
{
    TUYA_ADC_BASE_CFG_T cfg = {
        .ch_list.data = (1 << ADC_CHANNEL),
        .ch_nums = 1,
        .width = 12,
        .type = TUYA_ADC_INNER_SAMPLE_VOL,
    };

    OPERATE_RET rt = tkl_adc_init(ADC_PORT, &cfg);
    if (rt != OPRT_OK) {
        return rt;
    }

    int32_t value;
    rt = tkl_adc_read_single_channel(ADC_PORT, ADC_CHANNEL, &value);
    tkl_adc_deinit(ADC_PORT);

    *raw_value = (uint32_t)value;
    return rt;
}
```

## 변환 원료로 전압
```c
uint32_t raw;
read_adc(&raw);

uint32_t ref_mv = tkl_adc_ref_voltage_get(ADC_PORT);

float voltage = (float)raw * ref_mv / ((1 << 12) - 1);
TAL_PR_INFO("voltage: %.2f mV", voltage);
```

## Multi-Channel 독서
bitmask와 동시에 여러 채널을 활성화:

```c
TUYA_ADC_BASE_CFG_T cfg = {
    .ch_list.data = (1 << 0) | (1 << 1) | (1 << 4),
    .ch_nums = 3,
    .width = 12,
};
tkl_adc_init(TUYA_ADC_NUM_0, &cfg);

int32_t ch0_val, ch1_val, ch4_val;
tkl_adc_read_single_channel(TUYA_ADC_NUM_0, 0, &ch0_val);
tkl_adc_read_single_channel(TUYA_ADC_NUM_0, 1, &ch1_val);
tkl_adc_read_single_channel(TUYA_ADC_NUM_0, 4, &ch4_val);

tkl_adc_deinit(TUYA_ADC_NUM_0);
```

## ADC 채널 - GPIO Mapping
Channel-to-GPIO 매핑은 칩에 달려 있습니다. 완전한 테이블을 위한 per-chip pinmux docs를 보십시오:

|회사연혁|ADC1 항구|ADC2 항구|Pinmux 도크|
|----------|-----------|-----------|-----------|
|사이트맵| `TUYA_ADC_NUM_0`(GPIO 32-39)| `TUYA_ADC_NUM_1`(GPIO 0-27)| [ESP32 클래식 Pinmux](/docs/hardware/espressif/pinmux/esp32-classic) |
|사이트맵| `TUYA_ADC_NUM_0`(GPIO 1-10)| `TUYA_ADC_NUM_1`(GPIO 11-20)| [ESP32-S3 핀](/docs/hardware/espressif/pinmux/esp32-s3) |
|모델 번호: ESP32-C3| `TUYA_ADC_NUM_0`(GPIO 0-4)| `TUYA_ADC_NUM_1`(GPIO 5)| [ESP32-C3 핀](/docs/hardware/espressif/pinmux/esp32-c3) |
|사이트맵| `TUYA_ADC_NUM_0`(GPIO 0-6)|사이트맵| [ESP32-C6 핀](/docs/hardware/espressif/pinmux/esp32-c6) |
|사이트맵| `TUYA_ADC_NUM_0`(P0-P28)를|사이트맵| [T5AI 주변 Mapping](/docs/hardware/tuya-t5/t5ai-peripheral-mapping) |

## ESP32 ADC2 및 와이파이 Conflict
:::warning
고전적인 ESP32에서 ** ADC2는 Wi-Fi가 활성화 된 동안 사용할 수 없습니다 **. ADC2 채널은 Wi-Fi 라디오와 하드웨어를 공유합니다. 애플리케이션이 Wi-Fi(most do)를 사용하는 경우, ADC1 채널만 사용할 수 있습니다.

이 제한은 ESP32-S3, ESP32-C3 또는 ESP32-C6에 적용되지 않습니다.
:::

## 비트 폭 옵션
|제품 정보|제품 설명|최대 익지않는 가치|
|-------|-----------|---------------|
| 9 |512 수준| 511 |
| 10 |1024 수준| 1023 |
| 11 |2048 수준| 2047 |
|12 (과태)|4096 수준| 4095 |
| 13 |8192 수준| 8191 |

모든 폭은 모든 칩에 유효합니다. 제품 정보`12`최고의 호환성.

## 온도 센서
`tkl_adc_temperature_get()`이름 *`OPRT_NOT_SUPPORTED`ESP32에. 칩의 내부 온도 센서는 별도의 ESP-IDF 드라이버를 사용합니다 (`temperature_sensor_*`), ADC 경로가 아닙니다.

## Practical 보기: 건전지 전압 감시자
저항기 분배자를 통해서 건전지 전압을 읽으십시오 (2:1 비율):

```c
#define BATTERY_ADC_PORT    TUYA_ADC_NUM_0
#define BATTERY_ADC_CHANNEL 5
#define DIVIDER_RATIO       2.0f

float get_battery_voltage_mv(void)
{
    TUYA_ADC_BASE_CFG_T cfg = {
        .ch_list.data = (1 << BATTERY_ADC_CHANNEL),
        .ch_nums = 1,
        .width = 12,
    };
    tkl_adc_init(BATTERY_ADC_PORT, &cfg);

    int32_t raw;
    tkl_adc_read_single_channel(BATTERY_ADC_PORT, BATTERY_ADC_CHANNEL, &raw);
    tkl_adc_deinit(BATTERY_ADC_PORT);

    uint32_t ref_mv = tkl_adc_ref_voltage_get(BATTERY_ADC_PORT);

    float measured_mv = (float)raw * ref_mv / 4095.0f;
    return measured_mv * DIVIDER_RATIO;
}
```

## 이름 *
- [TKL 시리즈](/docs/tkl-api/tkl_adc)
- [SDK의 ADC 예제](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/adc)
- [ESP32 핀 Mapping](/docs/hardware/espressif/esp32-pin-mapping)
