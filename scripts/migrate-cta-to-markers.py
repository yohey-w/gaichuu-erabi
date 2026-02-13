#!/usr/bin/env python3
"""
Migrate hardcoded CTA HTML blocks in markdown articles to <!-- CTA:position --> markers.

Replaces:
  <div class="cta-box">
  ...
  </div>

With:
  <!-- CTA:top -->     (1st occurrence)
  <!-- CTA:middle -->  (2nd occurrence)
  <!-- CTA:bottom -->  (3rd occurrence)

Usage:
  python3 scripts/migrate-cta-to-markers.py [--dry-run]
"""

import re
import sys
import glob
import os

POSITIONS = ['top', 'middle', 'bottom']

# Match <div class="cta-box"> ... </div> blocks (multiline or single-line)
CTA_PATTERN = re.compile(
    r'<div class="cta-box">.*?</div>',
    re.DOTALL
)

def migrate_file(filepath, dry_run=False):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    matches = list(CTA_PATTERN.finditer(content))
    if not matches:
        return 0

    if len(matches) > 3:
        print(f"  WARNING: {filepath} has {len(matches)} CTA blocks (expected <= 3), migrating first 3 only")

    # Replace from last to first to preserve offsets
    replacements = min(len(matches), 3)
    for i in range(replacements - 1, -1, -1):
        match = matches[i]
        marker = f'<!-- CTA:{POSITIONS[i]} -->'
        content = content[:match.start()] + marker + content[match.end():]

    if dry_run:
        print(f"  [DRY RUN] {filepath}: {replacements} CTA(s) → markers")
    else:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  {filepath}: {replacements} CTA(s) → markers")

    return replacements


def main():
    dry_run = '--dry-run' in sys.argv

    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    content_dir = os.path.join(project_root, 'src', 'content')

    md_files = glob.glob(os.path.join(content_dir, '**', '*.md'), recursive=True)
    md_files.sort()

    if not md_files:
        print(f"No .md files found in {content_dir}")
        sys.exit(1)

    print(f"{'[DRY RUN] ' if dry_run else ''}Migrating CTA blocks in {len(md_files)} files...")

    total_files = 0
    total_ctas = 0
    for filepath in md_files:
        count = migrate_file(filepath, dry_run)
        if count > 0:
            total_files += 1
            total_ctas += count

    print(f"\nDone: {total_ctas} CTA(s) in {total_files} file(s) migrated.")


if __name__ == '__main__':
    main()
