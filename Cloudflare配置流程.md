# Cloudflare Pages 配置流程

## 📋 配置前准备

确保你已经：
- ✅ 登录 Cloudflare 账号
- ✅ 创建了 Cloudflare Pages 项目
- ✅ 项目已连接到 GitHub 仓库

---

## 🔧 配置步骤

### 步骤 1: 创建 KV 命名空间

1. **访问 Cloudflare Dashboard**
   - 打开：https://dash.cloudflare.com
   - 登录你的账号

2. **创建 KV 命名空间**
   - 点击左侧菜单：**Workers & Pages**
   - 点击：**KV** 标签页
   - 点击：**Create a namespace** 按钮
   - 命名：`INVITE_CODES`（或你喜欢的名称）
   - 点击：**Add**
   - **重要**：记录下显示的 **Namespace ID**（稍后会用到）

---

### 步骤 2: 生成随机盐值（INVITE_SALT）

**Windows PowerShell（正确方法）：**
```powershell
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$bytes = New-Object byte[] 32
$rng.GetBytes($bytes)
$salt = [Convert]::ToBase64String($bytes)
Write-Host $salt
```

**或者使用更简单的方法：**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**或者使用在线工具：**
- 访问：https://www.random.org/strings/
- 设置：长度 32，字符集选择 "Alphanumeric"
- 生成并复制字符串（这就是你的 `INVITE_SALT`）

**示例格式：**
```
aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5jK7lM9nO1pQ3
```

---

### 步骤 3: 配置环境变量

1. **进入 Pages 项目设置**
   - 在 Cloudflare Dashboard 中
   - 进入：**Workers & Pages** → **Pages**
   - 点击你的项目：**stranger-things-test**

2. **添加环境变量**
   - 点击：**Settings** 标签页
   - 滚动到：**Environment variables** 部分
   - 点击：**Add variable** 按钮

3. **添加第一个环境变量：ADMIN_PASSWORD**
   - **Variable name**：`ADMIN_PASSWORD`
   - **Value**：输入你的管理员密码（例如：`MySecurePassword123!`）
   - **Environment**：选择 **Production**（或同时选择 Production 和 Preview）
   - 点击：**Save**

4. **添加第二个环境变量：INVITE_SALT**
   - 点击：**Add variable** 按钮
   - **Variable name**：`INVITE_SALT`
   - **Value**：粘贴步骤 2 生成的随机盐值
   - **Environment**：选择 **Production**（或同时选择 Production 和 Preview）
   - 点击：**Save**

---

### 步骤 4: 绑定 KV 命名空间

1. **在同一个 Settings 页面**
   - 滚动到：**KV namespaces** 部分
   - 点击：**Add binding** 按钮

2. **配置 KV 绑定**
   - **Variable name**：`INVITE_CODES`（必须与代码中的名称一致）
   - **KV namespace**：选择步骤 1 创建的命名空间（`INVITE_CODES`）
   - **Environment**：选择 **Production**（或同时选择 Production 和 Preview）
   - 点击：**Save**

---

### 步骤 5: 验证配置

1. **检查配置列表**
   - 确认看到：
     - ✅ `ADMIN_PASSWORD` 环境变量
     - ✅ `INVITE_SALT` 环境变量
     - ✅ `INVITE_CODES` KV 绑定

2. **重新部署（如果需要）**
   - 如果配置是在部署后添加的，可能需要触发重新部署
   - 可以：
     - 推送一个小的代码更改到 GitHub
     - 或在 Pages 项目中点击 **Retry deployment**

---

## ✅ 配置完成检查清单

- [ ] KV 命名空间已创建（`INVITE_CODES`）
- [ ] 已记录 KV Namespace ID
- [ ] 环境变量 `ADMIN_PASSWORD` 已配置
- [ ] 环境变量 `INVITE_SALT` 已配置（至少 32 字符）
- [ ] KV 绑定 `INVITE_CODES` 已配置
- [ ] 所有配置都选择了正确的 Environment（Production/Preview）

---

## 🧪 测试配置

### 1. 测试管理员登录

访问你的网站，点击右上角的管理员按钮，使用配置的 `ADMIN_PASSWORD` 登录。

**预期结果**：
- ✅ 登录成功
- ✅ 显示管理员功能区域

**如果失败**：
- 检查 `ADMIN_PASSWORD` 是否配置正确
- 检查环境变量是否选择了正确的 Environment
- 查看浏览器控制台的错误信息

### 2. 测试生成邀请码

登录后，点击"生成单个"按钮。

**预期结果**：
- ✅ 生成邀请码成功
- ✅ 邀请码显示在面板中
- ✅ 邀请码已复制到剪贴板

**如果失败**：
- 检查 `INVITE_SALT` 是否配置正确
- 检查 KV 绑定 `INVITE_CODES` 是否配置正确
- 查看浏览器控制台的错误信息

### 3. 测试邀请码验证

使用生成的邀请码在首页进行验证。

**预期结果**：
- ✅ 邀请码验证成功
- ✅ 可以开始测试

**如果失败**：
- 检查邀请码是否正确生成
- 检查 `/api/verify-invite` API 是否正常工作
- 查看浏览器控制台的错误信息

---

## 🔍 常见问题

### Q1: 环境变量在哪里配置？
**A:** Cloudflare Dashboard → Workers & Pages → Pages → 你的项目 → Settings → Environment variables

### Q2: KV 命名空间在哪里创建？
**A:** Cloudflare Dashboard → Workers & Pages → KV → Create a namespace

### Q3: 如何查看 KV Namespace ID？
**A:** 创建命名空间后，在 KV 列表中可以查看 ID，或使用命令：
```bash
wrangler kv:namespace list
```

### Q4: 配置后需要重新部署吗？
**A:** 通常不需要，环境变量和 KV 绑定会立即生效。但如果遇到问题，可以触发重新部署。

### Q5: 如何修改环境变量？
**A:** 在 Settings → Environment variables 中，点击变量旁边的编辑图标进行修改。

### Q6: 忘记管理员密码怎么办？
**A:** 在 Cloudflare Dashboard 中修改 `ADMIN_PASSWORD` 环境变量即可。

---

## 📝 重要提示

1. **安全性**
   - 使用强密码作为 `ADMIN_PASSWORD`
   - 不要将密码提交到代码仓库
   - 定期更换密码

2. **备份**
   - 记录下 `INVITE_SALT` 的值（如果丢失，所有邀请码都需要重新生成）
   - 记录下 KV Namespace ID

3. **测试**
   - 配置完成后，务必进行完整的功能测试
   - 确认所有 API 端点正常工作

---

## 🎯 配置完成后

配置完成后，你就可以：
- ✅ 使用管理员面板登录
- ✅ 生成邀请码（自动同步到 KV）
- ✅ 验证邀请码
- ✅ 开始使用完整的测试系统

---

**需要帮助？** 如果遇到问题，请检查：
1. Cloudflare Dashboard 中的配置是否正确
2. 浏览器控制台的错误信息
3. Cloudflare Pages 的部署日志

