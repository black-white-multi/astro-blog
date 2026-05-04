---
title: "OpenClaw安装部署"
description: ""
date: "2026-02-22"
tags: ["OpenClaw"]
draft: false
---

## OpenClaw安装部署

OpenClaw是一个功能强大的AI助手平台，支持多种聊天渠道（Telegram、Feishu、Discord等）和丰富的工具集。

本文将详细介绍如何在Linux系统上安装和配置OpenClaw。

## 环境要求

- **操作系统**: Ubuntu 22.04 / Arch Linux / 其他Linux发行版
- **Node.js**: v18+ (推荐v20+)
- **npm** 或 **pnpm**: 包管理器
- **系统权限**: 需要sudo权限进行全局安装

## 1. 安装OpenClaw

[安装OpenClaw](https://docs.openclaw.ai/zh-CN/install)

## 2. 初始化配置

配置网关

```bash
"bind": "loopback",
"controlUi": {
    "allowInsecureAuth": true,
    "allowedOrigins":
    [
    "http://127.0.0.1:18789",
    "https://clawbot.blackwhite.fun"
    ]
},
```

### 运行安装向导

```bash
# 运行交互式安装向导
openclaw onboard

openclaw doctor

openclaw gateway status
```

## 3. 配置AI模型

### DeepSeek配置

访问 [DeepSeek平台](https://platform.deepseek.com/) 获取API密钥

## 4. 配置聊天渠道

### 飞书（Feishu）机器人

```bash
# 安装飞书插件
npx -y @larksuite/openclaw-lark install

openclaw channels add

使用你的 Feishu/Lark 移动应用扫描二维码
```

## 5. 启动网关服务

### 安装系统服务

```bash
# 安装网关服务
openclaw gateway install

# 启动服务
openclaw gateway start

# 查看状态
openclaw gateway status

# 重启
openclaw gateway restart

# .bashrc openclaw配置
export PATH="/home/sprite/.npm-global/bin:$PATH"
export XDG_RUNTIME_DIR=/run/user/1000
export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus

```

## 6. 配对

```bash
# 必须确保时间是同步的，否则无法配对设备

# 配对设备
openclaw devices list

# 查看.openclaw/devices/pending.json
openclaw devices approve 设备码

openclaw pairing list feishu

openclaw pairing approve feishu 配对码
```

## 7. 常用命令

### 状态检查

```bash
# 查看完整状态
openclaw status

# 查看网关状态
openclaw gateway status

# 查看会话
openclaw sessions list
```

### 插件管理

```bash
# 列出所有插件
openclaw plugins list

# 安装插件
openclaw plugins install 插件名

# 启用/禁用插件
openclaw plugins enable 插件名

openclaw plugins disable 插件名
```

### 更新与维护

```bash
# 更新OpenClaw
openclaw update

# 安全审计
openclaw security audit

# 诊断问题
openclaw doctor
```

### 资源链接

- [OpenClaw官方文档](https://docs.openclaw.ai)
- [GitHub仓库](https://github.com/openclaw/openclaw)
- [社区Discord](https://discord.com/invite/clawd)
- [技能市场](https://clawhub.com)

---

本文基于OpenClaw v2026.2.21-2编写

作者：黑白多
