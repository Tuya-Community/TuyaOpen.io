// 简体中文 (zh-CN)
const zh = {
    // 页面标题和描述
    title: "TuyaOpen串口工具",
    subtitle: "基于Chrome Web Serial API的一站式开发者工具",
    
    // 浏览器要求和测试版本说明
    browser_requirement: "此工具需要Chrome内核浏览器支持，其他浏览器无法正常工作。请使用Chrome、Edge或其他基于Chromium的浏览器。",
    beta_notice: "如在使用过程中遇到问题，请通过提交issue到",
    repository_link: "TuyaOpen-WebTools 仓库",
    
    // 项目相关链接
    project_info: "这个项目是TuyaOpen的一部分，相关项目包括：",
    tuya_open_project: "TuyaOpen",
    arduino_project: "Arduino-TuyaOpen",
    lua_project: "Luanode-TuyaOpen",
    tools_project: "TuyaOpen-WebTools",
    
    // Tab标签
    tab_serial: "串口调试",
    tab_flash: "固件烧录",
    tab_tuya_auth: "TuyaOpen授权",
    
    // 控制面板
    control_title: "串口连接控制",
    flash_connection_control: "固件烧录串口连接",
    connect: "连接串口",
    connect_flash: "连接固件烧录串口",
    disconnect: "断开连接",
    disconnect_flash: "断开固件烧录连接",
    status_disconnected: "未连接",
    status_connected: "已连接",
    serial_target_device: "目标设备:",
    custom_device: "自定义",
    baud_rate: "波特率:",
    data_bits: "数据位:",
    stop_bits: "停止位:",
    parity: "校验位:",
    parity_none: "无",
    parity_even: "偶校验",
    parity_odd: "奇校验",
    
    // 串口调试
    receive_data: "接收数据",
    save_log: "保存日志",
    auto_scroll: "自动滚动",
    show_timestamp: "显示时间戳",
    waiting_data: "等待串口数据...",
    received: "接收",
    sent: "发送",
    bytes: "字节",
    
    // 错误分析相关
    error_analysis: "错误日志分析",
    clear_analysis: "清空分析（重置检测）",
    auto_analysis: "自动分析",
    no_errors_detected: "暂未检测到错误...",
    test_error_analysis: "测试错误分析",
    
    send_data: "发送数据",
    hex_mode: "HEX模式",
    add_newline: "添加换行符",
    input_placeholder: "输入要发送的数据...",
    input_placeholder_hex: "输入十六进制数据 (例如: FF 01 02 03)...",
    send: "发送",
    
    quick_send: "快捷发送:",
    manage: "管理命令",
    no_quick_commands: "暂无快捷命令。点击\"管理命令\"按钮可添加常用AT指令、调试命令等，提高调试效率",
    
    // 固件烧录
    flash_config: "固件烧录配置",
    target_device: "目标设备:",
    esp32_flash_address: "ESP32-Series 烧录地址:",
    complete_firmware: "0x0000 (完整固件包)",
    custom_address: "自定义地址...",
    custom_address_placeholder: "0x10000",
    select_file: "选择固件文件",
    no_file_selected: "未选择文件，可点击 \"选择固件文件\"手动打开烧录文件或拖动烧录文件至文件框",
    file_size: "文件大小",
    start_download: "开始烧录",
    stop_download: "结束烧录",
    auto_disconnect_after_flash: "完成烧录后自动断开串口",
    preparing: "准备中...",
    downloaded: "已下载",
    burn_log: "烧录日志",
    clear_log: "清空日志",
    waiting_download: "等待下载操作...",
    
    // 快捷命令管理
    quick_send_management: "快捷发送管理",
    add_new_command: "添加新命令",
    display_name: "显示名称:",
    name_example: "例如: 复位",
    send_content: "发送内容:",
    content_example: "例如: AT+RST",
    add: "添加",
    existing_commands: "已有命令",
    no_commands: "暂无快捷命令",
    reset_default: "恢复默认",
    close: "关闭",
    
    // 错误信息
    error: "错误",
    
    // 系统消息
    serial_connected: "串口连接成功！",
    serial_disconnected: "串口已断开连接。",
    flash_serial_connected: "固件烧录串口连接成功！",
    flash_serial_disconnected: "固件烧录串口已断开连接。",
    switch_to_tab: "切换到{0}功能，串口连接已断开",
    tab_serial_name: "串口调试",
    tab_flash_name: "固件烧录",
    
    // 确认对话框
    switch_tab_confirm: "⚠️ 串口互斥提醒\n\n当前{0}功能正在使用串口连接。\n{0}和{1}功能不能同时使用串口。\n\n切换到{1}功能将：\n• 自动断开当前串口连接\n• 停止正在进行的操作\n\n确定要切换吗？",
    delete_command_confirm: "确定要删除这个快捷命令吗？",
    reset_commands_confirm: "确定要恢复默认的快捷命令吗？这将删除所有自定义命令。",
    
    // 验证消息
    fill_complete_info: "请填写完整的命令名称和内容",
    command_name_exists: "命令名称已存在，请使用其他名称",
    no_data_to_save: "没有数据可保存",
    no_log_to_save: "没有日志可保存",
    please_select_file: "请先选择固件文件",
    please_connect_serial: "请先连接串口",
    please_connect_flash_serial: "请先连接固件烧录串口",
    flash_serial_not_connected: "固件烧录串口未连接",
    
    // Web Serial API 相关
    browser_not_supported: "您的浏览器不支持Web Serial API。请使用Chrome 89+或Edge 89+浏览器。",
    connect_failed: "连接失败: {0}",
    disconnect_failed: "断开连接失败: {0}",
    read_error: "读取数据错误: {0}",
    send_error: "发送数据错误: {0}",
    hex_length_error: "HEX字符串长度必须是偶数",
    serial_not_connected: "串口未连接",
    download_failed: "烧录失败: {0}",
    
    // 文件操作
    file_selected: "选择文件: {0} ({1} 字节)",
    start_download_to: "开始烧录固件到 {0}...",
    download_complete: "固件烧录完成！",
    user_cancelled: "用户取消烧录",
    
    // 固件下载进度消息
    flash_handshaking: "正在握手连接...",
    flash_handshake_success: "握手成功",
    flash_handshake_failed: "握手失败，请检查设备连接",
    flash_download_cancelled: "烧录已取消",
    waiting_reset: "等待设备重启...",
    flash_setting_baudrate: "设置波特率到 {0}...",
    flash_baudrate_set: "波特率设置完成",
    flash_erasing: "正在擦除Flash...",
    flash_erase_progress: "擦除进度: {0}/{1}",
    flash_erase_sector_failed: "擦除扇区 {0} 失败: {1}",
    flash_erase_complete: "Flash擦除完成",
    flash_writing_data: "正在写入数据...",
    flash_write_progress: "写入进度: {0}/{1}",
    flash_write_block_failed: "写入块 {0} 失败: {1}",
    flash_write_complete: "数据写入完成",
    flash_verifying_crc: "正在校验数据...",
    flash_crc_passed: "CRC校验通过",
    flash_crc_failed_mismatch: "CRC校验失败: 本地={0}, 设备={1}",
    flash_crc_failed: "CRC校验失败: {0}",
    flash_rebooting: "正在重启设备...",
    flash_download_complete: "烧录完成",
    flash_download_success: "烧录成功完成！",
    flash_download_failed: "烧录失败: {0}",
    flash_downloading: "正在烧录中，请等待完成",
    flash_user_cancelled: "用户取消操作",
    
    // 日志文件名
    serial_log_filename: "串口日志_{0}.txt",
    flash_log_filename: "固件日志_{0}.txt",
    
    // 工具提示
    current_tab_connected: "当前{0}功能已连接串口",
    disconnect_tab_connection: "断开{0}功能的串口连接",
    connect_for_tab: "连接串口用于{0}功能",
    
    // 版权信息
    powered_by: "基于",
    all_rights_reserved: "保留所有权利",
    
    // 调试功能
    debug_mode: "调试模式",
    debug_basic: "基础",
    debug_detailed: "详细",
    debug_verbose: "完整",
    export_debug: "导出调试日志",
    debug_status: "调试状态",
    debug_level: "调试级别",
    packets_sent: "发送包数",
    packets_received: "接收包数",
    
    // 功能按钮和操作
    fullscreen: "全屏显示",
    exit_fullscreen: "退出全屏",
    
    // 新增：调试模式状态
    debug_mode_enabled: "🔧 调试模式已启用",
    debug_mode_disabled: "🔧 调试模式已禁用",
    enabled: "启用",
    disabled: "禁用",
    
    // 新增：波特率重置相关
    resetting_baudrate_115200: "重置串口波特率到115200...",
    baudrate_reset_success: "✅ 串口波特率已重置到115200",
    direct_serial_reset_success: "✅ 串口已直接重置到115200",
    baudrate_reset_failed: "重置串口波特率失败",
    direct_reset_failed: "直接重置串口也失败",
    
    // 新增：下载器管理相关
    downloader_manager_not_initialized: "下载器管理器未初始化",
    loaded_chip_types: "已加载 {0} 种支持的芯片类型",
    using_default_chip_support: "使用默认芯片支持 (T5AI, T3)",
    unsupported_device_type: "不支持的设备类型: {0}",
    unsupported_chip_type: "不支持的芯片类型: {0}",
    
    // 新增：固件烧录流程相关
    starting_firmware_download_process: "开始固件烧录流程...",
    starting_device_download: "开始{0}固件烧录，文件大小: {1} 字节",
    firmware_download_completed_time: "固件烧录完成，总耗时: {0} 秒",
    device_firmware_download_completed: "{0}固件烧录完成",
    initializing_downloader: "正在初始化{0}下载器...",
    connecting_device: "正在连接{0}设备...",
    cannot_connect_device: "无法连接到{0}设备",
    downloading_firmware_to_device: "开始烧录固件到{0}设备...",
    t5ai_firmware_download_completed: "✅ T5AI固件烧录完成",
    firmware_download_completed_device_restarted: "固件烧录完成，设备已重启",
    
    // 新增：串口连接相关
    serial_not_connected_connect_first: "串口未连接，请先连接串口设备",
    restoring_serial_reader_writer_failed: "恢复串口reader/writer失败",
    
    // 新增：清理和重置相关
    cleanup_reset_baudrate: "Cleanup: 重置串口波特率到115200...",
    cleanup_baudrate_reset_success: "Cleanup: ✅ 串口波特率已重置到115200",
    cleanup_reset_failed: "Cleanup: 重置串口波特率失败",
    flashdownloader_reset_baudrate: "FlashDownloader：重置波特率到115200...",
    flashdownloader_baudrate_reset_success: "FlashDownloader：✅ 波特率成功重置到115200",
    flashdownloader_direct_reset_success: "FlashDownloader：✅ 串口直接重置也成功",
    flashdownloader_reset_failed: "FlashDownloader：波特率重置失败",
    
    // 新增：串口连接状态消息
    serial_connected_initial_switch: "初始连接，将切换到",
    serial_connected_initial: "初始连接",
    bps: "bps",
    
    // 新增：控制台调试消息
    console_flash_connect_success: "固件烧录连接成功（115200），串口调试连接状态:",
    console_flash_connect_failed: "固件烧录连接失败:",
    console_flash_disconnect_failed: "固件烧录断开连接失败:",
    console_flash_independent_success: "固件烧录独立连接成功（115200），串口调试连接状态:",
    console_filtered_null_chars: "过滤了 {0} 个0x00字符",
    console_raw_received_data: "原始接收数据:",
    console_data_char_codes: "数据字符码:",
    console_contains_ansi_escape: "包含ANSI转义序列:",
    console_contains_missing_escape: "包含缺少转义字符的ANSI:",
    console_processed_safe_text: "处理后的安全文本:",
    console_apply_ansi_colors: "应用ANSI颜色样式:",
    console_sanitize_input: "sanitizeDisplayText输入:",
    console_ansi_detection_result: "ANSI检测结果:",
    console_call_parse_ansi: "调用parseAnsiColors处理",
    console_treat_as_plain: "作为普通文本处理",
    console_parse_ansi_input: "parseAnsiColors输入:",
    console_using_regex: "使用正则表达式:",
    console_found_ansi_match: "找到ANSI匹配:",
    console_parsed_codes: "解析的代码:",
    console_processing_code: "处理代码:",
    console_reset_style: "重置样式",
    console_set_bold: "设置粗体",
    console_close_bold: "关闭粗体",
    console_reset_foreground: "重置前景色",
    console_reset_background: "重置背景色",
    console_set_foreground: "设置前景色:",
    console_set_background: "设置背景色:",
    console_cleaned_text: "清理后的文本:",
    console_parse_ansi_final: "parseAnsiColors最终结果:",
    console_language_ui_initialized: "Language UI initialized for:",
    console_language_switched: "语言已切换到:",
    console_language_display_updated: "语言显示已更新为:",
    console_serial_target_device: "串口目标设备选择:",
    
    // 串口异常处理相关
    serial_disconnected_unexpectedly: "串口连接异常断开: {0}",
    
    // 系统信息相关
    system_info: "系统信息",
    system_info_os: "操作系统",
    system_info_browser: "浏览器",
    system_info_web_serial: "Web Serial",
    system_info_platform: "平台",
    system_info_supported: "支持",
    system_info_not_supported: "不支持",
    
    // 新增：串口故障排除页面
    troubleshooting_title: "串口故障排除指南",
    troubleshooting_subtitle: "解决串口连接问题的完整指南",
    back_to_main: "返回主页",
    no_serial_ports_found: "没有找到串口？",
    serial_troubleshooting_guide: "串口连接问题？查看故障排除指南",
    serial_troubleshooting: "串口故障排除",
    
    // 快速检查清单
    quick_check_title: "快速检查清单",
    basic_checks: "基础检查项目",
    check_browser: "使用Chrome、Edge或其他Chromium内核浏览器",
    check_cable: "USB数据线连接正常（非充电线）",
    check_device_power: "设备已正确上电",
    check_other_software: "关闭其他占用串口的软件",
    
    // 常见问题
    common_issues_title: "常见问题及解决方案",
    issue_no_ports: "问题1: 没有可用的串口设备",
    issue_no_ports_desc: "点击\"连接串口\"后弹出的设备列表为空",
    issue_connection_failed: "问题2: 连接失败",
    issue_connection_failed_desc: "能看到设备但连接时报错",
    issue_no_data: "问题3: 连接成功但无数据",
    issue_no_data_desc: "串口连接成功但收不到数据或数据显示异常",
    
    possible_causes: "可能原因：",
    cause_driver_missing: "设备驱动未安装或安装不正确",
    cause_cable_issue: "USB线缆问题（使用充电线而非数据线）",
    cause_device_not_recognized: "设备未被系统识别",
    cause_port_occupied: "串口被其他程序占用",
    cause_permission_denied: "权限不足（Linux/macOS）",
    cause_device_busy: "设备正在被其他应用使用",
    cause_driver_conflict: "驱动冲突或不兼容",
    cause_baud_rate_mismatch: "波特率设置不匹配",
    cause_serial_params_wrong: "数据位、停止位、校验位设置错误",
    cause_device_not_sending: "设备端未发送数据",
    cause_flow_control: "流控制设置问题",
    cause_cable_quality: "数据线质量问题或接触不良",
    
    // 驱动问题诊断
    driver_diagnosis_title: "驱动问题诊断",
    driver_diagnosis_desc: "大部分串口问题都与驱动相关，请按照以下步骤进行诊断",
    
    // 操作系统
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    
    // Windows 相关
    windows_check_device_manager: "步骤1: 检查设备管理器",
    windows_step1_title: "打开设备管理器",
    windows_step1_desc: "右键点击\"此电脑\" → \"属性\" → \"设备管理器\"，或按Win+X选择\"设备管理器\"",
    windows_step2_title: "查找串口设备",
    windows_step2_desc: "在设备管理器中查找以下分类：",
    windows_step3_title: "识别设备状态",
    windows_step3_desc: "检查设备图标状态：",
    
    ports_com_lpt: "端口(COM和LPT)",
    universal_serial_bus: "通用串行总线控制器",
    other_devices: "其他设备",
    
    device_normal: "✅ 正常：设备名称正常显示",
    device_warning: "⚠️ 警告：黄色感叹号，驱动有问题",
    device_error: "❌ 错误：红色X，设备被禁用",
    device_unknown: "❓ 未知：在\"其他设备\"中，驱动未安装",
    
    windows_driver_install: "步骤2: 安装驱动程序",
    windows_manual_install: "步骤3: 手动安装驱动",
    
    // 驱动描述
    ch340_desc: "最常见的USB转串口芯片",
    cp210x_desc: "Silicon Labs USB转串口芯片",
    ftdi_desc: "FTDI公司USB转串口芯片",
    
    download_driver: "下载对应驱动",
    download_driver_desc: "根据设备芯片型号下载对应驱动程序",
    run_installer: "运行安装程序",
    run_installer_desc: "以管理员身份运行下载的驱动安装程序",
    restart_computer: "重启计算机",
    restart_computer_desc: "安装完成后重启计算机使驱动生效",
    verify_installation: "验证安装",
    verify_installation_desc: "重新连接设备，检查设备管理器中是否正常显示",
    
    screenshot_device_manager: "设备管理器截图位置",
    
    // macOS 相关
    macos_check_system: "步骤1: 检查系统信息",
    macos_step1_title: "打开系统信息",
    macos_step1_desc: "按住Option键点击苹果菜单 → \"系统信息\"",
    macos_step2_title: "查看USB设备",
    macos_step2_desc: "在左侧选择\"USB\"，查看连接的USB设备",
    macos_step3_title: "检查串口设备",
    macos_step3_desc: "打开终端，输入命令查看串口设备：",
    
    macos_driver_install: "步骤2: 安装驱动程序",
    macos_driver_note: "macOS通常内置大部分USB转串口驱动，但某些芯片仍需手动安装",
    
    ch340_mac_desc: "macOS版本CH340驱动",
    cp210x_mac_desc: "macOS版本CP210x驱动",
    
    // Linux 相关
    linux_check_system: "步骤1: 检查系统识别",
    linux_step1_title: "检查USB设备",
    linux_step1_desc: "打开终端，输入以下命令：",
    linux_step2_title: "检查串口设备",
    linux_step2_desc: "查看可用的串口设备：",
    linux_step3_title: "检查内核消息",
    linux_step3_desc: "查看设备连接时的内核消息：",
    
    linux_permissions: "步骤2: 设置权限",
    linux_add_user_group: "添加用户到dialout组",
    linux_add_user_desc: "执行以下命令并重新登录：",
    linux_check_permissions: "检查设备权限",
    linux_check_permissions_desc: "确认设备权限设置：",
    
    // 高级故障排除
    advanced_troubleshooting: "高级故障排除",
    hardware_issues: "硬件问题排查",
    software_conflicts: "软件冲突解决",
    
    try_different_cable: "尝试更换USB数据线",
    try_different_port: "尝试不同的USB端口",
    try_different_computer: "在其他计算机上测试设备",
    check_device_power: "检查设备供电是否正常",
    
    close_other_serial_software: "关闭其他串口调试软件",
    disable_antivirus: "临时禁用杀毒软件",
    update_browser: "更新浏览器到最新版本",
    clear_browser_cache: "清除浏览器缓存和数据",
    
    // 获取帮助
    get_help_title: "获取帮助",
    get_help_desc: "如果以上方法都无法解决问题，请收集以下信息并联系技术支持：",
    
    help_info_os: "操作系统版本",
    help_info_browser: "浏览器版本",
    help_info_device: "设备型号和芯片信息",
    help_info_error: "具体错误信息截图",
    
    github_support_desc: "在GitHub上提交问题报告",
    
    // 新增：TuyaOpen授权相关
    tuya_auth_title: "TuyaOpen授权码写入",
    tuya_auth_subtitle: "向设备写入TuyaOpen项目授权信息",
    uuid_label: "UUID (20字符):",
    auth_key_label: "AUTH_KEY (32字符):",
    uuid_placeholder: "请输入20字符的UUID...",
    auth_key_placeholder: "请输入32字符的AUTH_KEY...",
    authorize_btn: "写入授权",
    tuya_auth_notice_title: "⚠️ 重要提示",
    tuya_auth_notice_content: "当前授权功能只适用于TuyaOpen工程的授权码写入，非TuyaOpen工程无法使用。",
    tuya_auth_additional_info: "请确保设备已进入授权模式，并正确连接串口后再进行授权操作。",
    uuid_length_error: "UUID长度错误！请输入20字符的UUID",
    auth_key_length_error: "AUTH_KEY长度错误！请输入32字符的AUTH_KEY",
    uuid_empty_error: "请输入UUID",
    auth_key_empty_error: "请输入AUTH_KEY",
    tuya_auth_success: "✅ TuyaOpen授权信息写入成功！",
    tuya_auth_failed: "❌ TuyaOpen授权信息写入失败: {0}",
    tuya_auth_sending: "正在发送授权信息...",
    tuya_auth_command_sent: "授权命令已发送: auth {0} {1}",
    
    // 授权相关状态信息
    tuya_auth_waiting: "等待授权操作...",
    tuya_auth_connected: "授权串口已连接",
    tuya_auth_disconnected: "授权串口已断开",
    connect_tuya_auth: "连接授权串口",
    disconnect_tuya_auth: "断开授权串口",
    tuya_auth_serial_connected: "TuyaOpen授权串口连接成功！",
    tuya_auth_serial_disconnected: "TuyaOpen授权串口已断开连接。",
    tab_tuya_auth_name: "TuyaOpen授权",
    
    // TuyaOpen授权码指南相关
    license_guide: "授权码获取指南",
    license_guide_title: "TuyaOpen授权码获取指南",
    license_guide_subtitle: "了解TuyaOpen授权码及获取方式",
    
    // 什么是TuyaOpen专用授权码
    what_is_license: "什么是TuyaOpen专用授权码",
    license_info: "TuyaOpen Framework的所有版本均需要专用授权码才能正常连接涂鸦云，使用其他授权码无法正常工作。",
    supported_frameworks: "支持的TuyaOpen框架",
    c_version: "C 版 TuyaOpen",
    arduino_version: "Arduino 版 TuyaOpen", 
    lua_version: "Luanode 版 TuyaOpen",
    
    // 如何获取授权码
    how_to_get: "如何获取授权码",
    method1_title: "方式1：购买预烧录模块",
    method1_desc: "通过涂鸦开发者平台购买已烧录 TuyaOpen 授权码模块。该授权码已经在出厂时烧录在对应模组中，且不会丢失。TuyaOpen 在启动时通过 `tuya_iot_license_read()` 接口读取授权码。请确认当前设备是否为烧录了 TuyaOpen 授权码。",
    method1_advantage: "优势：即插即用，无需手动操作",
    
    method2_title: "方式2：涂鸦平台购买",
    method2_desc: "通过涂鸦开发者平台购买TuyaOpen授权码，然后通过串口工具写入到模组中。",
    method2_advantage: "优势：官方平台，支持批量购买",
    visit_platform: "访问平台",
    visit_platform_preburn: "购买预烧录模块",
    
    method3_title: "方式3：淘宝购买",
    method3_desc: "通过淘宝店铺购买TuyaOpen授权码，然后通过串口工具写入到模组中。",
    method3_advantage: "优势：购买便捷，支付方式灵活",
    visit_taobao: "访问淘宝",
    
    // 使用指南
    usage_guide: "使用指南",
    check_existing: "步骤1：检查现有授权码",
    check_warning: "请先确认当前设备是否已经烧录了TuyaOpen授权码，避免重复购买。",
    write_license: "步骤2：写入授权码",
    write_desc: "如果设备未烧录授权码，可以使用本工具的\"TuyaOpen授权\"功能进行写入：",
    write_step1: "连接设备到电脑",
    write_step2: "切换到\"TuyaOpen授权\"标签页",
    write_step3: "连接串口",
    write_step4: "输入购买的UUID和AUTH_KEY",
    write_step5: "点击\"写入授权\"按钮",
    write_success: "授权码写入成功后，设备就可以正常使用TuyaOpen框架连接涂鸦云了。",
    
    // 常见问题
    faq_title: "常见问题",
    q1: "Q: 其他类型的授权码可以用吗？",
    a1: "A: 不可以。TuyaOpen框架只能使用TuyaOpen专用授权码，其他授权码无法正常连接涂鸦云。",
    q2: "Q: 授权码会丢失吗？",
    a2: "A: 正常情况下授权码不会丢失。预烧录模块的授权码是出厂烧录的，手动写入的授权码会保存在模组的非易失性存储区域。",
    q3: "Q: 如何检查设备是否已有授权码？",
    a3: "A: 可以通过TuyaOpen程序调用 `tuya_iot_license_read()` 接口来检查。",
    
    // 技术支持
    support_title: "技术支持",
    support_desc: "如果在使用过程中遇到问题，请通过以下方式获取帮助：",
    github_support: "提交问题报告"
};

// 导出到全局
if (typeof window !== 'undefined') {
    window.i18nLanguages = window.i18nLanguages || {};
    window.i18nLanguages.zh = zh;
}