---
title: "T5+2M-ASR-PRO Custom Wake Words"
---

<BackToProjects />

## Project Introduction

The T5 platform supports a limited set of default wake words, for example:
- TuyaOS supports three default wake words: "Nihao Tuya" (Hello Tuya), "Xiao Zhi Tongxue" (Classmate Zhi), and "Hey, Tuya" (English).
- TuyaOpen supports four default wake words: "Nihao Tuya", "Xiao Zhi Tongxue", "Xiao Zhi Guanjia" (Butler Zhi), and "Nihao Xiao Zhi".

If you want to customize the wake word, there are three solutions:
- Add a voice recognition module
- [Replace the wake word algorithm](https://developer.tuya.com/cn/docs/iot-device-dev/tuyaos-wukong-capability-wakeup-internal?id=Keia2dqx0v23b#title-3-%E6%9B%BF%E6%8D%A2%E5%94%A4%E9%86%92%E7%AE%97%E6%B3%95)
- Custom wake word (for customization, please contact Tuya sales)

This tutorial introduces the first solution: adding a voice recognition module. This approach has the following advantages:

- Low technical barrier, no need to understand audio algorithms.
- Supports multiple wake words with Tuya AI Agent multi-role feature. Different wake words can correspond to different roles, avoiding awkward mismatches between roles and wake words.
- Supports offline speech recognition. The ASR PRO module supports offline neural network computation, enabling speech recognition without relying on a network. This ensures normal operation even in environments with no or unstable network connectivity.
- High recognition rate. The ASR PRO module features strong echo cancellation and environmental noise suppression, maintaining high speech recognition accuracy even in noisy environments. The recognition rate can reach over 98%, with a response time of less than 0.15 seconds.

## Required Materials

| Hardware                          | Function/Parameters                                                                 |
|------------------------------------|-------------------------------------------------------------------------------------|
| T5 Development Board               | Provides core AI conversation functionality                                         |
| ASR PRO Module                     | Supports custom wake words and offline speech recognition                           |
| Serial Board or ASR-LINK Downloader| A standard CH340 serial board is sufficient for downloading programs to ASR PRO.If available, you can purchase the ASR-LINK automatic downloader. |
| Serial Board or ASR-LINK Downloader| A standard CH340 serial board is sufficient for downloading programs to ASR PRO. If available, you can purchase the ASR-LINK automatic downloader. |
| Microphone                         | Used for audio pickup by the ASR PRO module                                         |


## 2M ASR PRO Speech Recognition Module (Core Board)

Chip datasheet: [View here](https://www.haohaodada.com/jpeguploadfile/twen/ASRPRO/ASRPROCoreV1.1.pdf)

Appearance:
<img alt="Chip Datasheet" src="https://images.tuyacn.com/content-platform/hestia/1756373260721d3bdc55a.png" width="400"  />

## Hardware Wiring Instructions

First, you need to program and flash firmware to the ASR PRO, then connect the ASR PRO module to the T5 development board. Therefore, wiring is divided into two parts:

### ASR PRO Flashing Wiring

|  ASR PRO Module | Serial Board |
|-----------------|-------------|
|       GND       |   GND       |
|        5V       |   5V        |
| PB5 (UART0 TX)  |   RX        |
| PB6 (UART0 RX)  |   TX        |
|      MIC +      |  Mic +      |
|      MIC -      |  Mic -      |


### T5 Development Board to ASR PRO Module Connection

|   T5 Development Board |   ASR PRO Module         |     
|-----------------------|--------------------------|
|            GND        |       GND                |
|        5V             |       5V                 |
| P10 (UART0 TX)        |   PB5 (RX)               |
| P11 (UART0 RX)        |   PB6 (TX)               |
|  P12 (Wake Pin)       | PA4 (Demo use, customizable)**Note**: If using serial wakeup, you can skip connecting the P12 wake pin.|
|  P12 (Wake Pin)       | PA4 (Demo use, customizable). **Note**: If using serial wakeup, you can skip connecting the P12 wake pin.|

### Demo Video

<video src="https://images.tuyacn.com/content-platform/hestia/1756375350889423076cc.mp4" width="300" controls></video>
<video src="https://images.tuyacn.com/content-platform/hestia/1756375350889423076cc.mp4" width="300" style={{maxWidth: "100%"}} controls></video>


## ASR PRO Program Development

Tuya AI Agent supports multiple roles, and the ASR PRO module supports up to 5 wake words, each with a unique recognition ID. You can design a program where each role has a dedicated wake word. When developing the ASR PRO program, you can use the recognition ID to distinguish wake words, for example, controlling different IO pins or sending data via serial to the main controller T5.

It is recommended to use **Tianwen Block** for developing the ASR PRO module. Its graphical programming interface is very beginner-friendly. You can download it from the [Tianwen 51 official website](http://twen51.com/new/twen51/index.php).

### Example Program

The system is configured with three wake words: "Hello Nezha", "Hello Zhu Bajie", and "Hello Conan". When the ASR PRO module recognizes any of these wake words, it should trigger the wake function via IO and output data via serial:
- After recognizing the wake word, ASR PRO will set PA4 to low for 100 ms, then pull it high.
- Outputs hexadecimal data via serial (PB5 PB6 pins).

| Wake Word      | Serial Output |
| -------------- | ------------- |
| Hello Nezha    | A0 01 00      |
| Hello Zhu Bajie| A0 01 01      |
| Hello Conan    | A0 01 02      |

### Downloads

- Reference code: [Download here](https://ccnsi48dnpj0.feishu.cn/wiki/DkQjwT9DpiHJhak5HXec01ldnRb)
- Firmware: [Download here](https://images.tuyacn.com/content-platform/hestia/content-platform/hestia/1756434287f142a5459ac.zip)
- Flashing tool: [Download here](https://images.tuyacn.com/content-platform/hestia/content-platform/hestia/content-platform/hestia/175643445346d29fa1f7a.zip)

### Firmware Flashing

For instructions on firmware flashing, please refer to the [video tutorial](https://haohaodada.com/new/tencentCloud/cloudiframe.php?id=146).

Reference image:

<img alt="Firmware Flashing" src="https://images.tuyacn.com/content-platform/hestia/17564346638e93644cea5.png" width="800"  />

## T5 Program Development

### IO Wakeup

IO wakeup is relatively simple. Just connect the ASR PRO's wake pin to the T5's wake pin (default P12).

### Serial Wakeup

For serial wakeup, simply check for the recognized wake command in the serial receive program and call the `audio_recorder_start();` interface. Below is a serial example:
