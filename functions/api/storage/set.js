/**
 * 设置存储数据 API
 */
export async function onRequestPost(context) {
    try {
        const { key, value } = await context.request.json();
        
        if (!key) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Key is required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // 保存到 KV 存储
        await context.env.INVITE_CODES.put(key, JSON.stringify(value));
        
        return new Response(JSON.stringify({
            success: true
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Storage set error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}