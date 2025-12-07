/**
 * 保存用户数据 API
 */
export async function onRequestPost(context) {
    try {
        const { inviteCode, data } = await context.request.json();
        
        if (!inviteCode) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Invite code is required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // 使用邀请码作为键名
        const key = `user_data_${inviteCode}`;
        
        // 添加时间戳
        const userData = {
            ...data,
            lastSync: new Date().toISOString()
        };
        
        // 保存到 KV 存储
        await context.env.INVITE_CODES.put(key, JSON.stringify(userData));
        
        return new Response(JSON.stringify({
            success: true
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Save user data error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}