This practice turns to the **interface** — you use Tuya mini-app technology to build a device control panel that runs inside the phone app and talks to the firmware through **DP (Data Points)**. The two sides cooperate over DP: the firmware defines and reports DPs, and the panel reads and sends DPs.

<section id="dp-model" className="section">

## How firmware and panel cooperate over DP

Firmware and panel are two independent programs that communicate through DP:

- **Firmware side**: define DPs in TuyaOpen IDE (for example `switch_led`) and report them.
- **Panel side**: use the mini-app API — `publishDps` to send, `onDpDataChange` to listen — to control the device.

:::note
**Prerequisite**: at least one device that can reach the Tuya Cloud. Build one first in [Practice 2](/learn/tuyaopen-ide-practice-2).
:::

</section>

<section id="step-1" className="section">

## Step 1: Account and product

1. Open **Mini App Panel Dev** and follow the three steps on the right.

   ![Mini-app panel development — three steps](/img/ide/get-started/miniapp-panel-dev-three-steps.png)

2. After Practice 2 you are already logged in and have a bound product. Now go to the developer platform to create a mini-app for binding.

   ![Create a mini-app on the developer platform](/img/ide/get-started/developer-platform-create-miniapp.png)

3. Create a new mini-app panel.

   ![Create a mini-app panel](/img/ide/get-started/create-miniapp-panel.png)

4. Select the **panel mini-app** type.

   ![Select the panel mini-app type](/img/ide/get-started/select-panel-miniapp-type.png)

5. After creating it, close the page and return to the IDE, then click **Refresh**. You see the panel mini-app you just created on the developer site — click **Select**.

   ![Bind the panel mini-app](/img/ide/get-started/bind-panel-miniapp.png)

</section>

<section id="step-2" className="section">

## Step 2: Debug and preview

1. Click **Build MiniApp** on the right to build the mini-app and render the panel. The panel appears below on a virtual device.

   ![Mini-app debug and preview](/img/ide/get-started/miniapp-debug-and-preview.png)

2. Click the virtual panel on the left to interact; the right side shows the DP data for the virtual device interaction.

   ![Virtual panel and DP interaction](/img/ide/get-started/virtual-panel-dp-interaction.png)

3. Now you can personalize the mini-app code. After editing, rebuild and re-render to preview. Installing the IDE-provided skills speeds this up — see [Vibe Coding skills](/learn/tuyaopen-ide-vibe-coding).

</section>

<section id="step-3" className="section">

## Step 3: Upload and publish

1. Click **Upload to Cloud** on the right to upload the mini-app. Once it uploads, go to the Tuya Developer Platform to submit it for review and publish.

   ![Upload the mini-app to the cloud](/img/ide/get-started/miniapp-upload-to-cloud.png)

2. Open **Basic settings**, fill in the mini-app description and English display name, and upload a preview image.

   ![Panel basic settings — intro and preview image](/img/ide/get-started/panel-basic-settings-intro.png)

3. Open **Version management** and submit for review.

   ![Version management — submit for review](/img/ide/get-started/panel-version-management-submit.png)

4. Open the review version and wait. After a few minutes, refresh to see it approved, then publish.

   ![Review approved — publish](/img/ide/get-started/panel-review-approved-publish.png)

</section>

<section id="step-4" className="section">

## Step 4: Bind the mini-app to the product

After developing the mini-app, to use the panel in the phone app you need to bind it to the product.

1. Back in the IDE, open **Project Details** and click **Rebind MiniApp**.

   ![Rebind MiniApp in Project Details](/img/ide/get-started/project-details-rebind-miniapp.png)

2. Click **Change Panel** and choose the custom panel.

   ![Change the custom panel in the IDE](/img/ide/get-started/ide-reselect-custom-panel.png)

3. Select the custom panel — you can now see the published mini-app panel.

   ![Published custom panel](/img/ide/get-started/smartlife-app-custom-panel.png)

4. You can now see the latest panel in the SmartLife app.

</section>

<section id="next" className="section">

## Where to go deeper

| Want to | Go here |
| --- | --- |
| Speed up development with AI | [Vibe Coding skills](/learn/tuyaopen-ide-vibe-coding) |
| Build your own cloud Agent | [Agent Development Guide](/learn/tuyaopen-ide-agent-dev) |
| Build device control panels | [Panel Mini-App portal](https://developer.tuya.com/cn/panel-miniapp) |
| Learn the mini-app technology / API | [Tuya Mini-App docs](https://developer.tuya.com/en/miniapp/) |
| Build a panel with no code | [Panel Studio](https://developer.tuya.com/cn/panel-studio) |

</section>
