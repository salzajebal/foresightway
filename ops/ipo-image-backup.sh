#!/usr/bin/env bash

set -Eeuo pipefail
umask 027

SOURCE_DIR="${IPO_IMAGE_DIR:-/var/lib/foresightway/ipo-images}"
WORK_DIR="${IPO_IMAGE_BACKUP_WORK_DIR:-/var/lib/foresightway/ipo-image-backups}"
REMOTE_URL="${IPO_IMAGE_BACKUP_REMOTE_URL:-git@github.com:salzajebal/foresightway.git}"
REMOTE_BRANCH="${IPO_IMAGE_BACKUP_BRANCH:-ipo-image-backups}"
RETENTION_DAYS="${IPO_IMAGE_BACKUP_RETENTION_DAYS:-30}"
SSH_KEY="${IPO_IMAGE_BACKUP_SSH_KEY:-/root/.ssh/foresightway_backup_deploy}"
REPO_DIR="$WORK_DIR/repository"
ARCHIVE_DIR="$REPO_DIR/backups"
GIT_SSH_COMMAND="ssh -i $SSH_KEY -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes"

log() {
  printf '%s %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"
}

on_error() {
  local exit_code=$?
  log "IPO image backup failed at line $1 (exit $exit_code)"
  exit "$exit_code"
}
trap 'on_error "$LINENO"' ERR

if [[ ! -d "$SOURCE_DIR" ]]; then
  log "Source directory does not exist: $SOURCE_DIR"
  exit 1
fi
if [[ ! "$RETENTION_DAYS" =~ ^[1-9][0-9]*$ ]]; then
  log "Retention days must be a positive integer"
  exit 1
fi
if [[ ! -r "$SSH_KEY" ]]; then
  log "SSH deploy key is not readable: $SSH_KEY"
  exit 1
fi

install -d -m 0750 "$WORK_DIR"
if [[ ! -d "$REPO_DIR/.git" ]]; then
  install -d -m 0750 "$REPO_DIR"
  git -C "$REPO_DIR" init --quiet
  git -C "$REPO_DIR" remote add origin "$REMOTE_URL"
fi

if GIT_SSH_COMMAND="$GIT_SSH_COMMAND" git -C "$REPO_DIR" ls-remote \
  --exit-code --heads origin "$REMOTE_BRANCH" >/dev/null 2>&1; then
  GIT_SSH_COMMAND="$GIT_SSH_COMMAND" git -C "$REPO_DIR" fetch \
    --quiet --depth=1 origin "$REMOTE_BRANCH"
  git -C "$REPO_DIR" reset --quiet --hard FETCH_HEAD
else
  git -C "$REPO_DIR" rm --quiet -rf --ignore-unmatch .
fi

install -d -m 0750 "$ARCHIVE_DIR"
timestamp="$(date -u +%Y-%m-%dT%H-%M-%SZ)"
archive="$ARCHIVE_DIR/ipo-images-$timestamp.tar.gz"

tar --create --gzip --file="$archive" --directory="$SOURCE_DIR" .
tar --list --gzip --file="$archive" >/dev/null
sha256sum "$archive" > "$archive.sha256"

find "$ARCHIVE_DIR" -type f -mtime "+$RETENTION_DAYS" -delete
cat > "$REPO_DIR/README.md" <<EOF
# IPO image backups

Daily off-site archives from \`$SOURCE_DIR\`.
Archives older than $RETENTION_DAYS days are removed automatically.
Verify an archive with its adjacent SHA-256 file before restoring it.
EOF

git -C "$REPO_DIR" add --all
tree_sha="$(git -C "$REPO_DIR" write-tree)"
commit_sha="$(
  printf 'IPO image backup %s\n' "$timestamp" |
    git -C "$REPO_DIR" -c user.name='Foresightway Backup Automation' \
      -c user.email='backup@foresightway.com' commit-tree "$tree_sha"
)"
GIT_SSH_COMMAND="$GIT_SSH_COMMAND" git -C "$REPO_DIR" push \
  --quiet --force origin "$commit_sha:refs/heads/$REMOTE_BRANCH"
git -C "$REPO_DIR" update-ref "refs/heads/$REMOTE_BRANCH" "$commit_sha"
git -C "$REPO_DIR" gc --quiet --prune=now

file_count="$(find "$SOURCE_DIR" -maxdepth 1 -type f | wc -l)"
archive_size="$(stat -c %s "$archive")"
log "IPO image backup completed: files=$file_count bytes=$archive_size retention_days=$RETENTION_DAYS"
