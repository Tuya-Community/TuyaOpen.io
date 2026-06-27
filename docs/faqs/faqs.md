---
title: FAQs
---

Answers to the most common problems you hit while setting up, building, flashing, and pairing TuyaOpen devices. Each entry follows the same shape: the symptom, why it happens, and how to fix it. Use your browser's find (`Ctrl + F`) to jump to a keyword, or open a section below.

:::tip
If an answer here does not resolve your issue, ask on [GitHub Issues](https://github.com/tuya/TuyaOpen/issues) or [Discord](https://discord.com/invite/yPPShSTttG) and attach the full device log.
:::

## Environment setup and activation

<details>
<summary><strong>Q1: How do I activate `tos.py`, and why do I need to reactivate it?</strong></summary>

To activate `tos.py`, run the activation script in the TuyaOpen root directory:
- **Linux/Mac:** `. ./export.sh`
- **Windows (PowerShell):** `.\export.ps1` (you may need `Set-ExecutionPolicy RemoteSigned -Scope LocalMachine` first)
- **Windows (CMD):** `.\export.bat`

You must reactivate `tos.py` in every new terminal session. Activation sets up the Python virtual environment and the `PATH` variables the build system needs.

</details>

<details>
<summary><strong>Q2: What should I do if `tos.py` activation fails?</strong></summary>

If activation fails:
- **Linux:** install the `python3-venv` package: `sudo apt-get install python3-venv`
- **Recreate the venv:** remove the `./.venv` directory and run the activation script again
- **Check the Python version:** make sure Python 3.8 or later is installed
- **Windows:** use CMD or PowerShell, not Git Bash or MSYS2 (those are incompatible)

</details>

<details>
<summary><strong>Q3: Why can't I use Git Bash or MSYS2 on Windows?</strong></summary>

The TuyaOpen build system is incompatible with Linux-like terminal environments on Windows (Git Bash, MSYS2). Use:
- **Windows CMD** (Command Prompt)
- **PowerShell**

The build scripts rely on Windows-native path handling and command execution that these Linux-like environments do not support properly.

</details>

<details>
<summary><strong>Q4: What are the system requirements for TuyaOpen?</strong></summary>

Minimum requirements:
- **Operating systems:** Windows 10/11, Ubuntu 20.04/22.04/24.04 LTS (recommended), macOS (with Homebrew)
- **Tools:** Git >= 2.0.0, CMake >= 3.28.0, Make >= 3.0.0, Ninja >= 1.6.0, Python >= 3.8.0
- **Linux packages:** `build-essential`, `ninja-build`, `cmake-curses-gui`, `python3-pip`, `python3-venv`
- **Hardware:** a USB data cable and a compatible development board

</details>

<details>
<summary><strong>Q5: How do I verify my environment is set up correctly?</strong></summary>

After activation, run these commands to verify:

```bash
tos.py version    # Should show a version number
tos.py check      # Should verify all tools and download submodules
```

If `tos.py version` shows `[Unknown version]`, the repository has no tags (common in forks). This does not affect functionality.

</details>

## Build problems

<details>
<summary><strong>Q1: What should I do if my build fails with missing dependencies?</strong></summary>

If your build fails with errors about missing packages or modules:
- Run `tos.py check` to install the required dependencies automatically.
- Make sure your Python environment and `PATH` configuration are correct.

</details>

<details>
<summary><strong>Q2: Why is my board not detected by the build system?</strong></summary>

If the build script cannot detect your board or reports an undefined board:
- Select the correct target board with `tos.py config choice`.
- Confirm your board configuration file exists at `{PATH_TO_APP_PROJECT_ROOT}/config/your_t5_custom_board.config`.
- The `config` directory should include the Kconfig overlay files for each board.
- Not every app or demo is compatible with every board; review the app documentation.
- The build system supports multiple chips, board versions, and platforms (Linux/MCU) when your code supports them.

</details>

<details>
<summary><strong>Q3: When do I need to create a new board BSP?</strong></summary>

If your hardware or PCB is custom (it does not match an existing board):
- Use `tos.py new board` to generate the BSP structure and config files.
- Centralize hardware initialization and board drivers in the BSP.
- Reuse the BSP across projects for easier maintenance and a clean split between hardware and application logic.

</details>

<details>
<summary><strong>Q4: How do I resolve compilation errors?</strong></summary>

If your build fails with errors or warnings, or stops mid-compilation:
- Review the documentation for troubleshooting steps.
- If the issue persists, open a ticket on [GitHub Issues](https://github.com/tuya/TuyaOpen/issues) or ask on [Discord](https://discord.com/invite/yPPShSTttG).
- AI-powered coding tools may offer helpful suggestions.

</details>

<details>
<summary><strong>Q5: Why is compilation slow on Windows?</strong></summary>

If each file takes up to 3 seconds to compile, or the process gets stuck:
- Open Task Manager (`Ctrl + Shift + Esc`), then find and close the `MSPCManagerService` process.
- If that does not help, move the entire `TuyaOpen` directory to a non-system drive (for example, the D drive).
- Add the directory to the exclusion list under **Windows Security - Virus & threat protection**.

</details>

<details>
<summary><strong>Q6: What should I do if `tos.py check` fails?</strong></summary>

If the check command reports errors:
- **Tools not installed or version too low:** install or upgrade the corresponding tools (git >= 2.0.0, cmake >= 3.28.0, make >= 3.0.0, ninja >= 1.6.0).
- **Submodule download fails:** run `git submodule update --init` in the TuyaOpen root directory.
- **Python venv issues:** if activation failed, delete the `./.venv` directory and reactivate. Make sure `python3-venv` is installed (`sudo apt-get install python3-venv` on Linux).

</details>

## Hardware

<details>
<summary><strong>Q1: How do I reset pairing information and network configuration?</strong></summary>

To reset your device's pairing information and network configuration:

- **Standard reset (most MCU devices):**
  - Restart (RESET) the device three times within 5 seconds.
  - On the fourth boot, the network and pairing status clears automatically.
  - Refer to your device's documentation for any model-specific reset procedure.

- **Linux runtimes:**
  When developing or testing on Linux, clear the persistent key-value data for pairing and network status by deleting the `tuyadb` folder. This folder caches network and pairing information. For example:

  ```bash
  rm -rf tuyadb/*
  ```

</details>

## Configuration and Kconfig issues

<details>
<summary><strong>Q1: How do I select the correct board configuration?</strong></summary>

Use `tos.py config choice` to select from pre-validated configurations:
- The command lists every available board configuration for your project.
- Configurations come from two sources, in priority order:
  1. The project-specific `config/` directory.
  2. The global `boards/` directory.
- After selection, the configuration is saved to `app_default.config` in your project directory.

</details>

<details>
<summary><strong>Q2: What is the difference between `config choice` and `config menu`?</strong></summary>

- **`tos.py config choice`:** selects a pre-configured board setup from the available options. This is the recommended way to get started quickly.
- **`tos.py config menu`:** opens an interactive menu (menuconfig) to configure all Kconfig options manually. Use this for advanced customization.

Both operations run a deep clean before they execute, because they may change the toolchain.

</details>

<details>
<summary><strong>Q3: Why can't I select or deselect certain Kconfig options in menuconfig?</strong></summary>

If an option is grayed out or cannot be changed:
- The option may be forced by a `select` statement in your board's `Kconfig` file (for example, `boards/T5AI/TUYA_T5AI_EVB/Kconfig`).
- Options under `select ENABLE_XXX` are enabled automatically and cannot be disabled manually.
- To change this, modify the board's Kconfig file directly.

</details>

<details>
<summary><strong>Q4: How do I save my custom configuration for reuse?</strong></summary>

After modifying the configuration with `tos.py config menu`:
- Run `tos.py config save` to save the current configuration.
- Enter a name when prompted (for example, `my_custom_board.config`).
- The configuration is saved to your project's `config/` directory.
- You can select it later with `tos.py config choice`.

</details>

<details>
<summary><strong>Q5: The arrow keys don't work in `config menu` on Windows. What should I do?</strong></summary>

This is a terminal compatibility issue. Try:
- The alternative keys: **h** (left), **j** (down), **k** (up), **l** (right).
- Switching between CMD and PowerShell to find which works better.
- The spacebar to toggle options and Enter to confirm.

</details>

## Authorization and License Issues

<details>
<summary><strong>Q1: What is the difference between a TuyaOpen license and a TuyaOS license?</strong></summary>

- **TuyaOpen license:** consists of a UUID and an AuthKey specific to the TuyaOpen Framework. These are **not interchangeable** with TuyaOS licenses.
- **TuyaOS license:** used only for TuyaOS projects; it cannot be used with the TuyaOpen Framework.
- Always use a TuyaOpen-specific UUID and AuthKey for TuyaOpen projects.

</details>

<details>
<summary><strong>Q2: How do I obtain a TuyaOpen license (UUID and AuthKey)?</strong></summary>

You can obtain a TuyaOpen license in three ways:
- **Method 1:** claim two free licenses from the [Tuya Developer Platform](https://platform.tuya.com/). See [Get a Developer License](./get-developer-license.md).
- **Method 2:** buy a module pre-flashed with a TuyaOpen license from the [Tuya IoT Platform](https://platform.tuya.com/purchase/index?type=6).
- **Method 3:** buy from [Tuya's official Taobao store](https://item.taobao.com/item.htm?ft=t&id=911596682625).

</details>

<details>
<summary><strong>Q3: How do I write authorization information to my device?</strong></summary>

Two methods are available:
- **Command line:** run `tos.py monitor -b 115200`, then enter `auth uuidxxxxxxxxxxxxxxxx keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` at the interactive prompt.
- **Code:** edit `tuya_config.h` in your project, set the `TUYA_OPENSDK_UUID` and `TUYA_OPENSDK_AUTHKEY` macros, then rebuild and flash.

Use the serial port you flash with (not the log port) for authorization commands.

</details>

<details>
<summary><strong>Q4: How do I verify my authorization was written correctly?</strong></summary>

After writing authorization:
- Run `tos.py monitor` to connect to the device.
- Enter the `auth-read` command at the interactive prompt.
- You should see your UUID and AuthKey.
- If you see `xxxxxxxxxxxxxxxx` instead of actual values, the authorization was not written correctly.

</details>

<details>
<summary><strong>Q5: What does "Authorization read failure" mean in the device logs?</strong></summary>

If you see errors like:

```
[ty E][tal_kv.c:269] lfs open UUID_TUYAOPEN -2 err
[ty E][tuya_authorize.c:107] Authorization read failure.
```

This means the device cannot read the authorization information from storage, because the authorization was not written properly or was corrupted. Rewrite the authorization with one of the methods above and reboot the device.

</details>

## Flashing and device boot

<details>
<summary><strong>Q1: Why does flashing fail, or why is my device not detected?</strong></summary>

If the flash command fails or your device is not detected:
- Verify that you are using a data USB cable, not a charge-only cable.
- Install the serial port drivers for your platform.
- Try another USB port or a different cable.
- Specify the port directly (for example, `tos.py flash --port /dev/ttyUSB0`); see the flashing guide for details.
- Put your device in download mode or boot mode if needed.
- Check the device connection with `lsusb` (Linux) or Device Manager (Windows).

</details>

<details>
<summary><strong>Q2: What should I do if my device won't boot?</strong></summary>

If your device has no display, no response, or no serial output after power-on:
- Check the USB cable and port.
- Inspect the power supply; try another port or adapter.
- Look for short circuits.
- Reflash the firmware.
- Watch for error messages in the serial output during boot.

</details>

<details>
<summary><strong>Q3: Why do I see "Port [xxx] may be busy" when flashing?</strong></summary>

If you see this message:
- Wait about 1 minute and retry.
- The delay varies with virtual machines and serial chip models.
- For T5 series boards in virtual machines, there is a known delay before the port becomes available.
- You can confirm the port exists with `ls /dev/tty*` (Linux), but you may need to wait before it is usable.

</details>

<details>
<summary><strong>Q4: Why does my T5 board show two serial ports?</strong></summary>

T5 series development boards have two separate serial ports:
- **Download/flash port:** used for firmware flashing and authorization.
- **Log port:** used for viewing device logs and monitoring.

To identify the ports:
- **Windows:** check Device Manager. The port with letter A is the download port; letter B is the log port.
- **Linux/Mac:** generally, the device with the smaller number is the flash port, and the larger number is the log port.
- If you are unsure, test both ports when flashing.

</details>

<details>
<summary><strong>Q5: How do I fix serial port permission errors on Linux?</strong></summary>

If you get permission-denied errors when accessing serial ports:

```bash
sudo usermod -aG dialout $USER
```

Then **reboot your system** for the change to take effect. After the reboot, you can access serial ports without sudo.

</details>

<details>
<summary><strong>Q6: Why is tyutool_gui flagged as a virus on Windows?</strong></summary>

This is a false positive from Windows Defender. To resolve it:
- Place the `tyutool_gui` tool on a non-system drive (for example, the D: drive).
- Add the directory to the exclusion list under **Windows Security - Virus & threat protection**.

The tool is safe and is provided by the TuyaOpen project.

</details>

## Connectivity issues

<details>
<summary><strong>Q1: What if my device can't connect to Wi-Fi?</strong></summary>

If your device fails to connect to Wi-Fi while pairing:
- Use a 2.4 GHz Wi-Fi network; 5 GHz is not supported.
- Make sure the Wi-Fi SSID and password are correct.
- Move the device closer to your router.
- Check router settings such as MAC filtering.
- Reset the device and try pairing again.

If the issue persists, ask on [GitHub Issues](https://github.com/tuya/TuyaOpen/issues) and attach the full device log.

</details>

<details>
<summary><strong>Q2: How do I resolve cloud connection issues?</strong></summary>

If the device does not appear in the app or cannot connect to the cloud:
- Confirm the UUID and AuthKey are correct and TuyaOpen-specific.
- Make sure the device is online and has internet connectivity.
- Check the Tuya Cloud service status.
- Review the device logs for connection errors.
- Reset and re-pair the device if the issue persists.

If the issue persists, ask on [GitHub Issues](https://github.com/tuya/TuyaOpen/issues) and attach the full device log.

</details>

## Peripheral and feature issues

<details>
<summary><strong>Q1: What do I do if my screen is blank or not displaying?</strong></summary>

If you see a blank screen or display errors:
- Make sure you selected the correct display target board.
- Check the display settings in menuconfig.
- Confirm LVGL is enabled.
- Look for display initialization messages in the serial monitor.
- Verify that your demo app supports screen output.

</details>

<details>
<summary><strong>Q2: Why isn't the AI Agent responding?</strong></summary>

If there is no response to voice or AI commands:
- Check the device's network connectivity.
- Review the serial monitor for AI service errors.
- Confirm the microphone is connected and working.
- Make sure wake-word detection is enabled and functioning.
- Verify the device is paired and connected to Tuya Cloud.
- Check that AI Agent services are enabled in your project configuration.

</details>

<details>
<summary><strong>Q3: How do I enable audio codec drivers (microphone/speaker)?</strong></summary>

To enable audio functionality:
- **First, confirm your audio codec and hardware are supported:** check your board's documentation and Kconfig files to verify it supports the audio codec hardware (microphone/speaker) you want to use.
- Run `tos.py config menu` in your project directory.
- Navigate to the audio codec configuration options.
- Enable the appropriate audio codec for your board.
- Make sure your board's Kconfig file includes `select ENABLE_AUDIO_CODECS` if audio is pre-configured.
- If your board has no pre-registered audio devices, implement the audio driver bridge yourself.
- Rebuild the project after configuration changes.

</details>

<details>
<summary><strong>Q4: Why aren't my peripheral drivers (button, display, and so on) working?</strong></summary>

If peripherals are not functioning:
- Verify the peripheral is enabled in Kconfig (`tos.py config menu`).
- Check that both `src/peripherals/<peripheral>/Kconfig` and `boards/<platform>/<board>/Kconfig` have the required configuration.
- Make sure your board's hardware initialization code registers the peripheral.
- Review the serial logs for driver initialization errors.
- Verify that hardware connections and pin configurations match your board setup.

</details>

### Pairing issues with Tuya Cloud / Tuya Smart Life app

<details>
<summary><strong>Q1: Why is my device not detected in the app during pairing?</strong></summary>

If your device does not appear in the app during pairing:
- Verify your UUID and authorization license code are configured correctly.
- Reset the network configuration:
  - **MCU:** restart (RESET) the device three times within 5 seconds.
  - **Linux/Ubuntu:** remove the `tuyadb` cache folder and try again.

</details>

<details>
<summary><strong>Q2: What if I can't connect to Wi-Fi during pairing?</strong></summary>

If the connection fails during Wi-Fi setup in the app:
- Make sure your network is 2.4 GHz; most Wi-Fi MCUs do not support 5 GHz.
  - **MCU:** confirm the router supports 2.4 GHz.
  - **Linux:** use network tools (`ipconfig` and similar) to verify connectivity and check the hardware interfaces.
- Make sure the Wi-Fi password is typed correctly.
- Move the device closer to your router.

</details>

<details>
<summary><strong>Q3: What if my device appears in the app but does not respond after pairing?</strong></summary>

If the device shows in the app but is unresponsive after pairing:
- Check the serial monitor for error messages.
- Review the device logs for cloud connectivity information.
- Make sure the required DPs (Data Points) are implemented in your firmware.
- Verify the device is actually online (check the cloud connection status in the logs).
- Make sure your firmware handles DP commands from the cloud correctly.

</details>

<details>
<summary><strong>Q4: How do I put my device into pairing mode?</strong></summary>

For most TuyaOpen demos (such as `switch_demo` and `your_chat_bot`):
- **Quick reset method:** restart (RESET) the device three times within 5 seconds.
- The device enters pairing mode on the fourth boot.
- Check the device logs for pairing-mode indicators (for example, `STATE_START`, `TUYA_EVENT_BIND_START`).
- Some devices have physical buttons or other methods; refer to your device's documentation.

</details>

<details>
<summary><strong>Q5: What should I do if pairing fails due to incorrect authorization?</strong></summary>

If the device logs show authorization errors:
- Verify the UUID and AuthKey are written correctly (use the `auth-read` command).
- Make sure you are using TuyaOpen-specific licenses, not TuyaOS licenses.
- Check that the authorization values do not show as `xxxxxxxxxxxxxxxx` in the logs.
- Rewrite the authorization information and reboot the device.
- For details, see the [Device Authorization guide](../quick-start/equipment-authorization.md).

</details>

## Project creation and structure

<details>
<summary><strong>Q1: How do I create a new project?</strong></summary>

Use `tos.py new project` to create a new application:
- The command prompts for a project name.
- Specify a framework template with the `--framework` parameter (the default is `base`; `arduino` is also supported).
- The template is copied from the `tools/app_template/` directory.
- After creation, run `tos.py config choice` to select a board configuration.
- Then build with `tos.py build`.

</details>

<details>
<summary><strong>Q2: Where should I run `tos.py` commands?</strong></summary>

Always run `tos.py` commands from your **application project directory**, not from the TuyaOpen root:
- Correct: `cd apps/tuya_cloud/switch_demo && tos.py build`
- Wrong: running from the TuyaOpen root directory causes errors.

The project directory is where your `CMakeLists.txt` and `app_default.config` files are located.

</details>

<details>
<summary><strong>Q3: What is the difference between the `apps/` and `examples/` directories?</strong></summary>

- **`apps/`:** full-featured applications and demos (for example, `tuya_cloud/switch_demo`, `tuya.ai/your_chat_bot`).
- **`examples/`:** smaller code examples that demonstrate a specific feature or API.
- Both build with `tos.py build` after you select a board configuration.
- Choose based on your learning or development needs.

</details>

<details>
<summary><strong>Q4: How do I clean build artifacts?</strong></summary>

Two cleanup options:
- **Standard clean:** `tos.py clean` removes the build cache but keeps the configuration.
- **Force clean:** `tos.py clean -f` performs a deep clean and deletes the entire `.build` directory.

Use force clean when switching between board configurations or when troubleshooting build issues.

</details>

## Git and submodule issues

<details>
<summary><strong>Q1: How do I update TuyaOpen dependencies?</strong></summary>

After updating the main TuyaOpen repository (with `git pull` or `git checkout`):
- Run `tos.py update` to update the related dependencies automatically.
- This command updates toolchain dependencies based on `platform/platform_config.yaml`.
- Dependencies are switched to the commit specified in that configuration.

</details>

## Linux runtime support

TuyaOpen is designed primarily for MCU devices, but it also supports Linux runtime environments (for example, embedded Linux on ARM/x86/x64). This lets you develop with Tuya's framework on a wide range of hardware platforms, provided you handle the required hardware integrations.

<details>
<summary><strong>Q1: What Linux platforms and architectures are supported?</strong></summary>

The TuyaOpen framework compiles for common Linux architectures, including:
- x86 (32-bit)
- x64 (64-bit)
- ARM (32-bit and 64-bit, for example Raspberry Pi and similar SBCs)

You may need to configure your build toolchain to match your target hardware.

</details>

<details>
<summary><strong>Q2: How do I implement hardware support (GPIO, SPI, I2C, PWM, and more) on Linux?</strong></summary>

Unlike MCU environments where hardware access is direct, Linux systems manage hardware through the kernel and board support packages (BSPs). For TuyaOpen to interact with hardware:
- **Implement Linux drivers:** make sure your hardware is accessible through a Linux device driver or the standard sysfs interface.
- **Create a bridge in the TuyaOpen codebase:** you are responsible for writing or adapting hardware interface code (for GPIO, SPI, PWM, QSPI, Camera, and so on) to conform to the TuyaOpen driver interfaces.
- **Leverage existing interfaces:** reference Linux libraries such as `wiringPi` and `libgpiod`, or the kernel `/dev/*` nodes, for common peripherals.

</details>

<details>
<summary><strong>Q3: Does TuyaOpen provide Linux hardware abstraction?</strong></summary>

TuyaOpen provides the framework and abstractions for cloud connectivity, device pairing, and AI Agent functionality. Hardware peripheral support (GPIO, SPI, PWM, Camera, QSPI, and so on) **must be implemented by the developer**, using your platform's kernel and BSP capabilities.

</details>

<details>
<summary><strong>Q4: How do I cross-compile TuyaOpen for my Linux platform?</strong></summary>

- Use the correct cross-compiler toolchain for your target (for example, `arm-linux-gnueabihf-gcc` for ARM).
- Modify the TuyaOpen build configuration (usually via CMake or Makefile) to suit your target architecture and sysroot.
- Test the binary on your hardware and troubleshoot dependencies (such as missing `libc` versions or device drivers).

</details>

<details>
<summary><strong>Q5: What should I do if my device isn't enumerated or hardware fails to open?</strong></summary>

- Make sure your kernel or BSP enables and exports the necessary device files (for example, `/dev/spidev*`, `/dev/video*`, `/sys/class/gpio/*`).
- Check permissions: run your app with sufficient privileges, or adjust the udev rules.
- Debug with standard Linux tools such as `dmesg`, `lsmod`, and `ls /dev`.

</details>

<details>
<summary><strong>Q6: Can I use Tuya Cloud and AI Agent features on Linux?</strong></summary>

Yes. TuyaOpen handles cloud connectivity and AI Agent features across platforms. As long as you provide the hardware bridge implementations, the rest of the device logic, pairing, cloud integrations, OTA, and AI features work the same as on MCU deployments.

</details>

## See also

- [Get a Developer License](./get-developer-license.md) – Claim free authorization codes for cloud features.
- [Device Authorization guide](../quick-start/equipment-authorization.md) – Write UUID and AuthKey over the serial CLI.
