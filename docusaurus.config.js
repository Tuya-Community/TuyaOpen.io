// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
import { themes as prismThemes } from 'prism-react-renderer'

/** @type {import('@docusaurus/types').Config} */
const config = {
  future: {
    faster: true,
    v4: true,
  },

  clientModules: ['./src/clientModules/gtag-shim.js', './src/clientModules/toc-reading-progress.js'],

  title: 'TuyaOpen',
  tagline: 'A Powerful Open Source OS and Platform for IoTs Development',
  favicon: '/img/favicon.ico',

  // Set the production url of your site here
  url: 'https://tuyaopen.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  staticDirectories: ['static'],
  // https://github.com/tuya/TuyaOpen

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tuya-open', // Usually your GitHub org/user name.
  projectName: 'TuyaOpen', // Usually your repo name.

  onBrokenLinks: 'warn',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      zh: {
        label: '简体中文',
      },
    },
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-3M0J54E8XF',
        },
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/Tuya-Community/TuyaOpen.io/edit/master/',
          editLocalizedFiles: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/Tuya-Community/TuyaOpen.io/edit/master/',
          editLocalizedFiles: true,
        },
        theme: {
          customCss: './src/styles/custom.css',
        },
      }),
    ],
  ],

  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    zoom: {
      // Markdown and HTML images: single-click to enlarge, click overlay to close (medium-zoom)
      selector: '.theme-doc-markdown img, .markdown img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
      // medium-zoom options: https://github.com/francoischalifour/medium-zoom#usage
      config: {},
    },
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
      options: {
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: 16,
        themeVariables: {
          primaryColor: '#2e7dff',
          primaryBorderColor: '#2e7dff',
          lineColor: '#2e7dff',
          fontFamily: 'Inter, Arial, sans-serif',
        },
      },
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    image: '/img/home/tuyaopen-logo-social-preview.png',
    algolia: {
      appId: 'NT1L7IWROF',
      apiKey: '2469e58a262dcca7c8c5c1d5c9f33a52',
      indexName: 'tuyaopen',
      contextualSearch: false,
      searchParameters: {
        facetFilters: [],
      },
      searchPagePath: 'search',
    },
    navbar: {
      hideOnScroll: true,
      title: 'TuyaOpen',
      logo: {
        alt: 'TuyaOpen',
        src: '/img/home/tuyaopen-logo-simple-dark.png',
        srcDark: '/img/home/tuyaopen-logo-simple-light.png',
      },
      items: [
        {
          type: 'custom-productsMenu',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Docs',
          position: 'left',
          items: [
            { type: 'docSidebar', sidebarId: 'sdkSidebar', label: 'TuyaOpen SDK' },
            { type: 'docSidebar', sidebarId: 'hardwareSidebar', label: 'Hardware' },
            { type: 'docSidebar', sidebarId: 'cloudSidebar', label: 'Cloud & AI' },
            { type: 'docSidebar', sidebarId: 'duckyclawSidebar', label: 'TuyaOpenClaw' },
          ],
        },
        {
          label: 'Get Yours',
          position: 'left',
          items: [
            {
              label: 'Get License Key',
              to: '/pricing',
            },
            {
              label: 'Get Hardware',
              to: '/get-hardware',
            },
            {
              label: 'Get Code',
              href: 'https://github.com/tuya/TuyaOpen',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          ],
        },
        {
          to: 'blog',
          label: 'Blog',
        },
        {
          to: '/projects',
          label: 'Projects',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/tuya/TuyaOpen',
          className: 'header-github-link',
          'aria-label': 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Products',
          items: [
            {
              label: 'TuyaOpen IDE',
              to: '/tuyaopen-ide',
            },
            {
              label: 'TuyaOpen SDK',
              href: 'https://github.com/tuya/TuyaOpen',
            },
            {
              label: 'TuyaOpen on Arduino',
              href: 'https://github.com/tuya/arduino-TuyaOpen',
            },
            {
              label: 'TuyaOpenClaw 🦞',
              to: '/duckyclaw',
            },
            {
              label: 'Get Hardware',
              to: '/get-hardware',
            },
          ],
        },
        {
          title: 'Documentation',
          items: [
            {
              label: 'Quick Start',
              to: '/docs/quick-start/unboxing',
            },
            {
              label: 'About TuyaOpen',
              to: '/docs/about-tuyaopen',
            },
            {
              label: 'Hardware List',
              to: '/docs/hardware',
            },
            {
              label: 'Tuya T5AI Dev Kit',
              to: '/docs/hardware/tuya-t5/t5-ai-board/overview-t5-ai-board',
            },
            {
              label: 'License Key',
              to: '/pricing',
            },
          ],
        },
        {
          title: 'Tools',
          items: [
            {
              label: 'TyuTools GUI/CLI',
              to: '/tools/tyutool',
            },
            {
              label: 'Web Serial Tool',
              href: 'https://tuyaopen.ai/tools',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Discord',
              href: 'https://discord.com/invite/yPPShSTttG',
            },
            {
              label: 'X',
              href: 'https://x.com/tuyasmart',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@tuya2023',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/tuya-smart',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/tuya/TuyaOpen',
            },
            {
              label: 'Gitee (Mirror)',
              href: 'https://gitee.com/tuya-open/TuyaOpen',
            },
            {
              label: 'Projects',
              to: '/projects',
            },
          ],
        },
      ],
      copyright: `
        <p style="font-weight: 500;">Copyright © TuyaOpen Authors ${new Date().getFullYear()} | Documentation Distributed under Apache License Version 2.0</p>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: {
        plain: prismThemes.vsDark.plain,
        styles: [
          ...prismThemes.vsDark.styles,
          {
            types: ['function', 'keyword'],
            style: {
              color: '#f25c7c',
            },
          },
        ],
      },
      additionalLanguages: ['bash'],
    },
  },

  plugins: [
    './docusaurus-tailwind-v3',
    'docusaurus-plugin-image-zoom',
    './plugins/mermaid-panzoom',
    ['@gracefullight/docusaurus-plugin-microsoft-clarity', { projectId: 'lggqck9srz' }],
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Legacy aliases that predate the per-product docs split.
        redirects: [
          {
            from: '/docs/hardware-specific/t5ai-peripheral-mapping',
            to: '/docs/hardware/tuya-t5/t5ai-peripheral-mapping',
          },
          {
            from: '/docs/hardware-specific/t5-ai-board/overview-t5-ai-board',
            to: '/docs/hardware/tuya-t5/t5-ai-board/overview-t5-ai-board',
          },
          {
            from: '/docs/hardware-specific/t5-ai-core/overview-t5-ai-core',
            to: '/docs/hardware/tuya-t5/t5-ai-core/overview-t5-ai-core',
          },
        ],
        // Map every page moved by the docs re-categorization back to its old URL.
        // `existingPath` is the NEW path; we return the OLD path(s) to redirect from.
        // Substring (not startsWith) so locale-prefixed paths like /zh/docs/... also map.
        createRedirects(existingPath) {
          // [newPrefix, oldPrefix] — order matters: more specific prefixes first.
          const moves = [
            ['/docs/hardware/porting/', '/docs/new-hardware/'],
            ['/docs/hardware/', '/docs/hardware-specific/'],
            ['/docs/cloud/device-ai/', '/docs/applications/tuya.ai/'],
            ['/docs/cloud/iot-client/', '/docs/applications/tuya_cloud/'],
          ]
          for (const [neu, old] of moves) {
            const i = existingPath.indexOf(neu)
            if (i !== -1) {
              return existingPath.slice(0, i) + old + existingPath.slice(i + neu.length)
            }
          }
          // Folder index pages: /docs/hardware -> /docs/hardware-specific
          if (existingPath.endsWith('/docs/hardware')) {
            return existingPath.slice(0, -'/docs/hardware'.length) + '/docs/hardware-specific'
          }
          // Old applications hub -> new cloud overview
          if (existingPath.endsWith('/docs/cloud/overview')) {
            const base = existingPath.slice(0, -'/docs/cloud/overview'.length)
            return [base + '/docs/applications', base + '/docs/applications/index']
          }
          return undefined
        },
      },
    ],
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: '6232065417750C16',
      },
    },
  ],
}

export default config
