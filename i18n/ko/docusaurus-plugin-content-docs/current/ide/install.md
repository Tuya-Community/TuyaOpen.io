---
title: "TuyaOpen IDE 설치"
description: "Git을 설치한 다음 VS Code 또는 Cursor에 TuyaOpen IDE 확장을 추가하고 활성화 여부를 확인합니다. AI 코딩 Agent 또는 공식 .vsix를 사용할 수 있습니다."
sidebar_label: "02 TuyaOpen IDE 설치"
sidebar_position: 2
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - 임베디드 개발
---

import TuyaOpenIdeAgentInstallPrompt from '@site/src/components/TuyaOpenIdeAgentInstallPrompt'

## Git 설치 {/* #install-git */}
TuyaOpen IDE는 **Git**으로 TuyaOpen SDK를 복제하고 Vibe Coding 스킬을 프로젝트에 설치합니다. 첫 프로젝트를 만들기 전에 Git을 한 번 설치하세요.

| OS | 설치 방법 |
| --- | --- |
| **Windows** | [git-scm.com](https://git-scm.com/download/win)에서 설치 프로그램을 다운로드하여 실행합니다. |
| **macOS** | `brew install git`을 실행하거나 `git`을 실행하여 Xcode Command Line Tools 설치 안내를 따릅니다. |
| **Linux** | 패키지 관리자로 설치합니다. Debian/Ubuntu에서는 `sudo apt install git`을 사용할 수 있습니다. |

```bash
git --version
```

## 설치 전 준비 {/* #before-install */}
TuyaOpen IDE는 **VS Code** 또는 **Cursor**용 확장입니다. 먼저 호스트 편집기 중 하나를 설치하세요. 같은 확장 패키지를 두 편집기에서 사용할 수 있습니다.

| 호스트 편집기 | 다운로드 | 참고 |
| --- | --- | --- |
| **VS Code** | https://code.visualstudio.com | 가장 넓은 범용 생태계 |
| **Cursor** | https://cursor.com | 더 강력한 내장 AI 제공 |

:::warning
TuyaOpen IDE는 [Open VSX](https://open-vsx.org/extension/TuyaOpen/TuyaOpenIDE)에 등록되어 있습니다. VS Code Marketplace는 제공되지 않을 수 있으므로 AI 코딩 Agent를 사용하거나 아래 공식 사이트에서 `.vsix`를 다운로드하여 설치할 수도 있습니다.
:::

## 방법 1: AI Agent로 설치(가장 빠름) {/* #ai-agent-install */}
아래 프롬프트를 **Claude Code, Cursor, Codex 또는 셸 명령을 실행할 수 있는 코딩 Agent**에 붙여넣습니다. 최신 `.vsix`를 다운로드하고 확장을 설치합니다.

<TuyaOpenIdeAgentInstallPrompt locale="ko" />

1. Cursor를 열고 Agent에 프롬프트를 붙여넣습니다.
2. 완료 후 Cursor를 열어 **Extensions**에서 **TuyaOpen IDE**가 설치되고 활성화되었는지 확인합니다.
3. 하단 상태 표시줄 오른쪽의 **TuyaOpen**을 클릭하여 사용을 시작합니다.

:::note
프롬프트의 다운로드 링크는 `.vsix`의 **최신** 버전을 가리킵니다. Agent가 다운로드 → 설치 → 다시 로드 흐름을 자동으로 실행합니다.
:::

## 방법 2: 공식 사이트에서 .vsix 다운로드 {/* #manual-vsix */}
1. [TuyaOpen IDE 페이지](/tuyaopen-ide)를 열고 **Install Extension**을 클릭합니다.
2. 설치 대화 상자에서 **Download .vsix**를 클릭합니다.
3. VS Code에서 **Extensions**(`Ctrl+Shift+X`, macOS: `⌘+Shift+X`)를 엽니다.
4. Extensions 패널 오른쪽 위의 `⋯` 메뉴를 엽니다.
5. **Install from VSIX…**를 선택하고 다운로드한 파일을 지정합니다.
6. 안내가 표시되면 편집기를 다시 로드합니다.

## 설치 확인 {/* #verify */}
1. `Ctrl+Shift+P`(macOS: `⌘+Shift+P`)로 Command Palette를 열고 `TuyaOpen`을 입력합니다. TuyaOpen 명령 그룹이 표시되어야 합니다.
2. Extensions에서 **TuyaOpen IDE**를 찾아 상태가 **Enabled**인지 확인합니다.

## 설치에 실패한 경우 {/* #troubleshoot */}
- **`.vsix`가 설치되지 않음** — VS Code 또는 Cursor가 최신인지 확인합니다. 확장에는 VS Code 엔진 `^1.85.0` 이상이 필요합니다.
- **설치했지만 표시되지 않음** — 편집기를 다시 로드하거나 완전히 재시작합니다.
- **Command Palette에 TuyaOpen 명령이 없음** — Extensions에서 확장이 **Enabled**인지 확인합니다.

## 다음 단계 {/* #next */}
[**실습 1: Hello World**](./hello-world.md)에서 공식 예제를 코드 없이 실행하고 IDE 기본을 익히세요.
