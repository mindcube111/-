// 管理员面板逻辑
document.addEventListener('DOMContentLoaded', function() {
    const adminToggleBtn = document.getElementById('admin-toggle-btn');
    const adminPanelOverlay = document.getElementById('admin-panel-overlay');
    const adminPanelClose = document.getElementById('admin-panel-close');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminUsernameInput = document.getElementById('admin-username-input');
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
    const adminCopyAllBtn = document.getElementById('admin-copy-all-btn');
    const adminCopyUnusedBtn = document.getElementById('admin-copy-unused-btn');
    const adminExportAllBtn = document.getElementById('admin-export-all-btn');
    const adminRefreshBtn = document.getElementById('admin-refresh-btn');
    const adminCodesList = document.getElementById('admin-codes-list');
    const adminFilterButtons = document.querySelectorAll('.admin-filter-btn');
    const adminPagination = document.getElementById('admin-pagination');
    const adminPrevPage = document.getElementById('admin-prev-page');
    const adminNextPage = document.getElementById('admin-next-page');
    const adminPaginationInfo = document.getElementById('admin-pagination-info');
    const adminLogoutBtnHeader = document.getElementById('admin-logout-btn-header');

    let adminToken = sessionStorage.getItem('admin_token');
    let isLoggedIn = !!adminToken;
    let currentFilter = 'all';
    let currentPage = 1;
    const itemsPerPage = 20;
    let allInviteCodes = []; // 存储所有邀请码
    let autoRefreshInterval = null; // 自动刷新定时器

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
                if (count < 1 || count > 2000) {
                    showMessage(adminGenerateMessage, '请输入1-2000之间的数字', 'error');
                    return;
                }
                generateInviteCodes(count);
            });
        }

        if (adminCopyAllBtn) {
            adminCopyAllBtn.addEventListener('click', copyAllCodes);
        }

        if (adminCopyUnusedBtn) {
            adminCopyUnusedBtn.addEventListener('click', copyUnusedCodes);
        }

        if (adminExportAllBtn) {
            adminExportAllBtn.addEventListener('click', exportAllRecords);
        }

        if (adminRefreshBtn) {
            adminRefreshBtn.addEventListener('click', refreshData);
        }

        if (adminFilterButtons) {
            adminFilterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    adminFilterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.dataset.filter;
                    currentPage = 1;
                    renderCodesList();
                });
            });
        }

        if (adminPrevPage) {
            adminPrevPage.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderCodesList();
                }
            });
        }

        if (adminNextPage) {
            adminNextPage.addEventListener('click', () => {
                const totalPages = Math.ceil(getFilteredCodes().length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    renderCodesList();
                }
            });
        }

        if (adminLogoutBtnHeader) {
            adminLogoutBtnHeader.addEventListener('click', handleLogout);
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
        const username = adminUsernameInput ? adminUsernameInput.value.trim() : '';
        const password = adminPasswordInput.value.trim();
        
        if (!username) {
            showMessage(adminLoginMessage, '请输入账号', 'error');
            return;
        }
        
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
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                adminToken = password; // 使用密码作为 token
                sessionStorage.setItem('admin_token', adminToken);
                isLoggedIn = true;
                showAdminFunctions();
                showMessage(adminLoginMessage, '登录成功', 'success');
                if (adminUsernameInput) adminUsernameInput.value = '';
                adminPasswordInput.value = '';
            } else {
                showMessage(adminLoginMessage, '账号或密码错误', 'error');
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
        if (adminUsernameInput) adminUsernameInput.value = '';
        if (adminPasswordInput) adminPasswordInput.value = '';
        const form = adminLoginSection ? adminLoginSection.querySelector('form') : null;
        if (form) {
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => input.style.display = 'block');
            const loginBtn = form.querySelector('button[type="submit"]');
            if (loginBtn) loginBtn.style.display = 'block';
        }
        showLoginForm();
        showMessage(adminLoginMessage, '已退出登录', 'success');
    }

    function showLoginForm() {
        if (adminLoginSection) adminLoginSection.style.display = 'block';
        if (adminFunctions) adminFunctions.classList.remove('show');
        const form = adminLoginSection ? adminLoginSection.querySelector('form') : null;
        if (form) form.style.display = 'block';
        if (adminLogoutBtnHeader) adminLogoutBtnHeader.style.display = 'none';
        stopAutoRefresh(); // 停止自动刷新
    }

    function showAdminFunctions() {
        if (adminLoginSection) adminLoginSection.style.display = 'block';
        const form = adminLoginSection ? adminLoginSection.querySelector('form') : null;
        if (form) {
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => input.style.display = 'none');
            const loginBtn = form.querySelector('button[type="submit"]');
            if (loginBtn) loginBtn.style.display = 'none';
        }
        if (adminFunctions) adminFunctions.classList.add('show');
        if (adminLogoutBtnHeader) adminLogoutBtnHeader.style.display = 'block';
        loadInviteCodes();
        updateStats();
        renderCodesList();
        startAutoRefresh(); // 启动自动刷新
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
                    // 添加到本地存储（确保立即保存）
                    const newCodes = successCodes.map(code => ({
                        code: code,
                        deviceId: null,
                        usedCount: 0,
                        createdAt: new Date().toISOString(),
                        lastUsedAt: null,
                        boundAt: null,
                        disabled: false,
                        usageHistory: []
                    }));
                    
                    // 先加载现有列表，避免覆盖
                    loadInviteCodes();
                    allInviteCodes.push(...newCodes);
                    saveInviteCodes();
                    
                    // 确保保存成功
                    console.log('邀请码已保存到本地存储:', newCodes);

                    // 显示生成的邀请码
                    adminNewCodes.textContent = successCodes.join('\n');
                    adminNewCodes.style.display = 'block';
                    
                    // 复制到剪贴板
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(successCodes.join('\n'));
                    }

                    const maxCount = CONFIG.MAX_USE_COUNT || 3;
                    const expiryDate = new Date();
                    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                    const expiryStr = expiryDate.toLocaleDateString('zh-CN');
                    showMessage(
                        adminGenerateMessage, 
                        `成功生成 ${successCodes.length} 个邀请码${failedCodes.length > 0 ? `，${failedCodes.length} 个失败` : ''}，已复制到剪贴板。每个邀请码有效期至${expiryStr}，限${maxCount}次使用。`,
                        'success'
                    );
                } else {
                    showMessage(adminGenerateMessage, '生成失败：' + (failedCodes[0]?.message || '未知错误'), 'error');
                }

                // 更新统计信息和列表
                updateStats();
                renderCodesList();
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
     * 从本地存储加载邀请码列表
     */
    function loadInviteCodes() {
        try {
            // 从 localStorage 加载（与 admin.js 兼容）
            if (typeof Storage !== 'undefined' && Storage.getInviteCodes) {
                allInviteCodes = Storage.getInviteCodes() || [];
            } else {
                // 备用方法
                const stored = localStorage.getItem('invite_codes');
                allInviteCodes = stored ? JSON.parse(stored) : [];
            }
        } catch (error) {
            console.error('加载邀请码列表失败:', error);
            allInviteCodes = [];
        }
    }

    /**
     * 保存邀请码列表到本地存储
     */
    function saveInviteCodes() {
        try {
            if (typeof Storage !== 'undefined' && Storage.setInviteCodes) {
                Storage.setInviteCodes(allInviteCodes);
            } else {
                localStorage.setItem('invite_codes', JSON.stringify(allInviteCodes));
            }
        } catch (error) {
            console.error('保存邀请码列表失败:', error);
        }
    }

    /**
     * 获取筛选后的邀请码
     */
    function getFilteredCodes() {
        let filtered = [...allInviteCodes];
        const maxCount = CONFIG.MAX_USE_COUNT || 3;
        
        if (currentFilter === 'unused') {
            filtered = filtered.filter(code => (code.usedCount || 0) === 0 && code.disabled !== true);
        } else if (currentFilter === 'partial') {
            filtered = filtered.filter(code => {
                const used = code.usedCount || 0;
                return used > 0 && used < maxCount && code.disabled !== true;
            });
        } else if (currentFilter === 'used') {
            filtered = filtered.filter(code => {
                const used = code.usedCount || 0;
                return used >= maxCount || code.disabled === true;
            });
        }
        
        // 按创建时间倒序
        filtered.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
            return dateB.getTime() - dateA.getTime();
        });
        
        return filtered;
    }

    /**
     * 渲染邀请码列表
     */
    function renderCodesList() {
        if (!adminCodesList) return;
        
        const filteredCodes = getFilteredCodes();
        
        if (filteredCodes.length === 0) {
            adminCodesList.innerHTML = '<div class="admin-empty-message">暂无邀请码，点击上方按钮生成</div>';
            if (adminPagination) adminPagination.style.display = 'none';
            return;
        }

        // 分页
        const totalPages = Math.ceil(filteredCodes.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageCodes = filteredCodes.slice(startIndex, endIndex);

        // 显示/隐藏分页
        if (adminPagination) {
            adminPagination.style.display = totalPages > 1 ? 'flex' : 'none';
        }

        // 更新分页信息
        if (adminPaginationInfo) {
            adminPaginationInfo.textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页 (共 ${filteredCodes.length} 条)`;
        }

        // 更新分页按钮状态
        if (adminPrevPage) {
            adminPrevPage.disabled = currentPage === 1;
        }
        if (adminNextPage) {
            adminNextPage.disabled = currentPage >= totalPages;
        }

        // 渲染列表
        let html = '';
        pageCodes.forEach(code => {
            const usedCount = code.usedCount || 0;
            const maxCount = CONFIG.MAX_USE_COUNT || 3;
            const remaining = Math.max(0, maxCount - usedCount);
            let statusClass = 'unused';
            let statusText = '未使用';
            
            if (code.disabled === true) {
                statusClass = 'used';
                statusText = '已禁用';
            } else if (usedCount >= maxCount) {
                statusClass = 'used';
                statusText = '已失效';
            } else if (usedCount > 0) {
                statusClass = 'partial';
                statusText = `使用中 ${usedCount}/${maxCount}`;
            }

            const createdAt = code.createdAt ? formatDate(code.createdAt) : '未知';
            const lastUsedAt = code.lastUsedAt ? formatDate(code.lastUsedAt) : null;
            const boundAt = code.boundAt ? formatDate(code.boundAt) : null;
            const deviceId = code.deviceId ? (code.deviceId.substring(0, 20) + '...') : '未绑定';
            const usageHistory = code.usageHistory || [];

            html += `
                <div class="admin-code-item ${code.disabled ? 'disabled' : ''}">
                    <div class="admin-code-header">
                        <div class="admin-code-text">${code.code}</div>
                        <div class="admin-code-status ${statusClass}">${statusText}</div>
                    </div>
                    <div class="admin-code-info">
                        <div class="admin-code-info-item">
                            <span class="admin-code-info-label">创建时间：</span>
                            <span class="admin-code-info-value">${createdAt}</span>
                        </div>
                        <div class="admin-code-info-item">
                            <span class="admin-code-info-label">使用次数：</span>
                            <span class="admin-code-info-value">${usedCount}/${maxCount} (剩余${remaining}次)</span>
                        </div>
                        ${code.deviceId ? `
                        <div class="admin-code-info-item">
                            <span class="admin-code-info-label">绑定设备：</span>
                            <span class="admin-code-info-value" title="${code.deviceId}">${deviceId}</span>
                        </div>
                        ${boundAt ? `
                        <div class="admin-code-info-item">
                            <span class="admin-code-info-label">绑定时间：</span>
                            <span class="admin-code-info-value">${boundAt}</span>
                        </div>
                        ` : ''}
                        ` : ''}
                        ${lastUsedAt ? `
                        <div class="admin-code-info-item">
                            <span class="admin-code-info-label">最后使用：</span>
                            <span class="admin-code-info-value">${lastUsedAt}</span>
                        </div>
                        ` : ''}
                        ${usageHistory.length > 0 ? `
                        <div class="admin-code-info-item">
                            <span class="admin-code-info-label">使用记录：</span>
                            <button class="admin-code-action-btn small" onclick="showUsageHistory('${code.code}')">查看详情 (${usageHistory.length}条)</button>
                        </div>
                        ` : ''}
                    </div>
                    <div class="admin-code-actions">
                        <button class="admin-code-action-btn" onclick="copyCode('${code.code}')">复制</button>
                        ${code.disabled ? `
                        <button class="admin-code-action-btn" onclick="enableCode('${code.code}')">启用</button>
                        ` : `
                        <button class="admin-code-action-btn" onclick="disableCode('${code.code}')">禁用</button>
                        `}
                        <button class="admin-code-action-btn" onclick="resetCode('${code.code}')">重置</button>
                        <button class="admin-code-action-btn delete" onclick="deleteCode('${code.code}')">删除</button>
                    </div>
                </div>
            `;
        });

        adminCodesList.innerHTML = html;
    }

    /**
     * 格式化日期
     */
    function formatDate(dateString) {
        if (!dateString) return '未知';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '无效日期';
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${month}-${day} ${hours}:${minutes}`;
        } catch (error) {
            return '无效日期';
        }
    }

    /**
     * 复制单个邀请码
     */
    window.copyCode = function(code) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code).then(() => {
                showMessage(adminGenerateMessage, `邀请码 ${code} 已复制`, 'success');
            });
        }
    };

    /**
     * 删除邀请码
     */
    window.deleteCode = function(code) {
        if (confirm(`确定要删除邀请码 ${code} 吗？此操作不可恢复。`)) {
            allInviteCodes = allInviteCodes.filter(c => c.code !== code);
            saveInviteCodes();
            updateStats();
            renderCodesList();
            showMessage(adminGenerateMessage, '邀请码已删除', 'success');
        }
    };

    /**
     * 禁用邀请码
     */
    window.disableCode = function(code) {
        const invite = allInviteCodes.find(c => c.code === code);
        if (invite) {
            invite.disabled = true;
            saveInviteCodes();
            renderCodesList();
            showMessage(adminGenerateMessage, `邀请码 ${code} 已禁用`, 'success');
        }
    };

    /**
     * 启用邀请码
     */
    window.enableCode = function(code) {
        const invite = allInviteCodes.find(c => c.code === code);
        if (invite) {
            invite.disabled = false;
            saveInviteCodes();
            renderCodesList();
            showMessage(adminGenerateMessage, `邀请码 ${code} 已启用`, 'success');
        }
    };

    /**
     * 重置邀请码（清除使用记录和设备绑定）
     */
    window.resetCode = function(code) {
        if (confirm(`确定要重置邀请码 ${code} 吗？将清除所有使用记录和设备绑定信息。`)) {
            const invite = allInviteCodes.find(c => c.code === code);
            if (invite) {
                invite.usedCount = 0;
                invite.deviceId = null;
                invite.boundAt = null;
                invite.lastUsedAt = null;
                invite.disabled = false;
                invite.usageHistory = [];
                saveInviteCodes();
                updateStats();
                renderCodesList();
                showMessage(adminGenerateMessage, `邀请码 ${code} 已重置`, 'success');
            }
        }
    };

    /**
     * 显示使用记录详情
     */
    window.showUsageHistory = function(code) {
        const invite = allInviteCodes.find(c => c.code === code);
        if (!invite || !invite.usageHistory || invite.usageHistory.length === 0) {
            alert('该邀请码暂无使用记录');
            return;
        }

        let historyText = `邀请码 ${code} 使用记录：\n\n`;
        invite.usageHistory.forEach((record, index) => {
            const date = record.usedAt ? formatDate(record.usedAt) : '未知';
            const deviceId = record.deviceId ? record.deviceId.substring(0, 30) + '...' : '未知';
            historyText += `第${index + 1}次使用：\n`;
            historyText += `  时间：${date}\n`;
            historyText += `  设备ID：${deviceId}\n`;
            historyText += `  用户代理：${record.userAgent ? record.userAgent.substring(0, 50) + '...' : '未知'}\n\n`;
        });

        // 创建模态框显示详情
        const modal = document.createElement('div');
        modal.className = 'admin-modal-overlay';
        modal.innerHTML = `
            <div class="admin-modal">
                <div class="admin-modal-header">
                    <h3>邀请码 ${code} 使用记录</h3>
                    <button class="admin-modal-close" onclick="this.closest('.admin-modal-overlay').remove()">&times;</button>
                </div>
                <div class="admin-modal-content">
                    <div class="usage-history-list">
                        ${invite.usageHistory.map((record, index) => {
                            const date = record.usedAt ? formatDate(record.usedAt) : '未知';
                            const deviceId = record.deviceId || '未知';
                            const userAgent = record.userAgent || '未知';
                            return `
                                <div class="usage-history-item">
                                    <div class="usage-history-header">
                                        <span class="usage-index">第${index + 1}次使用</span>
                                        <span class="usage-date">${date}</span>
                                    </div>
                                    <div class="usage-history-details">
                                        <div><strong>设备ID：</strong>${deviceId}</div>
                                        <div><strong>用户代理：</strong>${userAgent.substring(0, 80)}${userAgent.length > 80 ? '...' : ''}</div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div class="admin-modal-footer">
                    <button class="admin-btn" onclick="exportUsageHistory('${code}')">导出记录</button>
                    <button class="admin-btn admin-btn-secondary" onclick="this.closest('.admin-modal-overlay').remove()">关闭</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    };

    /**
     * 导出使用记录
     */
    window.exportUsageHistory = function(code) {
        const invite = allInviteCodes.find(c => c.code === code);
        if (!invite || !invite.usageHistory || invite.usageHistory.length === 0) {
            alert('该邀请码暂无使用记录');
            return;
        }

        // 生成CSV内容
        let csv = '序号,使用时间,设备ID,用户代理\n';
        invite.usageHistory.forEach((record, index) => {
            const date = record.usedAt ? new Date(record.usedAt).toLocaleString('zh-CN') : '未知';
            const deviceId = record.deviceId || '未知';
            const userAgent = (record.userAgent || '未知').replace(/,/g, ';');
            csv += `${index + 1},${date},${deviceId},${userAgent}\n`;
        });

        // 下载CSV文件
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `邀请码_${code}_使用记录_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showMessage(adminGenerateMessage, '使用记录已导出', 'success');
    };

    /**
     * 复制所有邀请码
     */
    function copyAllCodes() {
        if (allInviteCodes.length === 0) {
            showMessage(adminGenerateMessage, '没有邀请码可复制', 'error');
            return;
        }
        const codes = allInviteCodes.map(c => c.code).join('\n');
        if (navigator.clipboard) {
            navigator.clipboard.writeText(codes).then(() => {
                showMessage(adminGenerateMessage, '所有邀请码已复制到剪贴板', 'success');
            });
        }
    }

    /**
     * 复制未使用邀请码
     */
    function copyUnusedCodes() {
        const unusedCodes = allInviteCodes
            .filter(c => (c.usedCount || 0) === 0)
            .map(c => c.code);
        
        if (unusedCodes.length === 0) {
            showMessage(adminGenerateMessage, '没有未使用的邀请码', 'error');
            return;
        }
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(unusedCodes.join('\n')).then(() => {
                showMessage(adminGenerateMessage, '未使用邀请码已复制到剪贴板', 'success');
            });
        }
    }

    /**
     * 更新统计信息
     */
    function updateStats() {
        const maxCount = CONFIG.MAX_USE_COUNT || 3;
        const total = allInviteCodes.length;
        const used = allInviteCodes.reduce((sum, code) => sum + (code.usedCount || 0), 0);
        const remaining = allInviteCodes.reduce((sum, code) => {
            if (code.disabled === true) return sum;
            const usedCount = code.usedCount || 0;
            return sum + Math.max(0, maxCount - usedCount);
        }, 0);

        if (adminTotalCodes) adminTotalCodes.textContent = total;
        if (adminUsedCodes) adminUsedCodes.textContent = used;
        if (adminRemainingCodes) adminRemainingCodes.textContent = remaining;
    }

    /**
     * 导出所有使用记录
     */
    function exportAllRecords() {
        if (allInviteCodes.length === 0) {
            showMessage(adminGenerateMessage, '没有数据可导出', 'error');
            return;
        }

        // 生成CSV内容
        let csv = '邀请码,使用次数,剩余次数,状态,创建时间,绑定设备,最后使用时间\n';
        
        allInviteCodes.forEach(code => {
            const maxCount = CONFIG.MAX_USE_COUNT || 3;
            const usedCount = code.usedCount || 0;
            const remaining = Math.max(0, maxCount - usedCount);
            let status = '未使用';
            if (code.disabled === true) {
                status = '已禁用';
            } else if (usedCount >= maxCount) {
                status = '已失效';
            } else if (usedCount > 0) {
                status = '使用中';
            }
            
            const createdAt = code.createdAt ? new Date(code.createdAt).toLocaleString('zh-CN') : '未知';
            const deviceId = code.deviceId || '未绑定';
            const lastUsedAt = code.lastUsedAt ? new Date(code.lastUsedAt).toLocaleString('zh-CN') : '从未使用';
            
            csv += `${code.code},${usedCount},${remaining},${status},${createdAt},${deviceId},${lastUsedAt}\n`;
        });

        // 下载CSV文件
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `邀请码使用记录_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showMessage(adminGenerateMessage, '所有记录已导出', 'success');
    }

    /**
     * 刷新数据
     */
    function refreshData() {
        if (adminRefreshBtn) {
            adminRefreshBtn.disabled = true;
            adminRefreshBtn.textContent = '刷新中...';
        }
        
        // 重新加载数据
        loadInviteCodes();
        updateStats();
        renderCodesList();
        
        setTimeout(() => {
            if (adminRefreshBtn) {
                adminRefreshBtn.disabled = false;
                adminRefreshBtn.textContent = '刷新数据';
            }
            showMessage(adminGenerateMessage, '数据已刷新', 'success');
        }, 500);
    }

    // 自动刷新（每30秒）
    function startAutoRefresh() {
        if (autoRefreshInterval) clearInterval(autoRefreshInterval);
        autoRefreshInterval = setInterval(() => {
            if (isLoggedIn && adminFunctions && adminFunctions.classList.contains('show')) {
                loadInviteCodes();
                updateStats();
                renderCodesList();
            }
        }, 30000); // 30秒刷新一次
    }

    function stopAutoRefresh() {
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
            autoRefreshInterval = null;
        }
    }

    // 暴露给全局，方便调试
    window.adminPanel = {
        toggle: toggleAdminPanel,
        close: closeAdminPanel,
        generate: generateInviteCodes
    };
});

