#!/usr/bin/env python3
"""
Generate a CSV of recent doc changes for both en and zh docs.
Merges en (docs/) and zh (i18n/zh/...) into one row per logical doc path;
uses the latest commit (by time) across either locale.
Output columns: name, path, subfolder, last_time, last, github link, owner,
plus two compact cols for latest 3 commits: latest_3_times, latest_3_links.
Subfolder path is derived from sidebars.js category hierarchy.
"""

from __future__ import annotations

import csv
import json
import subprocess
import sys
from pathlib import Path


DOCS_EN = "docs"
DOCS_ZH = "i18n/zh/docusaurus-plugin-content-docs/current"
GITHUB_BASE = "https://github.com/Tuya-Community/TuyaOpen.io"
BRANCH = "master"
SIDEBARS_SCRIPT = "tools/recent-doc-changes/parse_sidebars.js"


def repo_root() -> Path:
    out = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        capture_output=True,
        text=True,
        check=True,
        cwd=Path(__file__).resolve().parent,
    )
    return Path(out.stdout.strip())


def collect_doc_paths(root: Path) -> dict[str, list[Path]]:
    """
    Collect all doc files under docs/ and i18n/zh/.../current/.
    Returns a dict: logical_path -> [physical Path (relative to root), ...].
    Logical path is relative, e.g. "quick-start/equipment-authorization.md".
    Each logical path has at most one en and one zh; we take the latest commit across them.
    """
    en_base = root / DOCS_EN
    zh_base = root / DOCS_ZH
    merged: dict[str, list[Path]] = {}

    for base in (en_base, zh_base):
        if not base.exists():
            continue
        for p in base.rglob("*.md"):
            if not p.is_file():
                continue
            try:
                rel = p.relative_to(base)
            except ValueError:
                continue
            logical = rel.as_posix()
            try:
                path_rel_root = p.relative_to(root)
            except ValueError:
                path_rel_root = p
            if logical not in merged:
                merged[logical] = []
            if path_rel_root not in merged[logical]:
                merged[logical].append(path_rel_root)
    return merged


def git_log_last(root: Path, physical_path: Path) -> tuple[str, str, str] | None:
    """Return (commit_hash, iso_date, author "Name <email>") for the last commit touching path."""
    try:
        rel = physical_path.relative_to(root)
    except ValueError:
        rel = physical_path
    out = subprocess.run(
        [
            "git",
            "log",
            "-1",
            "--format=%H %ci %an <%ae>",
            "--",
            rel.as_posix(),
        ],
        capture_output=True,
        text=True,
        cwd=root,
    )
    if out.returncode != 0 or not out.stdout.strip():
        return None
    line = out.stdout.strip()
    # Format: HASH YYYY-MM-DD HH:MM:SS +0800 Author Name <email>
    parts = line.split()
    if len(parts) < 6:
        return None
    commit_hash = parts[0]
    last_time = f"{parts[1]} {parts[2]} {parts[3]}"  # YYYY-MM-DD HH:MM:SS +0800
    owner = " ".join(parts[4:])
    return (commit_hash, last_time, owner)


def load_sidebar_paths(root: Path) -> dict[str, str]:
    """Build doc_id -> sidebar subfolder path from sidebars.js (via Node)."""
    result: dict[str, str] = {}
    script = root / SIDEBARS_SCRIPT
    if not script.exists():
        return result
    out = subprocess.run(
        ["node", SIDEBARS_SCRIPT],
        capture_output=True,
        text=True,
        cwd=root,
    )
    if out.returncode != 0:
        return result
    for line in out.stdout.strip().splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
            result[obj["id"]] = obj.get("path", "")
        except (json.JSONDecodeError, KeyError):
            continue
    return result


def git_log_last_n(root: Path, physical_paths: list[Path], n: int = 3) -> list[tuple[str, str]]:
    """
    Return the latest n commits (hash, iso_date) touching any of the physical paths (en/zh merged).
    Sorted by date descending. Each (hash, date).
    """
    paths_rel = []
    for p in physical_paths:
        full = (root / p) if not p.is_absolute() else p
        if not full.exists():
            continue
        try:
            rel = full.relative_to(root)
        except ValueError:
            rel = p
        paths_rel.append(rel.as_posix())
    if not paths_rel:
        return []
    out = subprocess.run(
        [
            "git",
            "log",
            "-30",
            "--format=%H %ci",
            "--",
            *paths_rel,
        ],
        capture_output=True,
        text=True,
        cwd=root,
    )
    if out.returncode != 0 or not out.stdout.strip():
        return []
    seen_hashes: set[str] = set()
    commits: list[tuple[str, str]] = []
    for line in out.stdout.strip().splitlines():
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        if len(parts) < 4:
            continue
        h, date_part = parts[0], f"{parts[1]} {parts[2]} {parts[3]}"
        if h in seen_hashes:
            continue
        seen_hashes.add(h)
        commits.append((h, date_part))
        if len(commits) >= n:
            break
    return commits


def latest_commit_for_logical(root: Path, physical_paths: list[Path]) -> tuple[str, str, str, Path] | None:
    """Among all physical paths (en/zh), return (hash, date, owner, path_that_had_it) for the latest commit."""
    best: tuple[str, str, str, Path] | None = None
    for p in physical_paths:
        full = (root / p) if not p.is_absolute() else p
        if not full.exists():
            continue
        info = git_log_last(root, full)
        if not info:
            continue
        h, date, owner = info
        if best is None or date > best[1]:
            best = (h, date, owner, p)
    return best


def main() -> int:
    root = repo_root()
    doc_paths = collect_doc_paths(root)
    sidebar_paths = load_sidebar_paths(root)

    rows = []
    for logical in sorted(doc_paths.keys()):
        paths = doc_paths[logical]
        info = latest_commit_for_logical(root, paths)
        if not info:
            continue
        commit_hash, last_time, owner, _ = info
        name = Path(logical).stem
        # Doc id in sidebars has no .md; path may be "dir/file.md" or "dir/index.md"
        doc_id = logical.removesuffix(".md") if logical.endswith(".md") else logical
        subfolder = sidebar_paths.get(doc_id, "")
        github_commit = f"{GITHUB_BASE}/commit/{commit_hash}"
        last_3 = git_log_last_n(root, paths, 3)
        latest_3_times = " | ".join(c[1] for c in last_3)
        latest_3_links = " | ".join(f"{GITHUB_BASE}/commit/{c[0]}" for c in last_3)
        rows.append({
            "name": name,
            "path": logical,
            "subfolder": subfolder,
            "last_time": last_time,
            "last": commit_hash,
            "github link": github_commit,
            "owner": owner,
            "latest_3_times": latest_3_times,
            "latest_3_links": latest_3_links,
        })

    # Sort by last_time descending (latest changes at top)
    rows.sort(key=lambda r: r["last_time"], reverse=True)

    for r in rows:
        print(r["path"])

    out_path = root / "tools" / "recent-doc-changes" / "recent_doc_changes.csv"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = ["name", "path", "subfolder", "last_time", "last", "github link", "owner", "latest_3_times", "latest_3_links"]
    with open(out_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)

    print(f"\nWrote {len(rows)} rows to {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
