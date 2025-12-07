// Cloudflare Pages Functions - 邀请码校验（哈希存储 + 一次性标记）

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const onRequestPost = async ({ request, env }) => {
  if (!env.INVITE_CODES || !env.INVITE_SALT) {
    return Response.json(
      { ok: false, message: "missing bindings: INVITE_CODES or INVITE_SALT" },
      { status: 500 }
    );
  }

  const { code } = await request.json().catch(() => ({}));
  if (!code) {
    return Response.json({ ok: false, message: "missing code" }, { status: 400 });
  }

  const hash = await sha256Hex(env.INVITE_SALT + code);
  const record = await env.INVITE_CODES.get(hash, "json");
  if (!record) {
    return Response.json({ ok: false, message: "invalid" }, { status: 404 });
  }

  if (record.used) {
    return Response.json({ ok: false, message: "used" }, { status: 410 });
  }

  await env.INVITE_CODES.put(hash, JSON.stringify({ ...record, used: true }));
  return Response.json({ ok: true });
};

