# FAQs


<!-- TOC -->
- [FAQs](#faqs)
  - [General Troubleshooting FAQs](#general-troubleshooting-faqs)
- [Environment Setup and Activation](#environment-setup-and-activation)
- [Build Problems](#build-problems)
- [Hardware](#hardware)
- [Configuration and Kconfig Issues](#configuration-and-kconfig-issues)
- [Authorization and License Issues](#authorization-and-license-issues)
- [Flashing and Device Boot](#flashing-and-device-boot)
- [Connectivity Issues](#connectivity-issues)
- [Peripheral and Feature Issues](#peripheral-and-feature-issues)
  - [Pairing Issues with Tuya Cloud / Tuya Smart Life App](#pairing-issues-with-tuya-cloud--tuya-smart-life-app)
- [Project Creation and Structure](#project-creation-and-structure)
- [Git and Submodule Issues](#git-and-submodule-issues)
- [Linux Runtime Support FAQs](#linux-runtime-support-faqs)
    - [Overview](#overview)
  - [](#)
<!-- /TOC -->




## General Troubleshooting FAQs

# Environment Setup and Activation

<details>
<summary><strong>Q1: How do I activate `tos.py` and why do I need to reactivate it?</strong></summary>

To activate `tos.py`, run the activation script in the TuyaOpen root directory:
- **Linux/Mac:** `. ./export.sh`
- **Windows (PowerShell):** `.\export.ps1` (may need `Set-ExecutionPolicy RemoteSigned -Scope LocalMachine` first)
- **Windows (CMD):** `.\export.bat`

**Important:** You must reactivate `tos.py` each time you open a new terminal session. The activation sets up the Python virtual environment and PATH variables needed for the build system.

</details>

---

<details>
<summary><strong>Q2: What should I do if `tos.py` activation fails?</strong></summary>

If activation fails:
- **Linux:** Install `python3-venv` package: `sudo apt-get install python3-venv`
- **Delete and recreate venv:** Remove the `./.venv` directory and run the activation script again
- **Check Python version:** Ensure Python 3.8 or later is installed
- **Windows:** Make sure you're using CMD or PowerShell (not Git Bash or MSYS2, which are incompatible)

</details>

---

<details>
<summary><strong>Q3: Why can't I use Git Bash or MSYS2 on Windows?</strong></summary>

TuyaOpen's build system is incompatible with Linux-like terminal environments on Windows (Git Bash, MSYS2). You must use:
- **Windows CMD** (Command Prompt)
- **PowerShell**

The build scripts rely on Windows-native path handling and command execution that these Linux-like environments don't support properly.

</details>

---

<details>
<summary><strong>Q4: What are the system requirements for TuyaOpen?</strong></summary>

Minimum requirements:
- **Operating Systems:** Windows 10/11, Ubuntu 20.04/22.04/24.04 LTS (recommended), macOS (with Homebrew)
- **Tools:** Git >= 2.0.0, CMake >= 3.28.0, Make >= 3.0.0, Ninja >= 1.6.0, Python >= 3.8.0
- **Linux packages:** `build-essential`, `ninja-build`, `cmake-curses-gui`, `python3-pip`, `python3-venv`
- **Hardware:** USB data cable, compatible development board

</details>

---

<details>
<summary><strong>Q5: How do I verify my environment is set up correctly?</strong></summary>

After activation, run these commands to verify:
```bash
tos.py version    # Should show version number
tos.py check      # Should verify all tools and download submodules
```

If `tos.py version` shows `[Unknown version]`, it means the repository has no tags (common in forked repositories) but this won't affect functionality.

</details>

---

# Build Problems

<details>
<summary><strong>Q1: What should I do if my build fails with missing dependencies?</strong></summary>

If your build fails with errors about missing packages or modules:
- Run `tos.py check` to automatically install required dependencies.
- Ensure your Python environment and PATH configuration are correct.

</details>

---

<details>
<summary><strong>Q2: Why is my board not detected by the build system?</strong></summary>

If the build script cannot detect your hardware board or shows errors about an undefined board:
- Make sure the correct target board is selected using `tos.py config choice`.
- Confirm your board configuration file exists at `{PATH_TO_APP_PROJECT_ROOT}/config/your_t5_custom_board.config`.
- The `config` directory should include Kconfig overlay files for each board.
- Not all apps/demos are compatible with every board; review app documentation.
- The build system supports multiple chips, board versions, or platforms (Linux/MCU) if your code supports them.

</details>

---

<details>
<summary><strong>Q3: When do I need to create a new Board BSP?</strong></summary>

If your hardware or PCB is custom (i.e., not matching existing boards):
- Use `tos.py new board` to generate the BSP structure and config files.
- Centralize hardware initialization and board drivers in the BSP.
- Reuse your BSP across projects for easier maintenance and separation of hardware/application logic.

</details>

---

<details>
<summary><strong>Q4: How do I resolve compilation errors?</strong></summary>

If your build fails with errors, warnings, or stops mid-compilation:
- Review the documentation for troubleshooting steps.
- If unresolved, open a ticket on [GitHub Issues](https://github.com/tuya/TuyaOpen/issues) or ask for help on [Discord](https://discord.com/invite/yPPShSTttG).
- AI-powered coding tools may provide helpful suggestions or guidance.

</details>

---

<details>
<summary><strong>Q5: Why is compilation slow on Windows?</strong></summary>

If each file takes up to 3 seconds to compile or the process gets stuck:
- Open Task Manager (`Ctrl + Shift + Esc`), find and close the `MSPCManagerService` process.
- If the above doesn't work, move the entire `TuyaOpen` directory to a non-system drive (e.g., D drive).
- Add the directory to the exclusion list in `Windows Security - Virus & threat protection` settings.

</details>

---

<details>
<summary><strong>Q6: What should I do if `tos.py check` fails?</strong></summary>

If the check command reports errors:
- **Tools not installed or version too low:** Install or upgrade the corresponding tools (git >= 2.0.0, cmake >= 3.28.0, make >= 3.0.0, ninja >= 1.6.0).
- **Submodules download fails:** Manually execute `git submodule update --init` in the TuyaOpen root directory.
- **Python venv issues:** If activation failed, delete the `./.venv` directory and re-activate. Ensure `python3-venv` is installed (`sudo apt-get install python3-venv` on Linux).

</details>

---

# Hardware

<details>
<summary><strong>Q1: How do I reset pairing information and network configuration?</strong></summary>

To reset your device's pairing information and network configuration:

- **Standard Reset (Most MCU Devices):**  
  - Restart (RESET) the device three times within 5 seconds.  
  - On the fourth boot, the network and pairing status should be cleared automatically.  
  - Refer to your device's documentation for any model-specific reset procedure.

- **For Linux Runtimes:**  
  If you are developing or testing on Linux, you can manually clear persistent key-value data for pairing and network status by deleting the `tuyadb` folder. This folder serves as the cache for network and pairing information.  
  Example:
  ```
  rm -rf tuyadb/*
  ```
</details>




---

# Configuration and Kconfig Issues

<details>
<summary><strong>Q1: How do I select the correct board configuration?</strong></summary>

Use `tos.py config choice` to select from pre-validated configurations:
- The command lists all available board configurations for your project
- Configurations come from two sources (in priority order):
  1. Project-specific `config/` directory
  2. Global `boards/` directory
- After selection, the configuration is saved to `app_default.config` in your project directory

</details>

---

<details>
<summary><strong>Q2: What is the difference between `config choice` and `config menu`?</strong></summary>

- **`tos.py config choice`:** Selects a pre-configured board setup from available options. This is the recommended way to get started quickly.
- **`tos.py config menu`:** Opens an interactive menu (menuconfig) to manually configure all Kconfig options. Use this for advanced customization.

**Note:** Both operations perform a deep clean before execution since they may change the toolchain.

</details>

---

<details>
<summary><strong>Q3: Why can't I select/deselect certain Kconfig options in menuconfig?</strong></summary>

If an option is grayed out or cannot be changed:
- The option may be forced by a `select` statement in your board's `Kconfig` file (e.g., `boards/T5AI/TUYA_T5AI_EVB/Kconfig`)
- Options with `select ENABLE_XXX` are automatically enabled and cannot be manually disabled
- To change this, you need to modify the board's Kconfig file directly

</details>

---

<details>
<summary><strong>Q4: How do I save my custom configuration for reuse?</strong></summary>

After modifying configuration via `tos.py config menu`:
- Use `tos.py config save` to save your current configuration
- Enter a name when prompted (e.g., `my_custom_board.config`)
- The configuration will be saved to your project's `config/` directory
- You can then select it later using `tos.py config choice`

</details>

---

<details>
<summary><strong>Q5: Arrow keys don't work in `config menu` on Windows. What should I do?</strong></summary>

This is a terminal compatibility issue. Try:
- Use alternative keys: **h** (left), **j** (down), **k** (up), **l** (right)
- Switch between CMD and PowerShell to find which works better
- Use the spacebar to toggle options and Enter to confirm

</details>

---

# Authorization and License Issues

<details>
<summary><strong>Q1: What is the difference between TuyaOpen license and TuyaOS license?</strong></summary>

- **TuyaOpen license:** Consists of UUID and AuthKey specifically for TuyaOpen Framework. These are **not interchangeable** with TuyaOS licenses.
- **TuyaOS license:** Used only for TuyaOS projects, cannot be used with TuyaOpen Framework.
- Always ensure you're using TuyaOpen-specific UUID and AuthKey when working with TuyaOpen projects.

</details>

---

<details>
<summary><strong>Q2: How do I obtain a TuyaOpen license (UUID and AuthKey)?</strong></summary>

You can obtain TuyaOpen licenses through:
- **Method 1:** Developers can obtain two free licenses directly from the [Tuya Developer Platform](https://platform.tuya.com/)
- **Method 2:** Purchase a module pre-flashed with TuyaOpen license from the [Tuya IoT Platform](https://platform.tuya.com/purchase/index?type=6)
- **Method 3:** Purchase from [Tuya's official Taobao store](https://item.taobao.com/item.htm?ft=t&id=911596682625)

</details>

---

<details>
<summary><strong>Q3: How do I write authorization information to my device?</strong></summary>

Two methods are available:
- **Method 1 - Command line:** Use `tos.py monitor -b 115200`, then enter `auth uuidxxxxxxxxxxxxxxxx keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` in the interactive prompt
- **Method 2 - Code:** Modify `tuya_config.h` in your project and set `TUYA_OPENSDK_UUID` and `TUYA_OPENSDK_AUTHKEY` macros, then rebuild and flash

**Note:** Use the serial port used for flashing (not the log port) for authorization commands.

</details>

---

<details>
<summary><strong>Q4: How do I verify my authorization was written correctly?</strong></summary>

After writing authorization:
- Use `tos.py monitor` to connect to the device
- Enter `auth-read` command in the interactive prompt
- You should see your UUID and AuthKey displayed
- If you see `xxxxxxxxxxxxxxxx` instead of actual values, the authorization was not written correctly

</details>

---

<details>
<summary><strong>Q5: What does "Authorization read failure" mean in device logs?</strong></summary>

If you see errors like:
```
[ty E][tal_kv.c:269] lfs open UUID_TUYAOPEN -2 err
[ty E][tuya_authorize.c:107] Authorization read failure.
```
This indicates:
- The device cannot read the authorization information from storage
- Authorization was not properly written or was corrupted
- Re-write the authorization using one of the methods above and reboot the device

</details>

---

# Flashing and Device Boot

<details>
<summary><strong>Q1: Why does flashing fail or my device is not detected?</strong></summary>

If the flash command fails or your device is not detected:
- Verify that you are using a data USB cable (not a charge-only cable).
- Install the appropriate serial port drivers for your platform.
- Try another USB port or a different cable.
- Specify the port directly (e.g. `tos.py flash --port /dev/ttyUSB0`). For more details, check out the flashing guide.
- Place your device in download mode/boot mode if needed.
- Check device connections using `lsusb` (Linux) or Device Manager (or Windows Device Manager).

</details>

---

<details>
<summary><strong>Q2: What should I do if my device won't boot?</strong></summary>

If your device has no display, no response, or no serial output after power-on:
- Check the USB cable and port.
- Inspect the power supply (consider another port or adapter).
- Look for short circuits.
- Reflash the firmware.
- Watch for error messages in the serial output during boot.

</details>

---

<details>
<summary><strong>Q3: Why do I see "Port [xxx] may be busy" when flashing?</strong></summary>

If you see this message:
- Wait approximately 1 minute and retry
- The delay varies depending on virtual machines and serial chip models
- For T5 series boards in virtual machines, there's a known delay before the port becomes available
- You can verify the port exists with `ls /dev/tty*` (Linux) but may need to wait before it's usable

</details>

---

<details>
<summary><strong>Q4: Why does my T5 board show two serial ports?</strong></summary>

T5 series development boards have two separate serial ports:
- **Download/Flash port:** Used for firmware flashing and authorization
- **Log port:** Used for viewing device logs and monitoring

**Identifying ports:**
- **Windows:** Check Device Manager - port with letter A is download port, letter B is log port
- **Linux/Mac:** Generally, the device with the smaller number is the flash port, larger number is the log port
- If unsure, test both ports when flashing

</details>

---

<details>
<summary><strong>Q5: How do I fix serial port permission errors on Linux?</strong></summary>

If you get permission denied errors when accessing serial ports:
```bash
sudo usermod -aG dialout $USER
```
Then **reboot your system** for the changes to take effect. After reboot, you should be able to access serial ports without sudo.

</details>

---

<details>
<summary><strong>Q6: Why is tyutool_gui detected as a virus on Windows?</strong></summary>

This is a false positive from Windows Defender. To resolve:
- Place the `tyutool_gui` tool in a non-system drive (e.g., D: drive)
- Add the directory to the exclusion list in `Windows Security - Virus & threat protection` settings
- The tool is safe and provided by TuyaOpen project

</details>

---

# Connectivity Issues

<details>
<summary><strong>Q1: What if my device can't connect to Wi-Fi?</strong></summary>

If your device fails to connect to Wi-Fi when pairing:
- Use a 2.4GHz Wi-Fi network (5GHz is not supported).
- Ensure your Wi-Fi SSID and password information is correct.
- Move the device closer to your router.
- Check router settings such as MAC filtering.
- Reset the device and try the pairing process again.

If the issue is not resolved, please ask for help on [GitHub Issues](https://github.com/tuya/TuyaOpen/issues) and attach the full device log.

</details>

---

<details>
<summary><strong>Q2: How do I resolve cloud connection issues?</strong></summary>

If the device does not appear in the app or cannot connect to the cloud:
- Confirm UUID and AuthKey are correct and TuyaOpen-specific.
- Ensure the device is online and internet connectivity is available.
- Check Tuya Cloud service status.
- Review device logs for connection errors.
- Reset and re-pair the device if issues persist.

If the issue is not resolved, please ask for help on [GitHub Issues](https://github.com/tuya/TuyaOpen/issues) and attach the full device log.

</details>

---

# Peripheral and Feature Issues

<details>
<summary><strong>Q1: What do I do if my screen is blank or not displaying?</strong></summary>

If you see a blank screen or display errors:
- Make sure you've selected the correct display target board.
- Check the display settings in menuconfig.
- Confirm LVGL is enabled.
- Look for display initialization messages in the serial monitor.
- Verify your demo app supports screen output.

</details>

---

<details>
<summary><strong>Q2: Why isn't the AI Agent responding?</strong></summary>

If there is no response to voice or AI commands:
- Check the device's network connectivity.
- Review the serial monitor for AI service-related errors.
- Confirm the microphone is connected and operational.
- Make sure wake word detection is enabled and functioning.
- Verify the device is properly paired and connected to Tuya Cloud.
- Check that AI Agent services are enabled in your project configuration.

</details>

---

<details>
<summary><strong>Q3: How do I enable audio codec drivers (microphone/speaker)?</strong></summary>

To enable audio functionality:
- **First, ensure your audio codec and hardware are supported:** Check your board's documentation and Kconfig files to verify that your development board supports the audio codec hardware (microphone/speaker) you want to use
- Run `tos.py config menu` in your project directory
- Navigate to audio codec configuration options
- Enable the appropriate audio codec for your board
- Ensure your board's Kconfig file includes `select ENABLE_AUDIO_CODECS` if audio is pre-configured
- If your board doesn't have pre-registered audio devices, you'll need to implement the audio driver bridge yourself
- Rebuild the project after configuration changes

</details>

---

<details>
<summary><strong>Q4: Why aren't my peripheral drivers (button, display, etc.) working?</strong></summary>

If peripherals aren't functioning:
- Verify the peripheral is enabled in Kconfig (`tos.py config menu`)
- Check that both `src/peripherals/<peripheral>/Kconfig` and `boards/<platform>/<board>/Kconfig` have the required configuration
- Ensure your board's hardware initialization code registers the peripheral
- Review serial logs for driver initialization errors
- Verify hardware connections and pin configurations match your board setup

</details>

---

## Pairing Issues with Tuya Cloud / Tuya Smart Life App

<details>
<summary><strong>Q1: Why is my device not detected in the app during pairing?</strong></summary>

If your device does not appear in the app during pairing:
- Verify your UUID and Auth license code is properly configured.
- Reset network configuration:
  - For MCUs: Restart (RESET) the device three times within 5 seconds.
  - For Linux/Ubuntu: Remove the `tuyadb` cache folder and try again.

</details>

---

<details>
<summary><strong>Q2: What if I can't connect to Wi-Fi during pairing?</strong></summary>

If connection fails during Wi-Fi setup in the app:
- Make sure your network is 2.4GHz (most Wi-Fi MCUs do not support 5GHz).
  - For MCUs: Confirm the router supports 2.4GHz.
  - For Linux: Use network tools (`ipconfig`, etc.) to verify connectivity and check hardware interfaces.
- Ensure the Wi-Fi password is typed correctly.
- Move the device closer to your router.

</details>

---

<details>
<summary><strong>Q3: What if my device appears in the app but does not respond after pairing?</strong></summary>

If the device is shown in the app but unresponsive after pairing:
- Check serial monitor for error messages.
- Review device logs for cloud connectivity information.
- Make sure required DPs (Data Points) are implemented in your firmware.
- Verify the device is actually online (check cloud connection status in logs).
- Ensure your firmware handles DP commands from the cloud correctly.

</details>

---

<details>
<summary><strong>Q4: How do I put my device into pairing mode?</strong></summary>

For most TuyaOpen demos (like `switch_demo` and `your_chat_bot`):
- **Quick reset method:** Restart (RESET) the device three times within 5 seconds
- The device will enter pairing mode on the fourth boot
- Check device logs for pairing mode indicators (e.g., `STATE_START`, `TUYA_EVENT_BIND_START`)
- Some devices may have physical buttons or other methods - refer to your specific device documentation

</details>

---

<details>
<summary><strong>Q5: What should I do if pairing fails due to incorrect authorization?</strong></summary>

If device logs show authorization errors:
- Verify UUID and AuthKey are correctly written (use `auth-read` command)
- Ensure you're using TuyaOpen-specific licenses (not TuyaOS licenses)
- Check that authorization values don't show as `xxxxxxxxxxxxxxxx` in logs
- Re-write authorization information and reboot the device
- For more details, see the [Device Authorization guide](../quick-start/equipment-authorization.md)

</details>


---

# Project Creation and Structure

<details>
<summary><strong>Q1: How do I create a new project?</strong></summary>

Use `tos.py new project` to create a new application:
- The command will prompt for a project name
- You can specify a framework template with `--framework` parameter (default is `base`, also supports `arduino`)
- The template is copied from `tools/app_template/` directory
- After creation, use `tos.py config choice` to select a board configuration
- Then build with `tos.py build`

</details>

---

<details>
<summary><strong>Q2: Where should I run `tos.py` commands?</strong></summary>

**Critical:** Always run `tos.py` commands from your **application project directory**, not from the TuyaOpen root:
- ✅ Correct: `cd apps/tuya_cloud/switch_demo && tos.py build`
- ❌ Wrong: Running from TuyaOpen root directory will cause errors
- The project directory is where your `CMakeLists.txt` and `app_default.config` files are located

</details>

---

<details>
<summary><strong>Q3: What is the difference between `apps/` and `example/` directories?</strong></summary>

- **`apps/`:** Contains full-featured applications and demos (e.g., `tuya_cloud/switch_demo`, `tuya.ai/your_chat_bot`)
- **`example/`:** Contains smaller code examples demonstrating specific features or APIs
- Both can be compiled using `tos.py build` after selecting a board configuration
- Choose based on your learning or development needs

</details>

---

<details>
<summary><strong>Q4: How do I clean build artifacts?</strong></summary>

Two cleanup options:
- **Standard clean:** `tos.py clean` - Removes build cache but keeps configuration
- **Force clean:** `tos.py clean -f` - Performs deep clean, deletes entire `.build` directory
- Use force clean when switching between different board configurations or when experiencing build issues

</details>

---

# Git and Submodule Issues

<details>
<summary><strong>Q1: How do I update TuyaOpen dependencies?</strong></summary>

After updating the main TuyaOpen repository (via `git pull` or `git checkout`):
- Run `tos.py update` to automatically update related dependencies
- This command updates toolchain dependencies based on `platform/platform_config.yaml`
- Dependencies are switched to the specified commit as configured

</details>

---
# Linux Runtime Support FAQs

### Overview

While TuyaOpen is primarily designed for MCU devices, it also supports Linux runtime environments (e.g., embedded Linux on ARM/x86/x64). This allows you to develop applications using Tuya's framework on a wide variety of hardware platforms, provided you handle the required hardware integrations.

---

<details>
<summary><strong>Q1: What Linux platforms and architectures are supported?</strong></summary>

The TuyaOpen framework can be compiled for common Linux architectures including:
- x86 (32-bit)
- x64 (64-bit)
- ARM (32 and 64-bit, e.g., Raspberry Pi and similar SBCs)

You may need to configure your build toolchain to match your target hardware.

</details>

---

<details>
<summary><strong>Q2: How do I implement hardware (GPIO, SPI, I2C, PWM, and more..) support on Linux?</strong></summary>

Unlike MCU environments where hardware access is direct, Linux systems manage hardware through the kernel and board support packages (BSPs). For TuyaOpen to interact with hardware:
- **Implement Linux drivers:** Ensure your hardware is accessible via a Linux device driver or standard sysfs interface.
- **Create a bridge in the TuyaOpen codebase:** You are responsible for writing or adapting hardware interface code (for GPIO, SPI, PWM, QSPI, Camera, etc.) to conform to the TuyaOpen driver interfaces.
- **Leverage existing interfaces:** Reference Linux libraries like `wiringPi`, `libgpiod`, or kernel `/dev/*` nodes for common peripherals.

</details>

---

<details>
<summary><strong>Q3: Does TuyaOpen provide Linux hardware abstraction?</strong></summary>

TuyaOpen provides the framework and abstractions for cloud connectivity, device pairing, and AI-agent functionality. However, hardware peripheral support (GPIO, SPI, PWM, Camera, QSPI, etc.) **must be implemented by the developer**, using your platform's kernel/BSP capabilities.

</details>

---

<details>
<summary><strong>Q4: How do I cross-compile TuyaOpen for my Linux platform?</strong></summary>

- Use the correct cross-compiler toolchain for your target (e.g., `arm-linux-gnueabihf-gcc` for ARM).
- Modify the TuyaOpen build configuration (usually via CMake or Makefile) to suit your target architecture and sysroot.
- Test your binary on your hardware and troubleshoot dependencies (such as missing `libc` versions or device drivers).

</details>

---

<details>
<summary><strong>Q5: What should I do if my device isn't enumerated or hardware fails to open?</strong></summary>

- Ensure your kernel or BSP enables and exports the necessary device files (e.g., `/dev/spidev*`, `/dev/video*`, `/sys/class/gpio/*`).
- Check permissions: Run your app with sufficient privileges, or adjust udev rules.
- Debug using standard Linux tools like `dmesg`, `lsmod`, and `ls /dev`.

</details>

---

<details>
<summary><strong>Q6: Can I use Tuya cloud and AI-agent features on Linux?</strong></summary>

Yes! TuyaOpen handles the cloud connectivity and AI-agent features across platforms. As long as you provide the hardware bridge implementations, the rest of the device logic, pairing, cloud integrations, OTA, and AI features will work similarly to MCU deployments.

</details>
---