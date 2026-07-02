/**
 * 固件下载管理模块
 * 负责固件下载流程、进度管理、FlashDownloader集成
 */
class FlashManager {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.flashDownloader = null;
        this.selectedFile = null;
        this.isDownloading = false;
        this.elements = {};
        
        this.initializeElements();
        this.bindEvents();
        this.initializeFlashDownloader();
    }
    
    initializeElements() {
        // 固件下载相关元素
        this.elements.selectFileBtn = document.getElementById('selectFileBtn');
        this.elements.binFileInput = document.getElementById('binFileInput');
        this.elements.selectedFileName = document.getElementById('selectedFileName');
        this.elements.fileInfo = document.getElementById('fileInfo');
        this.elements.fileSize = document.getElementById('fileSize');
        this.elements.deviceSelect = document.getElementById('deviceSelect');
        this.elements.downloadBtn = document.getElementById('downloadBtn');
        this.elements.stopDownloadBtn = document.getElementById('stopDownloadBtn');
        this.elements.progressArea = document.getElementById('progressArea');
        
        // 调试控件相关元素
        this.elements.flashDebugMode = document.getElementById('flashDebugMode');
        this.elements.debugStatusBar = document.getElementById('debugStatusBar');
        this.elements.debugStatusValue = document.getElementById('debugStatusValue');
    }
    
    bindEvents() {
        // 文件选择事件
        this.elements.selectFileBtn?.addEventListener('click', () => {
            this.elements.binFileInput?.click();
        });

        this.elements.binFileInput?.addEventListener('change', (e) => {
            this.handleFileSelect(e);
        });

        // 固件下载事件
        this.elements.downloadBtn?.addEventListener('click', () => {
            this.startFlashDownload();
        });

        this.elements.stopDownloadBtn?.addEventListener('click', () => {
            this.stopFlashDownload();
        });

        // 调试控件事件
        this.elements.flashDebugMode?.addEventListener('change', () => {
            this.toggleDebugMode();
        });
        
        // 监听模块事件
        this.eventBus.on('flash:download-start', () => {
            this.startFlashDownload();
        });
        
        this.eventBus.on('flash:download-stop', () => {
            this.stopFlashDownload();
        });
        
        this.eventBus.on('file:selected', (file) => {
            this.selectedFile = file;
            this.updateFileDisplay(file);
        });
        
        this.eventBus.on('flash:connected-independent', () => {
            this.updateDownloadButtonState();
        });
        
        this.eventBus.on('flash:disconnected-independent', () => {
            this.updateDownloadButtonState();
        });
        
        this.eventBus.on('debug:toggle', (enabled) => {
            this.updateDebugState(enabled);
        });
    }
    
    /**
     * 初始化固件下载器
     */
    initializeFlashDownloader() {
        // 创建一个兼容接口对象，提供FlashDownloader需要的方法
        const flashInterface = {
            // 提供串口连接方法
            connectFlash: async (baudrate = 115200) => {
                return new Promise((resolve, reject) => {
                    // 通过事件总线请求串口连接
                    this.eventBus.emit('flash:connect-request', baudrate);
                    
                    // 监听连接结果
                    const onConnected = (data) => {
                        this.eventBus.off('flash:connected', onConnected);
                        this.eventBus.off('error', onError);
                        resolve(data);
                    };
                    
                    const onError = (error) => {
                        this.eventBus.off('flash:connected', onConnected);
                        this.eventBus.off('error', onError);
                        reject(error);
                    };
                    
                    this.eventBus.on('flash:connected', onConnected);
                    this.eventBus.on('error', onError);
                });
            },
            
            // 提供串口断开方法
            disconnectFlash: async () => {
                return new Promise((resolve, reject) => {
                    this.eventBus.emit('flash:disconnect-request');
                    
                    const onDisconnected = () => {
                        this.eventBus.off('flash:disconnected', onDisconnected);
                        this.eventBus.off('error', onError);
                        resolve();
                    };
                    
                    const onError = (error) => {
                        this.eventBus.off('flash:disconnected', onDisconnected);
                        this.eventBus.off('error', onError);
                        reject(error);
                    };
                    
                    this.eventBus.on('flash:disconnected', onDisconnected);
                    this.eventBus.on('error', onError);
                });
            },
            
            // 提供固件下载连接状态
            isFlashConnected: this.isFlashConnected.bind(this),
            
            // 提供波特率配置访问（新增）
            flashBaudRateSelect: {
                get value() {
                    return document.getElementById('flashBaudRate')?.value || '921600';
                }
            },
            
            // 提供事件总线访问（为了兼容性）
            eventBus: this.eventBus
        };
        
        this.flashDownloader = new FlashDownloader(flashInterface);
        
        // 设置进度回调函数，接收调试信息和进度更新
        this.flashDownloader.setProgressCallback((progressData) => {
            if (progressData.type === 'log') {
                // 根据isMainProcess标志显示日志
                this.eventBus.emit('flash:log-add', {
                    message: progressData.message,
                    type: progressData.level,
                    isMainProcess: progressData.isMainProcess
                });
            } else if (progressData.type === 'progress') {
                // 更新进度显示
                this.eventBus.emit('flash:progress-update', {
                    message: progressData.message,
                    percent: (progressData.progress / progressData.total) * 100,
                    downloadedSize: progressData.progress,
                    totalSize: progressData.total
                });
            } else if (progressData.stage === 'completed' || progressData.type === 'completed') {
                // 🔧 关键修复：处理下载完成状态回调，与T5AI保持一致
                // 这确保ESP32和T5AI都能正确触发按钮状态更新和自动断开功能
                this.eventBus.emit('flash:log-add', {
                    message: progressData.message || '固件烧录完成',
                    type: 'success',
                    isMainProcess: true
                });
                
                // 注意：不需要在这里处理按钮状态和自动断开，因为：
                // 1. 按钮状态由FlashManager.startFlashDownload的finally块处理
                // 2. 自动断开功能由FlashManager.startFlashDownload的成功分支处理
                // 这个回调主要是为了日志记录和兼容性
            }
        });
        
        // 初始化支持的芯片列表 - 注释掉，避免与script-clean.js冲突
        // this.initializeSupportedChips();
        
        this.eventBus.emit('flash:downloader-initialized');
    }
    
    /**
     * 初始化支持的芯片列表
     */
    initializeSupportedChips() {
        if (typeof window.downloaderManager !== 'undefined') {
            const supportedChips = window.downloaderManager.getSupportedChips();
            
            // 清空现有选项
            this.elements.deviceSelect.innerHTML = '';
            
            // 添加支持的芯片选项
            supportedChips.forEach(chip => {
                const option = document.createElement('option');
                option.value = chip.name;
                option.textContent = chip.displayName;
                option.title = chip.description;
                this.elements.deviceSelect.appendChild(option);
            });
            
            this.eventBus.emit('flash:log-add', {
                message: i18n.t('loaded_chip_types', supportedChips.length),
                type: 'info',
                isMainProcess: true
            });
        } else {
            // 如果下载器管理器未加载，使用默认的T5AI和T3选项
            this.elements.deviceSelect.innerHTML = '<option value="T5AI">T5AI</option><option value="T3">T3</option>';
            this.eventBus.emit('flash:log-add', {
                message: i18n.t('using_default_chip_support'),
                type: 'warning',
                isMainProcess: true
            });
        }
    }
    
    /**
     * 处理文件选择
     */
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.updateFileDisplay(file);
            this.eventBus.emit('file:selected', file);
            this.eventBus.emit('flash:log-add', {
                message: i18n.t('file_selected', file.name, file.size.toLocaleString()),
                type: 'info',
                isMainProcess: false
            });
        }
    }
    
    /**
     * 更新文件显示
     */
    updateFileDisplay(file) {
        if (this.elements.selectedFileName) {
            this.elements.selectedFileName.textContent = file.name;
        }
        if (this.elements.fileSize) {
            this.elements.fileSize.textContent = file.size.toLocaleString();
        }
        if (this.elements.fileInfo) {
            this.elements.fileInfo.style.display = 'block';
        }
        this.updateDownloadButtonState();
    }
    
    /**
     * 更新下载按钮状态
     */
    updateDownloadButtonState() {
        if (this.elements.downloadBtn) {
            // 只有在有文件且固件下载已连接时才启用下载按钮
            this.elements.downloadBtn.disabled = !this.selectedFile || !this.isFlashConnected();
        }
    }
    
    /**
     * 检查固件下载是否已连接
     */
    isFlashConnected() {
        // 通过事件总线获取连接状态
        return window.serialTerminal?.isFlashConnected || false;
    }
    
    /**
     * 断开固件下载串口连接
     */
    async disconnectFlash() {
        try {
            // 通过事件总线触发串口断开
            this.eventBus.emit('flash:disconnect-request');
            
            // 如果有SerialManager实例，直接调用其断开方法
            if (window.serialTerminal && window.serialTerminal.disconnectFlash) {
                await window.serialTerminal.disconnectFlash();
            }
        } catch (error) {
            this.eventBus.emit('flash:log-add', {
                message: `断开串口失败: ${error.message}`,
                type: 'error',
                isMainProcess: true
            });
            throw error;
        }
    }
    
    /**
     * 开始固件下载
     */
    async startFlashDownload() {
        if (!this.selectedFile) {
            this.eventBus.emit('error', { message: i18n.t('please_select_file') });
            return;
        }

        if (!this.isFlashConnected()) {
            this.eventBus.emit('error', { message: i18n.t('please_connect_flash_serial') });
            return;
        }

        try {
            this.isDownloading = true;
            this.elements.downloadBtn.disabled = true;
            this.elements.stopDownloadBtn.disabled = false;
            this.elements.progressArea.style.display = 'block';

            // 发出开始下载事件，用于启动计时器
            this.eventBus.emit('flash:download-started');

            // 读取文件数据
            const fileData = await this.readFileAsArrayBuffer(this.selectedFile);
            const device = this.elements.deviceSelect.value;

            this.eventBus.emit('flash:log-add', {
                message: i18n.t('start_download_to', device),
                type: 'info',
                isMainProcess: true
            });

            // 开始下载
            await this.flashDownloader.downloadBinary(new Uint8Array(fileData), device);

            this.eventBus.emit('flash:log-add', {
                message: i18n.t('download_complete'),
                type: 'success',
                isMainProcess: true
            });

            // 发出下载完成事件，用于停止计时器
            this.eventBus.emit('flash:download-finished');

            // 检查是否需要自动断开串口
            const autoDisconnectCheckbox = document.getElementById('autoDisconnectAfterFlash');
            console.log('检查自动断开复选框:', autoDisconnectCheckbox, '选中状态:', autoDisconnectCheckbox?.checked);
            
            if (autoDisconnectCheckbox && autoDisconnectCheckbox.checked) {
                this.eventBus.emit('flash:log-add', {
                    message: '检测到自动断开选项已选中，将在1秒后断开串口...',
                    type: 'info',
                    isMainProcess: true
                });
                
                // 延迟一秒后自动断开串口，让用户看到完成消息
                setTimeout(async () => {
                    try {
                        console.log('开始执行自动断开串口...');
                        await this.disconnectFlash();
                        this.eventBus.emit('flash:log-add', {
                            message: i18n.t('auto_disconnect_after_flash'),
                            type: 'success',
                            isMainProcess: true
                        });
                        console.log('自动断开串口完成');
                    } catch (error) {
                        console.error('自动断开串口失败:', error);
                        this.eventBus.emit('flash:log-add', {
                            message: `自动断开串口失败: ${error.message}`,
                            type: 'error',
                            isMainProcess: true
                        });
                    }
                }, 1000);
            } else {
                console.log('自动断开功能未启用或复选框未选中');
            }

        } catch (error) {
            this.eventBus.emit('flash:log-add', {
                message: i18n.t('download_failed', error.message),
                type: 'error',
                isMainProcess: true
            });
            this.eventBus.emit('error', { message: i18n.t('download_failed', error.message) });
            
            // 发出下载完成事件，用于停止计时器
            this.eventBus.emit('flash:download-finished');
        } finally {
            this.isDownloading = false;
            this.updateDownloadButtonState();
            this.elements.stopDownloadBtn.disabled = true;
        }
    }
    
    /**
     * 停止固件下载
     */
    async stopFlashDownload() {
        if (this.flashDownloader) {
            this.flashDownloader.stop();
            this.eventBus.emit('flash:log-add', {
                message: i18n.t('user_cancelled'),
                type: 'warning',
                isMainProcess: true
            });
            
            // 关键修复：用户主动停止下载，绝对保持串口连接状态
            try {
                this.eventBus.emit('flash:log-add', {
                    message: '用户主动停止下载，正在清理下载器资源...',
                    type: 'info',
                    isMainProcess: true
                });
                
                // 等待下载过程完全停止
                await new Promise(resolve => setTimeout(resolve, 200));
                
                // 清理下载器资源（绝对不关闭串口）
                if (this.flashDownloader.cleanup) {
                    await this.flashDownloader.cleanup();
                }
                
                this.eventBus.emit('flash:log-add', {
                    message: '下载器资源清理完成',
                    type: 'info',
                    isMainProcess: true
                });
                
                // 关键修复：确保连接状态正确，用户主动停止应保持连接
                if (this.isFlashConnected()) {
                    this.eventBus.emit('flash:log-add', {
                        message: '✅ 串口连接已保持，可以继续下载',
                        type: 'success',
                        isMainProcess: true
                    });
                } else {
                    this.eventBus.emit('flash:log-add', {
                        message: '⚠️ 串口连接异常，需要重新连接',
                        type: 'warning',
                        isMainProcess: true
                    });
                }
                
            } catch (resetError) {
                this.eventBus.emit('flash:log-add', {
                    message: '停止下载时发生错误: ' + resetError.message,
                    type: 'warning',
                    isMainProcess: true
                });
                
                // 即使出错，也尝试保持连接状态
                if (this.isFlashConnected()) {
                    this.eventBus.emit('flash:log-add', {
                        message: '发生错误但串口连接已保持',
                        type: 'warning',
                        isMainProcess: true
                    });
                }
            }
        }
        
        // 发出下载完成事件，用于停止计时器
        this.eventBus.emit('flash:download-finished');
        
        this.isDownloading = false;
        this.updateDownloadButtonState();
        this.elements.stopDownloadBtn.disabled = true;
    }
    
    /**
     * 读取文件为ArrayBuffer
     */
    readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(file);
        });
    }
    
    /**
     * 调试模式切换
     */
    toggleDebugMode() {
        const isEnabled = this.elements.flashDebugMode?.checked || false;
        
        // 更新FlashDownloader的调试状态
        if (this.flashDownloader) {
            if (isEnabled) {
                this.flashDownloader.enableDebug();
            } else {
                this.flashDownloader.disableDebug();
            }
        }
        
        // 更新UI状态
        this.updateDebugStatus(isEnabled);
        
        // 更新状态栏样式
        if (isEnabled) {
            this.elements.debugStatusBar?.classList.remove('disabled');
        } else {
            this.elements.debugStatusBar?.classList.add('disabled');
        }
        
        // 添加日志
        this.eventBus.emit('flash:log-add', {
            message: isEnabled ? i18n.t('debug_mode_enabled') : i18n.t('debug_mode_disabled'),
            type: isEnabled ? 'success' : 'warning',
            isMainProcess: true
        });
        
        // 触发调试状态变更事件
        this.eventBus.emit('debug:toggle', isEnabled);
    }
    
    /**
     * 更新调试状态显示
     */
    updateDebugStatus(isEnabled) {
        if (this.elements.debugStatusValue) {
            // 更新状态文本
            this.elements.debugStatusValue.textContent = isEnabled ? i18n.t('enabled') : i18n.t('disabled');
            
            // 更新状态颜色
            this.elements.debugStatusValue.style.color = isEnabled ? '#10b981' : '#ef4444';
        }
    }
    
    /**
     * 更新调试状态（外部调用）
     */
    updateDebugState(enabled) {
        if (this.elements.flashDebugMode) {
            this.elements.flashDebugMode.checked = enabled;
        }
        this.updateDebugStatus(enabled);
    }
    
    /**
     * 获取下载状态
     */
    getStatus() {
        return {
            hasFile: !!this.selectedFile,
            fileName: this.selectedFile?.name,
            fileSize: this.selectedFile?.size,
            isDownloading: this.isDownloading,
            debugMode: this.elements.flashDebugMode?.checked || false,
            selectedDevice: this.elements.deviceSelect?.value
        };
    }
    
    /**
     * 销毁模块
     */
    destroy() {
        if (this.flashDownloader) {
            this.flashDownloader.stop();
            this.flashDownloader = null;
        }
        this.elements = {};
        this.selectedFile = null;
        this.isDownloading = false;
        this.eventBus = null;
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.FlashManager = FlashManager;
}