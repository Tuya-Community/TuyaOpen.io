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
            subtitle: 'Open-source full-stack IoT OS',
            href: 'https://github.com/tuya/TuyaOpen',
            external: true,
          },
          {
            icon: 'arduino',
            title: 'TuyaOpen on Arduino',
            subtitle: 'Arduino library for rapid prototyping',
            href: 'https://github.com/tuya/arduino-TuyaOpen',
            external: true,
          },
          {
            icon: 'ducky',
            title: 'DuckyClaw 🦞',
            subtitle: 'AI hardware companion agent',
            href: '/duckyclaw',
          },
        ],
      },
      {
        heading: 'Hardware',
        items: [
          {
            icon: 'chip',
            title: 'Tuya T5',
            subtitle: 'Flagship Wi-Fi & BT AI dev board',
            href: '/docs/hardware-specific/tuya-t5/t5-ai-board/overview-t5-ai-board',
          },
          {
            icon: 'wifi',
            title: 'ESP32',
            subtitle: 'Full Espressif platform support',
            href: '/docs/hardware-specific/espressif/overview-esp32',
          },
          {
            icon: 'pi',
            title: 'Linux / Raspberry Pi',
            subtitle: 'Run TuyaOpen on Raspberry Pi & Linux',
            href: '/docs/hardware-specific/Linux/raspberry-pi/Examples/raspberry-pi',
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
            href: '/tools/tyutool',
          },
          {
            icon: 'web',
            title: 'WebTool',
            subtitle: 'Browser-based serial & flashing',
            href: 'https://tuyaopen.ai/tools',
            external: true,
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
            subtitle: '开源全栈 IoT 操作系统',
            href: 'https://github.com/tuya/TuyaOpen',
            external: true,
          },
          {
            icon: 'arduino',
            title: 'TuyaOpen on Arduino',
            subtitle: '面向快速原型的 Arduino 库',
            href: 'https://github.com/tuya/arduino-TuyaOpen',
            external: true,
          },
          {
            icon: 'ducky',
            title: 'DuckyClaw 🦞',
            subtitle: 'AI 硬件伴侣 Agent',
            href: '/duckyclaw',
          },
        ],
      },
      {
        heading: '硬件',
        items: [
          {
            icon: 'chip',
            title: 'Tuya T5',
            subtitle: '旗舰级 Wi-Fi 与蓝牙 AI 开发板',
            href: '/docs/hardware-specific/tuya-t5/t5-ai-board/overview-t5-ai-board',
          },
          {
            icon: 'wifi',
            title: 'ESP32',
            subtitle: '完整的乐鑫平台支持',
            href: '/docs/hardware-specific/espressif/overview-esp32',
          },
          {
            icon: 'pi',
            title: 'Linux / 树莓派',
            subtitle: '在树莓派与 Linux 上运行 TuyaOpen',
            href: '/docs/hardware-specific/Linux/raspberry-pi/Examples/raspberry-pi',
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
            badge: 'New Release',
          },
          {
            icon: 'terminal',
            title: 'TyuTools GUI/CLI',
            subtitle: '通用串口烧录工具集',
            href: '/tools/tyutool',
          },
          {
            icon: 'web',
            title: 'WebTool',
            subtitle: '基于浏览器的串口与烧录工具',
            href: 'https://tuyaopen.ai/tools',
            external: true,
          },
        ],
      },
    ],
  },
}
