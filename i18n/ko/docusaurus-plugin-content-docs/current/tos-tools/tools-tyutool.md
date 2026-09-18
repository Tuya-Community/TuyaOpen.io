---
title: GUI - tyutool 그래픽 도구
description: "tyutool GUI는 TuyaOpen을 위한 크로스 플랫폼 플래시 및 디바이스 인증 도구로, 시리얼을 통해 펌웨어와 UUID/AuthKey 자격 증명을 기록합니다."
keywords:
  - tyutool
  - 플래시 도구
  - 디바이스 인증
  - GUI
  - TuyaOpen
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 개요
tyutool은 TuyaOpen용 플래시 및 디바이스 인증 도구입니다. 시리얼 포트로 펌웨어와 디바이스 인증 정보(`UUID`, `AuthKey`)를 기록합니다. GUI와 CLI 두 버전이 있으며 이 페이지에서는 GUI를 다룹니다.

:::danger
tyutool의 인증 기능은 TuyaOpen 프로젝트에만 적용됩니다. TuyaOpen 인증 코드와 TuyaOS 인증 코드는 서로 호환되지 않습니다.
:::

Windows, Linux 및 macOS에서 실행할 수 있습니다. 현재 V2와 V3가 제공됩니다.

- **V3(최신)**: **Rust(Tauri 2) + Vue 3**로 다시 작성되었으며 크로스 플랫폼 호환성이 좋습니다. Mac 사용자에게 권장하고 일괄 플래시 및 인증을 지원하지만 오디오 디버깅은 지원하지 않습니다.
- **V2**: 오디오 디버깅을 포함한 기존의 전체 기능을 제공합니다.

:::note
오디오 디버깅이 필요하면 V2를 다운로드하세요. V3의 전체 기능은 [tyutool V3 사용 가이드](../tyutool/index.md)를 참고하세요.
:::

| 플랫폼 | 소스(권장) |
| :------: | :------: |
| Github | [github-source](https://github.com/tuya/tyutool) |
| Gitee | [gitee-source](https://gitee.com/tuya-open/tyutool) |

| 버전 | Github |
| :--: | :--: |
| V3 | [v3.0.8](https://github.com/tuya/tyutool/releases/tag/v3.0.8) |
| V2 | [v2.3.2](https://github.com/tuya/tyutool/releases/tag/v2.3.2) |

**V3 플랫폼별 권장 다운로드**의 `x.x.x`는 버전 번호입니다. 최신 버전은 [Releases](https://github.com/tuya/tyutool/releases/latest)에서 확인하세요.

| 플랫폼 | 권장 파일 | 자동 업데이트 | 비고 |
| :-- | :-- | :--: | :-- |
| Windows x86_64 | ★ `tyutool-gui_windows_x86_64_nsis_x.x.x.exe` | ✅ | NSIS 설치 프로그램 |
| Windows x86_64 | `tyutool-gui_windows_x86_64_portable_x.x.x.zip` | ❌ | 설치 없이 사용 |
| macOS Universal | ★ `tyutool-gui_macos_universal_dmg_x.x.x.dmg` | ✅ | DMG 설치 프로그램 |
| macOS Universal | `tyutool-gui_macos_universal_portable_x.x.x.tar.gz` | ❌ | 압축 해제 후 실행 |
| Linux x86_64 | ★ `tyutool-gui_linux_x86_64_appimage_x.x.x.AppImage` | ✅ | `chmod +x` 후 실행 |
| Linux aarch64 | ★ `tyutool-gui_linux_aarch64_appimage_x.x.x.AppImage` | ✅ | `chmod +x` 후 실행 |

:::note
`tos.py flash`는 내부적으로 `tyutool_cli`를 호출합니다. `tyutool_gui`는 `tyutool_cli` 위에 구축된 그래픽 인터페이스입니다.
:::

## 펌웨어 플래시
1. 칩을 선택합니다.
2. `Browse`를 클릭하고 `_QIO`가 포함된 bin 펌웨어를 선택합니다.
3. 플래시에 사용할 디바이스 포트를 선택합니다.
4. `Start flash`를 클릭합니다.

<img src="https://images.tuyacn.com/fe-static/docs/img/273ba9fc-5077-47bd-94d2-275747ca7232.png" alt="tyutool 플래시 화면" width="800" />

:::tip
기본 플래시 baud rate는 921600입니다. 속도를 높일 수 있지만 baud rate가 너무 높으면 플래시에 실패할 수 있습니다.
:::

## 디바이스 인증 정보 기록
1. `Authorize` 탭을 클릭합니다.
2. 인증 시리얼 포트와 baud rate를 선택합니다.
3. `UUID`와 `AuthKey`를 입력합니다.
4. `Start Authorization`을 클릭합니다.

<img src="https://images.tuyacn.com/fe-static/docs/img/aa0e7635-2952-4322-8696-3a866b01a6ec.png" alt="tyutool 인증 화면" width="800" />

:::tip
인증 UART와 플래시 UART는 동일합니다. 기본 UART 구성(baud rate 115200, 데이터 비트 8, 정지 비트 1, 패리티 없음)을 유지하세요.
:::

:::info
TuyaOpen `UUID`와 `AuthKey`는 [Tuya IoT Platform](https://platform.tuya.com/purchase/index?type=6)에서 받거나 [Tuya 공식 Taobao 스토어](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP)에서 구매할 수 있습니다.
:::

## FAQ
### `write` 단계에서 항상 실패합니다
CH34x 계열은 드라이버를 설치하거나 업데이트하세요.

- **Windows**: https://www.wch.cn/downloads/ch343ser_exe.html
- **Mac**: https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html

Mac에서는 설치 후 **Security Settings**에서 드라이버 로드를 허용합니다. 정상 설치되면 `cu.wchusb`로 시작하는 이름으로 인식됩니다.

<Tabs>
  <TabItem value="13" label="MacOS 13" default>

**MacOS 13**에서는 **Privacy & Security**에서 허용합니다.

![MacOS 13](/img/tyutool/macos13.png)

  </TabItem>
  <TabItem value="15" label="MacOS 15">

**MacOS 15**에서는 **Settings**에서 `login`을 검색합니다.

![MacOS 15](/img/tyutool/macos15.png)
  </TabItem>
</Tabs>
