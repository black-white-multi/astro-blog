---
title: "ECS安装Arch Linux"
description: ""
date: "2026-11-18"
tags: ["工作流", "Linux"]
---

## 阿里云 ECS 上安装 Arch Linux

   配置2h4g

## 1. 下载archlinux-bootstrap-2026.11.01-x86_64.tar.zst

  1. 下载 archlinux-bootstrap

     [下载](https://mirrors.aliyun.com/archlinux/iso/)

     archlinux-2026.11.01-x86_64.iso

  2. 转格式 上传OSS

     # 转格式 上传OSS
     qemu-img convert -f raw -O raw archlinux-2026.11.01-x86_64.iso archlinux.raw
  
  3. 在 ECS 控制台通过“导入镜像”功能创建自定义镜像

## 2. 通过 VNC 完成安装

- 命令行
  
  ```sh
  sgdisk --zap-all /dev/vda

  sgdisk -n 1:0:+1M -t 1:ef02 -c 1:bios_grub /dev/vda
  
  sgdisk -n 2:0:0   -t 2:8300 -c 2:root      /dev/vda
  
  partprobe /dev/vda; udevadm settle
  
  mkfs.ext4 -L root /dev/vda2

  # 检查 应该是 vda1 1M（无文件系统）+ vda2 19.5G ext4
  
  lsblk -f /dev/vda

  # 装基础系统
  
  pacstrap -K /mnt base linux linux-firmware vim networkmanager openssh

  # chroot 配置
  
  genfstab -U /mnt >> /mnt/etc/fstab
  
  # 有一行 UUID=... / ext4 rw,relatime 0 1
  
  cat /mnt/etc/fstab
  
  arch-chroot /mnt

  # chroot 内：按顺序执行

  ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
  
  hwclock --systohc
  
  sed -i 's/^#en_US.UTF-8/en_US.UTF-8/' /etc/locale.gen && locale-gen
  
  echo 'LANG=en_US.UTF-8' > /etc/locale.conf
  
  echo 'arch' > /etc/hostname
  
  passwd root

  # 装 BIOS 引导
  
  pacman -S --noconfirm grub
  
  grub-install --target=i386-pc /dev/vda
  
  grub-mkconfig -o /boot/grub/grub.cfg

  ```