---
title: "Screego搭建"
description: ""
date: "2025-10-11"
tags: ['工作流']
---

## 1. 配置screego.config

~~~sh
SCREEGO_EXTERNAL_IP=127.0.0.1

SCREEGO_SECRET=********

SCREEGO_SERVER_TLS=true
# cert证书中的one.pem
SCREEGO_TLS_CERT_FILE=C:\certs\pm.korax.fun.pem
# cert证书中的one.pem
SCREEGO_TLS_KEY_FILE=C:\certs\pm.korax.fun.pem

# 严格模式 - 所有操作都需要登录
SCREEGO_AUTH_MODE=all

SCREEGO_USERS_FILE=C:\Program Files\screego_1.12.0\users.txt
~~~

## 2. 创建用户

~~~sh
# 创建用户
.\screego hash --name "korax" --pass "******"
~~~

## 3. NSSM 安装服务  

1. 下载nssm<https://nssm.cc/download>  
2. cmd: nssm install ScreegoService  
3. 选择C:\Program Files\screego_1.12.0\screego.exe  
4. 参数serve  

## 4. 配置frpc

~~~sh
[[proxies]]
name = "zhuhai-gs-screego-web"
type = "https"
localPort = 5050
customDomains = ["pm.korax.fun"]
~~~
