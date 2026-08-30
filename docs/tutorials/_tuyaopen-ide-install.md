<section id="install-git" className="section">

## Install Git

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

</section>

<section id="before-install" className="section">

## Before you install

TuyaOpen IDE is an extension for **VS Code** or **Cursor**. Install one of these host editors first — the same extension package works in both.

| Host editor | Download | Note |
| --- | --- | --- |
| **VS Code** | https://code.visualstudio.com | The widest general ecosystem. |
| **Cursor** | https://cursor.com | Ships with stronger built-in AI. |

:::warning
Both the VS Code Marketplace and Open VSX search are temporarily unavailable. Install via an AI coding agent, or download the `.vsix` from the official site below — do not expect to find it by searching inside the editor.
:::

</section>

<section id="ai-agent-install" className="section">

## Method 1: Let an AI agent install it (fastest)

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

   ![Pasting the install prompt into the Cursor agent](/img/ide/get-started/install-prompt-in-cursor.webp)

2. When it finishes, open Cursor. In the **Extensions** view you can see that **TuyaOpen IDE** is installed and enabled.

   ![TuyaOpen IDE shown as installed and enabled in the Extensions panel](/img/ide/get-started/extensions-panel-tuyaopen-enabled.webp)

3. Click **TuyaOpen** on the right side of the bottom status bar to start using it.

   ![TuyaOpen entry point in the editor status bar](/img/ide/get-started/install-status-bar-tuyaopen.webp)

:::note
The download link in the prompt points to the **latest** version of the `.vsix`. The agent runs the whole download → install → reload flow with no manual steps.
:::

</section>

<section id="manual-vsix" className="section">

## Method 2: Download the .vsix from the official site

Get the `.vsix` from the official TuyaOpen IDE site so you always receive the **latest** version. The same package works in both **VS Code** and **Cursor**.

1. Open the [TuyaOpen IDE page](/tuyaopen-ide) and click **Install Extension**.

   ![Install Extension button on the official TuyaOpen IDE page](/img/ide/get-started/official-site-install-extension.webp)

2. In the install dialog, click **Download .vsix** to download the latest installer.

   ![Download .vsix button in the install dialog](/img/ide/get-started/official-site-download-vsix.webp)

3. Open VS Code and go to the **Extensions** view — `Ctrl+Shift+X` (macOS: `⌘+Shift+X`).

4. Open the `⋯` menu at the top right of the Extensions panel.

5. Choose **Install from VSIX…** and select the file you just downloaded.

   ![Installing a VSIX from the Extensions panel menu](/img/ide/get-started/install-vsix-vscode-menu.webp)

6. Reload the editor when prompted, then start using it.

</section>

<section id="verify" className="section">

## Verify the installation

After reloading the editor, confirm two things:

1. **TuyaOpen commands appear in the Command Palette** — press `Ctrl+Shift+P` (macOS: `⌘+Shift+P`), type `TuyaOpen`, and you should see a group of TuyaOpen commands.

   ![TuyaOpen commands in the Command Palette](/img/ide/get-started/command-palette-tuyaopen-commands.webp)

2. **The extension is enabled** — in the Extensions view (`Ctrl+Shift+X`), find "TuyaOpen IDE" and confirm its status is **Enabled**.

</section>

<section id="troubleshoot" className="section">

## If installation fails

The three most common cases:

- **The `.vsix` will not install** — check that your VS Code or Cursor is recent enough. The extension requires a VS Code engine of `^1.85.0` or higher.
- **The extension installs but does not appear** — reload the editor, or restart it completely.
- **No TuyaOpen commands in the Command Palette** — confirm the extension is **Enabled** (not disabled) in the Extensions view.

</section>

<section id="next" className="section">

## Next step

You are ready to build. Start with [**Practice 1: Hello World**](/learn/tuyaopen-ide-practice-1) — run an official example with zero code and learn the IDE basics.

</section>
