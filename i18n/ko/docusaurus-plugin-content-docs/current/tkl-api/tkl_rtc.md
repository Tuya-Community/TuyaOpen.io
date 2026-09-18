---
title: tkl rtc | RTC 드라이버
description: "tkl rtc reference — TuyaOpen 실시간 시계 (RTC) 드라이버 TKL API init, deinit 및 set/getting UTC 시간 임베디드 IoT 개발."
keywords:
  - tkl_rtc
  - tuyaopen rtc driver
  - tkl rtc api
  - embedded rtc driver
---

## 제품정보
`tkl_rtc`TKL 실시간 시계 (RTC) 인터페이스입니다. RTC는 한 초의 기본을 유지하고 메인 프로그램 흐름을 독립적 인 초 UTC 타임스탬프로 벽시 시간을 추적합니다.

대부분의 SoCs는 내부 RTC 하드웨어 단위를 포함하고 직접 읽습니다. 몇몇 SoCs는 I2C 또는 SPI에 외부 주변을 통해 RTC를 확장합니다.

이 드라이버는 4 개의 기능을 노출 : RTC를 초기화하고, 설정하고 현재 시간을 얻습니다.

## 사이트맵
```c
OPERATE_RET tkl_rtc_init(void);
```

RTC를 초기화하고 결과를 반환합니다.

모수:

- 없음.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## 사이트맵
```c
OPERATE_RET tkl_rtc_deinit(void);
```

RTC를 분리하고 그것을 중지합니다.

모수:

- 없음.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl rtc time set의 경우
```c
OPERATE_RET tkl_rtc_time_set(TIME_T time_sec);
```

RTC 시간을 설정합니다.

모수:

- `time_sec`: 초 UTC 시간.`TIME_T`정의:

  ```c
  typedef unsigned int TIME_T;
  ```

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl rtc time get의 경우
```c
OPERATE_RET tkl_rtc_time_get(TIME_T *time_sec);
```

현재 RTC 시간을 가져옵니다.

모수:

- `time_sec`: 몇 초에 UTC 시간을 수신하는 포인터.`TIME_T`정의:

  ```c
  typedef unsigned int TIME_T;
  ```

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## 이름 *
```c
/* Initialize the RTC */
tkl_rtc_init();

/* Set the RTC time */
TIME_T time_sec_set = 0x1000000;
tkl_rtc_time_set(time_sec_set);

/* Get the RTC time */
TIME_T time_sec_get = 0;
tkl_rtc_time_get(&time_sec_get);

/* Deinitialize the RTC */
tkl_rtc_deinit();
```
