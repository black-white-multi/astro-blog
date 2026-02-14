---
title: "Taiga部署"
description: ""
date: "2025-10-23"
tags: ["Taiga"]
---

## 下载

[下载taiga-docker](https://github.com/taigaio/taiga-docker/tree/main)

## 配置.env

```sh
TAIGA_SCHEME=https  # serve Taiga using "http" or "https" (secured) connection

TAIGA_DOMAIN=pm.korax.fun  # Taiga's base URL

SUBPATH="" # it'll be appended to the TAIGA_DOMAIN (use either "" or a "/subpath")

WEBSOCKETS_SCHEME=wss

SECRET_KEY="*********************"

POSTGRES_PASSWORD=**************
```

## 启动docker

- ubuntu目录/srv/taiga-docker
- 执行命令启动服务
- docker compose down
- docker compose up -d

## frpc配置

```sh
[[proxies]]
name = "sprite-mac2014-tcp-taiga"
type = "tcp"
localIP = "127.0.0.1"
localPort = 9000
remotePort = 39000
```

## Nginx配置

```sh
server{
  listen 80;
  server_name pm.korax.fun;
  client_max_body_size 1024M;
  proxy_read_timeout 600;

  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl;
  server_name pm.korax.fun;

  ssl_certificate /etc/nginx/cert/pm.korax.fun.crt;
  ssl_certificate_key /etc/nginx/cert/pm.korax.fun.key;

  ssl_session_timeout 5m;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  ssl_prefer_server_ciphers on;

  location / {
      proxy_pass http://127.0.0.1:39000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## 创建管理员账号

```sh
# 查看Taiga容器
docker ps
# 进入taiga后端容器
docker exec -it taiga-back bash
# 在容器内部创建超级用户
python manage.py createsuperuser
```

## 管理员加普通账号

```sh
https://pm.korax.fun:8643/admin/
admin
K************
```

## n8n安装

### docker安装

```sh
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      # 需要修改
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=******
      - NODE_ENV=production
      - N8N_SECURE_COOKIE=false
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
n8n_data:
```

### node安装

```sh
# 全局安装
npm install -g n8n
# 启动
n8n
```
