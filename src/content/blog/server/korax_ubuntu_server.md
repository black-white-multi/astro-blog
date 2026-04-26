---
title: "Korax Ubuntu 服务器"
description: ""
date: "2026-1-1"
tags: ["工作流", "Ubuntu"]
---

Korax Gitlab服务器

Ubuntu自建

Ubuntu 24.04.3 LTS

## 1. ssh安装

- 点击查看 => [SSH安装](/blog/server/ssh_install)

## 2. 设置root密码

  1. 系统重启SHIFT键 进入GRUB
  2. Advanced options for Ubuntu
  3. 选择 "(recovery mode)"
  4. 选择 "root" - 进入 root shell

  ```sh
  #修复sudo权限
  chown root:root /etc/sudo.conf /etc/sudoers
  chmod 440 /etc/sudoers
  chown -R root:root /etc/sudoers.d/

  #设置root密码
  passwd root

  #重启
  reboot
  ```

## 3. frpc.service

- 点击查看 => [frp安装配置](/blog/server/frp_install)

## 4. 安装 V2Ray

- 点击查看 => [V2Ray安装配置](/blog/server/v2ray_install)

## 5. 安装 Docker

- 点击查看 => [Docker安装文档](https://docs.docker.com/desktop/setup/install/linux/ubuntu/)

- 配置Docker使用代理  
  sudo mkdir -p /etc/systemd/system/docker.service.d  
  sudo tee /etc/systemd/system/docker.service.d/proxy.conf

  ```sh
  [Service]
  Environment="HTTP_PROXY=http://127.0.0.1:10809"
  Environment="HTTPS_PROXY=http://127.0.0.1:10809"
  Environment="NO_PROXY=localhost,127.0.0.1,::1"
  ```

  ```sh
  sudo systemctl daemon-reload

  sudo systemctl restart docker  
  
  sudo systemctl enable docker  
  
  sudo docker run hello-world
  ```

## 6.安装Gitlab

- 迁移win10 gitlab 到 Ubuntu  

- 将gitlab/config data lfs-objects logs拷贝到Ubuntu/srv/gitlab-app/gitlab
  
  ```sh
  # 启动
  docker compose up -d

  # 停止
  docker compose down

  # 升级
  docker compose pull

  # 查看 GitLab 容器日志
  docker logs -f gitlab

  # 进入容器检查状态
  docker exec -it gitlab /bin/bash

  # 检查 GitLab 就绪状态
  gitlab-rake gitlab:check
  ```

- Gitlab Root

  ```sh
  # 进入容器终端
  sudo docker exec -it gitlab /bin/bash

  # 查看密码
  cat /etc/gitlab/initial_root_password

  # 关闭注册
  ```

- Docker GitLab 清理日志

  ```sh
  # 进入容器查看日志路径（确认容器内路径）
  docker exec gitlab ls -lh /var/log/gitlab/

  # 在容器内清理（如果日志在容器内部）
  docker exec gitlab bash -c 'find /var/log/gitlab -name "*.log" -type f -exec truncate -s 0 {} \;'

  # 清理 Docker 标准输出日志
  sudo truncate -s 0 $(docker inspect --format='{{.LogPath}}' gitlab)
  ```

## 7.安装MongoDB

- 点击查看 => [MongoDB安装文档](https://www.mongodb.com/zh-cn/docs/v8.0/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu)

## 8.安装redis-server
  
- /etc/redis/redis.conf配置密码
  
- requirepass pwd

  ```sh
  sudo systemctl restart redis-server

  sudo systemctl enable redis-server

  redis-cli -a 'pwd' ping

  redis-cli -a 'pwd' info server
  ```
  