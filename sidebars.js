module.exports = {
  docs: [
    // ------------------------------------------------------------------
    'about-tuyaopen',
    'maintenance-and-releases',
    'project-walkthrough',
    // ------------------------------------------------------------------
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
        '<div class="sidebar-divider"><span class="sidebar-divider-en">💡 Apps & Examples</span><span class="sidebar-divider-zh">💡 应用与示例</span></div>',
      defaultStyle: false,
    },

    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Applications',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'applications/index',
      },
      items: [
        {
          type: 'category',
          label: 'Tuya Cloud',
          collapsed: true,
          items: ['applications/tuya_cloud/demo-tuya-iot-light'],
        },
        {
          type: 'category',
          label: 'Tuya.AI',
          collapsed: false,
          items: [
            'applications/tuya.ai/application-development-guide',
            'applications/tuya.ai/demo-your-chat-bot',
            'applications/tuya.ai/demo-duo-eyes-mood',
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Examples',
      collapsed: true,
      items: ['examples/demo-generic-examples'],
    },
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Peripherals',
      collapsed: true,
      items: ['peripheral/support_peripheral_list', 'peripheral/display', 'peripheral/audio', 'peripheral/button'],
    },
    // ------------------------------------------------------------------
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
    // ------------------------------------------------------------------

    {
      type: 'html',
      value:
        '<div class="sidebar-divider"><span class="sidebar-divider-en">☁️ Cloud Agent Docs</span><span class="sidebar-divider-zh">☁️ 云端智能体文档</span></div>',
      defaultStyle: false,
    },

    {
      type: 'category',
      label: 'Cloud Services',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Tuya Cloud Platform',
          collapsed: false,
          items: [
            'cloud/tuya-cloud/creating-new-product',
            {
              type: 'category',
              label: 'AI Agent Development',
              collapsed: true,
              items: [
                'cloud/tuya-cloud/ai-agent/index',
                'cloud/tuya-cloud/ai-agent/ai-agent-dev-platform',
                'cloud/tuya-cloud/ai-agent/workflow-management',
                'cloud/tuya-cloud/ai-agent/variables-management',
                'cloud/tuya-cloud/ai-agent/role-management',
                'cloud/tuya-cloud/ai-agent/agent-evaluation',
                'cloud/tuya-cloud/ai-agent/self-control-commands',
                'cloud/tuya-cloud/ai-agent/ai-product-commands',
                {
                  type: 'category',
                  label: 'Voice & Language',
                  collapsed: true,
                  items: [
                    'cloud/tuya-cloud/ai-agent/supported-languages-and-voice-variants',
                    'cloud/tuya-cloud/ai-agent/10.1-add-custom-voice',
                  ],
                },
                'cloud/tuya-cloud/ai-agent/database',
                {
                  type: 'category',
                  label: 'Triggers',
                  collapsed: true,
                  items: [
                    'cloud/tuya-cloud/ai-agent/agent-trigger-index',
                    'cloud/tuya-cloud/ai-agent/12.1-how-to-write-promts',
                  ],
                },
                {
                  type: 'category',
                  label: 'MCP Services',
                  collapsed: true,
                  items: [
                    'cloud/tuya-cloud/ai-agent/mcp-management',
                    'cloud/tuya-cloud/ai-agent/13.1-custom-mcp-services',
                  ],
                },
                {
                  type: 'category',
                  label: 'Agent OpenAPIs & Chat',
                  collapsed: true,
                  items: ['cloud/tuya-cloud/ai-agent/agent-openapis', 'cloud/tuya-cloud/ai-agent/14.1-chat-with-agent'],
                },
              ],
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------

    {
      type: 'html',
      value:
        '<div class="sidebar-divider"><span class="sidebar-divider-en">👨🏻‍💻 TuyaOpen SDKs</span><span class="sidebar-divider-zh">👨🏻‍💻 TuyaOpen SDK 套件</span></div>',
      defaultStyle: false,
    },
    {
      type: 'category',
      label: 'AI App SDKs',
      collapsed: true,
      items: [
        'applications/tuya.ai/ai-components/ai-components',
        'applications/tuya.ai/ai-components/ai-main',
        'applications/tuya.ai/ai-components/ai-agent',
        'applications/tuya.ai/ai-components/ai-skill',
        'applications/tuya.ai/ai-components/ai-audio-input',
        'applications/tuya.ai/ai-components/ai-audio-player',
        'applications/tuya.ai/ai-components/ai-video-input',
        {
          type: 'category',
          label: 'Chat Mode Management',
          collapsed: false,
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
          label: 'GUI',
          collapsed: false,
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
        'applications/tuya.ai/ai-components/ai-mcp-server',
        'applications/tuya.ai/ai-components/ai-mcp-tools',
      ],
    },
    {
      type: 'category',
      label: 'System APIs',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'OS APIs',
          collapsed: false,
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

        {
          type: 'category',
          label: 'Networking',
          collapsed: false,
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
      label: 'Hardware Interface APIs',
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
      items: ['tos-tools/tos-guide', 'tos-tools/tools-tyutool'],
    },
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Build System',
      collapsed: true,
      items: ['build-system/compilation-guide'],
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
