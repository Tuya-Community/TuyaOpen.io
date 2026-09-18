---
title: tkl i2s | I2S 드라이버
description: "tkl i2s 참고 — TuyaOpen I2S 디지털 오디오 드라이버 TKL API init, send, receive, and stop on the Inter-IC Sound bus in Embedded IoT 개발."
keywords:
  - tkl_i2s
  - tuyaopen i2s driver
  - tkl i2s api
  - embedded audio driver
---

## 제품정보
I2S (Inter-IC Sound)는 1986년 필립스에 의해 정의된 디지털 방식으로 오디오 전송 기준입니다 (1996년에 개정하는). 그것은 코덱, DSPs, 디지털 입력/출력 공용영역, ADCs, DACs 및 디지털 방식으로 여과기와 같은 체계 안쪽에 성분 사이 디지털 방식으로 오디오 자료를 나릅니다.

I2S는 주소 또는 장치 선택 메커니즘이없는 간단한 인터페이스입니다. I2S 버스에는 한 개의 마스터와 한 개의 송신기가 있습니다. 마스터는 송신기, 수신기 또는 두 개의 좌표를 분리하는 분리 장치가 될 수 있습니다. 시계 줄을 구동하는 장치 (`SCK`이름 *`WS`) 마스터입니다.

버스는 3개의 신호를 이용합니다:

- `SCK`: Bit Clock - 오디오 데이터 비트 당 1 펄스. 그것의 빈도는 2 × 표본 비율 × 표본 조금 깊이입니다.
- `WS`: Word select - 채널을 선택합니다. 그것의 빈도는 표본 비율을 동등합니다;`1`왼쪽 채널을 선택하고`0`오른쪽 채널을 선택합니다.
- `SD`: 직렬 데이터 - 두 가지 보완의 오디오 샘플.

이 운전사는 6개의 기능을 드러냅니다: 항구를 초기화하고 deinitialize, 보내고 자료를 받고, 또는 받기를 멈추십시오.

## 프로젝트
```c
OPERATE_RET tkl_i2s_init(TUYA_I2S_NUM_E i2s_num, const TUYA_I2S_BASE_CFG_T *i2s_config);
```

기본 설정에서 I2S 포트를 초기화하고 결과를 반환합니다.

모수:

- `i2s_num`: 포트 번호 (Port number)`TUYA_I2S_NUM_0`, `TUYA_I2S_NUM_1`, `TUYA_I2S_NUM_2`).
- `i2s_config`: 기본 설정.

  ```c
  typedef struct {
      TUYA_I2S_MODE_E             mode;                   /*!< I2S work mode */
      uint32_t                    sample_rate;            /*!< I2S sample rate */
      uint32_t                    mclk;                   /*!< I2S mclk */
      TUYA_I2S_BITS_PER_SAMP_E    bits_per_sample;        /*!< I2S sample bits in one channel */
      TUYA_I2S_CHANNEL_FMT_E      channel_format;         /*!< I2S channel format */
      TUYA_I2S_COMM_FORMAT_E      communication_format;   /*!< I2S communication format */
      uint32_t                    i2s_dma_flags;          /*!< I2S DMA flag, 1 to use DMA */
  } TUYA_I2S_BASE_CFG_T;
  ```

  `TUYA_I2S_MODE_E`값은 master/slave 및 send/receive를 선택하기 위하여 결합된 조금 깃발입니다:

  |이름 *|주요 특징|이름 *|
  | :------------------- | :-------- | :------------- |
  | `TUYA_I2S_MODE_MASTER` | `0x1 << 0` |마스터 모드|
  | `TUYA_I2S_MODE_SLAVE`  | `0x1 << 1` |노예 모드|
  | `TUYA_I2S_MODE_TX`     | `0x1 << 2` |Transmit 형태|
  | `TUYA_I2S_MODE_RX`     | `0x1 << 3` |수신 모드|

1개의 방향 깃발을 가진 1개의 역할 깃발을 결합하십시오:

  - `TUYA_I2S_MODE_MASTER | TUYA_I2S_MODE_TX`
  - `TUYA_I2S_MODE_MASTER | TUYA_I2S_MODE_RX`
  - `TUYA_I2S_MODE_SLAVE | TUYA_I2S_MODE_TX`
  - `TUYA_I2S_MODE_SLAVE | TUYA_I2S_MODE_RX`

  `sample_rate`표본 비율입니다.`mclk`주인 시계, 전형적으로 256 또는 384배 표본 비율입니다.

  `TUYA_I2S_BITS_PER_SAMP_E`:

  |이름 *|주요 특징|이름 *|
  | :------------------------------- | :---- | :---------------- |
  | `TUYA_I2S_BITS_PER_SAMPLE_8BIT`  | 8     |8 비트 데이터 폭|
  | `TUYA_I2S_BITS_PER_SAMPLE_16BIT` | 16    |16비트 데이터 폭|
  | `TUYA_I2S_BITS_PER_SAMPLE_24BIT` | 24    |24 비트 데이터 폭|
  | `TUYA_I2S_BITS_PER_SAMPLE_32BIT` | 32    |32 비트 데이터 폭|

  `TUYA_I2S_CHANNEL_FMT_E`:

  |이름 *|이름 *|이름 *|
  | :-------------------------------- | :--------------------------------------- | :-------- |
  | `TUYA_I2S_CHANNEL_FMT_RIGHT_LEFT` |왼쪽 및 오른쪽 채널 분리|           |
  | `TUYA_I2S_CHANNEL_FMT_ALL_RIGHT`  |오른쪽 채널 데이터를 두 채널 모두에로드|         |
  | `TUYA_I2S_CHANNEL_FMT_ALL_LEFT`   |왼쪽 채널 데이터를 두 채널에로드|          |
  | `TUYA_I2S_CHANNEL_FMT_ONLY_RIGHT` |Load only 정적 채널 데이터|단일 모드|
  | `TUYA_I2S_CHANNEL_FMT_ONLY_LEFT`  |Load only 왼쪽 채널 데이터|단일 모드|

  `TUYA_I2S_COMM_FORMAT_E`:

  |이름 *|주요 특징|이름 *|
  | :-------------------------------- | :----- | :-------------------------------------------------------------------------- |
  | `I2S_COMM_FORMAT_STAND_I2S`       | `0x01` |필립스 표준; 자료는 두번째 BCK에 발사합니다|
  | `I2S_COMM_FORMAT_STAND_MSB`       | `0x02` |MSB (왼쪽 정렬) 표준; 첫 번째 BCK에 데이터 시작|
  | `I2S_COMM_FORMAT_STAND_PCM_SHORT` | `0x04` |PCM 짧은 표준 (DSP 형태); WS 기간은 1개의 BCK 주기입니다|
  | `I2S_COMM_FORMAT_STAND_PCM_LONG`  | `0x0C` |PCM 긴 기준; WS 기간은 channel bit × BCK 주기입니다|

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_i2s_send(TUYA_I2S_NUM_E i2s_num, void *buff, uint32_t len);
```

I2S에 데이터를 보냅니다.

모수:

- `i2s_num`: 포트 번호.
- `buff`: 보낼 데이터에 포인터.
- `len`: 전송하는 자료의 길이.

반환:

- `OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2S`이름 *`tuya_error_code.h`.

## 프로젝트
```c
int tkl_i2s_recv(TUYA_I2S_NUM_E i2s_num, void *buff, uint32_t len);
```

I2S에 데이터를 비동기적으로 수신합니다.

모수:

- `i2s_num`: 포트 번호.
- `buff`: 데이터를 수신하는 버퍼에 포인터.
- `len`: 수신하는 데이터의 길이.

반환:

- 바이트의 수 읽기 (`>= 0`), 또는 가치 더 적은 보다는`0`오류에.

## 프로젝트
```c
OPERATE_RET tkl_i2s_send_stop(TUYA_I2S_NUM_E i2s_num);
```

I2S에 데이터를 전송합니다.

모수:

- `i2s_num`: 포트 번호.

반환:

- `OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2S`이름 *`tuya_error_code.h`.

## tkl i2s recv stop 의 확장 파일
```c
OPERATE_RET tkl_i2s_recv_stop(TUYA_I2S_NUM_E i2s_num);
```

I2S에 데이터를 수신 중지.

모수:

- `i2s_num`: 포트 번호.

반환:

- `OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2S`이름 *`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_i2s_deinit(TUYA_I2S_NUM_E i2s_num);
```

I2S 포트를 분리합니다.

모수:

- `i2s_num`: 포트 번호.

반환:

- `OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2S`이름 *`tuya_error_code.h`.
