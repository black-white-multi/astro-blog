---
title: "ET8.1 Ubuntu部署"
description: ""
date: "2024-09-25"
tags: ['工作流','ET']
---

## 1. Ubuntu 22.04

sudo apt update  
sudo apt upgrade (2CPU 2G 开启无性能约束)  
df -h 查看硬盘空间  
df -ha  

## 2. MongoDB 6.0 安装

**报错 Could not get lock /var/lib/dpkg/lock-frontend**  

```sh
sudo killall apt apt-get

提示没有apt进程 apt: no process found
sudo rm /var/lib/apt/lists/lock
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock*
sudo dpkg --configure -a
sudo dpkg --configure -a
```

**按照文档安装**
**在 Ubuntu 上安装 MongoDB Community Edition**

```sh
sudo apt-get install gnupg curl  (开启无性能约束)
curl -fsSL <https://www.mongodb.org/static/pgp/server-6.0.asc> 
| sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] 
<https://repo.mongodb.org/apt/ubuntujammy/mongodb-org/6.0> multiverse" 
| sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

## 3.  启动MongoDB

```sh
sudo systemctl start mongod
sudo systemctl daemon-reload
sudo systemctl status mongod
sudo systemctl enable mongod
sudo systemctl restart mongod

mongosh
sudo service mongod stop
```

硬盘满了导致Mongodb无法启动，使用命令才能启动
sudo chown -R mongodb:mongodb /var/lib/mongodb/*

## 4.  MongoDB 备份、恢复数据

CentOS  
备份 mongodump  
恢复 mongorestore  

UbuntuOS  
备份 sudo mongodump  
恢复 sudo mongorestore --db RichMan --drop /root/dump/RichMan202404271515/  
  
## 5.  安装Net8 运行时

**在Ubuntu上安装.Net8**  

sudo apt-get install -y dotnet-sdk-8.0  
sudo apt-get install -y aspnetcore-runtime-8.0  
sudo apt-get install -y dotnet-runtime-8.0  
使用 dotnet --list-sdks 和 dotnet --list-runtimes 命令查看安装的版本  

## 6. ET8 守护进程

**路径 /etc/systemd/system/et_app.service**  

systemctl stop et_app.service  

systemctl start et_app.service  

systemctl status et_app.service  

systemctl daemon-reload  

## 7. Ubuntu 解压zip

**安装解压**  
sudo apt-get install unzip
unzip  Config.zip
unzip  Bin.zip  

## 8. Ubuntu 下载文件

 cd 到ET目录下
 cd /
 cd ET

 wget <https://rich-shenzhen-ipa.oss-cn-shenzhen.aliyuncs.com/pc/Config.zip>  
 wget <https://rich-shenzhen-ipa.oss-cn-shenzhen.aliyuncs.com/pc/Bin.zip>  
  
## 9. 编译ET Server

**Linux 编译ET Server**  
Linux 部署 ET8.1  
Publish-linux-x64.ps1 右键 使用PowerShell运行  
ETs\Publish\linux-x64  文件夹复制到云服务器  

使用命令cd /home/Project/ET/linux-x64/Bin进入可执行程序地址  
使用命令chmod 754 App修改文件权限  
使用命令dotnet App.dll --Process=1 --StartConfig=StartConfig/richsteam --LogLevel=3  
  
 Windows 编译ET Server
  E:\number_one_rich\DotNet
  dotnet publish

## 10.NLog设置

注释 rules 中的ServerDebug  

```sh
<!--logger ruleName="ServerDebug"-->
```
