// Cloudflare Pages Functions - 管理员登录校验

export const onRequestPost = async ({ request, env }) => {
  // 检查环境变量
  if (!env.ADMIN_USERNAME) {
    return Response.json({ ok: false, message: "missing ADMIN_USERNAME" }, { status: 500 });
  }
  
  if (!env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, message: "missing ADMIN_PASSWORD" }, { status: 500 });
  }

  const { username, password } = await request.json().catch(() => ({}));
  
  // 检查账号和密码（都必须提供）
  if (!username || username.trim() === '') {
    return Response.json({ ok: false, message: "账号不能为空" }, { status: 400 });
  }
  
  if (!password || password.trim() === '') {
    return Response.json({ ok: false, message: "密码不能为空" }, { status: 400 });
  }

  // 验证账号和密码
  const usernameMatch = username.trim() === env.ADMIN_USERNAME;
  const passwordMatch = password === env.ADMIN_PASSWORD;
  const ok = usernameMatch && passwordMatch;
  
  return Response.json({ ok }, { status: ok ? 200 : 401 });
};

