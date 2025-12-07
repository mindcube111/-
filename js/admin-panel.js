// 管理员面板逻辑
document.addEventListener('DOMContentLoaded', function() {
    const adminToggleBtn = document.getElementById('admin-toggle-btn');
    const adminPanelOverlay = document.getElementById('admin-panel-overlay');
    const adminPanelClose = document.getElementById('admin-panel-close');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminPasswordInput = document.getElementById('admin-password-input');
    const adminLoginSection = document.getElementById('admin-login-section');
    const adminFunctions = document.getElementById('admin-functions');
    const adminLoginMessage = document.getElementById('admin-login-message');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    const adminGenerateSingle = document.getElementById('admin-generate-single');
    const adminGenerateBatch = document.getElementById('admin-generate-batch');
    const adminBatchCount = document.getElementById('admin-batch-count');
    const adminNewCodes = document.getElementById('admin-new-codes');
    const adminGenerateMessage = document.getElementById('admin-generate-message');
    const adminTotalCodes = document.getElementById('admin-total-codes');
    const adminUsedCodes = document.getElementById('admin-used-codes');
    const adminRemainingCodes = document.getElementById('admin-remaining-codes');

    let adminToken = sessionStorage.getItem('admin_token');
    let isLoggedIn = !!adminToken;

    // 初始化
    init();

    function init() {
        // 检查是否已登录
        if (isLoggedIn) {
            showAdminFunctions();
        } else {
            showLoginForm();
        }

        // 绑定事件
        if (adminToggleBtn) {
            adminToggleBtn.addEventListener('click', toggleAdminPanel);
        }

        if (adminPanelClose) {
            adminPanelClose.addEventListener('click', closeAdminPanel);
        }

        if (adminPanelOverlay) {
            adminPanelOverlay.addEventListener('click', function(e) {
                if (e.target === adminPanelOverlay) {
                    closeAdminPanel();
                }
            });
        }

        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', handleLogin);
        }

        if (adminLogoutBtn) {
            adminLogoutBtn.addEventListener('click', handleLogout);
        }

        if (adminGenerateSingle) {
            adminGenerateSingle.addEventListener('click', () => generateInviteCodes(1));
        }

        if (adminGenerateBatch) {
            adminGenerateBatch.addEventListener('click', () => {
                const count = parseInt(adminBatchCount.value) || 10;
                if (count < 1 || count > 100) {
                    showMessage(adminGenerateMessage, '请输入1-100之间的数字', 'error');
                    return;
                }
                generateInviteCodes(count);
            });
        }
    }

    function toggleAdminPanel() {
        if (adminPanelOverlay) {
            adminPanelOverlay.classList.toggle('show');
            if (adminPanelOverlay.classList.contains('show')) {
                // 如果已登录，刷新统计信息
                if (isLoggedIn) {
                    updateStats();
                }
            }
        }
    }

    function closeAdminPanel() {
        if (adminPanelOverlay) {
            adminPanelOverlay.classList.remove('show');
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        const password = adminPasswordInput.value.trim();
        
        if (!password) {
            showMessage(adminLoginMessage, '请输入密码', 'error');
            return;
        }

        try {
            const response = await fetch('/api/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                adminToken = password; // 使用密码作为 token
                sessionStorage.setItem('admin_token', adminToken);
                isLoggedIn = true;
                showAdminFunctions();
                showMessage(adminLoginMessage, '登录成功', 'success');
                adminPasswordInput.value = '';
            } else {
                showMessage(adminLoginMessage, '密码错误', 'error');
            }
        } catch (error) {
            console.error('登录失败:', error);
            showMessage(adminLoginMessage, '登录失败：' + error.message, 'error');
        }
    }

    function handleLogout() {
        adminToken = null;
        sessionStorage.removeItem('admin_token');
        isLoggedIn = false;
        showLoginForm();
        showMessage(adminLoginMessage, '已退出登录', 'success');
    }

    function showLoginForm() {
        if (adminLoginSection) adminLoginSection.style.display = 'block';
        if (adminFunctions) adminFunctions.classList.remove('show');
    }

    function showAdminFunctions() {
        if (adminLoginSection) adminLoginSection.style.display = 'none';
        if (adminFunctions) adminFunctions.classList.add('show');
        updateStats();
    }

    function showMessage(element, message, type) {
        if (!element) return;
        element.textContent = message;
        element.className = `admin-message ${type}`;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }

    /**
     * 生成邀请码
     */
    function generateInviteCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    /**
     * 生成邀请码并添加到 KV
     */
    async function generateInviteCodes(count) {
        if (!isLoggedIn || !adminToken) {
            showMessage(adminGenerateMessage, '请先登录', 'error');
            return;
        }

        // 禁用按钮
        if (adminGenerateSingle) adminGenerateSingle.disabled = true;
        if (adminGenerateBatch) adminGenerateBatch.disabled = true;

        try {
            // 生成邀请码
            const codes = [];
            for (let i = 0; i < count; i++) {
                codes.push(generateInviteCode());
            }

            // 调用 API 添加到 KV
            const response = await fetch('/api/add-invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify({ codes })
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                const successCodes = data.results.filter(r => r.ok).map(r => r.code);
                const failedCodes = data.results.filter(r => !r.ok);

                if (successCodes.length > 0) {
                    // 显示生成的邀请码
                    adminNewCodes.textContent = successCodes.join('\n');
                    adminNewCodes.style.display = 'block';
                    
                    // 复制到剪贴板
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(successCodes.join('\n'));
                    }

                    showMessage(
                        adminGenerateMessage, 
                        `成功生成 ${successCodes.length} 个邀请码${failedCodes.length > 0 ? `，${failedCodes.length} 个失败` : ''}，已复制到剪贴板`,
                        'success'
                    );
                } else {
                    showMessage(adminGenerateMessage, '生成失败：' + (failedCodes[0]?.message || '未知错误'), 'error');
                }

                // 更新统计信息
                updateStats();
            } else {
                showMessage(adminGenerateMessage, '生成失败：' + (data.message || '未知错误'), 'error');
            }
        } catch (error) {
            console.error('生成邀请码失败:', error);
            showMessage(adminGenerateMessage, '生成失败：' + error.message, 'error');
        } finally {
            // 恢复按钮
            if (adminGenerateSingle) adminGenerateSingle.disabled = false;
            if (adminGenerateBatch) adminGenerateBatch.disabled = false;
        }
    }

    /**
     * 更新统计信息（从 KV 获取，这里简化处理）
     */
    async function updateStats() {
        // 注意：由于 KV 的限制，我们无法直接获取所有键
        // 这里显示占位数据，实际项目中可能需要维护一个计数器
        if (adminTotalCodes) adminTotalCodes.textContent = '-';
        if (adminUsedCodes) adminUsedCodes.textContent = '-';
        if (adminRemainingCodes) adminRemainingCodes.textContent = '-';
        
        // 实际项目中，可以：
        // 1. 维护一个统计键在 KV 中
        // 2. 或者通过其他方式获取统计信息
    }

    // 暴露给全局，方便调试
    window.adminPanel = {
        toggle: toggleAdminPanel,
        close: closeAdminPanel,
        generate: generateInviteCodes
    };
});

