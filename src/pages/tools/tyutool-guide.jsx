import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { clsx } from 'clsx';
import useFromLearn from '@site/src/components/useFromLearn';
import styles from './tyutool-guide.module.css';

const GITHUB = 'https://github.com/tuya/tyutool';
const GITHUB_RELEASES = 'https://github.com/tuya/tyutool/releases/latest';
const GITHUB_ISSUES = 'https://github.com/tuya/tyutool/issues/new';
const PLATFORM = 'https://platform.tuya.com/purchase/index?type=6';

// Real product screenshots (hosted on the Tuya CDN).
const SHOTS = {
  flashing: 'https://images.tuyacn.com/fe-static/docs/img/273ba9fc-5077-47bd-94d2-275747ca7232.png',
  debug: 'https://images.tuyacn.com/fe-static/docs/img/3634a0b1-5aa0-44ad-bb0f-ce97b4a0d52c.png',
  batch: 'https://images.tuyacn.com/fe-static/docs/img/986071e4-cd89-4f7a-8519-316f48de3763.png',
  auth: 'https://images.tuyacn.com/fe-static/docs/img/aa0e7635-2952-4322-8696-3a866b01a6ec.png',
};

/* ----------------------------------------------------------------------- */
/* Bilingual copy                                                          */
/* ----------------------------------------------------------------------- */

const content = {
  en: {
    meta: 'tyutool help guide — install, flash, authorize, debug, and troubleshoot.',
    breadcrumb: 'tyutool',
    badge: 'Help guide',
    title: 'tyutool guide',
    subtitle: 'Install the tool, flash your first board, authorize it for Tuya IoT, and fix the common hiccups — GUI and CLI side by side.',
    backToOverview: '← Back to tyutool overview',
    tocTitle: 'On this page',
    nav: [
      { id: 'install', label: 'Install' },
      { id: 'first-flash', label: 'First flash' },
      { id: 'authorize', label: 'Authorization' },
      { id: 'serial-debug', label: 'Serial debug' },
      { id: 'batch', label: 'Batch flash & auth' },
      { id: 'cli', label: 'CLI reference' },
      { id: 'troubleshooting', label: 'Troubleshooting' },
      { id: 'help', label: 'Getting help' },
    ],
    install: {
      title: 'Install',
      intro: 'Download the latest build for your platform from the releases page. The recommended (★) packages support in-app auto-update.',
      releasesBtn: 'Open GitHub releases',
      platforms: [
        {
          name: 'Windows',
          steps: [
            'Download the NSIS installer (*.exe) and run it, or grab the portable .zip and unzip it.',
            'Launch tyutool from the Start menu (installer) or the extracted folder (portable).',
          ],
        },
        {
          name: 'macOS',
          steps: [
            'Download the Universal .dmg (★), open it, and drag tyutool to Applications.',
            'First launch is blocked because the build is not Apple-signed — see Troubleshooting below for the one-time "Open Anyway" step.',
          ],
        },
        {
          name: 'Linux',
          steps: [
            'Download the AppImage (★), then make it executable: chmod +x tyutool-gui_*.AppImage and run it.',
            'Or install the .deb / .rpm for your distribution, or unpack the portable .tar.gz.',
          ],
        },
      ],
      cliNote: 'Working headless or in CI? Download the standalone CLI build from the same releases page, extract it, and put tyutool_cli on your PATH — no runtime required.',
    },
    firstFlash: {
      title: 'Flash your first firmware',
      guiTitle: 'With the GUI',
      guiSteps: [
        'Open tyutool and stay on the Flash tab.',
        'Select your chip (for example T5AI or BK7231N).',
        'Click Browse and choose the firmware .bin (for TuyaOpen, the file containing _QIO).',
        'Pick the serial port. On Tuya boards, hovering a port shows whether it is the flash/auth or the log port.',
        'Click Start flash and watch the progress through erase, write, and verify.',
      ],
      guiShot: 'Flashing a development board over USB-serial',
      tip: 'The default flash baud rate is 921600. If flashing is unreliable, lower it; if it is slow, raising it can help but may fail on long cables.',
      cliTitle: 'With the CLI',
      cliIntro: 'The same flash, from a terminal — the port is auto-detected when only one is connected:',
      cliCode: `# Auto-detect the port
tyutool write -d t5ai -f app_QIO.bin

# Or name the port explicitly
tyutool write -d bk7231n -p /dev/ttyUSB0 -f firmware.bin`,
    },
    authorize: {
      title: 'Authorize a device',
      intro: 'To use the Tuya IoT cloud, a device needs a UUID + AuthKey written to it. tyutool writes and verifies them over the same UART you flash with.',
      guiSteps: [
        'Open the Authorize tab.',
        'Select the authorization serial port.',
        'Keep the default UART settings (baud 115200, 8 data bits, 1 stop bit, no parity).',
        'Enter the UUID and AuthKey.',
        'Click Start authorization, then read back the state to confirm.',
      ],
      authShot: 'tyutool — authorization tab',
      cliTitle: 'CLI equivalent',
      cliCode: `# Read the current authorization state
tyutool authorize -p /dev/ttyUSB0

# Write a new UUID + AuthKey (both required)
tyutool authorize -p /dev/ttyUSB0 \\
    --uuid <UUID> --authkey <AUTHKEY>`,
      where: 'Where do credentials come from?',
      whereBody: 'TuyaOpen UUID/AuthKey pairs come from the Tuya Developer Platform, or can be purchased in bulk. The authorization codes for TuyaOpen and TuyaOS are not interchangeable.',
      platformLink: 'Tuya Developer Platform',
      authOnly: 'Devices that only need a license (already flashed) can use the auth-only "other" chip option — it skips flashing entirely.',
    },
    serial: {
      title: 'Watch logs with serial debug',
      intro: 'The Serial debug tab is a full serial monitor for bringing up and debugging a board without a second tool.',
      points: [
        'Real ANSI color rendering, plus hex and ASCII views.',
        'Per-line timestamps and TX/RX direction badges.',
        'Send data as text or hex, with selectable line endings.',
        'Capture the session to a .txt file, or export logs for a bug report.',
      ],
      shot: 'Serial monitor showing live device logs',
      note: 'The serial monitor releases the port automatically when you start a flash, so the two never fight over the connection.',
    },
    batch: {
      title: 'Batch flash & authorize',
      intro: 'For small production runs, the batch tool drives many ports at once from a single window.',
      points: [
        'Auto-detect connected ports, or filter out the ones you do not want to touch.',
        'Flash the same firmware to every port in parallel, each with its own progress.',
        'Authorize from a spreadsheet — one UUID / AuthKey row per device.',
        'Cancel or retry an individual slot, and keep a running success / failure tally.',
      ],
      shot: 'Flashing and authorizing many boards at once',
    },
    cli: {
      title: 'CLI quick reference',
      intro: 'Every command auto-detects a single port; pass -p to choose when several are present. Full details live in the repository.',
      headers: ['Command', 'What it does'],
      rows: [
        ['write -d <chip> -f <file>', 'Flash a .bin to the device'],
        ['read -d <chip> -f <file>', 'Dump flash contents to a file'],
        ['erase -d <chip>', 'Erase a flash region'],
        ['authorize --uuid <U> --authkey <K>', 'Write or read UUID + AuthKey'],
        ['reset -p <port>', 'Hardware-reset via DTR/RTS'],
        ['list-ports [--json]', 'List available serial ports'],
        ['update [--check]', 'Self-update the tool'],
        ['completions <shell>', 'Generate a shell completion script'],
      ],
      globalsTitle: 'Global flags',
      globals: [
        ['--verbose', 'Also print developer diagnostics to stderr'],
        ['--plain', 'ASCII-only output for CI / piping'],
      ],
      fullRef: 'Full CLI reference on GitHub',
    },
    trouble: {
      title: 'Troubleshooting',
      items: [
        {
          q: 'macOS: "tyutool can\'t be opened because the developer cannot be verified"',
          body: 'Builds are not Apple-signed — this is expected. Open System Settings → Privacy & Security and click Open Anyway, or Control-click tyutool.app in Finder and choose Open.',
        },
        {
          q: 'macOS: no serial port appears',
          body: 'Grant access under System Settings → Privacy & Security → Accessories (the label varies by macOS version).',
        },
        {
          q: 'Linux: blank / white window (common in VMs)',
          body: 'This is a WebKit2GTK GPU compositing issue. Launch with compositing disabled:',
          code: 'export WEBKIT_DISABLE_COMPOSITING_MODE=1\n./tyutool-gui_linux_x86_64_*.AppImage',
        },
        {
          q: 'Flashing always fails during "write" (CH34x boards)',
          body: 'Install or update the CH34x USB-serial driver, then retry. After installing on macOS, allow the driver in Security settings — a working install shows the device as cu.wchusb*.',
          links: [
            { label: 'Windows driver', href: 'https://www.wch.cn/downloads/ch343ser_exe.html' },
            { label: 'macOS driver', href: 'https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html' },
          ],
        },
      ],
    },
    help: {
      title: 'Getting help',
      intro: 'Still stuck? A good bug report makes it fixable.',
      points: [
        'Export logs from the GUI (or attach the CLI log file) so the maintainers can see what happened.',
        'Note your OS, the chip, and the exact command or steps you ran.',
      ],
      logPaths: 'CLI log file: ~/.local/share/tyutool/tyutool.log (Linux), ~/Library/Application Support/tyutool/tyutool.log (macOS), %APPDATA%\\tyutool\\tyutool.log (Windows).',
      issueBtn: 'Open an issue on GitHub',
      repoBtn: 'Browse the repository',
    },
  },
  zh: {
    meta: 'tyutool 帮助指南 —— 安装、烧录、授权、调试与故障排查。',
    breadcrumb: 'tyutool',
    badge: '帮助指南',
    title: 'tyutool 使用指南',
    subtitle: '安装工具、烧录第一块板子、为涂鸦 IoT 授权，并解决常见小问题 —— GUI 与 CLI 并列讲解。',
    backToOverview: '← 返回 tyutool 概览',
    tocTitle: '本页内容',
    nav: [
      { id: 'install', label: '安装' },
      { id: 'first-flash', label: '首次烧录' },
      { id: 'authorize', label: '设备授权' },
      { id: 'serial-debug', label: '串口调试' },
      { id: 'batch', label: '批量烧录与授权' },
      { id: 'cli', label: 'CLI 参考' },
      { id: 'troubleshooting', label: '故障排查' },
      { id: 'help', label: '获取帮助' },
    ],
    install: {
      title: '安装',
      intro: '从发布页下载对应平台的最新版本。推荐（★）安装包支持应用内自动更新。',
      releasesBtn: '打开 GitHub 发布页',
      platforms: [
        {
          name: 'Windows',
          steps: [
            '下载 NSIS 安装包（*.exe）并运行，或下载便携版 .zip 解压。',
            '从开始菜单（安装版）或解压目录（便携版）启动 tyutool。',
          ],
        },
        {
          name: 'macOS',
          steps: [
            '下载 Universal .dmg（★），打开后将 tyutool 拖入"应用程序"。',
            '由于安装包未经 Apple 签名，首次启动会被拦截 —— 请参见下方"故障排查"中一次性的"仍要打开"步骤。',
          ],
        },
        {
          name: 'Linux',
          steps: [
            '下载 AppImage（★），赋予可执行权限：chmod +x tyutool-gui_*.AppImage 后运行。',
            '或安装对应发行版的 .deb / .rpm，或解压便携版 .tar.gz。',
          ],
        },
      ],
      cliNote: '在无界面环境或 CI 中工作？从同一发布页下载独立 CLI 版本，解压后将 tyutool_cli 放入 PATH —— 无需任何运行时。',
    },
    firstFlash: {
      title: '烧录第一份固件',
      guiTitle: '使用 GUI',
      guiSteps: [
        '打开 tyutool，停留在"烧录"标签页。',
        '选择芯片（例如 T5AI 或 BK7231N）。',
        '点击"浏览"选择固件 .bin（TuyaOpen 选择包含 _QIO 的文件）。',
        '选择串口。在涂鸦开发板上，鼠标悬停串口会提示它是烧录/授权口还是日志口。',
        '点击"开始烧录"，观察擦除、写入、校验的进度。',
      ],
      guiShot: '通过 USB 串口为开发板烧录固件',
      tip: '默认烧录波特率为 921600。若烧录不稳定可调低；若速度太慢可适当调高，但过高在长线缆下可能失败。',
      cliTitle: '使用 CLI',
      cliIntro: '在终端中完成同样的烧录 —— 仅连接一个串口时会自动检测：',
      cliCode: `# 自动检测串口
tyutool write -d t5ai -f app_QIO.bin

# 或显式指定串口
tyutool write -d bk7231n -p /dev/ttyUSB0 -f firmware.bin`,
    },
    authorize: {
      title: '为设备授权',
      intro: '要接入涂鸦 IoT 云，设备需要写入 UUID + AuthKey。tyutool 通过与烧录相同的 UART 写入并校验它们。',
      guiSteps: [
        '打开"授权"标签页。',
        '选择授权串口。',
        '保持默认 UART 设置（波特率 115200、8 数据位、1 停止位、无校验）。',
        '输入 UUID 和 AuthKey。',
        '点击"开始授权"，随后回读状态以确认。',
      ],
      authShot: 'tyutool —— 授权标签页',
      cliTitle: 'CLI 等价命令',
      cliCode: `# 读取当前授权状态
tyutool authorize -p /dev/ttyUSB0

# 写入新的 UUID + AuthKey（两者都必填）
tyutool authorize -p /dev/ttyUSB0 \\
    --uuid <UUID> --authkey <AUTHKEY>`,
      where: '凭据从哪里来？',
      whereBody: 'TuyaOpen 的 UUID/AuthKey 来自涂鸦开发者平台，也可批量购买。TuyaOpen 与 TuyaOS 的授权码不能互换使用。',
      platformLink: '涂鸦开发者平台',
      authOnly: '只需授权（已烧录）的设备可使用授权专用的"other"芯片选项 —— 它会完全跳过烧录。',
    },
    serial: {
      title: '用串口调试查看日志',
      intro: '"串口调试"标签页是一个完整的串口监视器，让你无需第二个工具就能点亮和调试板子。',
      points: [
        '真实 ANSI 颜色渲染，并支持十六进制与 ASCII 视图。',
        '逐行时间戳与 TX/RX 方向标记。',
        '以文本或十六进制发送数据，行尾可选。',
        '将会话抓取为 .txt 文件，或导出日志用于问题反馈。',
      ],
      shot: '串口监视器显示设备实时日志',
      note: '开始烧录时，串口监视器会自动释放串口，因此两者不会争用同一连接。',
    },
    batch: {
      title: '批量烧录与授权',
      intro: '面向小批量产线，批量工具可在同一窗口同时驱动多个串口。',
      points: [
        '自动检测已连接串口，或过滤掉你不想操作的串口。',
        '并行将同一固件烧录到每个串口，各自显示进度。',
        '从表格驱动授权 —— 每台设备一行 UUID / AuthKey。',
        '可单独取消或重试某个槽位，并实时统计成功 / 失败数量。',
      ],
      shot: '同时为多块开发板烧录与授权',
    },
    cli: {
      title: 'CLI 快速参考',
      intro: '每个命令在仅有一个串口时自动检测；存在多个串口时用 -p 指定。完整说明见仓库。',
      headers: ['命令', '作用'],
      rows: [
        ['write -d <芯片> -f <文件>', '将 .bin 烧录到设备'],
        ['read -d <芯片> -f <文件>', '将 Flash 内容导出到文件'],
        ['erase -d <芯片>', '擦除一段 Flash 区域'],
        ['authorize --uuid <U> --authkey <K>', '写入或读取 UUID + AuthKey'],
        ['reset -p <串口>', '通过 DTR/RTS 硬件复位'],
        ['list-ports [--json]', '列出可用串口'],
        ['update [--check]', '自我更新工具'],
        ['completions <shell>', '生成 Shell 补全脚本'],
      ],
      globalsTitle: '全局参数',
      globals: [
        ['--verbose', '同时向 stderr 打印开发者诊断信息'],
        ['--plain', '纯 ASCII 输出，适合 CI / 管道'],
      ],
      fullRef: 'GitHub 上的完整 CLI 参考',
    },
    trouble: {
      title: '故障排查',
      items: [
        {
          q: 'macOS：提示"无法打开 tyutool，因为无法验证开发者"',
          body: '安装包未经 Apple 签名 —— 这是预期行为。打开"系统设置 → 隐私与安全性"点击"仍要打开"，或在访达中按住 Control 点击 tyutool.app 选择"打开"。',
        },
        {
          q: 'macOS：看不到串口',
          body: '在"系统设置 → 隐私与安全性 → 配件"中授予访问权限（不同 macOS 版本名称略有差异）。',
        },
        {
          q: 'Linux：窗口空白 / 全白（虚拟机中常见）',
          body: '这是 WebKit2GTK 的 GPU 合成问题。关闭合成后再启动：',
          code: 'export WEBKIT_DISABLE_COMPOSITING_MODE=1\n./tyutool-gui_linux_x86_64_*.AppImage',
        },
        {
          q: '烧录在"write"阶段总是失败（CH34x 板子）',
          body: '安装或更新 CH34x USB 转串口驱动后重试。在 macOS 安装后需在"安全性"设置中允许该驱动 —— 安装成功时设备名以 cu.wchusb 开头。',
          links: [
            { label: 'Windows 驱动', href: 'https://www.wch.cn/downloads/ch343ser_exe.html' },
            { label: 'macOS 驱动', href: 'https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html' },
          ],
        },
      ],
    },
    help: {
      title: '获取帮助',
      intro: '仍未解决？一份好的问题反馈能让它被修复。',
      points: [
        '从 GUI 导出日志（或附上 CLI 日志文件），让维护者了解发生了什么。',
        '注明你的操作系统、芯片型号，以及你运行的确切命令或步骤。',
      ],
      logPaths: 'CLI 日志文件：~/.local/share/tyutool/tyutool.log（Linux）、~/Library/Application Support/tyutool/tyutool.log（macOS）、%APPDATA%\\tyutool\\tyutool.log（Windows）。',
      issueBtn: '在 GitHub 提交 issue',
      repoBtn: '浏览仓库',
    },
  },
};

/* ----------------------------------------------------------------------- */
/* Helpers                                                                 */
/* ----------------------------------------------------------------------- */

function Shot({ label, src, tall }) {
  if (src) {
    return <img className={styles.shotImg} src={src} alt={label} loading="lazy" />;
  }
  return (
    <div className={clsx(styles.shotPlaceholder, tall && styles.shotTall)} role="img" aria-label={label}>
      <span className={styles.shotIcon} aria-hidden>
        🖼️
      </span>
      <span className={styles.shotLabel}>{label}</span>
    </div>
  );
}

function Code({ children }) {
  return (
    <pre className={styles.codeBlock}>
      <code>{children}</code>
    </pre>
  );
}

/* ----------------------------------------------------------------------- */
/* Page                                                                    */
/* ----------------------------------------------------------------------- */

export default function TyutoolGuidePage() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];
  const overviewHref = locale === 'zh' ? '/zh/tools/tyutool' : '/tools/tyutool';
  const { fromLearn, href: learnHref, label: learnLabel } = useFromLearn();

  const [activeId, setActiveId] = useState(c.nav[0].id);
  const contentRef = useRef(null);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const root = contentRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return undefined;
    const sections = root.querySelectorAll('section[id]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [locale]);

  const authImg = SHOTS.auth;
  const flashImg = SHOTS.flashing;
  const serialImg = SHOTS.debug;
  const batchImg = SHOTS.batch;

  return (
    <Layout title={`tyutool — ${c.badge}`} description={c.meta}>
      <main className={styles.root}>
        {/* -------------------------------------------------------- Hero */}
        <header className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden />
          <div className={styles.heroInner}>
            <Link to={fromLearn ? learnHref : overviewHref} className={styles.breadcrumb}>
              {fromLearn ? learnLabel : c.backToOverview}
            </Link>
            <span className={styles.heroBadge}>{c.badge}</span>
            <h1 className={styles.heroTitle}>{c.title}</h1>
            <p className={styles.heroSubtitle}>{c.subtitle}</p>
          </div>
        </header>

        <div className={styles.layout}>
          {/* ----------------------------------------------------- TOC */}
          <aside className={styles.toc}>
            <div className={styles.tocSticky}>
              <div className={styles.tocTitle}>{c.tocTitle}</div>
              <nav>
                <ul>
                  {c.nav.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={clsx(styles.tocLink, activeId === item.id && styles.tocLinkActive)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* ------------------------------------------------- Content */}
          <div className={styles.content} ref={contentRef}>
            {/* Install */}
            <section id="install" className={styles.block}>
              <h2 className={styles.h2}>{c.install.title}</h2>
              <p className={styles.lead}>{c.install.intro}</p>
              <a className={styles.btnPrimary} href={GITHUB_RELEASES} target="_blank" rel="noopener noreferrer">
                {c.install.releasesBtn}
              </a>
              <div className={styles.platformGrid}>
                {c.install.platforms.map((p) => (
                  <div className={styles.platformCard} key={p.name}>
                    <h3 className={styles.h3}>{p.name}</h3>
                    <ol className={styles.steps}>
                      {p.steps.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
              <div className={clsx(styles.callout, styles.calloutInfo)}>
                <span className={styles.calloutIcon} aria-hidden>ℹ️</span>
                <p>{c.install.cliNote}</p>
              </div>
            </section>

            {/* First flash */}
            <section id="first-flash" className={styles.block}>
              <h2 className={styles.h2}>{c.firstFlash.title}</h2>
              <div className={styles.twoCol}>
                <div>
                  <h3 className={styles.h3}>{c.firstFlash.guiTitle}</h3>
                  <ol className={styles.steps}>
                    {c.firstFlash.guiSteps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
                <Shot label={c.firstFlash.guiShot} src={flashImg} />
              </div>
              <div className={clsx(styles.callout, styles.calloutTip)}>
                <span className={styles.calloutIcon} aria-hidden>💡</span>
                <p>{c.firstFlash.tip}</p>
              </div>
              <h3 className={styles.h3}>{c.firstFlash.cliTitle}</h3>
              <p>{c.firstFlash.cliIntro}</p>
              <Code>{c.firstFlash.cliCode}</Code>
            </section>

            {/* Authorize */}
            <section id="authorize" className={styles.block}>
              <h2 className={styles.h2}>{c.authorize.title}</h2>
              <p className={styles.lead}>{c.authorize.intro}</p>
              <div className={styles.twoCol}>
                <ol className={styles.steps}>
                  {c.authorize.guiSteps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
                <figure className={styles.figure}>
                  <img src={authImg} alt={c.authorize.authShot} className={styles.figureImg} />
                  <figcaption>{c.authorize.authShot}</figcaption>
                </figure>
              </div>
              <h3 className={styles.h3}>{c.authorize.cliTitle}</h3>
              <Code>{c.authorize.cliCode}</Code>
              <div className={clsx(styles.callout, styles.calloutInfo)}>
                <span className={styles.calloutIcon} aria-hidden>ℹ️</span>
                <div>
                  <strong>{c.authorize.where}</strong>
                  <p>
                    {c.authorize.whereBody}{' '}
                    <a href={PLATFORM} target="_blank" rel="noopener noreferrer">
                      {c.authorize.platformLink}
                    </a>
                    .
                  </p>
                  <p className={styles.calloutMuted}>{c.authorize.authOnly}</p>
                </div>
              </div>
            </section>

            {/* Serial debug */}
            <section id="serial-debug" className={styles.block}>
              <h2 className={styles.h2}>{c.serial.title}</h2>
              <p className={styles.lead}>{c.serial.intro}</p>
              <div className={styles.twoCol}>
                <ul className={styles.checkList}>
                  {c.serial.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <Shot label={c.serial.shot} src={serialImg} />
              </div>
              <div className={clsx(styles.callout, styles.calloutTip)}>
                <span className={styles.calloutIcon} aria-hidden>💡</span>
                <p>{c.serial.note}</p>
              </div>
            </section>

            {/* Batch */}
            <section id="batch" className={styles.block}>
              <h2 className={styles.h2}>{c.batch.title}</h2>
              <p className={styles.lead}>{c.batch.intro}</p>
              <div className={styles.twoCol}>
                <ul className={styles.checkList}>
                  {c.batch.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <Shot label={c.batch.shot} src={batchImg} />
              </div>
            </section>

            {/* CLI reference */}
            <section id="cli" className={styles.block}>
              <h2 className={styles.h2}>{c.cli.title}</h2>
              <p className={styles.lead}>{c.cli.intro}</p>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{c.cli.headers[0]}</th>
                      <th>{c.cli.headers[1]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.cli.rows.map((r, i) => (
                      <tr key={i}>
                        <td>
                          <code>{r[0]}</code>
                        </td>
                        <td>{r[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h3 className={styles.h3}>{c.cli.globalsTitle}</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <tbody>
                    {c.cli.globals.map((r, i) => (
                      <tr key={i}>
                        <td>
                          <code>{r[0]}</code>
                        </td>
                        <td>{r[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <a className={styles.btnGhost} href={`${GITHUB}/blob/master/docs/cli.md`} target="_blank" rel="noopener noreferrer">
                {c.cli.fullRef} →
              </a>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className={styles.block}>
              <h2 className={styles.h2}>{c.trouble.title}</h2>
              <div className={styles.faqList}>
                {c.trouble.items.map((item, i) => (
                  <details className={styles.faqItem} key={i} open={i === 0}>
                    <summary className={styles.faqQ}>{item.q}</summary>
                    <div className={styles.faqA}>
                      <p>{item.body}</p>
                      {item.code && <Code>{item.code}</Code>}
                      {item.links && (
                        <div className={styles.driverLinks}>
                          {item.links.map((l) => (
                            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>
                              {l.label} →
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Getting help */}
            <section id="help" className={styles.block}>
              <h2 className={styles.h2}>{c.help.title}</h2>
              <p className={styles.lead}>{c.help.intro}</p>
              <ul className={styles.checkList}>
                {c.help.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
              <p className={styles.pathNote}>{c.help.logPaths}</p>
              <div className={styles.helpButtons}>
                <a className={styles.btnPrimary} href={GITHUB_ISSUES} target="_blank" rel="noopener noreferrer">
                  {c.help.issueBtn}
                </a>
                <a className={styles.btnGhost} href={GITHUB} target="_blank" rel="noopener noreferrer">
                  {c.help.repoBtn} →
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
