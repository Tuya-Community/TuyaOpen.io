# tkl_timer | Timer Driver

## Overview

A timer is an on-chip peripheral in microprocessors used for time measurement. Depending on the actual configuration requirements, different timing precisions are typically available, such as 16-bit and 32-bit. During practical use, configure parameters including the timer period, counting mode, and interrupt service routine.

## API description

### tkl_timer_init

```c
OPERATE_RET tkl_timer_init(TUYA_TIMER_NUM_E timer_id, TUYA_TIMER_BASE_CFG_T *cfg);
```

- Feature: Initializes the specified timer instance using the port number and basic configuration, and returns the initialization result.
- Parameters:

   - `timer_id`: The port number.
   - `cfg`: The basic configuration of the timer, including timing mode, callback function, and callback function parameters.

    ```c
    typedef struct {
        TKL_TIMER_MODE_E    mode;
        TKL_TIMER_ISR_CB    cb;
        void                    *args;
    } TUYA_TIMER_BASE_CFG_T;
    ```

    `TKL_TIMER_MODE_E`:

    | Parameter                  | Definition     |
    | :-------------------- | :------- |
    | TKL_TIMER_MODE_ONCE   | One-shot timer. |  
    | TKL_TIMER_MODE_PERIOD | Periodic timer. |      

- Return value: `OPRT_OK` indicates a success. Any other value indicates an error. For detailed error codes, refer to `tuya_error_code.h`.

### tkl_timer_deinit

```c
OPERATE_RET tkl_timer_deinit(TUYA_TIMER_NUM_E timer_id);
```

- Feature:
   - Deinitializes the timer instance.
   - This interface will stop the timer and release related software and hardware resources.
- Parameter: `timer_id` indicates the port number.
- Return value: `OPRT_OK` indicates a success. Any other value indicates an error. For detailed error codes, refer to `tuya_error_code.h`.

### tkl_timer_start

```c
OPERATE_RET tkl_timer_start(TUYA_TIMER_NUM_E timer_id, uint32_t us);
```

- Feature: Starts the timer.

- Parameters:

   - `timer_id`: The port number.

   - `us`: The timing interval of the timer.

- Return value: `OPRT_OK` indicates a success. Any other value indicates an error. For detailed error codes, refer to `tuya_error_code.h`.

### tkl_timer_stop

```c
OPERATE_RET tkl_timer_stop(TKL_TIMER_PORT_E port);
```

- Feature: Stops the timer.
- Parameter: `port` indicates the port number.
- Return value: `OPRT_OK` indicates a success. Any other value indicates an error. For detailed error codes, refer to `tuya_error_code.h`.

### tkl_timer_get

```c
OPERATE_RET tkl_timer_get(TKL_TIMER_PORT_E port, uint32_t *us);
```

- Feature: Gets the timing interval of the timer.
- Parameters:
   - `port`: The port number.
   - `us`: The timing interval value, unit: μs, corresponding to the value set by `tkl_timer_start`.
- Return value: `OPRT_OK` indicates a success. Any other value indicates an error. For detailed error codes, refer to `tuya_error_code.h`.

### tkl_timer_get_current_value

```c
OPERATE_RET tkl_timer_get_current_value(TUYA_TIMER_NUM_E timer_id, uint32_t *us);
```

- Feature: Gets the actual count value of the timer.
- Parameters:
   - `timer_id`: The port number.
   - `us`: The actual count value, unit: μs.
- Return value: `OPRT_OK` indicates a success. Any other value indicates an error. For detailed error codes, refer to `tuya_error_code.h`.

## Example

```c
static void tkl_timer_isr_cb_fun(void *args)
{
	PR_NOTICE("hw_timer test");
}

void tuya_timer_test(void)
{
    OPERATE_RET ret;
 	TUYA_TIMER_BASE_CFG_T cfg;
    uint32_t interval_us;
    uint32_t get_us；

    cfg.mode = TUYA_TIMER_MODE_PERIOD;
    cfg.cb = tkl_timer_isr_cb_fun;
    cfg.arg = NULL;

    ret = tkl_timer_init(TUYA_TIMER_NUM_0, &cfg);
    if (ret != OPRT_OK) {
        //fail
        return;
    }
    ret = tkl_timer_start(TUYA_TIMER_NUM_0, 1000);
    if (ret != OPRT_OK) {
        //fail
        return;
    }
    tkl_system_delay(5000);
    ret = tkl_timer_stop(TUYA_TIMER_NUM_0);
    if (ret != OPRT_OK) {
        //fail
        return;
    }
    ret = tkl_timer_get(TUYA_TIMER_NUM_0, &interval_us);
    if (ret != OPRT_OK) {
        //fail
        return;
    }
	if(interval_us != 2000){
        interval_us = 2000;
    }
    ret = tkl_timer_start(TUYA_TIMER_NUM_0, interval_us);
    if (ret != OPRT_OK) {
        //fail
        return;
    }
    tkl_system_delay(1000);
    ret = tkl_timer_get_current_value(TUYA_TIMER_NUM_0, &get_us);
    if (ret != OPRT_OK) {
        //fail
        return;
    }
    PR_DEBUG("current run time:%d us", get_us);
    tkl_system_delay(5000);
    //uninitialize iic
    ret = tkl_timer_deinit(TUYA_TIMER_NUM_0);
    if (ret != 0) {
       //failed
    }
}
```
