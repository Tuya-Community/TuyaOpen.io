---
title: 常见问题与故障排查
description: "以症状为先的 tyutool 故障排查——连接与端口、烧录失败、授权、平台问题（Linux 白屏、Windows WebView2），以及如何附日志反馈 bug。"
keywords:
  - tyutool 常见问题
  - 故障排查
  - 烧录失败
  - 授权失败
  - Linux 白屏
  - WebView2
  - tuyaopen
---


本页以问题为先：先列出**症状**，再给最小步骤的排查与修复。命令行片段与 GUI 操作并存。

## 连接 / 端口

### 设备 / 串口没出现在下拉框
**症状**：端口选择器空 / `tyutool list-ports` 无输出。

1. 拔插换口换线。
2. 装驱动（CH340/CP2102/FT232）。
3. CLI 复核：

```bash
tyutool list-ports
tyutool usb-port-survey   # 输出原始 USB 元数据，便于跨系统排错
```

4. macOS 见 [macOS 串口权限](#macos-串口权限)。
5. Linux 确认在 dialout/tty 组并注销重登。

:::tip
点刷新或重开应用。
:::

### macOS 串口权限
**症状**：端口看得见但权限错误。

```bash
sudo dseditgroup -o edit -a $USER -t user dialout
```

然后注销重登。较新 macOS 在 **隐私与安全性 → 配件** 里允许。详见项目 [README Troubleshooting](https://github.com/tuya/tyutool#readme)。

### 端口被占用
**症状**：`Permission denied` / `Device or resource busy`。

关掉其他程序（串口调试、Arduino IDE、minicom、picocom）；避免 GUI+CLI 同时操作；可开自动释放。

## 烧录

### 烧录失败 / 握手失败
**症状**：Handshake 失败 / Failed to sync。

原因：芯片型号选错（`-d bk7231n` / `-d esp32` / `-d t5ai`）；波特率不对（先降到 115200）；设备没进下载模式（`tyutool reset`）；接线/供电。

:::warning
先做最小复现：`tyutool read -d <芯片> -p <端口> -l 0x1000`。
:::

### 擦除报"未对齐"
**症状**：`unaligned` / `address not aligned` / `sector boundary`。

擦除要求 4 KiB 对齐：

```bash
# 正确：起始与长度都对齐到 4 KiB
tyutool erase -d bk7231n -s 0x0000 -l 0x200000
tyutool erase -d bk7231n -s 0x8000 -l 0x4000

# 错误：0x9000 不是 4 KiB 的整数倍
tyutool erase -d bk7231n -s 0x9000 -l 0x1000   # ❌ 报未对齐
```

:::tip
用 GUI 的对齐动作，或向下取整到 `0x1000` 的倍数。
:::

### 进度卡住
**症状**：某阶段长时间 0% 或反复重试。

降波特（921600 → 460800 → 115200）；换线换供电；开调试日志或 CLI `--verbose` 到 debug/trace（位置见 [CLI · 全局选项](./cli.md)）；用 `Ctrl+C` 优雅取消。

## 授权

### 授权失败
**症状**：authorize 写入失败 / UUID/AuthKey 无效。

凭证一机一次（用过作废）；先 auth-read `tyutool authorize -p <端口>`；`--uuid` / `--authkey` 必须同时给；指定 `-d` 时序。

:::note
凭证从涂鸦开发者平台获取，绑定芯片/产品。
:::

### 凭证显示问题
**症状**：看不到完整 / 复制出 `****`。

GUI 默认掩码，点 Show 或复制按钮；CLI auth-read：

```bash
tyutool authorize -p <端口>
tyutool authorize -p <端口> -d esp32   # 按芯片时序读取
```

复制后及时清空剪贴板。

## 平台

### Linux 窗口空白（WebKit 合成失败）
```bash
export WEBKIT_DISABLE_COMPOSITING_MODE=1
```

然后启动 AppImage；可加入 `~/.bashrc`。详见 README。

### Windows 缺少 WebView2
装 Edge WebView2 Runtime Evergreen：官网下载页 → Evergreen Standalone Installer → 运行重启。

:::note
企业/离线可用 Fixed Version 离线包。
:::

## 日志与反馈

### 如何反馈 bug（附日志）
1. **导出/打开日志**。GUI：设置 → 诊断 → 查看日志 → "导出日志并报告问题" = zip + 预填 issue；CLI：看 banner 的 `log:` 行，`--verbose` 打 stderr。
2. **用 issue 模板**。[Issues → New issue](https://github.com/tuya/tyutool/issues/new/choose)，选 Bug 报告。
3. **填全关键字段**：Version / OS / Chip / Platform / baud / Steps / Expected vs actual。
4. **附会话日志**：拖 zip 到 issue，或 CLI 贴 `tyutool-<时间戳>.log`。

:::warning
日志含敏感信息（UUID/AuthKey），先遮蔽。
:::
