---
title: TClaw을 TuyaClaw에 연결
description: "TClaw Edge-AI 음성 펌웨어는 TuyaClaw, Tuya's AI Agent 데스크탑 클라이언트와 대화를 위한 WebSocket ACP 프로토콜을 통해 연결합니다."
keywords:
  - duckyclaw
  - tclaw
  - tuyaclaw
  - physical ai agent
  - acp protocol
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1. 개요
TClaw (이전 DuckyClaw)는 IoT 장치에서 실행되는 AI 음성 조수 펌웨어입니다. **ACP 프로토콜 (Agent 클라이언트 프로토콜, WebSocket 기반)**을 통해 TuyaClaw 게이트웨이에 연결하여 AI Agent와 실시간 대화를 가능하게 합니다.

[TuyaClaw](https://claw.tuya.ai/)는 AI Agent 데스크톱 클라이언트이며, Windows, macOS 및 Linux에서 사용할 수 있습니다. OpenClaw 코어를 포함하고 TClaw가 연결되는 Gateway Service (기본 포트 `18789`)를 노출합니다.

** 연결 아키텍처:**

```
TClaw (IoT device)
    │  WebSocket (ACP protocol)
    ▼
TuyaClaw Gateway (PC)
    │  Built-in OpenClaw core
    ▼
AI Agent (LLM conversation)
```

**TuyaClaw 아키텍처: **

|제품정보|이름 *|
|-------|-------------|
|Electron 포탄|`TuyaClaw` 신청; 크롬 연출자는 UI를 호스트합니다|
|OpenClaw 핵심|설치 디렉토리에 `resources/openclaw/`에 위치; 오픈 소스 OpenClaw와 동일|
|Gateway 서비스|내장 ACP WebSocket 서버, 기본 포트 `18789`|
|Config 디렉토리|`~/.tuyaclaw/` (Linux / macOS) 또는 `C:\Users\<username>\.tuyaclaw\` (Windows)|

---

## 2. 필수품
## 2.1 소프트웨어
|소프트웨어|이름 *|다운로드|
|----------|-------------|----------|
|**TuyaClaw **|AI Agent 플랫폼 (Windows / macOS / Linux)|[공식 웹 사이트] (https://claw.tuya.ai/)|
|** TClaw 펌웨어 툴체인 **|컴파일 및 플래시 TClaw 펌웨어 필요|[TClaw 빠른 시작](ducky-quick-start-T5AI)|

## 2.2 네트워크 요구 사항
- TClaw 장치 및 TuyaClaw를 실행하는 PC는 ** 동일한 LAN ** 또는 Wi-Fi 네트워크에 있어야 합니다
- 인터넷 연결을 위해, 항구 운송 또는 유사한을 통해 TuyaClaw 게이트웨이를 노출

### 2.3 TClaw 기본 설정
이 가이드를 따르기 전에 TClaw 기본 설정 (Wi-Fi, 펌웨어 번쩍이는)을 완료하십시오.

:::기사
참조 : [TClaw 빠른 시작 (T5-AI)] (ducky-quick-start-T5AI)
:::

---

## 3. TuyaClaw 구성 파일 위치
핵심 구성 파일은 `openclaw.json`입니다. 기본 경로는 운영 체제에 따라 다릅니다.

|지원하다|Config 파일 경로|
|----|-----------------|
|**Linux **|`~/.tuyaclaw/openclaw.json`를|
|**macOS **|`~/.tuyaclaw/openclaw.json`를|
|**Windows **|`C:\Users\<username>\.tuyaclaw\openclaw.json`를|

:::기사
`~`는 현재 사용자의 홈 디렉토리, 예를 들어 `/home/username` (Linux) 또는 `/Users/username` (macOS)를 나타냅니다. Windows에서 로그인 이름을 가진 `<username>`를 대체합니다.
:::

TuyaClaw는 또한 UI의 토큰을 저장하는 전자 설정 파일이 있습니다.

|지원하다|Electron 설정 경로|
|----|------------------------|
|**Linux **|`~/.config/tuyaclaw/settings.json`를|
|**macOS **|`~/Library/Application Support/tuyaclaw/settings.json`를|
|**Windows **|`C:\Users\<username>\AppData\Roaming\tuyaclaw\settings.json`를|

** Quick-open 폴더:**

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

**전화:**

```bash
xdg-open ~/.tuyaclaw
```

** 파일 관리자:**

파일 관리자를 열고, `Ctrl+L`를 누르고, `~/.tuyaclaw`를 입력하고 Enter 키를 누릅니다.

:::가격
`.tuyaclaw`는 숨겨진 폴더 (KIPTERM1X와 함께 시작). `Ctrl+H`를 눌러 숨겨진 파일을 표시하십시오.
:::

</TabItem>
<TabItem value="macos" label="macOS">

**전화:**

```bash
open ~/.tuyaclaw
```

**파인더:**

1. 오픈 **Finder**
2. **Go** → ** 폴더로 이동 ...** (또는 `Cmd+Shift+G`를 누릅니다)
3. 유형 `~/.tuyaclaw` 및 클릭 **Go**

:::가격
`.tuyaclaw`는 숨겨진 폴더입니다. 찾기에 `Cmd+Shift+.`를 눌러 toggle 숨겨진 파일.
:::

</TabItem>
<TabItem value="windows" label="Windows">

**PowerShell: **

```powershell
explorer "$env:USERPROFILE\.tuyaclaw"
```

** 파일 탐색기:**

1. `Win+R`를 눌러 실행 대화 상자를 엽니다.
2. `%USERPROFILE%\.tuyaclaw`를 입력하고 **OK**를 클릭하십시오

**주소 바:**

Open **File Explorer**, 주소 표시 줄을 클릭, `%USERPROFILE%\.tuyaclaw` 입력, Enter 키를 누릅니다.

:::가격
`.tuyaclaw`는 숨겨진 폴더입니다. File Explorer에서 **보기** 탭으로 이동하고 ** 숨기기 항목**.
:::

</TabItem>
</Tabs>

---

## 4. TuyaClaw 게이트웨이 구성 변경
## 4.1 구성 파일을 백업
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

** 파일 탐색기:**

1. `%USERPROFILE%\.tuyaclaw` 폴더를 엽니다 (서 3)
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
nano ~/.tuyaclaw/openclaw.json
```

** 파일 관리자:**

1. `~/.tuyaclaw` 폴더를 엽니다 (서 3)
2. Right-click `openclaw.json` → **텍스트 편집기로 열기 **

</TabItem>
<TabItem value="macos" label="macOS">

**전화:**

```bash
nano ~/.tuyaclaw/openclaw.json
```

**파인더:**

1. `~/.tuyaclaw` 폴더를 엽니다 (서 3)
2. Right-click `openclaw.json` → **** → **TextEdit** (또는 다른 편집기)

</TabItem>
<TabItem value="windows" label="Windows">

** 파일 탐색기:**

1. `%USERPROFILE%\.tuyaclaw` 폴더를 엽니다 (서 3)
2. 우클릭 `openclaw.json` → ** -> ** -> ** (또는 VS 코드)

**PowerShell: **

```powershell
notepad "$env:USERPROFILE\.tuyaclaw\openclaw.json"
```

</TabItem>
</Tabs>

## 4.3 게이트웨이 구성 섹션 업데이트
`"gateway"` 필드를 찾아 다음으로 교체하십시오 (다른 설정이 변경되지 않음) :

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

:::대여
`"token"` 필드의 기존 값 유지. `your_token_here`를 말 그대로 쓰지 마십시오. 실제 토큰으로 교체하십시오. ( 섹션 5.2).
:::

** 서류:**

|제품정보|이름 *|
|-------|-------------|
|`"bind": "lan"`를|`127.0.0.1` 대신 LAN 네트워크 인터페이스에서 게이트웨이를 듣게 됩니다. ** TClaw에 연결하려면**가 필요합니다.|
|`dangerouslyAllowHostHeaderOriginFallback: true`를|WebSocket 연결을 열려면 non-UI 클라이언트(예: IoT 장치)를 허용|
|`allowInsecureAuth: true`를|HTTPS(LAN 시나리오) 없이 인증 가능|
|`dangerouslyDisableDeviceAuth: true`를|장치 수준 이차 입증을 비활성화; 토큰 전용 오|

## 4.4 TuyaClaw 게이트웨이 재시작
config를 저장한 후, 변경 사항에 대한 게이트웨이를 다시 시작합니다.

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

** CLI에서: **

```bash
~/.config/tuyaclaw/resources/cli/openclaw gateway restart
```

** 또는:** TuyaClaw 트레이 아이콘 → **Quit**를 마우스 오른쪽 버튼으로 클릭한 다음 TuyaClaw를 다시 시작하세요.

</TabItem>
<TabItem value="macos" label="macOS">

** CLI에서: **

```bash
~/Applications/TuyaClaw.app/Contents/Resources/cli/openclaw gateway restart
```

** 또는:** TuyaClaw 메뉴 바 아이콘 → **Quit**를 마우스 오른쪽 버튼으로 클릭한 다음 TuyaClaw를 다시 시작하세요.

</TabItem>
<TabItem value="windows" label="Windows">

** 옵션 1 - TuyaClaw UI : ** TuyaClaw 인터페이스의 게이트웨이 관리 섹션을 찾아 재시작을 클릭합니다.

** 옵션 2 - 트레이 아이콘 : ** TuyaClaw 트레이 아이콘 → **Quit**를 마우스 오른쪽 버튼으로 클릭한 다음 TuyaClaw를 다시 시작하세요.

** 옵션 3 - 내장 CLI (PowerShell) : **

```powershell
& "$env:LOCALAPPDATA\Programs\TuyaClaw\resources\cli\openclaw.cmd" gateway restart
```

</TabItem>
</Tabs>

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

1. **Apple menu** → ** 시스템 설정**
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
**same LAN 세그먼트 **에 IP 주소를 사용하여 TClaw 장치 (일반적으로 `192.168.x.x` 또는 `10.x.x.x`). 유선 이더네트 연결은 Wi-Fi 보다는 안정되어 있습니다.
:::

### 5.2 게이트웨이 토큰 받기
<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
grep '"token"' ~/.tuyaclaw/openclaw.json
```

또는 정확한 값을 읽으십시오:

```bash
python3 -c "import json; d=json.load(open('$HOME/.tuyaclaw/openclaw.json')); print(d['gateway']['auth']['token'])"
```

</TabItem>
<TabItem value="macos" label="macOS">

```bash
grep '"token"' ~/.tuyaclaw/openclaw.json
```

또는 정확한 값을 읽으십시오:

```bash
python3 -c "import json; d=json.load(open('$HOME/.tuyaclaw/openclaw.json')); print(d['gateway']['auth']['token'])"
```

</TabItem>
<TabItem value="windows" label="Windows">

** OpenClaw 코어 구성에서: **

```powershell
(Get-Content "$env:USERPROFILE\.tuyaclaw\openclaw.json" | ConvertFrom-Json).gateway.auth.token
```

**전자 설정에서:**

```powershell
(Get-Content "$env:APPDATA\tuyaclaw\settings.json" | ConvertFrom-Json).gatewayToken
```

**문서 편집기에서보기:**

1. `%USERPROFILE%\.tuyaclaw\openclaw.json`를 여십시오 (제 3)를 보십시오
2. `"token"` 검색 — 그 값은 토큰입니다.

</TabItem>
</Tabs>

### 5.3 게이트웨이 접근성 검증
TClaw와 같은 네트워크의 장치에 브라우저를 열고 방문:

```
http://<your-LAN-IP>:18789/
```

모든 HTTP 응답 (실버 페이지 일)는 게이트웨이가 LAN 주소에 들리는 것을 의미합니다. 연결이 꺼지면 방화벽을 확인하십시오 (제 7 조 참조).

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

</TabItem>
</Tabs>

:::기사
`tuya_app_config_secrets.h`는 `.gitignore`에 목록으로 만들고 버전 통제에 투입되지 않을 것입니다. 민감한 구성을 저장하는 것이 좋습니다.
:::

## # # 6.2 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # config 파일 편집
`include/tuya_app_config_secrets.h`를 열고 ACP 게이트웨이 매크로를 채우십시오.

```c
/* openclaw / tuyaclaw gateway configuration */
#define OPENCLAW_GATEWAY_HOST            "xxx.xxx.xxx.xxx"   /* Replace with TuyaClaw host LAN IP */
#define OPENCLAW_GATEWAY_PORT            18789
#define OPENCLAW_GATEWAY_TOKEN           "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  /* Replace with Token from Section 5.2 */
#define DUCKYCLAW_DEVICE_ID              "duckyclaw-001"     /* Device ID, customizable */
```

** 서류:**

|제품정보|이름 *|
|-------|-------------|
|`OPENCLAW_GATEWAY_HOST`를|TuyaClaw를 실행하는 기계의 LAN IP (섹션 5.1에서)|
|`OPENCLAW_GATEWAY_PORT`를|`18789`에 조정, 필요 변화 없음|
|`OPENCLAW_GATEWAY_TOKEN`를|섹션에서 토큰 5.2|
|`DUCKYCLAW_DEVICE_ID`를|장치 이름; TuyaClaw에 있는 다수 장치를 구별하는 유일한 식별자 (예를들면 MAC 주소)를 사용하십시오|

### 6.3 Recompile와 섬광
구성을 저장 한 후, 펌웨어를 제거하고 TClaw 장치에 깜박입니다.

---

## 7. 문제 해결
### 7.1 TClaw는 연결할 수 없습니다
|장치 로그에 오류|자주 묻는 질문|수정하기|
|---------------------|-------------|-----|
|`acp tcp connect failed`를|차단되는 IP 또는 항구|IP 확인; 포트 18789 방화벽에서 허용|
|`acp upgrade rejected`를|WebSocket Handhake는 Gateway에 의해 거부|`dangerouslyAllowHostHeaderOriginFallback: true`가 설정되고 게이트웨이가 재시작|
|`acp connect res ok=false`를|토큰 mismatch|`openclaw.json`를 검증 토큰 일치 펌웨어 `OPENCLAW_GATEWAY_TOKEN` 정확히|
|`acp connect timeout`를|네트워크 문제 또는 Gateway가 실행되지 않음|TuyaClaw를 실행 확인; 브라우저에서 `http://<IP>:18789/`를 방문|
|`acp dns resolve failed`를|호스트명은 해결할 수 없습니다.|호스트 이름 대신 IP 주소를 사용합니다.|

### 7.2 Verify 게이트웨이는 LAN 주소에 있습니다.
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

`127.0.0.1:18789`를 보여주는 경우, `bind: lan`는 영향을받지 않았습니다 — `openclaw.json` 편집 및 재시작 TuyaClaw.

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
New-NetFirewallRule -DisplayName "TuyaClaw Gateway" -Direction Inbound `
    -Protocol TCP -LocalPort 18789 -Action Allow
```

규칙이 추가되었습니다 :

```powershell
Get-NetFirewallRule -DisplayName "TuyaClaw Gateway"
```

</TabItem>
</Tabs>

### 7.4 Config는 효력을 가지고 가지 않는 변화합니다
- 올바른 `openclaw.json` 파일 편집 확인 (경로를 위해 섹션 3 참조)
- JSON는 유효하다 - 필요한 경우 온라인 JSON 검증기를 사용하십시오
- 게이트웨이를 완전히 재시작하십시오 (KipTERM1X 과정과 재시작이 필요하면 페이지를 새로 고침하지 마십시오)

## 7.5 OpenClaw에 연결의 차이
|제품 정보|OpenClaw를|TuyaClaw를|
|------|----------|----------|
|지원되는 OS|Linux / macOS / Windows|Linux / macOS / Windows|
|Core config 파일|`~/.openclaw/openclaw.json`를|`~/.tuyaclaw/openclaw.json`를|
|기본 Gateway 바인딩|`local` (케터M1X로 변경)|`local` (케터M1X로 변경)|
|항구 항구| `18789` |`18789` (사임)|
|토큰 받기|`grep '"token"' ~/.openclaw/openclaw.json`를|`grep '"token"' ~/.tuyaclaw/openclaw.json`를|
|휴식 게이트웨이|`openclaw gateway restart`를|TuyaClaw UI 또는 내장 CLI|
|TClaw 펌웨어 구성|같은 매크로|같은 매크로|
