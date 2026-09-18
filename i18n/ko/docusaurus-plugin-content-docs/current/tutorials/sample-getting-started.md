제품 정보 이 파일은 ** Markdown 부분 ** (그 이름은 `_`로 시작, 그래서
Docusaurus는 독립 doc 페이지로 턴하지 않습니다. 더 보기
`/tutorials/markdown-template` 페이지 가져 오기 및 공유 내부 렌더링
튜토리얼 쉘, 그래서 대화 형 튜토리얼과 같은 스타일링을 선택합니다.

## 당신은 무료로 얻을
포탄이 공유한 `markdown` 몸 작풍, 정규적인 Markdown를 적용합니다
단지 일하고 일관되게 손 붙박이 페이지에 체재하십시오:

- 제목, 단락 및 목록
- 링크, 같은 [TuyaOpen 저장소](https://github.com/tuya/TuyaOpen)
- 인라인 `code` 및 담합 코드 블록
- 표, blockquotes 및 이미지

## 코드 블록
```bash
# Clone and build your first firmware
git clone https://github.com/tuya/TuyaOpen
cd TuyaOpen
. ./export.sh
tos build
```

## 작은 테이블
|칩 칩|제품정보|지원하다|
| -------- | --------------- | ------------------------ |
|T5AI를|Wi-Fi + BLE|주력 AI dev 보드|
|· BK7231N|Wi-Fi + BLE|낮은 비용 combo|
|ESP32를|Wi-Fi + BLE|사용 가능|

> **팁:** 튜토리얼 prose task-focused를 유지하십시오. 독자가 무엇을 할지 지도,
> 그런 다음 정확한 명령을 표시합니다.

## 다음 단계
1. `docs/tutorials/_your-tutorial.md`에 이 파일을 복사합니다.
2. 페이지를 점 (KEPTERM1X 참조).
3. `src/data/tutorials.js`에 등록하십시오.

완료되면, 카드는 [Tutorials hub](/tutorials)에 나타납니다.
당신이 그것을 할당 한 범주.
