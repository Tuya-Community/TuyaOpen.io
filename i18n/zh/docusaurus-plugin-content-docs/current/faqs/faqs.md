# 常见问题

<!-- TOC -->
- [常见问题](#常见问题)
  - [一般故障排除常见问题](#一般故障排除常见问题)
- [环境设置和激活](#环境设置和激活)
- [构建问题](#构建问题)
- [硬件](#硬件)
- [配置和 Kconfig 问题](#配置和-kconfig-问题)
- [授权和许可证问题](#授权和许可证问题)
- [烧录和设备启动](#烧录和设备启动)
- [连接问题](#连接问题)
- [外设和功能问题](#外设和功能问题)
  - [与涂鸦云 / 涂鸦智能生活 App 的配对问题](#与涂鸦云--涂鸦智能生活-app-的配对问题)
- [项目创建和结构](#项目创建和结构)
- [Git 和子模块问题](#git-和子模块问题)
- [Linux 运行时支持常见问题](#linux-运行时支持常见问题)
    - [概述](#概述)
  - [](#)
<!-- /TOC -->

## 一般故障排除常见问题

# 环境设置和激活

<details>
<summary><strong>Q1: 如何激活 `tos.py`，为什么需要重新激活？</strong></summary>

要激活 `tos.py`，请在 TuyaOpen 根目录运行激活脚本：
- **Linux/Mac:** `. ./export.sh`
- **Windows (PowerShell):** `.\export.ps1`（可能需要先执行 `Set-ExecutionPolicy RemoteSigned -Scope LocalMachine`）
- **Windows (CMD):** `.\export.bat`

**重要提示：** 每次打开新的终端会话时，都必须重新激活 `tos.py`。激活会设置构建系统所需的 Python 虚拟环境和 PATH 变量。

</details>

---

<details>
<summary><strong>Q2: 如果 `tos.py` 激活失败该怎么办？</strong></summary>

如果激活失败：
- **Linux：** 安装 `python3-venv` 包：`sudo apt-get install python3-venv`
- **删除并重新创建 venv：** 删除 `./.venv` 目录，然后再次运行激活脚本
- **检查 Python 版本：** 确保已安装 Python 3.8 或更高版本
- **Windows：** 确保使用 CMD 或 PowerShell（不要使用 Git Bash 或 MSYS2，它们不兼容）

</details>

---

<details>
<summary><strong>Q3: 为什么不能在 Windows 上使用 Git Bash 或 MSYS2？</strong></summary>

TuyaOpen 的构建系统与 Windows 上的类 Linux 终端环境（Git Bash、MSYS2）不兼容。您必须使用：
- **Windows CMD**（命令提示符）
- **PowerShell**

构建脚本依赖于 Windows 原生的路径处理和命令执行，这些类 Linux 环境无法正确支持。

</details>

---

<details>
<summary><strong>Q4: TuyaOpen 的系统要求是什么？</strong></summary>

最低要求：
- **操作系统：** Windows 10/11、Ubuntu 20.04/22.04/24.04 LTS（推荐）、macOS（使用 Homebrew）
- **工具：** Git >= 2.0.0、CMake >= 3.28.0、Make >= 3.0.0、Ninja >= 1.6.0、Python >= 3.8.0
- **Linux 软件包：** `build-essential`、`ninja-build`、`cmake-curses-gui`、`python3-pip`、`python3-venv`
- **硬件：** USB 数据线、兼容的开发板

</details>

---

<details>
<summary><strong>Q5: 如何验证我的环境设置是否正确？</strong></summary>

激活后，运行以下命令进行验证：
```bash
tos.py version    # 应显示版本号
tos.py check      # 应验证所有工具并下载子模块
```

如果 `tos.py version` 显示 `[Unknown version]`，表示仓库没有标签（在分叉仓库中很常见），但这不会影响功能。

</details>

---

# 构建问题

<details>
<summary><strong>Q1: 如果构建因缺少依赖项而失败该怎么办？</strong></summary>

如果构建因缺少包或模块而失败：
- 运行 `tos.py check` 自动安装所需的依赖项。
- 确保您的 Python 环境和 PATH 配置正确。

</details>

---

<details>
<summary><strong>Q2: 为什么构建系统无法检测到我的开发板？</strong></summary>

如果构建脚本无法检测到您的硬件开发板或显示未定义开发板的错误：
- 确保使用 `tos.py config choice` 选择了正确的目标开发板。
- 确认您的开发板配置文件存在于 `{PATH_TO_APP_PROJECT_ROOT}/config/your_t5_custom_board.config`。
- `config` 目录应包含每个开发板的 Kconfig 覆盖文件。
- 并非所有应用/演示都与每个开发板兼容；请查看应用文档。
- 如果您的代码支持，构建系统支持多个芯片、开发板版本或平台（Linux/MCU）。

</details>

---

<details>
<summary><strong>Q3: 何时需要创建新的开发板 BSP？</strong></summary>

如果您的硬件或 PCB 是自定义的（即与现有开发板不匹配）：
- 使用 `tos.py new board` 生成 BSP 结构和配置文件。
- 在 BSP 中集中硬件初始化和开发板驱动程序。
- 在项目间重用您的 BSP，以便于维护和分离硬件/应用逻辑。

</details>

---

<details>
<summary><strong>Q4: 如何解决编译错误？</strong></summary>

如果构建失败、出现错误、警告或编译中途停止：
- 查看文档中的故障排除步骤。
- 如果无法解决，请在 [GitHub Issues](https://github.com/tuya/TuyaOpen/issues) 上提交工单或在 [Discord](https://discord.com/invite/yPPShSTttG) 上寻求帮助。
- AI Vibe Coding 工具可能会提供有用的建议或指导。

</details>

---

<details>
<summary><strong>Q5: 为什么在 Windows 上编译很慢？</strong></summary>

如果每个文件编译需要 3 秒或进程卡住：
- 打开任务管理器（`Ctrl + Shift + Esc`），找到并关闭 `MSPCManagerService` 进程。
- 如果上述方法不起作用，请将整个 `TuyaOpen` 目录移动到非系统驱动器（例如 D 盘）。
- 在 `Windows 安全 - 病毒和威胁防护` 设置中将目录添加到排除列表。

</details>

---

<details>
<summary><strong>Q6: 如果 `tos.py check` 失败该怎么办？</strong></summary>

如果检查命令报告错误：
- **工具未安装或版本过低：** 安装或升级相应的工具（git >= 2.0.0、cmake >= 3.28.0、make >= 3.0.0、ninja >= 1.6.0）。
- **子模块下载失败：** 在 TuyaOpen 根目录手动执行 `git submodule update --init`。
- **Python venv 问题：** 如果激活失败，删除 `./.venv` 目录并重新激活。确保已安装 `python3-venv`（在 Linux 上使用 `sudo apt-get install python3-venv`）。

</details>

---

# 硬件

<details>
<summary><strong>Q1: 如何重置配对信息和网络配置？</strong></summary>

要重置设备的配对信息和网络配置：

- **标准重置（大多数 MCU 设备）：**  
  - 5秒内快速重启(RESET)设备三次。  
  - 在第四次启动时，网络和配对状态应自动清除。  
  - 请参考设备文档了解任何特定型号的重置程序。

- **对于 Linux 运行时：**  
  如果您在 Linux 上开发或测试，可以通过删除 `tuyadb` 文件夹手动清除配对和网络状态的持久键值数据。此文件夹用作网络和配对信息的缓存。  
  示例：
  ```
  rm -rf tuyadb/*
  ```
</details>

---

# 配置和 Kconfig 问题

<details>
<summary><strong>Q1: 如何选择正确的开发板配置？</strong></summary>

使用 `tos.py config choice` 从预验证的配置中选择：
- 该命令列出项目的所有可用开发板配置
- 配置来自两个来源（按优先级顺序）：
  1. 项目特定的 `config/` 目录
  2. 全局 `boards/` 目录
- 选择后，配置将保存到项目目录中的 `app_default.config`

</details>

---

<details>
<summary><strong>Q2: `config choice` 和 `config menu` 有什么区别？</strong></summary>

- **`tos.py config choice`：** 从可用选项中选择预配置的开发板设置。这是快速入门的推荐方式。
- **`tos.py config menu`：** 打开交互式菜单（menuconfig）以手动配置所有 Kconfig 选项。用于高级自定义。

**注意：** 由于这两个操作可能会更改工具链，因此它们会在执行前执行深度清理。

</details>

---

<details>
<summary><strong>Q3: 为什么在 menuconfig 中无法选择/取消选择某些 Kconfig 选项？</strong></summary>

如果选项显示为灰色或无法更改：
- 该选项可能被开发板的 `Kconfig` 文件中的 `select` 语句强制启用（例如，`boards/T5AI/TUYA_T5AI_EVB/Kconfig`）
- 带有 `select ENABLE_XXX` 的选项会自动启用，无法手动禁用
- 要更改此设置，您需要直接修改开发板的 Kconfig 文件

</details>

---

<details>
<summary><strong>Q4: 如何保存我的自定义配置以供重用？</strong></summary>

通过 `tos.py config menu` 修改配置后：
- 使用 `tos.py config save` 保存当前配置
- 在提示时输入名称（例如，`my_custom_board.config`）
- 配置将保存到项目的 `config/` 目录
- 之后可以使用 `tos.py config choice` 选择它

</details>

---

<details>
<summary><strong>Q5: 在 Windows 上 `config menu` 中方向键不起作用。该怎么办？</strong></summary>

这是终端兼容性问题。请尝试：
- 使用替代键：**h**（左）、**j**（下）、**k**（上）、**l**（右）
- 在 CMD 和 PowerShell 之间切换，找到哪个更好用
- 使用空格键切换选项，Enter 键确认

</details>

---


# 授权和许可证问题

<details>
<summary><strong>Q1: TuyaOpen 许可证和 TuyaOS 许可证有什么区别？</strong></summary>

- **TuyaOpen 许可证：** 由 UUID 和 AuthKey 组成，专门用于 TuyaOpen 框架。这些**不能**与 TuyaOS 许可证互换。
- **TuyaOS 许可证：** 仅用于 TuyaOS 项目，不能用于 TuyaOpen 框架。
- 在使用 TuyaOpen 项目时，始终确保使用 TuyaOpen 特定的 UUID 和 AuthKey。

</details>

---

<details>
<summary><strong>Q2: 如何获取 TuyaOpen 许可证（UUID 和 AuthKey）？</strong></summary>

您可以通过以下方式获取 TuyaOpen 许可证：
- **方法 1：** 开发者可以直接从 [涂鸦开发者平台](https://platform.tuya.com/) 获取两个免费许可证
- **方法 2：** 从 [涂鸦 IoT 平台](https://platform.tuya.com/purchase/index?type=6) 购买预刷 TuyaOpen 许可证的模块
- **方法 3：** 从 [涂鸦官方淘宝店](https://item.taobao.com/item.htm?ft=t&id=911596682625) 购买

</details>

---

<details>
<summary><strong>Q3: 如何将授权信息写入设备？</strong></summary>

有两种方法可用：
- **方法 1 - 命令行：** 使用 `tos.py monitor -b 115200`，然后在交互式提示符中输入 `auth uuidxxxxxxxxxxxxxxxx keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **方法 2 - 代码：** 修改项目中的 `tuya_config.h` 并设置 `TUYA_OPENSDK_UUID` 和 `TUYA_OPENSDK_AUTHKEY` 宏，然后重新构建并烧录

**注意：** 使用用于烧录的串口（不是日志端口）执行授权命令。

</details>

---

<details>
<summary><strong>Q4: 如何验证我的授权是否已正确写入？</strong></summary>

写入授权后：
- 使用 `tos.py monitor` 连接到设备
- 在交互式提示符中输入 `auth-read` 命令
- 您应该看到显示的 UUID 和 AuthKey
- 如果您看到 `xxxxxxxxxxxxxxxx` 而不是实际值，则授权未正确写入

</details>

---

<details>
<summary><strong>Q5: 设备日志中的"授权读取失败"是什么意思？</strong></summary>

如果您看到如下错误：
```
[ty E][tal_kv.c:269] lfs open UUID_TUYAOPEN -2 err
[ty E][tuya_authorize.c:107] Authorization read failure.
```
这表示：
- 设备无法从存储中读取授权信息
- 授权未正确写入或已损坏
- 使用上述方法之一重新写入授权并重启设备

</details>

---

# 烧录和设备启动

<details>
<summary><strong>Q1: 为什么烧录失败或检测不到设备？</strong></summary>

如果烧录命令失败或检测不到设备：
- 确认您使用的是数据 USB 线（不是仅充电线）。
- 为您的平台安装相应的串口驱动程序。
- 尝试另一个 USB 端口或不同的线缆。
- 直接指定端口（例如 `tos.py flash --port /dev/ttyUSB0`）。有关更多详细信息，请查看烧录指南。
- 如果需要，将设备置于下载模式/启动模式。
- 使用 `lsusb`（Linux）或设备管理器（或 Windows 设备管理器）检查设备连接。

</details>

---

<details>
<summary><strong>Q2: 如果设备无法启动该怎么办？</strong></summary>

如果设备开机后无显示、无响应或无串口输出：
- 检查 USB 线和端口。
- 检查电源（考虑使用另一个端口或适配器）。
- 查找短路。
- 重新烧录固件。
- 在启动过程中观察串口输出中的错误消息。

</details>

---

<details>
<summary><strong>Q3: 为什么烧录时看到"端口 [xxx] 可能正忙"？</strong></summary>

如果您看到此消息：
- 等待约 1 分钟后重试
- 延迟因虚拟机和串口芯片型号而异
- 对于虚拟机中的 T5 系列开发板，端口可用之前存在已知延迟
- 您可以使用 `ls /dev/tty*`（Linux）验证端口是否存在，但可能需要等待才能使用

</details>

---

<details>
<summary><strong>Q4: 为什么我的 T5 开发板显示两个串口？</strong></summary>

T5 系列开发板有两个独立的串口：
- **下载/烧录端口：** 用于固件烧录和授权
- **日志端口：** 用于查看设备日志和监控

**识别端口：**
- **Windows：** 检查设备管理器 - 带字母 A 的端口是下载端口，带字母 B 的端口是日志端口
- **Linux/Mac：** 通常，编号较小的设备是烧录端口，编号较大的是日志端口
- 如果不确定，烧录时测试两个端口

</details>

---

<details>
<summary><strong>Q5: 如何在 Linux 上修复串口权限错误？</strong></summary>

如果在访问串口时收到权限被拒绝错误：
```bash
sudo usermod -aG dialout $USER
```
然后**重启系统**以使更改生效。重启后，您应该能够在不使用 sudo 的情况下访问串口。

</details>

---

<details>
<summary><strong>Q6: 为什么 tyutool_gui 在 Windows 上被检测为病毒？</strong></summary>

这是 Windows Defender 的误报。解决方法：
- 将 `tyutool_gui` 工具放在非系统驱动器上（例如 D: 盘）
- 在 `Windows 安全 - 病毒和威胁防护` 设置中将目录添加到排除列表
- 该工具是安全的，由 TuyaOpen 项目提供

</details>

---

# 连接问题

<details>
<summary><strong>Q1: 如果设备无法连接到 Wi-Fi 怎么办？</strong></summary>

如果设备在配对时无法连接到 Wi-Fi：
- 使用 2.4GHz Wi-Fi 网络（不支持 5GHz）。
- 确保您的 Wi-Fi SSID 和密码信息正确。
- 将设备移近路由器。
- 检查路由器设置，如 MAC 过滤。
- 重置设备并再次尝试配对过程。

如果问题仍未解决，请在 [GitHub Issues](https://github.com/tuya/TuyaOpen/issues) 上寻求帮助并附上完整的设备日志。

</details>

---

<details>
<summary><strong>Q2: 如何解决云连接问题？</strong></summary>

如果设备未出现在应用中或无法连接到云：
- 确认 UUID 和 AuthKey 正确且是 TuyaOpen 特定的。
- 确保设备在线且互联网连接可用。
- 检查涂鸦云服务状态。
- 查看设备日志中的连接错误。
- 如果问题持续，重置并重新配对设备。

如果问题仍未解决，请在 [GitHub Issues](https://github.com/tuya/TuyaOpen/issues) 上寻求帮助并附上完整的设备日志。

</details>

---

# 外设和功能问题

<details>
<summary><strong>Q1: 如果屏幕空白或不显示该怎么办？</strong></summary>

如果您看到空白屏幕或显示错误：
- 确保您选择了正确的显示目标开发板。
- 检查 menuconfig 中的显示设置。
- 确认已启用 LVGL。
- 在串口监视器中查找显示初始化消息。
- 验证您的演示应用支持屏幕输出。

</details>

---

<details>
<summary><strong>Q2: 为什么 AI Agent 没有响应？</strong></summary>

如果语音或 AI 命令没有响应：
- 检查设备的网络连接。
- 查看串口监视器中的 AI 服务相关错误。
- 确认麦克风已连接且正常工作。
- 确保唤醒词检测已启用且正常工作。
- 验证设备已正确配对并连接到涂鸦云。
- 检查项目配置中是否启用了 AI Agent 服务。

</details>

---

<details>
<summary><strong>Q3: 如何启用音频编解码器驱动程序（麦克风/扬声器）？</strong></summary>

要启用音频功能：
- **首先，确保您的音频编解码器和硬件受支持：** 检查开发板的文档和 Kconfig 文件，以验证您的开发板支持您要使用的音频编解码器硬件（麦克风/扬声器）
- 在项目目录中运行 `tos.py config menu`
- 导航到音频编解码器配置选项
- 为您的开发板启用相应的音频编解码器
- 如果音频是预配置的，确保开发板的 Kconfig 文件包含 `select ENABLE_AUDIO_CODECS`
- 如果您的开发板没有预注册的音频设备，您需要自己实现音频驱动程序桥接
- 配置更改后重新构建项目

</details>

---

<details>
<summary><strong>Q4: 为什么我的外设驱动程序（按钮、显示屏等）不工作？</strong></summary>

如果外设无法正常工作：
- 验证外设在 Kconfig 中已启用（`tos.py config menu`）
- 检查 `src/peripherals/<peripheral>/Kconfig` 和 `boards/<platform>/<board>/Kconfig` 是否都有所需的配置
- 确保开发板的硬件初始化代码注册了外设
- 查看串口日志中的驱动程序初始化错误
- 验证硬件连接和引脚配置与您的开发板设置匹配

</details>

---

## 与涂鸦云 / 涂鸦智能生活 App 的配对问题

<details>
<summary><strong>Q1: 为什么在配对期间应用无法检测到我的设备？</strong></summary>

如果您的设备在配对期间未出现在应用中：
- 验证您的 UUID 和授权许可证代码是否已正确配置。
- 重置网络配置：
  - 对于 MCU：5秒内快速重启(RESET)设备三次。
  - 对于 Linux/Ubuntu：删除 `tuyadb` 缓存文件夹并重试。

</details>

---

<details>
<summary><strong>Q2: 如果在配对期间无法连接到 Wi-Fi 怎么办？</strong></summary>

如果应用中的 Wi-Fi 设置连接失败：
- 确保您的网络是 2.4GHz（大多数 Wi-Fi MCU 不支持 5GHz）。
  - 对于 MCU：确认路由器支持 2.4GHz。
  - 对于 Linux：使用网络工具（`ipconfig` 等）验证连接并检查硬件接口。
- 确保 Wi-Fi 密码输入正确。
- 将设备移近路由器。

</details>

---

<details>
<summary><strong>Q3: 如果设备在配对后出现在应用中但不响应怎么办？</strong></summary>

如果设备在应用中显示但在配对后无响应：
- 检查串口监视器中的错误消息。
- 查看设备日志中的云连接信息。
- 确保固件中实现了所需的 DP（数据点）。
- 验证设备实际上在线（在日志中检查云连接状态）。
- 确保您的固件正确处理来自云的 DP 命令。

</details>

---

<details>
<summary><strong>Q4: 如何将设备置于配对模式？</strong></summary>

对于大多数 TuyaOpen 演示（如 `switch_demo` 和 `your_chat_bot`）：
- **快速重置方法：** 5秒内快速重启(RESET)设备三次
- 设备将在第四次启动时进入配对模式
- 检查设备日志中的配对模式指示器（例如，`STATE_START`、`TUYA_EVENT_BIND_START`）
- 某些设备可能有物理按钮或其他方法 - 请参考您的特定设备文档

</details>

---

<details>
<summary><strong>Q5: 如果因授权不正确导致配对失败该怎么办？</strong></summary>

如果设备日志显示授权错误：
- 验证 UUID 和 AuthKey 是否正确写入（使用 `auth-read` 命令）
- 确保您使用的是 TuyaOpen 特定的许可证（不是 TuyaOS 许可证）
- 检查授权值在日志中是否显示为 `xxxxxxxxxxxxxxxx`
- 重新写入授权信息并重启设备
- 有关更多详细信息，请参阅[设备授权指南](../quick-start/equipment-authorization.md)

</details>

---

# 项目创建和结构

<details>
<summary><strong>Q1: 如何创建新项目？</strong></summary>

使用 `tos.py new project` 创建新应用：
- 该命令将提示输入项目名称
- 您可以使用 `--framework` 参数指定框架模板（默认为 `base`，也支持 `arduino`）
- 模板从 `tools/app_template/` 目录复制
- 创建后，使用 `tos.py config choice` 选择开发板配置
- 然后使用 `tos.py build` 构建

</details>

---

<details>
<summary><strong>Q2: 应该在哪里运行 `tos.py` 命令？</strong></summary>

**关键提示：** 始终从**应用程序项目目录**运行 `tos.py` 命令，而不是从 TuyaOpen 根目录：
- ✅ 正确：`cd apps/tuya_cloud/switch_demo && tos.py build`
- ❌ 错误：从 TuyaOpen 根目录运行会导致错误
- 项目目录是您的 `CMakeLists.txt` 和 `app_default.config` 文件所在的位置

</details>

---

<details>
<summary><strong>Q3: `apps/` 和 `example/` 目录有什么区别？</strong></summary>

- **`apps/`：** 包含功能完整的应用程序和演示（例如，`tuya_cloud/switch_demo`、`tuya.ai/your_chat_bot`）
- **`example/`：** 包含较小的代码示例，演示特定功能或 API
- 选择开发板配置后，两者都可以使用 `tos.py build` 编译
- 根据您的学习或开发需求选择

</details>

---

<details>
<summary><strong>Q4: 如何清理构建产物？</strong></summary>

两种清理选项：
- **标准清理：** `tos.py clean` - 删除构建缓存但保留配置
- **强制清理：** `tos.py clean -f` - 执行深度清理，删除整个 `.build` 目录
- 在不同开发板配置之间切换或遇到构建问题时使用强制清理

</details>

---

# Git 和子模块问题

<details>
<summary><strong>Q1: 如何更新 TuyaOpen 依赖项？</strong></summary>

更新主 TuyaOpen 仓库后（通过 `git pull` 或 `git checkout`）：
- 运行 `tos.py update` 自动更新相关依赖项
- 此命令根据 `platform/platform_config.yaml` 更新工具链依赖项
- 依赖项将切换到配置中指定的提交

</details>

---

# Linux 运行时支持常见问题

### 概述

虽然 TuyaOpen 主要为 MCU 设备设计，但它也支持 Linux 运行时环境（例如，ARM/x86/x64 上的嵌入式 Linux）。这允许您在各种硬件平台上使用涂鸦的框架开发应用程序，前提是您处理所需的硬件集成。

---

<details>
<summary><strong>Q1: 支持哪些 Linux 平台和架构？</strong></summary>

TuyaOpen 框架可以编译为常见的 Linux 架构，包括：
- x86（32 位）
- x64（64 位）
- ARM（32 位和 64 位，例如树莓派和类似的 SBC）

您可能需要配置构建工具链以匹配您的目标硬件。

</details>

---

<details>
<summary><strong>Q2: 如何在 Linux 上实现硬件（GPIO、SPI、I2C、PWM 等）支持？</strong></summary>

与硬件访问是直接的 MCU 环境不同，Linux 系统通过内核和板级支持包（BSP）管理硬件。为了让 TuyaOpen 与硬件交互：
- **实现 Linux 驱动程序：** 确保您的硬件可通过 Linux 设备驱动程序或标准 sysfs 接口访问。
- **在 TuyaOpen 代码库中创建桥接：** 您需要编写或调整硬件接口代码（用于 GPIO、SPI、PWM、QSPI、摄像头等）以符合 TuyaOpen 驱动程序接口。
- **利用现有接口：** 参考 Linux 库，如 `wiringPi`、`libgpiod` 或内核 `/dev/*` 节点用于常见外设。

</details>

---

<details>
<summary><strong>Q3: TuyaOpen 是否提供 Linux 硬件抽象？</strong></summary>

TuyaOpen 提供云连接、设备配对和 AI-Agent 功能的框架和抽象。但是，硬件外设支持（GPIO、SPI、PWM、摄像头、QSPI 等）**必须由开发人员实现**，使用您平台的内核/BSP 功能。

</details>

---

<details>
<summary><strong>Q4: 如何为我的 Linux 平台交叉编译 TuyaOpen？</strong></summary>

- 为目标使用正确的交叉编译器工具链（例如，ARM 使用 `arm-linux-gnueabihf-gcc`）。
- 修改 TuyaOpen 构建配置（通常通过 CMake 或 Makefile）以适合您的目标架构和 sysroot。
- 在硬件上测试您的二进制文件并排查依赖项问题（例如缺少 `libc` 版本或设备驱动程序）。

</details>

---

<details>
<summary><strong>Q5: 如果设备未枚举或硬件无法打开该怎么办？</strong></summary>

- 确保您的内核或 BSP 启用并导出必要的设备文件（例如，`/dev/spidev*`、`/dev/video*`、`/sys/class/gpio/*`）。
- 检查权限：使用足够的权限运行应用，或调整 udev 规则。
- 使用标准 Linux 工具（如 `dmesg`、`lsmod` 和 `ls /dev`）进行调试。

</details>

---

<details>
<summary><strong>Q6: 我可以在 Linux 上使用涂鸦云和 AI-Agent 功能吗？</strong></summary>

可以！TuyaOpen 跨平台处理云连接和 AI-Agent 功能。只要您提供硬件桥接实现，其余的设备逻辑、配对、云集成、OTA 和 AI 功能将与 MCU 部署类似地工作。

</details>
---
