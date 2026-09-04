---
title: "DeepSeek Harness安装"
description: ""
date: "2026-09-04"
tags: ["DeepSeek"]
draft: false
---

## DeepSeek Harness安装

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git

cd deepseek-harness

pnpm install

pnpm run build

pnpm dsh web
```

## 回退到指定标签

```bash
rmdir /s /q packages\util\http-proxy\src

rmdir /s /q packages\util\http-proxy\tests

git reset --hard dsh-v0.1.1-rc.1

pnpm install --frozen-lockfile

pnpm run clean

pnpm run build
```