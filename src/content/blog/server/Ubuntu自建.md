---
title: "Ubuntu自建"
description: ""
date: "2025-11-5"
tags: ["工作流"]
---

Ubuntu 24.04.3 LTS

## 1. 安装ssh

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

# 允许密码认证
PasswordAuthentication yes

# 允许公钥认证
PubkeyAuthentication yes
```

## 2. 设置root密码

1. 系统重启SHIFT进入GRUB
2. Advanced options for Ubuntu
3. 选择 "(recovery mode)"
4. 选择 "root" - 进入 root shell

```sh
#修复sudo权限
chown root:root /etc/sudo.conf /etc/sudoers
chmod 440 /etc/sudoers
chown -R root:root /etc/sudoers.d/
#设置root密码
passwd root
#重启
reboot
```

## 3. frpc.service

```sh
# /etc/systemd/system/frpc.service
[Unit]
# 服务名称，可自定义
Description = frpc server
After = network-online.target syslog.target
Wants = network-online.target
Requires = network.target
[Service]
Type = simple
User = root
# 增加重启策略
Restart = on-failure
RestartSec = 5s
# 启动frpc的命令，需修改为您的frpc的安装路径
ExecStart = /usr/local/bin/frp_0.65.0/frpc -c /etc/frpc/frpc.toml
[Install]
WantedBy = multi-user.target
```

配置/etc/frpc/frpc.toml

systemctl restart frpc.service

## 4. 安装 V2Ray

```sh
# 使用官方脚本安装
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)

# 配置 V2Ray
sudo nano /usr/local/etc/v2ray/config.json

{
  "inbounds": [
    {
      "port": 10808,
      "protocol": "socks",
      "sniffing": {
        "enabled": true,
        "destOverride": ["http", "tls"]
      },
      "settings": {
        "auth": "noauth"
      }
    },
    {
      "port": 10809,
      "protocol": "http",
      "sniffing": {
        "enabled": true,
        "destOverride": ["http", "tls"]
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": "ui.blackwhite.fun",
            "port": 8888,
            "users": [
              {
                "id": "替换id",
                "alterId": 0,
                "security": "auto"
              }
            ]
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "security": "none",
        "wsSettings": {
          "path": "/"
        }
      }
    }
  ]
}
```

- 启动 V2Ray  
  sudo systemctl start v2ray

- 设置开机自启  
  sudo systemctl enable v2ray

- 检查运行状态  
  sudo systemctl status v2ray

- sudo systemctl restart v2ray

- sudo systemctl reload v2ray

- /root/.bashrc配置http_proxy  
  export http_proxy=http://127.0.0.1:10809  
  export https_proxy=http://127.0.0.1:10809  
  export ALL_PROXY=socks5://127.0.0.1:10808

- curl https://ipinfo.io/ip

- curl -v https://www.google.com

- APT 包管理器配置http_proxy  
  路径/etc/apt/apt.conf.d

```sh
sudo nano /etc/apt/apt.conf.d/95proxies
Acquire::socks::proxy "socks5://127.0.0.1:10808/";
```

## 5. 安装 Docker

- Docker安装文档  
  <https://docs.docker.com/desktop/setup/install/linux/ubuntu/>

- 配置Docker使用代理  
  sudo mkdir -p /etc/systemd/system/docker.service.d  
  sudo tee /etc/systemd/system/docker.service.d/proxy.conf

```sh
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:10809"
Environment="HTTPS_PROXY=http://127.0.0.1:10809"
Environment="NO_PROXY=localhost,127.0.0.1,::1"
```

sudo systemctl daemon-reload  
sudo systemctl restart docker  
sudo docker run hello-world

## 6.安装Gitlab

迁移win10 gitlab 到 Ubuntu  
将gitlab/config data lfs-objects logs拷贝到Ubuntu/srv/gitlab-app/gitlab

- 启动  
  docker compose up -d

- 停止  
  docker compose down

- 查看 GitLab 容器日志  
  docker logs -f gitlab

- 进入容器检查状态  
  docker exec -it gitlab /bin/bash

- 检查 GitLab 就绪状态  
  gitlab-rake gitlab:check
