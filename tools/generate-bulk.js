/**
 * 读取 invites.txt（每行一个邀请码），使用 INVITE_SALT 生成 hash，
 * 输出 bulk.json（KV bulk put 所需格式）。
 *
 * 使用：
 *   export INVITE_SALT="your-random-salt"
 *   node tools/generate-bulk.js             # 可用环境变量调整输入/输出/批次
 *
 * 可选环境变量：
 *   INVITE_INPUT   默认 invites.txt
 *   INVITE_OUTPUT  默认 bulk.json
 *   INVITE_BATCH   默认 2025-01
 */

const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const SALT = process.env.INVITE_SALT;
if (!SALT) {
  throw new Error("缺少 INVITE_SALT 环境变量");
}

const INPUT = process.env.INVITE_INPUT || "invites.txt";
const OUTPUT = process.env.INVITE_OUTPUT || "bulk.json";
const BATCH = process.env.INVITE_BATCH || "2025-01";

const inputPath = path.resolve(process.cwd(), INPUT);
const outputPath = path.resolve(process.cwd(), OUTPUT);

const raw = fs.readFileSync(inputPath, "utf8");
const codes = raw
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean);

const seen = new Set();
const deduped = codes.filter((code) => {
  if (seen.has(code)) return false;
  seen.add(code);
  return true;
});

const bulk = deduped.map((code) => {
  const hash = crypto.createHash("sha256").update(SALT + code).digest("hex");
  return {
    key: hash,
    value: JSON.stringify({ used: false, batch: BATCH }),
  };
});

fs.writeFileSync(outputPath, JSON.stringify(bulk, null, 2));
console.log(`生成 ${outputPath}，条目数：${bulk.length}，去重前 ${codes.length}`);

