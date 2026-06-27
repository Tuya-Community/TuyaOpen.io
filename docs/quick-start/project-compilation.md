---
title: "Step 1: Build Project"
---

Build Project takes a TuyaOpen application from source to a flashable firmware bin. You select a project, pick a board config, build, and clean — all with `tos.py`. This page uses the `switch_demo` application as the example.

## Select a project

In TuyaOpen, you build projects from the `apps` and `examples` directories.

Using `switch_demo` as the example, enter the project directory.

```bash
cd apps/tuya_cloud/switch_demo
```

## Configure the project

Run `tos.py config choice` to configure the project. The command lists verified configuration options; select the one that matches your hardware.

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

For a Tuya T5 series development board, for example, select `T5AI.config`.

## Build the output

Build the project with `tos.py build`.

```bash
❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************

```

On success, the firmware bin path is printed and the build ends with `Build Success`. You flash this bin in [Step 2: Flashing and Logging](./firmware-burning.md).

## Clear the output

To clear the build cache, run `tos.py clean` for a standard cleanup or `tos.py clean -f` for a forced deep cleanup.

```bash
❯ tos.py clean -f
[INFO]: Running tos.py ...
[INFO]: Fullclean success.
```

## FAQs

### Compilation is slow on Windows

Symptom: each file can take up to 3 seconds to compile, and the process sometimes stalls on a file.

Solution:

1. Open Task Manager with `Ctrl + Shift + Esc`, check the CPU processes, then find and close the `MSPCManagerService` process.
2. If that does not help, move the entire `TuyaOpen` directory to a non-system drive (for example, the D drive), and add the directory to the exclusion list under **Windows Security - Virus & threat protection**.
