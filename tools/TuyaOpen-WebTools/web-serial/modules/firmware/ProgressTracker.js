/**
 * 固件下载进度跟踪模块
 * 负责下载进度显示、速度计算、日志管理
 */
class ProgressTracker {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.elements = {};
        this.startTime = null;
        this.lastUpdateTime = null;
        this.lastBytes = 0;
        this.timerManager = null;
        
        this.initializeElements();
        this.bindEvents();
        this.initializeTimer();
    }
    
    initializeElements() {
        // 进度显示相关元素
        this.elements.progressArea = document.getElementById('progressArea');
        this.elements.progressText = document.getElementById('progressText');
        this.elements.progressPercent = document.getElementById('progressPercent');
        this.elements.progressFill = document.getElementById('progressFill');
        this.elements.downloadedBytes = document.getElementById('downloadedBytes');
        this.elements.totalBytes = document.getElementById('totalBytes');
        
        // 固件下载日志相关元素
        this.elements.flashLogDisplay = document.getElementById('flashLogDisplay');
        this.elements.clearFlashLogBtn = document.getElementById('clearFlashLogBtn');
        this.elements.saveFlashLogBtn = document.getElementById('saveFlashLogBtn');
        this.elements.flashAutoScroll = document.getElementById('flashAutoScroll');
    }
    
    bindEvents() {
        // 固件下载日志事件
        this.elements.clearFlashLogBtn?.addEventListener('click', () => {
            this.clearFlashLog();
        });

        this.elements.saveFlashLogBtn?.addEventListener('click', () => {
            this.saveFlashLog();
        });
        
        // 监听模块事件
        this.eventBus.on('flash:progress-update', (progressData) => {
            this.updateProgress(progressData);
        });
        
        this.eventBus.on('flash:log-add', (logData) => {
            this.addToFlashLog(logData.message, logData.type, logData.isMainProcess);
        });
        
        this.eventBus.on('flash:log-clear', () => {
            this.clearFlashLog();
        });
        
        this.eventBus.on('flash:log-save', () => {
            this.saveFlashLog();
        });
        
        // 下载开始/结束事件
        this.eventBus.on('flash:download-started', () => {
            this.startTracking();
        });
        
        this.eventBus.on('flash:download-finished', () => {
            this.stopTracking();
        });
    }
    
    /**
     * 初始化计时器
     */
    initializeTimer() {
        if (typeof TimerManager !== 'undefined') {
            this.timerManager = new TimerManager();
        } else {
            console.warn('TimerManager not found, timer functionality will be disabled');
        }
    }
    
    /**
     * 开始进度跟踪
     */
    startTracking() {
        this.startTime = Date.now();
        this.lastUpdateTime = this.startTime;
        this.lastBytes = 0;
        
        // 重置并启动计时器
        if (this.timerManager) {
            this.timerManager.reset();
            this.timerManager.start();
        }
        
        // 显示进度区域
        if (this.elements.progressArea) {
            this.elements.progressArea.style.display = 'block';
        }
    }
    
    /**
     * 停止进度跟踪
     */
    stopTracking() {
        // 停止计时器
        if (this.timerManager) {
            this.timerManager.stop();
        }
        
        this.startTime = null;
        this.lastUpdateTime = null;
        this.lastBytes = 0;
    }
    
    /**
     * 更新固件下载进度
     */
    updateProgress(detail) {
        // 更新进度文本（移除其中的百分比，只显示纯文本描述）
        if (this.elements.progressText && detail.message) {
            // 从消息中移除百分比，只显示操作描述
            const messageWithoutPercent = detail.message.replace(/\s*\d+%/g, '').trim();
            this.elements.progressText.textContent = messageWithoutPercent || detail.message;
        }
        
        // 更新右侧的总百分比显示
        if (this.elements.progressPercent && typeof detail.percent === 'number') {
            this.elements.progressPercent.textContent = `${Math.round(detail.percent)}%`;
        }
        
        // 更新进度条填充
        if (this.elements.progressFill && typeof detail.percent === 'number') {
            this.elements.progressFill.style.width = `${detail.percent}%`;
        }
        
        // 更新字节显示
        if (detail.totalSize > 0) {
            if (this.elements.downloadedBytes) {
                this.elements.downloadedBytes.textContent = detail.downloadedSize.toLocaleString();
            }
            if (this.elements.totalBytes) {
                this.elements.totalBytes.textContent = detail.totalSize.toLocaleString();
            }
        }
        
        // 添加到日志（如果是进度类型的消息，移除其中的百分比显示）
        if (detail.message) {
            // 从消息中移除百分比，只记录纯文本描述
            const messageWithoutPercent = detail.message.replace(/\s*\d+%/g, '').trim();
            if (messageWithoutPercent && detail.message.includes('%')) {
                this.addToFlashLog(messageWithoutPercent, 'progress', false);
            }
        }
    }
    
    /**
     * 添加到固件下载日志
     */
    addToFlashLog(text, type = 'info', isMainProcess = false) {
        if (!this.elements.flashLogDisplay) return;
        
        // 如果不是调试模式，只显示主流程信息
        const debugMode = document.getElementById('flashDebugMode')?.checked;
        if (!debugMode && !isMainProcess) {
            return;
        }
        
        const timestamp = this.generateTimestamp();
        const logEntry = document.createElement('div');
        logEntry.className = `debug-entry ${type}`;
        
        // 为主流程信息添加特殊样式
        if (isMainProcess) {
            logEntry.classList.add('main-process');
        }
        
        // 创建时间戳
        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'debug-timestamp';
        timestampSpan.textContent = `[${timestamp}]`;
        
        // 创建类型标签
        const typeSpan = document.createElement('span');
        typeSpan.className = 'debug-type';
        typeSpan.textContent = isMainProcess ? 'MAIN' : type.toUpperCase();
        
        // 创建消息内容
        const messageSpan = document.createElement('span');
        messageSpan.className = 'debug-message';
        messageSpan.textContent = text;
        
        logEntry.appendChild(timestampSpan);
        logEntry.appendChild(typeSpan);
        logEntry.appendChild(messageSpan);
        
        // 移除占位符
        const placeholder = this.elements.flashLogDisplay.querySelector('.placeholder');
        if (placeholder) {
            placeholder.remove();
        }
        
        this.elements.flashLogDisplay.appendChild(logEntry);
        
        // 自动滚动
        if (this.elements.flashAutoScroll?.checked) {
            this.elements.flashLogDisplay.scrollTop = this.elements.flashLogDisplay.scrollHeight;
        }
        
        // 触发日志添加事件（用于全屏同步）
        this.eventBus.emit('flash:log-added');
    }
    
    /**
     * 清空固件下载日志
     */
    clearFlashLog() {
        if (this.elements.flashLogDisplay) {
            this.elements.flashLogDisplay.innerHTML = `<div class="placeholder">${i18n.t('waiting_download')}</div>`;
        }
        
        // 触发日志清空事件
        this.eventBus.emit('flash:log-cleared');
    }
    
    /**
     * 保存固件下载日志
     */
    saveFlashLog() {
        if (!this.elements.flashLogDisplay) return;
        
        const lines = this.elements.flashLogDisplay.querySelectorAll('.debug-entry');
        if (lines.length === 0) {
            this.eventBus.emit('error', { message: i18n.t('no_log_to_save') });
            return;
        }

        let logContent = '';
        lines.forEach(line => {
            logContent += line.textContent + '\n';
        });

        const blob = new Blob([logContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `flash_log_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // 清理URL对象
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 100);
    }
    
    /**
     * 生成时间戳
     */
    generateTimestamp() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' +
               now.getMinutes().toString().padStart(2, '0') + ':' +
               now.getSeconds().toString().padStart(2, '0') + '.' +
               now.getMilliseconds().toString().padStart(3, '0');
    }
    
    /**
     * 获取进度状态
     */
    getStatus() {
        return {
            isTracking: !!this.startTime,
            startTime: this.startTime,
            lastUpdateTime: this.lastUpdateTime,
            lastBytes: this.lastBytes
        };
    }
    
    /**
     * 销毁模块
     */
    destroy() {
        // 销毁计时器
        if (this.timerManager) {
            this.timerManager.destroy();
            this.timerManager = null;
        }
        
        this.elements = {};
        this.startTime = null;
        this.lastUpdateTime = null;
        this.lastBytes = 0;
        this.eventBus = null;
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.ProgressTracker = ProgressTracker;
} 