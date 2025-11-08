---
title: "Yooasset"
description: ""
date: "2024-09-27"
tags: ["Yooasset"]
draft: true
---

首包配置
Build Version -> v608
Build Mode -> 增量
Compression -> LZ4
File Name Style -> Bundle Name Hash Name
Copy Buildin File Option -> Clear And Copy By Tags
Copy Buildin File Param -> MainAssets

YooAsset -> 无标签Bundle拷贝到Streaming
HybridCLR -> CompileDll -> ActiveBuildTarget（热更代码）  
HybridCLR -> CopyCodeDlls  
StreamingAssets 打包成 Zip 发到TestFlight打包机
