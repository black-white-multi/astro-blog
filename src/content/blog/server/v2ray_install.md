---
title: "v2ray安装配置"
description: ""
date: "2026-04-26"
tags: ["V2Ray"]
---

## v2ray安装

- 使用官方脚本安装

  ```sh
  bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
  ```

## v2ray配置

- 编辑配置

  ```sh
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

## CLI

- CLI
  
  ```sh
  # 启动 V2Ray  
  sudo systemctl start v2ray

  # 设置开机自启  
  sudo systemctl enable v2ray

  # 检查运行状态  
  sudo systemctl status v2ray

  sudo systemctl restart v2ray

  sudo systemctl reload v2ray

  # 执行权限
  sudo chmod +x /usr/local/bin/v2ray
  ```

- /root/.bashrc配置http_proxy
  
  ```sh
  export http_proxy=http://127.0.0.1:10809  
  export https_proxy=http://127.0.0.1:10809  
  export ALL_PROXY=socks5://127.0.0.1:10808
  ```

- curl https://ipinfo.io/ip

- curl -v https://www.google.com

- APT 包管理器配置http_proxy  
  路径/etc/apt/apt.conf.d

- sudo nano /etc/apt/apt.conf.d/95proxies

- Acquire::http::proxy "http://127.0.0.1:10809";

## mac安装v2rayN

1. 下载v2rayN-macos-arm64.zip
2. 安装v2rayN
3. 打开v2rayN / 检查更新
4. 更新库（未打开，Apple无法验证）
5. 系统偏好设置 - 隐私与安全性 - 安全性，点击「仍要打开」即可