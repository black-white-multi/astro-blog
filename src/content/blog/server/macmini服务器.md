---
title: "Macmini服务器"
description: ""
date: "2025-11-1"
tags: ['工作流']
---

## 1. 安装docker

- brew install docker

## 2. Docker项目

- 项目安装路径  
- /Users/mac/docker-projects/
  
  ### Certd证书流水线

  - <https://cerdt.blackwhite.fun/#/index>  
  - 账号:sprite  
  - 密码:********

    ```sh
    # 拉取镜像
    docker pull registry.cn-shenzhen.aliyuncs.com/handsfree/certd:latest
    # 升级certd
    cd /Users/mac/docker-projects/certd
    # 重新启动容器
    docker compose down
    docker compose up -d
    ```
