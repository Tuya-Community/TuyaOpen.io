// Français (fr-FR)
const fr = {
    // Titre de la page et description
    title: "Outil Serial TuyaOpen",
    subtitle: "Outil de développeur tout-en-un basé sur l'API Chrome Web Serial",
    
    // Exigences du navigateur et avis de version beta
    browser_requirement: "Cet outil nécessite des navigateurs basés sur Chrome. Les autres navigateurs ne peuvent pas fonctionner correctement. Utilisez Chrome, Edge ou d'autres navigateurs basés sur Chromium.",
    beta_notice: "Si vous rencontrez des problèmes lors de l'utilisation de cet outil, veuillez les signaler dans le dépôt à",
    repository_link: "Dépôt TuyaOpen-WebTools",
    
    // Liens liés au projet
    project_info: "Ce projet fait partie de TuyaOpen. Les projets connexes incluent :",
    tuya_open_project: "TuyaOpen",
    arduino_project: "Arduino-TuyaOpen",
    lua_project: "Luanode-TuyaOpen",
    tools_project: "TuyaOpen-WebTools",
    
    // Étiquettes des onglets
    tab_serial: "Debug Serial",
    tab_flash: "Flash Firmware",
    
    // Panneau de contrôle
    control_title: "Contrôle de connexion Serial",
    flash_connection_control: "Connexion Serial de téléchargement firmware",
    connect: "Connecter Serial",
    connect_flash: "Connecter Serial de téléchargement firmware",
    disconnect: "Déconnecter",
    disconnect_flash: "Déconnecter téléchargement firmware",
    status_disconnected: "Déconnecté",
    status_connected: "Connecté",
    serial_target_device: "Appareil cible:",
    custom_device: "Personnalisé",
    baud_rate: "Débit en bauds:",
    data_bits: "Bits de données :",
    stop_bits: "Bits d'arrêt :",
    parity: "Parité :",
    parity_none: "Aucune",
    parity_even: "Paire",
    parity_odd: "Impaire",
    
    // Débogage série
    receive_data: "Données Reçues",
    save_log: "Sauvegarder le Journal",
    auto_scroll: "Défilement Automatique",
    show_timestamp: "Afficher l'horodatage",
    waiting_data: "En attente de données serial...",
    received: "RX",
    sent: "TX",
    bytes: "octets",
    
    // Analyse d'erreur associée
    error_analysis: "Analyse du journal d'erreurs",
    clear_analysis: "Effacer l'analyse (réinitialiser la détection)",
    auto_analysis: "Analyse automatique",
    no_errors_detected: "Aucune erreur détectée...",
    test_error_analysis: "Test d'analyse d'erreur",
    
    send_data: "Envoyer des données",
    hex_mode: "Mode HEX",
    add_newline: "Ajouter une nouvelle ligne",
    input_placeholder: "Entrez les données à envoyer...",
    input_placeholder_hex: "Entrez les données hex (ex. : FF 01 02 03)...",
    send: "Envoyer",
    
    quick_send: "Envoi rapide :",
    manage: "Gérer les commandes",
    no_quick_commands: "Aucune commande rapide pour le moment. Cliquez sur 'Gérer les commandes' pour ajouter des commandes AT courantes, des instructions de débogage, etc. et améliorer l'efficacité du débogage",
    
    // Flash firmware
    flash_config: "Configuration de flash firmware",
    target_device: "Appareil cible :",
    esp32_flash_address: "Adresse ESP32-Series Flash :",
    complete_firmware: "0x0000 (Firmware complet)",
    custom_address: "Adresse personnalisée...",
    custom_address_placeholder: "0x10000",
    select_file: "Sélectionner le fichier firmware",
    no_file_selected: "Aucun fichier sélectionné, cliquez sur \"Sélectionner le fichier firmware\" pour ouvrir manuellement un fichier flash ou faites glisser le fichier flash vers la zone de fichier",
    file_size: "Taille du fichier",
    start_download: "Démarrer le flash",
    stop_download: "Terminer le flash",
    auto_disconnect_after_flash: "Déconnecter automatiquement après le flash",
    preparing: "Préparation...",
    downloaded: "Flashé",
    burn_log: "Journal de gravure",
    clear_log: "Effacer le journal",
    waiting_download: "En attente d'opération de flash...",
    
    // Gestion des commandes rapides
    quick_send_management: "Gestion d'envoi rapide",
    add_new_command: "Ajouter une nouvelle commande",
    display_name: "Nom d'affichage :",
    name_example: "ex. : Reset",
    send_content: "Contenu à envoyer :",
    content_example: "ex. : AT+RST",
    add: "Ajouter",
    existing_commands: "Commandes existantes",
    no_commands: "Aucune commande rapide",
    reset_default: "Réinitialiser par défaut",
    close: "Fermer",
    
    // Messages d'erreur
    error: "Erreur",
    
    // Messages système
    serial_connected: "Serial connecté avec succès !",
    serial_disconnected: "Serial déconnecté.",
    flash_serial_connected: "Connexion Serial de téléchargement firmware réussie !",
    flash_serial_disconnected: "Serial de téléchargement firmware déconnecté.",
    switch_to_tab: "Basculé vers {0}, connexion serial fermée",
    tab_serial_name: "Debug Serial",
    tab_flash_name: "Téléchargement Firmware",
    
    // Dialogues de confirmation
    switch_tab_confirm: "⚠️ Avertissement Mutex Serial\n\nLa fonction {0} actuelle utilise une connexion serial.\nLes fonctions {0} et {1} ne peuvent pas utiliser serial simultanément.\n\nBasculer vers {1} va :\n• Déconnecter automatiquement la connexion serial actuelle\n• Arrêter les opérations en cours\n\nÊtes-vous sûr de vouloir basculer ?",
    delete_command_confirm: "Êtes-vous sûr de vouloir supprimer cette commande rapide ?",
    reset_commands_confirm: "Êtes-vous sûr de vouloir réinitialiser aux commandes rapides par défaut ? Cela supprimera toutes les commandes personnalisées.",
    
    // Messages de validation
    fill_complete_info: "Veuillez remplir le nom complet de la commande et le contenu",
    command_name_exists: "Le nom de la commande existe déjà, utilisez un autre nom",
    no_data_to_save: "Aucune donnée à sauvegarder",
    no_log_to_save: "Aucun journal à sauvegarder",
    please_select_file: "Veuillez d'abord sélectionner un fichier firmware",
    please_connect_serial: "Veuillez d'abord connecter serial",
    please_connect_flash_serial: "Veuillez d'abord connecter serial de téléchargement firmware",
    flash_serial_not_connected: "Serial de téléchargement firmware non connecté",
    
    // Lié à l'API Web Serial
    browser_not_supported: "Votre navigateur ne prend pas en charge l'API Web Serial. Utilisez Chrome 89+ ou Edge 89+.",
    connect_failed: "Échec de la connexion : {0}",
    disconnect_failed: "Échec de la déconnexion : {0}",
    read_error: "Erreur de lecture des données : {0}",
    send_error: "Erreur d'envoi des données : {0}",
    hex_length_error: "La longueur de la chaîne HEX doit être paire",
    serial_not_connected: "Serial non connecté",
    download_failed: "Échec du téléchargement : {0}",
    
    // Opérations sur les fichiers
    file_selected: "Fichier sélectionné : {0} ({1} octets)",
    start_download_to: "Démarrage du téléchargement firmware vers {0}...",
    download_complete: "Téléchargement firmware terminé !",
    user_cancelled: "L'utilisateur a annulé le téléchargement",
    
    // Messages de progression du téléchargement firmware
    flash_handshaking: "Établissement de la poignée de main...",
    flash_handshake_success: "Poignée de main réussie",
    flash_handshake_failed: "Échec de la poignée de main, vérifiez la connexion de l'appareil",
    flash_download_cancelled: "Téléchargement annulé",
    waiting_reset: "En attente du redémarrage de l'appareil...",
    flash_setting_baudrate: "Définition du débit en bauds à {0}...",
    flash_baudrate_set: "Débit en bauds défini avec succès",
    flash_erasing: "Effacement de la Flash...",
    flash_erase_progress: "Progression de l'effacement : {0}/{1}",
    flash_erase_sector_failed: "Échec de l'effacement du secteur {0} : {1}",
    flash_erase_complete: "Effacement de la Flash terminé",
    flash_writing_data: "Écriture des données...",
    flash_write_progress: "Progression de l'écriture : {0}/{1}",
    flash_write_block_failed: "Échec de l'écriture du bloc {0} : {1}",
    flash_write_complete: "Écriture des données terminée",
    flash_verifying_crc: "Vérification des données...",
    flash_crc_passed: "Vérification CRC réussie",
    flash_crc_failed_mismatch: "Échec de la vérification CRC : local={0}, appareil={1}",
    flash_crc_failed: "Échec de la vérification CRC : {0}",
    flash_rebooting: "Redémarrage de l'appareil...",
    flash_download_complete: "Téléchargement terminé",
    flash_download_success: "Téléchargement terminé avec succès !",
    flash_download_failed: "Échec du téléchargement : {0}",
    flash_downloading: "Téléchargement en cours, veuillez attendre la fin",
    flash_user_cancelled: "L'utilisateur a annulé l'opération",
    
    // Noms des fichiers de journal
    serial_log_filename: "journal_serial_{0}.txt",
    flash_log_filename: "journal_flash_{0}.txt",
    
    // Info-bulles
    current_tab_connected: "Fonction {0} actuelle connectée au serial",
    disconnect_tab_connection: "Déconnecter la connexion serial de la fonction {0}",
    connect_for_tab: "Connecter serial pour la fonction {0}",
    
    // Informations de copyright
    powered_by: "Alimenté par",
    all_rights_reserved: "Tous droits réservés",
    
    // Fonctions de debug
    debug_mode: "Mode Debug",
    debug_basic: "Basique",
    debug_detailed: "Détaillé",
    debug_verbose: "Complet",
    export_debug: "Exporter le journal de debug",
    debug_status: "Statut de debug",
    debug_level: "Niveau de debug",
    packets_sent: "Paquets envoyés",
    packets_received: "Paquets reçus",
    
    // Boutons de fonction et opérations
    fullscreen: "Plein écran",
    exit_fullscreen: "Quitter le plein écran",
    
    // Nouveau: État du mode debug
    debug_mode_enabled: "🔧 Mode debug activé",
    debug_mode_disabled: "🔧 Mode debug désactivé",
    enabled: "Activé",
    disabled: "Désactivé",
    
    // Nouveau: Lié au reset du baudrate
    resetting_baudrate_115200: "Réinitialisation du baudrate du port série à 115200...",
    baudrate_reset_success: "✅ Baudrate du port série réinitialisé à 115200",
    direct_serial_reset_success: "✅ Port série réinitialisé directement à 115200",
    baudrate_reset_failed: "Échec de la réinitialisation du baudrate du port série",
    direct_reset_failed: "Échec de la réinitialisation directe du port série également",
    
    // Nouveau: Lié au gestionnaire de téléchargement
    downloader_manager_not_initialized: "Gestionnaire de téléchargement non initialisé",
    loaded_chip_types: "{0} types de puces supportés chargés",
    using_default_chip_support: "Utilisation du support de puce par défaut (T5AI, T3)",
    unsupported_device_type: "Type d'appareil non supporté: {0}",
    unsupported_chip_type: "Type de puce non supporté: {0}",
    
    // Nouveau: Lié au processus de téléchargement de firmware
    starting_firmware_download_process: "Démarrage du processus de téléchargement de firmware...",
    starting_device_download: "Démarrage du téléchargement de l'appareil {0}, taille du fichier: {1} octets",
    firmware_download_completed_time: "Téléchargement de firmware terminé! Temps total: {0}ms",
    device_firmware_download_completed: "Téléchargement de firmware de l'appareil {0} terminé",
    initializing_downloader: "Initialisation du téléchargeur {0}...",
    connecting_device: "Connexion à l'appareil {0}...",
    cannot_connect_device: "Impossible de se connecter à l'appareil {0}",
    downloading_firmware_to_device: "Téléchargement du firmware vers l'appareil {0}...",
    t5ai_firmware_download_completed: "Téléchargement de firmware T5AI terminé",
    firmware_download_completed_device_restarted: "Téléchargement de firmware terminé, redémarrage de l'appareil...",
    serial_not_connected_connect_first: "Port série non connecté, veuillez d'abord connecter l'appareil série",
    restoring_serial_reader_writer_failed: "Échec de la restauration du reader/writer du port série",
    cleanup_reset_baudrate: "Nettoyage: Réinitialisation du baudrate...",
    cleanup_baudrate_reset_success: "Nettoyage: Baudrate réinitialisé avec succès",
    cleanup_reset_failed: "Nettoyage: Échec de la réinitialisation",
    flashdownloader_reset_baudrate: "FlashDownloader: Réinitialisation du baudrate à 115200...",
    flashdownloader_baudrate_reset_success: "FlashDownloader: ✅ Baudrate réinitialisé avec succès à 115200",
    flashdownloader_direct_reset_success: "FlashDownloader: ✅ Réinitialisation directe du port série également réussie",
    flashdownloader_reset_failed: "FlashDownloader: Échec de la réinitialisation du baudrate",
    
    // Nouveau: Messages d'état de connexion série
    serial_connected_initial_switch: "connexion initiale, passera à",
    serial_connected_initial: "connexion initiale",
    bps: "bps",
    
    // Informations système
    system_info: "Informations système",
    system_info_os: "OS",
    system_info_browser: "Navigateur",
    system_info_web_serial: "Web Serial",
    system_info_platform: "Plateforme",
    system_info_supported: "Pris en charge",
    system_info_not_supported: "Non pris en charge",
    
    // Gestion de la déconnexion série
    serial_disconnected_unexpectedly: "Connexion série déconnectée de manière inattendue: {0}",
    
    // Page de dépannage du port série
    troubleshooting_title: "Guide de dépannage du port série",
    troubleshooting_subtitle: "Guide complet pour résoudre les problèmes de connexion série",
    back_to_main: "Retour à l'accueil",
    no_serial_ports_found: "Aucun port série trouvé ?",
    serial_troubleshooting_guide: "Problèmes de connexion série ? Consultez le guide de dépannage",
    serial_troubleshooting: "Dépannage série",
    
    // Liste de vérification rapide
    quick_check_title: "Liste de vérification rapide",
    basic_checks: "Éléments de vérification de base",
    check_browser: "Utiliser Chrome, Edge ou d'autres navigateurs basés sur Chromium",
    check_cable: "Câble de données USB connecté correctement (pas un câble de charge)",
    check_device_power: "L'appareil est correctement alimenté",
    check_other_software: "Fermer les autres logiciels qui occupent les ports série",
    
    // Problèmes courants
    common_issues_title: "Problèmes courants et solutions",
    issue_no_ports: "Problème 1: Aucun périphérique série disponible",
    issue_no_ports_desc: "La liste des périphériques est vide après avoir cliqué sur \"Connecter série\"",
    issue_connection_failed: "Problème 2: Échec de la connexion",
    issue_connection_failed_desc: "L'appareil est visible mais une erreur se produit lors de la connexion",
    issue_no_data: "Problème 3: Connecté mais aucune donnée",
    issue_no_data_desc: "La connexion série réussit mais aucune donnée n'est reçue ou l'affichage des données est anormal",
    
    possible_causes: "Causes possibles:",
    cause_driver_missing: "Pilote de périphérique non installé ou incorrectement installé",
    cause_cable_issue: "Problème de câble USB (utilisation d'un câble de charge au lieu d'un câble de données)",
    cause_device_not_recognized: "Périphérique non reconnu par le système",
    cause_port_occupied: "Port série occupé par d'autres programmes",
    cause_permission_denied: "Permissions insuffisantes (Linux/macOS)",
    cause_device_busy: "Périphérique utilisé par d'autres applications",
    cause_driver_conflict: "Conflit de pilotes ou incompatibilité",
    cause_baud_rate_mismatch: "Désaccord de paramétrage du débit en bauds",
    cause_serial_params_wrong: "Paramètres incorrects des bits de données, bits d'arrêt ou parité",
    cause_device_not_sending: "Le périphérique n'envoie pas de données",
    cause_flow_control: "Problèmes de paramétrage du contrôle de flux",
    cause_cable_quality: "Problèmes de qualité du câble de données ou mauvais contact",
    
    // Diagnostic des problèmes de pilotes
    driver_diagnosis_title: "Diagnostic des problèmes de pilotes",
    driver_diagnosis_desc: "La plupart des problèmes de port série sont liés aux pilotes, veuillez suivre ces étapes pour le diagnostic",
    
    // Systèmes d'exploitation
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    
    // Relatif à Windows
    windows_check_device_manager: "Étape 1: Vérifier le Gestionnaire de périphériques",
    windows_step1_title: "Ouvrir le Gestionnaire de périphériques",
    windows_step1_desc: "Clic droit sur \"Ce PC\" → \"Propriétés\" → \"Gestionnaire de périphériques\", ou appuyer sur Win+X et sélectionner \"Gestionnaire de périphériques\"",
    windows_step2_title: "Trouver les périphériques série",
    windows_step2_desc: "Rechercher les catégories suivantes dans le Gestionnaire de périphériques:",
    windows_step3_title: "Identifier l'état du périphérique",
    windows_step3_desc: "Vérifier l'état de l'icône du périphérique:",
    
    ports_com_lpt: "Ports (COM et LPT)",
    universal_serial_bus: "Contrôleurs de bus série universels",
    other_devices: "Autres périphériques",
    
    device_normal: "✅ Normal: Nom du périphérique affiché normalement",
    device_warning: "⚠️ Avertissement: Point d'exclamation jaune, problème de pilote",
    device_error: "❌ Erreur: X rouge, périphérique désactivé",
    device_unknown: "❓ Inconnu: Dans \"Autres périphériques\", pilote non installé",
    
    windows_driver_install: "Étape 2: Installer les pilotes",
    windows_manual_install: "Étape 3: Installation manuelle du pilote",
    
    // Descriptions des pilotes
    ch340_desc: "Puce USB vers série la plus courante",
    cp210x_desc: "Puce USB vers série Silicon Labs",
    ftdi_desc: "Puce USB vers série FTDI",
    
    download_driver: "Télécharger le pilote correspondant",
    download_driver_desc: "Télécharger le pilote correspondant selon le modèle de puce du périphérique",
    run_installer: "Exécuter l'installateur",
    run_installer_desc: "Exécuter l'installateur de pilote téléchargé en tant qu'administrateur",
    restart_computer: "Redémarrer l'ordinateur",
    restart_computer_desc: "Redémarrer l'ordinateur après l'installation pour activer le pilote",
    verify_installation: "Vérifier l'installation",
    verify_installation_desc: "Reconnecter le périphérique et vérifier s'il s'affiche normalement dans le Gestionnaire de périphériques",
    
    screenshot_device_manager: "Emplacement de capture d'écran du Gestionnaire de périphériques",
    
    // Relatif à macOS
    macos_check_system: "Étape 1: Vérifier les informations système",
    macos_step1_title: "Ouvrir les Informations système",
    macos_step1_desc: "Maintenir la touche Option et cliquer sur le menu Apple → \"Informations système\"",
    macos_step2_title: "Voir les périphériques USB",
    macos_step2_desc: "Sélectionner \"USB\" à gauche pour voir les périphériques USB connectés",
    macos_step3_title: "Vérifier les périphériques série",
    macos_step3_desc: "Ouvrir le Terminal et entrer la commande pour voir les périphériques série:",
    
    macos_driver_install: "Étape 2: Installer les pilotes",
    macos_driver_note: "macOS intègre généralement la plupart des pilotes USB vers série, mais certaines puces nécessitent encore une installation manuelle",
    
    ch340_mac_desc: "Pilote CH340 pour macOS",
    cp210x_mac_desc: "Pilote CP210x pour macOS",
    
    // Relatif à Linux
    linux_check_system: "Étape 1: Vérifier la reconnaissance du système",
    linux_step1_title: "Vérifier les périphériques USB",
    linux_step1_desc: "Ouvrir le terminal et entrer la commande suivante:",
    linux_step2_title: "Vérifier les périphériques série",
    linux_step2_desc: "Voir les périphériques série disponibles:",
    linux_step3_title: "Vérifier les messages du noyau",
    linux_step3_desc: "Voir les messages du noyau lors de la connexion du périphérique:",
    
    linux_permissions: "Étape 2: Définir les permissions",
    linux_add_user_group: "Ajouter l'utilisateur au groupe dialout",
    linux_add_user_desc: "Exécuter la commande suivante et se reconnecter:",
    linux_check_permissions: "Vérifier les permissions du périphérique",
    linux_check_permissions_desc: "Confirmer les paramètres de permissions du périphérique:",
    
    // Dépannage avancé
    advanced_troubleshooting: "Dépannage avancé",
    hardware_issues: "Investigation des problèmes matériels",
    software_conflicts: "Résolution des conflits logiciels",
    
    try_different_cable: "Essayer un câble de données USB différent",
    try_different_port: "Essayer un port USB différent",
    try_different_computer: "Tester le périphérique sur d'autres ordinateurs",
    check_device_power: "Vérifier si l'alimentation du périphérique est normale",
    
    close_other_serial_software: "Fermer les autres logiciels de débogage série",
    disable_antivirus: "Désactiver temporairement le logiciel antivirus",
    update_browser: "Mettre à jour le navigateur vers la dernière version",
    clear_browser_cache: "Effacer le cache et les données du navigateur",
    
    // Obtenir de l'aide
    get_help_title: "Obtenir de l'aide",
    get_help_desc: "Si aucune des méthodes ci-dessus ne peut résoudre le problème, veuillez collecter les informations suivantes et contacter le support technique:",
    
    help_info_os: "Version du système d'exploitation",
    help_info_browser: "Version du navigateur",
    help_info_device: "Modèle de périphérique et informations sur la puce",
    help_info_error: "Captures d'écran de messages d'erreur spécifiques",
    help_info_device_manager: "Captures d'écran du Gestionnaire de périphériques (Windows)",
    
    github_support_desc: "Soumettre un rapport de problème sur GitHub",
    
    // Nouveau: TuyaOpen Authorization related
    tab_tuya_auth: "Autorisation TuyaOpen",
    tuya_auth_title: "Écriture du Code d'Autorisation TuyaOpen",
    tuya_auth_subtitle: "Écrire les informations d'autorisation du projet TuyaOpen sur l'appareil",
    uuid_label: "UUID (20 caractères):",
    auth_key_label: "AUTH_KEY (32 caractères):",
    uuid_placeholder: "Entrez un UUID de 20 caractères...",
    auth_key_placeholder: "Entrez une AUTH_KEY de 32 caractères...",
    authorize_btn: "Écrire l'Autorisation",
    tuya_auth_notice_title: "⚠️ Avis Important",
    tuya_auth_notice_content: "Cette fonction d'autorisation s'applique uniquement à l'écriture du code d'autorisation des projets TuyaOpen et ne peut pas être utilisée pour les projets non-TuyaOpen.",
    tuya_auth_additional_info: "Veuillez vous assurer que l'appareil est en mode d'autorisation et que le port série est correctement connecté avant de procéder à l'opération d'autorisation.",
    uuid_length_error: "Erreur de longueur UUID! Veuillez entrer un UUID de 20 caractères",
    auth_key_length_error: "Erreur de longueur AUTH_KEY! Veuillez entrer une AUTH_KEY de 32 caractères",
    uuid_empty_error: "Veuillez entrer l'UUID",
    auth_key_empty_error: "Veuillez entrer l'AUTH_KEY",
    tuya_auth_success: "✅ Informations d'autorisation TuyaOpen écrites avec succès!",
    tuya_auth_failed: "❌ Échec de l'écriture des informations d'autorisation TuyaOpen: {0}",
    tuya_auth_sending: "Envoi des informations d'autorisation...",
    tuya_auth_command_sent: "Commande d'autorisation envoyée: auth {0} {1}",
    
    // Informations d'état liées à l'autorisation
    tuya_auth_waiting: "En attente d'opération d'autorisation...",
    tuya_auth_connected: "Port série d'autorisation connecté",
    tuya_auth_disconnected: "Port série d'autorisation déconnecté",
    connect_tuya_auth: "Connecter le Port Série d'Autorisation",
    disconnect_tuya_auth: "Déconnecter le Port Série d'Autorisation",
    tuya_auth_serial_connected: "Port série d'autorisation TuyaOpen connecté avec succès!",
    tuya_auth_serial_disconnected: "Port série d'autorisation TuyaOpen déconnecté.",
    tab_tuya_auth_name: "Autorisation TuyaOpen",
    
    // TuyaOpen授权码指南相关
    license_guide: "Guide d'obtention du code d'autorisation",
    license_guide_title: "Guide d'obtention du code d'autorisation TuyaOpen",
    license_guide_subtitle: "Comprendre le code d'autorisation TuyaOpen et les méthodes d'obtention",
    
    // 什么是TuyaOpen专用授权码
    what_is_license: "Qu'est-ce que le code d'autorisation exclusif TuyaOpen ?",
    license_info: "Toutes les versions du Framework TuyaOpen nécessitent un code d'autorisation exclusif pour se connecter normalement au cloud Tuya. D'autres codes d'autorisation ne peuvent pas fonctionner correctement.",
    supported_frameworks: "Frameworks TuyaOpen pris en charge",
    c_version: "TuyaOpen version C",
    arduino_version: "TuyaOpen version Arduino", 
    lua_version: "TuyaOpen version Luanode",
    
    // 如何获取授权码
    how_to_get: "Comment obtenir le code d'autorisation",
    method1_title: "Méthode 1 : Acheter des modules pré-programmés",
    method1_desc: "Acheter des modules avec code d'autorisation TuyaOpen pré-programmé via la plateforme développeur Tuya. Ce code est programmé dans le module correspondant en usine et ne sera pas perdu. TuyaOpen lit le code d'autorisation via l'interface `tuya_iot_license_read()` au démarrage. Confirmez si l'appareil actuel a un code d'autorisation TuyaOpen programmé.",
    method1_advantage: "Avantage : Prêt à l'emploi, aucune opération manuelle requise",
    
    method2_title: "Méthode 2 : Achat sur la plateforme Tuya",
    method2_desc: "Acheter le code d'autorisation TuyaOpen via la plateforme développeur Tuya, puis l'écrire dans le module en utilisant des outils de port série.",
    method2_advantage: "Avantage : Plateforme officielle, support des achats en gros",
    visit_platform: "Visiter la plateforme",
    visit_platform_preburn: "Acheter des modules pré-programmés",
    
    method3_title: "Méthode 3 : Achat sur Taobao",
    method3_desc: "Acheter le code d'autorisation TuyaOpen via les boutiques Taobao, puis l'écrire dans le module en utilisant des outils de port série.",
    method3_advantage: "Avantage : Achat pratique, méthodes de paiement flexibles",
    visit_taobao: "Visiter Taobao",
    
    // 使用指南
    usage_guide: "Guide d'utilisation",
    check_existing: "Étape 1 : Vérifier le code d'autorisation existant",
    check_warning: "Confirmez d'abord si l'appareil actuel a déjà un code d'autorisation TuyaOpen programmé pour éviter les achats en double.",
    write_license: "Étape 2 : Écrire le code d'autorisation",
    write_desc: "Si l'appareil n'a pas de code d'autorisation programmé, vous pouvez utiliser la fonction \"TuyaOpen Auth\" de cet outil pour l'écrire :",
    write_step1: "Connecter l'appareil à l'ordinateur",
    write_step2: "Basculer vers l'onglet \"TuyaOpen Auth\"",
    write_step3: "Connecter le port série",
    write_step4: "Saisir l'UUID et AUTH_KEY achetés",
    write_step5: "Cliquer sur le bouton \"Écrire l'autorisation\"",
    write_success: "Après avoir écrit avec succès le code d'autorisation, l'appareil peut utiliser normalement le framework TuyaOpen pour se connecter au cloud Tuya.",
    
    // 常见问题
    faq_title: "Questions fréquemment posées",
    q1: "Q : D'autres types de codes d'autorisation peuvent-ils être utilisés ?",
    a1: "R : Non. Le framework TuyaOpen ne peut utiliser que des codes d'autorisation exclusifs TuyaOpen. D'autres codes d'autorisation ne peuvent pas se connecter normalement au cloud Tuya.",
    q2: "Q : Le code d'autorisation sera-t-il perdu ?",
    a2: "R : Dans des circonstances normales, le code d'autorisation ne sera pas perdu. Le code d'autorisation des modules pré-programmés est programmé en usine, et le code écrit manuellement est sauvegardé dans la zone de stockage non volatile du module.",
    q3: "Q : Comment vérifier si l'appareil a déjà un code d'autorisation ?",
    a3: "R : Cela peut être vérifié en appelant l'interface `tuya_iot_license_read()` via le programme TuyaOpen.",
    
    // 技术支持
    support_title: "Support technique",
    support_desc: "Si vous rencontrez des problèmes pendant l'utilisation, obtenez de l'aide par les méthodes suivantes :",
    github_support: "Soumettre un rapport de problème"
};

// Exporter vers global
if (typeof window !== 'undefined') {
    window.i18nLanguages = window.i18nLanguages || {};
    window.i18nLanguages.fr = fr;
}