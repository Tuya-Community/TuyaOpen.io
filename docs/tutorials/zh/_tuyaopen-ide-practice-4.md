这是实战一的**「Linux 板」版本**——用 IDE 把最简单的 **Hello World** 一键部署到树莓派这类 Linux 开发板。

<section id="prereq" className="section">

## 前置条件

- 一块**树莓派 4B / 5**（或任意 Linux 开发板，如泰山派 3、东山派 A1；本篇以树莓派为例），已烧好系统、能联网，并**已开启 SSH**。
- 电脑与板子在**同一局域网**，能 `ping` 通它的 IP。
- 已按 [安装 TuyaOpen IDE](/learn/tuyaopen-ide-install) 装好扩展并完成 SDK 初始化。

:::note
IDE 对 Linux 板走的是 **cross-deploy（交叉部署）**：在你电脑上编译出可执行程序，再经 SSH 推到板子上运行。因此全程不需要 USB 连板子，网络通、SSH 通即可。
:::

</section>

<section id="diff" className="section">

## Linux 板和 MCU 板有什么不同

实战一的 T5AI_Board 用串口烧录。**Linux 板没有串口烧录这一步**——IDE 检测到目标板是 Linux 板后，会自动切换同一组按钮的语义：

| 顶部按钮 | MCU 板（T5AI_Board） | Linux 板（树莓派） |
| --- | --- | --- |
| **编译** | 编译固件 | 编译（产出 Linux 可执行程序） |
| **Flash** | 串口烧录进 Flash | **→「部署」**：SCP 推可执行程序到板子 |
| **Monitor** | 串口看日志 | **→「运行」**：SSH 进板子前台跑应用 |
| **清理** | 清编译缓存 | 清编译缓存 |

此外，Linux 板的项目详情页会多出一个**「开发板连接」**区块（填 SSH 信息）。

</section>

<section id="step-1" className="section">

## 第一步：创建 Linux 板工程

1. 点击左侧活动栏的开发板目录图标，浏览支持的开发板、芯片和 SoC 平台及详细规格。

   ![Linux 板开发板目录图标](https://images.tuyacn.com/fe-static/docs/img/868ea85a-6765-40db-8d3c-437973a91a9c.png?imageMogr2/format/webp)

2. 在开发板列表中找到 **树莓派**（或你实际的 Linux 板），点击 `用此开发板，新建项目`。

   ![Linux 板开发板目录图标](https://images.tuyacn.com/fe-static/docs/img/439d36f7-7862-4a9d-a47e-530fe8e42e45.png?imageMogr2/format/webp)

3. 打开**项目详情**页，确认顶部 **Flash 显示为「部署」**、**Monitor 显示为「运行」**，页面下方出现**「开发板连接」**表单——这就是 IDE 已识别为 Linux 板的标志。

   ![Linux 板项目详情页——顶部按钮切换为「部署/运行」，下方出现「开发板连接」表单](https://images.tuyacn.com/fe-static/docs/img/45c771c7-55d6-4ec1-ada7-147d5f885fe0.png?imageMogr2/format/webp)

</section>

<section id="step-2" className="section">

## 第二步：配置 SSH 连接

填表前先确认板子已开机、与你同局域网、已开 SSH 服务，且你有一组可用的用户名和密码。

**怎么拿到用户名 / IP / 密码**：用户名和密码是你烧系统时设的；IP 在板子上运行 `hostname -I` 得到。

在「开发板连接」表单填入：

| 字段 | 填什么 |
| --- | --- |
| **用户名** | 烧系统时设的用户名（如 `pi`） |
| **IP 地址** | 板子的局域网 IP（如 `192.168.1.50`） |
| **SSH 端口** | 默认 `22`，没改过就留空 |
| **登录方式** | 选 `密码`（推荐）；进阶可选 `私钥` |
| **密码** | 对应密码 |
| **远端目录** | 应用在板子上的存放路径，默认 `~/tuyaopen-apps/<工程名>`，一般不改 |



**登录方式怎么选**：表单里的「登录方式」决定 IDE 用哪种 SSH 认证连板子。

- **密码（默认）**：密码存在编辑器的安全凭据区（系统钥匙串，不落盘、不进工程文件）。部署/运行时若本机装了 `sshpass`，IDE 自动复用已存密码、全程免输；同一轮操作里的多条 `ssh`/`scp` 还会复用同一条连接，不必反复输密码。
- **私钥（进阶）**：用 SSH 私钥认证、不依赖密码。IDE 默认用 `~/.ssh/id_rsa`，也可在配置里改选其他密钥文件；前提是已把对应公钥登记到板子的 `~/.ssh/authorized_keys`。

填好点 **保存连接**，再点 **测试 SSH**。成功时打印：

```bash
SSH OK
Linux raspberrypi 6.x.x ... aarch64 GNU/Linux
pi
```

![「开发板连接」表单——填写 SSH 用户名、IP、端口、登录方式、密码、远端目录](https://images.tuyacn.com/fe-static/docs/img/7b178a7b-e616-41fc-98ee-289c2c3e3937.png?imageMogr2/format/webp)

看到 `SSH OK` + 内核信息 + 登录用户即连通。若失败，IDE 会分类提示——认证失败核对用户名密码、网络不通先 `ping <IP>`、首次连接的主机密钥问题在电脑上手动 `ssh <用户名>@<IP>` 走一次确认即可。

:::note
密码存进编辑器的安全凭据区（不落盘），其余连接信息存在工程内的 `.tuyaopen/ide/deploy.json`。也可用命令面板的 `TuyaOpen: Configure Board SSH / Deploy` 配置。
:::

</section>

<section id="step-3" className="section">

## 第三步：编译

点顶部 **编译**。成功后产出一个 Linux 可执行程序（`.elf`），项目详情页的固件区以「应用程序 (ELF)」列出它。

**预期输出**（编译成功）：

```text
[NOTE]: 
====================[ BUILD SUCCESS ]===================
 Target    : <工程名>_QIO_1.0.0.bin
 Output    : /home/<你的用户名>/TuyaOpenIDE/projects/<工程名>/source/embedded/dist/<工程名>_1.0.0
 Platform  : LINUX
 Chip      : Raspberry_Pi
 Board     : Raspberry_Pi
 Framework : base
========================================================
```

Hello World 不依赖任何模型或云端凭据，编译产物就是一个纯净的 Linux 可执行程序，不需要授权码或额外资源。

</section>

<section id="step-4" className="section">

## 第四步：部署

点顶部 **部署**。IDE 通过**SSH 通道**部署到远程目标机：

**预期输出**（部署成功）：

```text
>>> 正在上传 ELF…
>>> 部署完成。
>>> 远程路径：/home/pi/tuyaopen-apps/<工程名>/<工程名>_1.0.0.elf
>>> 本地路径：/home/<你的用户名>/TuyaOpenIDE/projects/<工程名>/source/embedded/dist/<工程名>_1.0.0/<工程名>_1.0.0.elf（<文件大小> 字节）
```

:::tip
提示「未找到 .elf 文件 — 请先编译工程」时，回到第三步重新编译。
:::

</section>

<section id="step-5" className="section">

## 第五步：运行

点顶部 **运行**（即 MCU 板的 Monitor 按钮位）。IDE 打开专用终端，通过 `ssh -t` 登录板子在前台执行可执行程序，输出实时显示在这里。

**预期输出**（程序启动）：

```text
[01-01 00:00:00 ty N][sample_project.c:38] Application information:
...
[01-01 00:00:00 ty D][sample_project.c:48] hello world
```

![运行——专用 SSH 终端前台执行，末尾打印 hello world](https://images.tuyacn.com/fe-static/docs/img/ff937ef7-528f-49f3-a892-41f5e9fdb90e.png?imageMogr2/format/webp)

看到末尾的 **`hello world`** 就成功了。程序打印完信息后进入常驻循环保持运行；要停止，按 `Ctrl + C` 或关闭终端。

</section>

<section id="resources" className="section">

## 附：把资源文件（图片、视频等）推到板子

除了程序本身，IDE 还能把工程里的**资源文件**——图片、视频、3D 模型等——一键推到板子上，省去手动 `scp`。

1. 把资源文件放进工程的 `source/embedded/resources/` 目录（可以建子目录，IDE 会递归上传并保持目录结构）。
2. 命令面板（`Ctrl+Shift+P`）运行 **`TuyaOpen: Upload Resources to Board`** 或点击 **`资源上传`** 键。

   ![资源目录 source/embedded/resources/ 与「Upload Resources to Board」命令](https://images.tuyacn.com/fe-static/docs/img/e73bc222-53e7-4484-b911-6354e8d38744.png?imageMogr2/format/webp)

资源会落到板子的 `<远端目录>/resources/` 下（默认 `~/tuyaopen-apps/<工程名>/resources/`），比如本地的 `resources/hero.glb` 对应板子上的 `~/tuyaopen-apps/<工程名>/resources/hero.glb`。

:::note
`source/embedded/resources/` 为空时 IDE 会提示「没有资源文件」，不会上传。该功能仅用于 Linux 板（cross-deploy）。
:::

</section>

<section id="ubuntu" className="section">

## 用 Ubuntu（X86）调试

除了树莓派（ARM/aarch64），IDE 也支持把 **Ubuntu** 当作 Linux 部署目标——它是一块 **X86_64** 架构的「Linux 板」。流程和树莓派完全一致（都是 cross-deploy：编译 ELF → SSH 部署 → 运行），只是编译目标的架构不同；建工程时板型选 **Ubuntu**，其余从第二步起照做即可。

   ![资源目录 source/embedded/resources/ 与「Upload Resources to Board」命令](https://images.tuyacn.com/fe-static/docs/img/e73bc222-53e7-4484-b911-6354e8d38744.png?imageMogr2/format/webp)

为什么用它调试：

- **没有 ARM 真板时的 Linux 替身** —— 手边没有树莓派、泰山派这类 ARM 板时，拿一台 Ubuntu（X86）主机、虚拟机或云服务器当「Linux 板」，先把应用逻辑和「编译 → 部署 → 运行」链路跑通，再迁移到真板，不必等硬件到位。
- **桌面直接看界面** —— 在 Ubuntu 桌面上，LVGL 界面会通过 SDL2 窗口显示，不接真屏就能调 UI。
- **X86 环境好搭好复现** —— 虚拟机、容器、云主机皆可，可快照、易复现，适合做应用层调试与自动化。

:::note
编译产物是 X86_64 的 ELF，只跑在 X86 的 Ubuntu 上；要迁移到 ARM 真板时，记得切回对应板型重新编译——架构不同，产物不通用。
:::

</section>

<section id="faq" className="section">

## 常见问题

- **想免输密码 / 提示缺少 sshpass** —— 密码模式下要免交互，需在本机装 `sshpass`（macOS：Homebrew；Linux：包管理器；Windows：WSL），IDE 检测到后会自动复用已存密码。
- **部署报「未找到 .elf 文件」** —— 先回第三步编译，确认产物生成。
- **改了代码要重新部署** —— 顺序：编译 → 部署 → 运行。

</section>

<section id="next" className="section">

## 下一步

你已用 IDE 把程序一键部署到了 Linux 开发板，跑通了 Linux 板的「编译 → 部署 → 运行」工作流。继续深入：

| 想做什么 | 去这里 |
| --- | --- |
| 树莓派跑 GPIO / I2C / SPI / UART 外设 | [树莓派外设示例](/docs/hardware/Linux/raspberry-pi/Examples/peripherals-raspberry-pi) |
| 换一块 Linux 板（东山派 A1 / 泰山派 3 / Ubuntu） | 建工程时改选对应板型即可，流程一致 |
| 树莓派 40-pin 引脚参考 | [Raspberry Pi 5 GPIO Reference](/docs/hardware/Linux/raspberry-pi/Examples/raspberry-pi) |
| 进阶：部署一个连云的 AI 语音应用 | [实战二：your_chat_bot](/learn/tuyaopen-ide-practice-2) |

</section>
