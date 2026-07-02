// 繁體中文 (zh-TW)
const zhTw = {
    // 頁面標題和描述
    title: "TuyaOpen串列工具",
    subtitle: "基於Chrome Web Serial API的一站式開發者工具",
    
    // 瀏覽器要求和測試版本說明
    browser_requirement: "此工具需要Chrome內核瀏覽器支援，其他瀏覽器無法正常工作。請使用Chrome、Edge或其他基於Chromium的瀏覽器。",
    beta_notice: "如在使用過程中遇到問題，請通過提交issue到",
    repository_link: "TuyaOpen-WebTools 倉庫",
    
    // 專案相關連結
    project_info: "這個專案是TuyaOpen的一部分，相關專案包括：",
    tuya_open_project: "TuyaOpen",
    arduino_project: "Arduino-TuyaOpen",
    lua_project: "Luanode-TuyaOpen",
    tools_project: "TuyaOpen-WebTools",
    
    // Tab標籤
    tab_serial: "串列除錯",
    tab_flash: "韌體燒錄",
    
    // 控制面板
    control_title: "串列連接控制",
    flash_connection_control: "韌體燒錄串列連接",
    connect: "連接串列",
    connect_flash: "連接韌體燒錄串列",
    disconnect: "斷開連接",
    disconnect_flash: "斷開韌體燒錄連接",
    status_disconnected: "未連接",
    status_connected: "已連接",
    serial_target_device: "目標設備:",
    custom_device: "自定義",
    baud_rate: "波特率:",
    data_bits: "資料位:",
    stop_bits: "停止位:",
    parity: "校驗位:",
    parity_none: "無",
    parity_even: "偶校驗",
    parity_odd: "奇校驗",
    
    // 串口調試
    receive_data: "接收數據",
    save_log: "保存日誌",
    auto_scroll: "自動滾動",
    show_timestamp: "顯示時間戳",
    waiting_data: "等待串列資料...",
    received: "接收",
    sent: "發送",
    bytes: "位元組",
    
    // 錯誤分析相關
    error_analysis: "錯誤日誌分析",
    clear_analysis: "清空分析（重置檢測）",
    auto_analysis: "自動分析",
    no_errors_detected: "暫未檢測到錯誤...",
    test_error_analysis: "測試錯誤分析",
    
    send_data: "發送資料",
    hex_mode: "HEX模式",
    add_newline: "新增換行符",
    input_placeholder: "輸入要發送的資料...",
    input_placeholder_hex: "輸入十六進位資料 (例如: FF 01 02 03)...",
    send: "發送",
    
    quick_send: "快捷發送:",
    manage: "管理命令",
    no_quick_commands: "暫無快捷命令。點選\"管理命令\"按鈕可新增常用AT指令、調試命令等，提高調試效率",
    
    // 韌體燒錄
    flash_config: "韌體燒錄設定",
    target_device: "目標裝置:",
    esp32_flash_address: "ESP32-Series 燒錄地址:",
    complete_firmware: "0x0000 (完整韌體包)",
    custom_address: "自訂地址...",
    custom_address_placeholder: "0x10000",
    select_file: "選擇韌體檔案",
    no_file_selected: "未選擇檔案，可點擊 \"選擇韌體檔案\"手動開啟燒錄檔案或拖動燒錄檔案至檔案框",
    file_size: "檔案大小",
    start_download: "開始下載",
    stop_download: "停止下載",
    preparing: "準備中...",
    downloaded: "已下載",
    burn_log: "燒錄日誌",
    clear_log: "清空日誌",
    waiting_download: "等待下載操作...",
    
    // 快捷命令管理
    quick_send_management: "快捷發送管理",
    add_new_command: "新增新命令",
    display_name: "顯示名稱:",
    name_example: "例如: 復位",
    send_content: "發送內容:",
    content_example: "例如: AT+RST",
    add: "新增",
    existing_commands: "已有命令",
    no_commands: "暫無快捷命令",
    reset_default: "恢復預設",
    close: "關閉",
    
    // 錯誤資訊
    error: "錯誤",
    
    // 系統訊息
    serial_connected: "串列連接成功！",
    serial_disconnected: "串列已斷開連接。",
    flash_serial_connected: "韌體燒錄串列連接成功！",
    flash_serial_disconnected: "韌體燒錄串列已斷開連接。",
    switch_to_tab: "切換到{0}功能，串列連接已斷開",
    tab_serial_name: "串列除錯",
    tab_flash_name: "韌體燒錄",
    
    // 確認對話方塊
    switch_tab_confirm: "⚠️ 串列互斥提醒\n\n當前{0}功能正在使用串列連接。\n{0}和{1}功能不能同時使用串列。\n\n切換到{1}功能將：\n• 自動斷開當前串列連接\n• 停止正在進行的操作\n\n確定要切換嗎？",
    delete_command_confirm: "確定要刪除這個快捷命令嗎？",
    reset_commands_confirm: "確定要恢復預設的快捷命令嗎？這將刪除所有自訂命令。",
    
    // 驗證訊息
    fill_complete_info: "請填寫完整的命令名稱和內容",
    command_name_exists: "命令名稱已存在，請使用其他名稱",
    no_data_to_save: "沒有資料可儲存",
    no_log_to_save: "沒有日誌可儲存",
    please_select_file: "請先選擇韌體檔案",
    please_connect_serial: "請先連接串列",
    please_connect_flash_serial: "請先連接韌體燒錄串列",
    flash_serial_not_connected: "韌體燒錄串列未連接",
    
    // Web Serial API 相關
    browser_not_supported: "您的瀏覽器不支援Web Serial API。請使用Chrome 89+或Edge 89+瀏覽器。",
    connect_failed: "連接失敗: {0}",
    disconnect_failed: "斷開連接失敗: {0}",
    read_error: "讀取資料錯誤: {0}",
    send_error: "發送資料錯誤: {0}",
    hex_length_error: "HEX字串長度必須是偶數",
    serial_not_connected: "串列未連接",
    download_failed: "下載失敗: {0}",
    
    // 檔案操作
    file_selected: "選擇檔案: {0} ({1} 位元組)",
    start_download_to: "開始下載韌體到 {0}...",
    download_complete: "韌體燒錄完成！",
    user_cancelled: "使用者取消下載",
    
    // 韌體下載進度訊息
    flash_handshaking: "正在握手連接...",
    flash_handshake_success: "握手成功",
    flash_handshake_failed: "握手失敗，請檢查裝置連接",
    flash_download_cancelled: "下載已取消",
    waiting_reset: "等待裝置重啟...",
    flash_setting_baudrate: "設定鮑率到 {0}...",
    flash_baudrate_set: "鮑率設定完成",
    flash_erasing: "正在擦除Flash...",
    flash_erase_progress: "擦除進度: {0}/{1}",
    flash_erase_sector_failed: "擦除扇區 {0} 失敗: {1}",
    flash_erase_complete: "Flash擦除完成",
    flash_writing_data: "正在寫入資料...",
    flash_write_progress: "寫入進度: {0}/{1}",
    flash_write_block_failed: "寫入區塊 {0} 失敗: {1}",
    flash_write_complete: "資料寫入完成",
    flash_verifying_crc: "正在校驗資料...",
    flash_crc_passed: "CRC校驗通過",
    flash_crc_failed_mismatch: "CRC校驗失敗: 本地={0}, 裝置={1}",
    flash_crc_failed: "CRC校驗失敗: {0}",
    flash_rebooting: "正在重啟裝置...",
    flash_download_complete: "下載完成",
    flash_download_success: "下載成功完成！",
    flash_download_failed: "下載失敗: {0}",
    flash_downloading: "正在下載中，請等待完成",
    flash_user_cancelled: "使用者取消操作",
    
    // 日誌檔案名
    serial_log_filename: "串列日誌_{0}.txt",
    flash_log_filename: "韌體日誌_{0}.txt",
    
    // 工具提示
    current_tab_connected: "當前{0}功能已連接串列",
    disconnect_tab_connection: "斷開{0}功能的串列連接",
    connect_for_tab: "連接串列用於{0}功能",
    
    // 版權資訊
    powered_by: "基於",
    all_rights_reserved: "保留所有權利",
    
    // 調試功能
    debug_mode: "調試模式",
    debug_basic: "基礎",
    debug_detailed: "詳細",
    debug_verbose: "完整",
    export_debug: "匯出調試日誌",
    debug_status: "調試狀態",
    debug_level: "調試級別",
    packets_sent: "發送包數",
    packets_received: "接收包數",
    
    // 功能按鈕和操作
    fullscreen: "全螢幕顯示",
    exit_fullscreen: "退出全螢幕",
    
    // 新增：除錯模式狀態
    debug_mode_enabled: "🔧 除錯模式已啟用",
    debug_mode_disabled: "🔧 除錯模式已停用",
    enabled: "啟用",
    disabled: "停用",
    
    // 新增：波特率重置相關
    resetting_baudrate_115200: "重置串口波特率到115200...",
    baudrate_reset_success: "✅ 串口波特率已重置到115200",
    direct_serial_reset_success: "✅ 串口已直接重置到115200",
    baudrate_reset_failed: "重置串口波特率失敗",
    direct_reset_failed: "直接重置串口也失敗",
    
    // 新增：下載管理器相關
    downloader_manager_not_initialized: "下載管理器未初始化",
    loaded_chip_types: "已載入{0}種支援的晶片類型",
    using_default_chip_support: "使用預設晶片支援 (T5AI, T3)",
    unsupported_device_type: "不支援的裝置類型: {0}",
    unsupported_chip_type: "不支援的晶片類型: {0}",
    
    // 新增：韌體下載程序相關
    starting_firmware_download_process: "開始韌體下載程序...",
    starting_device_download: "開始{0}裝置下載，檔案大小: {1} 位元組",
    firmware_download_completed_time: "韌體下載完成！總時間: {0}毫秒",
    device_firmware_download_completed: "{0}裝置韌體下載完成",
    initializing_downloader: "初始化{0}下載器...",
    connecting_device: "連接{0}裝置...",
    cannot_connect_device: "無法連接{0}裝置",
    downloading_firmware_to_device: "下載韌體到{0}裝置...",
    t5ai_firmware_download_completed: "T5AI韌體下載完成",
    firmware_download_completed_device_restarted: "韌體下載完成，裝置重新啟動...",
    serial_not_connected_connect_first: "串列埠未連接，請先連接串列裝置",
    restoring_serial_reader_writer_failed: "恢復串列埠reader/writer失敗",
    cleanup_reset_baudrate: "清理：重置波特率...",
    cleanup_baudrate_reset_success: "清理：波特率重置成功",
    cleanup_reset_failed: "清理：重置失敗",
    flashdownloader_reset_baudrate: "FlashDownloader：重置波特率到115200...",
    flashdownloader_baudrate_reset_success: "FlashDownloader：✅ 波特率成功重置到115200",
    flashdownloader_direct_reset_success: "FlashDownloader：✅ 串列埠直接重置也成功",
    flashdownloader_reset_failed: "FlashDownloader：波特率重置失敗",
    
    // 新增：串列連接狀態訊息
    serial_connected_initial_switch: "初始連接，將切換到",
    serial_connected_initial: "初始連接",
    bps: "bps",
    
    // 系統資訊
    system_info: "系統資訊",
    system_info_os: "作業系統",
    system_info_browser: "瀏覽器",
    system_info_web_serial: "Web Serial",
    system_info_platform: "平台",
    system_info_supported: "支援",
    system_info_not_supported: "不支援",
    
    // 串列斷線處理
    serial_disconnected_unexpectedly: "串列連接意外斷開: {0}",
    
    // 串列埠故障排除頁面
    troubleshooting_title: "串列埠故障排除指南",
    troubleshooting_subtitle: "解決串列連接問題的完整指南",
    back_to_main: "返回主頁",
    no_serial_ports_found: "沒有找到串列埠？",
    serial_troubleshooting_guide: "串列埠連接問題？查看故障排除指南",
    serial_troubleshooting: "串列埠故障排除",
    
    // 快速檢查清單
    quick_check_title: "快速檢查清單",
    basic_checks: "基本檢查項目",
    check_browser: "使用Chrome、Edge或其他基於Chromium的瀏覽器",
    check_cable: "USB資料線正確連接（非充電線）",
    check_device_power: "裝置正確供電",
    check_other_software: "關閉其他佔用串列埠的軟體",
    
    // 常見問題
    common_issues_title: "常見問題與解決方案",
    issue_no_ports: "問題1：沒有可用的串列裝置",
    issue_no_ports_desc: "點選「連接串列」後裝置清單為空",
    issue_connection_failed: "問題2：連接失敗",
    issue_connection_failed_desc: "裝置可見但連接時發生錯誤",
    issue_no_data: "問題3：連接成功但無資料",
    issue_no_data_desc: "串列連接成功但未接收到資料或資料顯示異常",
    
    possible_causes: "可能原因：",
    cause_driver_missing: "裝置驅動程式未安裝或安裝不正確",
    cause_cable_issue: "USB線材問題（使用充電線而非資料線）",
    cause_device_not_recognized: "裝置未被系統識別",
    cause_port_occupied: "串列埠被其他程式佔用",
    cause_permission_denied: "權限不足（Linux/macOS）",
    cause_device_busy: "裝置被其他應用程式使用",
    cause_driver_conflict: "驅動程式衝突或不相容",
    cause_baud_rate_mismatch: "波特率設定不匹配",
    cause_serial_params_wrong: "資料位、停止位、校驗位設定錯誤",
    cause_device_not_sending: "裝置未發送資料",
    cause_flow_control: "流量控制設定問題",
    cause_cable_quality: "資料線品質問題或接觸不良",
    
    // 驅動程式問題診斷
    driver_diagnosis_title: "驅動程式問題診斷",
    driver_diagnosis_desc: "大部分串列埠問題都與驅動程式有關，請按照以下步驟進行診斷",
    
    // 作業系統
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    
    // Windows相關
    windows_check_device_manager: "步驟1：檢查裝置管理員",
    windows_step1_title: "開啟裝置管理員",
    windows_step1_desc: "右鍵點選「本機」→「內容」→「裝置管理員」，或按Win+X選擇「裝置管理員」",
    windows_step2_title: "尋找串列裝置",
    windows_step2_desc: "在裝置管理員中尋找以下類別：",
    windows_step3_title: "識別裝置狀態",
    windows_step3_desc: "檢查裝置圖示狀態：",
    
    ports_com_lpt: "連接埠 (COM 和 LPT)",
    universal_serial_bus: "通用序列匯流排控制器",
    other_devices: "其他裝置",
    
    device_normal: "✅ 正常：裝置名稱正常顯示",
    device_warning: "⚠️ 警告：黃色驚嘆號，驅動程式問題",
    device_error: "❌ 錯誤：紅色X，裝置已停用",
    device_unknown: "❓ 未知：在「其他裝置」中，驅動程式未安裝",
    
    windows_driver_install: "步驟2：安裝驅動程式",
    windows_manual_install: "步驟3：手動安裝驅動程式",
    
    // 驅動程式說明
    ch340_desc: "最常見的USB轉串列晶片",
    cp210x_desc: "Silicon Labs USB轉串列晶片",
    ftdi_desc: "FTDI USB轉串列晶片",
    
    download_driver: "下載對應驅動程式",
    download_driver_desc: "根據裝置晶片型號下載對應驅動程式",
    run_installer: "執行安裝程式",
    run_installer_desc: "以管理員身分執行下載的驅動程式安裝程式",
    restart_computer: "重新啟動電腦",
    restart_computer_desc: "安裝完成後重新啟動電腦以啟用驅動程式",
    verify_installation: "驗證安裝",
    verify_installation_desc: "重新連接裝置並檢查是否在裝置管理員中正常顯示",
    
    screenshot_device_manager: "裝置管理員截圖位置",
    
    // macOS相關
    macos_check_system: "步驟1：檢查系統資訊",
    macos_step1_title: "開啟系統資訊",
    macos_step1_desc: "按住Option鍵並點選Apple選單→「系統資訊」",
    macos_step2_title: "檢視USB裝置",
    macos_step2_desc: "在左側選擇「USB」以檢視已連接的USB裝置",
    macos_step3_title: "檢查串列裝置",
    macos_step3_desc: "開啟終端機並輸入指令檢視串列裝置：",
    
    macos_driver_install: "步驟2：安裝驅動程式",
    macos_driver_note: "macOS通常內建大部分USB轉串列驅動程式，但某些晶片仍需手動安裝",
    
    ch340_mac_desc: "macOS用CH340驅動程式",
    cp210x_mac_desc: "macOS用CP210x驅動程式",
    
    // Linux相關
    linux_check_system: "步驟1：檢查系統識別",
    linux_step1_title: "檢查USB裝置",
    linux_step1_desc: "開啟終端機並輸入以下指令：",
    linux_step2_title: "檢查串列裝置",
    linux_step2_desc: "檢視可用的串列裝置：",
    linux_step3_title: "檢查核心訊息",
    linux_step3_desc: "檢視連接裝置時的核心訊息：",
    
    linux_permissions: "步驟2：設定權限",
    linux_add_user_group: "將使用者加入dialout群組",
    linux_add_user_desc: "執行以下指令並重新登入：",
    linux_check_permissions: "檢查裝置權限",
    linux_check_permissions_desc: "確認裝置權限設定：",
    
    // 進階故障排除
    advanced_troubleshooting: "進階故障排除",
    hardware_issues: "硬體問題排查",
    software_conflicts: "軟體衝突解決",
    
    try_different_cable: "嘗試不同的USB資料線",
    try_different_port: "嘗試不同的USB連接埠",
    try_different_computer: "在其他電腦上測試裝置",
    check_device_power: "檢查裝置供電是否正常",
    
    close_other_serial_software: "關閉其他串列除錯軟體",
    disable_antivirus: "暫時停用防毒軟體",
    update_browser: "更新瀏覽器到最新版本",
    clear_browser_cache: "清除瀏覽器快取和資料",
    
    // 取得協助
    get_help_title: "取得協助",
    get_help_desc: "如果以上方法都無法解決問題，請收集以下資訊並聯絡技術支援：",
    
    help_info_os: "作業系統版本",
    help_info_browser: "瀏覽器版本",
    help_info_device: "裝置型號和晶片資訊",
    help_info_error: "具體錯誤訊息截圖",
    help_info_device_manager: "裝置管理員截圖（Windows）",
    
    github_support_desc: "在GitHub上提交問題報告",
    
    // 新增：TuyaOpen授權相關
    tab_tuya_auth: "TuyaOpen授權",
    tuya_auth_title: "TuyaOpen授權碼寫入",
    tuya_auth_subtitle: "向裝置寫入TuyaOpen專案授權資訊",
    uuid_label: "UUID (20字元):",
    auth_key_label: "AUTH_KEY (32字元):",
    uuid_placeholder: "請輸入20字元的UUID...",
    auth_key_placeholder: "請輸入32字元的AUTH_KEY...",
    authorize_btn: "寫入授權",
    tuya_auth_notice_title: "⚠️ 重要提示",
    tuya_auth_notice_content: "目前授權功能僅適用於TuyaOpen工程的授權碼寫入，非TuyaOpen工程無法使用。",
    tuya_auth_additional_info: "請確保裝置已進入授權模式，並正確連接串列埠後再進行授權操作。",
    uuid_length_error: "UUID長度錯誤！請輸入20字元的UUID",
    auth_key_length_error: "AUTH_KEY長度錯誤！請輸入32字元的AUTH_KEY",
    uuid_empty_error: "請輸入UUID",
    auth_key_empty_error: "請輸入AUTH_KEY",
    tuya_auth_success: "✅ TuyaOpen授權資訊寫入成功！",
    tuya_auth_failed: "❌ TuyaOpen授權資訊寫入失敗: {0}",
    tuya_auth_sending: "正在發送授權資訊...",
    tuya_auth_command_sent: "授權指令已發送: auth {0} {1}",
    
    // 授權相關狀態資訊
    tuya_auth_waiting: "等待授權操作...",
    tuya_auth_connected: "授權串列埠已連接",
    tuya_auth_disconnected: "授權串列埠已斷開",
    connect_tuya_auth: "連接授權串列埠",
    disconnect_tuya_auth: "斷開授權串列埠",
    tuya_auth_serial_connected: "TuyaOpen授權串列埠連接成功！",
    tuya_auth_serial_disconnected: "TuyaOpen授權串列埠已斷開連接。",
    tab_tuya_auth_name: "TuyaOpen授權",
    
    // TuyaOpen授權碼指南相關
    license_guide: "授權碼取得指南",
    license_guide_title: "TuyaOpen授權碼取得指南",
    license_guide_subtitle: "了解TuyaOpen授權碼及取得方式",
    
    // 什麼是TuyaOpen專用授權碼
    what_is_license: "什麼是TuyaOpen專用授權碼",
    license_info: "TuyaOpen Framework的所有版本均需要專用授權碼才能正常連接塗鴉雲，使用其他授權碼無法正常工作。",
    supported_frameworks: "支援的TuyaOpen框架",
    c_version: "C 版 TuyaOpen",
    arduino_version: "Arduino 版 TuyaOpen", 
    lua_version: "Luanode 版 TuyaOpen",
    
    // 如何取得授權碼
    how_to_get: "如何取得授權碼",
    method1_title: "方式1：購買預燒錄模組",
    method1_desc: "通過涂鴉開發者平台購買已燒錄 TuyaOpen 授權碼模組。該授權碼已經在出廠時燒錄在對應模組中，且不會丟失。TuyaOpen 在啟動時通過 `tuya_iot_license_read()` 接口讀取授權碼。請確認當前設備是否為燒錄了 TuyaOpen 授權碼。",
    method1_advantage: "優勢：隨插即用，無需手動操作",
    
    method2_title: "方式2：涂鴉平台購買",
    method2_desc: "通過涂鴉開發者平台購買TuyaOpen授權碼，然後通過串口工具寫入到模組中。",
    method2_advantage: "優勢：官方平台，支援批量購買",
    visit_platform: "訪問平台",
    visit_platform_preburn: "購買預燒錄模組",
    
    method3_title: "方式3：淘寶購買",
    method3_desc: "通過淘寶店鋪購買TuyaOpen授權碼，然後通過串口工具寫入到模組中。",
    method3_advantage: "優勢：購買便捷，支付方式靈活",
    visit_taobao: "訪問淘寶",
    
    // 使用指南
    usage_guide: "使用指南",
    check_existing: "步驟1：檢查現有授權碼",
    check_warning: "請先確認當前設備是否已經燒錄了TuyaOpen授權碼，避免重複購買。",
    write_license: "步驟2：寫入授權碼",
    write_desc: "如果設備未燒錄授權碼，可以使用本工具的「TuyaOpen授權」功能進行寫入：",
    write_step1: "連接設備到電腦",
    write_step2: "切換到「TuyaOpen授權」標籤頁",
    write_step3: "連接串口",
    write_step4: "輸入購買的UUID和AUTH_KEY",
    write_step5: "點擊「寫入授權」按鈕",
    write_success: "授權碼寫入成功後，設備就可以正常使用TuyaOpen框架連接塗鴉雲了。",
    
    // 常見問題
    faq_title: "常見問題",
    q1: "Q: 其他類型的授權碼可以用嗎？",
    a1: "A: 不可以。TuyaOpen框架只能使用TuyaOpen專用授權碼，其他授權碼無法正常連接塗鴉雲。",
    q2: "Q: 授權碼會遺失嗎？",
    a2: "A: 正常情況下授權碼不會遺失。預燒錄模組的授權碼是出廠燒錄的，手動寫入的授權碼會保存在模組的非易失性存儲區域。",
    q3: "Q: 如何檢查設備是否已有授權碼？",
    a3: "A: 可以通過TuyaOpen程序調用 `tuya_iot_license_read()` 接口來檢查。",
    
    // 技術支援
    support_title: "技術支援",
    support_desc: "如果在使用過程中遇到問題，請通過以下方式獲取幫助：",
    github_support: "提交問題報告"
};

// 導出到全局
if (typeof window !== 'undefined') {
    window.i18nLanguages = window.i18nLanguages || {};
    window.i18nLanguages['zh-tw'] = zhTw;
}