// 设备识别模块
const DeviceManager = {
    /**
     * 生成UUID
     * @returns {string}
     */
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * 生成设备指纹
     * @returns {string}
     */
    generateFingerprint() {
        const ua = navigator.userAgent;
        const lang = navigator.language || navigator.userLanguage;
        const screen = `${window.screen.width}x${window.screen.height}`;
        const timezone = new Date().getTimezoneOffset();
        
        // 简单的指纹组合
        return `${ua}_${lang}_${screen}_${timezone}`;
    },

    /**
     * 获取或创建设备ID
     * @returns {string}
     */
    getDeviceId() {
        let deviceId = Storage.getDeviceId();
        
        if (!deviceId) {
            // 生成新的设备ID
            const fingerprint = this.generateFingerprint();
            const uuid = this.generateUUID();
            deviceId = `${fingerprint}_${uuid}`;
            
            // 保存到localStorage
            Storage.setDeviceId(deviceId);
        }
        
        return deviceId;
    },

    /**
     * 检查两个设备ID是否匹配
     * @param {string} deviceId1
     * @param {string} deviceId2
     * @returns {boolean}
     */
    isSameDevice(deviceId1, deviceId2) {
        return deviceId1 === deviceId2;
    }
};









