---
title: "RH项目IOS打包"
description: ""
date: "2025-10-25"
tags: ['工作流']
---

## 1. Unity Init配置  

Init配置Release

## 2. YooAsset打包  

* 1 HTRpg_Design更新  
HTTools/配置/清除配置缓存并生成配置表数据  

* 2 NGUI需要Reimport  

目录Bundles/UI  

* 3 打包Bundle  
YooAsset -> AssetBundle Builder  
配置  
Build Version   ->   v100  
Build Mode  ->  增量  
File Name Style -> BundleName_HashName  
Copy Buildin File Option -> None  

* 4 Bundle上传OSS  
打开mac项目的StreamingAssets/Bundles终端窗口

上传

~~~sh
ossutil cp DefaultPackage/ oss://korax-oss-hk/AssetBundles/IOS/1.0.0 --exclude "*.meta" -r -u
~~~

删除  

~~~sh
ossutil rm oss://korax-oss-hk/AssetBundles/IOS/1.0.0 -r
~~~

## 3. 打开Xcode项目打包  

* UILoading 版本+1
* Build 版本+1
* Unity-iPhone.xcworkspace  

### FacebookSDK Mac环境配置  

#### 代理设置  

* 1 curl代理设置  
/.curlrc文件  
socks5 = 127.0.0.1:1080  

* 2 git 代理设置  
git config --global http.proxy http://127.0.0.1:1080  

#### Unity安装CocoaPods  

~~~sh
~/.cocoapods/repos/master  
git clone https://github.com/CocoaPods/Specs.git master  
~~~

安装成功pod路径  
M1芯片  
iOS Resolver  
CocoaPods installation detected /opt/homebrew/bin/pod  

Unity -> iOS Reselver Settings  
勾选 use_frameworks! :linkage => :static  

#### Xcode项目进入终端初始化pod  

~~~sh
pod install --verbose --no-repo-update  
~~~

#### Pod自动添加添加UnityFramework  

FacebookSDK  
Unity-Phone → General → Frameworks, Libraries, and Embedded Content  
FBAEMKit  
FBSDKCoreKit  
FBSDKCoreKit_Basics  
FBSDKGamingServicesKit  
FBSDKLoginKit  
FBSDKShareKit  

#### 手动设置UnityFramework  
ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES -> No  
Tips:升级Unity版本可能可以不需要手动设置  

## 远程珠海frps查看端口  

| Name        | Description |
| :----------- | :----------- |
| zhuhai-gs-win10 | Administrator |
|                 | 1963742429  bw***   |
| zhuhai-gs-mac  | 106850365  ht*** |
| zhuhai-gs-git-3389  | Admin 1234 |
| zhuhai-home-win  | sprite hpw*** |
| zhuhai-home-mac18  | 123636937   bw*** |

## 内网Win开发环境搭建  

1. 安装redis  
  下载  
  https://github.com/tporadowski/redis/releases  
  配置redis.windows-service.conf  
bind 0.0.0.0

2. 安装mongodb  

* 1 配置mongod.cfg  

~~~sh
# 内网配置所有IP
net:
  port: 27017
  bindIp: 0.0.0.0

replication:
  replSetName: rs0
~~~

* 2 进入命令行模式执行副本集初始化  
  
~~~sh
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" }
  ]})
~~~
