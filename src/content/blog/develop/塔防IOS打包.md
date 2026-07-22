---
title: "塔防IOS打包"
description: ""
date: "2026-5-1"
tags: ["工作流", "ET"]
---

## 1. FGUI发布

FGUI发布到Unity

Tools -> CopyFGUIDesc

## 2. 版本+1设置

- ResourcesComponent -> appVersion 版本+1
- Project Settings -> Player Build 版本+1

## 3. 设置宏

- Tools -> 宏定义
- UNITY
- GRAPH_DESIGNER
- FAIRYGUI_USE_ALPHA_TEXTURE
- ENABLE_IL2CPP
- AMPLIFY_SHADER_EDITOR

F6编译code

## 4. HybridCLR

HybridCLR -> Generate -> All

HybridCLR -> CopyAotDll

## 5. YooAsset 打包

YooAsset -> AssetBundle Builder

配置

Clear Build Cache -> 不勾  
Use Asset Depend DB -> 打勾  
File Name Style -> BundleName_HashName  
Copy Buildin File Option -> ClearAndCopyAll

首包

Copy Buildin File Option -> Clear And Copy All  
制作首包配置文件：Resources/BuildinFileManifest  
YooAsset -> BuildBuildinFileManifest

配置ossutils

打开mac项目的StreamingAssets/Bundles终端窗口  
选中Bundles打开终端窗口

mac上传

```sh
ossutil cp DefaultPackage/ oss://korax-oss-hk/TowerDefense/IOS/v1.0.0 --exclude "*.meta" -r -u
```

win上传

```sh
ossutil cp D:\KoraxTD\Unity\Assets\StreamingAssets\Bundles\DefaultPackage oss://korax-oss-hk/TowerDefense/IOS/v1.0.0 --exclude "*.meta" -r -u
```

删除

```sh
ossutil rm oss://korax-oss-hk/TowerDefense/IOS/v1.0.0 -r
```

## 6. Unity打包Xcode

Project Settings -> Build

## 7. Xcode 打包

1. Signing & Capabilities 设置证书包名
2. 设置版本 Bundle version
3. 手动设置UnityFramework
   - ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES -> No
4. Info.plist
   - App Uses Non-Exempt Encryption : NO
   - Privacy - Camera Usage Description
   - AuthenticationServices.framework
5. 测试包
   - 删除支付
   - UnityFramework 加入 StoreKit.framework

---

## xcode 发布ios平台时出现 stdio.h 编译错误

- zlib升级到最新版本，替换{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/external/zlib目录的代码
- 清理Library缓存后重新打包

## 塔防服务器

```sh
# 配置sudo权限
/etc/sudoers.d

sprite ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart et_app.service

# 路径
cd /sprite/Desktop/koraxtd

# 更新
./Publish-linux-x64.sh
```

## Mongodb初始化设置

MongoDB 8.3.4 与 Linux 内核 6.19+ 存在不兼容

降级 MongoDB 到 8.0.4

```sh
# 1. 停掉当前服务
sudo systemctl stop mongod

# 2. 卸载当前版本
sudo apt remove mongodb-org mongodb-org-server mongodb-org-shell mongodb-org-mongos mongodb-org-tools mongodb-org-database mongodb-org-database-tools-extra mongodb-mongosh

# 3. 安装 8.0.4 版本
sudo apt install mongodb-org=8.0.4 mongodb-org-server=8.0.4 mongodb-org-shell=8.0.4 mongodb-org-mongos=8.0.4 mongodb-org-tools=8.0.4 mongodb-org-database=8.0.4 mongodb-org-database-tools-extra=8.0.4

# 4. 锁定版本防止自动升级
sudo apt-mark hold mongodb-org mongodb-org-server mongodb-org-shell mongodb-org-mongos mongodb-org-tools mongodb-org-database

# 5. 启动
sudo systemctl start mongod
sudo systemctl status mongod


# 取消代理
unset http_proxy https_proxy ALL_PROXY

# 连接
mongosh --tls=false

# 添加用户权限
use admin

db.createUser({   user: "admin",   pwd: "**********", roles: [{ role: "root", db: "admin" }] })
```
