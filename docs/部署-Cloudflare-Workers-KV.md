# Cloudflare Pages + Functions + Workers KV 部署方案（路径 1）

适用于：无需备案、邀请码可变、需要脱敏（哈希存储）和一次性校验的场景。

## 目录
- 准备工作
- 关键文件/目录
- 步骤清单
- API 说明
- 速率限制与安全
- 常见操作

## 准备工作
- Cloudflare 账号，域名已接入 Cloudflare（NS 已切换）。
- Node 18+，已安装 Wrangler：`npm i -g wrangler`
- 环境变量（在 Pages 项目 Settings 设置）：
  - `ADMIN_PASSWORD`：管理员密码（不要写入代码仓库）
  - `INVITE_SALT`：邀请码哈希盐（随机字符串）
- KV 命名空间：创建 `INVITE_CODES` 并绑定到 Pages。

## 关键文件/目录
- `functions/api/verify-invite.js`：邀请码校验（hash + 一次性标记）
- `functions/api/admin-login.js`：管理员密码校验（读取 `ADMIN_PASSWORD`）
- `tools/generate-bulk.js`：本地批量生成 KV 导入文件
- `invites.txt`：本地明文邀请码清单（不提交仓库），每行一个
- `bulk.json`：生成的 KV 批量导入文件（可不提交仓库）

## 步骤清单
1) 创建 KV 命名空间  
   - Dashboard → Workers → KV → Create namespace（命名 `INVITE_CODES`）
2) 绑定环境变量与 KV  
   - Pages 项目 → Settings → Environment variables：`ADMIN_PASSWORD`、`INVITE_SALT`  
   - Pages 项目 → Settings → KV bindings：绑定 `INVITE_CODES`
3) 准备 Functions 代码  
   - 根目录下 `functions/api/verify-invite.js` 与 `functions/api/admin-login.js` 已提供
4) 本地生成哈希后的邀请码  
   ```bash
   export INVITE_SALT="你的随机盐"
   node tools/generate-bulk.js         # 读取 invites.txt，输出 bulk.json
   ```
   可选环境变量：`INVITE_INPUT`（默认 invites.txt）、`INVITE_OUTPUT`（默认 bulk.json）、`INVITE_BATCH`（默认 2025-01）
5) 批量导入 KV  
   ```bash
   # 查询 namespace id
   wrangler kv:namespace list
   # 导入
   wrangler kv:bulk put --namespace-id <INVITE_CODES id> bulk.json
   # 验证
   wrangler kv:key get --namespace-id <INVITE_CODES id> <某个hash键>
   ```
6) 部署  
   - 推送代码到主分支，Pages 自动构建并部署 Functions  
   - 绑定自定义域名（生成 CNAME 指向 `*.pages.dev`）
7) 验证  
   - `POST https://<域名>/api/verify-invite`，body: `{"code":"明文邀请码"}`  
   - 预期：首次 `{ok:true}`，再次使用返回 `used`

## API 说明
- `POST /api/verify-invite`
  - 请求：`{"code": "明文邀请码"}`
  - 响应：`{ok:true}` 或 `{ok:false, message:"invalid|used|missing code"}`
- `POST /api/admin-login`
  - 请求：`{"password":"..."}`
  - 响应：`{ok:true}` 或 `401`

## 速率限制与安全
- 在 WAF/Rulesets 为 `/api/verify-invite` 设置限流（如每 IP 每分钟 60 次），防止暴力枚举。
- 不在代码/文档/前端存放明文邀请码或密码；`invites.txt`、`bulk.json` 仅本地临时使用。
- 响应最小化：不返回可枚举列表，仅返回 ok/invalid/used。
- 可选：为 KV 项设置过期（TTL）或在 value 中增加 `exp` 字段并在函数中校验。

## 常见操作
- 新增/替换邀请码批次：更新 `invites.txt` → 重新运行 `tools/generate-bulk.js` → `kv:bulk put`
- 重置已用状态：重新导入同一 hash 键的 `used:false` 数据（覆盖即生效）
- 更换盐：更新 `INVITE_SALT` 后需重新生成并导入所有邀请码（hash 会全部变化）

