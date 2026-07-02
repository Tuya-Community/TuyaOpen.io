// 日本語 (ja-JP)
const ja = {
    // ページタイトルと説明
    title: "TuyaOpenシリアルツール",
    subtitle: "Chrome Web Serial APIベースのワンストップ開発者ツール",
    
    // ブラウザ要件とベータ版通知
    browser_requirement: "このツールはChromeベースのブラウザが必要です。他のブラウザは正常に動作しません。Chrome、Edge、またはその他のChromiumベースのブラウザをご使用ください。",
    beta_notice: "このツールの使用中に問題が発生した場合は、リポジトリに問題を報告してください",
    repository_link: "TuyaOpen-WebTools リポジトリ",
    
    // プロジェクト関連リンク
    project_info: "このプロジェクトはTuyaOpenの一部です。関連プロジェクトには以下が含まれます：",
    tuya_open_project: "TuyaOpen",
    arduino_project: "Arduino-TuyaOpen",
    lua_project: "Luanode-TuyaOpen",
    tools_project: "TuyaOpen-WebTools",
    
    // タブラベル
    tab_serial: "シリアルデバッグ",
    tab_flash: "ファームウェアダウンロード",
    
    // コントロールパネル
    control_title: "シリアル接続制御",
    flash_connection_control: "ファームウェアダウンロード用シリアル接続",
    connect: "シリアル接続",
    connect_flash: "ファームウェアダウンロード用シリアル接続",
    disconnect: "切断",
    disconnect_flash: "ファームウェアダウンロード接続を切断",
    status_disconnected: "未接続",
    status_connected: "接続済み",
    serial_target_device: "ターゲットデバイス:",
    custom_device: "カスタム",
    baud_rate: "ボーレート:",
    data_bits: "データビット:",
    stop_bits: "ストップビット:",
    parity: "パリティ:",
    parity_none: "なし",
    parity_even: "偶数",
    parity_odd: "奇数",
    
    // シリアルデバッグ
    receive_data: "受信データ",
    save_log: "ログ保存",
    auto_scroll: "自動スクロール",
    show_timestamp: "タイムスタンプ表示",
    waiting_data: "シリアルデータを待機中...",
    received: "RX",
    sent: "TX",
    bytes: "バイト",
    
    // エラー分析関連
    error_analysis: "エラーログ分析",
    clear_analysis: "分析をクリア（検出リセット）",
    auto_analysis: "自動分析",
    no_errors_detected: "エラーは検出されていません...",
    test_error_analysis: "エラー分析テスト",
    
    send_data: "データ送信",
    hex_mode: "HEXモード",
    add_newline: "改行追加",
    input_placeholder: "送信するデータを入力...",
    input_placeholder_hex: "16進データを入力 (例: FF 01 02 03)...",
    send: "送信",
    
    quick_send: "クイック送信:",
    manage: "コマンド管理",
    no_quick_commands: "クイックコマンドがありません。「コマンド管理」をクリックして、よく使うATコマンドやデバッグ命令などを追加し、デバッグ効率を向上させましょう",
    
    // ファームウェアフラッシュ
    flash_config: "ファームウェアダウンロード設定",
    target_device: "ターゲットデバイス:",
    esp32_flash_address: "ESP32-Series 書き込みアドレス:",
    complete_firmware: "0x0000 (完全なファームウェア)",
    custom_address: "カスタムアドレス...",
    custom_address_placeholder: "0x10000",
    select_file: "ファームウェアファイル選択",
    no_file_selected: "ファイル未選択、\"ファームウェアファイル選択\"をクリックして手動でフラッシュファイルを開くか、フラッシュファイルをファイルボックスにドラッグしてください",
    file_size: "ファイルサイズ",
    start_download: "フラッシュ開始",
    stop_download: "フラッシュ終了",
    auto_disconnect_after_flash: "フラッシュ完了後に自動切断",
    preparing: "準備中...",
    downloaded: "ダウンロード済み",
    download_log: "ダウンロードログ",
    clear_log: "ログクリア",
    waiting_download: "ダウンロード操作を待機中...",
    
    // クイックコマンド管理
    quick_send_management: "クイック送信管理",
    add_new_command: "新しいコマンド追加",
    display_name: "表示名:",
    name_example: "例: リセット",
    send_content: "送信内容:",
    content_example: "例: AT+RST",
    add: "追加",
    existing_commands: "既存のコマンド",
    no_commands: "クイックコマンドなし",
    reset_default: "デフォルトに戻す",
    close: "閉じる",
    
    // エラーメッセージ
    error: "エラー",
    
    // システムメッセージ
    serial_connected: "シリアル接続成功！",
    serial_disconnected: "シリアル切断されました。",
    flash_serial_connected: "ファームウェアダウンロード用シリアル接続成功！",
    flash_serial_disconnected: "ファームウェアダウンロード用シリアルが切断されました。",
    switch_to_tab: "{0}に切り替え、シリアル接続を閉じました",
    tab_serial_name: "シリアルデバッグ",
    tab_flash_name: "ファームウェアダウンロード",
    
    // 確認ダイアログ
    switch_tab_confirm: "⚠️ シリアルミューテックス警告\n\n現在の{0}機能がシリアル接続を使用中です。\n{0}と{1}機能は同時にシリアルを使用できません。\n\n{1}に切り替えると:\n• 現在のシリアル接続を自動切断\n• 進行中の操作を停止\n\n切り替えてもよろしいですか？",
    delete_command_confirm: "このクイックコマンドを削除してもよろしいですか？",
    reset_commands_confirm: "デフォルトのクイックコマンドに戻してもよろしいですか？すべてのカスタムコマンドが削除されます。",
    
    // 検証メッセージ
    fill_complete_info: "コマンド名と内容を完全に入力してください",
    command_name_exists: "コマンド名が既に存在します、別の名前を使用してください",
    no_data_to_save: "保存するデータがありません",
    no_log_to_save: "保存するログがありません",
    please_select_file: "まずファームウェアファイルを選択してください",
    please_connect_serial: "まずシリアルに接続してください",
    please_connect_flash_serial: "まずファームウェアダウンロード用シリアルに接続してください",
    flash_serial_not_connected: "ファームウェアダウンロード用シリアルが接続されていません",
    
    // Web Serial API関連
    browser_not_supported: "お使いのブラウザはWeb Serial APIをサポートしていません。Chrome 89+またはEdge 89+をご使用ください。",
    connect_failed: "接続失敗: {0}",
    disconnect_failed: "切断失敗: {0}",
    read_error: "データ読み取りエラー: {0}",
    send_error: "データ送信エラー: {0}",
    hex_length_error: "HEX文字列の長さは偶数である必要があります",
    serial_not_connected: "シリアル未接続",
    download_failed: "ダウンロード失敗: {0}",
    
    // ファイル操作
    file_selected: "ファイル選択: {0} ({1} 文字)",
    start_download_to: "{0}へのファームウェアダウンロードを開始...",
    download_complete: "ファームウェアダウンロード完了！",
    user_cancelled: "ユーザーがダウンロードをキャンセル",
    
    // ファームウェアダウンロード進行メッセージ
    flash_handshaking: "ハンドシェイク接続中...",
    flash_handshake_success: "ハンドシェイク成功",
    flash_handshake_failed: "ハンドシェイク失敗、デバイス接続を確認してください",
    flash_download_cancelled: "ダウンロードキャンセル",
    waiting_reset: "デバイス再起動を待機中...",
    flash_setting_baudrate: "ボーレートを{0}に設定中...",
    flash_baudrate_set: "ボーレート設定完了",
    flash_erasing: "フラッシュ消去中...",
    flash_erase_progress: "消去進行: {0}/{1}",
    flash_erase_sector_failed: "セクター{0}の消去失敗: {1}",
    flash_erase_complete: "フラッシュ消去完了",
    flash_writing_data: "データ書き込み中...",
    flash_write_progress: "書き込み進行: {0}/{1}",
    flash_write_block_failed: "ブロック{0}書き込み失敗: {1}",
    flash_write_complete: "データ書き込み完了",
    flash_verifying_crc: "データ検証中...",
    flash_crc_passed: "CRC検証成功",
    flash_crc_failed_mismatch: "CRC検証失敗: ローカル={0}, デバイス={1}",
    flash_crc_failed: "CRC検証失敗: {0}",
    flash_rebooting: "デバイス再起動中...",
    flash_download_complete: "ダウンロード完了",
    flash_download_success: "ダウンロード成功完了！",
    flash_download_failed: "ダウンロード失敗: {0}",
    flash_downloading: "ダウンロード進行中、完了をお待ちください",
    flash_user_cancelled: "ユーザーが操作をキャンセル",
    
    // ログファイル名
    serial_log_filename: "シリアルログ_{0}.txt",
    flash_log_filename: "フラッシュログ_{0}.txt",
    
    // ツールチップ
    current_tab_connected: "現在の{0}機能がシリアルに接続",
    disconnect_tab_connection: "{0}機能のシリアル接続を切断",
    connect_for_tab: "{0}機能用にシリアル接続",
    
    // 版権情報
    powered_by: "提供元",
    all_rights_reserved: "全著作権所有",
    
    // デバッグ機能
    debug_mode: "デバッグモード",
    debug_basic: "基本",
    debug_detailed: "詳細",
    debug_verbose: "完全",
    export_debug: "デバッグログをエクスポート",
    debug_status: "デバッグ状態",
    debug_level: "デバッグレベル",
    packets_sent: "送信パケット数",
    packets_received: "受信パケット数",
    
    // 機能ボタンと操作
    fullscreen: "フルスクリーン",
    exit_fullscreen: "フルスクリーン終了",
    
    // 新規: デバッグモード状態
    debug_mode_enabled: "🔧 デバッグモード有効",
    debug_mode_disabled: "🔧 デバッグモード無効",
    enabled: "有効",
    disabled: "無効",
    
    // 新規: ボーレートリセット関連
    resetting_baudrate_115200: "シリアルポートのボーレートを115200にリセット中...",
    baudrate_reset_success: "✅ シリアルポートのボーレートを115200にリセットしました",
    direct_serial_reset_success: "✅ シリアルポートを115200に直接リセットしました",
    baudrate_reset_failed: "シリアルポートのボーレートリセットに失敗",
    direct_reset_failed: "シリアルポートの直接リセットも失敗",
    
    // 新規: ダウンローダマネージャ関連
    downloader_manager_not_initialized: "ダウンローダマネージャが初期化されていません",
    loaded_chip_types: "{0}種類のサポート対象チップタイプを読み込みました",
    using_default_chip_support: "デフォルトチップサポートを使用 (T5AI, T3)",
    unsupported_device_type: "サポートされていないデバイスタイプ: {0}",
    unsupported_chip_type: "サポートされていないチップタイプ: {0}",
    
    // 新規: ファームウェアダウンロードプロセス関連
    starting_firmware_download_process: "ファームウェアダウンロードプロセスを開始中...",
    starting_device_download: "{0}デバイスダウンロードを開始、ファイルサイズ: {1}文字",
    firmware_download_completed_time: "ファームウェアダウンロード完了! 総時間: {0}ms",
    device_firmware_download_completed: "{0}デバイスファームウェアダウンロード完了",
    initializing_downloader: "{0}ダウンローダを初期化中...",
    connecting_device: "{0}デバイスに接続中...",
    cannot_connect_device: "{0}デバイスに接続できません",
    downloading_firmware_to_device: "{0}デバイスにファームウェアをダウンロード中...",
    t5ai_firmware_download_completed: "T5AIファームウェアダウンロード完了",
    firmware_download_completed_device_restarted: "ファームウェアダウンロード完了、デバイスを再起動中...",
    serial_not_connected_connect_first: "シリアルが接続されていません、まずシリアルデバイスを接続してください",
    restoring_serial_reader_writer_failed: "シリアルreader/writerの復元に失敗",
    cleanup_reset_baudrate: "クリーンアップ: ボーレートをリセット中...",
    cleanup_baudrate_reset_success: "クリーンアップ: ボーレートのリセットに成功",
    cleanup_reset_failed: "クリーンアップ: リセットに失敗",
    flashdownloader_reset_baudrate: "FlashDownloader: ボーレートを115200にリセット中...",
    flashdownloader_baudrate_reset_success: "FlashDownloader: ✅ ボーレートを115200に正常にリセット",
    flashdownloader_direct_reset_success: "FlashDownloader: ✅ シリアルポートの直接リセットも成功",
    flashdownloader_reset_failed: "FlashDownloader: ボーレートリセット失敗",
    
    // 新規: シリアル接続状態メッセージ
    serial_connected_initial_switch: "初期接続、次に切り替えます",
    serial_connected_initial: "初期接続",
    bps: "bps",
    
    // システム情報関連
    system_info: "システム情報",
    system_info_os: "OS",
    system_info_browser: "ブラウザ",
    system_info_web_serial: "Web Serial",
    system_info_platform: "プラットフォーム",
    system_info_supported: "サポート",
    system_info_not_supported: "非サポート",
    
    // シリアルポートトラブルシューティングページ
    troubleshooting_title: "シリアルポートトラブルシューティングガイド",
    troubleshooting_subtitle: "シリアル接続問題を解決するための完全ガイド",
    back_to_main: "メインに戻る",
    no_serial_ports_found: "シリアルポートが見つかりませんか？",
    serial_troubleshooting_guide: "シリアル接続の問題？トラブルシューティングガイドを確認",
    serial_troubleshooting: "シリアルトラブルシューティング",
    
    // クイックチェックリスト
    quick_check_title: "クイックチェックリスト",
    basic_checks: "基本チェック項目",
    check_browser: "Chrome、Edge、またはその他のChromiumベースブラウザを使用",
    check_cable: "USBデータケーブルが正常に接続されている（充電ケーブルではない）",
    check_device_power: "デバイスが正しく電源投入されている",
    check_other_software: "シリアルポートを占有する他のソフトウェアを閉じる",
    
    // よくある問題
    common_issues_title: "よくある問題と解決策",
    issue_no_ports: "問題1: 利用可能なシリアルデバイスがない",
    issue_no_ports_desc: "「シリアル接続」をクリック後、デバイスリストが空",
    issue_connection_failed: "問題2: 接続失敗",
    issue_connection_failed_desc: "デバイスは見えるが接続時にエラーが発生",
    issue_no_data: "問題3: 接続成功だがデータなし",
    issue_no_data_desc: "シリアル接続は成功したがデータを受信しない",
    
    possible_causes: "考えられる原因：",
    cause_driver_missing: "デバイスドライバが未インストールまたは正しくインストールされていない",
    cause_cable_issue: "USBケーブルの問題（データケーブルではなく充電ケーブルを使用）",
    cause_device_not_recognized: "デバイスがシステムに認識されていない",
    cause_port_occupied: "シリアルポートが他のプログラムに占有されている",
    
    // ドライバ問題診断
    driver_diagnosis_title: "ドライバ問題診断",
    driver_diagnosis_desc: "ほとんどのシリアルポート問題はドライバ関連です。以下の手順で診断してください",
    
    // オペレーティングシステム
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    
    // Windows関連
    windows_check_device_manager: "ステップ1: デバイスマネージャーを確認",
    windows_step1_title: "デバイスマネージャーを開く",
    windows_step1_desc: "「このPC」を右クリック → 「プロパティ」 → 「デバイスマネージャー」、またはWin+Xを押して「デバイスマネージャー」を選択",
    windows_step2_title: "シリアルデバイスを探す",
    windows_step2_desc: "デバイスマネージャーで以下のカテゴリを探す：",
    windows_step3_title: "デバイス状態を識別",
    windows_step3_desc: "デバイスアイコンの状態を確認：",
    
    ports_com_lpt: "ポート（COMとLPT）",
    universal_serial_bus: "ユニバーサルシリアルバスコントローラー",
    other_devices: "その他のデバイス",
    
    device_normal: "✅ 正常：デバイス名が正常に表示",
    device_warning: "⚠️ 警告：黄色の感嘆符、ドライバに問題",
    device_error: "❌ エラー：赤いX、デバイスが無効",
    device_unknown: "❓ 不明：「その他のデバイス」内、ドライバ未インストール",
    
    windows_driver_install: "ステップ2: ドライバをインストール",
    windows_manual_install: "ステップ3: 手動ドライバインストール",
    
    // ドライバ説明
    ch340_desc: "最も一般的なUSB-シリアル変換チップ",
    cp210x_desc: "Silicon Labs USB-シリアル変換チップ",
    ftdi_desc: "FTDI USB-シリアル変換チップ",
    pl2303_desc: "Prolific USB-シリアル変換チップ",
    
    download_driver: "対応ドライバをダウンロード",
    download_driver_desc: "デバイスチップモデルに応じて対応ドライバをダウンロード",
    run_installer: "インストーラを実行",
    run_installer_desc: "ダウンロードしたドライバインストーラを管理者として実行",
    restart_computer: "コンピュータを再起動",
    restart_computer_desc: "インストール完了後、コンピュータを再起動してドライバを有効化",
    verify_installation: "インストールを確認",
    verify_installation_desc: "デバイスを再接続し、デバイスマネージャーで正常に表示されるか確認",
    
    screenshot_device_manager: "デバイスマネージャーのスクリーンショット位置",
    
    // macOS関連
    macos_check_system: "ステップ1: システム情報を確認",
    macos_step1_title: "システム情報を開く",
    macos_step1_desc: "Optionキーを押しながらAppleメニューをクリック → 「システム情報」",
    macos_step2_title: "USBデバイスを表示",
    macos_step2_desc: "左側で「USB」を選択し、接続されたUSBデバイスを表示",
    macos_step3_title: "シリアルデバイスを確認",
    macos_step3_desc: "ターミナルを開き、コマンドを入力してシリアルデバイスを表示：",
    
    macos_driver_install: "ステップ2: ドライバをインストール",
    macos_driver_note: "macOSは通常、ほとんどのUSB-シリアル変換ドライバを内蔵していますが、一部のチップは手動インストールが必要です",
    
    ch340_mac_desc: "macOS版CH340ドライバ",
    cp210x_mac_desc: "macOS版CP210xドライバ",
    
    // Linux関連
    linux_check_system: "ステップ1: システム認識を確認",
    linux_step1_title: "USBデバイスを確認",
    linux_step1_desc: "ターミナルを開き、以下のコマンドを入力：",
    linux_step2_title: "シリアルデバイスを確認",
    linux_step2_desc: "利用可能なシリアルデバイスを表示：",
    linux_step3_title: "カーネルメッセージを確認",
    linux_step3_desc: "デバイス接続時のカーネルメッセージを表示：",
    
    linux_permissions: "ステップ2: 権限を設定",
    linux_add_user_group: "ユーザーをdialoutグループに追加",
    linux_add_user_desc: "以下のコマンドを実行し、再ログイン：",
    linux_check_permissions: "デバイス権限を確認",
    linux_check_permissions_desc: "デバイス権限設定を確認：",
    
    // 高度なトラブルシューティング
    advanced_troubleshooting: "高度なトラブルシューティング",
    hardware_issues: "ハードウェア問題調査",
    software_conflicts: "ソフトウェア競合解決",
    
    try_different_cable: "異なるUSBデータケーブルを試す",
    try_different_port: "異なるUSBポートを試す",
    try_different_computer: "他のコンピュータでデバイスをテスト",
    check_device_power: "デバイスの電源供給が正常か確認",
    
    close_other_serial_software: "他のシリアルデバッグソフトウェアを閉じる",
    disable_antivirus: "一時的にアンチウイルスソフトウェアを無効化",
    update_browser: "ブラウザを最新バージョンに更新",
    clear_browser_cache: "ブラウザキャッシュとデータをクリア",
    
    // ヘルプを取得
    get_help_title: "ヘルプを取得",
    get_help_desc: "上記の方法で問題が解決しない場合は、以下の情報を収集してテクニカルサポートにお問い合わせください：",
    
    help_info_os: "オペレーティングシステムバージョン",
    help_info_browser: "ブラウザバージョン",
    help_info_device: "デバイスモデルとチップ情報",
    help_info_error: "具体的なエラーメッセージのスクリーンショット",
    help_info_device_manager: "デバイスマネージャーのスクリーンショット（Windows）",
    
    github_support_desc: "GitHubで問題レポートを提出",
    community_forum: "コミュニティフォーラム",
    forum_support_desc: "コミュニティフォーラムでヘルプを求める",
    
    // TuyaOpen認証関連
    tab_tuya_auth: "TuyaOpen認証",
    tuya_auth_title: "TuyaOpen認証コード",
    tuya_auth_subtitle: "デバイスにTuyaOpenプロジェクト認証情報を書き込み",
    uuid_label: "UUID (20文字):",
    auth_key_label: "AUTH_KEY (32文字):",
    uuid_placeholder: "20文字のUUIDを入力してください...",
    auth_key_placeholder: "32文字のAUTH_KEYを入力してください...",
    authorize_btn: "認証書き込み",
    tuya_auth_notice_title: "⚠️ 重要な注意事項",
    tuya_auth_notice_content: "この認証機能は、TuyaOpenプロジェクトの認証コード書き込みのみに適用され、非TuyaOpenプロジェクトでは使用できません。",
    tuya_auth_additional_info: "認証操作を行う前に、デバイスが認証モードになっており、シリアルポートが正しく接続されていることを確認してください。",
    uuid_length_error: "UUID長エラー！20文字のUUIDを入力してください",
    auth_key_length_error: "AUTH_KEY長エラー！32文字のAUTH_KEYを入力してください",
    uuid_empty_error: "UUIDを入力してください",
    auth_key_empty_error: "AUTH_KEYを入力してください",
    tuya_auth_success: "✅ TuyaOpen認証情報の書き込みが成功しました！",
    tuya_auth_failed: "❌ TuyaOpen認証情報の書き込みに失敗しました: {0}",
    tuya_auth_sending: "認証情報を送信中...",
    tuya_auth_command_sent: "認証コマンドを送信しました: auth {0} {1}",
    
    // 認証関連ステータス情報
    tuya_auth_waiting: "認証操作を待機中...",
    tuya_auth_connected: "認証シリアル接続済み",
    tuya_auth_disconnected: "認証シリアル切断済み",
    connect_tuya_auth: "認証シリアル接続",
    disconnect_tuya_auth: "認証シリアル切断",
    tuya_auth_serial_connected: "TuyaOpen認証シリアルが正常に接続されました！",
    tuya_auth_serial_disconnected: "TuyaOpen認証シリアルが切断されました。",
    tab_tuya_auth_name: "TuyaOpen認証",
    
    // TuyaOpenライセンスガイド関連
    license_guide: "認証コード取得ガイド",
    license_guide_title: "TuyaOpen認証コード取得ガイド",
    license_guide_subtitle: "TuyaOpen認証コードと取得方法を理解する",
    
    // 什么是TuyaOpen专用授权码
    what_is_license: "TuyaOpen専用認証コードとは？",
    license_info: "TuyaOpenフレームワークのすべてのバージョンは、Tuyaクラウドに正常に接続するために専用の認証コードが必要です。他の認証コードでは正常に機能しません。",
    supported_frameworks: "サポートされているTuyaOpenフレームワーク",
    c_version: "TuyaOpen Cバージョン",
    arduino_version: "TuyaOpen Arduinoバージョン", 
    lua_version: "TuyaOpen Luanodeバージョン",
    
    // 如何获取授权码
    how_to_get: "認証コードの取得方法",
    method1_title: "方法1：プリプログラムされたモジュールの購入",
    method1_desc: "Tuya開発者プラットフォームを通じてTuyaOpen認証コードがプリプログラムされたモジュールを購入します。このコードは工場で対応するモジュールにプログラムされており、失われることはありません。TuyaOpenは起動時に`tuya_iot_license_read()`インターフェースを通じて認証コードを読み取ります。現在のデバイスにTuyaOpen認証コードがプログラムされているかを確認してください。",
    method1_advantage: "利点：プラグ＆プレイ、手動操作不要",
    
    method2_title: "方法2：Tuyaプラットフォームでの購入",
    method2_desc: "Tuya開発者プラットフォームを通じてTuyaOpen認証コードを購入し、シリアルポートツールを使用してモジュールに書き込みます。",
    method2_advantage: "利点：公式プラットフォーム、一括購入サポート",
    visit_platform: "プラットフォームを訪問",
    visit_platform_preburn: "プリプログラムされたモジュールを購入",
    
    method3_title: "方法3：Taobaoでの購入",
    method3_desc: "Taobaoショップを通じてTuyaOpen認証コードを購入し、シリアルポートツールを使用してモジュールに書き込みます。",
    method3_advantage: "利点：便利な購入、柔軟な支払い方法",
    visit_taobao: "Taobaoを訪問",
    
    // 使用指南
    usage_guide: "使用ガイド",
    check_existing: "ステップ1：既存の認証コードを確認",
    check_warning: "まず、現在のデバイスに既にTuyaOpen認証コードがプログラムされているかを確認し、重複購入を避けてください。",
    write_license: "ステップ2：認証コードの書き込み",
    write_desc: "デバイスに認証コードがプログラムされていない場合、このツールの「TuyaOpen Auth」機能を使用して書き込むことができます：",
    write_step1: "デバイスをコンピューターに接続",
    write_step2: "「TuyaOpen Auth」タブに切り替え",
    write_step3: "シリアルポートを接続",
    write_step4: "購入したUUIDとAUTH_KEYを入力",
    write_step5: "「認証の書き込み」ボタンをクリック",
    write_success: "認証コードの書き込みが成功した後、デバイスは正常にTuyaOpenフレームワークを使用してTuyaクラウドに接続できます。",
    
    // 常见问题
    faq_title: "よくある質問",
    q1: "Q：他のタイプの認証コードを使用できますか？",
    a1: "A：いいえ。TuyaOpenフレームワークはTuyaOpen専用の認証コードのみを使用できます。他の認証コードでは正常にTuyaクラウドに接続できません。",
    q2: "Q：認証コードは失われますか？",
    a2: "A：通常の状況では、認証コードは失われません。プリプログラムされたモジュールの認証コードは工場でプログラムされており、手動で書き込まれたコードはモジュールの不揮発性ストレージ領域に保存されます。",
    q3: "Q：デバイスに既に認証コードがあるかどうかを確認するには？",
    a3: "A：TuyaOpenプログラムを通じて`tuya_iot_license_read()`インターフェースを呼び出すことで確認できます。",
    
    // 技术支援
    support_title: "技術サポート",
    support_desc: "使用中に問題が発生した場合は、以下の方法でサポートを受けてください：",
    github_support: "問題レポートを提出"
};

// グローバルにエクスポート
if (typeof window !== 'undefined') {
    window.i18nLanguages = window.i18nLanguages || {};
    window.i18nLanguages.ja = ja;
}
