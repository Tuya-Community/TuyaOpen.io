---
title: "Tuya Product Development"
---

# Tuya Product Development

Every device that connects to the Tuya Cloud must have a **PID (Product ID)** — a globally unique identifier assigned by the Tuya IoT Platform. The PID binds your device to a specific set of capabilities: data point (DP) definitions, App control panels, OTA channels, and more.

## Why Create Your Own Product

TuyaOpen ships with a default PID in its demo configuration so you can get your hardware online quickly. However, this PID belongs to Tuya's official account — it is **not under your control**, which means:

| Feature | Default PID | Your Own PID |
|---------|------------|--------------|
| Device connects to cloud | ✅ | ✅ |
| Add / modify DP functions | ❌ | ✅ |
| Customize App control panel | ❌ | ✅ |
| Configure firmware OTA | ❌ | ✅ |
| Manage device credentials | ❌ | ✅ |
| Mass production & certification | ❌ | ✅ |

**Recommendation**: Once you have verified basic hardware connectivity, create your own product on the Tuya IoT Platform and write the PID into your firmware. All subsequent development and testing should use your own product.

## Create a Product

### Prerequisites

- A registered account on the [Tuya IoT Platform](https://iot.tuya.com)

### Steps

**Step 1 — Open the Create Product page**

After logging in, click **Create Product** on the console home page.

![Click Create Product](https://images.tuyacn.com/content-platform/hestia/17428135827bbc5093763.png)

**Step 2 — Select a product category**

Browse the standard category tree or use the search box to find the category that matches your product.

![Browse category tree](https://images.tuyacn.com/content-platform/hestia/1742813665c8914847383.png)

![Search for a category](https://images.tuyacn.com/content-platform/hestia/17428137261919d4c3cad.png)

**Step 3 — Select the smart solution type**

Choose **Product Development**.

![Select smart mode](https://images.tuyacn.com/content-platform/hestia/1646129350bfc54f88c02.png)

**Step 4 — Select the product solution**

Choose **Custom Solution**. This is the appropriate choice for TuyaOpen, where you write your own application logic and need maximum flexibility.

![Select product solution](https://images.tuyacn.com/content-platform/hestia/17428138357c2ba3916f6.png)

**Step 5 — Fill in product information**

| Field | Notes |
|-------|-------|
| Product Name | Suggested format: Brand + Product + Module, e.g. `MyBrand Smart Plug T5AI` |
| Communication Protocol | Match your hardware — Wi-Fi, Ethernet, etc. |
| Power Type | Select **Powered** for mains-powered devices |
| Other fields | Optional; can be filled in later |

Click **Create Product**. The platform generates a unique PID for your product.

**Step 6 — Copy your PID**

Open the product detail page. The **Product ID (PID)** is shown in the **Hardware Development** or **Basic Information** section.

:::tip
A PID is an alphanumeric string, for example `kh0hig0fdtlzndvg`.
:::

## Write the PID into Firmware

**Option 1 — Via menuconfig (recommended)**

Run the following command in your **application project root directory**:

```bash
tos.py config menu
```

Find the `TUYA_PRODUCT_ID` option, enter your PID, and save.

**Option 2 — Edit the config file directly**

Edit `your_chat_bot/app_default.config` (or the config file for your app):

```ini
CONFIG_TUYA_PRODUCT_ID="your_pid_here"
```

Rebuild and re-flash after saving.

:::note
Any change to a `.config` file requires a clean build before it takes effect on the device: run `tos.py clean -f` first, then rebuild.
:::

## Next Steps

After creating your product, the full development workflow is:

- **Function Definition** — Define the product's data points (DPs) on the Tuya IoT Platform to describe device capabilities ([Function Definition](https://developer.tuya.com/en/docs/iot/define-product-features?id=K97vug7wgxpoq))
- **Device Panel** — Configure or customize the App control panel ([Device Panel](https://developer.tuya.com/en/docs/iot/app-ui-design?id=K914jpghswnq0))
- **Hardware & Embedded Development** — Design the hardware circuit and develop firmware with TuyaOpen
- **Verify Firmware Upgrade** — Verify the device OTA upgrade functionality ([Verify Firmware Upgrade](firmware-ota))
- **Product Configuration** — Set up cloud parameters, schedules, automations, and other product features ([Product Configuration](https://developer.tuya.com/en/docs/iot/product-configuration?id=K97vxa8ef6gig))
- **Product Testing** — Use Tuya platform tools to verify device connectivity, functionality, and stability ([Product Testing](https://developer.tuya.com/en/docs/iot/test-services?id=Ka5crghsvztpq))

## References

- [Tuya IoT Platform — Configure in Platform](https://developer.tuya.com/cn/docs/iot/configure-in-platforms?id=Ka5k7v9absls7)
- [Tuya IoT Platform — Create a Product](https://developer.tuya.com/cn/docs/iot/create-product?id=K914jp1ijtsfe)
