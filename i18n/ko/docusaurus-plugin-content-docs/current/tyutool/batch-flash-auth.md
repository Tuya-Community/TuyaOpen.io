---
title: 배치 섬광 & Auth
description: "tyutool 배치 번쩍이는 및 허가의 개요 - 플래시 펌웨어 및 .xlsx 시트에 의해 구동 병렬에 많은 장치에 저자화 코드를 작성합니다."
keywords:
  - tyutool batch
  - batch flashing
  - batch authorization
  - otp
  - parallel flashing
  - tuyaopen
---

import FeatureCardGrid from '@site/src/components/FeatureCardGrid';

여러 개의 직렬 포트 및 ** 플래시 펌웨어 + 병렬에서 권한 코드를 작성 **, 권한 코드가 구동`.xlsx`시트. 이것은 tyutool에 있는 가장 복잡한 특징입니다; 저장 형태가 ** OTP**에 놓일 때, 그것은 무능한 eFuse 가동 (T5AI 전용)를 실행합니다.

:::note[그것을 찾아내는 방법]
바탕 화면 앱에서이 기능은 **Toolbox → Batch Flash & Auth**에서 살아 있습니다.
:::

## 자주 묻는 질문
이 기능은 2개의 분리된 가이드와 더불어 사람들의 2개의 아주 다른 종류 포함합니다:

<FeatureCardGrid
  columns={2}
  items={[
    { icon: '🧑‍💻', title: 'I am a firmware developer', description: 'The UART CLI protocol contract and self-test checklist.', href: '/docs/tyutool/batch-auth-developer' },
    { icon: '🛠️', title: 'I am a flashing operator', description: 'Pure operation, no technical detail — the do-it-in-order workflow.', href: '/docs/tyutool/batch-auth-operator' },
  ]}
/>

## 이 가이드 표지
그들 사이, 두 가이드 덮개:

- 사전 Flight checklist 및 개발자 ↔ 연산자 구성 Handoff
- 런을 시작하고, 읽는 per-slot 결과
- 완료된 배치 및 문제 해결 실패를 설계
- UART CLI 프로토콜은 일괄 처리 가능
- KV vs. OTP 저장 모드, 그리고 안전 규칙에 반대할 수없는 OTP 쓰기

:::danger[가장 중요한 안전 참고]
저장 모드가 **OTP ** (T5AI 만)일 때, 허가 코드는 한 번 칩으로 태우고 **가 지우거나 변경 될 수 있습니다 - 한 개의 잘못된 구성은 전체 배치를 파괴합니다. 항상 확장하기 전에 단일 장치에 유효합니다. 운영자 가이드 보기[안전 규칙](./batch-auth-operator.md#safety-rules).
:::
