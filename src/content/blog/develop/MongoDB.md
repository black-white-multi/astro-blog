---
title: "MongoDB 备份、恢复数据"
description: ""
date: "2024-09-18"
tags: ['MongoDB']
---

## MongoDB命令

查看版本

```sh
mongo --version
```

## 1. 备份

CentOS7

```sh
mongodump
```

***
UbuntuOS

```sh
sudo mongodump
```

***
Windows

```sh
mongodump -h 127.0.0.1:27017 -d RichMan -o D:\MongoDB\data\dump\
```

## 2.恢复

CentOS7  

```sh
mongorestore
```

***
UbuntuOS  

```sh
sudo mongorestore --db RichMan --drop /root/dump/backup202404271515/
```

***
Windows

```sh
mongorestore -h 127.0.0.1:27017 -d RichMan 
--dir D:\MongoDB\data\dump\backup202404271515 --drop
```
