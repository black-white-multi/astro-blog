---
title: "Nginx"
description: ""
date: "2024-09-01"
tags: ['Nginx']
draft: false
---

## Ubuntu安装Nginx

sudo apt install -y nginx  

sudo systemctl start nginx  

sudo systemctl reload nginx  

sudo systemctl status nginx  

sudo systemctl restart nginx  

~~~sh
server {
    listen 8203;
    server_name localhost;
    location / {
        root /var/www/html/dist;
        try_files $uri $uri/ /index.html;
    }
}
~~~

## Https配置

使用阿里云域名的SS证书  
申请证书blog.blackwhite.fun  
下载.pem文件与.key文件  
上传至服务器/etc/nginx/cert/  
修改配置文件/etc/nginx/sites-enabled/default  

## 顶级域名配置  

~~~sh
server {
    listen 8082 default_server;
    listen [::]:8082 default_server;

    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;

    ssl_certificate "/etc/nginx/cert/www.blackwhite.fun.pem";  
    ssl_certificate_key "/etc/nginx/cert/www.blackwhite.fun.key";

    root /var/www/html;

    # Add index.php to the list if you are using PHP
    index index.html index.htm index.nginx-debian.html;

    server_name www.blackwhite.fun;

    location / {
        root /var/www/html/dist;
        index index.php index.html;
        try_files $uri $uri/ =404;
    }
}
~~~

## 二级域名配置  

~~~sh
server {
    listen 443 ssl;

    ssl_certificate "/etc/nginx/cert/blog.blackwhite.fun.pem";  
    ssl_certificate_key "/etc/nginx/cert/blog.blackwhite.fun.key";

    server_name blog.blackwhite.fun;
    
    root /var/www/html/blog;

    location ~ / {
        index index.php index.html;
        try_files $uri $uri/ =404;
    }
}

server {
    listen 80;
    server_name blog.blackwhite.fun;
    return 301 https//$host$request_uri;
}
~~~

nginx -t  

## 手动更新Astro

* VSCode编译Astro项目/dist
* 拷贝dist到服务器/var/www/html/dist
* 手动执行sudo systemctl reload nginx  
