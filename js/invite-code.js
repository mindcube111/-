// 邀请码验证逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 等待依赖加载完成
    if (typeof Storage === 'undefined' || typeof DeviceManager === 'undefined' || typeof CONFIG === 'undefined') {
        console.error('邀请码验证需要依赖 Storage, DeviceManager, CONFIG');
        return;
    }

    // 获取DOM元素（适配 index.html 的结构）
    const inviteCodeInput = document.getElementById('invite-code-input');
    const submitBtn = document.getElementById('invite-code-submit');
    const errorMsg = document.getElementById('invite-code-error');
    const successMsg = document.getElementById('invite-code-success');
    const inviteCodeSection = document.getElementById('invite-code-section');

    // 如果元素不存在，说明不在 index.html 页面，直接返回
    if (!inviteCodeInput || !submitBtn || !errorMsg) {
        if (typeof Logger !== 'undefined') Logger.log('邀请码元素不存在，可能不在 index.html 页面');
        return;
    }

    // 确保邀请码输入区域默认显示
    if (inviteCodeSection) {
        inviteCodeSection.style.display = 'block';
    }
    // 确保成功消息默认隐藏
    if (successMsg) {
        successMsg.style.display = 'none';
    }
    // 确保错误消息默认隐藏
    if (errorMsg) {
        errorMsg.textContent = '';
    }

    // 检查是否已有有效的邀请码（仅检查，不自动跳转）
    try {
        const currentCode = Storage.getCurrentInviteCode();
        if (currentCode) {
            const inviteCodes = Storage.getInviteCodes();
            const deviceId = DeviceManager.getDeviceId();
            const invite = inviteCodes.find(item => 
                item.code === currentCode && 
                item.deviceId === deviceId &&
                item.usedCount < CONFIG.MAX_USE_COUNT
            );
            
            if (!invite) {
                // 邀请码无效，清除它
                Storage.remove(CONFIG.STORAGE_KEYS.CURRENT_INVITE_CODE);
            }
            // 不自动跳转，始终显示输入界面
        }
    } catch (error) {
        console.error('检查邀请码时出错:', error);
        // 出错时确保邀请码输入区域显示
        if (inviteCodeSection) inviteCodeSection.style.display = 'block';
    }
    
    // 确保测试页面默认隐藏
    if (typeof window.ensureIntroSectionVisible === 'function') {
        window.ensureIntroSectionVisible();
    } else {
        // 备用方案：直接操作DOM
        setTimeout(() => {
            const introSection = document.getElementById('intro-section');
            const progressSection = document.getElementById('progress-section');
            const answerCardSection = document.getElementById('answer-card-section');
            const questionSection = document.getElementById('question-section');
            
            if (introSection) introSection.classList.remove('hidden');
            if (progressSection) progressSection.classList.add('hidden');
            if (answerCardSection) answerCardSection.classList.add('hidden');
            if (questionSection) questionSection.classList.add('hidden');
        }, 100);
    }

    // 确保输入框可编辑
    inviteCodeInput.removeAttribute('readonly');
    inviteCodeInput.removeAttribute('disabled');
    inviteCodeInput.setAttribute('autocomplete', 'off');
    
    // 确保输入框样式正确（优先级最高）
    inviteCodeInput.style.pointerEvents = 'auto !important';
    inviteCodeInput.style.cursor = 'text';
    inviteCodeInput.style.zIndex = '9999';
    inviteCodeInput.style.position = 'relative';
    inviteCodeInput.style.opacity = '1';
    inviteCodeInput.tabIndex = 0;
    
    // 确保输入框容器也可交互
    if (inviteCodeSection) {
        inviteCodeSection.style.pointerEvents = 'auto';
        inviteCodeSection.style.zIndex = '9999';
        inviteCodeSection.style.position = 'relative';
    }
    
    const inputWrapper = inviteCodeInput.parentElement;
    if (inputWrapper) {
        inputWrapper.style.pointerEvents = 'auto';
        inputWrapper.style.zIndex = '9999';
        inputWrapper.style.position = 'relative';
    }
    
    // 调试信息
    setTimeout(() => {
        const computedStyle = window.getComputedStyle(inviteCodeInput);
        if (typeof Logger !== 'undefined') {
            Logger.log('邀请码输入框状态:', {
                disabled: inviteCodeInput.disabled,
                readonly: inviteCodeInput.readOnly,
                display: computedStyle.display,
                pointerEvents: computedStyle.pointerEvents,
                zIndex: computedStyle.zIndex,
                position: computedStyle.position,
                opacity: computedStyle.opacity
            });
        }
        
        // 测试是否可以聚焦
        try {
            inviteCodeInput.focus();
            if (typeof Logger !== 'undefined') Logger.log('输入框已成功聚焦');
        } catch (e) {
            console.error('无法聚焦输入框:', e);
        }
    }, 100);
    
    // 自动转大写并过滤非法字符
    inviteCodeInput.addEventListener('input', function(e) {
        if (typeof Logger !== 'undefined') Logger.log('输入事件触发:', this.value);
        const originalValue = this.value;
        this.value = originalValue.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (errorMsg) errorMsg.textContent = '';
        inviteCodeInput.classList.remove('error');
    });
    
    // 监听焦点事件
    inviteCodeInput.addEventListener('focus', function() {
        if (typeof Logger !== 'undefined') Logger.log('邀请码输入框获得焦点');
        this.style.borderColor = 'var(--accent)';
    });
    
    inviteCodeInput.addEventListener('blur', function() {
        this.style.borderColor = '';
    });
    
    // 监听点击事件
    inviteCodeInput.addEventListener('click', function() {
        if (typeof Logger !== 'undefined') Logger.log('邀请码输入框被点击');
        this.focus();
    });

    // 回车提交
    inviteCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });

    // 提交验证
    submitBtn.addEventListener('click', async function() {
        const code = inviteCodeInput.value.trim();
        
        if (!code) {
            showError('请输入邀请码');
            return;
        }

        if (code.length !== CONFIG.INVITE_CODE_LENGTH) {
            showError('邀请码必须为6位');
            return;
        }

        // 禁用按钮，显示加载状态
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '验证中...';

        try {
            // 优先使用 API 验证（生产环境）
            const result = await validateInviteCodeWithAPI(code);
            
            if (result.success) {
                // 保存当前邀请码
                Storage.setCurrentInviteCode(code);
                // 清除错误消息
                if (errorMsg) {
                    errorMsg.textContent = '';
                }
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
                inviteCodeInput.value = '';
                
                // 直接开始测试
                startTest();
            } else {
                showError(result.message);
            }
        } catch (error) {
            console.error('验证邀请码时出错:', error);
            // API 失败时，回退到本地验证（开发环境）
            const localResult = validateInviteCode(code);
            if (localResult.success) {
                Storage.setCurrentInviteCode(code);
                if (errorMsg) errorMsg.textContent = '';
                if (successMsg) successMsg.style.display = 'block';
                inviteCodeInput.value = '';
                startTest();
            } else {
                showError('验证失败：' + (error.message || localResult.message));
            }
        } finally {
            // 恢复按钮状态
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    /**
     * 通过 API 验证邀请码（生产环境）
     * @param {string} code
     * @returns {Promise<Object>}
     */
    async function validateInviteCodeWithAPI(code) {
        try {
            const response = await fetch('/api/verify-invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: code })
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                return {
                    success: true,
                    message: '验证成功'
                };
            } else {
                // 根据 API 返回的错误信息提供友好的提示
                let message = '邀请码验证失败';
                if (data.message === 'invalid') {
                    message = '邀请码不存在或已失效';
                } else if (data.message === 'used') {
                    message = '此邀请码已被使用';
                } else if (data.message) {
                    message = data.message;
                }
                return {
                    success: false,
                    message: message
                };
            }
        } catch (error) {
            // 网络错误或其他错误，抛出异常以便回退到本地验证
            throw error;
        }
    }

    /**
     * 验证邀请码（本地验证，用于开发环境或 API 失败时的回退）
     * @param {string} code
     * @returns {Object}
     */
    function validateInviteCode(code) {
        try {
            const inviteCodes = Storage.getInviteCodes();
            const deviceId = DeviceManager.getDeviceId();

            // 确保 inviteCodes 是数组
            if (!Array.isArray(inviteCodes)) {
                console.error('邀请码列表格式错误:', inviteCodes);
                return {
                    success: false,
                    message: '系统错误：邀请码数据格式异常'
                };
            }

            // 查找邀请码
            const invite = inviteCodes.find(item => item && item.code === code);

            if (!invite) {
                return {
                    success: false,
                    message: '邀请码不存在或已失效'
                };
            }

            // 确保 usedCount 是数字
            const currentUsedCount = parseInt(invite.usedCount) || 0;
            
            // 调试信息
            if (typeof Logger !== 'undefined') {
                Logger.log('验证邀请码:', {
                    code: code,
                    currentUsedCount: currentUsedCount,
                    maxUseCount: CONFIG.MAX_USE_COUNT,
                    deviceId: invite.deviceId,
                    currentDeviceId: deviceId
                });
            }

            // 检查是否已绑定设备
            if (invite.deviceId && invite.deviceId !== deviceId) {
                return {
                    success: false,
                    message: '此邀请码已在其他设备使用'
                };
            }

            // 检查使用次数
            if (currentUsedCount >= CONFIG.MAX_USE_COUNT) {
                return {
                    success: false,
                    message: `此邀请码使用次数已达上限（${CONFIG.MAX_USE_COUNT}次）`
                };
            }

            // 更新邀请码信息
            if (!invite.deviceId) {
                invite.deviceId = deviceId;
            }
            invite.usedCount = currentUsedCount + 1;
            invite.lastUsedAt = new Date().toISOString();

            // 保存更新
            const saved = Storage.setInviteCodes(inviteCodes);
            if (!saved) {
                console.error('保存邀请码失败');
                return {
                    success: false,
                    message: '保存邀请码信息失败，请重试'
                };
            }

            if (typeof Logger !== 'undefined') Logger.log('邀请码验证成功，当前使用次数:', invite.usedCount);

            return {
                success: true,
                message: '验证成功'
            };
        } catch (error) {
            console.error('验证邀请码时出错:', error);
            return {
                success: false,
                message: '验证过程中出错：' + error.message
            };
        }
    }

    /**
     * 显示错误信息
     * @param {string} message
     */
    function showError(message) {
        if (errorMsg) {
            errorMsg.textContent = message;
        }
        if (inviteCodeInput) {
            inviteCodeInput.classList.add('error');
            setTimeout(() => {
                inviteCodeInput.classList.remove('error');
            }, 500);
        }
        if (successMsg) {
            successMsg.style.display = 'none';
        }
    }

    /**
     * 开始测试
     */
    function startTest() {
        // 验证邀请码是否有效
        const currentCode = Storage.getCurrentInviteCode();
        if (!currentCode) {
            showError('请先验证邀请码');
            return;
        }

        const inviteCodes = Storage.getInviteCodes();
        const deviceId = DeviceManager.getDeviceId();
        const invite = inviteCodes.find(item => 
            item.code === currentCode && 
            item.deviceId === deviceId &&
            item.usedCount < CONFIG.MAX_USE_COUNT
        );

        if (!invite) {
            showError('邀请码已失效，请重新验证');
            return;
        }

        // 隐藏邀请码输入区域
        if (inviteCodeSection) {
            inviteCodeSection.style.display = 'none';
        }
        
        // 直接调用全局的开始测试函数（如果存在）
        if (typeof window.startTestAfterInviteCode === 'function') {
            window.startTestAfterInviteCode();
        } else {
            // 如果函数不存在，触发自定义事件让 script.js 处理
            const startTestEvent = new CustomEvent('inviteCodeVerified', {
                detail: { code: currentCode }
            });
            document.dispatchEvent(startTestEvent);
        }
    }
});









