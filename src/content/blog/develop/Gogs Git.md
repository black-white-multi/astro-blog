---
title: "Gogs Git"
description: ""
date: "2025-09-21"
tags: ['Git']
---

## Gogs安装  
1. 下载Gogs  
地址https://github.com/gogs/gogs/releases  
2. 将gogs的压缩包解压C:\gogs  
3. 配置环境变量
4. cmd输入gogs web
5. 浏览器http://localhost:3000

## NSSM 安装GIT服务
1. 下载nssm  
地址:https://nssm.cc/download  
2. cmd: nssm install gogsgit  
3. 选择gogs.exe  
4. 参数web  

## frps服务器配置nginx
目录/etc/nginx/conf.d/gogs_proxy.conf  
~~~sh
server{
	listen 80;
	server_name gogs.korax.fun;

	client_max_body_size 100M;

	location / {
		proxy_redirect off;
		proxy_set_header Host $host;
		proxy_set_header x-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_pass http://gogs.korax.fun:3303;
	}
}

server {
    listen 443 ssl;
    server_name gogs.korax.fun;  # 内网IP或主机名

    ssl_certificate /etc/nginx/cert/gogs.crt;
    ssl_certificate_key /etc/nginx/cert/gogs.key;
	
	client_max_body_size 100M;

    location / {
        proxy_pass http://gogs.korax.fun:3303;  # 转发到 Gogs 的 HTTP 端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
~~~

## 配置lfs
\custom\conf\app.ini
~~~sh
[lfs]
; 存储后端类型（当前仅支持local）
STORAGE = local
; LFS对象存储路径（建议独立挂载大容量分区）
OBJECTS_PATH = /data/gogs/lfs-objects
; 单个文件大小限制（默认无限制，建议设置）
MAX_FILE_SIZE = 50 ; MB
; 仓库级存储配额（企业版特性）
REPO_QUOTA = 5 ; GB
~~~