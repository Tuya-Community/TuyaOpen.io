---
title: MCP 管理
---
# **MCP 管理**
# **概述**

模型上下文协议（Model Context Protocol，MCP）是由 Anthropic 在 2024 年推出的一项开放标准，旨在让大语言模型（Large Language Model，LLM）能够安全、灵活地与外部数据源、工具及服务进行交互。

简单来说，MCP 就像是为 AI 系统打造的 “通用接口”，使其能够便捷地访问外部数据源、工具、和服务，轻松集成各类外部资源，从而扩展模型的能力边界，提升应用实用性。

# **技术架构**

MCP 采用清晰的 “客户端 - 服务器” 架构，主要包含三部分：

- **MCP 主机（MCP Host）**：运行 LLM 的应用程序，负责协调整个交互流程，管理一个或多个 MCP 客户端。
- **MCP 客户端（MCP Client）**：作为 MCP 主机与服务器之间的桥梁，每个客户端与一个 MCP 服务器保持一对一连接，负责传递请求与响应。
- **MCP 服务器（MCP Server）**：实际提供数据或服务的后端程序，可以是文件系统、数据库、API 或自定义工具等多种资源，负责响应来自客户端的请求。

MCP 通过标准化通信协议实现双向数据交换。开发者可以独立开发和部署 MCP 服务器，无需修改主机应用即可扩展 AI 的功能边界，降低了集成外部工具和数据源的成本。同时，双向的通信机制也使服务器能主动推送信息或请求操作，支持更复杂的自动化流程，使 LLM 不再局限于单纯的对话工具，而是扩展为可执行任务的智能助手。

更多信息，请前往 [MCP 官方网站](https://modelcontextprotocol.io/docs/getting-started/intro) 了解。

# **涂鸦平台接入 MCP**

涂鸦智能体开发平台现已全面支持 MCP Server 接入能力。通过集成官方 MCP Server 或接入自定义开发的 MCP Server，可以显著扩展智能体与第三方服务及物联网设备的交互能力。这相当于为大型语言模型装上了感知和执行物理世界的 “眼睛、胳膊、腿”，使其不再局限于文本对话，而是通过 LLM 实现智能决策，与真实世界的设备和服务建立高效、安全的交互，真正构建起 AI 与物理系统之间的智能桥梁。

### 平台优势

- **专为 IoT 设备生态设计**：涂鸦生态设备即插即用，只需将 MCP Server 添加到智能体，设备端就可立即使用，无缝融入各类物联网场景。
- **支持多样化 MCP 服务接入**：除官方预置 MCP Server 外，还支持开发者自定义扩展 MCP 服务，兼具丰富的服务生态与个性化集成。
- **开发集成更简单**：只需在平台一次注册服务并集成轻量 SDK，即可快速实现 MCP Server 的多数据区接入与部署。
- **全球化服务部署支持**：覆盖全球五大区域的服务连接，支持就近低延迟接入，满足不同地区的业务部署与合规需求。
- **安全可靠的长连接通信**：基于 WebSocket 协议建立多区域的安全长连接，保障数据传输的机密性、完整性与可用性

平台 MCP 能力及官方 MCP 工具持续丰富中，请关注平台开放文档获取最新的资料。

# **快速入门**

### MCP 管理

前往 [涂鸦开发者平台 > **MCP 管理**](https://platform.tuya.com/exp/ai/mcp) 页面。

MCP 管理支持 **官方 MCP 服务** 查询和 **自定义 MCP 服务** 的管理。您可以通过切换标签页来查看官方提供的 MCP 服务和已经注册的自定义 MCP 服务。

![MCP 管理](https://images.tuyacn.com/content-platform/hestia/17557664456ad029785cf.png)

![MCP 管理](https://images.tuyacn.com/content-platform/hestia/175576649822930e33f2a.png)

如您尚未注册 MCP 服务，可以在 **自定义 MCP 服务** 下单击 **添加自定义 MCP**，注册一个自有的 MCP 服务到平台。注册成功后，您可在 MCP 服务列表查看其服务信息和配置。

关于如何开发自定义的 MCP Server，请参考 [自定义 MCP 服务](https://developer.tuya.com/cn/docs/iot/custom-mcp?id=Kety4zbdvwdn8)。

### 查看官方 MCP

在 **官方 MCP 服务** 页面，选择一个官方 MCP，点击进入后，可以查看服务详情以及工具详情。

![MCP 管理](https://images.tuyacn.com/content-platform/hestia/1755766914c10a49b6abe.png)

### 编辑自定义 MCP 的信息和配置

如查看自定义 MCP，详情页会展示其服务信息、接入配置、和工具详情。您也可以单击右上角的 **编辑** 修改服务信息并维护服务配置。

关于自定义 MCP 服务配置的详细介绍，请参考 [自定义 MCP 服务](https://developer.tuya.com/cn/docs/iot/custom-mcp?id=Kety4zbdvwdn8)。

![MCP 管理](https://images.tuyacn.com/content-platform/hestia/175574737684dc702dbd7.png)

![MCP 管理](https://images.tuyacn.com/content-platform/hestia/175576703334f02ff9c41.png)

### 调试 MCP Tools

涂鸦平台支持 MCP tools 的调试。

选择一个官方 MCP 服务，进入 **工具** 页面展开 **可用工具** 列表，并单击工具的 **试运行** 进行调试。

目前，只支持部署在 **中国数据中心** 的 MCP Server 进行工具调试。

![MCP 管理](https://images.tuyacn.com/content-platform/hestia/17557677871c7b2fca894.png)

![MCP 管理](https://images.tuyacn.com/content-platform/hestia/1755749148d44f6c66d24.png)

自定义 MCP 服务同样支持工具的调试，方法同官方 MCP 服务，可参考 [运行并调试 MCP 服务](https://developer.tuya.com/cn/docs/iot/custom-mcp?id=Kety4zbdvwdn8#title-3-%E8%BF%90%E8%A1%8C%E5%B9%B6%E8%B0%83%E8%AF%95%20MCP%20%E6%9C%8D%E5%8A%A1)。

### 添加 MCP Server 到智能体

1. 选择要添加 MCP Server 的智能体，单击 **操作** 栏的 **开发版本** 进入智能体编排页面。
    
    ![MCP 管理](https://images.tuyacn.com/content-platform/hestia/175619828998d1e6b24f9.png)
    
2. 在 **技能配置** 下，点击 **工具集** 右侧的添加（**+**）按钮。
    
    ![MCP 管理](https://images.tuyacn.com/content-platform/hestia/17587692384dd9604a50f.png)
    
3. 在 **添加工具** > **MCP** 页面，将官方/自定义 MCP 服务的工具添加到智能体下。
    
    详细操作，请参考 [在智能体中添加 MCP 服务](https://developer.tuya.com/cn/docs/iot/custom-mcp?id=Kety4zbdvwdn8#title-5-%E5%9C%A8%E6%99%BA%E8%83%BD%E4%BD%93%E4%B8%AD%E6%B7%BB%E5%8A%A0%20MCP%20%E6%9C%8D%E5%8A%A1)。
    
    ![MCP 管理](https://images.tuyacn.com/content-platform/hestia/17587695840d057a40507.png)
    

# **费用说明**

目前，智能体添加官方 MCP 服务暂时不收费，注册自定义 MCP 服务并添加到智能体暂时不收费。以上两项服务，保留未来收费的权利。