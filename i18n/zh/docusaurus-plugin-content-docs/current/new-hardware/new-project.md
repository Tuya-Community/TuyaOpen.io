---
title: 创建 Project
---

# 创建 Project

## 概述

本文为您介绍如何使用 `tos.py new project` 命令创建一个项目。`tos.py new project` 命令用于在 TuyaOpen 开发环境中创建新的项目，该命令会基于预定义的模板快速初始化一个新项目的基础结构。

## 操作原理

执行命令 `tos.py new project`，系统会提示您输入新项目的名称并选择平台。

```bash
❯ tos.py new project
[INFO]: Running tos.py ...
[NOTE]: Input new project name.
input: new-project
```

命令执行完成后，系统会在当前目录下创建一个名为 `new-project` 的文件夹，其中包含新项目的基本结构。

### 目录结构

```
new-project
├── app_default.config  # 默认配置文件
├── CMakeLists.txt      # CMake 构建配置
└── src
    └── hello_world.c   # 示例代码文件
```

### 选项参数

`-f, --framework [base|arduino]`：指定项目使用的框架类型。
    - `base`（默认）：创建基础框架项目。
    - `arduino`：创建 Arduino 框架项目。


## 后续操作

概览：

    > 1. 编译验证。
    >
    > 2. 代码开发。
    >
    > 3. 修改配置，功能验证。
    >
    > 4. 保存默认配置文件，以便其他开发者使用。

### 编译验证

首先，使用命令 `tos.py config choice` 选择想要使用的芯片平台配置。

然后，使用命令 `tos.py build` 进行编译验证。

### 代码开发

1. 确定自己的代码目录结构，并在 `CMkeLists.txt` 中配置 `add_library(${EXAMPLE_LIB})` 所需要的源文件和头文件路径。

    - `${EXAMPLE_LIB}`：库名称变量，由主框架定义，无需自行修改。

    - 使用标准的 `cmake` 语法配置 `APP_SRC` 和 `APP_INC` 变量即可。

2. 进行代码开发。

    使用 `${tuyaopen_root}/src` 以及 `${tuyaopen_root}/platform/.../tuyaos_adapter` 中提供的接口进行开发。

    可以参考官方提供的示例代码 `apps` 和 `examples`。

3. 更改配置文件。

    通过命令 `tos.py config menu` 进入配置界面，然后调整 `TuyaOpen` 的配置选项。


### 功能验证

烧录并验证代码功能。

### 保存默认配置文件

通过命令 `tos.py config save` 将当前配置保存为默认配置文件。


