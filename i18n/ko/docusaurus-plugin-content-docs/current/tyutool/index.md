---
title: tyutool V3 사용법 가이드
description: "tyutool에 오신 것을 환영합니다. 데스크톱 GUI 및 명령 줄 도구는 번쩍이고 직렬 디버깅 및 Tuya 생태계 IoT 장치의 일괄 승인."
keywords:
  - tyutool
  - v3 usage guide
  - flashing
  - serial debug
  - batch authorization
  - tuyaopen
---

import FeatureCardGrid from '@site/src/components/FeatureCardGrid';

## 제품 정보
tyutool는 Tuya 생태계 IoT 장치의 플래시 펌웨어, 직렬 디버깅 및 일괄 승인을위한 데스크탑 GUI 및 명령 라인 도구입니다.

:::note[현재]
처음이면 시작[시작하기](./getting-started.md)— a 5–10 분 선형 walkthrough from download to your first successful flash.
:::

## 회사연혁
아래 각 기능을 살펴보십시오:

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
