---
title: "Bring-up 5：外设与 AI"
description: "移植 bring-up 最后阶段：在系统、存储、网络与云端稳定后，适配 GPIO、总线、音频与显示外设，并运行 your_chat_bot AI 应用。"
keywords:
  - 移植
  - 外设适配
  - AI 应用
  - I2S 音频
  - TuyaOpen 硬件
---

最后一个阶段把你产品实际用到的硬件搞起来——GPIO、总线、音频、显示、蓝牙——然后在已经稳固的基础之上运行 AI 应用。把它放到最后做：当系统、存储、网络和云端都已工作正常后，外设的 bug 就很容易定位。

## 目标

你产品的外设能够通过 TuyaOpen 工作，并且诸如 `your_chat_bot` 这样的 AI 应用能够端到端运行（语音输入、云端推理、语音/显示输出）。

## 需要实现的文件

只实现你产品所需要的部分。

| 文件 | 启用的能力 |
|------|---------|
| `tkl_gpio.c` / `tkl_pinmux.c` | GPIO 与引脚复用 |
| `tkl_i2c.c` / `tkl_spi.c` | I2C 和 SPI 总线（传感器、显示屏、编解码器） |
| `tkl_pwm.c` / `tkl_adc.c` / `tkl_dac.c` | PWM、ADC、DAC |
| `tkl_i2s.c` | I2S 音频——麦克风采集与扬声器播放 |
| `tkl_disp.c` *（或 `mcu8080` / `rgb` / `qspi`）* | 显示屏接口 |
| `tkl_bluetooth.c` | BLE——配网与 BLE 外设 |
| `tkl_kws.c` / `tkl_vad.c` | 唤醒词检测与语音活动检测 |
| `tkl_ota.c` | OTA 固件升级 |

## 细节

- **音频是 AI 的前置条件。** `your_chat_bot` 需要可用的 I2S 采集与播放；先把 `tkl_i2s.c` 搞起来，并在加入云端 AI 层之前验证麦克风到扬声器的回环。
- **显示**仅在做端侧 AI UI 时才需要；选择你的屏幕所用的接口（`mcu8080`、`rgb` 或 `qspi`）。
- **唤醒词。** `tkl_kws.c` / `tkl_vad.c` 让设备能在听到某个关键词时被唤醒；请为你的平台提供模型文件。
- **逐个验证外设**，先用[外设示例](../../../peripheral/support_peripheral_list)验证，再把它们组合进应用。
- 端侧 AI 栈本身（模式、agent、UI）是复用的——参见[组件框架](../../../cloud/device-ai/ai-components/ai-components.md)；你只需通过这些适配文件提供硬件。

## 验证

运行相关的外设示例（GPIO、I2C、音频）并确认每一个都能工作。然后构建 `apps/tuya.ai/your_chat_bot`，并确认一次完整的语音往返：说话 → ASR → 云端回复 → TTS 播放（如有屏幕，还包括显示）。这样就完成了平台移植。

## 参见

- [组件框架](../../../cloud/device-ai/ai-components/ai-components.md)——你在其上运行的端侧 AI 栈
- [多模态数据流](../../../cloud/device-ai/multimodal-data-flow)——音频/视觉如何抵达云端
- [支持的外设](../../../peripheral/support_peripheral_list)
- [将你的芯片接入 TuyaOpen](../bring-your-chip-to-tuyaopen)
