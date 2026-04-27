---
title: "ESP32 OTA Updates"
---

# ESP32 OTA Updates

This guide walks through performing a remote OTA firmware upgrade for a TuyaOpen ESP32 project on the Tuya IoT Platform. The process follows seven steps: create firmware key → write key into firmware → upload a new version → publish → configure upgrade rule → verify → release.

## Prerequisites

- Completed [ESP32 Quick Start](esp32-quick-start)
- Device connected to Tuya Cloud (UUID / AuthKey configured)

## Step 1: Create a Firmware Key

A firmware key uniquely identifies a firmware on the platform. A single product (PID) can have multiple firmware keys, each corresponding to a different hardware variant or firmware branch.

1. Log in to the [Tuya IoT Platform](https://iot.tuya.com) and go to your product's **Product Development > Hardware Development** page.
2. Select the cloud connection type and hardware module.

![Select cloud connection type and hardware module](/img/quick-start/hardware_develop_en.png)

   - **Cloud connection type**: Select **TuyaOS** or **TuyaOS AI**.
   - **Hardware module**: If you are using a Tuya ESP32 module, select the corresponding module from the hardware list. If you are using a custom module, this field can be left unselected.

   :::info
   If you want to order ESP32 modules from Tuya but the ESP32 option is not yet visible in the hardware list, contact your Tuya business manager to have your account added to the whitelist. Once whitelisted, the ESP32 module option will appear in the list.
   :::

3. Click **Add Custom Firmware**.

   - If you selected a Tuya ESP32 module, click **Add Custom Firmware** in the row of the selected module solution.
   - If you are using a custom ESP32 module, click **Add Custom Firmware** in the custom firmware row.

4. Fill in the firmware basic information and click **Confirm**. The platform generates a **firmware key**.

![Fill in firmware information to generate firmware key](/img/quick-start/edit_firmware_en.png)

   - **Firmware name**: Can be customized.
   - **Firmware type**: Select **Module Firmware (Direct Connect)**.
   - **Network type**: Select **Wi-Fi**.
   - Custom hardware does not support Tuya production solutions.

5. Copy the generated firmware key — you will need to embed it in your firmware code.

## Step 2: Write the Firmware Key into Firmware

:::info
Setting `firmware_key` is optional. If omitted, the platform assumes there is only one firmware per PID and no key distinction is needed during OTA.

If the same PID has multiple firmwares with different keys (for example, a product with multiple hardware platforms such as ESP32-S3, ESP32-C3, etc.), you must set `firmware_key` so the device reports its key to the platform. Without this, the platform cannot determine which firmware to push to which device, and OTA upgrades will not work correctly.
:::

1. Define the firmware key in `tuya_config.h` (or the equivalent config header for your app):

```c
#define TUYA_DEVICE_FIRMWAREKEY   "your_firmware_key_here"
```

2. In `tuya_main.c`, find the `tuya_iot_init` call and add the `firmware_key` field:

```c
ret = tuya_iot_init(&ai_client, &(const tuya_iot_config_t){
    .software_ver = PROJECT_VERSION,
    .productkey   = TUYA_PRODUCT_ID,
    .uuid         = license.uuid,
    .authkey      = license.authkey,
    .firmware_key = TUYA_DEVICE_FIRMWAREKEY,   // ← add this line
    .event_handler = user_event_handler_on,
    .network_check = user_network_check,
});
```

3. Update the firmware version number.

   OTA upgrades follow a "lower to higher version" rule — the new firmware version must be higher than the version currently running on the device, otherwise the platform will not push the upgrade.

   Run the following command to open the configuration menu:

   ```bash
   tos.py config menu
   ```

   Navigate to the **Configure Project** submenu, find `PROJECT_VERSION`, and set it to a higher version number. The format is `"xx.xx.xx"` (for example, `"1.0.1"`).

4. Run `tos.py clean -f`, then rebuild and re-flash the firmware.

## Step 3: Upload a New Firmware Version

1. In the left navigation, go to **Product > Device > Firmware Management**.
2. Find the corresponding firmware key and click **Add Firmware Version**.

![Add firmware version entry](https://images.tuyacn.com/content-platform/hestia/16608056095d8ab7fad88.png)

3. Fill in the version number and release notes, then upload the compiled firmware files one by one. TuyaOpen ESP32 produces three firmware types, identifiable by filename:

   | Firmware Type | Filename Pattern | Description |
   |---------------|-----------------|-------------|
   | Production firmware | Contains `QIO` | For full-chip factory flashing |
   | User-partition firmware | Contains `UA` | For partition-based factory flashing |
   | Upgrade firmware | Contains `UG` | For remote OTA upgrades |

   :::info
   TuyaOpen firmware does not currently support differential (delta) upgrades. Always upload the full firmware package.
   :::

![Fill in firmware version info](https://images.tuyacn.com/content-platform/hestia/1625197826c5068297e7a.png)

4. Click **Save**. The version is created with status **Unpublished**.

## Step 4: Publish the Firmware Version

Firmware versions are unpublished by default and must be published before they can be used for OTA.

1. In the firmware version list, find the newly uploaded version and click **Publish Firmware**.
2. Check **Upgrade Firmware** as the publish content and set the allowed usage scope (default: unrestricted).
3. Confirm. The version status changes to **Published**.

![Publish firmware version](https://images.tuyacn.com/content-platform/hestia/1660805709098031c1697.png)

## Step 5: Configure the Upgrade Rule

1. In the left navigation, go to **Product > Device > Firmware OTA**.
2. Under **Firmware Source**, select the firmware with the **Custom Upload** attribute.
3. Click **New Firmware Upgrade** and fill in the configuration:

![New firmware upgrade](https://images.tuyacn.com/content-platform/hestia/1660805737c0024a7a1a6.png)

| Parameter | Description |
|-----------|-------------|
| Firmware Version | Select the newly published version |
| Upgrade Method | App-prompted / App-forced / App-detected |
| Versions to Upgrade | Select the old versions to be upgraded (all lower versions selected by default) |
| Regions | Select target regions (all regions selected by default) |

![Configure upgrade rule](https://images.tuyacn.com/content-platform/hestia/166080576438794904dd9.png)

4. Click **Confirm**. An upgrade record is created.

## Step 6: Verify

It is recommended to verify the OTA flow on test devices before releasing to all users.

1. Click **Common Verification Devices** to add test devices to the whitelist via App account or device ID.
2. Click **Verify** to push the firmware to the test devices.
3. Click **Check Upgrade Completion** to confirm the devices have successfully upgraded to the new version.

![Verify firmware upgrade](https://images.tuyacn.com/content-platform/hestia/16569450854881eb8d1ca.png)

## Step 7: Release

After verification passes, click **Release** to push the upgrade.

- **Gradual rollout**: Push to a small percentage of devices first (5% is recommended), monitor upgrade data, and gradually increase to 100%.
- **Full rollout**: Push to all eligible devices immediately.

![Release firmware upgrade](https://images.tuyacn.com/content-platform/hestia/16569450850be8d138069.png)

:::warning
Gradual rollout is strongly recommended. If a firmware issue is found after release, you can pause the rollout at any time and resume after the issue is resolved.
:::

After release, check the **Upgrade Device Details** section to monitor the upgrade status per device.

## References

- [Firmware Upgrade](../../quick-start/firmware-ota)
- [Authorize Devices](../../quick-start/equipment-authorization)
- [ESP32 Quick Start](esp32-quick-start)
- [Tuya IoT Platform Firmware Upgrade Guide](https://developer.tuya.com/en/docs/iot/firmware-upgrade-operation-guide?id=K93ixsft1w3to)
