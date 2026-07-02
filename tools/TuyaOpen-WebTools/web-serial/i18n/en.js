// English translation
const en = {
    // Basic information
    title: 'TuyaOpen Serial Tool',
    subtitle: 'One-stop development tool based on Chrome Web Serial API',
    
    // Tab navigation
    tab_serial: '📡 Serial Debug',
    tab_flash: '💾 Firmware Flash',
    tab_tuya_auth: '🔐 TuyaOpen Authorization',
    
    // Browser support
    browser_requirement: 'This tool requires Chrome-based browsers. Other browsers cannot work properly. Please use Chrome, Edge or other Chromium-based browsers.',
    
    // Serial connection control
    control_title: '🔧 Serial Connection Control',
    baud_rate: 'Baud Rate',
    data_bits: 'Data Bits',
    stop_bits: 'Stop Bits',
    parity: 'Parity',
    parity_none: 'None',
    parity_even: 'Even',
    parity_odd: 'Odd',
    connect: 'Connect Serial',
    disconnect: 'Disconnect',
    status_disconnected: 'Disconnected',
    status_connected: 'Connected',
    status_connecting: 'Connecting',
    status_error: 'Connection Error',
    
    // Troubleshooting
    serial_troubleshooting: 'Serial Troubleshooting',
    
    // Data reception
    receive_data: '📨 Receive Data',
    clear_log: 'Clear Log',
    save_log: 'Save Log',
    show_timestamp: 'Show Timestamp',
    auto_scroll: 'Auto Scroll',
    fullscreen: 'Fullscreen',
    exit_fullscreen: 'Exit Fullscreen',
    waiting_data: 'Waiting for serial data...',
    received: 'Received',
    sent: 'Sent',
    bytes: 'bytes',
    
    // Error analysis related
    error_analysis: 'Error Log Analysis',
    clear_analysis: 'Clear Analysis (Reset Detection)',
    auto_analysis: 'Auto Analysis',
    no_errors_detected: 'No errors detected...',
    test_error_analysis: 'Test Error Analysis',
    
    // Data sending
    send_data: '📤 Send Data',
    hex_mode: 'HEX Mode',
    add_newline: 'Add Newline',
    input_placeholder: 'Enter data to send...',
    send: 'Send',
    
    // Quick send
    quick_send: 'Quick Send',
    manage: 'Manage',
    no_quick_commands: 'No quick commands, click "Manage" to add',
    
    // Quick send management
    quick_send_management: '⚙️ Quick Send Management',
    add_new_command: 'Add New Command',
    display_name: 'Display Name',
    name_example: 'e.g.: Reset',
    send_content: 'Send Content',
    content_example: 'e.g.: AT+RST',
    add: 'Add',
    existing_commands: 'Existing Commands',
    no_commands: 'No quick commands',
    reset_default: 'Reset Default',
    close: 'Close',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    
    // Firmware flash
    flash_config: '💾 Firmware Flash Config',
    target_device: 'Target Device',
    select_file: 'Select Firmware File',
    no_file_selected: 'No file selected, click "Select Firmware File" to manually open a flash file or drag the flash file to the file box',
    file_size: 'File Size',
    start_download: 'Start Flash',
    stop_download: 'End Flash',
    auto_disconnect_after_flash: 'Auto disconnect after flash complete',
    preparing: 'Preparing...',
    downloaded: 'Flashed',
    burn_log: '📋 Flash Log',
    waiting_download: 'Waiting for flash operation...',
    
    // TuyaOpen authorization
    tuya_auth_title: '🔐 TuyaOpen Authorization Code Writing',
    tuya_auth_subtitle: 'Write TuyaOpen project authorization information to device',
    license_guide: 'Authorization Code Guide',
    uuid_label: 'UUID (20 characters)',
    uuid_placeholder: 'Enter 20-character UUID...',
    auth_key_label: 'AUTH_KEY (32 characters)',
    auth_key_placeholder: 'Enter 32-character AUTH_KEY...',
    authorize_btn: 'Write Authorization',
    connect_tuya_auth: 'Connect Authorization Serial',
    disconnect_tuya_auth: 'Disconnect Authorization Serial',
    tuya_auth_waiting: 'Waiting for authorization operation...',
    tuya_auth_notice_title: '⚠️ Important Notice',
    tuya_auth_notice_content: 'Current authorization function is only applicable to TuyaOpen project authorization code writing, non-TuyaOpen projects cannot use it.',
    tuya_auth_additional_info: 'Please ensure the device has entered authorization mode and the serial port is correctly connected before performing authorization operations.',
    
    // Device target selection
    serial_target_device: 'Target Device',
    custom_device: 'Custom',
    
    // Version and copyright
    powered_by: 'Powered by',
    all_rights_reserved: 'All rights reserved',
    
    // Project information
    project_info: 'This project is part of TuyaOpen, related projects include:',
    tuya_open_project: 'TuyaOpen',
    arduino_project: 'Arduino-TuyaOpen',
    lua_project: 'Luanode-TuyaOpen',
    tools_project: 'TuyaOpen-WebTools',
    
    // Beta notice
    beta_notice: 'Current function is in beta version, please submit issues to',
    repository_link: 'TuyaOpen-WebTools Repository',
    
    // Error messages
    error: '❌ Error',
    
    // Debug related
    debug_mode: '🔧 Debug Mode',
    debug_status: 'Debug Status',
    disabled: 'Disabled',
    enabled: 'Enabled',
    
    // Console debug information
    console_raw_received_data: '[Debug] Received raw data:',
    console_data_char_codes: '[Debug] Data character codes:',
    console_contains_ansi_escape: '[Debug] Contains ANSI escape sequences:',
    console_contains_missing_escape: '[Debug] Contains incomplete escape sequences:',
    console_processed_safe_text: '[Debug] Processed safe text:',
    console_filtered_null_chars: '[Debug] Filtered {0} null characters (0x00)',
    
    // Serial error messages
    serial_not_supported: 'Your browser does not support Web Serial API. Please use Chrome 89+ or other supported browsers.',
    serial_not_connected: 'Serial not connected',
    send_error: 'Failed to send data: {0}',
    hex_length_error: 'HEX string length must be even',
    download_progress: 'Flash progress: {0}%',
    download_speed: 'Flash speed: {0}',
    
    // Other messages
    connection_lost: 'Serial connection lost',
    reconnect_prompt: 'Do you want to try reconnecting?',
    yes: 'Yes',
    no: 'No'
};