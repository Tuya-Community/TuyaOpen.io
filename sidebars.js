module.exports = {
  docs: [
    // ------------------------------------------------------------------
    'about-tuyaopen',
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'quick_start/enviroment-setup',
        {
          type: 'category',
          label: 'Other Tools',
          collapsed: true,
          items: [
            'quick_start/flashing-with-windows-graphical-interface',
            'quick_start/flashing-with-command-line-interface',
          ],
        },
        'quick_start/terminologies',
      ],
    },
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Hardware Guides',
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
      label: 'New Hardware Support',
      collapsed: true,
      items: ['new_hardware/adding-new-chip-platform-support', 'new_hardware/adding-new-board-support'],
    },
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Application Demo',
      collapsed: true,
      items: [
        'applications/application-development-guide',
        'applications/demo-generic-examples',
        'applications/demo-tuya-iot-light',
      ],
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
