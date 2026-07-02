// Español (es-ES)
const es = {
    // Título de página y descripción
    title: "Herramienta Serial TuyaOpen",
    subtitle: "Herramienta de desarrollador todo-en-uno basada en la API Chrome Web Serial",
    
    // Requisitos del navegador y aviso de versión beta
    browser_requirement: "Esta herramienta requiere navegadores basados en Chrome. Otros navegadores no pueden funcionar correctamente. Use Chrome, Edge u otros navegadores basados en Chromium.",
    beta_notice: "Si encuentra algún problema mientras usa esta herramienta, por favor repórtelo en el repositorio en",
    repository_link: "Repositorio TuyaOpen-WebTools",
    
    // Enlaces relacionados con el proyecto
    project_info: "Este proyecto es parte de TuyaOpen. Los proyectos relacionados incluyen:",
    tuya_open_project: "TuyaOpen",
    arduino_project: "Arduino-TuyaOpen",
    lua_project: "Luanode-TuyaOpen",
    tools_project: "TuyaOpen-WebTools",
    
    // Etiquetas de pestañas
    tab_serial: "Debug Serial",
    tab_flash: "Descarga de Firmware",
    
    // Panel de control
    control_title: "Control de Conexión Serial",
    flash_connection_control: "Conexión Serial de Flash de Firmware",
    connect: "Conectar Serial",
    connect_flash: "Conectar Serial de Flash de Firmware",
    disconnect: "Desconectar",
    disconnect_flash: "Desconectar Flash de Firmware",
    status_disconnected: "Desconectado",
    status_connected: "Conectado",
    serial_target_device: "Dispositivo objetivo:",
    custom_device: "Personalizado",
    baud_rate: "Tasa de baudios:",
    data_bits: "Bits de Datos:",
    stop_bits: "Bits de Parada:",
    parity: "Paridad:",
    parity_none: "Ninguna",
    parity_even: "Par",
    parity_odd: "Impar",
    
    // Debug serial
    receive_data: "Datos Recibidos",
    save_log: "Guardar Registro",
    auto_scroll: "Desplazamiento Automático",
    show_timestamp: "Mostrar Marca de Tiempo",
    waiting_data: "Esperando datos seriales...",
    received: "RX",
    sent: "TX",
    bytes: "bytes",
    
    // Análisis de errores relacionado
    error_analysis: "Análisis de Log de Errores",
    clear_analysis: "Limpiar Análisis (Restablecer Detección)",
    auto_analysis: "Análisis Automático",
    no_errors_detected: "No se detectaron errores...",
    test_error_analysis: "Probar Análisis de Errores",
    
    send_data: "Enviar datos",
    hex_mode: "Modo HEX",
    add_newline: "Agregar Nueva Línea",
    input_placeholder: "Ingrese datos para enviar...",
    input_placeholder_hex: "Ingrese datos hex (ej.: FF 01 02 03)...",
    send: "Enviar",
    
    quick_send: "Envío Rápido:",
    manage: "Gestionar Comandos",
    no_quick_commands: "No hay comandos rápidos aún. Haga clic en 'Gestionar Comandos' para agregar comandos AT comunes, instrucciones de depuración, etc. y mejorar la eficiencia de depuración",
    
    // Flash de firmware
    flash_config: "Configuración de Flash de Firmware",
    target_device: "Dispositivo Objetivo:",
    esp32_flash_address: "Dirección ESP32-Series Flash:",
    complete_firmware: "0x0000 (Firmware completo)",
    custom_address: "Dirección personalizada...",
    custom_address_placeholder: "0x10000",
    select_file: "Seleccionar Archivo de Firmware",
    no_file_selected: "No se ha seleccionado archivo, haz clic en \"Seleccionar Archivo de Firmware\" para abrir manualmente un archivo flash o arrastra el archivo flash al cuadro de archivo",
    file_size: "Tamaño del Archivo",
    start_download: "Iniciar Flash",
    stop_download: "Finalizar Flash",
    auto_disconnect_after_flash: "Desconectar automáticamente después del flash",
    preparing: "Preparando...",
    downloaded: "Flasheado",
    download_log: "Registro de grabación",
    clear_log: "Limpiar Registro",
    waiting_download: "Esperando operación de flash...",
    
    // Gestión de comandos rápidos
    quick_send_management: "Gestión de Envío Rápido",
    add_new_command: "Agregar Nuevo Comando",
    display_name: "Nombre a Mostrar:",
    name_example: "ej.: Reiniciar",
    send_content: "Contenido a Enviar:",
    content_example: "ej.: AT+RST",
    add: "Agregar",
    existing_commands: "Comandos Existentes",
    no_commands: "No hay comandos rápidos",
    reset_default: "Restablecer Predeterminado",
    close: "Cerrar",
    
    // Mensajes de error
    error: "Error",
    
    // Mensajes del sistema
    serial_connected: "¡Serial conectado exitosamente!",
    serial_disconnected: "Serial desconectado.",
    flash_serial_connected: "¡Conexión Serial de Flash de Firmware Exitosa!",
    flash_serial_disconnected: "Serial de Flash de Firmware Desconectado.",
    switch_to_tab: "Cambiado a {0}, conexión serial cerrada",
    tab_serial_name: "Debug Serial",
    tab_flash_name: "Flash de Firmware",
    
    // Diálogos de confirmación
    switch_tab_confirm: "⚠️ Advertencia de Mutex Serial\n\nLa función {0} actual está usando conexión serial.\nLas funciones {0} y {1} no pueden usar serial simultáneamente.\n\nCambiar a {1} hará:\n• Desconectar automáticamente la conexión serial actual\n• Detener operaciones en curso\n\n¿Está seguro de cambiar?",
    delete_command_confirm: "¿Está seguro de eliminar este comando rápido?",
    reset_commands_confirm: "¿Está seguro de restablecer a los comandos rápidos predeterminados? Esto eliminará todos los comandos personalizados.",
    
    // Mensajes de validación
    fill_complete_info: "Por favor complete el nombre del comando y el contenido",
    command_name_exists: "El nombre del comando ya existe, por favor use otro nombre",
    no_data_to_save: "No hay datos para guardar",
    no_log_to_save: "No hay registro para guardar",
    please_select_file: "Por favor seleccione primero el archivo de firmware",
    please_connect_serial: "Por favor conecte primero el serial",
    please_connect_flash_serial: "Por favor conecte primero el serial de flash de firmware",
    flash_serial_not_connected: "Serial de Flash de Firmware no conectado",
    
    // Relacionado con Web Serial API
    browser_not_supported: "Su navegador no soporta Web Serial API. Por favor use Chrome 89+ o Edge 89+.",
    connect_failed: "Falló la conexión: {0}",
    disconnect_failed: "Falló la desconexión: {0}",
    read_error: "Error de lectura de datos: {0}",
    send_error: "Error de envío de datos: {0}",
    hex_length_error: "La longitud de la cadena HEX debe ser par",
    serial_not_connected: "Serial no conectado",
    download_failed: "Falló el flash: {0}",
    
    // Operaciones de archivo
    file_selected: "Archivo seleccionado: {0} ({1} bytes)",
    start_download_to: "Iniciando flash de firmware a {0}...",
    download_complete: "¡Flash de firmware completado!",
    user_cancelled: "Usuario canceló el flash",
    
    // Mensajes de progreso de descarga de firmware
    flash_handshaking: "Estableciendo handshake...",
    flash_handshake_success: "Handshake exitoso",
    flash_handshake_failed: "Falló el handshake, por favor verifique la conexión del dispositivo",
    flash_download_cancelled: "Flash cancelado",
    waiting_reset: "Esperando reinicio del dispositivo...",
    flash_setting_baudrate: "Estableciendo velocidad de baudios a {0}...",
    flash_baudrate_set: "Velocidad de baudios establecida exitosamente",
    flash_erasing: "Borrando Flash...",
    flash_erase_progress: "Progreso de borrado: {0}/{1}",
    flash_erase_sector_failed: "Falló el borrado del sector {0}: {1}",
    flash_erase_complete: "Borrado de Flash completo",
    flash_writing_data: "Escribiendo datos...",
    flash_write_progress: "Progreso de escritura: {0}/{1}",
    flash_write_block_failed: "Falló la escritura del bloque {0}: {1}",
    flash_write_complete: "Escritura de datos completa",
    flash_verifying_crc: "Verificando datos...",
    flash_crc_passed: "Verificación CRC pasada",
    flash_crc_failed_mismatch: "Falló la verificación CRC: local={0}, dispositivo={1}",
    flash_crc_failed: "Falló la verificación CRC: {0}",
    flash_rebooting: "Reiniciando dispositivo...",
    flash_download_complete: "Flash completo",
    flash_download_success: "¡Flash completado exitosamente!",
    flash_download_failed: "Falló el flash: {0}",
    flash_downloading: "Flash en progreso, por favor espere hasta completar",
    flash_user_cancelled: "Usuario canceló la operación",
    
    // Nombres de archivos de registro
    serial_log_filename: "registro_serial_{0}.txt",
    flash_log_filename: "registro_flash_{0}.txt",
    
    // Tooltips
    current_tab_connected: "Función {0} actual conectada al serial",
    disconnect_tab_connection: "Desconectar conexión serial de función {0}",
    connect_for_tab: "Conectar serial para función {0}",
    
    // Información de copyright
    powered_by: "Desarrollado por",
    all_rights_reserved: "Todos los derechos reservados",
    
    // Funciones de debug
    debug_mode: "Modo Debug",
    debug_basic: "Básico",
    debug_detailed: "Detallado",
    debug_verbose: "Completo",
    export_debug: "Exportar Registro de Debug",
    debug_status: "Estado de Debug",
    debug_level: "Nivel de Debug",
    packets_sent: "Paquetes Enviados",
    packets_received: "Paquetes Recibidos",
    
    // Botones de función y operaciones
    fullscreen: "Pantalla completa",
    exit_fullscreen: "Salir de pantalla completa",
    
    // Nuevo: Estado del modo debug
    debug_mode_enabled: "🔧 Modo debug habilitado",
    debug_mode_disabled: "🔧 Modo debug deshabilitado",
    enabled: "Habilitado",
    disabled: "Deshabilitado",
    
    // Nuevo: Relacionado con reset de baudrate
    resetting_baudrate_115200: "Restableciendo baudrate del puerto serie a 115200...",
    baudrate_reset_success: "✅ Baudrate del puerto serie restablecido a 115200",
    direct_serial_reset_success: "✅ Puerto serie restablecido directamente a 115200",
    baudrate_reset_failed: "Error al restablecer baudrate del puerto serie",
    direct_reset_failed: "Error al restablecer directamente el puerto serie también",
    
    // Nuevo: Relacionado con gestor de descarga
    downloader_manager_not_initialized: "Gestor de descarga no inicializado",
    loaded_chip_types: "Cargados {0} tipos de chip soportados",
    using_default_chip_support: "Usando soporte de chip por defecto (T5AI, T3)",
    unsupported_device_type: "Tipo de dispositivo no soportado: {0}",
    unsupported_chip_type: "Tipo de chip no soportado: {0}",
    
    // Nuevo: Relacionado con proceso de descarga de firmware
    starting_firmware_download_process: "Iniciando proceso de descarga de firmware...",
    starting_device_download: "Iniciando descarga de dispositivo {0}, tamaño de archivo: {1} bytes",
    firmware_download_completed_time: "Descarga de firmware completada! Tiempo total: {0}ms",
    device_firmware_download_completed: "Descarga de firmware de dispositivo {0} completada",
    initializing_downloader: "Inicializando descargador {0}...",
    connecting_device: "Conectando con dispositivo {0}...",
    cannot_connect_device: "No se puede conectar con dispositivo {0}",
    downloading_firmware_to_device: "Descargando firmware a dispositivo {0}...",
    t5ai_firmware_download_completed: "Descarga de firmware T5AI completada",
    firmware_download_completed_device_restarted: "Descarga de firmware completada, dispositivo reiniciándose...",
    serial_not_connected_connect_first: "Puerto serie no conectado, por favor conecte primero el dispositivo serie",
    restoring_serial_reader_writer_failed: "Error al restaurar reader/writer del puerto serie",
    cleanup_reset_baudrate: "Limpieza: Restableciendo baudrate...",
    cleanup_baudrate_reset_success: "Limpieza: Baudrate restablecido exitosamente",
    cleanup_reset_failed: "Limpieza: Error en el restablecimiento",
    flashdownloader_reset_baudrate: "FlashDownloader: Restableciendo baudrate a 115200...",
    flashdownloader_baudrate_reset_success: "FlashDownloader: ✅ Baudrate restablecido exitosamente a 115200",
    flashdownloader_direct_reset_success: "FlashDownloader: ✅ Reset directo del puerto serie también exitoso",
    flashdownloader_reset_failed: "FlashDownloader: Error en el restablecimiento de baudrate",
    
    // Nuevo: Mensajes de estado de conexión serie
    serial_connected_initial_switch: "conexión inicial, cambiará a",
    serial_connected_initial: "conexión inicial",
    bps: "bps",
    
    // Información del sistema
    system_info: "Información del Sistema",
    system_info_os: "SO",
    system_info_browser: "Navegador",
    system_info_web_serial: "Web Serial",
    system_info_platform: "Plataforma",
    system_info_supported: "Soportado",
    system_info_not_supported: "No soportado",
    
    // Manejo de desconexión serie
    serial_disconnected_unexpectedly: "Conexión serie desconectada inesperadamente: {0}",
    
    // Página de solución de problemas del puerto serie
    troubleshooting_title: "Guía de Solución de Problemas del Puerto Serie",
    troubleshooting_subtitle: "Guía completa para resolver problemas de conexión serie",
    back_to_main: "Volver al inicio",
    no_serial_ports_found: "¿No se encontraron puertos serie?",
    serial_troubleshooting_guide: "¿Problemas de conexión serie? Consulte la guía de solución de problemas",
    serial_troubleshooting: "Solución de problemas serie",
    
    // Lista de verificación rápida
    quick_check_title: "Lista de Verificación Rápida",
    basic_checks: "Elementos de verificación básicos",
    check_browser: "Usar Chrome, Edge u otros navegadores basados en Chromium",
    check_cable: "Cable de datos USB conectado correctamente (no cable de carga)",
    check_device_power: "El dispositivo está correctamente encendido",
    check_other_software: "Cerrar otro software que ocupe puertos serie",
    
    // Problemas comunes
    common_issues_title: "Problemas Comunes y Soluciones",
    issue_no_ports: "Problema 1: No hay dispositivos serie disponibles",
    issue_no_ports_desc: "La lista de dispositivos está vacía después de hacer clic en \"Conectar Serie\"",
    issue_connection_failed: "Problema 2: Fallo de conexión",
    issue_connection_failed_desc: "El dispositivo es visible pero ocurre un error al conectar",
    issue_no_data: "Problema 3: Conectado pero sin datos",
    issue_no_data_desc: "La conexión serie es exitosa pero no se reciben datos o la visualización de datos es anormal",
    
    possible_causes: "Posibles causas:",
    cause_driver_missing: "Controlador del dispositivo no instalado o instalado incorrectamente",
    cause_cable_issue: "Problema del cable USB (usando cable de carga en lugar de cable de datos)",
    cause_device_not_recognized: "Dispositivo no reconocido por el sistema",
    cause_port_occupied: "Puerto serie ocupado por otros programas",
    cause_permission_denied: "Permisos insuficientes (Linux/macOS)",
    cause_device_busy: "Dispositivo siendo usado por otras aplicaciones",
    cause_driver_conflict: "Conflicto de controladores o incompatibilidad",
    cause_baud_rate_mismatch: "Configuración de velocidad de baudios no coincide",
    cause_serial_params_wrong: "Configuración incorrecta de bits de datos, bits de parada o paridad",
    cause_device_not_sending: "El dispositivo no está enviando datos",
    cause_flow_control: "Problemas de configuración de control de flujo",
    cause_cable_quality: "Problemas de calidad del cable de datos o mal contacto",
    
    // Diagnóstico de problemas de controladores
    driver_diagnosis_title: "Diagnóstico de Problemas de Controladores",
    driver_diagnosis_desc: "La mayoría de los problemas de puerto serie están relacionados con controladores, siga estos pasos para el diagnóstico",
    
    // Sistemas operativos
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    
    // Relacionado con Windows
    windows_check_device_manager: "Paso 1: Verificar Administrador de Dispositivos",
    windows_step1_title: "Abrir Administrador de Dispositivos",
    windows_step1_desc: "Clic derecho en \"Este PC\" → \"Propiedades\" → \"Administrador de dispositivos\", o presionar Win+X y seleccionar \"Administrador de dispositivos\"",
    windows_step2_title: "Encontrar dispositivos serie",
    windows_step2_desc: "Buscar las siguientes categorías en el Administrador de dispositivos:",
    windows_step3_title: "Identificar estado del dispositivo",
    windows_step3_desc: "Verificar el estado del icono del dispositivo:",
    
    ports_com_lpt: "Puertos (COM y LPT)",
    universal_serial_bus: "Controladores de bus serie universal",
    other_devices: "Otros dispositivos",
    
    device_normal: "✅ Normal: Nombre del dispositivo mostrado normalmente",
    device_warning: "⚠️ Advertencia: Signo de exclamación amarillo, problema de controlador",
    device_error: "❌ Error: X roja, dispositivo deshabilitado",
    device_unknown: "❓ Desconocido: En \"Otros dispositivos\", controlador no instalado",
    
    windows_driver_install: "Paso 2: Instalar controladores",
    windows_manual_install: "Paso 3: Instalación manual de controlador",
    
    // Descripciones de controladores
    ch340_desc: "Chip USB a serie más común",
    cp210x_desc: "Chip USB a serie Silicon Labs",
    ftdi_desc: "Chip USB a serie FTDI",
    
    download_driver: "Descargar controlador correspondiente",
    download_driver_desc: "Descargar el controlador correspondiente según el modelo de chip del dispositivo",
    run_installer: "Ejecutar instalador",
    run_installer_desc: "Ejecutar el instalador de controlador descargado como administrador",
    restart_computer: "Reiniciar computadora",
    restart_computer_desc: "Reiniciar la computadora después de la instalación para activar el controlador",
    verify_installation: "Verificar instalación",
    verify_installation_desc: "Reconectar el dispositivo y verificar si se muestra normalmente en el Administrador de dispositivos",
    
    screenshot_device_manager: "Ubicación de captura de pantalla del Administrador de dispositivos",
    
    // Relacionado con macOS
    macos_check_system: "Paso 1: Verificar información del sistema",
    macos_step1_title: "Abrir Información del Sistema",
    macos_step1_desc: "Mantener presionada la tecla Option y hacer clic en el menú Apple → \"Información del Sistema\"",
    macos_step2_title: "Ver dispositivos USB",
    macos_step2_desc: "Seleccionar \"USB\" a la izquierda para ver dispositivos USB conectados",
    macos_step3_title: "Verificar dispositivos serie",
    macos_step3_desc: "Abrir Terminal e ingresar comando para ver dispositivos serie:",
    
    macos_driver_install: "Paso 2: Instalar controladores",
    macos_driver_note: "macOS generalmente tiene incorporados la mayoría de los controladores USB a serie, pero algunos chips aún requieren instalación manual",
    
    ch340_mac_desc: "Controlador CH340 para macOS",
    cp210x_mac_desc: "Controlador CP210x para macOS",
    
    // Relacionado con Linux
    linux_check_system: "Paso 1: Verificar reconocimiento del sistema",
    linux_step1_title: "Verificar dispositivos USB",
    linux_step1_desc: "Abrir terminal e ingresar el siguiente comando:",
    linux_step2_title: "Verificar dispositivos serie",
    linux_step2_desc: "Ver dispositivos serie disponibles:",
    linux_step3_title: "Verificar mensajes del kernel",
    linux_step3_desc: "Ver mensajes del kernel al conectar el dispositivo:",
    
    linux_permissions: "Paso 2: Configurar permisos",
    linux_add_user_group: "Agregar usuario al grupo dialout",
    linux_add_user_desc: "Ejecutar el siguiente comando y volver a iniciar sesión:",
    linux_check_permissions: "Verificar permisos del dispositivo",
    linux_check_permissions_desc: "Confirmar configuración de permisos del dispositivo:",
    
    // Solución de problemas avanzada
    advanced_troubleshooting: "Solución de Problemas Avanzada",
    hardware_issues: "Investigación de problemas de hardware",
    software_conflicts: "Resolución de conflictos de software",
    
    try_different_cable: "Probar cable de datos USB diferente",
    try_different_port: "Probar puerto USB diferente",
    try_different_computer: "Probar dispositivo en otras computadoras",
    check_device_power: "Verificar si la alimentación del dispositivo es normal",
    
    close_other_serial_software: "Cerrar otro software de depuración serie",
    disable_antivirus: "Deshabilitar temporalmente software antivirus",
    update_browser: "Actualizar navegador a la última versión",
    clear_browser_cache: "Limpiar caché y datos del navegador",
    
    // Obtener ayuda
    get_help_title: "Obtener Ayuda",
    get_help_desc: "Si ninguno de los métodos anteriores puede resolver el problema, recopile la siguiente información y contacte al soporte técnico:",
    
    help_info_os: "Versión del sistema operativo",
    help_info_browser: "Versión del navegador",
    help_info_device: "Modelo del dispositivo e información del chip",
    help_info_error: "Capturas de pantalla de mensajes de error específicos",
    help_info_device_manager: "Capturas de pantalla del Administrador de dispositivos (Windows)",
    
    github_support_desc: "Enviar reporte de problema en GitHub",
    
    // Nuevo: TuyaOpen Authorization related
    tab_tuya_auth: "Autorización TuyaOpen",
    tuya_auth_title: "Escritura de Código de Autorización TuyaOpen",
    tuya_auth_subtitle: "Escribir información de autorización del proyecto TuyaOpen en el dispositivo",
    uuid_label: "UUID (20 caracteres):",
    auth_key_label: "AUTH_KEY (32 caracteres):",
    uuid_placeholder: "Ingrese un UUID de 20 caracteres...",
    auth_key_placeholder: "Ingrese una AUTH_KEY de 32 caracteres...",
    authorize_btn: "Escribir Autorización",
    tuya_auth_notice_title: "⚠️ Aviso Importante",
    tuya_auth_notice_content: "Esta función de autorización solo es aplicable para escribir códigos de autorización de proyectos TuyaOpen y no puede usarse para proyectos que no sean TuyaOpen.",
    tuya_auth_additional_info: "Asegúrese de que el dispositivo esté en modo de autorización y el puerto serie esté conectado correctamente antes de proceder con la operación de autorización.",
    uuid_length_error: "¡Error de longitud UUID! Ingrese un UUID de 20 caracteres",
    auth_key_length_error: "¡Error de longitud AUTH_KEY! Ingrese una AUTH_KEY de 32 caracteres",
    uuid_empty_error: "Por favor ingrese el UUID",
    auth_key_empty_error: "Por favor ingrese el AUTH_KEY",
    tuya_auth_success: "✅ ¡Información de autorización TuyaOpen escrita exitosamente!",
    tuya_auth_failed: "❌ Error al escribir información de autorización TuyaOpen: {0}",
    tuya_auth_sending: "Enviando información de autorización...",
    tuya_auth_command_sent: "Comando de autorización enviado: auth {0} {1}",
    
    // Información de estado relacionada con autorización
    tuya_auth_waiting: "Esperando operación de autorización...",
    tuya_auth_connected: "Puerto serie de autorización conectado",
    tuya_auth_disconnected: "Puerto serie de autorización desconectado",
    connect_tuya_auth: "Conectar Puerto Serie de Autorización",
    disconnect_tuya_auth: "Desconectar Puerto Serie de Autorización",
    tuya_auth_serial_connected: "¡Puerto serie de autorización TuyaOpen conectado exitosamente!",
    tuya_auth_serial_disconnected: "Puerto serie de autorización TuyaOpen desconectado.",
    tab_tuya_auth_name: "Autorización TuyaOpen",
    
    // TuyaOpen授权码指南相关
    license_guide: "Guía de Obtención de Código de Autorización",
    license_guide_title: "Guía de Obtención de Código de Autorización TuyaOpen",
    license_guide_subtitle: "Entender el código de autorización TuyaOpen y métodos de obtención",
    
    // 什么是TuyaOpen专用授权码
    what_is_license: "¿Qué es el Código de Autorización Exclusivo TuyaOpen?",
    license_info: "Todas las versiones del TuyaOpen Framework requieren un código de autorización exclusivo para conectarse normalmente a la nube Tuya. Otros códigos de autorización no pueden funcionar correctamente.",
    supported_frameworks: "Frameworks TuyaOpen Soportados",
    c_version: "TuyaOpen versión C",
    arduino_version: "TuyaOpen versión Arduino", 
    lua_version: "TuyaOpen versión Luanode",
    
    // 如何获取授权码
    how_to_get: "Cómo Obtener el Código de Autorización",
    method1_title: "Método 1: Comprar Módulos Pre-grabados",
    method1_desc: "Comprar módulos con código de autorización TuyaOpen pre-grabado a través de la plataforma de desarrolladores Tuya. Este código está grabado en el módulo correspondiente de fábrica y no se perderá. TuyaOpen lee el código de autorización a través de la interfaz `tuya_iot_license_read()` al iniciar. Confirme si el dispositivo actual tiene grabado el código de autorización TuyaOpen.",
    method1_advantage: "Ventaja: Plug and play, sin operación manual requerida",
    
    method2_title: "Método 2: Compra en Plataforma Tuya",
    method2_desc: "Comprar código de autorización TuyaOpen a través de la plataforma de desarrolladores Tuya, luego escribirlo en el módulo usando herramientas de puerto serie.",
    method2_advantage: "Ventaja: Plataforma oficial, soporte compras en lotes",
    visit_platform: "Visitar Plataforma",
    visit_platform_preburn: "Comprar Módulos Pre-grabados",
    
    method3_title: "Método 3: Compra en Taobao",
    method3_desc: "Comprar código de autorización TuyaOpen a través de tiendas Taobao, luego escribirlo en el módulo usando herramientas de puerto serie.",
    method3_advantage: "Ventaja: Compra conveniente, métodos de pago flexibles",
    visit_taobao: "Visitar Taobao",
    
    // 使用指南
    usage_guide: "Guía de Uso",
    check_existing: "Paso 1: Verificar Código de Autorización Existente",
    check_warning: "Primero confirme si el dispositivo actual ya tiene grabado el código de autorización TuyaOpen para evitar compras duplicadas.",
    write_license: "Paso 2: Escribir Código de Autorización",
    write_desc: "Si el dispositivo no tiene código de autorización grabado, puede usar la función \"TuyaOpen Auth\" de esta herramienta para escribirlo:",
    write_step1: "Conectar dispositivo a la computadora",
    write_step2: "Cambiar a la pestaña \"TuyaOpen Auth\"",
    write_step3: "Conectar puerto serie",
    write_step4: "Ingresar UUID y AUTH_KEY comprados",
    write_step5: "Hacer clic en el botón \"Escribir Autorización\"",
    write_success: "Después de escribir exitosamente el código de autorización, el dispositivo puede usar normalmente el framework TuyaOpen para conectarse a la nube Tuya.",
    
    // 常见问题
    faq_title: "Preguntas Frecuentes",
    q1: "P: ¿Se pueden usar otros tipos de códigos de autorización?",
    a1: "R: No. El framework TuyaOpen solo puede usar códigos de autorización exclusivos TuyaOpen. Otros códigos de autorización no pueden conectarse normalmente a la nube Tuya.",
    q2: "P: ¿Se perderá el código de autorización?",
    a2: "R: En circunstancias normales, el código de autorización no se perderá. El código de autorización de módulos pre-grabados está grabado de fábrica, y el código escrito manualmente se guarda en el área de almacenamiento no volátil del módulo.",
    q3: "P: ¿Cómo verificar si el dispositivo ya tiene código de autorización?",
    a3: "R: Se puede verificar llamando la interfaz `tuya_iot_license_read()` a través del programa TuyaOpen.",
    
    // 技术支持
    support_title: "Soporte Técnico",
    support_desc: "Si encuentra problemas durante el uso, obtenga ayuda a través de los siguientes métodos:",
    github_support: "Enviar Reporte de Problema"
};

// Exportar a global
if (typeof window !== 'undefined') {
    window.i18nLanguages = window.i18nLanguages || {};
    window.i18nLanguages.es = es;
}