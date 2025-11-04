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

## frpc.service

~~~sh
#frpc.service

[Unit]
# 服务名称，可自定义
Description = frpc server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
User = root

# 启动frpc的命令，需修改为您的frpc的安装路径
ExecStart = /usr/local/bin/frp_0.65.0/frpc -c /etc/frpc/frpc.toml

[Install]
WantedBy = multi-user.target
~~~
