---
title: Build Project
---

# Build Project

## Select project

In TuyaOpen, you can choose compilable projects from the `apps` and `example` directories.

Take `switch_demo` as an example. Go to the project directory.

```bash
cd apps/tuya_cloud/switch_demo
```

## Configure project

Run the `tos.py config choice` command to configure the project.

This command provides verified configuration options, allowing you to select them based on your hardware device.

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

Taking the Tuya T5 series development board as an example, you need to select `T5AI.config`.

## Build output

Build the project using the command `tos.py build`.

```bash
❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************

```

## Clear output

To clear the build cache, run the command `tos.py clean` (standard cleanup) or `tos.py clean -f` (force deep cleanup).

```bash
❯ tos.py clean -f
[INFO]: Running tos.py ...
[INFO]: Fullclean success.
```
