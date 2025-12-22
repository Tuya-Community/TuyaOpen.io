---
title: Role Management
---

# **Role Management**

# **Overview**

Role management supports products such as AI dolls and smart storytelling robots. These products require AI agents to achieve different personalities and chat styles. Each role includes the role name, description, and personality settings. The platform supports user-defined roles and also provides official reference roles.

Role management covers all roles used under the current account. You can choose roles from the role library per business requirements, and bind them with the AI agents.

# **Create role**

Go to the [Role Management](https://platform.tuya.com/exp/ai/role) page and click **Create Role**.

![Role Management](https://images.tuyacn.com/content-platform/hestia/1747294735c462e89f833.png)

Configure the following fields when creating a role:

- **Role Name**: The name of the specified role.
- **Role Personality**: Define role traits, backstory, knowledge base, interests, and specialized skills. This field serves as the role’s prompt. For example, an expert in joke-telling or storytelling.
- **Timbre**: Support tailored voice timbre.
    
    Timbre settings must match the target region and language. For example, AI dolls for the US market must use a region-supported timbre. You can filter timbre resources by region and language.
    
- **Language**: Specifies the supported languages for chats, covering both text-to-speech (TTS) and automatic speech recognition (ASR). When English is selected, both input and output languages default to English.
- **Label**: It is used to categorize roles, enabling grouped management in panels and service displays.
- **Avatar**: Each role requires an uploaded avatar, which will be displayed across panels and service channels. Consistent avatar styling is recommended to maintain visual coherence.
    
    ![Role Management](https://images.tuyacn.com/content-platform/hestia/17472922277342b0b3722.png)
    

# **Apply roles to agents**

Each agent can be associated with one or multiple roles to deliver contextual dialogue experiences in diversified product scenarios.

**Path**: **Create Role** > **Variables** > **Role Variables** > **Preset Role Management**.

**Perform the following steps**:

1. On the page of [My Agent](https://platform.tuya.com/exp/ai), click **Create Agent** or **Develop** in the **Operation** column.
    
    ![Role Management](https://images.tuyacn.com/content-platform/hestia/1747293990eb1b28e9354.png)
    
2. On the page of **01 Model Configuration** that appears, find **Variables** and click **+** to open the **Edit Variables** page.
    
    ![Role Management](https://images.tuyacn.com/content-platform/hestia/17472923099c4c4022094.png)
    
3. Enable **Preset Role Management**. Role variables are designed for AI toys, smart speakers, and other scenarios requiring predefined role settings. This feature must be used with product control panels, allowing users to customize roles, timbres, and personalities.
    
    ![Role Management](https://images.tuyacn.com/content-platform/hestia/17472923608cf39ea0168.png)
    
4. Click **Preset Role Management**. On the page that appears, click **Add Preset Role** to choose an official role or custom role.
    
    ![Role Management](https://images.tuyacn.com/content-platform/hestia/1747295003c5c81e80474.png)
    
5. After you enable variables, complete agent development, and bind the agent with devices, the AI toy’s control panel will show preset role profiles. Users can switch between roles.

# **Work with AI toy panel**

Taking the AI toy solution as an example, here is how to use it with the panel. For more information, see [AI Capabilities Development](https://developer.tuya.com/en/docs/iot/AI-feature?id=Keapy1et1fc63#title-3-Development%20procedure).

1. Link a product with your agent.
    
    ![Role Management](https://images.tuyacn.com/content-platform/hestia/174729275965bc9c24598.png)
    
2. Configure role variables and preset roles.
    
    ![Role Management](https://images.tuyacn.com/content-platform/hestia/174729279378111269422.png)
    
    ![Role Management](https://images.tuyacn.com/content-platform/hestia/1747295003c5c81e80474.png)
    
3. Select the official panel and develop panel interactions.
    
    ![Role Management](https://images.tuyacn.com/content-platform/hestia/17472931805c7ebbec7fe.png)
    
4. View the panel. On the panel, users can switch among multiple roles that have been configured for the agent.
    
    ![Role Management](https://images.tuyacn.com/content-platform/hestia/1747294457a34f739ec88.png)