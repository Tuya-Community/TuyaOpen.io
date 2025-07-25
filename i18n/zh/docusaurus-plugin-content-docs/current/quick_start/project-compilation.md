---
title: 项目编译
---

# 项目编译

## 选择项目

TuyaOpen 中，可编译项目可在 `apps`、`example` 中进行选择。

这里以 `switch_demo` 为例。首先，进入项目目录。

```bash
cd apps/tuya_cloud/switch_demo
```

## 配置项目

使用命令 `tos.py config choice` 对项目进行配置。

该命令会提供已经验证过的配置选项，您可根据自己的硬件设备进行选择。

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

这里以涂鸦 T5 系列开发板为例，需要选择 `T5AI.config`。

## 编译产物

编译项目，使用命令 `tos.py build`。

```bash
❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************

```

## 清理产物

清理编译缓存，使用命令 `tos.py clean` 或 `tos.py clean -f`（深度清理）。

```bash
❯ tos.py clean -f
[INFO]: Running tos.py ...
[INFO]: Fullclean success.
```
