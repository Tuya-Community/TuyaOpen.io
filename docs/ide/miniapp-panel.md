---
title: "Mini-app panel"
description: "Build a device control panel that runs in the phone app and cooperates with the firmware over DP (Data Points) — create, bind, preview, and publish."
sidebar_label: "05 Practice 3 — mini-app panel"
sidebar_position: 5
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - embedded development
---

This practice turns to the **interface** — you use Tuya mini-app technology to build a device control panel that runs inside the phone app and talks to the firmware through **DP (Data Points)**. The two sides cooperate over DP: the firmware defines and reports DPs, and the panel reads and sends DPs.

## How firmware and panel cooperate over DP {/* #dp-model */}

Firmware and panel are two independent programs that communicate through DP:

- **Firmware side**: define DPs in TuyaOpen IDE (for example `switch_led`) and report them.
- **Panel side**: use the mini-app API — `publishDps` to send, `onDpDataChange` to listen — to control the device.

:::note
**Prerequisite**: at least one device that can reach the Tuya Cloud. Build one first in [Practice 2](./chat-bot.md).
:::

## Step 1: Account and product {/* #step-1 */}

1. Open **Mini App Panel Dev** and follow the three steps on the right.

   ![Mini-app panel development — three steps](https://images.tuyacn.com/fe-static/docs/img/b3a85f2b-e523-4ae1-9bb1-cc4f01939070.png?imageMogr2/format/webp)

2. After Practice 2 you are already logged in and have a bound product. Now go to the developer platform to create a mini-app for binding.

   ![Create a mini-app on the developer platform](https://images.tuyacn.com/fe-static/docs/img/0bbe598a-56f9-4409-b8e1-afd30f1012e2.png?imageMogr2/format/webp)

3. Create a new mini-app panel.

   ![Create a mini-app panel](https://images.tuyacn.com/fe-static/docs/img/f01673cd-6ef6-43bf-aa7c-5933a881d440.png?imageMogr2/format/webp)

4. Select the **panel mini-app** type.

   ![Select the panel mini-app type](https://images.tuyacn.com/fe-static/docs/img/13211ba4-0799-4ee3-9613-60a4d558bdc7.png?imageMogr2/format/webp)

5. After creating it, close the page and return to the IDE, then click **Refresh**. You see the panel mini-app you just created on the developer site — click **Select**.

   ![Bind the panel mini-app](https://images.tuyacn.com/fe-static/docs/img/f90a0505-4571-4a66-8b19-09be053af678.png?imageMogr2/format/webp)

## Step 2: Debug and preview {/* #step-2 */}

1. Click **Build MiniApp** on the right to build the mini-app and render the panel. The panel appears below on a virtual device.

   ![Mini-app debug and preview](https://images.tuyacn.com/fe-static/docs/img/e0b8d6eb-2620-4542-aaec-713e3c0014b1.png?imageMogr2/format/webp)

2. Click the virtual panel on the left to interact; the right side shows the DP data for the virtual device interaction.

   ![Virtual panel and DP interaction](https://images.tuyacn.com/fe-static/docs/img/ba79494f-fb48-42a9-9e7d-ec0cb0fcecb8.png?imageMogr2/format/webp)

3. Now you can personalize the mini-app code. After editing, rebuild and re-render to preview. Installing the IDE-provided skills speeds this up — see [Vibe Coding skills](./vibe-coding.md).

## Step 3: Upload and publish {/* #step-3 */}

1. Click **Upload to Cloud** on the right to upload the mini-app. Once it uploads, go to the Tuya Developer Platform to submit it for review and publish.

   ![Upload the mini-app to the cloud](https://images.tuyacn.com/fe-static/docs/img/ac057619-c797-4ee4-9b89-e97ee2ae34d9.png?imageMogr2/format/webp)

2. Open **Basic settings**, fill in the mini-app description and English display name, and upload a preview image.

   ![Panel basic settings — intro and preview image](https://images.tuyacn.com/fe-static/docs/img/2b6a3690-82b7-4fbe-9b98-ba43e9da351d.png?imageMogr2/format/webp)

3. Open **Version management** and submit for review.

   ![Version management — submit for review](https://images.tuyacn.com/fe-static/docs/img/b8f145ad-060a-440f-99a4-f9cdff9b647f.png?imageMogr2/format/webp)

4. Open the review version and wait. After a few minutes, refresh to see it approved, then publish.

   ![Review approved — publish](https://images.tuyacn.com/fe-static/docs/img/98a540f2-2140-4afb-9fe9-bbde962a9352.png?imageMogr2/format/webp)

## Step 4: Bind the mini-app to the product {/* #step-4 */}

After developing the mini-app, to use the panel in the phone app you need to bind it to the product.

1. Back in the IDE, open **Project Details** and click **Rebind MiniApp**.

   ![Rebind MiniApp in Project Details](https://images.tuyacn.com/fe-static/docs/img/ef74418e-a586-40d5-9279-6356a546ceb0.png?imageMogr2/format/webp)

2. Click **Change Panel** and choose the custom panel.

   ![Change the custom panel in the IDE](https://images.tuyacn.com/fe-static/docs/img/4d7b774a-038e-4bb5-8b89-ccaddabb0c51.png?imageMogr2/format/webp)

3. Select the custom panel — you can now see the published mini-app panel.

   ![Published custom panel](https://images.tuyacn.com/fe-static/docs/img/f2c2115d-2bdf-4feb-b6b3-4d116b9004ee.png?imageMogr2/format/webp)

4. You can now see the latest panel in the SmartLife app.

## Where to go deeper {/* #next */}

| Want to | Go here |
| --- | --- |
| Speed up development with AI | [Vibe Coding skills](./vibe-coding.md) |
| Build your own cloud Agent | [Agent Development Guide](./agent-development.md) |
| Build device control panels | [Panel Mini-App portal](https://developer.tuya.com/cn/panel-miniapp) |
| Learn the mini-app technology / API | [Tuya Mini-App docs](https://developer.tuya.com/en/miniapp/) |
| Build a panel with no code | [Panel Studio](https://developer.tuya.com/cn/panel-studio) |

