/**
 * 文本更新模块
 * 负责页面文本的国际化更新、占位符更新
 */
class TextUpdater {
    constructor(eventBus) {
        this.eventBus = eventBus;
        
        this.bindEvents();
    }
    
    bindEvents() {
        // 监听语言变更事件
        this.eventBus.on('language:changed', (lang) => {
            this.updateAll();
        });
        
        this.eventBus.on('text:update-all', () => {
            this.updateAll();
        });
        
        this.eventBus.on('text:update-placeholders', () => {
            this.updatePlaceholderTexts();
        });
        
        this.eventBus.on('text:update-input-placeholder', () => {
            this.updateInputPlaceholder();
        });
    }
    
    /**
     * 更新所有文本内容
     */
    updateAll() {
        // 更新页面基础文本
        this.updatePageText();
        
        // 更新输入框placeholder
        this.updateInputPlaceholder();
        
        // 更新各种占位符文本
        this.updatePlaceholderTexts();
        
        // 触发UI管理器更新
        this.eventBus.emit('ui:text-updated');
    }
    
    /**
     * 更新页面基础文本（使用i18n系统）
     */
    updatePageText() {
        if (typeof i18n !== 'undefined' && i18n.updatePageText) {
            i18n.updatePageText();
        }
    }
    
    /**
     * 更新输入框占位符
     */
    updateInputPlaceholder() {
        const sendInput = document.getElementById('sendInput');
        const hexModeCheck = document.getElementById('hexMode');
        
        if (sendInput) {
            if (hexModeCheck?.checked) {
                sendInput.placeholder = i18n.t('input_placeholder_hex');
            } else {
                sendInput.placeholder = i18n.t('input_placeholder');
            }
        }
    }
    
    /**
     * 更新占位符文本
     */
    updatePlaceholderTexts() {
        // 更新接收数据区域的占位符
        const dataPlaceholder = document.querySelector('#dataDisplay .placeholder');
        if (dataPlaceholder) {
            dataPlaceholder.textContent = i18n.t('waiting_data');
        }
        
        // 更新固件下载日志的占位符
        const flashPlaceholder = document.querySelector('#flashLogDisplay .placeholder');
        if (flashPlaceholder) {
            flashPlaceholder.textContent = i18n.t('waiting_download');
        }
        
        // 更新全屏显示的占位符
        const fullscreenPlaceholder = document.querySelector('#fullscreenDataDisplay .placeholder');
        if (fullscreenPlaceholder) {
            fullscreenPlaceholder.textContent = i18n.t('waiting_data');
        }
        
        const flashFullscreenPlaceholder = document.querySelector('#flashFullscreenDataDisplay .placeholder');
        if (flashFullscreenPlaceholder) {
            flashFullscreenPlaceholder.textContent = i18n.t('waiting_download');
        }
        
        // 更新文件名显示
        const selectedFileName = document.getElementById('selectedFileName');
        if (selectedFileName && (selectedFileName.textContent === '未选择文件' || selectedFileName.textContent === 'No file selected')) {
            selectedFileName.textContent = i18n.t('no_file_selected');
        }
        
        // 更新无快捷命令提示
        const noQuickCmds = document.querySelector('#noQuickCommands p');
        if (noQuickCmds) {
            noQuickCmds.textContent = i18n.t('no_quick_commands');
        }
        
        // 更新无命令提示
        const noCommands = document.querySelector('#noCommands p');
        if (noCommands) {
            noCommands.textContent = i18n.t('no_commands');
        }
    }
    
    /**
     * 更新特定元素的文本
     */
    updateElementText(elementId, i18nKey, defaultText = '') {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = i18n.t(i18nKey) || defaultText;
        }
    }
    
    /**
     * 更新特定元素的占位符
     */
    updateElementPlaceholder(elementId, i18nKey, defaultText = '') {
        const element = document.getElementById(elementId);
        if (element) {
            element.placeholder = i18n.t(i18nKey) || defaultText;
        }
    }
    
    /**
     * 批量更新元素文本
     */
    updateElementsText(updates) {
        updates.forEach(({ elementId, i18nKey, defaultText = '' }) => {
            this.updateElementText(elementId, i18nKey, defaultText);
        });
    }
    
    /**
     * 批量更新元素占位符
     */
    updateElementsPlaceholder(updates) {
        updates.forEach(({ elementId, i18nKey, defaultText = '' }) => {
            this.updateElementPlaceholder(elementId, i18nKey, defaultText);
        });
    }
    
    /**
     * 更新状态文本
     */
    updateStatusTexts() {
        // 更新连接状态文本
        const statusText = document.getElementById('statusText');
        const flashStatusText = document.getElementById('flashStatusText');
        
        if (statusText) {
            const isConnected = statusText.classList?.contains('connected') || 
                              statusText.parentElement?.querySelector('.status-dot.connected');
            statusText.textContent = isConnected ? 
                i18n.t('status_connected') : i18n.t('status_disconnected');
        }
        
        if (flashStatusText) {
            const isConnected = flashStatusText.classList?.contains('connected') || 
                              flashStatusText.parentElement?.querySelector('.status-dot.connected');
            flashStatusText.textContent = isConnected ? 
                i18n.t('status_connected') : i18n.t('status_disconnected');
        }
        
        // 更新调试状态文本
        const debugStatusValue = document.getElementById('debugStatusValue');
        if (debugStatusValue) {
            const flashDebugMode = document.getElementById('flashDebugMode');
            const isEnabled = flashDebugMode?.checked || false;
            debugStatusValue.textContent = isEnabled ? i18n.t('enabled') : i18n.t('disabled');
        }
    }
    
    /**
     * 更新动态内容（由其他模块触发）
     */
    updateDynamicContent() {
        this.updateStatusTexts();
        this.updatePlaceholderTexts();
        this.updateInputPlaceholder();
    }
    
    /**
     * 销毁模块
     */
    destroy() {
        this.eventBus = null;
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.TextUpdater = TextUpdater;
} 