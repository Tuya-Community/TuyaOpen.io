---
title: "Step 1: 项目编译"
description: "项目编译通过 tos.py 将 TuyaOpen 应用从源码构建为可烧录固件 bin，涵盖选择项目、配置开发板、编译与清理产物的完整流程。"
keywords:
  - TuyaOpen
  - 项目编译
  - tos.py
  - 固件构建
  - 快速入门
---

项目编译将一个 TuyaOpen 应用从源码构建为可烧录的固件 bin。你将选择项目、选择开发板配置、编译并清理产物——全部通过 `tos.py` 完成。本文以 `switch_demo` 应用为例。

## 选择项目

在 TuyaOpen 中，可编译的项目位于 `apps` 和 `examples` 目录下。

以 `switch_demo` 为例，进入项目目录。

```bash
cd apps/tuya_cloud/switch_demo
```

## 配置项目

执行 `tos.py config choice` 配置项目。该命令会列出已验证的配置选项，请选择与你硬件匹配的一项。

```bash
❯ tos.py config choice
[INFO]: Running tos.py ...
[INFO]: Fullclean success.
--------------------
1. LN882H.config
2. EWT103-W15.config
3. Ubuntu.config
4. ESP32-C3.config
5. ESP32-S3.config
6. ESP32.config
7. T3.config
8. T5AI.config
9. T2.config
10. BK7231X.config
--------------------
Input "q" to exit.
Choice config file:
```

以涂鸦 T5 系列开发板为例，选择 `T5AI.config`。

## 编译产物

使用 `tos.py build` 编译项目。

```bash
❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************

```

编译成功后会打印固件 bin 路径，并以 `Build Success` 结束。你将在 [Step 2: 固件烧录](./firmware-burning.md) 中烧录该 bin。

## 清理产物

清理编译缓存，使用 `tos.py clean` 进行常规清理，或 `tos.py clean -f` 进行强制深度清理。

```bash
❯ tos.py clean -f
[INFO]: Running tos.py ...
[INFO]: Fullclean success.
```

## 常见问题

### 在 Windows 环境中编译缓慢

现象：每个文件的编译可能长达 3 秒左右，有时甚至会卡在某个文件上。

解决办法：

1. 使用 `Ctrl + Shift + Esc` 打开任务管理器，查看 CPU 进程，找到并关闭 `MSPCManagerService` 进程。
2. 若仍不见效，可将整个 `TuyaOpen` 目录放在非系统盘（如 D 盘）下，并将该目录添加到 **Windows 安全中心 - 病毒和威胁防护** 设置的排除项中。
