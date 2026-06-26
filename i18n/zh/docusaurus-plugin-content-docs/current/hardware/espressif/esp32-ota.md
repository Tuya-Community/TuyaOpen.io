---
title: "ESP32 OTA 固件升级"
---

# ESP32 OTA 固件升级

本文以 ESP32 为例，介绍如何通过涂鸦 IoT 平台对 TuyaOpen 项目进行远程 OTA 升级，流程分为：创建固件 key → 写入固件 → 上传新版本 → 固件上架 → 配置升级规则 → 验证 → 发布。

## 前提条件

- 已完成 [ESP32 快速开始](esp32-quick-start)
- 设备已接入涂鸦云（UUID / AuthKey 已配置）

## 第一步：创建固件 key

固件 key 是平台侧标识一款固件的唯一标识，同一个产品（PID）下可以创建多个固件 key，分别对应不同的硬件变体或固件分支。

1. 登录 [涂鸦 IoT 平台](https://iot.tuya.com)，进入对应产品的 **产品开发 > 硬件开发** 页面。
2. 选择云端接入方式和接入硬件模组。

![选择云端接入方式和硬件模组](https://images.tuyacn.com/fe-static/docs/img/20125351-2c46-4fd5-820e-7445f66a6684.png)

   - **云端接入方式**：选择 **TuyaOS** 或 **TuyaOS AI**。
   - **接入硬件**：若使用涂鸦 ESP32 模组，从硬件列表中选择对应的模组方案；若使用自定义模组，可不选。

   :::info
   如需从涂鸦采购 ESP32 模组，但列表中暂未显示 ESP32 选项，请联系您的涂鸦商务，申请开通账号白名单后即可在列表中选择 ESP32 模组。
   :::

3. 单击 **新增自定义固件**。

   - 若已选择涂鸦 ESP32 模组，在对应模组方案所在行单击 **新增自定义固件**。
   - 若使用自定义 ESP32 模组，在自定义固件那一栏单击 **新增自定义固件**。

4. 填写固件基本信息，单击 **确认**，平台自动生成一个 **固件 key**。

![填写固件信息生成固件 key](https://images.tuyacn.com/fe-static/docs/img/e97d5834-0570-4de4-af3e-83007b5fc8f8.png)

   - **固件名称**：可自定义。
   - **固件类型**：选择 **模组固件（直连）**。
   - **联网方式**：选择 **Wi-Fi**。
   - 自定义硬件不支持涂鸦生产解决方案。

5. 复制生成的固件 key，后续需要写入固件代码中。

## 第二步：将固件 key 写入固件

:::info
`firmware_key` 不是必填项。不设置时，平台默认一个 PID 下只有一个固件，OTA 升级时无需区分。

如果同一个 PID 下存在多个不同 key 的固件（例如同一产品有多款硬件平台的产品，如 ESP32-S3、ESP32-C3 等），则必须在固件中设置 `firmware_key`，让设备上报自己的固件 key。否则平台无法判断该把哪个固件推给哪台设备，升级会出现问题。
:::

1. 在 `tuya_config.h`（或对应 app 的配置头文件）中定义固件 key：

```c
#define TUYA_DEVICE_FIRMWAREKEY   "your_firmware_key_here"
```

2. 在 `tuya_main.c` 中，找到 `tuya_iot_init` 调用，添加 `firmware_key` 字段：

```c
ret = tuya_iot_init(&ai_client, &(const tuya_iot_config_t){
    .software_ver = PROJECT_VERSION,
    .productkey   = TUYA_PRODUCT_ID,
    .uuid         = license.uuid,
    .authkey      = license.authkey,
    .firmware_key = TUYA_DEVICE_FIRMWAREKEY,   // ← 添加此行
    .event_handler = user_event_handler_on,
    .network_check = user_network_check,
});
```

3. 修改固件版本号。

   OTA 升级遵循「低版本升高版本」的规则，新固件的版本号必须高于设备当前运行的版本号，否则平台不会下发升级。

   执行以下命令进入配置菜单：

   ```bash
   tos.py config menu
   ```

   进入 **Configure Project** 子页面，找到 `PROJECT_VERSION` 并修改为更高的版本号，格式为 `"xx.xx.xx"`（例如 `"1.0.1"`）。

4. 执行 `tos.py clean -f` 后重新编译并烧录固件。

## 第三步：上传新固件版本

1. 在左侧导航栏中，选择 **产品 > 设备 > 固件管理**。
2. 找到对应固件 key，单击 **新增固件版本**。

![新建固件版本入口](https://images.tuyacn.com/content-platform/hestia/1624343923370f441e9c6.png)

3. 填写版本号和版本说明，将编译生成的固件文件逐一上传。TuyaOpen ESP32 固件包含以下三种类型，可按文件名区分：

   | 固件类型 | 文件名特征 | 说明 |
   |----------|-----------|------|
   | 生产固件 | 文件名含 `QIO` | 用于工厂整片烧录 |
   | 用户区固件 | 文件名含 `UA` | 用于工厂分区烧录 |
   | 升级固件 | 文件名含 `UG` | 用于 OTA 远程升级 |

   :::info
   TuyaOpen 固件目前不支持差分升级，请上传完整固件包。
   :::

![填写固件版本信息](https://images.tuyacn.com/content-platform/hestia/1624343977c6b66ae1edd.png)

4. 单击 **保存**，完成固件版本创建（此时状态为 **未上架**）。

## 第四步：固件版本上架

固件版本创建后默认为未上架状态，需要上架后才能用于 OTA 升级。

1. 在固件版本列表中，找到刚上传的版本，单击 **固件上架**。
2. 上架内容勾选 **升级固件**，设置允许使用范围（默认不限范围即可）。
3. 确认上架，版本状态变为 **已上架**。

![上架固件版本](https://images.tuyacn.com/content-platform/hestia/16608049985a9bd8165bb.png)

## 第五步：配置升级规则

1. 在左侧导航栏中，选择 **产品 > 设备 > 固件 OTA**。
2. 在 **固件包来源** 中选择属性为 **自定义上传** 的固件。
3. 单击 **新建固件升级**，进入配置页面：

![新建固件升级](https://images.tuyacn.com/content-platform/hestia/166080503262712f23a9c.png)

| 参数 | 说明 |
|------|------|
| 固件版本 | 选择刚上架的新版本 |
| 升级方式 | App 提醒升级 / App 强制升级 / App 检测升级 |
| 待升级版本号 | 选择需要被升级的旧版本（默认全选低版本） |
| 待升级地区 | 选择覆盖地区（默认全选） |

![配置升级规则](https://images.tuyacn.com/content-platform/hestia/16608050678b16c3fa5b1.png)

4. 配置完成后单击 **确认**，平台生成一条升级记录。

## 第六步：验证

发布前建议先用测试设备验证 OTA 流程。

1. 单击 **常用验证设备**，通过 App 账号或设备 ID 添加测试设备到白名单。
2. 单击 **验证**，将固件推送至测试设备。
3. 单击 **验证是否完成升级**，确认设备已成功升级到新版本。

![验证固件升级](https://images.tuyacn.com/content-platform/hestia/1653462857efedb5699fa.png)

## 第七步：发布

测试验证通过后，单击 **发布** 进行正式推送。

- **灰度发布**：先推送一小部分设备（建议从 5% 开始），观察升级数据正常后再逐步扩大比例至 100%。
- **全量发布**：直接向所有符合条件的设备推送。

![发布固件升级](https://images.tuyacn.com/content-platform/hestia/1653462927a0aa85f1501.png)

:::warning
建议优先使用灰度发布。若发布后发现固件问题，可随时暂停发布，排查完成后再恢复。
:::

升级发布后，可在 **升级设备明细** 中查看各设备的升级状态。

## 参考资料

- [固件升级](../../quick-start/firmware-ota)
- [设备授权](../../quick-start/equipment-authorization)
- [ESP32 快速开始](esp32-quick-start)
- [涂鸦 IoT 平台固件升级文档](https://developer.tuya.com/cn/docs/iot/firmware-upgrade-operation-guide?id=K93ixsft1w3to)
