---
title: "frp配置"
description: ""
date: "2025-09-21"
tags: ["frp"]
---

## Ubuntu安装frps

下载frp_0.64.0_linux_amd64.tar.gz<https://github.com/fatedier/frp>

## 配置frps.toml

```sh
bindPort = 8203
auth.token = "openssl rand -base64 32"

# dashboard 服务配置，"0.0.0.0" 为本机所有 ip
webServer.addr = "0.0.0.0"
# dashboard 配置的端口，可以随意修改
webServer.port = 8303
# dashboard 配置的用户名和密码，修改成自己的
webServer.user = "sprite"
webServer.password = "pwd********"
```

## 设置开机自启动frps服务

```sh
#frps.service

[Unit]
# 服务名称，可自定义
Description = frp server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
User = root

# 启动frps的命令，需修改为您的frps的安装路径
ExecStart = /usr/local/bin/frps -c /etc/frp_0.64.0_linux_amd64/frps.toml

[Install]
WantedBy = multi-user.target
```

命令

```sh
systemctl daemon-reload
systemctl start frps.service
systemctl restart frps.service
systemctl status frps.service
systemctl enable frps.service
```

```sh
systemctl daemon-reload
systemctl start frpc.service
systemctl restart frpc.service
systemctl status frpc.service
systemctl enable frpc.service
```

## 配置frpc.toml

```sh
serverAddr = "blackwhite.fun"
serverPort = 0000

[[proxies]]
name = "zhuhai-gs-win10-tcp"
type = "tcp"
localIP = "127.0.0.1"
localPort = 3389
remotePort = 13389
```

mac命令

```sh
#安装
brew install frpc

brew services start frpc

brew services stop frpc

# 重启frpc
brew services restart frpc

# 查看服务列表
brew services list
```

mac配置文件  
M1芯片  
/opt/homebrew/etc/frp

Inter芯片  
/usr/local/etc/frp

## NSSM 安装服务

1. 下载nssm<https://nssm.cc/download>
2. cmd: nssm install frpc
3. 选择frpc.exe
4. 参数-c frpc.toml

## 分析Windows日志

1. eventvwr
2. 在“Windows 日志”下点击“安全”
3. 登录事件（事件ID 4625）
