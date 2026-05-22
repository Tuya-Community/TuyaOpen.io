---
title: DuckyClaw 连接 OpenClaw
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DuckyClaw 连接 OpenClaw

## 1. 概述

DuckyClaw 是运行在物联网设备上的 AI 语音助手固件，通过 **ACP 协议（Agent Client Protocol，基于 WebSocket）** 连接到 OpenClaw Gateway，实现与 AI Agent 的实时对话。

OpenClaw 是一款开源 AI Agent 平台，可部署在 Linux / macOS / Windows 等系统上。其内置的 Gateway 服务默认监听 `18789` 端口，DuckyClaw 通过局域网（或公网）与其建立连接。

**连接架构：**

```
DuckyClaw (IoT 设备)
    │  WebSocket (ACP 协议)
    ▼
OpenClaw Gateway (PC / 服务器)
    │
    ▼
AI Agent (LLM 对话)
```

---

## 2. 前置条件

### 2.1 软件准备

| 软件 | 说明 | 下载 |
|------|------|------|
| **OpenClaw** | AI Agent 平台，需在 PC 或服务器上安装 | [官网下载](https://openclaw.ai) |
| **DuckyClaw 固件开发环境** | 编译固件所需工具链 | 参考 [DuckyClaw 快速入门](ducky-quick-start-T5AI) |

### 2.2 网络要求

- **局域网模式**：DuckyClaw 设备与安装 OpenClaw 的 PC 处于同一局域网，或同一 Wi-Fi 网络
- **公网模式**：OpenClaw 部署在服务器上，需获取服务器公网 IP 地址

### 2.3 DuckyClaw 基础配置

在进行本文配置前，请先完成 DuckyClaw 的基础配置（Wi-Fi 联网、固件烧录等）。

:::note
参考：[DuckyClaw 与 T5-AI 快速入门](ducky-quick-start-T5AI)
:::

---

## 3. OpenClaw 配置文件位置

OpenClaw 的核心配置文件为 `openclaw.json`，不同系统的默认路径如下：

| 操作系统 | 配置文件路径 |
|----------|------------|
| **Linux** | `~/.openclaw/openclaw.json` |
| **macOS** | `~/.openclaw/openclaw.json` |
| **Windows** | `C:\Users\<用户名>\.openclaw\openclaw.json` |

:::note
`~` 表示当前用户的主目录，如 `/home/username`（Linux）或 `/Users/username`（macOS）。Windows 中 `<用户名>` 替换为你的登录用户名。
:::

**快速打开配置目录：**

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**方法一：终端命令**

```bash
xdg-open ~/.openclaw
```

**方法二：图形界面**

打开文件管理器，按 `Ctrl+L`，在地址栏中输入 `~/.openclaw`，然后按回车。

:::tip
`.openclaw` 是隐藏文件夹（以 `.` 开头）。如果在文件管理器中看不到它，按 `Ctrl+H` 显示隐藏文件。
:::

</TabItem>
<TabItem value="macos" label="macOS">

**方法一：终端命令**

```bash
open ~/.openclaw
```

**方法二：Finder 图形界面**

1. 打开 **Finder**
2. 在菜单栏点击**前往** → **前往文件夹...**（或按 `Cmd+Shift+G`）
3. 在弹出框中输入 `~/.openclaw`，点击**前往**

:::tip
`.openclaw` 是隐藏文件夹。在 Finder 中按 `Cmd+Shift+.` 可切换显示/隐藏文件。
:::

</TabItem>
<TabItem value="windows" label="Windows">

**方法一：PowerShell 命令**

```powershell
explorer "$env:USERPROFILE\.openclaw"
```

**方法二：文件资源管理器**

1. 按 `Win+R` 打开"运行"对话框
2. 输入 `%USERPROFILE%\.openclaw`，点击**确定**

**方法三：地址栏直接输入**

打开**文件资源管理器**，在地址栏中输入 `%USERPROFILE%\.openclaw`，按回车。

:::tip
`.openclaw` 是隐藏文件夹。如果找不到，在文件资源管理器的**查看**选项卡中勾选**隐藏的项目**。
:::

</TabItem>
</Tabs>

---

## 4. 修改 OpenClaw Gateway 配置

### 4.1 备份配置文件

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.backup
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.backup
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
Copy-Item "$env:USERPROFILE\.openclaw\openclaw.json" `
          "$env:USERPROFILE\.openclaw\openclaw.json.backup"
```

**图形界面操作：**

1. 打开 `%USERPROFILE%\.openclaw` 文件夹（参考第 3 节）
2. 右键点击 `openclaw.json` → **复制**
3. 在同一目录下右键 → **粘贴**
4. 将粘贴的副本重命名为 `openclaw.json.backup`

</TabItem>
</Tabs>

### 4.2 编辑配置文件

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**终端编辑：**

```bash
nano ~/.openclaw/openclaw.json
```

**图形界面操作：**

1. 打开 `~/.openclaw` 文件夹（参考第 3 节）
2. 右键点击 `openclaw.json` → **用文本编辑器打开**

</TabItem>
<TabItem value="macos" label="macOS">

**终端编辑：**

```bash
nano ~/.openclaw/openclaw.json
```

**Finder 图形界面操作：**

1. 打开 `~/.openclaw` 文件夹（参考第 3 节）
2. 右键点击 `openclaw.json` → **打开方式** → **文本编辑**（或其他编辑器）

</TabItem>
<TabItem value="windows" label="Windows">

**图形界面操作：**

1. 打开 `%USERPROFILE%\.openclaw` 文件夹（参考第 3 节）
2. 右键点击 `openclaw.json` → **打开方式** → **记事本**（或 VS Code 等编辑器）

**PowerShell 打开：**

```powershell
notepad "$env:USERPROFILE\.openclaw\openclaw.json"
```

</TabItem>
</Tabs>

### 4.3 修改 Gateway 配置段

找到 `gateway` 字段，替换为以下内容（保留其他原有配置不变）：

```json
{
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
    },
    "tailscale": {
      "mode": "off",
      "resetOnExit": false
    }
  }
}
```

:::warning
`"token"` 字段保持原有值不变，不要将 `your_token_here` 写入文件，填入你自己的 Token（见第 5.2 节获取方法）。
:::

**各字段说明：**

| 字段 | 说明 |
|------|------|
| `"bind": "lan"` | 让 Gateway 监听局域网网卡 IP，而非仅 `127.0.0.1`（本机回环），这是允许外部设备连接的关键 |
| `dangerouslyAllowHostHeaderOriginFallback: true` | 允许非浏览器来源（如 IoT 设备）发起 WebSocket 连接 |
| `allowInsecureAuth: true` | 允许非 HTTPS 环境下的认证（局域网场景） |
| `dangerouslyDisableDeviceAuth: true` | 禁用设备级二次认证，仅凭 Token 完成鉴权 |

### 4.4 重启 Gateway

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
openclaw gateway restart
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
openclaw gateway restart
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
openclaw gateway restart
```

</TabItem>
</Tabs>

:::note
若 `openclaw` 命令不可用，可完全退出并重新启动 OpenClaw 应用程序。
:::

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

**图形界面操作：**

1. 点击左上角**苹果菜单** → **系统设置**（或**系统偏好设置**）
2. 进入**网络**，点击当前连接的网络
3. 查看 **IP 地址**字段

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
Get-NetIPAddress | Where-Object {
    $_.AddressFamily -eq "IPv4" -and $_.IPAddress -notlike "127.*"
} | Format-Table InterfaceAlias, IPAddress
```

**图形界面操作：**

1. 右键点击任务栏的网络图标 → **打开网络和 Internet 设置**
2. 点击当前连接的网络 → **属性**
3. 向下滚动找到 **IPv4 地址**

</TabItem>
</Tabs>

:::tip
选择与 DuckyClaw 设备**处于同一局域网段**的 IP 地址（通常是 `192.168.x.x` 或 `10.x.x.x`）。有线网络（以太网）比 Wi-Fi 更稳定，建议优先使用有线网络的 IP。
:::

### 5.2 获取 Gateway Token

Token 存储在 `openclaw.json` 的 `gateway.auth.token` 字段中。

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
grep '"token"' ~/.openclaw/openclaw.json
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
grep '"token"' ~/.openclaw/openclaw.json
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
(Get-Content "$env:USERPROFILE\.openclaw\openclaw.json" | ConvertFrom-Json).gateway.auth.token
```

**图形界面操作（直接查看文件）：**

1. 打开 `%USERPROFILE%\.openclaw\openclaw.json`（参考第 3 节）
2. 在文件中搜索 `"token"` 字段，其值即为 Token

</TabItem>
</Tabs>

### 5.3 验证 Gateway 可访问性

在与 DuckyClaw 同网络的设备浏览器中访问：

```
http://<你的局域网IP>:18789/
```

如果返回 HTTP 响应（即便是错误页面），说明 Gateway 已成功监听局域网地址。若连接超时，请检查防火墙设置（见第 7 节）。

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

**图形界面操作：**

1. 在文件资源管理器中打开 DuckyClaw 项目的 `include` 文件夹
2. 找到 `tuya_app_config_secrets.h.example`，右键 → **复制**
3. 在同一目录右键 → **粘贴**
4. 将粘贴的副本重命名为 `tuya_app_config_secrets.h`（去掉 `.example` 后缀）

:::note
`tuya_app_config_secrets.h` 已被加入 `.gitignore`，不会被提交到版本库，适合存放敏感配置。
:::

</TabItem>
</Tabs>

### 6.2 修改配置内容

编辑 `include/tuya_app_config_secrets.h`，找到以下 ACP Gateway 相关宏定义，填入实际值：

```c
/* openclaw gateway configuration */
#define OPENCLAW_GATEWAY_HOST            "xxx.xxx.xxx.xxx"   /* 替换为 OpenClaw 主机的局域网 IP */
#define OPENCLAW_GATEWAY_PORT            18789
#define OPENCLAW_GATEWAY_TOKEN           "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  /* 替换为实际 Token */
#define DUCKYCLAW_DEVICE_ID              "duckyclaw-001"     /* 设备唯一标识，可自定义 */
```

**各字段说明：**

| 宏定义 | 说明 |
|--------|------|
| `OPENCLAW_GATEWAY_HOST` | OpenClaw 所在机器的局域网 IP（第 5.1 节获取）|
| `OPENCLAW_GATEWAY_PORT` | 固定为 `18789`，无需修改 |
| `OPENCLAW_GATEWAY_TOKEN` | 第 5.2 节获取的 Token |
| `DUCKYCLAW_DEVICE_ID` | 设备名称，建议使用唯一标识（如 MAC 地址）|

### 6.3 重新编译并烧录

完成配置后，重新编译固件并烧录到 DuckyClaw 设备。

---

## 7. 常见问题

### 7.1 DuckyClaw 连接失败

| 日志中的错误信息 | 可能原因 | 解决方法 |
|----------------|---------|---------|
| `acp tcp connect failed` | IP 不可达或端口未开放 | 检查 IP 是否正确；检查防火墙是否放行 18789 端口 |
| `acp upgrade rejected` | WebSocket 握手被拒绝 | 确认 `dangerouslyAllowHostHeaderOriginFallback: true` 已设置并已重启 Gateway |
| `acp connect res ok=false` | Token 鉴权失败 | 对比 `openclaw.json` 中的 Token 与固件 `OPENCLAW_GATEWAY_TOKEN` 是否一致 |
| `acp connect timeout` | 网络不通或 Gateway 未启动 | 确认 OpenClaw 正在运行；用浏览器访问 `http://<IP>:18789/` 验证 |
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

若 `Local Address` 显示 `0.0.0.0:18789`，说明已成功绑定所有网卡（包括局域网）。

### 7.3 放行防火墙端口

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
New-NetFirewallRule -DisplayName "OpenClaw Gateway" -Direction Inbound `
    -Protocol TCP -LocalPort 18789 -Action Allow
```

</TabItem>
</Tabs>

### 7.4 配置修改未生效

- 确认修改的是正确的配置文件路径（参考第 3 节）
- 确认已完整重启 Gateway（不只是刷新页面），命令：`openclaw gateway restart`
- 如重启后仍未生效，尝试完全退出并重新启动 OpenClaw 应用
