---
title: Agent Trigger
---

# **Agent Trigger**
# **Overview**

When devices meet specific event conditions, agent triggers can **automatically invoke agents to execute tasks**, such as user notifications, device control, and cross-system automation.

**Typical scenarios**

- **Power management**: Automatically alert when the device battery is critically low to reinforce charging awareness.
- **Environmental monitoring**: Notify users to adjust the air conditioner or dehumidifier based on real-time temperature and humidity data.
- **Anomaly alerts**: Immediately inform users of device failures and operational exceptions.

**Differences from push notifications**

- **Flexible rules**: Events are configured by you with granular data point (DP) condition matching.
- **Simplified setup**: One-click binding with existing events eliminates redundant configuration.
- **Smart response**: Automatically generate AI dialogues using prompt templates.
- **Natural user experience**: Role-aware interactions deliver humanized, personalized expressions.

### Preconditions

- **Device requirements**: Use [Wukong SDK v3.12.14 or later](https://developer.tuya.com/en/docs/iot-device-dev/wukongai_version_release?id=Kegae21edhfyb) to develop device firmware.
- **Platform configuration**:
    - The agent has been configured with triggers, and the event rules for the products have been enabled.
    - The product has been linked with an agent. For more information, see [AI Capabilities Development](https://developer.tuya.com/en/docs/iot/AI-feature?id=Keapy1et1fc63).

### Process overview

1. [Create device rule events](https://developer.tuya.com/en/docs/iot/agent_trigger?id=Keoimoadosdoi#DP): Configure device events based on DP conditions, such as low battery rules, excessive noise rules, and high temperature rules.
2. [Configure agent triggers](https://developer.tuya.com/en/docs/iot/agent_trigger?id=Keoimoadosdoi#Trigger): Link triggers with existing events and set task execution logic. For example, send prompts.
3. When the device meets trigger conditions during operation, the trigger activates, and users receive smart notifications or action execution results.

# **Create device rule events**

Follow the steps below to configure device events based on **device PID** and **DP conditions**.

1. Go to the [Tuya Developer Platform](https://platform.tuya.com/). In the left-side navigation bar, choose **AI Agent** > **Agent Configuration** > **Device Event Management**.
2. Click **Create** in the top-right corner of the page. Currently, the **device event trigger** type is supported.
    
    ![Agent Trigger](https://images.tuyacn.com/content-platform/hestia/1751617329bfabde58072.png)
    
3. Enter the device event name and select the PID of the target product. After selecting the PID, you can set the event trigger conditions based on the DPs of that PID. The rules will only apply to devices under the selected PID.
4. Define trigger conditions. Select **Generic type trigger condition** or **Data point (DP) trigger condition**, and then add the DP condition rules.
    
    For example, set a low battery alert condition for an AI doll: `dp2 (Battery) < 20` and `dp3 (Charge Status) = none`.
    
    ![Agent Trigger](https://images.tuyacn.com/content-platform/hestia/1751618910f6bedff7ad9.png)
    
5. (Optional) Set a trigger period. The **Trigger Mode** can be **Level Triggering** or **Edge Triggering**. For example, you can configure the event to trigger only during a specific time period (such as `08:00 - 23:00`) to avoid disturbing users.
    
    ![Agent Trigger](https://images.tuyacn.com/content-platform/hestia/1751619186f16dd57e370.png)
    
6. After the configuration is complete, save and enable the event.
    - After the configuration is saved, the default event status is **Disabled**.
    - Be sure to manually enable the event and link it with the trigger so that it can be triggered when the device is running.
    
    ![Agent Trigger](https://images.tuyacn.com/content-platform/hestia/1751619282c5742d45d14.png)
    
    After the event is enabled, it will appear as an option in the trigger configuration and can be selected for use.
    

# **Configure the agent trigger**

1. Go to [My Agent](https://platform.tuya.com/exp/ai), click **Develop** in the **Operation** column, and then find the **Trigger** under **01 Model Configuration** > **Skills Configuration**. Click **+** to configure the trigger.
    
    ![Agent Trigger](https://images.tuyacn.com/content-platform/hestia/17549057417c6f1e5d202.png)
    
2. Add a trigger.
    
    ![Agent Trigger](https://images.tuyacn.com/content-platform/hestia/1751619429cbbbca34c46.png)
    
    - **Trigger Name**: Enter the name of the specified trigger.
    - **Trigger Type**: Select the type as **Device Event Trigger**.
3. Select **Trigger Event**. Select a device event (such as **Low Battery**) from your account.
    - If no events are available, click **Event Configuration** on the right to create a rule.
    - The event is disabled by default. You must enable it before triggering.
4. Define **Task Execution** logic. The default task is **Agent Push Message**.
    
    Currently, only push messages are supported, but plugin or workflow tasks are unavailable.
    
5. Edit the prompt to be sent as content to the agent.
    - It is recommended to clearly specify the required response format and key elements based on your needs.
    - You can import dynamic variables, such as `{{sys.dp2}}` to represent the current battery value.
    - The prompt content should be concise and clear, and used in combination with dynamic variables to enhance the users’ personalized experience.
    - In addition, you can customize the tone and expression style of the prompts based on device properties and usage context.
    
    ![Agent Trigger](https://images.tuyacn.com/content-platform/hestia/1751620128e37c124eb57.png)
    
    **Sample prompts**
    
    For more information, see [How to Write a Prompt](https://developer.tuya.com/en/docs/iot/prompt_dec?id=Keoq4c2wfutjn).
    
    | Trigger scenario | Sample prompt | Prompt template |
    | --- | --- | --- |
    | Low battery alert | I’m running out of power, please charge me. | Your current battery level is `{{dp2}}%`. Please remind me (the user) in one sentence to charge your battery. No other irrelevant replies are allowed. |
    | Overtemperature alert | It is too hot in the room. Can you turn on the air conditioner? | The current room temperature is `{{dp4}}°C`. Please say something to remind the owner to cool down the room. No other irrelevant replies are allowed. |
    | Poor air quality | The air is so bad. Do you want to open a window? | The current air quality is `{{dp5}}`. Please say something to remind the owner of ventilation. No other irrelevant replies are allowed. |
    | Device offline notification | Device connection error. Please check your network. | You are offline. Please generate a concise prompt to remind users to check the network. No other irrelevant replies are allowed. |
6. After configuration is complete, click **OK**.
7. Test the execution results.
    1. Click the **Execute** button of the specified event.
        
        ![Agent Trigger](https://images.tuyacn.com/content-platform/hestia/1751620205191373e1c64.png)
        
    2. In the **Simulate Trigger Test** dialog box, enter the virtual device ID and use the virtual device panel to view the response effect. Alternatively, click **Execute** to view the AI’s response.
        
        ![Agent Trigger](https://images.tuyacn.com/content-platform/hestia/1751620241fa6e1224f14.png)
        
        Currently, only **virtual device testing** is supported, and real device testing is not supported.
        

# **Coming soon**

The following extended functionalities will be progressively supported:

- Execute workflows
- Perform tasks via plugins and other methods