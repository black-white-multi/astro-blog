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
# Taiga's URLs - Variables to define where Taiga should be served
TAIGA_SCHEME=https  # serve Taiga using "http" or "https" (secured) connection
TAIGA_DOMAIN=pm.korax.fun:8443  # Taiga's base URL
SUBPATH="" # it'll be appended to the TAIGA_DOMAIN (use either "" or a "/subpath")
WEBSOCKETS_SCHEME=wss  # events connection protocol (use either "ws" or "wss")

# Taiga's Secret Key - Variable to provide cryptographic signing
SECRET_KEY="Nk6wL=XiyHQKpxPTWfsDc-Av0Uh/rjSq2I83574nzgRltB9J+VZdu_oYbFOmaCE1"  # Please, change it to an unpredictable value!!

# Taiga's Database settings - Variables to create the Taiga database and connect to it
POSTGRES_USER=taiga  # user to connect to PostgreSQL
POSTGRES_PASSWORD=K********8  # database user's password

EMAIL_BACKEND="django.core.mail.backends.console.EmailBackend"
PUBLIC_REGISTER_ENABLED="False"
DEFAULT_FROM_EMAIL="no-reply@korax.fun"

# Taiga's SMTP settings - Variables to send Taiga's emails to the users
EMAIL_BACKEND=console  # use an SMTP server or display the emails in the console (either "smtp" or "console")
EMAIL_HOST=smtp.korax.fun  # SMTP server address
EMAIL_PORT=587   # default SMTP port
EMAIL_HOST_USER=no-reply@korax.fun  # user to connect the SMTP server
EMAIL_HOST_PASSWORD=K********8  # SMTP user's password
EMAIL_DEFAULT_FROM=no-reply@korax.fun  # default email address for the automated emails
# EMAIL_USE_TLS/EMAIL_USE_SSL are mutually exclusive (only set one of those to True)
EMAIL_USE_TLS=True  # use TLS (secure) connection with the SMTP server
EMAIL_USE_SSL=False  # use implicit TLS (secure) connection with the SMTP server

# Taiga's RabbitMQ settings - Variables to leave messages for the realtime and asynchronous events
RABBITMQ_USER=taiga  # user to connect to RabbitMQ
RABBITMQ_PASS=taiga  # RabbitMQ user's password
RABBITMQ_VHOST=taiga  # RabbitMQ container name
RABBITMQ_ERLANG_COOKIE=secret-erlang-cookie  # unique value shared by any connected instance of RabbitMQ

# Taiga's Attachments - Variable to define how long the attachments will be accesible
ATTACHMENTS_MAX_AGE=360  # token expiration date (in seconds)

# Taiga's Telemetry - Variable to enable or disable the anonymous telemetry
ENABLE_TELEMETRY=True

TAIGA_SUPERUSER_USERNAME=admin
TAIGA_SUPERUSER_PASSWORD=K********8
TAIGA_SUPERUSER_EMAIL=korax@163.com
```

## 配置docker-compose.yml

```text
# 修改
taiga-gateway:
    image: nginx:1.19-alpine
    ports:
      - "9000:80"
      - "8443:443"
    volumes:
      - ./taiga-gateway/taiga.conf:/etc/nginx/conf.d/default.conf
      # C:\taiga-docker\ssl\https证书
      - ./ssl:/etc/nginx/ssl
      - taiga-static-data:/taiga/static
      - taiga-media-data:/taiga/media
    networks:
      - taiga
    depends_on:
      - taiga-front
      - taiga-back
      - taiga-events
```

## 配置taiga-gateway\taiga.conf

```text
# C:\taiga-docker\taiga-gateway\taiga.conf

server {
    listen 80 default_server;
    server_name localhost;

    # 重定向所有 HTTP 请求到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2 default_server;

	# SSL 证书配置 - 必须添加这些行！
    ssl_certificate /etc/nginx/ssl/pm.korax.fun.crt;
    ssl_certificate_key /etc/nginx/ssl/pm.korax.fun.key;

    # SSL 安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    client_max_body_size 100M;
    charset utf-8;

    # Frontend
    location / {
        proxy_pass http://taiga-front/;
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
    }

    # API
    location /api/ {
        proxy_pass http://taiga-back:8000/api/;
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
    }

    # Admin
    location /admin/ {
        proxy_pass http://taiga-back:8000/admin/;
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
    }

    # Static
    location /static/ {
        alias /taiga/static/;
    }

    # Media
    location /_protected/ {
        internal;
        alias /taiga/media/;
        add_header Content-disposition "attachment";
    }

    # Unprotected section
    location /media/exports/ {
        alias /taiga/media/exports/;
        add_header Content-disposition "attachment";
    }

    location /media/ {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://taiga-protected:8003/;
        proxy_redirect off;
    }

    # Events
    location /events {
        proxy_pass http://taiga-events:8888/events;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_connect_timeout 7d;
        proxy_send_timeout 7d;
        proxy_read_timeout 7d;
    }
}

```

## 启动docker

- cmd到目录C:\taiga-docker\docker-compose.yml
- 执行命令启动服务
- docker-compose down
- docker-compose up -d

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
https://pm.korax.fun:8443/admin/
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
