/**
 * UI管理模块
 * 负责DOM元素管理、事件绑定、状态更新
 */
class UIManager {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.elements = {};
        
        this.initializeElements();
        this.bindEvents();
        this.checkWebSerialSupport();
    }
    
    /**
     * 初始化DOM元素
     */
    initializeElements() {
        // 串口调试按钮元素
        this.elements.connectBtn = document.getElementById('connectBtn');
        this.elements.disconnectBtn = document.getElementById('disconnectBtn');
        this.elements.sendBtn = document.getElementById('sendBtn');
        this.elements.clearBtn = document.getElementById('clearBtn');
        this.elements.saveBtn = document.getElementById('saveBtn');

        // 状态元素
        this.elements.statusDot = document.getElementById('statusDot');
        this.elements.statusText = document.getElementById('statusText');

        // 串口调试配置元素
        this.elements.serialTargetDevice = document.getElementById('serialTargetDevice');
        this.elements.baudRateSelect = document.getElementById('baudRate');
        this.elements.dataBitsSelect = document.getElementById('dataBits');
        this.elements.stopBitsSelect = document.getElementById('stopBits');
        this.elements.paritySelect = document.getElementById('parity');

        // 固件下载独立配置元素
        this.elements.connectFlashBtn = document.getElementById('connectFlashBtn');
        this.elements.disconnectFlashBtn = document.getElementById('disconnectFlashBtn');
        this.elements.flashStatusDot = document.getElementById('flashStatusDot');
        this.elements.flashStatusText = document.getElementById('flashStatusText');
        this.elements.flashBaudRateSelect = document.getElementById('flashBaudRate');
        this.elements.flashDataBitsSelect = document.getElementById('flashDataBits');
        this.elements.flashStopBitsSelect = document.getElementById('flashStopBits');
        this.elements.flashParitySelect = document.getElementById('flashParity');

        // 数据显示元素
        this.elements.dataDisplay = document.getElementById('dataDisplay');
        this.elements.sendInput = document.getElementById('sendInput');
        this.elements.rxCountSpan = document.getElementById('rxCount');
        this.elements.txCountSpan = document.getElementById('txCount');

        // 选项元素
        this.elements.autoScrollCheck = document.getElementById('autoScroll');
        this.elements.hexModeCheck = document.getElementById('hexMode');
        this.elements.addNewlineCheck = document.getElementById('addNewline');
        this.elements.showTimestampCheck = document.getElementById('showTimestamp');

        // 快捷按钮相关元素
        this.elements.quickButtonsContainer = document.getElementById('quickButtons');
        this.elements.noQuickCommands = document.getElementById('noQuickCommands');
        this.elements.manageQuickBtn = document.getElementById('manageQuickBtn');

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

        // 调试控件相关元素
        this.elements.flashDebugMode = document.getElementById('flashDebugMode');
        this.elements.debugStatusBar = document.getElementById('debugStatusBar');
        this.elements.debugStatusValue = document.getElementById('debugStatusValue');

        // 语言切换相关元素
        this.elements.langDropdown = document.getElementById('langDropdown');
        this.elements.langDropdownBtn = document.getElementById('langDropdownBtn');
        this.elements.langDropdownMenu = document.getElementById('langDropdownMenu');
        this.elements.currentLangFlag = document.getElementById('currentLangFlag');
        this.elements.currentLangName = document.getElementById('currentLangName');
    }
    
    /**
     * 绑定基础事件
     */
    bindEvents() {
        // 串口调试连接/断开事件
        this.elements.connectBtn?.addEventListener('click', () => {
            this.eventBus.emit('serial:connect-request', this.getSerialConfig());
        });
        
        this.elements.disconnectBtn?.addEventListener('click', () => {
            this.eventBus.emit('serial:disconnect-request');
        });

        // 固件下载独立连接/断开事件
        this.elements.connectFlashBtn?.addEventListener('click', () => {
            this.eventBus.emit('flash:connect-independent-request');
        });
        
        this.elements.disconnectFlashBtn?.addEventListener('click', () => {
            this.eventBus.emit('flash:disconnect-independent-request');
        });

        // 发送事件
        this.elements.sendBtn?.addEventListener('click', () => {
            this.sendData();
        });
        
        this.elements.sendInput?.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.sendData();
            }
        });

        // 清空和保存事件
        this.elements.clearBtn?.addEventListener('click', () => {
            this.eventBus.emit('data:clear');
        });
        
        this.elements.saveBtn?.addEventListener('click', () => {
            this.eventBus.emit('data:save');
        });

        // HEX模式切换事件
        this.elements.hexModeCheck?.addEventListener('change', () => {
            this.updateInputPlaceholder();
        });

        // 串口目标设备选择事件
        this.elements.serialTargetDevice?.addEventListener('change', () => {
            this.handleSerialTargetDeviceChange();
        });

        // 文件选择事件
        this.elements.selectFileBtn?.addEventListener('click', () => {
            this.elements.binFileInput?.click();
        });

        this.elements.binFileInput?.addEventListener('change', (e) => {
            this.handleFileSelect(e);
        });

        // 固件下载事件
        this.elements.downloadBtn?.addEventListener('click', () => {
            this.eventBus.emit('flash:download-start');
        });

        this.elements.stopDownloadBtn?.addEventListener('click', () => {
            this.eventBus.emit('flash:download-stop');
        });

        // 固件下载日志事件
        this.elements.clearFlashLogBtn?.addEventListener('click', () => {
            this.eventBus.emit('flash:log-clear');
        });

        this.elements.saveFlashLogBtn?.addEventListener('click', () => {
            this.eventBus.emit('flash:log-save');
        });

        // 调试控件事件
        this.elements.flashDebugMode?.addEventListener('change', () => {
            this.eventBus.emit('debug:toggle', this.elements.flashDebugMode.checked);
        });

        // 语言切换事件
        this.elements.langDropdownBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.eventBus.emit('language:dropdown-toggle');
        });

        // 监听模块事件
        this.bindModuleEvents();
    }
    
    /**
     * 绑定模块事件
     */
    bindModuleEvents() {
        // 连接状态更新
        this.eventBus.on('serial:connected', () => {
            this.updateSerialConnectionStatus(true);
        });
        
        this.eventBus.on('serial:disconnected', () => {
            this.updateSerialConnectionStatus(false);
        });
        
        this.eventBus.on('flash:connected-independent', () => {
            this.updateFlashConnectionStatus(true);
        });
        
        this.eventBus.on('flash:disconnected-independent', () => {
            this.updateFlashConnectionStatus(false);
        });
        
        // 数据计数更新
        this.eventBus.on('data:rx-count-updated', (count) => {
            if (this.elements.rxCountSpan) {
                this.elements.rxCountSpan.textContent = count;
            }
        });
        
        this.eventBus.on('data:tx-count-updated', (count) => {
            if (this.elements.txCountSpan) {
                this.elements.txCountSpan.textContent = count;
            }
        });
        
        // 数据显示
        this.eventBus.on('data:display', (data) => {
            this.addToDisplay(data);
        });
        
        // 文件选择
        this.eventBus.on('file:selected', (file) => {
            this.updateFileDisplay(file);
        });
        
        // 设备配置更新
        this.eventBus.on('device:config-updated', (data) => {
            this.updateDeviceConfigUI(data);
        });
        
        // 快捷命令执行
        this.eventBus.on('quick-command:execute', (command) => {
            if (this.elements.sendInput) {
                this.elements.sendInput.value = command.value;
                // 如果串口已连接，自动发送
                if (this.elements.sendBtn && !this.elements.sendBtn.disabled) {
                    this.sendData();
                }
            }
        });
        
        // HEX模式切换时更新占位符
        this.eventBus.on('hex-mode:changed', () => {
            this.updateInputPlaceholder();
        });
        
        // 语言切换后更新文本
        this.eventBus.on('language:changed', () => {
            this.updateUITexts();
        });
        
        // 文本更新请求
        this.eventBus.on('ui:text-updated', () => {
            this.updateUITexts();
        });
    }
    
    /**
     * 发送数据
     */
    sendData() {
        const input = this.elements.sendInput?.value;
        if (!input?.trim()) {
            return;
        }

        try {
            let dataToSend;
            const isHexMode = this.elements.hexModeCheck?.checked || false;
            const addNewline = this.elements.addNewlineCheck?.checked || false;

            if (isHexMode) {
                // HEX模式 - 使用FileUtils的hexStringToBytes
                this.eventBus.emit('data:hex-to-bytes', { 
                    hexString: input,
                    callback: (bytes) => {
                        this.eventBus.emit('serial:send', bytes);
                        this.elements.sendInput.value = '';
                    }
                });
                return;
            } else {
                // 文本模式
                let textToSend = input;
                if (addNewline) {
                    textToSend += '\r\n';
                }
                dataToSend = new TextEncoder().encode(textToSend);
            }

            // 发送数据
            this.eventBus.emit('serial:send', dataToSend);

            // 清空输入框
            this.elements.sendInput.value = '';

        } catch (error) {
            this.eventBus.emit('error', error);
        }
    }
    
    /**
     * 更新串口连接状态
     */
    updateSerialConnectionStatus(connected) {
        if (connected) {
            this.elements.connectBtn.disabled = true;
            this.elements.disconnectBtn.disabled = false;
            this.elements.sendBtn.disabled = false;
            this.elements.statusDot.classList.add('connected');
            this.elements.statusText.textContent = i18n.t('status_connected');
            
            // 禁用配置选项
            this.elements.baudRateSelect.disabled = true;
            this.elements.dataBitsSelect.disabled = true;
            this.elements.stopBitsSelect.disabled = true;
            this.elements.paritySelect.disabled = true;
            this.elements.serialTargetDevice.disabled = true;
        } else {
            this.elements.connectBtn.disabled = false;
            this.elements.disconnectBtn.disabled = true;
            this.elements.sendBtn.disabled = true;
            this.elements.statusDot.classList.remove('connected');
            this.elements.statusText.textContent = i18n.t('status_disconnected');
            
            // 启用目标设备选择器
            this.elements.serialTargetDevice.disabled = false;
            
            // 根据当前选择的目标设备决定其他配置选项的状态
            this.handleSerialTargetDeviceChange();
        }
    }
    
    /**
     * 更新固件下载连接状态
     */
    updateFlashConnectionStatus(connected) {
        if (connected) {
            this.elements.connectFlashBtn.disabled = true;
            this.elements.disconnectFlashBtn.disabled = false;
            this.elements.flashStatusDot.classList.add('connected');
            this.elements.flashStatusText.textContent = i18n.t('status_connected');
            
            // 禁用固件下载配置选项
            this.elements.flashBaudRateSelect.disabled = true;
            this.elements.flashDataBitsSelect.disabled = true;
            this.elements.flashStopBitsSelect.disabled = true;
            this.elements.flashParitySelect.disabled = true;
        } else {
            this.elements.connectFlashBtn.disabled = false;
            this.elements.disconnectFlashBtn.disabled = true;
            this.elements.flashStatusDot.classList.remove('connected');
            this.elements.flashStatusText.textContent = i18n.t('status_disconnected');
            
            // 启用固件下载配置选项
            this.elements.flashBaudRateSelect.disabled = false;
            this.elements.flashDataBitsSelect.disabled = false;
            this.elements.flashStopBitsSelect.disabled = false;
            this.elements.flashParitySelect.disabled = false;
        }
    }
    
    /**
     * 添加数据到显示区域
     */
    addToDisplay(data) {
        // 移除占位符
        const placeholder = this.elements.dataDisplay.querySelector('.placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        const line = document.createElement('div');
        line.className = `data-line ${data.type}`;

        // 根据时间戳选项决定是否添加时间戳
        if (this.elements.showTimestampCheck?.checked) {
            const timestampSpan = document.createElement('span');
            timestampSpan.className = 'timestamp';
            timestampSpan.textContent = `[${data.timestamp}] `;
            line.appendChild(timestampSpan);
            
            // 添加类型前缀
            if (data.type === 'received') {
                const prefixSpan = document.createElement('span');
                prefixSpan.className = 'prefix rx';
                prefixSpan.textContent = 'RX: ';
                line.appendChild(prefixSpan);
            } else if (data.type === 'sent') {
                const prefixSpan = document.createElement('span');
                prefixSpan.className = 'prefix tx';
                prefixSpan.textContent = 'TX: ';
                line.appendChild(prefixSpan);
            }
        }
        
        // 添加数据内容
        const contentSpan = document.createElement('span');
        contentSpan.className = 'content';
        
        // 处理文本内容
        if (data.text) {
            contentSpan.textContent = data.text;
        } else if (data.data) {
            // 显示发送的数据（可能是字节数组）
            const decoder = new TextDecoder();
            contentSpan.textContent = decoder.decode(data.data);
        }
        
        line.appendChild(contentSpan);
        this.elements.dataDisplay.appendChild(line);

        // 自动滚动
        if (this.elements.autoScrollCheck?.checked) {
            this.elements.dataDisplay.scrollTop = this.elements.dataDisplay.scrollHeight;
        }

        // 添加动画效果
        line.classList.add('fade-in');
    }
    
    /**
     * 处理文件选择
     */
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.eventBus.emit('file:selected', file);
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
        if (this.elements.downloadBtn) {
            this.elements.downloadBtn.disabled = false; // 文件选择后启用下载按钮
        }
    }
    
    /**
     * 处理串口目标设备变更
     */
    handleSerialTargetDeviceChange() {
        const selectedDevice = this.elements.serialTargetDevice?.value;
        if (selectedDevice) {
            this.eventBus.emit('device:config-changed', selectedDevice);
        }
    }
    
    /**
     * 更新设备配置UI
     */
    updateDeviceConfigUI(data) {
        const { device, config } = data;
        
        if (config) {
            // 设置对应的波特率
            if (this.elements.baudRateSelect) {
                this.elements.baudRateSelect.value = config.baudrate;
            }
            
            // 当选择自定义时，恢复所有配置到默认值
            if (device === 'custom') {
                if (this.elements.dataBitsSelect) this.elements.dataBitsSelect.value = 8;
                if (this.elements.stopBitsSelect) this.elements.stopBitsSelect.value = 1;
                if (this.elements.paritySelect) this.elements.paritySelect.value = 'none';
            }
            
            // 设置配置选择器的只读状态
            const isReadonly = config.readonly;
            const configElements = [
                this.elements.baudRateSelect,
                this.elements.dataBitsSelect,
                this.elements.stopBitsSelect,
                this.elements.paritySelect
            ];
            
            configElements.forEach(element => {
                if (element) {
                    element.disabled = isReadonly;
                    if (isReadonly) {
                        element.style.backgroundColor = '#f5f5f5';
                        element.style.cursor = 'not-allowed';
                    } else {
                        element.style.backgroundColor = '';
                        element.style.cursor = '';
                    }
                }
            });
        }
    }
    
    /**
     * 获取串口配置
     */
    getSerialConfig() {
        return {
            baudRate: parseInt(this.elements.baudRateSelect?.value || '115200'),
            dataBits: parseInt(this.elements.dataBitsSelect?.value || '8'),
            stopBits: parseInt(this.elements.stopBitsSelect?.value || '1'),
            parity: this.elements.paritySelect?.value || 'none'
        };
    }
    
    /**
     * 更新输入框占位符
     */
    updateInputPlaceholder() {
        if (this.elements.sendInput) {
            if (this.elements.hexModeCheck?.checked) {
                this.elements.sendInput.placeholder = i18n.t('input_placeholder_hex');
            } else {
                this.elements.sendInput.placeholder = i18n.t('input_placeholder');
            }
        }
    }
    
    /**
     * 检查Web Serial API支持
     */
    checkWebSerialSupport() {
        // 检测浏览器类型（使用FileUtils中的检测方法）
        this.eventBus.emit('browser:check', (browserInfo) => {
            const browserWarning = document.getElementById('browserWarning');
            
            // 如果不是Chrome内核浏览器，显示警告
            if (!browserInfo.isChromium && browserWarning) {
                browserWarning.style.display = 'block';
            }
            
            // 检查Web Serial API支持
            if (!('serial' in navigator)) {
                this.eventBus.emit('error', {
                    type: 'browser_not_supported',
                    message: i18n.t('browser_not_supported')
                });
                
                if (this.elements.connectBtn) {
                    this.elements.connectBtn.disabled = true;
                }
                
                // 如果不支持Web Serial API，也显示浏览器警告
                if (browserWarning) {
                    browserWarning.style.display = 'block';
                }
            }
        });
    }
    
    /**
     * 获取元素引用
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
    
    /**
     * 更新UI文本（语言切换后调用）
     */
    updateUITexts() {
        // 更新连接状态文本
        const isSerialConnected = this.elements.statusDot?.classList.contains('connected');
        if (this.elements.statusText) {
            this.elements.statusText.textContent = isSerialConnected ? 
                i18n.t('status_connected') : i18n.t('status_disconnected');
        }
        
        const isFlashConnected = this.elements.flashStatusDot?.classList.contains('connected');
        if (this.elements.flashStatusText) {
            this.elements.flashStatusText.textContent = isFlashConnected ? 
                i18n.t('status_connected') : i18n.t('status_disconnected');
        }
        
        // 更新输入框占位符
        this.updateInputPlaceholder();
        
        // 更新文件名显示
        if (this.elements.selectedFileName && 
            (this.elements.selectedFileName.textContent === '未选择文件' || 
             this.elements.selectedFileName.textContent === 'No file selected')) {
            this.elements.selectedFileName.textContent = i18n.t('no_file_selected');
        }
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.UIManager = UIManager;
} 