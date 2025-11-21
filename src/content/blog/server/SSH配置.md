---
title: "SSH配置"
description: ""
date: "2025-11-21"
tags: ["SSH"]
---

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

   sudo systemctl reload ssh
   ```
