---
title: AI Product Commands
---

# **AI Product Commands**
# **Overview**

To achieve precise control of home devices (such as lights and sockets) by AI agents, you must complete integrated configuration using the AI Agent Dev Platform and device control tools. Based on command standardization and ecosystem interoperability, Tuya empowers users to control devices via natural language dialogue, creating seamless smart experiences.

This topic describes how to configure AI product commands on the Tuya Developer Platform to enhance your product’s compatibility with AI assistants.

# **Scenarios**

To enable AI agent control over home devices such as lights and sockets, the following requirements must be met:

- **Extend agent capabilities**: The agent requires integration of device control tools to enable hardware interaction permissions.
- **Bind with device AI commands**: Configure standardized AI commands for target devices such as smart lights and sockets, establishing mapping relationships between commands and device actions. For example, “Turn on the lights” → triggers power on.
- **Link with ecosystems**: Add devices on the **Tuya** app or **SmartLife** app to complete device onboarding and account binding, and enable device control by the agents.

Take home lighting control and thermostat control as an example:

### Home lighting control

When the product ID (PID) of a home device is configured with AI commands (such as lights on/off and temperature control) and the agent has the “Device Control” plugin enabled, chats with AI can achieve semantic understanding → device control.

### Thermostat control

When the PID of a home device is configured with AI commands (such as thermostat temperature settings) and the agent has the “Device Control” plugin enabled, chats with AI can achieve device control.

# **Configure AI product commands**

Log in to the [Tuya Developer Platform](https://platform.tuya.com/). In the left-side navigation bar, choose **AI Agent** > **Agent Configuration** > **AI Control Command Configuration** to enter the [**AI Product Command**](https://platform.tuya.com/exp/voice/ai) page.

On the right side of the product name, click **Change Product** to select the desired product, or search for the desired product. The first 20 products are displayed by default. If your desired product is not in the list, you can search by product name or PID.

![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/174433677295d059d572e.png)

If the product has pre-configured commands, the page will show the functional commands already set up for the specific product category. You can click **Modify command solution** at the bottom of the page to confirm changes to the existing version and click **OK**. **You need to release this command solution again after modification.**

![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/1744336818df5433a91e3.png)

### Step 1: Command configuration

**Select a product category**

The product category determines the device type displayed on voice platform apps. It is recommended to select the category that most closely matches your device.

If the product category is not yet set, click **Set Category**. To modify an existing product category, click **Modify**. Then, select the device type mapped to the voice platform and click **OK**.

![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/1744337049397de1730d2.png)

**Configure functional commands**

### Edit existing commands

Click **Edit** in the **Operation** column, then modify existing commands on the **Edit Command** page and click **OK**.

![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/1744337125a2b4e1bae83.png)

![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/1744337150a43f96d97ee.png)

### Custom command

Customize the command capabilities of Toggle, Mode, and Range to suit the features of your product. To add custom commands, click **Custom Command**, then configure the following on the **Add Function Command** page:

- **Custom Command Language**: Select the supported languages.
- **Function Command Name**: Enter the name of the specified command. For example, **fan switch**.
- **Capability Type**: Select the capability type to implement, and then complete the configuration. For example, when selecting **Toggle** as the capability type, you must configure the applied data point (DP) and friendly name and enter a voice capability description.
    
    ![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/174433717487f3127bfcf.png)
    
    ![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/1744337199ee0eca085f3.png)
    

After configuration is complete, click **OK**.

For more information about how to configure custom voice capabilities, see [Set Custom Capability](https://developer.tuya.com/en/docs/iot/voice-advanced-custom-language?id=Kb4xiveclrg9k) or [submit a service ticket](https://service.console.tuya.com/8/3/create?step=2&id=010306).

### Add functional commands

To add commands, click **Add Command** and complete the following operation:

![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/174433722459999d4845b.png)

1. **Select Command**: From the list, select or search for the command you want to add to your product, and then click **Configure** in the **Operation** column of the target command.
    
    ![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/17443373042a60017f9df.png)
    
2. **Configure Command**: Edit the relationship between capability parameters and DP parameters for **recommended commands**, **custom commands**, or **general commands**. Then, click **OK**.
    
    Taking the **power switch** as an example, you need to select DPs, configure the feature property, and query power status.
    
    ![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/17443373382489868e48b.png)
    
3. (Optional) If you do not find the desired capability, click **Custom Command**. For more information, see [Set Custom Capability](https://developer.tuya.com/en/docs/iot/voice-advanced-custom-language?id=Kb4xiveclrg9k).
    
    ![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/1744337381f7320ea3ccd.png)
    

After you configure the command solution, you can click **Confirm and Test**.

### Step 2: Experience Configuration

Follow the following process to try out the command:

1. Configure allowlist accounts. In the section of **Allowlist Account**, click **Configure Now**. On the page of **Allowlist Configuration** that appears, select the mobile app and add allowlist accounts. Up to three allowlist accounts can be added.
    
    ![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/17443374193d0040288cf.png)
    
    ![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/1744337442ef57508c96c.png)
    
2. Add a virtual device. Use the OEM app or **SmartLife** app to scan the QR code, and then add the virtual device.
3. Scan and test. Scan the QR code to enter the AI Smart Assistant for testing.
    
    ![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/1744337511cf683b0dcab.png)
    

### Step 3: Publish effect

Proceed with **Next Step: Publish Effect** to publish the commands. Important notice: Published commands cannot be revoked. Confirm the settings and click **OK**.

![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/1744337567cc1f814af8b.png)

Then, the page shows **Released**.

![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/174433766391d696f3afc.png)

# **Manage versions**

Click **Manage Versions** to view and edit the versions on the page of **History Version**.

![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/174433770610240db31a7.png)

![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/1744337747a73a45b17a8.png)

You can also click **Add Version** to try out the configuration and release a new version.

![AI Product Commands](https://images.tuyacn.com/content-platform/hestia/174433776788e91cf8cf9.png)