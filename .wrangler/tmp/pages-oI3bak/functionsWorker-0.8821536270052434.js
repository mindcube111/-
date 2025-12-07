var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/storage/get.js
async function onRequestPost(context) {
  try {
    const { key } = await context.request.json();
    if (!key) {
      return new Response(JSON.stringify({
        success: false,
        error: "Key is required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const value = await context.env.INVITE_CODES.get(key);
    return new Response(JSON.stringify({
      success: true,
      value: value ? JSON.parse(value) : null
    }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    });
  } catch (error) {
    console.error("Storage get error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost, "onRequestPost");

// api/storage/set.js
async function onRequestPost2(context) {
  try {
    const { key, value } = await context.request.json();
    if (!key) {
      return new Response(JSON.stringify({
        success: false,
        error: "Key is required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    await context.env.INVITE_CODES.put(key, JSON.stringify(value));
    return new Response(JSON.stringify({
      success: true
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Storage set error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost2, "onRequestPost");

// api/user/data.js
async function onRequestPost3(context) {
  try {
    const { inviteCode } = await context.request.json();
    if (!inviteCode) {
      return new Response(JSON.stringify({
        success: false,
        error: "Invite code is required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const key = `user_data_${inviteCode}`;
    const data = await context.env.INVITE_CODES.get(key);
    return new Response(JSON.stringify({
      success: true,
      data: data ? JSON.parse(data) : null
    }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    });
  } catch (error) {
    console.error("Get user data error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost3, "onRequestPost");

// api/user/save.js
async function onRequestPost4(context) {
  try {
    const { inviteCode, data } = await context.request.json();
    if (!inviteCode) {
      return new Response(JSON.stringify({
        success: false,
        error: "Invite code is required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const key = `user_data_${inviteCode}`;
    const userData = {
      ...data,
      lastSync: (/* @__PURE__ */ new Date()).toISOString()
    };
    await context.env.INVITE_CODES.put(key, JSON.stringify(userData));
    return new Response(JSON.stringify({
      success: true
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Save user data error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost4, "onRequestPost");

// api/add-invite.js
async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(sha256Hex, "sha256Hex");
var onRequestPost5 = /* @__PURE__ */ __name(async ({ request, env }) => {
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
  const batch = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
  const results = [];
  for (const code of codes) {
    if (!code || typeof code !== "string") {
      results.push({ code, ok: false, message: "invalid code format" });
      continue;
    }
    try {
      const hash = await sha256Hex(env.INVITE_SALT + code);
      console.log("\u6DFB\u52A0\u9080\u8BF7\u7801:", {
        code,
        saltLength: env.INVITE_SALT ? env.INVITE_SALT.length : 0,
        hash: hash.substring(0, 16) + "...",
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
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        lastUsedAt: null
      };
      await env.INVITE_CODES.put(hash, JSON.stringify(record));
      const verify = await env.INVITE_CODES.get(hash, "json");
      if (!verify) {
        console.error("KV \u5199\u5165\u9A8C\u8BC1\u5931\u8D25:", { code, hash: hash.substring(0, 16) + "..." });
        results.push({ code, ok: false, message: "failed to save to KV" });
        continue;
      }
      console.log("\u9080\u8BF7\u7801\u5DF2\u6210\u529F\u6DFB\u52A0\u5230 KV:", {
        code,
        hash: hash.substring(0, 16) + "...",
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
    results
  });
}, "onRequestPost");

// api/admin-login.js
var onRequestPost6 = /* @__PURE__ */ __name(async ({ request, env }) => {
  if (!env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, message: "missing ADMIN_PASSWORD" }, { status: 500 });
  }
  const { password } = await request.json().catch(() => ({}));
  if (!password) {
    return Response.json({ ok: false, message: "missing password" }, { status: 400 });
  }
  const ok = password === env.ADMIN_PASSWORD;
  return Response.json({ ok }, { status: ok ? 200 : 401 });
}, "onRequestPost");

// api/health.js
async function onRequestGet(context) {
  return new Response(JSON.stringify({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    }
  });
}
__name(onRequestGet, "onRequestGet");

// api/list-invites.js
var onRequestGet2 = /* @__PURE__ */ __name(async ({ request, env }) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.substring(7);
  if (token !== env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, message: "Invalid token" }, { status: 401 });
  }
  return Response.json({
    ok: true,
    codes: [],
    message: "KV does not support listing all keys. Use local storage for management."
  });
}, "onRequestGet");

// api/verify-invite.js
async function sha256Hex2(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(sha256Hex2, "sha256Hex");
var MAX_USE_COUNT = 3;
var onRequestPost7 = /* @__PURE__ */ __name(async ({ request, env }) => {
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
  const hash = await sha256Hex2(env.INVITE_SALT + code);
  console.log("\u9A8C\u8BC1\u9080\u8BF7\u7801:", {
    code,
    saltLength: env.INVITE_SALT ? env.INVITE_SALT.length : 0,
    hash: hash.substring(0, 16) + "...",
    fullHash: hash
  });
  const record = await env.INVITE_CODES.get(hash, "json");
  if (!record) {
    console.log("\u9080\u8BF7\u7801\u4E0D\u5B58\u5728:", {
      code,
      hash: hash.substring(0, 16) + "...",
      fullHash: hash,
      message: "KV \u4E2D\u672A\u627E\u5230\u8BE5\u54C8\u5E0C\u503C\uFF0C\u53EF\u80FD\u539F\u56E0\uFF1A1. \u76D0\u503C\u4E0D\u4E00\u81F4 2. \u9080\u8BF7\u7801\u672A\u6DFB\u52A0\u5230 KV"
    });
    return Response.json({
      ok: false,
      message: "invalid",
      debug: {
        code,
        hashPrefix: hash.substring(0, 16),
        reason: "\u9080\u8BF7\u7801\u4E0D\u5B58\u5728\u4E8E KV \u4E2D\uFF0C\u8BF7\u68C0\u67E5\uFF1A1. \u9080\u8BF7\u7801\u662F\u5426\u6B63\u786E\u751F\u6210\u5E76\u6DFB\u52A0\u5230 KV 2. INVITE_SALT \u662F\u5426\u4E00\u81F4"
      }
    }, { status: 404 });
  }
  console.log("\u627E\u5230\u9080\u8BF7\u7801\u8BB0\u5F55:", {
    code,
    record: {
      usedCount: record.usedCount,
      used: record.used,
      batch: record.batch,
      createdAt: record.createdAt
    }
  });
  const usedCount = record.usedCount !== void 0 ? record.usedCount : record.used ? MAX_USE_COUNT : 0;
  if (usedCount >= MAX_USE_COUNT) {
    return Response.json({ ok: false, message: "used" }, { status: 410 });
  }
  const updatedRecord = {
    ...record,
    usedCount: usedCount + 1,
    lastUsedAt: (/* @__PURE__ */ new Date()).toISOString(),
    // 保留旧字段以兼容
    used: usedCount + 1 >= MAX_USE_COUNT
  };
  await env.INVITE_CODES.put(hash, JSON.stringify(updatedRecord));
  return Response.json({ ok: true, usedCount: updatedRecord.usedCount, remaining: MAX_USE_COUNT - updatedRecord.usedCount });
}, "onRequestPost");

// ../.wrangler/tmp/pages-oI3bak/functionsRoutes-0.33177021790621464.mjs
var routes = [
  {
    routePath: "/api/storage/get",
    mountPath: "/api/storage",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/storage/set",
    mountPath: "/api/storage",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/user/data",
    mountPath: "/api/user",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/user/save",
    mountPath: "/api/user",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/add-invite",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost5]
  },
  {
    routePath: "/api/admin-login",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost6]
  },
  {
    routePath: "/api/health",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/list-invites",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/verify-invite",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost7]
  }
];

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../AppData/Roaming/npm/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
