---
title: "Servers手动配置"
description: ""
date: "2025-11-8"
tags: ["工作流"]
---

## Korax Gitlab - Ubuntu24

1. frp配置

- /etc/frpc/frpc.toml

2. v2ray配置

- /usr/local/etc/v2ray/config.json

3. gitlab docker-compose 配置

- /srv/gitlab-app/docker-compose.yml

4. 开机启动配置

- /etc/systemd/system/frpc.service

## XUI-HK - Ubuntu20

1. frp配置

- /etc/frp_0.64.0_linux_amd64/frps.toml

2. screego配置

- /usr/local/bin/screego.config
- /usr/local/bin/users.txt

3. nginx配置

- /etc/nginx/cert/https证书
- /etc/nginx/conf.d/xxx.conf

4. 开机启动配置

- /etc/systemd/system/frps.service
- /etc/systemd/system/screego.service
- /etc/systemd/system/x-ui.service

## MacMini2014 - Ubuntu24

1. frp配置

- /etc/frpc/frpc.toml

2. certd docker-compose 配置

- /srv/certd/
