---
title: Free Chat Mode
---

## Glossary

| Term | Description |
| ---- | ------------------------------------------------------------ |
| KWS | Keyword Spotting is used to detect specific wake words and trigger the device to enter the listening state. |
| VAD | Voice Activity Detection (Voice Activity Detection), used to detect whether there is voice input. |

## Overview

`ai_mode_free` implements free conversation mode in the TuyaOpen AI application framework and provides natural voice interaction. After the user triggers it through a wake word or one-shot key action, the device enters a continuous listening state and can support multiple conversation rounds within a period of time (30 seconds by default) without retriggering each interaction.

- **Wake-up mechanism**: Supports two triggers: wake word (KWS) and one-shot key input
- **Continuous Monitoring**: Enter continuous monitoring state after waking up, supporting multiple rounds of dialogue
- **Auto Timeout**: Automatically times out (default 30 seconds) to return to idle state after no voice activity or playback is completed
- **LED Indication**: Different states display different LED effects (LED components need to be enabled)
- Idle: LED off
- Listening: LED flashing (500ms)
- Think: LED flashing (2000ms)
- Talk: LED is always on

## Workflow

### Module architecture diagram

```mermaid
flowchart TD
A[application layer] --> B[ai_mode_free module]
B --> C[State machine management]
B --> D[Wake-up detection]
B --> E[VAD processing]
B --> F[event handling]
    
D --> G[KWS wake up]
D --> H[Button to wake up]
    
C --> I[IDLE<br/>idle]
C --> J[LISTEN<br/>Listening]
C --> K[UPLOAD<br/>Upload]
C --> L[THINK<br/>Thinking]
C --> M[SPEAK<br/>speak]
    
    style C fill:#e1f5ff
    style D fill:#fff4e1
```

### State machine process

Free conversation mode manages the full interaction flow with a state machine. It starts from idle and enters listening after wake-up. After each voice interaction, it returns to listening or idle based on runtime status.

```mermaid
stateDiagram-v2
    direction LR
[*] --> IDLE: initialization
IDLE --> LISTEN: wake word/button trigger
LISTEN --> UPLOAD: VAD detected voice
UPLOAD --> THINK: Upload completed
THINK --> SPEAK: AI processing completed
SPEAK --> LISTEN: Playback completed (awakened)
SPEAK --> IDLE: Playback completed (not awakened)
LISTEN --> IDLE: timeout (30 seconds)
THINK --> IDLE: timeout (30 seconds)
```

### Wake-up process

Users can trigger free conversation mode through wake words or key presses.

```mermaid
sequenceDiagram
participant User as user
    participant Mode as ai_mode_free
participant KWS as KWS module
participant Audio as audio input
    
alt wake word trigger
User->>KWS: Say the wake word
KWS->>Mode: wake-up callback
else key trigger
User->>Mode: key event
    end
    
Mode->>Mode: Stop playing and recording
Mode->>Mode: Play wake-up tone
Mode->>Mode: Enter LISTEN state
Mode->>Audio: Enable wake-up mode
Mode->>Audio: Set VAD automatic mode
```

### Voice interaction process

After wake-up, the device automatically detects voice activity through VAD and completes one full voice interaction round.

```mermaid
sequenceDiagram
participant User as user
    participant Mode as ai_mode_free
participant VAD as VAD test
    participant Agent as AI Agent
participant Player as audio player
    
Note over Mode: LISTEN state
User->>VAD: Speak
VAD->>Mode: VAD_START event
Mode->>Agent: Start recording upload
Mode->>Mode: Enter UPLOAD state
    
Agent->>Mode: ASR recognition completed
Mode->>Mode: Enter THINK state
    
Agent->>Player: Return TTS audio
Mode->>Mode: Enter SPEAK state
    
Player->>Mode: Playback completed
alt is still awake
Mode->>Mode: Return to LISTEN state
else has timed out
Mode->>Mode: Return to IDLE status
    end
```

## Configuration instructions

### Configuration file path

```
ai_components/ai_mode/Kconfig
```

### Function enable

```
menuconfig ENABLE_COMP_AI_PRESENT_MODE
    bool "enable ai present mode"
    default y

config ENABLE_COMP_AI_MODE_FREE
    bool "enable ai mode free"
    default y
```

### Dependent components

- **Audio Component** (`ENABLE_COMP_AI_AUDIO`): required, used for audio input and output and VAD detection
- **LED Component** (`ENABLE_LED`): optional, used for status indication
- **Button Component** (`ENABLE_BUTTON`): optional, used for key wake-up function

## Development process

### Interface description

#### Register for free conversation mode

Register the free conversation mode with the mode manager.

```c
/**
 * @brief Register free mode
 * @return OPERATE_RET Operation result
 */
OPERATE_RET ai_mode_free_register(void);
```

### Development steps

1. **Registration Mode**: Called when the application starts`ai_mode_free_register()`Register for free chat mode
2. **Initialization Mode**: Pass`ai_mode_init(AI_CHAT_MODE_FREE)`Initialize free conversation mode
3. **Run Mode Task**: Called in the task loop`ai_mode_task_running()`Running state machine
4. **Handling events**: Ensure that user events, VAD status changes, key events, etc. have been correctly forwarded to the mode manager

### Reference example

#### Registration and initialization

```c
#include "ai_mode_free.h"
#include "ai_manage_mode.h"

//Register free conversation mode
OPERATE_RET register_free_mode(void)
{
    OPERATE_RET rt = OPRT_OK;
    
//Register free conversation mode
    TUYA_CALL_ERR_RETURN(ai_mode_free_register());
    
    return rt;
}

//Initialize free conversation mode
OPERATE_RET init_free_mode(void)
{
    OPERATE_RET rt = OPRT_OK;
    
//Initialize free conversation mode
    TUYA_CALL_ERR_RETURN(ai_mode_init(AI_CHAT_MODE_FREE));
    
    return rt;
}
```

#### Mode switching

```c
//Switch to free conversation mode
void switch_to_free_mode(void)
{
    OPERATE_RET rt = ai_mode_switch(AI_CHAT_MODE_FREE);
    if (OPRT_OK == rt) {
        PR_NOTICE("Switch to free conversation mode");
    } else {
        PR_ERR("Failed to switch mode: %d", rt);
    }
}
```

#### Query mode status

```c
void query_free_mode_state(void)
{
    AI_MODE_STATE_E state = ai_mode_get_state();
    PR_NOTICE("Current status of free conversation mode: %s", ai_get_mode_state_str(state));
}
```

