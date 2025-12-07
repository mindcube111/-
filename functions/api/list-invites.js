// Cloudflare Pages Functions - 获取邀请码列表（简化版）
// 注意：KV 不支持列出所有键，这里返回一个占位响应
// 实际项目中需要维护一个邀请码列表键

export const onRequestGet = async ({ request, env }) => {
  // 验证管理员权限
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.substring(7);
  if (token !== env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, message: "Invalid token" }, { status: 401 });
  }

  // 由于 KV 不支持列出所有键，这里返回空列表
  // 实际项目中可以维护一个 LIST 键来存储所有邀请码
  return Response.json({
    ok: true,
    codes: [],
    message: "KV does not support listing all keys. Use local storage for management."
  });
};




