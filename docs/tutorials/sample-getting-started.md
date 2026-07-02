Welcome! This file is a **Markdown partial** (its name starts with `_`, so
Docusaurus does not turn it into a standalone doc page). The
`/tutorials/markdown-template` page imports it and renders it inside the shared
tutorial shell, so it picks up the same styling as the interactive tutorials.

## What you get for free

Because the shell applies the shared `markdown` body styles, ordinary Markdown
just works and stays consistent with the hand-built pages:

- Headings, paragraphs, and lists
- Links, like the [TuyaOpen repository](https://github.com/tuya/TuyaOpen)
- Inline `code` and fenced code blocks
- Tables, blockquotes, and images

## A code block

```bash
# Clone and build your first firmware
git clone https://github.com/tuya/TuyaOpen
cd TuyaOpen
. ./export.sh
tos build
```

## A small table

| Chip     | Wireless        | Notes                    |
| -------- | --------------- | ------------------------ |
| T5AI     | Wi-Fi + BLE     | Flagship AI dev board    |
| BK7231N  | Wi-Fi + BLE     | Low-cost combo           |
| ESP32    | Wi-Fi + BLE     | Widely available         |

> **Tip:** Keep tutorial prose task-focused. Lead with what the reader will do,
> then show the exact commands.

## Next steps

1. Copy this file to `docs/tutorials/_your-tutorial.md`.
2. Point a page at it (see `src/pages/tutorials/markdown-template.jsx`).
3. Register it in `src/data/tutorials.js` with `kind: 'markdown'`.

When you're done, the card appears on the [Tutorials hub](/tutorials) under the
category you assigned it.
