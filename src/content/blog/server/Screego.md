---
title: "Screego搭建"
description: ""
date: "2025-10-11"
tags: ['工作流']
---

## 外网Ubuntu搭建screego

* 下载安装文档

    <https://screego.net/#/install>

* 安装文件位置
  
    /usr/local/bin/screego  
    /usr/local/bin/screego.config  
    /usr/local/bin/users.txt  

* screego.config配置

    ~~~sh
    SCREEGO_EXTERNAL_IP=30.233.303.30
    SCREEGO_SECRET=*****************
    SCREEGO_SERVER_TLS=false
    SCREEGO_TLS_CERT_FILE=
    SCREEGO_TLS_KEY_FILE=
    SCREEGO_SERVER_ADDRESS=0.0.0.0:5050
    SCREEGO_TURN_ADDRESS=0.0.0.0:3478
    SCREEGO_TURN_PORT_RANGE=50000:50010
    SCREEGO_TURN_DENY_PEERS=0.0.0.0/8,127.0.0.1/8,::/128,::1/128,fe80::/10
    SCREEGO_TRUST_PROXY_HEADERS=false
    SCREEGO_AUTH_MODE=all
    SCREEGO_CORS_ALLOWED_ORIGINS=
    SCREEGO_USERS_FILE=/usr/local/bin/users.txt
    SCREEGO_SESSION_TIMEOUT_SECONDS=0
    SCREEGO_CLOSE_ROOM_WHEN_OWNER_LEAVES=true
    SCREEGO_LOG_LEVEL=info
    SCREEGO_PROMETHEUS=false
    ~~~

* screego.service配置

    ~~~sh
    #screego.service
    [Unit]
    # 服务名称，可自定义
    Description = screego server
    After = network.target syslog.target
    Wants = network.target
    [Service]
    Type = simple
    User = root
    # 启动screego命令
    ExecStart = /usr/local/bin/screego serve
    Restart=always
    RestartSec=5
    [Install]
    WantedBy = multi-user.target
    ~~~

## linux命令

~~~sh
# 创建用户
.\screego hash --name "korax" --pass "******"

# 重新加载systemd配置
sudo systemctl daemon-reload

# 开机启动
sudo systemctl enable screego

# 重启服务
sudo systemctl start screego

# 查看状态
sudo systemctl status screego

# 重启服务
sudo systemctl restart screego

~~~

## 内网Docker搭建screego

~~~sh

~~~
