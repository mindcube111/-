// localStorage 管理模块
const Storage = {
    /**
     * 获取数据
     * @param {string} key - 存储键名
     * @param {*} defaultValue - 默认值
     * @returns {*} 存储的数据
     */
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error(`Error reading from localStorage (${key}):`, error);
            return defaultValue;
        }
    },

    /**
     * 设置数据
     * @param {string} key - 存储键名
     * @param {*} value - 要存储的值
     * @returns {boolean} 是否成功
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error writing to localStorage (${key}):`, error);
            return false;
        }
    },

    /**
     * 删除数据
     * @param {string} key - 存储键名
     * @returns {boolean} 是否成功
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing from localStorage (${key}):`, error);
            return false;
        }
    },

    /**
     * 清空所有数据
     * @returns {boolean} 是否成功
     */
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    /**
     * 检查键是否存在
     * @param {string} key - 存储键名
     * @returns {boolean}
     */
    has(key) {
        return localStorage.getItem(key) !== null;
    },

    /**
     * 获取所有邀请码
     * @returns {Array}
     */
    getInviteCodes() {
        return this.get(CONFIG.STORAGE_KEYS.INVITE_CODES, []);
    },

    /**
     * 保存邀请码列表
     * @param {Array} codes
     * @returns {boolean}
     */
    setInviteCodes(codes) {
        return this.set(CONFIG.STORAGE_KEYS.INVITE_CODES, codes);
    },

    /**
     * 获取管理员密码
     * @returns {string}
     */
    getAdminPassword() {
        return this.get(CONFIG.STORAGE_KEYS.ADMIN_PASSWORD, CONFIG.DEFAULT_ADMIN_PASSWORD);
    },

    /**
     * 设置管理员密码
     * @param {string} password
     * @returns {boolean}
     */
    setAdminPassword(password) {
        return this.set(CONFIG.STORAGE_KEYS.ADMIN_PASSWORD, password);
    },

    /**
     * 获取设备ID
     * @returns {string}
     */
    getDeviceId() {
        return this.get(CONFIG.STORAGE_KEYS.DEVICE_ID);
    },

    /**
     * 设置设备ID
     * @param {string} deviceId
     * @returns {boolean}
     */
    setDeviceId(deviceId) {
        return this.set(CONFIG.STORAGE_KEYS.DEVICE_ID, deviceId);
    },

    /**
     * 获取测试答案
     * @returns {Object}
     */
    getTestAnswers() {
        return this.get(CONFIG.STORAGE_KEYS.TEST_ANSWERS, {});
    },

    /**
     * 保存测试答案
     * @param {Object} answers
     * @returns {boolean}
     */
    setTestAnswers(answers) {
        return this.set(CONFIG.STORAGE_KEYS.TEST_ANSWERS, answers);
    },

    /**
     * 清除测试答案
     * @returns {boolean}
     */
    clearTestAnswers() {
        return this.remove(CONFIG.STORAGE_KEYS.TEST_ANSWERS);
    },

    /**
     * 获取测试结果
     * @returns {Object}
     */
    getTestResult() {
        return this.get(CONFIG.STORAGE_KEYS.TEST_RESULT);
    },

    /**
     * 保存测试结果
     * @param {Object} result
     * @returns {boolean}
     */
    setTestResult(result) {
        return this.set(CONFIG.STORAGE_KEYS.TEST_RESULT, result);
    },

    /**
     * 获取当前邀请码
     * @returns {string}
     */
    getCurrentInviteCode() {
        return this.get(CONFIG.STORAGE_KEYS.CURRENT_INVITE_CODE);
    },

    /**
     * 设置当前邀请码
     * @param {string} code
     * @returns {boolean}
     */
    setCurrentInviteCode(code) {
        return this.set(CONFIG.STORAGE_KEYS.CURRENT_INVITE_CODE, code);
    }
};









