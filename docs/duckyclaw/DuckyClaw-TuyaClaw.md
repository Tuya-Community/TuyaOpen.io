---
title: Connect DuckyClaw to TuyaClaw
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connect DuckyClaw to TuyaClaw

## 1. Overview

DuckyClaw is an AI voice assistant firmware that runs on IoT devices. It connects to the TuyaClaw Gateway via the **ACP protocol (Agent Client Protocol, WebSocket-based)** to enable real-time conversation with an AI Agent.

[TuyaClaw](https://claw.tuya.ai/) is Tuya's AI Agent desktop client, available for Windows, macOS, and Linux. It includes the OpenClaw core and exposes a Gateway service (default port `18789`) that DuckyClaw connects to.

**Connection architecture:**

```
DuckyClaw (IoT device)
    │  WebSocket (ACP protocol)
    ▼
TuyaClaw Gateway (PC)
    │  Built-in OpenClaw core
    ▼
AI Agent (LLM conversation)
```

**TuyaClaw architecture:**

| Layer | Description |
|-------|-------------|
| Electron shell | `TuyaClaw` application; Chromium renderer hosts the UI |
| OpenClaw core | Located at `resources/openclaw/` in the install directory; identical to open-source OpenClaw |
| Gateway service | Built-in ACP WebSocket Server, default port `18789` |
| Config directory | `~/.tuyaclaw/` (Linux / macOS) or `C:\Users\<username>\.tuyaclaw\` (Windows) |

---

## 2. Prerequisites

### 2.1 Software

| Software | Description | Download |
|----------|-------------|----------|
| **TuyaClaw** | AI Agent platform (Windows / macOS / Linux) — must be installed and running | [Official website](https://claw.tuya.ai/) |
| **DuckyClaw firmware toolchain** | Required to compile and flash DuckyClaw firmware | See [DuckyClaw Quick Start](ducky-quick-start-T5AI) |

### 2.2 Network requirements

- DuckyClaw device and the PC running TuyaClaw must be on the **same LAN** or Wi-Fi network
- For internet connectivity, expose the TuyaClaw Gateway via port forwarding or similar

### 2.3 DuckyClaw base setup

Complete the DuckyClaw base setup (Wi-Fi, firmware flashing) before following this guide.

:::note
See: [DuckyClaw Quick Start (T5-AI)](ducky-quick-start-T5AI)
:::

---

## 3. TuyaClaw configuration file location

The core configuration file is `openclaw.json`. Its default path depends on the operating system:

| OS | Config file path |
|----|-----------------|
| **Linux** | `~/.tuyaclaw/openclaw.json` |
| **macOS** | `~/.tuyaclaw/openclaw.json` |
| **Windows** | `C:\Users\<username>\.tuyaclaw\openclaw.json` |

:::note
`~` refers to the current user's home directory, e.g. `/home/username` (Linux) or `/Users/username` (macOS). On Windows replace `<username>` with your login name.
:::

TuyaClaw also has an Electron settings file that stores the Token for the UI:

| OS | Electron settings path |
|----|------------------------|
| **Linux** | `~/.config/tuyaclaw/settings.json` |
| **macOS** | `~/Library/Application Support/tuyaclaw/settings.json` |
| **Windows** | `C:\Users\<username>\AppData\Roaming\tuyaclaw\settings.json` |

**Quick-open the config folder:**

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**Terminal:**

```bash
xdg-open ~/.tuyaclaw
```

**File manager:**

Open your file manager, press `Ctrl+L`, type `~/.tuyaclaw`, and press Enter.

:::tip
`.tuyaclaw` is a hidden folder (starts with `.`). Press `Ctrl+H` to show hidden files.
:::

</TabItem>
<TabItem value="macos" label="macOS">

**Terminal:**

```bash
open ~/.tuyaclaw
```

**Finder:**

1. Open **Finder**
2. Click **Go** → **Go to Folder...** (or press `Cmd+Shift+G`)
3. Type `~/.tuyaclaw` and click **Go**

:::tip
`.tuyaclaw` is a hidden folder. Press `Cmd+Shift+.` in Finder to toggle hidden files.
:::

</TabItem>
<TabItem value="windows" label="Windows">

**PowerShell:**

```powershell
explorer "$env:USERPROFILE\.tuyaclaw"
```

**File Explorer:**

1. Press `Win+R` to open the Run dialog
2. Type `%USERPROFILE%\.tuyaclaw` and click **OK**

**Address bar:**

Open **File Explorer**, click the address bar, type `%USERPROFILE%\.tuyaclaw`, and press Enter.

:::tip
`.tuyaclaw` is a hidden folder. In File Explorer, go to the **View** tab and check **Hidden items**.
:::

</TabItem>
</Tabs>

---

## 4. Modify the TuyaClaw Gateway configuration

### 4.1 Back up the config file

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

**File Explorer:**

1. Open the `%USERPROFILE%\.tuyaclaw` folder (see Section 3)
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
nano ~/.tuyaclaw/openclaw.json
```

**File manager:**

1. Open the `~/.tuyaclaw` folder (see Section 3)
2. Right-click `openclaw.json` → **Open with Text Editor**

</TabItem>
<TabItem value="macos" label="macOS">

**Terminal:**

```bash
nano ~/.tuyaclaw/openclaw.json
```

**Finder:**

1. Open the `~/.tuyaclaw` folder (see Section 3)
2. Right-click `openclaw.json` → **Open With** → **TextEdit** (or another editor)

</TabItem>
<TabItem value="windows" label="Windows">

**File Explorer:**

1. Open the `%USERPROFILE%\.tuyaclaw` folder (see Section 3)
2. Right-click `openclaw.json` → **Open With** → **Notepad** (or VS Code)

**PowerShell:**

```powershell
notepad "$env:USERPROFILE\.tuyaclaw\openclaw.json"
```

</TabItem>
</Tabs>

### 4.3 Update the Gateway config section

Find the `"gateway"` field and replace it with the following (leave all other settings unchanged):

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
Keep the `"token"` field's existing value. Do not write `your_token_here` literally — replace it with your actual token (see Section 5.2).
:::

**Field descriptions:**

| Field | Description |
|-------|-------------|
| `"bind": "lan"` | Makes the Gateway listen on the LAN network interface instead of only `127.0.0.1` — **required** for DuckyClaw to connect |
| `dangerouslyAllowHostHeaderOriginFallback: true` | Allows non-UI clients (e.g. IoT devices) to open WebSocket connections |
| `allowInsecureAuth: true` | Allows authentication without HTTPS (LAN scenario) |
| `dangerouslyDisableDeviceAuth: true` | Disables device-level secondary authentication; token-only auth |

### 4.4 Restart the TuyaClaw Gateway

After saving the config, restart the Gateway for changes to take effect.

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**Built-in CLI:**

```bash
~/.config/tuyaclaw/resources/cli/openclaw gateway restart
```

**Or:** Right-click the TuyaClaw tray icon → **Quit**, then relaunch TuyaClaw.

</TabItem>
<TabItem value="macos" label="macOS">

**Built-in CLI:**

```bash
~/Applications/TuyaClaw.app/Contents/Resources/cli/openclaw gateway restart
```

**Or:** Right-click the TuyaClaw menu bar icon → **Quit**, then relaunch TuyaClaw.

</TabItem>
<TabItem value="windows" label="Windows">

**Option 1 — TuyaClaw UI:** Find the Gateway management section in the TuyaClaw interface and click restart.

**Option 2 — Tray icon:** Right-click the TuyaClaw tray icon → **Quit**, then relaunch TuyaClaw.

**Option 3 — Built-in CLI (PowerShell):**

```powershell
& "$env:LOCALAPPDATA\Programs\TuyaClaw\resources\cli\openclaw.cmd" gateway restart
```

</TabItem>
</Tabs>

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

1. Click the **Apple menu** → **System Settings**
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
Use the IP address on the **same LAN segment** as your DuckyClaw device (typically `192.168.x.x` or `10.x.x.x`). A wired Ethernet connection is more stable than Wi-Fi.
:::

### 5.2 Get the Gateway Token

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
grep '"token"' ~/.tuyaclaw/openclaw.json
```

Or read the exact value:

```bash
python3 -c "import json; d=json.load(open('$HOME/.tuyaclaw/openclaw.json')); print(d['gateway']['auth']['token'])"
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
grep '"token"' ~/.tuyaclaw/openclaw.json
```

Or read the exact value:

```bash
python3 -c "import json; d=json.load(open('$HOME/.tuyaclaw/openclaw.json')); print(d['gateway']['auth']['token'])"
```

</TabItem>
<TabItem value="windows" label="Windows">

**From OpenClaw core config:**

```powershell
(Get-Content "$env:USERPROFILE\.tuyaclaw\openclaw.json" | ConvertFrom-Json).gateway.auth.token
```

**From Electron settings:**

```powershell
(Get-Content "$env:APPDATA\tuyaclaw\settings.json" | ConvertFrom-Json).gatewayToken
```

**View in a text editor:**

1. Open `%USERPROFILE%\.tuyaclaw\openclaw.json` (see Section 3)
2. Search for `"token"` — its value is the Token

</TabItem>
</Tabs>

### 5.3 Verify Gateway accessibility

Open a browser on a device on the same network as DuckyClaw and visit:

```
http://<your-LAN-IP>:18789/
```

Any HTTP response (even an error page) means the Gateway is listening on the LAN address. If the connection times out, check your firewall (see Section 7.3).

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

</TabItem>
</Tabs>

:::note
`tuya_app_config_secrets.h` is listed in `.gitignore` and will not be committed to version control. It is the recommended place to store sensitive configuration.
:::

### 6.2 Edit the config file

Open `include/tuya_app_config_secrets.h` and fill in the ACP Gateway macros:

```c
/* openclaw / tuyaclaw gateway configuration */
#define OPENCLAW_GATEWAY_HOST            "xxx.xxx.xxx.xxx"   /* Replace with TuyaClaw host LAN IP */
#define OPENCLAW_GATEWAY_PORT            18789
#define OPENCLAW_GATEWAY_TOKEN           "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  /* Replace with Token from Section 5.2 */
#define DUCKYCLAW_DEVICE_ID              "duckyclaw-001"     /* Device ID, customizable */
```

**Field descriptions:**

| Macro | Description |
|-------|-------------|
| `OPENCLAW_GATEWAY_HOST` | LAN IP of the machine running TuyaClaw (from Section 5.1) |
| `OPENCLAW_GATEWAY_PORT` | Fixed at `18789`, no change needed |
| `OPENCLAW_GATEWAY_TOKEN` | Token from Section 5.2 |
| `DUCKYCLAW_DEVICE_ID` | Device name; use a unique identifier (e.g. MAC address) to distinguish multiple devices in TuyaClaw |

### 6.3 Recompile and flash

After saving the config, recompile the firmware and flash it to the DuckyClaw device.

---

## 7. Troubleshooting

### 7.1 DuckyClaw cannot connect

| Error in device log | Likely cause | Fix |
|---------------------|-------------|-----|
| `acp tcp connect failed` | IP unreachable or port blocked | Check IP; verify port 18789 is allowed in the firewall |
| `acp upgrade rejected` | WebSocket handshake rejected by Gateway | Confirm `dangerouslyAllowHostHeaderOriginFallback: true` is set and Gateway restarted |
| `acp connect res ok=false` | Token mismatch | Verify `openclaw.json` Token matches firmware `OPENCLAW_GATEWAY_TOKEN` exactly |
| `acp connect timeout` | Network issue or Gateway not running | Confirm TuyaClaw is running; visit `http://<IP>:18789/` in a browser |
| `acp dns resolve failed` | Hostname cannot be resolved | Use an IP address instead of a hostname |

### 7.2 Verify Gateway is bound to the LAN address

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

If it shows `127.0.0.1:18789`, `bind: lan` has not taken effect — re-check the `openclaw.json` edit and restart TuyaClaw.

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
New-NetFirewallRule -DisplayName "TuyaClaw Gateway" -Direction Inbound `
    -Protocol TCP -LocalPort 18789 -Action Allow
```

Verify the rule was added:

```powershell
Get-NetFirewallRule -DisplayName "TuyaClaw Gateway"
```

</TabItem>
</Tabs>

### 7.4 Config changes not taking effect

- Confirm you edited the correct `openclaw.json` file (see Section 3 for the path)
- Confirm the JSON is valid — use an online JSON validator if needed
- Confirm you fully restarted the Gateway (quit the TuyaClaw process and relaunch, do not just refresh the page)

### 7.5 Differences from connecting to OpenClaw directly

| Item | OpenClaw | TuyaClaw |
|------|----------|----------|
| Supported OS | Linux / macOS / Windows | Linux / macOS / Windows |
| Core config file | `~/.openclaw/openclaw.json` | `~/.tuyaclaw/openclaw.json` |
| Default Gateway binding | `local` (change to `lan`) | `local` (change to `lan`) |
| Port | `18789` | `18789` (same) |
| Get Token | `grep '"token"' ~/.openclaw/openclaw.json` | `grep '"token"' ~/.tuyaclaw/openclaw.json` |
| Restart Gateway | `openclaw gateway restart` | TuyaClaw UI or built-in CLI |
| DuckyClaw firmware config | Same macros | Same macros |
