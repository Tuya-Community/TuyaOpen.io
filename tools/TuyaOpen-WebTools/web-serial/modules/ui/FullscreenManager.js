/**
 * 全屏管理模块
 * 负责串口数据和下载日志的全屏显示功能
 */
class FullscreenManager {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.elements = {};
        this.isFullscreen = false;
        this.isFlashFullscreen = false;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        // 串口数据全屏相关元素
        this.elements.fullscreenBtn = document.getElementById('fullscreenBtn');
        this.elements.fullscreenOverlay = document.getElementById('fullscreenOverlay');
        this.elements.fullscreenCloseBtn = document.getElementById('fullscreenCloseBtn');
        this.elements.fullscreenDataDisplay = document.getElementById('fullscreenDataDisplay');
        this.elements.dataDisplay = document.getElementById('dataDisplay');
        this.elements.autoScrollCheck = document.getElementById('autoScroll');

        // 下载日志全屏相关元素
        this.elements.flashFullscreenBtn = document.getElementById('flashFullscreenBtn');
        this.elements.flashFullscreenOverlay = document.getElementById('flashFullscreenOverlay');
        this.elements.flashFullscreenCloseBtn = document.getElementById('flashFullscreenCloseBtn');
        this.elements.flashFullscreenDataDisplay = document.getElementById('flashFullscreenDataDisplay');
        this.elements.flashLogDisplay = document.getElementById('flashLogDisplay');
        this.elements.flashAutoScroll = document.getElementById('flashAutoScroll');
    }
    
    bindEvents() {
        // 串口数据全屏相关事件
        this.elements.fullscreenBtn?.addEventListener('click', () => {
            this.toggleFullscreen();
        });

        this.elements.fullscreenCloseBtn?.addEventListener('click', () => {
            this.exitFullscreen();
        });

        // 下载日志全屏相关事件
        this.elements.flashFullscreenBtn?.addEventListener('click', () => {
            this.toggleFlashFullscreen();
        });

        this.elements.flashFullscreenCloseBtn?.addEventListener('click', () => {
            this.exitFlashFullscreen();
        });

        // ESC键退出全屏
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.isFullscreen) {
                    this.exitFullscreen();
                }
                if (this.isFlashFullscreen) {
                    this.exitFlashFullscreen();
                }
            }
        });

        // 点击覆盖层外部退出全屏
        this.elements.fullscreenOverlay?.addEventListener('click', (e) => {
            if (e.target === this.elements.fullscreenOverlay) {
                this.exitFullscreen();
            }
        });

        this.elements.flashFullscreenOverlay?.addEventListener('click', (e) => {
            if (e.target === this.elements.flashFullscreenOverlay) {
                this.exitFlashFullscreen();
            }
        });
        
        // 监听数据显示事件，如果在全屏模式需要同步
        this.eventBus.on('data:display', (data) => {
            if (this.isFullscreen) {
                setTimeout(() => {
                    this.syncDataToFullscreen();
                }, 50);
            }
        });
        
        // 监听固件下载日志事件
        this.eventBus.on('flash:log-added', () => {
            if (this.isFlashFullscreen) {
                setTimeout(() => {
                    this.syncFlashDataToFullscreen();
                }, 50);
            }
        });
    }
    
    // =============== 串口数据全屏功能 ===============
    
    /**
     * 切换串口数据全屏状态
     */
    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }
    
    /**
     * 进入串口数据全屏模式
     */
    enterFullscreen() {
        // 同步数据到全屏显示区域
        this.syncDataToFullscreen();
        
        // 显示全屏覆盖层
        this.elements.fullscreenOverlay?.classList.add('active');
        this.isFullscreen = true;
        
        // 滚动到底部（如果启用了自动滚动）
        if (this.elements.autoScrollCheck?.checked) {
            setTimeout(() => {
                if (this.elements.fullscreenDataDisplay) {
                    this.elements.fullscreenDataDisplay.scrollTop = this.elements.fullscreenDataDisplay.scrollHeight;
                }
            }, 100);
        }
        
        this.eventBus.emit('fullscreen:entered', 'serial');
    }
    
    /**
     * 退出串口数据全屏模式
     */
    exitFullscreen() {
        // 隐藏全屏覆盖层
        this.elements.fullscreenOverlay?.classList.remove('active');
        this.isFullscreen = false;
        
        this.eventBus.emit('fullscreen:exited', 'serial');
    }
    
    /**
     * 同步串口数据到全屏显示区域
     */
    syncDataToFullscreen() {
        if (this.elements.fullscreenDataDisplay && this.elements.dataDisplay) {
            this.elements.fullscreenDataDisplay.innerHTML = this.elements.dataDisplay.innerHTML;
        }
    }
    
    // =============== 下载日志全屏功能 ===============
    
    /**
     * 切换下载日志全屏状态
     */
    toggleFlashFullscreen() {
        if (!this.isFlashFullscreen) {
            this.enterFlashFullscreen();
        } else {
            this.exitFlashFullscreen();
        }
    }
    
    /**
     * 进入下载日志全屏模式
     */
    enterFlashFullscreen() {
        // 同步数据到全屏显示区域
        this.syncFlashDataToFullscreen();
        
        // 显示全屏覆盖层
        this.elements.flashFullscreenOverlay?.classList.add('active');
        this.isFlashFullscreen = true;
        
        // 滚动到底部（如果启用了自动滚动）
        if (this.elements.flashAutoScroll?.checked) {
            setTimeout(() => {
                if (this.elements.flashFullscreenDataDisplay) {
                    this.elements.flashFullscreenDataDisplay.scrollTop = this.elements.flashFullscreenDataDisplay.scrollHeight;
                }
            }, 100);
        }
        
        this.eventBus.emit('fullscreen:entered', 'flash');
    }
    
    /**
     * 退出下载日志全屏模式
     */
    exitFlashFullscreen() {
        // 隐藏全屏覆盖层
        this.elements.flashFullscreenOverlay?.classList.remove('active');
        this.isFlashFullscreen = false;
        
        this.eventBus.emit('fullscreen:exited', 'flash');
    }
    
    /**
     * 同步下载日志数据到全屏显示区域
     */
    syncFlashDataToFullscreen() {
        if (this.elements.flashFullscreenDataDisplay && this.elements.flashLogDisplay) {
            this.elements.flashFullscreenDataDisplay.innerHTML = this.elements.flashLogDisplay.innerHTML;
        }
    }
    
    /**
     * 获取全屏状态
     */
    getStatus() {
        return {
            isFullscreen: this.isFullscreen,
            isFlashFullscreen: this.isFlashFullscreen
        };
    }
    
    /**
     * 销毁模块
     */
    destroy() {
        this.elements = {};
        this.isFullscreen = false;
        this.isFlashFullscreen = false;
        this.eventBus = null;
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.FullscreenManager = FullscreenManager;
} 