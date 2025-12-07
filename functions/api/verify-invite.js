// Cloudflare Pages Functions - 邀请码校验（哈希存储 + 使用次数限制）

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const MAX_USE_COUNT = 3; // 每个邀请码最多使用次数

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

  // 兼容旧格式（used: true）和新格式（usedCount: number）
  const usedCount = record.usedCount !== undefined ? record.usedCount : (record.used ? MAX_USE_COUNT : 0);

  if (usedCount >= MAX_USE_COUNT) {
    return Response.json({ ok: false, message: "used" }, { status: 410 });
  }

  // 更新使用次数
  const updatedRecord = {
    ...record,
    usedCount: usedCount + 1,
    lastUsedAt: new Date().toISOString(),
    // 保留旧字段以兼容
    used: usedCount + 1 >= MAX_USE_COUNT
  };

  await env.INVITE_CODES.put(hash, JSON.stringify(updatedRecord));
  return Response.json({ ok: true, usedCount: updatedRecord.usedCount, remaining: MAX_USE_COUNT - updatedRecord.usedCount });
};

