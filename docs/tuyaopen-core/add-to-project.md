---
title: Add the library to a project
description: "Integrate TuyaOpen Core into an existing build: plain CMake hosts include tuyaopen-core.cmake; ESP-IDF projects add two components via EXTRA_COMPONENT_DIRS."
keywords:
  - tuyaopen core
  - cmake integration
  - esp-idf component
  - extra_component_dirs
---

TuyaOpen Core is added to an existing project as a library. There are two supported integration paths: **plain CMake** for Linux and other CMake hosts, and **ESP-IDF components** for Espressif chips.

## Prerequisites

- A TuyaOpen Core SDK checkout and, when needed, a platform port (the repository ships `port/linux` and `port/esp-idf`).
- The third-party dependencies checked out in the SDK tree:

  ```bash
  git submodule update --init
  ```

  This fetches mbedTLS, cJSON, coreMQTT, coreHTTP, and backoffAlgorithm used by the IoT core.
- A device triplet (`PID`, `UUID`, `AuthKey`) for cloud activation. See [Get Started](../quick-start/index.md) for license terms and [Create Your Product & Agent](../cloud/tuya-cloud/creating-new-product.md) for creating a product.

## Plain CMake

The entry point is `tuyaopen-core.cmake` at the repository root. It defines the aggregate interface target `tuyaopen-core`, the interface target `tuyaopen-headers`, and the cache variable `TUYAOPEN_CORE_LIBS`.

1. After your own `project()` call, include the core file and add the port as a subdirectory:

   ```cmake
   include(${TUYAOPEN_CORE_DIR}/tuyaopen-core.cmake)
   add_subdirectory(${TUYAOPEN_CORE_DIR}/port/linux tuyaopen-port)
   ```

   The port injects its platform headers into the `tuyaopen-headers` target. Never include the repository-root `CMakeLists.txt` directly — that file is the ESP-IDF component entry and calls `idf_component_register`.

2. Enable the capability modules you need with CMake options. IoT is always built; AI Agent and P2P are off by default:

   ```bash
   cmake -B build \
     -DCONFIG_ENABLE_AI_COMPONENTS=ON \
     -DCONFIG_ENABLE_TUYA_P2P=ON
   ```

   Other commonly used options: `CONFIG_ENABLE_LOCAL_LINK` (default ON), `CONFIG_ENABLE_BLUETOOTH`, `CONFIG_ENABLE_WIRED`, `CONFIG_ENABLE_PLATFORM_MBEDTLS` (use the platform's mbedTLS instead of the bundled copy).

3. Link your executable. On GNU and Clang hosts, wrap the core libraries and the port together with `--start-group`/`--end-group` to resolve mutual references between the core and its port:

   ```cmake
   target_link_libraries(app PRIVATE
       -Wl,--start-group ${TUYAOPEN_CORE_LIBS} $<TARGET_FILE:tuyaopen-port> -Wl,--end-group
       tuyaopen-port tuyaopen-headers)
   ```

:::note
The include is idempotent: it returns early if the `tuyaopen-headers` target already exists, so adding it from multiple subdirectories is safe.
:::

## ESP-IDF

The SDK root and `port/esp-idf` are two separate ESP-IDF components (the port component is named after its directory, `esp-idf`). Add both to `EXTRA_COMPONENT_DIRS` in your project `CMakeLists.txt`:

```cmake
set(EXTRA_COMPONENT_DIRS
    "${TUYAOPEN_CORE_DIR}"
    "${TUYAOPEN_CORE_DIR}/port/esp-idf")
include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(app)
```

Then build normally:

```bash
idf.py set-target esp32s3
idf.py menuconfig
idf.py build
```

The core options appear in the **tuyaopen-core** menu in `menuconfig` and are written to `sdkconfig` as `CONFIG_*` values. On ESP-IDF the build uses ESP-IDF's mbedTLS and lwIP (`CONFIG_ENABLE_PLATFORM_MBEDTLS=y`).

:::warning
Use ESP-IDF v5.x (v5.4 recommended). ESP-IDF v6.2 and later move mbedTLS crypto headers in a way the current component does not support yet.
:::

## Kconfig outside ESP-IDF

For non-ESP-IDF hosts that still use Kconfig, the repository root provides a `Kconfig` file. Rsource it from your own Kconfig menu:

```kconfig
rsource "/path/to/tuyaopen-core/Kconfig"
```

Generate the config with kconfiglib (`pip install kconfiglib`), then pass the resulting `CONFIG_*` values to CMake. The Linux examples demonstrate this flow.

## Next steps

- [Quick start on Linux](linux-quick-start.md) — a complete working example
- [Port to a new platform](port-to-platform.md) — if neither shipped port fits
- [CMake, Kconfig, and the component model](../build-system/cmake-kconfig-and-components.md) — how the full TuyaOpen build layers the same tools
