# 生成随机盐值的 PowerShell 脚本

# 方法 1: 使用 RandomNumberGenerator（推荐）
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$bytes = New-Object byte[] 32
$rng.GetBytes($bytes)
$salt = [Convert]::ToBase64String($bytes)
Write-Host "生成的盐值: $salt" -ForegroundColor Green
Write-Host ""
Write-Host "请复制上面的盐值，用于配置 Cloudflare 环境变量 INVITE_SALT" -ForegroundColor Yellow

# 方法 2: 使用 GUID 组合（备用方法）
# $salt2 = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
# Write-Host "备用方法生成的盐值: $salt2" -ForegroundColor Cyan

