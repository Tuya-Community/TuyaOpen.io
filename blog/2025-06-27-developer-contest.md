---
slug: /72h-with-tuyaopen
title: '72H Adventure X Event'
authors: [tuya, hsuanhanlai]
image: /img/home/tuyaopen-logo-social-preview.png
tags: [TuyaOpen, Contest]
---

<!-- truncate -->

# title: '52H Startup Forest Event'
<!-- ![event](https://images.tuyacn.com/fe-static/docs/img/6d005a49-7b92-4602-af60-b7acca333eab.png) -->

> **This guide is a dedicated document for the contest, designed to provide comprehensive event guidance for participants.**

<!-- ### Competition Information -->
<!-- - Event Time: 6/27 ~ 6/29 (52 hours total) -->

# Important Resources
<!-- - Tuya Contest PPT: [PPT Introduction](https://tuyaopen-pu9rufi.gamma.site/) -->
- TuyaOpen Code Repository: [GitHub](https://github.com/tuya/TuyaOpen)
- TuyaOpen Documentation Website: [Documentation](https://tuyaopen.ai)

<!-- truncate -->

## TuyaOpen vs TuyaOS

TuyaOpen is open-source based on the industry-leading TuyaOS architecture, verified by 1.3 million developers worldwide. TuyaOpen provides clearly defined APIs for developing C/C++ applications supporting multiple MCUs, deeply simplifying complex development processes such as peripheral connections, cloud connections, and security. This framework can significantly improve development efficiency and help you quickly build AI + IoT smart products.

:::tip How to Choose?
Contestants can choose according to their needs. If you have requirements for **video AI capability integration** or **commercialization scenarios**, TuyaOS is recommended; for other scenarios or needs, the more open ecosystem of **TuyaOpen** is recommended.
:::

### Main Differences Comparison

| Feature                  | TuyaOpen                                         | TuyaOS                                                      |
|-----------------------|--------------------------------------------------|-------------------------------------------------------------|
| Target Users              | Open-source developers                                        | Commercial cooperation developers                                              |
| Source Code Access            | Fully open-source, source code accessible                               | Commercial code partially open-source, supports secondary development                               |
| Code Download              | GitHub, Gitee free open-source download                        | VSCode plugin WindIDE + email authorization to obtain code                      |
| Development Environment              | Linux, Windows, Mac                               | Linux only, other platforms require virtual machines                             |
| Tuya Cloud AI Components | ✅                                                | ✅ Latest and fastest                                                  |
| Tuya Voice AI ASR Capability | ✅                                         | ✅                                                          |
| Tuya Video AI Capability    | ❌ Not currently supported                                  | ✅                                                          |
| Tuya Cloud Large Model Customization Capability (LLM/Prompt/Workflow/RAG)   | ✅                                  | ✅                                                          |
| Source Code Customization Capability          | High source code customization                                      | API-level customization, linked libraries, richer commercial functional components                       |
| Chip Support              | Tuya T Series / ESP Series (see support list)             | Tuya T Series                                                 |
| Development Language              | C/C++                                            | C/C++                                                       |
| Documentation Support              | [TuyaOpen Official Website](https://TuyaOpen.ai)              | [Tuya Developer Official Website](https://developer.tuya.com/cn/docs/iot-device-dev) |
| Contribute Source Code or Secondary Open Source     | ✅                                                | Follow Copyright License                                      |
| Hardware Ecosystem              | Continuously adding chips, development boards, and peripheral drivers                     | Adopt recommended selection solutions                                            |


# Embedded Software Development 
## TuyaOpen Section
### Documentation
- TuyaOpen Documentation: [Documentation](/docs/about-tuyaopen)
- AI API Code Module: [Code Module](https://github.com/tuya/TuyaOpen/tree/master/src/tuya_ai_basic)

### Example Overview

Making good use of example code can reduce development costs and avoid "reinventing the wheel".

- your chat bot: [Click to Go](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot)
    - T5/ESP32 cross-platform support example
    - Voice ASR + Tuya Cloud Large Model
    - Connect AI Prompt/Agent capabilities
    - Emotion perception interaction capability
    - Module components: `Screen` + `Mic` + `Speaker` + `Wi-Fi` + `Button`

- your chat bot: [Click to Go](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot)    
    - T5/ESP32 cross-platform support example
    - Voice ASR + Tuya Cloud Large Model
    - Connect AI Prompt/Agent capabilities
    - Emotion perception interaction capability
    - Multiple wake modes
    - App control robot interaction
    - Emotion recognition -> action capability
    - Module components: `Screen` + `Mic` + `Speaker` + `Wi-Fi` + `Button` + `Servo`
- Switch Demo: [Click to Go](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya_cloud/switch_demo)
    - Basic native example demonstrating device as IoT LED light can connect to Tuya Cloud, controlled by Tuya Cloud Service/App
    - DP message event handling
    - Basic network configuration, hardware authentication process

- Basic Component Demo: [Click to Go](https://github.com/tuya/TuyaOpen/tree/master/examples)
    - Bluetooth/Wi-Fi
    - SPI I2C ADC basic interface protocol Demo
    - Protocol Demo
    - Screen rendering framework LVGL examples
    etc....


## TuyaOS Section

Tuya Wind IDE is a one-stop integrated development environment for developers using TuyaOS EasyGo. You can [Click to Go](https://developer.tuya.com/cn/docs/iot-device-dev/tuyaos-wind-ide).

### AI Infrastructure Tuya Wukong AI Embedded Device End
- Tuya Wukong AI: [Click to Go](https://developer.tuya.com/cn/docs/iot-device-dev/ai-hardware?id=Kectwmx9isrgl)
- Capability Map: [Click to Go](https://developer.tuya.com/cn/docs/iot-device-dev/wukong-abi-map?id=Keedxu1netj62)
- Multimodal Interaction: [Click to Go](https://developer.tuya.com/cn/docs/iot-device-dev/tuyaos-wukong-capability-multi-media)

---

## Tuya Cloud Platform, Zero-Code Cloud AI Development
- Register Tuya Developer Cloud Service, [Click to Go](https://auth.tuya.com/register)
- Reference Documentation:
    - [Intelligent Agent Development Platform](https://developer.tuya.com/cn/docs/iot/ai-agent-management)
    - [Let AI Directly Call Functions - Device Self-Control Command Function](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah)

---

# Hardware Development Boards
## Development Boards
### Tuya T5AI Board Development Board
![T5-AI Board Pinout](https://images.tuyacn.com/fe-static/docs/img/6b7ab959-0635-4293-991b-b8dda293614b.jpg)

- Documentation Entry: [T5AI Board Overview](/docs/hardware-specific/t5-ai-board/overview-t5-ai-board)
- I/O Pin High-Resolution Download: [Pinout](/docs/hardware/T5-AI-Board-Pinout-v102.pdf)
- How to Quickly Compile Project + Flash?: [Tutorial](/docs/quick-start/enviroment-setup)

<!-- ### Tuya T5 mini Development Board (Third-party Community Development Board)

- Advantage is smaller size, suitable for solutions with higher space requirements.
- For usage methods, you can refer to [T5AI Board](/blog#%E6%B6%82%E9%B8%A6-t5ai-board-%E5%BC%80%E5%8F%91%E6%9D%BF), functionality is relatively similar.

### Digua Robot RDK X5

Reference Documentation: [RDK X5 Documentation](https://developer.d-robotics.cc/information)

#### How Does RDK Integrate with TuyaOpen?

> Worried that T5's computing power alone isn't enough? Let RDK X5 support your edge computing needs! Use RDK + TuyaOpen solution to achieve hybrid architecture of local real-time model inference and cloud large models.
- Tuya App remote control RDK X5 capabilities.
    - RDK + TuyaOpen framework solution Demo: [Tutorial](/docs/rdk/rdk-originbot-with-tuya-dp-control-demo.pdf)
- RDK X5 and Tuya T5 chip hybrid framework
    - Edge computing + cloud computing combination: [Tutorial](https://diguazhandian-rdkx5-tuya-t4otm0d.gamma.site/) -->

---

# Tuya Hardware Resources
- To avoid resource abuse, priority support is given to teams with clear ideas for receiving/using resources. It is also recommended that your team bring your own familiar tools.
- Development boards must use the contest-specified T5. Other peripheral devices/hardware and product forms are encouraged to be brought by participants.

For the quantity of hardware resources available on-site, please refer to the following:

### Development Boards
- [Tuya T5-AI Development Board](/docs/hardware-specific/t5-ai-board/overview-t5-ai-board): 15
- Tuya T5 mini Development Board: 10
<!-- - Digua Robot RDK X5: 20 -->

### Peripheral Accessories
- Speakers (3020, 4 ohm, 3 watt): 20
- Display Screens (1.54 inch, ST7789): 10
- Battery Packs (2000 mAh): 10
- Servos (MG90S): 40
- Sensor Kits (gesture, touch, light-sensitive, air, temperature/humidity, ultrasonic, etc., more than 10 types): 4 
- Dupont wires/data cables: several

### Tools 

- Zhengdian Atom HP15 Smart Heating Platform: 2 units
- Zhengdian Atom DM40 Digital Multimeter: 2 units
- Zhengdian Atom T80/T80P Smart Soldering Iron: 2 units
- Zhengdian Atom Logic Analyzer: 2 units
- Adjustable DC Power Supply (Max 60V/5A): 1 unit
- Heat Gun: 1 unit
- Hot Glue Gun: 1 unit
- Screwdriver Set: 1 set
- 3D Printer (Bambu Lab P1S+AMS): 5 units

---


# Tuya Technical Support 🛠️📋

There will be Tuya technical teachers and Digua Robot teachers at the event site, who will provide appropriate technical support during the event.

:::tip
If there are more complex issues, or if you don't receive timely support at the event site on the day of the event, you can organize the questions and raise Issues on Github 📝, Tuya will arrange personnel support as soon as possible.
:::

Issue Link: https://github.com/tuya/TuyaOpen/issues

### Issue Format

``` shell
### Include `【52Event】` to help staff identify event issues
Issue Title: 【AdventureX Event】 (bug/question/hardware): {Clear and concise problem description}
Issue Content:
- Development Environment: Mac/Win/Linux 💻
- Chip Platform: T5/RDK 
- Problem Description: Clear and concise expression of the problem
- Problem Phenomenon: What patterns can be found, what methods have been tried to fix it?
- Expected Phenomenon: Expected resolution result
- Log Logs: Attaching logs helps staff analyze your problem 
```

---

# Frequently Asked Questions

1. How to develop ESP32?
tos.py tool can complete compilation and flashing steps. Select the correct board-level config configuration as ESPxxx.config for the code project, tos.py `build` and `flash` both support cross-platform.
2. What's the difference between TuyaOS and TuyaOpen?
This article has detailed introduction, please refer to the **TuyaOpen vs TuyaOS** section above. If you have requirements for **video AI capability integration** or **commercialization scenarios**, TuyaOS is recommended; for other scenarios or needs, the more open ecosystem of **TuyaOpen** is recommended.
3. What is PID?
Product-ID associated with cloud services for hardware. The number bound to cloud services.
4. What is authorization code?
Security authentication code for hardware to access cloud services, ensuring hardware security. UUID/Key is a set of authorization codes. Note that TuyaOS and TuyaOpen authorization codes cannot be mixed. Even though capabilities and service functions are similar, authorizations are incompatible.
5. Can development be done on Windows system?
Yes, the Master main branch can now be experienced.
6. Can development be done on MacOS?
- Yes, the Master main branch can now be experienced.
- Beta feature, can develop in Mac x86/ARM environment, but there may be undiscovered issues. Linux and Windows are recommended first.
7. MacOS M-series encounters lwip compilation error when compiling T5 projects.
Mac gcc version differences, when using T5 chips, the following modifications are needed
Issue Resolved

