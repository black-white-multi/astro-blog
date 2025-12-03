---
title: "Arch Linux安装"
description: ""
date: "2025-12-01"
tags: ["Linux"]
---

## 开始安装

  ```sh
  # 使用 iwd 连接 Wi-Fi
  systemctl start iwd
  iwctl
  device list
  station wlan0 scan
  station wlan0 get-networks
  station wlan0 connect "Wi-Fi名称"
  # 输入密码

  # 检查网络连接
  ping www.baidu.com

  # 校准系统时间
  timedatectl set-ntp true
  timedatectl status

  # 更换国内镜像源
  vim /etc/pacman.d/mirrorlist
  
  # 顶部设置url
  Server = https://mirrors.aliyun.com/archlinux/$repo/os/$arch

  # 保存退出
  :wq 
  ```

## linux分区

- 列出硬盘分区
  lsblk

- fdisk分区

  ```sh
  fdisk /dev/sda

  输入 n 创建新分区
  分区号：默认（1）
  第一个扇区：默认（2048）
  最后一个扇区：+512M

  创建EFI系统分区 +512M
  更改分区类型为EFI系统分区：输入 t，然后选择1类型(EFI系统分区的类型代码是1)

  创建Linux swap交换分区 +8G(根据内存调整)
  更改分区类型为交换分区：输入 t，然后选择分区，类型代码为 19（Linux swap）

  创建根分区 使用剩余所有空间
  ```

- 写入并退出 输入 w

- UEFI格式化分区

  ```sh
  # 格式化EFI分区为FAT32
  mkfs.fat -F32 /dev/sda1

  # 设置交换分区
  mkswap /dev/sda2
  swapon /dev/sda2

  # 格式化根分区
  mkfs.ext4 /dev/sda3
  ```

- 挂载分区

  ```sh
  # 挂载根分区
  mount /dev/sda3 /mnt

  # home分区
  mkdir -p /mnt/home
  mount /dev/sda3 /mnt/home

  # EFI分区
  mkdir -p /mnt/boot
  mount /dev/sda1 /mnt/boot
  ```

- 查看磁盘设备
  lsblk 或 fdisk -l

## 安装基本系统

- 安装基础包

  ```sh
  # 基础包
  pacstrap /mnt base linux linux-firmware base-devel vim networkmanager
  ```

- 生成 fstab 文件

  ```sh
  genfstab -U /mnt >> /mnt/etc/fstab

  # 检查生成文件
  cat /mnt/etc/fstab
  ```

## 进入新系统

- 进入新安装的系统

  ```sh
  arch-chroot /mnt
  ```

- 设置时区

  ```sh
  ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
  hwclock --systohc
  ```

- 本地化设置

  ```sh
  # 编辑 /etc/locale.gen
  vim /etc/locale.gen

  # 生成本地化信息
  locale-gen

  # 设置 LANG 变量
  echo "en_US.UTF-8" > /etc/locale.conf
  ```

- 网络配置

  ```sh
  # 设置主机名
  echo "archmac" > /etc/hostname

  # 配置 /etc/hosts
  cat <<EOF >> /etc/hosts
  127.0.0.1   localhost
  ::1         localhost
  127.0.1.1   archmac.localdomain archmac
  EOF
  ```

- 设置 root 密码
  
  passwd root 

- 安装引导程序

  ```sh
  # UEFI 系统
  pacman -S grub efibootmgr
  grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
  grub-mkconfig -o /boot/grub/grub.cfg
  ```

- 退出并重启

  ```sh
  # 退出 chroot 环境
  exit

  # 卸载分区
  umount -R /mnt

  # 重启系统
  reboot
  ```

## 重启后基本设置

- 重启后，以 root 登录

- 连接Wi-Fi
  
  ```sh
  systemctl start NetworkManager

  nmtui
  nmcli device wifi list
  nmcli device wifi connect "Wi-Fi名" password "密码"
  ```

- 创建普通用户

  ```sh
  # 创建用户
  useradd -m -G wheel,audio,video,storage,power -s /bin/bash 用户名
  
  # 设置密码
  passwd 用户名
  
  pacman -S sudo vim
  EDITOR=vim visudo
  
  # 找到这行并取消注释（删除 #）
  %wheel ALL=(ALL) ALL

  :wq
  ```

- 配置 sudo

  ```sh
  EDITOR=vim visudo
  # 取消注释 %wheel ALL=(ALL) ALL 这一行
  ```

- 安装网络管理

  ```sh
  pacman -S networkmanager
  systemctl enable NetworkManager
  ```

- 安装图形界面 GNOME

  ```sh
  sudo pacman -S gnome

  sudo pacman -S gdm

  sudo systemctl enable gdm

  # 重启进入 GNOME
  sudo reboot
  ```