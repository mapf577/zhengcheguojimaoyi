#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/zhengcheguojimaoyi}"
REPO_URL="${REPO_URL:-https://github.com/mapf577/zhengcheguojimaoyi.git}"
BRANCH="${BRANCH:-main}"
PORT="${PORT:-3000}"
ADMIN_USER="${ADMIN_USER:-admin}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-change-this-password}"
TOKEN_SECRET="${TOKEN_SECRET:-}"
CORS_ALLOWED_ORIGINS="${CORS_ALLOWED_ORIGINS:-${APP_ORIGIN:-}}"
SESSION_TTL_MS="${SESSION_TTL_MS:-86400000}"
LOGIN_RATE_LIMIT_WINDOW_MS="${LOGIN_RATE_LIMIT_WINDOW_MS:-900000}"
LOGIN_RATE_LIMIT_MAX_ATTEMPTS="${LOGIN_RATE_LIMIT_MAX_ATTEMPTS:-5}"
LOGIN_RATE_LIMIT_LOCK_MS="${LOGIN_RATE_LIMIT_LOCK_MS:-900000}"
DB_DRIVER="${DB_DRIVER:-json}"
MYSQL_HOST="${MYSQL_HOST:-127.0.0.1}"
MYSQL_PORT="${MYSQL_PORT:-3306}"
MYSQL_DATABASE="${MYSQL_DATABASE:-vehicle_export}"
MYSQL_USER="${MYSQL_USER:-vehicle_export}"
MYSQL_PASSWORD="${MYSQL_PASSWORD:-}"
DATABASE_URL="${DATABASE_URL:-}"
OSS_ENABLED="${OSS_ENABLED:-false}"
OSS_BUCKET="${OSS_BUCKET:-}"
OSS_REGION="${OSS_REGION:-}"
OSS_ENDPOINT="${OSS_ENDPOINT:-}"
OSS_PUBLIC_BASE_URL="${OSS_PUBLIC_BASE_URL:-}"
OSS_UPLOAD_PREFIX="${OSS_UPLOAD_PREFIX:-uploads/}"
OSS_ACCESS_KEY_ID="${OSS_ACCESS_KEY_ID:-}"
OSS_ACCESS_KEY_SECRET="${OSS_ACCESS_KEY_SECRET:-}"

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

export PORT ADMIN_USER ADMIN_PASSWORD TOKEN_SECRET CORS_ALLOWED_ORIGINS SESSION_TTL_MS
export LOGIN_RATE_LIMIT_WINDOW_MS LOGIN_RATE_LIMIT_MAX_ATTEMPTS LOGIN_RATE_LIMIT_LOCK_MS
export DB_DRIVER MYSQL_HOST MYSQL_PORT MYSQL_DATABASE MYSQL_USER MYSQL_PASSWORD DATABASE_URL
export OSS_ENABLED OSS_BUCKET OSS_REGION OSS_ENDPOINT OSS_PUBLIC_BASE_URL OSS_UPLOAD_PREFIX
export OSS_ACCESS_KEY_ID OSS_ACCESS_KEY_SECRET
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save

echo "Deployment complete."
echo "App URL: http://127.0.0.1:${PORT}/"
echo "Admin URL: http://127.0.0.1:${PORT}/admin/"
