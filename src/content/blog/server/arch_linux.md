---
title: "Arch Linux安装"
description: ""
date: "2025-12-01"
tags: ["Linux"]
---

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
  pacstrap /mnt base linux linux-firmware

  # 必要的软件包
  pacstrap /mnt base-devel vim networkmanager
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
  echo "LANG=en_US.UTF-8" > /etc/locale.conf
  ```

- 网络配置

  ```sh
  # 设置主机名
  echo "myarch" > /etc/hostname

  # 配置 /etc/hosts
  cat <<EOF >> /etc/hosts
  127.0.0.1   localhost
  ::1         localhost
  127.0.1.1   myarch.localdomain myarch
  EOF
  ```

- 设置 root 密码
  passwd

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

- 创建普通用户

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
