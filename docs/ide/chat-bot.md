---
title: "your_chat_bot — cloud AI Agent"
description: "Build the classic AI + IoT project end-to-end: create from an example, build and flash, authorize, and pair — the cloud IoT / AI Agent flow in the IDE."
sidebar_label: "Practice 2 — your_chat_bot"
sidebar_position: 4
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - embedded development
---

This is the classic TuyaOpen **AI + IoT** project. The focus here is the **cloud IoT / AI Agent development flow inside the IDE**.

## Two development modes {/* #modes */}

| Mode | Suited for | Steps |
| --- | --- | --- |
| **Basic** (recommended for beginners) | New to TuyaOpen or AI | Use the official **default PID** directly (feature and agent configuration already done). |
| **Advanced** | Building your own product | 1. Create a PID · 2. Create an Agent · 3. Bind the Agent to the PID. |

This practice uses **Basic** mode — fast for beginners and a real taste of three-ends-in-one.

## Step 1: Create a project from an example {/* #step-1 */}

1. Click **Demos** in the IDE sidebar, choose **AI voice chatbot**, and click **Create project**.
2. Select **Tuya T5AI** and the **Tuya T5AI-Board**, plus the 3.5-inch LCD touch screen (optional).

   ![Examples gallery — AI voice chatbot](https://images.tuyacn.com/fe-static/docs/img/397ff01f-055f-4424-bcab-4d48566d4790.png?imageMogr2/format/webp)

3. Follow the prompt to grab the OEM example PID. This opens the Tuya Developer Platform in your browser. For what a PID is, see [PID](/docs/quick-start#pid).

   ![OEM example PID — jump to the developer platform](https://images.tuyacn.com/fe-static/docs/img/58f92545-cd6e-442d-ac90-29f612fbe30c.png?imageMogr2/format/webp)

4. Click **Copy product**, fill in a product name and model number, and confirm.

   ![Copy product dialog](https://images.tuyacn.com/fe-static/docs/img/4d825e7e-8e02-4ddf-a1a6-80849b15f17b.png?imageMogr2/format/webp)

5. Copy the PID on the left.

   ![Copy the PID on the left](https://images.tuyacn.com/fe-static/docs/img/b2e15e19-8cf1-4882-9e26-ef827e1ecd23.png?imageMogr2/format/webp)

6. Back in TuyaOpen IDE, paste the PID and click **Next** to create the project.

   ![Paste the PID and create the project in the IDE](https://images.tuyacn.com/fe-static/docs/img/3938e443-6ed2-4c2f-9f24-89aca45058b8.png?imageMogr2/format/webp)

:::note
**Why copy?** Copying quickly produces a product with the same features as the default PID. For AI + IoT products it also copies the Agent already bound to that product.
:::

## Step 2: Build and flash {/* #step-2 */}

1. In **Cloud IoT/Agent Dev** you can see that the cloud product is now bound.

   ![Cloud IoT / Agent page — product bound](https://images.tuyacn.com/fe-static/docs/img/7a2c1274-33a7-449e-8151-8d798246a2f6.png?imageMogr2/format/webp)

2. Open **Project Details** and build and flash. At the bottom of the page you can see the Vibe Coding hardware view and all pin states.

   ![Project Details — Vibe Coding hardware view](https://images.tuyacn.com/fe-static/docs/img/438b6332-27ac-4f51-b210-a6123544016c.png?imageMogr2/format/webp)

3. After flashing succeeds, the touch screen lights up.

## Step 3: Authorize the device {/* #step-3 */}

The license key (UUID + AuthKey) is the credential a device uses to reach the cloud, obtained from the [Tuya IoT Platform](https://platform.tuya.com/).

1. For the concept of license keys and how to get them, see [TuyaOpen license keys](/docs/quick-start#tuyaopen-dedicated-license) and the [authorization guide](/pricing-guide). For this practice, claim two free license keys first. Back on the [Tuya Developer Platform](https://platform.tuya.com/), open **AI Products → Product Development** to see the OEM example product from step 1.

   ![OEM example product in the developer platform](https://images.tuyacn.com/fe-static/docs/img/be72be79-2f49-4c60-8fe8-9a9e50c2ceb3.png?imageMogr2/format/webp)

2. Click **Continue development** on the right.

   ![Continue development on the platform](https://images.tuyacn.com/fe-static/docs/img/0fc5dab7-82cc-4537-afdb-b2d1197614c9.png?imageMogr2/format/webp)

3. Under the **Hardware Development** tab, in the selected cloud-access hardware section, click **Get 2 Free Licenses**.

   ![Get 2 Free Licenses button](https://images.tuyacn.com/fe-static/docs/img/8522d564-b896-4de8-aeb3-d7330b8d2fd8.png?imageMogr2/format/webp)

   ![License keys claimed](https://images.tuyacn.com/fe-static/docs/img/4482dd52-cf2c-4ef0-b3fa-5daf4eaa717b.png?imageMogr2/format/webp)

   ![License key list detail](https://images.tuyacn.com/fe-static/docs/img/23162601-a6a5-4157-8eca-0eb00445734a.png?imageMogr2/format/webp)

4. Download the license key list.

   ![Download the license key list](https://images.tuyacn.com/fe-static/docs/img/c7a70c96-d40f-4531-8a1e-fd83a077df86.png?imageMogr2/format/webp)

5. Enter the license keys in the IDE's **Licenses** panel (**Key Management**).

   ![IDE license key manager](https://images.tuyacn.com/fe-static/docs/img/172d82a3-f243-46ec-9281-f066e51d3dfc.png?imageMogr2/format/webp)

6. Use AI to write the license key to the device.

   ![AI writes the license key to the device](https://images.tuyacn.com/fe-static/docs/img/a49057fc-d645-4865-b8f7-c4fb6a73e002.png?imageMogr2/format/webp)

## Step 4: Pair the device {/* #step-4 */}

1. Follow the official [device network configuration](/docs/quick-start/device-network-configuration) steps to pair the device.
2. Once paired, you can switch the AI Agent you talk to from the mini-app panel.

   ![Switch AI Agent from the mini-app panel](https://images.tuyacn.com/fe-static/docs/img/9cb76469-cee7-44e3-84a8-1d54bdb1fb54.png?imageMogr2/format/webp)

3. Double-tap the board **KEY** button to switch conversation mode. The current project supports the wake words "你好涂鸦" / "Hey Tuya".

:::info
**Going further — building your own Agent (Advanced mode)**: see the [Agent Development Guide](./agent-development.md).
:::

## Next step {/* #next */}

You have a cloud-connected device. Continue with [Practice 3: mini-app panel](./miniapp-panel.md) — build the phone control panel for it.

