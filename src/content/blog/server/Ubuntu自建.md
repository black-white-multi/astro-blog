---
title: "Ubuntu自建"
description: ""
date: "2025-10-30"
tags: ['工作流']
---

Ubuntu 24.04.3 LTS

## 安装ssh

~~~sh
sudo apt update
sudo apt install openssh-server
sudo systemctl start ssh
sudo systemctl enable ssh
sudo systemctl status ssh
sudo systemctl restart ssh
~~~

## 编辑 SSH 配置文件

~~~sh
sudo nano /etc/ssh/sshd_config

# 修改默认端口
Port 22

# root 用户登录
PermitRootLogin yes

# 允许密码认证
PasswordAuthentication yes

# 允许公钥认证
PubkeyAuthentication yes
~~~

## 设置root密码

1. 系统重启SHIFT进入GRUB
2. Advanced options for Ubuntu
3. 选择 "(recovery mode)"
4. 选择 "root" - 进入 root shell

~~~sh
#修复sudo权限
chown root:root /etc/sudo.conf /etc/sudoers
chmod 440 /etc/sudoers
chown -R root:root /etc/sudoers.d/
#设置root密码
passwd root
#重启
reboot
~~~
