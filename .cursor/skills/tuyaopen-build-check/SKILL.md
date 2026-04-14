---
name: tuyaopen-build-check
description: Verifies TuyaOpen.io Docusaurus documentation builds successfully and catches broken links, MDX syntax errors, and sidebar mismatches. Use when checking if doc changes build correctly, running the dev server, validating sidebar references, or checking i18n builds.
---

# TuyaOpen Build Check

Validates that documentation changes compile and render correctly. Run after every doc change before committing.

## Quick Check (Fast)

Start the dev server for a quick visual check:

```bash
npm run start
```

This serves English docs at `http://localhost:3000`. Check the page you changed. Press `Ctrl+C` to stop.

For Chinese docs:

```bash
npm run start -- --locale zh
```

## Full Build (Required Before Commit)

Run the production build to catch all errors:

```bash
npm run build
```

### What the build catches

| Error type | Symptom | Fix |
|-----------|---------|-----|
| Broken MDX syntax | `Unexpected token` or JSX error | Check for unescaped `<`, `{`, `}` in prose. Wrap in backticks or use HTML entities. |
| Missing frontmatter | `title` required warning | Add `---\ntitle: Page Title\n---` at top of file |
| Broken doc link | `Docs with id 'xxx' not found` | Fix the link path or create the missing doc |
| Sidebar mismatch | `Doc with id 'xxx' not found in sidebar` | Ensure doc ID in `sidebars.js` matches actual file path |
| Missing import | `Component is not defined` | Add the component import (see Common Components below) |
| Duplicate ID | `Doc ID 'xxx' already exists` | Rename one of the conflicting files |

### Build exit codes

- **Exit 0**: Build succeeded. Check `build/` output if needed.
- **Non-zero**: Build failed. Read the error output for file path and line number.

Note: `onBrokenLinks: 'warn'` is configured in `docusaurus.config.js`, so broken links produce warnings but do not fail the build. Treat warnings as errors and fix them.

## i18n Build

Verify Chinese docs build:

```bash
npm run build -- --locale zh
```

Common i18n issues:
- Missing zh mirror file: create it under `i18n/zh/docusaurus-plugin-content-docs/current/`
- **Untranslated sidebar labels** (zh UI still shows English): add keys in `i18n/zh/docusaurus-plugin-content-docs/current.json` for every new or renamed `label` in `sidebars.js`. Key patterns: `sidebar.docs.category.*`, `sidebar.docs.link.*`, `sidebar.docs.doc.*`. See `tuyaopen-doc-planner` → **Sidebar label i18n (Chinese)**.
- MDX syntax that works in en but breaks in zh (e.g., different component imports)

After sidebar edits, spot-check zh: `npm run start -- --locale zh` and open the docs sidebar, or run `npm run build` (all locales).

## Common Components

These JSX components are used in docs and must be imported or available via MDX scope:

| Component | Where used | Import needed? |
|-----------|-----------|----------------|
| `<BackToProjects />` | `docs/projects/*.md` | No (registered in MDXComponents) |
| `<SyncedTabs>` | `docs/quick-start/enviroment-setup.md` | Check if registered |
| `<ChipRow>` | `docs/hardware-specific/index.md` | Check if registered |
| `<SpecsTable>` | Hardware overview pages | Check if registered |

MDX components are registered in `src/theme/MDXComponents/`.

## Sidebar Validation

After adding or moving docs, verify sidebar references:

1. Every doc ID in `sidebars.js` must have a corresponding `.md` file under `docs/`.
2. The doc ID is the file path relative to `docs/` without the `.md` extension.
3. Example: `'quick-start/unboxing'` -> file at `docs/quick-start/unboxing.md`.
4. If you changed any **`label`** (category, link, or custom doc label), confirm **`i18n/zh/docusaurus-plugin-content-docs/current.json`** includes the new keys (`tuyaopen-doc-planner` → Sidebar label i18n).

To find orphaned sidebar entries (IDs with no file):

```bash
# Extract doc IDs from sidebars.js, then check each file exists
grep -oP "'[a-zA-Z0-9/_.-]+'" sidebars.js | tr -d "'" | while read id; do
  [ ! -f "docs/${id}.md" ] && echo "MISSING: docs/${id}.md"
done
```

## Link Checker

The repo has `mlc_config.json` for markdown-link-check. If the tool is installed:

```bash
npx markdown-link-check docs/path/to/changed-file.md -c mlc_config.json
```

## Pre-Commit Checklist

Run these checks in order before committing doc changes:

1. **Lint edited files**: Use ReadLints on changed `.md` files
2. **Full build**: `npm run build` exits 0
3. **Warnings review**: Check build output for broken link warnings
4. **Sidebar zh labels** (if `sidebars.js` changed): confirm `i18n/zh/docusaurus-plugin-content-docs/current.json` has keys for every category/link/custom-doc label (`tuyaopen-doc-planner` → Sidebar label i18n)
5. **i18n build** (if zh files changed): `npm run build -- --locale zh`
6. **Visual spot-check**: `npm run start`, navigate to changed pages (use `--locale zh` if sidebar labels were edited)

## Troubleshooting

### "Cannot find module" during build

```bash
npm install
```

### Build hangs or runs out of memory

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Mermaid diagram not rendering

- Verify `markdown.mermaid: true` in `docusaurus.config.js` (already configured).
- Check diagram syntax: no spaces in node IDs, no unescaped special chars in labels.
- Wrap labels with special characters in double quotes.
