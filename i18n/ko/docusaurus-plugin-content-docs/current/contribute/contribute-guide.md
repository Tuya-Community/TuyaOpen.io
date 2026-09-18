---
title: 기여 가이드
description: "GitHub Fork 및 Pull Request 워크플로를 통해 TuyaOpen에 기여하는 방법을 설명합니다. 변경, 준비, CLA, PR 제출 및 병합 규칙을 다룹니다."
keywords:
  - 기여 가이드
  - Pull Request
  - GitHub
  - CLA
  - TuyaOpen
---

[TuyaOpen](https://github.com/tuya/TuyaOpen)은 GitHub의 Fork 및 [Pull Request](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) 워크플로를 통해 기여할 수 있습니다. 버그 수정, 문서 개선 및 새 기능을 기여할 수 있습니다.

## 변경 사항 만들기
1. 로컬 PC에 git 도구를 설치합니다.
2. TuyaOpen 저장소를 GitHub 계정으로 Fork합니다.
3. `git clone`으로 Fork한 저장소를 복제합니다.
4. `git checkout -b <BranchName>`으로 로컬 개발 브랜치를 만듭니다.
5. 로컬에서 코드 또는 문서를 수정합니다.
6. 변경 사항을 GitHub 저장소에 Push합니다.

## 준비
1. 기여 내용이 Apache License 2.0 요구 사항을 준수하는지 확인합니다.
2. [TuyaOpen 코딩 표준](./coding-style-guide.md)을 따르는지 확인합니다.
3. 새 기능에는 문서와 예제를 제공합니다.
4. 문서가 [작성 표준](./contribute-guide.md)을 충족하는지 확인합니다.
5. 서로 관련된 변경은 별도의 Pull Request로 그룹화합니다.
6. 보드 포팅은 [칩 포팅 가이드](../hardware/porting/new-platform.md)를 따라야 합니다.

## Pull Request 제출
1. GitHub에서 Fork한 저장소로 이동합니다.
2. 개발 브랜치에서 **New pull request**를 클릭합니다.
3. 최초 기여자는 Contributor License Agreement(CLA)에 서명해야 합니다.
4. CI 시스템이 자동으로 빌드 테스트를 실행합니다.
5. 유지 관리자가 PR을 검토하고 피드백을 제공합니다.
6. 리뷰 의견을 반영하고 PR을 업데이트합니다.
7. 승인된 PR은 메인 저장소에 병합됩니다.

이로써 기여 절차가 완료됩니다.
