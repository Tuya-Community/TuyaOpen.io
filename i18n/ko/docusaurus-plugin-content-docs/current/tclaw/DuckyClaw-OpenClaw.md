---
title: TClaw을 OpenClaw에 연결
description: "TClaw Edge-AI 음성 펌웨어는 OpenClaw 음성 대화를 위한 WebSocket ACP 프로토콜을 통해 OpenClaw 게이트웨이에 연결됩니다."
keywords:
  - duckyclaw
  - tclaw
  - openclaw gateway
  - edge ai platform open source
  - acp protocol
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1. 개요
TClaw (이전 DuckyClaw)는 IoT 장치에서 실행되는 AI 음성 조수 펌웨어입니다. **ACP 프로토콜 (Agent 클라이언트 프로토콜, WebSocket 기반)**을 통해 OpenClaw 게이트웨이에 연결하여 AI Agent와 실시간 대화를 가능하게 합니다.

OpenClaw는 Linux, macOS 또는 Windows에 배포 될 수있는 오픈 소스 AI Agent 플랫폼입니다. 내장 게이트웨이 서비스는 포트 `18789`에 기본으로 듣고, TClaw는 로컬 네트워크에 연결(또는 인터넷).

** 연결 아키텍처:**

```
TClaw (IoT device)
    │  WebSocket (ACP protocol)
    ▼
OpenClaw Gateway (PC / server)
    │
    ▼
AI Agent (LLM conversation)
```

---

## 2. 필수품
## 2.1 소프트웨어
|소프트웨어|이름 *|다운로드|
|----------|-------------|----------|
|**OpenClaw **|AI Agent 플랫폼 - PC 또는 서버에 설치|[공식 웹 사이트] (https://openclaw.ai)|
|** TClaw 펌웨어 툴체인 **|컴파일 및 플래시 TClaw 펌웨어 필요|[TClaw 빠른 시작](ducky-quick-start-T5AI)|

## 2.2 네트워크 요구 사항
- **LAN 모드**: TClaw 장치 및 OpenClaw를 실행하는 PC는 동일한 로컬 네트워크 또는 Wi-Fi에 있습니다
- **인터넷 모드**: OpenClaw는 공용 IP 주소를 가진 서버에 배포됩니다.

### 2.3 TClaw 기본 설정
이 가이드를 따르기 전에 TClaw 기본 설정 (Wi-Fi, 펌웨어 번쩍이는)을 완료하십시오.

:::기사
참조 : [TClaw 빠른 시작 (T5-AI)] (ducky-quick-start-T5AI)
:::

---

## 3. OpenClaw 구성 파일 위치
핵심 구성 파일은 `openclaw.json`입니다. 기본 경로는 운영 체제에 따라 다릅니다.

|지원하다|Config 파일 경로|
|----|-----------------|
|**Linux **|`~/.openclaw/openclaw.json`를|
|**macOS **|`~/.openclaw/openclaw.json`를|
|**Windows **|`C:\Users\<username>\.openclaw\openclaw.json`를|

:::기사
`~`는 현재 사용자의 홈 디렉토리, 예를 들어 `/home/username` (Linux) 또는 `/Users/username` (macOS)를 나타냅니다. Windows에서 로그인 이름을 가진 `<username>`를 대체합니다.
:::

** Quick-open 폴더:**

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**전화:**

```bash
xdg-open ~/.openclaw
```

** 파일 관리자:**

파일 관리자를 열고, `Ctrl+L`를 누르고, `~/.openclaw`를 입력하고 Enter 키를 누릅니다.

:::가격
`.openclaw`는 숨겨진 폴더 (KIPTERM1X와 함께 시작). 그것을 볼 수 없다면, 파일 관리자에서 `Ctrl+H`를 눌러 숨겨진 파일을 표시하십시오.
:::

</TabItem>
<TabItem value="macos" label="macOS">

**전화:**

```bash
open ~/.openclaw
```

**파인더:**

1. 오픈 **Finder**
2. 메뉴 바에서 **Go** → ** 폴더로 이동 ...** (또는 `Cmd+Shift+G`를 누릅니다)
3. 유형 `~/.openclaw` 및 클릭 **Go**

:::가격
`.openclaw`는 숨겨진 폴더입니다. 찾기에 `Cmd+Shift+.`를 눌러 toggle 숨겨진 파일.
:::

</TabItem>
<TabItem value="windows" label="Windows">

**PowerShell: **

```powershell
explorer "$env:USERPROFILE\.openclaw"
```

** 파일 탐색기:**

1. `Win+R`를 눌러 실행 대화 상자를 엽니다.
2. `%USERPROFILE%\.openclaw`를 입력하고 **OK**를 클릭하십시오

**주소 바:**

Open **File Explorer**, 주소 표시 줄을 클릭, `%USERPROFILE%\.openclaw` 입력, Enter 키를 누릅니다.

:::가격
`.openclaw`는 숨겨진 폴더입니다. File Explorer에서 **보기** 탭으로 이동하고 ** 숨기기 항목**.
:::

</TabItem>
</Tabs>

---

## 4. OpenClaw 게이트웨이 구성 변경
## 4.1 구성 파일을 백업
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

** 파일 탐색기:**

1. `%USERPROFILE%\.openclaw` 폴더를 엽니다 (서 3)
2. 클릭 `openclaw.json` →**Copy**
3. 같은 폴더에서 마우스 오른쪽 버튼 → **Paste**
4. `openclaw.json.backup`에 사본을 이름을 바꾸십시오

</TabItem>
</Tabs>

## 4.2를 config 파일 편집
<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**전화:**

```bash
nano ~/.openclaw/openclaw.json
```

** 파일 관리자:**

1. `~/.openclaw` 폴더를 엽니다 (서 3)
2. Right-click `openclaw.json` → **텍스트 편집기로 열기 **

</TabItem>
<TabItem value="macos" label="macOS">

**전화:**

```bash
nano ~/.openclaw/openclaw.json
```

**파인더:**

1. `~/.openclaw` 폴더를 엽니다 (서 3)
2. Right-click `openclaw.json` → **** → **TextEdit** (또는 다른 편집기)

</TabItem>
<TabItem value="windows" label="Windows">

** 파일 탐색기:**

1. `%USERPROFILE%\.openclaw` 폴더를 엽니다 (서 3)
2. 우클릭 `openclaw.json` → ** -> ** -> ** (또는 VS 코드)

**PowerShell: **

```powershell
notepad "$env:USERPROFILE\.openclaw\openclaw.json"
```

</TabItem>
</Tabs>

## 4.3 게이트웨이 구성 섹션 업데이트
`gateway` 필드를 찾아 다음으로 교체하십시오 (다른 설정이 변경되지 않음) :

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

:::대여
`"token"` 필드의 기존 값 유지. `your_token_here`를 말 그대로 쓰지 마십시오. 실제 토큰으로 교체하십시오. ( 섹션 5.2).
:::

** 서류:**

|제품정보|이름 *|
|-------|-------------|
|`"bind": "lan"`를|`127.0.0.1` 대신 LAN 네트워크 인터페이스에서 게이트웨이를 듣게 됩니다. ** TClaw에 연결하려면**가 필요합니다.|
|`dangerouslyAllowHostHeaderOriginFallback: true`를|WebSocket 연결을 열려면 non-browser 클라이언트(e.g. IoT 장치)를 허용|
|`allowInsecureAuth: true`를|HTTPS(LAN 시나리오) 없이 인증 가능|
|`dangerouslyDisableDeviceAuth: true`를|장치 수준 이차 입증을 비활성화; 토큰 전용 오|

## 4.4 게이트웨이를 재시작
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

:::기사
`openclaw` 명령이 유효하지 않은 경우, 완전히 종료하고 OpenClaw 응용 프로그램을 다시 시작합니다.
:::

---

## 5. IP 주소 및 토큰 받기
## 1 니다. LAN IP 주소 받기
<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
ip addr show | grep -E "inet " | awk '{print $2}' | cut -d'/' -f1 | grep -v "^127"
```

또는:

```bash
hostname -I
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
ipconfig getifaddr en0        # Ethernet
ipconfig getifaddr en1        # Wi-Fi (some models)
```

또는:

```bash
ifconfig | grep "inet " | grep -v "127.0.0.1"
```

**시스템 설정:**

1. **Apple menu** → ** 시스템 설정** (또는 ** 시스템 설정**)
2. Open **Network**, 활성 연결을 클릭
3. **IP 주소** 필드 찾기

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
Get-NetIPAddress | Where-Object {
    $_.AddressFamily -eq "IPv4" -and $_.IPAddress -notlike "127.*"
} | Format-Table InterfaceAlias, IPAddress
```

**설정:**

1. taskbar에서 네트워크 아이콘을 마우스 오른쪽 단추로 → **Open Network & Internet settings**
2. 활성 연결을 클릭 → ** Properties**
3. **IPv4 주소 찾기 아래로 스크롤 **

</TabItem>
</Tabs>

:::가격
**same LAN 세그먼트 **에 IP 주소를 사용하여 TClaw 장치 (일반적으로 `192.168.x.x` 또는 `10.x.x.x`). 유선 연결은 Wi-Fi 보다는 안정되어 있습니다.
:::

### 5.2 게이트웨이 토큰 받기
토큰은 `gateway.auth.token`의 `openclaw.json`에 저장됩니다.

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

**문서 편집기에서보기:**

1. `%USERPROFILE%\.openclaw\openclaw.json`를 여십시오 (제 3)를 보십시오
2. `"token"` 필드 검색 — 그 값은 토큰입니다.

</TabItem>
</Tabs>

### 5.3 게이트웨이 접근성 검증
TClaw와 같은 네트워크의 장치에 브라우저를 열고 방문:

```
http://<your-LAN-IP>:18789/
```

모든 HTTP 응답 (실버 페이지 일)는 게이트웨이가 LAN 주소에 들리는 것을 의미합니다. 연결이 꺼지면 방화벽을 확인하십시오 (서 7).

---

## 6. TClaw 펌웨어 구성
### 6.1 config 파일 생성
DuckyClaw 프로젝트 루트 디렉토리에서 예제 파일을 복사하고 이름을 변경하십시오.

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

** 파일 탐색기:**

1. DuckyClaw 프로젝트에서 `include` 폴더를 엽니다.
2. `tuya_app_config_secrets.h.example`, 마우스 오른쪽 클릭 →**Copy** 찾기
3. 같은 폴더에서 마우스 오른쪽 버튼 → **Paste**
4. `tuya_app_config_secrets.h`에 사본을 이름을 바꾸십시오 (KEPTERM3X suffix를 remove)

:::기사
`tuya_app_config_secrets.h`는 `.gitignore`에 목록으로 만들고 버전 통제에 투입되지 않을 것입니다. 민감한 구성을 저장하는 것이 좋습니다.
:::

</TabItem>
</Tabs>

## # # 6.2 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # config 파일 편집
`include/tuya_app_config_secrets.h`를 열고 ACP 게이트웨이 매크로를 채우십시오.

```c
/* openclaw gateway configuration */
#define OPENCLAW_GATEWAY_HOST            "xxx.xxx.xxx.xxx"   /* Replace with OpenClaw host LAN IP */
#define OPENCLAW_GATEWAY_PORT            18789
#define OPENCLAW_GATEWAY_TOKEN           "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  /* Replace with actual Token */
#define DUCKYCLAW_DEVICE_ID              "duckyclaw-001"     /* Device ID, customizable */
```

** 서류:**

|제품정보|이름 *|
|-------|-------------|
|`OPENCLAW_GATEWAY_HOST`를|OpenClaw를 실행하는 기계의 LAN IP (섹션 5.1에서)|
|`OPENCLAW_GATEWAY_PORT`를|`18789`에 조정, 필요 변화 없음|
|`OPENCLAW_GATEWAY_TOKEN`를|섹션에서 토큰 5.2|
|`DUCKYCLAW_DEVICE_ID`를|장치 이름; 고유 식별자를 사용 (예: MAC 주소)|

### 6.3 Recompile와 섬광
구성을 저장 한 후, 펌웨어를 제거하고 TClaw 장치에 깜박입니다.

---

## 7. 문제 해결
### 7.1 TClaw는 연결할 수 없습니다
|장치 로그에 오류|자주 묻는 질문|수정하기|
|---------------------|-------------|-----|
|`acp tcp connect failed`를|차단되는 IP 또는 항구|IP를 확인; 포트 18789 방화벽에서 허용|
|`acp upgrade rejected`를|WebSocket Handhake 거부|`dangerouslyAllowHostHeaderOriginFallback: true`가 설정되고 게이트웨이가 재시작|
|`acp connect res ok=false`를|토큰 mismatch|`openclaw.json`를 검증 토큰 일치 펌웨어 `OPENCLAW_GATEWAY_TOKEN` 정확히|
|`acp connect timeout`를|네트워크 문제 또는 Gateway가 실행되지 않음|OpenClaw를 실행 확인; 브라우저에서 `http://<IP>:18789/`를 방문|
|`acp dns resolve failed`를|호스트명은 해결할 수 없습니다.|호스트 이름 대신 IP 주소를 사용합니다.|

### 7.2 Verify 게이트웨이는 LAN 주소에 있습니다.
편집 및 재시작 후:

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

`Local Address`가 `0.0.0.0:18789`를 보여주면 Gateway는 LAN을 포함한 모든 인터페이스에 성공적으로 연결됩니다.

### 7.3 방화벽에서 포트 18789 열기
<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

** ufw: **

```bash
sudo ufw allow 18789/tcp
```

**방화:**

```bash
sudo firewall-cmd --add-port=18789/tcp --permanent
sudo firewall-cmd --reload
```

</TabItem>
<TabItem value="macos" label="macOS">

macOS는 기본적으로 들어오는 연결을 차단하지 않습니다. 제3자 방화벽을 사용하는 경우 문서에 문의하십시오.

</TabItem>
<TabItem value="windows" label="Windows">

PowerShell을 Administrator로 실행하십시오:

```powershell
New-NetFirewallRule -DisplayName "OpenClaw Gateway" -Direction Inbound `
    -Protocol TCP -LocalPort 18789 -Action Allow
```

</TabItem>
</Tabs>

### 7.4 Config는 효력을 가지고 가지 않는 변화합니다
- 올바른 파일 편집 확인 (경로를 위해 섹션 3 참조)
- 게이트웨이를 완전히 재시작 (페이지를 새로 고침하지 않음): `openclaw gateway restart`
- 아직 작동하지 않는 경우, 완전히 종료하고 OpenClaw 응용 프로그램을 다시 시작
