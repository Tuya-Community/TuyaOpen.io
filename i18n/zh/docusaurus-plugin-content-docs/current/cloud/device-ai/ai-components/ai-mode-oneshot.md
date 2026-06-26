---
title: 按键对话模式
---

## 名词解释

| 名词 | 解释                                                         |
| ---- | ------------------------------------------------------------ |
| VAD  | 语音活动检测（Voice Activity Detection），用于检测是否有语音输入。 |

## 功能简述

`ai_mode_oneshot` 是 TuyaOpen AI 应用框架中的按键模式实现，提供了一种快速触发的语音交互方式。用户通过单击按键触发后，设备进入监听状态，自动通过 VAD 检测语音活动并完成录音上传。

- **按键触发**：单击按键触发，进入监听状态
- **自动 VAD**：使用自动 VAD 模式，唤醒后自动检测语音活动，无需手动控制录音
- **持续监听**：唤醒后进入持续监听状态，支持多轮对话
- **自动超时**：在无语音活动或播放完成后，自动超时（默认 30 秒）返回空闲状态
- **LED 指示**：不同状态显示不同的 LED 效果（需启用 LED 组件）
  - 空闲：LED 关闭
  - 聆听：LED 闪烁（500ms）
  - 思考：LED 闪烁（2000ms）
  - 说话：LED 常亮

## 工作流程

### 模块架构图

```mermaid
flowchart TD
    A[应用层] --> B[ai_mode_oneshot 模块]
    B --> C[状态机管理]
    B --> D[按键触发]
    B --> E[VAD 处理]
    B --> F[事件处理]
    
    D --> G[单击触发]
    
    C --> H[IDLE<br/>空闲]
    C --> I[LISTEN<br/>监听]
    C --> J[UPLOAD<br/>上传]
    C --> K[THINK<br/>思考]
    C --> L[SPEAK<br/>说话]
    
    style C fill:#e1f5ff
    style D fill:#fff4e1
```

### 状态机流程

按键模式通过状态机管理整个交互流程，从空闲状态开始，通过单击按键进入监听，完成语音交互后根据情况返回监听或空闲状态。

```mermaid
stateDiagram-v2
    direction LR
    [*] --> IDLE: 初始化
    IDLE --> LISTEN: 单击按键触发
    LISTEN --> UPLOAD: VAD 检测到语音
    UPLOAD --> THINK: 上传完成
    THINK --> SPEAK: AI 处理完成
    SPEAK --> LISTEN: 播放完成(已唤醒)
    SPEAK --> IDLE: 播放完成(未唤醒)
    LISTEN --> IDLE: 超时(30秒)
    THINK --> IDLE: 超时(30秒)
```

### 按键触发流程

用户通过单击按键触发按键模式，设备进入监听状态。

```mermaid
sequenceDiagram
    participant User as 用户
    participant Mode as ai_mode_oneshot
    participant Audio as 音频输入
    
    User->>Mode: 单击按键
    Mode->>Mode: 停止播放和录音
    Mode->>Mode: 播放唤醒提示音
    Mode->>Mode: 进入 LISTEN 状态
    Mode->>Audio: 启用唤醒模式
    Mode->>Audio: 设置 VAD 自动模式
```

### 语音交互流程

唤醒后，设备自动通过 VAD 检测语音活动，完成一轮完整的语音交互。

```mermaid
sequenceDiagram
    participant User as 用户
    participant Mode as ai_mode_oneshot
    participant VAD as VAD 检测
    participant Agent as AI Agent
    participant Player as 音频播放器
    
    Note over Mode: LISTEN 状态
    User->>VAD: 说话
    VAD->>Mode: VAD_START 事件
    Mode->>Agent: 开始录音上传
    Mode->>Mode: 进入 UPLOAD 状态
    
    Agent->>Mode: ASR 识别完成
    Mode->>Mode: 进入 THINK 状态
    
    Agent->>Player: 返回 TTS 音频
    Mode->>Mode: 进入 SPEAK 状态
    
    Player->>Mode: 播放完成
    alt 仍在唤醒状态
        Mode->>Mode: 返回 LISTEN 状态
    else 已超时
        Mode->>Mode: 返回 IDLE 状态
    end
```

## 配置说明

### 配置文件路径

```
ai_components/ai_mode/Kconfig
```

### 功能使能

```
menuconfig ENABLE_COMP_AI_PRESENT_MODE
    bool "enable ai present mode"
    default y

config ENABLE_COMP_AI_MODE_ONESHOT
    bool "enable ai mode oneshot"
    default y
```

### 依赖组件

- **音频组件**（`ENABLE_COMP_AI_AUDIO`）：必需，用于音频输入输出和 VAD 检测
- **LED 组件**（`ENABLE_LED`）：可选，用于状态指示
- **按键组件**（`ENABLE_BUTTON`）：必需，用于按键触发功能

## 开发流程

### 接口说明

#### 注册按键模式

将按键模式注册到模式管理器中。

```c
/**
 * @brief Register oneshot mode
 * @return OPERATE_RET Operation result
 */
OPERATE_RET ai_mode_oneshot_register(void);
```

### 开发步骤

1. **注册模式**：在应用启动时调用 `ai_mode_oneshot_register()` 注册按键模式
2. **初始化模式**：通过 `ai_mode_init(AI_CHAT_MODE_ONE_SHOT)` 初始化按键模式
3. **运行模式任务**：在任务循环中调用 `ai_mode_task_running()` 运行状态机
4. **处理事件**：确保用户事件、VAD 状态变化、按键事件等已正确转发到模式管理器

### 参考示例

#### 注册和初始化

```c
#include "ai_mode_oneshot.h"
#include "ai_manage_mode.h"

// 注册按键模式
OPERATE_RET register_oneshot_mode(void)
{
    OPERATE_RET rt = OPRT_OK;
    
    // 注册按键模式
    TUYA_CALL_ERR_RETURN(ai_mode_oneshot_register());
    
    return rt;
}

// 初始化按键模式
OPERATE_RET init_oneshot_mode(void)
{
    OPERATE_RET rt = OPRT_OK;
    
    // 初始化按键模式
    TUYA_CALL_ERR_RETURN(ai_mode_init(AI_CHAT_MODE_ONE_SHOT));
    
    return rt;
}
```

#### 模式切换

```c
// 切换到按键模式
void switch_to_oneshot_mode(void)
{
    OPERATE_RET rt = ai_mode_switch(AI_CHAT_MODE_ONE_SHOT);
    if (OPRT_OK == rt) {
        PR_NOTICE("切换到按键模式");
    } else {
        PR_ERR("切换模式失败: %d", rt);
    }
}
```

#### 查询模式状态

```c
void query_oneshot_mode_state(void)
{
    AI_MODE_STATE_E state = ai_mode_get_state();
    PR_NOTICE("按键模式当前状态: %s", ai_get_mode_state_str(state));
}
```

