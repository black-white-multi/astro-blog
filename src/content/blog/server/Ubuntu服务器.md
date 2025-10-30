---
title: "Ubuntu服务器"
description: ""
date: "2025-10-30"
tags: ['工作流']
---

Ubuntu 20.04 64位

## 3X-UI部署

```sh
#一键部署
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)
```

## frps部署  

配置开放端口  
/etc/frp_0.64.0_linux_amd64/frps.toml  

## Nginx部署

```sh
    #配置
    server{
        listen 80;
        server_name gogs.korax.fun;
        client_max_body_size 1024M;
        proxy_read_timeout 600;
        location / {
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header x-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://gogs.korax.fun:38080;
        }
    }

    server {
        listen 443 ssl;
        server_name gogs.korax.fun;  # 内网IP或主机名

        ssl_certificate /etc/nginx/cert/gogs.crt;
        ssl_certificate_key /etc/nginx/cert/gogs.key;
        
        client_max_body_size 1024M;

        location / {
            proxy_pass http://gogs.korax.fun:38443;  # 转发到HTTP 端口
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
```

## Screego部署
