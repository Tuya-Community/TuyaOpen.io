/**
 * 基础下载器接口类
 * 所有芯片下载器都应该继承此类并实现相应的方法
 */
class BaseDownloader {
    constructor(serialPort, debugCallback) {
        this.port = serialPort;
        this.debug = debugCallback || ((level, message, data) => console.log(`[${level}] ${message}`, data || ''));
        this.onProgress = null;
        this.stopFlag = false;
        this.debugMode = false;
        
        // 芯片信息
        this.chipId = null;
        this.flashId = null;
        this.flashConfig = null;
        this.chipName = 'Unknown';
    }

    /**
     * 设置进度回调函数
     */
    setProgressCallback(callback) {
        this.onProgress = callback;
    }

    /**
     * 设置调试模式
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
    }

    /**
     * 主流程日志输出（总是显示）
     */
    mainLog(message) {
        this.debug('main', message);
    }

    /**
     * 调试日志输出（仅在调试模式下显示）
     */
    debugLog(message, data = null) {
        if (this.debugMode) {
            this.debug('debug', message, data);
        }
    }

    /**
     * 停止操作
     */
    stop() {
        this.stopFlag = true;
    }

    /**
     * 获取芯片名称
     */
    getChipName() {
        return this.chipName;
    }

    /**
     * 获取支持的Flash芯片列表
     */
    getSupportedFlashChips() {
        return {};
    }

    /**
     * 清空接收缓冲区
     * 子类可以重写此方法以适应不同的清空策略
     */
    async clearBuffer() {
        let reader = null;
        try {
            reader = this.port.readable.getReader();
            while (true && !this.stopFlag) {
                const { value, done } = await Promise.race([
                    reader.read(),
                    new Promise(resolve => setTimeout(() => resolve({ done: true }), 5))
                ]);
                if (done || !value || value.length === 0) break;
                
                // 检查停止标志
                if (this.stopFlag) {
                    this.debugLog('检测到停止信号，中断清空缓冲区操作');
                    break;
                }
            }
        } catch (error) {
            // 检查是否为串口异常断开
            if (this.isPortDisconnectionError(error)) {
                throw new Error('设备连接已断开，请检查USB连接后重试');
            }
            // 其他错误忽略
        } finally {
            if (reader) {
                try { reader.releaseLock(); } catch (e) {}
            }
        }
    }

    /**
     * 检测是否为串口异常断开错误
     */
    isPortDisconnectionError(error) {
        return error.name === 'NetworkError' || 
               error.message.includes('device has been lost') ||
               error.message.includes('device not found') ||
               error.message.includes('not open') ||
               !this.port?.readable;
    }

    /**
     * 发送命令
     * 子类可以重写此方法以适应不同的命令格式
     */
    async sendCommand(command, commandName) {
        // 检查停止标志
        if (this.stopFlag) {
            this.debugLog(`检测到停止信号，取消发送${commandName}`);
            throw new Error('操作已被用户取消');
        }
        
        this.debugLog(`发送${commandName}: ${command.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ')}`);
        
        let writer = null;
        try {
            writer = this.port.writable.getWriter();
            await writer.write(new Uint8Array(command));
        } catch (error) {
            throw new Error(`发送${commandName}失败: ${error.message}`);
        } finally {
            if (writer) {
                try { writer.releaseLock(); } catch (e) {}
            }
        }
    }

    /**
     * 接收响应
     * 子类可以重写此方法以适应不同的响应格式
     */
    async receiveResponse(expectedLength, timeout = 500) {
        let reader = null;
        try {
            reader = this.port.readable.getReader();
            const responseBuffer = [];
            const startTime = Date.now();
            
            while (responseBuffer.length < expectedLength && Date.now() - startTime < timeout && !this.stopFlag) {
                const remainingBytes = expectedLength - responseBuffer.length;
                const remainingTime = timeout - (Date.now() - startTime);
                
                if (remainingTime <= 0) break;
                
                // 检查停止标志
                if (this.stopFlag) {
                    this.debugLog('检测到停止信号，中断接收响应操作');
                    break;
                }
                
                try {
                    const readPromise = reader.read();
                    const timeoutPromise = new Promise(resolve => 
                        setTimeout(() => resolve({ done: true, timedOut: true }), remainingTime)
                    );
                    
                    const result = await Promise.race([readPromise, timeoutPromise]);
                    
                    if (result.timedOut || result.done) {
                        if (result.timedOut) {
                            break;
                        }
                        await new Promise(resolve => setTimeout(resolve, 1));
                        continue;
                    }
                    
                    if (result.value && result.value.length > 0) {
                        responseBuffer.push(...result.value);
                        this.debugLog(`接收: ${Array.from(result.value).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ')} (累计${responseBuffer.length}字节)`);
                        
                        if (responseBuffer.length >= expectedLength) {
                            break;
                        }
                    }
                } catch (error) {
                    // 检查是否为串口异常断开
                    if (this.isPortDisconnectionError(error)) {
                        throw new Error('设备连接已断开，请检查USB连接后重试');
                    }
                    this.debugLog(`读取错误: ${error.message}`);
                    await new Promise(resolve => setTimeout(resolve, 1));
                }
            }
            
            return responseBuffer;
        } catch (error) {
            throw new Error(`接收响应失败: ${error.message}`);
        } finally {
            if (reader) {
                try { reader.releaseLock(); } catch (e) {}
            }
        }
    }

    // ========== 抽象方法 - 子类必须实现 ==========

    /**
     * 连接设备并初始化
     * @returns {Promise<boolean>} 连接是否成功
     */
    async connect() {
        throw new Error('connect() 方法必须在子类中实现');
    }

    /**
     * 断开连接
     */
    async disconnect() {
        throw new Error('disconnect() 方法必须在子类中实现');
    }

    /**
     * 下载固件
     * @param {Uint8Array} fileData 固件数据
     * @param {number} startAddr 起始地址
     */
    async downloadFirmware(fileData, startAddr = 0x00) {
        throw new Error('downloadFirmware() 方法必须在子类中实现');
    }

    /**
     * 获取芯片ID
     * @returns {Promise<number>} 芯片ID
     */
    async getChipId() {
        throw new Error('getChipId() 方法必须在子类中实现');
    }

    /**
     * 获取Flash ID
     * @returns {Promise<object>} Flash信息对象
     */
    async getFlashId() {
        throw new Error('getFlashId() 方法必须在子类中实现');
    }

    /**
     * 检查连接状态
     * @returns {boolean} 是否已连接
     */
    isConnected() {
        return this.chipId !== null && this.flashId !== null;
    }

    /**
     * 获取设备状态信息
     * @returns {object} 设备状态对象
     */
    getDeviceStatus() {
        return {
            chipName: this.chipName,
            chipId: this.chipId,
            flashId: this.flashId,
            flashConfig: this.flashConfig,
            connected: this.isConnected()
        };
    }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseDownloader;
} else if (typeof window !== 'undefined') {
    window.BaseDownloader = BaseDownloader;
} 