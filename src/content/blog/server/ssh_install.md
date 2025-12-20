---
title: "SSH配置"
description: ""
date: "2025-11-06"
tags: ["SSH"]
---

## Ubuntu安装ssh

```sh
sudo apt update
sudo apt install openssh-server
sudo systemctl start ssh
sudo systemctl enable ssh
sudo systemctl status ssh
sudo systemctl restart ssh
```

编辑 SSH 配置文件

```sh
sudo nano /etc/ssh/sshd_config

# 修改默认端口
Port 22

# root 用户登录
PermitRootLogin yes

# 关闭密码认证 防止黑客爆破
PasswordAuthentication no
PermitEmptyPasswords no

# 允许公钥认证
PubkeyAuthentication yes

#只需要密钥认证，简化配置
UsePAM no
```

## SSH密钥登录配置

1. 生成密钥

   ssh-keygen -t ed25519 -C "your_email"

2. 保存路径

   ~/.ssh/

3. 公钥添加到服务器

   ~/.ssh/authorized_keys

4. 编辑 SSH 服务器的配置

   /etc/ssh/sshd_config

   ```sh
    AuthorizedKeysFile	.ssh/authorized_keys
    PubkeyAuthentication yes
    PasswordAuthentication no
    UsePAM no
   ```

5. 重新加载 SSH 服务

   ```sh
   sudo sshd -t

   sudo systemctl reload sshd
   ```
