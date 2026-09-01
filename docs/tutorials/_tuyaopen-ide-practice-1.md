This is the **smallest closed loop** — you write no code, you just run an official example through the IDE. Finishing it teaches the core operation chain: **pick board → build → flash → read logs**.

<section id="prereq" className="section">

## Prerequisites

- The IDE extension is installed — see [Install TuyaOpen IDE](/learn/tuyaopen-ide-install).
- A **T5 AI Board** (`T5AI_Board`), connected to your computer with a USB cable.

</section>

<section id="step-1" className="section">

## Step 1: Enter from the board catalogue

1. Open VS Code or Cursor and confirm the TuyaOpen IDE extension is enabled.
2. Click the **Boards** icon in the left activity bar to browse the supported boards, chips, and SoC platforms with their full specs.

   ![Boards icon in the IDE activity bar](https://images.tuyacn.com/fe-static/docs/img/d2e8dea1-4aad-4a62-b882-0ec1494c4f25.png?imageMogr2/format/webp)

3. Find **T5AI_Board** in the list and open its detail page. You see a large amount of developer material — purchase links, schematics, datasheets, source code, 3D models, and more.

   ![T5AI_Board detail page in the board catalogue](https://images.tuyacn.com/fe-static/docs/img/bec0e87d-2701-4846-81d6-7bd420f5a9b7.png?imageMogr2/format/webp)

   ![Board resources — schematic, datasheet, source, 3D model](https://images.tuyacn.com/fe-static/docs/img/1e875bb2-541b-4586-940a-594b9476a6a4.png?imageMogr2/format/webp)

</section>

<section id="step-2" className="section">

## Step 2: Create an example project

1. On the T5AI_Board detail page, click **New Project with This Board**.
2. Fill in a project name and a location, then click **Create project**.

   ![New project dialog from a board](https://images.tuyacn.com/fe-static/docs/img/44d71f73-018a-4b3d-8609-26ac85802c0f.png?imageMogr2/format/webp)

3. The IDE derives a project into your workspace and auto-configures the T5AI_Board board-level information.

   ![Scaffolded project workspace](https://images.tuyacn.com/fe-static/docs/img/1ca1a929-c9f6-4fe7-9500-6dedf6d56910.png?imageMogr2/format/webp)

</section>

<section id="step-3" className="section">

## Step 3: Build

Open **Project Details** in the IDE sidebar, then click **Compile** in **Firmware Operations** and wait for the build to finish. The Project Details view shows the firmware status visually.

![Firmware build summary](https://images.tuyacn.com/fe-static/docs/img/f0bdb026-8ddd-40d2-97e1-3d8cf1f43f29.png?imageMogr2/format/webp)

**Expected output** (build success):

```text
[NOTE]:
====================[ BUILD SUCCESS ]===================
 Target    : T5Board_project1_QIO_1.0.0.bin
 Output    : .../dist/T5Board_project1_1.0.0
 Platform  : T5AI
 Chip      : T5AI
 Board     : TUYA_T5AI_BOARD
 Framework : base
========================================================
```

</section>

<section id="step-4" className="section">

## Step 4: Flash

1. Connect the board with USB. The T5AI_Board has two serial ports — one for flashing and one for logs. Make sure your USB cable carries data, not just power.
2. Click **Flash**. If you are unsure which port is the flash port, try either one. Here `COM4` is selected.

   ![Flash button and port selection](https://images.tuyacn.com/fe-static/docs/img/2106b267-9adc-4769-bac4-9d83b8fb72ef.png?imageMogr2/format/webp)

**Expected output** (flash success):

```text
write  T5AI  COM4  921600
  File   .../bin/T5Board_project1_QIO_1.0.0.bin  2.0 MiB
  Range  0x00000000 -> 0x001FF1E0

Handshake         OK
Flash ID          OK
Unprotect         OK
Write [1/1]       OK
...
Flash OK  38.9s
```

</section>

<section id="step-5" className="section">

## Step 5: Monitor the serial log

Click **Monitor** and select the log port — here `COM3`. When you see `hello world`, your first TuyaOpen project is running.

**Expected output**:

```text
[01-01 00:00:00 ty D][tuya_app_main.c:8] hello world
```

:::note
If you do not see `hello world`, the monitor most likely opened too late — the line prints the moment flashing completes. Do not close the monitor terminal; flash again and the message appears.
:::

</section>

<section id="next" className="section">

## Next step

You have the IDE basics. Continue with [Practice 2: your_chat_bot](/learn/tuyaopen-ide-practice-2) — build a cloud-connected AI chat device end-to-end.

</section>
