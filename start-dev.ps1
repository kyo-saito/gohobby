# Vite開発サーバー起動スクリプト
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath
Write-Host "現在のディレクトリ: $(Get-Location)" -ForegroundColor Green
Write-Host "index.html存在確認: $(Test-Path index.html)" -ForegroundColor Yellow
Write-Host "サーバーを起動しています..." -ForegroundColor Cyan
npm run dev

