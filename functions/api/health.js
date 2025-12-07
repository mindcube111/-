/**
 * 健康检查 API
 */
export async function onRequestGet(context) {
    return new Response(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString()
    }), {
        headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    });
}