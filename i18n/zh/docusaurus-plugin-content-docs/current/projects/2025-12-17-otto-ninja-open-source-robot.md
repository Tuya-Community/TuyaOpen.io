---
title: "Otto Ninja 机器人"
date: 2025-12-27
---

<BackToProjects />

# Otto Ninja 开源机器人

![Otto Ninja](https://images.tuyacn.com/fe-static/docs/img/0cd58a4c-eaf9-40f8-88fa-4f46d17cb833.png)

## 一、项目概述

Otto Ninja 是一款基于 **Otto DIY 开源生态**开发的双模式智能机器人，核心支持 **“步行模式” 与 “轮式竞速模式” 一键切换**，专为创客、学生及机器人爱好者设计。

项目具备三大核心优势：

1. **低门槛制作**：全 3D 打印结构，部件易组装，物料采购渠道明确；
2. **全栈开源**：软硬件代码、硬件原理图、3D 模型文件完全开放，支持二次开源；
3. **功能丰富**：适配 GC9D01 显示驱动，集成语音交互、姿态控制功能，可扩展传感器。

## 安装演示教程

[OttoNinja安装演示教程]( https://b23.tv/dKEJ69n)

## 二、核心资源清单

### 1. 代码仓库（Tuya Open 平台）

* **主代码库**（含核心逻辑与驱动）

  [TuyaO](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[pen/a](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[pps/t](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[uya.a](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[i/you](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[r\_ott](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[o\_rob](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[ot/sr](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[c/ott](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[o\_nin](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[ja](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)

* **关键代码文件说明**

| 文件名                        | 功能描述                       |
| -------------------------- | -------------------------- |
| `otto_ninja_main.c/h`      | 机器人主控制逻辑（模式切换、运动调度）        |
| `otto_ninja_app_servo.c/h` | 舵机驱动程序（360°/180° 舵机协同控制）   |
| `gc9d01_display.c/h`       | GC9D01 显示驱动（OLED 屏数据渲染与显示） |



* **快速入门文档**

  https://github.com/tuya/TuyaOpen/blob/master/apps/tuya.ai/your_otto_robot/README.md（含环境搭建、代码编译教程）
  
  

### 2. 硬件开源资源

* **原理图与 PCB 设计**（立创 EDA 平台）

  [Ott](https://u.lceda.cn/account/user/projects/index/detail?project=9feb90ca4cc240cbbfb7a8fb8ee11584\&listType=all)[o Nin](https://u.lceda.cn/account/user/projects/index/detail?project=9feb90ca4cc240cbbfb7a8fb8ee11584\&listType=all)[ja 硬件](https://u.lceda.cn/account/user/projects/index/detail?project=9feb90ca4cc240cbbfb7a8fb8ee11584\&listType=all)[项目](https://oshwhub.com/robben.wang/ottorobot_ninja)

> 说明：包含主控模块、舵机接口、显示屏接口、电源管理模块的完整设计，支持直接导出生产文件。

### 3. 3D 打印模型文件

* **模型仓库地址**

  [Tu](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[yaOpe](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[n/app](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[s/tuy](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[a.ai/](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[your\_](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[otto\_](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[robot](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[/src/](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[otto\_](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[ninja](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[/3D\_M](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)[odels](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)（建议进入后跳转至 “3D\_Models” 子目录下载）

* **包含文件清单**

| 文件类型    | 具体部件                | 用途                     |
| ------- | ------------------- | ---------------------- |
| STL 格式  | 头部外壳、四肢关节、安装底板、脚轮支架 | 直接用于 3D 打印（推荐层高 0.2mm） |
| STEP 格式 | OTTO NINJA.step     | 可编辑的 CAD 源文件（修改结构用）    |
| 辅助部件    | 模块化眼板、忍者装饰带         | 外观美化与功能扩展              |

## 三、物料清单（BOM）

| 组件名称    | 规格参数（关键参数补充）                    | 数量 | 采购链接                                                     | 备注                                 |
| ----------- | ------------------------------------------- | ---- | ------------------------------------------------------------ | ------------------------------------ |
| 橡胶密封圈  | O 型圈、70*5(5个）                          | 按需 | [淘宝链](https://e.tb.cn/h.SwzLdCs7xnQF7FB?tk=ajRffNdG3MQ)[接](https://e.tb.cn/h.SwzLdCs7xnQF7FB?tk=ajRffNdG3MQ) | 用于轮足                             |
| 舵机        | 360° 舵机（MG90S）+ 180° 舵机（MG90S）      | 4 个 | [淘宝链接](https://item.taobao.com/item.htm?id=39376480811)  | 360° 用于轮式驱动，180° 用于步行关节 |
| OLED 显示屏 | 0.71寸-插接12P、SPI接口、适配 GC9D01、      | 1 块 | [淘宝链接](https://item.taobao.com/item.htm?id=866988150753) | 显示姿态数据、交互信息               |
| 电池组件    | 3.7V锂电池  、1.25mm 红黑端子插头           | 1 套 | 淘宝购买                                                     | 建议选择带保护板的锂电池             |
| 麦克风模块  | 6027 型号、模拟信号、1.25mm 端子、IP65 防水 | 1 个 | [淘宝链](https://item.taobao.com/item.htm?id=764269727410)[接](https://item.taobao.com/item.htm?id=764269727410) | 用于语音交互功能                     |
| 主控板      | T5 OTTO开发板/整套材料                      | 1 块 | [淘宝链](https://item.taobao.com/item.htm?id=764269727410)[接](https://tuyasmart.taobao.com/?spm=a1z10.5-c-s.0.0.223d5cb0RYr5fX) | 整体材料                             |

> 备注：物料数量可根据打印模型版本调整，建议首次制作按 “1 套” 采购，预留 1-2 个易损件（如舵机、密封圈）。

## 四、核心功能与特点

### 1. 双模式运动系统

| 模式类型   | 控制逻辑                     | 适用场景          |
| ------ | ------------------------ | ------------- |
| 步行模式   | 180° 舵机控制四肢关节，模拟 “步行” 姿态 | 复杂地形（如桌面、地毯）  |
| 轮式竞速模式 | 360° 舵机驱动脚轮，实现高速直线 / 转向  | 平坦地面（如木地板、瓷砖） |

> 切换方式：通过 App 控制界面一键切换，或代码中配置快捷键触发。

### 2. 模块化扩展能力

* **传感器扩展**：

* **外观定制**：3D 打印部件支持个性化修改（如更换头部造型、添加装饰件）；

* **功能新增**：代码支持自定义逻辑（如添加 “跟随模式”“避障模式”）。

### 3. 开源兼容性

* **平台适配**：基于 Tuya Open Platform 开发，支持对接涂鸦 IoT 生态（如语音助手、App 远程控制）；
* **社区支持**：可接入 Otto DIY 全球社区，获取更多创意案例与技术支持。

## 五、快速上手指南

### 1. 安装与组装

* **3D 打印准备**：使用 PLA 材料，层高 0.2mm，填充率 20%-30%，打印所有 STL 部件（建议先打印 “测试件” 验证尺寸）；

* **组装教程**：参考视频演示 [Ott](https://b23.tv/dKEJ69n)[o Nin](https://b23.tv/dKEJ69n)[ja 安装](https://b23.tv/dKEJ69n)[演示教程](https://b23.tv/dKEJ69n)（关键步骤：舵机校准→四肢组装→主控板固定→显示屏安装）；

* **校准要点**：组装后需通过代码校准舵机中立点，避免运动偏移（校准方法见 README 文档）。

### 2. 固件烧录与配网

#### 步骤 1：固件烧录授权

1. 下载并安装 [Tyut](https://developer.tuya.com/cn/docs/developer/windows_tyutool_gui?id=Kew1ks0xuct2p)[ool 工](https://developer.tuya.com/cn/docs/developer/windows_tyutool_gui?id=Kew1ks0xuct2p)[具（Win](https://developer.tuya.com/cn/docs/developer/windows_tyutool_gui?id=Kew1ks0xuct2p)[dows](https://developer.tuya.com/cn/docs/developer/windows_tyutool_gui?id=Kew1ks0xuct2p)[ 版）](https://developer.tuya.com/cn/docs/developer/windows_tyutool_gui?id=Kew1ks0xuct2p)；

2. 连接主控板与电脑（USB 线），选择 “Otto Ninja 固件”（项目编译获得固件）；

3. 按照工具提示完成授权与烧录（需提前在涂鸦开发者平台创建项目，获取授权信息）。

#### 步骤 2：App 配网与控制

1. 下载 “涂鸦智能” App（或项目定制 App），注册并登录；

2. 进入 App 配网页面，选择 “自动发现设备”（确保主控板处于配网模式）；

3. 配网成功后，进入控制界面：

* 轮盘：控制机器人前进 / 后退 / 转向；

* 模式切换按钮：点击切换 “步行”/“轮式” 模式；

  

## 六、开源协议与声明

* **开源协议**：遵循 **CC BY-NC-SA 4.0 协议**（允许非商业使用、修改与分享，需注明原作者并以相同协议开源）；

* **适配平台**：Tuya Open Platform（需遵守平台开发者规范）；

* **更新时间**：2025-12-06（后续更新将同步至代码仓库 “CHANGELOG.md” 文件）；

* **作者信息**：由 Robben 基于 Otto DIY 开源项目优化，原作者包括 Sebastian Coddington、txp666 等（致谢所有贡献者）；

* **免责声明**：项目仅供学习与非商业使用，硬件制作需注意安全（如锂电池使用规范、舵机接线正确性）。

## 七、常见问题（FAQ）

1. **Q：舵机运动卡顿 / 偏移怎么办？**

   A：检查舵机接线是否正确（电源、信号脚），并通过代码重新校准中立点。

2. **Q：显示屏不亮如何排查？**

   A：确认 GC9D01 驱动代码已正确编译，检查显示屏接线（SDA/SCL 引脚是否与主控板匹配），尝试重新烧录固件。

   

