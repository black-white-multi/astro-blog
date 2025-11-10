---
title: "Taiga部署"
description: ""
date: "2025-10-23"
tags: ["Taiga"]
---

## 下载

下载taiga-docker  
<https://github.com/taigaio/taiga-docker/tree/main>

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

## 启动docker

- cmd文件的目录docker-compose.yml
- 执行命令来启动服务
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
