/**
 * 获取用户数据 API
 */
export async function onRequestPost(context) {
    try {
        const { inviteCode } = await context.request.json();
        
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
        const data = await context.env.INVITE_CODES.get(key);
        
        return new Response(JSON.stringify({
            success: true,
            data: data ? JSON.parse(data) : null
        }), {
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        console.error('Get user data error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}