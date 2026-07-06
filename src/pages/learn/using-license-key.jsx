import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { clsx } from 'clsx';
import TutorialShell from '@site/src/components/TutorialShell';
import shell from '@site/src/components/TutorialShell/styles.module.css';

/* =========================================================================
 * TUTORIAL: Use your license key (authorize a device)   kind: 'interactive'
 * Registered in src/data/tutorials.js under the "guides" category.
 * ========================================================================= */

const content = {
  en: {
    badge: 'Guide',
    title: 'Use your license key',
    subtitle:
      'A TuyaOpen license key is a UUID + AuthKey pair. This guide shows how to write it to a device and verify it, so the device can connect to the Tuya Cloud.',
    meta: ['Beginner', 'Authorization'],
    nav: [
      { id: 'what', label: 'What it is' },
      { id: 'get', label: 'Get a key' },
      { id: 'write', label: 'Write it to a device' },
      { id: 'verify', label: 'Verify' },
      { id: 'trouble', label: 'Troubleshooting' },
    ],
    whatTitle: 'What a license key is',
    whatLead:
      'Every TuyaOpen device that connects to the Tuya Cloud needs one license key — a UUID (identity) and an AuthKey (secret), written to the device over the same UART you flash with.',
    whatPoints: [
      'One key authorizes one device. Keys are not reusable across devices.',
      'TuyaOpen and TuyaOS keys are not interchangeable — use a TuyaOpen key.',
      'A key is separate from firmware: you can re-flash firmware without re-writing the key.',
    ],
    getTitle: 'Get a key',
    getLead:
      'You can get a free trial key for evaluation, or buy keys in bulk for production. See the licensing page for options and pricing.',
    getBtn: 'Get a license key',
    getPlatform: 'Tuya Developer Platform',
    getNote: 'Have your UUID and AuthKey ready before you start — you will paste them into tyutool.',
    writeTitle: 'Write the key to a device',
    writeLead: 'The easiest way is tyutool. Connect the board over USB, then use the GUI or the CLI.',
    guiTitle: 'With the tyutool GUI',
    guiSteps: [
      'Open tyutool and switch to the Authorize tab.',
      'Select your target chip — tyutool applies the correct serial settings automatically.',
      'Select the authorization serial port.',
      'Paste the UUID and AuthKey.',
      'Click Start authorization, then read back the state to confirm.',
    ],
    cliTitle: 'With the CLI',
    cliIntro: 'Same operation from a terminal:',
    cliCode: `# Read the current authorization state
tyutool authorize -p /dev/ttyUSB0

# Write a new UUID + AuthKey (both required)
tyutool authorize -p /dev/ttyUSB0 \\
    --uuid <UUID> --authkey <AUTHKEY>`,
    fullGuide: 'Full flashing & authorization guide',
    verifyTitle: 'Verify it worked',
    verifyLead: 'Confirm the key is stored, then check the device activates against the cloud.',
    verifyPoints: [
      'Read the authorization state back (GUI read-back, or the CLI read command above) and confirm the UUID matches.',
      'Reboot the device and watch the serial log — a successful activation reports the device coming online.',
      'Pair the device in the Tuya app; it activates against the cloud using the written credentials.',
    ],
    troubleTitle: 'Troubleshooting',
    trouble: [
      {
        q: 'Do I need to re-write the key every time I update the firmware?',
        a: 'No. The key is stored in the device’s KV storage and survives firmware re-flashes — you only need to write it again after a full chip erase.',
      },
      {
        q: 'Authorization fails or times out',
        a: 'Make sure you selected the authorization/flash port (not the log port), and that no serial monitor is holding the port, then retry.',
      },
      {
        q: 'Device flashed but won’t connect to the cloud',
        a: 'The firmware is flashed but no key was written, or the wrong key type was used. Re-check that a TuyaOpen (not TuyaOS) UUID + AuthKey is stored.',
      },
      {
        q: 'Already-flashed device that only needs a license',
        a: 'Use the auth-only "other" chip option in tyutool — it writes the key without re-flashing firmware.',
      },
    ],
  },
  zh: {
    badge: '指南',
    title: '使用授权码',
    subtitle:
      'TuyaOpen 的授权码是一对 UUID + AuthKey。本教程讲解如何把它写入设备并验证，从而让设备接入涂鸦云。',
    meta: ['入门', '授权'],
    nav: [
      { id: 'what', label: '什么是授权码' },
      { id: 'get', label: '获取授权码' },
      { id: 'write', label: '写入设备' },
      { id: 'verify', label: '验证' },
      { id: 'trouble', label: '故障排查' },
    ],
    whatTitle: '什么是授权码',
    whatLead:
      '每一台接入涂鸦云的 TuyaOpen 设备都需要一个授权码 —— 即 UUID（身份）与 AuthKey（密钥），通过与烧录相同的 UART 写入设备。',
    whatPoints: [
      '一个授权码授权一台设备，不能在多台设备间复用。',
      'TuyaOpen 与 TuyaOS 的授权码不能互换 —— 请使用 TuyaOpen 授权码。',
      '授权码与固件相互独立：重新烧录固件时无需重写授权码。',
    ],
    getTitle: '获取授权码',
    getLead: '你可以领取免费试用授权码用于评估，或批量购买用于量产。授权与价格详情见授权页面。',
    getBtn: '获取授权码',
    getPlatform: '涂鸦开发者平台',
    getNote: '开始前请准备好 UUID 与 AuthKey —— 稍后会粘贴到 tyutool 中。',
    writeTitle: '将授权码写入设备',
    writeLead: '最简单的方式是使用 tyutool。用 USB 连接开发板后，选择 GUI 或 CLI 操作。',
    guiTitle: '使用 tyutool GUI',
    guiSteps: [
      '打开 tyutool，切换到"授权"标签页。',
      '选择目标芯片 —— tyutool 会自动应用对应的串口参数。',
      '选择授权串口。',
      '粘贴 UUID 和 AuthKey。',
      '点击"开始授权"，随后回读状态以确认。',
    ],
    cliTitle: '使用 CLI',
    cliIntro: '在终端中完成同样的操作：',
    cliCode: `# 读取当前授权状态
tyutool authorize -p /dev/ttyUSB0

# 写入新的 UUID + AuthKey（两者都必填）
tyutool authorize -p /dev/ttyUSB0 \\
    --uuid <UUID> --authkey <AUTHKEY>`,
    fullGuide: '完整的烧录与授权指南',
    verifyTitle: '验证是否成功',
    verifyLead: '先确认授权码已写入，再检查设备能否在云端激活。',
    verifyPoints: [
      '回读授权状态（GUI 回读，或上面的 CLI 读取命令），确认 UUID 一致。',
      '重启设备并观察串口日志 —— 激活成功会提示设备上线。',
      '在涂鸦 App 中配网；设备会使用写入的凭据在云端激活。',
    ],
    troubleTitle: '故障排查',
    trouble: [
      {
        q: '每次更新固件都要重新写入授权码吗？',
        a: '不需要。授权码保存在设备的 KV 存储中，重新烧录固件不会丢失；只有在整片擦除（full erase）之后才需要重新写入。',
      },
      {
        q: '授权失败或超时',
        a: '确认选择的是授权/烧录口（而非日志口），且没有串口监视器占用该串口，然后重试。',
      },
      {
        q: '固件已烧录但无法接入云端',
        a: '可能只烧录了固件却没有写入授权码，或用错了授权码类型。请确认写入的是 TuyaOpen（而非 TuyaOS）的 UUID + AuthKey。',
      },
      {
        q: '已烧录、只需授权的设备',
        a: '在 tyutool 中使用授权专用的"other"芯片选项 —— 它只写入授权码，不重新烧录固件。',
      },
    ],
  },
};

const PLATFORM = 'https://platform.tuya.com/purchase/index?type=6';

export default function UsingLicenseKey() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];
  const pricingHref = locale === 'zh' ? '/zh/pricing' : '/pricing';
  const tyutoolHref = locale === 'zh' ? '/zh/tyutool-guide' : '/tyutool-guide';

  return (
    <TutorialShell badge={c.badge} title={c.title} subtitle={c.subtitle} meta={c.meta} nav={c.nav}>
      {/* What it is */}
      <section id="what" className={shell.block}>
        <h2 className={shell.h2}>{c.whatTitle}</h2>
        <p className={shell.lead}>{c.whatLead}</p>
        <ul className={shell.checkList}>
          {c.whatPoints.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      {/* Get a key */}
      <section id="get" className={shell.block}>
        <h2 className={shell.h2}>{c.getTitle}</h2>
        <p className={shell.lead}>{c.getLead}</p>
        <p style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a className={shell.btnPrimary} href={pricingHref}>
            {c.getBtn}
          </a>
          <a className={shell.btnGhost} href={PLATFORM} target="_blank" rel="noopener noreferrer">
            {c.getPlatform} →
          </a>
        </p>
        <div className={clsx(shell.callout, shell.calloutInfo)}>
          <p>{c.getNote}</p>
        </div>
      </section>

      {/* Write it */}
      <section id="write" className={shell.block}>
        <h2 className={shell.h2}>{c.writeTitle}</h2>
        <p className={shell.lead}>{c.writeLead}</p>

        <h3 className={shell.h3}>{c.guiTitle}</h3>
        <ol className={shell.steps}>
          {c.guiSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>

        <h3 className={shell.h3}>{c.cliTitle}</h3>
        <p>{c.cliIntro}</p>
        <pre className={shell.codeBlock}>
          <code>{c.cliCode}</code>
        </pre>

        <p style={{ marginTop: '1.25rem' }}>
          <a className={shell.btnGhost} href={tyutoolHref}>
            {c.fullGuide} →
          </a>
        </p>
      </section>

      {/* Verify */}
      <section id="verify" className={shell.block}>
        <h2 className={shell.h2}>{c.verifyTitle}</h2>
        <p className={shell.lead}>{c.verifyLead}</p>
        <ul className={shell.checkList}>
          {c.verifyPoints.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      {/* Troubleshooting */}
      <section id="trouble" className={shell.block}>
        <h2 className={shell.h2}>{c.troubleTitle}</h2>
        {c.trouble.map((item, i) => (
          <div key={i} className={clsx(shell.callout, shell.calloutInfo)} style={{ display: 'block' }}>
            <strong>{item.q}</strong>
            <p>{item.a}</p>
          </div>
        ))}
      </section>
    </TutorialShell>
  );
}
