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

配置x-ui.service  

```sh
#/etc/systemd/system/x-ui.service  
[Unit]
Description=x-ui Service
After=network.target
Wants=network.target

[Service]
Environment="XRAY_VMESS_AEAD_FORCED=false"
Type=simple
WorkingDirectory=/usr/local/x-ui/
ExecStart=/usr/local/x-ui/x-ui
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

## frps部署  

配置开放端口  
/etc/frp_0.64.0_linux_amd64/frps.toml  

配置frps.service  

```sh
#/etc/systemd/system/frps.service  
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
```

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
