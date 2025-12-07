# Cloudflare Pages 快速部署脚本 (PowerShell)
# 使用方法: .\deploy.ps1

Write-Host "=== Cloudflare Pages 部署脚本 ===" -ForegroundColor Cyan
Write-Host ""

# 检查 wrangler 是否安装
Write-Host "检查 Wrangler CLI..." -ForegroundColor Yellow
try {
    $wranglerVersion = wrangler --version
    Write-Host "✓ Wrangler 已安装: $wranglerVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Wrangler 未安装，请先运行: npm install -g wrangler" -ForegroundColor Red
    exit 1
}

# 检查是否登录
Write-Host ""
Write-Host "检查 Cloudflare 登录状态..." -ForegroundColor Yellow
try {
    wrangler whoami | Out-Null
    Write-Host "✓ 已登录 Cloudflare" -ForegroundColor Green
} catch {
    Write-Host "✗ 未登录，请先运行: wrangler login" -ForegroundColor Red
    exit 1
}

# 检查项目配置
Write-Host ""
Write-Host "检查项目配置..." -ForegroundColor Yellow
if (Test-Path "wrangler.toml") {
    Write-Host "✓ wrangler.toml 存在" -ForegroundColor Green
} else {
    Write-Host "✗ wrangler.toml 不存在" -ForegroundColor Red
    exit 1
}

# 询问部署方式
Write-Host ""
$deployChoice = Read-Host "选择部署方式: [1] 直接部署  [2] 查看 KV 命名空间  [3] 生成邀请码文件  [4] 导入邀请码到 KV  [5] 退出"

switch ($deployChoice) {
    "1" {
        Write-Host ""
        Write-Host "开始部署到 Cloudflare Pages..." -ForegroundColor Cyan
        wrangler pages deploy . --project-name=stranger-things-test
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓ 部署成功！" -ForegroundColor Green
            Write-Host "访问: https://stranger-things-test.pages.dev" -ForegroundColor Cyan
        } else {
            Write-Host ""
            Write-Host "✗ 部署失败，请检查错误信息" -ForegroundColor Red
        }
    }
    "2" {
        Write-Host ""
        Write-Host "KV 命名空间列表:" -ForegroundColor Cyan
        wrangler kv:namespace list
    }
    "3" {
        Write-Host ""
        $salt = Read-Host "请输入 INVITE_SALT (用于生成邀请码哈希)"
        if ($salt) {
            $env:INVITE_SALT = $salt
            if (Test-Path "invites.txt") {
                Write-Host "生成 bulk.json..." -ForegroundColor Yellow
                node tools/generate-bulk.js
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✓ bulk.json 生成成功" -ForegroundColor Green
                }
            } else {
                Write-Host "✗ invites.txt 不存在，请先创建该文件" -ForegroundColor Red
            }
        }
    }
    "4" {
        Write-Host ""
        $namespaceId = Read-Host "请输入 KV 命名空间 ID"
        if ($namespaceId -and (Test-Path "bulk.json")) {
            Write-Host "导入邀请码到 KV..." -ForegroundColor Yellow
            wrangler kv:bulk put --namespace-id $namespaceId bulk.json
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ 导入成功" -ForegroundColor Green
            }
        } else {
            Write-Host "✗ 命名空间 ID 无效或 bulk.json 不存在" -ForegroundColor Red
        }
    }
    "5" {
        Write-Host "退出" -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "无效选择" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "完成！" -ForegroundColor Green




