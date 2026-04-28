# TuyaOpen.io Documentation Directory Map

Current structure of `docs/` and related paths. Keep this updated when docs are added or moved.

## docs/ tree

```
docs/
├── about-tuyaopen.md
├── maintenance-and-releases.md
├── project-walkthrough.md
├── advanced-use/
│   └── terminologies.md
├── applications/
│   ├── index.md
│   ├── tuya.ai/
│   │   ├── application-development-guide.md
│   │   ├── demo-your-chat-bot.md
│   │   ├── demo-duo-eyes-mood.md
│   │   └── ai-components/
│   │       ├── ai-components.md
│   │       ├── ai-main.md
│   │       ├── ai-agent.md
│   │       ├── ai-skill.md
│   │       ├── ai-audio-input.md
│   │       ├── ai-audio-player.md
│   │       ├── ai-video-input.md
│   │       ├── ai-mode-manage.md
│   │       ├── ai-mode-hold.md
│   │       ├── ai-mode-oneshot.md
│   │       ├── ai-mode-wakeup.md
│   │       ├── ai-mode-free.md
│   │       ├── ai-ui-manage.md
│   │       ├── ai-ui-chat-wechat.md
│   │       ├── ai-ui-chat-chatbot.md
│   │       ├── ai-ui-chat-oled.md
│   │       ├── ai-mcp-server.md
│   │       └── ai-mcp-tools.md
│   └── tuya_cloud/
│       └── demo-tuya-iot-light.md
├── build-system/
│   └── compilation-guide.md
├── cloud/
│   └── tuya-cloud/
│       ├── creating-new-product.md
│       └── ai-agent/
│           ├── index.md
│           ├── ai-agent-dev-platform.md
│           ├── workflow-management.md
│           ├── variables-management.md
│           ├── role-management.md
│           ├── agent-evaluation.md
│           ├── self-control-commands.md
│           ├── ai-product-commands.md
│           ├── supported-languages-and-voice-variants.md
│           ├── 10.1-add-custom-voice.md
│           ├── database.md
│           ├── agent-trigger-index.md
│           ├── 12.1-how-to-write-promts.md
│           ├── mcp-management.md
│           ├── 13.1-custom-mcp-services.md
│           ├── agent-openapis.md
│           └── 14.1-chat-with-agent.md
├── contribute/
│   ├── contribute-guide.md
│   ├── coding-style-guide.md
│   └── template/
│       ├── markdown-syntax.md
│       ├── concept_template.md
│       ├── development_guide_template.md
│       ├── faq_template.md
│       ├── operation_guide-template.md
│       └── README-template.md
├── duckyclaw/
│   ├── ducky-quick-start-T5AI.md
│   ├── ducky-quick-start-raspberry-pi-5.md
│   ├── ducky-quick-start-ESP32S3.md
│   └── custom-device-mcp.md
├── examples/
│   └── demo-generic-examples.md
├── faqs/
│   ├── faqs.md
│   └── get-developer-license.md
├── hardware-specific/
│   ├── index.md
│   ├── tuya-t5/
│   │   ├── t5ai-peripheral-mapping.md
│   │   ├── t5-ai-board/
│   │   │   └── overview-t5-ai-board.md
│   │   ├── t5-ai-core/
│   │   │   └── overview-t5-ai-core.md
│   │   └── develop-with-Arduino/
│   │       ├── Introduction.md
│   │       ├── Quick_start.md
│   │       ├── Application.md
│   │       ├── AI_API_Development.md
│   │       ├── Arduino_Library.md
│   │       ├── Peripheral_Development.md
│   │       └── Pinmux.md
│   └── Linux/
│       ├── DshanPi-A1/
│       │   └── Applications/
│       │       └── your-chat-bot-on-dshanpi-a1.md
│       └── raspberry-pi/
│           ├── Applications/
│           │   └── your-chat-bot-on-raspberry-pi.md
│           ├── Examples/
│           │   ├── raspberry-pi.md
│           │   └── peripherals-raspberry-pi.md
│           └── Troubleshooting/
│               └── wifi-bluetooth.md
├── images/
│   └── (doc-embedded images by topic)
├── new-hardware/
│   ├── porting-platform.md
│   ├── new-platform.md
│   ├── new-board.md
│   └── new-project.md
├── peripheral/
│   ├── support_peripheral_list.md
│   ├── display.md
│   ├── audio.md
│   └── button.md
├── projects/
│   ├── template-project.md
│   └── (dated project pages)
├── quick-start/
│   ├── index.md
│   ├── unboxing.md
│   ├── enviroment-setup.md
│   ├── project-compilation.md
│   ├── firmware-burning.md
│   ├── equipment-authorization.md
│   ├── device-network-configuration.md
│   └── device-debug.md
├── tkl-api/
│   ├── tkl_adc.md
│   ├── tkl_bluetooth.md
│   ├── tkl_dac.md
│   ├── tkl_flash.md
│   ├── tkl_gpio.md
│   ├── tkl_i2c.md
│   ├── tkl_i2s.md
│   ├── tkl_lwip.md
│   ├── tkl_mutex.md
│   ├── tkl_network.md
│   ├── tkl_ota.md
│   ├── tkl_output.md
│   ├── tkl_pinmux.md
│   ├── tkl_pwm.md
│   ├── tkl_register.md
│   ├── tkl_rtc.md
│   ├── tkl_semaphore.md
│   ├── tkl_spi.md
│   ├── tkl_system.md
│   ├── tkl_thread.md
│   ├── tkl_timer.md
│   ├── tkl_uart.md
│   ├── tkl_wakeup.md
│   ├── tkl_wifi.md
│   └── tkl_wired.md
└── tos-tools/
    ├── tos-guide.md
    └── tools-tyutool.md
```

## Related paths

| Path | Purpose |
|------|---------|
| `i18n/zh/docusaurus-plugin-content-docs/current/` | Chinese doc mirror (same structure as docs/) |
| `i18n/zh/docusaurus-plugin-content-blog/` | Chinese blog posts |
| `blog/` | English blog posts |
| `src/data/projects.js` | Project card registry (en + zh arrays) |
| `src/data/projects_tags.js` | Tag definitions for projects |
| `sidebars.js` | Sidebar structure (doc IDs and categories) |
| `docusaurus.config.js` | Redirects under plugin-client-redirects |
| `static/img/` | Static images |
| `docs/images/` | Doc-embedded images |

## Sidebar sections (quick reference)

1. Top-level: about-tuyaopen, maintenance-and-releases, project-walkthrough
2. DuckyClaw: duckyclaw/*
3. Getting Started: quick-start/*
4. Hardware Guides: hardware-specific/*
5. Applications: applications/*
6. Examples: examples/*
7. Peripherals: peripheral/*
8. New Project: new-hardware/*
9. Cloud Services: cloud/tuya-cloud/*
10. AI App SDKs: applications/tuya.ai/ai-components/*
11. System APIs: tkl-api/* (OS)
12. Hardware Interface APIs: tkl-api/* (gpio, spi, etc.)
13. Arduino IDE: hardware-specific/tuya-t5/develop-with-Arduino/*
14. Developer Tools: tos-tools/*, build-system/*
15. FAQs: faqs/*
16. Contribute: contribute/*
