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

### 方法一：使用npm安装（推荐）

```bash
# 全局安装OpenClaw
sudo npm install -g openclaw

# 验证安装
openclaw --version
```

### 方法二：使用pnpm安装

```bash
# 使用pnpm安装
sudo pnpm add -g openclaw

# 验证安装
openclaw --version
```

## 2. 初始化配置

### 运行安装向导

```bash
# 运行交互式安装向导
openclaw onboard
```

向导会引导你完成：
1. 选择安装模式（本地或远程）
2. 配置网关端口（默认18789）
3. 设置认证令牌
4. 选择初始渠道

### 手动配置

如果你需要手动配置，可以编辑配置文件：

```bash
# 配置文件位置
~/.openclaw/openclaw.json
```

基本配置示例：
```json5
{
  "meta": {
    "lastTouchedVersion": "2026.2.21-2"
  },
  "models": {
    "mode": "merge",
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com/v1",
        "apiKey": "你的API密钥",
        "api": "openai-completions",
        "models": [
          {
            "id": "deepseek-chat",
            "name": "DeepSeek Chat"
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat"
      },
      "workspace": "/home/用户名/.openclaw/workspace"
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "自动生成的令牌"
    }
  }
}
```

## 3. 配置AI模型

OpenClaw支持多种AI模型提供商：

### DeepSeek配置

1. 访问 [DeepSeek平台](https://platform.deepseek.com/) 获取API密钥
2. 在配置文件中添加：

```json5
{
  "models": {
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com/v1",
        "apiKey": "sk-你的API密钥",
        "api": "openai-completions",
        "models": [
          {
            "id": "deepseek-chat",
            "name": "DeepSeek Chat"
          },
          {
            "id": "deepseek-reasoner",
            "name": "DeepSeek Reasoner"
          }
        ]
      }
    }
  }
}
```

## 4. 配置聊天渠道

### 飞书（Feishu）机器人

#### 4.1 安装飞书插件

```bash
# 方法一：从npm安装
openclaw plugins install @openclaw/feishu

# 方法二：使用本地扩展
openclaw plugins install ./extensions/feishu
```

#### 4.2 在飞书开放平台创建应用

1. 访问 [飞书开放平台](https://open.feishu.cn/app)
2. 创建企业自建应用
3. 获取 **App ID** 和 **App Secret**
4. 配置应用权限（批量导入以下JSON）：

```json
{
  "scopes": {
    "tenant": [
      "aily:file:read",
      "aily:file:write",
      "application:application.app_message_stats.overview:readonly",
      "application:application:self_manage",
      "application:bot.menu:write",
      "cardkit:card:write",
      "contact:user.employee_id:readonly",
      "corehr:file:download",
      "docs:document.content:read",
      "event:ip_list",
      "im:chat",
      "im:chat.access_event.bot_p2p_chat:read",
      "im:chat.members:bot_access",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.group_msg",
      "im:message.p2p_msg:readonly",
      "im:message:readonly",
      "im:message:send_as_bot",
      "im:resource",
      "sheets:spreadsheet",
      "wiki:wiki:readonly"
    ],
    "user": ["aily:file:read", "aily:file:write", "im:chat.access_event.bot_p2p_chat:read"]
  }
}
```

5. 启用机器人能力
6. 配置事件订阅（选择**长连接WebSocket模式**）
7. 发布应用

#### 4.3 配置飞书通道

```json5
{
  "channels": {
    "feishu": {
      "enabled": true,
      "dmPolicy": "pairing",
      "accounts": {
        "main": {
          "appId": "cli_你的App_ID",
          "appSecret": "你的App_Secret",
          "botName": "OpenClaw助手"
        }
      }
    }
  },
  "plugins": {
    "entries": {
      "feishu": {
        "enabled": true
      }
    }
  }
}
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

export XDG_RUNTIME_DIR=/run/user/$(id -u)

export DBUS_SESSION_BUS_ADDRESS=unix:path=$XDG_RUNTIME_DIR/bus

```

### 手动启动

```bash
# 直接启动网关
openclaw gateway

# 或使用systemd
systemctl --user start openclaw-gateway
```

## 6. 配对与测试

### 飞书配对

1. 在飞书中找到你的机器人
2. 发送消息，机器人会回复配对码
3. 批准配对：

```bash
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

### 日志管理

```bash
# 查看实时日志
openclaw logs --follow

# 查看特定通道日志
openclaw logs --channel telegram
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

## 8. 配对

```bash
# 必须确保时间是同步的，否则无法配对设备

# 配对设备
openclaw devices list

# 查看.openclaw/devices/pending.json
openclaw devices approve 设备码

```

## 9. 高级配置

## 10. 性能优化

### 资源监控

```bash
# 查看内存使用
ps aux | grep openclaw

# 监控网络连接
netstat -tulpn | grep 18789
```

### 配置优化

1. **调整网关内存**：在systemd服务文件中调整内存限制
2. **优化日志级别**：生产环境可调整日志级别
3. **启用缓存**：配置模型响应缓存
4. **连接池优化**：调整数据库连接池大小

## 总结

OpenClaw是一个功能强大的AI助手平台，通过合理的配置可以满足各种使用场景。本文涵盖了从安装部署到高级配置的完整流程，希望能帮助你顺利搭建自己的AI助手。

### 后续步骤

1. **探索技能**：OpenClaw提供了丰富的技能（Skills），如天气查询、健康检查等
2. **自定义开发**：根据需要开发自定义插件和技能
3. **集成其他服务**：将OpenClaw与你的现有工作流集成
4. **性能调优**：根据实际使用情况优化配置

### 资源链接

- [OpenClaw官方文档](https://docs.openclaw.ai)
- [GitHub仓库](https://github.com/openclaw/openclaw)
- [社区Discord](https://discord.com/invite/clawd)
- [技能市场](https://clawhub.com)

---

本文基于OpenClaw v2026.2.21-2编写

作者：黑白多