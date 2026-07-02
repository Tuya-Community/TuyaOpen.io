import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { clsx } from 'clsx';
import TutorialShell from '@site/src/components/TutorialShell';
import shell from '@site/src/components/TutorialShell/styles.module.css';
import RichText from './RichText';

/* =========================================================================
 * LEARN: Build your first firmware   kind: 'interactive'
 * Segment 2 of the "first device" path. Configure switch_demo for your board
 * and compile it into a flashable bin with tos.py.
 * Grounded in docs/quick-start/project-compilation.md + docs/tos-tools/tos-guide.md.
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen SDK',
    title: 'Build your first firmware',
    subtitle:
      'Configure the switch_demo project for your board and compile it into a flashable bin with tos.py — the binary the next page flashes onto the device.',
    meta: ['Beginner', '8 min', 'Build'],
    nav: [
      { id: 'what', label: 'What you get' },
      { id: 'project', label: 'Pick a project' },
      { id: 'config', label: 'Configure' },
      { id: 'build', label: 'Build' },
      { id: 'clean', label: 'Clean' },
      { id: 'trouble', label: 'Troubleshooting' },
    ],
    whatTitle: 'What you get at the end',
    whatLead:
      'A firmware binary — `switch_demo_QIO_1.0.0.bin` — sitting in your project’s `.build/bin/` directory, ready to flash. The build prints the full path when it finishes.',
    whatPoints: [
      '`tos.py build` downloads the right toolchain into `platform/` on first run, so the first build is slower than later ones.',
      'The output bin name follows the pattern `<app>_<QIO>_<version>.bin` — `QIO` is the flash read mode.',
      'You must build from inside the application project directory (where `tos.py build` is run).',
    ],
    projectTitle: 'Pick a project',
    projectLead:
      'TuyaOpen builds applications from the `apps/` and `examples/` directories. This page uses `switch_demo` — a small cloud-connected switch — as the worked example.',
    projectCode: `cd apps/tuya_cloud/switch_demo`,
    configTitle: 'Configure the project',
    configLead:
      'Run `tos.py config choice` to list the verified board configurations for this project, then pick the one that matches your hardware. The choice is written to `app_default.config` in the project path.',
    configCode: `❯ tos.py config choice
[INFO]: Fullclean success.
--------------------
1. LN882H.config
2. EWT103-W15.config
3. Ubuntu.config
4. ESP32-C3.config
5. ESP32-S3.config
6. ESP32.config
7. T3.config
8. T5AI.config
9. T2.config
10. BK7231X.config
--------------------
Input "q" to exit.
Choice config file:`,
    configMapTitle: 'Common board → config',
    configMapLead: 'Pick the config that matches your board:',
    configMap: [
      ['Tuya T5AI', 'T5AI.config'],
      ['Tuya T3', 'T3.config'],
      ['Tuya T2', 'T2.config'],
      ['Beken BK7231X', 'BK7231X.config'],
      ['ESP32', 'ESP32.config'],
      ['ESP32-C3', 'ESP32-C3.config'],
      ['ESP32-S3', 'ESP32-S3.config'],
      ['LN882H', 'LN882H.config'],
      ['Ubuntu (Linux host)', 'Ubuntu.config'],
    ],
    configNote:
      'The `config` operation may switch toolchain, so it runs a deep clean first. If your project has its own `config/` directory, those configs take priority over the ones in `boards/` — run `tos.py config -d choice` to force configs from `boards/` only.',
    buildTitle: 'Build',
    buildLead: 'From the project directory, run `tos.py build`. Add `-v` for verbose output if you need to diagnose a failure.',
    buildCode: `❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************`,
    buildPoints: [
      'The build downloads the toolchain, runs its `prepare`, creates `.build/`, runs `ninja`, and places artifacts in `.build/bin`.',
      'The build ends with `Build Success` and prints the bin path — that path is what you flash next.',
      'On Windows, if each file takes ~3 s to compile, see Troubleshooting below.',
    ],
    cleanTitle: 'Clean the build',
    cleanLead:
      'To clear the build cache, run `tos.py clean`. Add `-f` for a deep clean that also deletes the `.build` directory after `ninja clean`.',
    cleanCode: `❯ tos.py clean -f
[INFO]: Running tos.py ...
[INFO]: Fullclean success.`,
    troubleTitle: 'Troubleshooting',
    trouble: [
      {
        q: 'Compilation is very slow on Windows',
        a: 'Open Task Manager (Ctrl+Shift+Esc), find and close the `MSPCManagerService` process. If that does not help, move the whole `TuyaOpen` directory to a non-system drive (e.g. D:) and add it to the exclusion list under Windows Security → Virus & threat protection.',
      },
      {
        q: 'config choice does not list my board',
        a: 'The list comes from the project’s `config/` directory first, then `TuyaOpen/boards/`. Run `tos.py config -d choice` to force configs from `boards/` only. If your board still is not listed, it may not have a verified config for this app yet.',
      },
      {
        q: 'Build fails after I changed config with tos.py config menu',
        a: 'Changing config can break a build. Re-run `tos.py config choice` to pick a verified config, or `tos.py clean -f` and rebuild. You can also ask technical support.',
      },
      {
        q: 'could not lock config file warning',
        a: 'A stale `~/.gitconfig.lock` is left behind. Delete it manually: `rm ~/.gitconfig.lock`, then retry.',
      },
    ],
    nextLabel: 'Next: flash and monitor →',
  },
  zh: {
    badge: 'TuyaOpen SDK',
    title: '编译第一个固件',
    subtitle:
      '为你的开发板配置 switch_demo 项目，并用 tos.py 编译出可烧录的 bin —— 这正是下一页要烧进设备的固件。',
    meta: ['入门', '8 分钟', '编译'],
    nav: [
      { id: 'what', label: '完成后的状态' },
      { id: 'project', label: '选择项目' },
      { id: 'config', label: '配置' },
      { id: 'build', label: '编译' },
      { id: 'clean', label: '清理' },
      { id: 'trouble', label: '故障排查' },
    ],
    whatTitle: '完成后的状态',
    whatLead:
      '你的项目 `.build/bin/` 目录下生成了固件 `switch_demo_QIO_1.0.0.bin`，可直接烧录。编译结束时会在终端打印完整路径。',
    whatPoints: [
      '`tos.py build` 首次运行时会把对应工具链下载到 `platform/`，因此首次编译较慢。',
      '输出 bin 命名规则为 `<app>_<QIO>_<version>.bin`，其中 `QIO` 是 flash 读取模式。',
      '必须在应用项目目录中执行 `tos.py build`。',
    ],
    projectTitle: '选择项目',
    projectLead:
      'TuyaOpen 从 `apps/` 与 `examples/` 目录编译应用。本页以 `switch_demo`（一个云连接的小开关）作为示例。',
    projectCode: `cd apps/tuya_cloud/switch_demo`,
    configTitle: '配置项目',
    configLead:
      '运行 `tos.py config choice` 列出本项目已验证的开发板配置，选择与你的硬件匹配的一项。所选配置会写入项目路径下的 `app_default.config`。',
    configCode: `❯ tos.py config choice
[INFO]: Fullclean success.
--------------------
1. LN882H.config
2. EWT103-W15.config
3. Ubuntu.config
4. ESP32-C3.config
5. ESP32-S3.config
6. ESP32.config
7. T3.config
8. T5AI.config
9. T2.config
10. BK7231X.config
--------------------
Input "q" to exit.
Choice config file:`,
    configMapTitle: '常见开发板 → 配置',
    configMapLead: '选择与你的开发板匹配的配置：',
    configMap: [
      ['Tuya T5AI', 'T5AI.config'],
      ['Tuya T3', 'T3.config'],
      ['Tuya T2', 'T2.config'],
      ['Beken BK7231X', 'BK7231X.config'],
      ['ESP32', 'ESP32.config'],
      ['ESP32-C3', 'ESP32-C3.config'],
      ['ESP32-S3', 'ESP32-S3.config'],
      ['LN882H', 'LN882H.config'],
      ['Ubuntu（Linux 主机）', 'Ubuntu.config'],
    ],
    configNote:
      '`config` 操作可能切换工具链，因此会先执行一次深度清理。若项目自带 `config/` 目录，其中的配置优先于 `boards/` —— 运行 `tos.py config -d choice` 可强制只显示 `boards/` 中的配置。',
    buildTitle: '编译',
    buildLead: '在项目目录中运行 `tos.py build`。如需诊断失败，加 `-v` 查看详细输出。',
    buildCode: `❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************`,
    buildPoints: [
      '编译过程：下载工具链 → 执行其 `prepare` → 创建 `.build` → 运行 `ninja` → 产物放入 `.build/bin`。',
      '编译以 `Build Success` 结束并打印 bin 路径 —— 这就是要烧录的文件。',
      'Windows 下若每个文件编译耗时约 3 秒，参见下方故障排查。',
    ],
    cleanTitle: '清理编译',
    cleanLead:
      '运行 `tos.py clean` 清理编译缓存；加 `-f` 进行深度清理，会在 `ninja clean` 后删除 `.build` 目录。',
    cleanCode: `❯ tos.py clean -f
[INFO]: Running tos.py ...
[INFO]: Fullclean success.`,
    troubleTitle: '故障排查',
    trouble: [
      {
        q: 'Windows 下编译很慢',
        a: '用 Ctrl+Shift+Esc 打开任务管理器，找到并关闭 `MSPCManagerService` 进程。若无效，将整个 `TuyaOpen` 目录移到非系统盘（如 D 盘），并在 Windows 安全中心 → 病毒和威胁防护中将其加入排除列表。',
      },
      {
        q: 'config choice 没有列出我的开发板',
        a: '列表优先取自项目 `config/` 目录，再取 `TuyaOpen/boards/`。运行 `tos.py config -d choice` 可强制只显示 `boards/` 中的配置。若仍未列出，该板可能尚无此应用的已验证配置。',
      },
      {
        q: '用 tos.py config menu 改配置后编译失败',
        a: '改配置可能导致编译失败。重新运行 `tos.py config choice` 选择已验证配置，或 `tos.py clean -f` 后重新编译，也可联系技术支持。',
      },
      {
        q: '出现 could not lock config file 警告',
        a: '这是残留的 `~/.gitconfig.lock` 导致。手动删除：`rm ~/.gitconfig.lock`，然后重试。',
      },
    ],
    nextLabel: '下一步：烧录与监听 →',
  },
};

function ConfigTable({ rows }) {
  return (
    <div
      style={{
        margin: '1.25rem 0',
        border: '1px solid var(--neutral-200, #e2e8f0)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {rows.map(([board, cfg], i) => (
        <div
          key={cfg}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.7rem 1rem',
            background: i % 2 ? 'var(--neutral-50, #f8fafc)' : 'transparent',
            borderBottom:
              i < rows.length - 1 ? '1px solid var(--neutral-200, #e2e8f0)' : 'none',
          }}
        >
          <span style={{ fontWeight: 600, color: 'var(--neutral-800, #1e293b)' }}>{board}</span>
          <code
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '0.85rem',
              background: 'rgba(124, 92, 255, 0.08)',
              color: 'var(--brand-primary-dark, #5b3fd6)',
              padding: '0.2rem 0.55rem',
              borderRadius: '6px',
            }}
          >
            {cfg}
          </code>
        </div>
      ))}
    </div>
  );
}

export default function BuildFirstFirmware() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];
  const nextHref = locale === 'zh' ? '/zh/learn/flash-and-monitor' : '/learn/flash-and-monitor';
  const docsHref = locale === 'zh' ? '/zh/docs/quick-start/project-compilation' : '/docs/quick-start/project-compilation';

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

      {/* Project */}
      <section id="project" className={shell.block}>
        <h2 className={shell.h2}>{c.projectTitle}</h2>
        <p className={shell.lead}><RichText text={c.projectLead} /></p>
        <pre className={shell.codeBlock}>
          <code>{c.projectCode}</code>
        </pre>
      </section>

      {/* Configure */}
      <section id="config" className={shell.block}>
        <h2 className={shell.h2}>{c.configTitle}</h2>
        <p className={shell.lead}><RichText text={c.configLead} /></p>
        <pre className={shell.codeBlock}>
          <code>{c.configCode}</code>
        </pre>
        <h3 className={shell.h3}>{c.configMapTitle}</h3>
        <p className={shell.lead}><RichText text={c.configMapLead} /></p>
        <ConfigTable rows={c.configMap} />
        <div className={clsx(shell.callout, shell.calloutInfo)}>
          <p><RichText text={c.configNote} /></p>
        </div>
      </section>

      {/* Build */}
      <section id="build" className={shell.block}>
        <h2 className={shell.h2}>{c.buildTitle}</h2>
        <p className={shell.lead}><RichText text={c.buildLead} /></p>
        <pre className={shell.codeBlock}>
          <code>{c.buildCode}</code>
        </pre>
        <ul className={shell.checkList}>
          {c.buildPoints.map((p, i) => (
            <li key={i}><RichText text={p} /></li>
          ))}
        </ul>
      </section>

      {/* Clean */}
      <section id="clean" className={shell.block}>
        <h2 className={shell.h2}>{c.cleanTitle}</h2>
        <p className={shell.lead}><RichText text={c.cleanLead} /></p>
        <pre className={shell.codeBlock}>
          <code>{c.cleanCode}</code>
        </pre>
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
            {locale === 'zh' ? '完整编译文档 →' : 'Full build docs →'}
          </a>
        </p>
      </section>
    </TutorialShell>
  );
}
