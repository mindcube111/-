@echo off
chcp 65001 >nul
echo ========================================
echo    Cloudflare Pages 快速部署工具
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] 检查 Wrangler CLI...
wrangler --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] Wrangler 未安装
    echo 请先运行: npm install -g wrangler
    pause
    exit /b 1
)
echo [✓] Wrangler 已安装

echo.
echo [2/4] 检查登录状态...
wrangler whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo [警告] 未登录 Cloudflare
    echo 正在尝试登录...
    wrangler login
    if %errorlevel% neq 0 (
        echo [错误] 登录失败
        pause
        exit /b 1
    )
)
echo [✓] 已登录 Cloudflare

echo.
echo [3/4] 检查项目配置...
if not exist "wrangler.toml" (
    echo [错误] wrangler.toml 不存在
    pause
    exit /b 1
)
echo [✓] 项目配置正常

echo.
echo [4/4] 开始部署到 Cloudflare Pages...
echo.
wrangler pages deploy . --project-name=stranger-things-test

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   部署成功！
    echo ========================================
    echo.
    echo 访问地址: https://stranger-things-test.pages.dev
    echo.
    echo 查看部署状态:
    echo https://dash.cloudflare.com
    echo.
) else (
    echo.
    echo ========================================
    echo   部署失败
    echo ========================================
    echo.
    echo 请检查错误信息并重试
    echo.
)

pause
