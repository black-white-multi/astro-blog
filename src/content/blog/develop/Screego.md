---
title: "Screego搭建"
description: ""
date: "2025-10-11"
tags: ['工作流']
---

## 1. 生成 HTTPS 证书  

~~~sh
#生成密钥,过程中会要求设置密码：123456
openssl genrsa -des3 -out server.key 2048
#接下来执行以下命令去除刚刚设置的密码：123456
openssl rsa -in server.key -out server.key
#使用密钥创建服务器证书的申请文件 server.csr，过程中会要求输入一些信息，不用输入，直接回车即可
openssl req -new -key server.key -out server.csr
#创建 CA 证书 ca.crt
openssl req -new -x509 -key server.key -out ca.crt -days 3650
#创建服务器证书 server.crt
openssl x509 -req -days 3650 -in server.csr -CA ca.crt -CAkey server.key -CAcreateserial -out server.crt
~~~

## 2. 配置screego.config

~~~sh
SCREEGO_EXTERNAL_IP=127.0.0.1

SCREEGO_SECRET=********

SCREEGO_SERVER_TLS=true

SCREEGO_TLS_CERT_FILE=C:\Program Files\screego_1.12.0\server.crt

SCREEGO_TLS_KEY_FILE=C:\Program Files\screego_1.12.0\server.key

# 严格模式 - 所有操作都需要登录
SCREEGO_AUTH_MODE=all
~~~

~~~sh
# 创建用户
.\screego hash --name "korax" --pass "******"
~~~

## 3. NSSM 安装服务  

1. 下载nssm<https://nssm.cc/download>  
2. cmd: nssm install ScreegoService  
3. 选择C:\Program Files\screego_1.12.0\screego.exe  
4. 参数serve  
