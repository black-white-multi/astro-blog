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

## Studio 3T  

### 备份  

Connection Manager SSH链接数据库  
Export 选择 BSON - mongodump archive  
保存文件

### 恢复  

Import 选择 BSON - mongodump archive  
选择文件
