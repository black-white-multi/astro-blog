---
title: "RH项目IOS打包"
description: ""
date: "2025-09-25"
tags: ['工作流']
---

## Ⅰ. Unity 配置
Init配置Release

## Ⅱ. YooAsset打包  

1. NGUI需要Reimport  
目录Bundles/UI  

2. 打包Bundle  
YooAsset -> AssetBundle Builder  
配置  
Build Version   ->   v100  
Build Mode  ->  增量  
File Name Style -> BundleName_HashName  
Copy Buildin File Option -> None  

3. Bundle上传OSS  
打开mac项目的StreamingAssets/Bundles终端窗口

上传  
~~~sh
ossutil cp DefaultPackage/ oss://korax-oss-hk/AssetBundles/IOS/1.0.0 --exclude "*.meta" -r -u
~~~
删除  
~~~sh
ossutil rm oss://korax-oss-hk/AssetBundles/IOS/1.0.0 -r
~~~

## Ⅲ. 打开Xcode项目打包  

Unity-iPhone.xcworkspace  

### FacebookSDK Mac环境配置  

#### 代理设置  

1. curl代理设置  
/.curlrc文件  
socks5 = "127.0.0.1:1080"  

2. git 代理设置  
git config --global http.proxy http://127.0.0.1:1080  

#### 安装CocoaPods  

~~~sh
~/.cocoapods/repos/master  
git clone https://github.com/CocoaPods/Specs.git master  
~~~

#### Xcode项目进入终端初始化pod  

~~~sh
pod install --verbose --no-repo-update  
~~~

#### 配置Frameworks(FacebookSDK)  

Unity-Phone → General → Frameworks, Libraries, and Embedded Content  
FBAEMKit  
FBSDKCoreKit  
FBSDKCoreKit_Basics  
FBSDKGamingServicesKit  
FBSDKLoginKit  
FBSDKShareKit  

## 远程珠海frps查看端口  

| Name        | Description |
| :----------- | :----------- |
| zhuhai-gs-win10 | Administrator |
|                 | 1963742429  bw***   |
| zhuhai-gs-mac  | 106850365  ht*** |
| zhuhai-gs-git-3389  | Admin 1234 |
| zhuhai-home-win  | sprite hpw*** |
| zhuhai-home-mac18  | 123636937   bw*** |
