/**
 * Tab页面管理模块
 * 负责Tab切换、状态管理
 */
class TabManager {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.currentTab = 'serial';
        this.elements = {};
        
        this.initializeElements();
        this.bindEvents();
        this.initializeTabs();
    }
    
    initializeElements() {
        // Tab相关元素
        this.elements.tabButtons = document.querySelectorAll('.tab-btn');
        this.elements.tabPanels = document.querySelectorAll('.tab-panel');
    }
    
    bindEvents() {
        // Tab切换事件
        this.elements.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = btn.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
        
        // 监听模块事件
        this.eventBus.on('tab:switch', (tabName) => {
            this.switchTab(tabName);
        });
    }
    
    /**
     * 初始化Tab功能
     */
    initializeTabs() {
        // 默认显示串口调试Tab
        this.switchTab('serial');
    }
    
    /**
     * 切换Tab
     */
    switchTab(tabName) {
        // 移除所有active类
        this.elements.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.elements.tabPanels.forEach(panel => panel.classList.remove('active'));

        // 添加active类到当前Tab
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const activePanel = document.getElementById(`${tabName}Tab`);
        
        if (activeBtn && activePanel) {
            activeBtn.classList.add('active');
            activePanel.classList.add('active');
        }

        // 更新当前Tab状态
        this.currentTab = tabName;
        
        // 触发Tab切换事件
        this.eventBus.emit('tab:switched', tabName);
        
        return true; // 切换成功
    }
    
    /**
     * 获取当前Tab
     */
    getCurrentTab() {
        return this.currentTab;
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
    window.TabManager = TabManager;
} 