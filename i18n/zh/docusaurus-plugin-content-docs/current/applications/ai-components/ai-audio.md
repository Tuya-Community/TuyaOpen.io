## 名词解释

| 名词 | 解释                                                         |
| ---- | ------------------------------------------------------------ |
| VAD  | 语音活动检测 （Voice Activity Detection），用于判断音频信号中是否存在语音的技术。 |
| ASR  | 自动语音识别（Automatic Speech Recognition），将语音内容转化成计算机可识别的文本或命令的技术。 |

## 功能介绍

ai_audio 主要用于处理与AI，音频相关的操作，包括音频的输入、输出、配置管理以及创建 AI 会话等功能。以下是对该组件功能的详细描述：
- 采集音频数据
- 播放音频数据
- 创建云端 AI 会话，将采集到的有效数据发送到云端进行 ASR 识别，云端会根据 ASR 识别后的内容进行回复
- 对采集的音频数据进行预处理，识别出有效内容后再发送到云端处理，减少云端处理的压力。
  - VAD 检测
  - ASR 唤醒词检测
- 根据**对话模式**以及**触发方式**的不同提供了四种**工作模式**：
  - 对话模式
    - 单轮对话 每次触发都只进行一回合对话即一问一答。
    - 自由对话 每次触发后可进行 N 回合对话即连续对话。
  - 对话触发方式
    - 手动控制 如按键按住等。
    - VAD 检测 检测到声音后就开启对话
    - 本地 ASR 唤醒检测 即检测到唤醒词后开启对话
  - 工作模式
    - 手动触发单轮对话
    - VAD 触发自由对话
    - ASR 唤醒单轮对话
    - ASR 唤醒自由对话

## 功能模块

该组件主要由五个功能模块组成：
- 音频输入模块 ( input )
  - 采集音频数据， 
  - 音频数据预处理
  - 模块状态改变通知
- AI 智能体模块 ( ai agent )
  - 创建云端会话
  - 数据上报， **默认格式: PCM （OPUS 可选）**
  - 接收云端数据， **默认格式：MP3， 位宽16bit，采样率16KHz，单声道**
- 处理云端 ASR 模块 ( cloud asr )
  - 开始上报
  - 结束上报
  - 等待云端 ASR
- 播放音频模块（ player ）
  - 播放云端返回的音频数据
  - 播放内置提示音
- 管理模块（ main ）
  - 组件入口
  - 管理以上四个模块

## 工作流程

### 手动触发单轮对话

在外部条件触发下用户可发起对话， 每次触发都只进行一回合对话即一问一答。如按键被按下时，用户可输入语音按键松开后则表示语音输入结束，然后等待 AI 回答。

```javascript
usr: "你是谁" （某种外部条件下 如按键被按着）
ai : "我是xxx"
usr: "今天天气"（某种外部条件下 如按键被按着）
ai : "xxxx"
```

![](/img/applications/ai_components/zh/manual_once_talk.svg)

### VAD 触发自由对话

设备会将采集到音频数据发送到 vad 模块进行人声检测。如果检测到人声，则认为会话开启。即用户随时说话，模块都会将用户的语音数据发送至云端发起会话。

```javascript
usr: "你是谁"
ai : "我是xxx"
usr: "今天天气"
ai : "xxxx"
```

![](/img/applications/ai_components/zh/vad_free_talk.svg)

### ASR 唤醒单轮对话

用户想要对话前都需要说出唤醒词将设备唤醒。设备每次被唤醒后，用户只能发起一次对话。一次对话结束后，用户想要再进行对话先说唤醒词，类似音箱模式。

```javascript
usr: "你好，xxxx"（ 唤醒词 ）
ai : "我在"（ 提示音 ）
usr: "你是谁"
ai : "我是xxx"
usr: "你好，xxxx"（ 唤醒词 ）
ai : "我在"（ 提示音 ）
usr: "今天天气"
ai : "xxxx"
```

![](/img/applications/ai_components/zh/asr_once_talk.svg)

### ASR 唤醒自由对话

用户说出唤醒词唤醒设备后可进行连续的对话。设备被唤醒后，如果有30S没有检测到任何声音，设备会重新进入检测唤醒词状态。

```javascript
usr: "你好，xxxx"（ 唤醒词 ）
ai : "我在"（ 提示音 ）
usr: "你是谁"
ai : "我是xxx"
usr: "今天天气"
ai : "xxxx"
```

![](/img/applications/ai_components/zh/asr_free_talk.svg)

## 开发流程

### 结构体说明

#### 工作模式

```C
typedef uint8_t AI_AUDIO_WORK_MODE_E;
#define AI_AUDIO_MODE_MANUAL_SINGLE_TALK     1 //手动触发单轮对话
#define AI_AUDIO_WORK_VAD_FREE_TALK          2 //VAD 触发自由对话
#define AI_AUDIO_WORK_ASR_WAKEUP_SINGLE_TALK 3 //ASR 唤醒单轮对话
#define AI_AUDIO_WORK_ASR_WAKEUP_FREE_TALK   4 //ASR 唤醒自由对话
```

#### 事件类型

```c
typedef enum {
    AI_AUDIO_EVT_NONE,                      //无
    AI_AUDIO_EVT_HUMAN_ASR_TEXT,            //返回用户语音文本
    AI_AUDIO_EVT_AI_REPLIES_TEXT_START,     //开始传送 AI 语音文本 
    AI_AUDIO_EVT_AI_REPLIES_TEXT_DATA,      //传送 AI 语音文本
    AI_AUDIO_EVT_AI_REPLIES_TEXT_END,       //结束传送 AI 语音文本
    AI_AUDIO_EVT_AI_REPLIES_EMO,            //返回 AI 表情
    AI_AUDIO_EVT_ASR_WAKEUP,                //检测到唤醒词
} AI_AUDIO_EVENT_E;

typedef struct {
    char *name;
    char *text;
} AI_AUDIO_EMOTION_T;                       //表情结构体

//事件通知回调
typedef void (*AI_AUDIO_EVT_INFORM_CB)(AI_AUDIO_EVENT_E event, uint8_t *data, uint32_t len, void *arg);
```

#### 组件状态

```c
typedef enum {
    AI_AUDIO_STATE_STANDBY,                 //待机状态
    AI_AUDIO_STATE_LISTEN,                  //聆听中
    AI_AUDIO_STATE_UPLOAD,                  //上报数据到云端
    AI_AUDIO_STATE_AI_SPEAK,                //播放云端返回的 AI 语音
    AI_AUDIO_STATE_MAX = 0xFF,              //无效状态
} AI_AUDIO_STATE_E;

//状态通知回调
typedef void (*AI_AUDIO_STATE_INFORM_CB)(AI_AUDIO_STATE_E state);
```

### 接口说明

#### 模块初始化

该 API 是主要用来初始化 AI 相关服务，音频设备等资源。

```C
typedef struct {
    AI_AUDIO_WORK_MODE_E work_mode;
    AI_AUDIO_EVT_INFORM_CB evt_inform_cb;
    AI_AUDIO_STATE_INFORM_CB state_inform_cb;
} AI_AUDIO_CONFIG_T;

/**
 * @brief Initializes the audio module with the provided configuration.
 * @param cfg Pointer to the configuration structure for the audio module.
 * @return OPERATE_RET - OPRT_OK if initialization is successful, otherwise an error code.
 */
OPERATE_RET ai_audio_init(AI_AUDIO_CONFIG_T *cfg);
```

#### 打开音频模块

音频模块默认是关闭的，需要用户调用该 API 打开该模块。

```c
/**
 * @brief Sets the open state of the audio module.
 * @param is_open Boolean value indicating whether to open (true) or close (false) the audio module.
 * @return OPERATE_RET - OPRT_OK if the operation is successful, otherwise an error code.
 */
OPERATE_RET ai_audio_set_open(bool is_open);
```

#### 设置音量

设置麦克风的音量。

```c
/**
 * @brief Sets the volume for the audio module.
 * @param volume The volume level to set.
 * @return OPERATE_RET - OPRT_OK if the volume is set successfully, otherwise an error code.
 */
OPERATE_RET ai_audio_set_volume(uint8_t volume);
```

#### 获取音量

获取麦克风当前的音量

```c
/**
 * @brief Retrieves the current volume setting for the audio module.
 * @param None
 * @return uint8_t - The current volume level.
 */
uint8_t ai_audio_get_volume(void);
```

#### 手动开启语音输入

调用该 API 后，模块进入接收有效音频状态。即默认后面采集到的音频数据都会送到云端进行 ASR 识别。

```c
/**
 * @brief Manually starts a single talk session for AI audio.
 *
 * @param None
 * @return OPERATE_RET Operation result code.
 */
OPERATE_RET ai_audio_manual_start_single_talk(void);
```

#### 手动停止语音输入

调用该 API 后，模块则不再接收有效音频状态。即后面采集到的音频数据不再会发送到云端。

```c
/**
 * @brief Manually stops a single talk session in the AI audio component.
 *
 * @return OPERATE_RET Returns the operation result. Typically, this indicates success or provides an error code.
 */
OPERATE_RET ai_audio_manual_stop_single_talk(void);
```

#### 唤醒模块

调用该 API 后，模块会进入检测新一轮对话的状态（检测有效音频状态）。如果当前模块处于对话中，则当前会话会被打断。

```c
/**
 * @brief Sets the audio system to wakeup mode.
 *
 * This function configures the audio system to enable wakeup functionality,
 * allowing it to respond to wakeup events or keywords.
 *
 * @return OPERATE_RET Returns the operation result. Returns OPRT_OK on success, or an error code on failure.
 */
OPERATE_RET ai_audio_set_wakeup(void);
```

#### 获取模块状态

获取模块的当前状态。

```C
/**
 * @brief Retrieves the current state of the AI audio system.
 *
 * @return AI_AUDIO_STATE_E The current state of the AI audio system.
 */
AI_AUDIO_STATE_E ai_audio_get_state(void);
```

#### 播放内嵌提示音

播放内嵌的各种提示音，如配网状态，对话模式等。

```c
typedef enum {
    AI_AUDIO_ALERT_NORMAL = 0,
    AI_AUDIO_ALERT_POWER_ON,             /* 开机上电播报 */
    AI_AUDIO_ALERT_NOT_ACTIVE,           /* 还未配网 请先配网 */
    AI_AUDIO_ALERT_NETWORK_CFG,          /* 进入配网状态，开始配网 */
    AI_AUDIO_ALERT_NETWORK_CONNECTED,    /* 联网成功 */
    AI_AUDIO_ALERT_NETWORK_FAIL,         /* 联网失败 重试 */
    AI_AUDIO_ALERT_NETWORK_DISCONNECT,   /* 掉网 */
    AI_AUDIO_ALERT_BATTERY_LOW,          /* 电量不足 */
    AI_AUDIO_ALERT_PLEASE_AGAIN,         /* 请再说一遍 */
    AI_AUDIO_ALERT_WAKEUP,               /* 你好我在*/
    AI_AUDIO_ALERT_LONG_KEY_TALK,        /* 长按键对话 */
    AI_AUDIO_ALERT_KEY_TALK,             /* 按键对话 */
    AI_AUDIO_ALERT_WAKEUP_TALK,          /* 唤醒对话 */
    AI_AUDIO_ALERT_FREE_TALK,            /* 任意对话 */
} AI_AUDIO_ALERT_TYPE_E;

/**
 * @brief Plays an alert sound based on the specified alert type.
 *
 * @param type - The type of alert to play, defined by the APP_ALERT_TYPE enum.
 * @return OPERATE_RET - Returns OPRT_OK if the alert sound is successfully played, otherwise returns an error code.
 */
OPERATE_RET ai_audio_player_play_alert(AI_AUDIO_ALERT_TYPE_E type);
```

### 开发步骤

1. 调用模块初始化接口，设置工作模式以及注册通知回调。
2. 调用打开音频模块接口。
3. 如果工作模式是手动触发单轮对话模式，需要开发者自己调用手动开启/停止语音输入接口来控制语音上报的时间和时机。如果是其他模式，组件内部会自行处理。
4. 开发者可根据实际产品需求，在通知回调里对不同的事件和状态进行相应的处理。