// 配置文件
const CONFIG = {
    // 调试模式（生产环境设为 false）
    DEBUG_MODE: false,
    
    // 管理员密码（本地调试占位，生产请使用 Cloudflare ENV: ADMIN_PASSWORD）
    DEFAULT_ADMIN_PASSWORD: 'CHANGE_ME_IN_ENV',
    
    // 邀请码配置
    INVITE_CODE_LENGTH: 6,
    MAX_USE_COUNT: 3, // 每个邀请码最多使用次数
    
    // 测试配置
    TOTAL_QUESTIONS: 60,
    
    // 存储键名
    STORAGE_KEYS: {
        ADMIN_PASSWORD: 'admin_password',
        INVITE_CODES: 'invite_codes',
        DEVICE_ID: 'device_id',
        TEST_ANSWERS: 'test_answers',
        TEST_RESULT: 'test_result',
        CURRENT_INVITE_CODE: 'current_invite_code'
    }
};

// 日志工具函数
const Logger = {
    log(...args) {
        if (CONFIG.DEBUG_MODE) {
            console.log(...args);
        }
    },
    error(...args) {
        // 错误日志始终输出
        console.error(...args);
    },
    warn(...args) {
        if (CONFIG.DEBUG_MODE) {
            console.warn(...args);
        }
    }
};









