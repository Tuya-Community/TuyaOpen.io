/* =========================================================================
 * Tutorials manifest
 * -------------------------------------------------------------------------
 * Single source of truth for the /tutorials hub. Add a card by appending an
 * entry to `tutorials.en` and `tutorials.zh` (keep the two in sync by `id`).
 *
 * Each entry:
 *   id          unique, kebab-case
 *   category    one of the keys in `categories` (drives the filter)
 *   kind        'markdown' | 'interactive' | 'external'
 *                 markdown    → prose/doc content rendered with shared style
 *                               (a /docs page, or a page wrapping <MarkdownSection>)
 *                 interactive → a hand-built HTML/React page (uses <TutorialShell>)
 *                 external    → opens in a new tab (GitHub, YouTube, …)
 *   href        destination. Internal routes start with '/'. Locale prefixing
 *               for zh is handled by the page — author the plain (en) path here.
 *   title       card title
 *   description one/two sentence summary
 *   tags        optional array of tag keys (see `tags` below)
 *   level       optional 'beginner' | 'intermediate' | 'advanced'
 *   duration    optional human string, e.g. '10 min'
 *
 * The `kind` badge and external-link behaviour are derived automatically on the
 * page — you never style a card by hand, which is what keeps markdown and HTML
 * entries visually consistent.
 * ========================================================================= */

/* ------------------------------------------------------------- Categories */
/* Order here is the order of the filter chips. Sections may be empty for now. */
export const categories = {
  en: [
    { id: 'basics', label: 'Basics' },
    { id: 'ide', label: 'TuyaOpen IDE' },
    { id: 'sdk', label: 'TuyaOpen SDK' },
    { id: 'projects', label: 'Projects' },
    { id: 'tutorials', label: 'Tutorials' },
    { id: 'community', label: 'Community' },
  ],
  zh: [
    { id: 'basics', label: '基础' },
    { id: 'ide', label: 'TuyaOpen IDE' },
    { id: 'sdk', label: 'TuyaOpen SDK' },
    { id: 'projects', label: '项目' },
    { id: 'tutorials', label: '教程' },
    { id: 'community', label: '社区' },
  ],
}

/* -------------------------------------------------------------- Kind meta */
/* Small badge shown on every card so md / html / external read consistently. */
export const kinds = {
  en: {
    markdown: { label: 'Guide' },
    interactive: { label: 'Interactive' },
    external: { label: 'External' },
  },
  zh: {
    markdown: { label: '图文' },
    interactive: { label: '交互' },
    external: { label: '站外' },
  },
}

/* -------------------------------------------------------------- Level meta */
export const levels = {
  en: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  },
  zh: {
    beginner: '入门',
    intermediate: '进阶',
    advanced: '高级',
  },
}

/* --------------------------------------------------------------- Tag meta */
/* Reuse a small palette; label per-locale, colours shared. */
export const tags = {
  en: {
    flashing: { label: 'Flashing', color: '#f97316' },
    setup: { label: 'Setup', color: '#3b82f6' },
    cli: { label: 'CLI', color: '#64748b' },
  },
  zh: {
    flashing: { label: '烧录', color: '#f97316' },
    setup: { label: '配置', color: '#3b82f6' },
    cli: { label: 'CLI', color: '#64748b' },
  },
}

/* ------------------------------------------------------------- Tutorials */
export const tutorials = {
  en: [
    {
      id: 'tyutool-guide',
      category: 'basics',
      kind: 'interactive',
      href: '/tools/tyutool-guide',
      title: 'tyutool — flashing & authorization guide',
      description:
        'Install tyutool, flash your first board, authorize it for Tuya IoT, and fix common hiccups (GUI + CLI).',
      tags: ['flashing', 'cli'],
      level: 'beginner',
    },
    {
      id: 'license-key',
      category: 'basics',
      kind: 'interactive',
      href: '/pricing',
      title: 'Get a license key',
      description: 'Understand TuyaOpen authorization and how to obtain UUID / AuthKey credentials for your devices.',
      tags: ['setup'],
      level: 'beginner',
    },
    {
      id: 'using-license-key',
      category: 'basics',
      kind: 'interactive',
      href: '/tutorials/using-license-key',
      title: 'Use your license key',
      description:
        'Write the UUID + AuthKey to a device with tyutool (GUI + CLI), then verify it activates against the Tuya Cloud.',
      tags: ['setup', 'flashing'],
      level: 'beginner',
    },
  ],

  zh: [
    {
      id: 'tyutool-guide',
      category: 'basics',
      kind: 'interactive',
      href: '/tools/tyutool-guide',
      title: 'tyutool —— 烧录与授权指南',
      description: '安装 tyutool、烧录第一块板子、为涂鸦 IoT 授权，并解决常见问题（GUI + CLI）。',
      tags: ['flashing', 'cli'],
      level: 'beginner',
    },
    {
      id: 'license-key',
      category: 'basics',
      kind: 'interactive',
      href: '/pricing',
      title: '获取授权码',
      description: '了解 TuyaOpen 授权机制，以及如何为你的设备获取 UUID / AuthKey 凭据。',
      tags: ['setup'],
      level: 'beginner',
    },
    {
      id: 'using-license-key',
      category: 'basics',
      kind: 'interactive',
      href: '/tutorials/using-license-key',
      title: '使用授权码',
      description: '用 tyutool（GUI + CLI）将 UUID + AuthKey 写入设备，并验证其在涂鸦云上成功激活。',
      tags: ['setup', 'flashing'],
      level: 'beginner',
    },
  ],
}

export default { categories, kinds, levels, tags, tutorials }
