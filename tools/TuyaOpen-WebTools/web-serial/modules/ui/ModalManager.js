/**
 * 模态框管理模块
 * 负责错误提示、快捷命令管理等模态框
 */
class ModalManager {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.elements = {};
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        // 错误模态框
        this.elements.errorModal = document.getElementById('errorModal');
        this.elements.errorMessage = document.getElementById('errorMessage');
        this.elements.closeModal = document.querySelector('.close');
        
        // 快捷命令管理模态框
        this.elements.quickCommandModal = document.getElementById('quickCommandModal');
        this.elements.commandName = document.getElementById('commandName');
        this.elements.commandValue = document.getElementById('commandValue');
        this.elements.addCommandBtn = document.getElementById('addCommandBtn');
        this.elements.commandList = document.getElementById('commandList');
        this.elements.noCommands = document.getElementById('noCommands');
        this.elements.resetDefaultBtn = document.getElementById('resetDefaultBtn');
        this.elements.closeQuickModalBtn = document.getElementById('closeQuickModalBtn');
    }
    
    bindEvents() {
        // 错误模态框事件
        this.elements.closeModal?.addEventListener('click', () => {
            this.hideError();
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === this.elements.errorModal) {
                this.hideError();
            }
        });
        
        // 快捷命令模态框事件
        this.elements.closeQuickModalBtn?.addEventListener('click', () => {
            this.hideQuickCommandModal();
        });
        
        this.elements.quickCommandModal?.addEventListener('click', (e) => {
            if (e.target === this.elements.quickCommandModal) {
                this.hideQuickCommandModal();
            }
        });
        
        // 模块事件监听
        this.eventBus.on('error', (error) => {
            this.showError(error.message || error);
        });
        
        this.eventBus.on('modal:quick-commands-show', () => {
            this.showQuickCommandModal();
        });
        
        this.eventBus.on('modal:quick-commands-hide', () => {
            this.hideQuickCommandModal();
        });
    }
    
    /**
     * 显示错误信息
     */
    showError(message) {
        if (this.elements.errorMessage) {
            this.elements.errorMessage.textContent = message;
        }
        if (this.elements.errorModal) {
            this.elements.errorModal.style.display = 'block';
        }
    }
    
    /**
     * 隐藏错误信息
     */
    hideError() {
        if (this.elements.errorModal) {
            this.elements.errorModal.style.display = 'none';
        }
    }
    
    /**
     * 显示快捷命令管理模态框
     */
    showQuickCommandModal() {
        if (this.elements.quickCommandModal) {
            this.elements.quickCommandModal.style.display = 'block';
        }
        this.eventBus.emit('quick-commands:render-list');
        this.clearAddForm();
    }
    
    /**
     * 隐藏快捷命令管理模态框
     */
    hideQuickCommandModal() {
        if (this.elements.quickCommandModal) {
            this.elements.quickCommandModal.style.display = 'none';
        }
    }
    
    /**
     * 清空添加表单
     */
    clearAddForm() {
        if (this.elements.commandName) {
            this.elements.commandName.value = '';
        }
        if (this.elements.commandValue) {
            this.elements.commandValue.value = '';
        }
        if (this.elements.commandName) {
            this.elements.commandName.focus();
        }
    }
    
    /**
     * 获取模态框元素
     */
    getElement(name) {
        return this.elements[name];
    }
    
    /**
     * 销毁模块
     */
    destroy() {
        this.elements = {};
        this.eventBus = null;
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.ModalManager = ModalManager;
} 