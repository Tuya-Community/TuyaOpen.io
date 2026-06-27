---
title: Agent Metering and Billing
---

An AI agent bills for two things: the language model it runs and the smart voice it uses. This page lists each billing item, how it is calculated, and the current unit prices.

## Billing items

The agent's billing items are **model fees** and **smart voice fees**.

## Billing cycle

Each item is metered daily and settled by actual usage. Bills are usually generated one day after the billing cycle ends. The exact timing is set by the system.

## Model fees

### Available model types

To compare model types, see [Available Models](https://platform.tuya.com/exp/model).

### Billing formula

Model services are charged by token usage:

**Model fees = Token usage × Unit price per token**

A token is the basic unit of text a language model processes. The model breaks input text into a series of tokens, then processes and analyzes them. A token can be a word, a character, a subword fragment, or another text segment. How text is split depends on the model's tokenization algorithm, so token counts and processing vary by model architecture and design.

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

## Smart voice fees

### Billing formula

Smart voice covers voice input (ASR) and voice output (TTS):

**Smart voice fee = ASR unit price × input audio duration + TTS unit price × output character count**

- **Automatic speech recognition (ASR)**: Recognizes human speech and converts audio into text by analyzing speech signals.
- **Text to speech (TTS)**: Converts text into spoken audio, simulating human reading aloud.

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
