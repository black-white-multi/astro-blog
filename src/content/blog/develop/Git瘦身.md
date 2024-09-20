---
title: "Git瘦身"
description: ""
date: "2024-09-18"
tags: ['Git']
---
## 1. 下载(与git目录同级)

> - 下载 [bfg-1.14.0.jar](https://rtyley.github.io/bfg-repo-cleaner)
> - git clone --mirror <https://gitee.com/blackwhitefun/mahjongu3d.git>
> - git clone --mirror E:\MahjongU3D
> - java -jar bfg-1.14.0.jar --strip-blobs-bigger-than 1M number_one_rich.git
> - java -jar bfg-1.14.0.jar --delete-folders AdZoneAggregate D:\\number_one_rich.git
> - java -jar bfg-1.14.0.jar --delete-folders Puerts D:\\mahjongu3d.git

## 2. cd D:\\number_one_rich.git

> - git reflog expire --expire=now --all && git gc --prune=now --aggressive

## 3. git push

## 4. git clone  D:\number_one_rich.git

---

## Git回滚到指定版本

- 1.git reset --hard xxxxxxxxxxxxxxxxxxxxxxxxx

- 2.git push -f

## Git图标

- win+R 输入regedit,打开注册表
  
- 路径：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers

## 统计代码行数

VS -> Ctrl+Shift+F -> 正则表达式：b*[^:b#/]+.*$
