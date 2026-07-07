---
title: Role Management
description: "Role Management on Tuya defines personalities your AI agent can adopt — name, description, voice, and prompt — bound from a shared role library."
keywords:
  - role management
  - tuya ai agent
  - role library
  - voice timbre
  - tuya cloud
---

Role management defines the personalities your AI agent can adopt — the name, description, voice, and prompt that shape how it talks. You create roles in a shared library, then bind one or more roles to an agent so a single product can switch between personas. It powers products such as AI dolls and smart storytelling robots, where each role carries its own character and chat style.

Roles cover everything used under the current account. You pick roles from the role library to match your business needs, including official reference roles and ones you define yourself.

## Create a role

Go to the [Role Management](https://platform.tuya.com/exp/ai/role) page and click **Create Role**.

![Role Management page with the Create Role button](https://images.tuyacn.com/content-platform/hestia/1747294735c462e89f833.png)

Configure these fields:

- **Role Name**: The name of the role.
- **Role Personality**: The role's traits, backstory, knowledge base, interests, and specialized skills. This field is the role's prompt — for example, an expert at telling jokes or stories.
- **Timbre**: The voice timbre for the role. Match the timbre to the target region and language. For example, an AI doll for the US market must use a region-supported timbre. Filter timbre resources by region and language.
- **Language**: The languages supported in chat, covering both text-to-speech (TTS) and automatic speech recognition (ASR). When you select English, both input and output default to English.
- **Label**: A category for the role, used for grouped management in panels and service displays.
- **Avatar**: An uploaded image shown across panels and service channels. Keep avatar styling consistent for visual coherence.

![Role creation form with avatar upload](https://images.tuyacn.com/content-platform/hestia/17472922277342b0b3722.png)

## Apply roles to an agent

Each agent can bind one or more roles to deliver contextual dialogue across product scenarios.

**Path**: **Create Role** > **Variables** > **Role Variables** > **Preset Role Management**.

Follow these steps:

1. On the [My Agent](https://platform.tuya.com/exp/ai) page, click **Create Agent**, or click **Develop** in the **Operation** column.

   ![My Agent list with the Develop action](https://images.tuyacn.com/content-platform/hestia/1747293990eb1b28e9354.png)

2. On the **01 Model Configuration** page, find **Variables** and click **+** to open the **Edit Variables** page.

   ![Edit Variables page](https://images.tuyacn.com/content-platform/hestia/17472923099c4c4022094.png)

3. Enable **Preset Role Management**. Role variables suit AI toys, smart speakers, and other scenarios that need predefined roles. Use this feature with a product control panel so users can customize roles, timbres, and personalities.

   ![Preset Role Management toggle](https://images.tuyacn.com/content-platform/hestia/17472923608cf39ea0168.png)

4. Click **Preset Role Management**, then click **Add Preset Role** to choose an official or custom role.

   ![Add Preset Role dialog](https://images.tuyacn.com/content-platform/hestia/1747295003c5c81e80474.png)

5. After you enable variables, finish agent development, and bind the agent to devices, the AI toy's control panel shows the preset role profiles. Users can switch between roles.

## Work with the AI toy panel

The AI toy solution shows how to use roles with a panel. For more details, see [AI Capabilities Development](https://developer.tuya.com/en/docs/iot/AI-feature?id=Keapy1et1fc63#title-3-Development%20procedure).

1. Link a product with your agent.

   ![Product linked to an agent](https://images.tuyacn.com/content-platform/hestia/174729275965bc9c24598.png)

2. Configure role variables and preset roles.

   ![Role variables configuration](https://images.tuyacn.com/content-platform/hestia/174729279378111269422.png)

   ![Preset roles configuration](https://images.tuyacn.com/content-platform/hestia/1747295003c5c81e80474.png)

3. Select the official panel and develop the panel interactions.

   ![Official panel selection](https://images.tuyacn.com/content-platform/hestia/17472931805c7ebbec7fe.png)

4. View the panel. Users can switch among the roles configured for the agent.

   ![Panel showing role switching](https://images.tuyacn.com/content-platform/hestia/1747294457a34f739ec88.png)

## See also

- [Agent Evaluation](agent-evaluation) — test how each role responds
- [Self-control Commands](self-control-commands) — let the device act on voice commands
