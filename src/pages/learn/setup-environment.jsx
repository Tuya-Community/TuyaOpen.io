import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { clsx } from 'clsx';
import TutorialShell from '@site/src/components/TutorialShell';
import shell from '@site/src/components/TutorialShell/styles.module.css';
import RichText from './RichText';
import w from './widget.module.css';

/* =========================================================================
 * LEARN: Set up your development environment   kind: 'interactive'
 * Segment 1 of the "first device" path. Pick your OS, install the toolchain,
 * clone TuyaOpen, and activate tos.py — the one command every later step uses.
 * Grounded in docs/quick-start/enviroment-setup.md + docs/tos-tools/tos-guide.md.
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen SDK',
    title: 'Set up your development environment',
    subtitle:
      'Install the toolchain TuyaOpen needs, clone the repository, and activate tos.py — the one command you use to configure, build, and flash every project.',
    meta: ['Beginner', '10 min', 'Setup'],
    nav: [
      { id: 'what', label: 'What you get' },
      { id: 'hardware', label: 'What you need' },
      { id: 'install', label: 'Install the toolchain' },
      { id: 'clone', label: 'Clone TuyaOpen' },
      { id: 'activate', label: 'Activate tos.py' },
      { id: 'verify', label: 'Verify' },
      { id: 'trouble', label: 'Troubleshooting' },
    ],
    whatTitle: 'What you get at the end',
    whatLead:
      'A working TuyaOpen checkout on your computer with the `tos.py` command active in your terminal. Every later learn page — build, flash, pair — assumes you finished this one.',
    whatPoints: [
      '`tos.py` is the single CLI for configuring, building, flashing, and monitoring TuyaOpen projects.',
      'Activation creates a Python virtual environment (`.venv`) inside the repo — it does not touch your system Python.',
      'You must re-activate `tos.py` every time you open a new terminal.',
    ],
    hardwareTitle: 'What you need',
    hardwareLead: 'Before you start, gather the following:',
    hardwarePoints: [
      'A TuyaOpen-compatible development board or module.',
      'A USB data cable (a charge-only cable will not work).',
      'A computer running Windows, macOS, or Linux.',
    ],
    installTitle: 'Install the toolchain',
    installLead:
      'TuyaOpen needs git, Python 3, make, cmake, and ninja. Pick your OS — the install commands and the activate command below both update to match.',
    installWidgetOs: 'Operating system',
    installWidgetOut: 'Install commands',
    cloneTitle: 'Clone TuyaOpen',
    cloneLead: 'Clone the repository from GitHub or Gitee (use Gitee if you are in mainland China for a faster clone).',
    cloneWarnPath:
      'Do not use Chinese characters, spaces, or special characters in the project path. On Windows, do not place the project on the C drive.',
    cloneCode: `# Use GitHub
git clone https://github.com/tuya/TuyaOpen.git

# Or use Gitee
git clone https://gitee.com/tuya-open/TuyaOpen.git

# Enter the project
cd TuyaOpen`,
    cloneTip:
      'If the clone is slow, raise the git HTTP buffer first: `git config --global http.postBuffer 524288000`.',
    activateTitle: 'Activate tos.py',
    activateLead:
      'From inside the TuyaOpen directory, run the activate script for your OS. This creates the `.venv` virtual environment and puts `tos.py` on your PATH.',
    activateWarn: 'You must run the activate command again every time you reopen the terminal.',
    activateWidgetOut: 'Activate command',
    verifyTitle: 'Verify it worked',
    verifyLead:
      'Run `tos.py version` and `tos.py check`. `check` validates the tool versions and downloads the SDK submodules on first run.',
    verifyCode: `❯ tos.py version
[INFO]: Running tos.py ...
[INFO]: v1.3.0

❯ tos.py check
[INFO]: Running tos.py ...
[INFO]: [git] (2.43.0 >= 2.0.0) is ok.
[INFO]: [cmake] (4.0.2 >= 3.28.0) is ok.
[INFO]: [make] (4.3 >= 3.0.0) is ok.
[INFO]: [ninja] (1.11.1 >= 1.6.0) is ok.
[INFO]: Downloading submodules...
[INFO]: Download submodules successfully.`,
    verifyPoints: [
      '`version` prints the current tag-commit (e.g. `v1.3.0`). `[Unknown version]` means the repo has no tags — common in forks.',
      '`check` confirms git ≥ 2.0.0, cmake ≥ 3.28.0, make ≥ 3.0.0, ninja ≥ 1.6.0, then runs `git submodule update --init`.',
      'When you are done for the day, run `deactivate` (Linux/Mac) or `exit` (Windows) to leave the virtual environment.',
    ],
    troubleTitle: 'Troubleshooting',
    trouble: [
      {
        q: 'Activation of tos.py fails on Linux',
        a: 'Usually `python3-venv` is missing. Install it and retry: `sudo apt-get install python3-venv`. If activation still fails, delete the `./.venv` directory and activate again.',
      },
      {
        q: 'tos.py check reports a tool version too low',
        a: 'Install or upgrade the named tool to at least the minimum version shown (git 2.0.0, cmake 3.28.0, make 3.0.0, ninja 1.6.0), then run `tos.py check` again.',
      },
      {
        q: 'Submodule download fails during check',
        a: 'Run it manually in the repo root: `git submodule update --init`, then re-run `tos.py check`.',
      },
      {
        q: 'On Windows, arrow keys do not work in `tos.py config menu`',
        a: 'Terminal emulator compatibility. Use cmd or PowerShell, or navigate with `h` `j` `k` `l` (left/down/up/right).',
      },
    ],
    nextLabel: 'Next: build your first firmware →',
  },
  zh: {
    badge: 'TuyaOpen SDK',
    title: '配置开发环境',
    subtitle:
      '安装 TuyaOpen 所需的工具链，克隆仓库并激活 tos.py —— 这一条命令贯穿后续的配置、编译与烧录。',
    meta: ['入门', '10 分钟', '配置'],
    nav: [
      { id: 'what', label: '完成后的状态' },
      { id: 'hardware', label: '准备工作' },
      { id: 'install', label: '安装工具链' },
      { id: 'clone', label: '克隆 TuyaOpen' },
      { id: 'activate', label: '激活 tos.py' },
      { id: 'verify', label: '验证' },
      { id: 'trouble', label: '故障排查' },
    ],
    whatTitle: '完成后的状态',
    whatLead:
      '你的电脑上有一份可用的 TuyaOpen 代码，并在终端中激活了 `tos.py` 命令。后续每一篇教程 —— 编译、烧录、配网 —— 都默认你已完成本页。',
    whatPoints: [
      '`tos.py` 是配置、编译、烧录、监听 TuyaOpen 项目的唯一命令行工具。',
      '激活会在仓库内创建 Python 虚拟环境（`.venv`），不会影响系统 Python。',
      '每次打开新终端都需要重新激活 `tos.py`。',
    ],
    hardwareTitle: '准备工作',
    hardwareLead: '开始前请准备好以下物品：',
    hardwarePoints: [
      '一块 TuyaOpen 兼容的开发板或模组。',
      '一根 USB 数据线（仅充电线不可用）。',
      '一台运行 Windows、macOS 或 Linux 的电脑。',
    ],
    installTitle: '安装工具链',
    installLead:
      'TuyaOpen 依赖 git、Python 3、make、cmake 和 ninja。选择你的操作系统，下方的安装命令与激活命令会随之更新。',
    installWidgetOs: '操作系统',
    installWidgetOut: '安装命令',
    cloneTitle: '克隆 TuyaOpen',
    cloneLead: '从 GitHub 或 Gitee 克隆仓库（中国大陆建议使用 Gitee 以提升速度）。',
    cloneWarnPath:
      '项目路径中不要包含中文、空格或特殊字符；Windows 下不要将项目放在 C 盘。',
    cloneCode: `# 使用 GitHub
git clone https://github.com/tuya/TuyaOpen.git

# 或使用 Gitee
git clone https://gitee.com/tuya-open/TuyaOpen.git

# 进入项目
cd TuyaOpen`,
    cloneTip:
      '若克隆较慢，可先调大 git 的 HTTP 缓冲：`git config --global http.postBuffer 524288000`。',
    activateTitle: '激活 tos.py',
    activateLead:
      '在 TuyaOpen 目录中，按你的操作系统运行激活脚本。它会创建 `.venv` 虚拟环境，并将 `tos.py` 加入 PATH。',
    activateWarn: '每次重新打开终端都需要再次运行激活命令。',
    activateWidgetOut: '激活命令',
    verifyTitle: '验证是否成功',
    verifyLead:
      '运行 `tos.py version` 与 `tos.py check`。`check` 会校验工具版本，并在首次运行时下载 SDK 子模块。',
    verifyCode: `❯ tos.py version
[INFO]: Running tos.py ...
[INFO]: v1.3.0

❯ tos.py check
[INFO]: Running tos.py ...
[INFO]: [git] (2.43.0 >= 2.0.0) is ok.
[INFO]: [cmake] (4.0.2 >= 3.28.0) is ok.
[INFO]: [make] (4.3 >= 3.0.0) is ok.
[INFO]: [ninja] (1.11.1 >= 1.6.0) is ok.
[INFO]: Downloading submodules...
[INFO]: Download submodules successfully.`,
    verifyPoints: [
      '`version` 输出当前 tag-commit（如 `v1.3.0`）。若显示 `[Unknown version]`，说明仓库无 tag，常见于 fork。',
      '`check` 确认 git ≥ 2.0.0、cmake ≥ 3.28.0、make ≥ 3.0.0、ninja ≥ 1.6.0，随后执行 `git submodule update --init`。',
      '当日工作结束后，运行 `deactivate`（Linux/Mac）或 `exit`（Windows）退出虚拟环境。',
    ],
    troubleTitle: '故障排查',
    trouble: [
      {
        q: 'Linux 下激活 tos.py 失败',
        a: '通常是缺少 `python3-venv`。安装后重试：`sudo apt-get install python3-venv`。若仍失败，删除 `./.venv` 目录后重新激活。',
      },
      {
        q: 'tos.py check 提示工具版本过低',
        a: '将对应工具升级到所示最低版本（git 2.0.0、cmake 3.28.0、make 3.0.0、ninja 1.6.0）以上，再运行 `tos.py check`。',
      },
      {
        q: 'check 过程中子模块下载失败',
        a: '在仓库根目录手动执行 `git submodule update --init`，再重新运行 `tos.py check`。',
      },
      {
        q: 'Windows 下 `tos.py config menu` 中方向键失效',
        a: '这是终端模拟器兼容性问题。使用 cmd 或 PowerShell，或以 `h` `j` `k` `l`（左/下/上/右）导航。',
      },
    ],
    nextLabel: '下一步：编译第一个固件 →',
  },
};

/* OS → install commands. Verified against docs/quick-start/enviroment-setup.md. */
const OS_INSTALL = {
  Linux: `# Ubuntu / Debian (LTS 24 / 22 / 20 recommended)
sudo apt-get install lcov cmake-curses-gui build-essential \\
    ninja-build wget git python3 python3-pip python3-venv \\
    libc6-i386 libsystemd-dev`,
  Mac: `# Install Homebrew first, then:
brew install python3 git make`,
  Windows: `# Download and install, add to PATH, then restart:
#  - Python 3.8.0+   https://www.python.org/downloads/windows/
#  - Git 2.0.0+      https://git-scm.com/downloads/win
#  - Make 3.0+       https://gnuwin32.sourceforge.net/packages/make.htm
# Use CMD or PowerShell (NOT Git Bash / MSYS2).`,
};

const OS_ACTIVATE = {
  Linux: `. ./export.sh`,
  Mac: `. ./export.sh`,
  Windows: `# PowerShell (first run: Set-ExecutionPolicy RemoteSigned -Scope LocalMachine)
.\\export.ps1

# or CMD
.\\export.bat`,
};

function OsWidget({ c, kind }) {
  const [os, setOs] = useState('Linux');
  const out = kind === 'install' ? OS_INSTALL[os] : OS_ACTIVATE[os];
  return (
    <div className={w.widget}>
      <div className={w.widgetControls}>
        <label className={w.widgetField}>
          <span>{c.installWidgetOs}</span>
          <select value={os} onChange={(e) => setOs(e.target.value)} className={w.select}>
            <option value="Linux">🐧 Linux (Ubuntu / Debian)</option>
            <option value="Mac">⌘ macOS</option>
            <option value="Windows">🖥️ Windows</option>
          </select>
        </label>
      </div>
      <div className={w.widgetOut}>
        <span className={w.widgetOutLabel}>{kind === 'install' ? c.installWidgetOut : c.activateWidgetOut}</span>
        <code>{out}</code>
      </div>
    </div>
  );
}

export default function SetupEnvironment() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];
  const nextHref = locale === 'zh' ? '/zh/learn/build-first-firmware' : '/learn/build-first-firmware';
  const docsHref = locale === 'zh' ? '/zh/docs/quick-start/enviroment-setup' : '/docs/quick-start/enviroment-setup';
  const tosHref = locale === 'zh' ? '/zh/docs/tos-tools/tos-guide' : '/docs/tos-tools/tos-guide';

  return (
    <TutorialShell badge={c.badge} title={c.title} subtitle={c.subtitle} meta={c.meta} nav={c.nav}>
      {/* What you get */}
      <section id="what" className={shell.block}>
        <h2 className={shell.h2}>{c.whatTitle}</h2>
        <p className={shell.lead}><RichText text={c.whatLead} /></p>
        <ul className={shell.checkList}>
          {c.whatPoints.map((p, i) => (
            <li key={i}><RichText text={p} /></li>
          ))}
        </ul>
      </section>

      {/* Hardware */}
      <section id="hardware" className={shell.block}>
        <h2 className={shell.h2}>{c.hardwareTitle}</h2>
        <p className={shell.lead}><RichText text={c.hardwareLead} /></p>
        <ul className={shell.checkList}>
          {c.hardwarePoints.map((p, i) => (
            <li key={i}><RichText text={p} /></li>
          ))}
        </ul>
      </section>

      {/* Install */}
      <section id="install" className={shell.block}>
        <h2 className={shell.h2}>{c.installTitle}</h2>
        <p className={shell.lead}><RichText text={c.installLead} /></p>
        <OsWidget c={c} kind="install" />
      </section>

      {/* Clone */}
      <section id="clone" className={shell.block}>
        <h2 className={shell.h2}>{c.cloneTitle}</h2>
        <p className={shell.lead}><RichText text={c.cloneLead} /></p>
        <div className={clsx(shell.callout, shell.calloutInfo)}>
          <p><RichText text={c.cloneWarnPath} /></p>
        </div>
        <pre className={shell.codeBlock}>
          <code>{c.cloneCode}</code>
        </pre>
        <div className={clsx(shell.callout, shell.calloutTip)}>
          <p><RichText text={c.cloneTip} /></p>
        </div>
      </section>

      {/* Activate */}
      <section id="activate" className={shell.block}>
        <h2 className={shell.h2}>{c.activateTitle}</h2>
        <p className={shell.lead}><RichText text={c.activateLead} /></p>
        <div className={clsx(shell.callout, shell.calloutInfo)}>
          <p><RichText text={c.activateWarn} /></p>
        </div>
        <OsWidget c={c} kind="activate" />
      </section>

      {/* Verify */}
      <section id="verify" className={shell.block}>
        <h2 className={shell.h2}>{c.verifyTitle}</h2>
        <p className={shell.lead}><RichText text={c.verifyLead} /></p>
        <pre className={shell.codeBlock}>
          <code>{c.verifyCode}</code>
        </pre>
        <ul className={shell.checkList}>
          {c.verifyPoints.map((p, i) => (
            <li key={i}><RichText text={p} /></li>
          ))}
        </ul>
      </section>

      {/* Troubleshooting */}
      <section id="trouble" className={shell.block}>
        <h2 className={shell.h2}>{c.troubleTitle}</h2>
        {c.trouble.map((item, i) => (
          <div key={i} className={clsx(shell.callout, shell.calloutInfo)} style={{ display: 'block' }}>
            <strong>{item.q}</strong>
            <p><RichText text={item.a} /></p>
          </div>
        ))}
        <p style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a className={shell.btnPrimary} href={nextHref}>
            {c.nextLabel}
          </a>
          <a className={shell.btnGhost} href={docsHref}>
            {locale === 'zh' ? '完整环境文档 →' : 'Full environment docs →'}
          </a>
          <a className={shell.btnGhost} href={tosHref}>
            {locale === 'zh' ? 'tos.py 命令参考 →' : 'tos.py command reference →'}
          </a>
        </p>
      </section>
    </TutorialShell>
  );
}
