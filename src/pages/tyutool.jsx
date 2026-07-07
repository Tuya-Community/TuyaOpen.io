import Head from '@docusaurus/Head';
import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { clsx } from 'clsx';
import styles from './tyutool.module.css';

const GITHUB = 'https://github.com/tuya/tyutool';
const GITHUB_RELEASES = 'https://github.com/tuya/tyutool/releases/latest';
const GITEE = 'https://gitee.com/tuya-open/tyutool';
const GITEE_RELEASES = 'https://gitee.com/tuya-open/tyutool/releases';

// Real product screenshots (hosted on the Tuya CDN).
const SHOTS = {
  flashing: 'https://images.tuyacn.com/fe-static/docs/img/273ba9fc-5077-47bd-94d2-275747ca7232.png',
  batch: 'https://images.tuyacn.com/fe-static/docs/img/986071e4-cd89-4f7a-8519-316f48de3763.png',
  pcb: 'https://images.tuyacn.com/fe-static/docs/img/011d75bd-9b32-4beb-ba55-61936843242e.png',
  plush: 'https://images.tuyacn.com/fe-static/docs/img/9c3de5c7-d248-4292-a820-5b6090e5c03e.png',
};

/* ----------------------------------------------------------------------- */
/* Bilingual copy                                                          */
/* ----------------------------------------------------------------------- */

const CLI_SAMPLE = `# Flash firmware (port auto-detected)
$ tyutool write -d bk7231n -f firmware.bin

# Dump the current flash to a file
$ tyutool read -d t5ai -p /dev/ttyUSB0 -f dump.bin

# Write Tuya authorization
$ tyutool authorize -p /dev/ttyUSB0 \\
    --uuid <UUID> --authkey <AUTHKEY>

# List serial ports as JSON
$ tyutool list-ports --json`;

const content = {
  en: {
    meta: 'tyutool — firmware flash, authorization & serial debug for TuyaOpen-supported chips',
    badge: 'Flash/Debug all TuyaOpen Supported Chipsets',
    title: ['Flash, authorize, and debug', 'your devices'],
    subtitle: 'A free, modern firmware tool for TuyaOpen-supported chips.',
    body: 'tyutool pairs a clean cross-platform desktop app with a scriptable command-line tool — flash on your desk, automate in CI, and get the same dependable result either way.',
    ctaDownload: 'Download',
    ctaGuide: 'Read the guide',
    ctaGithub: 'View on GitHub',
    stats: [
      { value: '11', label: 'Supported chips' },
      { value: '3', label: 'Desktop platforms' },
      { value: 'GUI + CLI', label: 'Desktop app & terminal' },
      { value: 'Apache-2.0', label: 'Free & open source' },
    ],
    features: {
      tag: 'What it does',
      title: 'Everything you need to bring a board up',
      subtitle: 'From the first flash on your desk to authorizing a full production batch.',
      items: [
        {
          icon: '⚡',
          title: 'Firmware flash & read',
          desc: 'Write .bin firmware or dump flash back to a file. Per-chip baud defaults, custom address ranges, live progress, and a clean cancel that always releases the port.',
        },
        {
          icon: '🔑',
          title: 'Device authorization',
          desc: 'Write and verify a Tuya UUID + AuthKey over UART, or read the current authorization state. An auth-only mode handles devices that just need a license, no flashing.',
        },
        {
          icon: '🖥️',
          title: 'Serial debug monitor',
          desc: 'A built-in serial terminal with real ANSI color rendering, hex and ASCII views, timestamps, and one-click capture — so you can watch logs without leaving the tool.',
        },
        {
          icon: '🏭',
          title: 'Batch flash & auth',
          desc: 'Flash and authorize many boards in parallel from a single window, each port with its own progress and status. Drive authorization from a spreadsheet for production lines.',
        },
        {
          icon: '🧩',
          title: 'Desktop app & command line',
          desc: 'A friendly desktop app for everyday work, and a scriptable command line for automation and CI. Both flash, authorize, and debug the same way — pick whichever fits the moment.',
        },
        {
          icon: '🔄',
          title: 'Cross-platform & self-updating',
          desc: 'Runs on Windows, macOS, and Linux. The recommended installers keep themselves up to date, and one-click log export makes filing a useful bug report easy.',
        },
      ],
    },
    dual: {
      tag: 'Two ways to work',
      title: 'A friendly GUI, or a scriptable CLI',
      subtitle: 'Pick the interface that fits the moment — both do exactly the same job.',
      gui: {
        title: 'Desktop GUI',
        desc: 'Pick a chip, choose your firmware and port, and hit flash. Tabs for flashing, authorization, serial debug, and batch tools — with your settings remembered between sessions.',
        points: ['Point-and-click flashing', 'Live progress & phase view', 'Remembers your last setup'],
        shot: 'Flashing a development board over USB-serial',
      },
      cli: {
        title: 'Command-line',
        desc: 'Nothing to install — one self-contained download. Great for automation, CI pipelines, and headless machines, with clean plain-text output when piped to a log.',
        points: ['Scriptable & CI-friendly', 'Shell completions included', 'Self-update built in'],
      },
    },
    chips: {
      tag: 'Supported hardware',
      title: 'Multi-chip support',
      subtitle: 'Flashing support is built in for the chips below, with more added over time.',
      families: [
        { name: 'Tuya', items: ['T1', 'T2', 'T3', 'T5AI'] },
        { name: 'Beken', items: ['BK7231N'] },
        { name: 'Espressif', items: ['ESP32', 'ESP32-C3', 'ESP32-C6', 'ESP32-S3'] },
        { name: 'GigaDevice', items: ['GD32VW553'] },
      ],
      note: 'Also flashes LN882H, with more chips added over time.',
    },
    batch: {
      tag: 'For production',
      title: 'Bring up a whole batch at once',
      subtitle: 'The batch toolbox turns one operator and a USB hub into a small flashing line.',
      points: [
        'Flash many ports in parallel, each with independent progress and status.',
        'Authorize from a spreadsheet — one UUID / AuthKey row per device.',
        'Flash-then-authorize, or authorize-only for licensed-but-pre-flashed boards.',
        'Per-slot cancel and retry, plus running success / failure tallies.',
      ],
      shot: 'Flashing and authorizing many boards at once',
    },
    download: {
      tag: 'Download',
      title: 'Get tyutool',
      subtitle: 'Grab the desktop app for your platform, or the standalone CLI. Builds are unsigned — the guide covers the one-time "open anyway" step.',
      recommended: 'Recommended',
      autoUpdate: 'Auto-update',
      platforms: [
        {
          name: 'Windows',
          icon: '/img/tyutool/windows.png',
          arch: 'x86_64',
          files: [
            { name: 'NSIS installer (.exe)', star: true, update: true },
            { name: 'Portable (.zip)', star: false, update: false },
          ],
        },
        {
          name: 'macOS',
          icon: '/img/tyutool/apple.png',
          arch: 'Universal',
          files: [
            { name: 'Disk image (.dmg)', star: true, update: true },
            { name: 'Portable (.tar.gz)', star: false, update: false },
          ],
        },
        {
          name: 'Linux',
          icon: '/img/tyutool/linux.png',
          arch: 'x86_64 · aarch64',
          files: [
            { name: 'AppImage', star: true, update: true },
            { name: '.deb / .rpm / portable', star: false, update: false },
          ],
        },
      ],
      cliTitle: 'Prefer the command line?',
      cliDesc: 'Standalone CLI builds are available for Linux, macOS, and Windows on the same releases page — no runtime to install.',
      downloadBtn: 'Download for',
      mirror: 'In mainland China, use the',
      mirrorLink: 'Gitee mirror',
      source: 'Source code',
    },
    finalCta: {
      title: 'Ready to flash your first board?',
      subtitle: 'Download tyutool, or read the guide first — both take only a minute.',
    },
  },
  zh: {
    meta: 'tyutool —— 面向 TuyaOpen 支持系列芯片的固件烧录、授权与串口调试工具',
    badge: '烧录 / 调试所有 TuyaOpen 支持的芯片',
    title: ['烧录、授权、调试', '你的设备'],
    subtitle: '一款面向 TuyaOpen 支持系列芯片的免费、现代固件工具。',
    body: 'tyutool 同时提供简洁的跨平台桌面应用和可脚本化的命令行工具——既能在桌面上烧录，也能在 CI 中自动化，两种方式都得到完全一致、可靠的结果。',
    ctaDownload: '下载',
    ctaGuide: '查看指南',
    ctaGithub: 'GitHub 源码',
    stats: [
      { value: '11', label: '支持的芯片' },
      { value: '3', label: '桌面平台' },
      { value: 'GUI + CLI', label: '桌面应用与终端' },
      { value: 'Apache-2.0', label: '免费开源' },
    ],
    features: {
      tag: '功能一览',
      title: '让设备跑起来所需的一切',
      subtitle: '从桌面上的第一次烧录，到整批产线设备的授权。',
      items: [
        {
          icon: '⚡',
          title: '固件烧录与读取',
          desc: '写入 .bin 固件，或将 Flash 回读到文件。按芯片预设波特率、支持自定义地址范围、实时进度，取消时始终干净地释放串口。',
        },
        {
          icon: '🔑',
          title: '设备授权',
          desc: '通过 UART 写入并校验涂鸦 UUID + AuthKey，或读取当前授权状态。授权专用模式可处理只需授权、无需烧录的设备。',
        },
        {
          icon: '🖥️',
          title: '串口调试监视器',
          desc: '内置串口终端，支持真实 ANSI 颜色渲染、十六进制与 ASCII 视图、时间戳和一键抓取日志——无需离开工具即可查看日志。',
        },
        {
          icon: '🏭',
          title: '批量烧录与授权',
          desc: '在同一窗口内并行烧录、授权多块板子，每个串口独立显示进度与状态。授权可由表格驱动，适合产线场景。',
        },
        {
          icon: '🧩',
          title: '桌面应用与命令行',
          desc: '友好的桌面应用用于日常操作，可脚本化的命令行用于自动化与 CI。两者以相同方式完成烧录、授权与调试——按当下需要任选其一。',
        },
        {
          icon: '🔄',
          title: '跨平台与自动更新',
          desc: '可在 Windows、macOS、Linux 上运行。推荐的安装版会自动保持更新，一键导出日志让提交有用的问题反馈变得轻松。',
        },
      ],
    },
    dual: {
      tag: '两种使用方式',
      title: '友好的 GUI，或可脚本化的 CLI',
      subtitle: '按当下需要选择界面——两者完成的工作完全相同。',
      gui: {
        title: '桌面 GUI',
        desc: '选芯片、选固件和串口，点击烧录即可。提供烧录、授权、串口调试与批量工具等标签页，并在会话之间记住你的设置。',
        points: ['点击式烧录', '实时进度与阶段展示', '记住上次的配置'],
        shot: '通过 USB 串口为开发板烧录固件',
      },
      cli: {
        title: '命令行',
        desc: '无需安装——单个自包含文件即可运行。适合自动化、CI 流水线和无界面机器，被管道接收时输出干净的纯文本，便于记录日志。',
        points: ['可脚本化、适配 CI', '内置 Shell 补全', '内置自我更新'],
      },
    },
    chips: {
      tag: '支持的硬件',
      title: '多芯片支持',
      subtitle: '以下芯片均已内置烧录支持，更多芯片也在持续加入。',
      families: [
        { name: '涂鸦 Tuya', items: ['T1', 'T2', 'T3', 'T5AI'] },
        { name: '博通集成 Beken', items: ['BK7231N'] },
        { name: '乐鑫 Espressif', items: ['ESP32', 'ESP32-C3', 'ESP32-C6', 'ESP32-S3'] },
        { name: '兆易创新 GigaDevice', items: ['GD32VW553'] },
      ],
      note: '同样支持 LN882H，并会持续增加更多芯片。',
    },
    batch: {
      tag: '面向产线',
      title: '一次点亮一整批',
      subtitle: '批量工具箱让一名操作员加一个 USB Hub 就能组成一条小型烧录线。',
      points: [
        '并行烧录多个串口，每个串口独立显示进度与状态。',
        '从表格驱动授权——每台设备一行 UUID / AuthKey。',
        '可先烧录再授权，或对已烧录设备仅授权。',
        '每个槽位可单独取消、重试，并实时统计成功 / 失败数量。',
      ],
      shot: '同时为多块开发板烧录与授权',
    },
    download: {
      tag: '下载',
      title: '获取 tyutool',
      subtitle: '按平台下载桌面应用，或获取独立 CLI。安装包未签名——指南中介绍了一次性的"仍要打开"步骤。',
      recommended: '推荐',
      autoUpdate: '自动更新',
      platforms: [
        {
          name: 'Windows',
          icon: '/img/tyutool/windows.png',
          arch: 'x86_64',
          files: [
            { name: 'NSIS 安装包 (.exe)', star: true, update: true },
            { name: '便携版 (.zip)', star: false, update: false },
          ],
        },
        {
          name: 'macOS',
          icon: '/img/tyutool/apple.png',
          arch: 'Universal',
          files: [
            { name: '磁盘映像 (.dmg)', star: true, update: true },
            { name: '便携版 (.tar.gz)', star: false, update: false },
          ],
        },
        {
          name: 'Linux',
          icon: '/img/tyutool/linux.png',
          arch: 'x86_64 · aarch64',
          files: [
            { name: 'AppImage', star: true, update: true },
            { name: '.deb / .rpm / 便携版', star: false, update: false },
          ],
        },
      ],
      cliTitle: '更喜欢命令行？',
      cliDesc: '同一发布页提供 Linux、macOS、Windows 的独立 CLI 版本——无需安装任何运行时。',
      downloadBtn: '下载',
      mirror: '中国大陆请使用',
      mirrorLink: 'Gitee 镜像',
      source: '源代码',
    },
    finalCta: {
      title: '准备好烧录第一块板子了吗？',
      subtitle: '下载 tyutool，或先看看指南——都只需一分钟。',
    },
  },
};

/* ----------------------------------------------------------------------- */
/* Helpers                                                                 */
/* ----------------------------------------------------------------------- */

function Reveal({ className, children, as: Tag = 'div', ...rest }) {
  return (
    <Tag className={clsx(styles.reveal, className)} data-reveal {...rest}>
      {children}
    </Tag>
  );
}

function Shot({ label, src }) {
  if (src) {
    return <img className={styles.shotImg} src={src} alt={label} loading="lazy" />;
  }
  return (
    <div className={styles.shotPlaceholder} role="img" aria-label={label}>
      <span className={styles.shotIcon} aria-hidden>
        🖼️
      </span>
      <span className={styles.shotLabel}>{label}</span>
    </div>
  );
}

function CodeWindow({ title, code, className }) {
  return (
    <div className={clsx(styles.codeWindow, className)}>
      <div className={styles.codeHeader}>
        <span className={styles.codeDot} style={{ background: '#EF4444' }} />
        <span className={styles.codeDot} style={{ background: '#F59E0B' }} />
        <span className={styles.codeDot} style={{ background: '#10B981' }} />
        <span className={styles.codeTitle}>{title}</span>
      </div>
      <pre className={styles.codeBody}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function StudioDisplay({ src, alt }) {
  return (
    <div className={styles.studioDisplay}>
      <div className={styles.studioBezel}>
        <div className={styles.studioScreen}>
          <div className={styles.studioPanel}>
            <div className={styles.studioWindow}>
              <div className={styles.studioWindowBar} aria-hidden>
                <span className={styles.studioWindowDot} style={{ background: '#ff5f57' }} />
                <span className={styles.studioWindowDot} style={{ background: '#febc2e' }} />
                <span className={styles.studioWindowDot} style={{ background: '#28c840' }} />
              </div>
              <img src={src} alt={alt} loading="eager" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.studioNeck} aria-hidden />
      <div className={styles.studioFoot} aria-hidden />
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Page                                                                    */
/* ----------------------------------------------------------------------- */

export default function TyutoolPage() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];
  const rootRef = useRef(null);

  // Docusaurus internal links are not locale-prefixed automatically here, so
  // build the guide path for the active locale (en = root, zh = /zh).
  const base = locale === 'zh' ? '/zh' : '';
  const guideHref = `${base}/tyutool-guide`;

  // Scroll-reveal: fade sections in as they enter the viewport.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return undefined;
    const targets = root.querySelectorAll('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((t) => t.classList.add(styles.revealVisible));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [locale]);

  const winIcon = useBaseUrl('/img/tyutool/windows.png');
  const macIcon = useBaseUrl('/img/tyutool/apple.png');
  const linuxIcon = useBaseUrl('/img/tyutool/linux.png');
  const iconFor = { Windows: winIcon, macOS: macIcon, Linux: linuxIcon };
  const featureImgs = [
    'https://images.tuyacn.com/fe-static/docs/img/6b2bc19c-1769-4dc9-b7a2-3e8fdcb25776.png', // flash & read
    'https://images.tuyacn.com/fe-static/docs/img/fd25e49a-bcfe-4821-bc41-0f080bf95dcb.png', // authorization
    'https://images.tuyacn.com/fe-static/docs/img/45362173-7eea-4f1e-b635-098e5efdcf0a.png', // serial debug
    'https://images.tuyacn.com/fe-static/docs/img/2d1acecb-b2e2-439f-93b4-b8f25587e56d.png', // batch
    'https://images.tuyacn.com/fe-static/docs/img/ec5116e8-50c6-4f8e-bb89-7c3637ef3fd9.png', // desktop + cli
    'https://images.tuyacn.com/fe-static/docs/img/0d868321-b4ca-42d8-aefe-fbd647a8e7b6.png', // cross-platform
  ];

  return (
    <Layout title="tyutool — Firmware Flash & Debug Tool for TuyaOpen" description={c.meta}>
      <Head><meta name="keywords" content="tyutool, firmware flash tool, iot development utility tool, tuyaopen serial tool, device authorization tool" /></Head>
      <main className={styles.root} ref={rootRef}>
        {/* ---------------------------------------------------------- Hero */}
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden />
          <div className={styles.heroInner}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCol}>
                <span className={styles.heroBadge}>{c.badge}</span>
                <h1 className={styles.heroTitle}>
                  <span className={styles.heroTitleGradient}>{c.title[0]}</span>
                  <br />
                  {c.title[1]}
                </h1>
                <p className={styles.heroSubtitle}>{c.subtitle}</p>
                <p className={styles.heroBody}>{c.body}</p>
                <div className={styles.heroButtons}>
                  <a className={styles.btnAccent} href="#download">
                    {c.ctaDownload}
                  </a>
                  <Link className={styles.btnGhostLight} to={guideHref}>
                    {c.ctaGuide}
                  </Link>
                  <a className={styles.btnOutlineLight} href={GITHUB} target="_blank" rel="noopener noreferrer">
                    {c.ctaGithub}
                  </a>
                </div>
              </div>
              <div className={styles.heroCol}>
                <div className={styles.heroStage}>
                  <StudioDisplay src={SHOTS.flashing} alt={c.dual.gui.shot} />
                  <img className={clsx(styles.heroDecor, styles.heroDecorLeft)} src={SHOTS.pcb} alt="" aria-hidden />
                  <img className={clsx(styles.heroDecor, styles.heroDecorRight)} src={SHOTS.plush} alt="" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- Stats */}
        <section className={styles.stats}>
          <div className={styles.statsGrid}>
            {c.stats.map((s, i) => (
              <div className={styles.statItem} key={i}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------ Features */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{c.features.tag}</span>
              <h2 className={styles.sectionTitle}>{c.features.title}</h2>
              <p className={styles.sectionSubtitle}>{c.features.subtitle}</p>
            </Reveal>
            <div className={styles.featuresGrid}>
              {c.features.items.map((f, i) => (
                <Reveal className={styles.featureCard} key={i} style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
                  <div className={styles.featureMedia}>
                    <img src={featureImgs[i]} alt={f.title} loading="lazy" />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- Dual mode */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{c.dual.tag}</span>
              <h2 className={styles.sectionTitle}>{c.dual.title}</h2>
              <p className={styles.sectionSubtitle}>{c.dual.subtitle}</p>
            </Reveal>
            <div className={styles.dualGrid}>
              <Reveal className={styles.dualCard}>
                <h3 className={styles.dualTitle}>{c.dual.gui.title}</h3>
                <p className={styles.dualDesc}>{c.dual.gui.desc}</p>
                <ul className={styles.checkList}>
                  {c.dual.gui.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <Shot label={c.dual.gui.shot} src={SHOTS.flashing} />
              </Reveal>
              <Reveal className={styles.dualCard} style={{ transitionDelay: '80ms' }}>
                <h3 className={styles.dualTitle}>{c.dual.cli.title}</h3>
                <p className={styles.dualDesc}>{c.dual.cli.desc}</p>
                <ul className={styles.checkList}>
                  {c.dual.cli.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <CodeWindow title="bash" code={CLI_SAMPLE} className={styles.dualCode} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- Chips */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{c.chips.tag}</span>
              <h2 className={styles.sectionTitle}>{c.chips.title}</h2>
              <p className={styles.sectionSubtitle}>{c.chips.subtitle}</p>
            </Reveal>
            <div className={styles.chipFamilies}>
              {c.chips.families.map((fam, i) => (
                <Reveal className={styles.chipFamily} key={i} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className={styles.chipFamilyName}>{fam.name}</div>
                  <div className={styles.chipList}>
                    {fam.items.map((chip) => (
                      <span className={styles.chip} key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className={styles.chipNote}>{c.chips.note}</Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------- Batch */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className={styles.sectionInner}>
            <div className={styles.splitGrid}>
              <Reveal className={styles.splitText}>
                <span className={styles.sectionTag}>{c.batch.tag}</span>
                <h2 className={styles.splitTitle}>{c.batch.title}</h2>
                <p className={styles.sectionSubtitle}>{c.batch.subtitle}</p>
                <ul className={styles.checkList}>
                  {c.batch.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className={styles.splitMedia} style={{ transitionDelay: '80ms' }}>
                <Shot label={c.batch.shot} src={SHOTS.batch} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- Download */}
        <section className={styles.section} id="download">
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{c.download.tag}</span>
              <h2 className={styles.sectionTitle}>{c.download.title}</h2>
              <p className={styles.sectionSubtitle}>{c.download.subtitle}</p>
            </Reveal>
            <div className={styles.downloadGrid}>
              {c.download.platforms.map((p, i) => (
                <Reveal className={styles.platformCard} key={i} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className={styles.platformHead}>
                    <img className={styles.platformIcon} src={iconFor[p.name]} alt={p.name} />
                    <div>
                      <div className={styles.platformName}>{p.name}</div>
                      <div className={styles.platformArch}>{p.arch}</div>
                    </div>
                  </div>
                  <ul className={styles.fileList}>
                    {p.files.map((f, j) => (
                      <li className={styles.fileRow} key={j}>
                        <span className={styles.fileName}>
                          {f.star && <span className={styles.star}>★</span>}
                          {f.name}
                        </span>
                        {f.update && <span className={styles.badgeUpdate}>{c.download.autoUpdate}</span>}
                      </li>
                    ))}
                  </ul>
                  <a className={styles.btnPrimary} href={GITHUB_RELEASES} target="_blank" rel="noopener noreferrer">
                    {c.download.downloadBtn} {p.name}
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal className={styles.cliBox}>
              <div className={styles.cliBoxText}>
                <h3>{c.download.cliTitle}</h3>
                <p>{c.download.cliDesc}</p>
              </div>
            </Reveal>

            {locale === 'zh' && (
              <Reveal className={styles.mirrorRow}>
                <span>
                  {c.download.mirror}{' '}
                  <a href={GITEE_RELEASES} target="_blank" rel="noopener noreferrer">
                    {c.download.mirrorLink}
                  </a>
                  .
                </span>
                <span className={styles.mirrorSep} aria-hidden>
                  ·
                </span>
                <a href={GITEE} target="_blank" rel="noopener noreferrer">
                  {c.download.source} (Gitee)
                </a>
              </Reveal>
            )}
          </div>
        </section>

        {/* ----------------------------------------------------- Final CTA */}
        <section className={styles.ctaBand}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>{c.finalCta.title}</h2>
            <p className={styles.ctaSubtitle}>{c.finalCta.subtitle}</p>
            <div className={styles.ctaButtons}>
              <a className={styles.btnAccent} href="#download">
                {c.ctaDownload}
              </a>
              <Link className={styles.btnOutlineLight} to={guideHref}>
                {c.ctaGuide}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
