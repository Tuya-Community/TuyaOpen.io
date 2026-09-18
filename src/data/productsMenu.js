// Shared "Products" mega-menu content for the global navbar dropdown.
// Icon keys map to inline SVGs in src/components/ProductsNavbarItem.
export const productsMenu = {
  en: {
    label: 'Products',
    groups: [
      {
        heading: 'Software',
        items: [
          {
            icon: 'sdk',
            title: 'TuyaOpen SDK',
            subtitle: 'Open-source full-stack AIoT OS',
            href: 'https://github.com/tuya/TuyaOpen',
            external: true,
          },
          {
            icon: 'arduino',
            title: 'TuyaOpen on Arduino',
            subtitle: 'Arduino library for rapid prototyping',
            href: '/docs/hardware/tuya-t5/develop-with-Arduino/Quick_start',
          },
          {
            icon: 'ducky',
            title: 'TClaw 🦞',
            subtitle: 'AI hardware companion agent · formerly DuckyClaw',
            href: '/tclaw',
          },
        ],
      },
      {
        heading: 'Hardware',
        items: [
          {
            icon: 'chip',
            title: 'Tuya T5',
            subtitle: 'Flagship Wi-Fi & BT AI chip — built for TuyaOpen',
            href: '/t5-tuyaopen',
          },
          {
            icon: 'chip',
            title: 'ESP32',
            subtitle: 'Full Espressif platform support',
            href: '/docs/hardware/espressif/overview-esp32',
          },
          {
            icon: 'chip',
            title: 'Linux / Raspberry Pi',
            subtitle: 'Run TuyaOpen on Raspberry Pi & Linux',
            href: '/docs/hardware/Linux/raspberry-pi/Examples/raspberry-pi',
          },
        ],
      },
      {
        heading: 'Tools',
        items: [
          {
            icon: 'ide',
            title: 'TuyaOpen IDE',
            subtitle: 'AI coding-agent extension for TuyaOpen development',
            href: '/tuyaopen-ide',
            badge: 'New Release',
          },
          {
            icon: 'terminal',
            title: 'TyuTools GUI/CLI',
            subtitle: 'Universal serial & flashing toolkit',
            href: '/tyutool',
          },
          {
            icon: 'web',
            title: 'WebTool',
            subtitle: 'Browser-based serial & flashing',
            href: '/web-serial',
            external: false,
          },
          {
            icon: 'license',
            title: 'License Key',
            subtitle: 'Per-device Tuya Cloud & AI authorization',
            href: '/pricing',
          },
        ],
      },
    ],
  },
  zh: {
    label: '产品',
    groups: [
      {
        heading: '软件',
        items: [
          {
            icon: 'sdk',
            title: 'TuyaOpen SDK',
            subtitle: '开源全栈 AIoT 操作系统',
            href: 'https://github.com/tuya/TuyaOpen',
            external: true,
          },
          {
            icon: 'arduino',
            title: 'TuyaOpen on Arduino',
            subtitle: '面向快速原型的 Arduino 库',
            href: '/docs/hardware/tuya-t5/develop-with-Arduino/Quick_start',
          },
          {
            icon: 'ducky',
            title: 'TClaw 🦞',
            subtitle: 'AI 硬件伴侣 Agent · 原 DuckyClaw',
            href: '/tclaw',
          },
        ],
      },
      {
        heading: '硬件',
        items: [
          {
            icon: 'chip',
            title: 'Tuya T5',
            subtitle: '旗舰级 Wi-Fi 与蓝牙 AI 芯片 · 为 TuyaOpen 而生',
            href: '/t5-tuyaopen',
          },
          {
            icon: 'chip',
            title: 'ESP32',
            subtitle: '完整的乐鑫平台支持',
            href: '/docs/hardware/espressif/overview-esp32',
          },
          {
            icon: 'chip',
            title: 'Linux / 树莓派',
            subtitle: '在树莓派与 Linux 上运行 TuyaOpen',
            href: '/docs/hardware/Linux/raspberry-pi/Examples/raspberry-pi',
          },
        ],
      },
      {
        heading: '工具',
        items: [
          {
            icon: 'ide',
            title: 'TuyaOpen IDE',
            subtitle: '用 AI Coding Agent 开发 TuyaOpen 的插件',
            href: '/tuyaopen-ide',
            badge: '全新发布',
          },
          {
            icon: 'terminal',
            title: 'TyuTools GUI/CLI',
            subtitle: '通用串口烧录工具集',
            href: '/tyutool',
          },
          {
            icon: 'web',
            title: 'WebTool',
            subtitle: '基于浏览器的串口与烧录工具',
            href: '/web-serial',
            external: false,
          },
          {
            icon: 'license',
            title: '服务授权码',
            subtitle: '按设备的涂鸦云与 AI 授权',
            href: '/pricing',
          },
        ],
      },
    ],
  },
}

productsMenu.ko = {
  ...productsMenu.en,
  label: '제품',
  groups: productsMenu.en.groups.map((group) => ({
    ...group,
    heading: group.heading === 'Software' ? '소프트웨어' : group.heading === 'Hardware' ? '하드웨어' : '도구',
    items: group.items.map((item) => ({
      ...item,
      title:
        {
          'License Key': '라이선스 키',
          服务授权码: '라이선스 키',
        }[item.title] || item.title,
      subtitle:
        {
          'Open-source full-stack AIoT OS': '오픈 소스 풀스택 AIoT OS',
          'Arduino library for rapid prototyping': '빠른 프로토타이핑을 위한 Arduino 라이브러리',
          'AI hardware companion agent · formerly DuckyClaw': 'AI 하드웨어 동반 Agent · 이전 DuckyClaw',
          'Flagship Wi-Fi & BT AI chip — built for TuyaOpen': 'TuyaOpen을 위해 설계된 플래그십 Wi-Fi 및 BT AI 칩',
          'Full Espressif platform support': 'Espressif 플랫폼 완전 지원',
          'Run TuyaOpen on Raspberry Pi & Linux': 'Raspberry Pi 및 Linux에서 TuyaOpen 실행',
          'AI coding-agent extension for TuyaOpen development': 'TuyaOpen 개발을 위한 AI 코딩 Agent 확장',
          'Universal serial & flashing toolkit': '범용 시리얼 및 플래시 도구',
          'Browser-based serial & flashing': '브라우저 기반 시리얼 및 플래시 도구',
          'Per-device Tuya Cloud & AI authorization': '디바이스별 Tuya Cloud 및 AI 인증',
        }[item.subtitle] || item.subtitle,
      badge: item.badge === 'New Release' || item.badge === '全新发布' ? '새 릴리스' : item.badge,
    })),
  })),
}
