---
title: "0단계: 환경 설정"
description: "TuyaOpen 임베디드 개발 환경을 설정합니다. 툴체인을 설치하고 저장소를 복제한 다음 tos.py를 활성화하여 IoT 프로젝트를 빌드하고 플래시합니다."
keywords:
  - 임베디드 개발 환경 설정
  - IoT 개발 환경 설정 가이드
  - TuyaOpen 빠른 시작
  - tos.py 툴체인
  - 오픈 소스 IoT 시작하기
---

컴퓨터에 TuyaOpen에 필요한 툴체인을 설정하고 저장소를 다운로드한 다음, 모든 프로젝트를 구성하고 빌드하고 플래시할 때 사용하는 명령줄 도구 `tos.py`를 활성화합니다.

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

## 하드웨어 준비
시작하기 전에 다음을 준비하세요.

- [TuyaOpen 호환 개발 보드 또는 모듈](../hardware/index.md#development-boards)
- USB 데이터 케이블
- Windows, Linux 또는 macOS가 실행되는 컴퓨터

## 툴체인 설치
운영 체제를 선택하고 필요한 도구를 설치하세요.

<SyncedTabs
  defaultValue="Linux"
  values={[
    { label: '🐧 Ubuntu and Debian', value: 'Linux' },
    { label: '⌘ Mac', value: 'Mac' },
    { label: '🖥️ Windows', value: 'Windows' },
  ]}
>
  <SyncedTabItem value="Linux">
    :::info
    Ubuntu 24, 22, 20의 LTS 버전을 사용하는 것이 좋습니다.
    :::

    필요한 도구를 설치합니다.

    ```bash
    sudo apt-get install lcov cmake-curses-gui build-essential ninja-build wget git python3 python3-pip python3-venv libc6-i386 libsystemd-dev
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Mac">
    :::info
    설치에는 Homebrew 패키지 관리자를 사용하는 것이 좋습니다.
    :::

    macOS의 기본 도구 버전은 오래된 경우가 많습니다. Homebrew를 설치하고 bash를 업데이트하세요.

    <details>
    <summary>Homebrew 설치 및 bash 업데이트:</summary>

    ```bash
    # Install Homebrew
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Install the latest bash
    brew install bash

    # Add the newly installed bash to the list of available shells
    echo "/usr/local/bin/bash" | sudo tee -a /etc/shells

    # Change the current user's shell to the new bash
    chsh -s /usr/local/bin/bash
    ```
    </details>

    필요한 도구를 설치합니다.

    ```bash
    # Install python3
    brew install python3

    # Install Git
    brew install git

    # Install make
    brew install make
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Windows">
    :::info
    Windows 10 또는 11을 사용하세요.
    :::

    :::warning
    Windows의 Linux 유사 터미널 환경(예: Git Bash 및 MSYS2)과 호환되지 않습니다. CMD 또는 PowerShell을 사용하세요.
    :::

    다음 도구를 다운로드하여 설치하고 환경 변수에 추가한 다음 컴퓨터를 재시작하세요. 터미널에서 해당 명령이 정상적으로 실행되는지도 확인합니다.
     - Python v3.8.0 이상: [다운로드](https://www.python.org/downloads/windows/)
     - Git v2.0.0 이상: [다운로드](https://git-scm.com/downloads/win)
     - Make v3.0 이상: [다운로드](https://gnuwin32.sourceforge.net/packages/make.htm)
  </SyncedTabItem>
</SyncedTabs>

## TuyaOpen 다운로드 및 활성화
TuyaOpen 저장소를 복제합니다.

:::tip
다음과 같이 git 설정을 조정하면 복제 성능을 높일 수 있습니다.

```bash
git config --global http.postBuffer 524288000
```
:::

:::warning
프로젝트 경로에 중국어 또는 공백과 같은 특수 문자를 사용하지 마세요. Windows에서는 프로젝트를 C 드라이브에 두지 않는 것이 좋습니다.
:::

```bash
# Use GitHub
git clone https://github.com/tuya/TuyaOpen.git

# Or use Gitee
git clone https://gitee.com/tuya-open/TuyaOpen.git

# Enter the project
cd TuyaOpen
```

`tos.py`를 활성화합니다.

:::warning
터미널을 다시 열 때마다 `tos.py`를 다시 활성화해야 합니다.
:::

<SyncedTabs
  defaultValue="Linux"
  values={[
    { label: '🐧 Linux', value: 'Linux' },
    { label: '⌘ Mac', value: 'Mac' },
    { label: '🖥️ Windows', value: 'Windows' },
  ]}
>
<SyncedTabItem value="Linux">
    ```bash
    . ./export.sh
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Mac">
    ```bash
    . ./export.sh
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Windows">
    ```bash
    .\export.ps1  # # powershell needs to execute `Set-ExecutionPolicy RemoteSigned -Scope LocalMachine` first

    .\export.bat  # cmd
    ```
  </SyncedTabItem>
</SyncedTabs>

`tos.py version`과 `tos.py check`를 실행하여 활성화를 확인합니다. 다음과 비슷한 출력이 표시됩니다.

```bash
❯ tos.py version
[INFO]: Running tos.py ...
[INFO]: v1.3.0

❯ tos.py check
[INFO]: Running tos.py ...
[INFO]: [git] (2.43.0 >= 2.0.0) is ok.
[INFO]: [cmake] (4.0.2 >= 3.28.0) is ok.
[INFO]: [make] (4.3 >= 3.0.0) is ok.
[INFO]: [ninja] (1.11.1 >= 1.6.0) is ok.
[INFO]: Downloading submodules...
[INFO]: [do subprocess]: cd /home/huatuo/work/open/TuyaOpen && git submodule update --init
[INFO]: Download submodules successfully.
```

<details>
<summary>check 명령이 실패하는 경우:</summary>
```bash
# Tool validation failed. Please install or upgrade the required tools.
# Submodules download failed. Manually execute the git command.
git submodule update --init
```
</details>

작업이 끝나면 `tos.py`를 비활성화합니다.

<SyncedTabs
  defaultValue="Linux"
  values={[
    { label: '🐧 Linux', value: 'Linux' },
    { label: '⌘ Mac', value: 'Mac' },
    { label: '🖥️ Windows', value: 'Windows' },
  ]}
>
  <SyncedTabItem value="Linux">
    ```bash
    deactivate
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Mac">
    ```bash
    deactivate
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Windows">
    ```bash
    exit
    ```
  </SyncedTabItem>
</SyncedTabs>

`tos.py` 전체 설명은 `tos.py --help`를 실행하거나 [CLI - tos.py 개발 도구](../tos-tools/tos-guide.md)를 참고하세요.

## FAQ
### `tos.py` 활성화에 실패합니다
- `python3-venv`가 설치되지 않아 활성화가 실패할 수 있습니다. 설치한 후 다시 시도하세요.

  ```bash
  sudo apt-get install python3-venv
  ```

- `tos.py`를 활성화하면 `./.venv` 디렉터리가 자동으로 생성됩니다. 활성화에 실패하면 `./.venv` 디렉터리를 삭제하고 다시 활성화하세요.
