# 《怪奇物语》性格测试

一个交互式、视觉丰富的《怪奇物语》主题性格测试网页，包含60道选择题、科学计分系统、动态结果展示和沉浸式UI体验。

## 🚀 快速开始

### 部署到 Cloudflare Pages

**详细部署指南请查看：**
- 📘 [部署指南.md](./部署指南.md) - 完整的部署步骤和说明
- ✅ [部署检查清单.md](./部署检查清单.md) - 部署前检查清单

**快速部署：**
1. 安装 Wrangler：`npm install -g wrangler`
2. 登录 Cloudflare：`wrangler login`
3. 运行部署脚本：`.\deploy.ps1`（Windows）或按照部署指南手动部署

**标准流程（Cloudflare Pages + Functions + KV）：**
1. 在 Cloudflare Pages 设置环境变量 `ADMIN_PASSWORD`、`INVITE_SALT`，并绑定 KV `INVITE_CODES`（详见 `docs/部署-Cloudflare-Workers-KV.md`）
2. 本地准备 `invites.txt`（每行一个邀请码），运行 `node tools/generate-bulk.js` 生成 `bulk.json`，用 `wrangler kv:bulk put` 导入 KV
3. 打开 `index.html` 输入邀请码开始测试

## 📁 项目结构

```
怪奇物语测试/
├── index.html              # 邀请码验证入口
├── test.html               # 测试题目页面
├── result.html             # 结果展示页面
├── admin.html              # 管理员后台
├── script.js               # 完整功能脚本（单文件版，包含所有数据和逻辑）
├── style.css               # 完整样式表（单文件版）
│
├── css/                    # 样式文件（模块化版本）
│   ├── common.css          # 全局样式
│   ├── index.css           # 入口页样式
│   ├── test.css            # 测试页样式
│   ├── result.css          # 结果页样式
│   └── admin.css           # 管理页样式
│
├── js/                     # JavaScript模块（模块化版本）
│   ├── config.js           # 配置文件
│   ├── storage.js          # 本地存储工具
│   ├── device.js           # 设备识别
│   ├── invite-code.js      # 邀请码逻辑
│   ├── admin.js            # 管理员功能
│   ├── test-data.js        # 测试题目数据
│   ├── character-data.js   # 角色数据
│   ├── scoring.js          # 计分系统
│   ├── test.js             # 测试页逻辑
│   └── result.js           # 结果页逻辑
│
├── assets/                 # 静态资源
│   ├── fonts/              # 字体文件
│   └── images/             # 图片资源
│
└── docs/                   # 项目文档
    ├── 测试指南.md         # 详细使用指南
    ├── 快速开始.txt        # 快速入门
    ├── 使用说明.txt        # 使用说明
    ├── 项目完成报告.md     # 项目总结
    └── 问题已修复.txt      # 修复记录
```

## ✨ 核心功能

### 1. 测试系统
- ✅ 60道精心设计的选择题
- ✅ 包含正向题、反向题、中性题、反派题
- ✅ 隐藏角色解锁机制（第27题+第40题）
- ✅ 实时进度显示

### 2. 计分系统
- ✅ 科学的四维评估体系（行为-动机-情绪-认知）
- ✅ Z-score标准化
- ✅ Softmax概率计算
- ✅ 20个角色匹配分析

### 3. 结果展示
- ✅ 核心匹配角色及概率
- ✅ 两个次要匹配角色
- ✅ 八维雷达图（Chart.js）
- ✅ 性格标签和分析
- ✅ 生活建议（职场、人际、成长、挑战）
- ✅ 结果保存为图片

### 4. 邀请码系统
- ✅ 管理员后台生成邀请码
- ✅ 每个邀请码绑定一个设备
- ✅ 每个邀请码可使用3次
- ✅ 设备唯一性识别

### 5. UI/UX设计
- ✅ 80年代复古科技风格
- ✅ 暗黑+霓虹红配色
- ✅ 《怪奇物语》专用字体
- ✅ 响应式设计（支持桌面和移动端）
- ✅ 流畅的动画效果

## 🛠️ 技术栈

- **前端框架**：纯 HTML + CSS + JavaScript
- **图表库**：Chart.js（雷达图）
- **截图库**：html2canvas（结果保存）
- **数据存储**：localStorage
- **字体**：Stranger Things Font + Courier New

## 📊 测试角色列表

### 主角组（11人）
霍珀、十一、迈克、卢卡斯、达斯汀、威尔、麦克斯、史蒂夫、南希、罗宾、乔纳森

### 成人角色（3人）
乔伊斯、埃迪、默里

### 次要角色（2人）
埃里卡、霍莉

### 反派角色（3人）
维克纳、比利、布伦纳

### 隐藏角色（1人）
达达（Dart）- 需同时在第27题和第40题选择特定选项解锁

## ⚙️ 管理员信息

- 管理员密码通过环境变量 `ADMIN_PASSWORD` 配置，不写入仓库
- 如需本地调试，可在 `.env.local`（不提交）里设置，并在前端或 Functions 读取
- 管理入口：`admin.html`（如需使用，可调整为调用 `/api/admin-login`）

## 📖 更多文档

详细的使用指南和技术文档请查看 `docs/` 文件夹，部署方案见 `docs/部署-Cloudflare-Workers-KV.md`。

## 🎮 开始测试

按照以下步骤开始您的《怪奇物语》性格测试之旅：

1. 按部署文档导入 KV 邀请码
2. 打开 `index.html` 输入邀请码
3. 开始答题并查看结果

祝您测试愉快！🎭✨
