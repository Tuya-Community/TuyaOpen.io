module.exports = {
  docs: [
    // ------------------------------------------------------------------
    'about-tuyaopen',
    'project-walkthrough',
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
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
    // ------------------------------------------------------------------
    // {
    //   type: 'category',
    //   label: 'Advanced Use',
    //   collapsed: true,
    //   items: [
    //     'advanced-use/terminologies',
    //   ],
    // },
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
          label: 'T5-AI Board DevKit',
          collapsed: false,
          items: ['hardware-specific/t5-ai-board/overview-t5-ai-board'],
        },
      ],
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
          collapsed: false,
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
            {
              type: 'category',
              label: 'AI App Components',
              collapsed: false,
              items: ['applications/tuya.ai/ai-components/ai-audio-asr-impl'],
            },
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
      items: ['new-hardware/new-platform', 'new-hardware/new-board', 'new-hardware/new-project'],
    },
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'TKL APIs',
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
          label: 'Hardware Interfaces',
          collapsed: false,
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
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Tos Tools',
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
    // ------------------------------------------------------------------
    'faqs/faqs',
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
