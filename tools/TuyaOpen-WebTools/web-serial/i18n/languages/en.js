// English (en-US)
const en = {
    // Page title and description
    title: "TuyaOpen Serial Tool",
    subtitle: "One-stop developer tool based on Chrome Web Serial API",
    
    // Browser requirements and beta version notice
    browser_requirement: "This tool requires Chrome-based browsers. Other browsers cannot work properly. Please use Chrome, Edge, or other Chromium-based browsers.",
    beta_notice: "If you encounter any issues while using this tool, please submit them to the repository at",
    repository_link: "TuyaOpen-WebTools Repository",
    
    // Project related links
    project_info: "This project is part of TuyaOpen. Related projects include:",
    tuya_open_project: "TuyaOpen",
    arduino_project: "Arduino-TuyaOpen",
    lua_project: "Luanode-TuyaOpen",
    tools_project: "TuyaOpen-WebTools",
    
    // Tab labels
    tab_serial: "Serial Debug",
    tab_flash: "Firmware Flash",
    tab_tuya_auth: "TuyaOpen Auth",
    
    // Control panel
    control_title: "Serial Connection Control",
    flash_connection_control: "Firmware Flash Serial Connection",
    connect: "Connect Serial",
    connect_flash: "Connect Firmware Flash Serial",
    disconnect: "Disconnect",
    disconnect_flash: "Disconnect Firmware Flash Connection",
    status_disconnected: "Disconnected",
    status_connected: "Connected",
    serial_target_device: "Target Device:",
    custom_device: "Custom",
    baud_rate: "Baud Rate:",
    data_bits: "Data Bits:",
    stop_bits: "Stop Bits:",
    parity: "Parity:",
    parity_none: "None",
    parity_even: "Even",
    parity_odd: "Odd",
    
    // Serial debugging
    receive_data: "Received Data",
    save_log: "Save Log",
    auto_scroll: "Auto Scroll",
    show_timestamp: "Show Timestamp",
    waiting_data: "Waiting for serial data...",
    received: "RX",
    sent: "TX",
    bytes: "bytes",
    
    // Error analysis related
    error_analysis: "Error Log Analysis",
    clear_analysis: "Clear Analysis (Reset Detection)",
    auto_analysis: "Auto Analysis",
    no_errors_detected: "No errors detected...",
    test_error_analysis: "Test Error Analysis",
    
    send_data: "Send Data",
    hex_mode: "HEX Mode",
    add_newline: "Add Newline",
    input_placeholder: "Enter data to send...",
    input_placeholder_hex: "Enter hex data (e.g.: FF 01 02 03)...",
    send: "Send",
    
    quick_send: "Quick Send:",
    manage: "Manage Commands",
    no_quick_commands: "No quick commands yet. Click 'Manage Commands' to add common AT commands, debug instructions, etc. to improve debugging efficiency",
    
    // Firmware flash
    flash_config: "Firmware Flash Configuration",
    target_device: "Target Device:",
    esp32_flash_address: "ESP32-Series Flash Address:",
    complete_firmware: "0x0000 (Complete Firmware)",
    custom_address: "Custom Address...",
    custom_address_placeholder: "0x10000",
    select_file: "Select Firmware File",
    no_file_selected: "No file selected, click \"Select Firmware File\" to manually open a flash file or drag the flash file to the file box",
    file_size: "File Size",
    start_download: "Start Flash",
    stop_download: "End Flash",
    auto_disconnect_after_flash: "Auto disconnect after flash complete",
    preparing: "Preparing...",
    downloaded: "Downloaded",
    download_log: "Flash Log",
    clear_log: "Clear Log",
    waiting_download: "Waiting for download operation...",
    
    // Quick command management
    quick_send_management: "Quick Send Management",
    add_new_command: "Add New Command",
    display_name: "Display Name:",
    name_example: "e.g.: Reset",
    send_content: "Send Content:",
    content_example: "e.g.: AT+RST",
    add: "Add",
    existing_commands: "Existing Commands",
    no_commands: "No quick commands",
    reset_default: "Reset Default",
    close: "Close",
    
    // Error messages
    error: "Error",
    
    // System messages
    serial_connected: "Serial connected successfully!",
    serial_disconnected: "Serial disconnected.",
    flash_serial_connected: "Firmware Flash Serial Connection Successful!",
    flash_serial_disconnected: "Firmware Flash Serial Disconnected.",
    switch_to_tab: "Switched to {0}, serial connection closed",
    tab_serial_name: "Serial Debug",
    tab_flash_name: "Firmware Flash",
    
    // Confirmation dialogs
    switch_tab_confirm: "⚠️ Serial Mutex Warning\n\nCurrent {0} function is using serial connection.\n{0} and {1} functions cannot use serial simultaneously.\n\nSwitching to {1} will:\n• Automatically disconnect current serial connection\n• Stop ongoing operations\n\nAre you sure to switch?",
    delete_command_confirm: "Are you sure to delete this quick command?",
    reset_commands_confirm: "Are you sure to reset to default quick commands? This will delete all custom commands.",
    
    // Validation messages
    fill_complete_info: "Please fill in complete command name and content",
    command_name_exists: "Command name already exists, please use another name",
    no_data_to_save: "No data to save",
    no_log_to_save: "No log to save",
    please_select_file: "Please select firmware file first",
    please_connect_serial: "Please connect serial first",
    please_connect_flash_serial: "Please connect firmware flash serial first",
    flash_serial_not_connected: "Firmware Flash Serial not connected",
    
    // Web Serial API related
    browser_not_supported: "Your browser does not support Web Serial API. Please use Chrome 89+ or Edge 89+ browser.",
    connect_failed: "Connection failed: {0}",
    disconnect_failed: "Disconnection failed: {0}",
    read_error: "Read error: {0}",
    send_error: "Data sending error: {0}",
    hex_length_error: "HEX string length must be even",
    serial_not_connected: "Serial not connected",
    download_failed: "Flash failed: {0}",
    
    // File operations
    file_selected: "File selected: {0} ({1} bytes)",
    start_download_to: "Start flashing firmware to {0}...",
    download_complete: "Firmware flash completed!",
    user_cancelled: "User cancelled flash",
    
    // Firmware download progress messages
    flash_handshaking: "Handshaking connection...",
    flash_handshake_success: "Handshake successful",
    flash_handshake_failed: "Handshake failed, please check device connection",
    flash_download_cancelled: "Flash cancelled",
    waiting_reset: "Waiting for device reboot...",
    flash_setting_baudrate: "Setting baud rate to {0}...",
    flash_baudrate_set: "Baud rate set successfully",
    flash_erasing: "Erasing Flash...",
    flash_erase_progress: "Erase progress: {0}/{1}",
    flash_erase_sector_failed: "Failed to erase sector {0}: {1}",
    flash_erase_complete: "Flash erase complete",
    flash_writing_data: "Writing data...",
    flash_write_progress: "Write progress: {0}/{1}",
    flash_write_block_failed: "Failed to write block {0}: {1}",
    flash_write_complete: "Data write complete",
    flash_verifying_crc: "Verifying data...",
    flash_crc_passed: "CRC verification passed",
    flash_crc_failed_mismatch: "CRC verification failed: local={0}, device={1}",
    flash_crc_failed: "CRC verification failed: {0}",
    flash_rebooting: "Rebooting device...",
    flash_download_complete: "Flash complete",
    flash_download_success: "Flash completed successfully!",
    flash_download_failed: "Flash failed: {0}",
    flash_downloading: "Flash in progress, please wait for completion",
    flash_user_cancelled: "User cancelled operation",
    
    // Log file names
    serial_log_filename: "serial_log_{0}.txt",
    flash_log_filename: "flash_log_{0}.txt",
    
    // Tooltips
    current_tab_connected: "Current {0} function connected to serial",
    disconnect_tab_connection: "Disconnect {0} function serial connection",
    connect_for_tab: "Connect serial for {0} function",
    
    // Copyright information
    powered_by: "Powered by",
    all_rights_reserved: "All rights reserved",
    
    // Debug functions
    debug_mode: "Debug Mode",
    debug_basic: "Basic",
    debug_detailed: "Detailed",
    debug_verbose: "Full",
    export_debug: "Export Debug Log",
    debug_status: "Debug Status",
    debug_level: "Debug Level",
    packets_sent: "Packets Sent",
    packets_received: "Packets Received",
    
    // Function buttons and operations
    fullscreen: "Fullscreen",
    exit_fullscreen: "Exit Fullscreen",
    
    // New: Debug mode status
    debug_mode_enabled: "🔧 Debug mode enabled",
    debug_mode_disabled: "🔧 Debug mode disabled",
    enabled: "Enabled",
    disabled: "Disabled",
    
    // New: Baudrate reset related
    resetting_baudrate_115200: "Resetting serial port baudrate to 115200...",
    baudrate_reset_success: "✅ Serial port baudrate reset to 115200",
    direct_serial_reset_success: "✅ Serial port directly reset to 115200",
    baudrate_reset_failed: "Failed to reset serial port baudrate",
    direct_reset_failed: "Direct serial port reset also failed",
    
    // New: Downloader manager related
    downloader_manager_not_initialized: "Downloader manager not initialized",
    loaded_chip_types: "Loaded {0} supported chip types",
    using_default_chip_support: "Using default chip support (T5AI, T3)",
    unsupported_device_type: "Unsupported device type: {0}",
    unsupported_chip_type: "Unsupported chip type: {0}",
    
    // New: Firmware flash process related
    starting_firmware_download_process: "Starting firmware flash process...",
    starting_device_download: "Starting {0} firmware flash, file size: {1} bytes",
    firmware_download_completed_time: "Firmware flash completed, total time: {0} seconds",
    device_firmware_download_completed: "{0} firmware flash completed",
    initializing_downloader: "Initializing {0} downloader...",
    connecting_device: "Connecting to {0} device...",
    cannot_connect_device: "Cannot connect to {0} device",
    downloading_firmware_to_device: "Starting firmware flash to {0} device...",
    t5ai_firmware_download_completed: "✅ T5AI firmware flash completed",
    firmware_download_completed_device_restarted: "Firmware flash completed, device restarted",
    
    // New: Serial connection related
    serial_not_connected_connect_first: "Serial port not connected, please connect serial device first",
    restoring_serial_reader_writer_failed: "Failed to restore serial reader/writer",
    
    // New: Cleanup and reset related
    cleanup_reset_baudrate: "Cleanup: Resetting serial port baudrate to 115200...",
    cleanup_baudrate_reset_success: "Cleanup: ✅ Serial port baudrate reset to 115200",
    cleanup_reset_failed: "Cleanup: Failed to reset serial port baudrate",
    flashdownloader_reset_baudrate: "FlashDownloader: Resetting serial port baudrate to 115200...",
    flashdownloader_baudrate_reset_success: "FlashDownloader: ✅ Serial port baudrate reset to 115200",
    flashdownloader_direct_reset_success: "FlashDownloader: ✅ Serial port directly reset to 115200",
    flashdownloader_reset_failed: "FlashDownloader: Baudrate reset failed",
    flashdownloader_direct_reset_failed: "FlashDownloader: Direct serial port reset also failed",
    
    // New: Serial connection status messages
    serial_connected_initial_switch: "initial connection, will switch to",
    serial_connected_initial: "initial connection",
    bps: "bps",
    
    // New: Console debug messages (only essential ones for demo)
    console_flash_connect_success: "Firmware flash connected successfully (115200), serial debug connection status:",
    console_flash_connect_failed: "Firmware flash connection failed:",
    console_flash_independent_success: "Firmware flash independent connection successful (115200), serial debug connection status:",
    console_filtered_null_chars: "Filtered {0} 0x00 characters",
    console_language_switched: "Language switched to:",
    console_language_display_updated: "Language display updated to:",
    console_serial_target_device: "Serial target device selection:",
    
    // Serial disconnection handling
    serial_disconnected_unexpectedly: "Serial connection unexpectedly disconnected: {0}",
    
    // System information
    system_info: "System Info",
    system_info_os: "OS",
    system_info_browser: "Browser",
    system_info_web_serial: "Web Serial",
    system_info_platform: "Platform",
    system_info_supported: "Supported",
    system_info_not_supported: "Not Supported",
    
    // Serial Troubleshooting Page
    troubleshooting_title: "Serial Port Troubleshooting Guide",
    troubleshooting_subtitle: "Complete guide to solve serial connection issues",
    back_to_main: "Back to Main",
    no_serial_ports_found: "No serial ports found?",
    serial_troubleshooting_guide: "Serial connection issues? Check troubleshooting guide",
    serial_troubleshooting: "Serial Troubleshooting",
    
    // Quick check list
    quick_check_title: "Quick Check List",
    basic_checks: "Basic Check Items",
    check_browser: "Use Chrome, Edge or other Chromium-based browsers",
    check_cable: "USB data cable connected properly (not charging cable)",
    check_device_power: "Device is properly powered on",
    check_other_software: "Close other software that occupies serial ports",
    
    // Common issues
    common_issues_title: "Common Issues and Solutions",
    issue_no_ports: "Issue 1: No available serial devices",
    issue_no_ports_desc: "Device list is empty after clicking \"Connect Serial\"",
    issue_connection_failed: "Issue 2: Connection failed",
    issue_connection_failed_desc: "Can see device but error occurs when connecting",
    issue_no_data: "Issue 3: Connected but no data",
    issue_no_data_desc: "Serial connection successful but no data received or data display abnormal",
    
    possible_causes: "Possible causes:",
    cause_driver_missing: "Device driver not installed or incorrectly installed",
    cause_cable_issue: "USB cable issue (using charging cable instead of data cable)",
    cause_device_not_recognized: "Device not recognized by system",
    cause_port_occupied: "Serial port occupied by other programs",
    cause_permission_denied: "Insufficient permissions (Linux/macOS)",
    cause_device_busy: "Device is being used by other applications",
    cause_driver_conflict: "Driver conflict or incompatibility",
    cause_baud_rate_mismatch: "Baud rate setting mismatch",
    cause_serial_params_wrong: "Incorrect data bits, stop bits, or parity settings",
    cause_device_not_sending: "Device not sending data",
    cause_flow_control: "Flow control setting issues",
    cause_cable_quality: "Data cable quality issues or poor connection",
    
    // Driver diagnosis
    driver_diagnosis_title: "Driver Issue Diagnosis",
    driver_diagnosis_desc: "Most serial port issues are driver-related, please follow these steps for diagnosis",
    
    // Operating systems
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    
    // Windows related
    windows_check_device_manager: "Step 1: Check Device Manager",
    windows_step1_title: "Open Device Manager",
    windows_step1_desc: "Right-click \"This PC\" → \"Properties\" → \"Device Manager\", or press Win+X and select \"Device Manager\"",
    windows_step2_title: "Find serial devices",
    windows_step2_desc: "Look for the following categories in Device Manager:",
    windows_step3_title: "Identify device status",
    windows_step3_desc: "Check device icon status:",
    
    ports_com_lpt: "Ports (COM & LPT)",
    universal_serial_bus: "Universal Serial Bus controllers",
    other_devices: "Other devices",
    
    device_normal: "✅ Normal: Device name displayed normally",
    device_warning: "⚠️ Warning: Yellow exclamation mark, driver issue",
    device_error: "❌ Error: Red X, device disabled",
    device_unknown: "❓ Unknown: In \"Other devices\", driver not installed",
    
    windows_driver_install: "Step 2: Install drivers",
    windows_manual_install: "Step 3: Manual driver installation",
    
    // Driver descriptions
    ch340_desc: "Most common USB to serial chip",
    cp210x_desc: "Silicon Labs USB to serial chip",
    ftdi_desc: "FTDI USB to serial chip",
    
    download_driver: "Download corresponding driver",
    download_driver_desc: "Download the corresponding driver according to device chip model",
    run_installer: "Run installer",
    run_installer_desc: "Run the downloaded driver installer as administrator",
    restart_computer: "Restart computer",
    restart_computer_desc: "Restart computer after installation to make driver effective",
    verify_installation: "Verify installation",
    verify_installation_desc: "Reconnect device and check if it displays normally in Device Manager",
    
    screenshot_device_manager: "Device Manager screenshot location",
    
    // macOS related
    macos_check_system: "Step 1: Check system information",
    macos_step1_title: "Open System Information",
    macos_step1_desc: "Hold Option key and click Apple menu → \"System Information\"",
    macos_step2_title: "View USB devices",
    macos_step2_desc: "Select \"USB\" on the left to view connected USB devices",
    macos_step3_title: "Check serial devices",
    macos_step3_desc: "Open Terminal and enter command to view serial devices:",
    
    macos_driver_install: "Step 2: Install drivers",
    macos_driver_note: "macOS usually has built-in drivers for most USB to serial chips, but some chips still need manual installation",
    
    ch340_mac_desc: "macOS version CH340 driver",
    cp210x_mac_desc: "macOS version CP210x driver",
    
    // Linux related
    linux_check_system: "Step 1: Check system recognition",
    linux_step1_title: "Check USB devices",
    linux_step1_desc: "Open terminal and enter the following command:",
    linux_step2_title: "Check serial devices",
    linux_step2_desc: "View available serial devices:",
    linux_step3_title: "Check kernel messages",
    linux_step3_desc: "View kernel messages when device is connected:",
    
    linux_permissions: "Step 2: Set permissions",
    linux_add_user_group: "Add user to dialout group",
    linux_add_user_desc: "Execute the following command and re-login:",
    linux_check_permissions: "Check device permissions",
    linux_check_permissions_desc: "Confirm device permission settings:",
    
    // Advanced troubleshooting
    advanced_troubleshooting: "Advanced Troubleshooting",
    hardware_issues: "Hardware Issue Investigation",
    software_conflicts: "Software Conflict Resolution",
    
    try_different_cable: "Try different USB data cable",
    try_different_port: "Try different USB port",
    try_different_computer: "Test device on other computers",
    check_device_power: "Check if device power supply is normal",
    
    close_other_serial_software: "Close other serial debugging software",
    disable_antivirus: "Temporarily disable antivirus software",
    update_browser: "Update browser to latest version",
    clear_browser_cache: "Clear browser cache and data",
    
    // Get help
    get_help_title: "Get Help",
    get_help_desc: "If none of the above methods can solve the problem, please collect the following information and contact technical support:",
    
    help_info_os: "Operating system version",
    help_info_browser: "Browser version",
    help_info_device: "Device model and chip information",
    help_info_error: "Specific error message screenshots",
    help_info_device_manager: "Device Manager screenshots (Windows)",
    
    github_support_desc: "Submit issue report on GitHub",
    
    // TuyaOpen Authorization related
    tuya_auth_title: "TuyaOpen Authorization Code",
    tuya_auth_subtitle: "Write TuyaOpen project authorization information to device",
    uuid_label: "UUID (20 characters):",
    auth_key_label: "AUTH_KEY (32 characters):",
    uuid_placeholder: "Enter 20-character UUID...",
    auth_key_placeholder: "Enter 32-character AUTH_KEY...",
    authorize_btn: "Write Authorization",
    tuya_auth_notice_title: "⚠️ Important Notice",
    tuya_auth_notice_content: "This authorization feature is only applicable to TuyaOpen project authorization code writing, and cannot be used for non-TuyaOpen projects.",
    tuya_auth_additional_info: "Please ensure the device is in authorization mode and the serial port is properly connected before proceeding with authorization.",
    uuid_length_error: "UUID length error! Please enter a 20-character UUID",
    auth_key_length_error: "AUTH_KEY length error! Please enter a 32-character AUTH_KEY",
    uuid_empty_error: "Please enter UUID",
    auth_key_empty_error: "Please enter AUTH_KEY",
    tuya_auth_success: "✅ TuyaOpen authorization information written successfully!",
    tuya_auth_failed: "❌ TuyaOpen authorization information writing failed: {0}",
    tuya_auth_sending: "Sending authorization information...",
    tuya_auth_command_sent: "Authorization command sent: auth {0} {1}",
    
    // Authorization related status information
    tuya_auth_waiting: "Waiting for authorization operation...",
    tuya_auth_connected: "Authorization serial connected",
    tuya_auth_disconnected: "Authorization serial disconnected",
    connect_tuya_auth: "Connect Auth Serial",
    disconnect_tuya_auth: "Disconnect Auth Serial",
    tuya_auth_serial_connected: "TuyaOpen authorization serial connected successfully!",
    tuya_auth_serial_disconnected: "TuyaOpen authorization serial disconnected.",
    tab_tuya_auth_name: "TuyaOpen Auth",
    
    // TuyaOpen License Guide Related
    license_guide: "License Guide",
    license_guide_title: "TuyaOpen License Guide",
    license_guide_subtitle: "Learn about TuyaOpen licenses and how to obtain them",
    
    // What is TuyaOpen Exclusive License
    what_is_license: "What is TuyaOpen Exclusive License",
    license_info: "All versions of TuyaOpen Framework require exclusive licenses to connect to Tuya Cloud properly. Other licenses cannot work normally.",
    supported_frameworks: "Supported TuyaOpen Frameworks",
    c_version: "C Version TuyaOpen",
    arduino_version: "Arduino Version TuyaOpen", 
    lua_version: "Luanode Version TuyaOpen",
    
    // How to Obtain License
    how_to_get: "How to Obtain License",
    method1_title: "Method 1: Buy Pre-burned Modules",
    method1_desc: "Purchase pre-burned TuyaOpen license modules through Tuya Developer Platform. The license is pre-burned in the corresponding module during manufacturing and will not be lost. TuyaOpen reads the license through the `tuya_iot_license_read()` interface at startup. Please confirm whether the current device has a TuyaOpen license burned.",
    method1_advantage: "Advantage: Plug and play, no manual operation required",
    
    method2_title: "Method 2: Tuya Platform Purchase",
    method2_desc: "Purchase TuyaOpen licenses through Tuya Developer Platform, then write them to the module using serial tools.",
    method2_advantage: "Advantage: Official platform, supports bulk purchase",
    visit_platform: "Visit Platform",
    visit_platform_preburn: "Buy Pre-burned Module",
    visit_taobao: "Visit Taobao",
    
    method3_title: "Method 3: Taobao Purchase",
    method3_desc: "Purchase TuyaOpen licenses through Taobao store, then write them to the module using serial tools.",
    method3_advantage: "Advantage: Convenient purchase, flexible payment options",
    
    // Usage Guide
    usage_guide: "Usage Guide",
    check_existing: "Step 1: Check Existing License",
    check_warning: "Please confirm if the current device already has TuyaOpen license burned to avoid duplicate purchase.",
    write_license: "Step 2: Write License",
    write_desc: "If the device has no license burned, you can use the \"TuyaOpen Auth\" function of this tool to write:",
    write_step1: "Connect device to computer",
    write_step2: "Switch to \"TuyaOpen Auth\" tab",
    write_step3: "Connect serial port",
    write_step4: "Enter purchased UUID and AUTH_KEY",
    write_step5: "Click \"Write Auth\" button",
    write_success: "After successful license writing, the device can use TuyaOpen framework to connect to Tuya Cloud normally.",
    
    // FAQ
    faq_title: "Frequently Asked Questions",
    q1: "Q: Can other types of licenses be used?",
    a1: "A: No. TuyaOpen framework can only use TuyaOpen exclusive licenses. Other licenses cannot connect to Tuya Cloud normally.",
    q2: "Q: Will the license be lost?",
    a2: "A: Under normal circumstances, the license will not be lost. Pre-burned module licenses are factory-burned, and manually written licenses are saved in the module's non-volatile storage area.",
    q3: "Q: How to check if device already has a license?",
    a3: "A: You can check by calling the `tuya_iot_license_read()` interface in TuyaOpen program.",
    
    // Technical support
    support_title: "Technical Support",
    support_desc: "If you encounter any issues during use, please get help through the following ways:",
    github_support: "Submit Issue Report"
};

// Export to global
if (typeof window !== 'undefined') {
    window.i18nLanguages = window.i18nLanguages || {};
    window.i18nLanguages.en = en;
}