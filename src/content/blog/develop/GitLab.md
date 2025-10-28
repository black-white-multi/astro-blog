---
title: "GitLab部署"
description: ""
date: "2025-09-21"
tags: ['Git']
---

## Docker安装  

1. 下载Docker  
下载地址<https://www.docker.com/products/docker-desktop/>

2. 使用 Docker Compose 部署 GitLab

  ~~~sh
  #docker-compose.yml
  
  services:
    gitlab:
      image: gitlab/gitlab-ce:latest
      container_name: gitlab
      restart: always
      hostname: '127.0.0.1'
      environment:
        GITLAB_OMNIBUS_CONFIG: |
          external_url 'http://127.0.0.1:8080'
          gitlab_rails['gitlab_shell_ssh_port'] = 8022
          gitlab_rails['gitlab_signup_enabled'] = false
          
          nginx['listen_port'] = 80
          nginx['listen_https'] = false
          nginx['listen_addresses'] = ['0.0.0.0']
          nginx['client_max_body_size'] = '1024m'
          nginx['proxy_read_timeout'] = 600
          
          gitlab_workhorse['client_max_body_size'] = '1024m'
          gitlab_rails['git_max_size'] = 1073741824
          
          gitlab_rails['gitlab_ssh_host'] = '127.0.0.1'
          gitlab_rails['gitlab_host'] = '127.0.0.1'
          gitlab_rails['gitlab_port'] = 8080
          
          gitlab_rails['lfs_enabled'] = true
          gitlab_rails['lfs_storage_path'] = "/var/opt/gitlab/gitlab-rails/shared/lfs-objects"
          
          gitlab_rails['password_denylist_enabled'] = false
          gitlab_rails['password_denylist'] = []
          gitlab_rails['password_complexity'] = { 'enabled' => false }
          gitlab_rails['password_require_numbers'] = false
          gitlab_rails['password_require_uppercase'] = false
          gitlab_rails['password_require_lowercase'] = false
          gitlab_rails['password_require_symbols'] = false
          gitlab_rails['minimum_password_length'] = 6
      ports:
        - "8080:80"
        - "8443:443"
        - "8022:22"
      volumes:
        - ./gitlab/config:/etc/gitlab
        - ./gitlab/logs:/var/log/gitlab
        - ./gitlab/data:/var/opt/gitlab
        - ./gitlab/lfs-objects:/var/opt/gitlab/gitlab-rails/shared/lfs-objects
      networks:
        - gitlab-network
      shm_size: '256m'  # 添加共享内存配置
      deploy:
        resources:
          limits:
            memory: 4G
          reservations:
            memory: 2G
  networks:
    gitlab-network:
      driver: bridge
  ~~~

3. cmd文件的目录docker-compose.yml  

执行命令来启动服务  
docker-compose up -d  

4. 首次启动会非常慢（可能需要 5-10 分钟）  

Docker 需要下载镜像，并且 GitLab 在容器内进行初始化配置  
docker-compose logs -f gitlab

5. 查看root密码  
docker exec gitlab cat /etc/gitlab/initial_root_password  

6. 修改配置后，需要重新配置并重启  
docker exec gitlab gitlab-ctl reconfigure  
docker exec gitlab gitlab-ctl restart  

## 服务器配置nginx  

目录/etc/nginx/conf.d/gogs_proxy.conf  

~~~sh
server{
    listen 80;
    server_name gogs.korax.fun;

    client_max_body_size 1024M;

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
        proxy_pass http://gogs.korax.fun:38443;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
~~~

## 取消LFS  

将所有由 LFS 管理的文件恢复为普通文件  
git lfs migrate export --everything --include="*"  
强制推送更改到远程仓库  
git push --force-with-lease --all

ssh-keygen -t ed25519 -C "gitlab-korax-hupeiwen"  
tnc gogs.korax.fun -Port 8022  
