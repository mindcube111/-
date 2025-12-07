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
  
  // 调试信息
  console.log('验证邀请码:', { 
    code, 
    saltLength: env.INVITE_SALT ? env.INVITE_SALT.length : 0,
    hash: hash.substring(0, 16) + '...',
    fullHash: hash
  });
  
  const record = await env.INVITE_CODES.get(hash, "json");
  if (!record) {
    console.log('邀请码不存在:', { 
      code, 
      hash: hash.substring(0, 16) + '...',
      fullHash: hash,
      message: 'KV 中未找到该哈希值，可能原因：1. 盐值不一致 2. 邀请码未添加到 KV'
    });
    return Response.json({ 
      ok: false, 
      message: "invalid",
      debug: {
        code: code,
        hashPrefix: hash.substring(0, 16),
        reason: "邀请码不存在于 KV 中，请检查：1. 邀请码是否正确生成并添加到 KV 2. INVITE_SALT 是否一致"
      }
    }, { status: 404 });
  }
  
  console.log('找到邀请码记录:', { 
    code, 
    record: {
      usedCount: record.usedCount,
      used: record.used,
      batch: record.batch,
      createdAt: record.createdAt
    }
  });

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

