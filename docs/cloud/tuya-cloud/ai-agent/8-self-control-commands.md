---
title: Self-control Commands
---

# **Self-control Commands**

# **Concepts**

### Self-control commands

**Self-control commands** refer to instruction sets that directly trigger device operations through user interactions with the device itself. They are designed for smart devices with voice or text interaction capabilities, such as AI dolls, AI robots, and smart water dispensers.

For example, when a user issues commands like “Move forward” or “Dance” to a robot, or says “Lower the volume” or “What’s the battery level?” to an AI doll, the system must convert these natural language inputs into executable control commands that the device can recognize and process. To implement these control capabilities, self-control commands pre-configured on the device and the cloud are required. They ensure accurate command delivery after semantic recognition is completed.

### Expression

Expressions refer to a diversified set of linguistic patterns designed to match natural language inputs from users. Each expression corresponds to a specific self-control command, enhancing the system’s recognition accuracy and hit rate.

For example, the self-control command “Turn on the light” may include multiple expressions such as “Switch the light on”, “Turn the lights on”, “Activate the lighting”, and “Light up the room”. By maintaining a comprehensive expression library, the system can accurately interpret varied user phrasing across contexts and trigger the corresponding device control actions.

### Self-control commands vs passive commands

| Type | Definition | Typical scenario and expression | Command configuration entity | How to trigger |
| --- | --- | --- | --- | --- |
| **Self-control commands** | The device **independently recognizes voice commands and executes corresponding actions**, enabling direct user-device interaction to control its own functionalities. | • AI doll: Turn up the volume and check battery level.
• Robot: Move forward, move backward, and dance. | The device itself. | User speaks to the device (voice/text). |
| **Passive commands** | The device is **controlled by external devices** to enable cross-device automation scenarios, such as speakers controlling air conditioners. | • Smart speaker controls the air conditioner: Set the air conditioner temperature higher.
• Lights: Turn up the lights.**Note: The target device to be controlled must be explicitly specified.** | The controlled device. For cross-device control scenarios such as speaker controlling lights, the target device (light) must have passive commands configured to accept external commands. | The user issues voice/text commands to the main control device to initiate control operations. |

### Application scenarios of self-control commands

When a device is required to **autonomously understand and respond to user voice/text commands**, self-control commands should be configured. This feature supports the following scenarios:

- Devices with embedded voice interaction capabilities support direct user-to-device command execution. For example, AI dolls, robots, and water dispensers.
    
    Examples: “Lower volume” and “check battery level”.
    
- Devices with native hardware control support custom semantic processing and understand various expressions.
    
    Examples: “Play a story”, “do a dance”, and “heat the water”.
    
- You can customize expressions, intents, and slot configurations on the platform.

### Use cases

- **Home lighting control**
- **Thermostat control**
    
    When the PID of a device is configured with AI commands (such as thermostat temperature settings) and the agent has the “Device Control” plugin enabled, chats with AI can achieve device control.
    

### Preconditions

- Use [Wukong SDK v3.12.12 or later](https://developer.tuya.com/en/docs/iot-device-dev/wukongai_version_release?id=Kegae21edhfyb) for firmware development. Self-control skills are not available in versions earlier than v3.12.12.
- App v6.7.0 or later is required for miniapp or panel-based device control.
- Platform configuration requirements:
    - Bind an AI agent in the product AI capabilities and enable the **Device Control** skill for this agent.
        
        ![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/1750925532345f7965ffd.png)
        
    - You **have configured and released** self-control commands for the product. **Note: Configurations will take effect approximately 20 minutes after release.**

# **Step 1: Configure DP commands**

DP command configuration serves as the foundation for enabling device self-control capabilities.

1. Log in to the [Tuya Developer Platform](https://platform.tuya.com/).
2. In the left-side navigation bar, choose **AI Agent** > **Agent Configuration** > **AI Control Command Configuration** to enter the [**AI Product Command**](https://platform.tuya.com/exp/voice/ai) page.
3. Click the **Self-control command** tab.
    
    ![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/1750925148af09e125d33.png)
    

If the product has pre-configured commands, the page will show the functional commands already set up for the specific product category. You can click **Modify command solution** at the bottom of the page to confirm changes to the existing version and click **OK**. **You need to release this command solution again after modification.**

![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/1750925090e58e002db34.png)

Then, choose to add DP commands or non-DP commands as needed. For detailed configuration steps, refer to the following contents:

- [Add DP commands](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#DP)
- [Add non-DP commands](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#NonDP)

![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/17509241229d984be8d96.png)

### Add DP commands

DP commands are data points used to control devices, such as power on/off, adjusting brightness, and setting modes. After you define the DP structure and type, the platform can automatically complete intent parsing and command delivery.

Click **Add Command**, select **DP command**, and then complete the following configuration on the **Create Self-Control Command** page.

- [Select language](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#language)
- [Select DP](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#dp)
- [Select command type](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#type)
- [Set synonyms](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#synonym)
- [Set expressions](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#expression)
- [Expression examples](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#example)
- [Save configurations](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#save)

![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/1750924190f79f5909d11.png)

### Select language

Select the language(s) to be supported for this command, used for localized matching of subsequent expressions. Example:

- If you want users to interact in Chinese, select **Chinese** and provide expressions in Chinese.
- If multilingual control is supported, you can add multiple languages as needed and configure corresponding expressions for each language.

Language selection affects expression matching accuracy. Always configure based on your actual users’ language preferences.

### Select DP

Select the DPs to be controlled in the device function definition. The platform supports the following DP types:

- `Bool`: Boolean type
- `Enum`: Enumeration type
- `Value`: Value type
- `String`: String type

The `Raw` type is not supported yet.

### Select command type

Configurable command types vary depending on the DP types. See the following table for details.

| DP type | Configurable command type |
| --- | --- |
| Bool | Set. For example, on/off. |
| Enum | Set. For example, switch to a specific mode. |
| Value | Set, raise, and lower. For example, set the brightness to 80% and raise the temperature. |
| String | Set. For example, play a specific song. |

### Set synonyms

Enable unified normalization of expressions by setting synonyms for DP values, allowing diverse user phrasing to accurately trigger the correct commands.

Example:

- The DP value is `on`, and the configurable synonyms are: `start`, `activate`, and `enable`.
- The DP value is `off`, and the configurable synonyms are: `shut down`, `sleep`, and `stop`.

How to configure:

- Add multiple synonyms under each DP value to enable flexible command matching.
- Use the `#dpValue#` placeholder in expressions to dynamically reference matched synonyms.

You can set synonyms only for the Boolean and enumeration type DPs.

### Set expressions

Expressions are used to match users’ natural language inputs and trigger corresponding commands. Configuration guidelines:

- Each expression should represent a typical phrasing. Example:
    - Turn on the bedroom light
    - Set the fan to level 3
- Placeholders can be used in expressions to improve reusability. Example:
    - `#percentValue#`: Percentage values for numeric DPs.
    - `#dpValue#`: DP value synonyms.

### Expression examples

| Device type | Command type | DP type | Expression example | Value description |
| --- | --- | --- | --- | --- |
| AI doll | DP | Value | Set the volume to #dpValue# | DP: volume (such as DP ID: 101), value = #number# |
|  | DP | Value | Increase the volume a bit | DP: volume, value = current value + 10 (example) |
|  | DP | Value | Lower the volume | DP: volume, value = current value － 10 (example) |
| Robot | Non-DP | - | Move forward | Custom value: forward (example) |
|  | Non-DP | - | Move backward | Custom value: backward (example) |
|  | Non-DP | - | Do a dance for me | Custom value: dance (example) |
|  | Non-DP | - | Turn left | Custom value: left (example) |
|  | Non-DP | - | Walk a few steps to the right | Custom value: walk (example) |
- DP-based devices (such as AI dolls): The platform sends specific DPs (such as volume) and dynamically assigns values using the `#dpValue#` placeholder in expressions.
- Non-DP devices (such as robots): Custom action commands (such as `forward` and `dance`) can be defined and are parsed/executed locally on the device.

### Save configurations

After completing the above configurations, save the configurations to view the command details in the solution list.

### Add non-DP commands

Non-DP commands apply to specific scenarios where devices do not rely on platform-defined DPs, but instead use custom control commands to complete interactions. Devices with custom protocol parsing capabilities, such as robots and robotic arms, can utilize non-DP commands for interaction.

Click **Add Command** and select **Non-DP command**. On the **Create Self-Control Command** page that appears, complete the following configurations.

- [Select language](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#nondplanguage)
- [Set custom command code](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#nondpcode)
- [Set expressions](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#nondpexpression)
- [Set the value](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#nondpvalue)

![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/1750924392af79a812329.png)

### Select language

Select supported languages for commands to enable multilingual natural language interaction capabilities. Each supported language requires corresponding expressions.

Example:

- Devices serving Chinese-speaking markets must include Chinese expressions in their command settings.
- To enable control capabilities in English, configure English expressions alongside Chinese ones.

### Set custom command code

Configure a custom code for each non-DP command to identify the specific action to be performed by the device.

The **command code** is the unique identifier for the device to identify the command. It is recommended to keep it concise and clear.

### Set expressions

Configure multiple expressions per command, in order to enable diverse voice or text input by assigning varied phrasings to each command.

Incorporate placeholders like `#dpValue#` to improve expression versatility and scalability.

### Set the value

Devices can receive and parse custom-formatted values through non-DP commands.

- A value in a custom JSON, string, or protocol-specific format can be sent.
- The value’s format and parsing logic are entirely defined and implemented by device developers.

Example:

| Command code | Payload (example) | Description |
| --- | --- | --- |
| forward | `{ "action": "move", "dir": "fwd" }` | Move forward |
| dance | `"action_dance"` | Do a dance (string-based) |
| turn_left | `{ "cmd": "turn", "value": "left" }` | Turn left |
- The platform solely transmits values to devices without processing, while execution logic must be implemented on the device.
- Non-DP commands provide greater control flexibility for custom-protocol devices. You can build various flexible human-machine interaction capabilities through the combination of custom expressions, command codes, and values.

After you configure the command solution, you can click **Confirm and Test**.

# **Step 2: Experience configuration**

![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/17509245056f49d02e837.png)

Click **Go to test** and follow the process to try out the command:

![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/1750924581c001bb70e97.png)

1. Configure allowlist accounts. In the section of **Allowlist Account**, click **Add Account**. Select the mobile app, add allowlist accounts, and then click **Save**. Up to three accounts can be added.
2. Add a virtual device. Use the OEM app or **SmartLife** app to scan the QR code, and then add the virtual device.
3. Scan and test. Scan the QR code to enter the AI Smart Assistant for testing.

# **Step 3: Publish effect**

Proceed with **Next Step: Publish Effect** to publish the commands. Important notice: Published commands cannot be revoked. Confirm the settings and click **OK**.

![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/17509246583441235f025.png)

Then, the page shows **Released**.

![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/1750924702b6f29a4e09f.png)

# **Manage versions**

Click **Manage Versions** to view and edit the versions on the page of **History Version**.

![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/175092482725e584e7b1d.png)

![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/175092491823104692d04.png)

You can also click **Add Version** to try out the configuration and release a new version.

![Self-control Commands](https://images.tuyacn.com/content-platform/hestia/1750924947826266922d9.png)