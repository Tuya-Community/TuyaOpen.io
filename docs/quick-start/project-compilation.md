---
title: Project Compilation
---

# Project Compilation

### Select Project

In TuyaOpen, compilable projects can be selected from `apps` and `example` directories

Here we use `switch_demo` as an example

Enter the project directory

```bash
cd apps/tuya_cloud/switch_demo
```

## Configure Project

Use command `tos.py config choice` to configure the project

This command will provide verified configuration options, users can select based on their hardware devices

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

Here we use Tuya T5 series development board as an example, select `T5AI.config`

## Build Artifacts

Build the project using command `tos.py build`

```bash
❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************

```

## Clean Artifacts

Clean compilation cache using command `tos.py clean` or `tos.py clean -f` (deep clean)

```bash
❯ tos.py clean -f
[INFO]: Running tos.py ...
[INFO]: Fullclean success.
```
