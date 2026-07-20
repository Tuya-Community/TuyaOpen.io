This is the **smallest closed loop** — you write no code, you just run an official example through the IDE. Finishing it teaches the core operation chain: **pick board → build → flash → read logs**.

<section id="prereq" className="section">

## Prerequisites

- The IDE extension is installed — see [Install TuyaOpen IDE](/learn/tuyaopen-ide-install).
- A **T5 AI Board** (`T5AI_Board`), connected to your computer with a USB cable.

</section>

<section id="step-1" className="section">

## Step 1: Enter from the board catalogue

1. Open VS Code or Cursor and confirm the TuyaOpen IDE extension is enabled.
2. Click the **Board Catalogue** icon in the left activity bar to browse the supported boards, chips, and SoC platforms with their full specs.

   ![Board catalogue icon in the IDE activity bar](/img/ide/get-started/ide-activity-bar-board-catalogue.png)

3. Find **T5AI_Board** in the list and open its detail page. You see a large amount of developer material — purchase links, schematics, datasheets, source code, 3D models, and more.

   ![T5AI_Board detail page in the board catalogue](/img/ide/get-started/board-detail-page-t5ai-board.png)

   ![Board resources — schematic, datasheet, source, 3D model](/img/ide/get-started/board-resources-schematic-datasheet.png)

</section>

<section id="step-2" className="section">

## Step 2: Create an example project

1. On the T5AI_Board detail page, click **Create project from this board**.
2. Fill in a project name and a location, then click **Create project**.

   ![New project dialog from a board](/img/ide/get-started/new-project-from-board.png)

3. The IDE derives a project into your workspace and auto-configures the T5AI_Board board-level information.

   ![Scaffolded project workspace](/img/ide/get-started/project-scaffolded-workspace.png)

</section>

<section id="step-3" className="section">

## Step 3: Build

Open **Project Details** in the IDE toolbar and build — click **Build now** in the middle, or **Build** under **Hardware firmware operations** at the top right. Wait for the build to finish.

![Build button in Project Details](/img/ide/get-started/project-details-compile-button.png)

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

The Project Details view shows the firmware status visually.

![Firmware build summary](/img/ide/get-started/firmware-build-summary.png)

</section>

<section id="step-4" className="section">

## Step 4: Flash

1. Connect the board with USB. The T5AI_Board has two serial ports — one for flashing and one for logs. Make sure your USB cable carries data, not just power.
2. Click **Flash**. If you are unsure which port is the flash port, try either one. Here `COM4` is selected.

   ![Flash button and port selection](/img/ide/get-started/flash-button-select-port.png)

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
