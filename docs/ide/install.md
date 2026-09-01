---
title: "Install TuyaOpen IDE"
description: "Install Git, then add the TuyaOpen IDE extension to VS Code or Cursor — by letting an AI coding agent do it, or from the official .vsix — then verify it is enabled."
sidebar_label: "02 Install TuyaOpen IDE"
sidebar_position: 2
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - embedded development
---

## Install Git {/* #install-git */}

TuyaOpen IDE uses **Git** to clone the TuyaOpen SDK and to install Vibe Coding skills into your project. Install Git once, before you create your first project.

| OS | How to install |
| --- | --- |
| **Windows** | Download the installer from [git-scm.com](https://git-scm.com/download/win) and run it. |
| **macOS** | Run `brew install git`, or run `git` once and let macOS prompt to install the Xcode Command Line Tools. |
| **Linux** | Install with your package manager, for example `sudo apt install git` on Debian/Ubuntu. |

Check that Git is on your PATH:

```bash
git --version
```

## Before you install {/* #before-install */}

TuyaOpen IDE is an extension for **VS Code** or **Cursor**. Install one of these host editors first — the same extension package works in both.

| Host editor | Download | Note |
| --- | --- | --- |
| **VS Code** | https://code.visualstudio.com | The widest general ecosystem. |
| **Cursor** | https://cursor.com | Ships with stronger built-in AI. |

:::warning
Both the VS Code Marketplace and Open VSX search are temporarily unavailable. Install via an AI coding agent, or download the `.vsix` from the official site below — do not expect to find it by searching inside the editor.
:::

## Method 1: Let an AI agent install it (fastest) {/* #ai-agent-install */}

Paste the prompt below into **Claude Code, Cursor, Codex, or any coding agent that can run shell commands**. It downloads the latest `.vsix` and installs the extension for you.

```text
Install the TuyaOpen IDE extension. Download the latest .vsix from
https://open-vsx.org/api/TuyaOpen/TuyaOpenIDE/0.1.5/file/TuyaOpen.TuyaOpenIDE-0.1.5.vsix
then install it with `code --install-extension <path-to-vsix>` (VS Code) or
`cursor --install-extension <path-to-vsix>` (Cursor), and reload the editor
window so the extension activates.
```

**Steps:**

1. Open Cursor (used here as the demo), and paste the prompt into the agent.

   ![Pasting the install prompt into the Cursor agent](https://images.tuyacn.com/fe-static/docs/img/4976c2c9-d779-4676-9dd2-2aec6c111935.png?imageMogr2/format/webp)

2. When it finishes, open Cursor. In the **Extensions** view you can see that **TuyaOpen IDE** is installed and enabled.

   ![TuyaOpen IDE shown as installed and enabled in the Extensions panel](https://images.tuyacn.com/fe-static/docs/img/e92d5cd3-5c2e-4888-82e7-d25d6ccf7df3.png?imageMogr2/format/webp)

3. Click **TuyaOpen** on the right side of the bottom status bar to start using it.

   ![TuyaOpen entry point in the editor status bar](https://images.tuyacn.com/fe-static/docs/img/4cd1d67c-6dac-4f48-9744-f35661d6902d.png?imageMogr2/format/webp)

:::note
The download link in the prompt points to the **latest** version of the `.vsix`. The agent runs the whole download → install → reload flow with no manual steps.
:::

## Method 2: Download the .vsix from the official site {/* #manual-vsix */}

Get the `.vsix` from the official TuyaOpen IDE site so you always receive the **latest** version. The same package works in both **VS Code** and **Cursor**.

1. Open the [TuyaOpen IDE page](/tuyaopen-ide) and click **Install Extension**.

   ![Install Extension button on the official TuyaOpen IDE page](https://images.tuyacn.com/fe-static/docs/img/ac79d779-7849-48dd-ab9a-46c1e71d9ed7.png?imageMogr2/format/webp)

2. In the install dialog, click **Download .vsix** to download the latest installer.

   ![Download .vsix button in the install dialog](https://images.tuyacn.com/fe-static/docs/img/ca7c9352-9d60-4f53-8756-1cc61b9765e6.png?imageMogr2/format/webp)

3. Open VS Code and go to the **Extensions** view — `Ctrl+Shift+X` (macOS: `⌘+Shift+X`).

4. Open the `⋯` menu at the top right of the Extensions panel.

5. Choose **Install from VSIX…** and select the file you just downloaded.

   ![Installing a VSIX from the Extensions panel menu](https://images.tuyacn.com/fe-static/docs/img/e1e26e98-8086-4863-b36d-c3618bce098c.png?imageMogr2/format/webp)

6. Reload the editor when prompted, then start using it.

## Verify the installation {/* #verify */}

After reloading the editor, confirm two things:

1. **TuyaOpen commands appear in the Command Palette** — press `Ctrl+Shift+P` (macOS: `⌘+Shift+P`), type `TuyaOpen`, and you should see a group of TuyaOpen commands.

   ![TuyaOpen commands in the Command Palette](https://images.tuyacn.com/fe-static/docs/img/b36c121a-bc4b-456a-bb67-b36722f49f31.png?imageMogr2/format/webp)

2. **The extension is enabled** — in the Extensions view (`Ctrl+Shift+X`), find "TuyaOpen IDE" and confirm its status is **Enabled**.

## If installation fails {/* #troubleshoot */}

The three most common cases:

- **The `.vsix` will not install** — check that your VS Code or Cursor is recent enough. The extension requires a VS Code engine of `^1.85.0` or higher.
- **The extension installs but does not appear** — reload the editor, or restart it completely.
- **No TuyaOpen commands in the Command Palette** — confirm the extension is **Enabled** (not disabled) in the Extensions view.

## Next step {/* #next */}

You are ready to build. Start with [**Practice 1: Hello World**](./hello-world.md) — run an official example with zero code and learn the IDE basics.

