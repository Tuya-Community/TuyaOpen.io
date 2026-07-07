import Head from '@docusaurus/Head'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { clsx } from 'clsx'
import styles from './pricing-guide.module.css'

const PLATFORM = 'https://platform.tuya.com/'
const PURCHASE = 'https://platform.tuya.com/purchase/index?type=6'

/* ----------------------------------------------------------------------- */
/* Bilingual copy                                                          */
/* ----------------------------------------------------------------------- */

const content = {
  en: {
    meta: 'TuyaOpen licensing guide — what a license is, which tier to buy, how to get one, write it to a device, and troubleshoot.',
    badge: 'Help guide',
    title: 'Licensing guide',
    subtitle:
      'Everything about the TuyaOpen authorization code: what it is, which tier your device needs, how to claim or buy one, write it, verify it, and fix the common issues.',
    back: '← Back to pricing',
    tocTitle: 'On this page',
    nav: [
      { id: 'what', label: 'What is a license' },
      { id: 'choose', label: 'Choose a tier' },
      { id: 'get', label: 'Get a license' },
      { id: 'write', label: 'Write it to a device' },
      { id: 'verify', label: 'Verify & pair' },
      { id: 'troubleshooting', label: 'Troubleshooting' },
      { id: 'help', label: 'More help' },
    ],

    what: {
      title: 'What is a TuyaOpen license?',
      lead: 'A TuyaOpen license is the credential that lets one device connect to the Tuya IoT Cloud. It is two strings, issued by Tuya and bound to your product:',
      points: [
        'UUID — a 20-character identifier, unique to each device.',
        'AuthKey — a 32-character key paired one-to-one with the UUID.',
      ],
      whenTitle: 'When do you actually need one?',
      whenBody:
        'Only when your application uses Tuya Cloud services — cloud connection, app control, OTA, or AI. Local-only and offline projects (Bluetooth, Wi-Fi, third-party APIs) run on the free open-source framework with no license at all.',
      noteTitle: 'TuyaOpen licenses are not TuyaOS licenses',
      noteBody:
        'TuyaOpen requires a TuyaOpen-specific UUID + AuthKey. Licenses from TuyaOS (or other sources) cannot connect to the cloud within the TuyaOpen framework.',
    },

    choose: {
      title: 'Which tier does your device need?',
      lead: 'Match the tier to what the device does. You can always start free, then write a paid license later — the framework and code stay the same.',
      tiers: [
        {
          name: 'Open Source',
          price: 'Free',
          desc: 'Local control, Bluetooth/Wi-Fi, sensors, third-party APIs. No cloud, no license.',
          hi: false,
        },
        {
          name: 'IoT Connection',
          price: '¥5',
          desc: 'Tuya Cloud connection, Smart Life app control, data points, and OTA updates.',
          hi: false,
        },
        {
          name: 'AI + IoT',
          price: '¥12',
          desc: 'Everything in IoT, plus voice (ASR/TTS), LLMs, vision, and the AI agent platform.',
          hi: true,
        },
      ],
      compareCta: 'See the full comparison',
    },

    get: {
      title: 'Get a license',
      lead: 'For development you can claim free codes; for production you buy per-device licenses.',
      freeTitle: 'Claim 2 free developer licenses',
      freeIntro:
        'During development you can claim 2 free device licenses (¥20 value) from the Tuya Developer Platform:',
      freeSteps: [
        'Log in to the Tuya Developer Platform and create a product — pick any category (it is only a starting template). For AI-Agent features, choose an AI-tagged template.',
        'Select the T5 module, click Add Custom Firmware, and upload any dummy file as a placeholder.',
        'On the product page, click to claim 2 free authorization codes.',
        'Open the License list to find your UUID and AuthKey.',
      ],
      platformBtn: 'Open the Developer Platform',
      buyTitle: 'Buy production licenses',
      buyIntro:
        'When you are ready to ship, buy per-device licenses (¥5 IoT / ¥12 AI + IoT). You can also order Tuya modules pre-flashed with a license at the factory.',
      buyBtn: 'Buy licenses',
    },

    write: {
      title: 'Write the license to a device',
      lead: 'Once you have a UUID + AuthKey, write them with whichever method fits your workflow. All four do the same thing.',
      methods: [
        {
          badge: 'Recommended',
          title: 'Header file (bake into firmware)',
          body: 'Set the macros in tuya_config.h (in your project’s src or include directory), then rebuild and flash. Best for permanent, per-build configuration.',
          code: `// tuya_config.h
#define TUYA_OPENSDK_UUID    "uuidxxxxxxxxxxxxxxxx"  // your UUID
#define TUYA_OPENSDK_AUTHKEY "keyxxxxxxxxxxxxxxxxxx"  // your AuthKey

# then:
tos.py build && tos.py flash`,
        },
        {
          badge: 'Serial CLI',
          title: 'auth command over serial',
          body: 'For firmware that supports the auth CLI. Open the serial monitor on the flashing port, write the pair, and reboot.',
          code: `tos.py monitor -b 115200

tuya> auth uuid9f6a6... cGuDnU2Yxj...
Authorization write succeeds.`,
        },
        {
          badge: 'GUI',
          title: 'tyutool desktop app',
          body: 'Connect the device, open the Authorize tab, enter the UUID + AuthKey, and write — no rebuild required. Great for one-offs and small batches.',
          code: null,
        },
        {
          badge: 'Browser',
          title: 'TuyaOpen Serial Web Tool',
          body: 'In a Chrome-based browser, open the web tool, connect to the authorization port, and use the authorization-write tab.',
          code: null,
        },
      ],
      mcuNote: 'On MCU, writing the license once is enough — it is stored in a non-application key-value area, survives firmware updates, and is only lost on a full flash erase or when writing a new key.',
      linuxNote: 'On SoCs with a filesystem (Linux, Raspberry Pi) the license can be compiled into a header or kept in a file and loaded at runtime.',
    },

    verify: {
      title: 'Verify & pair the device',
      lead: 'Confirm the license is stored, reboot, then bring the device online in the app.',
      steps: [
        'Read the stored license back with the auth-read command and confirm the UUID and AuthKey are the real values (not xxxx).',
        'Reboot the device for the authorization to take effect.',
        'Pair the device in the Tuya Smart Life app. It activates against the cloud using the credentials.',
      ],
      code: `tuya> auth-read
uuid9f6a6xxxxxxxxxxx
cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx`,
      reuseTitle: 'One UUID, one online device',
      reuseBody:
        'Each UUID brings a single device online at a time. To reuse the AuthKey on another board, first unpair the original device in the Tuya app (device panel → Unbind and Clear Data).',
    },

    trouble: {
      title: 'Troubleshooting',
      items: [
        {
          q: 'Logs show “Authorization read failure” on boot',
          body: 'The license was never written, or was written incorrectly. Re-write the UUID + AuthKey using one of the methods above, then reboot.',
        },
        {
          q: 'auth-read shows xxxxxxxx instead of real values',
          body: 'No authorization is stored. Write it with the auth command or the header file, then reboot and read it back to confirm.',
        },
        {
          q: 'The device won’t pair / isn’t found in the app',
          body: 'Verify with auth-read that real UUID/AuthKey are stored and that they are TuyaOpen (not TuyaOS) licenses with the correct PID. Re-write if needed, reset the device, and try pairing again. On Linux, delete the tuyadb folder and re-run.',
        },
        {
          q: 'Can I move a license to a different device?',
          body: 'Yes, but only after unpairing the original device from the Tuya app. One UUID can have only one device online at a time.',
        },
        {
          q: 'Does flashing new firmware erase my license?',
          body: 'No. On MCU the license sits in a protected key-value area and survives firmware updates. It is only cleared by a full flash erase.',
        },
      ],
    },

    help: {
      title: 'More help',
      lead: 'These docs go deeper on each step:',
      links: [
        { label: 'Equipment authorization (serial & header methods)', href: '/docs/quick-start/equipment-authorization' },
        { label: 'Get a developer license (claim free codes)', href: '/docs/faqs/get-developer-license' },
        { label: 'Authorization & license FAQ', href: '/docs/faqs' },
        { label: 'tyutool flashing & authorization tool', href: '/tyutool' },
      ],
      contactNote: 'For enterprise, volume, or custom pricing, contact',
    },
  },

  zh: {
    meta: 'TuyaOpen 授权指南 —— 授权码是什么、应选哪个档位、如何获取、写入设备并排查常见问题。',
    badge: '帮助指南',
    title: '授权指南',
    subtitle:
      '关于 TuyaOpen 授权码的一切：它是什么、设备需要哪个档位、如何领取或购买、如何写入与校验，以及常见问题的解决办法。',
    back: '← 返回价格页',
    tocTitle: '本页内容',
    nav: [
      { id: 'what', label: '授权是什么' },
      { id: 'choose', label: '选择档位' },
      { id: 'get', label: '获取授权' },
      { id: 'write', label: '写入设备' },
      { id: 'verify', label: '校验与配网' },
      { id: 'troubleshooting', label: '故障排查' },
      { id: 'help', label: '更多帮助' },
    ],

    what: {
      title: 'TuyaOpen 授权是什么？',
      lead: 'TuyaOpen 授权是让一台设备接入涂鸦 IoT 云的凭据。它由两段字符串组成，由涂鸦签发并与你的产品绑定：',
      points: [
        'UUID —— 20 位标识符，每台设备唯一。',
        'AuthKey —— 32 位密钥，与 UUID 一一对应。',
      ],
      whenTitle: '到底什么时候才需要？',
      whenBody:
        '仅当你的应用使用涂鸦云服务时 —— 云连接、App 控制、OTA 或 AI。纯本地与离线项目（蓝牙、Wi-Fi、第三方 API）在免费开源框架上运行，完全无需授权。',
      noteTitle: 'TuyaOpen 授权不是 TuyaOS 授权',
      noteBody:
        'TuyaOpen 需要 TuyaOpen 专用的 UUID + AuthKey。来自 TuyaOS（或其他来源）的授权无法在 TuyaOpen 框架内接入云端。',
    },

    choose: {
      title: '你的设备需要哪个档位？',
      lead: '根据设备的功能匹配档位。你可以先免费起步，之后再写入付费授权 —— 框架与代码保持不变。',
      tiers: [
        {
          name: '开源开发者',
          price: '免费',
          desc: '本地控制、蓝牙/Wi-Fi、传感器、第三方 API。无云、无授权。',
          hi: false,
        },
        {
          name: 'IoT 连接',
          price: '¥5',
          desc: '涂鸦云连接、智能生活 App 控制、数据点与 OTA 升级。',
          hi: false,
        },
        {
          name: 'AI + IoT',
          price: '¥12',
          desc: '在 IoT 之上，增加语音（ASR/TTS）、大模型、视觉与 AI 智能体平台。',
          hi: true,
        },
      ],
      compareCta: '查看完整对比',
    },

    get: {
      title: '获取授权',
      lead: '开发阶段可领取免费授权码；量产时按设备购买授权。',
      freeTitle: '领取 2 个免费开发者授权',
      freeIntro: '开发阶段可在涂鸦开发者平台领取 2 个免费设备授权（价值 ¥20）：',
      freeSteps: [
        '登录涂鸦开发者平台并创建产品 —— 任选一个品类（它只是起始模板）。需要 AI-Agent 能力时，选择带 AI 标签的模板。',
        '选择 T5 模组，点击「添加自定义固件」，上传任意占位文件作为占位。',
        '在产品页面，点击领取 2 个免费授权码。',
        '打开授权列表，即可查看你的 UUID 与 AuthKey。',
      ],
      platformBtn: '打开开发者平台',
      buyTitle: '购买量产授权',
      buyIntro:
        '准备量产时，按设备购买授权（¥5 IoT / ¥12 AI + IoT）。也可订购出厂即预烧录授权的涂鸦模组。',
      buyBtn: '购买授权',
    },

    write: {
      title: '将授权写入设备',
      lead: '拿到 UUID + AuthKey 后，用适合你工作流的任一方式写入。四种方式效果相同。',
      methods: [
        {
          badge: '推荐',
          title: '头文件（编入固件）',
          body: '在 tuya_config.h（位于项目的 src 或 include 目录）设置宏，然后重新编译并烧录。适合永久、按构建配置。',
          code: `// tuya_config.h
#define TUYA_OPENSDK_UUID    "uuidxxxxxxxxxxxxxxxx"  // 你的 UUID
#define TUYA_OPENSDK_AUTHKEY "keyxxxxxxxxxxxxxxxxxx"  // 你的 AuthKey

# 然后：
tos.py build && tos.py flash`,
        },
        {
          badge: '串口 CLI',
          title: 'auth 命令经串口写入',
          body: '适用于支持 auth CLI 的固件。在烧录串口上打开串口监视器，写入这对值，然后重启。',
          code: `tos.py monitor -b 115200

tuya> auth uuid9f6a6... cGuDnU2Yxj...
Authorization write succeeds.`,
        },
        {
          badge: 'GUI',
          title: 'tyutool 桌面应用',
          body: '连接设备，打开「授权」标签页，输入 UUID + AuthKey 并写入 —— 无需重新编译。适合单台与小批量。',
          code: null,
        },
        {
          badge: '浏览器',
          title: 'TuyaOpen 串口网页工具',
          body: '在 Chrome 内核浏览器中打开网页工具，连接授权串口，使用授权写入标签页。',
          code: null,
        },
      ],
      mcuNote: '在 MCU 上，授权写入一次即可 —— 它存于非应用区的键值区，固件升级不会丢失，仅在整片擦除或写入新密钥时清除。',
      linuxNote: '在带文件系统的 SoC（Linux、树莓派）上，授权可编入头文件，或保存为文件在运行时加载。',
    },

    verify: {
      title: '校验并为设备配网',
      lead: '确认授权已存储、重启，然后在 App 中让设备上线。',
      steps: [
        '用 auth-read 命令回读已存授权，确认 UUID 与 AuthKey 为真实值（而非 xxxx）。',
        '重启设备使授权生效。',
        '在涂鸦智能生活 App 中为设备配网，设备即以该凭据向云端激活。',
      ],
      code: `tuya> auth-read
uuid9f6a6xxxxxxxxxxx
cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx`,
      reuseTitle: '一 UUID，一在线设备',
      reuseBody:
        '每个 UUID 同一时间仅能让一台设备上线。要在另一块板子上复用 AuthKey，请先在涂鸦 App 中解绑原设备（设备面板 →「解除绑定并清除数据」）。',
    },

    trouble: {
      title: '故障排查',
      items: [
        {
          q: '启动日志显示「Authorization read failure」',
          body: '授权从未写入，或写入有误。用上述任一方式重新写入 UUID + AuthKey，然后重启。',
        },
        {
          q: 'auth-read 显示 xxxxxxxx 而非真实值',
          body: '尚未存储授权。用 auth 命令或头文件写入，重启后回读确认。',
        },
        {
          q: '设备无法配网 / App 中找不到',
          body: '用 auth-read 确认已存真实 UUID/AuthKey，且为 TuyaOpen（非 TuyaOS）授权、PID 正确。如有需要重新写入、复位设备后重试。Linux 上可删除 tuyadb 文件夹后重新运行。',
        },
        {
          q: '可以把授权迁到另一台设备吗？',
          body: '可以，但需先在涂鸦 App 中解绑原设备。一个 UUID 同一时间仅能有一台设备在线。',
        },
        {
          q: '烧录新固件会清除授权吗？',
          body: '不会。在 MCU 上授权位于受保护的键值区，固件升级不会丢失，仅整片擦除才会清除。',
        },
      ],
    },

    help: {
      title: '更多帮助',
      lead: '以下文档对每一步有更深入说明：',
      links: [
        { label: '设备授权（串口与头文件方式）', href: '/docs/quick-start/equipment-authorization' },
        { label: '获取开发者授权（领取免费码）', href: '/docs/faqs/get-developer-license' },
        { label: '授权与许可常见问题', href: '/docs/faqs' },
        { label: 'tyutool 烧录与授权工具', href: '/tyutool' },
      ],
      contactNote: '企业、批量或定制价格，请联系',
    },
  },
}

/* ----------------------------------------------------------------------- */
/* Helpers                                                                 */
/* ----------------------------------------------------------------------- */

function Code({ children }) {
  return (
    <pre className={styles.codeBlock}>
      <code>{children}</code>
    </pre>
  )
}

/* ----------------------------------------------------------------------- */
/* Page                                                                    */
/* ----------------------------------------------------------------------- */

export default function PricingGuide() {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en'
  const c = content[locale]
  const base = locale === 'zh' ? '/zh' : ''
  const pricingHref = `${base}/pricing`
  const docHref = (p) => `${base}${p}`

  const [activeId, setActiveId] = useState(c.nav[0].id)
  const contentRef = useRef(null)

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const root = contentRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return undefined
    const sections = root.querySelectorAll('section[id]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [locale])

  return (
    <Layout title={`${c.title} — TuyaOpen`} description={c.meta}>
      <Head><meta name="keywords" content="tuyaopen pricing guide, iot development platform pricing, license key, aiot platform cost, open source iot platform" /></Head>
      <main className={styles.root}>
        {/* -------------------------------------------------------- Hero */}
        <header className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden />
          <div className={styles.heroInner}>
            <Link to={pricingHref} className={styles.breadcrumb}>
              {c.back}
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
            {/* What is a license */}
            <section id="what" className={styles.block}>
              <h2 className={styles.h2}>{c.what.title}</h2>
              <p className={styles.lead}>{c.what.lead}</p>
              <ul className={styles.checkList}>
                {c.what.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
              <div className={clsx(styles.callout, styles.calloutInfo)}>
                <span className={styles.calloutIcon} aria-hidden>ℹ️</span>
                <div>
                  <strong>{c.what.whenTitle}</strong>
                  <p>{c.what.whenBody}</p>
                </div>
              </div>
              <div className={clsx(styles.callout, styles.calloutWarn)}>
                <span className={styles.calloutIcon} aria-hidden>⚠️</span>
                <div>
                  <strong>{c.what.noteTitle}</strong>
                  <p>{c.what.noteBody}</p>
                </div>
              </div>
            </section>

            {/* Choose a tier */}
            <section id="choose" className={styles.block}>
              <h2 className={styles.h2}>{c.choose.title}</h2>
              <p className={styles.lead}>{c.choose.lead}</p>
              <div className={styles.tierPickGrid}>
                {c.choose.tiers.map((t, i) => (
                  <div className={clsx(styles.tierPick, t.hi && styles.tierPickHi)} key={i}>
                    <div className={styles.tierPickName}>{t.name}</div>
                    <div className={styles.tierPickPrice}>{t.price}</div>
                    <p className={styles.tierPickDesc}>{t.desc}</p>
                  </div>
                ))}
              </div>
              <Link className={styles.btnGhost} to={pricingHref}>
                {c.choose.compareCta} →
              </Link>
            </section>

            {/* Get a license */}
            <section id="get" className={styles.block}>
              <h2 className={styles.h2}>{c.get.title}</h2>
              <p className={styles.lead}>{c.get.lead}</p>

              <h3 className={styles.h3}>{c.get.freeTitle}</h3>
              <p>{c.get.freeIntro}</p>
              <ol className={styles.steps}>
                {c.get.freeSteps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
              <a className={styles.btnPrimary} href={PLATFORM} target="_blank" rel="noopener noreferrer">
                {c.get.platformBtn}
              </a>

              <h3 className={styles.h3}>{c.get.buyTitle}</h3>
              <p>{c.get.buyIntro}</p>
              <a className={styles.btnPrimary} href={PURCHASE} target="_blank" rel="noopener noreferrer">
                {c.get.buyBtn}
              </a>
            </section>

            {/* Write it */}
            <section id="write" className={styles.block}>
              <h2 className={styles.h2}>{c.write.title}</h2>
              <p className={styles.lead}>{c.write.lead}</p>
              <div className={styles.platformGrid}>
                {c.write.methods.map((m, i) => (
                  <div className={styles.platformCard} key={i}>
                    <span className={styles.methodBadge}>{m.badge}</span>
                    <h3 className={styles.h3} style={{ marginTop: 0 }}>{m.title}</h3>
                    <p>{m.body}</p>
                    {m.code && <Code>{m.code}</Code>}
                    {m.title.includes('tyutool') && (
                      <Link className={styles.btnGhost} to={`${base}/tyutool`}>
                        tyutool →
                      </Link>
                    )}
                    {(m.badge === 'Browser' || m.badge === '浏览器') && (
                      <Link className={styles.btnGhost} to={`${base}/web-serial`}>
                        web-serial →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className={clsx(styles.callout, styles.calloutTip)}>
                <span className={styles.calloutIcon} aria-hidden>💡</span>
                <div>
                  <p>{c.write.mcuNote}</p>
                  <p className={styles.calloutMuted}>{c.write.linuxNote}</p>
                </div>
              </div>
            </section>

            {/* Verify */}
            <section id="verify" className={styles.block}>
              <h2 className={styles.h2}>{c.verify.title}</h2>
              <p className={styles.lead}>{c.verify.lead}</p>
              <div className={styles.twoCol}>
                <ol className={styles.steps}>
                  {c.verify.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
                <Code>{c.verify.code}</Code>
              </div>
              <div className={clsx(styles.callout, styles.calloutInfo)}>
                <span className={styles.calloutIcon} aria-hidden>ℹ️</span>
                <div>
                  <strong>{c.verify.reuseTitle}</strong>
                  <p>{c.verify.reuseBody}</p>
                </div>
              </div>
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
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* More help */}
            <section id="help" className={styles.block}>
              <h2 className={styles.h2}>{c.help.title}</h2>
              <p className={styles.lead}>{c.help.lead}</p>
              <ul className={styles.checkList}>
                {c.help.links.map((l, i) => (
                  <li key={i}>
                    <Link to={docHref(l.href)}>{l.label}</Link>
                  </li>
                ))}
              </ul>
              <p>
                {c.help.contactNote}{' '}
                <a href="mailto:service@tuya.com">service@tuya.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  )
}
