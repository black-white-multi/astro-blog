---
title: "frp配置"
description: ""
date: "2025-09-01"
tags: ['']
---

## Ubuntu安装frps  
下载frp_0.64.0_linux_amd64.tar.gz  
https://github.com/fatedier/frp  

## 配置frps.toml  
~~~sh
bindPort = 8203  
 
# dashboard 服务配置，"0.0.0.0" 为本机所有 ip
webServer.addr = "0.0.0.0"
# dashboard 配置的端口，可以随意修改
webServer.port = 8303
# dashboard 配置的用户名和密码，修改成自己的
webServer.user = "sprite"
webServer.password = "pwd********"
~~~

## 设置开机自启动frps服务  
~~~sh
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
~~~
命令  
~~~sh
systemctl daemon-reload
systemctl start frps.service
systemctl restart frps.service
systemctl status frps.service
systemctl enable frps.service
~~~

## 配置frpc.toml  
~~~sh
serverAddr = "blackwhite.fun"
serverPort = 0000

[[proxies]]
name = "zhuhai-gs-win10-tcp"
type = "tcp"
localIP = "127.0.0.1"
localPort = 3389
remotePort = 13389
~~~

## NSSM 安装服务
1. 下载nssm  
地址:https://nssm.cc/download  
2. cmd: nssm install frpc  
3. 选择frpc.exe  
4. 参数-c frpc.toml  