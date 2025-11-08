---
title: "Unity"
description: ""
date: "2024-10-27"
tags: [Unity]
---

**Terrain Mask 制作**

RGBA对应贴图通道
Metallic + AmbientOcclusion + Height + Smoothness

PS图层 -> 右键 -> 混合选项 -> 选择对应通道

**Unity 3D模型制作工作流**

单位Blener 10M = Unity 1M

- blender 建模低模
- blender 雕刻高模
- blender 高模烘焙法线到低模
- blender ID贴图 选择面纹理绘制填充颜色
- Substance Painter 绘制贴图

**FGUI**

分离alpha通道

UNITY开启宏 FAIRYGUI_USE_ALPHA_TEXTURE

## 音频转换格式

https://github.com/BtbN/FFmpeg-Builds

```bash
ffmpeg -i input.mp3 output.wav      # MP3 → WAV
ffmpeg -i input.aac output.flac     # AAC → FLAC
ffmpeg -i input.m4a output.ogg      # M4A → OGG
```

## mac安装打开

提示已损坏，无法打开  
解决办法

- 在终端中输入 xattr -cr
- 程序图标拖入命令行
- 显示 xattr -cr /Applications/XXX.app

## v2rayN mac安装

- 下载v2rayN-macos-arm64.zip
- 安装
- 打开v2rayN / 检查更新
- 更新库（未打开，Apple无法验证）
- 系统偏好设置 - 隐私与安全性 - 安全性，点击「仍要打开」即可
