---
title: "Taiga部署"
description: ""
date: "2025-10-23"
tags: ["Taiga"]
---

## 下载

[下载taiga-docker](https://github.com/taigaio/taiga-docker/tree/main)

## 配置.env

```text
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
name = "taiga_web"
type = "https"
customDomains = ["pm.korax.fun"]

[proxies.plugin]
type = "https2http"
localAddr = "127.0.0.1:9000"
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
