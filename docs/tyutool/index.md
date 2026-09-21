---
title: TuyTool Documentation — Commands & Workflows
description: "Reference for TuyTool — the commands and workflows for building, flashing, and managing TuyaOpen devices from the command line."
keywords:
  - tuytool docs
  - tuyaopen cli guide
  - tos commands
  - firmware tool docs
---

import FeatureCardGrid from '@site/src/components/FeatureCardGrid';

## Welcome

tyutool is a desktop GUI and command-line tool for flashing firmware, serial debugging, and batch authorization of Tuya ecosystem IoT devices.

:::note[New here?]
If this is your first time, start with [Getting Started](./getting-started.md) — a 5–10 minute linear walkthrough from download to your first successful flash.
:::

## Feature guide

Explore each capability below:

<FeatureCardGrid
  items={[
    { icon: '⚡', title: 'Firmware Flash', description: 'Flash, read, and erase the flash chip.', href: '/docs/tyutool/flash' },
    { icon: '🖥️', title: 'Serial Debug', description: 'Send and receive serial data in real time and inspect device logs.', href: '/docs/tyutool/serial-debug' },
    { icon: '⚙️', title: 'Settings', description: 'Configure update, appearance, diagnostics, and log options.', href: '/docs/tyutool/settings' },
    { icon: '🏭', title: 'Batch Flash & Auth', description: 'Flash firmware and write authorization codes to many devices in parallel.', href: '/docs/tyutool/batch-flash-auth' },
    { icon: '⌨️', title: 'Command Line', description: 'The complete tyutool CLI reference.', href: '/docs/tyutool/cli' },
    { icon: '❓', title: 'FAQ', description: 'Symptom-first troubleshooting and fixes.', href: '/docs/tyutool/faq' },
  ]}
/>
