---
title: "小程序面板"
description: "做一个跑在手机 App 里、通过 DP 与固件联动的设备控制面板——创建、绑定、预览、发布。"
sidebar_label: "实战三 —— 小程序面板"
sidebar_position: 5
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - 嵌入式开发
---

本实战转向**界面**——用涂鸦的小程序技术做一个设备控制面板，跑在手机 App 里，和固件通过 **DP（数据点）** 联动。两者通过 DP 协作：固件定义并上报 DP，面板读取/下发 DP。

## DP 协作模型 {/* #dp-model */}

固件和面板是两个独立程序，靠 DP 通信：

- **固件端**：在 TuyaOpen IDE 里定义 DP（如 `switch_led`）并上报。
- **面板端**：用小程序 API（`publishDps` 下发、`onDpDataChange` 监听）控制设备。

:::note
**前置条件**：至少有一台能连涂鸦云的设备。请先在 [实战二](./chat-bot.md) 中完成。
:::

## 第一步：账号产品 {/* #step-1 */}

1. 进入**小程序面板开发**，按照右侧提示进行 3 步操作。

   ![小程序面板开发——三步操作](https://images.tuyacn.com/fe-static/docs/img/c64f5095-e11a-4f0e-b27a-fcf06a8f532d.png?imageMogr2/format/webp)

2. 完成实战二后已经登录账号并绑定产品，现在去开发者平台创建小程序，进行小程序绑定。

   ![在开发者平台创建小程序](https://images.tuyacn.com/fe-static/docs/img/d48d1ab2-25cf-4b51-a76a-ebf1694ddbb7.png?imageMogr2/format/webp)

3. 新建小程序面板。

   ![新建小程序面板](https://images.tuyacn.com/fe-static/docs/img/6cb88be0-d975-4b7b-9c8d-f45b47006ce1.png?imageMogr2/format/webp)

4. 选择**面板小程序**类型。

   ![选择面板小程序类型](https://images.tuyacn.com/fe-static/docs/img/6aef9b1e-caed-457c-9fd9-b830f1c27aff.png?imageMogr2/format/webp)

5. 新建成功后关闭页面，回到 IDE 点击**更新**，即可看到刚刚在开发者网页新建的面板小程序，点击**绑定**。

   ![绑定面板小程序](https://images.tuyacn.com/fe-static/docs/img/26a75ec1-055f-4646-857d-84b7e7cbc163.png?imageMogr2/format/webp)

## 第二步：调试预览 {/* #step-2 */}

1. 在右侧「调试与预览」中点击**构建小程序**，构建并渲染面板，即可在下方看到面板显示在虚拟设备上。

   ![小程序调试与预览](https://images.tuyacn.com/fe-static/docs/img/13c1c819-9ef0-4b96-bf30-af654dfd910c.png?imageMogr2/format/webp)

2. 左侧对虚拟面板点击即可交互，右侧是虚拟设备交互的 DP 点数据。

   ![虚拟面板与 DP 交互](https://images.tuyacn.com/fe-static/docs/img/57266da1-a46d-445a-a1ad-a8ec49012e20.png?imageMogr2/format/webp)

3. 现在就可以对小程序代码进行个性化修改，修改完成后重新构建和渲染预览面板效果。安装 IDE 提供的 skills 加速开发，见 [Vibe Coding 技能](./vibe-coding.md)。

## 第三步：上传发布 {/* #step-3 */}

1. 点击右侧的**上传到云端**，先把小程序上传到云端；上传成功后再去涂鸦开发者平台提审发布。

   ![上传小程序到云端](https://images.tuyacn.com/fe-static/docs/img/f8cceee6-5b28-4335-9c8b-fd7c383e4a48.png?imageMogr2/format/webp)

2. 打开**基础设置**，填写小程序介绍、英文展示名称，并上传预览图片。

   ![面板基础设置——介绍与预览图](https://images.tuyacn.com/fe-static/docs/img/89dbe447-7b91-478f-85b5-3b08965121cc.png?imageMogr2/format/webp)

3. 打开**版本管理**，提交审核。

   ![版本管理——提交审核](https://images.tuyacn.com/fe-static/docs/img/7807b6db-f884-4942-97b4-fba0927ca9a9.png?imageMogr2/format/webp)

4. 打开审核版本并等待审核。几分钟后刷新页面，即可看到审核通过，点击发布。

   ![审核通过——发布](https://images.tuyacn.com/fe-static/docs/img/45bdebe4-1fd1-4abe-b1a2-eb29bdc95c06.png?imageMogr2/format/webp)

## 第四步：把小程序绑定到产品 {/* #step-4 */}

小程序开发完成后，想要在 App 端使用面板，需要把它绑定到产品。

1. 回到 IDE，打开**项目详情**，点击**换绑小程序**。

   ![项目详情中换绑小程序](https://images.tuyacn.com/fe-static/docs/img/c28d074b-ca59-477c-8dd4-2ea6380196da.png?imageMogr2/format/webp)

2. 点击**重选面板**，选择自定义面板。

   ![在 IDE 中重选自定义面板](https://images.tuyacn.com/fe-static/docs/img/0edc6d15-8589-4d4a-9677-549bd666add1.png?imageMogr2/format/webp)

3. 选择自定义面板，即可看到刚发布的小程序面板。

   ![智能生活 App 中的自定义面板](https://images.tuyacn.com/fe-static/docs/img/241e8652-2bff-41d6-a5fc-ba7b7f8fec38.png?imageMogr2/format/webp)

4. 即可在智能生活 App 中看到最新的面板。

## 去哪里深入学习 {/* #next */}

| 想做什么 | 去这里 |
| --- | --- |
| 用 AI 加速开发 | [Vibe Coding 技能](./vibe-coding.md) |
| 自建云端 Agent | [Agent 开发指南](./agent-development.md) |
| 开发设备控制面板 | [面板小程序官方门户](https://developer.tuya.com/cn/panel-miniapp) |
| 学小程序技术体系 / API | [Tuya MiniApp 文档总站](https://developer.tuya.com/en/miniapp/) |
| 用零代码搭面板 | [面板工作台 Panel Studio](https://developer.tuya.com/cn/panel-studio) |

