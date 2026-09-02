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

  clientModules: [
    './src/clientModules/gtag-shim.js',
    './src/clientModules/toc-reading-progress.js',
    './src/clientModules/impeccable-live.js',
  ],

  title: 'TuyaOpen',
  tagline: 'A Powerful Open Source OS and Platform for IoTs Development',
  favicon: '/img/favicon.ico',

  // Set the production url of your site here
  url: 'https://tuyaopen.ai',
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
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/Tuya-Community/TuyaOpen.io/edit/master/',
          editLocalizedFiles: true,
        },
        blog: {
          showReadingTime: true,
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
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
      hideOnScroll: false,
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
          // Clicking the label lands on the docs portal; the menu below mirrors
          // that page's areas one-for-one, in the same order, so the hover menu
          // and the portal are the same map at two levels of detail. Keep them
          // in step with `areas` in src/data/docsPortal.js.
          to: '/documentation',
          position: 'left',
          items: [
            { to: '/documentation', label: 'All docs' },
            { type: 'docSidebar', sidebarId: 'sdkSidebar', label: 'TuyaOpen SDK' },
            { type: 'docSidebar', sidebarId: 'ideSidebar', label: 'TuyaOpen IDE' },
            { type: 'docSidebar', sidebarId: 'hardwareSidebar', label: 'Hardware' },
            { type: 'docSidebar', sidebarId: 'cloudSidebar', label: 'Cloud & AI' },
            { type: 'docSidebar', sidebarId: 'tclawSidebar', label: 'TClaw' },
            { type: 'docSidebar', sidebarId: 'tyutoolSidebar', label: 'tyutool' },
          ],
        },
        {
          label: 'Learn',
          to: '/learn',
          position: 'left',
        },
        {
          label: 'Forums',
          href: 'https://forum-tuyaopen.discourse.group/',
          position: 'left',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        {
          type: 'dropdown',
          label: 'Ecosystem',
          position: 'left',
          items: [
            { label: 'Projects', to: '/learn?cat=community' },
            { label: 'Dev Boards', to: '/dev-boards' },
            { label: 'Blog', to: 'blog' },
            {
              label: 'Event Registration',
              href: 'https://images.tuyacn.com/rms-static/fe11d250-54e9-11f1-8d53-258e63d3fe0e-1779349939189.html?tyName=event-registration.html',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'About Us',
          position: 'left',
          items: [
            { label: 'About', to: '/about' },
            { label: 'Mission', to: '/mission' },
            { label: 'Partner with Us', to: '/partners' },
          ],
        },
        {
          type: 'localeDropdown',
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
              label: 'TClaw 🦞',
              to: '/tclaw',
            },
            // Hidden per request — re-enable to show "Get Hardware" in the footer.
            // {
            //   label: 'Get Hardware',
            //   to: '/get-hardware',
            // },
          ],
        },
        {
          title: 'Documentation',
          items: [
            {
              // Points at the Learn hub, not straight into /docs/quick-start —
              // the tracks there are the front door that decides between the
              // IDE and SDK routes; the docs funnel is one of them. Lands on
              // the page rather than the #quick-start section, matching the
              // home page's Quick Start button.
              label: 'Quick Start',
              to: '/learn',
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
              to: '/tyutool',
            },
            {
              label: 'Web Serial Tool',
              to: '/web-serial',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Forums',
              href: 'https://forum-tuyaopen.discourse.group/',
            },
            {
              label: 'FAQ',
              to: '/faq',
            },
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
              to: '/learn?cat=community',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Terms of Service',
              href: 'https://auth.tuya.com/policies/service',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
            {
              label: 'Legal Statement',
              href: 'https://auth.tuya.com/policies/legal',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
            {
              label: 'Tuya Privacy Policy',
              href: 'https://auth.tuya.com/policies/privacy',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
            {
              label: 'Tuya California Privacy Notice',
              href: 'https://auth.tuya.com/policies/CAprivacynotice',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          ],
        },
      ],
      copyright: `
        <p style="font-weight: 500;">Copyright © TuyaOpen Authors ${new Date().getFullYear()} | Documentation Distributed under <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer">Apache License Version 2.0</a></p>
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
    // FAQ Blog — reverse chronological FAQ articles with cover images
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'faq',
        path: 'faq',
        routeBasePath: 'faq',
        blogTitle: 'FAQ',
        blogDescription: 'Frequently asked questions about TuyaOpen, IoT development, and open source.',
        blogSidebarTitle: 'FAQ Articles',
        postsPerPage: 12,
        showReadingTime: true,
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
        editUrl: 'https://github.com/Tuya-Community/TuyaOpen.io/edit/master/',
        feedOptions: {
          type: 'all',
          title: 'TuyaOpen FAQ RSS Feed',
        },
      },
    ],
    './docusaurus-tailwind-v3',
    'docusaurus-plugin-image-zoom',
    './plugins/mermaid-panzoom',
    ['@gracefullight/docusaurus-plugin-microsoft-clarity', { projectId: 'lggqck9srz' }],
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Legacy aliases that predate the per-product docs split.
        // NOTE: this config runs once per locale build, and each locale's own
        // build validates `to` against its own (locale-relative) route list —
        // entries here must NOT be hand-prefixed with `/zh`.
        redirects: [
          // The standalone /tyutool-guide page was replaced by the tyutool docs section.
          {
            from: '/tyutool-guide',
            to: '/docs/tyutool',
          },
          // The TuyaOpen IDE series moved off /learn into its own docs sidebar,
          // and the slugs went from positional (practice-1) to descriptive.
          { from: '/learn/tuyaopen-ide-overview', to: '/docs/ide' },
          { from: '/learn/tuyaopen-ide-install', to: '/docs/ide/install' },
          { from: '/learn/tuyaopen-ide-practice-1', to: '/docs/ide/hello-world' },
          { from: '/learn/tuyaopen-ide-practice-2', to: '/docs/ide/chat-bot' },
          { from: '/learn/tuyaopen-ide-practice-3', to: '/docs/ide/miniapp-panel' },
          { from: '/learn/tuyaopen-ide-practice-4', to: '/docs/ide/linux-board' },
          { from: '/learn/tuyaopen-ide-vibe-coding', to: '/docs/ide/vibe-coding' },
          { from: '/learn/tuyaopen-ide-agent-dev', to: '/docs/ide/agent-development' },
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
          // Project markdown moved into /learn community (kind: 'markdown').
          {
            from: '/projects',
            to: '/learn?cat=community',
          },
          {
            from: '/docs/projects/2025-12-17-otto-ninja-open-source-robot',
            to: '/learn/otto-ninja-open-source-robot',
          },
          {
            from: '/docs/projects/2025-11-25-T5AI-Pocket',
            to: '/learn/t5-pocket',
          },
          {
            from: '/docs/projects/2025-09-28-led-matrix',
            to: '/learn/led-matrix',
          },
          {
            from: '/docs/projects/2025-09-15-t5ai-core-ai-chatbot',
            to: '/learn/t5ai-core-ai-chatbot',
          },
          {
            from: '/docs/projects/2025-09-15-project-iot-switch',
            to: '/learn/simple-iot-switch',
          },
          {
            from: '/docs/projects/2025-09-15-lvgl-font-change-tutorial',
            to: '/learn/lvgl-font-change-tutorial',
          },
          {
            from: '/docs/projects/2025-09-19-T5+2M-ASR-PRO-custom-asr',
            to: '/learn/t5-2m-asr-pro-custom-asr',
          },
          {
            from: '/docs/projects/2025-08-01-star-tracker',
            to: '/learn/star-tracker',
          },
          {
            from: '/docs/projects/2025-08-01-cyber-glass',
            to: '/learn/cyber-glass',
          },
          {
            from: '/docs/projects/2025-08-01-cyberplant',
            to: '/learn/nft-plent-collector',
          },
          {
            from: '/docs/projects/2025-08-01-auraflow',
            to: '/learn/robot-arm',
          },
          {
            from: '/docs/projects/2025-08-01-rdk-x5',
            to: '/learn/rdk-x5',
          },
          {
            from: '/docs/projects/2025-08-01-soccer-star',
            to: '/learn/rolling-ball',
          },
          {
            from: '/docs/projects/2025-08-01-smart-necklace',
            to: '/learn/ai-social-badge',
          },
        ],
        // Map every page moved by the docs re-categorization back to its old URL.
        // `existingPath` is the NEW path; we return the OLD path(s) to redirect from.
        // Substring (not startsWith) so locale-prefixed paths like /zh/docs/... also map.
        createRedirects(existingPath) {
          // [newPrefix, oldPrefix] — order matters: more specific prefixes first.
          const moves = [
            // TClaw was published under the DuckyClaw brand's slugs; keep the
            // old /duckyclaw routes alive after the rename to /tclaw.
            ['/docs/tclaw/', '/docs/duckyclaw/'],
            ['/tclaw', '/duckyclaw'],
            ['/docs/hardware/porting/', '/docs/new-hardware/'],
            ['/docs/hardware/', '/docs/hardware-specific/'],
            ['/docs/cloud/device-ai/', '/docs/applications/tuya.ai/'],
            ['/docs/cloud/iot-client/', '/docs/applications/tuya_cloud/'],
            // tyutool pages moved off /tools/ (the web-serial tool owns /tools/).
            // Substring match also covers the /zh/ locale variant.
            ['/tyutool', '/tools/tyutool'],
            // The standalone web-serial docker (formerly /tools/) is now integrated
            // into the site at /web-serial. Redirect the old root URL.
            ['/web-serial', '/tools'],
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
      tagName: 'script',
      attributes: {
        src: 'https://forum-tuyaopen.discourse.group/javascripts/embed-topics.js',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'google-site-verification',
        content: 'Pg0iUHrYEd6YrJjmb4C5o5VRnBjtcEkDDt_vJ9yU05o',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: '6232065417750C16',
      },
    },
    {
      {
  tagName: 'script',
  attributes: {
    type: 'application/ld+json',
  },
  innerHTML: JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': 'https://tuyaopen.ai/#organization',
        '@type': 'Organization',
        'name': 'TuyaOpen',
        'description': 'TuyaOpen is an open source AI+IoT development framework: a cross-platform C/C++ SDK for Tuya T-Series MCUs, ESP32, Raspberry Pi, and more.',
        'url': 'https://tuyaopen.ai/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://tuyaopen.ai/img/home/tuyaopen-logo-simple-light.png',
          'width': 2681,
          'height': 590,
        },
        'parentOrganization': {
          '@id': 'https://www.tuya.com/#organization',
        },
        'sameAs': [
          'https://github.com/tuya/TuyaOpen',
          'https://discord.com/invite/yPPShSTttG',
          'https://x.com/tuyasmart',
          'https://www.youtube.com/@tuya2023',
          'https://www.linkedin.com/company/tuya-smart',
        ],
      },
      {
        '@id': 'https://tuyaopen.ai/#website',
        '@type': 'WebSite',
        'name': 'TuyaOpen',
        'alternateName': 'TuyaOpen: A Powerful Open Source AI, OS and Platform for IoT Development',
        'url': 'https://tuyaopen.ai/',
        'description': 'TuyaOpen is an open source AI+IoT development framework: a cross-platform C/C++ SDK for Tuya T-Series MCUs, Raspberry Pi, ESP32, and more. Pair with Tuya Cloud multimodal AI, integrate leading LLMs, and build devices with voice, vision, and sensor features.',
        'inLanguage': ['en', 'zh'],
        'publisher': {
          '@id': 'https://tuyaopen.ai/#organization',
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': 'https://tuyaopen.ai/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@id': 'https://tuyaopen.ai/#webpage',
        '@type': 'WebPage',
        'url': 'https://tuyaopen.ai/',
        'name': 'TuyaOpen: A Powerful Open Source AI, OS and Platform for IoT Development',
        'description': 'TuyaOpen is an open source AI+IoT development framework: a cross-platform C/C++ SDK for Tuya T-Series MCUs, Raspberry Pi, ESP32, and more.',
        'isPartOf': {
          '@id': 'https://tuyaopen.ai/#website',
        },
        'about': {
          '@id': 'https://tuyaopen.ai/#organization',
        },
        'inLanguage': ['en', 'zh'],
      },
      {
        '@id': 'https://tuyaopen.ai/#software',
        '@type': 'SoftwareApplication',
        'name': 'TuyaOpen SDK',
        'url': 'https://tuyaopen.ai/',
        'applicationCategory': 'DeveloperApplication',
        'applicationSubCategory': 'IoT and embedded AI development framework',
        'operatingSystem': ['Linux', 'macOS', 'Windows'],
        'runtimePlatform': [
          'Tuya T-Series (T2, T3, T5AI)',
          'ESP32',
          'ESP32-C3',
          'ESP32-S3',
          'BK7231N',
          'LN882H',
          'Ubuntu',
        ],
        'description': 'Open source cross-platform C/C++ AI+IoT SDK. One codebase deploys across Tuya T-Series MCUs, ESP32, Raspberry Pi, and Linux, with built-in cloud connectivity, OTA, and multi-model AI integration.',
        'featureList': [
          'Cross-platform C/C++ SDK with a single codebase across MCU families',
          'Tuya Cloud device connectivity and activation',
          'OTA firmware upgrade',
          'Multimodal AI integration with leading LLMs',
          'Voice, vision, and sensor peripheral support',
        ],
        'softwareVersion': 'v1.9.0',
        'license': 'https://www.apache.org/licenses/LICENSE-2.0',
        'isAccessibleForFree': true,
        'downloadUrl': 'https://github.com/tuya/TuyaOpen/releases',
        'author': {
          '@id': 'https://tuyaopen.ai/#organization',
        },
        'publisher': {
          '@id': 'https://tuyaopen.ai/#organization',
        },
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
        'softwareHelp': {
          '@type': 'CreativeWork',
          'url': 'https://tuyaopen.ai/docs',
        },
      },
      {
        '@id': 'https://tuyaopen.ai/#sourcecode',
        '@type': 'SoftwareSourceCode',
        'name': 'TuyaOpen',
        'description': 'Source code for TuyaOpen, a next-generation AI+IoT framework for Tuya T2/T3/T5AI, ESP32, and other supported chipsets.',
        'url': 'https://tuyaopen.ai/',
        'codeRepository': 'https://github.com/tuya/TuyaOpen',
        'programmingLanguage': ['C', 'C++', 'Python'],
        'runtimePlatform': [
          'Tuya T-Series (T2, T3, T5AI)',
          'ESP32',
          'BK7231N',
          'LN882H',
          'Ubuntu',
        ],
        'license': 'https://www.apache.org/licenses/LICENSE-2.0',
        'author': {
          '@id': 'https://tuyaopen.ai/#organization',
        },
        'targetProduct': {
          '@id': 'https://tuyaopen.ai/#software',
        },
      },
    ],
  }),
},

      }),
    },
  ],
}

export default config
