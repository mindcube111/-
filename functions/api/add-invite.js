// Cloudflare Pages Functions - 添加邀请码到 KV

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const onRequestPost = async ({ request, env }) => {
  // 验证管理员权限
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.substring(7);
  if (token !== env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, message: "Invalid token" }, { status: 401 });
  }

  if (!env.INVITE_CODES || !env.INVITE_SALT) {
    return Response.json(
      { ok: false, message: "missing bindings: INVITE_CODES or INVITE_SALT" },
      { status: 500 }
    );
  }

  const { codes } = await request.json().catch(() => ({}));
  if (!codes || !Array.isArray(codes) || codes.length === 0) {
    return Response.json({ ok: false, message: "missing codes array" }, { status: 400 });
  }

  const batch = new Date().toISOString().slice(0, 7); // YYYY-MM
  const results = [];

  for (const code of codes) {
    if (!code || typeof code !== "string") {
      results.push({ code, ok: false, message: "invalid code format" });
      continue;
    }

    try {
      const hash = await sha256Hex(env.INVITE_SALT + code);
      
      // 调试信息
      console.log('添加邀请码:', { 
        code, 
        saltLength: env.INVITE_SALT ? env.INVITE_SALT.length : 0,
        hash: hash.substring(0, 16) + '...',
        fullHash: hash
      });
      
      const existing = await env.INVITE_CODES.get(hash, "json");
      
      if (existing) {
        results.push({ code, ok: false, message: "code already exists" });
        continue;
      }

      const record = { 
        used: false, 
        usedCount: 0, 
        batch, 
        createdAt: new Date().toISOString(),
        lastUsedAt: null
      };
      
      await env.INVITE_CODES.put(hash, JSON.stringify(record));
      
      // 验证写入是否成功
      const verify = await env.INVITE_CODES.get(hash, "json");
      if (!verify) {
        console.error('KV 写入验证失败:', { code, hash: hash.substring(0, 16) + '...' });
        results.push({ code, ok: false, message: "failed to save to KV" });
        continue;
      }
      
      console.log('邀请码已成功添加到 KV:', { 
        code, 
        hash: hash.substring(0, 16) + '...',
        verify: {
          usedCount: verify.usedCount,
          batch: verify.batch
        }
      });
      
      results.push({ code, ok: true });
    } catch (error) {
      results.push({ code, ok: false, message: error.message });
    }
  }

  const successCount = results.filter((r) => r.ok).length;
  return Response.json({
    ok: true,
    total: codes.length,
    success: successCount,
    failed: codes.length - successCount,
    results,
  });
};

