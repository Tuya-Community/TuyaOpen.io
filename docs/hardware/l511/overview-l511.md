---
title: L511 Series Overview
description: TuyaOpen L511 series models, firmware flashing, and serial log viewing.
keywords:
  - L511
  - L511G-Y7PM
  - L511C-Y7PM
  - L511C-Y6
  - FlashTool
  - EPAT
---

# L511 Series Overview

L511 is a cellular module family that connects to the cloud over cellular networks in TuyaOpen. This page covers the supported model documentation and the reference workflow for building on Linux, then flashing firmware and viewing logs with Windows tools. Before starting, confirm that the module, development board, SDK version, and firmware package are compatible.

## Series models

| Documentation model | Name in reference materials/SDK | Notes |
| --- | --- | --- |
| L511G-Y7PM | `L511G_Y7PM` | G variant in the Y7PM series. |
| L511C-Y7PM | `L511C_Y7PM` | C variant in the Y7PM series. It is a distinct target from G; do not assume their configurations, pin assignments, or firmware are interchangeable. |
| L511C-Y6 | SDK target: `L511C_Y6E` | Select the target based on the SDK configuration and the full module part number in use. |

## Select a model and configure the project

When creating a project in the IDE, select the L511 model that matches your module. For an SDK example, run `tos.py config choice` in the application directory, select the matching model configuration, and then run `tos.py build`. See the [project compilation guide](../../quick-start/project-compilation.md).

| Model | SDK target | Configuration option |
| --- | --- | --- |
| L511G-Y7PM | `L511G_Y7PM` | `CONFIG_L511_MODEL_L511G_Y7PM=y` |
| L511C-Y7PM | `L511C_Y7PM` | `CONFIG_L511_MODEL_L511C_Y7PM=y` |
| L511C-Y6 (Y6E) | `L511C_Y6E` | `CONFIG_L511_MODEL_L511C_Y6E=y` |

All three targets use `CONFIG_BOARD_CHOICE_L511=y` in the SDK configuration. To check the project configuration, inspect `source/embedded/app_default.config` for an IDE application, or `app_default.config` in the application directory for an SDK example. Confirm that its L511 model option matches your module. Use firmware and download configuration built for the same model; firmware for different models is not interchangeable.
## Build and prepare firmware

Build the firmware on Linux, then copy the output to a location accessible from Windows. Use FlashTool to flash the firmware and EPAT to view logs. Avoid non-ASCII characters in the firmware path.

Prepare the following before flashing:

- A download configuration matching the target and SDK build, such as the reference guide's `config_custom_usb.ini`.
- The firmware package produced for the project. The reference example uses a `.binpkg` file with `_QIO_` in its name; output names can vary by SDK and project, so use the artifact documented for your build.
- A USB data cable, development board, and Windows serial driver.
- [FlashTool V4.1.22](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/FlashToolV4.1.22_260518.zip) (49,779,561 bytes).

## Flash firmware with FlashTool

<figure>
  <img src="https://images.tuyacn.com/fe-static/docs/img/844970ab-7b69-47ef-8c34-8fcbfc9edc1a.png" alt="FlashTool firmware package and configuration selection steps" />
  <figcaption>FlashTool firmware package and configuration selection steps</figcaption>
</figure>

1. Extract FlashTool and place the firmware package in a directory whose path contains no non-ASCII characters. Launch FlashTool.
2. Connect the target board over USB and confirm that Windows detects its serial port.
3. Put the board into download mode. For an L511G board, enter download mode by pressing the BOOT pull-up button, pressing and releasing RST, then releasing BOOT.
4. In FlashTool, select the flashing port that appears after the board enters download mode.
5. Load the download configuration matching the target board/module, then select the firmware package produced for that target.
6. Click **Download** and watch the tool's status area for the result.
7. After a successful flash, restart the device as described by the board documentation. If flashing fails, check the target model, configuration file, firmware package, and serial port, then re-enter download mode before retrying.

For example, a build output may be located at `source/embedded/dist/<project>/L511G_Y7PM_download/config_custom_usb.ini`. Use the path produced by your project, and match the download configuration and firmware to the same model.

## View logs with EPAT

- [EPAT V1.3.261.570](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/EPAT_V1.3.261.570.zip) (22,400,621 bytes).
- The `comdb.txt` log database produced by the firmware build. For example, build output may be located in `source/embedded/dist/<project>/L511G_Y7PM_download/`; use the `comdb.txt` generated with your firmware.

1. Extract and launch EPAT. Connect the board and confirm that it has left download mode and restarted.
2. Open **Database State**, click **Update**, and use the file picker to locate the `comdb.txt` matching the current firmware.


   <figure>
     <img src="https://images.tuyacn.com/fe-static/docs/img/20aa634e-ee45-4134-b32f-6dbde0ddef9f.png" alt="EPAT Database State window" />
     <figcaption>EPAT Database State window</figcaption>
   </figure>


3. Click **Update** again to load the database, then close the database window.
4. Select the device's log serial port and open the log view. If multiple ports are present, check them one at a time. Only one port may appear while the device is in download mode.
5. After each firmware rebuild, load the `comdb.txt` corresponding to that firmware so the log decoder matches the running image.

## Model documentation

- [L511C/G-Y7PM peripheral mapping](l511c-g-y7pm/peripheral-mapping)
- [L511C/G-Y7PM hardware resources](l511c-g-y7pm/hardware-resources)
- [L511C-Y6 peripheral mapping](l511c-y6/peripheral-mapping)
- [L511C-Y6 hardware resources](l511c-y6/hardware-resources)

## Reference materials

- [L511-Y7B series datasheet](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/L511-Y7B-series-spec.pdf)
- [L511-Y7B series hardware design guide](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/L511-Y7B-hardware-guide.pdf)
- [CAT1-EVB V100 reference](https://images.tuyacn.com/tuyaopen/tuyaopen-site-assets/hardware/L511/CAT1-EVB_V100.pdf)
<figure>
  <img src="https://images.tuyacn.com/fe-static/docs/img/d71ead80-172c-4c4e-ad99-7571d731d179.jpg" alt="L511G-Y7PM board rendering" />
  <figcaption>L511G-Y7PM board rendering</figcaption>
</figure>

<figure>
  <img src="https://images.tuyacn.com/fe-static/docs/img/7b484f7a-146a-4377-be40-7f291dc4d57c.png" alt="L511G-Y7PM board photo" />
  <figcaption>L511G-Y7PM board photo</figcaption>
</figure>
