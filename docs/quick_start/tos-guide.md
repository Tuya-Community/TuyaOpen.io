---
title: tos.py Guide
---

## Overview

Introduces the working principle and usage methods of `tos.py`

Explains the behavior of various subcommands

Provides answers and solutions for common problems

After completing the activation of `TuyaOpen`, you can also view help information using the command `tos.py --help`

```bash
❯ tos.py --help
Usage: tos.py [OPTIONS] COMMAND [ARGS]...

  Tuya Uart Tool.

Options:
  -d, --debug  Show debug message
  -h, --help   Show this message and exit.

Commands:
  version  Show version.
  check    Check the dependent tools.
  config   Configuration file operation.
  build    Build the project.
  clean    Clean the project.
  flash    Flash the firmware.
  monitor  Display the device log.
  update   Update TuyaOpen dependencies.
```

Using the command flag `-d` or `--debug`, you can display more execution logs

```bash
❯ tos.py -d version
[DEBUG]: open_logger init done.
[INFO]: Running tos.py ...
[INFO]: v1.3.0-23-g6bcb5aa
```

## version

The version number information output by `tos.py version` is as follows

```bash
❯ tos.py version
[INFO]: Running tos.py ...
[INFO]: v1.3.0-23-g6bcb5aa
```

The displayed content is actually the current `tag-commit` of the `TuyaOpen` repository

Consistent with the output of the command `git describe --tags`, where

> v1.3.0 - The most recent release version number
>
> 23 - There are 23 new commit submissions based on v1.3.0
>
> g6bcb5aa - g is a fixed prefix, `6bcb5aa` is the abbreviated hash of the current commit
>

<details>
<summary>If [Unknown version] appears</summary>

    It means the current repository has no tags, commonly seen in forked repositories

</details>

## check

```bash
❯ tos.py check
[INFO]: Running tos.py ...
[INFO]: [git] (2.43.0 >= 2.0.0) is ok.
[INFO]: [cmake] (4.0.2 >= 3.28.0) is ok.
[INFO]: [make] (4.3 >= 3.0.0) is ok.
[INFO]: [ninja] (1.11.1 >= 1.6.0) is ok.
[INFO]: Downloading submoudules ...
[INFO]: [do subprocess]: cd /home/huatuo/work/open/TuyaOpen && git submodule update --init
[INFO]: Download submoudules successfully.
```

The `check` command will complete 2 steps of operations

    1. Check if the environment tools required by `TuyaOpen` exist and validate version numbers;

    2. Download the required `submodules`;

<details>
<summary>If there are [Error] during check process</summary>

    1. Tools are not installed or version is too low, you can install or upgrade corresponding tools;

    2. `submodules` download fails, you can try executing `git submodule update --init` in the `TuyaOpen` root directory;

</details>

## config

```bash
❯ tos.py config -h
Usage: tos.py config [OPTIONS] COMMAND [ARGS]...

  Configuration file operation.

Commands:
  choice  Choice config file.
  menu    Menuconfig.
  save    Save minimal config.
```

### config choice

In the project directory, execute the command `tos.py config choice`

It will display all the solidified configurations supported by the current project, which can be used directly

The selected configuration will be synchronized to the [app_default.config](./project-walkthrough#app_defaultconfig) file in the project path

```bash
❯ tos.py config choice
[INFO]: Fullclean success.
--------------------
1. DNESP32S3_BOX.config
2. XINGZHI_Cube_0_96OLED_WIFI.config
3. WAVESHARE_ESP32S3_TOUCH_AMOLED_1_8.config
4. ESP32S3_BREAD_COMPACT_WIFI.config
5. TUYA_T5AI_EVB.config
6. DNESP32S3.config
7. TUYA_T5AI_BOARD_EYES.config
8. TUYA_T5AI_MINI_LCD_1.3.config
9. T5AI_MOJI_1.28.config
10. TUYA_T5AI_BOARD_LCD_3.5.config
--------------------
Input "q" to exit.
Choice config file:
```

There are two sources for solidified configurations:

    1. Priority is given to configuration files in the `config` directory under the project path (such as `your_chat_bot`);

    2. If source 1 doesn't exist, use configuration files provided in `TuyaOpen/boards` (such as `switch_demo`);

:::note
This operation may change the toolchain being used, so the `config` operation will first perform a deep clean
:::

When the `config` directory exists, it will not display configuration files in `boards`

If you only want to display configurations in `boards`, you can add the command flag `config -d`

### config menu

The `menu` command will open a visual configuration interface

![menu](https://images.tuyacn.com/fe-static/docs/img/0ad1b8c6-303d-411c-bfe7-c25e17968c05.png)

Users can modify configuration options according to project requirements, and after saving, it will synchronously modify the [app_default.config](./project-walkthrough#app_defaultconfig) file

:::note
This operation may change the toolchain being used, so the `menu` operation will first perform a deep clean
:::

:::warning
Modifying configurations may cause project functionality to change or even compilation to fail. You can ask technical support

Or use the `choice` command to reselect configurations
:::

### config save

`save` will save the configuration currently used by the project as a solidified configuration for future use

The specific operation is to rename the [app_default.config](./project-walkthrough#app_defaultconfig) file and save it to the `config` directory

```bash
❯ tos.py config save
[INFO]: Running tos.py ...
Input save config name:
```

:::tip
The `save` operation is used for scenarios where solidified configurations have been modified through `menu`
:::

## build

Compile the project and generate executable files

```bash
❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************

```

The specific process will complete the following steps:

    1. Download the toolchain repository selected by the project to the `platform` directory;

    2. Execute the `prepare` operation of the toolchain;

    3. Create the compilation directory `.build` and parse the `CMakeLists.txt` file;

    4. Execute the compilation command `ninja build`;

    5. Place the artifacts in the path `.build/bin`;

If you want to see more detailed compilation logs, you can use the command flag `build -v`

## clean

Clean compilation cache

Using the command flag `clean -f`, deep clean, will delete the compilation directory `.build` after `ninja clean` ends

## flash

Flash executable files to the device

Use the tool `tyutool_cli` to complete flashing, if not available it will be downloaded automatically

According to project configuration, automatically adjust flashing methods, or manually set through command flags

```bash
❯ tos.py flash -h
Usage: tos.py flash [OPTIONS]

  Flash the firmware.

Options:
  -d, --debug         Show flash debug message.
  -p, --port TEXT     Target port.
  -b, --baud INTEGER  Uart baud rate.
  -h, --help          Show this message and exit.
```

The `tyutool_cli` tool is stored in the directory `TuyaOpen/tools/tyutool`

:::tip
For Linux / Mac users, you need to enable serial port usage permissions, execute command

`sudo usermod -aG dialout $USER`

and restart the system
:::

## monitor

Use the tool `tyutool_cli` to display serial port logs

According to project configuration, automatically adjust log parameters, or manually set through command flags

```bash
❯ tos.py monitor -h
Usage: tos.py monitor [OPTIONS]

  Display the device log.

Options:
  -p, --port TEXT     Target port.
  -b, --baud INTEGER  Uart baud rate.
  -h, --help          Show this message and exit.
```

At the same time, you can also use the `monitor` function to write authorization codes, refer to: [Authorization](./enviroment-setup#authorization)

Exit log viewing by pressing `Ctrl+c`, then press Enter

```bash
^C[INFO]: Press "Entry" ...

[INFO]: Monitor exit.
```

## update

According to the dependency configuration file of `TuyaOpen`, switch related dependencies to the specified `commit`

If you use `git pull` or `git checkout` to update the `TuyaOpen` main repository, you can use the `update` command to automatically update related dependencies

Toolchain dependency relationships are recorded in the file `TuyaOpen/platform/platform_config.yaml`

## new

### new project

This command is used to quickly create a new user application project

Execution process:

   1. Ask for project name: Prompts you to enter the name of the new project (e.g., `my_app`)

   1. Select framework: You can choose a project template through the --framework parameter. From the code, it currently supports base (basic template) and arduino two types. The default is base

   1. Copy template:
       * It will find the corresponding framework template from the `tools/app_template/` directory
       * Then copy the entire template directory completely to the current directory and rename it to the project name you entered

### new platform

For the specific usage of this command, please refer to **[new platform](../new_hardware/new-platform)**

## Common Issues

### When executing the `config menu` command in Windows, the arrow keys may fail

This is caused by compatibility issues with the terminal emulator. You can try to select the available terminal in `cmd` and `powershell`

Or use the keys **h[⬅️] j[⬇️] k[⬆️] l[➡️]** to operate

### check errors

1. Dependent tools are not installed or version is too low

    - Please install or upgrade the corresponding tools

2. submodules download fails

    - Please try executing `git submodule update --init` in the `TuyaOpen` root directory

### could not lock config file

If the following error occurs

```bash
[WARNING]: Set repo mirro error: Cmd('git') failed due to: exit code(255)                                                                         
  cmdline: git config --global --unset url.https://gitee.com/tuya-open/FlashDB.insteadOf                                                          
  stderr: 'error: could not lock config file /home/huatuo/.gitconfig: File exists'                                                                
[WARNING]: Set repo mirro error: Cmd('git') failed due to: exit code(255)                                                                         
  cmdline: git config --global --unset url.https://gitee.com/tuya-open/littlefs.insteadOf                                                         
  stderr: 'error: could not lock config file /home/huatuo/.gitconfig: File exists'
```

You can manually delete the file `~/.gitconfig.lock`