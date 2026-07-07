---
title: Workflow Management
description: "Workflow Management on Tuya — a visual drag-and-drop workbench to build, automate, and optimize an agent's business logic and reduce hallucinations."
keywords:
  - workflow management
  - tuya ai agent
  - visual workbench
  - agent logic
  - tuya cloud
---

A workflow is a visual workbench for simplifying and automating an agent's business logic. You create, manage, and optimize workflows on a drag-and-drop interface to improve an agent's efficiency and reduce hallucinations.

## Create a workflow

On the [Workflow](https://platform.tuya.com/exp/workflow) page, click **Create Workflow** in the top-right corner, enter a **Workflow Name** and **Workflow Description**, and the workflow project is created.

![Create workflow dialog](https://images.tuyacn.com/content-platform/hestia/1738741167d3cf2421e0a.png)

## Configure the workflow

### Visual workbench

Build the workflow by dragging and dropping nodes. Each node defines a distinct task or decision, which makes the whole process easy to read.

![Visual workbench](https://images.tuyacn.com/content-platform/hestia/175551024951299d2e04e.png)

### Start node

The start node defines the information needed to launch the workflow. Its default input variable is `USER_TEXT`.

![Start node](https://images.tuyacn.com/content-platform/hestia/175550791955841ddd280.png)

Click **Add Node** to add the following nodes and build out the workflow:

- [Intent recognition node](https://developer.tuya.com/en/docs/iot/ai-agent-workflow?id=Keak4gh7rdhd2#recognition)
- [Large language model node](https://developer.tuya.com/en/docs/iot/ai-agent-workflow?id=Keak4gh7rdhd2#llm)
- [Output node](https://developer.tuya.com/en/docs/iot/ai-agent-workflow?id=Keak4gh7rdhd2#output)

### Intent recognition node

The intent recognition node identifies and classifies the intent behind user input. Once you set up an intent recognition model, the system reads the user's input and classifies it accordingly.

![Intent recognition node](https://images.tuyacn.com/content-platform/hestia/1755508032eeeceece2a7.png)

Choose **simple mode** or **full mode**.

**Simple mode**:

- **Model** — select a suitable model.
- **Input** — set the parameters used to determine intent. A common input is `USER_TEXT`.
- **Intent Recognition** — set the intents to recognize and the options to match against user input.
- **Exception handling** — set the timeout, retry logic, and exception-handling method.

**Full mode** adds a **System Prompt** with variable support on top of simple mode. The system prompt interprets the input for a deeper read of user intent.

### Large language model node

The large language model node is a dialogue node built on a large model. It generates high-quality responses from the variables and prompts you configure.

![Large language model node](https://images.tuyacn.com/content-platform/hestia/17555093599e33ff38d9a.png)

- **Session history** — when enabled, the node sends the session context to the model so user input stays contextually consistent.
- **Input** — the information to add to the prompts. Supports dynamic variable references.
- **Model** — select the model you want.
- **System prompt** — set the model's base behavior, such as role descriptions, examples, and output constraints. Supports variable-reference syntax.
- **User prompt** — the user instruction the model processes, such as a query or text request. The prompt typically references the user input variable `USER_TEXT`.
- **Output** — store the model's generated content as a variable value for downstream nodes.
- **Exception handling** — set the timeout, retry logic, and exception-handling method.

### Output node

The output node supports intermediate processing and message output. It offers two output modes, streaming and non-streaming, for flexible data output.

![Output node](https://images.tuyacn.com/content-platform/hestia/17555081638b32d07d729.png)

- **Input variable** — supports dynamic variable references in prompts.
- **Output content** — supports variable-reference syntax. With **streamed output** enabled, the model generates content word by word in real time.

### End node

The end node closes a logic branch. You configure it the same way as an output node.

![End node](https://images.tuyacn.com/content-platform/hestia/1755508207ac49aeb4ca7.png)

:::warning
The workflow fails to run if any logic branch does not converge on an end node.
:::

## Test run

Select a data center that matches the large model set in the workflow, enter sample input in `USER_TEXT`, and start the trial run to get the output.

![Test run](https://images.tuyacn.com/content-platform/hestia/1755509087d0b8bd57ed9.png)

## Publish the workflow

When configuration is complete, click **Publish** in the top-right corner of the workbench. Tuya runs a logic check on the workflow to ensure it is complete; once the check passes, the workflow is published.

![Publish workflow](https://images.tuyacn.com/content-platform/hestia/17387367985ed6a35665b.png)

After publishing, select the workflow in the agent and click **Add Workflow** to attach it.

![Add workflow to agent](https://images.tuyacn.com/content-platform/hestia/1755508599f5290cbef54.png)

## See also

- [AI Agent Dev Platform](ai-agent-dev-platform) — create an agent and attach a workflow to it
- [Variables Management](variables-management) — the variables a workflow reads and writes
