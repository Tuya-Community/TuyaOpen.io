---
title: DuckyClaw 连接 TuyaClaw
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DuckyClaw 连接 TuyaClaw

## 1. 概述

DuckyClaw 是运行在物联网设备上的 AI 语音助手固件，通过 **ACP 协议（Agent Client Protocol，基于 WebSocket）** 连接到 TuyaClaw Gateway，实现与 AI Agent 的实时对话。

[TuyaClaw](https://claw.tuya.ai/) 是涂鸦智能推出的 AI Agent 桌面客户端，支持 Windows、macOS 和 Linux 系统。其内置了 OpenClaw 核心，并通过 Gateway 服务（默认监听 `18789` 端口）与 DuckyClaw 设备建立连接。

**连接架构：**

```
DuckyClaw (IoT 设备)
    │  WebSocket (ACP 协议)
    ▼
TuyaClaw Gateway (PC)
    │  
    ▼
AI Agent (LLM 对话)
```

---

## 2. 前置条件

### 2.1 软件准备

| 软件 | 说明 | 获取方式 |
|------|------|---------|
| **TuyaClaw** | AI Agent 平台（支持 Windows / macOS / Linux），需已安装并能正常启动 | [官网下载](https://claw.tuya.ai/) |
| **DuckyClaw 固件开发环境** | 编译固件所需工具链 | 参考 [DuckyClaw 快速入门](ducky-quick-start-T5AI) |

### 2.2 网络要求

- DuckyClaw 设备与运行 TuyaClaw 的 PC 处于**同一局域网**，或同一 Wi-Fi 网络
- 如果使用公网连接，需将 TuyaClaw Gateway 通过端口映射等方式暴露到公网

### 2.3 DuckyClaw 基础配置

在进行本文配置前，请先完成 DuckyClaw 的基础配置（Wi-Fi 联网、固件烧录等）。

:::note
参考：[DuckyClaw 与 T5-AI 快速入门](ducky-quick-start-T5AI)
:::

---

## 3. TuyaClaw 配置文件位置

TuyaClaw 的核心配置文件为 `openclaw.json`，不同系统的默认路径如下：

| 操作系统 | 配置文件路径 |
|----------|------------|
| **Linux** | `~/.tuyaclaw/openclaw.json` |
| **macOS** | `~/.tuyaclaw/openclaw.json` |
| **Windows** | `C:\Users\<用户名>\.tuyaclaw\openclaw.json` |

:::note
`~` 表示当前用户的主目录，如 `/home/username`（Linux）或 `/Users/username`（macOS）。Windows 中 `<用户名>` 替换为你的登录用户名。
:::

TuyaClaw 还有一个 Electron 层设置文件，存有 Token 供 UI 读取：

| 操作系统 | Electron 设置文件路径 |
|----------|---------------------|
| **Linux** | `~/.config/tuyaclaw/settings.json` |
| **macOS** | `~/Library/Application Support/tuyaclaw/settings.json` |
| **Windows** | `C:\Users\<用户名>\AppData\Roaming\tuyaclaw\settings.json` |

**快速打开配置目录：**

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
# 在终端中打开配置目录
xdg-open ~/.tuyaclaw
```

或直接在文件管理器中按 `Ctrl+L` 并输入 `~/.tuyaclaw`。

</TabItem>
<TabItem value="macos" label="macOS">

```bash
# 在 Finder 中打开配置目录
open ~/.tuyaclaw
```

也可以在 Finder 中按 `Cmd+Shift+G`，输入 `~/.tuyaclaw`，然后点击**前往**。

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
# 在 PowerShell 中打开配置目录
explorer "$env:USERPROFILE\.tuyaclaw"
```

也可以按 `Win+R`，输入 `%USERPROFILE%\.tuyaclaw`，然后点击**确定**。

</TabItem>
</Tabs>

---

## 4. 修改 TuyaClaw Gateway 配置

### 4.1 备份配置文件

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
cp ~/.tuyaclaw/openclaw.json ~/.tuyaclaw/openclaw.json.backup
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
cp ~/.tuyaclaw/openclaw.json ~/.tuyaclaw/openclaw.json.backup
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
Copy-Item "$env:USERPROFILE\.tuyaclaw\openclaw.json" `
          "$env:USERPROFILE\.tuyaclaw\openclaw.json.backup"
```

</TabItem>
</Tabs>

### 4.2 编辑配置文件

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
nano ~/.tuyaclaw/openclaw.json
```

也可以用任意文本编辑器打开该文件：在文件管理器中进入 `~/.tuyaclaw/` 目录，右键点击 `openclaw.json`，选择**用文本编辑器打开**。

</TabItem>
<TabItem value="macos" label="macOS">

```bash
nano ~/.tuyaclaw/openclaw.json
```

也可以在 Finder 中进入 `~/.tuyaclaw/` 目录，右键点击 `openclaw.json`，选择**打开方式** → **文本编辑**（或任意编辑器）。

</TabItem>
<TabItem value="windows" label="Windows">

用记事本或任意编辑器（推荐 VS Code）打开：

```
C:\Users\<用户名>\.tuyaclaw\openclaw.json
```

**操作步骤**：在**文件资源管理器**中找到 `C:\Users\你的用户名\.tuyaclaw\` 目录，右键点击 `openclaw.json`，选择**打开方式** → **记事本**（或 VS Code）。

</TabItem>
</Tabs>

### 4.3 修改 Gateway 配置段

找到文件中的 `"gateway"` 字段，将其替换为以下内容（保留文件中其他配置不变）：

```json
"gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "lan",
    "auth": {
        "mode": "token",
        "token": "your_token_here"
    },
    "controlUi": {
        "dangerouslyAllowHostHeaderOriginFallback": true,
        "allowInsecureAuth": true,
        "dangerouslyDisableDeviceAuth": true
    }
}
```

:::warning
`"token"` 字段保持原有值不变，不要将 `your_token_here` 写入文件，填入你自己的 Token（见第 5.2 节获取方法）。
:::

**各字段说明：**

| 字段 | 说明 |
|------|------|
| `"bind": "lan"` | 让 Gateway 监听局域网网卡 IP，而非仅 `127.0.0.1`（默认仅本机可访问），**这是允许 DuckyClaw 连接的关键配置** |
| `dangerouslyAllowHostHeaderOriginFallback: true` | 允许非 UI 来源（如 IoT 设备）发起 WebSocket 连接 |
| `allowInsecureAuth: true` | 允许局域网非 HTTPS 环境下的认证 |
| `dangerouslyDisableDeviceAuth: true` | 禁用设备级二次认证，仅凭 Token 完成鉴权 |

### 4.4 重启 TuyaClaw Gateway

配置修改后，需重启 Gateway 使配置生效。

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**方法一：使用内置 CLI**

```bash
~/.config/tuyaclaw/resources/cli/openclaw gateway restart
```

**方法二：完全退出并重新启动 TuyaClaw**

在系统托盘右键点击 TuyaClaw 图标，选择**退出**，然后重新启动程序。

</TabItem>
<TabItem value="macos" label="macOS">

**方法一：使用内置 CLI**

```bash
~/Applications/TuyaClaw.app/Contents/Resources/cli/openclaw gateway restart
```

**方法二：完全退出并重新启动 TuyaClaw**

在菜单栏右键点击 TuyaClaw 图标，选择**退出**，然后重新启动程序。

</TabItem>
<TabItem value="windows" label="Windows">

**方法一：通过 TuyaClaw 应用 UI**

在 TuyaClaw 界面中找到 Gateway 管理入口，点击重启。

**方法二：完全退出并重新启动 TuyaClaw**

右键点击任务栏托盘中的 TuyaClaw 图标，选择**退出**，然后重新启动程序。

**方法三：使用内置 CLI（PowerShell）**

```powershell
& "$env:LOCALAPPDATA\Programs\TuyaClaw\resources\cli\openclaw.cmd" gateway restart
```

</TabItem>
</Tabs>

---

## 5. 获取 IP 地址和 Token

### 5.1 获取局域网 IP

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
ip addr show | grep -E "inet " | awk '{print $2}' | cut -d'/' -f1 | grep -v "^127"
```

或：

```bash
hostname -I
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
ipconfig getifaddr en0        # 以太网
ipconfig getifaddr en1        # Wi-Fi（部分机型）
```

或：

```bash
ifconfig | grep "inet " | grep -v "127.0.0.1"
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
Get-NetIPAddress | Where-Object {
    $_.AddressFamily -eq "IPv4" -and $_.IPAddress -notlike "127.*"
} | Format-Table InterfaceAlias, IPAddress
```

</TabItem>
</Tabs>

:::tip
从输出结果中，选择与 DuckyClaw 设备**处于同一局域网段**的 IP 地址（通常是 `192.168.x.x` 或 `10.x.x.x`）。有线网络（以太网）比 Wi-Fi 更稳定，建议优先使用有线网络的 IP。
:::

### 5.2 获取 Gateway Token

Token 存储在 `openclaw.json` 的 `gateway.auth.token` 字段中。

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
grep '"token"' ~/.tuyaclaw/openclaw.json
```

或读取完整值：

```bash
python3 -c "import json; d=json.load(open('$HOME/.tuyaclaw/openclaw.json')); print(d['gateway']['auth']['token'])"
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
grep '"token"' ~/.tuyaclaw/openclaw.json
```

或读取完整值：

```bash
python3 -c "import json; d=json.load(open('$HOME/.tuyaclaw/openclaw.json')); print(d['gateway']['auth']['token'])"
```

</TabItem>
<TabItem value="windows" label="Windows">

**方法一：从 OpenClaw 核心配置读取**

```powershell
(Get-Content "$env:USERPROFILE\.tuyaclaw\openclaw.json" | ConvertFrom-Json).gateway.auth.token
```

**方法二：从 Electron 设置读取**

```powershell
(Get-Content "$env:APPDATA\tuyaclaw\settings.json" | ConvertFrom-Json).gatewayToken
```

</TabItem>
</Tabs>

### 5.3 验证 Gateway 可访问性

配置修改并重启后，在同网络中的浏览器访问：

```
http://<你的局域网IP>:18789/
```

若返回任意 HTTP 响应（包括错误页面），说明 Gateway 已成功监听局域网地址。若连接超时，请检查防火墙（见第 7.3 节）。

---

## 6. 配置 DuckyClaw 固件参数

### 6.1 创建配置文件

在 DuckyClaw 项目根目录下，将示例文件复制并重命名：

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
cp include/tuya_app_config_secrets.h.example include/tuya_app_config_secrets.h
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
cp include/tuya_app_config_secrets.h.example include/tuya_app_config_secrets.h
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
Copy-Item include\tuya_app_config_secrets.h.example include\tuya_app_config_secrets.h
```

</TabItem>
</Tabs>

:::note
`tuya_app_config_secrets.h` 已被加入 `.gitignore`，不会被提交到版本库，适合存放敏感配置。
:::

### 6.2 修改配置内容

编辑 `include/tuya_app_config_secrets.h`，找到以下 ACP Gateway 相关宏定义，填入实际值：

```c
/* openclaw / tuyaclaw gateway configuration */
#define OPENCLAW_GATEWAY_HOST            "xxx.xxx.xxx.xxx"   /* 替换为 TuyaClaw 所在主机的局域网 IP */
#define OPENCLAW_GATEWAY_PORT            18789
#define OPENCLAW_GATEWAY_TOKEN           "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  /* 替换为第 5.2 节获取的 Token */
#define DUCKYCLAW_DEVICE_ID              "duckyclaw-001"     /* 设备唯一标识，可自定义 */
```

**各字段说明：**

| 宏定义 | 说明 |
|--------|------|
| `OPENCLAW_GATEWAY_HOST` | TuyaClaw 所在主机的局域网 IP（第 5.1 节获取）|
| `OPENCLAW_GATEWAY_PORT` | 固定为 `18789`，无需修改 |
| `OPENCLAW_GATEWAY_TOKEN` | 第 5.2 节获取的 Token |
| `DUCKYCLAW_DEVICE_ID` | 设备名称，建议使用唯一标识（如 MAC 地址），用于在 TuyaClaw 中区分多台设备 |

### 6.3 重新编译并烧录

完成配置后，重新编译固件并烧录到 DuckyClaw 设备。

---

## 7. 常见问题

### 7.1 DuckyClaw 连接失败排查

| 设备日志中的错误信息 | 可能原因 | 解决方法 |
|--------------------|---------|---------|
| `acp tcp connect failed` | IP 不可达或端口未开放 | 检查 IP 是否正确；检查防火墙是否放行 18789 端口 |
| `acp upgrade rejected` | WebSocket 握手被 Gateway 拒绝 | 确认 `dangerouslyAllowHostHeaderOriginFallback: true` 已设置并已重启 Gateway |
| `acp connect res ok=false` | Token 鉴权失败 | 对比 `openclaw.json` 中的 Token 与固件 `OPENCLAW_GATEWAY_TOKEN` 是否完全一致 |
| `acp connect timeout` | 网络不通或 Gateway 未启动 | 确认 TuyaClaw 正在运行；用浏览器访问 `http://<IP>:18789/` 验证 |
| `acp dns resolve failed` | 主机名无法解析 | 使用 IP 地址代替主机名 |

### 7.2 确认 Gateway 是否已绑定局域网地址

修改配置并重启后，验证 Gateway 是否已绑定局域网地址：

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
netstat -tlnp | grep 18789
# 或
ss -tlnp | grep 18789
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
netstat -an | grep 18789
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
netstat -ano | findstr ":18789"
```

</TabItem>
</Tabs>

若 `Local Address` 显示 `0.0.0.0:18789`，说明 Gateway 已成功绑定所有网卡（包括局域网），DuckyClaw 可以连接。

若显示 `127.0.0.1:18789`，说明 `bind: lan` 未生效，请重新检查 `openclaw.json` 修改是否正确，并重启 TuyaClaw。

### 7.3 防火墙放行 18789 端口

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**ufw：**

```bash
sudo ufw allow 18789/tcp
```

**firewalld：**

```bash
sudo firewall-cmd --add-port=18789/tcp --permanent
sudo firewall-cmd --reload
```

</TabItem>
<TabItem value="macos" label="macOS">

macOS 默认不阻止传入连接，通常无需额外配置。若使用第三方防火墙，请参考对应软件文档。

</TabItem>
<TabItem value="windows" label="Windows">

以管理员权限运行 PowerShell：

```powershell
New-NetFirewallRule -DisplayName "TuyaClaw Gateway" -Direction Inbound `
    -Protocol TCP -LocalPort 18789 -Action Allow
```

验证规则是否已添加：

```powershell
Get-NetFirewallRule -DisplayName "TuyaClaw Gateway"
```

</TabItem>
</Tabs>

### 7.4 配置修改未生效

- 确认编辑的是正确的 `openclaw.json` 文件路径（见第 3 节）
- 确认 JSON 格式正确，可用在线 JSON 校验工具检查语法
- 确认已完整重启 Gateway（退出 TuyaClaw 进程后重新启动，而非仅刷新页面）

### 7.5 与连接原生 OpenClaw 的区别

| 对比项 | OpenClaw | TuyaClaw |
|--------|----------|----------|
| 支持系统 | Linux / macOS / Windows | Linux / macOS / Windows |
| 核心配置文件 | `~/.openclaw/openclaw.json` | `~/.tuyaclaw/openclaw.json` |
| Gateway 默认绑定 | `local`（需改为 `lan`）| `local`（同样需改为 `lan`）|
| 端口 | `18789` | `18789`（相同）|
| 获取 Token | `grep '"token"' ~/.openclaw/openclaw.json` | `grep '"token"' ~/.tuyaclaw/openclaw.json` |
| 重启 Gateway | `openclaw gateway restart` | TuyaClaw UI 或内置 CLI |
| DuckyClaw 固件配置 | 完全相同的宏定义 | 完全相同的宏定义 |
