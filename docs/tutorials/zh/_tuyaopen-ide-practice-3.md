本实战转向**界面**——用涂鸦的小程序技术做一个设备控制面板，跑在手机 App 里，和固件通过 **DP（数据点）** 联动。两者通过 DP 协作：固件定义并上报 DP，面板读取/下发 DP。

<section id="dp-model" className="section">

## DP 协作模型

固件和面板是两个独立程序，靠 DP 通信：

- **固件端**：在 TuyaOpen IDE 里定义 DP（如 `switch_led`）并上报。
- **面板端**：用小程序 API（`publishDps` 下发、`onDpDataChange` 监听）控制设备。

:::note
**前置条件**：至少有一台能连涂鸦云的设备。请先在 [实战二](/learn/tuyaopen-ide-practice-2) 中完成。
:::

</section>

<section id="step-1" className="section">

## 第一步：账号产品

1. 进入**小程序面板开发**，按照右侧提示进行 3 步操作。

   ![小程序面板开发——三步操作](/img/ide/get-started/miniapp-panel-dev-three-steps-zh.png)

2. 完成实战二后已经登录账号并绑定产品，现在去开发者平台创建小程序，进行小程序绑定。

   ![在开发者平台创建小程序](/img/ide/get-started/developer-platform-create-miniapp-zh.png)

3. 新建小程序面板。

   ![新建小程序面板](/img/ide/get-started/create-miniapp-panel-zh.png)

4. 选择**面板小程序**类型。

   ![选择面板小程序类型](/img/ide/get-started/select-panel-miniapp-type-zh.png)

5. 新建成功后关闭页面，回到 IDE 点击**更新**，即可看到刚刚在开发者网页新建的面板小程序，点击**绑定**。

   ![绑定面板小程序](/img/ide/get-started/bind-panel-miniapp-zh.png)

</section>

<section id="step-2" className="section">

## 第二步：调试预览

1. 在右侧「调试与预览」中点击**构建小程序**，构建并渲染面板，即可在下方看到面板显示在虚拟设备上。

   ![小程序调试与预览](/img/ide/get-started/miniapp-debug-and-preview-zh.png)

2. 左侧对虚拟面板点击即可交互，右侧是虚拟设备交互的 DP 点数据。

   ![虚拟面板与 DP 交互](/img/ide/get-started/virtual-panel-dp-interaction-zh.png)

3. 现在就可以对小程序代码进行个性化修改，修改完成后重新构建和渲染预览面板效果。安装 IDE 提供的 skills 加速开发，见 [Vibe Coding 技能](/learn/tuyaopen-ide-vibe-coding)。

</section>

<section id="step-3" className="section">

## 第三步：上传发布

1. 点击右侧的**上传到云端**，先把小程序上传到云端；上传成功后再去涂鸦开发者平台提审发布。

   ![上传小程序到云端](/img/ide/get-started/miniapp-upload-to-cloud-zh.png)

2. 打开**基础设置**，填写小程序介绍、英文展示名称，并上传预览图片。

   ![面板基础设置——介绍与预览图](/img/ide/get-started/panel-basic-settings-intro-zh.png)

3. 打开**版本管理**，提交审核。

   ![版本管理——提交审核](/img/ide/get-started/panel-version-management-submit-zh.png)

4. 打开审核版本并等待审核。几分钟后刷新页面，即可看到审核通过，点击发布。

   ![审核通过——发布](/img/ide/get-started/panel-review-approved-publish-zh.png)

</section>

<section id="step-4" className="section">

## 第四步：把小程序绑定到产品

小程序开发完成后，想要在 App 端使用面板，需要把它绑定到产品。

1. 回到 IDE，打开**项目详情**，点击**换绑小程序**。

   ![项目详情中换绑小程序](/img/ide/get-started/project-details-rebind-miniapp-zh.png)

2. 点击**重选面板**，选择自定义面板。

   ![在 IDE 中重选自定义面板](/img/ide/get-started/ide-reselect-custom-panel-zh.png)

3. 选择自定义面板，即可看到刚发布的小程序面板。

   ![智能生活 App 中的自定义面板](/img/ide/get-started/smartlife-app-custom-panel-zh.png)

4. 即可在智能生活 App 中看到最新的面板。

</section>

<section id="next" className="section">

## 去哪里深入学习

| 想做什么 | 去这里 |
| --- | --- |
| 用 AI 加速开发 | [Vibe Coding 技能](/learn/tuyaopen-ide-vibe-coding) |
| 自建云端 Agent | [Agent 开发指南](/learn/tuyaopen-ide-agent-dev) |
| 开发设备控制面板 | [面板小程序官方门户](https://developer.tuya.com/cn/panel-miniapp) |
| 学小程序技术体系 / API | [Tuya MiniApp 文档总站](https://developer.tuya.com/en/miniapp/) |
| 用零代码搭面板 | [面板工作台 Panel Studio](https://developer.tuya.com/cn/panel-studio) |

</section>
