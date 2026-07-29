---
title: Batch Flash & Auth
description: "Overview of tyutool batch flashing and authorization — flash firmware and write authorization codes to many devices in parallel, driven by an .xlsx sheet."
keywords:
  - tyutool batch
  - batch flashing
  - batch authorization
  - otp
  - parallel flashing
  - tuyaopen
---

import FeatureCardGrid from '@site/src/components/FeatureCardGrid';

Plug several devices into several serial ports and **flash firmware + write authorization codes in parallel**, with the authorization codes driven by an `.xlsx` sheet. This is the most complex feature in tyutool; when the storage mode is set to **OTP**, it performs irreversible eFuse operations (T5AI only).

:::note[Where to find it]
In the desktop app, this feature lives under **Toolbox → Batch Flash & Auth**.
:::

## Choose your guide

This feature involves two very different kinds of people, with two separate guides:

<FeatureCardGrid
  columns={2}
  items={[
    { icon: '🧑‍💻', title: 'I am a firmware developer', description: 'The UART CLI protocol contract and self-test checklist.', href: '/docs/tyutool/batch-auth-developer' },
    { icon: '🛠️', title: 'I am a flashing operator', description: 'Pure operation, no technical detail — the do-it-in-order workflow.', href: '/docs/tyutool/batch-auth-operator' },
  ]}
/>

## What these guides cover

Between them, the two guides cover:

- The pre-flight checklist and the developer ↔ operator configuration handoff
- Wiring, starting a run, and reading per-slot results
- Archiving a completed batch and troubleshooting failures
- The UART CLI protocol a firmware must implement to be batch-authorizable
- KV vs. OTP storage modes, and the safety rules around irreversible OTP writes

:::danger[The most important safety note]
When the storage mode is **OTP** (T5AI only), authorization codes are burned into the chip once and can **never** be erased or changed — one wrong configuration ruins the whole batch. Always validate on a single device before going to scale. See the Operator Guide's [Safety rules](./batch-auth-operator.md#safety-rules).
:::
