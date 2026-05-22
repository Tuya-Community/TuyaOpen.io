---
title: Connect DuckyClaw to OpenClaw
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connect DuckyClaw to OpenClaw

## 1. Overview

DuckyClaw is an AI voice assistant firmware that runs on IoT devices. It connects to the OpenClaw Gateway via the **ACP protocol (Agent Client Protocol, WebSocket-based)** to enable real-time conversation with an AI Agent.

OpenClaw is an open-source AI Agent platform that can be deployed on Linux, macOS, or Windows. Its built-in Gateway service listens on port `18789` by default, and DuckyClaw connects to it over the local network (or the internet).

**Connection architecture:**

```
DuckyClaw (IoT device)
    │  WebSocket (ACP protocol)
    ▼
OpenClaw Gateway (PC / server)
    │
    ▼
AI Agent (LLM conversation)
```

---

## 2. Prerequisites

### 2.1 Software

| Software | Description | Download |
|----------|-------------|----------|
| **OpenClaw** | AI Agent platform — install on your PC or server | [Official website](https://openclaw.ai) |
| **DuckyClaw firmware toolchain** | Required to compile and flash DuckyClaw firmware | See [DuckyClaw Quick Start](ducky-quick-start-T5AI) |

### 2.2 Network requirements

- **LAN mode**: DuckyClaw device and the PC running OpenClaw are on the same local network or Wi-Fi
- **Internet mode**: OpenClaw is deployed on a server with a public IP address

### 2.3 DuckyClaw base setup

Complete the DuckyClaw base setup (Wi-Fi, firmware flashing) before following this guide.

:::note
See: [DuckyClaw Quick Start (T5-AI)](ducky-quick-start-T5AI)
:::

---

## 3. OpenClaw configuration file location

The core configuration file is `openclaw.json`. Its default path depends on the operating system:

| OS | Config file path |
|----|-----------------|
| **Linux** | `~/.openclaw/openclaw.json` |
| **macOS** | `~/.openclaw/openclaw.json` |
| **Windows** | `C:\Users\<username>\.openclaw\openclaw.json` |

:::note
`~` refers to the current user's home directory, e.g. `/home/username` (Linux) or `/Users/username` (macOS). On Windows replace `<username>` with your login name.
:::

**Quick-open the config folder:**

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**Terminal:**

```bash
xdg-open ~/.openclaw
```

**File manager:**

Open your file manager, press `Ctrl+L`, type `~/.openclaw`, and press Enter.

:::tip
`.openclaw` is a hidden folder (starts with `.`). If you can't see it, press `Ctrl+H` in the file manager to show hidden files.
:::

</TabItem>
<TabItem value="macos" label="macOS">

**Terminal:**

```bash
open ~/.openclaw
```

**Finder:**

1. Open **Finder**
2. In the menu bar click **Go** → **Go to Folder...** (or press `Cmd+Shift+G`)
3. Type `~/.openclaw` and click **Go**

:::tip
`.openclaw` is a hidden folder. Press `Cmd+Shift+.` in Finder to toggle hidden files.
:::

</TabItem>
<TabItem value="windows" label="Windows">

**PowerShell:**

```powershell
explorer "$env:USERPROFILE\.openclaw"
```

**File Explorer:**

1. Press `Win+R` to open the Run dialog
2. Type `%USERPROFILE%\.openclaw` and click **OK**

**Address bar:**

Open **File Explorer**, click the address bar, type `%USERPROFILE%\.openclaw`, and press Enter.

:::tip
`.openclaw` is a hidden folder. In File Explorer, go to the **View** tab and check **Hidden items**.
:::

</TabItem>
</Tabs>

---

## 4. Modify the OpenClaw Gateway configuration

### 4.1 Back up the config file

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

**File Explorer:**

1. Open the `%USERPROFILE%\.openclaw` folder (see Section 3)
2. Right-click `openclaw.json` → **Copy**
3. Right-click in the same folder → **Paste**
4. Rename the copy to `openclaw.json.backup`

</TabItem>
</Tabs>

### 4.2 Edit the config file

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**Terminal:**

```bash
nano ~/.openclaw/openclaw.json
```

**File manager:**

1. Open the `~/.openclaw` folder (see Section 3)
2. Right-click `openclaw.json` → **Open with Text Editor**

</TabItem>
<TabItem value="macos" label="macOS">

**Terminal:**

```bash
nano ~/.openclaw/openclaw.json
```

**Finder:**

1. Open the `~/.openclaw` folder (see Section 3)
2. Right-click `openclaw.json` → **Open With** → **TextEdit** (or another editor)

</TabItem>
<TabItem value="windows" label="Windows">

**File Explorer:**

1. Open the `%USERPROFILE%\.openclaw` folder (see Section 3)
2. Right-click `openclaw.json` → **Open With** → **Notepad** (or VS Code)

**PowerShell:**

```powershell
notepad "$env:USERPROFILE\.openclaw\openclaw.json"
```

</TabItem>
</Tabs>

### 4.3 Update the Gateway config section

Find the `gateway` field and replace it with the following (leave all other settings unchanged):

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
Keep the `"token"` field's existing value. Do not write `your_token_here` literally — replace it with your actual token (see Section 5.2).
:::

**Field descriptions:**

| Field | Description |
|-------|-------------|
| `"bind": "lan"` | Makes the Gateway listen on the LAN network interface instead of only `127.0.0.1` — **required** for DuckyClaw to connect |
| `dangerouslyAllowHostHeaderOriginFallback: true` | Allows non-browser clients (e.g. IoT devices) to open WebSocket connections |
| `allowInsecureAuth: true` | Allows authentication without HTTPS (LAN scenario) |
| `dangerouslyDisableDeviceAuth: true` | Disables device-level secondary authentication; token-only auth |

### 4.4 Restart the Gateway

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
If the `openclaw` command is not available, fully quit and relaunch the OpenClaw application.
:::

---

## 5. Get the IP address and Token

### 5.1 Get the LAN IP address

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
ip addr show | grep -E "inet " | awk '{print $2}' | cut -d'/' -f1 | grep -v "^127"
```

Or:

```bash
hostname -I
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
ipconfig getifaddr en0        # Ethernet
ipconfig getifaddr en1        # Wi-Fi (some models)
```

Or:

```bash
ifconfig | grep "inet " | grep -v "127.0.0.1"
```

**System Settings:**

1. Click the **Apple menu** → **System Settings** (or **System Preferences**)
2. Open **Network**, click the active connection
3. Find the **IP address** field

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
Get-NetIPAddress | Where-Object {
    $_.AddressFamily -eq "IPv4" -and $_.IPAddress -notlike "127.*"
} | Format-Table InterfaceAlias, IPAddress
```

**Settings:**

1. Right-click the network icon in the taskbar → **Open Network & Internet settings**
2. Click the active connection → **Properties**
3. Scroll down to find the **IPv4 address**

</TabItem>
</Tabs>

:::tip
Use the IP address on the **same LAN segment** as your DuckyClaw device (typically `192.168.x.x` or `10.x.x.x`). A wired connection is more stable than Wi-Fi.
:::

### 5.2 Get the Gateway Token

The Token is stored in `openclaw.json` under `gateway.auth.token`.

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

**View in a text editor:**

1. Open `%USERPROFILE%\.openclaw\openclaw.json` (see Section 3)
2. Search for the `"token"` field — its value is the Token

</TabItem>
</Tabs>

### 5.3 Verify Gateway accessibility

Open a browser on a device on the same network as DuckyClaw and visit:

```
http://<your-LAN-IP>:18789/
```

Any HTTP response (even an error page) means the Gateway is listening on the LAN address. If the connection times out, check your firewall (see Section 7).

---

## 6. Configure DuckyClaw firmware

### 6.1 Create the config file

In the DuckyClaw project root directory, copy and rename the example file:

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

**File Explorer:**

1. Open the `include` folder in the DuckyClaw project
2. Find `tuya_app_config_secrets.h.example`, right-click → **Copy**
3. Right-click in the same folder → **Paste**
4. Rename the copy to `tuya_app_config_secrets.h` (remove the `.example` suffix)

:::note
`tuya_app_config_secrets.h` is listed in `.gitignore` and will not be committed to version control. It is the recommended place to store sensitive configuration.
:::

</TabItem>
</Tabs>

### 6.2 Edit the config file

Open `include/tuya_app_config_secrets.h` and fill in the ACP Gateway macros:

```c
/* openclaw gateway configuration */
#define OPENCLAW_GATEWAY_HOST            "xxx.xxx.xxx.xxx"   /* Replace with OpenClaw host LAN IP */
#define OPENCLAW_GATEWAY_PORT            18789
#define OPENCLAW_GATEWAY_TOKEN           "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  /* Replace with actual Token */
#define DUCKYCLAW_DEVICE_ID              "duckyclaw-001"     /* Device ID, customizable */
```

**Field descriptions:**

| Macro | Description |
|-------|-------------|
| `OPENCLAW_GATEWAY_HOST` | LAN IP of the machine running OpenClaw (from Section 5.1) |
| `OPENCLAW_GATEWAY_PORT` | Fixed at `18789`, no change needed |
| `OPENCLAW_GATEWAY_TOKEN` | Token from Section 5.2 |
| `DUCKYCLAW_DEVICE_ID` | Device name; use a unique identifier (e.g. MAC address) |

### 6.3 Recompile and flash

After saving the config, recompile the firmware and flash it to the DuckyClaw device.

---

## 7. Troubleshooting

### 7.1 DuckyClaw cannot connect

| Error in device log | Likely cause | Fix |
|---------------------|-------------|-----|
| `acp tcp connect failed` | IP unreachable or port blocked | Check IP; check that port 18789 is allowed in the firewall |
| `acp upgrade rejected` | WebSocket handshake rejected | Confirm `dangerouslyAllowHostHeaderOriginFallback: true` is set and Gateway restarted |
| `acp connect res ok=false` | Token mismatch | Verify `openclaw.json` Token matches firmware `OPENCLAW_GATEWAY_TOKEN` exactly |
| `acp connect timeout` | Network issue or Gateway not running | Confirm OpenClaw is running; visit `http://<IP>:18789/` in a browser |
| `acp dns resolve failed` | Hostname cannot be resolved | Use an IP address instead of a hostname |

### 7.2 Verify Gateway is bound to the LAN address

After editing and restarting:

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
netstat -tlnp | grep 18789
# or
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

If `Local Address` shows `0.0.0.0:18789`, the Gateway is successfully bound to all interfaces including the LAN.

### 7.3 Open port 18789 in the firewall

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**ufw:**

```bash
sudo ufw allow 18789/tcp
```

**firewalld:**

```bash
sudo firewall-cmd --add-port=18789/tcp --permanent
sudo firewall-cmd --reload
```

</TabItem>
<TabItem value="macos" label="macOS">

macOS does not block incoming connections by default. If you use a third-party firewall, consult its documentation.

</TabItem>
<TabItem value="windows" label="Windows">

Run PowerShell as Administrator:

```powershell
New-NetFirewallRule -DisplayName "OpenClaw Gateway" -Direction Inbound `
    -Protocol TCP -LocalPort 18789 -Action Allow
```

</TabItem>
</Tabs>

### 7.4 Config changes not taking effect

- Confirm you edited the correct file (see Section 3 for the path)
- Confirm you fully restarted the Gateway (not just refreshed the page): `openclaw gateway restart`
- If still not working, fully quit and relaunch the OpenClaw application
