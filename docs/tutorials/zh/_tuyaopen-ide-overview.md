<section id="what-is" className="section">

## TuyaOpen IDE 是什么

TuyaOpen IDE 是涂鸦推出的**面向 AI 时代的嵌入式开发环境**——一个运行在 VS Code / Cursor 之上的扩展。你不需要从零手写硬件代码，而是用**自然语言**告诉 AI Agent（AI 编程助手）"我要做一个什么设备"，它会自动生成项目、编写固件代码、配置云端能力。

这种工作方式叫做 **Vibe Coding（感觉编程）**——你描述想要的"感觉"，AI 把它变成可运行的工程。

一句话理解：传统嵌入式开发是"你写代码，板子跑代码"；用 TuyaOpen IDE 是"你说话，AI 写代码，板子跑代码"。

</section>

<section id="what-it-can-do" className="section">

### 5 分钟了解它能做什么

- **用一句话创建一个完整 IoT 项目**（"帮我做一个 App 远程控制的 LED 灯"）
- **自动生成硬件固件代码**，适配 T2/T3/T5/ESP32 等多款芯片
- **自动配置涂鸦云端能力**（设备联网、App 控制、AI 语音）
- **三端合一**：硬件固件 + 云端 Agent + 手机 App 一次打通

</section>

<section id="core-features" className="section">

## 核心特性

| 特性 | 说明 |
| --- | --- |
| **Vibe Coding** | 用自然语言驱动 AI Agent 生成代码，不必逐行手写。 |
| **硬件上下文感知** | IDE 知道你用的是哪块板、哪些引脚，生成的代码能直接跑。 |
| **三端合一** | 固件端 / 云端 Agent / App 端在一个工程里协同开发。 |
| **跨芯片支持** | 一套工具支持 T2、T3、T5、ESP32、ESP32-C3 等多款芯片。 |

</section>

<section id="vs-traditional" className="section">

## 与传统 IoT 开发的区别

| 对比项 | 传统嵌入式开发 | TuyaOpen IDE（Vibe Coding） |
| --- | --- | --- |
| **怎么开始** | 建工程、配环境、写寄存器 | 用一句话描述需求 |
| **代码来源** | 全手写或复制改 | AI Agent 生成，你审核调整 |
| **云能力** | 自己对接云平台 API | IDE 自动配置涂鸦云 |
| **App** | 另找工具做 | 三端合一一次生成 |
| **上手门槛** | 需要嵌入式 + 网络 + 云的知识 | 会描述需求即可入门 |

</section>

<section id="who-it-is-for" className="section">

## 适用人群

- **完全零基础**：想做智能硬件但不会写代码的创客、学生 → 用 Vibe Coding 入门。
- **嵌入式工程师**：想加速开发、少写样板代码 → 用 Agent 生成框架，自己精修。
- **典型场景**：智能照明、AI 语音助手、机器人控制、传感器上云。

</section>

<section id="supported-boards" className="section">

## 支持的开发板与芯片

TuyaOpen IDE 支持 TuyaOpen 框架覆盖的全部芯片，主流包括：

| 芯片系列 | 典型开发板 | 定位 |
| --- | --- | --- |
| **T5** | T5 AI Core / T5 AI Board | AI + 联网，主力推荐。 |
| **T3** | T3 LCD DevKit | 显示 + 联网。 |
| **T2** | T2-U | 联网基础款。 |
| **ESP32** 系列 | ESP32 / ESP32-C3 / ESP32-S3 | 通用 MCU。 |
| LN882H / BK7231N / GD32 | 各厂板卡 | 特定场景。 |

:::note
完整开发板选型矩阵见 [硬件平台](/docs/hardware) 页面。
:::

</section>

<section id="next" className="section">

## 下一步

了解了 TuyaOpen IDE 是什么后，安装并依次完成实战：

1. [**安装 TuyaOpen IDE**](/learn/tuyaopen-ide-install)——在 VS Code 或 Cursor 中安装扩展。
2. [**实战一：Hello World**](/learn/tuyaopen-ide-practice-1)——IDE 基础操作：选板 → 编译 → 烧录 → 看日志。
3. [**实战二：your_chat_bot**](/learn/tuyaopen-ide-practice-2)——云端 IoT / AI Agent 开发流程。
4. [**实战三：小程序面板**](/learn/tuyaopen-ide-practice-3)——为设备做一个手机控制面板。
5. [**Vibe Coding 技能**](/learn/tuyaopen-ide-vibe-coding)——IDE 内置 AI 技能的可复制提示词。
6. [**Agent 开发指南**](/learn/tuyaopen-ide-agent-dev)——深入学习云端 Agent 的开发、发布与绑定。

</section>
