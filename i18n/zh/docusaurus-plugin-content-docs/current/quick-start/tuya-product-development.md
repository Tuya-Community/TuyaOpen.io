---
title: "Tuya 产品开发"
description: "介绍如何在涂鸦 IoT 平台创建自己的产品、获取全局唯一 PID 并写入固件，覆盖数据点 DP、App 面板与 OTA 通道配置。"
keywords:
  - TuyaOpen
  - Tuya产品开发
  - PID
  - 涂鸦云
  - IoT平台
---

每台接入涂鸦云的设备都必须拥有一个 **PID（Product ID）**——由涂鸦 IoT 平台分配的全局唯一标识符。PID 将设备与一组特定能力绑定：数据点（DP）定义、App 控制面板、OTA 通道等。本文将创建你自己的产品、获取 PID，并将该 PID 写入固件。

## 为什么要创建自己的产品

TuyaOpen 在演示配置中内置了一个默认 PID，便于你快速让硬件上线。但这个 PID 归属于涂鸦官方账号，**不在你的控制之下**，这意味着：

| 功能 | 默认 PID | 自建 PID |
|------|----------|----------|
| 设备连接云端 | ✅ | ✅ |
| 添加 / 修改 DP 功能 | ❌ | ✅ |
| 自定义 App 控制面板 | ❌ | ✅ |
| 配置固件 OTA | ❌ | ✅ |
| 管理设备授权码 | ❌ | ✅ |
| 量产与认证 | ❌ | ✅ |

**建议**：验证完基本的硬件连通性后，在涂鸦 IoT 平台创建自己的产品，并将 PID 写入固件。后续的所有开发和测试都应使用自己的产品。

## 创建产品

### 前提条件

- 已注册 [涂鸦 IoT 平台](https://iot.tuya.com) 账号

### 操作步骤

**第 1 步 — 打开创建产品页面**

登录后，在控制台首页点击 **创建产品**。

![点击创建产品](https://images.tuyacn.com/content-platform/hestia/1742810594d27bc107e2e.png)

**第 2 步 — 选择产品品类**

在标准品类树中浏览，或使用搜索框查找与你产品匹配的品类。

![浏览品类树](https://images.tuyacn.com/content-platform/hestia/17428108121c89e1bac64.png)

![搜索品类](https://images.tuyacn.com/content-platform/hestia/174281117307134354dd9.png)

**第 3 步 — 选择智能化方式**

选择 **产品开发**。

![选择智能化方式](https://images.tuyacn.com/content-platform/hestia/16457588779c37fc47179.png)

**第 4 步 — 选择产品方案**

选择 **自定义方案**。自定义方案适用于 TuyaOpen——你自行编写应用逻辑、需要最大灵活度。

![选择产品方案](https://images.tuyacn.com/content-platform/hestia/1742812690bbef34418ad.png)

**第 5 步 — 填写产品信息**

| 字段 | 说明 |
|------|------|
| 产品名称 | 建议格式：品牌 + 产品 + 模组，例如 `MyBrand Smart Plug T5AI` |
| 通讯协议 | 与硬件匹配——Wi-Fi、以太网等 |
| 功耗类型 | 市电供电设备选择 **有源** |
| 其余字段 | 选填，可后续补充 |

点击 **创建产品**，平台为你的产品生成唯一 PID。

**第 6 步 — 复制 PID**

打开产品详情页，在 **硬件开发** 或 **基本信息** 区域可看到 **产品 ID（PID）**。

:::tip
PID 是一段字母数字组合的字符串，例如 `kh0hig0fdtlzndvg`。
:::

## 将 PID 写入固件

**方法一 — 通过 menuconfig（推荐）**

在 **应用工程根目录** 下执行：

```bash
tos.py config menu
```

找到 `TUYA_PRODUCT_ID` 配置项，填入你的 PID 并保存。

**方法二 — 直接编辑配置文件**

编辑 `your_chat_bot/app_default.config`（或对应 app 的配置文件）：

```ini
CONFIG_TUYA_PRODUCT_ID="your_pid_here"
```

保存后重新编译并烧录。

:::note
修改任何 `.config` 文件后，都需要先执行 `tos.py clean -f` 进行干净构建，更改才会写入设备。
:::

## 下一步

创建产品后，完整的开发流程如下：

- **功能定义** — 在涂鸦 IoT 平台定义产品的数据点（DP），描述设备能力（[功能定义](https://developer.tuya.com/cn/docs/iot/define-product-features?id=K97vug7wgxpoq)）
- **设备面板** — 配置或自定义 App 控制面板（[设备面板](https://developer.tuya.com/cn/docs/iot/app-ui-design?id=K914jpghswnq0)）
- **硬件与嵌入式开发** — 设计硬件电路并基于 TuyaOpen 开发固件
- **验证固件升级** — 验证设备 OTA 升级功能（[验证固件升级](firmware-ota)）
- **产品配置** — 配置云端参数、定时、联动等产品功能（[产品配置](https://developer.tuya.com/cn/docs/iot/product-configuration?id=K97vxa8ef6gig)）
- **产品测试** — 使用涂鸦平台工具验证设备连接、功能和稳定性（[产品测试](https://developer.tuya.com/cn/docs/iot/test-services?id=Ka5crghsvztpq)）

## 参考资料

- [涂鸦 IoT 平台 — 平台配置](https://developer.tuya.com/cn/docs/iot/configure-in-platforms?id=Ka5k7v9absls7)
- [涂鸦 IoT 平台 — 创建产品](https://developer.tuya.com/cn/docs/iot/create-product?id=K914jp1ijtsfe)
