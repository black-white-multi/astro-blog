---
title: "RH项目IOS打包"
description: ""
date: "2025-11-6"
tags: ["工作流"]
---

## 1. Unity Init配置

- Init配置Release

## 2. 版本+1设置

- UILoading 版本+1
- Project Settings -> Build 版本+1

## 3. YooAsset打包

- 1 HTRpg_Design更新  
  HTTools/配置/清除配置缓存并生成配置表数据

- 2 NGUI需要Reimport  
  路径Bundles/UI

- 3 打包Bundle  
  YooAsset -> AssetBundle Builder

  配置  
  Clear Build Cache -> 不勾  
  Use Asset Depend DB -> 打勾  
  File Name Style -> BundleName_HashName  
  Copy Buildin File Option -> ClearAndCopyAll

- 4 Bundle上传OSS

  打开Unity中的StreamingAssets/Bundles  
  选中Bundles打开终端窗口

  上传

  ```sh
  ossutil cp DefaultPackage/ oss://korax-oss-hk/AssetBundles/IOS/1.0.0 --exclude "*.meta" -r -u
  ```

  删除

  ```sh
  ossutil rm oss://korax-oss-hk/AssetBundles/IOS/1.0.0 -r
  ```

## 4. Unity打包Xcode

打开Xcode项目  
 Unity-iPhone.xcworkspace

## 5. FacebookSDK Mac环境配置

> ### 1. 代理设置

1. curl代理设置  
   /.curlrc文件  
   socks5 = 127.0.0.1:10808

2. git 代理设置

   ```sh
   git config --global http.proxy http://127.0.0.1:10808
   ```

> ### 2. Unity安装CocoaPods

```sh
~/.cocoapods/repos/master
git clone https://github.com/CocoaPods/Specs.git master
```

安装成功pod路径  
 M1芯片  
 iOS Resolver  
 CocoaPods installation detected /opt/homebrew/bin/pod

Unity -> iOS Reselver Settings  
 勾选 use_frameworks! :linkage => :static

> ### 3. Xcode项目进入终端初始化pod

```sh
pod install --verbose --no-repo-update
```

> ### 4. Pod自动添加添加UnityFramework

FacebookSDK

Unity-Phone → General → Frameworks, Libraries, and Embedded Content

FBAEMKit  
 FBSDKCoreKit  
 FBSDKCoreKit_Basics  
 FBSDKGamingServicesKit  
 FBSDKLoginKit  
 FBSDKShareKit

> ### 5. 手动设置UnityFramework

ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES -> No  
 Tips:升级Unity版本可能可以不需要手动设置

## 6. 包上传到TestFlight

Xcode -> Product -> Archive  
 先验证Validate App  
 上传Distribute App

## 远程珠海frps查看端口

| Name               | Description            |
| :----------------- | :--------------------- |
| zhuhai-gs-win10    | Administrator          |
|                    | 1963742429 bw\*\*\*    |
| zhuhai-gs-mac      | 106850365 ht\*\*\*     |
| zhuhai-gs-git-3389 | Admin K\***\*\*\*\***8 |
| zhuhai-home-win    | sprite hpw\*\*\*       |
| zhuhai-home-mac18  | 123636937 bw\*\*\*     |

## 内网Win开发环境搭建

### 1. 安装redis

- 下载redis<https://github.com/tporadowski/redis/releases>
- 配置redis.windows-service.conf
- bind 0.0.0.0

### 2. 安装mongodb

- 配置mongod.cfg

  ```sh
  # 内网配置所有IP
  net:
    port: 27017
    bindIp: 0.0.0.0
  replication:
    replSetName: rs0
  ```

- 进入命令行模式执行副本集初始化

  ```sh
  rs.initiate({
    _id: "rs0",
    members: [
      { _id: 0, host: "localhost:27017" }
    ]})
  ```

## RH服务器更新release

master合并到test分支

服务器执行allPull.sh

```sh
sudo sh allPull.sh
```

重新build，打包成docker镜像，创建容器
