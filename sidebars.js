module.exports = {
  docs: [
    // ------------------------------------------------------------------

    // ------------------------------------------------------------------
    'about-tuyaopen',
    'maintenance-and-releases',
    'project-walkthrough',
    // ------------------------------------------------------------------

    {
      type: 'html',
      value:
        '<div class="sidebar-divider"><span class="sidebar-divider-en">DuckyClaw</span><span class="sidebar-divider-zh">DuckyClaw 专区</span></div>',
      defaultStyle: false,
    },
    {
      type: 'category',
      label: 'DuckyClaw',
      collapsed: true,
      items: [
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
      ],
    },
    {
      type: 'html',
      value:
        '<div class="sidebar-divider"><span class="sidebar-divider-en">👇Start Here👇</span><span class="sidebar-divider-zh">👇来吧！从这里开始👇</span></div>',
      defaultStyle: false,
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      className: 'sidebar-getting-started',
      link: {
        type: 'doc',
        id: 'quick-start/index',
      },
      items: [
        'quick-start/unboxing',
        'quick-start/enviroment-setup',
        'quick-start/project-compilation',
        'quick-start/firmware-burning',
        'quick-start/equipment-authorization',
        'quick-start/device-network-configuration',
        'quick-start/device-debug',
      ],
    },

    {
      type: 'html',
      value:
        '<div class="sidebar-divider"><span class="sidebar-divider-en">🛠️ Hardware</span><span class="sidebar-divider-zh">🛠️ 硬件指南</span></div>',
      defaultStyle: false,
    },
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Hardware Guides',
      link: {
        type: 'doc',
        id: 'hardware-specific/index',
      },
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Tuya T5',
          collapsed: true,
          items: [
            'hardware-specific/tuya-t5/t5ai-peripheral-mapping',
            {
              type: 'category',
              label: 'T5-AI Board DevKit',
              collapsed: true,
              items: ['hardware-specific/tuya-t5/t5-ai-board/overview-t5-ai-board'],
            },
            {
              type: 'category',
              label: 'T5-AI Core DevKit',
              collapsed: true,
              items: ['hardware-specific/tuya-t5/t5-ai-core/overview-t5-ai-core'],
            },
          ],
        },
        {
          type: 'category',
          label: 'Tuya T2',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'hardware-specific/tuya-t2/overview-t2',
          },
          items: ['hardware-specific/tuya-t2/overview-t2'],
        },
        {
          type: 'category',
          label: 'Tuya T3',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'hardware-specific/tuya-t3/overview-t3',
          },
          items: ['hardware-specific/tuya-t3/overview-t3'],
        },
        {
          type: 'category',
          label: 'Espressif ESP32',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'hardware-specific/espressif/overview-esp32',
          },
          items: [
            'hardware-specific/espressif/esp32-quick-start',
            'hardware-specific/espressif/esp32-supported-features',
            {
              type: 'category',
              label: 'Pin Mapping',
              collapsed: true,
              link: {
                type: 'doc',
                id: 'hardware-specific/espressif/esp32-pin-mapping',
              },
              items: [
                'hardware-specific/espressif/pinmux/esp32-classic',
                'hardware-specific/espressif/pinmux/esp32-s3',
                'hardware-specific/espressif/pinmux/esp32-c3',
                'hardware-specific/espressif/pinmux/esp32-c6',
              ],
            },
            'hardware-specific/espressif/esp32-migration-guide',
            'hardware-specific/espressif/esp32-new-board',
            'hardware-specific/espressif/esp32-production-guide',
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
              items: ['hardware-specific/Linux/DshanPi-A1/Applications/your-chat-bot-on-dshanpi-a1'],
            },
            {
              type: 'category',
              label: 'Raspberry Pi',
              collapsed: true,
              items: [
                'hardware-specific/Linux/raspberry-pi/Applications/your-chat-bot-on-raspberry-pi',
                'hardware-specific/Linux/raspberry-pi/Examples/raspberry-pi',
                'hardware-specific/Linux/raspberry-pi/Examples/peripherals-raspberry-pi',
                'hardware-specific/Linux/raspberry-pi/Troubleshooting/wifi-bluetooth',
              ],
            },
          ],
        },
      ],
    },

    {
      type: 'html',
      value:
        '<div class="sidebar-divider"><span class="sidebar-divider-en">Embedded Programming</span><span class="sidebar-divider-zh">嵌入式编程</span></div>',
      defaultStyle: false,
    },
    {
      type: 'category',
      label: 'Embedded Programming',
      collapsed: false,
      items: [
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
        {
          type: 'category',
          label: 'Application demos',
          collapsed: true,
          items: [
            { type: 'doc', id: 'applications/tuya.ai/demo-your-chat-bot', label: 'your_chat_bot' },
            { type: 'doc', id: 'applications/tuya.ai/demo-duo-eyes-mood', label: 'duo_eye_mood' },
            { type: 'doc', id: 'applications/tuya_cloud/demo-tuya-iot-light', label: 'switch_demo' },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tuya Cloud IoT',
      collapsed: true,
      items: ['applications/tuya_cloud/tuya-iot-client-reference'],
    },
    {
      type: 'category',
      label: 'Tuya AI (Device-Cloud Integration)',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Build AI+IoT firmware',
          collapsed: true,
          items: ['cloud/tuya-cloud/creating-new-product'],
        },
        {
          type: 'category',
          label: 'Runtime, agent & skills',
          collapsed: true,
          items: [
            'applications/tuya.ai/ai-components/ai-components',
            'applications/tuya.ai/ai-components/ai-main',
            'applications/tuya.ai/ai-components/ai-agent',
            'applications/tuya.ai/ai-components/ai-skill',
            'applications/tuya.ai/ai-components/ai-audio-input',
            'applications/tuya.ai/ai-components/ai-audio-player',
            'applications/tuya.ai/ai-components/ai-video-input',
          ],
        },
        {
          type: 'category',
          label: 'Voice Chat Modes',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'applications/tuya.ai/ai-components/ai-mode-manage',
          },
          items: [
            'applications/tuya.ai/ai-components/ai-mode-hold',
            'applications/tuya.ai/ai-components/ai-mode-oneshot',
            'applications/tuya.ai/ai-components/ai-mode-wakeup',
            'applications/tuya.ai/ai-components/ai-mode-free',
          ],
        },
        {
          type: 'category',
          label: 'Design on-device AI UIs',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'applications/tuya.ai/ai-components/ai-ui-manage',
          },
          items: [
            'applications/tuya.ai/ai-components/ai-ui-chat-wechat',
            'applications/tuya.ai/ai-components/ai-ui-chat-chatbot',
            'applications/tuya.ai/ai-components/ai-ui-chat-oled',
          ],
        },
        {
          type: 'category',
          label: 'Expose MCP on the device',
          collapsed: true,
          items: [
            'applications/tuya.ai/ai-components/ai-mcp-server',
            'applications/tuya.ai/ai-components/ai-mcp-tools',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'New Project',
      collapsed: true,
      items: [
        'new-hardware/porting-platform',
        'new-hardware/new-platform',
        'new-hardware/new-board',
        'new-hardware/new-project',
      ],
    },
    {
      type: 'html',
      value:
        '<div class="sidebar-divider"><span class="sidebar-divider-en">Tuya Cloud AI</span><span class="sidebar-divider-zh">Tuya 云端 AI</span></div>',
      defaultStyle: false,
    },
    {
      type: 'category',
      label: 'Tuya Cloud AI',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'cloud/tuya-cloud/ai-agent/index',
      },
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
          items: [
            'cloud/tuya-cloud/ai-agent/agent-trigger-index',
            'cloud/tuya-cloud/ai-agent/12.1-how-to-write-promts',
          ],
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
    // ------------------------------------------------------------------
    {
      type: 'html',
      value:
        '<div class="sidebar-divider"><span class="sidebar-divider-en">♾️ TuyaOpen with Arduino IDE</span><span class="sidebar-divider-zh">♾️ TuyaOpen 与 Arduino IDE</span></div>',
      defaultStyle: false,
    },
    {
      type: 'category',
      label: 'T5 + Arduino IDE',
      collapsed: true,
      items: [
        'hardware-specific/tuya-t5/develop-with-Arduino/Introduction',
        'hardware-specific/tuya-t5/develop-with-Arduino/Quick_start',
        'hardware-specific/tuya-t5/develop-with-Arduino/Application',
        'hardware-specific/tuya-t5/develop-with-Arduino/AI_API_Development',
        'hardware-specific/tuya-t5/develop-with-Arduino/Peripheral_Development',
        'hardware-specific/tuya-t5/develop-with-Arduino/Arduino_Library',
        'hardware-specific/tuya-t5/develop-with-Arduino/Pinmux',
      ],
    },

    // ------------------------------------------------------------------

    {
      type: 'html',
      value:
        '<div class="sidebar-divider"><span class="sidebar-divider-en">📦 Developer Tools</span><span class="sidebar-divider-zh">📦 开发者工具</span></div>',
      defaultStyle: false,
    },

    {
      type: 'category',
      label: 'tos.py Tool (Flash/Debug)',
      collapsed: true,
      items: ['tos-tools/tos-guide', 'tos-tools/tos-idf-reference', 'tos-tools/tools-tyutool'],
    },
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Build System',
      collapsed: true,
      items: ['build-system/compilation-guide', 'build-system/cmake-kconfig-and-components'],
    },
    {
      type: 'html',
      value:
        '<div class="sidebar-divider"><span class="sidebar-divider-en">🌱 Other</span><span class="sidebar-divider-zh">🌱 其他</span></div>',
      defaultStyle: false,
    },

    // ------------------------------------------------------------------
    'faqs/faqs',
    'faqs/get-developer-license',
    // ------------------------------------------------------------------
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
    // ------------------------------------------------------------------
  ],
}
