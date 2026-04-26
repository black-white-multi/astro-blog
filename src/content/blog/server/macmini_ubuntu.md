---
title: "Macmini安装ubuntu"
description: ""
date: "2026-04-26"
tags: ["工作流", "Ubuntu"]
---

## Ubuntu 24.04.3 LTS

## Ubuntu 26.04 LTS Server

## 1. macOS安装ubuntu 26 servers

  1. 下载rEFInd

  2. 安装rEFInd  
    sudo ./refind-install

  3. 重启Mac mini 同时按Alt键

  4. 插入Ubuntu安装U盘

## 2. 安装wifi驱动

- 命令行
  
  ```sh
  # 插网线 或者 无线网卡

  # 设置国内镜像源
  sudo nano /etc/apt/sources.list.d/ubuntu.sources
  # URIs: http://mirrors.aliyun.com/ubuntu

  sudo apt update

  # 
  sudo apt install network-manager

  # 安装wifi驱动
  sudo apt install broadcom-sta-dkms

  # 
  nmcli device wifi list

  # 连接wifi
  sudo nmcli dev wifi connect "HUAWEI-vSWn" password "888888" ifname wlp2s0

  ip address
  ```

## 3. ssh安装

- 点击查看 => [SSH安装](/blog/server/ssh_install)

## 4. 设置root密码

- 系统重启Esc键 进入GRUB

- macOS grub命令行

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

## 5. 安装frpc

- 点击查看 => [frp安装配置](/blog/server/frp_install)

## 6. 安装 V2Ray

- 点击查看 => [V2Ray安装配置](/blog/server/v2ray_install)

## 7. 安装docker

- 点击查看 => [Docker安装文档](https://docs.docker.com/desktop/setup/install/linux/ubuntu/)

## 8. Docker项目

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
