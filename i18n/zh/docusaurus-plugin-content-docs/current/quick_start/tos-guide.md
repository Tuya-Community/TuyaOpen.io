---
title: tos.py 使用指南
---

## 概述

介绍`tos.py`的工作原理和使用方法

对各个子命令做出行为解释

针对常见的问题给出回答和解决办法

在完成激活`TuyaOpen`的操作后，也可以通过命令`tos.py --help`查看帮助信息

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

使用命令字`-d`或`--debug`，可以显示更多执行日志

```bash
❯ tos.py -d version
[DEBUG]: open_logger init done.
[INFO]: Running tos.py ...
[INFO]: v1.3.0-23-g6bcb5aa
```

## version

`tos.py version`所输出的版本号信息如下

```bash
❯ tos.py version
[INFO]: Running tos.py ...
[INFO]: v1.3.0-23-g6bcb5aa
```

显示内容实际是`TuyaOpen`仓库的当前`tag-commit`

与命令`git describe --tags`输出一致，其中

> v1.3.0 - 最近的发布版本号
>
> 23 - 在v1.3.0的基础上有23个新的commit提交
>
> g6bcb5aa - g为固定前缀，`6bcb5aa`是当前commit的缩写哈希
>

<details>
<summary>出现 [Unknow version]</summary>

    说明当前仓库的没有任何tag，常见于fork仓库的情况

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

`check`命令会完成2个步骤的操作

    1. 检查`TuyaOpen`使用中所需的环境工具是否存在，并校验版本号；

    1. 下载所需要的`submodules`；

<details>
<summary>check 过程中有 [Error]</summary>

    1. 工具未安装或版本过低，可安装或升级对应工具；

    1. `submodules`下载失败，可尝试在`TuyaOpen`根目录执行`git submodule update --init`；

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

### choice

在项目目录中，执行命令`tos.py config choice`

会展示当前项目所支持的所有固化配置，可直接使用

被选择的配置会同步到项目路径下的 [app_default.config](https://tuyaopen.ai) 文件

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

固化配置的来源有两个：

    1. 优先使用项目路径下`config`目录中的配置文件（如`your_chat_bot`）；

    1. 若来源1不存在，使用`TuyaOpen/boards`中提供的配置文件（如`switch_demo`）；

:::note
该操作可能会改变所使用的工具链，所以`config`操作，会先执行一次深度清理
:::

当`config`目录存在时，并不会显示`boards`中的配置文件

若只想显示`boards`中的配置，可加命令字`config -d`

### menu

`menu`命令会打开可视化配置界面

![menu](https://images.tuyacn.com/fe-static/docs/img/0ad1b8c6-303d-411c-bfe7-c25e17968c05.png)

使用者可以根据项目需求修改配置选项，保存后会同步修改 [app_default.config](https://tuyaopen.ai) 文件

:::note
该操作可能会改变所使用的工具链，所以`menu`操作，会先执行一次深度清理
:::

:::warning
修改配置会导致项目功能发生变化，甚至编译失败，可询问技术支持

或者使用`choice`命令重新选择配置
:::

### save

`save`会将当前项目所使用的配置保存为固化配置，方便以后使用

具体操作是将 [app_default.config](https://tuyaopen.ai) 文件重新命名后保存到`config`目录中

```bash
❯ tos.py config save
[INFO]: Running tos.py ...
Input save config name:
```

:::tip
`save`操作针对通过`menu`修改过固化配置的场景使用
:::

## build

编译项目，生成可执行文件

```bash
❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************

```

具体过程会完成如下步骤：

    1. 下载项目所选择的工具链仓库到`platform`目录中；

    1. 执行工具链的`prepare`操作；

    1. 创建编译目录`.build`，并解析`CMakeLists.txt`文件；

    1. 执行编译命令`ninja build`；

    1. 将产物放到路径`.build/bin`；

若想看到更加详细的编译日志，可使用命令字`build -v`

## clean

清理编译缓存

使用命令字`clean -f`，深度清理，会在`ninja clean`的结束后，删除编译目录`.build`

## flash

烧录可执行文件到设备中

使用工具`tyutool_cli`完成烧录，如果没有会自动下载

根据项目配置，自动调整烧录方式，也可以通过命令字手动设置

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

`tyutool_cli`工具存放在目录`TuyaOpen/tools/tyutool`中

:::tip
对于 Linux / Mac 用户，需要开启串口使用权限，执行命令

`sudo usermod -aG dialout $USER`

并重启系统
:::

## monitor

使用工具`tyutool_cli`显示串口日志

根据项目配置，自动调整日志参数，也可以通过命令字手动设置

```bash
❯ tos.py monitor -h
Usage: tos.py monitor [OPTIONS]

  Display the device log.

Options:
  -p, --port TEXT     Target port.
  -b, --baud INTEGER  Uart baud rate.
  -h, --help          Show this message and exit.
```

同时，也可以使用`monitor`功能写入授权码，参考：[授权](./enviroment-setup.md#授权)

退出日志查看，按键`Ctrl+c`，并回车

```bash
^C[INFO]: Press "Entry" ...

[INFO]: Monitor exit.
```

## update

根据`TuyaOpen`的依赖配置文件，将相关依赖切换到指定`commit`

若使用`git pull`或`git checkout`更新了`TuyaOpen`主仓库，可使用`update`命令，自动更新相关依赖

工具链依赖关系记录在文件`TuyaOpen/platform/platform_config.yaml`中

## 常见问题
