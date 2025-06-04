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

  // https://github.com/tuya/TuyaOpen

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tuya-open', // Usually your GitHub org/user name.
  projectName: 'TuyaOpen', // Usually your repo name.

  onBrokenLinks: 'warn',
  trailingSlash: true,

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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-xxxxxxxx',
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
    colorMode: {
      respectPrefersColorScheme: true,
    },
    image: '/img/home/tuyaopen-logo-social-preview.png',
    navbar: {
      hideOnScroll: true,
      title: 'TuyaOpen',
      logo: {
        alt: 'TuyaOpen',
        src: 'img/home/tuyaopen-logo-simple-dark.png',
        srcDark: 'img/home/tuyaopen-logo-simple-light.png',
      },
      items: [
        // { to: 'http://docs.tuyaopen.io/', label: 'Documentation' },
        { to: 'docs/about-tuyaopen', label: 'Documentation' },

        // ======Blog========
        // {
        //   to: 'blog',
        //   label: 'Blog',
        // },

        // ======Hardware List ========
        // {
        //   to: '/hardware_pages',
        //   label: 'Supported Hardware',
        //   position: 'left',
        // },

        // TODO: huate: add the link to the community group
        // {
        //   href: 'https://github.com/tuya/TuyaOpen/discussions/',
        //   label: 'Community Group',
        // },

        // {
        //   type: 'docsVersionDropdown',
        //   dropdownItemsAfter: [
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
              to: '/docs/about-tuyaopen',
            },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'X',
        //       href: 'https://x.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/tuya/TuyaOpen',
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
}

export default config
