---
title: Database
---

# **Database**
# **Overview**

The database functionality is a structured data management module provided by the Tuya Developer Platform for **agents**. It enables agents to perform **data storage, retrieval, update, and deletion operations** during runtime via natural language or system logic.

Using the database functionality, developers can quickly equip agents with the following capabilities:

- Record user behavior and logs.
- Store personalized profiles and preferences.
- Manage data shared among multiple users.
- Construct business knowledge bases and backend data tables.

The platform provides three data modes to cater to different needs, ranging from personal interaction to collaborative sharing:

- **Single-user mode**: Each user has an independent data space.
- **Multi-user mode**: Users share or collaborate on the same dataset.
- **Developer mode**: Backend data is maintained by developers, while users can only query and use it.

# **Database modes**

| Mode | Typical scenario | Data type &read/write logic | Example |
| --- | --- | --- | --- |
| **Single-user mode** | Designed for personal data recording, companionship, and growth-oriented applications. Suitable for user-specific memories, learning logs, and health records. | • **Data type**: User-private data.
• **Read/write logic**: Only the owner can create, modify, or delete data.
• **Isolation strategy**: Data is isolated by user ID, product ID (PID), and agent. Data does not interfere across users, agents, or PIDs. | • **AI toy**: Records daily learning and growth events. For example, “Today I learned to build with blocks.”
• **AI diary assistant**: Records moods, feelings, and daily plans.
• **Spending tracker**: Records spending such as “Spent ¥35 on lunch today” and generates statistics. |
| **Multi-user mode** | Designed for sharing and interaction scenarios. Suitable for task boards, collaborative interactions, and social message boards. | • **Data type**: Public or group-shared data.
• **Read/write logic**: Multiple users can write data.
• **Synchronization**: Real-time updates across multiple devices and users. | • **Bottled message**: All users share a message pool. They can randomly draw messages or submit new ones.
• **AI task square**: Users record daily task completion and view rankings.
• **Class learning leaderboard**: Displays task completion rates and points for all members. |
| **Developer mode** | Designed for backend knowledge management and centralized data maintenance. Suitable for product information, book Q&A, and FAQ systems. | • **Data type**: Uniformly maintained by the developers.
• **Read/write logic**: Only developers can write or update data. Users can only query the data.
• **Permission control**: The agent has **read-only** permissions. | • **Product info agent**: Imports product parameters and descriptions at the backend. Users can query the product info via Q&A.
• **Library assistant**: Queries book authors, summaries, and status.
• **Enterprise knowledge base**: Centrally maintains business knowledge and policy documents for user queries. |

# **Example**

The following section demonstrates typical applications of the three modes in real-world agent scenarios.

### Single-user mode

| Example & description | Conversation example |
| --- | --- |
| **AI toy/growth tracker**:Creates an independent data table for each user to record daily learning and interactions. | • User: “Please note down that I learned to build with blocks today.”
• Agent: “Recorded: Today’s learning task - Building with blocks!” |
| **AI recorder/diary assistant**:Users record meetings, to-do lists, or mood logs via voice or text. Data is visible only to the user. | • User: “Note the meeting key point: Submit the new document by Friday.”
• Agent: “Task recorded: Submit the new document.” |

Sample interface of a **diary card**

![Database](https://images.tuyacn.com/content-platform/hestia/1761285546328a68989a9.png)

### Multi-user mode

| Example & description | Conversation example |
| --- | --- |
| **AI task square**:Multiple users share a task data table. The system automatically calculates task completion rates and rankings. | • User: “I finished reading two books today.”
• Agent: “Excellent! Your task completion rate is 100% today, currently ranked 3rd.” |
| **Bottled message/public bulletin board**:Users post messages to a public table, which can be randomly viewed or replied to by others. | • User: “I want to leave a message for the next person: Stay happy.”
• Agent: “Message sent! Let’s see who will receive it later.” |

### Developer mode

| Example & description | Conversation example |
| --- | --- |
| **Product Q&A agent**:Developers maintain product information (specifications, features, and FAQs) in the backend. The agent queries and returns results during conversations. | • User: “Does this light support Wi-Fi?”
• Agent: “Yes, it does! This product supports 2.4 GHz Wi-Fi connection.” |
| **Library assistant**:Book information is maintained in the backend. Users retrieve it via natural language queries. | • User: “Check the author of ‘Sapiens: A Brief History of Humankind’.”
• Agent: “The author of ‘Sapiens: A Brief History of Humankind’ is Yuval Noah Harari.” |

Sample interface of a **library AI assistant**:

![Database](https://images.tuyacn.com/content-platform/hestia/17612856904e280cca174.png)

# **Data import and testing**

| Item | Single-user mode | Multi-user mode | Developer mode |
| --- | --- | --- | --- |
| Test data import | Not supported | Not supported | Supported |
| Online data import | Not supported | Not supported | Supported |

Data import functionality is exclusively available in **Developer Mode** and must be performed by the project administrator.

# **Procedure**

### Create database

1. Go to the [My Agent](https://platform.tuya.com/exp/ai) page and click **Develop** in the **Operation** column of the desired agent.
    
    ![Database](https://images.tuyacn.com/content-platform/hestia/176128582435671f9fb0b.png)
    
2. Under **Model Configuration** > **Memory**, find **Database**, then click the Add (**+**) button on the right.
    
    ![Database](https://images.tuyacn.com/content-platform/hestia/1761285901976b679ca89.png)
    
3. On the **Select Database** page, click **Add database** in the top left corner, or bind an existing database from the list on the right.
    
    ![Database](https://images.tuyacn.com/content-platform/hestia/1761285981215c3e70578.png)
    
4. Define the data table structure. Refer to the configuration guide below. Based on the agent’s business type, define the table type, description, fields, and other relevant information.
    
    ![Database](https://images.tuyacn.com/content-platform/hestia/176128602759638e2b862.png)
    
    [Untitled](https://www.notion.so/2d1f8da2b9f580fa825ae13254bd9f7d?pvs=21)
    
    - The AI will intelligently infer the database structure based on the semantics you provide.
    - More specific descriptions yield more precise structures, including field names, purposes, and data types.
    - Supports multi-turn dialogue for fine-tuning field configurations. The system updates the structure definition in real-time.
5. After completing the form, click **Save**. The system will automatically initialize the table structure.
    
    If using **Developer Mode**, you can click **Import in bulk** to import sample data for testing.
    
    ![Database](https://images.tuyacn.com/content-platform/hestia/1761286386b07fd408c68.png)
    

### Testing and debugging

Proceed to the **Agent Debugging** step. You can choose to debug by scanning a QR code or use online debugging to verify the conversation responses.

Key factors that primarily influence the agent’s accuracy in correctly invoking the database include:

- Completeness of database and field descriptions: Clearer descriptions enable the AI to better understand the data’s purpose and structure.
- Clarity of database usage rules in the agent prompt: Explicitly defining in the prompt which scenarios should trigger queries or writes, supplemented with relevant examples, helps the AI automatically select the correct database behavior.

![Database](https://images.tuyacn.com/content-platform/hestia/176128677075d94babcae.png)