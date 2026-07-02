import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { clsx } from 'clsx';
import TutorialShell from '@site/src/components/TutorialShell';
import shell from '@site/src/components/TutorialShell/styles.module.css';
import RichText from './RichText';

/* =========================================================================
 * LEARN: Pair your device with the SmartLife app   kind: 'interactive'
 * Segment 4 of the "first device" path. Put a flashed+authorized device into
 * pairing mode and register it to the Tuya IoT Cloud via the SmartLife app.
 * Grounded in docs/quick-start/device-network-configuration.md + the live
 * https://tuyaopen.ai/docs/quick-start/device-network-configuration page.
 *
 * Store URLs:
 *   iOS     — https://apps.apple.com/us/app/id1115101477
 *              (verified via Apple iTunes lookup API: "SmartLife- Smart Living",
 *               developer "Volcano Technology Limited", bundle com.tuya.smartlife)
 *   Android — https://play.google.com/store/apps/details?id=com.tuya.smartlife
 *              (bundle id com.tuya.smartlife, Tuya's standard package convention)
 *   QR      — official Tuya download QR (routes to a platform-aware landing page,
 *              so one QR serves both iOS and Android)
 * ========================================================================= */

const IOS_URL = 'https://apps.apple.com/us/app/id1115101477';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.tuya.smartlife';
const QR_URL = 'https://images.tuyacn.com/fe-static/docs/img/48b9e225-aa49-4e95-9d61-511bb7df27c8.png';

const content = {
  en: {
    badge: 'Basics',
    title: 'Pair your device with the SmartLife app',
    subtitle:
      'Put your flashed, authorized device into pairing mode and register it to the Tuya IoT Cloud from the SmartLife app — the last step to a device you can control from your phone.',
    meta: ['Beginner', '6 min', 'Network'],
    nav: [
      { id: 'what', label: 'What you get' },
      { id: 'before', label: 'Prerequisites' },
      { id: 'download', label: 'Get the app' },
      { id: 'mode', label: 'Enter pairing mode' },
      { id: 'pair', label: 'Method 1: Add in app' },
      { id: 'scan', label: 'Method 2: Scan QR' },
      { id: 'trouble', label: 'Troubleshooting' },
    ],
    whatTitle: 'What you get at the end',
    whatLead:
      'Your device is registered to the Tuya IoT Cloud and controllable from the SmartLife app — the finish line of the first-device path.',
    whatPoints: [
      'Pairing connects and registers the device to the cloud, so you can control it remotely.',
      'The device must already be flashed with firmware AND authorized (UUID + AuthKey written).',
      'Some Tuya modules only support the 2.4 GHz Wi-Fi band — check your chip/module’s WiFi capabilities and your router settings.',
    ],
    beforeTitle: 'Prerequisites',
    beforeLead: 'Before you pair, confirm each of these:',
    beforePoints: [
      'The **SmartLife** app installed on your phone (see Get the app below).',
      'A device that has been flashed with firmware and authorized — see Use your license key if not.',
      'The device in pairing mode (see Enter pairing mode).',
    ],
    downloadTitle: 'Get the SmartLife app',
    downloadLead: 'Install SmartLife on your phone, then register and log in. Scan the QR code or tap your store below.',
    downloadAppName: 'SmartLife',
    downloadAppTagline: 'Smart living, by Tuya',
    downloadScanLabel: 'Scan to download',
    downloadIosBtn: 'App Store',
    downloadAndroidBtn: 'Google Play',
    downloadNote: 'The QR code opens the official SmartLife download page, which routes you to the right store for your phone.',
    modeTitle: 'Enter pairing mode',
    modeAutoTitle: 'On first boot',
    modeAutoLead:
      'If your application uses the Tuya IoT Cloud (like `switch_demo` or `your_chat_bot`), a freshly flashed and authorized device enters pairing mode automatically on its first boot — no trigger needed. Watch the serial log to confirm it is ready.',
    modeResetTitle: 'If it is not in pairing mode',
    modeResetLead:
      'If the device has paired before, lost its network config, or is not showing the pairing log, reset the pairing and network configuration with one of these methods:',
    modeResetTableTitle: 'Reset method by device type',
    modeResetTable: [
      ['Embedded module (T5/T3/T2/ESP32/BK…)', 'Power-cycle the device 3 times within 5 seconds — about 1 second between each reboot.'],
      ['Raspberry Pi / Linux host', 'Delete the `tuyadb` folder on the device to clear the stored pairing configuration, then reboot.'],
    ],
    modeLogTitle: 'What the log shows when it is ready',
    modeLogLead: 'Whichever path you took, the device is in pairing mode when you see this in the serial log:',
    modeLog: `[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)`,
    pairTitle: 'Method 1 — Add the device in the app (common)',
    pairLead: 'With the device in pairing mode, add it from the SmartLife app:',
    pairSteps: [
      'On the **All Devices** page, tap **Add Device** or the **+** in the top right.',
      'Grant Wi-Fi and Bluetooth permissions when prompted — without them, nearby devices cannot be discovered.',
      'Tap **Go to add** when the device appears on the Home or Add Device page, then follow the app prompts to finish pairing.',
    ],
    pairStepImgs: [
      {
        url: 'https://images.tuyacn.com/fe-static/docs/img/8e8b4e0a-d6e4-4941-a078-717c96baf262.png',
        alt: 'SmartLife app All Devices page with the Add Device button and + icon',
      },
      {
        url: 'https://images.tuyacn.com/fe-static/docs/img/a6784328-c0d3-45ac-9730-8eabef788b1a.png',
        alt: 'SmartLife app prompt to turn on Wi-Fi and Bluetooth to discover nearby devices',
      },
      {
        url: 'https://images.tuyacn.com/fe-static/docs/img/bc243e3a-32f1-418f-ab07-fd70e68af857.png',
        alt: 'SmartLife app showing a nearby device in pairing mode with the Go to add button',
      },
    ],
    pairWarn:
      'Some Tuya modules only support the 2.4 GHz Wi-Fi band. If pairing fails, check your chip/module’s WiFi capabilities and confirm your router is serving 2.4 GHz (or split the bands) during pairing.',
    scanTitle: 'Method 2 — Scan to pair (QR)',
    scanLead:
      'Some TuyaOpen devices — commonly Linux devices like Raspberry Pi — pair by scanning a QR code the device prints to its terminal.',
    scanSteps: [
      'Make sure the device is in pairing mode and a QR code is shown in the terminal/log.',
      'Open the SmartLife app and tap **+** in the top right.',
      'Select **Scan** and point the camera at the QR code the device printed.',
      'Follow the on-screen instructions to finish pairing.',
    ],
    scanImg: {
      url: 'https://images.tuyacn.com/fe-static/docs/img/5971b072-a264-4324-ba3f-a90f8b899ddd.png',
      alt: 'SmartLife app QR code scanning screen used for pairing',
    },
    troubleTitle: 'Troubleshooting',
    trouble: [
      {
        q: 'Pairing fails and UUID / AuthKey show as xxxxxxxxxxxxxxxx in the log',
        a: 'The authorization information was not written. Re-write a TuyaOpen (not TuyaOS) UUID + AuthKey with tyutool, then re-enter pairing mode. See Use your license key.',
      },
      {
        q: 'The app cannot discover the device',
        a: 'Confirm Wi-Fi and Bluetooth permissions are granted to SmartLife, the device is in pairing mode (look for TUYA_EVENT_BIND_START in the log), and your phone is on the same network band the device supports.',
      },
      {
        q: 'Pairing fails against the router',
        a: 'Some Tuya modules only support 2.4 GHz. Check your chip/module’s WiFi capabilities, and confirm the router is serving a supported band — split or disable 5 GHz during pairing if needed.',
      },
      {
        q: 'The device is flashed but has no license key',
        a: 'Flashing firmware is not the same as authorizing. The device needs a UUID + AuthKey written separately — see Get a license key and Use your license key before pairing.',
      },
      {
        q: 'The device was paired before and will not re-pair',
        a: 'Reset the pairing and network configuration first: power-cycle 3 times within 5 seconds (~1 s apart) on embedded modules, or delete the `tuyadb` folder on a Raspberry Pi / Linux host, then reboot.',
      },
    ],
    nextLabel: 'You did it — browse more learn →',
  },
  zh: {
    badge: '基础',
    title: '用 SmartLife App 配网',
    subtitle:
      '让已烧录并授权的设备进入配网模式，并通过 SmartLife App 将其注册到涂鸦云 —— 这是第一台设备路径的最后一公里。',
    meta: ['入门', '6 分钟', '网络'],
    nav: [
      { id: 'what', label: '完成后的状态' },
      { id: 'before', label: '前置条件' },
      { id: 'download', label: '获取 App' },
      { id: 'mode', label: '进入配网模式' },
      { id: 'pair', label: '方法 1：App 添加' },
      { id: 'scan', label: '方法 2：扫码' },
      { id: 'trouble', label: '故障排查' },
    ],
    whatTitle: '完成后的状态',
    whatLead:
      '设备已注册到涂鸦云，可在 SmartLife App 中远程控制 —— 第一台设备路径的终点。',
    whatPoints: [
      '配网即将设备连接并注册到云端，从而支持远程控制。',
      '设备必须已烧录固件并完成授权（写入 UUID + AuthKey）。',
      '部分 Tuya 模组仅支持 2.4 GHz Wi-Fi 频段 —— 请核对芯片/模组的 WiFi 能力与路由器设置。',
    ],
    beforeTitle: '前置条件',
    beforeLead: '配网前请逐项确认：',
    beforePoints: [
      '手机已安装 **SmartLife** App（见下方“获取 App”）。',
      '设备已烧录固件并完成授权 —— 未授权请先看“使用授权码”。',
      '设备处于配网模式（见“进入配网模式”）。',
    ],
    downloadTitle: '获取 SmartLife App',
    downloadLead: '在手机上安装 SmartLife，注册并登录。可扫描下方二维码，或点击对应应用商店。',
    downloadAppName: 'SmartLife',
    downloadAppTagline: '涂鸦智能生活',
    downloadScanLabel: '扫码下载',
    downloadIosBtn: 'App Store',
    downloadAndroidBtn: 'Google Play',
    downloadNote: '二维码会打开 SmartLife 官方下载页，并根据你的手机自动跳转到对应应用商店。',
    modeTitle: '进入配网模式',
    modeAutoTitle: '首次启动',
    modeAutoLead:
      '若你的应用使用了涂鸦云（如 `switch_demo` 或 `your_chat_bot`），刚烧录并授权的设备会在首次启动时自动进入配网模式，无需手动触发。可通过串口日志确认就绪。',
    modeResetTitle: '若未进入配网模式',
    modeResetLead:
      '若设备此前已配过网、丢失网络配置，或日志中没有出现配网信息，可用以下方法重置配网与网络配置：',
    modeResetTableTitle: '各设备类型的重置方式',
    modeResetTable: [
      ['嵌入式模组（T5/T3/T2/ESP32/BK…）', '在 5 秒内给设备断电再上电 3 次，每次间隔约 1 秒。'],
      ['树莓派 / Linux 主机', '删除设备上的 `tuyadb` 文件夹以清除已存储的配网配置，再重启。'],
    ],
    modeLogTitle: '就绪时的日志特征',
    modeLogLead: '无论走哪条路径，当串口日志出现以下内容时，设备即进入配网模式：',
    modeLog: `[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)`,
    pairTitle: '方法 1 —— 在 App 中添加设备（常用）',
    pairLead: '设备进入配网模式后，在 SmartLife App 中添加：',
    pairSteps: [
      '在 **全部设备** 页面，点击 **添加设备** 或右上角的 **+**。',
      '按提示授予 Wi-Fi 与蓝牙权限 —— 否则无法发现附近设备。',
      '设备出现在首页或添加设备页后，点击 **前往添加**，按 App 提示完成配网。',
    ],
    pairWarn:
      '部分 Tuya 模组仅支持 2.4 GHz Wi-Fi 频段。若配网失败，请核对芯片/模组的 WiFi 能力，并确认路由器在配网期间开启了所支持的频段（或分离双频）。',
    scanTitle: '方法 2 —— 扫码配网（QR）',
    scanLead:
      '部分 TuyaOpen 设备 —— 常见于树莓派等 Linux 设备 —— 通过扫描设备在终端打印的二维码配网。',
    scanSteps: [
      '确认设备处于配网模式，且终端/日志中显示了二维码。',
      '打开 SmartLife App，点击右上角 **+**。',
      '选择 **扫描**，将摄像头对准设备打印的二维码。',
      '按屏幕提示完成配网。',
    ],
    troubleTitle: '故障排查',
    trouble: [
      {
        q: '配网失败，日志中 UUID / AuthKey 显示为 xxxxxxxxxxxxxxxx',
        a: '授权信息未写入。用 tyutool 重新写入 TuyaOpen（而非 TuyaOS）的 UUID + AuthKey，再重新进入配网模式。参见“使用授权码”。',
      },
      {
        q: 'App 搜不到设备',
        a: '确认已授予 SmartLife 的 Wi-Fi 与蓝牙权限、设备处于配网模式（日志含 TUYA_EVENT_BIND_START）、手机与设备在所支持的同一频段网络。',
      },
      {
        q: '在路由器下配网失败',
        a: '部分 Tuya 模组仅支持 2.4 GHz。请核对芯片/模组的 WiFi 能力，确认路由器开启了所支持的频段 —— 必要时在配网期间分离或关闭 5 GHz。',
      },
      {
        q: '设备已烧录但没有授权码',
        a: '烧录固件不等于授权。设备需另行写入 UUID + AuthKey —— 配网前请先看“获取授权码”与“使用授权码”。',
      },
      {
        q: '设备之前配过网、无法重新配网',
        a: '先重置配网与网络配置：嵌入式模组在 5 秒内断电再上电 3 次（间隔约 1 秒）；树莓派 / Linux 主机删除 `tuyadb` 文件夹后重启。',
      },
    ],
    nextLabel: '完成 —— 浏览更多教程 →',
  },
};

/* ---- Inline SVG icons (Lucide-style, currentColor) --------------------- */
const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

// Smart-home glyph for the app icon (house + signal arc).
function SmartHomeIcon({ size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
      <path d="M9.5 19v-5h5v5" />
      <path d="M12 4V2.2" opacity={0.7} />
    </svg>
  );
}

// Apple logo glyph.
function AppleIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.36 12.93c.02 2.3 2.02 3.06 2.04 3.07-.02.05-.32 1.1-1.06 2.18-.64.93-1.3 1.86-2.34 1.88-1.02.02-1.35-.6-2.52-.6-1.17 0-1.53.58-2.5.62-1 .04-1.76-1-2.41-1.93-1.31-1.9-2.31-5.37-.96-7.72.66-1.16 1.85-1.9 3.13-1.92.98-.02 1.9.66 2.5.66.59 0 1.7-.82 2.86-.7.49.02 1.86.2 2.74 1.49-.07.04-1.64.96-1.62 2.87zM14.4 5.95c.54-.65.9-1.56.8-2.46-.77.03-1.71.51-2.27 1.16-.5.58-.94 1.5-.82 2.38.86.07 1.75-.44 2.29-1.08z" />
    </svg>
  );
}

// Google Play triangle glyph.
function PlayStoreIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3.5 2.5v19l9-9.5-9-9.5z" fill="#00d4ff" />
      <path d="M3.5 2.5l9 9.5 3.2-3.4-12.2-6.1z" fill="#00f076" />
      <path d="M3.5 21.5l9-9.5 3.2 3.4-12.2 6.1z" fill="#ffce00" />
      <path d="M3.5 2.5l12.2 6.1 3.6-1.9c.9-.5.9-1.7 0-2.2L5.1.3c-.9-.5-1.6.2-1.6 1.1v1.1z" fill="#ff3a44" />
    </svg>
  );
}

/* ---- Numbered step list with optional per-step screenshot -------------- */
function StepList({ steps, imgs }) {
  return (
    <ol
      style={{
        listStyle: 'none',
        counterReset: 'step',
        padding: 0,
        margin: '1.25rem 0',
        display: 'grid',
        gap: '1.5rem',
      }}
    >
      {steps.map((s, i) => {
        const img = imgs && imgs[i];
        return (
          <li
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '0.85rem',
              alignItems: 'start',
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '1.6rem',
                height: '1.6rem',
                borderRadius: '50%',
                background: 'var(--brand-primary, #7c5cff)',
                color: '#fff',
                fontSize: '0.82rem',
                fontWeight: 800,
                flexShrink: 0,
                marginTop: '0.1rem',
              }}
            >
              {i + 1}
            </span>
            <div>
              <RichText text={s} />
              {img && (
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  style={{
                    display: 'block',
                    marginTop: '0.75rem',
                    maxWidth: '360px',
                    width: '100%',
                    borderRadius: '12px',
                    border: '1px solid var(--neutral-200, #e2e8f0)',
                    boxShadow:
                      '0 1px 2px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.08), 0 12px 28px rgba(15,23,42,0.1)',
                  }}
                />
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function TriggerTable({ rows }) {
  return (
    <div
      style={{
        margin: '1.25rem 0',
        border: '1px solid var(--neutral-200, #e2e8f0)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {rows.map(([demo, trigger], i) => (
        <div
          key={demo}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, auto) 1fr',
            gap: '1rem',
            padding: '0.75rem 1rem',
            background: i % 2 ? 'var(--neutral-50, #f8fafc)' : 'transparent',
            borderBottom:
              i < rows.length - 1 ? '1px solid var(--neutral-200, #e2e8f0)' : 'none',
          }}
        >
          <span
            style={{
              fontWeight: 600,
              color: 'var(--neutral-800, #1e293b)',
              alignSelf: 'center',
            }}
          >
            {demo}
          </span>
          <span style={{ color: 'var(--neutral-700, #334155)', lineHeight: 1.55 }}>
            <RichText text={trigger} />
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---- Designed app-download card ---------------------------------------- */
function DownloadSection({ c }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
        alignItems: 'center',
        margin: '1.5rem 0',
        padding: '1.75rem',
        borderRadius: '16px',
        background:
          'linear-gradient(135deg, rgba(124,92,255,0.07) 0%, rgba(255,107,53,0.05) 100%)',
        border: '1px solid var(--neutral-200, #e2e8f0)',
      }}
    >
      {/* Left: app identity + store buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #7c5cff 0%, #5b3fd6 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 6px 18px rgba(124,92,255,0.35)',
            }}
          >
            <SmartHomeIcon size={30} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--neutral-900, #0f172a)' }}>
              {c.downloadAppName}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--neutral-500, #64748b)' }}>
              {c.downloadAppTagline}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a
            href={IOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.6rem 1.1rem',
              borderRadius: 10,
              background: '#0f172a',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <AppleIcon size={18} />
            {c.downloadIosBtn}
          </a>
          <a
            href={ANDROID_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.6rem 1.1rem',
              borderRadius: 10,
              background: '#0f172a',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <PlayStoreIcon size={18} />
            {c.downloadAndroidBtn}
          </a>
        </div>
      </div>

      {/* Right: QR code */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div
          style={{
            padding: '0.6rem',
            background: '#fff',
            borderRadius: 12,
            border: '1px solid var(--neutral-200, #e2e8f0)',
          }}
        >
          <img
            src={QR_URL}
            alt="SmartLife app download QR code"
            width={160}
            height={160}
            style={{ display: 'block', borderRadius: 6 }}
          />
        </div>
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--neutral-500, #64748b)',
          }}
        >
          {c.downloadScanLabel}
        </span>
      </div>
    </div>
  );
}

export default function PairDevice() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];
  const hubHref = locale === 'zh' ? '/zh/learn' : '/learn';
  const docsHref = locale === 'zh'
    ? '/zh/docs/quick-start/device-network-configuration'
    : '/docs/quick-start/device-network-configuration';
  const licenseHref = locale === 'zh' ? '/zh/learn/using-license-key' : '/learn/using-license-key';

  return (
    <TutorialShell badge={c.badge} title={c.title} subtitle={c.subtitle} meta={c.meta} nav={c.nav}>
      {/* What you get */}
      <section id="what" className={shell.block}>
        <h2 className={shell.h2}>{c.whatTitle}</h2>
        <p className={shell.lead}>{c.whatLead}</p>
        <ul className={shell.checkList}>
          {c.whatPoints.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      {/* Prerequisites */}
      <section id="before" className={shell.block}>
        <h2 className={shell.h2}>{c.beforeTitle}</h2>
        <p className={shell.lead}>{c.beforeLead}</p>
        <ul className={shell.checkList}>
          {c.beforePoints.map((p, i) => (
            <li key={i}>
              <RichText text={p} />
            </li>
          ))}
        </ul>
      </section>

      {/* Get the app */}
      <section id="download" className={shell.block}>
        <h2 className={shell.h2}>{c.downloadTitle}</h2>
        <p className={shell.lead}>{c.downloadLead}</p>
        <DownloadSection c={c} />
        <div className={clsx(shell.callout, shell.calloutInfo)}>
          <p>{c.downloadNote}</p>
        </div>
      </section>

      {/* Pairing mode */}
      <section id="mode" className={shell.block}>
        <h2 className={shell.h2}>{c.modeTitle}</h2>

        <h3 className={shell.h3}>{c.modeAutoTitle}</h3>
        <p className={shell.lead}>
          <RichText text={c.modeAutoLead} />
        </p>

        <h3 className={shell.h3}>{c.modeResetTitle}</h3>
        <p className={shell.lead}>{c.modeResetLead}</p>
        <TriggerTable rows={c.modeResetTable} />

        <h3 className={shell.h3}>{c.modeLogTitle}</h3>
        <p className={shell.lead}>{c.modeLogLead}</p>
        <pre className={shell.codeBlock}>
          <code>{c.modeLog}</code>
        </pre>
      </section>

      {/* Add device */}
      <section id="pair" className={shell.block}>
        <h2 className={shell.h2}>{c.pairTitle}</h2>
        <p className={shell.lead}>{c.pairLead}</p>
        <StepList steps={c.pairSteps} imgs={c.pairStepImgs} />
        <div className={clsx(shell.callout, shell.calloutInfo)}>
          <p>{c.pairWarn}</p>
        </div>
      </section>

      {/* Scan to pair */}
      <section id="scan" className={shell.block}>
        <h2 className={shell.h2}>{c.scanTitle}</h2>
        <p className={shell.lead}>{c.scanLead}</p>
        <StepList steps={c.scanSteps} />
        {c.scanImg && (
          <img
            src={c.scanImg.url}
            alt={c.scanImg.alt}
            loading="lazy"
            style={{
              display: 'block',
              maxWidth: '300px',
              width: '100%',
              margin: '1rem 0',
              borderRadius: '12px',
              border: '1px solid var(--neutral-200, #e2e8f0)',
              boxShadow:
                '0 1px 2px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.08), 0 12px 28px rgba(15,23,42,0.1)',
            }}
          />
        )}
      </section>

      {/* Troubleshooting */}
      <section id="trouble" className={shell.block}>
        <h2 className={shell.h2}>{c.troubleTitle}</h2>
        {c.trouble.map((item, i) => (
          <div key={i} className={clsx(shell.callout, shell.calloutInfo)} style={{ display: 'block' }}>
            <strong>{item.q}</strong>
            <p>
              <RichText text={item.a} />
            </p>
          </div>
        ))}
        <p style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a className={shell.btnPrimary} href={hubHref}>
            {c.nextLabel}
          </a>
          <a className={shell.btnGhost} href={docsHref}>
            {locale === 'zh' ? '完整配网文档 →' : 'Full pairing docs →'}
          </a>
          <a className={shell.btnGhost} href={licenseHref}>
            {locale === 'zh' ? '使用授权码 →' : 'Use your license key →'}
          </a>
        </p>
      </section>
    </TutorialShell>
  );
}
