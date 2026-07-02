/**
 * 串口管理模块
 * 负责串口连接、断开、配置管理
 */
class SerialManager {
    constructor(eventBus) {
        this.eventBus = eventBus;
        
        // 串口调试相关状态
        this.serialPort = null;
        this.serialReader = null;
        this.serialWriter = null;
        this.isSerialConnected = false;
        
        // 固件下载相关状态
        this.flashPort = null;
        this.flashReader = null;
        this.flashWriter = null;
        this.isFlashConnected = false;
        
        // 配置
        this.deviceConfig = window.DEVICE_BAUDRATE_CONFIG || {
            'custom': { baudrate: 115200, readonly: false },
            'T5AI': { baudrate: 921600, readonly: true },
            'T3': { baudrate: 921600, readonly: true },
            'T2': { baudrate: 115200, readonly: true },
            'ESP32': { baudrate: 115200, readonly: true },
            'ESP32C3': { baudrate: 115200, readonly: true },
            'ESP32S3': { baudrate: 115200, readonly: true },
            'BK7231N': { baudrate: 115200, readonly: true },
            'LN882H': { baudrate: 921600, readonly: true }
        };
        
        this.bindEvents();
    }
    
    bindEvents() {
        // 监听连接请求
        this.eventBus.on('serial:connect-request', (config) => {
            this.connectSerial(config);
        });
        
        this.eventBus.on('serial:disconnect-request', () => {
            this.disconnectSerial();
        });
        
        this.eventBus.on('flash:connect', (config) => {
            this.connectFlash(config);
        });
        
        this.eventBus.on('flash:disconnect', () => {
            this.disconnectFlash();
        });
        
        this.eventBus.on('flash:connect-independent-request', (config) => {
            this.connectFlashIndependent(config);
        });
        
        this.eventBus.on('flash:disconnect-independent-request', () => {
            this.disconnectFlashIndependent();
        });
        
        // 监听FlashDownloader的连接请求（新增）
        this.eventBus.on('flash:connect-request', (baudrate) => {
            this.connectFlash(baudrate);
        });
        
        this.eventBus.on('flash:disconnect-request', () => {
            this.disconnectFlash();
        });
        
        // 监听波特率重置请求（新增）
        this.eventBus.on('flash:reset-baudrate', async (baudrate) => {
            await this.resetFlashBaudrate(baudrate);
        });

        // 监听数据发送请求
        this.eventBus.on('serial:send', (data) => {
            this.sendSerialData(data);
        });
        
        // 监听设备配置变更
        this.eventBus.on('device:config-changed', (device) => {
            this.updateDeviceConfig(device);
        });
    }
    
    /**
     * 串口调试连接
     */
    async connectSerial(config = null) {
        try {
            // 请求串口访问权限
            this.serialPort = await navigator.serial.requestPort();

            // 获取串口配置
            const options = config || this.getDefaultSerialOptions();

            // 打开串口
            await this.serialPort.open(options);

            // 设置读写器
            this.serialReader = this.serialPort.readable.getReader();
            this.serialWriter = this.serialPort.writable.getWriter();

            this.isSerialConnected = true;

            // 开始读取数据
            this.startSerialReading();

            this.eventBus.emit('serial:connected', {
                config: options,
                port: this.serialPort
            });

        } catch (error) {
            this.eventBus.emit('error', {
                type: 'serial_connect_failed',
                message: `串口调试连接失败: ${error.message}`,
                error
            });
            throw error;
        }
    }
    
    /**
     * 串口调试断开连接
     */
    async disconnectSerial() {
        try {
            // 停止读取
            if (this.serialReader) {
                await this.serialReader.cancel();
                await this.serialReader.releaseLock();
                this.serialReader = null;
            }

            // 关闭写入器
            if (this.serialWriter) {
                await this.serialWriter.releaseLock();
                this.serialWriter = null;
            }

            // 关闭串口
            if (this.serialPort) {
                await this.serialPort.close();
                this.serialPort = null;
            }

            this.isSerialConnected = false;
            
            this.eventBus.emit('serial:disconnected');

        } catch (error) {
            this.eventBus.emit('error', {
                type: 'serial_disconnect_failed',
                message: `串口调试断开连接失败: ${error.message}`,
                error
            });
            throw error;
        }
    }
    
    /**
     * 固件下载连接串口
     */
    async connectFlash(baudrate = 115200) {
        try {
            // 关键修复：检查是否已经有打开的串口连接
            if (this.flashPort && this.flashPort.readable && this.flashPort.writable) {
                this.eventBus.emit('flash:log-add', {
                    message: '检测到已有串口连接，正在验证连接状态...',
                    type: 'info',
                    isMainProcess: true
                });
                
                // 验证reader和writer是否可用
                if (!this.flashReader) {
                    try {
                        this.flashReader = this.flashPort.readable.getReader();
                        this.eventBus.emit('flash:log-add', {
                            message: '重新获取串口读取器成功',
                            type: 'info',
                            isMainProcess: true
                        });
                    } catch (readerError) {
                        this.eventBus.emit('flash:log-add', {
                            message: '获取串口读取器失败: ' + readerError.message,
                            type: 'warning',
                            isMainProcess: true
                        });
                    }
                }
                
                if (!this.flashWriter) {
                    try {
                        this.flashWriter = this.flashPort.writable.getWriter();
                        this.eventBus.emit('flash:log-add', {
                            message: '重新获取串口写入器成功',
                            type: 'info',
                            isMainProcess: true
                        });
                    } catch (writerError) {
                        this.eventBus.emit('flash:log-add', {
                            message: '获取串口写入器失败: ' + writerError.message,
                            type: 'warning',
                            isMainProcess: true
                        });
                    }
                }
                
                if (this.flashReader && this.flashWriter) {
                    // 连接已可用，直接使用
                    this.isFlashConnected = true;
                    
                    this.eventBus.emit('flash:connected', {
                        config: { baudRate: 115200, dataBits: 8, stopBits: 1, parity: 'none' },
                        requestedBaudrate: baudrate,
                        port: this.flashPort,
                        reader: this.flashReader,
                        writer: this.flashWriter
                    });
                    
                    this.eventBus.emit('flash:log-add', {
                        message: '使用现有串口连接 (115200 bps)',
                        type: 'success',
                        isMainProcess: true
                    });
                    
                    return { reader: this.flashReader, writer: this.flashWriter, port: this.flashPort };
                } else {
                    // reader或writer不可用，需要重新连接
                    this.eventBus.emit('flash:log-add', {
                        message: '现有连接状态异常，将重新连接',
                        type: 'warning',
                        isMainProcess: true
                    });
                    
                    // 清理异常状态
                    await this.disconnectFlash();
                }
            }

            // 如果没有请求过端口，则请求串口访问权限
            if (!this.flashPort) {
                this.flashPort = await navigator.serial.requestPort();
            }

            // 固件下载必须先用115200连接
            const initialOptions = {
                baudRate: 115200,
                dataBits: 8,
                stopBits: 1,
                parity: 'none'
            };

            // 打开串口
            await this.flashPort.open(initialOptions);

            // 设置读写器
            this.flashReader = this.flashPort.readable.getReader();
            this.flashWriter = this.flashPort.writable.getWriter();

            this.isFlashConnected = true;
            
            this.eventBus.emit('flash:connected', {
                config: initialOptions,
                requestedBaudrate: baudrate,
                port: this.flashPort,
                reader: this.flashReader,
                writer: this.flashWriter
            });
            
            return { reader: this.flashReader, writer: this.flashWriter, port: this.flashPort };

        } catch (error) {
            this.eventBus.emit('error', {
                type: 'flash_connect_failed',
                message: `固件下载连接失败: ${error.message}`,
                error
            });
            throw error;
        }
    }
    
    /**
     * 固件下载断开连接
     */
    async disconnectFlash() {
        try {
            // 停止读取
            if (this.flashReader) {
                await this.flashReader.cancel();
                await this.flashReader.releaseLock();
                this.flashReader = null;
            }

            // 关闭写入器
            if (this.flashWriter) {
                await this.flashWriter.releaseLock();
                this.flashWriter = null;
            }

            // 关闭串口
            if (this.flashPort) {
                await this.flashPort.close();
                this.flashPort = null;
            }

            this.isFlashConnected = false;
            
            this.eventBus.emit('flash:disconnected');

        } catch (error) {
            this.eventBus.emit('error', {
                type: 'flash_disconnect_failed',
                message: `固件下载断开连接失败: ${error.message}`,
                error
            });
            throw error;
        }
    }
    
    /**
     * 固件下载独立连接
     */
    async connectFlashIndependent() {
        try {
            // 请求串口访问权限
            this.flashPort = await navigator.serial.requestPort();

            // 固件下载必须先用115200连接
            const initialOptions = {
                baudRate: 115200,
                dataBits: 8,
                stopBits: 1,
                parity: 'none'
            };

            // 打开串口
            await this.flashPort.open(initialOptions);

            // 设置读写器
            this.flashReader = this.flashPort.readable.getReader();
            this.flashWriter = this.flashPort.writable.getWriter();

            this.isFlashConnected = true;
            
            this.eventBus.emit('flash:connected-independent', {
                config: initialOptions,
                port: this.flashPort,
                reader: this.flashReader,
                writer: this.flashWriter
            });
            
            return { reader: this.flashReader, writer: this.flashWriter, port: this.flashPort };

        } catch (error) {
            this.eventBus.emit('error', {
                type: 'flash_connect_independent_failed',
                message: `固件下载独立连接失败: ${error.message}`,
                error
            });
            throw error;
        }
    }
    
    /**
     * 固件下载独立断开连接
     */
    async disconnectFlashIndependent() {
        try {
            // 停止读取
            if (this.flashReader) {
                await this.flashReader.cancel();
                await this.flashReader.releaseLock();
                this.flashReader = null;
            }

            // 关闭写入器
            if (this.flashWriter) {
                await this.flashWriter.releaseLock();
                this.flashWriter = null;
            }

            // 关闭串口
            if (this.flashPort) {
                await this.flashPort.close();
                this.flashPort = null;
            }

            this.isFlashConnected = false;
            
            this.eventBus.emit('flash:disconnected-independent');

        } catch (error) {
            this.eventBus.emit('error', {
                type: 'flash_disconnect_failed',
                message: `固件下载断开连接失败: ${error.message}`,
                error
            });
            throw error;
        }
    }
    
    /**
     * 重置固件下载串口波特率（保持连接状态）
     */
    async resetFlashBaudrate(baudrate = 115200) {
        try {
            if (this.flashPort && this.isFlashConnected) {
                this.eventBus.emit('flash:log-add', {
                    message: `正在重置串口波特率到${baudrate}（保持连接）...`,
                    type: 'info',
                    isMainProcess: false
                });
                
                // 临时释放reader和writer
                if (this.flashReader) {
                    await this.flashReader.releaseLock();
                    this.flashReader = null;
                }
                if (this.flashWriter) {
                    await this.flashWriter.releaseLock();
                    this.flashWriter = null;
                }
                
                // 重新配置串口波特率
                await this.flashPort.close();
                await this.flashPort.open({
                    baudRate: baudrate,
                    dataBits: 8,
                    stopBits: 1,
                    parity: 'none'
                });
                
                // 重新创建reader和writer
                this.flashReader = this.flashPort.readable.getReader();
                this.flashWriter = this.flashPort.writable.getWriter();
                
                // 确保连接状态保持
                this.isFlashConnected = true;
                
                this.eventBus.emit('flash:log-add', {
                    message: `✅ 串口波特率已重置为${baudrate}，连接保持`,
                    type: 'success',
                    isMainProcess: false
                });
            }
        } catch (resetError) {
            this.eventBus.emit('flash:log-add', {
                message: `波特率重置失败: ${resetError.message}`,
                type: 'warning',
                isMainProcess: false
            });
            
            // 即使重置失败，也尝试保持连接状态
            try {
                if (this.flashPort && this.flashPort.readable && this.flashPort.writable) {
                    if (!this.flashReader) {
                        this.flashReader = this.flashPort.readable.getReader();
                    }
                    if (!this.flashWriter) {
                        this.flashWriter = this.flashPort.writable.getWriter();
                    }
                    this.isFlashConnected = true;
                    this.eventBus.emit('flash:log-add', {
                        message: '串口连接状态已恢复',
                        type: 'info',
                        isMainProcess: false
                    });
                }
            } catch (recoverError) {
                this.eventBus.emit('flash:log-add', {
                    message: `连接状态恢复失败: ${recoverError.message}`,
                    type: 'error',
                    isMainProcess: false
                });
            }
            
            throw resetError;
        }
    }
    
    /**
     * 开始串口读取
     */
    async startSerialReading() {
        try {
            while (this.serialPort && this.serialPort.readable && this.serialReader) {
                const { value, done } = await this.serialReader.read();
                
                if (done) {
                    break;
                }

                if (value) {
                    this.eventBus.emit('serial:data-received', value);
                }
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                this.eventBus.emit('error', {
                    type: 'serial_read_error',
                    message: `读取数据错误: ${error.message}`,
                    error
                });
            }
        }
    }
    
    /**
     * 发送串口数据
     */
    async sendSerialData(data) {
        if (!this.isSerialConnected || !this.serialWriter) {
            throw new Error('串口未连接');
        }

        try {
            await this.serialWriter.write(data);
            this.eventBus.emit('serial:data-sent', data);
        } catch (error) {
            this.eventBus.emit('error', {
                type: 'serial_send_error',
                message: `发送数据错误: ${error.message}`,
                error
            });
            throw error;
        }
    }
    
    /**
     * 获取默认串口配置
     */
    getDefaultSerialOptions() {
        return {
            baudRate: 115200,
            dataBits: 8,
            stopBits: 1,
            parity: 'none'
        };
    }
    
    /**
     * 更新设备配置
     */
    updateDeviceConfig(deviceName) {
        const config = this.deviceConfig[deviceName];
        if (config) {
            this.eventBus.emit('device:config-updated', {
                device: deviceName,
                config: config
            });
        }
    }
    
    /**
     * 获取连接状态
     */
    getStatus() {
        return {
            serial: {
                connected: this.isSerialConnected,
                port: !!this.serialPort,
                reader: !!this.serialReader,
                writer: !!this.serialWriter
            },
            flash: {
                connected: this.isFlashConnected,
                port: !!this.flashPort,
                reader: !!this.flashReader,
                writer: !!this.flashWriter
            }
        };
    }
    
    /**
     * 销毁模块
     */
    async destroy() {
        try {
            await this.disconnectSerial();
            await this.disconnectFlash();
        } catch (error) {
            console.error('串口模块销毁时发生错误:', error);
        }
        
        this.eventBus = null;
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.SerialManager = SerialManager;
} 