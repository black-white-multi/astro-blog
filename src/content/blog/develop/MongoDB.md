---
title: "MongoDB"
description: ""
date: "2025-09-18"
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

## mongodb开放外网访问

修改配置  
/etc/mongod.conf
~~~sh
net:
  port: 27017
  bindIp: 0.0.0.0  # 修改为 0.0.0.0 或指定服务器公网 IP
~~~

开启身份连接验证  
security:
  authorization: enabled

重启MongoDB服务  
sudo systemctl restart mongod

连接  
mongodb://admin:pwd123456@<公网IP>:27017/admin?authSource=admin

## mongosh创建数据库
~~~sh
mongosh
use admin
db.auth("admin", "密码")
use TD
db.createCollection("TD")
show dbs
~~~

## mongosh为用户添加权限
~~~sh
// 使用管理员账号操作
use admin
db.auth("admin", "密码")

use TD
db.createUser({
  user: "td_admin",
  pwd: "***",
  roles: [
    { role: "readWrite", db: "TD" },
    { role: "dbAdmin", db: "TD" }
  ]
})

// 或者查看用户信息
db.getUsers()
~~~

1. 数据库用户角色：read、readWrite；
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin;
1. 集群管理角色：clusterAdmin、clusterManager、4. clusterMonitor、hostManage；
4. 备份恢复角色：backup、restore；
5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6. 超级用户角色：root
7. 内部角色：__system