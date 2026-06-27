---
title: Agent Evaluation
---

Agent evaluation tests how well an agent's orchestration works and whether it meets your expected capabilities and performance. You import a test dataset, run the agent against it in batch, and analyze the outputs to get objective quality metrics — so you can keep tuning the workflow as you debug.

## Features

- **Batch data testing**: Import scenario-based datasets to simulate user dialogues, run them in batch, and collect outputs for a full assessment of response quality.
- **AI model-assisted analysis**: Let an AI model evaluate the results automatically, returning quality judgments and performance scores to speed up analysis.
- **Multi-dimensional comparison**: Compare and annotate results online, benchmark across versions, and trace knowledge-base retrieval for detailed diagnostics.

## Batch testing

Go to the [My Agent](https://platform.tuya.com/exp/ai) list, select an agent, then click **…** > **Batch Testing** in the **Operation** column.

![My Agent list with the Batch Testing action](https://images.tuyacn.com/content-platform/hestia/1749780996a0816f98275.png)

Alternatively, click **Manage** in the **Operation** column to open the agent details page, then click **Batch Testing** in the top right corner.

![Agent details page with Batch Testing button](https://images.tuyacn.com/content-platform/hestia/1749781122dce852a1e1a.png)

:::note
Only agents with an officially released version can be batch tested.
:::

## AI evaluation configuration

The platform can use an AI evaluation model to analyze test results automatically. When you [create an evaluation task](https://developer.tuya.com/en/docs/iot/ai-agent-evaluation?id=Kenth7s0bxavo#test) with the **AI Evaluation** debug type, the system invokes the model to analyze the agent's outputs and generate a report.

1. Click **AI Evaluation Configuration** in the top right corner. This configuration applies only to the current agent. Every **AI evaluation** task you create for this agent reuses it.

   ![AI Evaluation Configuration entry](https://images.tuyacn.com/content-platform/hestia/1749781186ac5a9bab699.png)

2. Configure both the **Evaluation Model** and the **Evaluation Prompt**.

   ![Evaluation model and prompt fields](https://images.tuyacn.com/content-platform/hestia/17497813352424e98512f.png)

   Enter the prompt manually, or click **Prompt Template** in the lower-left corner to preview a template and click **Use** to apply it. Click **Switch to English** or **Switch to Chinese** to change the template language. Chinese and English are supported.

   ![Prompt template selection](https://images.tuyacn.com/content-platform/hestia/174978140455c5220fa9e.png)

   When done, click **OK**.

3. Each save creates a historical version of the configuration. In the **History** section on the right, click **Details** to view a version, or click **Restore this version** to roll back to it.

   ![Configuration history list](https://images.tuyacn.com/content-platform/hestia/1749781466e17d8668a59.png)

   ![Historical version details](https://images.tuyacn.com/content-platform/hestia/17497815144467da430f8.png)

## Create a task

On the batch testing task list, click **Create Task** in the top right corner. You can evaluate any released version of the agent.

![Create Task entry](https://images.tuyacn.com/content-platform/hestia/17497815658cfe2625162.png)

![Create Task form](https://images.tuyacn.com/content-platform/hestia/174978162146ca025095e.png)

| Field | Description |
| --- | --- |
| Data Region | The data center where the agent is deployed. Task data is also saved here. |
| Agent | The name of the agent. |
| Select Version | A historical version of the current agent. |
| Test Task Name | The name of the evaluation task. |
| Debug Type | **Agent Execution** runs the test data and outputs results. **AI Evaluation** runs the agent, then has the AI evaluation model analyze the outputs and return results. |
| Import Data | Import test data from a spreadsheet, one file at a time. Click **Download Test Set Template** and format your data to the template to avoid parsing failures. |

When done, click **Save and Execute Immediately** to run the task.

## Evaluation result

After the task finishes, click **Details** to view results online, or click **Download** to download the result file.

![Evaluation results view](https://images.tuyacn.com/content-platform/hestia/17497816824baba2eed77.png)

If the agent is linked to a knowledge base, click **View Retrieval** in the results to see the retrieval details.

![Knowledge base retrieval details](https://images.tuyacn.com/content-platform/hestia/174978174609e881426ae.png)

| Field | Description |
| --- | --- |
| Input | The test case data you uploaded. |
| Expected Output | The response you expect for the input. |
| Actual Output | The result the agent produced. |
| Evaluation Result | A manual annotation. Mark each result pass or fail and add comments. |
| Evaluation Description | For **AI evaluation**, the model's opinion. For **agent execution**, empty until you annotate it. |
| Additional Information | Add remarks as needed. |
| Knowledge Retrieval | If the agent is linked to a knowledge base, the retrieval details for this input. Retrieval details cannot be exported. |

## Result comparison

You can compare any two tasks of an agent online. On the **Batch Testing** task list, click **Result Comparison**, select two historical tasks, then click **Result Comparison** to see the details.

![Result comparison selection](https://images.tuyacn.com/content-platform/hestia/174978178451339a8dad4.png)

![Result comparison details](https://images.tuyacn.com/content-platform/hestia/17497819046785b875f5f.png)

You can also download the result files and compare them in detail locally.

## Billing

Agent evaluation is free. The tokens consumed by running an evaluation task are billed at standard rates.

Go to the [Resource Consume](https://platform.tuya.com/exp/ai/tokenUsage) page for detailed token consumption. You can also select an agent, open the **Batch Testing** list, and check the **Token Consumption** column for each task.

![Token consumption view](https://images.tuyacn.com/content-platform/hestia/174978194822bc66d1466.png)

## See also

- [Agent Metering and Billing](agent-metering-and-billing) — model and voice unit prices
- [Role Management](role-management) — define the roles you test
