# Arduino Peripheral Development

This document describes how to develop peripherals and networking features using the Arduino-TuyaOpen framework in the Arduino IDE. The framework provides a rich set of peripheral drivers and communication libraries, enabling developers to quickly implement WiFi connectivity, Bluetooth communication, audio/video capture, display rendering, file storage, cloud access, and more. The following examples are organized by functional category to help you master the usage of each peripheral library step by step.

```
Peripheral & Networking Libraries
├── Log           - Log Output
├── Ticker        - Software Timer
├── Peripherals   - Button Driver
├── SPI           - SPI Bus Communication
├── Wire          - I2C Bus Communication
├── FS / FSDemo   - LittleFS / SD Card File System
├── Audio         - Audio Recording & Playback
├── Display       - LCD Display & LVGL
├── Camera        - Camera Capture & Preview
├── BLE           - BLE GATT Service
├── WiFi          - WiFi STA/AP/Scan/Events
├── TuyaIoT       - Tuya IoT Cloud Access
├── HTTPClient    - HTTP/HTTPS Client
├── MQTTClient    - MQTT Messaging
└── DNSServer     - DNS Server (Captive Portal)
```

---

## Log Output

The Log library provides unified log output functionality with support for different log level output control.

### [logOutput](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Log/examples/logOutput)

Basic log output example. This example demonstrates how to use the `Log` class and the `PR_DEBUG` macro to output debug log information — the fundamental logging usage for all projects.

- Uses `Log.begin()` to initialize the log system
- Supports log levels including `PR_DEBUG`, `PR_NOTICE`, `PR_ERR`, and more
- Hardware platform: All development boards


---

## Software Timer

The Ticker library provides lightweight software timers that support scheduled callback execution, suitable for periodic task scenarios.

### [Blinker](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Ticker/examples/Blinker)

Timer-based LED blink example. This example demonstrates how to use the `Ticker` class to create a timer that toggles the LED state at a fixed interval to achieve a blinking effect.

- Uses `ticker.attach()` to set the period and callback function
- Hardware platform: All development boards

### [TickerParameter](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Ticker/examples/TickerParameter)

Parameterized timer callback example. This example demonstrates how to use the `Ticker` class's parameterized callback feature to pass custom parameters to the timer callback function, enabling more flexible timed tasks.

- Uses the parameterized overload of `ticker.attach()`
- Hardware platform: All development boards

---

## Peripheral Interfaces

### [Button](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Peripherals/examples/Button)

Multi-button event-driven example. This example demonstrates how to use the `Button` class to manage multiple buttons, configuring GPIO pins, active levels, and pull-up modes for each button, and registering callback functions for events such as single click, double click, and long press, implementing event-driven interaction logic.

- Uses `ButtonConfig_t` / `PinConfig_t` to configure button parameters
- Supports event types including `BUTTON_EVENT_SINGLE_CLICK`, `BUTTON_EVENT_DOUBLE_CLICK`, `BUTTON_EVENT_LONG_PRESS`, and more
- Hardware platform: All development boards

### [spiDemo](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/SPI/examples/spiDemo)

SPI bus communication example. This example demonstrates how to use the `SPI` class for SPI data transfer — after initializing the SPI bus, data is sent and return values received via `SPI.transfer()`.

- Uses the standard Arduino SPI interface
- Hardware platform: All development boards that support SPI

### [masterWriter](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Wire/examples/masterWriter)

I2C master write example. This example demonstrates how to use the `Wire` class as an I2C master to send data to a slave device — after initializing the I2C bus, byte data is periodically sent to a specified slave address.

- Uses the standard Arduino Wire interface: `Wire.beginTransmission()`, `Wire.write()`, `Wire.endTransmission()`
- Hardware platform: All development boards that support I2C

---

## File System

The FSDemo library provides file operation interfaces for both LittleFS internal file system and SD card external storage, using the unified `VFSFILE` class for file read/write and directory management.

### [LittleFSDemo](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/FSDemo/examples/LittleFSDemo)

LittleFS file system operations example. This example demonstrates basic LittleFS internal file system operations, including file creation, writing, reading, seeking (seek/position), file size query, directory creation and deletion, file renaming, and cross-file copying.

- Uses `VFSFILE fs(LITTLEFS)` to initialize LittleFS
- Supports operations such as `open`, `read`, `write`, `lseek`, `readtillN`, `mkdir`, `rename`, `remove`, etc.
- Hardware platform: All development boards that support LittleFS

### [SDCardDemo](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/FSDemo/examples/SDCardDemo)

SD card file operations example. This example demonstrates the complete SD card file operation workflow, including basic operations (create directory, create file, get file size), file read/write operations (multi-line writing, full read, append writing, line-by-line reading), and directory traversal (listing all files and sizes in a directory).

- Uses `VFSFILE fs(SDCARD)` to initialize the SD card
- Includes SD card mount detection and error handling
- Hardware platform: T5AI-Board development board only (requires SD card)

---

## Audio

The Audio library provides audio recording and playback capabilities, supporting PCM raw data and MP3 decoded playback, suitable for voice capture, audio playback, and similar scenarios.

### [Audio2SDcard](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Audio/examples/Audio2SDcard)

Button-triggered recording-to-SD-card example. This example demonstrates how to control microphone recording via a button, saving the captured PCM raw audio data or WAV formatted audio to an SD card. It supports switching between PCM and WAV save formats via a macro definition.

- Uses the `Audio` class to configure sample rate, bit depth, channel count, and other audio parameters
- Uses the `Button` class to start recording on press and stop on release
- WAV mode automatically generates the file header
- Hardware platform: T5AI-Board development board only (requires SD card)

### [AudioRecorder](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Audio/examples/AudioRecorder)

Audio recording and playback example. This example demonstrates how to record an audio clip and immediately play it back — recording is triggered by a button press, and playback starts automatically upon completion. Audio data is temporarily stored in a memory buffer.

- Suitable for intercom, voice message, and similar scenarios
- Hardware platform: TUYA-T5AI series only

### [AudioSpeaker](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Audio/examples/AudioSpeaker)

MP3 audio playback example. This example demonstrates three ways to play MP3 audio: from a C array (embedded in firmware), from the Flash file system, and from an SD card file, with playback status callback support.

- Uses the `Audio` class `playMp3()` series of interfaces
- Supports playback completion callback notification
- Hardware platform: TUYA-T5AI series only

---

## Display

The Display library provides basic LCD screen rendering capabilities and LVGL graphics library integration, supporting color block filling, image display, rotation, and LVGL UI development.

### [DisplayFill](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Display/examples/DisplayFill)

Screen color fill example. This example demonstrates how to use the `Display` class to fill color blocks on the LCD screen — after initializing the display, the entire screen is filled with random colors at regular intervals.

- Uses `display.fill()` for full-screen or regional color filling
- Hardware platform: T5AI-Board development board only

### [DisplayPicture](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Display/examples/DisplayPicture)

Image display and rotation example. This example demonstrates how to display images on the LCD screen and set the screen rotation direction (0°/90°/180°/270°) using `display.setRotation()`, achieving image display in different orientations.

- Supports loading image data from C arrays
- Hardware platform: T5AI-Board development board only

### [LVGLdemo](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Display/examples/LVGLdemo)

LVGL graphics library example. This example demonstrates how to use LVGL (Light and Versatile Graphics Library) to create a UI on the device — after initializing the LVGL environment, a label widget displaying "Hello World" text is created.

- Uses `lv_vendor` for LVGL initialization and refresh
- Can be extended to build more complex UI interfaces
- Hardware platform: T5AI-Board development board only

---

## Camera

The Camera library provides camera capture capabilities, supporting YUV422 real-time preview and JPEG/H264 encoded output, suitable for photo capture, video recording, and similar scenarios.

### [Camera2Display](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Camera/examples/Camera2Display)

Camera real-time preview example. This example demonstrates how to initialize the camera and display, continuously capture image frames in YUV422 format, and display them on the LCD screen in real time, achieving a live camera preview.

- Uses the `Camera` class to capture YUV422 frames and the `Display` class to render them
- Hardware platform: T5AI-Board development board only

### [Camera2SDcard](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Camera/examples/Camera2SDcard)

Camera photo/video capture example. This example demonstrates how to control the camera via a button to take photos or record video, saving the data to an SD card. It supports two modes (switchable via macro definition): in JPEG mode, a single button click captures one photo; in H264 mode, holding the button records continuously and releasing stops recording.

- Real-time YUV422 preview runs simultaneously with encoding output
- JPEG photos are named with timestamps; H264 video is written frame by frame
- Hardware platform: T5AI-Board development board only (requires SD card)

---

## Bluetooth Low Energy (BLE)

The BLE library provides BLE GATT server functionality, supporting the creation of custom Services and Characteristics for data interaction with phones or other BLE devices.

### [ble_server](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/BLE/examples/ble_server)

BLE GATT server example. This example demonstrates how to create a BLE GATT server — defining custom Service UUIDs and Characteristic UUIDs, setting read/write properties and Notify/Indicate notification capabilities, and handling client connection, read/write, and subscription events through callback functions.

- Uses `BLEDEV`, `BLEServer`, `BLEService`, and `BLECharacteristic` classes to build the GATT service
- Supports both Notify and Indicate notification methods
- Hardware platform: Development boards with BLE support

---

## WiFi Networking

The WiFi library provides comprehensive wireless networking capabilities, including STA mode for connecting to a router, AP mode for creating a hotspot, network scanning, event listening, static IP configuration, multi-AP automatic switching, and more. The following examples cover common WiFi development scenarios.

### [SimpleWiFiServer](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/SimpleWiFiServer)

HTTP server example in WiFi STA mode. This example demonstrates how to start a simple HTTP server after connecting to WiFi, allowing users to control an LED on a GPIO pin by visiting the device's IP address in a browser.

- Uses `WiFiServer` to listen on port 80; parses HTTP request paths `/H` and `/L` to control the LED
- Hardware platform: All WiFi-capable development boards

### [WiFiAccessPoint](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiAccessPoint)

WiFi AP (hotspot) mode example. This example demonstrates how to use `WiFi.softAP()` to create a wireless hotspot and start an HTTP server on it, enabling devices connected to the hotspot to control the onboard LED via a browser.

- Suitable for direct device control scenarios without a router
- Hardware platform: All WiFi-capable development boards

### [WiFiClient](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClient)

WiFi client data reporting example. This example demonstrates how to use `WiFiClient` to connect to the ThingSpeak cloud platform, periodically upload sensor data and read historical records, showcasing the complete read/write flow of HTTP GET requests.

- Replace with your own ThingSpeak Channel ID and API Key
- Hardware platform: All WiFi-capable development boards

### [WiFiClientBasic](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientBasic)

Basic WiFi TCP client example. This example demonstrates how to use `WiFiClient` to establish a TCP connection, send an HTTP GET request to a remote server and read the response data — the most fundamental network communication example.

- Hardware platform: All WiFi-capable development boards

### [WiFiClientConnect](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientConnect)

WiFi connection state machine example. This example demonstrates how to implement complete connection state management by polling the `WiFi.status()` return value, handling various states such as connected, AP not found, and connection failed, with support for button-triggered disconnection.

- Demonstrates the recommended approach for production-grade WiFi connection management
- Hardware platform: All WiFi-capable development boards

### [WiFiClientEvents](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientEvents)

WiFi event callback example. This example demonstrates how to use `WiFi.onEvent()` to register global event callbacks and specific event callbacks (e.g., IP acquired, disconnected), covering event handling for all event types including STA, AP, WPS, Ethernet, and more.

- Supports multiple callback registration methods including function pointers and lambda expressions
- Hardware platform: All WiFi-capable development boards

### [WiFiClientStaticIP](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientStaticIP)

WiFi static IP configuration example. This example demonstrates how to use `WiFi.config()` to set a static IP address, gateway, subnet mask, and DNS server. After successful connection, the full network configuration is printed and an HTTP request is initiated.

- Suitable for deployment scenarios requiring a fixed IP address
- Hardware platform: All WiFi-capable development boards

### [WiFiMulti](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiMulti)

Multi-AP automatic switching example. This example demonstrates how to use the `WiFiMulti` class to add multiple WiFi hotspots. The device automatically selects the hotspot with the strongest signal for connection and switches to another available hotspot when disconnected.

- Suitable for scenarios requiring seamless roaming between multiple WiFi environments
- Hardware platform: All WiFi-capable development boards

### [WiFiScan](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiScan)

WiFi network scanning example. This example demonstrates how to use `WiFi.scanNetworks()` to scan nearby WiFi networks and print each network's SSID, RSSI signal strength, channel, and encryption type.

- Supports identification of OPEN, WEP, WPA PSK, WPA2 PSK, WPA3, and other encryption types
- Hardware platform: All WiFi-capable development boards

### [WiFiScanDualAntenna](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiScanDualAntenna)

WiFi dual-antenna scanning example. This example demonstrates how to use `WiFi.setDualAntennaConfig()` to configure dual-antenna GPIO pins and TX/RX antenna modes, then perform a network scan with dual antennas enabled.

- Requires hardware support for dual-antenna functionality
- Hardware platform: Development boards with dual-antenna support

### [WiFiTelnetToSerial](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiTelnetToSerial)

WiFi Telnet-to-Serial bridge example. This example demonstrates how to bridge a WiFi Telnet connection with a hardware serial port — after connecting to the device via a Telnet client, data sent and received through Telnet is transparently forwarded to the serial port, and vice versa.

- Uses `WiFiMulti` for multi-AP support, listening on port 23
- Suitable for remote serial debugging scenarios
- Hardware platform: All WiFi-capable development boards

### [WiFiUDPClient](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiUDPClient)

WiFi UDP communication example. This example demonstrates how to use the `WiFiUDP` class for UDP data exchange — listening on a specified port, printing the source IP, port, and content when a UDP packet is received, and replying with a confirmation message.

- Suitable for low-latency LAN communication scenarios
- Hardware platform: All WiFi-capable development boards

---

## Tuya IoT Cloud Access

The TuyaIoT library provides device access capabilities for the Tuya IoT platform. Through the DP (Data Point) model, it enables data interaction between the device, the cloud, and the mobile APP, supporting device activation, data reporting, command receiving, weather queries, and more.

### [quickStart](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/TuyaIoT/examples/quickStart)

Tuya IoT quick start example. This example demonstrates the complete Tuya IoT device development workflow — configuring the device License, initializing `TuyaIoT`, handling device binding, cloud connection, DP command receiving and other events through event callbacks, and achieving two-way control between the phone APP and the onboard LED.

- A short button press toggles the LED state and reports it; a long press removes the device binding
- Uses `TuyaIoT.write()` / `TuyaIoT.read()` for DP data read/write
- Hardware platform: Tuya-compatible development boards (T2, T3, T5AI, ESP32, LN882H, or XH_WB5E series)
- [How to create a PID and configure DPs for cloud-device communication](https://tuyaopen.ai/en/docs/cloud/tuya-cloud/creating-new-product)

### [dpType](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/TuyaIoT/examples/dpType)

Tuya DP data types example. This example demonstrates the read/write methods for all DP data types supported by the Tuya IoT platform, including Bool, Enum, Value (integer), String, and Raw (pass-through). It serves as a comprehensive DP development reference.

- Demonstrates the usage of `TuyaIoT.read()` and `TuyaIoT.write()` for different data types
- Includes hexadecimal data send/receive examples for the Raw type
- Hardware platform: Tuya-compatible development boards (T2, T3, T5AI, ESP32, LN882H, or XH_WB5E series)

### [weatherGet](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/TuyaIoT/examples/weatherGet)

Tuya weather service example. This example demonstrates how to retrieve weather data via the Tuya Cloud, including current weather conditions (temperature, humidity, apparent temperature, pressure, UV index), wind information, sunrise/sunset times, Air Quality Index (AQI), and a 7-day weather forecast.

- Uses the `TuyaIoTWeatherClass` encapsulated weather query interface
- Some interfaces (e.g., wind scale, AQI ranking) are only supported in the China mainland data center
- The device must be activated and have its time synchronized before querying
- Hardware platform: Tuya-compatible development boards (T2, T3, T5AI, ESP32, LN882H, or XH_WB5E series)

---

## HTTP Client

The HTTPClient library provides convenient HTTP/HTTPS request interfaces, encapsulating connection management, request sending, and response parsing.

### [BasicHttpClient](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/HTTPClient/examples/BasicHttpClient)

HTTP GET request example. This example demonstrates how to use the `HTTPClient` class to initiate an HTTP GET request, connecting to WiFi and then accessing a specified URL to print the response status code and content.

- Uses `http.begin()` to set the URL and `http.GET()` to initiate the request
- Hardware platform: All WiFi-capable development boards

### [BasicHttpsClient](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/HTTPClient/examples/BasicHttpsClient)

HTTPS GET request example. This example demonstrates how to use the `HTTPClient` class to initiate a secure HTTPS request, configuring the CA root certificate to verify the server identity and enable encrypted communication.

- Requires providing the server's CA certificate for TLS verification
- Hardware platform: All WiFi-capable development boards

---

## MQTT Client

The MQTTClient library provides an MQTT protocol client implementation, supporting message publishing, subscribing, authentication, and other features. It is ideal for message communication between IoT devices and the cloud.

### [mqtt_basic](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/MQTTClient/examples/mqtt_basic)

Basic MQTT publish/subscribe example. This example demonstrates the basic MQTT client workflow — after connecting to WiFi, the MQTT Broker information is configured, a connection is established, messages are published to `outTopic`, and `inTopic` is subscribed to receive messages, with a callback function printing the received message content.

- Uses the public test Broker `broker.emqx.io`
- Calls `mqtt.loop()` in `loop()` to maintain the connection
- Hardware platform: All WiFi-capable development boards

### [mqtt_auth](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/MQTTClient/examples/mqtt_auth)

MQTT authenticated connection example. This example demonstrates how to connect to an MQTT Broker that requires authentication using a username and password, showing how to configure the `username` and `password` fields in `mqtt_client_config_t`.

- Hardware platform: All WiFi-capable development boards

### [mqtt_publish_in_callback](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/MQTTClient/examples/mqtt_publish_in_callback)

Publishing messages within an MQTT callback example. This example demonstrates how to republish a message inside the message receive callback — subscribing to `inTopic` and forwarding received messages to `outTopic`, implementing a message relay function.

- Demonstrates how to safely call `mqtt.publish()` within a callback function
- Includes automatic reconnection logic on disconnect
- Hardware platform: All WiFi-capable development boards

---

## DNS Server

The DNSServer library provides lightweight DNS server functionality, commonly used in Captive Portal scenarios.

### [CaptivePortal](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/DNSServer/examples/CaptivePortal)

Captive Portal example. This example demonstrates how to create a WiFi hotspot and start a DNS server that redirects all domain name resolution requests to the device's own IP address. Combined with an HTTP server, it implements a captive portal page — users see a configuration page automatically upon connecting to the hotspot.

- Uses `WiFi.softAP()` to create the hotspot, `DNSServer` to hijack DNS, and `WiFiServer` to serve the HTTP page
- Suitable for device provisioning, local configuration, and similar scenarios
- Hardware platform: All WiFi-capable development boards
