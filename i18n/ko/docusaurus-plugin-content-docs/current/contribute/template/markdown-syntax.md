---
title: Markdown 문법 빠른 가이드
---

# Docusaurus 문서에서 Markdown 문법 사용
Docusaurus는 **Markdown**을 기본 콘텐츠 작성 형식으로 사용하고 MDX 컴파일러를 통해 Markdown 파일을 React 컴포넌트로 컴파일합니다. 이 문서는 자주 사용하는 Markdown 문법과 Docusaurus에서의 사용 방법을 소개합니다.

## 1. 제목
첫 번째 수준 제목에는 `#`, 두 번째 수준에는 `##`을 사용하는 식으로 작성합니다.

```markdown
# First-level heading
## Second-level heading
### Third-level heading
```

## 2. 강조
- **굵게**: `**bold**` 또는 `__bold__`
- _기울임꼴_: `*italic*` 또는 `_italic_`

## 3. 링크 및 이미지
- 링크: `[Docusaurus 공식 사이트](https://docusaurus.io/)`
- 이미지: `![Image description](/img/docusaurus.png)`

## 4. 코드 블록
세 개의 백틱으로 코드를 감쌉니다. 문법 강조를 위해 언어를 지정할 수 있습니다.

````markdown
```js
console.log('Hello, Docusaurus!');
```
````

예제:
```js
console.log('Hello, Docusaurus!');
```

## 5. 인용문
인용문에는 `>`를 사용합니다.

```markdown
> This is a blockquote.
```

예제:
> 인용문입니다.

## 6. Details
Docusaurus에서는 `<details>`와 같은 HTML 요소를 삽입할 수 있습니다.

```markdown
<details>
  <summary>Click to expand</summary>
  Here is the detailed content, which can include **Markdown** syntax.
</details>
```

예제:
<details>
  <summary>펼치려면 클릭</summary>
  여기에 **Markdown** 문법을 포함한 상세 내용을 작성할 수 있습니다.
</details>

## 7. Front Matter
각 Markdown 파일의 맨 위에는 YAML 형식의 메타데이터를 세 개의 대시로 감싸 작성할 수 있습니다.

```markdown
---
title: Document Title
description: This is the document description
---
```

## 8. MDX와 CommonMark
- Docusaurus v3는 기본적으로 모든 `.md` 및 `.mdx` 파일에 MDX 파서를 사용하므로 Markdown에 React 컴포넌트를 직접 삽입할 수 있습니다.
- 표준 CommonMark를 사용하려면 `docusaurus.config.js`에서 `markdown.format: 'detect'`를 설정합니다.
- 자세한 내용은 [공식 문서](https://docusaurus.io/docs/markdown-features#mdx-vs-commonmark)를 참고하세요.

## 9. Admonition
````markdown
:::note
Content
:::

# 기타 사용 가능한 유형
[note/tip/info/warning/danger]
````

:::note
Markdown `syntax`를 포함한 **내용**입니다. [이 `api`](#)를 확인하세요.
:::

:::tip
Markdown `syntax`를 포함한 **팁**입니다. [이 `api`](#)를 확인하세요.
:::

:::info
Markdown `syntax`를 포함한 **정보**입니다. [이 `api`](#)를 확인하세요.
:::

:::warning
Markdown `syntax`를 포함한 **경고**입니다. [이 `api`](#)를 확인하세요.
:::

:::danger
Markdown `syntax`를 포함한 **위험 경고**입니다. [이 `api`](#)를 확인하세요.
:::

## 10. Docusaurus 전용 기능
- [Tabs](https://docusaurus.io/docs/markdown-features#tabs), [Admonitions](https://docusaurus.io/docs/markdown-features#admonitions), [수학 방정식](https://docusaurus.io/docs/markdown-features#math-equations) 및 기타 확장 문법을 지원합니다.
- MDX를 통해 React 컴포넌트를 문서에 직접 삽입할 수 있습니다.

## 11. 참고
- [Docusaurus 공식 Markdown 기능 문서](https://docusaurus.io/docs/markdown-features)

---

MDX 문법을 시험하려면 [MDX Playground](https://mdxjs.com/playground/)를 사용하세요.
