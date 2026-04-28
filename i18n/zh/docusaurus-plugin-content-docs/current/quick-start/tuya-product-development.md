---
title: "Tuya 产品开发"
---

# Tuya 产品开发

设备要接入涂鸦云，必须持有一个由涂鸦 IoT 平台签发的 **PID（Product ID）**。PID 是产品的全局唯一标识符，它将设备与平台上的功能定义、面板配置、OTA 通道等一系列能力绑定在一起。

## 为什么要自己创建产品

TuyaOpen 项目的默认配置中内置了一个演示用 PID，方便开发者快速验证硬件和联网功能。但这个 PID 归属于涂鸦官方账号，**不在你的控制之下**，因此存在以下限制：

| 功能 | 使用默认 PID | 使用自建 PID |
|------|------------|------------|
| 设备联网上线 | ✅ | ✅ |
| 添加 / 修改 DP 功能 | ❌ | ✅ |
| 更换 App 控制面板 | ❌ | ✅ |
| 配置固件 OTA 升级 | ❌ | ✅ |
| 管理设备授权码 | ❌ | ✅ |
| 量产和认证流程 | ❌ | ✅ |

**建议**：在完成最初的硬件连通测试后，立即在涂鸦 IoT 平台为自己的项目创建产品，将 PID 写入固件，后续的所有开发和测试都基于自己的产品进行。

## 创建产品

### 前提条件

- 注册并登录 [涂鸦 IoT 平台](https://iot.tuya.com)

### 操作步骤

**第 1 步 — 进入创建产品页面**

登录后，在控制台首页点击 **创建产品**，进入产品品类选择页面。

![点击创建产品](https://images.tuyacn.com/content-platform/hestia/1742810594d27bc107e2e.png)

**第 2 步 — 选择产品品类**

根据你的产品类型，在标准类目中逐级选择，或使用搜索框直接定位品类。

![按品类逐级选择](https://images.tuyacn.com/content-platform/hestia/17428108121c89e1bac64.png)

![通过搜索框查找品类](https://images.tuyacn.com/content-platform/hestia/174281117307134354dd9.png)

**第 3 步 — 选择智能化方式**

选择 **产品开发**。

![选择智能化方式](https://images.tuyacn.com/content-platform/hestia/16457588779c37fc47179.png)

**第 4 步 — 选择产品方案**

选择 **自定义方案**。自定义方案适用于 TuyaOpen 这类自行编写应用逻辑的开发框架，灵活度最高。

![选择产品方案](https://images.tuyacn.com/content-platform/hestia/1742812690bbef34418ad.png)

**第 5 步 — 填写产品信息**

![填写产品信息](https://images.tuyacn.com/content-platform/hestia/164601696442075f3defa.png)

| 字段 | 说明 |
|------|------|
| 产品名称 | 建议格式：品牌 + 产品 + 模组型号，例如 `MyBrand 智能插座 T5AI` |
| 通讯协议 | 根据硬件选择，如 Wi-Fi、以太网 |
| 功耗类型 | 有源设备选"有源" |
| 其余字段 | 选填，可后续补充 |

填写完成后点击 **创建产品**，平台自动为该产品生成唯一 PID。

**第 6 步 — 获取 PID**

产品创建完成后，进入产品详情页，在 **硬件开发** 或 **基本信息** 区域可以看到 **产品 ID（PID）** 字段，复制备用。

:::tip
PID 格式为一段字母数字组合的字符串，例如 `kh0hig0fdtlzndvg`。
:::

## 将 PID 写入固件

获取 PID 后，将其配置到 TuyaOpen 项目的设备授权文件中。

### 方法一：通过配置文件设置（推荐）

在**应用工程根目录**下执行：

```bash
tos.py config menu
```

找到 `TUYA_PRODUCT_ID` 配置项，填入你的 PID 并保存。

### 方法二：直接修改配置文件

编辑 `your_chat_bot/app_default.config`（或对应 app 的 config 文件）：

```ini
CONFIG_TUYA_PRODUCT_ID="你的PID"
```

修改后重新编译并烧录固件即可生效。

:::note
每次修改 `.config` 文件后，需先执行 `tos.py clean -f` 清理，再重新编译固件，更改才会写入设备。
:::

## 下一步

创建产品后，完整的产品开发流程如下：

- **功能定义** — 在涂鸦 IoT 平台定义产品的数据点（DP），描述设备能力（[功能定义](https://developer.tuya.com/cn/docs/iot/define-product-features?id=K97vug7wgxpoq)）
- **设备面板** — 配置或自定义 App 控制面板（[设备面板](https://developer.tuya.com/cn/docs/iot/app-ui-design?id=K914jpghswnq0)）
- **硬件开发和嵌入式开发** — 基于 TuyaOpen 完成硬件电路和固件开发
- **验证固件升级** — 验证设备 OTA 升级功能（[验证固件升级](firmware-ota)）
- **产品配置** — 配置云端参数、定时、联动等产品功能（[产品配置](https://developer.tuya.com/cn/docs/iot/product-configuration?id=K97vxa8ef6gig)）
- **产品测试** — 使用涂鸦平台工具验证设备连接、功能和稳定性（[产品测试](https://developer.tuya.com/cn/docs/iot/test-services?id=Ka5crghsvztpq)）

## 参考资料

- [涂鸦 IoT 平台 — 平台配置](https://developer.tuya.com/cn/docs/iot/configure-in-platforms?id=Ka5k7v9absls7)
- [涂鸦 IoT 平台 — 创建产品](https://developer.tuya.com/cn/docs/iot/create-product?id=K914jp1ijtsfe)
