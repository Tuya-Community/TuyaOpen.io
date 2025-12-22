---
title: AI Agent Dev Platform
---

# **AI Agent Dev Platform**

This AI agent development platform integrates multiple language models, aiming to provide users with efficient and flexible AI agent management features. Users can easily deploy and run AI agent-related applications through configuration and debugging.

# **Create agent**

1. First, log in to the [Tuya Developer Platform](https://platform.tuya.com/).
2. On the homepage, click **Enter AI Agent Development** under **Developer Console** > **AI Agent**, or click **AI Agent** > **Agent Dev** > **My Agent** on the left navigation menu, and enter the [AI Agent Dev Platform](https://platform.tuya.com/exp/ai).
    
    ![AI Agent Dev Platform](https://images.tuyacn.com/content-platform/hestia/1748342890a8b8be58abb.png)
    
    ![AI Agent Dev Platform](https://images.tuyacn.com/content-platform/hestia/174834291029509b68bd4.png)
    
3. Click **Create Agent** in the upper-right corner of the page, and then complete the configuration in the **Create My AI Project** window as shown in the figure below. Once the configuration is complete, click **OK**.
    
    ![AI Agent Dev Platform](https://images.tuyacn.com/content-platform/hestia/1744264784100afa2969d.png)
    
4. Then, enter the development page of the agent, and configure model capabilities, prompts, etc. For detailed instructions, please refer to the sections below.
    
    ![AI Agent Dev Platform](https://images.tuyacn.com/content-platform/hestia/1744265039409b61af6dd.png)
    

# **Model capability configuration**

### Basic configuration

![AI Agent Dev Platform](https://images.tuyacn.com/content-platform/hestia/173338351439345743089.png)

### LLM model used

Here, you can select the large language model used by the AI agent. Due to compliance reasons, the available language models differ by data center, and different language models incur varying token costs.

### Max context messages

Here, you can configure the number of previous conversations or interactions that the AI agent can remember and process. These historical messages help the AI agent maintain contextual continuity, thereby providing more relevant and accurate responses. Naturally, the more historical messages there are, the greater the computational power consumed in each conversation. You can configure the max context messages based on the requirements of scenarios.

### Skills configuration

![AI Agent Dev Platform](https://images.tuyacn.com/content-platform/hestia/1733383542a33fb6a2061.png)

### Plugin

Plugins refer to independent functions that can be added to the AI agent. The plugin functionality allows the AI agent to call various tools or APIs, such as device queries, device control, and scene control. This expands the capabilities of the AI agent, enabling it to perform more diverse and complex tasks.

### Knowledge base

The knowledge base refers to a system used to store and manage information, data, and knowledge, from which the AI agent can obtain answers or guidance to better respond to user inquiries or perform tasks. The knowledge base can store various forms of information, such as text, documents, images, and videos.

The knowledge base employs retrieval-augmented generation (RAG) technology to enhance the quality of the AI agent’s responses. The working principle of RAG is as follows:

1. Information retrieval. First, using retrieval models or algorithms, the AI agent retrieves documents or information snippets related to the user query from the knowledge base.
2. Answer generation. After obtaining relevant documents, the AI agent generates natural and coherent responses based on the context and user query.

### Workflow

If a specific scenario arises, in order for the agent to perform relevant tasks or respond to users based on specified logic, it is necessary to have the agent run based on the established workflow.

# **Prompt development**

![AI Agent Dev Platform](https://images.tuyacn.com/content-platform/hestia/1733383701fdfe72e0ada.png)

You can enter prompts in the **Prompt** box to guide the language model in generating dialogue or performing tasks. Before entering prompts, it is recommended to review the [**Prompt document**](https://www.tuyaos.com/viewtopic.php?t=3725) to understand the principles of prompts. Prompts can also be optimized to help the AI agent more effectively implement business operations.

# **Debugging and release**

### Debugging

![AI Agent Dev Platform](https://images.tuyacn.com/content-platform/hestia/1742353613e7158505d05.png)

1. After the configuration is saved, click **Get QR Code**.
2. You can use the **SmartLife** app to scan the QR code for testing to ensure that the configuration is correct and the function is running properly.

Before going live, it is recommended to conduct thorough testing to ensure the normal operation of system functions.

### Release

After debugging is completed, click **Release** to release the configuration to the online environment, making it effective.

Then, the release records will show all version information of previous releases, making it easier for users to track and manage configuration history.

# **Application configuration**

1. Click **Application Management** in the top right corner of the page.
    
    ![AI Agent Dev Platform](https://images.tuyacn.com/content-platform/hestia/174235372113c8558a10b.png)
    
2. On the page that appears, configure the interaction form of the AI agent on the application.
    
    ![AI Agent Dev Platform](https://images.tuyacn.com/content-platform/hestia/172629526303ca7a3210b.png)
    

### Select application

Users can select the type of application, including app, cloud integration, speaker, SaaS, and control panel.

### AI agent name

Users can set the display name of the AI agent in the application.

### Welcome message

Users can enter a custom welcome message to be displayed when the user opens the application.

### Light mode

- Theme color: Users can select the theme color for light mode.
- Background color: Users can select the background color for light mode.
- Conversation box background color: Users can select the background color for the conversation box in light mode.

### Dark mode

- Dark theme color: Users can select the theme color for dark mode.
- Dark background color: Users can select the background color for dark mode.
- Dark conversation box background color: Users can select the background color for the conversation box in dark mode.

### Background image

Upload background image: Users can upload a custom background image in formats such as jpg, jpeg, png, with a size not exceeding 3 MB.

### Save

When the application carrier is an app, after saving, an AI agent dialogue miniapp will be automatically generated in the specified app based on the above configuration. The debugging by QR code scanning will also display interactions according to the configuration information.

# **Associate with agent and product**

To further develop the AI features of products, you can associate products with agents. For more details, please refer to [AI Capabilities Development](https://developer.tuya.com/en/docs/iot/AI-feature?id=Keapy1et1fc63)。