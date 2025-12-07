// 云端同步存储模块
const SyncStorage = {
    // API 基础路径
    API_BASE: '/api',
    
    // 同步状态
    syncEnabled: true,
    
    /**
     * 从服务器获取数据
     * @param {string} key - 存储键名
     * @param {*} defaultValue - 默认值
     * @returns {Promise<*>}
     */
    async get(key, defaultValue = null) {
        if (!this.syncEnabled) {
            return Storage.get(key, defaultValue);
        }
        
        try {
            const response = await fetch(`${this.API_BASE}/storage/get`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key })
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.value !== null) {
                    // 更新本地缓存
                    Storage.set(key, data.value);
                    return data.value;
                }
            }
            
            // 降级到本地存储
            return Storage.get(key, defaultValue);
        } catch (error) {
            Logger.error('Sync get error:', error);
            // 降级到本地存储
            return Storage.get(key, defaultValue);
        }
    },
    
    /**
     * 保存数据到服务器
     * @param {string} key - 存储键名
     * @param {*} value - 要存储的值
     * @returns {Promise<boolean>}
     */
    async set(key, value) {
        // 先保存到本地
        Storage.set(key, value);
        
        if (!this.syncEnabled) {
            return true;
        }
        
        try {
            const response = await fetch(`${this.API_BASE}/storage/set`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value })
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.success;
            }
            
            return false;
        } catch (error) {
            Logger.error('Sync set error:', error);
            // 本地已保存，返回 true
            return true;
        }
    },
    
    /**
     * 获取用户数据（基于邀请码）
     * @param {string} inviteCode - 邀请码
     * @returns {Promise<Object|null>}
     */
    async getUserData(inviteCode) {
        if (!this.syncEnabled || !inviteCode) {
            return null;
        }
        
        try {
            const response = await fetch(`${this.API_BASE}/user/data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inviteCode })
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.success ? data.data : null;
            }
            
            return null;
        } catch (error) {
            Logger.error('Get user data error:', error);
            return null;
        }
    },
    
    /**
     * 保存用户数据
     * @param {string} inviteCode - 邀请码
     * @param {Object} userData - 用户数据
     * @returns {Promise<boolean>}
     */
    async saveUserData(inviteCode, userData) {
        if (!this.syncEnabled || !inviteCode) {
            return false;
        }
        
        try {
            const response = await fetch(`${this.API_BASE}/user/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    inviteCode, 
                    data: {
                        ...userData,
                        lastSync: new Date().toISOString(),
                        deviceId: DeviceManager.getDeviceId()
                    }
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.success;
            }
            
            return false;
        } catch (error) {
            Logger.error('Save user data error:', error);
            return false;
        }
    },
    
    /**
     * 同步测试进度
     * @returns {Promise<boolean>}
     */
    async syncTestProgress() {
        const inviteCode = Storage.getCurrentInviteCode();
        if (!inviteCode) {
            Logger.warn('No invite code found, skip sync');
            return false;
        }
        
        const answers = Storage.getTestAnswers();
        const result = Storage.getTestResult();
        
        return await this.saveUserData(inviteCode, {
            answers,
            result,
            progress: Object.keys(answers).length,
            totalQuestions: CONFIG.TOTAL_QUESTIONS
        });
    },
    
    /**
     * 加载测试进度
     * @returns {Promise<Object|null>}
     */
    async loadTestProgress() {
        const inviteCode = Storage.getCurrentInviteCode();
        if (!inviteCode) {
            Logger.warn('No invite code found, skip load');
            return null;
        }
        
        const cloudData = await this.getUserData(inviteCode);
        
        if (cloudData) {
            // 更新本地数据
            if (cloudData.answers) {
                Storage.setTestAnswers(cloudData.answers);
            }
            if (cloudData.result) {
                Storage.setTestResult(cloudData.result);
            }
            
            Logger.log('Progress loaded from cloud:', cloudData);
            return cloudData;
        }
        
        return null;
    },
    
    /**
     * 检查同步状态
     * @returns {Promise<boolean>}
     */
    async checkSyncStatus() {
        try {
            const response = await fetch(`${this.API_BASE}/health`, {
                method: 'GET'
            });
            
            this.syncEnabled = response.ok;
            return this.syncEnabled;
        } catch (error) {
            Logger.error('Sync status check failed:', error);
            this.syncEnabled = false;
            return false;
        }
    }
};