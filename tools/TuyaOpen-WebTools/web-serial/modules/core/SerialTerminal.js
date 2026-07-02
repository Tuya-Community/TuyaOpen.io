/**
 * 串口终端主控制器
 * 负责协调各个模块，提供统一的接口
 */
class SerialTerminal {
    constructor() {
        // 初始化事件总线
        this.eventBus = window.eventBus;
        
        // 模块实例
        this.serialManager = null;
        this.dataProcessor = null;
        this.quickCommands = null;
        this.flashManager = null;
        this.progressTracker = null;
        this.uiManager = null;
        this.tabManager = null;
        this.modalManager = null;
        this.fullscreenManager = null;
        this.languageManager = null;
        this.textUpdater = null;
        this.logger = null;
        this.fileUtils = null;
        
        // 连接状态
        this.isSerialConnected = false;
        this.isFlashConnected = false;
        this.selectedFile = null;
        this.currentTab = 'serial';
        
        // 初始化
        this.initializeModules();
        this.bindGlobalEvents();
        
        console.log('🚀 模块化串口工具已初始化');
    }
    
    /**
     * 初始化所有模块
     */
    async initializeModules() {
        try {
            // 工具模块
            this.logger = new Logger(this.eventBus);
            this.fileUtils = new FileUtils(this.eventBus);
            
            // UI模块
            this.uiManager = new UIManager(this.eventBus);
            this.tabManager = new TabManager(this.eventBus);
            this.modalManager = new ModalManager(this.eventBus);
            this.fullscreenManager = new FullscreenManager(this.eventBus);
            
            // 串口模块
            this.serialManager = new SerialManager(this.eventBus);
            this.dataProcessor = new DataProcessor(this.eventBus);
            this.quickCommands = new QuickCommands(this.eventBus);
            
            // 固件下载模块
            this.flashManager = new FlashManager(this.eventBus);
            this.progressTracker = new ProgressTracker(this.eventBus);
            
            // 国际化模块
            this.languageManager = new LanguageManager(this.eventBus);
            this.textUpdater = new TextUpdater(this.eventBus);
            
            // 等待多语言系统就绪
            if (window.i18nLanguages && i18n.getCurrentLanguage()) {
                await this.initializeLanguage();
            } else {
                window.addEventListener('i18nReady', () => {
                    this.initializeLanguage();
                });
            }
            
            this.logger.info('所有模块初始化完成');
            
        } catch (error) {
            console.error('模块初始化失败:', error);
            this.logger.error('模块初始化失败', error);
        }
    }
    
    /**
     * 绑定全局事件
     */
    bindGlobalEvents() {
        // 连接状态变化
        this.eventBus.on('serial:connected', (data) => {
            this.isSerialConnected = true;
            this.logger.info('串口调试已连接');
        });
        
        this.eventBus.on('serial:disconnected', (data) => {
            this.isSerialConnected = false;
            this.logger.info('串口调试已断开');
        });
        
        this.eventBus.on('flash:connected', (data) => {
            this.isFlashConnected = true;
            this.logger.info('固件下载串口已连接');
        });
        
        this.eventBus.on('flash:disconnected', (data) => {
            this.isFlashConnected = false;
            this.logger.info('固件下载串口已断开');
        });
        
        // 文件选择
        this.eventBus.on('file:selected', (file) => {
            this.selectedFile = file;
            this.logger.info('文件已选择', file.name);
        });
        
        // Tab切换
        this.eventBus.on('tab:switched', (tabName) => {
            this.currentTab = tabName;
            this.logger.info('Tab已切换', tabName);
        });
        
        // 语言切换
        this.eventBus.on('language:changed', (lang) => {
            this.logger.info('语言已切换', lang);
        });
        
        // 错误处理
        this.eventBus.on('error', (error) => {
            this.logger.error('应用错误', error);
            this.modalManager.showError(error.message || error);
        });
    }
    
    /**
     * 初始化语言设置
     */
    async initializeLanguage() {
        if (this.languageManager && this.textUpdater) {
            await this.languageManager.initialize();
            this.textUpdater.updateAll();
            this.logger.info('语言系统初始化完成');
        }
    }
    
    /**
     * 获取应用状态
     */
    getStatus() {
        return {
            isSerialConnected: this.isSerialConnected,
            isFlashConnected: this.isFlashConnected,
            selectedFile: this.selectedFile,
            currentTab: this.currentTab,
            modules: {
                serialManager: !!this.serialManager,
                dataProcessor: !!this.dataProcessor,
                quickCommands: !!this.quickCommands,
                flashManager: !!this.flashManager,
                progressTracker: !!this.progressTracker,
                uiManager: !!this.uiManager,
                tabManager: !!this.tabManager,
                modalManager: !!this.modalManager,
                fullscreenManager: !!this.fullscreenManager,
                languageManager: !!this.languageManager,
                textUpdater: !!this.textUpdater,
                logger: !!this.logger,
                fileUtils: !!this.fileUtils
            }
        };
    }
    
    /**
     * 销毁所有模块
     */
    destroy() {
        // 清空事件总线
        this.eventBus.clear();
        
        // 销毁模块
        const modules = [
            'serialManager', 'dataProcessor', 'quickCommands',
            'flashManager', 'progressTracker', 'uiManager',
            'tabManager', 'modalManager', 'fullscreenManager',
            'languageManager', 'textUpdater', 'logger', 'fileUtils'
        ];
        
        modules.forEach(moduleName => {
            if (this[moduleName] && typeof this[moduleName].destroy === 'function') {
                this[moduleName].destroy();
            }
            this[moduleName] = null;
        });
        
        console.log('🗑️ 模块化串口工具已销毁');
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.SerialTerminal = SerialTerminal;
} 