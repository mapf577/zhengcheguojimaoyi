param(
  [string]$AppDir = "C:\zhengche",
  [string]$RepoUrl = "https://github.com/mapf577/zhengcheguojimaoyi.git",
  [string]$Branch = "main",
  [string]$Port = "3000",
  [string]$AdminUser = "admin",
  [string]$AdminPassword = "change-this-password",
  [string]$TokenSecret = "",
  [string]$CorsAllowedOrigins = "",
  [string]$SessionTtlMs = "86400000",
  [string]$LoginRateLimitWindowMs = "900000",
  [string]$LoginRateLimitMaxAttempts = "5",
  [string]$LoginRateLimitLockMs = "900000",
  [string]$DbDriver = "json",
  [string]$MysqlHost = "127.0.0.1",
  [string]$MysqlPort = "3306",
  [string]$MysqlDatabase = "vehicle_export",
  [string]$MysqlUser = "vehicle_export",
  [string]$MysqlPassword = "",
  [string]$DatabaseUrl = "",
  [string]$OssEnabled = "false",
  [string]$OssBucket = "",
  [string]$OssRegion = "",
  [string]$OssEndpoint = "",
  [string]$OssPublicBaseUrl = "",
  [string]$OssUploadPrefix = "uploads/",
  [string]$OssPublicRead = "false",
  [string]$OssSignedUrlTtlSeconds = "3600",
  [string]$OssAccessKeyId = "",
  [string]$OssAccessKeySecret = ""
)

$ErrorActionPreference = "Stop"

function Require-Command {
  param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "$Name is required."
  }
}

Require-Command git
Require-Command node
Require-Command npm

if (-not (Get-Command pm2 -ErrorAction SilentlyContinue)) {
  npm install -g pm2
}

if (Test-Path (Join-Path $AppDir ".git")) {
  Set-Location $AppDir
  git fetch origin $Branch
  git checkout $Branch
  git pull --ff-only origin $Branch
} else {
  git clone --branch $Branch $RepoUrl $AppDir
  Set-Location $AppDir
}

New-Item -ItemType Directory -Force logs, backend\uploads, backend\data | Out-Null

npm install --omit=dev

$env:PORT = $Port
$env:ADMIN_USER = $AdminUser
$env:ADMIN_PASSWORD = $AdminPassword
$env:TOKEN_SECRET = $TokenSecret
$env:CORS_ALLOWED_ORIGINS = $CorsAllowedOrigins
$env:SESSION_TTL_MS = $SessionTtlMs
$env:LOGIN_RATE_LIMIT_WINDOW_MS = $LoginRateLimitWindowMs
$env:LOGIN_RATE_LIMIT_MAX_ATTEMPTS = $LoginRateLimitMaxAttempts
$env:LOGIN_RATE_LIMIT_LOCK_MS = $LoginRateLimitLockMs
$env:DB_DRIVER = $DbDriver
$env:MYSQL_HOST = $MysqlHost
$env:MYSQL_PORT = $MysqlPort
$env:MYSQL_DATABASE = $MysqlDatabase
$env:MYSQL_USER = $MysqlUser
$env:MYSQL_PASSWORD = $MysqlPassword
$env:DATABASE_URL = $DatabaseUrl
$env:OSS_ENABLED = $OssEnabled
$env:OSS_BUCKET = $OssBucket
$env:OSS_REGION = $OssRegion
$env:OSS_ENDPOINT = $OssEndpoint
$env:OSS_PUBLIC_BASE_URL = $OssPublicBaseUrl
$env:OSS_UPLOAD_PREFIX = $OssUploadPrefix
$env:OSS_PUBLIC_READ = $OssPublicRead
$env:OSS_SIGNED_URL_TTL_SECONDS = $OssSignedUrlTtlSeconds
$env:OSS_ACCESS_KEY_ID = $OssAccessKeyId
$env:OSS_ACCESS_KEY_SECRET = $OssAccessKeySecret

pm2 startOrReload deploy\ecosystem.config.cjs --update-env
pm2 save

Write-Host "Deployment complete."
Write-Host "App URL: http://127.0.0.1:$Port/"
Write-Host "Admin URL: http://127.0.0.1:$Port/admin/"
