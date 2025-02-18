---
title: "MongoDB 备份、恢复数据"
description: ""
date: "2024-09-18"
tags: ['MongoDB']
---

## MongoDB命令

查看版本

mongo --version

---

## 1. 备份DB

| 系统     | 命令                                                             |
| :------- | :--------------------------------------------------------------- |
| CentOS7  | mongodump                                                        |
| UbuntuOS | sudo mongodump                                                   |
| Windows  | mongodump -h 127.0.0.1:27017 -d RichMan -o D:\MongoDB\data\dump\ |

---

## 2. 恢复DB

| 系统     | 命令                                                                                             |
| :------- | :----------------------------------------------------------------------------------------------- |
| CentOS7  | mongorestore                                                                                     |
| UbuntuOS | sudo mongorestore --db RichMan --drop /root/dump/backup202404271515/                             |
| Windows  | mongorestore -h 127.0.0.1:27017 -d RichMan --dir D:\MongoDB\data\dump\RichMan202501251050 --drop |

---
