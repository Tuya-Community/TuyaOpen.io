---
title: "批量授权 · 开发者指南"
sidebar_label: 开发者指南
description: "写给固件开发者——要让固件能被 tyutool 批量授权，必须实现一套 TuyaOpen UART CLI 命令。下面是完整协议契约与自测清单。"
keywords:
  - tyutool 批量授权
  - 开发者指南
  - UART CLI 协议
  - 授权契约
  - 自测清单
  - tuyaopen
---

写给**固件开发者**：要让固件能被 tyutool 批量授权，必须实现一套 TuyaOpen UART CLI 命令。下面是完整协议契约与**自测清单**。

:::note[走错页了？]
操作员请看[操作员指南](./batch-auth-operator.md)。
:::

## 协议本质

授权协议是 **TuyaOpen 交互式 shell 的文本命令**（纯 ASCII，每条 `\r\n` 结尾，无帧头/校验和/操作码）。与烧录用的 Beken BootROM 二进制协议是两套独立的东西。波特率默认 `115200` 8N1；设备上电呈现 `tuya>` 提示符。权威源是 `tuya_authorize.c`。

:::tip[基于 TuyaOpen 时如何启用 CLI]
需固件主动注册：① `tal_cli_init()`（默认 uart0，非 uart0 用 `tal_cli_init_with_uart(uart_num)`）；② `tuya_authorize_init()`（注册 auth / auth-read / read_mac）。在 `user_main()` 成对调用。代码：

```c
void user_main(void)
{
    // ... tal_kv_init / tal_sw_timer_init / tal_workq_init 等
#if !defined(PLATFORM_UBUNTU) || (PLATFORM_UBUNTU == 0)
    tal_cli_init();          // 初始化 CLI（默认 uart0）
    tuya_authorize_init();   // 注册 auth / auth-read / read_mac 命令
    tuya_app_cli_init();     // 你的 App 自定义命令（可选）
#endif
    // ... tuya_iot_init(...) 等
}
```

:::note
基于 TuyaOpen 三行调用即可；命令表/自测清单主要面向自研或移植固件。
:::

## 必须实现的命令

| 命令(`\r\n` 结尾) | 用途 | 固件必须回显 |
| :-- | :-- | :-- |
| `sys_log_enable off` | 能力探测+关日志 | 新：`OK: log disabled`；旧：`No command` 或回 `tuya>` |
| `sys_version` | 读固件版本 | 一行 `project.version x.y.z` |
| `read_mac` | 读 MAC | `XX:XX:XX:XX:XX:FF`（6 段冒号分隔；或带前缀标签 `LABEL:XX:...:FF` 共 7 段） |
| `auth-read` 或 `auth-read <n>` | 读当前授权 | 已授权：两行 `<uuid>`/`<authkey>` 后提示符；空/未授权：`Authorization read failure.`；部分回显占位 `uuidxxxxxxxxxxxxxxxx`（视作未授权） |
| `auth <uuid> <authkey>` 或 `auth <uuid> <authkey> <n>` | 写授权 | 长度非法：`uuid length must be 20/16, authkey length must be 32`（不执行）；KV 成功：`Authorization write succeeds.`（部分版本重启不打印，tyutool 用 auth-read 回读校验）；OTP 成功：`Authorization write to OTP Succeeds.`；OTP 失败：`Authorization write to OTP failure.` |

:::note
固件应回显每条命令行；日志行（`[MM-DD HH:MM:SS ...]`）和 ANSI 转义会被 tyutool 自动剔除。
:::

## 凭据长度规则

- `UUID` 恰好 16 或 20 字符。
- `AuthKey` 恰好 32 字符。
- 占位 UUID 为 `uuidxxxxxxxxxxxxxxxx`。
- UUID 合法字符：字母数字及 `- _ .`。
- AuthKey：任意 ASCII 可见字符。

## KV 与 OTP 的差异

| 模式 | 读命令 | 写命令 |
| :-- | :-- | :-- |
| KV | `auth-read` | `auth <uuid> <authkey>` |
| OTP | `auth-read 1` | `auth <uuid> <authkey> 1` |

要点：

- OTP 仅 T5AI。
- OTP 烧写耗时长（60 秒总超时+30 秒静默窗口，读 30 秒静默）。
- OTP 写失败重试最多 3 次（不损坏已写数据）。
- 读空 OTP 区回 `Authorization read failure.`（视为未授权）。

:::danger
OTP 写一次不可逆；调试先 KV 验证。
:::

## MAC 校验规则

`read_mac` 必须返回有效 MAC：6 段冒号分隔两位十六进制（大小写不敏感，内部转大写）；可带非十六进制前缀标签（`LABEL:XX:...:XX` 共 7 段）；不识别横杠/等号/空格。T5/T5AI 出厂默认 MAC `C8:47:8C:00:00:18` 表示未个性化——读到它 tyutool 中止该设备授权。

## 自测清单
用串口工具 115200 8N1 逐条核对：

1. 出现 `tuya>` 提示符。
2. `sys_log_enable off` → `OK: log disabled`（或旧固件 `No command`）。
3. `sys_version` → `project.version x.y.z`。
4. `read_mac` → 有效 MAC。
5. `auth-read`（未授权）→ `Authorization read failure.`。
6. `auth <合法 uuid+authkey>` → `Authorization write succeeds.`（KV）/ `...to OTP Succeeds.`（OTP）。
7. 再 auth-read 能读回相同 UUID+AuthKey。
8. `auth <过短 uuid> <key>` → 长度错误且不改授权。
9. （仅 T5AI+OTP）`auth <uuid> <authkey> 1` → OTP 成功，`auth-read 1` 能读回。

:::tip
自测用合法购得的真实凭据；OTP 最后验。
:::

## 集成路径

- **路径 A（推荐）**：固件自带授权能力（基于 TuyaOpen 或自实现），批量用 `auth-only` 模式。
- **路径 B**：用官方 auth-firmware（`assets/auth-firmware/` 按 chip 提供 `.bin`）临时烧入授权，对应批量 `flash-then-auth` 模式。

## 配置交接单
逐项写给操作员：芯片型号；操作模式（A/B）；固件文件名+版本；两个波特率（烧录/授权）；存储模式（KV/OTP，OTP 显著标注）；冲突策略（跳过/覆盖，OTP 只能跳过）；接线说明（**务必确认 RTS 已正确连接到芯片复位脚**）；MAC 唯一性保障（每台 MAC 全球唯一互不重复；tyutool 不校验 MAC 冲突）；特殊事项。

:::note
交接单让操作员"照单执行"，事后排查可对[批次档案](./batch-auth-operator.md)还原约定。
:::
