#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/zhengcheguojimaoyi}"
REPO_URL="${REPO_URL:-https://github.com/mapf577/zhengcheguojimaoyi.git}"
BRANCH="${BRANCH:-main}"
PORT="${PORT:-3000}"
ADMIN_USER="${ADMIN_USER:-admin}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-change-this-password}"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required."
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "node is required. Install Node.js 18 or newer first."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required."
  exit 1
fi

if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

mkdir -p "$(dirname "$APP_DIR")"

if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  git fetch origin "$BRANCH"
  git checkout "$BRANCH"
  git pull --ff-only origin "$BRANCH"
else
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

mkdir -p logs backend/uploads backend/data

npm install --omit=dev

export PORT ADMIN_USER ADMIN_PASSWORD
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save

echo "Deployment complete."
echo "App URL: http://127.0.0.1:${PORT}/"
echo "Admin URL: http://127.0.0.1:${PORT}/admin/"
