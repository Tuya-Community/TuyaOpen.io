---
title: MCP Management
---

# **MCP Management**
# **Overview**

The Model Context Protocol (MCP) is an open standard created by Anthropic in 2024 and open-sourced, which standardizes the way large language models (LLMs) and AI agents interact with external data sources, tools, and services securely and flexibly.

In simple terms, MCP acts as a “common interface” for AI systems, enabling seamless access to external data sources, tools, and services. It facilitates the integration of diverse external resources, thereby extending the model’s capabilities and enhancing practical utility.

# **Technical architecture**

MCP uses a clear client-server architecture, consisting of three parts:

- **MCP host**: The application running the LLM, responsible for coordinating the entire interaction process and managing one or more MCP clients.
- **MCP client**: Acts as a bridge between the MCP host and server. Each client maintains a one-to-one connection with an MCP server and handles request and response transmission.
- **MCP server**: The backend program that actually provides data or services. It can be various resources such as a file system, database, API, or custom tool, and is responsible for responding to requests from clients.

MCP enables bidirectional data exchange through a standardized communication protocol. You can develop and deploy MCP servers on your own to extend the functional boundaries of AI without modifying the host application, thus significantly reducing the cost of integrating external tools and data sources. Simultaneously, the bidirectional communication mechanism allows servers to proactively push information or request operations, supporting more complex automated workflows. This transforms LLMs from mere conversational tools into intelligent assistants capable of executing tasks.

For more information, visit the [MCP official website](https://modelcontextprotocol.io/docs/getting-started/intro).

# **Integrate MCP with the Tuya platform**

Tuya’s AI Agent Development Platform now fully supports MCP server integration. By integrating the official MCP server or connecting to a custom-developed MCP server, you can significantly extend the agent’s capability to interact with third-party services and IoT devices.

This equips LLMs with “eyes, arms, and legs” to perceive and act in the physical world, enabling them to go beyond text-based dialogue. They can achieve intelligent decision-making on top of LLMs and establish efficient and secure interactions with real-world devices and services, ultimately building a smart bridge between AI and physical systems.

### Platform advantages

- **Designed for IoT device ecosystems**: Tuya-enabled devices support plug-and-play integration. Simply add an MCP server to your agent, and devices become immediately available, seamlessly fitting into various IoT scenarios.
- **Support for diverse MCP services**: In addition to officially preconfigured MCP servers, you can also create and integrate custom MCP services, enabling both a robust service ecosystem and personalized extensions.
- **Simplified development and integration**: Register your service once on the platform and integrate a lightweight SDK to quickly enable access and deployment for MCP servers in multiple data centers.
- **Global service deployment**: With service coverage across five data centers in the world, the platform supports low-latency connections to the nearest data center, thereby meeting operational deployment and compliance requirements in different regions.
- **Secure and reliable persistent connection**: Establish secure persistent connections in multiple data centers based on the WebSocket protocol, ensuring that data transmission is confidential, complete, and available.

The MCP capabilities and official MCP tools on the platform are continuously extending. Please refer to the platform’s open documentation for the latest updates and resources.

# **Quick start**

### Manage MCP

Go to [Tuya Developer Platform > MCP Management](https://platform.tuya.com/exp/ai/mcp) page.

You can query **official MCP services** and manage **custom MCP services**. You can switch tabs to view official MCP services and registered custom MCP services.

![MCP Management](https://images.tuyacn.com/content-platform/hestia/1756196346d211a71d946.png)

![MCP Management](https://images.tuyacn.com/content-platform/hestia/1756196418170a52c579d.png)

If you have not registered an MCP service yet, you can click **Add custom MCP** under **Custom MCP Service** to register your own MCP service on the platform. After successful registration, you can view its service information and configuration in the list of MCP services.

For information on how to develop a custom MCP server, refer to [Custom MCP Services](https://developer.tuya.com/en/docs/iot/custom-mcp?id=Kety4zbdvwdn8).

### View official MCP services

On the **Official MCP Service** page, click the desired MCP service to find out details of the service and tools.

![MCP Management](https://images.tuyacn.com/content-platform/hestia/17561964644c74ea60a86.png)

### Edit custom MCP service

On the **Custom MCP Service** tab, click the desired service. On the **Service Details** page, you can view the custom MCP service introduction, configuration, and tool details. You can also click **Edit** in the top right corner to modify service information and maintain service configuration.

For more information, see [Custom MCP Services](https://developer.tuya.com/en/docs/iot/custom-mcp?id=Kety4zbdvwdn8).

![MCP Management](https://images.tuyacn.com/content-platform/hestia/1756196692fc6657283e7.png)

You can add data centers.

![MCP Management](https://images.tuyacn.com/content-platform/hestia/1756196797b81df8bf389.png)

### Debug MCP tools

You can debug the MCP tools on the platform.

Select an official MCP service, click the **Tool** tab, expand the **Available tools** list, and then click **Test Run**.

Currently, you can only debug the MCP server tools deployed in the **China Data Center**.

![MCP Management](https://images.tuyacn.com/content-platform/hestia/1756197024a6d98c59d7f.png)

You can debug custom MCP services in the same way as official MCP services. For more information, see [Run and debug MCP Server](https://developer.tuya.com/en/docs/iot/custom-mcp?id=Kety4zbdvwdn8#title-4-Run%20and%20debug).

### Add MCP server to your agent

1. On the page of [My Agent](https://platform.tuya.com/exp/ai), select your desired agent and click **Develop** in the **Operation** column.
    
    ![MCP Management](https://images.tuyacn.com/content-platform/hestia/175619768816e5db9864d.png)
    
2. In the section **01 Model Configuration** > **Skills Configuration**, click **+** on the right of **Plugin**.
    
    ![MCP Management](https://images.tuyacn.com/content-platform/hestia/1758786306b13f4741864.png)
    
3. On the **Add Tool** page, add official or custom MCP service tools to your agent.
    
    For more information, see [Add server to agent](https://developer.tuya.com/en/docs/iot/custom-mcp?id=Kety4zbdvwdn8#title-5-Add%20server%20to%20agent).
    
    ![MCP Management](https://images.tuyacn.com/content-platform/hestia/1758786389a78afa0ad82.png)
    

# **Billing**

Currently, adding official MCP services to your agent is free of charge, and registering custom MCP services and adding them to your agent is also free. Tuya reserves the right to introduce fees for these services in the future.