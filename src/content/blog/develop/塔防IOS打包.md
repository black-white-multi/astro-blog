---
title: "塔防IOS打包"
description: ""
date: "2025-12-24"
tags: ["工作流", "ET"]
---

## 1. FGUI发布

FGUI发布到Unity

Tools -> CopyFGUIDesc

## 2. 设置宏

Tools -> 宏定义  
UNITY

F6编译code

## 3. HybridCLR

HybridCLR -> Generate -> All  
HybridCLR -> CopyAotDll

## 4. HybridCLR 编译

1.HybridCLR -> CompileDll -> ActiveBuildTarget

2.HybridCLR -> CopyCodeDll

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

## 6. ET Build

ET -> Build Tool -> BuildPackge

## 7. Xcode 打包

1. Signing & Capabilities 设置证书包名
2. 设置版本 Bundle version
3. 添加 Sign in with Apple
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