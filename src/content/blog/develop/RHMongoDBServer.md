---
title: "RH MongoDB 服务器"
description: ""
date: "2025-12-25"
tags: ["工作流", "MongoDB", "Redis"]
---

Amazon Linux 2023

## 1. MongoDB

配置/etc/yum.repos.d/mongodb-org-8.0.repo

```sh
[mongodb-org-8.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2023/mongodb-org/8.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://pgp.mongodb.com/server-8.0.asc
```

安装

```sh
sudo yum install -y mongodb-org
```

创建admin账号

```sh
use admin
db.createUser({
  user: "root",
  pwd: "***",
  roles: [{ role: "readWrite", db: "admin" } , { role: "root", db: "admin" } ]
})
```

配置/etc/mongod.conf

```sh
bindIp: 0.0.0.0

security:
  authorization: enabled
```

```sh
sudo systemctl start mongod

sudo systemctl enable mongod

sudo systemctl status mongod

```

## 2. Redis

配置/etc/redis6/redis6.conf

```sh
bind * -::*

protected-mode no

requirepass password
```

```sh
sudo systemctl start redis6

sudo systemctl restart redis6

sudo systemctl status redis6

# windows cmd
redis-cli -h 127.0.0.1 -p 6379 -a password ping
```
