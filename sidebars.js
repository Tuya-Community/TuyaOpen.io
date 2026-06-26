// Per-product documentation entries.
//
// The site uses ONE docs instance with multiple sidebars — one per product.
// Each sidebar is a separate "docs entry" surfaced from the navbar "Docs" menu:
//
//   sdkSidebar       -> TuyaOpen SDK   (/docs root content)
//   hardwareSidebar  -> Hardware       (/docs/hardware/*)
//   cloudSidebar     -> Cloud & AI     (/docs/cloud/*)
//   duckyclawSidebar -> DuckyClaw       (/docs/duckyclaw/*)
//
// SHARED / UNIVERSAL DOCS
// -----------------------
// A single source .md can be reused across several entries simply by listing
// its doc id in more than one sidebar — no file duplication. The Getting
// Started (quick-start/*) and FAQs blocks below are defined once as helpers and
// spread into both the SDK and Hardware sidebars. To share another doc, add its
// id to the relevant sidebars here; the markdown lives in exactly one place.

const divider = (en, zh) => ({
  type: 'html',
  value: `<div class="sidebar-divider"><span class="sidebar-divider-en">${en}</span><span class="sidebar-divider-zh">${zh}</span></div>`,
  defaultStyle: false,
})

// --- Shared building blocks (reused across multiple product sidebars) ---------

const gettingStarted = {
  type: 'category',
  label: 'Getting Started',
  collapsed: false,
  className: 'sidebar-getting-started',
  link: { type: 'doc', id: 'quick-start/index' },
  items: [
    'quick-start/unboxing',
    'quick-start/enviroment-setup',
    'quick-start/project-compilation',
    'quick-start/firmware-burning',
    'quick-start/equipment-authorization',
    'quick-start/device-network-configuration',
    'quick-start/device-debug',
    'quick-start/tuya-product-development',
    'quick-start/firmware-ota',
  ],
}

const helpAndContributing = [
  divider('🌱 Help & Contributing', '🌱 帮助与贡献'),
  'faqs/faqs',
  'faqs/get-developer-license',
  {
    type: 'category',
    label: 'Contribute',
    collapsed: true,
    items: [
      'contribute/contribute-guide',
      'contribute/coding-style-guide',
      {
        type: 'category',
        label: 'Docs Templates',
        collapsed: true,
        items: [
          'contribute/template/markdown-syntax',
          'contribute/template/concept_template',
          'contribute/template/development_guide_template',
          'contribute/template/faq_template',
          'contribute/template/operation_guide-template',
          'contribute/template/README-template',
        ],
      },
    ],
  },
]

// =============================================================================
// TuyaOpen SDK
// =============================================================================
const sdkSidebar = [
  'about-tuyaopen',
  'project-walkthrough',
  'maintenance-and-releases',
  'advanced-use/terminologies',

  // Shared: Getting Started (also appears under Hardware)
  divider('👇 Start Here 👇', '👇 来吧！从这里开始 👇'),
  gettingStarted,

  divider('Embedded Programming', '嵌入式编程'),
  {
    type: 'category',
    label: 'Guides & platform APIs',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Networking',
        collapsed: true,
        items: [
          'peripheral/tutorials/wifi-station-tutorial',
          {
            type: 'category',
            label: 'Protocol Tutorials',
            collapsed: true,
            items: [
              'peripheral/tutorials/http-client-tutorial',
              'peripheral/tutorials/cjson-tutorial',
              'peripheral/tutorials/mqtt-client-tutorial',
              'peripheral/tutorials/tcp-socket-tutorial',
            ],
          },
          {
            type: 'category',
            label: 'BLE Tutorials',
            collapsed: true,
            items: ['peripheral/tutorials/ble-central-tutorial', 'peripheral/tutorials/ble-peripheral-tutorial'],
          },
          {
            type: 'category',
            label: 'TAL API Reference',
            collapsed: true,
            items: [
              'peripheral/tutorials/tal-wifi-api',
              'peripheral/tutorials/tal-network-api',
              'peripheral/tutorials/tal-bluetooth-api',
            ],
          },
          {
            type: 'category',
            label: 'TKL Networking',
            collapsed: true,
            items: [
              'tkl-api/tkl_wifi',
              'tkl-api/tkl_bluetooth',
              'tkl-api/tkl_lwip',
              'tkl-api/tkl_network',
              'tkl-api/tkl_wired',
            ],
          },
        ],
      },
      {
        type: 'category',
        label: 'Graphics',
        collapsed: true,
        items: [
          'peripheral/tutorials/lvgl-application-guide',
          'peripheral/display',
          'peripheral/tutorials/display-driver-guide',
        ],
      },
      {
        type: 'category',
        label: 'Audio',
        collapsed: true,
        items: ['peripheral/audio', 'peripheral/tutorials/audio-codec-guide'],
      },
      {
        type: 'category',
        label: 'Peripherals',
        collapsed: true,
        items: [
          'peripheral/support_peripheral_list',
          'peripheral/driver-architecture',
          'peripheral/button',
          {
            type: 'category',
            label: 'Peripheral Tutorials',
            collapsed: true,
            items: [
              'peripheral/tutorials/gpio-interrupt-tutorial',
              'peripheral/tutorials/i2c-guide',
              'peripheral/tutorials/adc-guide',
              'peripheral/tutorials/writing-sensor-driver',
              'peripheral/tutorials/migrating-sensor-driver',
            ],
          },
        ],
      },
      {
        type: 'category',
        label: 'System Programming',
        collapsed: true,
        items: [
          'peripheral/tutorials/thread-timer-patterns',
          'peripheral/tutorials/tal-system-api',
          'peripheral/tutorials/tal-kv-guide',
          'peripheral/tutorials/kconfig-and-project-configuration',
          {
            type: 'category',
            label: 'TKL OS APIs',
            collapsed: true,
            items: [
              'tkl-api/tkl_mutex',
              'tkl-api/tkl_semaphore',
              'tkl-api/tkl_system',
              'tkl-api/tkl_timer',
              'tkl-api/tkl_thread',
              'tkl-api/tkl_wakeup',
              'tkl-api/tkl_ota',
              'tkl-api/tkl_output',
            ],
          },
        ],
      },
      {
        type: 'category',
        label: 'Memory & storage',
        collapsed: true,
        items: [
          'peripheral/memory/overview',
          'peripheral/memory/heap-allocation-and-psram',
          'peripheral/memory/flash-and-partitions',
        ],
      },
      {
        type: 'category',
        label: 'Hardware Interfaces',
        collapsed: true,
        items: [
          'tkl-api/tkl_adc',
          'tkl-api/tkl_dac',
          'tkl-api/tkl_flash',
          'tkl-api/tkl_gpio',
          'tkl-api/tkl_i2c',
          'tkl-api/tkl_i2s',
          'tkl-api/tkl_pinmux',
          'tkl-api/tkl_pwm',
          'tkl-api/tkl_register',
          'tkl-api/tkl_rtc',
          'tkl-api/tkl_spi',
          'tkl-api/tkl_uart',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Examples',
    collapsed: true,
    items: ['examples/demo-generic-examples'],
  },

  divider('📦 Build & Tools', '📦 构建与工具'),
  {
    type: 'category',
    label: 'tos.py & tyutool',
    collapsed: true,
    items: ['tos-tools/tos-guide', 'tos-tools/tos-idf-reference', 'tos-tools/tools-tyutool'],
  },
  {
    type: 'category',
    label: 'Build System',
    collapsed: true,
    items: ['build-system/compilation-guide', 'build-system/cmake-kconfig-and-components'],
  },

  ...helpAndContributing,
]

// =============================================================================
// Hardware
// =============================================================================
const hardwareSidebar = [
  'hardware/index',

  // Shared: Getting Started (also appears under SDK)
  divider('👇 Start Here 👇', '👇 来吧！从这里开始 👇'),
  gettingStarted,

  divider('🛠️ Boards & Chips', '🛠️ 开发板与芯片'),
  {
    type: 'category',
    label: 'Tuya T5',
    collapsed: false,
    items: [
      'hardware/tuya-t5/t5ai-peripheral-mapping',
      {
        type: 'category',
        label: 'T5-AI Board DevKit',
        collapsed: true,
        items: ['hardware/tuya-t5/t5-ai-board/overview-t5-ai-board'],
      },
      {
        type: 'category',
        label: 'T5-AI Core DevKit',
        collapsed: true,
        items: ['hardware/tuya-t5/t5-ai-core/overview-t5-ai-core'],
      },
    ],
  },
  {
    type: 'category',
    label: 'Tuya T2',
    collapsed: true,
    link: { type: 'doc', id: 'hardware/tuya-t2/overview-t2' },
    items: ['hardware/tuya-t2/overview-t2'],
  },
  {
    type: 'category',
    label: 'Tuya T3',
    collapsed: true,
    link: { type: 'doc', id: 'hardware/tuya-t3/overview-t3' },
    items: ['hardware/tuya-t3/overview-t3'],
  },
  {
    type: 'category',
    label: 'Espressif ESP32',
    collapsed: true,
    link: { type: 'doc', id: 'hardware/espressif/overview-esp32' },
    items: [
      'hardware/espressif/esp32-quick-start',
      'hardware/espressif/esp32-supported-features',
      {
        type: 'category',
        label: 'Pin Mapping',
        collapsed: true,
        link: { type: 'doc', id: 'hardware/espressif/esp32-pin-mapping' },
        items: [
          'hardware/espressif/pinmux/esp32-classic',
          'hardware/espressif/pinmux/esp32-s3',
          'hardware/espressif/pinmux/esp32-c3',
          'hardware/espressif/pinmux/esp32-c6',
        ],
      },
      'hardware/espressif/esp32-new-board',
      'hardware/espressif/esp32-ota',
    ],
  },
  {
    type: 'category',
    label: 'Linux',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'DshanPi A1',
        collapsed: true,
        items: ['hardware/Linux/DshanPi-A1/Applications/your-chat-bot-on-dshanpi-a1'],
      },
      {
        type: 'category',
        label: 'Raspberry Pi',
        collapsed: true,
        items: [
          'hardware/Linux/raspberry-pi/Applications/your-chat-bot-on-raspberry-pi',
          'hardware/Linux/raspberry-pi/Examples/raspberry-pi',
          'hardware/Linux/raspberry-pi/Examples/peripherals-raspberry-pi',
          'hardware/Linux/raspberry-pi/Troubleshooting/wifi-bluetooth',
        ],
      },
    ],
  },

  divider('♾️ TuyaOpen with Arduino IDE', '♾️ TuyaOpen 与 Arduino IDE'),
  {
    type: 'category',
    label: 'T5 + Arduino IDE',
    collapsed: true,
    items: [
      'hardware/tuya-t5/develop-with-Arduino/Introduction',
      'hardware/tuya-t5/develop-with-Arduino/Quick_start',
      'hardware/tuya-t5/develop-with-Arduino/Application',
      'hardware/tuya-t5/develop-with-Arduino/AI_API_Development',
      'hardware/tuya-t5/develop-with-Arduino/Peripheral_Development',
      'hardware/tuya-t5/develop-with-Arduino/Arduino_Library',
      'hardware/tuya-t5/develop-with-Arduino/Pinmux',
    ],
  },

  divider('🧩 Bring Up New Hardware', '🧩 适配新硬件'),
  {
    type: 'category',
    label: 'Porting & New Project',
    collapsed: true,
    items: [
      'hardware/porting/porting-platform',
      'hardware/porting/new-platform',
      'hardware/porting/new-board',
      'hardware/porting/new-project',
    ],
  },
]

// =============================================================================
// Cloud & AI
// =============================================================================
const cloudSidebar = [
  'cloud/overview',

  divider('🔌 Connect to Tuya Cloud', '🔌 接入涂鸦云'),
  {
    type: 'category',
    label: 'Build AI + IoT firmware',
    collapsed: false,
    items: ['cloud/tuya-cloud/creating-new-product'],
  },
  {
    type: 'category',
    label: 'Tuya Cloud IoT',
    collapsed: true,
    items: ['cloud/iot-client/tuya-iot-client-reference', 'cloud/iot-client/demo-tuya-iot-light'],
  },

  divider('🤖 On-device AI', '🤖 端侧 AI'),
  {
    type: 'category',
    label: 'Runtime, agent & skills',
    collapsed: false,
    items: [
      'cloud/device-ai/ai-components/ai-components',
      'cloud/device-ai/ai-components/ai-main',
      'cloud/device-ai/ai-components/ai-agent',
      'cloud/device-ai/ai-components/ai-skill',
      'cloud/device-ai/ai-components/ai-audio-input',
      'cloud/device-ai/ai-components/ai-audio-player',
      'cloud/device-ai/ai-components/ai-video-input',
    ],
  },
  {
    type: 'category',
    label: 'Voice Chat Modes',
    collapsed: true,
    link: { type: 'doc', id: 'cloud/device-ai/ai-components/ai-mode-manage' },
    items: [
      'cloud/device-ai/ai-components/ai-mode-hold',
      'cloud/device-ai/ai-components/ai-mode-oneshot',
      'cloud/device-ai/ai-components/ai-mode-wakeup',
      'cloud/device-ai/ai-components/ai-mode-free',
    ],
  },
  {
    type: 'category',
    label: 'Design on-device AI UIs',
    collapsed: true,
    link: { type: 'doc', id: 'cloud/device-ai/ai-components/ai-ui-manage' },
    items: [
      'cloud/device-ai/ai-components/ai-ui-chat-wechat',
      'cloud/device-ai/ai-components/ai-ui-chat-chatbot',
      'cloud/device-ai/ai-components/ai-ui-chat-oled',
    ],
  },
  {
    type: 'category',
    label: 'Expose MCP on the device',
    collapsed: true,
    items: ['cloud/device-ai/ai-components/ai-mcp-server', 'cloud/device-ai/ai-components/ai-mcp-tools'],
  },
  {
    type: 'category',
    label: 'AI application demos',
    collapsed: true,
    items: [
      { type: 'doc', id: 'cloud/device-ai/demo-your-chat-bot', label: 'your_chat_bot' },
      { type: 'doc', id: 'cloud/device-ai/demo-duo-eyes-mood', label: 'duo_eye_mood' },
    ],
  },

  divider('☁️ Tuya Cloud AI Platform', '☁️ 涂鸦云端 AI 平台'),
  {
    type: 'category',
    label: 'Tuya Cloud AI',
    collapsed: false,
    link: { type: 'doc', id: 'cloud/tuya-cloud/ai-agent/index' },
    items: [
      {
        type: 'category',
        label: 'Agent Development',
        collapsed: true,
        items: [
          'cloud/tuya-cloud/ai-agent/index',
          'cloud/tuya-cloud/ai-agent/ai-agent-dev-platform',
          'cloud/tuya-cloud/ai-agent/workflow-management',
          'cloud/tuya-cloud/ai-agent/variables-management',
          'cloud/tuya-cloud/ai-agent/role-management',
          'cloud/tuya-cloud/ai-agent/agent-evaluation',
        ],
      },
      {
        type: 'category',
        label: 'AI Control Hardware',
        collapsed: true,
        items: ['cloud/tuya-cloud/ai-agent/self-control-commands', 'cloud/tuya-cloud/ai-agent/ai-product-commands'],
      },
      {
        type: 'category',
        label: 'Add voice & language',
        collapsed: true,
        items: [
          'cloud/tuya-cloud/ai-agent/supported-languages-and-voice-variants',
          'cloud/tuya-cloud/ai-agent/10.1-add-custom-voice',
        ],
      },
      'cloud/tuya-cloud/ai-agent/database',
      {
        type: 'category',
        label: 'Automate with triggers',
        collapsed: true,
        items: ['cloud/tuya-cloud/ai-agent/agent-trigger-index', 'cloud/tuya-cloud/ai-agent/12.1-how-to-write-promts'],
      },
      {
        type: 'category',
        label: 'Manage cloud MCP',
        collapsed: true,
        items: ['cloud/tuya-cloud/ai-agent/mcp-management', 'cloud/tuya-cloud/ai-agent/13.1-custom-mcp-services'],
      },
      {
        type: 'category',
        label: 'Integrate via OpenAPI & chat',
        collapsed: true,
        items: ['cloud/tuya-cloud/ai-agent/agent-openapis', 'cloud/tuya-cloud/ai-agent/14.1-chat-with-agent'],
      },
    ],
  },
]

// =============================================================================
// DuckyClaw
// =============================================================================
const duckyclawSidebar = [
  { type: 'link', label: 'Overview', href: '/duckyclaw' },
  {
    type: 'category',
    label: 'Quick Start',
    collapsed: false,
    items: [
      'duckyclaw/ducky-quick-start-T5AI',
      'duckyclaw/ducky-quick-start-raspberry-pi-5',
      'duckyclaw/ducky-quick-start-ESP32S3',
    ],
  },
  'duckyclaw/custom-device-mcp',
  'duckyclaw/hardware-skill',
  'duckyclaw/DuckyClaw-OpenClaw',
  'duckyclaw/DuckyClaw-TuyaClaw',
]

module.exports = {
  sdkSidebar,
  hardwareSidebar,
  cloudSidebar,
  duckyclawSidebar,
}
