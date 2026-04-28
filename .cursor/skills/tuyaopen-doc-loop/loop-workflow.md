# Doc Loop Workflow -- Detailed Checklist

Step-by-step reference for each cycle of the documentation automation loop.

## Pre-Flight

```
- [ ] Confirm working directory is /home/edward/TuyaOpen.io
- [ ] Run: git status (check for clean state or known untracked files)
- [ ] Run: git branch (confirm current branch)
- [ ] Read agent-plan-workspace/PRD.md
- [ ] Read agent-plan-workspace/TODOS.md
- [ ] Read agent-plan-workspace/IMPROVEMENTS.md
```

## Phase 1: Discover

```
- [ ] Identify pending tasks from TODOS.md
- [ ] Check PRD.md for current sprint priorities
- [ ] If no actionable tasks:
  - [ ] Scan TuyaOpen/apps/ for new or updated apps
  - [ ] Scan TuyaOpen/examples/ for undocumented examples
  - [ ] Compare docs/tkl-api/ against TuyaOpen/tools/porting/adapter/ for missing API docs
  - [ ] Check docs/ vs i18n/zh/ for parity gaps
  - [ ] Write findings to TODOS.md
```

## Phase 2: Plan

```
- [ ] Select 3-8 related tasks for this cycle's PR
- [ ] For each task, determine:
  - [ ] Doc type (guide, API reference, tutorial, reference, FAQ)
  - [ ] Target audience (maker, developer, student, professional)
  - [ ] File path (use tuyaopen-doc-planner decision rules)
  - [ ] Whether zh mirror is needed (yes for all new docs)
  - [ ] Whether sidebars.js needs updating
  - [ ] Whether `i18n/zh/docusaurus-plugin-content-docs/current.json` needs new sidebar label keys (when any sidebar `label` is added or renamed; see `tuyaopen-doc-planner` → Sidebar label i18n)
  - [ ] Whether redirects are needed (only if moving existing docs)
- [ ] Write plan to TODOS.md
- [ ] Create feature branch: git checkout -b docs/{topic}-{YYYY-MM}
```

## Phase 3: Write

For each doc in the plan:

```
- [ ] Use the correct template from docs/contribute/template/
- [ ] Write English version:
  - [ ] Frontmatter with title
  - [ ] Overview (1-3 sentences)
  - [ ] Prerequisites (link to existing docs)
  - [ ] Requirements (hardware/software list)
  - [ ] Body (steps, API tables, or concept explanation)
  - [ ] Expected outcome (for task-based docs)
  - [ ] References / See also (2-3 links)
- [ ] Write Chinese version:
  - [ ] Same structure, translated prose
  - [ ] Code blocks and paths stay in English
  - [ ] Use terminology mapping from workspace rule
  - [ ] Translate frontmatter title
- [ ] Update sidebars.js (if new doc)
- [ ] Update `i18n/zh/docusaurus-plugin-content-docs/current.json` for any new or renamed category/link/custom-doc `label` (see `tuyaopen-doc-planner` → Sidebar label i18n)
- [ ] Update src/data/projects.js (if project page)
- [ ] Add redirect (if moving existing doc)
```

## Phase 4: Verify

```
- [ ] Run: npm run build
  - [ ] Exit code 0?
  - [ ] No broken link warnings?
  - [ ] No MDX syntax errors?
- [ ] If zh files changed: npm run build -- --locale zh
- [ ] If sidebars.js labels changed: spot-check zh sidebar (`npm run start -- --locale zh`) or confirm `current.json` keys match (`tuyaopen-build-check` / `tuyaopen-doc-planner`)
- [ ] Use ReadLints on all edited .md files
- [ ] Fix any issues and re-build
```

## Phase 5: Commit and Push

```
- [ ] Run: git status (review staged vs unstaged)
- [ ] Stage doc files only:
  git add docs/ i18n/ sidebars.js src/data/projects.js docusaurus.config.js blog/
- [ ] Do NOT stage: agent-plan-workspace/, TuyaOpen/, DuckyClaw/, node_modules/
- [ ] Run: git diff --cached (review what will be committed)
- [ ] Commit with descriptive message (see examples below)
- [ ] First push (new branch): git push --set-upstream origin HEAD
- [ ] Subsequent pushes (same branch): git push
- [ ] Record branch in TODOS.md Branches table
```

## Phase 6: Update Workspace

```
- [ ] Move completed tasks to "Completed Tasks" section in TODOS.md
- [ ] Add new findings to IMPROVEMENTS.md
- [ ] Update PRD.md sprint status
- [ ] If more work remains, return to Phase 1
```

## Commit Message Examples

### New documentation

```
docs: add peripheral GPIO and UART example guides

- Create GPIO blink tutorial with wiring diagram placeholder
- Create UART echo example with step-by-step instructions
- Add zh mirrors for both guides
- Register in sidebars.js under Examples category
```

### Documentation update

```
docs: update TAL Wi-Fi API reference with scan and connect functions

- Document 8 new public functions from tal_wifi.h
- Add code examples for scan, connect, disconnect flows
- Fix incorrect parameter types in existing entries
- Update zh mirror to match
```

### Structure change

```
docs: reorganize hardware-specific guides by platform family

- Move T5AI docs under hardware-specific/tuya-t5/
- Move ESP32 docs under hardware-specific/espressif/
- Add redirects for all old paths
- Update sidebars.js categories
- Update all cross-references in 12 affected docs
```

### i18n parity

```
docs(i18n): add missing Chinese translations for cloud agent docs

- Translate 6 AI Agent development guides to zh
- Add zh sidebar label keys in `i18n/zh/docusaurus-plugin-content-docs/current.json` (`sidebar.docs.category.*` / `.link.*` / `.doc.*`)
- Align terminology with official glossary
```

## Recovery

### Build fails after changes

1. Read the error message carefully (file path + line number).
2. Common fixes:
   - Unescaped `<` or `{` in MDX: wrap in backticks.
   - Missing frontmatter: add `---\ntitle: ...\n---`.
   - Broken link: fix path or create stub doc.
3. Fix and re-run `npm run build`.

### Wrong branch

```bash
# Save changes
git stash

# Switch to correct branch
git checkout docs/{correct-branch}

# Apply changes
git stash pop
```

### Need to undo last commit (not pushed)

```bash
git reset --soft HEAD~1
```

### Merge conflicts

1. `git status` to see conflicting files.
2. Edit files to resolve conflicts (keep both changes where appropriate).
3. `git add` resolved files.
4. `git commit` to complete the merge.

### Push fails: could not read Username for https://github.com

The agent terminal cannot open an interactive HTTPS credential prompt.

1. Prefer **SSH** for `origin` in this clone (one-time, local `.git/config`):
   ```bash
   git remote set-url origin git@github.com:Tuya-Community/TuyaOpen.io.git
   ```
2. Confirm: `ssh -T git@github.com` (expect a success message from GitHub).
3. Retry: `git push --set-upstream origin HEAD` or `git push`.

If `git remote set-url` fails with `Device or resource busy` on `.git/config`, run the same command in your normal WSL terminal or with full permissions so the sandbox does not lock the config file.

Alternative: keep HTTPS and use a non-interactive credential helper (for example `credential.helper=store` with a line in `~/.git-credentials` after you authenticate once in an interactive shell). SSH is usually simpler for automation.
