---
name: tuyaopen-doc-loop
description: Orchestrates the full TuyaOpen documentation automation loop from codebase analysis through planning, writing, building, and committing to feature branches. Use when running the doc workflow cycle, creating doc PRs, managing the agent-plan-workspace, or automating documentation updates for TuyaOpen.io.
---

# TuyaOpen Doc Loop

Orchestrates the documentation automation workflow. This is the main entry point that coordinates all other skills.

## Workspace Files

All planning state lives in `agent-plan-workspace/` (git-ignored, persistent):

| File | Purpose | Updated when |
|------|---------|-------------|
| `PRD.md` | High-level goals, sprint priorities, backlog | Goals change or sprint completes |
| `TODOS.md` | Concrete tasks, completed log, branch registry | Every cycle |
| `IMPROVEMENTS.md` | Expert recommendations for docs and codebase | After analysis passes |

**Rules:** Never create new files or folders in this workspace. Only these three files exist.

## The Loop

Each cycle follows six phases. Execute them in order.

### Phase 1: Discover

1. Read `agent-plan-workspace/PRD.md` for current goals.
2. Read `agent-plan-workspace/TODOS.md` for pending tasks.
3. Read `agent-plan-workspace/IMPROVEMENTS.md` for recommendations.
4. If no pending tasks or PRD is stale:
   - Use `tuyaopen-code-analyzer` skill to scan the SDK for undocumented features.
   - Check for new apps/examples in `TuyaOpen/apps/` and `TuyaOpen/examples/`.
   - Compare existing docs against SDK source to find gaps.

### Phase 2: Plan

1. Select tasks that form a cohesive PR (see PR Sizing below).
2. Use `tuyaopen-doc-planner` skill to determine file paths for new/updated docs.
3. Write concrete tasks to `TODOS.md` under "Active Tasks" if not already there.
4. Verify no path conflicts with existing docs.

### Phase 3: Write

1. Read the `tuyaopen-technical-writer` skill for writing standards.
2. For each doc task:
   a. Create/edit the English doc under `docs/`.
   b. Create/edit the Chinese mirror under `i18n/zh/docusaurus-plugin-content-docs/current/`.
   c. Update `sidebars.js` if adding new docs. If any sidebar **`label`** is new or renamed, add or update **`i18n/zh/docusaurus-plugin-content-docs/current.json`** (`tuyaopen-doc-planner` → **Sidebar label i18n (Chinese)**).
   d. Update `src/data/projects.js` if adding project pages.
   e. Add redirects in `docusaurus.config.js` if moving docs.
3. Follow these conventions:
   - English-first naming for all files and IDs.
   - Use doc templates from `docs/contribute/template/`.
   - Include Prerequisites, Requirements, Steps, References for tutorials/examples.
   - Keep docs concise and developer-focused.

### Phase 4: Verify

1. Read the `tuyaopen-build-check` skill.
2. Run `npm run build` and confirm exit 0.
3. If zh files changed, run `npm run build -- --locale zh`.
4. Fix any errors before proceeding.
5. Review build warnings for broken links.
6. Use ReadLints on all edited files.

### Phase 5: Commit and Push

1. Create a feature branch:
   ```bash
   git checkout -b docs/{topic}-{YYYY-MM}
   ```
   Example: `docs/tal-api-reference-2026-04`, `docs/peripheral-examples-2026-04`

2. Stage only doc-related changes:
   ```bash
   git add docs/ i18n/ sidebars.js src/data/projects.js docusaurus.config.js blog/
   ```
   Do NOT stage `agent-plan-workspace/`, `TuyaOpen/`, `DuckyClaw/`, or other non-doc files.

3. Commit with a descriptive message:
   ```bash
   git commit -m "$(cat <<'EOF'
   docs: add TAL Wi-Fi API reference and peripheral examples

   - Add tal_wifi API documentation with all public function signatures
   - Add GPIO and UART peripheral example guides
   - Create zh mirrors for all new docs
   - Update sidebars.js with new entries
   - Update zh sidebar labels in i18n/zh/docusaurus-plugin-content-docs/current.json when labels change
   EOF
   )"
   ```

4. Push to origin. On the **first push** for a new branch, set the upstream:
   ```bash
   git push --set-upstream origin docs/{topic}-{YYYY-MM}
   ```
   On subsequent pushes to the same branch (e.g., after amending or adding commits):
   ```bash
   git push
   ```

5. Record the branch in `TODOS.md` under the Branches table:
   ```markdown
   | docs/tal-api-reference-2026-04 | TAL Wi-Fi API docs + peripheral examples | pushed | 2026-04-13 |
   ```

### Phase 6: Update Workspace

1. In `TODOS.md`:
   - Move completed tasks from "Active Tasks" to "Completed Tasks" with `[x]` prefix.
   - Add any new tasks discovered during this cycle.
2. In `IMPROVEMENTS.md`:
   - Add any new recommendations found during writing (missing code comments, API gaps, etc.).
3. In `PRD.md`:
   - Update sprint status if goals were met.
   - Adjust priorities based on what was learned.
4. Return to Phase 1 for the next cycle (if user requests continuation).

## PR Sizing

Target mid-to-large PRs. Do not submit trivial single-file changes.

**Good PR scope (pick one per cycle):**
- 3-8 related docs (e.g., all peripheral examples for a category)
- 1 substantial doc with full en + zh (e.g., complete API reference for a TAL module)
- A documentation section overhaul (e.g., restructure Getting Started flow)
- New feature documentation set (e.g., DuckyClaw complete guide)

**Too small:**
- Fix one typo
- Add one sentence to one doc

**Too large:**
- Rewrite the entire documentation site
- 20+ unrelated doc changes

## Branch Naming

```
docs/{topic}-{YYYY-MM}
```

Examples:
- `docs/tal-wifi-api-2026-04`
- `docs/peripheral-examples-2026-04`
- `docs/duckyclaw-guides-2026-04`
- `docs/cloud-agent-update-2026-05`
- `docs/i18n-parity-2026-05`

## Git Safety

- Never force push.
- Never push to `main` or `master` directly.
- Never modify files outside the documentation scope (no TuyaOpen source changes).
- Always create a new branch from the current working branch.
- Check `git status` before committing to avoid staging unintended files.

### Push from the Cursor agent (HTTPS username prompt)

If `git push` fails with `fatal: could not read Username for 'https://github.com': No such device or address`, the agent has no interactive TTY for HTTPS credentials. **Use SSH for `origin`** (local clone only; not committed):

```bash
git remote set-url origin git@github.com:Tuya-Community/TuyaOpen.io.git
```

Requires GitHub SSH access (`ssh -T git@github.com` succeeds). If changing the remote hits `could not write config file .git/config: Device or resource busy`, rerun the command outside the sandbox (full agent permissions / your WSL terminal).

Your interactive terminal can keep using HTTPS with a credential manager; this URL change affects only this clone.

## Detailed Workflow Reference

For the step-by-step checklist with examples, see [loop-workflow.md](loop-workflow.md).
