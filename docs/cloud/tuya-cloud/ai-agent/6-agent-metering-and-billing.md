---
title: Agent Metering and Billing
---

# **Agent Metering and Billing**

# **Overview**

This topic describes the various billing items and related costs of the AI agent.

# **Billing items**

The agent’s billing items currently include **model fees** and **smart voice fees**.

# **Billing cycle**

Each billing item is charged daily, and the fees are settled based on actual usage. Bills are typically generated one day after the current billing cycle ends, with the exact timing determined by the system.

# **Model fees**

### Available model types

For more information about how to differentiate model types, see [Available Models](https://platform.tuya.com/exp/model).

### Billing formula

Model services are charged based on the model’s token usage. The billing formula is as follows:

**Model fees = Token usage × Unit price of tokens**

In a large language model, a token is the basic unit of text processing. The model usually breaks down the input text into a series of tokens and then processes and analyzes these tokens. Tokens can be words, characters, subword fragments, or other text segments. The specific segmentation is determined by the model’s tokenization algorithm. Therefore, token calculation and processing methods might vary depending on the model’s architecture and design.

### Unit price

| Model name | Billing item | Unit price (per million tokens) |
| --- | --- | --- |
| Qwen | Qwen-Max input | ¥2.40 |
|  | Qwen-Max output | ¥9.60 |
| Doubao | Doubao-Pro-32k input | ¥0.80 |
|  | Doubao-Pro-32k output | ¥2.00 |
| DeepSeek | Deepseek-Chat input | ¥2.00 |
|  | Deepseek-Chat output | ¥8.00 |
| ChatGPT | GPT-4o input | $2.50 |
|  | GPT-4o output | $10.00 |
|  | GPT-4o-mini input | $0.15 |
|  | GPT-4o-mini output | $0.60 |
| Gemini | Gemini-1.5-pro input | $1.25 |
|  | Gemini-1.5-pro output | $2.50 |
|  | Gemini-2.0-flash input | $0.10 |
|  | Gemini-2.0-flash output | $0.40 |
| Mistral | Mistral Large input | - |
|  | Mistral Large output | - |
| Claude | Claude 3.5 Haiku input | $0.80 |
|  | Claude 3.5 Haiku output | $4.00 |
|  | Claude 3.7 Sonnet input | $3.00 |
|  | Claude 3.7 Sonnet output | $15.00 |
| Nova | Nova Pro input | - |
|  | Nova Pro output | - |

# **Smart voice fees**

### Billing formula

Smart voice service consists of voice input (ASR) and voice output (TTS). The billing formula is as follows:

**Smart voice fee = ASR unit price × input audio duration + TTS unit price × output audio character count**

- **Automatic speech recognition (ASR)**: A technology that can recognize and understand natural human audio language input, converting audio into text by analyzing and processing speech signals.
- **Text to speech (TTS)**: A technology that converts text into speech output, simulating human reading aloud to transform written information into audio.

### Unit price

| ASR vendor | Unit price (per hour) |
| --- | --- |
| AISpeech | ¥5.00 |
| Google | $1.44 |

| TTS vendor | Unit price (per thousand characters) |
| --- | --- |
| AISpeech | ¥0.20 |
| Volcano Ark | ¥0.30 |
| Azure | $0.015 |