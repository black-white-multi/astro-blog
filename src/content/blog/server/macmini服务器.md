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
3. 重启Mac mini
4. 插入Ubuntu安装U盘

## 2. 安装ssh

同Korax Gitlab服务器

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

同Korax Gitlab服务器

## 5. 安装 V2Ray

同Korax Gitlab服务器

## 6. 安装docker

## 7. Docker项目

- 项目安装路径
- /Users/mac/docker-projects/

  ### Certd证书流水线

  - <https://cerdt.blackwhite.fun/#/index>
  - 账号:sprite
  - 密码:########

    ```sh
    # 拉取镜像
    docker pull registry.cn-shenzhen.aliyuncs.com/handsfree/certd:latest
    # 升级certd
    cd /Users/mac/docker-projects/certd
    # 重新启动容器
    docker compose down
    docker compose up -d
    ```
