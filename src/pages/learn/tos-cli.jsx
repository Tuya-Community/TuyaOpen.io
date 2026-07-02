import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { clsx } from 'clsx';
import TutorialShell from '@site/src/components/TutorialShell';
import shell from '@site/src/components/TutorialShell/styles.module.css';
import RichText from './RichText';

/* =========================================================================
 * LEARN: tos.py command reference   kind: 'interactive'
 * A hands-on, scannable reference for every tos.py subcommand, grouped by
 * job. Each entry: signature, a real example, and when to reach for it.
 * Grounded in docs/tos-tools/tos-guide.md (the tos.py --help listing + each
 * subcommand's documented behaviour).
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen SDK',
    title: 'tos.py command reference',
    subtitle:
      'tos.py is the one CLI for configuring, building, flashing, and monitoring TuyaOpen projects. Each subcommand below shows its signature, a real example, and when to use it.',
    meta: ['Intermediate', 'Reference', 'CLI'],
    nav: [
      { id: 'overview', label: 'Overview' },
      { id: 'setup', label: 'Setup' },
      { id: 'config', label: 'Configure' },
      { id: 'build', label: 'Build' },
      { id: 'device', label: 'Flash & monitor' },
      { id: 'workflow', label: 'Workflow' },
      { id: 'global', label: 'Global flags' },
    ],
    overviewTitle: 'What tos.py is',
    overviewLead:
      'After activating TuyaOpen, `tos.py` is on your PATH. It wraps project configuration, the build system, flashing, and log monitoring behind a small set of subcommands. Run `tos.py --help` any time to see the list.',
    overviewPoints: [
      'Run every command from inside an application project directory — `config`, `build`, `clean`, `flash`, and `monitor` all require it.',
      'The first `build` downloads the toolchain into `platform/` — expect it to be slower than subsequent builds.',
      'Re-activate `tos.py` each time you open a new terminal (`. ./export.sh` on Linux/Mac, `.\\export.ps1` on Windows).',
    ],
    setupTitle: 'Setup & environment',
    setup: [
      {
        sig: 'tos.py version',
        ex: '❯ tos.py version\n[INFO]: v1.3.0-23-g6bcb5aa',
        when: 'See the current tag-commit. `[Unknown version]` means the repo has no tags (common in forks).',
      },
      {
        sig: 'tos.py check',
        ex: '❯ tos.py check\n[INFO]: [git] (2.43.0 >= 2.0.0) is ok.\n...',
        when: 'After install or pull — validates git/cmake/make/ninja versions and runs `git submodule update --init`.',
      },
    ],
    configTitle: 'Configure the project',
    configIntro:
      'These pick or tune the board configuration. The choice is written to `app_default.config`; both `choice` and `menu` deep-clean first because they may switch toolchain.',
    config: [
      {
        sig: 'tos.py config choice',
        ex: '❯ tos.py config choice\n1. T5AI.config\n2. ESP32.config\n...\nChoice config file:',
        when: 'Pick a verified board config for the current project.',
      },
      {
        sig: 'tos.py config menu',
        ex: 'tos.py config menu   # opens the visual Kconfig menu',
        when: 'Tune Kconfig options interactively; save from inside the menu.',
      },
      {
        sig: 'tos.py config save',
        ex: '❯ tos.py config save\nInput save config name:',
        when: 'Save your current `menu`-tuned config as a named solidified config in the project `config/` directory.',
      },
    ],
    buildTitle: 'Build & clean',
    build: [
      {
        sig: 'tos.py build [-v]',
        ex: '❯ tos.py build\n...\n[INFO]: ******* Build Success ********',
        when: 'Compile the project into a flashable bin in `.build/bin`. `-v` for verbose output.',
      },
      {
        sig: 'tos.py clean [-f]',
        ex: '❯ tos.py clean -f\n[INFO]: Fullclean success.',
        when: 'Clear the build cache. `-f` deep-cleans by deleting `.build` after `ninja clean`.',
      },
    ],
    deviceTitle: 'Flash & monitor',
    device: [
      {
        sig: 'tos.py flash [-p PORT] [-b BAUD]',
        ex: '❯ tos.py flash\n...\n[INFO]: Flash write success.',
        when: 'Write the built bin to the device. Omit `-p` to pick the port from a list.',
      },
      {
        sig: 'tos.py monitor [-p PORT] [-b BAUD]',
        ex: '❯ tos.py monitor\n[INFO]: Open Monitor. (Quit: Ctrl+c)',
        when: 'Stream the device serial log. Quit with Ctrl+C then Enter. Also used to write the auth code.',
      },
    ],
    workflowTitle: 'Workflow & scaffolding',
    workflow: [
      {
        sig: 'tos.py update',
        ex: 'tos.py update',
        when: 'After `git pull`/`git checkout` on the main repo — switches dependencies to the commits in `platform/platform_config.yaml`.',
      },
      {
        sig: 'tos.py new [--framework base|arduino]',
        ex: 'tos.py new  # prompts for project name, copies a template',
        when: 'Scaffold a new user application from `tools/app_template/` (`base` or `arduino` framework).',
      },
      {
        sig: 'tos.py dev bac [-d DIST] [-o LOGDIR]',
        ex: 'tos.py dev bac  # build every config in config/ (or boards/)',
        when: 'Build-all-config: iterate every `.config`, full-clean between builds, optionally copy bins to a dist folder.',
      },
      {
        sig: 'tos.py idf <idf.py subcommand> [--idf-flags=...]',
        ex: 'tos.py idf menuconfig\ntos.py idf fullclean',
        when: 'ESP32 only. Run `idf.py` commands against the ESP32 platform checkout. Requires an ESP32 config.',
      },
    ],
    globalTitle: 'Global flags',
    globalLead: 'These work on any subcommand:',
    globalPoints: [
      '`-d` / `--debug` — show debug-level execution logs (e.g. `tos.py -d version`).',
      '`-h` / `--help` — show help for the command (e.g. `tos.py flash -h`).',
    ],
    docsBtn: 'Full tos.py docs →',
  },
  zh: {
    badge: 'TuyaOpen SDK',
    title: 'tos.py 命令参考',
    subtitle:
      'tos.py 是配置、编译、烧录、监听 TuyaOpen 项目的唯一 CLI。下方按职责分组，每条命令给出签名、真实示例与使用时机。',
    meta: ['进阶', '参考', 'CLI'],
    nav: [
      { id: 'overview', label: '概览' },
      { id: 'setup', label: '环境' },
      { id: 'config', label: '配置' },
      { id: 'build', label: '编译' },
      { id: 'device', label: '烧录与监听' },
      { id: 'workflow', label: '工作流' },
      { id: 'global', label: '全局参数' },
    ],
    overviewTitle: 'tos.py 是什么',
    overviewLead:
      '激活 TuyaOpen 后，`tos.py` 即在 PATH 中。它将项目配置、编译系统、烧录与日志监听封装为一组子命令。随时运行 `tos.py --help` 查看列表。',
    overviewPoints: [
      '所有命令都需在应用项目目录中执行 —— `config`、`build`、`clean`、`flash`、`monitor` 均如此。',
      '首次 `build` 会将工具链下载到 `platform/`，比后续编译慢。',
      '每次打开新终端都需重新激活 `tos.py`（Linux/Mac 用 `. ./export.sh`，Windows 用 `.\\export.ps1`）。',
    ],
    setupTitle: '环境与校验',
    setup: [
      {
        sig: 'tos.py version',
        ex: '❯ tos.py version\n[INFO]: v1.3.0-23-g6bcb5aa',
        when: '查看当前 tag-commit。`[Unknown version]` 表示仓库无 tag（常见于 fork）。',
      },
      {
        sig: 'tos.py check',
        ex: '❯ tos.py check\n[INFO]: [git] (2.43.0 >= 2.0.0) is ok.\n...',
        when: '安装或拉取后使用 —— 校验 git/cmake/make/ninja 版本并执行 `git submodule update --init`。',
      },
    ],
    configTitle: '配置项目',
    configIntro:
      '以下命令用于选择或调整开发板配置。所选配置写入 `app_default.config`；`choice` 与 `menu` 均会先深度清理，因为可能切换工具链。',
    config: [
      {
        sig: 'tos.py config choice',
        ex: '❯ tos.py config choice\n1. T5AI.config\n2. ESP32.config\n...\nChoice config file:',
        when: '为当前项目选择已验证的开发板配置。',
      },
      {
        sig: 'tos.py config menu',
        ex: 'tos.py config menu   # 打开可视化 Kconfig 菜单',
        when: '交互调整 Kconfig 选项，在菜单内保存。',
      },
      {
        sig: 'tos.py config save',
        ex: '❯ tos.py config save\nInput save config name:',
        when: '将当前经 `menu` 调整的配置保存为项目 `config/` 目录下的具名配置。',
      },
    ],
    buildTitle: '编译与清理',
    build: [
      {
        sig: 'tos.py build [-v]',
        ex: '❯ tos.py build\n...\n[INFO]: ******* Build Success ********',
        when: '将项目编译为 `.build/bin` 中可烧录的 bin。`-v` 输出详细日志。',
      },
      {
        sig: 'tos.py clean [-f]',
        ex: '❯ tos.py clean -f\n[INFO]: Fullclean success.',
        when: '清理编译缓存。`-f` 在 `ninja clean` 后删除 `.build` 进行深度清理。',
      },
    ],
    deviceTitle: '烧录与监听',
    device: [
      {
        sig: 'tos.py flash [-p PORT] [-b BAUD]',
        ex: '❯ tos.py flash\n...\n[INFO]: Flash write success.',
        when: '将编译好的 bin 写入设备。省略 `-p` 可从列表选择串口。',
      },
      {
        sig: 'tos.py monitor [-p PORT] [-b BAUD]',
        ex: '❯ tos.py monitor\n[INFO]: Open Monitor. (Quit: Ctrl+c)',
        when: '实时输出设备串口日志。按 Ctrl+C 再按回车退出；也可用于写入授权码。',
      },
    ],
    workflowTitle: '工作流与脚手架',
    workflow: [
      {
        sig: 'tos.py update',
        ex: 'tos.py update',
        when: '在主仓库 `git pull`/`git checkout` 后使用 —— 按 `platform/platform_config.yaml` 切换依赖到指定 commit。',
      },
      {
        sig: 'tos.py new [--framework base|arduino]',
        ex: 'tos.py new  # 提示输入项目名，复制模板',
        when: '从 `tools/app_template/` 脚手架新建用户应用（`base` 或 `arduino` 框架）。',
      },
      {
        sig: 'tos.py dev bac [-d DIST] [-o LOGDIR]',
        ex: 'tos.py dev bac  # 编译 config/（或 boards/）中的每个配置',
        when: '批量编译：遍历每个 `.config`，每次构建间深度清理，可选将 bin 拷贝到分发目录。',
      },
      {
        sig: 'tos.py idf <idf.py 子命令> [--idf-flags=...]',
        ex: 'tos.py idf menuconfig\ntos.py idf fullclean',
        when: '仅 ESP32。对 ESP32 平台执行 `idf.py` 命令，需选用 ESP32 配置。',
      },
    ],
    globalTitle: '全局参数',
    globalLead: '以下参数对所有子命令生效：',
    globalPoints: [
      '`-d` / `--debug` —— 显示调试级执行日志（如 `tos.py -d version`）。',
      '`-h` / `--help` —— 显示命令帮助（如 `tos.py flash -h`）。',
    ],
    docsBtn: '完整 tos.py 文档 →',
  },
};

function CmdEntry({ entry }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <code
        style={{
          display: 'inline-block',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: '0.9rem',
          background: 'rgba(124, 92, 255, 0.08)',
          color: 'var(--brand-primary-dark, #5b3fd6)',
          padding: '0.25rem 0.6rem',
          borderRadius: '6px',
          marginBottom: '0.6rem',
        }}
      >
        {entry.sig}
      </code>
      <pre className={shell.codeBlock} style={{ margin: '0.5rem 0' }}>
        <code>{entry.ex}</code>
      </pre>
      <p style={{ margin: '0.5rem 0 0', color: 'var(--neutral-600, #475569)', lineHeight: 1.6 }}>
        <RichText text={entry.when} />
      </p>
    </div>
  );
}

function CmdGroup({ title, intro, cmds, id }) {
  return (
    <section id={id} className={shell.block}>
      <h2 className={shell.h2}>{title}</h2>
      {intro && <p className={shell.lead}><RichText text={intro} /></p>}
      {cmds.map((entry, i) => (
        <CmdEntry key={i} entry={entry} />
      ))}
    </section>
  );
}

export default function TosCli() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];
  const docsHref = locale === 'zh' ? '/zh/docs/tos-tools/tos-guide' : '/docs/tos-tools/tos-guide';

  return (
    <TutorialShell badge={c.badge} title={c.title} subtitle={c.subtitle} meta={c.meta} nav={c.nav}>
      {/* Overview */}
      <section id="overview" className={shell.block}>
        <h2 className={shell.h2}>{c.overviewTitle}</h2>
        <p className={shell.lead}><RichText text={c.overviewLead} /></p>
        <ul className={shell.checkList}>
          {c.overviewPoints.map((p, i) => (
            <li key={i}><RichText text={p} /></li>
          ))}
        </ul>
      </section>

      <CmdGroup id="setup" title={c.setupTitle} cmds={c.setup} />
      <CmdGroup id="config" title={c.configTitle} intro={c.configIntro} cmds={c.config} />
      <CmdGroup id="build" title={c.buildTitle} cmds={c.build} />
      <CmdGroup id="device" title={c.deviceTitle} cmds={c.device} />
      <CmdGroup id="workflow" title={c.workflowTitle} cmds={c.workflow} />

      {/* Global flags */}
      <section id="global" className={shell.block}>
        <h2 className={shell.h2}>{c.globalTitle}</h2>
        <p className={shell.lead}><RichText text={c.globalLead} /></p>
        <ul className={shell.checkList}>
          {c.globalPoints.map((p, i) => (
            <li key={i}><RichText text={p} /></li>
          ))}
        </ul>
        <p style={{ marginTop: '1.5rem' }}>
          <a className={shell.btnGhost} href={docsHref}>
            {c.docsBtn}
          </a>
        </p>
      </section>
    </TutorialShell>
  );
}
