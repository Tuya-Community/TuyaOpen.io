---
name: tuyaopen-doc-planner
description: Plans where TuyaOpen.io documentation should live, manages file paths and sidebar placement, and prevents URI breakage. Use when creating new docs, moving or renaming docs, updating sidebars.js, or planning documentation structure for TuyaOpen.io.
---

# TuyaOpen Doc Planner

Plans documentation placement, manages sidebar integration, and preserves existing URIs. Read this before creating, moving, or renaming any doc.

## Placement Decision Rules

When deciding where a new doc goes, follow this priority chain:

```
Is it platform-specific?
  YES -> docs/hardware-specific/{platform}/
  NO  -> Is it a full application demo?
    YES -> docs/applications/{area}/
    NO  -> Is it a focused code example?
      YES -> docs/examples/
      NO  -> Is it a peripheral/driver doc?
        YES -> docs/peripheral/
        NO  -> Is it about Tuya Cloud / AI Agent?
          YES -> docs/cloud/tuya-cloud/
          NO  -> Is it a community project?
            YES -> docs/projects/YYYY-MM-DD-slug.md
            NO  -> Is it a blog post?
              YES -> blog/YYYY-MM-DD-slug.md
              NO  -> Is it an API reference?
                YES -> docs/tkl-api/
                NO  -> Does it fit an existing category?
                  YES -> Place in that category
                  NO  -> Propose new category to user
```

### Platform-specific vs Shared

A doc is **platform-specific** if its steps, config, or hardware only apply to one board family. Examples:
- T5AI-Core pinout -> `docs/hardware-specific/tuya-t5/t5-ai-core/`
- Raspberry Pi Wi-Fi troubleshooting -> `docs/hardware-specific/Linux/raspberry-pi/Troubleshooting/`
- Arduino IDE on T5 -> `docs/hardware-specific/tuya-t5/develop-with-Arduino/`

A doc is **shared** if the same steps work across platforms (e.g., `tos.py build` workflow, generic GPIO example using TKL abstraction). Place shared docs in `docs/examples/`, `docs/applications/`, or `docs/peripheral/`.

### Specific Placement Rules

| Content type | Path pattern | Example |
|-------------|-------------|---------|
| App demo (cloud) | `docs/applications/tuya_cloud/` | `demo-tuya-iot-light.md` |
| App demo (AI) | `docs/applications/tuya.ai/` | `demo-your-chat-bot.md` |
| AI SDK component | `docs/applications/tuya.ai/ai-components/` | `ai-agent.md` |
| Generic example | `docs/examples/` | `demo-generic-examples.md` |
| Peripheral driver | `docs/peripheral/` | `display.md`, `audio.md` |
| TKL API reference | `docs/tkl-api/` | `tkl_gpio.md` |
| Cloud AI Agent | `docs/cloud/tuya-cloud/ai-agent/` | `workflow-management.md` |
| Hardware guide | `docs/hardware-specific/{platform}/` | nested by board |
| Arduino IDE | `docs/hardware-specific/tuya-t5/develop-with-Arduino/` | `Quick_start.md` |
| Porting/new platform | `docs/new-hardware/` | `porting-platform.md` |
| Build system | `docs/build-system/` | `compilation-guide.md` |
| Tools | `docs/tos-tools/` | `tos-guide.md` |
| Project page | `docs/projects/YYYY-MM-DD-slug.md` | also register in `src/data/projects.js` |
| Blog post | `blog/YYYY-MM-DD-slug.md` | also add author/tags if new |
| FAQ | `docs/faqs/` | `faqs.md` |
| Contributing | `docs/contribute/` | `contribute-guide.md` |
| Future (MiniApp, etc.) | `docs/{new-category}/` | propose sidebar section |

## Sidebar Integration

The sidebar is defined in `sidebars.js` (root of repo). It has 12 major sections separated by HTML dividers:

1. Top-level pages (about, releases, walkthrough)
2. DuckyClaw
3. Getting Started (quick-start/*)
4. Hardware Guides (hardware-specific/*)
5. Apps & Examples (applications/*, examples/*, peripheral/*, new-hardware/*)
6. Cloud Agent Docs (cloud/tuya-cloud/*)
7. TuyaOpen SDKs (AI App SDKs: applications/tuya.ai/ai-components/*)
8. System APIs (tkl-api/* OS + networking)
9. Hardware Interface APIs (tkl-api/* gpio, spi, etc.)
10. Arduino IDE (hardware-specific/tuya-t5/develop-with-Arduino/*)
11. Developer Tools (tos-tools/*, build-system/*)
12. Other (faqs/*, contribute/*)

### Adding a new doc to sidebar

1. Determine the correct section from the list above.
2. Use the doc ID (path without `.md` extension, relative to `docs/`).
3. For nested categories, add to the `items` array of the correct category object.
4. If creating a new category, follow the existing pattern:
   ```js
   {
     type: 'category',
     label: 'Category Name',
     collapsed: true,
     items: ['path/to/doc-id'],
   }
   ```
5. For top-level section dividers, use the HTML pattern with en/zh spans.

## URI Preservation Protocol

**Before any rename or move:**

1. **Search for all references** to the old path:
   - `docs/**/*.md` (links in other docs)
   - `i18n/zh/docusaurus-plugin-content-docs/current/**/*.md`
   - `sidebars.js` (doc IDs)
   - `src/data/projects.js` (markdownFile paths)
   - `src/pages/*.js` (any hardcoded links)
   - `docusaurus.config.js` (redirects, navbar)

2. **Update all references** to the new path in the same change set.

3. **Add a redirect** in `docusaurus.config.js` under `@docusaurus/plugin-client-redirects`:
   ```js
   {
     from: '/docs/old-path',
     to: '/docs/new-path',
   }
   ```

4. **Prefer not moving.** If a doc is in a reasonable location, leave it. Only move for strong structural reasons.

## i18n Mirror Protocol

Every doc under `docs/` should have a Chinese counterpart at:
```
i18n/zh/docusaurus-plugin-content-docs/current/{same-relative-path}
```

When creating a new doc:
1. Write the English version first under `docs/`.
2. Create the zh version at the mirror path with translated content.
3. Keep file names identical (English names, not translated).
4. Frontmatter `title:` should be translated in the zh version.
5. All code blocks, commands, paths remain in English.

When moving/renaming:
- Move both the en and zh files.
- Update `i18n/zh/docusaurus-plugin-content-docs/current.json` if sidebar labels changed.

## File Naming Conventions

- Lowercase with hyphens: `my-new-guide.md` (not `MyNewGuide.md` or `my_new_guide.md`)
- Project pages: `YYYY-MM-DD-project-slug.md`
- Blog posts: `YYYY-MM-DD-slug.md`
- API docs: `tkl_{module}.md` (matching the C header name)
- No spaces in file names or paths.

## Project Page Checklist

When adding a project page:
1. Create `docs/projects/YYYY-MM-DD-slug.md` with `<BackToProjects />` at top
2. Register in `src/data/projects.js` (both `en` and `zh` arrays)
3. Add image to `static/img/` or use external URL
4. Use tags from `src/data/projects_tags.js`

## Current Directory Map

For the full directory tree of the docs structure, see [directory-map.md](directory-map.md).
