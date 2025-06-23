## Terminology

| Term | Explanation                                                         |
| ---- | ------------------------------------------------------------------- |
| VAD  | Voice Activity Detection, a technology used to determine whether there is speech in an audio signal. |
| ASR  | Automatic Speech Recognition, a technology that converts speech content into computer-recognizable text or commands. |

## Function Overview

ai_audio is mainly used to handle operations related to AI and audio, including audio input, output, configuration management, and creating AI sessions. The following is a detailed description of the component's functions:
- Collect audio data
- Play audio data
- Create a cloud AI session, send the collected valid data to the cloud for ASR recognition, and the cloud will reply based on the ASR result
- Preprocess the collected audio data, send it to the cloud only after valid content is detected, reducing the cloud processing load.
  - VAD detection
  - ASR wake word detection
- Provides four **working modes** according to different **dialogue modes** and **trigger methods**:
  - Dialogue mode
    - Single-turn dialogue: Each trigger only performs one round of Q&A.
    - Free dialogue: Each trigger allows N rounds of continuous dialogue.
  - Dialogue trigger method
    - Manual control, such as pressing and holding a button.
    - VAD detection: Start dialogue when voice is detected.
    - Local ASR wake word detection: Start dialogue when the wake word is detected.
  - Working modes
    - Manually triggered single-turn dialogue
    - VAD triggered free dialogue
    - ASR wakeup single-turn dialogue
    - ASR wakeup free dialogue

## Functional Modules

This component mainly consists of five functional modules:
- Audio Input Module (input)
  - Collect audio data
  - Audio data preprocessing
  - Module state change notification
- AI Agent Module (ai agent)
  - Create cloud session
  - Data reporting, **default format: PCM (OPUS optional)**
  - Receive cloud data, **default format: MP3, 16bit, 16KHz, mono**
- Cloud ASR Processing Module (cloud asr)
  - Start reporting
  - End reporting
  - Wait for cloud ASR
- Audio Playback Module (player)
  - Play audio data returned from the cloud
  - Play built-in prompt sounds
- Management Module (main)
  - Component entry
  - Manage the above four modules

## Workflow

### Manually Triggered Single-Turn Dialogue

Under external conditions, the user can initiate a dialogue. Each trigger only performs one round of Q&A. For example, when the button is pressed, the user can input speech, and releasing the button indicates the end of speech input, then wait for the AI to reply.

```javascript
usr: "Who are you" (under some external condition, e.g., button pressed)
ai : "I am xxx"
usr: "What's the weather today" (under some external condition, e.g., button pressed)
ai : "xxxx"
```

![](/img/applications/ai_components/en/manual_once_talk.svg)

### VAD Triggered Free Dialogue

The device sends the collected audio data to the VAD module for human voice detection. If human voice is detected, the session is considered started. That is, the user can speak at any time, and the module will send the user's voice data to the cloud to initiate a session.

```javascript
usr: "Who are you"
ai : "I am xxx"
usr: "What's the weather today"
ai : "xxxx"
```

![](/img/applications/ai_components/en/vad_free_talk.svg)

### ASR Wakeup Single-Turn Dialogue

The user needs to say the wake word before each dialogue to wake up the device. After each wakeup, the user can only initiate one dialogue. After the dialogue ends, the user needs to say the wake word again to start a new dialogue, similar to a smart speaker mode.

```javascript
usr: "Hello, xxxx" (wake word)
ai : "I'm here" (prompt sound)
usr: "Who are you"
ai : "I am xxx"
usr: "Hello, xxxx" (wake word)
ai : "I'm here" (prompt sound)
usr: "What's the weather today"
ai : "xxxx"
```

![](/img/applications/ai_components/en/asr_once_talk.svg)

### ASR Wakeup Free Dialogue

After the user says the wake word to wake up the device, continuous dialogue can be carried out. After being woken up, if no sound is detected for 30 seconds, the device will re-enter the wake word detection state.

```javascript
usr: "Hello, xxxx" (wake word)
ai : "I'm here" (prompt sound)
usr: "Who are you"
ai : "I am xxx"
usr: "What's the weather today"
ai : "xxxx"
```

![](/img/applications/ai_components/en/asr_free_talk.svg)

## Development Process

### Structure Description

#### Working Modes

```C
typedef uint8_t AI_AUDIO_WORK_MODE_E;
#define AI_AUDIO_MODE_MANUAL_SINGLE_TALK     1 //Manually triggered single-turn dialogue
#define AI_AUDIO_WORK_VAD_FREE_TALK          2 //VAD triggered free dialogue
#define AI_AUDIO_WORK_ASR_WAKEUP_SINGLE_TALK 3 //ASR wakeup single-turn dialogue
#define AI_AUDIO_WORK_ASR_WAKEUP_FREE_TALK   4 //ASR wakeup free dialogue
```

#### Event Types

```c
typedef enum {
    AI_AUDIO_EVT_NONE,                      //None
    AI_AUDIO_EVT_HUMAN_ASR_TEXT,            //Return user speech text
    AI_AUDIO_EVT_AI_REPLIES_TEXT_START,     //Start transmitting AI speech text
    AI_AUDIO_EVT_AI_REPLIES_TEXT_DATA,      //Transmit AI speech text
    AI_AUDIO_EVT_AI_REPLIES_TEXT_END,       //End transmitting AI speech text
    AI_AUDIO_EVT_AI_REPLIES_EMO,            //Return AI emotion
    AI_AUDIO_EVT_ASR_WAKEUP,                //Wake word detected
} AI_AUDIO_EVENT_E;

typedef struct {
    char *name;
    char *text;
} AI_AUDIO_EMOTION_T;                       //Emotion structure

//Event notification callback
typedef void (*AI_AUDIO_EVT_INFORM_CB)(AI_AUDIO_EVENT_E event, uint8_t *data, uint32_t len, void *arg);
```

#### Component States

```c
typedef enum {
    AI_AUDIO_STATE_STANDBY,                 //Standby state
    AI_AUDIO_STATE_LISTEN,                  //Listening
    AI_AUDIO_STATE_UPLOAD,                  //Uploading data to cloud
    AI_AUDIO_STATE_AI_SPEAK,                //Playing AI speech returned from cloud
    AI_AUDIO_STATE_MAX = 0xFF,              //Invalid state
} AI_AUDIO_STATE_E;

//State notification callback
typedef void (*AI_AUDIO_STATE_INFORM_CB)(AI_AUDIO_STATE_E state);
```

### API Description

#### Module Initialization

This API is mainly used to initialize AI-related services, audio devices, and other resources.

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

#### Open Audio Module

The audio module is off by default. The user needs to call this API to open the module.

```c
/**
 * @brief Sets the open state of the audio module.
 * @param is_open Boolean value indicating whether to open (true) or close (false) the audio module.
 * @return OPERATE_RET - OPRT_OK if the operation is successful, otherwise an error code.
 */
OPERATE_RET ai_audio_set_open(bool is_open);
```

#### Set Volume

Set the microphone volume.

```c
/**
 * @brief Sets the volume for the audio module.
 * @param volume The volume level to set.
 * @return OPERATE_RET - OPRT_OK if the volume is set successfully, otherwise an error code.
 */
OPERATE_RET ai_audio_set_volume(uint8_t volume);
```

#### Get Volume

Get the current microphone volume.

```c
/**
 * @brief Retrieves the current volume setting for the audio module.
 * @param None
 * @return uint8_t - The current volume level.
 */
uint8_t ai_audio_get_volume(void);
```

#### Manually Start Voice Input

After calling this API, the module enters the valid audio receiving state. By default, the subsequently collected audio data will be sent to the cloud for ASR recognition.

```c
/**
 * @brief Manually starts a single talk session for AI audio.
 *
 * @param None
 * @return OPERATE_RET Operation result code.
 */
OPERATE_RET ai_audio_manual_start_single_talk(void);
```

#### Manually Stop Voice Input

After calling this API, the module will no longer receive valid audio. The subsequently collected audio data will not be sent to the cloud.

```c
/**
 * @brief Manually stops a single talk session in the AI audio component.
 *
 * @return OPERATE_RET Returns the operation result. Typically, this indicates success or provides an error code.
 */
OPERATE_RET ai_audio_manual_stop_single_talk(void);
```

#### Wakeup Module

After calling this API, the module will enter the state of detecting a new round of dialogue (valid audio detection state). If the module is currently in a dialogue, the current session will be interrupted.

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

#### Get Module State

Get the current state of the module.

```C
/**
 * @brief Retrieves the current state of the AI audio system.
 *
 * @return AI_AUDIO_STATE_E The current state of the AI audio system.
 */
AI_AUDIO_STATE_E ai_audio_get_state(void);
```

#### Play Built-in Prompt Sound

Play various built-in prompt sounds, such as network configuration status, dialogue mode, etc.

```c
typedef enum {
    AI_AUDIO_ALERT_NORMAL = 0,
    AI_AUDIO_ALERT_POWER_ON,             /* Power on broadcast */
    AI_AUDIO_ALERT_NOT_ACTIVE,           /* Not networked yet, please configure network first */
    AI_AUDIO_ALERT_NETWORK_CFG,          /* Enter network configuration state, start configuring */
    AI_AUDIO_ALERT_NETWORK_CONNECTED,    /* Network connected successfully */
    AI_AUDIO_ALERT_NETWORK_FAIL,         /* Network connection failed, retry */
    AI_AUDIO_ALERT_NETWORK_DISCONNECT,   /* Network disconnected */
    AI_AUDIO_ALERT_BATTERY_LOW,          /* Low battery */
    AI_AUDIO_ALERT_PLEASE_AGAIN,         /* Please say it again */
    AI_AUDIO_ALERT_WAKEUP,               /* Hello, I'm here */
    AI_AUDIO_ALERT_LONG_KEY_TALK,        /* Long press button to talk */
    AI_AUDIO_ALERT_KEY_TALK,             /* Button talk */
    AI_AUDIO_ALERT_WAKEUP_TALK,          /* Wakeup talk */
    AI_AUDIO_ALERT_FREE_TALK,            /* Free talk */
} AI_AUDIO_ALERT_TYPE_E;

/**
 * @brief Plays an alert sound based on the specified alert type.
 *
 * @param type - The type of alert to play, defined by the APP_ALERT_TYPE enum.
 * @return OPERATE_RET - Returns OPRT_OK if the alert sound is successfully played, otherwise returns an error code.
 */
OPERATE_RET ai_audio_player_play_alert(AI_AUDIO_ALERT_TYPE_E type);
```

### Development Steps

1. Call the module initialization interface, set the working mode, and register notification callbacks.
2. Call the interface to open the audio module.
3. If the working mode is manually triggered single-turn dialogue, the developer needs to call the manual start/stop voice input interface to control the timing of voice reporting. For other modes, the component will handle it internally.
4. Developers can handle different events and states in the notification callback according to actual product requirements.