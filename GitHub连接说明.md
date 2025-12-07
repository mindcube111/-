# GitHub 仓库连接说明

## ✅ 代码已推送到 GitHub

你的项目代码已经成功推送到 GitHub 仓库：
- **仓库地址**：https://github.com/mindcube111/-.git
- **分支**：`main`
- **文件数量**：70 个文件

## 🔗 连接 Cloudflare Pages

### 方法 1：通过 Cloudflare Dashboard（推荐）

1. **访问 Cloudflare Dashboard**
   - 打开：https://dash.cloudflare.com
   - 登录你的账号

2. **创建 Pages 项目**
   - 点击左侧菜单：**Workers & Pages**
   - 点击：**Create application**
   - 选择：**Pages** → **Connect to Git**

3. **连接 GitHub**
   - 选择 **GitHub** 作为 Git 提供商
   - 点击 **Authorize Cloudflare Pages** 授权
   - 如果提示，选择需要授权的仓库范围（或选择所有仓库）

4. **选择仓库**
   - 在仓库列表中找到：`mindcube111/-`
   - 点击仓库名称

5. **配置项目**
   - **项目名称**：`stranger-things-test`
   - **生产分支**：`main`
   - **框架预设**：None（或选择 Static）
   - **构建命令**：留空
   - **构建输出目录**：`/`（根目录）

6. **环境变量和 KV 绑定**
   - 点击 **Save and Deploy** 后
   - 进入项目设置 → **Settings**
   - 配置环境变量和 KV 绑定（参考部署指南）

### 方法 2：通过 Wrangler CLI

```bash
# 创建 Pages 项目（如果还没有）
wrangler pages project create stranger-things-test

# 连接 Git 仓库（需要在 Dashboard 中完成）
# 然后推送代码会自动触发部署
```

## 📝 自动部署

连接成功后，每次你推送代码到 `main` 分支，Cloudflare Pages 会自动：
1. 检测代码变更
2. 构建项目
3. 部署到生产环境

## 🔍 验证连接

1. **检查部署状态**
   - 在 Cloudflare Dashboard → Pages → stranger-things-test
   - 查看 **Deployments** 标签页
   - 应该能看到最新的部署记录

2. **查看部署日志**
   - 点击部署记录
   - 查看构建日志，确认没有错误

3. **访问网站**
   - 部署成功后，会生成一个 URL
   - 格式：`https://stranger-things-test.pages.dev`
   - 访问该 URL 验证网站是否正常

## ⚠️ 注意事项

1. **首次部署可能需要几分钟**
   - Cloudflare 需要拉取代码、构建和部署
   - 请耐心等待

2. **环境变量需要单独配置**
   - Git 仓库中的代码不包含环境变量
   - 需要在 Cloudflare Dashboard 中手动配置

3. **KV 命名空间需要绑定**
   - 在项目设置中绑定 KV 命名空间
   - 参考部署指南中的步骤

## 🚀 后续操作

连接完成后，继续按照 **部署指南.md** 完成：
- ✅ 配置环境变量
- ✅ 绑定 KV 命名空间
- ✅ 导入邀请码
- ✅ 验证功能

---

**提示**：如果遇到连接问题，请检查：
- GitHub 账号是否已授权 Cloudflare
- 仓库是否为公开或已授权访问
- 网络连接是否正常


