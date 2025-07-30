// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
import { themes as prismThemes } from 'prism-react-renderer'

/** @type {import('@docusaurus/types').Config} */
const config = {
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
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'forest',
      },
      options: {
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: 16,
        themeVariables: {
          primaryColor: '#2e7dff',
          primaryTextColor: '#222',
          primaryBorderColor: '#2e7dff',
          lineColor: '#2e7dff',
          fontFamily: 'Inter, Arial, sans-serif',
          nodeTextColor: '#222',
          background: '#f8fafc',
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
        src: 'img/home/tuyaopen-logo-simple-dark.png',
        srcDark: 'img/home/tuyaopen-logo-simple-light.png',
      },
      items: [
        {
          to: 'docs/about-tuyaopen',
          label: 'Documentation',
        },
        {
          to: '/pricing',
          label: 'Pricing',
        },
        {
          to: 'blog',
          label: 'Blog',
        },
        {
          label: 'Tools',
          position: 'left',
          items: [
            {
              label: 'Web Serial/Flashing Tools',
              to: '/tools',
            },
          ],
        },
        // ======Hardware List ========
        // {
        //   to: '/hardware_pages',
        //   label: 'Supported Hardware',
        //   position: 'left',
        // },

        // {
        // type: 'docsVersionDropdown',
        // dropdownItemsAfter: [
        //     {
        //       type: 'html',
        //       value: '<hr style="margin: .5em 0;" />',
        //     },
        //     { to: '/versions', label: 'All Versions' },
        //     { to: '/supported-releases', label: 'Supported Releases' },
        //   ],
        //   position: 'right',
        // },
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
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/quick_start/unboxing',
            },
            {
              label: 'Pricing',
              to: '/pricing',
            },
            {
              label: 'Hardware List',
              to: '/docs/hardware-specific',
            },
            {
              label: 'Tuya T5AI Dev Kit',
              to: '/docs/hardware-specific/t5-ai-board/overview-t5-ai-board',
            },
          ],
        },
        {
          title: 'Tools',
          items: [
            {
              label: 'Web Serial Tool',
              to: '/tools',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/cbGrBjx7',
            },
            {
              label: 'X',
              href: 'https://x.com/tuyasmart',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/@tuya2023',
            },
            {
              label: 'Linkedin',
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
              label: 'Gitee(Mirror)',
              href: 'https://gitee.com/tuya-open/TuyaOpen',
            },
          ],
        },
        {
          title: 'Acknowledgements',
          items: [
            {
              label: 'Thanks for the technology illustrations by Storyset',
              href: 'https://storyset.com/technology',
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
    ['@gracefullight/docusaurus-plugin-microsoft-clarity', { projectId: 'lggqck9srz' }],
    './src/plugins/hardwarePagesGenerator',
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'hardware-content',
    //     path: 'content/hardware',
    //     routeBasePath: 'hardware-content',
    //     include: ['*.md'],
    //     sidebarPath: false,
    //   },
    // ],
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
