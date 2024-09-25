---
title: "ET8.1客户端打包"
description: ""
date: "2024-09-25"
tags: ['工作流','ET']
---
## 1. FGUI发布

* FGUI发布到Unity
* Tools  ->  CopyFGUIDesc

## 2. 设置宏

* Tools -> 宏定义
  * UNITY
  * STEAM

* F6编译code

## 3. HybridCLR

* HybridCLR -> Generate -> All
* HybridCLR -> CopyAotDll

## 4. HybridCLR 编译

* 1.HybridCLR -> CompileDll -> ActiveBuildTarget
* 2.HybridCLR -> CopyCodeDll

## 5. YooAsset 打包

YooAsset -> AssetBundle Builder

配置

* Build Version   ->   v100
* Build Mode  ->  增量
* File Name Style -> Bundle Name
* Copy Buildin File Option -> None

首包

* Copy Buildin File Option -> Clear And Copy All
* 制作首包配置文件：Resources/BuildinFileManifest
* YooAsset   -> BuildBuildinFileManifest
  
## 6. ET Build

 ET -> Build Tool -> BuildPackge
