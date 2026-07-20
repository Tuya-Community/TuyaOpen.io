This is the classic TuyaOpen **AI + IoT** project. The focus here is the **cloud IoT / AI Agent development flow inside the IDE**.

<section id="modes" className="section">

## Two development modes

| Mode | Suited for | Steps |
| --- | --- | --- |
| **Basic** (recommended for beginners) | New to TuyaOpen or AI | Use the official **default PID** directly (feature and agent configuration already done). |
| **Advanced** | Building your own product | 1. Create a PID · 2. Create an Agent · 3. Bind the Agent to the PID. |

This practice uses **Basic** mode — fast for beginners and a real taste of three-ends-in-one.

</section>

<section id="step-1" className="section">

## Step 1: Create a project from an example

1. Click **Examples** in the IDE toolbar, choose **AI voice chatbot**, and click **Create project**.
2. Select **Tuya T5AI** and the **Tuya T5AI-Board**, plus the 3.5-inch LCD touch screen (optional).

   ![Examples gallery — AI voice chatbot](/img/ide/get-started/examples-ai-voice-chatbot.png)

3. Follow the prompt to grab the OEM example PID. This opens the Tuya Developer Platform in your browser. For what a PID is, see [PID](/docs/quick-start#pid).

   ![OEM example PID — jump to the developer platform](/img/ide/get-started/oem-pid-jump-to-developer-platform.png)

4. Click **Copy product**, fill in a product name and model number, and confirm.

   ![Copy product dialog](/img/ide/get-started/copy-product-dialog.png)

5. Click to enter the development flow.

   ![Enter the development flow](/img/ide/get-started/enter-development-flow.png)

   ![Development flow detail](/img/ide/get-started/development-flow-detail.png)

6. Copy the PID in the top left.

   ![Copy the PID from the product](/img/ide/get-started/copy-pid-from-product.png)

7. Back in TuyaOpen IDE, paste the PID and click **Next** to create the project.

   ![Paste the PID and create the project in the IDE](/img/ide/get-started/ide-paste-pid-create-project.png)

:::note
**Why copy?** Copying quickly produces a product with the same features as the default PID. For AI + IoT products it also copies the Agent already bound to that product.
:::

</section>

<section id="step-2" className="section">

## Step 2: Build and flash

1. In **Cloud IoT / Agent development** you can see that the cloud product is now bound.

   ![Cloud IoT / Agent page — product bound](/img/ide/get-started/cloud-iot-agent-product-bound.png)

2. Open **Project Details** and build and flash. At the bottom of the page you can see the Vibe Coding hardware view and all pin states.

   ![Project Details — Vibe Coding hardware view](/img/ide/get-started/project-details-vibe-hardware-view.png)

3. After flashing succeeds, the touch screen lights up.

</section>

<section id="step-3" className="section">

## Step 3: Authorize the device

The license key (UUID + AuthKey) is the credential a device uses to reach the cloud, obtained from the [Tuya IoT Platform](https://platform.tuya.com/).

1. For the concept of license keys and how to get them, see [TuyaOpen license keys](/docs/quick-start#tuyaopen-dedicated-license) and the [authorization guide](/pricing-guide). For this practice, claim two free license keys first. Back on the [Tuya Developer Platform](https://platform.tuya.com/), open **AI Products → Product Development** to see the OEM example product from step 1.

   ![OEM example product in the developer platform](/img/ide/get-started/oem-product-example-in-platform.png)

2. Click **Continue development** on the right.

   ![Continue development on the platform](/img/ide/get-started/developer-platform-continue-development.png)

3. Under **03 Hardware development**, in the selected cloud-access hardware section, click **Claim 2 free license keys**.

   ![Claim free license keys](/img/ide/get-started/claim-free-license-keys.png)

   ![License keys claimed](/img/ide/get-started/license-keys-claimed.png)

   ![License key list detail](/img/ide/get-started/license-key-list-detail.png)

4. Download the license key list.

   ![Download the license key list](/img/ide/get-started/download-license-key-list.png)

5. Enter the license keys into the TuyaOpen IDE license key manager.

   ![IDE license key manager](/img/ide/get-started/ide-license-key-manager.png)

6. Use AI to write the license key to the device.

   ![AI writes the license key to the device](/img/ide/get-started/ai-write-license-to-device.png)

</section>

<section id="step-4" className="section">

## Step 4: Pair the device

1. Follow the official [device network configuration](/docs/quick-start/device-network-configuration) steps to pair the device.
2. Once paired, you can switch the AI Agent you talk to from the mini-app panel.

   ![Switch AI Agent from the mini-app panel](/img/ide/get-started/miniapp-switch-agent.png)

3. Double-tap the board **KEY** button to switch conversation mode. The current project supports the wake words "你好涂鸦" / "Hey Tuya".

:::info
**Going further — building your own Agent (Advanced mode)**: see the [Agent Development Guide](/learn/tuyaopen-ide-agent-dev).
:::

</section>

<section id="next" className="section">

## Next step

You have a cloud-connected device. Continue with [Practice 3: mini-app panel](/learn/tuyaopen-ide-practice-3) — build the phone control panel for it.

</section>
