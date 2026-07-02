import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { clsx } from 'clsx';
import TutorialShell from '@site/src/components/TutorialShell';
import shell from '@site/src/components/TutorialShell/styles.module.css';
import RichText from './RichText';

/* =========================================================================
 * LEARN: Flash and monitor your device   kind: 'interactive'
 * Segment 3 of the "first device" path. Write the built bin to the board with
 * tos.py flash, then watch it boot with tos.py monitor.
 * Grounded in docs/quick-start/firmware-burning.md + docs/tos-tools/tos-guide.md.
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen SDK',
    title: 'Flash and monitor your device',
    subtitle:
      'Write the firmware bin you just built onto the board with tos.py flash, then watch it boot and run with tos.py monitor — both from the project directory.',
    meta: ['Beginner', '8 min', 'Flashing'],
    nav: [
      { id: 'what', label: 'What you get' },
      { id: 'before', label: 'Before you flash' },
      { id: 'flash', label: 'Flash' },
      { id: 'monitor', label: 'Monitor' },
      { id: 'ports', label: 'Two ports (T5)' },
      { id: 'trouble', label: 'Troubleshooting' },
    ],
    whatTitle: 'What you get at the end',
    whatLead:
      'Your board is running the firmware you built, and you can see its serial log streaming in a terminal — the proof it boots and the foundation for pairing it next.',
    whatPoints: [
      '`tos.py flash` writes the bin from `.build/bin/` to the device over the serial port you pick.',
      '`tos.py monitor` streams the device log; reset the board after starting it to capture the full boot.',
      'Both commands use `tyutool_cli` under the hood — `tos.py` downloads it automatically on first use.',
    ],
    beforeTitle: 'Before you flash',
    beforeLead: 'Connect the board to your PC over USB. Then handle the one OS-specific prerequisite:',
    beforePoints: [
      'On Linux, grant serial port access once, then reboot: `sudo usermod -aG dialout $USER`.',
      'If you run a virtual machine, map the serial port through to the VM before flashing.',
    ],
    flashTitle: 'Flash the firmware',
    flashLead:
      'Run `tos.py flash` from the project directory (the same place you ran `tos.py build`). It lists the serial ports it sees — pick yours by number.',
    flashFlagsTitle: 'Common flags',
    flashFlags: [
      ['`-p`, `--port`', 'Target serial port (e.g. `/dev/ttyACM0`, `COM3`). Omit to pick from a list.'],
      ['`-b`, `--baud`', 'Uart baud rate (default 921600).'],
      ['`-d`, `--debug`', 'Show flash debug messages.'],
    ],
    flashCode: `❯ tos.py flash
[INFO]: Run Tuya Uart Tool.
[INFO]: Use default baudrate: [921600]
[INFO]: Use default start address: [0x00]
--------------------
1. /dev/ttyACM1
2. /dev/ttyACM0
--------------------
Select serial port: 2
...
[INFO]: Write flash success
[INFO]: CRC check success
[INFO]: Reboot done
[INFO]: Flash write success.`,
    flashTip: 'You must be in the application project path and the project must have compiled successfully first.',
    monitorTitle: 'Monitor the log',
    monitorLead:
      'Run `tos.py monitor` and select the log port. Reset the board manually after starting, to capture the full boot log. Quit with Ctrl+C, then press Enter.',
    monitorCode: `❯ tos.py monitor
[INFO]: Run Tuya Uart Tool.
--------------------
1. /dev/ttyACM1
2. /dev/ttyACM0
--------------------
Select serial port: 1
[INFO]: Open Monitor. (Quit: Ctrl+c)
[01-01 00:03:25 ty D][tuya_health.c:75] feed watchdog
[01-01 00:03:35 ty D][tuya_health.c:75] feed watchdog`,
    monitorPoints: [
      'On Linux/Mac the smaller port number is usually the flash port, the larger one the log port. On Windows check Device Manager.',
      'You can also write the authorization code through `monitor` — see Equipment Authorization in the docs.',
      'To exit: press Ctrl+C, then press Enter.',
    ],
    portsTitle: 'Two serial ports on T5 series boards',
    portsLead:
      'T5 series dev boards expose two serial ports — one for flashing, one for logging. If you cannot tell which is which, just try both when flashing.',
    portsPoints: [
      'Windows: in Device Manager, the port with the A-number is the download port, the B-number is the log port.',
      'Linux/Mac: generally the smaller number flashes, the larger logs.',
      'VM mapping of T5 serial ports can take about a minute to settle — a `device busy` notice right after mapping is normal.',
    ],
    troubleTitle: 'Troubleshooting',
    trouble: [
      {
        q: 'Flashing gets stuck or repeatedly fails at the write stage',
        a: 'Usually a missing serial-port driver. See Install drivers in the tyutool docs. On Mac, the same cause explains an undetected port.',
      },
      {
        q: 'Port [xxx] may be busy',
        a: 'Wait about a minute and retry. VM mapping duration varies by VM and serial chip. Make sure no other monitor is holding the port.',
      },
      {
        q: 'T5 board shows a port but flashes fail with device busy',
        a: 'VM mapping has a settling delay — about a minute after mapping. Wait, then retry without re-mapping.',
      },
      {
        q: 'Windows Defender flags the GUI flashing tool',
        a: 'Place `tyutool_gui` on a non-system drive (e.g. D:) and add the directory to Windows Security → Virus & threat protection exclusions. The CLI used by `tos.py flash` is not affected.',
      },
    ],
    nextLabel: 'Next: pair the device →',
  },
  zh: {
    badge: 'TuyaOpen SDK',
    title: '烧录固件并监听设备',
    subtitle:
      '用 tos.py flash 把刚编译好的 bin 写入开发板，再用 tos.py monitor 观察启动与运行 —— 都在项目目录中完成。',
    meta: ['入门', '8 分钟', '烧录'],
    nav: [
      { id: 'what', label: '完成后的状态' },
      { id: 'before', label: '烧录前' },
      { id: 'flash', label: '烧录' },
      { id: 'monitor', label: '监听' },
      { id: 'ports', label: 'T5 双串口' },
      { id: 'trouble', label: '故障排查' },
    ],
    whatTitle: '完成后的状态',
    whatLead:
      '你的开发板已运行刚编译的固件，并能在终端实时看到串口日志 —— 这是启动成功的证明，也是下一步配网的基础。',
    whatPoints: [
      '`tos.py flash` 将 `.build/bin/` 中的 bin 通过你选择的串口写入设备。',
      '`tos.py monitor` 实时输出设备日志；启动后手动复位开发板可捕获完整启动日志。',
      '两者底层都调用 `tyutool_cli`，首次使用时 `tos.py` 会自动下载。',
    ],
    beforeTitle: '烧录前',
    beforeLead: '用 USB 将开发板连接到电脑，然后处理一个系统相关的前置条件：',
    beforePoints: [
      'Linux 下需先授予串口访问权限并重启：`sudo usermod -aG dialout $USER`。',
      '若使用虚拟机，烧录前需将串口映射进虚拟机。',
    ],
    flashTitle: '烧录固件',
    flashLead:
      '在项目目录（即运行 `tos.py build` 的位置）运行 `tos.py flash`。它会列出可见的串口，按编号选择即可。',
    flashFlagsTitle: '常用参数',
    flashFlags: [
      ['`-p`, `--port`', '目标串口（如 `/dev/ttyACM0`、`COM3`）。省略则从列表选择。'],
      ['`-b`, `--baud`', '串口波特率（默认 921600）。'],
      ['`-d`, `--debug`', '显示烧录调试信息。'],
    ],
    flashCode: `❯ tos.py flash
[INFO]: Run Tuya Uart Tool.
[INFO]: Use default baudrate: [921600]
[INFO]: Use default start address: [0x00]
--------------------
1. /dev/ttyACM1
2. /dev/ttyACM0
--------------------
Select serial port: 2
...
[INFO]: Write flash success
[INFO]: CRC check success
[INFO]: Reboot done
[INFO]: Flash write success.`,
    flashTip: '必须在应用项目目录中执行，且项目已成功编译。',
    monitorTitle: '监听日志',
    monitorLead:
      '运行 `tos.py monitor` 并选择日志串口。启动后手动复位开发板以捕获完整启动日志。按 Ctrl+C 退出，再按回车。',
    monitorCode: `❯ tos.py monitor
[INFO]: Run Tuya Uart Tool.
--------------------
1. /dev/ttyACM1
2. /dev/ttyACM0
--------------------
Select serial port: 1
[INFO]: Open Monitor. (Quit: Ctrl+c)
[01-01 00:03:25 ty D][tuya_health.c:75] feed watchdog
[01-01 00:03:35 ty D][tuya_health.c:75] feed watchdog`,
    monitorPoints: [
      'Linux/Mac 下编号较小的通常是烧录口，较大的为日志口；Windows 下请查看设备管理器。',
      '也可通过 `monitor` 写入授权码，详见文档中的设备授权。',
      '退出方式：按 Ctrl+C，再按回车。',
    ],
    portsTitle: 'T5 系列开发板的双串口',
    portsLead:
      'T5 系列开发板提供两个串口 —— 一个用于烧录，一个用于日志。若无法区分，烧录时逐一尝试即可。',
    portsPoints: [
      'Windows：在设备管理器中，带 A 编号的为下载口，带 B 编号的为日志口。',
      'Linux/Mac：通常编号较小的用于烧录，较大的用于日志。',
      '虚拟机映射 T5 串口后约需一分钟稳定，刚映射时出现 `device busy` 属正常。',
    ],
    troubleTitle: '故障排查',
    trouble: [
      {
        q: '烧录在 write 阶段卡住或反复失败',
        a: '通常是缺少串口驱动，参见 tyutool 文档中的“安装驱动”。Mac 下无法识别串口也是同一原因。',
      },
      {
        q: '提示 Port [xxx] may be busy',
        a: '等待约一分钟后重试。虚拟机映射耗时因虚拟机与串口芯片而异，并确认没有其他监视器占用该串口。',
      },
      {
        q: 'T5 板能看到串口但烧录报 device busy',
        a: '虚拟机映射有约一分钟的稳定延迟，映射后等待片刻再重试，无需重新映射。',
      },
      {
        q: 'Windows Defender 误报 GUI 烧录工具',
        a: '将 `tyutool_gui` 放到非系统盘（如 D 盘），并在 Windows 安全中心 → 病毒和威胁防护中添加排除。`tos.py flash` 使用的 CLI 不受影响。',
      },
    ],
    nextLabel: '下一步：配网 →',
  },
};

function FlagTable({ rows }) {
  return (
    <div
      style={{
        margin: '1.25rem 0',
        border: '1px solid var(--neutral-200, #e2e8f0)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {rows.map(([flag, desc], i) => (
        <div
          key={flag}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(140px, auto) 1fr',
            gap: '1rem',
            padding: '0.7rem 1rem',
            background: i % 2 ? 'var(--neutral-50, #f8fafc)' : 'transparent',
            borderBottom:
              i < rows.length - 1 ? '1px solid var(--neutral-200, #e2e8f0)' : 'none',
          }}
        >
          <code
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '0.82rem',
              background: 'rgba(124, 92, 255, 0.08)',
              color: 'var(--brand-primary-dark, #5b3fd6)',
              padding: '0.15rem 0.5rem',
              borderRadius: '6px',
              alignSelf: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {flag}
          </code>
          <span style={{ color: 'var(--neutral-700, #334155)', lineHeight: 1.5 }}>{desc}</span>
        </div>
      ))}
    </div>
  );
}

export default function FlashAndMonitor() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];
  const nextHref = locale === 'zh' ? '/zh/learn/pair-device' : '/learn/pair-device';
  const docsHref = locale === 'zh' ? '/zh/docs/quick-start/firmware-burning' : '/docs/quick-start/firmware-burning';

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

      {/* Before */}
      <section id="before" className={shell.block}>
        <h2 className={shell.h2}>{c.beforeTitle}</h2>
        <p className={shell.lead}><RichText text={c.beforeLead} /></p>
        <ul className={shell.checkList}>
          {c.beforePoints.map((p, i) => (
            <li key={i}><RichText text={p} /></li>
          ))}
        </ul>
      </section>

      {/* Flash */}
      <section id="flash" className={shell.block}>
        <h2 className={shell.h2}>{c.flashTitle}</h2>
        <p className={shell.lead}><RichText text={c.flashLead} /></p>
        <pre className={shell.codeBlock}>
          <code>{c.flashCode}</code>
        </pre>
        <h3 className={shell.h3}>{c.flashFlagsTitle}</h3>
        <FlagTable rows={c.flashFlags} />
        <div className={clsx(shell.callout, shell.calloutTip)}>
          <p><RichText text={c.flashTip} /></p>
        </div>
      </section>

      {/* Monitor */}
      <section id="monitor" className={shell.block}>
        <h2 className={shell.h2}>{c.monitorTitle}</h2>
        <p className={shell.lead}><RichText text={c.monitorLead} /></p>
        <pre className={shell.codeBlock}>
          <code>{c.monitorCode}</code>
        </pre>
        <ul className={shell.checkList}>
          {c.monitorPoints.map((p, i) => (
            <li key={i}><RichText text={p} /></li>
          ))}
        </ul>
      </section>

      {/* Two ports */}
      <section id="ports" className={shell.block}>
        <h2 className={shell.h2}>{c.portsTitle}</h2>
        <p className={shell.lead}><RichText text={c.portsLead} /></p>
        <ul className={shell.checkList}>
          {c.portsPoints.map((p, i) => (
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
            {locale === 'zh' ? '完整烧录文档 →' : 'Full flashing docs →'}
          </a>
        </p>
      </section>
    </TutorialShell>
  );
}
