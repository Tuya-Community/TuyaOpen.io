---
title: Application
---

## TuyaOpen Applications

TuyaOpen provides a powerful application development platform that supports various types of application development:

### Core Advantages

- **One-stop Development**: From device connectivity to AI functionality, providing complete development solutions
- **Cloud Services**: Based on Tuya cloud platform, stable and reliable
- **AI Integration**: Seamless integration with advanced artificial intelligence technology
- **Flexible Expansion**: Support for custom application development

### Supported Application Types

- **tuya_cloud**: Connect to Tuya cloud IoT services for intelligent device control
  - Device connection and management
  - Remote control functionality

- **tuya.ai**: Connect to Tuya cloud IoT services and integrate with Tuya AI services
  - Intelligent device control
  - Access to global top-tier large models
  - Text and voice dialogue

### TuyaOpen Application List

TuyaOpen currently provides the following `IoT` applications:
1. `switch_demo` is an IoT device firmware that supports all chips.

   [Copy switch_demo product](https://pbt.tuya.com/s?p=b38aaa08d42d0d90ce4cdda28af92cf7&u=6232683ef12714848fae37955806cb9e&t=1)

TuyaOpen currently provides the following `AI+IoT` applications:

1. `your_chat_bot` is an AI chat dialogue robot, currently supporting T5AI and ESP32-S3.

   [Copy your_chat_bot product and agent](https://pbt.tuya.com/s?p=e766ed60b3a28ef8e381965cf0cbb035&u=6232683ef12714848fae37955806cb9e&t=1)

2. `duo_eye_mood` is an AI dual-eye expression dialogue robot, currently supporting T5AI.

   [Copy duo_eye_mood product and agent](https://pbt.tuya.com/s?p=e766ed60b3a28ef8e381965cf0cbb035&u=6232683ef12714848fae37955806cb9e&t=1)

# Terminology

## DP
DP is the abbreviation for Data Point, also occasionally called DP point or function point, representing the functions that smart devices possess. Tuya Smart abstracts each function into a data point, with data points defined as different types, such as boolean, enumeration, numeric, etc. Data points have read and write attributes. For example, a two-way switch can be abstracted into two data points, each with a boolean type that can take values of True or False. Data points are readable and writable - reading means getting the current value of the switch, writing means changing the current value of the switch.

## DPID
DPID is the ID of the DP event under the specified communication protocol.

## DPCode
DPCode is the unique identifier for DP events. In most cases, for the same DP event under different communication protocols, the DPCode is the same.

## Preparation

Before starting application development, please ensure the following preparations are completed:

### Environment Setup

**Required for Tuya service access**:
   - step1: [TuyaOpen Authorization Code](../quick-start/index.md#tuyaopen-authorization-code-acquisition)
   - step2: Obtain [Tuya Universal Serial Tool](https://www.tuyaopen.ai/zh/tools/tyutool) for firmware burning, TuyaOpen authorization code writing, serial debugging, etc.

### Basic Development Mode

All applications we provide come with default [PID](../quick-start/index.md#pid), with completed product function configuration and agent configuration. If you are new to TuyaOpen or AI agents, we recommend prioritizing the use of our default PID for AI+IoT product development experience.

Since PID belongs to the creator, developers cannot add new product functions under the default PID.

If you have product function modification requirements, we recommend adopting the advanced development mode after familiarizing yourself with the TuyaOpen development process, either by creating your own PID or copying the current product's default PID to your account for modification.

### Advanced Development Mode
If you need to develop your own Application, you also need to complete the following work:

1. **Develop IoT Applications**:
   - step1: Create PID (Product Identifier)

2. **Develop AI+IoT Applications**:
   - step1: Create PID (Product Identifier)
   - step2: Create an agent and bind the agent to the corresponding product PID

3. **Copy PID and Agent**

We provide copy functionality to help developers quickly complete products with the same functionality as the default PID. Depending on the product type, IoT products only include smart control functions [DP](#dp), while AI+IoT products will also copy the currently bound agent of the product.

After copying the default PID to the developer's own account, developers can modify and add smart control function DPs, and can also upgrade and optimize AI_IoT device agents.

You can select the needed product from the [TuyaOpen Application List](#tuyaopen-application-list) and click the corresponding link to copy.