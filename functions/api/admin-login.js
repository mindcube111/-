// Cloudflare Pages Functions - 管理员登录校验

export const onRequestPost = async ({ request, env }) => {
  if (!env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, message: "missing ADMIN_PASSWORD" }, { status: 500 });
  }

  const { password } = await request.json().catch(() => ({}));
  if (!password) {
    return Response.json({ ok: false, message: "missing password" }, { status: 400 });
  }

  const ok = password === env.ADMIN_PASSWORD;
  return Response.json({ ok }, { status: ok ? 200 : 401 });
};

