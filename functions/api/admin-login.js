// Cloudflare Pages Functions - 管理员登录校验

export const onRequestPost = async ({ request, env }) => {
  if (!env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, message: "missing ADMIN_PASSWORD" }, { status: 500 });
  }

  const { username, password } = await request.json().catch(() => ({}));
  
  // 检查账号和密码（账号可选，如果提供则验证）
  if (username && username.trim() === '') {
    return Response.json({ ok: false, message: "账号不能为空" }, { status: 400 });
  }
  
  if (!password) {
    return Response.json({ ok: false, message: "密码不能为空" }, { status: 400 });
  }

  // 验证密码（账号暂时不验证，只验证密码）
  const ok = password === env.ADMIN_PASSWORD;
  return Response.json({ ok }, { status: ok ? 200 : 401 });
};

