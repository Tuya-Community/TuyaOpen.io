---
name: tuyaopen-technical-writer
description: Enforces unified writing style for TuyaOpen.io Docusaurus documentation across all doc types and audiences. Use when writing, editing, reviewing, or planning any doc, blog post, or project page for TuyaOpen. Covers tone, structure, audience targeting, i18n, mermaid usage, and image guidelines.
---

# TuyaOpen Technical Writer

Applies unified writing standards for all TuyaOpen.io documentation. Read this before writing or editing any doc.

## Doc Type Decision

Pick one type per doc. Do not mix types.

| Type | Purpose | Tone | Depth |
|------|---------|------|-------|
| **Guide** | Step-by-step task completion | Direct, imperative | Numbered steps, expected outcome |
| **API Reference** | Describe function signatures, params, returns | Neutral, precise | Signature + table + example per API |
| **Tutorial** | Teach a concept through building | Conversational but focused | Progressive steps with explanation |
| **Reference** | Lookup tables, config options, term definitions | Terse, scannable | Tables and lists, minimal prose |
| **Help/FAQ** | Answer specific problems | Empathetic, solution-first | Problem -> Cause -> Fix |

Use the matching template from `docs/contribute/template/` as the starting skeleton. Remove template guidance text in the final doc.

## Audience Targeting

TuyaOpen docs serve four reader profiles. Every doc implicitly targets one or two. Adjust depth accordingly.

| Audience | Emphasize | De-emphasize |
|----------|-----------|--------------|
| **Maker** | Wiring, flashing, quick results, photos | Architecture, API internals |
| **Developer** | API signatures, code flow, config options | Basic electronics, unboxing |
| **Student** | Concepts first, progressive complexity, links to prerequisites | Advanced optimization, production concerns |
| **Professional** | Integration patterns, scalability, security, cloud | Step-by-step basics |

**Default target: Developer.** When a doc is "for developers," make it tight and code-first. Lead with what the API does, show a minimal working example, then cover options. Do not over-explain obvious parameters.

## Writing Rules

### Conciseness

- One main topic per doc. Split if it covers two distinct areas.
- Overview: 1-3 sentences max. State what and who.
- Paragraphs: 3-5 lines. One idea per sentence.
- Prefer lists and tables over prose for options, requirements, or comparisons.
- Do not repeat content from other docs. Link to the canonical page.

### Voice and Tone

- Second person ("you") for the reader.
- First person plural ("we") only for TuyaOpen/the project.
- Active voice, present tense: "Configure the port" not "The port can be configured."
- Professional but approachable. No slang, no hype, no marketing fluff.
- State facts directly. Use "can" or "may" only when conditional.
- No emojis in doc content unless explicitly requested.

### Structure (all doc types)

1. **Title** (frontmatter `title:`)
2. **Overview** (1-3 sentences)
3. **Prerequisites** (if applicable -- link, do not repeat)
4. **Requirements** (hardware/software list -- include license key / 授权码 only for **cloud-dependent application or demo** docs; omit from Embedded Programming guides such as peripherals, memory, TKL/TAL references, Kconfig, and generic protocol tutorials unless the page is explicitly cloud onboarding)
5. **Body** (steps, API tables, concept explanation)
6. **Expected outcome** (for task docs: one sentence stating what happens after the steps)
7. **References / See also** (2-3 links minimum)

### Code Blocks

- Use fenced blocks with correct language tag (`bash`, `c`, `json`, `yaml`).
- Show real paths and commands from the repo (e.g., `cd apps/tuya_cloud/switch_demo`).
- Keep examples minimal and runnable. Strip irrelevant boilerplate.

### Headings

- H2 for main sections, H3 for subsections. Never skip levels.
- Scannable noun phrases or imperatives: "Flash the firmware" not "About flashing."

### Admonitions

Use `:::note`, `:::tip`, `:::warning`, `:::danger`. Keep them to 1-3 sentences. Do not put procedures inside admonitions.

## Mermaid Diagrams

Use only when a visual flow or architecture genuinely aids understanding. Rules:

- Maximum 8 nodes. If you need more, simplify or split.
- Prefer flat `flowchart LR` or `flowchart TD`. Avoid deeply nested subgraphs.
- No custom colors or styling (let theme handle it).
- Label edges only when the relationship is non-obvious.
- If a text list explains the flow adequately, skip the diagram.

## Images

- Add images only when they are required and meaningful (wiring diagram, UI screenshot, board photo, architecture diagram).
- Do not add an image to every section.
- If an image is needed but not available, use a placeholder:
  ```markdown
  ![Placeholder: description of what the image should show](/img/placeholder.svg)
  *Figure: Description (image to be added).*
  ```
- Always provide descriptive alt text.

## i18n Workflow

1. **Write English first.** English is the source of truth.
2. **Name everything in English.** File names, doc IDs, sidebar labels, frontmatter titles -- all English-first.
3. **Create zh mirror** under `i18n/zh/docusaurus-plugin-content-docs/current/` with the same relative path.
4. **Sidebar labels (zh):** Changing `sidebars.js` category/link/custom-doc **`label`** strings requires matching entries in **`i18n/zh/docusaurus-plugin-content-docs/current.json`** (`sidebar.docs.category.*`, `sidebar.docs.link.*`, `sidebar.docs.doc.*`). HTML section dividers use en/zh spans in `sidebars.js` + CSS, not `current.json`. Full rules: `tuyaopen-doc-planner` skill → **Sidebar label i18n (Chinese)**.
5. **Use the terminology table** from the workspace rule and `docs/advanced-use/terminologies.md`. Do not invent translations.
6. **Do not translate** terms in the "Do not translate" list (TuyaOpen, TKL, TAL, SDK, API, GPIO, UART, etc.).
7. Match tone in zh: professional, clear, no casual internet slang.

## Terminology Consistency

- Use one term consistently. Do not alternate between synonyms within a doc.
- **Target Chip Platform** = chip/hardware target. **Cloud platform** = Tuya Cloud. Never use "platform" alone.
- **License key / authorization code** only in docs that use Tuya Cloud services.
- Refer to `docs/advanced-use/terminologies.md` for the canonical term list.

## Cross-Platform Awareness

TuyaOpen supports T5AI, T3, T2, ESP32, BK7231X, LN882H, Raspberry Pi, Linux, and more. When writing:

- If content applies to all platforms, place in shared docs (`docs/examples/`, `docs/applications/`).
- If content is platform-specific, place under `docs/hardware-specific/{platform}/`.
- Always state which platforms a feature supports if it is not universal.
- Use `SyncedTabs` component for platform-specific commands (see `docs/quick-start/enviroment-setup.md`).

## Detailed Guidelines

For extended examples per doc type and audience, see [writing-guidelines.md](writing-guidelines.md).
