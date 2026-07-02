// 简体中文翻译
const zh = {
    // 基础信息
    title: 'TuyaOpen串口工具(内测版)',
    subtitle: '基于Chrome Web Serial API的一站式开发者工具',
    
    // Tab导航
    tab_serial: '📡 串口调试',
    tab_flash: '💾 固件烧录',
    tab_tuya_auth: '🔐 TuyaOpen授权',
    
    // 浏览器支持
    browser_requirement: '此工具需要Chrome内核浏览器支持，其他浏览器无法正常工作。请使用Chrome、Edge或其他基于Chromium的浏览器。',
    
    // 串口连接控制
    control_title: '🔧 串口连接控制',
    baud_rate: '波特率',
    data_bits: '数据位',
    stop_bits: '停止位',
    parity: '校验位',
    parity_none: '无',
    parity_even: '偶校验',
    parity_odd: '奇校验',
    connect: '连接串口',
    disconnect: '断开连接',
    status_disconnected: '未连接',
    status_connected: '已连接',
    status_connecting: '连接中',
    status_error: '连接错误',
    
    // 故障排除
    serial_troubleshooting: '串口故障排除',
    
    // 数据接收
    receive_data: '📨 接收数据',
    clear_log: '清空日志',
    save_log: '保存日志',
    show_timestamp: '显示时间戳',
    auto_scroll: '自动滚动',
    fullscreen: '全屏显示',
    exit_fullscreen: '退出全屏',
    waiting_data: '等待串口数据...',
    received: '接收',
    sent: '发送',
    bytes: '字节',
    
    // 错误分析相关
    error_analysis: '错误日志分析',
    clear_analysis: '清空分析（重置检测）',
    auto_analysis: '自动分析',
    no_errors_detected: '暂未检测到错误...',
    test_error_analysis: '测试错误分析',
    
    // 数据发送
    send_data: '📤 发送数据',
    hex_mode: 'HEX模式',
    add_newline: '添加换行符',
    input_placeholder: '输入要发送的数据...',
    send: '发送',
    
    // 快捷发送
    quick_send: '快捷发送',
    manage: '管理',
    no_quick_commands: '暂无快捷命令，点击"管理"按钮添加',
    
    // 快捷发送管理
    quick_send_management: '⚙️ 快捷发送管理',
    add_new_command: '添加新命令',
    display_name: '显示名称',
    name_example: '例如: 复位',
    send_content: '发送内容',
    content_example: '例如: AT+RST',
    add: '添加',
    existing_commands: '已有命令',
    no_commands: '暂无快捷命令',
    reset_default: '恢复默认',
    close: '关闭',
    edit: '编辑',
    delete: '删除',
    save: '保存',
    cancel: '取消',
    
    // 固件烧录
    flash_config: '💾 固件烧录配置',
    target_device: '目标设备',
    select_file: '选择固件文件',
    no_file_selected: '未选择文件，可点击 "选择固件文件"手动打开烧录文件或拖动烧录文件至文件框',
    file_size: '文件大小',
    start_download: '开始烧录',
    stop_download: '结束烧录',
    auto_disconnect_after_flash: '完成烧录后自动断开串口',
    preparing: '准备中...',
    downloaded: '已烧录',
    burn_log: '📋 烧录日志',
    waiting_download: '等待烧录操作...',
    
    // TuyaOpen授权
    tuya_auth_title: '🔐 TuyaOpen授权码写入',
    tuya_auth_subtitle: '向设备写入TuyaOpen项目授权信息',
    license_guide: '授权码获取指南',
    uuid_label: 'UUID (20字符)',
    uuid_placeholder: '请输入20字符的UUID...',
    auth_key_label: 'AUTH_KEY (32字符)',
    auth_key_placeholder: '请输入32字符的AUTH_KEY...',
    authorize_btn: '写入授权',
    connect_tuya_auth: '连接授权串口',
    disconnect_tuya_auth: '断开授权串口',
    tuya_auth_waiting: '等待授权操作...',
    tuya_auth_notice_title: '⚠️ 重要提示',
    tuya_auth_notice_content: '当前授权功能只适用于TuyaOpen工程的授权码写入，非TuyaOpen工程无法使用。',
    tuya_auth_additional_info: '请确保设备已进入授权模式，并正确连接串口后再进行授权操作。',
    
    // 设备目标选择
    serial_target_device: '目标设备',
    custom_device: '自定义',
    
    // 版本和版权
    powered_by: '基于',
    all_rights_reserved: '保留所有权利',
    
    // 项目信息
    project_info: '这个项目是TuyaOpen的一部分，相关项目包括：',
    tuya_open_project: 'TuyaOpen',
    arduino_project: 'Arduino-TuyaOpen',
    lua_project: 'Luanode-TuyaOpen',
    tools_project: 'TuyaOpen-WebTools',
    
    // 测试版本说明
    beta_notice: '当前功能属于测试版本，遇到问题请通过提交issue到',
    repository_link: 'TuyaOpen-WebTools 仓库',
    
    // 错误信息
    error: '❌ 错误',
    
    // 调试相关
    debug_mode: '🔧 调试模式',
    debug_status: '调试状态',
    disabled: '禁用',
    enabled: '启用',
    
    // 控制台调试信息
    console_raw_received_data: '[调试] 接收到原始数据:',
    console_data_char_codes: '[调试] 数据字符编码:',
    console_contains_ansi_escape: '[调试] 包含ANSI转义序列:',
    console_contains_missing_escape: '[调试] 包含不完整转义序列:',
    console_processed_safe_text: '[调试] 处理后的安全文本:',
    console_filtered_null_chars: '[调试] 过滤了 {0} 个空字符(0x00)',
    
    // 串口错误信息
    serial_not_supported: '您的浏览器不支持Web Serial API。请使用Chrome 89+或其他支持的浏览器。',
    serial_not_connected: '串口未连接',
    send_error: '发送数据失败: {0}',
    hex_length_error: 'HEX字符串长度必须为偶数',
    download_progress: '烧录进度: {0}%',
    download_speed: '烧录速度: {0}',
    
    // 其他消息
    connection_lost: '串口连接已断开',
    reconnect_prompt: '是否尝试重新连接？',
    yes: '是',
    no: '否'
};