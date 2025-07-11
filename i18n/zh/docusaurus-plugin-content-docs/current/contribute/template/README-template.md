---
title: readme-xxx
---

# xxx系统/模块


> **注意：**
>
> _1、本模板提供推荐的README写作指导。_
>
> _2、所有斜体为写作指导，正式文档中注意全部删除。_

**_【总体写作要求】_**

**_1、确认写作内容：_**_介绍**系统/模块**是什么（What）、能做什么（Why），以及如何进行开发（How）。_

**_2、变身用户视角：_**_以开发者视角，提供开发者关注的和需要使用的内容。_

**_3、不要受限：_**_模板供参考，根据实际情况灵活调整。_

## 简介

_【写作要求】**必选**_

_**内容介绍:**在整个 TuyaOpen 架构中的作用、实现的功能、使用场景、支持的设备等。_

_**注意事项如下:**_

| 要求项 | 内容要求 |
| -------- | -------- |
| **1** | **用语要求** |
| 1.1 | 行文风格：用语正式，避免口语化。 |
| 1.2 | 合规要求：不能使用第三方知识产权特有概念等存在合规和法务风险的词汇。 |
| 1.3 | 用语一致：术语与术语库保持一致，正文中缩略语首次出现要给出全称。 |
| **2** | **格式要求** |
| 2.1 | 标点符号正确，一句话结束以句号结尾。 |
| 2.2 | 内容尽量用项目列表或分类的方式清晰呈现。|
| 2.3 | 如果是内容的辅助说明，请使用“说明/注意/警告”式样。 |
| **3** | **表格** |
| 3.1 | 表格有表头，表格无内容用“不涉及/无”，不出现空白的单元格。 |
| **4** | **截图** |
| 4.1 | 图形逻辑清晰，图文配合使用。 |
| 4.2 | 建议为.png格式。 |
| 4.3 | 中文图用中文，英文图用英文。 |

## 架构图

_【写作要求】**可选**_

| 要求项 | 内容要求 |
| -------- | -------- |
| 1 | 使用架构图说明该系统/模块架构，对架构中的主要组成部分进行必要的解释说明。 |
| 2 | 如果本模块只是子系统的一部分，需要理解子系统相关概念，给出**请参考xxx**。 |

## 代码目录

_【写作要求】  **必选** ，**明确本项目仓的代码**目录结构**以及对应目录的**功能描述。_

```tree
├── include                 # 框架代码
│   ├── tkl_mutex.h         # 头文件目录
│   ├── tkl_adc.h
├── src
│   ├── tkl_mutex.c
│   ├── tkl_adc.c
├── tools
│   └── test-tools.py      # 工具类
```

## 使用限制

_【写作要求】  **可选**，明确子系统运行的必要条件，如指定操作系统的固定版本。_

| 要求项 | 内容要求 |
| -------- | -------- |
| 1 | 明确功能限制或操作限制。 |
| 2 | 约束对指导任务开发有影响。 |

## 开发指南

_【写作要求】  **可选**_

| 要求项 | 内容要求 |
| -------- | -------- |
| **1** | **如何写好步骤** |
| 1.1 | 步骤完整：提供必需的步骤，保证操作可顺利完成。 |
| 1.2 | 任务句式：使用“动词+名词”句式。 |
| 1.3 | 明确目的：明确该步骤的目的，即想达成什么目标。 |
| 1.4 | 步骤执行完成后，给出操作是否成功的标准。 |
| **2** | **如何写好代码段** |
| 2.1 | 确保代码正确可执行。 |
| 2.2 | 关键步骤有清晰的注释说明。 |


## 接口说明

_【写作要求】 **可选**，提供本仓库提供的API接口链接。_

## 相关仓

_【写作要求】  **可选**，列出和当前系统/模块有强相关的关联仓链接，方便开发者进一步深入学习。_
