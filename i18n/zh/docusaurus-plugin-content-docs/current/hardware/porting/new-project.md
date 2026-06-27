---
title: 新建工程
---

`tos.py new project` 用于在 TuyaOpen 开发环境中创建一个新项目。该命令会基于预定义的模板初始化项目的基础结构。

## 创建 Project

运行 `tos.py new project`，命令会提示您输入项目名称并选择平台。

```bash
❯ tos.py new project
[INFO]: Running tos.py ...
[NOTE]: Input new project name.
input: new-project
```

命令会在当前目录下创建一个名为 `new-project` 的文件夹，其中包含项目的基础结构。

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

创建项目后，依次进行编译验证、代码开发、修改配置以验证功能，并保存默认配置供其他开发者使用。

### 编译验证

1. 运行 `tos.py config choice`，选择芯片平台配置。
2. 运行 `tos.py build` 进行编译验证。

### 代码开发

1. 确定代码的目录结构，并在 `CMakeLists.txt` 中配置 `add_library(${EXAMPLE_LIB})` 所需的源文件和头文件路径。

    - `${EXAMPLE_LIB}`：库名称变量，由主框架定义，无需手动修改。
    - 使用标准 `CMake` 语法配置 `APP_SRC` 和 `APP_INC` 变量。

2. 进行代码开发。使用 `${tuyaopen_root}/src` 以及 `${tuyaopen_root}/platform/.../tuyaos_adapter` 中提供的接口进行开发，可参考 `apps` 和 `examples` 中的官方示例代码。

3. 更改配置文件。运行 `tos.py config menu` 进入配置界面，然后调整 TuyaOpen 的配置选项。

### 功能验证

烧录固件并验证代码功能。

### 保存默认配置文件

运行 `tos.py config save` 将当前配置保存为默认配置文件。
