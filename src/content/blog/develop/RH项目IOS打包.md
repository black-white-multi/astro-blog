---
title: "RH项目IOS打包"
description: ""
date: "2025-09-17"
tags: ['Unity']
---

## YooAsset 打包  

YooAsset -> AssetBundle Builder  

配置  
Build Version   ->   v100  
Build Mode  ->  增量  
File Name Style -> BundleName_HashName  
Copy Buildin File Option -> None  

### Bundle上传OSS

打开mac项目的StreamingAssets/Bundles终端窗口

上传  
ossutil cp DefaultPackage/ oss://korax-oss-hk/AssetBundles/IOS/1.0.0 --exclude "*.meta" -r -u

删除  
ossutil rm oss://korax-oss-hk/AssetBundles/IOS/1.0.0 -r

## FacebookSDK Mac环境配置  

### 代理设置  

1. curl代理设置  
/.curlrc文件  
socks5 = "127.0.0.1:1080"  

2. git 代理设置  
git config --global http.proxy http://127.0.0.1:1080  

### 安装CocoaPods  

~/.cocoapods/repos/master  
git clone https://github.com/CocoaPods/Specs.git master  

### Xcode项目进入终端初始化pod  

pod install --verbose --no-repo-update  

### 配置Frameworks(FacebookSDK)  

Unity-Phone → General → Frameworks, Libraries, and Embedded Content
FBAEMKit  
FBSDKCoreKit  
FBSDKCoreKit_Basics  
FBSDKGamingServicesKit  
FBSDKLoginKit  
FBSDKShareKit  