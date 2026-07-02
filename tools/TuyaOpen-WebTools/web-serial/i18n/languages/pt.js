// Português (pt-PT)
const pt = {
    // Título da página e descrição
    title: "Ferramenta Serial TuyaOpen",
    subtitle: "Ferramenta de desenvolvedor tudo-em-um baseada na API Chrome Web Serial",
    
    // Requisitos do navegador e aviso de versão beta
    browser_requirement: "Esta ferramenta requer navegadores baseados no Chrome. Outros navegadores não podem funcionar corretamente. Use Chrome, Edge ou outros navegadores baseados no Chromium.",
    beta_notice: "Se encontrar algum problema ao usar esta ferramenta, por favor reporte no repositório em",
    repository_link: "Repositório TuyaOpen-WebTools",
    
    // Links relacionados ao projeto
    project_info: "Este projeto faz parte do TuyaOpen. Projetos relacionados incluem:",
    tuya_open_project: "TuyaOpen",
    arduino_project: "Arduino-TuyaOpen",
    lua_project: "Luanode-TuyaOpen",
    tools_project: "TuyaOpen-WebTools",
    
    // Rótulos das abas
    tab_serial: "Debug Serial",
    tab_flash: "Download de Firmware",
    
    // Painel de controle
    control_title: "Controle de Conexão Serial",
    flash_connection_control: "Conexão Serial de Download de Firmware",
    connect: "Conectar Serial",
    connect_flash: "Conectar Serial de Download de Firmware",
    disconnect: "Desconectar",
    disconnect_flash: "Desconectar Download de Firmware",
    status_disconnected: "Desconectado",
    status_connected: "Conectado",
    serial_target_device: "Dispositivo-alvo:",
    custom_device: "Personalizado",
    baud_rate: "Taxa de baud:",
    data_bits: "Bits de Dados:",
    stop_bits: "Bits de Parada:",
    parity: "Paridade:",
    parity_none: "Nenhuma",
    parity_even: "Par",
    parity_odd: "Ímpar",
    
    // Debug serial
    receive_data: "Dados Recebidos",
    save_log: "Salvar Log",
    auto_scroll: "Rolagem Automática",
    show_timestamp: "Mostrar Timestamp",
    waiting_data: "Aguardando dados seriais...",
    received: "RX",
    sent: "TX",
    bytes: "bytes",
    
    // Análise de erro relacionada
    error_analysis: "Análise de log de erro",
    clear_analysis: "Limpar análise (redefinir detecção)",
    auto_analysis: "Análise automática",
    no_errors_detected: "Nenhum erro detectado...",
    test_error_analysis: "Teste de análise de erro",
    
    send_data: "Enviar dados",
    hex_mode: "Modo HEX",
    add_newline: "Adicionar Nova Linha",
    input_placeholder: "Digite dados para enviar...",
    input_placeholder_hex: "Digite dados hex (ex.: FF 01 02 03)...",
    send: "Enviar",
    
    quick_send: "Envio Rápido:",
    manage: "Gerenciar Comandos",
    no_quick_commands: "Ainda não há comandos rápidos. Clique em 'Gerenciar Comandos' para adicionar comandos AT comuns, instruções de debug, etc. e melhorar a eficiência de depuração",
    
    // Flash de firmware
    flash_config: "Configuração de Download de Firmware",
    target_device: "Dispositivo Alvo:",
    esp32_flash_address: "Endereço ESP32-Series Flash:",
    complete_firmware: "0x0000 (Firmware completo)",
    custom_address: "Endereço personalizado...",
    custom_address_placeholder: "0x10000",
    select_file: "Selecionar Arquivo de Firmware",
    no_file_selected: "Nenhum arquivo selecionado, clique em \"Selecionar Arquivo de Firmware\" para abrir manualmente um arquivo flash ou arraste o arquivo flash para a caixa de arquivo",
    file_size: "Tamanho do Arquivo",
    start_download: "Iniciar Flash",
    stop_download: "Finalizar Flash",
    auto_disconnect_after_flash: "Desconectar automaticamente após o flash",
    preparing: "Preparando...",
    downloaded: "Baixado",
    burn_log: "Log de gravação",
    clear_log: "Limpar Log",
    waiting_download: "Aguardando operação de download...",
    
    // Gerenciamento de comandos rápidos
    quick_send_management: "Gerenciamento de Envio Rápido",
    add_new_command: "Adicionar Novo Comando",
    display_name: "Nome de Exibição:",
    name_example: "ex.: Reset",
    send_content: "Conteúdo a Enviar:",
    content_example: "ex.: AT+RST",
    add: "Adicionar",
    existing_commands: "Comandos Existentes",
    no_commands: "Nenhum comando rápido",
    reset_default: "Redefinir Padrão",
    close: "Fechar",
    
    // Mensagens de erro
    error: "Erro",
    
    // Mensagens do sistema
    serial_connected: "Serial conectado com sucesso!",
    serial_disconnected: "Serial desconectado.",
    flash_serial_connected: "Conexão Serial de Download de Firmware Bem-sucedida!",
    flash_serial_disconnected: "Serial de Download de Firmware Desconectado.",
    switch_to_tab: "Mudou para {0}, conexão serial fechada",
    tab_serial_name: "Debug Serial",
    tab_flash_name: "Download de Firmware",
    
    // Diálogos de confirmação
    switch_tab_confirm: "⚠️ Aviso de Mutex Serial\n\nA função {0} atual está usando conexão serial.\nAs funções {0} e {1} não podem usar serial simultaneamente.\n\nMudar para {1} irá:\n• Desconectar automaticamente a conexão serial atual\n• Parar operações em andamento\n\nTem certeza de que deseja mudar?",
    delete_command_confirm: "Tem certeza de que deseja excluir este comando rápido?",
    reset_commands_confirm: "Tem certeza de que deseja redefinir para os comandos rápidos padrão? Isso excluirá todos os comandos personalizados.",
    
    // Mensagens de validação
    fill_complete_info: "Por favor, preencha o nome completo do comando e o conteúdo",
    command_name_exists: "Nome do comando já existe, use outro nome",
    no_data_to_save: "Nenhum dado para salvar",
    no_log_to_save: "Nenhum log para salvar",
    please_select_file: "Selecione primeiro o arquivo de firmware",
    please_connect_serial: "Conecte primeiro o serial",
    please_connect_flash_serial: "Conecte primeiro o serial de download de firmware",
    flash_serial_not_connected: "Serial de Download de Firmware não conectado",
    
    // Relacionado à Web Serial API
    browser_not_supported: "Seu navegador não suporta Web Serial API. Use Chrome 89+ ou Edge 89+.",
    connect_failed: "Falha na conexão: {0}",
    disconnect_failed: "Falha na desconexão: {0}",
    read_error: "Erro de leitura de dados: {0}",
    send_error: "Erro de envio de dados: {0}",
    hex_length_error: "O comprimento da string HEX deve ser par",
    serial_not_connected: "Serial não conectado",
    download_failed: "Falha no download: {0}",
    
    // Operações de arquivo
    file_selected: "Arquivo selecionado: {0} ({1} bytes)",
    start_download_to: "Iniciando download de firmware para {0}...",
    download_complete: "Download de firmware concluído!",
    user_cancelled: "Usuário cancelou o download",
    
    // Mensagens de progresso de download de firmware
    flash_handshaking: "Estabelecendo handshake...",
    flash_handshake_success: "Handshake bem-sucedido",
    flash_handshake_failed: "Falha no handshake, verifique a conexão do dispositivo",
    flash_download_cancelled: "Download cancelado",
    waiting_reset: "Aguardando reinicialização do dispositivo...",
    flash_setting_baudrate: "Definindo taxa de baud para {0}...",
    flash_baudrate_set: "Taxa de baud definida com sucesso",
    flash_erasing: "Apagando Flash...",
    flash_erase_progress: "Progresso de apagamento: {0}/{1}",
    flash_erase_sector_failed: "Falha ao apagar setor {0}: {1}",
    flash_erase_complete: "Apagamento de Flash concluído",
    flash_writing_data: "Escrevendo dados...",
    flash_write_progress: "Progresso de escrita: {0}/{1}",
    flash_write_block_failed: "Falha ao escrever bloco {0}: {1}",
    flash_write_complete: "Escrita de dados concluída",
    flash_verifying_crc: "Verificando dados...",
    flash_crc_passed: "Verificação CRC passou",
    flash_crc_failed_mismatch: "Falha na verificação CRC: local={0}, dispositivo={1}",
    flash_crc_failed: "Falha na verificação CRC: {0}",
    flash_rebooting: "Reinicializando dispositivo...",
    flash_download_complete: "Download concluído",
    flash_download_success: "Download concluído com sucesso!",
    flash_download_failed: "Falha no download: {0}",
    flash_downloading: "Download em progresso, aguarde a conclusão",
    flash_user_cancelled: "Usuário cancelou a operação",
    
    // Nomes de arquivos de log
    serial_log_filename: "log_serial_{0}.txt",
    flash_log_filename: "log_flash_{0}.txt",
    
    // Tooltips
    current_tab_connected: "Função {0} atual conectada ao serial",
    disconnect_tab_connection: "Desconectar conexão serial da função {0}",
    connect_for_tab: "Conectar serial para função {0}",
    
    // Informações de copyright
    powered_by: "Desenvolvido por",
    all_rights_reserved: "Todos os direitos reservados",
    
    // Funções de debug
    debug_mode: "Modo Debug",
    debug_basic: "Básico",
    debug_detailed: "Detalhado",
    debug_verbose: "Completo",
    export_debug: "Exportar Log de Debug",
    debug_status: "Status de Debug",
    debug_level: "Nível de Debug",
    packets_sent: "Pacotes Enviados",
    packets_received: "Pacotes Recebidos",
    
    // Botões de função e operações
    fullscreen: "Tela Cheia",
    exit_fullscreen: "Sair da Tela Cheia",
    
    // Novo: Estado do modo debug
    debug_mode_enabled: "🔧 Modo debug ativado",
    debug_mode_disabled: "🔧 Modo debug desativado",
    enabled: "Ativado",
    disabled: "Desativado",
    
    // Novo: Relacionado ao reset de baudrate
    resetting_baudrate_115200: "Redefinindo baudrate da porta serial para 115200...",
    baudrate_reset_success: "✅ Baudrate da porta serial redefinido para 115200",
    direct_serial_reset_success: "✅ Porta serial redefinida diretamente para 115200",
    baudrate_reset_failed: "Falha ao redefinir baudrate da porta serial",
    direct_reset_failed: "Falha na redefinição direta da porta serial também",
    
    // Novo: Relacionado ao gestor de download
    downloader_manager_not_initialized: "Gestor de download não inicializado",
    loaded_chip_types: "{0} tipos de chip suportados carregados",
    using_default_chip_support: "Usando suporte de chip padrão (T5AI, T3)",
    unsupported_device_type: "Tipo de dispositivo não suportado: {0}",
    unsupported_chip_type: "Tipo de chip não suportado: {0}",
    
    // Novo: Relacionado ao processo de download de firmware
    starting_firmware_download_process: "Iniciando processo de download de firmware...",
    starting_device_download: "Iniciando download do dispositivo {0}, tamanho do arquivo: {1} bytes",
    firmware_download_completed_time: "Download de firmware concluído! Tempo total: {0}ms",
    device_firmware_download_completed: "Download de firmware do dispositivo {0} concluído",
    initializing_downloader: "Inicializando downloader {0}...",
    connecting_device: "Conectando ao dispositivo {0}...",
    cannot_connect_device: "Não é possível conectar ao dispositivo {0}",
    downloading_firmware_to_device: "Baixando firmware para o dispositivo {0}...",
    t5ai_firmware_download_completed: "Download de firmware T5AI concluído",
    firmware_download_completed_device_restarted: "Download de firmware concluído, dispositivo reiniciando...",
    serial_not_connected_connect_first: "Porta serial não conectada, conecte primeiro o dispositivo serial",
    restoring_serial_reader_writer_failed: "Falha ao restaurar reader/writer da porta serial",
    cleanup_reset_baudrate: "Limpeza: Redefinindo baudrate...",
    cleanup_baudrate_reset_success: "Limpeza: Baudrate redefinido com sucesso",
    cleanup_reset_failed: "Limpeza: Falha na redefinição",
    flashdownloader_reset_baudrate: "FlashDownloader: Redefinindo baudrate para 115200...",
    flashdownloader_baudrate_reset_success: "FlashDownloader: ✅ Baudrate redefinido com sucesso para 115200",
    flashdownloader_direct_reset_success: "FlashDownloader: ✅ Redefinição direta da porta serial também bem-sucedida",
    flashdownloader_reset_failed: "FlashDownloader: Falha na redefinição do baudrate",
    
    // Novo: Mensagens de status de conexão serial
    serial_connected_initial_switch: "conexão inicial, mudará para",
    serial_connected_initial: "conexão inicial",
    bps: "bps",
    
    // Informações do sistema
    system_info: "Informações do Sistema",
    system_info_os: "SO",
    system_info_browser: "Navegador",
    system_info_web_serial: "Web Serial",
    system_info_platform: "Plataforma",
    system_info_supported: "Suportado",
    system_info_not_supported: "Não suportado",
    
    // Tratamento de desconexão serial
    serial_disconnected_unexpectedly: "Conexão serial desconectada inesperadamente: {0}",
    
    // Página de solução de problemas da porta serial
    troubleshooting_title: "Guia de Solução de Problemas da Porta Serial",
    troubleshooting_subtitle: "Guia completo para resolver problemas de conexão serial",
    back_to_main: "Voltar ao início",
    no_serial_ports_found: "Nenhuma porta serial encontrada?",
    serial_troubleshooting_guide: "Problemas de conexão serial? Consulte o guia de solução de problemas",
    serial_troubleshooting: "Solução de problemas serial",
    
    // Lista de verificação rápida
    quick_check_title: "Lista de Verificação Rápida",
    basic_checks: "Itens de verificação básicos",
    check_browser: "Usar Chrome, Edge ou outros navegadores baseados em Chromium",
    check_cable: "Cabo de dados USB conectado corretamente (não cabo de carregamento)",
    check_device_power: "O dispositivo está corretamente ligado",
    check_other_software: "Fechar outros softwares que ocupam portas seriais",
    
    // Problemas comuns
    common_issues_title: "Problemas Comuns e Soluções",
    issue_no_ports: "Problema 1: Nenhum dispositivo serial disponível",
    issue_no_ports_desc: "A lista de dispositivos está vazia após clicar em \"Conectar Serial\"",
    issue_connection_failed: "Problema 2: Falha na conexão",
    issue_connection_failed_desc: "O dispositivo é visível mas ocorre erro ao conectar",
    issue_no_data: "Problema 3: Conectado mas sem dados",
    issue_no_data_desc: "A conexão serial é bem-sucedida mas nenhum dado é recebido ou a exibição de dados é anormal",
    
    possible_causes: "Possíveis causas:",
    cause_driver_missing: "Driver do dispositivo não instalado ou instalado incorretamente",
    cause_cable_issue: "Problema do cabo USB (usando cabo de carregamento em vez de cabo de dados)",
    cause_device_not_recognized: "Dispositivo não reconhecido pelo sistema",
    cause_port_occupied: "Porta serial ocupada por outros programas",
    cause_permission_denied: "Permissões insuficientes (Linux/macOS)",
    cause_device_busy: "Dispositivo sendo usado por outras aplicações",
    cause_driver_conflict: "Conflito de drivers ou incompatibilidade",
    cause_baud_rate_mismatch: "Configuração de taxa de baud não coincide",
    cause_serial_params_wrong: "Configuração incorreta de bits de dados, bits de parada ou paridade",
    cause_device_not_sending: "O dispositivo não está enviando dados",
    cause_flow_control: "Problemas de configuração de controle de fluxo",
    cause_cable_quality: "Problemas de qualidade do cabo de dados ou mau contato",
    
    // Diagnóstico de problemas de drivers
    driver_diagnosis_title: "Diagnóstico de Problemas de Drivers",
    driver_diagnosis_desc: "A maioria dos problemas de porta serial estão relacionados a drivers, siga estes passos para diagnóstico",
    
    // Sistemas operacionais
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    
    // Relacionado ao Windows
    windows_check_device_manager: "Passo 1: Verificar Gerenciador de Dispositivos",
    windows_step1_title: "Abrir Gerenciador de Dispositivos",
    windows_step1_desc: "Clique com o botão direito em \"Este PC\" → \"Propriedades\" → \"Gerenciador de Dispositivos\", ou pressione Win+X e selecione \"Gerenciador de Dispositivos\"",
    windows_step2_title: "Encontrar dispositivos seriais",
    windows_step2_desc: "Procurar as seguintes categorias no Gerenciador de Dispositivos:",
    windows_step3_title: "Identificar status do dispositivo",
    windows_step3_desc: "Verificar o status do ícone do dispositivo:",
    
    ports_com_lpt: "Portas (COM e LPT)",
    universal_serial_bus: "Controladores de barramento serial universal",
    other_devices: "Outros dispositivos",
    
    device_normal: "✅ Normal: Nome do dispositivo exibido normalmente",
    device_warning: "⚠️ Aviso: Ponto de exclamação amarelo, problema de driver",
    device_error: "❌ Erro: X vermelho, dispositivo desabilitado",
    device_unknown: "❓ Desconhecido: Em \"Outros dispositivos\", driver não instalado",
    
    windows_driver_install: "Passo 2: Instalar drivers",
    windows_manual_install: "Passo 3: Instalação manual de driver",
    
    // Descrições de drivers
    ch340_desc: "Chip USB para serial mais comum",
    cp210x_desc: "Chip USB para serial Silicon Labs",
    ftdi_desc: "Chip USB para serial FTDI",
    
    download_driver: "Baixar driver correspondente",
    download_driver_desc: "Baixar o driver correspondente de acordo com o modelo do chip do dispositivo",
    run_installer: "Executar instalador",
    run_installer_desc: "Executar o instalador de driver baixado como administrador",
    restart_computer: "Reiniciar computador",
    restart_computer_desc: "Reiniciar o computador após a instalação para ativar o driver",
    verify_installation: "Verificar instalação",
    verify_installation_desc: "Reconectar o dispositivo e verificar se é exibido normalmente no Gerenciador de Dispositivos",
    
    screenshot_device_manager: "Localização da captura de tela do Gerenciador de Dispositivos",
    
    // Relacionado ao macOS
    macos_check_system: "Passo 1: Verificar informações do sistema",
    macos_step1_title: "Abrir Informações do Sistema",
    macos_step1_desc: "Manter pressionada a tecla Option e clicar no menu Apple → \"Informações do Sistema\"",
    macos_step2_title: "Ver dispositivos USB",
    macos_step2_desc: "Selecionar \"USB\" à esquerda para ver dispositivos USB conectados",
    macos_step3_title: "Verificar dispositivos seriais",
    macos_step3_desc: "Abrir Terminal e inserir comando para ver dispositivos seriais:",
    
    macos_driver_install: "Passo 2: Instalar drivers",
    macos_driver_note: "macOS geralmente tem a maioria dos drivers USB para serial incorporados, mas alguns chips ainda requerem instalação manual",
    
    ch340_mac_desc: "Driver CH340 para macOS",
    cp210x_mac_desc: "Driver CP210x para macOS",
    
    // Relacionado ao Linux
    linux_check_system: "Passo 1: Verificar reconhecimento do sistema",
    linux_step1_title: "Verificar dispositivos USB",
    linux_step1_desc: "Abrir terminal e inserir o seguinte comando:",
    linux_step2_title: "Verificar dispositivos seriais",
    linux_step2_desc: "Ver dispositivos seriais disponíveis:",
    linux_step3_title: "Verificar mensagens do kernel",
    linux_step3_desc: "Ver mensagens do kernel ao conectar o dispositivo:",
    
    linux_permissions: "Passo 2: Definir permissões",
    linux_add_user_group: "Adicionar usuário ao grupo dialout",
    linux_add_user_desc: "Executar o seguinte comando e fazer login novamente:",
    linux_check_permissions: "Verificar permissões do dispositivo",
    linux_check_permissions_desc: "Confirmar configurações de permissões do dispositivo:",
    
    // Solução de problemas avançada
    advanced_troubleshooting: "Solução de Problemas Avançada",
    hardware_issues: "Investigação de problemas de hardware",
    software_conflicts: "Resolução de conflitos de software",
    
    try_different_cable: "Tentar cabo de dados USB diferente",
    try_different_port: "Tentar porta USB diferente",
    try_different_computer: "Testar dispositivo em outros computadores",
    check_device_power: "Verificar se a alimentação do dispositivo é normal",
    
    close_other_serial_software: "Fechar outros softwares de depuração serial",
    disable_antivirus: "Desabilitar temporariamente software antivírus",
    update_browser: "Atualizar navegador para a versão mais recente",
    clear_browser_cache: "Limpar cache e dados do navegador",
    
    // Obter ajuda
    get_help_title: "Obter Ajuda",
    get_help_desc: "Se nenhum dos métodos acima conseguir resolver o problema, colete as seguintes informações e entre em contato com o suporte técnico:",
    
    help_info_os: "Versão do sistema operacional",
    help_info_browser: "Versão do navegador",
    help_info_device: "Modelo do dispositivo e informações do chip",
    help_info_error: "Capturas de tela de mensagens de erro específicas",
    help_info_device_manager: "Capturas de tela do Gerenciador de Dispositivos (Windows)",
    
    github_support_desc: "Enviar relatório de problema no GitHub",
    
    // Novo: TuyaOpen Authorization related
    tab_tuya_auth: "Autorização TuyaOpen",
    tuya_auth_title: "Escrita de Código de Autorização TuyaOpen",
    tuya_auth_subtitle: "Escrever informações de autorização do projeto TuyaOpen no dispositivo",
    uuid_label: "UUID (20 caracteres):",
    auth_key_label: "AUTH_KEY (32 caracteres):",
    uuid_placeholder: "Digite um UUID de 20 caracteres...",
    auth_key_placeholder: "Digite uma AUTH_KEY de 32 caracteres...",
    authorize_btn: "Escrever Autorização",
    tuya_auth_notice_title: "⚠️ Aviso Importante",
    tuya_auth_notice_content: "Esta função de autorização é aplicável apenas para escrever códigos de autorização de projetos TuyaOpen e não pode ser usada para projetos não-TuyaOpen.",
    tuya_auth_additional_info: "Certifique-se de que o dispositivo esteja no modo de autorização e a porta serial esteja corretamente conectada antes de prosseguir com a operação de autorização.",
    uuid_length_error: "Erro de comprimento UUID! Digite um UUID de 20 caracteres",
    auth_key_length_error: "Erro de comprimento AUTH_KEY! Digite uma AUTH_KEY de 32 caracteres",
    uuid_empty_error: "Por favor digite o UUID",
    auth_key_empty_error: "Por favor digite o AUTH_KEY",
    tuya_auth_success: "✅ Informações de autorização TuyaOpen escritas com sucesso!",
    tuya_auth_failed: "❌ Falha ao escrever informações de autorização TuyaOpen: {0}",
    tuya_auth_sending: "Enviando informações de autorização...",
    tuya_auth_command_sent: "Comando de autorização enviado: auth {0} {1}",
    
    // Informações de status relacionadas à autorização
    tuya_auth_waiting: "Aguardando operação de autorização...",
    tuya_auth_connected: "Porta serial de autorização conectada",
    tuya_auth_disconnected: "Porta serial de autorização desconectada",
    connect_tuya_auth: "Conectar Porta Serial de Autorização",
    disconnect_tuya_auth: "Desconectar Porta Serial de Autorização",
    tuya_auth_serial_connected: "Porta serial de autorização TuyaOpen conectada com sucesso!",
    tuya_auth_serial_disconnected: "Porta serial de autorização TuyaOpen desconectada.",
    tab_tuya_auth_name: "Autorização TuyaOpen",
    
    // TuyaOpen授权码指南相关
    license_guide: "Guia de Obtenção de Código de Autorização",
    license_guide_title: "Guia de Obtenção de Código de Autorização TuyaOpen",
    license_guide_subtitle: "Entender o código de autorização TuyaOpen e métodos de obtenção",
    
    // 什么是TuyaOpen专用授权码
    what_is_license: "O que é o Código de Autorização Exclusivo TuyaOpen?",
    license_info: "Todas as versões do TuyaOpen Framework requerem um código de autorização exclusivo para se conectar normalmente à nuvem Tuya. Outros códigos de autorização não podem funcionar corretamente.",
    supported_frameworks: "Frameworks TuyaOpen Suportados",
    c_version: "TuyaOpen versão C",
    arduino_version: "TuyaOpen versão Arduino", 
    lua_version: "TuyaOpen versão Luanode",
    
    // 如何获取授权码
    how_to_get: "Como Obter o Código de Autorização",
    method1_title: "Método 1: Comprar Módulos Pré-gravados",
    method1_desc: "Comprar módulos com código de autorização TuyaOpen pré-gravado através da plataforma de desenvolvedores Tuya. Este código está gravado no módulo correspondente de fábrica e não será perdido. O TuyaOpen lê o código de autorização através da interface `tuya_iot_license_read()` ao inicializar. Confirme se o dispositivo atual tem o código de autorização TuyaOpen gravado.",
    method1_advantage: "Vantagem: Plug and play, sem operação manual necessária",
    
    method2_title: "Método 2: Compra na Plataforma Tuya",
    method2_desc: "Comprar código de autorização TuyaOpen através da plataforma de desenvolvedores Tuya, depois escrever no módulo usando ferramentas de porta serial.",
    method2_advantage: "Vantagem: Plataforma oficial, suporte para compras em lote",
    visit_platform: "Visitar Plataforma",
    visit_platform_preburn: "Comprar Módulos Pré-gravados",
    
    method3_title: "Método 3: Compra no Taobao",
    method3_desc: "Comprar código de autorização TuyaOpen através de lojas Taobao, depois escrever no módulo usando ferramentas de porta serial.",
    method3_advantage: "Vantagem: Compra conveniente, métodos de pagamento flexíveis",
    visit_taobao: "Visitar Taobao",
    
    // 使用指南
    usage_guide: "Guia de Uso",
    check_existing: "Passo 1: Verificar Código de Autorização Existente",
    check_warning: "Primeiro confirme se o dispositivo atual já tem o código de autorização TuyaOpen gravado para evitar compras duplicadas.",
    write_license: "Passo 2: Escrever Código de Autorização",
    write_desc: "Se o dispositivo não tem código de autorização gravado, pode usar a função \"TuyaOpen Auth\" desta ferramenta para escrever:",
    write_step1: "Conectar dispositivo ao computador",
    write_step2: "Mudar para a aba \"TuyaOpen Auth\"",
    write_step3: "Conectar porta serial",
    write_step4: "Inserir UUID e AUTH_KEY comprados",
    write_step5: "Clicar no botão \"Escrever Autorização\"",
    write_success: "Depois de escrever com sucesso o código de autorização, o dispositivo pode usar normalmente o framework TuyaOpen para se conectar à nuvem Tuya.",
    
    // 常见问题
    faq_title: "Perguntas Frequentes",
    q1: "P: Outros tipos de códigos de autorização podem ser usados?",
    a1: "R: Não. O framework TuyaOpen só pode usar códigos de autorização exclusivos TuyaOpen. Outros códigos de autorização não podem se conectar normalmente à nuvem Tuya.",
    q2: "P: O código de autorização será perdido?",
    a2: "R: Em circunstâncias normais, o código de autorização não será perdido. O código de autorização de módulos pré-gravados é gravado de fábrica, e o código escrito manualmente é salvo na área de armazenamento não volátil do módulo.",
    q3: "P: Como verificar se o dispositivo já tem código de autorização?",
    a3: "R: Pode ser verificado chamando a interface `tuya_iot_license_read()` através do programa TuyaOpen.",
    
    // 技术支持
    support_title: "Suporte Técnico",
    support_desc: "Se encontrar problemas durante o uso, obtenha ajuda através dos seguintes métodos:",
    github_support: "Enviar Relatório de Problema"
};

// Exportar para global
if (typeof window !== 'undefined') {
    window.i18nLanguages = window.i18nLanguages || {};
    window.i18nLanguages.pt = pt;
}