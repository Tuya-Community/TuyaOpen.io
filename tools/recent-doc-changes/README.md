# Recent doc changes list

This tool scans both **en** (`docs/`) and **zh** (`i18n/zh/docusaurus-plugin-content-docs/current/`) docs, uses the latest commit (by time) across either locale per logical doc path, and writes a CSV of recent changes.

## Usage

From the repo root:

```bash
python3 tools/recent-doc-changes/gen_recent_doc_changes.py
```

- Prints each doc path (logical path) to stdout.
- Writes `tools/recent-doc-changes/recent_doc_changes.csv`.

## CSV columns

| Column       | Description |
|-------------|-------------|
| name        | Basename of the doc (filename without `.md`) |
| path        | Logical doc path (e.g. `quick-start/equipment-authorization.md`) |
| subfolder   | Sidebar path from `sidebars.js` (category hierarchy, e.g. `DuckyClaw / Quick Start`) |
| last_time   | Last commit date/time (ISO-style) for this doc (en or zh, whichever is newer) |
| last        | Full commit hash of that commit |
| github link | URL to the commit on GitHub |
| owner           | Git commit author: `Name <email>` |
| latest_3_times  | Latest 3 commit times for this doc, separated by ` \| ` |
| latest_3_links  | GitHub commit links for those 3 commits, separated by ` \| ` |

En and zh versions of the same doc are merged into one row; the row uses the commit that is latest by time between the two files. The **subfolder** column is derived from the category nesting in `sidebars.js` (run requires Node.js to parse the sidebar).
