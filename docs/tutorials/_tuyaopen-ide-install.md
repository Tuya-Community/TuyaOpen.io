<section id="before-install" className="section">

## Before you install

TuyaOpen IDE is an extension for **VS Code** or **Cursor**. Install one of these host editors first — the same extension package works in both.

| Host editor | Download | Note |
| --- | --- | --- |
| **VS Code** | https://code.visualstudio.com | The widest general ecosystem. |
| **Cursor** | https://cursor.com | Ships with stronger built-in AI. |

:::warning
Both the VS Code Marketplace and Open VSX search are temporarily unavailable. Install via an AI coding agent or the manual `.vsix` below — do not expect to find it by searching inside the editor.
:::

</section>

<section id="ai-agent-install" className="section">

## Method 1: Let an AI agent install it (fastest)

Paste the prompt below into **Claude Code, Cursor, Codex, or any coding agent that can run shell commands**. It downloads the `.vsix` and installs the extension for you.

```text
Install the TuyaOpen IDE extension. Download the latest .vsix from
https://open-vsx.org/api/TuyaOpen/TuyaOpenIDE/0.1.1/file/TuyaOpen.TuyaOpenIDE-0.1.1.vsix
then install it with `code --install-extension <path.vsix>` (VS Code) or
`cursor --install-extension <path.vsix>` (Cursor), and reload the editor
window so the extension takes effect.
```

**Steps:**

1. Open Cursor (used here as the demo), and paste the prompt into the agent.

   ![Pasting the install prompt into the Cursor agent](/img/ide/get-started/install-prompt-in-cursor.png)

2. When it finishes, open Cursor. In the **Extensions** view you can see that **TuyaOpen IDE** is installed and enabled.

   ![TuyaOpen IDE shown as installed and enabled in the Extensions panel](/img/ide/get-started/extensions-panel-tuyaopen-enabled.png)

3. Click **TuyaOpen** on the right side of the bottom status bar to start using it.

   ![TuyaOpen entry point in the editor status bar](/img/ide/get-started/install-status-bar-tuyaopen.png)

:::note
The download link in the prompt points to the **latest** version of the `.vsix`. The agent runs the whole download → install → reload flow with no manual steps.
:::

</section>

<section id="manual-vsix" className="section">

## Method 2: Install the .vsix manually

The same package works in both **VS Code** and **Cursor**.

Download: [TuyaOpen.TuyaOpenIDE-0.1.1.vsix](https://open-vsx.org/api/TuyaOpen/TuyaOpenIDE/0.1.1/file/TuyaOpen.TuyaOpenIDE-0.1.1.vsix) (v0.1.1 · Windows · macOS · Linux · universal).

The steps below use VS Code as the demo.

1. Download the `.vsix` from the link above.
2. Open VS Code and go to the **Extensions** view — `Ctrl+Shift+X` (macOS: `⌘+Shift+X`).
3. Open the `⋯` menu at the top right of the Extensions panel.
4. Choose **Install from VSIX…** and select the file you just downloaded.

   ![Installing a VSIX from the Extensions panel menu](/img/ide/get-started/install-vsix-vscode-menu.png)

5. Reload the editor when prompted, then start using it.

</section>

<section id="verify" className="section">

## Verify the installation

After reloading the editor, confirm two things:

1. **TuyaOpen commands appear in the Command Palette** — press `Ctrl+Shift+P` (macOS: `⌘+Shift+P`), type `TuyaOpen`, and you should see a group of TuyaOpen commands.

   ![TuyaOpen commands in the Command Palette](/img/ide/get-started/command-palette-tuyaopen-commands.png)

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
