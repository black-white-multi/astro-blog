---
title: "Git相关"
description: ""
date: "2025-11-5"
tags: ['Git']
---

## Sourcetree 添加 SSH 密钥

1. 打开 Sourcetree

2. 点击菜单 Tools → Options（工具 → 选项）

3. 切换到 General（通用）选项卡

4. 在 SSH Client Configuration（SSH 客户端配置）部分：

    * SSH Client: 选择 OpenSSH

    * SSH Key: 点击 Browse（浏览）按钮

    * 导航到你的 SSH 密钥目录：C:\Users\Sprite\.ssh\

    * 选择你的私钥文件 id_ed25519

5. 点击 OK 保存配置

## 检查现有的 SSH 密钥

~~~sh
# 查看命令
ls -al ~/.ssh
# 看到类似的文件列表
id_rsa
id_rsa.pub
id_ed25519
id_ed25519.pub
# 在终端中运行
cat ~/.ssh/id_ed25519.pub
# 终端会显示公钥内容
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI...（很长一串字符） 你的邮箱地址@example.com
#登录GitLab账户 添加SSH Keys密钥
~~~

---

## Git瘦身

* 下载(与git目录同级)

    下载 [bfg-1.14.0.jar](https://rtyley.github.io/bfg-repo-cleaner)

    git clone --mirror https://gitee.com/blackwhitefun/mahjongu3d.git  

    git clone --mirror E:\MahjongU3D  

    java -jar bfg-1.14.0.jar --strip-blobs-bigger-than 1M number_one_rich.git  

    java -jar bfg-1.14.0.jar --delete-folders AdZoneAggregate D:\\number_one_rich.git  

    java -jar bfg-1.14.0.jar --delete-folders Puerts D:\\mahjongu3d.git  

* cd D:\\number_one_rich.git

    git reflog expire --expire=now --all && git gc --prune=now --aggressive

* git push

* git clone  D:\number_one_rich.git

---

## Git回滚到指定版本

git reset --hard xxxxxxxxxxxxxxxxxxxxxxxxx  

git push -f  

## Git图标

win+R 输入regedit,打开注册表  
  
路径：

HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers

## 统计代码行数

VS -> Ctrl+Shift+F  

正则表达式  
b*[^:b#/]+.*$
