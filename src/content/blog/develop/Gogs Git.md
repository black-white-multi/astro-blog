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
	location / {
		proxy_redirect off;
		proxy_set_header Host $host;
		proxy_set_header x-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_pass http://gogs.korax.fun:3303;
	}
}
~~~