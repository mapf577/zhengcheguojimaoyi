param(
  [string]$AppDir = "C:\zhengche",
  [string]$RepoUrl = "https://github.com/mapf577/zhengcheguojimaoyi.git",
  [string]$Branch = "main",
  [string]$Port = "3000",
  [string]$AdminUser = "admin",
  [string]$AdminPassword = "change-this-password"
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

pm2 startOrReload deploy\ecosystem.config.cjs --update-env
pm2 save

Write-Host "Deployment complete."
Write-Host "App URL: http://127.0.0.1:$Port/"
Write-Host "Admin URL: http://127.0.0.1:$Port/admin/"
