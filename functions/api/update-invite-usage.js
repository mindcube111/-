// Cloudflare Pages Functions - 更新邀请码使用记录（测试完成时调用）

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

  const { code, usedCount, lastUsedAt, deviceId } = await request.json().catch(() => ({}));
  
  if (!code) {
    return Response.json({ ok: false, message: "missing code" }, { status: 400 });
  }

  const hash = await sha256Hex(env.INVITE_SALT + code);
  const record = await env.INVITE_CODES.get(hash, "json");
  
  if (!record) {
    return Response.json({ ok: false, message: "invite code not found" }, { status: 404 });
  }

  // 更新最后使用时间（如果提供）
  const updatedRecord = {
    ...record,
    lastUsedAt: lastUsedAt || new Date().toISOString()
  };

  // 如果提供了使用次数，确保一致
  if (usedCount !== undefined) {
    updatedRecord.usedCount = usedCount;
    updatedRecord.used = usedCount >= 3;
  }

  await env.INVITE_CODES.put(hash, JSON.stringify(updatedRecord));
  
  return Response.json({ 
    ok: true, 
    usedCount: updatedRecord.usedCount,
    lastUsedAt: updatedRecord.lastUsedAt
  });
};

