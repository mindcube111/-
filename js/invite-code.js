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
            // 🔧 修复：优先使用本地验证（刚生成的邀请码在本地存储中）
            console.log('开始验证邀请码:', code);
            const localResult = await validateInviteCode(code);
            
            if (localResult.success) {
                // 本地验证成功，直接使用
                console.log('本地验证成功');
                Storage.setCurrentInviteCode(code);
                if (errorMsg) errorMsg.textContent = '';
                if (successMsg) {
                    successMsg.textContent = localResult.message || '邀请码验证成功！';
                    successMsg.style.display = 'block';
                }
                inviteCodeInput.value = '';
                startTest();
                return;
            }
            
            // 本地验证失败，尝试 API 验证（可能是其他设备生成的邀请码）
            console.log('本地验证失败，尝试 API 验证');
            const apiResult = await validateInviteCodeWithAPI(code);
            
            if (apiResult.success) {
                // API 验证成功
                console.log('API 验证成功');
                Storage.setCurrentInviteCode(code);
                if (errorMsg) errorMsg.textContent = '';
                if (successMsg) {
                    const remaining = apiResult.remaining !== undefined ? apiResult.remaining : (CONFIG.MAX_USE_COUNT - (apiResult.usedCount || 0));
                    successMsg.textContent = `邀请码验证成功！剩余可用次数：${remaining}次`;
                    successMsg.style.display = 'block';
                }
                inviteCodeInput.value = '';
                startTest();
            } else {
                // API 验证也失败
                showError(apiResult.message);
            }
        } catch (error) {
            console.error('验证邀请码时出错:', error);
            // API 请求失败，显示友好的错误信息
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                showError('网络错误，请检查网络连接后重试');
            } else {
                showError('验证失败：' + error.message);
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

            // 先获取响应文本，以便调试
            const responseText = await response.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('响应解析失败:', parseError, '响应内容:', responseText);
                throw new Error('响应格式错误');
            }
            
            // 调试信息
            console.log('API 验证响应:', {
                status: response.status,
                ok: response.ok,
                statusText: response.statusText,
                data: data,
                responseText: responseText
            });

            if (response.ok && data && data.ok === true) {
                // API 验证成功，同步到本地存储
                try {
                    const inviteCodes = Storage.getInviteCodes() || [];
                    const deviceId = DeviceManager.getDeviceId();
                    let invite = inviteCodes.find(item => item && item.code === code);
                    
                    const now = new Date().toISOString();
                    if (!invite) {
                        // 如果本地存储中没有，创建一个新记录
                        invite = {
                            code: code,
                            deviceId: deviceId,
                            usedCount: data.usedCount || 1,
                            createdAt: new Date().toISOString(),
                            lastUsedAt: now,
                            boundAt: now,
                            disabled: false,
                            usageHistory: [{
                                deviceId: deviceId,
                                usedAt: now,
                                userAgent: navigator.userAgent || 'unknown',
                                ip: 'unknown'
                            }]
                        };
                        inviteCodes.push(invite);
                    } else {
                        // 更新现有记录（API验证时不增加使用次数）
                        // 使用次数在测试完成时通过 update-invite-usage API 增加
                        if (data.usedCount !== undefined) {
                            invite.usedCount = data.usedCount; // 使用API返回的值，不增加
                        }
                        invite.lastUsedAt = now;
                        if (!invite.deviceId) {
                            invite.deviceId = deviceId;
                            invite.boundAt = now;
                        }
                        // 初始化使用记录数组
                        if (!invite.usageHistory) {
                            invite.usageHistory = [];
                        }
                        // 添加验证记录（标记为未完成测试）
                        invite.usageHistory.push({
                            deviceId: deviceId,
                            usedAt: now,
                            userAgent: navigator.userAgent || 'unknown',
                            ip: 'unknown',
                            testCompleted: false // 标记为验证但未完成测试
                        });
                    }
                    
                    Storage.setInviteCodes(inviteCodes);
                    console.log('邀请码已同步到本地存储:', invite);
                } catch (syncError) {
                    console.error('同步邀请码到本地存储失败:', syncError);
                    // 即使同步失败，也继续，因为 API 验证已经成功
                }
                
                return {
                    success: true,
                    message: '验证成功',
                    usedCount: data.usedCount,
                    remaining: data.remaining
                };
            } else {
                // 根据 API 返回的错误信息提供友好的提示
                let message = '邀请码验证失败';
                if (data.message === 'invalid') {
                    message = '邀请码不存在或已失效';
                } else if (data.message === 'used') {
                    message = '邀请码使用次数已用尽，请联系管理员获取新邀请码';
                } else if (data.message === 'device_mismatch') {
                    message = '该邀请码已绑定其他设备，请在首次使用的设备上操作';
                } else if (data.message) {
                    message = data.message;
                }
                return {
                    success: false,
                    message: message,
                    debug: data.debug
                };
            }
        } catch (error) {
            // 网络错误或其他错误，抛出异常以便回退到本地验证
            console.error('API 验证请求失败:', error);
            throw error;
        }
    }

    /**
     * 验证邀请码（本地验证，用于开发环境或 API 失败时的回退）
     * @param {string} code
     * @returns {Promise<Object>}
     */
    async function validateInviteCode(code) {
        try {
            // 确保 Storage 对象已加载
            if (typeof Storage === 'undefined') {
                return {
                    success: false,
                    message: '系统错误：Storage 未定义'
                };
            }
            
            const inviteCodes = Storage.getInviteCodes();
            const deviceId = DeviceManager.getDeviceId();
            
            // 调试信息
            if (typeof Logger !== 'undefined') {
                Logger.log('本地验证邀请码:', {
                    code: code,
                    inviteCodesCount: inviteCodes ? inviteCodes.length : 0,
                    deviceId: deviceId
                });
            }

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

            // 检查是否已禁用
            if (invite.disabled === true) {
                return {
                    success: false,
                    message: '该邀请码已被管理员禁用'
                };
            }

            // 检查是否已绑定设备
            if (invite.deviceId && invite.deviceId !== deviceId) {
                return {
                    success: false,
                    message: '该邀请码已绑定其他设备，请在首次使用的设备上操作'
                };
            }

            // 检查使用次数
            if (currentUsedCount >= CONFIG.MAX_USE_COUNT) {
                return {
                    success: false,
                    message: `邀请码使用次数已用尽，请联系管理员获取新邀请码`
                };
            }

            // 更新邀请码信息
            const now = new Date().toISOString();
            if (!invite.deviceId) {
                invite.deviceId = deviceId;
                invite.boundAt = now; // 记录绑定时间
            }
            
            // 初始化使用记录数组
            if (!invite.usageHistory) {
                invite.usageHistory = [];
            }
            
            // 验证时不增加使用次数，只添加验证记录（标记为未完成测试）
            const usageRecord = {
                deviceId: deviceId,
                usedAt: now,
                userAgent: navigator.userAgent || 'unknown',
                ip: 'unknown', // 前端无法获取真实IP，需要后端记录
                testCompleted: false // 标记为验证但未完成测试
            };
            invite.usageHistory.push(usageRecord);
            
            // 验证时不增加使用次数，使用次数在测试完成时增加
            // invite.usedCount = currentUsedCount + 1; // 注释掉，测试完成时再增加
            invite.lastUsedAt = now;

            // 保存更新到本地
            const saved = Storage.setInviteCodes(inviteCodes);
            if (!saved) {
                console.error('保存邀请码失败');
                return {
                    success: false,
                    message: '保存邀请码信息失败，请重试'
                };
            }
            
            // 同步到云端（异步，不阻塞）
            if (typeof SyncStorage !== 'undefined') {
                try {
                    await SyncStorage.set(CONFIG.STORAGE_KEYS.INVITE_CODES, inviteCodes);
                    if (typeof Logger !== 'undefined') Logger.log('邀请码使用情况已同步到云端');
                } catch (error) {
                    console.error('同步到云端失败:', error);
                    // 同步失败不影响本地使用
                }
            }

            // 验证时不增加使用次数，所以 remaining 基于当前使用次数
            const remaining = CONFIG.MAX_USE_COUNT - currentUsedCount;
            if (typeof Logger !== 'undefined') Logger.log('邀请码验证成功，当前使用次数:', currentUsedCount, '剩余次数:', remaining);

            return {
                success: true,
                message: `邀请码验证成功！剩余可用次数：${remaining}次`,
                usedCount: currentUsedCount,
                remaining: remaining
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

        // 检查本地存储中的邀请码（如果 API 验证成功，应该已经同步）
        const inviteCodes = Storage.getInviteCodes() || [];
        const deviceId = DeviceManager.getDeviceId();
        let invite = inviteCodes.find(item => 
            item && item.code === currentCode
        );

        // 如果本地存储中没有，但 API 验证已经成功，创建一个临时记录
        if (!invite) {
            console.warn('本地存储中未找到邀请码，但 API 验证已成功，创建临时记录');
            invite = {
                code: currentCode,
                deviceId: deviceId,
                usedCount: 1, // API 验证成功后，使用次数应该是 1
                createdAt: new Date().toISOString(),
                lastUsedAt: new Date().toISOString()
            };
            inviteCodes.push(invite);
            Storage.setInviteCodes(inviteCodes);
        }

        // 检查使用次数（允许继续，因为 API 已经验证过）
        if (invite.usedCount >= CONFIG.MAX_USE_COUNT) {
            showError('邀请码使用次数已达上限');
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









