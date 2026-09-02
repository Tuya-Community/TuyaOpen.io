---
title: Agent Metering and Billing
description: "Agent metering and billing on Tuya — credits as the billing unit, model and AI voice fees, extended capability fees, and the daily fee waiver."
keywords:
  - agent metering billing
  - tuya ai agent
  - model fees
  - token pricing
  - credits
  - fee waiver
---

This topic describes the billing items of an AI agent and how each is calculated.

:::info[Prices change; this page is a mirror]

The authoritative source is the [AI billing rules](https://developer.tuya.com/en/docs/iot/ai-agent-price?id=Kegb2s2shaj4d) on the Tuya Developer Platform. The tables below were synced from it on 2026-09-02. Check the source before quoting a figure in a contract or a cost model.

:::

## Credits

The platform uses **credits** as the unified billing unit. You buy credits through value-added services, and credits are deducted based on your actual usage of billable items.

## Billing cycle

All billable items are charged daily: the platform calculates the credits consumed each day from actual usage. Invoices are typically generated two days after the end of the billing cycle, with the exact timing subject to system processing.

## Fee structure

An agent is charged on a pay-as-you-go basis:

```text
Total fee = Model fee + AI voice fee + Extended capability fee − Waived fee
```

Each term is described below.

## Model fees

Model services are charged on token usage:

```text
Model fee = Token usage × Unit price of tokens
```

A **token** is the basic unit of text processing in a large language model. The model breaks input text into a series of tokens, then processes and analyzes them. Tokens can be words, characters, subword fragments, or other text segments — the segmentation depends on the model's tokenizer, so token counts vary between model architectures.

For how to differentiate models, see [Available Models](https://platform.tuya.com/exp/model).

### Unit prices

**Qwen**

| Billing item | Credits / million tokens | Amount / million tokens |
| --- | --- | --- |
| Qwen-max input | 37.50 | ¥2.50 |
| Qwen-max output | 150.00 | ¥10.00 |
| Qwen-turbo-latest input | 4.50 | ¥0.30 |
| Qwen-turbo-latest output | 9.00 | ¥0.60 |
| Qwen3-32b input | 11.25 | ¥0.75 |
| Qwen3-32b output | 112.50 | ¥7.50 |
| Qwen3-max input | 37.50 | ¥2.50 |
| Qwen3-max output | 150.00 | ¥10.00 |
| Qwen-flash input | 2.25 | ¥0.15 |
| Qwen-flash output | 22.50 | ¥1.50 |
| Qwen-plus input | 12.00 | ¥0.80 |
| Qwen-plus output | 30.00 | ¥2.00 |

**Doubao**

| Billing item | Credits / million tokens | Amount / million tokens |
| --- | --- | --- |
| Doubao-seed-1.6-flash input | 4.50 | ¥0.30 |
| Doubao-seed-1.6-flash output | 45.00 | ¥3.00 |
| Doubao-seed-1.6 input | 12.00 | ¥0.80 |
| Doubao-seed-1.6 output | 30.00 | ¥2.00 |
| Doubao-seed-1.8 input | 12.00 | ¥0.80 |
| Doubao-seed-1.8 output | 30.00 | ¥2.00 |
| Doubao-seed-2.0-mini input | 3.00 | ¥0.20 |
| Doubao-seed-2.0-mini output | 30.00 | ¥2.00 |
| Doubao-seed-2.0-Pro input | 48.00 | ¥3.20 |
| Doubao-seed-2.0-Pro output | 240.00 | ¥16.00 |

**DeepSeek**

| Billing item | Credits / million tokens | Amount / million tokens |
| --- | --- | --- |
| DeepSeek v3 input | 30.00 | ¥2.00 |
| DeepSeek v3 output | 120.00 | ¥8.00 |

**MiniMax**

| Billing item | Credits / million tokens | Amount / million tokens |
| --- | --- | --- |
| MiniMax-m2.7 input | 33.00 | ¥2.20 |
| MiniMax-m2.7 output | 130.50 | ¥8.70 |

**ChatGPT**

| Billing item | Credits / million tokens | Amount / million tokens |
| --- | --- | --- |
| GPT-4o input | 250.00 | $2.50 |
| GPT-4o output | 1000.00 | $10.00 |
| GPT-4o-mini input | 15.00 | $0.15 |
| GPT-4o-mini output | 60.00 | $0.60 |
| GPT-5 input | 125.00 | $1.25 |
| GPT-5 output | 1000.00 | $10.00 |
| GPT-5-mini input | 25.00 | $0.25 |
| GPT-5-mini output | 200.00 | $2.00 |
| GPT-5-nano input | 5.00 | $0.05 |
| GPT-5-nano output | 40.00 | $0.40 |
| GPT-5.1 input | 125.00 | $1.25 |
| GPT-5.1 output | 1000.00 | $10.00 |
| GPT-5.2 input | 175.00 | $1.75 |
| GPT-5.2 output | 1400.00 | $14.00 |
| GPT-5.4 input | 250.00 | $2.50 |
| GPT-5.4 output | 1500.00 | $15.00 |
| GPT-5.4-mini input | 75.00 | $0.75 |
| GPT-5.4-mini output | 450.00 | $4.50 |
| GPT-5.4-nano input | 20.00 | $0.20 |
| GPT-5.4-nano output | 125.00 | $1.25 |

**Gemini**

| Billing item | Credits / million tokens | Amount / million tokens |
| --- | --- | --- |
| Gemini-2.0-flash input | 10.00 | $0.10 |
| Gemini-2.0-flash output | 40.00 | $0.40 |
| Gemini-2.5-pro input | 125.00 | $1.25 |
| Gemini-2.5-pro output | 1000.00 | $10.00 |
| Gemini-2.5-flash input | 30.00 | $0.30 |
| Gemini-2.5-flash output | 250.00 | $2.50 |
| Gemini-3-flash input | 50.00 | $0.50 |
| Gemini-3-flash output | 300.00 | $3.00 |
| Gemini-3.1-pro input | 200.00 | $2.00 |
| Gemini-3.1-pro output | 1200.00 | $12.00 |

**Mistral**

| Billing item | Credits / million tokens | Amount / million tokens |
| --- | --- | --- |
| Mistral-large-latest input | 800.00 | $8.00 |
| Mistral-large-latest output | 2400.00 | $24.00 |

## AI voice fees

AI voice covers speech input (Automatic Speech Recognition, ASR) and speech output (Text-to-Speech, TTS):

```text
ASR fee = ASR unit price × Input audio duration
TTS fee = TTS unit price × Output character count
```

- **ASR** recognizes and understands natural human speech input, converting speech to text by analyzing audio signals.
- **TTS** converts text into spoken audio output, simulating human speech.

### Unit prices

| ASR provider | ASR model | Credits / hour | Amount / hour |
| --- | --- | --- | --- |
| ALIYUN | paraformer-realtime-v2 | 1.95 | ¥0.13 |
| TENCENT | 16k_zh_en | 48.00 | ¥3.20 |
| VOLCANO | volcengine_streaming_common | 52.50 | ¥3.50 |
| VOLCANO | bigmodel | 67.50 | ¥4.50 |
| AZURE | azure-stt-standard | 100.00 | $1.00 |
| ELEVENLABS | scribe_v1_experimental | 22.00 | $0.22 |

| TTS provider | TTS model | Credits / 10,000 characters | Amount / 10,000 characters |
| --- | --- | --- | --- |
| ALIYUN | cosyvoice-v3-plus | 30.00 | ¥2.00 |
| ALIYUN | cosyvoice-v3-flash | 15.00 | ¥1.00 |
| TENCENT | default | 135.00 | ¥9.00 |
| VOLCANO | seed-tts-1.0 | 75.00 | ¥5.00 |
| VOLCANO | seed-tts-2.0 | 45.00 | ¥3.00 |
| AZURE | neural | 15.00 | $0.15 |
| AZURE | multilingual-neural | 15.00 | $0.15 |
| AZURE | dragon-hd-latest | 22.00 | $0.22 |
| AZURE | dragon-hd-flash | 22.00 | $0.22 |
| GOOGLE | chirp3-hd | 30.00 | $0.30 |
| GOOGLE | studio | 160.00 | $1.60 |
| GOOGLE | neural2 | 16.00 | $0.16 |
| GOOGLE | wavenet | 4.00 | $0.04 |
| GOOGLE | polyglot | 16.00 | $0.16 |
| GOOGLE | standard | 4.00 | $0.04 |
| MINIMAX | speech-02-turbo | 30.00 | ¥2.00 |

## Extended capability fees

Depending on how the agent is configured, it may use AI capabilities beyond the basics above. Configure these under **My Agent > Develop > Model Configuration**, or in Workflow Management.

### Timbre cloning TTS fees

After you enable and publish **Timbre Cloning**, users can talk to the agent in the cloned voice. Fees are incurred on actual usage of those conversations.

| Vendor | Model | Credits / 10,000 characters | Amount / 10,000 characters |
| --- | --- | --- | --- |
| VOLCANO | seed-icl-1.0 | 120.00 | ¥8.00 |
| ALIYUN | cosyvoice-v3-plus | 30.00 | ¥2.00 |
| ALIYUN | cosyvoice-v3-flash | 15.00 | ¥1.00 |
| AZURE | DragonLatestNeural | 22.00 | $0.22 |
| GOOGLE | google-voice-clone | 60.00 | $0.60 |

### AI image generation fees

After you configure and publish the image generation node in a workflow, the agent can generate images. Fees are incurred on actual usage.

:::note

This node is not open yet.

:::

| Vendor | Model | Credits / image | Amount / image |
| --- | --- | --- | --- |
| VOLCANO | doubao-seedream-4.0 | 3.00 | ¥0.20 |
| VOLCANO | doubao-seedream-5.0-lite | 3.30 | ¥0.22 |
| ALIYUN | z-image-turbo | 1.50 | ¥0.10 |
| GOOGLE | gemini-2.5-flash-image | 4.00 | $0.04 |

### Web search fees

After you configure and publish the **Web Search** tool for an agent or workflow, it can retrieve real-time web information. Fees are incurred per search operation.

| Vendor | Model | Credits / 1,000 requests | Amount / 1,000 requests |
| --- | --- | --- | --- |
| VOLCANO | Volcano Colab (pay-as-you-go) | 450.00 | ¥30.00 |
| BRAVE | brave | 800.00 | $8.00 |

### Historical conversation summary fees

After you enable and publish **Historical conversation summary**, the agent can analyze past conversations. Fees are incurred on usage.

| Vendor | Model | Billing item | Credits / million tokens | Amount / million tokens |
| --- | --- | --- | --- | --- |
| ALIYUN | qwen-plus | Input | 12.00 | ¥0.80 |
| ALIYUN | qwen-plus | Output | 30.00 | ¥2.00 |
| GOOGLE | gemini-2.5-pro | Input | 125.00 | $1.25 |
| GOOGLE | gemini-2.5-pro | Output | 1000.00 | $10.00 |

### Event memory fees

After you enable and publish **Conversation Event Memory**, the agent remembers event history long-term, so it can refer back to things that happened far earlier in a conversation. Fees are incurred on usage.

| Vendor | Model | Billing item | Credits / million tokens | Amount / million tokens |
| --- | --- | --- | --- | --- |
| ALIYUN | qwen3-max | Input | 37.50 | ¥2.50 |
| ALIYUN | qwen3-max | Output | 150.00 | ¥10.00 |
| OPENAI | gpt-5.1 | Input | 125.00 | $1.25 |
| OPENAI | gpt-5.1 | Output | 1000.00 | $10.00 |

## Fee waivers

When the agent is deployed to a device for direct connection, these waivers apply.

### Basic AI fee waiver

If you enabled the **AI Agent Integration** advanced feature while developing the product, a set quota is waived against the device's daily consumption. **Once that daily quota is used up, the excess is billed.**

### Subscription model fee waiver

If you enroll the product in the **Subscription Model**, Tuya provides device-side subscription plans, benefit distribution and usage statistics. On top of the basic AI waiver, the product is eligible for further waivers, potentially reaching a full waiver.

## See also

- [AI billing rules](https://developer.tuya.com/en/docs/iot/ai-agent-price?id=Kegb2s2shaj4d) — the authoritative, always-current version of this page.
- [Licensing & pricing](/pricing) — what the per-device license covers, and what it does not.
