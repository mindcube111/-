/**
 * 获取存储数据 API
 */
export async function onRequestPost(context) {
    try {
        const { key } = await context.request.json();
        
        if (!key) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Key is required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // 从 KV 存储获取数据
        const value = await context.env.INVITE_CODES.get(key);
        
        return new Response(JSON.stringify({
            success: true,
            value: value ? JSON.parse(value) : null
        }), {
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        console.error('Storage get error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}