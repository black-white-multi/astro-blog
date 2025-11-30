---
title: "Macmini服务器"
description: ""
date: "2025-11-1"
tags: ["工作流", "Ubuntu"]
---

Ubuntu自建

Ubuntu 24.04.3 LTS

## 1. macOS安装ubuntu

1. 下载rEFInd
2. 安装rEFInd  
   sudo ./refind-install
3. 重启Mac mini 同时按Alt键
4. 插入Ubuntu安装U盘

## 2. ssh安装

点击查看 => [SSH安装](/blog/server/ssh_install)

## 3. 设置root密码

系统重启Esc键 进入GRUB

macOS grub命令行

```sh
# 查看内核文件列表
ls (hd1,gpt2)/boot/

# 设置根分区
set root=(hd1,gpt2)

# 加载内核（进入救援模式） xxx内核版本号
linux /boot/vmlinuz-xxx root=/dev/sda2 systemd.unit=rescue.target

# 加载 initrd xxx内核版本号
initrd /boot/initrd.img-xxx

#设置root密码
passwd root

# 启动
boot
```

## 4. frpc.service

同[Korax Gitlab服务器](/blog/server/korax_gitlab_server#3-frpcservice)

## 5. 安装 V2Ray

同[Korax Gitlab服务器](/blog/server/korax_gitlab_server#4-安装-v2ray)

## 6. 安装docker

## 7. Docker项目

- Docker项目安装路径 /srv/

  ### Certd证书流水线

  - [Certd帮助文档](https://certd.docmirror.cn/guide/)
  - <https://cerdt.blackwhite.fun/#/index>
  - 账号:sprite
  - 密码:########
  - /srv/certd/

    ```sh
    # docker-compose.yml
    version: '3.3'
    services:
    certd:
      image: registry.cn-shenzhen.aliyuncs.com/handsfree/certd:latest
      container_name: certd
      restart: unless-stopped
      volumes:
        # Ubuntu目录路径
        - /srv/certd:/app/data
      ports:
        - "7001:7001"
        - "7002:7002"
      environment:
        - TZ=Asia/Shanghai
        - certd_system_resetAdminPasswd=false
        - certd_koa_hostname=0.0.0.0

    ```

  - 重新启动容器
  - docker compose down
  - docker compose up -d
