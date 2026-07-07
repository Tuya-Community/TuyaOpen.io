---
title: "Bring-up 5: Peripherals and AI"
description: "Bring-up stage 5 for TuyaOpen porting — bring up GPIO, buses, audio, display, and Bluetooth, then run an AI app such as your_chat_bot."
keywords:
  - tuyaopen porting
  - bring-up
  - peripherals
  - ai
  - your_chat_bot
---

The final stage brings up the hardware your product actually uses — GPIO, buses, audio, display, Bluetooth — and then runs the AI application on top of the now-solid base. Do this last: a peripheral bug is easy to find once system, storage, network, and cloud already work.

## Goal

Your product's peripherals work through TuyaOpen, and an AI application such as `your_chat_bot` runs end to end (voice in, cloud reasoning, voice/display out).

## Files to implement

Implement only what your product needs.

| File | Enables |
|------|---------|
| `tkl_gpio.c` / `tkl_pinmux.c` | GPIO and pin multiplexing |
| `tkl_i2c.c` / `tkl_spi.c` | I2C and SPI buses (sensors, displays, codecs) |
| `tkl_pwm.c` / `tkl_adc.c` / `tkl_dac.c` | PWM, ADC, DAC |
| `tkl_i2s.c` | I2S audio — microphone capture and speaker playback |
| `tkl_disp.c` *(or `mcu8080` / `rgb` / `qspi`)* | Display panel interface |
| `tkl_bluetooth.c` | BLE — provisioning and BLE peripherals |
| `tkl_kws.c` / `tkl_vad.c` | Wake-word spotting and voice activity detection |
| `tkl_ota.c` | OTA firmware update |

## Details

- **Audio is the AI prerequisite.** `your_chat_bot` needs working I2S capture and playback; bring up `tkl_i2s.c` and verify a microphone-to-speaker loopback before adding the cloud AI layer.
- **Display** is needed only for on-device AI UIs; pick the interface your panel uses (`mcu8080`, `rgb`, or `qspi`).
- **Wake word.** `tkl_kws.c` / `tkl_vad.c` let the device wake on a keyword; supply the model files for your platform.
- **Validate peripherals individually** with the [peripheral examples](../../../peripheral/support_peripheral_list) before composing them into the app.
- The on-device AI stack itself (modes, agent, UI) is reused — see the [Component Framework](../../../cloud/device-ai/ai-components/ai-components.md); you only provide the hardware via these adapters.

## Verify

Run the relevant peripheral examples (GPIO, I2C, audio) and confirm each works. Then build `apps/tuya.ai/your_chat_bot`, and confirm a full voice round-trip: speak → ASR → cloud reply → TTS playback (and display, if present). That completes the platform port.

## See also

- [Component Framework](../../../cloud/device-ai/ai-components/ai-components.md) — the on-device AI stack you run on top
- [Multimodal data flow](../../../cloud/device-ai/multimodal-data-flow) — how audio/vision reach the cloud
- [Supported peripherals](../../../peripheral/support_peripheral_list)
- [Bring Your Chip to TuyaOpen](../bring-your-chip-to-tuyaopen)
