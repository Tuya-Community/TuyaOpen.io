这是**最小闭环**——不写一行代码，只用 IDE 把官方示例跑起来。跑通它，你就掌握了 TuyaOpen IDE 的核心操作链路：**选板 → 编译 → 烧录 → 看日志**。

<section id="prereq" className="section">

## 前置条件

- 已按 [安装 TuyaOpen IDE](/learn/tuyaopen-ide-install) 装好 IDE 扩展。
- 一块 **T5 AI Board**（`T5AI_Board`）开发板，USB 线已连电脑。

</section>

<section id="step-1" className="section">

## 第一步：从开发板目录进入

1. 打开 VS Code / Cursor，确认 TuyaOpen IDE 扩展已启用。
2. 点击左侧活动栏的**开发板目录**图标，浏览支持的开发板、芯片和 SoC 平台及详细规格。

   ![IDE 活动栏中的开发板目录图标](/img/ide/get-started/ide-activity-bar-board-catalogue.png)

3. 在开发板列表中找到 **T5AI_Board**，进入它的详情页。你能看到大量开发资料——购买渠道、原理图、数据手册、源代码、3D 模型等等。

   ![开发板目录中的 T5AI_Board 详情页](/img/ide/get-started/board-detail-page-t5ai-board.png)

   ![开发板资料——原理图、数据手册、源码、3D 模型](/img/ide/get-started/board-resources-schematic-datasheet.png)

</section>

<section id="step-2" className="section">

## 第二步：创建示例项目

1. 在 T5AI_Board 详情页，点击**用此开发板，新建项目**。
2. 填写项目名称和存放位置，点击**创建项目**。

   ![从开发板新建项目的对话框](/img/ide/get-started/new-project-from-board.png)

3. IDE 会基于该示例派生一个工程到你的工作区，自动配置好 T5AI_Board 的板级信息。

   ![派生好的项目工作区](/img/ide/get-started/project-scaffolded-workspace.png)

</section>

<section id="step-3" className="section">

## 第三步：编译

点击 IDE 工具栏的**项目详情**进行编译——点击中间的**立即编译**，或右上侧**硬件固件操作**中的**编译**，等待编译完成。

![项目详情中的编译按钮](/img/ide/get-started/project-details-compile-button.png)

**预期输出**（编译成功）：

```text
[NOTE]:
====================[ BUILD SUCCESS ]===================
 Target    : T5Board_project1_QIO_1.0.0.bin
 Output    : .../dist/T5Board_project1_1.0.0
 Platform  : T5AI
 Chip      : T5AI
 Board     : TUYA_T5AI_BOARD
 Framework : base
========================================================
```

项目详情中可以可视化看到嵌入式固件情况。

![固件编译汇总](/img/ide/get-started/firmware-build-summary.png)

</section>

<section id="step-4" className="section">

## 第四步：烧录

1. 用 USB 连接开发板（T5AI_Board 有两路串口：一路烧录、一路日志），确保 USB 线不仅能供电，还能传输数据。
2. 点击**烧录（Flash）**。最初不确定哪一路是烧录口，可以任选一个试一下，这里选择 `COM4`。

   ![烧录按钮与端口选择](/img/ide/get-started/flash-button-select-port.png)

**预期输出**（烧录成功）：

```text
write  T5AI  COM4  921600
  File   .../bin/T5Board_project1_QIO_1.0.0.bin  2.0 MiB
  Range  0x00000000 -> 0x001FF1E0

Handshake         OK
Flash ID          OK
Unprotect         OK
Write [1/1]       OK
...
Flash OK  38.9s
```

</section>

<section id="step-5" className="section">

## 第五步：监控串口日志

点击**监视（Monitor）**，选择日志串口，这里选择 `COM3`。看到 `hello world`，你的第一个 TuyaOpen 项目就跑通了。

**预期输出**：

```text
[01-01 00:00:00 ty D][tuya_app_main.c:8] hello world
```

:::note
如果没看到 `hello world`，大概率是因为监视器开启的时间不够早——这行日志在烧录完成时就会打印。不要关闭监视器终端，再次烧录就能看到。
:::

</section>

<section id="next" className="section">

## 下一步

你已经掌握了 IDE 基础操作。继续 [实战二：your_chat_bot 全流程](/learn/tuyaopen-ide-practice-2)——端到端搭建一台联网的 AI 对话设备。

</section>
