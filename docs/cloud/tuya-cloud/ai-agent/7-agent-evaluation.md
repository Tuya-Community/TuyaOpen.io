---
title: Agent Evaluation
---

# **Agent Evaluation**
# **Overview**

AI agent evaluation refers to the process of systematically testing, visually analyzing, and assessing the orchestration effectiveness of AI agents, and verifying whether they meet expected capabilities and performance benchmarks. During orchestration debugging, the evaluation can provide objective quality assessment metrics to help you continuously optimize agent workflows and enhance performance.

You can import test datasets from target scenarios, systematically invoke the agent to collect output results, and analyze them to evaluate the agent’s capabilities and effectiveness.

# **Features**

- **Batch data testing**: Import scenario-based test datasets to simulate user dialogues, execute batch processing, and collect agent outputs for comprehensive evaluation of response quality and effectiveness.
- **AI model-assisted analytics**: Enable automated evaluation of test results through AI models, and deliver quality judgments and performance scores to enhance analysis efficiency.
- **Multi-dimensional comparative analytics**: Support online test result comparison/annotation, cross-version benchmarking, and knowledge-base traceability for detailed diagnostics.

# **Batch testing**

Go to the [My Agent](https://platform.tuya.com/exp/ai) list page, select an agent, and then click **…** > **Batch Testing** in the **Operation** column.

![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/1749780996a0816f98275.png)

Alternatively, click **Manage** in the **Operation** column to enter the agent details page. And then, click **Batch Testing** in the top right corner of the page to enter the evaluation page.

![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/1749781122dce852a1e1a.png)

Only agents that have officially released a version can be batch tested.

# **AI evaluation configuration**

The platform supports AI evaluation models to automatically analyze test results. When [creating an evaluation task](https://developer.tuya.com/en/docs/iot/ai-agent-evaluation?id=Kenth7s0bxavo#test), select the **AI Evaluation** debug type, and the system will automatically invoke the model to analyze the agent’s test results and generate an analytical report.

1. Click **AI Evaluation Configuration** in the top right corner of the page. The AI evaluation configuration is only valid for the current agent. When you create one or more **AI evaluation** tasks for this agent, the system will reference this evaluation configuration.
    
    ![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/1749781186ac5a9bab699.png)
    
2. Both the **Evaluation Model** and **Evaluation Prompt** must be configured.
    
    ![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/17497813352424e98512f.png)
    
    You can manually enter evaluation prompts or click the **Prompt Template** in the lower-left corner to view template content, and then select **Use** to apply it. You can also click **Switch to English** or **Switch to Chinese** to change the language of the prompt template. Currently, Chinese and English are supported.
    
    ![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/174978140455c5220fa9e.png)
    
    After configuration is complete, click **OK**.
    
3. After each save, the system will generate a historical version of the configuration by default. Click **Details** in the **History** section on the right to view the contents of historical versions. Also, you can click **Restore this version** to restore the configuration of a historical version.
    
    ![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/1749781466e17d8668a59.png)
    
    ![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/17497815144467da430f8.png)
    

# **Create a task**

On the batch testing task list page, click **Create Task** in the top right corner to create an evaluation task for the agent. You can evaluate all released versions of the agent.

![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/17497815658cfe2625162.png)

![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/174978162146ca025095e.png)

**Fields of creating a task**

| Field name | Description |
| --- | --- |
| Data Region | The data center where the specified agent is deployed. Task data is also saved in this data center. |
| Agent | The name of the specified agent. |
| Select Version | Select a historical version of the current agent. |
| Test Task Name | The name of the specified evaluation task. |
| Debug Type | There are two debug types:
• **Agent Execution**: The agent executes test data and outputs results.
• **AI Evaluation**: After agent execution, the AI evaluation model automatically analyzes outputs and provides analytic results. |
| Import Data | Import test data from a spreadsheet file. Only one file can be uploaded at a time. Click **Download Test Set Template**, format, and upload your data according to the template to avoid parsing failures. |

After the configuration is completed, click **Save and Execute Immediately** to start executing the test task.

# **Evaluation result**

After the task is completed, click **Details** to view the execution results online, or click **Download** to download the result file.

![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/17497816824baba2eed77.png)

If the agent is linked with a knowledge base, you can click **View Retrieval** in the results to view the details of the knowledge base search.

![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/174978174609e881426ae.png)

**Fields of evaluation results**

| Field name | Description |
| --- | --- |
| Input | The test case data you uploaded. |
| Expected Output | The expected response content after the test data is input to the agent. |
| Actual Output | The results actually generated by the agent. |
| Evaluation Result | Manual custom annotation. You can label test results with pass/fail markers and add descriptive comments for further analytics. |
| Evaluation Description | • If the debug type is **AI evaluation**, the model evaluation opinion is displayed.
• If the debug type is **agent execution**, the field is empty and can be manually labeled. |
| Additional Information | You can add remarks as needed. |
| Knowledge Retrieval | If the agent is linked with a knowledge base, you can view the details of the agent’s retrieval of the knowledge base after the current data is input. Knowledge base retrieval details cannot be exported as files. |

# **Result comparison**

On the platform, you can compare any two tasks of your agent online. On the list page of **Batch Testing** tasks, click **Result Comparison**. Select any two historical tasks and click **Result Comparison** to show the details.

![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/174978178451339a8dad4.png)

![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/17497819046785b875f5f.png)

You can also download the task execution result file and make a more detailed comparison locally.

# **Billing**

The agent evaluation functionality is currently free of charge, and the token consumption generated by executing the evaluation task follows standard billing rates.

Go to the [Resource Consume](https://platform.tuya.com/exp/ai/tokenUsage) page to view detailed token consumption. Also, you can select an agent, go to the **Batch Testing** list, and check the **Token Consumption** column of each task.

![Agent Evaluation](https://images.tuyacn.com/content-platform/hestia/174978194822bc66d1466.png)