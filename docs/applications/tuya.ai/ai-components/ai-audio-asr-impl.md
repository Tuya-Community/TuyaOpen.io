---
title: AI Voice Interaction Implementation
---

## Terms and definitions

| Term | Description |
| ---- | ------------------------------------------------------------ |
| VAD | Voice activity detection, used to determine whether speech is present in an audio signal. |
| ASR | Automatic speech recognition. Converts speech content into text or commands recognizable by a computer. |
| PCM | Pulse code modulation. A lossless compression format that stores raw audio sample data directly. |
| Opus | A lossy compression format optimized for a mix of speech and music. |

## Features

The `ai_audio` component is primarily used for handling AI and audio-related operations, including audio input, output, configuration management, and creating AI sessions. Below is a detailed description of its functionalities:
- Captures audio data.
- Play audio data.
- Create a cloud AI session: Send captured valid data to the cloud for ASR. The cloud replies based on the content recognized by ASR.
- Preprocess captured audio data: Identify valid content before sending it to the cloud for processing, reducing the load on cloud resources.
   - VAD
   - ASR: Perform wake word detection.
- Four distinct **operating modes** are provided, based on different combinations of **dialogue mode** and **trigger method**.
   - Dialogue mode
      - Single-turn dialogue: Each trigger results in only one round of conversation (Q&A).
      - Free dialogue: After each trigger, N rounds of continuous conversation are possible.
   - Trigger methods:
      - Manual control: For example, hold down a button.
      - VAD: Dialogue starts upon detecting sound (voice activity).
      - Local ASR wake-up detection: Dialogue starts upon detecting a specific wake word.
   - Available operating modes:
      - Manually triggered single-turn dialogue
      - VAD-triggered free dialogue
      - ASR wake-up for single-turn dialogue
      - ASR wake-up for free dialogue

## Functional modules

The component primarily consists of five functional modules:
- Audio input module
   - Captures audio data.
   - Performs audio data preprocessing.
   - Notifies of module state changes.
- AI agent module
   - Creates cloud sessions.
   - Reports data to the cloud. **Default format: PCM (OPUS optional).**
   - Receives cloud data. **Default format: MP3, 16-bit width, 16 kHz sampling rate, mono.**
- Cloud ASR processing module (Cloud ASR)
   - Initiates reporting.
   - Terminates reporting.
   - Waits for cloud ASR results.
- Audio playback module (Player)
   - Plays audio data returned from the cloud.
   - Plays built-in prompt tones.
- Management module (Main)
   - Serves as the component entry point.
   - Manages the four modules listed above.

## Process

### Manually triggered single-turn dialogue

Users can initiate a dialogue when triggered by an external condition. Each trigger results in exactly one turn of dialogue—a single question-and-answer pair. For example, when a button is pressed and held, the user can provide voice input. Releasing the button signals the end of the voice input, after which the system waits for the AI's response.

```javascript
User: "Who are you?" (Triggered under an external condition, for example, a button is pressed and held)
AI: "I am xxx."
User: "What's the weather today?" (Triggered under an external condition, for example, a button is pressed and held)
AI: "xxxx."
```

![](/img/applications/ai_components/en/manual_once_talk.svg)

### VAD-triggered free dialogue

The device streams captured audio data to the VAD module for human voice detection. If voice activity is detected, a session is considered active. This enables users to speak naturally at any time, as the module will continuously stream their speech data to the cloud to initiate and maintain the session.

```javascript
User: "Who are you?"
AI: "I am xxx."
User: "What's the weather today?"
AI: "xxxx."
```

![](/img/applications/ai_components/en/vad_free_talk.svg)

### ASR wake-up for single-turn dialogue

Before initiating a dialogue, the user must speak a wake word to activate the device. Each time the device is woken up, the user can only initiate one dialogue session. After the session concludes, the user must speak the wake word again to start a new interaction, similar to the behavior of smart speakers.

```javascript
User: "Hello, xxxx." (Wake word)
AI: (Play prompt tone) "I'm here."
User: "Who are you?"
AI: "I am xxx."
User: "Hello, xxxx." (Wake word)
AI: (Play prompt tone) "I'm here."
User: "What's the weather today?"
AI: "xxxx."
```

![](/img/applications/ai_components/en/asr_once_talk.svg)

### ASR wake-up for free dialogue

After the user speaks the wake word to activate the device, they can engage in a continuous, multi-turn dialogue. Once awakened, if the device does not detect any sound for 30 seconds, it will automatically return to the wake word detection state.

```javascript
User: "Hello, xxxx." (Wake word)
AI: (Play prompt tone) "I'm here."
User: "Who are you?"
AI: "I am xxx."
User: "What's the weather today?"
AI: "xxxx."
```

![](/img/applications/ai_components/en/asr_free_talk.svg)

## Development process

### Structs

#### Available operating modes:

```C
typedef uint8_t AI_AUDIO_WORK_MODE_E;
#define AI_AUDIO_MODE_MANUAL_SINGLE_TALK     1 // Manually triggered single-turn dialogue
#define AI_AUDIO_WORK_VAD_FREE_TALK          2 // VAD-triggered free dialogue
#define AI_AUDIO_WORK_ASR_WAKEUP_SINGLE_TALK 3 // ASR wake-up for single-turn dialogue
#define AI_AUDIO_WORK_ASR_WAKEUP_FREE_TALK   4 // ASR wake-up for free dialogue
```

#### Event types

```c
typedef enum {
    AI_AUDIO_EVT_NONE,                      // No event
    AI_AUDIO_EVT_HUMAN_ASR_TEXT,            // Returns user's speech-to-text result
    AI_AUDIO_EVT_AI_REPLIES_TEXT_START,     // Starts streaming AI response text
    AI_AUDIO_EVT_AI_REPLIES_TEXT_DATA,      // Streaming AI response text data
    AI_AUDIO_EVT_AI_REPLIES_TEXT_END,       // Ends streaming AI response text
    AI_AUDIO_EVT_AI_REPLIES_EMO,            // Returns AI emotion data
    AI_AUDIO_EVT_ASR_WAKEUP,                // Wake word detected
} AI_AUDIO_EVENT_E;

typedef struct {
    char *name;
    char *text;
} AI_AUDIO_EMOTION_T;                       // Emotion data struct

// Event notification callback
typedef void (*AI_AUDIO_EVT_INFORM_CB)(AI_AUDIO_EVENT_E event, uint8_t *data, uint32_t len, void *arg);
```

#### Component state

```c
typedef enum {
    AI_AUDIO_STATE_STANDBY,                 // Standby state
    AI_AUDIO_STATE_LISTEN,                  // Listening
    AI_AUDIO_STATE_UPLOAD,                  // Upload data to cloud
    AI_AUDIO_STATE_AI_SPEAK,                // Play AI audio response from cloud
    AI_AUDIO_STATE_MAX = 0xFF,             // Invalid state
} AI_AUDIO_STATE_E;

// State notification callback
typedef void (*AI_AUDIO_STATE_INFORM_CB)(AI_AUDIO_STATE_E state);
```

### API description

#### Initialize module

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

#### Enable the audio module

The audio module is disabled by default. You must call this API to enable it.

```c
/**
 * @brief Sets the open state of the audio module.
 * @param is_open Boolean value indicating whether to open (true) or close (false) the audio module.
 * @return OPERATE_RET - OPRT_OK if the operation is successful, otherwise an error code.
 */
OPERATE_RET ai_audio_set_open(bool is_open);
```

#### Set volume

Set the volume of the microphone.

```c
/**
 * @brief Sets the volume for the audio module.
 * @param volume The volume level to set.
 * @return OPERATE_RET - OPRT_OK if the volume is set successfully, otherwise an error code.
 */
OPERATE_RET ai_audio_set_volume(uint8_t volume);
```

#### Get volume

Get the current volume of the microphone.

```c
/**
 * @brief Retrieves the current volume setting for the audio module.
 * @param None
 * @return uint8_t - The current volume level.
 */
uint8_t ai_audio_get_volume(void);
```

#### Manually start voice input

After calling this API, the module enters a state ready to receive valid audio input. By default, all subsequently captured audio data will be streamed to the cloud for ASR recognition.

```c
/**
 * @brief Manually starts a single talk session for AI audio.
 *
 * @param None
 * @return OPERATE_RET Operation result code.
 */
OPERATE_RET ai_audio_manual_start_single_talk(void);
```

#### Manually stop voice input

After calling this API, the module exits the state of receiving valid audio input. Subsequently captured audio data will no longer be sent to the cloud.

```c
/**
 * @brief Manually stops a single talk session in the AI audio component.
 *
 * @return OPERATE_RET Returns the operation result. Typically, this indicates success or provides an error code.
 */
OPERATE_RET ai_audio_manual_stop_single_talk(void);
```

#### Wake up the module

After calling this API, the module enters a state ready to detect a new dialogue session (listening for valid audio input). If the module is currently engaged in a dialogue, that session will be interrupted.

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

#### Get module state

Get the current state of the module.

```C
/**
 * @brief Retrieves the current state of the AI audio system.
 *
 * @return AI_AUDIO_STATE_E The current state of the AI audio system.
 */
AI_AUDIO_STATE_E ai_audio_get_state(void);
```

#### Play built-in prompt tones

Play various built-in prompt tones, such as those indicating pairing status or dialogue mode.

```c
typedef enum {
    AI_AUDIO_ALERT_NORMAL = 0,
    AI_AUDIO_ALERT_POWER_ON,             /* Power-on announcement */
    AI_AUDIO_ALERT_NOT_ACTIVE,           /* Device not activated, please perform pairing first */
    AI_AUDIO_ALERT_NETWORK_CFG,          /* Enter pairing mode */
    AI_AUDIO_ALERT_NETWORK_CONNECTED,    /* Network is connected successfully */
    AI_AUDIO_ALERT_NETWORK_FAIL,         /* Network connection failed. Try again. */
    AI_AUDIO_ALERT_NETWORK_DISCONNECT,   /* Network is disconnected */
    AI_AUDIO_ALERT_BATTERY_LOW,          /* Low battery */
    AI_AUDIO_ALERT_PLEASE_AGAIN,         /* Please say it again */
    AI_AUDIO_ALERT_WAKEUP,               /* Hello, I'm here*/
    AI_AUDIO_ALERT_LONG_KEY_TALK,        /* Press and hold the button to talk */
    AI_AUDIO_ALERT_KEY_TALK,             /* Press the button to talk */
    AI_AUDIO_ALERT_WAKEUP_TALK,          /* Wake up and talk */
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

### Development steps

1. Call the module initialization API to set the operating mode and register the notification callbacks.
2. Call the API to enable the audio module.
3. Suppose the operating mode is set to manually triggered single-turn dialogue. In that case, you must call the manually start/stop voice input APIs to control the timing of voice data reporting. For other modes, the component handles this internally.
4. Based on specific product requirements, you can implement appropriate handling for different events and states within the notification callbacks.
