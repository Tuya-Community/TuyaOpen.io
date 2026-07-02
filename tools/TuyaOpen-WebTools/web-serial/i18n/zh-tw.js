// 繁體中文翻譯
const zhTw = {
    // 基礎資訊
    title: 'TuyaOpen串口工具',
    subtitle: '基於Chrome Web Serial API的一站式開發者工具',
    
    // Tab導航
    tab_serial: '📡 串口調試',
    tab_flash: '💾 韌體燒錄',
    tab_tuya_auth: '🔐 TuyaOpen授權',
    
    // 瀏覽器支援
    browser_requirement: '此工具需要Chrome內核瀏覽器支援，其他瀏覽器無法正常工作。請使用Chrome、Edge或其他基於Chromium的瀏覽器。',
    
    // 串口連接控制
    control_title: '🔧 串口連接控制',
    baud_rate: '鮑率',
    data_bits: '資料位',
    stop_bits: '停止位',
    parity: '校驗位',
    parity_none: '無',
    parity_even: '偶校驗',
    parity_odd: '奇校驗',
    connect: '連接串口',
    disconnect: '斷開連接',
    status_disconnected: '未連接',
    status_connected: '已連接',
    status_connecting: '連接中',
    status_error: '連接錯誤',
    
    // 故障排除
    serial_troubleshooting: '串口故障排除',
    
    // 資料接收
    receive_data: '📨 接收資料',
    clear_log: '清空日誌',
    save_log: '保存日誌',
    show_timestamp: '顯示時間戳',
    auto_scroll: '自動滾動',
    fullscreen: '全屏顯示',
    exit_fullscreen: '退出全屏',
    waiting_data: '等待串口資料...',
    received: '接收',
    sent: '發送',
    bytes: '位元組',
    
    // 錯誤分析相關
    error_analysis: '錯誤日誌分析',
    clear_analysis: '清空分析（重置檢測）',
    auto_analysis: '自動分析',
    no_errors_detected: '暫未檢測到錯誤...',
    test_error_analysis: '測試錯誤分析',
    
    // 資料發送
    send_data: '📤 發送資料',
    hex_mode: 'HEX模式',
    add_newline: '添加換行符',
    input_placeholder: '輸入要發送的資料...',
    send: '發送',
    
    // 快捷發送
    quick_send: '快捷發送',
    manage: '管理',
    no_quick_commands: '暫無快捷命令，點擊"管理"按鈕添加',
    
    // 快捷發送管理
    quick_send_management: '⚙️ 快捷發送管理',
    add_new_command: '添加新命令',
    display_name: '顯示名稱',
    name_example: '例如: 復位',
    send_content: '發送內容',
    content_example: '例如: AT+RST',
    add: '添加',
    existing_commands: '已有命令',
    no_commands: '暫無快捷命令',
    reset_default: '恢復預設',
    close: '關閉',
    edit: '編輯',
    delete: '刪除',
    save: '保存',
    cancel: '取消',
    
    // 韌體燒錄
    flash_config: '💾 韌體燒錄配置',
    target_device: '目標設備',
    select_file: '選擇韌體檔案',
    no_file_selected: '未選擇檔案，可點擊 "選擇韌體檔案"手動開啟燒錄檔案或拖動燒錄檔案至檔案框',
    file_size: '檔案大小',
    start_download: '開始燒錄',
    stop_download: '結束燒錄',
    auto_disconnect_after_flash: '完成燒錄後自動斷開串口',
    preparing: '準備中...',
    downloaded: '已燒錄',
    download_log: '📋 燒錄日誌',
    waiting_download: '等待燒錄操作...',
    
    // TuyaOpen授權
    tuya_auth_title: '🔐 TuyaOpen授權碼寫入',
    tuya_auth_subtitle: '向設備寫入TuyaOpen項目授權資訊',
    license_guide: '授權碼獲取指南',
    uuid_label: 'UUID (20字符)',
    uuid_placeholder: '請輸入20字符的UUID...',
    auth_key_label: 'AUTH_KEY (32字符)',
    auth_key_placeholder: '請輸入32字符的AUTH_KEY...',
    authorize_btn: '寫入授權',
    connect_tuya_auth: '連接授權串口',
    disconnect_tuya_auth: '斷開授權串口',
    tuya_auth_waiting: '等待授權操作...',
    tuya_auth_notice_title: '⚠️ 重要提示',
    tuya_auth_notice_content: '當前授權功能只適用於TuyaOpen工程的授權碼寫入，非TuyaOpen工程無法使用。',
    tuya_auth_additional_info: '請確保設備已進入授權模式，並正確連接串口後再進行授權操作。',
    
    // 設備目標選擇
    serial_target_device: '目標設備',
    custom_device: '自定義',
    
    // 版本和版權
    powered_by: '基於',
    all_rights_reserved: '保留所有權利',
    
    // 項目資訊
    project_info: '這個項目是TuyaOpen的一部分，相關項目包括：',
    tuya_open_project: 'TuyaOpen',
    arduino_project: 'Arduino-TuyaOpen',
    lua_project: 'Luanode-TuyaOpen',
    tools_project: 'TuyaOpen-WebTools',
    
    // 測試版本說明
    beta_notice: '當前功能屬於測試版本，遇到問題請透過提交issue到',
    repository_link: 'TuyaOpen-WebTools 倉庫',
    
    // 錯誤資訊
    error: '❌ 錯誤',
    
    // 調試相關
    debug_mode: '🔧 調試模式',
    debug_status: '調試狀態',
    disabled: '禁用',
    enabled: '啟用',
    
    // 控制台調試資訊
    console_raw_received_data: '[調試] 接收到原始資料:',
    console_data_char_codes: '[調試] 資料字符編碼:',
    console_contains_ansi_escape: '[調試] 包含ANSI轉義序列:',
    console_contains_missing_escape: '[調試] 包含不完整轉義序列:',
    console_processed_safe_text: '[調試] 處理後的安全文本:',
    console_filtered_null_chars: '[調試] 過濾了 {0} 個空字符(0x00)',
    
    // 串口錯誤資訊
    serial_not_supported: '您的瀏覽器不支援Web Serial API。請使用Chrome 89+或其他支援的瀏覽器。',
    serial_not_connected: '串口未連接',
    send_error: '發送資料失敗: {0}',
    hex_length_error: 'HEX字串長度必須為偶數',
    download_progress: '燒錄進度: {0}%',
    download_speed: '燒錄速度: {0}',
    
    // 其他訊息
    connection_lost: '串口連接已斷開',
    reconnect_prompt: '是否嘗試重新連接？',
    yes: '是',
    no: '否'
};