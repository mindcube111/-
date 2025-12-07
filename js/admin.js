// 管理员后台逻辑
document.addEventListener('DOMContentLoaded', function() {
    const loginSection = document.getElementById('loginSection');
    const adminSection = document.getElementById('adminSection');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');
    const logoutBtn = document.getElementById('logoutBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const generateBtn = document.getElementById('generateBtn');
    const batchGenerateBtn = document.getElementById('batchGenerateBtn');
    const batchCountInput = document.getElementById('batchCount');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const copyUnusedBtn = document.getElementById('copyUnusedBtn');
    const newCodeDisplay = document.getElementById('newCode');
    const codesList = document.getElementById('codesList');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const newPasswordInput = document.getElementById('newPasswordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const passwordError = document.getElementById('passwordError');
    const passwordSuccess = document.getElementById('passwordSuccess');
    
    // 分页相关元素（需要在 renderCodesList 之前定义）
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const paginationInfo = document.getElementById('paginationInfo');
    const pagination = document.getElementById('pagination');
    
    let currentFilter = 'all';
    let currentPage = 1;
    const itemsPerPage = 20;

    // 检查依赖
    if (typeof Storage === 'undefined') {
        console.error('Storage 未定义，请确保 js/storage.js 已加载');
        if (loginError) {
            loginError.textContent = '系统初始化失败：Storage 未定义';
        }
        return;
    }
    
    if (typeof CONFIG === 'undefined') {
        console.error('CONFIG 未定义，请确保 js/config.js 已加载');
        if (loginError) {
            loginError.textContent = '系统初始化失败：CONFIG 未定义';
        }
        return;
    }
    
    // 检查按钮元素
    if (!generateBtn) {
        console.error('生成按钮元素不存在');
    }
    if (!batchGenerateBtn) {
        console.error('批量生成按钮元素不存在');
    }

    // 初始化
    init();
    
    // 定期从云端同步数据（每10秒）
    let syncInterval = null;

    function init() {
        // 确保密码输入框可编辑
        if (passwordInput) {
            passwordInput.removeAttribute('readonly');
            passwordInput.removeAttribute('disabled');
            passwordInput.style.pointerEvents = 'auto';
            passwordInput.style.zIndex = '9999';
            passwordInput.style.position = 'relative';
            passwordInput.style.opacity = '1';
            passwordInput.tabIndex = 0;
            
            // 确保输入框可聚焦
            setTimeout(() => {
                try {
                    passwordInput.focus();
                } catch (e) {
                    if (typeof Logger !== 'undefined') {
                        Logger.log('自动聚焦失败，这是正常的');
                    }
                }
            }, 100);
        }
        
        // 初始化密码修改输入框
        initPasswordChangeInputs();
        
        // 检查是否已登录（简单的session检查）
        const isLoggedIn = sessionStorage.getItem('admin_logged_in');
        if (isLoggedIn) {
            showAdminSection();
        }
    }
    
    /**
     * 初始化密码修改输入框
     */
    function initPasswordChangeInputs() {
        if (newPasswordInput) {
            newPasswordInput.removeAttribute('readonly');
            newPasswordInput.removeAttribute('disabled');
            newPasswordInput.style.pointerEvents = 'auto';
            newPasswordInput.style.cursor = 'text';
            newPasswordInput.style.zIndex = '9999';
            newPasswordInput.style.position = 'relative';
            newPasswordInput.style.opacity = '1';
            newPasswordInput.tabIndex = 0;
            newPasswordInput.addEventListener('click', function() {
                this.focus();
            });
            if (typeof Logger !== 'undefined') Logger.log('新密码输入框已初始化');
        }
        
        if (confirmPasswordInput) {
            confirmPasswordInput.removeAttribute('readonly');
            confirmPasswordInput.removeAttribute('disabled');
            confirmPasswordInput.style.pointerEvents = 'auto';
            confirmPasswordInput.style.cursor = 'text';
            confirmPasswordInput.style.zIndex = '9999';
            confirmPasswordInput.style.position = 'relative';
            confirmPasswordInput.style.opacity = '1';
            confirmPasswordInput.tabIndex = 0;
            confirmPasswordInput.addEventListener('click', function() {
                this.focus();
            });
            if (typeof Logger !== 'undefined') Logger.log('确认密码输入框已初始化');
        }
    }

    // 登录功能
    function handleLogin() {
        try {
            const password = passwordInput.value.trim();
            
            if (!password) {
                showLoginError('请输入密码');
                return;
            }
            
            // 检查依赖
            if (typeof Storage === 'undefined') {
                showLoginError('系统错误：Storage 未定义，请刷新页面');
                console.error('Storage 未定义');
                return;
            }
            
            if (typeof CONFIG === 'undefined') {
                showLoginError('系统错误：CONFIG 未定义，请刷新页面');
                console.error('CONFIG 未定义');
                return;
            }
            
            const correctPassword = Storage.getAdminPassword();
            
            // 调试信息
            if (typeof Logger !== 'undefined') {
                Logger.log('登录尝试:', {
                    inputLength: password.length,
                    correctPasswordExists: !!correctPassword,
                    correctPasswordLength: correctPassword ? correctPassword.length : 0
                });
            }
            
            if (!correctPassword) {
                showLoginError('系统错误：无法获取管理员密码');
                console.error('无法获取管理员密码');
                return;
            }
            
            if (password === correctPassword) {
                sessionStorage.setItem('admin_logged_in', 'true');
                showAdminSection();
            } else {
                showLoginError('密码错误，请重试');
            }
        } catch (error) {
            console.error('登录过程中出错:', error);
            showLoginError('登录失败：' + error.message);
        }
    }
    
    // 绑定登录按钮事件
    if (loginBtn) {
        // 确保按钮可点击
        loginBtn.removeAttribute('disabled');
        loginBtn.style.pointerEvents = 'auto';
        loginBtn.style.cursor = 'pointer';
        loginBtn.style.zIndex = '99999';
        loginBtn.style.position = 'relative';
        loginBtn.style.opacity = '1';
        
        // 绑定点击事件
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof Logger !== 'undefined') Logger.log('登录按钮被点击');
            handleLogin();
        });
        
        // 也绑定鼠标事件确保可交互
        loginBtn.addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
        
        loginBtn.addEventListener('mouseup', function(e) {
            e.stopPropagation();
        });
        
        if (typeof Logger !== 'undefined') Logger.log('登录按钮事件已绑定');
    } else {
        console.error('登录按钮元素不存在');
    }

    // 回车登录
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
    } else {
        console.error('密码输入框元素不存在');
    }

    // 退出登录
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // 停止云端同步
            stopCloudSync();
            sessionStorage.removeItem('admin_logged_in');
            showLoginSection();
        });
    }
    
    // 打开设置弹窗
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            if (settingsModal) {
                settingsModal.style.display = 'flex';
                // 聚焦到第一个输入框
                setTimeout(() => {
                    if (newPasswordInput) {
                        newPasswordInput.focus();
                    }
                }, 100);
            }
        });
    }
    
    // 关闭设置弹窗
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', function() {
            if (settingsModal) {
                settingsModal.style.display = 'none';
                // 清空输入框和消息
                if (newPasswordInput) newPasswordInput.value = '';
                if (confirmPasswordInput) confirmPasswordInput.value = '';
                if (passwordError) passwordError.textContent = '';
                if (passwordSuccess) passwordSuccess.textContent = '';
            }
        });
    }
    
    // 点击弹窗外部关闭
    if (settingsModal) {
        settingsModal.addEventListener('click', function(e) {
            if (e.target === settingsModal) {
                settingsModal.style.display = 'none';
                // 清空输入框和消息
                if (newPasswordInput) newPasswordInput.value = '';
                if (confirmPasswordInput) confirmPasswordInput.value = '';
                if (passwordError) passwordError.textContent = '';
                if (passwordSuccess) passwordSuccess.textContent = '';
            }
        });
    }

    // 生成单个邀请码
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            try {
                generateSingleCode();
            } catch (error) {
                console.error('生成邀请码失败:', error);
                alert('生成邀请码失败，请检查控制台错误信息');
            }
        });
    }
    
    // 批量生成邀请码
    if (batchGenerateBtn) {
        batchGenerateBtn.addEventListener('click', function() {
            try {
                const count = parseInt(batchCountInput.value) || 10;
                if (count < 1 || count > 2000) {
                    alert('请输入1-2000之间的数字');
                    return;
                }
                if (count > 500) {
                    if (!confirm(`您要生成 ${count} 个邀请码，这可能需要几秒钟时间，是否继续？`)) {
                        return;
                    }
                }
                // 使用异步生成，避免阻塞UI
                if (count > 100) {
                    generateBatchCodesAsync(count);
                } else {
                    generateBatchCodes(count);
                }
            } catch (error) {
                console.error('批量生成邀请码失败:', error);
                alert('批量生成邀请码失败，请检查控制台错误信息');
            }
        });
    }
    
    // 复制所有邀请码
    if (copyAllBtn) {
        copyAllBtn.addEventListener('click', function() {
            try {
                const inviteCodes = Storage.getInviteCodes();
                if (!Array.isArray(inviteCodes) || inviteCodes.length === 0) {
                    alert('没有邀请码可复制');
                    return;
                }
                const codes = inviteCodes.map(item => item.code).filter(code => code).join('\n');
                if (codes) {
                    copyToClipboard(codes, '所有邀请码已复制到剪贴板');
                } else {
                    alert('没有有效的邀请码可复制');
                }
            } catch (error) {
                console.error('复制所有邀请码失败:', error);
                alert('复制失败: ' + error.message);
            }
        });
    }
    
    // 复制未使用邀请码
    if (copyUnusedBtn) {
        copyUnusedBtn.addEventListener('click', function() {
            try {
                const inviteCodes = Storage.getInviteCodes();
                if (!Array.isArray(inviteCodes)) {
                    alert('数据格式错误');
                    return;
                }
                const unusedCodes = inviteCodes
                    .filter(item => (item.usedCount || 0) === 0)
                    .map(item => item.code)
                    .filter(code => code)
                    .join('\n');
                if (unusedCodes) {
                    copyToClipboard(unusedCodes, '未使用邀请码已复制到剪贴板');
                } else {
                    alert('没有未使用的邀请码');
                }
            } catch (error) {
                console.error('复制未使用邀请码失败:', error);
                alert('复制失败: ' + error.message);
            }
        });
    }
    
    // 筛选按钮事件处理函数
    function handleFilterButtonClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const button = event.target.closest('.filter-btn');
        if (!button) {
            if (typeof Logger !== 'undefined') Logger.log('未找到筛选按钮');
            return;
        }
        
        const filter = button.dataset.filter;
        if (!filter) {
            console.error('筛选按钮缺少 data-filter 属性:', button);
            return;
        }
        
        if (typeof Logger !== 'undefined') Logger.log('筛选按钮被点击:', filter);
        
        // 更新所有按钮的激活状态
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        
        // 更新当前筛选条件
        currentFilter = filter;
        currentPage = 1; // 重置到第一页
        renderCodesList();
    }
    
    // 绑定筛选按钮的函数
    function bindFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        if (typeof Logger !== 'undefined') Logger.log('找到筛选按钮数量:', filterButtons.length);
        
        filterButtons.forEach(btn => {
            // 确保按钮可点击
            btn.removeAttribute('disabled');
            btn.style.pointerEvents = 'auto';
            btn.style.cursor = 'pointer';
            btn.style.zIndex = '99999';
            btn.style.position = 'relative';
            btn.style.opacity = '1';
            
            // 移除旧的事件监听器（通过克隆节点）
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            // 添加新的事件监听器
            newBtn.addEventListener('click', handleFilterButtonClick);
            newBtn.addEventListener('mousedown', function(e) {
                e.stopPropagation();
            });
            newBtn.addEventListener('mouseup', function(e) {
                e.stopPropagation();
            });
        });
    }
    
    // 使用事件委托绑定筛选按钮（委托到 adminSection，这样即使按钮是动态显示的也能工作）
    if (adminSection) {
        adminSection.addEventListener('click', function(event) {
            if (event.target.closest('.filter-btn')) {
                handleFilterButtonClick(event);
            }
        });
    }
    
    // 初始绑定筛选按钮
    bindFilterButtons();
    
    // 分页按钮事件处理函数
    function handlePrevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderCodesList();
        }
    }
    
    function handleNextPage() {
        const totalPages = Math.ceil(getFilteredCodes().length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderCodesList();
        }
    }
    
    // 绑定分页按钮事件
    if (prevPageBtn) {
        // 确保按钮可点击
        prevPageBtn.removeAttribute('disabled');
        prevPageBtn.style.pointerEvents = 'auto';
        prevPageBtn.style.cursor = 'pointer';
        prevPageBtn.style.zIndex = '99999';
        prevPageBtn.style.position = 'relative';
        
        prevPageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof Logger !== 'undefined') Logger.log('上一页按钮被点击');
            handlePrevPage();
        });
        
        prevPageBtn.addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
    }
    
    if (nextPageBtn) {
        // 确保按钮可点击
        nextPageBtn.removeAttribute('disabled');
        nextPageBtn.style.pointerEvents = 'auto';
        nextPageBtn.style.cursor = 'pointer';
        nextPageBtn.style.zIndex = '99999';
        nextPageBtn.style.position = 'relative';
        
        nextPageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof Logger !== 'undefined') Logger.log('下一页按钮被点击');
            handleNextPage();
        });
        
        nextPageBtn.addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
        
        if (typeof Logger !== 'undefined') Logger.log('分页按钮事件已绑定');
    }

    // 修改密码
    if (changePasswordBtn) {
        // 确保按钮可点击
        changePasswordBtn.removeAttribute('disabled');
        changePasswordBtn.style.pointerEvents = 'auto';
        changePasswordBtn.style.cursor = 'pointer';
        changePasswordBtn.style.zIndex = '99999';
        changePasswordBtn.style.position = 'relative';
        changePasswordBtn.style.opacity = '1';
        
        changePasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            try {
                const newPassword = newPasswordInput ? newPasswordInput.value.trim() : '';
                const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value.trim() : '';
                
                if (passwordError) passwordError.textContent = '';
                if (passwordSuccess) passwordSuccess.textContent = '';
                
                if (!newPassword) {
                    if (passwordError) passwordError.textContent = '请输入新密码';
                    return;
                }
                
                if (newPassword.length < 6) {
                    if (passwordError) passwordError.textContent = '密码长度至少6位';
                    return;
                }
                
                if (newPassword !== confirmPassword) {
                    if (passwordError) passwordError.textContent = '两次输入的密码不一致';
                    return;
                }
                
                // 检查 Storage 是否可用
                if (typeof Storage === 'undefined' || !Storage.setAdminPassword) {
                    if (passwordError) passwordError.textContent = '系统错误：Storage 未定义，请刷新页面';
                    console.error('Storage 未定义或 setAdminPassword 方法不存在');
                    return;
                }
                
                // 保存新密码
                const saved = Storage.setAdminPassword(newPassword);
                
                if (saved) {
                    if (passwordSuccess) passwordSuccess.textContent = '密码修改成功！';
                    if (newPasswordInput) newPasswordInput.value = '';
                    if (confirmPasswordInput) confirmPasswordInput.value = '';
                    
                    // 2秒后关闭弹窗
                    setTimeout(() => {
                        if (passwordSuccess) passwordSuccess.textContent = '';
                        if (settingsModal) {
                            settingsModal.style.display = 'none';
                        }
                    }, 2000);
                } else {
                    if (passwordError) passwordError.textContent = '密码保存失败，请重试';
                }
            } catch (error) {
                console.error('修改密码失败:', error);
                if (passwordError) passwordError.textContent = '修改密码失败：' + error.message;
            }
        });
        
        // 也绑定鼠标事件确保可交互
        changePasswordBtn.addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
        
        changePasswordBtn.addEventListener('mouseup', function(e) {
            e.stopPropagation();
        });
        
        if (typeof Logger !== 'undefined') Logger.log('修改密码按钮事件已绑定');
    } else {
        console.error('修改密码按钮元素不存在');
    }

    /**
     * 生成邀请码
     * @returns {string}
     */
    function generateInviteCode() {
        if (!CONFIG || !CONFIG.INVITE_CODE_LENGTH) {
            console.error('CONFIG.INVITE_CODE_LENGTH 未定义，使用默认值6');
            const defaultLength = 6;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < defaultLength; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return code;
        }
        
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < CONFIG.INVITE_CODE_LENGTH; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        // 检查是否重复（最多尝试100次，避免无限递归）
        const inviteCodes = Storage.getInviteCodes();
        let attempts = 0;
        while (inviteCodes.find(item => item.code === code) && attempts < 100) {
            code = '';
            for (let i = 0; i < CONFIG.INVITE_CODE_LENGTH; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            attempts++;
        }
        
        if (attempts >= 100) {
            console.warn('生成邀请码时重复次数过多，可能存在数据问题');
        }
        
        return code;
    }
    
    /**
     * 生成单个邀请码
     */
    async function generateSingleCode() {
        try {
            if (!Storage || !CONFIG) {
                alert('系统初始化失败，请刷新页面重试');
                return;
            }
            
            const code = generateInviteCode();
            
            // 获取现有邀请码列表
            const inviteCodes = Storage.getInviteCodes();
            if (!Array.isArray(inviteCodes)) {
                console.error('邀请码列表格式错误，重置为空数组');
                Storage.setInviteCodes([]);
                return generateSingleCode();
            }
            
            // 添加新邀请码（确保所有字段都正确初始化）
            const newInvite = {
                code: code,
                deviceId: null,
                usedCount: 0, // 明确初始化为 0
                createdAt: new Date().toISOString(),
                lastUsedAt: null
            };
            
            // 验证新邀请码格式
            if (!newInvite.code || typeof newInvite.usedCount !== 'number') {
                console.error('生成的邀请码格式错误:', newInvite);
                alert('生成邀请码失败：数据格式错误');
                return;
            }
            
            inviteCodes.push(newInvite);
            
            // 保存到本地
            const saved = Storage.setInviteCodes(inviteCodes);
            if (!saved) {
                alert('保存邀请码失败，请检查浏览器存储空间');
                return;
            }
            
            // 同步到云端
            await syncToCloud();
            
            // 显示新邀请码
            showNewCode(code);
            
            // 更新列表
            currentPage = 1; // 重置到第一页
            renderCodesList();
            updateStats();
        } catch (error) {
            console.error('生成单个邀请码失败:', error);
            alert('生成邀请码失败: ' + error.message);
        }
    }
    
    /**
     * 批量生成邀请码（同步版本）
     */
    function generateBatchCodes(count) {
        try {
            if (!Storage || !CONFIG) {
                alert('系统初始化失败，请刷新页面重试');
                return;
            }
            
            const inviteCodes = Storage.getInviteCodes();
            if (!Array.isArray(inviteCodes)) {
                console.error('邀请码列表格式错误，重置为空数组');
                Storage.setInviteCodes([]);
            }
            
            const newCodes = [];
            
            for (let i = 0; i < count; i++) {
                const code = generateInviteCode();
                // 确保所有字段都正确初始化
                newCodes.push({
                    code: code,
                    deviceId: null,
                    usedCount: 0, // 明确初始化为 0
                    createdAt: new Date().toISOString(),
                    lastUsedAt: null
                });
            }
            
            inviteCodes.push(...newCodes);
            const saved = Storage.setInviteCodes(inviteCodes);
            if (!saved) {
                alert('保存邀请码失败，请检查浏览器存储空间');
                return;
            }
            
            const codesText = newCodes.map(item => item.code).join('\n');
            showNewCode(codesText, `已生成 ${count} 个邀请码`);
            
            currentPage = 1; // 重置到第一页
            renderCodesList();
            updateStats();
        } catch (error) {
            console.error('批量生成邀请码失败:', error);
            alert('批量生成邀请码失败: ' + error.message);
        }
    }
    
    /**
     * 批量生成邀请码（异步版本，用于大量生成）
     */
    function generateBatchCodesAsync(count) {
        try {
            if (!Storage || !CONFIG) {
                alert('系统初始化失败，请刷新页面重试');
                return;
            }
            
            const batchGenerateBtnEl = document.getElementById('batchGenerateBtn');
            const originalText = batchGenerateBtnEl ? batchGenerateBtnEl.textContent : '';
            
            if (batchGenerateBtnEl) {
                batchGenerateBtnEl.disabled = true;
                batchGenerateBtnEl.textContent = `生成中... (0/${count})`;
            }
            
            // 获取现有邀请码列表
            let inviteCodesList = Storage.getInviteCodes();
            if (!Array.isArray(inviteCodesList)) {
                inviteCodesList = [];
                Storage.setInviteCodes([]);
            }
            
            // 初始化数组和计数器（在外部作用域中，确保闭包可以访问）
            const newCodesArray = [];
            let generatedCount = 0;
            const totalCount = count;
            
            // 使用 requestAnimationFrame 分批生成，避免阻塞UI
            function generateBatch() {
                try {
                    const batchSize = 100; // 每批生成100个
                    const end = Math.min(generatedCount + batchSize, totalCount);
                    
                    for (let i = generatedCount; i < end; i++) {
                        const code = generateInviteCode();
                        // 确保所有字段都正确初始化
                        newCodesArray.push({
                            code: code,
                            deviceId: null,
                            usedCount: 0, // 明确初始化为 0
                            createdAt: new Date().toISOString(),
                            lastUsedAt: null
                        });
                    }
                    
                    generatedCount = end;
                    
                    // 更新按钮状态
                    const btn = document.getElementById('batchGenerateBtn');
                    if (btn) {
                        btn.textContent = `生成中... (${generatedCount}/${totalCount})`;
                    }
                    
                    if (generatedCount < totalCount) {
                        requestAnimationFrame(generateBatch);
                    } else {
                        // 完成生成
                        // 重新获取最新的邀请码列表（防止在生成过程中有其他操作）
                        let finalInviteCodes = Storage.getInviteCodes();
                        if (!Array.isArray(finalInviteCodes)) {
                            finalInviteCodes = [];
                        }
                        
                        finalInviteCodes.push(...newCodesArray);
                        const saved = Storage.setInviteCodes(finalInviteCodes);
                        
                        if (!saved) {
                            alert('保存邀请码失败，请检查浏览器存储空间');
                            const btn = document.getElementById('batchGenerateBtn');
                            if (btn) {
                                btn.disabled = false;
                                btn.textContent = originalText;
                            }
                            return;
                        }
                        
                        const codesText = newCodesArray.map(item => item.code).join('\n');
                        showNewCode(codesText, `已生成 ${totalCount} 个邀请码`);
                        
                        const btn = document.getElementById('batchGenerateBtn');
                        if (btn) {
                            btn.disabled = false;
                            btn.textContent = originalText;
                        }
                        
                        // 更新分页和统计
                        currentPage = 1;
                        renderCodesList();
                        updateStats();
                    }
                } catch (error) {
                    console.error('批量生成过程中出错:', error);
                    alert('生成过程中出错: ' + error.message);
                    const btn = document.getElementById('batchGenerateBtn');
                    if (btn) {
                        btn.disabled = false;
                        btn.textContent = originalText;
                    }
                }
            }
            
            generateBatch();
        } catch (error) {
            console.error('批量生成邀请码失败:', error);
            alert('批量生成邀请码失败: ' + error.message);
            const batchGenerateBtn = document.getElementById('batchGenerateBtn');
            if (batchGenerateBtn) {
                batchGenerateBtn.disabled = false;
            }
        }
    }
    
    /**
     * 显示新生成的邀请码
     */
    function showNewCode(code, message = null) {
        if (!newCodeDisplay) {
            console.warn('newCodeDisplay 元素不存在，无法显示新生成的邀请码');
            return;
        }
        try {
            if (message) {
                newCodeDisplay.innerHTML = `<div style="margin-bottom: 10px; font-size: 1rem;">${message}</div><div style="white-space: pre-line; font-size: 1.2rem;">${code}</div>`;
            } else {
                newCodeDisplay.textContent = code;
            }
            newCodeDisplay.style.animation = 'none';
            setTimeout(() => {
                if (newCodeDisplay) {
                    newCodeDisplay.style.animation = 'fadeIn 0.5s ease-out';
                }
            }, 10);
        } catch (error) {
            console.error('显示新邀请码失败:', error);
        }
    }
    
    /**
     * 复制到剪贴板
     */
    function copyToClipboard(text, successMessage) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showSuccessMessage(successMessage);
            }).catch(() => {
                fallbackCopyToClipboard(text, successMessage);
            });
        } else {
            fallbackCopyToClipboard(text, successMessage);
        }
    }
    
    /**
     * 备用复制方法
     */
    function fallbackCopyToClipboard(text, successMessage) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showSuccessMessage(successMessage);
        } catch (err) {
            alert('复制失败，请手动复制');
        }
        document.body.removeChild(textarea);
    }
    
    /**
     * 显示成功消息
     */
    function showSuccessMessage(message) {
        const msg = document.createElement('div');
        msg.className = 'copy-success-message';
        msg.textContent = message;
        msg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #00ff00; color: #000; padding: 15px 25px; border-radius: 8px; z-index: 10000; animation: fadeIn 0.3s ease-out; box-shadow: 0 4px 12px rgba(0, 255, 0, 0.3);';
        document.body.appendChild(msg);
        setTimeout(() => {
            msg.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => document.body.removeChild(msg), 300);
        }, 2000);
    }

    /**
     * 显示登录界面
     */
    function showLoginSection() {
        loginSection.style.display = 'block';
        adminSection.style.display = 'none';
        passwordInput.value = '';
        loginError.textContent = '';
    }

    /**
     * 显示管理界面
     */
    function showAdminSection() {
        loginSection.style.display = 'none';
        adminSection.style.display = 'block';
        
        // 确保按钮事件已绑定（如果之前不存在）
        if (generateBtn && !generateBtn.hasAttribute('data-listener-attached')) {
            generateBtn.setAttribute('data-listener-attached', 'true');
            generateBtn.addEventListener('click', function() {
                try {
                    generateSingleCode();
                } catch (error) {
                    console.error('生成邀请码失败:', error);
                    alert('生成邀请码失败，请检查控制台错误信息');
                }
            });
        }
        
        if (batchGenerateBtn && !batchGenerateBtn.hasAttribute('data-listener-attached')) {
            batchGenerateBtn.setAttribute('data-listener-attached', 'true');
            batchGenerateBtn.addEventListener('click', function() {
                try {
                    const count = parseInt(batchCountInput.value) || 10;
                    if (count < 1 || count > 2000) {
                        alert('请输入1-2000之间的数字');
                        return;
                    }
                    if (count > 500) {
                        if (!confirm(`您要生成 ${count} 个邀请码，这可能需要几秒钟时间，是否继续？`)) {
                            return;
                        }
                    }
                    // 使用异步生成，避免阻塞UI
                    if (count > 100) {
                        generateBatchCodesAsync(count);
                    } else {
                        generateBatchCodes(count);
                    }
                } catch (error) {
                    console.error('批量生成邀请码失败:', error);
                    alert('批量生成邀请码失败，请检查控制台错误信息');
                }
            });
        }
        
        // 重新绑定筛选按钮（确保事件正常工作）
        bindFilterButtons();
        
        // 确保当前筛选按钮状态正确
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.filter === currentFilter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 确保分页按钮可点击
        if (prevPageBtn) {
            prevPageBtn.removeAttribute('disabled');
            prevPageBtn.style.pointerEvents = 'auto';
            prevPageBtn.style.cursor = 'pointer';
        }
        if (nextPageBtn) {
            nextPageBtn.removeAttribute('disabled');
            nextPageBtn.style.pointerEvents = 'auto';
            nextPageBtn.style.cursor = 'pointer';
        }
        
        // 确保设置按钮可点击
        if (settingsBtn) {
            settingsBtn.removeAttribute('disabled');
            settingsBtn.style.pointerEvents = 'auto';
            settingsBtn.style.cursor = 'pointer';
            settingsBtn.style.zIndex = '99999';
            settingsBtn.style.position = 'relative';
            settingsBtn.style.opacity = '1';
        }
        
        // 确保修改密码按钮可点击
        if (changePasswordBtn) {
            changePasswordBtn.removeAttribute('disabled');
            changePasswordBtn.style.pointerEvents = 'auto';
            changePasswordBtn.style.cursor = 'pointer';
            changePasswordBtn.style.zIndex = '99999';
            changePasswordBtn.style.position = 'relative';
            changePasswordBtn.style.opacity = '1';
        }
        
        // 确保密码修改输入框可用
        initPasswordChangeInputs();
        
        // 启动云端同步
        startCloudSync();
        
        renderCodesList();
        updateStats();
        if (newCodeDisplay) {
            newCodeDisplay.textContent = '';
        }
    }
    
    /**
     * 启动云端数据同步
     */
    async function startCloudSync() {
        // 清除旧的定时器
        if (syncInterval) {
            clearInterval(syncInterval);
        }
        
        // 立即同步一次
        await syncFromCloud();
        
        // 每10秒自动同步
        syncInterval = setInterval(async () => {
            await syncFromCloud();
        }, 10000);
        
        if (typeof Logger !== 'undefined') {
            Logger.log('云端同步已启动，每10秒自动同步');
        }
    }
    
    /**
     * 停止云端同步
     */
    function stopCloudSync() {
        if (syncInterval) {
            clearInterval(syncInterval);
            syncInterval = null;
            if (typeof Logger !== 'undefined') {
                Logger.log('云端同步已停止');
            }
        }
    }
    
    /**
     * 从云端同步邀请码数据
     */
    async function syncFromCloud() {
        try {
            // 检查 SyncStorage 是否可用
            if (typeof SyncStorage === 'undefined') {
                console.warn('SyncStorage 未定义，跳过云端同步');
                return;
            }
            
            // 从云端获取邀请码列表
            const cloudData = await SyncStorage.get(CONFIG.STORAGE_KEYS.INVITE_CODES, []);
            
            if (cloudData && Array.isArray(cloudData)) {
                // 更新本地存储
                Storage.setInviteCodes(cloudData);
                
                // 刷新界面
                renderCodesList();
                updateStats();
                
                if (typeof Logger !== 'undefined') {
                    Logger.log('从云端同步数据成功:', cloudData.length, '个邀请码');
                }
            }
        } catch (error) {
            console.error('从云端同步数据失败:', error);
            // 同步失败不影响使用，继续使用本地数据
        }
    }
    
    /**
     * 同步数据到云端
     */
    async function syncToCloud() {
        try {
            // 检查 SyncStorage 是否可用
            if (typeof SyncStorage === 'undefined') {
                console.warn('SyncStorage 未定义，跳过云端同步');
                return false;
            }
            
            const inviteCodes = Storage.getInviteCodes();
            const success = await SyncStorage.set(CONFIG.STORAGE_KEYS.INVITE_CODES, inviteCodes);
            
            if (success && typeof Logger !== 'undefined') {
                Logger.log('同步数据到云端成功');
            }
            
            return success;
        } catch (error) {
            console.error('同步数据到云端失败:', error);
            return false;
        }
    }

    /**
     * 显示登录错误
     * @param {string} message
     */
    function showLoginError(message) {
        if (loginError) {
            loginError.textContent = message;
            loginError.style.display = 'block';
            loginError.style.color = '#ff0000';
        } else {
            console.error('登录错误显示元素不存在:', message);
        }
        if (passwordInput) {
            passwordInput.classList.add('error');
            setTimeout(() => {
                if (passwordInput) {
                    passwordInput.classList.remove('error');
                }
            }, 3000);
        }
    }

    /**
     * 获取筛选后的邀请码列表
     */
    function getFilteredCodes() {
        try {
            let inviteCodes = Storage.getInviteCodes();
            
            // 确保是数组
            if (!Array.isArray(inviteCodes)) {
                console.error('邀请码列表不是数组:', inviteCodes);
                return [];
            }
            
            // 筛选
            if (currentFilter !== 'all') {
                inviteCodes = inviteCodes.filter(invite => {
                    if (!invite || !invite.code) {
                        return false; // 过滤掉无效的邀请码
                    }
                    const status = getInviteStatus(invite);
                    if (currentFilter === 'unused') return status.class === 'unused';
                    if (currentFilter === 'partial') return status.class === 'partial';
                    if (currentFilter === 'used') return status.class === 'used';
                    return true;
                });
            }
            
            // 按创建时间倒序排列（处理无效日期）
            inviteCodes.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                if (isNaN(dateA.getTime())) return 1;
                if (isNaN(dateB.getTime())) return -1;
                return dateB.getTime() - dateA.getTime();
            });
            
            return inviteCodes;
        } catch (error) {
            console.error('获取筛选后的邀请码列表失败:', error);
            return [];
        }
    }
    
    /**
     * 渲染邀请码列表
     */
    function renderCodesList() {
        const filteredCodes = getFilteredCodes();
        
        if (filteredCodes.length === 0) {
            codesList.innerHTML = '<div class="empty-message">暂无邀请码，点击上方按钮生成</div>';
            if (pagination) pagination.style.display = 'none';
            return;
        }

        // 计算分页
        const totalPages = Math.ceil(filteredCodes.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageCodes = filteredCodes.slice(startIndex, endIndex);
        
        // 显示/隐藏分页控件
        if (pagination) {
            pagination.style.display = totalPages > 1 ? 'flex' : 'none';
        }
        
        // 更新分页信息
        if (paginationInfo) {
            paginationInfo.textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页 (共 ${filteredCodes.length} 条)`;
        }
        
        // 更新分页按钮状态
        if (prevPageBtn) {
            if (currentPage === 1) {
                prevPageBtn.disabled = true;
                prevPageBtn.style.opacity = '0.4';
                prevPageBtn.style.cursor = 'not-allowed';
                prevPageBtn.style.pointerEvents = 'none';
            } else {
                prevPageBtn.disabled = false;
                prevPageBtn.style.opacity = '1';
                prevPageBtn.style.cursor = 'pointer';
                prevPageBtn.style.pointerEvents = 'auto';
            }
        }
        if (nextPageBtn) {
            if (currentPage >= totalPages) {
                nextPageBtn.disabled = true;
                nextPageBtn.style.opacity = '0.4';
                nextPageBtn.style.cursor = 'not-allowed';
                nextPageBtn.style.pointerEvents = 'none';
            } else {
                nextPageBtn.disabled = false;
                nextPageBtn.style.opacity = '1';
                nextPageBtn.style.cursor = 'pointer';
                nextPageBtn.style.pointerEvents = 'auto';
            }
            if (typeof Logger !== 'undefined') {
                Logger.log('分页按钮状态更新:', {
                    currentPage: currentPage,
                    totalPages: totalPages,
                    disabled: nextPageBtn.disabled
                });
            }
        }

        const inviteCodes = pageCodes;

        let html = '';
        inviteCodes.forEach((invite, index) => {
            const status = getInviteStatus(invite);
            const statusClass = status.class;
            const statusText = status.text;
            
            html += `
                <div class="code-item" data-status="${statusClass}">
                    <div class="code-header">
                        <div class="code-text" data-code="${invite.code}">${invite.code}</div>
                        <div class="code-status ${statusClass}">${statusText}</div>
                    </div>
                    <div class="code-info">
                        <div class="code-info-item">
                            <span class="info-label">创建时间：</span>
                            <span class="info-value">${formatDate(invite.createdAt)}</span>
                        </div>
                        <div class="code-info-item">
                            <span class="info-label">使用次数：</span>
                            <span class="info-value">${invite.usedCount}/${CONFIG.MAX_USE_COUNT}</span>
                        </div>
                        ${invite.lastUsedAt ? `
                        <div class="code-info-item">
                            <span class="info-label">最后使用：</span>
                            <span class="info-value">${formatDate(invite.lastUsedAt)}</span>
                        </div>
                        ` : ''}
                    </div>
                    <div class="code-actions">
                        <button class="copy-code-btn" data-code="${invite.code}">复制</button>
                        <button class="delete-btn" data-code="${invite.code}">删除</button>
                    </div>
                </div>
            `;
        });

        codesList.innerHTML = html;

        // 绑定复制按钮
        document.querySelectorAll('.copy-code-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const code = this.dataset.code;
                copyToClipboard(code, `邀请码 ${code} 已复制`);
            });
        });
        
        // 绑定删除按钮
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const code = this.dataset.code;
                if (confirm(`确定要删除邀请码 ${code} 吗？此操作不可恢复。`)) {
                    deleteInviteCode(code);
                }
            });
        });
    }

    /**
     * 获取邀请码状态
     * @param {Object} invite
     * @returns {Object}
     */
    function getInviteStatus(invite) {
        const usedCount = invite.usedCount || 0;
        if (usedCount === 0) {
            return { class: 'unused', text: '未使用' };
        } else if (usedCount < CONFIG.MAX_USE_COUNT) {
            return { class: 'partial', text: `已使用 ${usedCount}/${CONFIG.MAX_USE_COUNT}` };
        } else {
            return { class: 'used', text: '已用完' };
        }
    }

    /**
     * 删除邀请码
     * @param {string} code
     */
    async function deleteInviteCode(code) {
        let inviteCodes = Storage.getInviteCodes();
        inviteCodes = inviteCodes.filter(item => item.code !== code);
        Storage.setInviteCodes(inviteCodes);
        
        // 同步到云端
        await syncToCloud();
        
        // 检查当前页是否还有内容，如果没有则调整页码
        const filteredCodes = getFilteredCodes();
        const totalPages = Math.ceil(filteredCodes.length / itemsPerPage);
        if (totalPages === 0) {
            // 如果没有数据了，重置到第一页
            currentPage = 1;
        } else if (currentPage > totalPages) {
            // 如果当前页超出范围，回到最后一页
            currentPage = totalPages;
        }
        
        renderCodesList();
        updateStats();
    }

    /**
     * 更新统计信息
     */
    function updateStats() {
        try {
            const inviteCodes = Storage.getInviteCodes();
            if (!Array.isArray(inviteCodes)) {
                console.error('邀请码列表格式错误');
                return;
            }
            
            const totalCodes = inviteCodes.length;
            const usedCount = inviteCodes.reduce((sum, item) => {
                return sum + (item.usedCount || 0);
            }, 0);
            const remainingCount = inviteCodes.reduce((sum, item) => {
                const used = item.usedCount || 0;
                return sum + Math.max(0, CONFIG.MAX_USE_COUNT - used);
            }, 0);

            const totalCodesEl = document.getElementById('totalCodes');
            const usedCountEl = document.getElementById('usedCount');
            const remainingCountEl = document.getElementById('remainingCount');
            
            if (totalCodesEl) totalCodesEl.textContent = totalCodes;
            if (usedCountEl) usedCountEl.textContent = usedCount;
            if (remainingCountEl) remainingCountEl.textContent = remainingCount;
        } catch (error) {
            console.error('更新统计信息失败:', error);
        }
    }

    /**
     * 格式化日期（紧凑格式）
     * @param {string} dateString
     * @returns {string}
     */
    function formatDate(dateString) {
        if (!dateString) return '未知';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return '无效日期';
            }
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            // 使用紧凑格式：MM-DD HH:mm
            return `${month}-${day} ${hours}:${minutes}`;
        } catch (error) {
            console.error('日期格式化错误:', error);
            return '无效日期';
        }
    }
});
