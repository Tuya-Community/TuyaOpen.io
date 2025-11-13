---
title: "AI Coding Accelerates TuyaOpen Development"
authors: [tuya]
tags: ["AI", "TuyaOpen", "Development", "Tutorial"]
---

# AI Coding Accelerates TuyaOpen Development

## Overview

In the current era of AI technology boom, ordinary objects around us can be redefined and given intelligence. Today, let's unlock an interesting approach: using the Tuya T5AI-Board development board to create a **customized smart desktop chatbot**.

With the powerful support of the TuyaOpen framework and Tuya intelligent agents, even beginners with zero foundation can easily achieve "zero-code" development with AI Coding tools: it can not only keenly capture emotional fluctuations in conversations but also display corresponding images in real-time to convey emotional tension. What's even more surprising is that in a short time, the development board can transform into a fully playable game console, easily achieving a cross-boundary transformation from a chat assistant to an entertainment device.

### Effect Images

| Initial Effect | Final Effect |
| --- | --- |
| <img alt="Initial Effect" src="https://images.tuyacn.com/content-platform/hestia/175609316343564ed226c.png" width="640"  /> |<img alt="Final Effect" src="https://images.tuyacn.com/content-platform/hestia/1756101670562a63c3c0a.png" width="700"  />|

### About TuyaOpen

TuyaOpen is an open-source, open development framework designed for the AIoT industry, built on TuyaOS, a mature commercial-grade IoT system. It inherits core features such as cross-platform compatibility, cross-system support, modularity, and robust security compliance, verified through the deployment of over 100 million devices and millions of users worldwide.

TuyaOpen integrates edge-side AI inference engines, supports Tuya cloud intelligent agent hub, and supports edge-cloud fusion multimodal AI capabilities. You can seamlessly call domestic compliant large models (such as DeepSeek, Tongyi Qianwen, Doubao) or flexibly connect to world-class AI services (such as ChatGPT, Claude, Gemini). Through a diverse tool ecosystem, you can achieve various AI functions such as text and voice conversations, image generation, and video generation.

## Hardware Introduction

First, please learn about the [T5AI-Board development board](https://developer.tuya.com/cn/docs/iot-device-dev/T5-E1-IPEX-development-board?id=Ke9xehig1cabj) related information.

For detailed parameters of the development board, please refer to the following table:

| Device | Parameters |
|----------|---------------------|
| T5AI-Board | Main control module: T5-E1-IPEX module ARMv8-M Star (M33F) @480MHz, 16 KB ITCM + 16 KB DTCM, 8 MB SiP Flash, 16 MB SiP PSRAM, 640 KB Share SRAM |
| Screen | RGB565 touchscreen, 480 x 320 pixels, display driver chip: ILI9488, touch driver chip: GT1151 |

![T5AI-Board Development Board.png](https://images.tuyacn.com/content-platform/hestia/17561085897400828f8e3.png)

## Clone Repository and Compile & Flash

Search for **TuyaOpen.ai** in your browser to access the TuyaOpen Git repository and copy the repository link as shown below. Clone the TuyaOpen SDK to your local machine, then add the AI chatbot project `your_chat_bot` to the conversation and let the AI Coding tool automatically execute compilation and flashing.

- GitHub Repository: https://github.com/tuya/TuyaOpen
- Gitee Repository: https://gitee.com/tuya-open/TuyaOpen

### Prompt Template

You can refer to the following template to write prompts for the AI Coding tool to guide it in executing compilation and flashing:

```
Help me compile and flash this project
Set up compilation environment
Help me compile and flash this project, compilation and flashing methods refer to readme documentation and the links below
Environment setup
https://tuyaopen.ai/zh/docs/quick-start/enviroment-setup
Compilation:
https://tuyaopen.ai/zh/docs/quick-start/project-compilation
Flashing:
https://tuyaopen.ai/zh/docs/quick-start/firmware-burning
```

![Prompt Template.png](https://images.tuyacn.com/content-platform/hestia/1756191238cfcb3b4eb39.png)


## Authorize Development Board

If the device still cannot be discovered in the **Tuya** App after flashing is complete, the development board needs to be authorized.

Open the `your_chat_bot` project and set the following parameters in the `apps/tuya.ai/your_chat_bot/include/tuya_config.h` file:
- `TUYA_OPENSDK_UUID`: UUID can be obtained for free, please scan the QR code below to join the group and contact Tuya staff to receive it.
- `TUYA_OPENSDK_AUTHKEY`: Authkey can be obtained for free, please scan the QR code below to join the group and contact Tuya staff to receive it.

<img alt="Group QR Code" src="https://images.tuyacn.com/content-platform/hestia/1756115540e394937a07f.png" width="300"  />

![UUID.png](https://images.tuyacn.com/content-platform/hestia/17561097834516e414c77.png)

For detailed authorization operations, please refer to [Device Authorization](https://tuyaopen.ai/zh/docs/quick-start/equipment-authorization).

:::info
If the T5 module you purchased has already been flashed with TuyaOpen authorization code, you do not need to fill in UUID and Authkey.
:::

## Prepare Images

Generate images corresponding to 7 emotions: "happy, angry, sad, shocked, confused, like, thinking" on an image generation website, then modify the image pixels to **240 x 240** (because the T5 development board has limited Flash space, larger images take up more Flash space, so image size needs to be reduced).

Currently, Tuya Agent will return up to 21 emotion values based on conversations, as shown in the following table:

| Emoji | Expression | Emoji | Expression | Emoji | Expression |
|-------|------------|-------|------------|-------|------------|
| 😶 | Neutral | 😳 | Embarrassed | 😌 | Relaxed |
| 🙂 | Happy | 😯 | Surprise | 🤤 | Delicious |
| 😆 | Laughing | 😱 | Shocked | 😘 | Kissy |
| 😂 | Funny | 🤔 | Thinking | 😏 | Confident |
| 😔 | Sad | 😉 | Winking | 😴 | Sleepy |
| 😠 | Angry | 😎 | Cool | 😜 | Silly |
| 😭 | Crying | 🙄 | Confused | 😍 | Loving |

## Add Images to Project

In embedded development, displaying images on screen is usually quite complex. When writing code manually, you need to crop images to fixed sizes, then convert them to C array format, while also considering screen size, image storage location, and other detailed factors.

Therefore, when using AI Coding tools, the more detailed and specific the prompt description, the more accurate and ideal the final effect will be. If there are reference cases, code snippets, or requirement documents, it is recommended to provide them to the tool as reference; if technical details required for development can be clarified in advance, it can further improve the tool's output relevance and reduce subsequent adjustment costs.

For example, when asking AI to implement image screen display functionality, you need to explicitly instruct it to first convert images to C array format; otherwise, AI may default to using file path calls, directly trying to open image files in PNG or JPG formats. In addition, image encoding formats are diverse (such as RGB565, RGB888, etc.). If not specified in advance, even if the display effect can be achieved through multiple debugging compilations, it will significantly increase the number of debugging iterations and costs.

### Typical Image Encoding Formats

The following table lists common PNG image encoding formats:

| Scenario | Typical Encoding Format and Description |
|-----------------|----------------------|
| Desktop Display PNG | RGB24: Standard true color, ARGB32: Supports transparency |
| Embedded UI (such as LVGL) | RGB565/Indexed Color: Uses 16-bit color or indexed color to save resources |
| Game/Video Rendering | RGBA8888: High-performance GPUs typically use 32-bit format |

### Prompt Template

To make the AI Coding tool understand requirements more accurately, parameters such as image format, size specifications, and image storage location supported by the target device need to be clearly defined. This can effectively reduce compilation debugging times and improve development efficiency. You can refer to the following template for configuration.

```
Goal: Help me add images from the image folder to the your_chat_bot project. Replace the text emoji displayed for emotion in the current project src/display/ui/ui_chatbot.c, change to display images from the image folder based on emotion values. Use LVGL RGB565 format for images, images need to be converted to C array format.
Constraints: If ROM overflows, reduce to 4 main images (Happy, Sad, Angry, Love)
Technology: The screen size used in the current project is H 480, W 320 pixels, using LVGL V8 version GUI library
Verification: Compilation succeeds with no ROM overflow, images display normally after flashing
Alternative: If 240x240 fails, try 120x120 or further reduce the number of images
```

![Prompt Template.png](https://images.tuyacn.com/content-platform/hestia/1756114763298dd9e9663.png)

After accurately identifying your core intent, the AI Coding tool can automatically generate a Python-based image conversion tool in the target project.

![Generated Tool.png](https://images.tuyacn.com/content-platform/hestia/1756115044f42f98b5006.png)

## Add 2048 Game Interface

Before developing the 2048 game interface, you need to plan the interface design through the AI Coding tool. After providing information such as controller chip performance limitations and screen pixel size to the AI Coding tool, the tool will plan a 4 × 4 board game interface; if actual performance meets standards, a 5 × 5 board layout can be considered later.

<img alt="Example Image" src="https://images.tuyacn.com/content-platform/hestia/17561158982c6d7812f26.png" width="500"  />

The purpose of this step is to confirm in advance whether the final output effect of the AI Coding tool matches expectations before issuing the function implementation instruction; if there are deviations, additional constraints can be added to the prompt to correct them.

### Prompt Template

After checking the 2048 game interface plan planned by the AI Coding tool, issue an instruction to create a 2048 game interface: need to set a toggle button on the screen to achieve interactive switching between chat interface and game interface; at the same time, the 2048 game interface needs to be saved separately in UI file format for convenient project management.


```
Goal: Help me add a 2048 game interface to the your_chat_bot project, only need to implement basic 2048 game functionality with score statistics. Can switch back and forth between chat interface and game interface through a button.
Constraints: The screen resolution size in the current project is H 480, W 320 pixels, game interface is a 4*4 board.
Verification: Compilation succeeds with no ROM overflow, images display normally after flashing

```

![Prompt.png](https://images.tuyacn.com/content-platform/hestia/1756116811b2d24299207.png)

## Effect Experience

At this point, the desktop chatbot developed based on the TuyaOpen open-source conversation project `your_chat_bot` is complete. This robot supports emoji image replacement functionality and integration with the 2048 game interface.

Here is the final generated example firmware file: [your_chat_bot_QIO_1.0.1.bin](https://drive.weixin.qq.com/s?k=AGQAugfWAAkS4ye03BAbQAqAb1AFU). You can obtain the firmware and complete flashing to experience the final effect.

## Prompt Experience Summary

- During project or Demo development, it is recommended to first organize and summarize the overall functional architecture through AI tools, then issue development instructions based on the architecture to improve effectiveness.

- The more detailed the upfront prompts, the better the final effect. If there are reference materials, they should be provided to the AI tool as much as possible; if technical details can be clarified in advance, it's even better. For example, when implementing image screen display functionality, you need to specify that images need to be converted to C array format and clearly specify the specific encoding format (such as RGB565, RGB888, etc.); if the encoding format is not specified, it will significantly increase debugging times.

- Regarding prompts, you can refer to the following template:
    
    ```
    Goal: [What specifically to achieve]
    Constraints: [What are the limiting conditions]
    Technology: [What tools/methods to use]
    Verification: [How to confirm success]
    Alternative: [What to do if it fails]
    ```
    For example:
    ```
    Goal: Change emotion images from 64x64 to 240x240 pixels
    Constraints: If ROM overflows, reduce to 4 main images (Happy, Sad, Angry, Love)
    Technology: Use png_to_c_array.py tool to regenerate, update CMakeLists.txt
    Verification: Compilation succeeds with no ROM overflow, images display normally after flashing
    Alternative: If 240x240 fails, try 120x120 or further reduce the number of images.
    ```

## Quick Start Project Recommendations

Creativity starts with ideas, T5 development board helps you realize them! Start now, complete your first project in just one weekend, [Official Tutorial](https://tuyaopen.ai/zh) provides full technical support.

### Smart Voice Assistant

If you are new to AI development, we recommend the Smart Voice Assistant project, which can achieve three core functions:
- Control home devices through voice commands, such as lights and air conditioning.
- Respond to voice commands to execute music playback, reminder settings, and other operations.
- Support custom exclusive voice wake words.


### Pet Assistant

If you are a developer who loves pets, the Pet Assistant project can help achieve:
- Automatic feeding: Realize pet feeding automation, solving pet feeding needs during user business trips.
- Remote cat teasing and dog walking functions: Support remote interaction, meeting user interaction needs with pets when not present.


### Creative Lighting Art

This solution is especially suitable for makers planning to develop cool-style works, suitable for developing the following two types of products:
- Voice-controlled color-changing lights
- Music rhythm light strips

