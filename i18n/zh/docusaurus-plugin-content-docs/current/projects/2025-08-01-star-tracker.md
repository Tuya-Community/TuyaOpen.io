---
title: "觅星"
date: 2025-08-01
---

<BackToProjects />

# 觅星

## 项目概述

一款基于涂鸦T5AI-CORE 核心开发板 搭载T5-E1芯片模组，能够指向星星和实现天文Agent对话的新式指南针。本项目展示了TuyaOpen强大的云端AI智能体能力，通过集成涂鸦开发者平台的智能体框架与天文专家提示词，演示了TuyaOpen如何通过云端连接让AI开发对硬件创作者变得触手可及。

我们基于TUYA T5-E1这款开发板重新发明了指南针，用4LineSPI的TFT显示屏显示指南针，校准陀螺仪MPU6050的朝向，根据陀螺仪的方向角进行旋转，从而达到指南的基本功能。TuyaOpen框架实现了云端AI智能体与硬件传感器的无缝集成，使得复杂的天文计算和实时天体识别通过云端处理成为可能。

<p align="center">
  <img
    src="https://images.tuyacn.com/fe-static/docs/img/d5edf1cb-85f8-4b2d-9f28-b8fa07cc32fc.jpg"
    alt="觅星项目截图"
    style={{
      width: "80%",
      borderRadius: "12px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
    }}
  />
</p>

<p align="center">
  <img
    src="https://images.tuyacn.com/fe-static/docs/img/11fcf2a4-25b6-4a90-8f3a-bc6e5f0dde38.jpg"
    alt="觅星项目截图"
    style={{
      width: "80%",
      borderRadius: "12px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
    }}
  />
</p>

## 功能特性

- **TuyaOpen云端AI智能体集成**: 利用TuyaOpen云端智能体框架与天文专家提示词实现智能对话
- **星体指向功能**: 使用TuyaOpen云端计算能力处理的轨道计算公式
- **实时天体识别**: TuyaOpen云端多模态AI处理传感器数据实现精确星体跟踪
- **家乡设置功能**: 情感化AI提示展示TuyaOpen云端自然语言处理能力
- **本地经纬度计算**: TuyaOpen云端计算框架处理复杂天文数学运算
- **4LineSPI TFT显示屏界面**: 通过TuyaOpen外设驱动实现无缝硬件集成
- **MPU6050陀螺仪集成**: TuyaOpen云端传感器融合算法实现精确方向跟踪

## 技术栈

- **TuyaOpen框架**: 完整的AIoT操作系统，具备云端多模态AI能力
- **硬件**: 涂鸦T5AI-CORE开发板，T5-E1芯片模组
- **显示**: 4LineSPI TFT显示屏，集成TuyaOpen的LVGL
- **传感器**: MPU6050陀螺仪，配合TuyaOpen云端传感器融合算法
- **AI处理**: TuyaOpen云端智能体框架，天文专家提示词
- **云端计算**: TuyaOpen云端AI处理，实现实时计算和天文数据处理
- **设计**: 黏土制作，Procreate，Procreate Dream，逐帧动画设计

## 快速开始

1. 搭建涂鸦T5AI-CORE开发环境
2. 配置T5-E1芯片模组
3. 连接4LineSPI TFT显示屏
4. 校准MPU6050陀螺仪
5. 设置天文Agent专家提示词
6. 配置本地经纬度坐标
7. 设置家乡位置用于情感提示

## 项目仓库链接

<p align="center">
  <a
    href="https://github.com/Hustle28214/TUYA-T5-E1-FindStar/tree/master"
    target="_blank"
    className="button button--primary"
    style={{
      fontSize: "1.15rem",
      padding: "14px 2.5em",
      borderRadius: "16px",
      background: "linear-gradient(90deg, #4f8cff 0%, #38b2ac 100%)",
      color: "#fff",
      boxShadow: "0 4px 24px rgba(79,140,255,0.18), 0 1.5px 6px rgba(56,178,172,0.10)",
      border: "none",
      fontWeight: "bold",
      letterSpacing: "0.04em",
      transition: "transform 0.15s, box-shadow 0.15s",
      display: "inline-block"
    }}
  >
    前往项目仓库
  </a>
</p>

## 版权与许可

本项目作为[Adventure X 2025 杭州黑客松](https://adventure-x.org/zh)的一部分开发。项目及其所有组件归参与团队成员和比赛参与者所有。保留所有权利。
